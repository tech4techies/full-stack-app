/** @format */

import dotenv from "dotenv";
dotenv.config();
const ENV = process.env;
export default {
  port: parseInt(ENV.PORT || "5000", 10),
  secretKey:
    ENV.secretKey || "[{1092qaz#mlpo*k3487nx:s$wed%c65nji!vfr@uhbg)t(}}]",
  serviceMongoDB: ENV.SERVICE_MONGODB || "mongodb://localhost:27017",
};
