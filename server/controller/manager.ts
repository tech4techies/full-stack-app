/** @format */

import express, { Request, Response } from "express";
import config from "../config";
import { jaction } from "../utils/custom-express";
import Encrypt from "../utils/encrypt";

export function getManagerRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/login", jaction(verifyLogin))
    .post("/createManager", jaction(createManager));
}

async function verifyLogin(req: Request, res: Response) {}

async function createManager(req: Request, res: Response) {
  const { data } = req.body;
  const { password } = data;
  data.password = Encrypt.hashPassword(password, config.secretKey);
  // await MongoDb.manager.createContext(data);
  return {
    success: true,
    userMessage: "Manager Created Successfully",
    password: data.password,
  };
}
