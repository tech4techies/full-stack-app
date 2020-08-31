/** @format */

import express, { Request } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import MongoDb from "../models/mongodb";
import { jaction } from "../utils/express-utils";
import Encrypt from "../utils/encrypt";
import crypto from "crypto";

export function getValidateRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/cookie/manager", jaction(managerCookie));
}

async function managerCookie(req: Request) {
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const { id, userType } = info;
    if (userType === "manager") {
      info.user = Encrypt.hash(info.user, config.secretKey);
      const exists = await MongoDb.manager.checkMngrExists(id, info.user);
      if (exists)
        return { success: true, type: true, data: { userType: "manager" } };
      else
        return {
          success: true,
          type: false,
          userMessage: "Login Required",
          data: { userType: null },
        };
    } else {
      return {
        success: true,
        type: false,
        userMessage: "Login Required",
        data: { userType: null },
      };
    }
  } else
    return {
      success: true,
      type: true,
      userMessage: "Login Required",
      data: { userType: null },
    };
}

export function authenticate(cookie: string) {
  let token: null | string = null;
  const { jwtTokenAlgo, jwtTokenKey, jwtTokenIV } = config;
  if (cookie) {
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
        const decipher = crypto.createDecipheriv(
          jwtTokenAlgo,
          jwtTokenKey,
          jwtTokenIV
        );
        const decryptedToken = Buffer.from(
          Buffer.concat([
            decipher.update(Buffer.from(token, "hex")),
            decipher.final(),
          ]).toString(),
          "base64"
        ).toString("ascii");
        tokenInfo = jwt.verify(decryptedToken, config.jwtSecret) as any;
        return { success: true, info: tokenInfo };
      } catch (err) {
        return { success: false, info: null };
      }
    } else return { success: false, info: null };
  } else return { success: false, info: null };
}
