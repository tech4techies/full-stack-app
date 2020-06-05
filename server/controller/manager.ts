/** @format */

import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import express, { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";
import MongoDb from "../models/mongodb";
import { jaction } from "../utils/custom-express";
import Encrypt, { ClientEncrypt } from "../utils/encrypt";
import { genId, genMngrPass, genNum } from "../utils/generate-random";
import { getMngrCredentialsTemplate } from "../utils/get-templates";

export function getManagerRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/login", jaction(verifyLogin))
    .post("/changeDefault", jaction(changeDefault))
    .post("/createManager", jaction(createManager));
}

async function verifyLogin(req: Request, res: Response) {
  const { userName, password } = req.body;
  const data = { userName, password };
  data.password = Encrypt.hash(password, config.secretKey);
  data.userName = Encrypt.hash(userName, config.secretKey);
  const rows = await MongoDb.manager.verifyLogin(data.userName, data.password);
  if (rows.isVerified && !rows.disabled) {
    const signOpts: SignOptions = {
      expiresIn: "24h",
    };
    const jwtRes = jwt.sign(
      { id: rows.id, user: req.body.userName },
      config.jwtSecret,
      signOpts,
    );
    res.cookie("ch-token", jwtRes);
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

async function changeDefault(req: Request) {
  const { password } = req.body;
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const encPass = Encrypt.hash(password, config.secretKey);
    const { id, user } = info;
    if (id && user) {
      const dbUsername = Encrypt.hash(user, config.secretKey);
      await MongoDb.manager.changeDefault(id, encPass, dbUsername);
      return {
        success: true,
        type: true,
        isRedirect: true,
        userMessage: "Password Changed Successfully",
      };
    } else
      return {
        success: true,
        type: false,
        isRedirect: true,
        userMessage: "Invalid Request",
      };
  } else
    return {
      success: true,
      type: false,
      isRedirect: true,
      userMessage: "Invalid Request",
    };
}

async function createManager(req: Request) {
  const { data } = req.body;
  const { email, name } = data;
  const isExists = await MongoDb.manager.findMngr(email);
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
    const isInserted = await MongoDb.manager.createMngrCtx(id, data);
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

function authenticate(cookie: string) {
  let token: null | string = null;
  cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .forEach((cookie) => {
      const cookieInfo = cookie.split(/=/);
      if (/ch-token/.test(cookieInfo[0])) token = cookieInfo[1];
    });
  if (token) {
    const tokenInfo = jwt.verify(token, config.jwtSecret) as any;
    return { success: true, info: tokenInfo };
  } else return { success: false, info: null };
}
