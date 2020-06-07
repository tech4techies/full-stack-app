/** @format */

import MongoDb from "../models/mongodb";
import { jaction } from "../utils/custom-express";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import Encrypt from "../utils/encrypt";

export function getCookieRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/userType", jaction(getCookieUserType));
}

async function getCookieUserType(req: Request) {
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
  if (token) {
    const tokenInfo = jwt.verify(token, config.jwtSecret) as any;
    return { success: true, info: tokenInfo };
  } else return { success: false, info: null };
}
