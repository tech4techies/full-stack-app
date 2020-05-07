/** @format */
import express from "express";
import { jaction } from "./custom-express";

export function getSchoolRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/getToken", getToken)
    .get("/verifyToken", verifyToken)
    .post("/login", verifyLogin);
}
function getToken() {}
function verifyToken() {}
function verifyLogin() {}
