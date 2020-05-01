/** @format */
import express from "express";
import { jaction } from "./custom-express";

export function getAuthRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/getToken", getToken)
    .get("/verifyToken", verifyToken);
}
function getToken() {}
function verifyToken() {}
