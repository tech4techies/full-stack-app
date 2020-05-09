/** @format */

import dotenv from "dotenv";
dotenv.config();
const ENV = process.env;
export default {
  port: parseInt(ENV.PORT || "5000", 10),
  clientSecretKey:
    "{[!qaz109@wer283#sxcd476$rty%5fvbg&yhnju*mkiop(ASDZXMKOILPNJUYHBQWERFCVGT)-+=/]}",
  secretKey:
    ENV.secretKey || "[{1092qaz#mlpo*k3487nx:s$wed%c65nji!vfr@uhbg)t(}}]",
  serviceMongoDB: ENV.SERVICE_MONGODB || "mongodb://localhost:27017",
  sendGridKey:
    ENV.sendGridKey ||
    "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",
  jwtSecret:
    ENV.jwtSecret ||
    "[{<__ZAQ!1qaWSXzxMLPsw2CDE@#3edRFVNKOIJcB>__.,:/?|-__<__GTvfr4$%YH5tgbnUhy6+^&7ujmk=i8*ik9)lo0(p>}]",
};
