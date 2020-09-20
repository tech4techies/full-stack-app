import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import express, { Request, Response } from "express";
import clientConfig from "../../../client/src/config";
import config from "../../config";
import MongoDb from "../../models/mongodb";
import Db from "../../models/mongodb";
import { userType } from "../../types";
import Encrypt, { ClientEncrypt } from "../../utils/encrypt";
import { jaction } from "../../utils/express-utils";
import { genId, genPass, genToken } from "../../utils/generate-random";
import { getSchoolRegistrationTemplate } from "../../utils/get-templates";
import { authenticate } from "../validate";

export function getManagerSchoolRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/create", jaction(createSchool))
    .post("/edit", jaction(checkSchoolExists))
    .get("/edit/:id", jaction(getSchoolInfo));
}

async function getSchoolInfo(req: Request, res: Response) {
  const { id } = req.params;
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  const row = await MongoDb.school.getCtxById(id);
}

async function checkSchoolExists(req: Request, res: Response) {
  const {
    body: { input },
  } = req;
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    const row = await MongoDb.school.checkExists(input);
    if (!row)
      return {
        success: true,
        type: false,
        userMessage:
          "No School exists with the details provided, Please provide valid details.",
      };
    else return { success: true, type: true, data: { ...row, valid: true } };
  } else {
    res.status(401).send({
      success: false,
      type: false,
      userMessage: "Login Required",
    });
  }
}

function encodeToken(token: string) {
  return Buffer.from(
    Buffer.from(token, "utf8")
      .toString("base64")
      .replace("=", "")
      .split("")
      .reverse()
      .join(""),
    "utf8"
  ).toString("hex");
}

function decodeToken(token: string) {
  return Buffer.from(
    Buffer.from(token, "hex").toString("utf8").split("").reverse().join("") +
      "=",
    "base64"
  ).toString("utf8");
}

function generateDefaultAdminCredentials() {
  const adminToken = genToken(32);
  const studentToken = encodeToken(genToken(32));
  const staffToken = encodeToken(genToken(32));
  const encodedAdminToken = encodeToken(adminToken);
  const userName = genId(8, true);
  const encUserName = Encrypt.hash(userName, adminToken);
  const password = genPass(userType.admin);
  const encPassword = Encrypt.hash(
    ClientEncrypt.hashPassword(password, clientConfig.adminSecretKey),
    adminToken
  );
  return {
    dbDetails: {
      userName: encUserName,
      password: encPassword,
      adminToken: encodedAdminToken,
      studentToken,
      staffToken,
      isDefault: true,
      disabled: false,
    },
    template: {
      userName,
      password,
    },
  };
}

async function genNewIdAndCheck() {
  const schoolIds: string[] = [];
  let newSchoolId: string = "";
  for (let i = 0; i < 10; i += 1) schoolIds.push(genId(8));
  for (const schoolId of schoolIds) {
    const exists = await Db.school.checkIdExists(schoolId);
    if (!exists) {
      newSchoolId = schoolId;
      break;
    }
  }
  return newSchoolId.length > 0 ? newSchoolId : "12345678";
}

async function createSchool(req: Request, res: Response) {
  const { body } = req;
  const cookie = req.headers.cookie as string;
  const { success, info } = authenticate(cookie);
  if (success && info) {
    let schoolId = genId(8);
    const { dbDetails, template } = generateDefaultAdminCredentials();
    const schoolInfo = Object.assign(body, dbDetails);
    const exists = await Db.school.checkIdExists(schoolId);
    if (exists) schoolId = await genNewIdAndCheck();
    const ctx = await Db.school.getCtx(schoolId, body.pocEmail, body.pocMobile);
    if (ctx)
      return {
        success: true,
        type: false,
        userMessage: "School already exists with the details provided.",
      };
    else {
      await Db.school.save(schoolId, schoolInfo);
      const htmlTemplate = getSchoolRegistrationTemplate(
        template.userName,
        schoolId,
        template.password,
        body.name
      );
      sendgrid.setApiKey(config.sendGridKey);
      const emailInfo: MailDataRequired = {
        to: body.pocEmail,
        from: {
          email: "donotreply-welcome@chaathra.com",
          name: "Admin-Chaathra",
        },
        subject: "Welcome to Chaathra",
        html: htmlTemplate,
      };
      await sendgrid.send(emailInfo);
      return {
        success: true,
        type: true,
        userMessage: "School created and data saved successfully",
      };
    }
  } else
    res.status(401).send({
      success: false,
      type: false,
      userMessage: "Login Required",
    });
}
