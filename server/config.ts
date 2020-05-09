/** @format */

import dotenv from "dotenv";
dotenv.config();
const ENV = process.env;
export default {
  port: parseInt(ENV.PORT || "5000", 10),
  clientSecretKey: "",
  secretKey: ENV.secretKey || "",
  serviceMongoDB: ENV.SERVICE_MONGODB || "mongodb://localhost:27017",
  sendGridKey: ENV.sendGridKey || "",
  jwtSecret: ENV.jwtSecret || "",
};
