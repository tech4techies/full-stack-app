/** @format */

import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import express, { Request, Response } from "express";
import config from "../config";
import MongoDb from "../models/mongodb";
import { jaction } from "../utils/custom-express";
import Encrypt, { ClientEncrypt } from "../utils/encrypt";
import { genId, genMngrPass, genNum } from "../utils/generate-random";
import { getMngrCredentialsTemplate } from "../utils/get-templates";
import jwt, { SignOptions } from "jsonwebtoken";

export function getManagerRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/login", jaction(verifyLogin))
    .post("/createManager", jaction(createManager));
}

async function verifyLogin(req: Request, res: Response) {
  const { userName, password } = req.body;
  const data = { userName, password };
  data.password = Encrypt.hash(password, config.secretKey);
  data.userName = Encrypt.hash(userName, config.secretKey);
  const rows = await MongoDb.manager.verifyLogin(data.userName, data.password);
  if (rows.isVerified) {
    const signOpts: SignOptions = {
      expiresIn: "24h",
    };
    const jwtRes = jwt.sign(data, config.jwtSecret, signOpts);
    console.log("jwtRes ---", jwtRes);
  }
}

async function createManager(req: Request, res: Response) {
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
        type: "success",
        userMessage: "Manager Created Successfully",
      };
    }
  } else
    return {
      success: true,
      type: "warn",
      userMessage: "Manager Already Exists",
    };
}
