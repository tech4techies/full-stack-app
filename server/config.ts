/** @format */

import dotenv from "dotenv";
dotenv.config();
const ENV = process.env;
export default {
  port: parseInt(ENV.PORT || "5000", 10),
  tokenSecret: ENV.TOKEN_SECRET || "dummy123",
  domainURL: ENV.DOMAIN_URL,
};
