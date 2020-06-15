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
import { reset } from "nodemon";

export function getManagerRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/login", jaction(verifyLogin))
    .post("/changeDefault", jaction(changeDefault))
    .post("/createManager", jaction(createManager))
    .get("/profile", jaction(getProfile));
}

async function getActivities(req: Request, res: Response) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const { id } = info;

    const from = new Date(
      DateTime.local().startOf("day").toISO(),
    ).toISOString();
    const to = new Date().toISOString();
  } else {
    res.send(500).send({
      success: true,
      type: false,
      loginRequired: true,
    });
  }
}

async function recordActivity(req: Request, id: string, activity: string) {
  const activityData: IMngrActivity = {
    id,
    ip: getIp(req),
    browser: getUserBrowser(req),
    iAt: new Date().toISOString(),
    os: getUserOS(req),
    userAgent: req.headers["user-agent"] || "",
    activity,
  };
  await Db.managerActivity.set(activityData);
}

async function verifyLogin(req: Request, res: Response) {
  const { userName, password } = req.body;
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
    const jwtRes = jwt.sign(
      { id: rows.id, user: req.body.userName, userType: "manager" },
      config.jwtSecret,
      signOpts,
    );
    const luxonTime = new Date(
      DateTime.fromISO(new Date().toISOString()).plus({ hours: 24 }).toISO(),
    );
    const expiresAt = new Date(luxonTime);
    res.cookie("ch-token", jwtRes, {
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

async function getProfile(req: Request, res: Response) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  const indianCurrentTime = DateTime.utc()
    .plus({ hours: 5 })
    .plus({ minutes: 30 });
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  console.log("start of Day ---", startOfDay);
  const s = DateTime.fromMillis(startOfDay).toString();
  console.log("s -----", s);
  console.log("indianCurrent Time ----", indianCurrentTime);
  if (success && info) {
    const { id } = info;
    const row = await Db.manager.getCtx(id);
    return { success: true, type: true, data: row };
  } else {
    res.status(500).send({
      success: true,
      type: false,
      loginRequired: true,
    });
  }
}

async function changeDefault(req: Request, res: Response) {
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
      await recordActivity(req, info.id, "Default Password Changed");
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
    return res.status(500).send({
      success: true,
      type: false,
      loginRequired: true,
    });
}

async function createManager(req: Request) {
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
    const isInserted = await Db.manager.createMngrCtx(id, data);
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
}
