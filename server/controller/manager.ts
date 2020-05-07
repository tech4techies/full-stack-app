/** @format */

import express, { Request, Response } from "express";
import { jaction } from "./custom-express";

export function getManagerRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/login", jaction(verifyLogin));
}

async function verifyLogin(req: Request, res: Response) {}
