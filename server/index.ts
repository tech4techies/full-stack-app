/** @format */

import express from "express";
import { notFound } from "./controller/custom-express";
import config from "./config";
import { getAuthRouter } from "./controller/auth";
const getAPIRouter = () =>
  express
    .Router({ mergeParams: true })
    .use("/api/auth", getAuthRouter())
    .use(notFound);

const ONE_MIN = 1000 * 60;
async function main() {
  const app = express()
    .use(express.json({ limit: "2mb" }))
    .use("sms/dist", express.static("../client/dist", { maxAge: ONE_MIN }))
    .use("api/sms/", getAPIRouter())
    .use(notFound)
    .listen(config.port, () =>
      console.log(`listening on http://localhost:${config.port}`),
    );
  function stopServer() {
    console.log("stopping server");
    app.close();
  }
  process.once("SIGTERM", stopServer);
  process.once("SIGINT", stopServer);
}
main().catch((err) => console.log("app.init.failed", err));
