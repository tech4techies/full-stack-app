/** @format */

import express, { Request } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import MongoDb from "../models/mongodb";
import { jaction } from "../utils/custom-express";
import Encrypt from "../utils/encrypt";

export function getValidateRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/cookie/manager", jaction(validateManager));
}

async function validateManager(req: Request) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const { id, userType } = info;
    if (userType === "manager") {
      info.user = Encrypt.hash(info.user, config.secretKey);
      const exists = await MongoDb.manager.checkMngrExists(id, info.user);
      if (exists) return { success: true, userType: "manager" };
      else return { success: true, userType: null };
    }
  } else return { success: true, userType: null };
}

export function authenticate(cookie: string) {
  let token: null | string = null;
  cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .forEach((cookie) => {
      const cookieInfo = cookie.split(/=/);
      if (/ch-token/.test(cookieInfo[0])) token = cookieInfo[1];
    });
  let tokenInfo = null;
  if (token) {
    try {
      tokenInfo = jwt.verify(token, config.jwtSecret) as any;
      return { success: true, info: tokenInfo };
    } catch (err) {
      return { success: false, info: null };
    }
  } else return { success: false, info: null };
}
