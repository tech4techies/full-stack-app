/** @format */

import dotenv from "dotenv";
dotenv.config();
const ENV = process.env;
export default {
  port: parseInt(ENV.PORT || "5000", 10),
  serviceMongoDB: ENV.SERVICE_MONGODB || "mongodb://mongodb:27017",
};
