/** @format */

import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import express, { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { DateTime } from "luxon";
import config from "../config";
import Db from "../models/mongodb";
import { jaction } from "../utils/custom-express";
import Encrypt, { ClientEncrypt } from "../utils/encrypt";
import { genId, genMngrPass, genNum } from "../utils/generate-random";
import { getMngrCredentialsTemplate } from "../utils/get-templates";
import { authenticate } from "./validate";
import { IMngrActivity } from "../types";
import { getIp, getUserBrowser, getUserOS } from "../utils/client-info";
import crypto from "crypto";

export function getManagerRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/login", jaction(verifyLogin))
    .post("/changePassword", jaction(changePassword))
    .post("/createManager", jaction(createManager))
    .post("/createSchool", jaction(createSchool))
    .get("/profile/:email", jaction(getMngrProfile))
    .get("/activities", jaction(getActivities))
    .get("/profile", jaction(getProfile));
}

async function getActivities(req: Request, res: Response) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const { id } = info;
    const toIndianDateTime = new Date(
      DateTime.utc().plus({ hours: 5, minutes: 30 }).toString(),
    ).toISOString();
    const fromIndianDateTime = new Date(
      DateTime.fromMillis(
        new Date(
          new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
        ).setHours(0, 0, 0, 0),
      )
        .plus({ hours: 5, minutes: 30 })
        .toString(),
    ).toISOString();
    const rows = await Db.managerActivity.getList(
      id,
      fromIndianDateTime,
      toIndianDateTime,
    );
    return { success: true, type: true, data: rows };
  } else {
    res.status(403).send({
      success: false,
      type: false,
      userMessage: "Login Required",
    });
  }
}

async function recordActivity(req: Request, id: string, activity: string) {
  const activityData: IMngrActivity = {
    id,
    ip: getIp(req),
    browser: getUserBrowser(req),
    iAt: new Date(
      DateTime.utc().plus({ hours: 5 }).plus({ minutes: 30 }).toString(),
    ).toISOString(),
    os: getUserOS(req),
    userAgent: req.headers["user-agent"] || "",
    activity,
  };
  await Db.managerActivity.set(activityData);
}

async function verifyLogin(req: Request, res: Response) {
  const { userName, password } = req.body;
  const { jwtTokenAlgo, jwtTokenKey, jwtTokenIV } = config;
  const data = { userName, password };
  data.password = Encrypt.hash(password, config.secretKey);
  data.userName = Encrypt.hash(userName, config.secretKey);
  const rows = await Db.manager.verifyLogin(data.userName, data.password);
  const signOpts: SignOptions = {
    expiresIn: "24h",
  };
  const FIVE_MIN = 60 * 5;
  if (rows.isDefault) signOpts.expiresIn = FIVE_MIN;
  if (rows.isVerified && !rows.disabled) {
    await recordActivity(req, rows.id, "Logged In Successfully");
    const jwtToken = jwt.sign(
      { id: rows.id, user: req.body.userName, userType: "manager" },
      config.jwtSecret,
      signOpts,
    );
    const cipher = crypto.createCipheriv(jwtTokenAlgo, jwtTokenKey, jwtTokenIV);
    const encToken = Buffer.concat([
      cipher.update(Buffer.from(jwtToken).toString("base64")),
      cipher.final(),
    ]).toString("hex");
    const luxonTime = new Date(
      DateTime.utc().plus({ hours: 29, minutes: 30 }).toString(),
    ).toISOString();
    const expiresAt = new Date(luxonTime);
    res.cookie("ch-token", encToken, {
      expires: expiresAt,
    });
    res.send({
      success: true,
      type: true,
      isDefault: rows.isDefault,
      userMessage: "Logged in Successfully",
    });
  } else {
    res.send({
      success: true,
      type: false,
      userMessage: "Login Failed! Invalid Login Credentials",
    });
  }
}

async function getMngrProfile(req: Request, res: Response) {
  const { email } = req.params;
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const row = await Db.manager.getCtxByEmail(email);
    console.log("row ---", row, typeof row);
    if (row) return { success: true, type: true, data: row };
    else
      return {
        success: true,
        type: false,
        data: null,
        userMessage: "No Manager found with entered email",
      };
  } else {
    res.status(403).send({
      success: true,
      type: false,
      userMessage: "Login Required",
    });
  }
}

async function getProfile(req: Request, res: Response) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);

  if (success && info) {
    const { id } = info;
    const row = await Db.manager.getCtx(id);
    return { success: true, type: true, data: row };
  } else {
    res.status(403).send({
      success: true,
      type: false,
      userMessage: "Login Required",
    });
  }
}

async function changePassword(req: Request, res: Response) {
  const { password } = req.body;
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  res.cookie("ch-token", null, {
    expires: new Date("1970-01-01"),
  });
  if (success && info) {
    const encPass = Encrypt.hash(password, config.secretKey);
    const { id, user } = info;
    if (id && user) {
      const dbUsername = Encrypt.hash(user, config.secretKey);
      await Db.manager.changeDefault(id, encPass, dbUsername);
      await recordActivity(req, info.id, "Password Changed");
      res.send({
        success: true,
        type: true,
        userMessage: "Password Changed Successfully",
      });
    } else
      return {
        success: true,
        type: false,
        userMessage: "Invalid Request",
      };
  } else
    return res.status(403).send({
      success: true,
      type: false,
      userMessage: "Login Required",
    });
}

async function createSchool(req: Request, res: Response) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const { data } = req.body;
  } else {
    return res.status(403).send({
      success: false,
      type: false,
      userMessage: "Login Required",
    });
  }
}

async function createManager(req: Request, res: Response) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const { data } = req.body;
    const { email, name } = data;
    const isExists = await Db.manager.findMngr(email);
    if (!isExists) {
      const password = genMngrPass("mngr");
      const clientPassword = ClientEncrypt.hashPassword(
        password,
        config.clientSecretKey,
      );
      data.password = Encrypt.hash(clientPassword, config.secretKey);
      const id = genId(8);
      const userName = genNum(8);
      data.userName = Encrypt.hash(userName, config.secretKey);
      const attrs = {
        disabled: false,
        createdBy: info.id,
      };
      const mgrInfo = Object.assign(data, attrs);
      const isInserted = await Db.manager.createMngrCtx(id, mgrInfo);
      if (isInserted) {
        const htmlTemplate = getMngrCredentialsTemplate(
          name,
          id,
          userName,
          password,
        );
        sendgrid.setApiKey(config.sendGridKey);
        const emailInfo: MailDataRequired = {
          to: email,
          from: "admin@chaathra.com",
          subject: "Welcome to Chaathra",
          html: htmlTemplate,
        };
        await sendgrid.send(emailInfo);
        return {
          success: true,
          type: true,
          userMessage: "Manager Created Successfully",
        };
      }
    } else
      return {
        success: true,
        type: false,
        userMessage: "Manager Already Exists",
      };
  } else {
    return res.status(403).send({
      success: false,
      type: false,
      userMessage: "Login Required",
    });
  }
}
