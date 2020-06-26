/** @format */

import dotenv from "dotenv";
dotenv.config();
const ENV = process.env;
const cfg = {
  port: parseInt(ENV.PORT || "5000", 10),
  clientSecretKey: ENV.CLIENT_SECRET_KEY || "",
  secretKey: ENV.SECRET_KEY || "",
  serviceMongoDB: ENV.SERVICE_MONGODB || "mongodb://localhost:27017",
  sendGridKey: ENV.SEND_GRID_KEY || "",
  jwtSecret: ENV.JWT_SECRET || "",
  jwtTokenKey: ENV.JWT_TOKEN_KEY || "",
  jwtTokenAlgo: ENV.JWT_TOKEN_ALGO || "",
  jwtTokenIV: ENV.JWT_TOKEN_IV || "",
};

export default cfg;
