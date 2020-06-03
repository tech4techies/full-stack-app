/** @format */

import express from "express";
import { notFound } from "./utils/custom-express";
import config from "./config";
import { getSchoolRouter } from "./controller/school";
import MongoDb from "./models/mongodb";
import { getManagerRouter } from "./controller/manager";
const getAPIRouter = () =>
  express
    .Router({ mergeParams: true })
    .use("/school", getSchoolRouter())
    .use("/manager", getManagerRouter())
    .use(notFound);

const ONE_MIN = 1000 * 60;
async function main() {
  await MongoDb.init();
  const app = express()
    .use(express.json({ limit: "2mb" }))
    .use("/sms/api", getAPIRouter())
    .use(notFound)
    .listen(config.port, () =>
      console.log(`Server Running on Port ${config.port}`),
    );
  function stopServer() {
    console.log("stopping server");
    app.close();
  }
  process.once("SIGTERM", stopServer);
  process.once("SIGINT", stopServer);
}
main().catch((err) => console.log("app.init.failed", err));
