/** @format */

import express from "express";
import config from "./config";
import { getManagerRouter } from "./controller/manager/manager";
import { getSchoolRouter } from "./controller/school";
import { getValidateRouter } from "./controller/validate";
import MongoDb from "./models/mongodb";
import { notFound } from "./utils/express-utils";
const getAPIRouter = () =>
  express
    .Router({ mergeParams: true })
    .use("/validate", getValidateRouter())
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
      console.log(`Server Running on Port ${config.port}`)
    );
  function stopServer() {
    console.log("stopping server");
    app.close();
  }
  process.once("SIGTERM", stopServer);
  process.once("SIGINT", stopServer);
}
main().catch((err) => console.log("app.init.failed", err));
