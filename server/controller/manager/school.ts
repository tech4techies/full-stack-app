import express, { Request, Response } from "express";
import { jaction } from "../../utils/express-utils";
import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import { genId, genToken, genPass } from "../../utils/generate-random";
import Encrypt, { ClientEncrypt } from "../../utils/encrypt";
import clientConfig from "../../../client/src/config";
import config from "../../config";
import { userType } from "../../types";
import { getSchoolRegistrationTemplate } from "../../utils/get-templates";
import Db from "../../models/mongodb";
import SchoolDb from "../../models/schooldb";

export function getManagerSchoolRouter() {
  return express
    .Router({ mergeParams: true })
    .post("/create", jaction(createSchool));
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
async function createSchool(req: Request, res: Response) {
  const { body } = req;
  const schoolId = genId(8);
  const { dbDetails, template } = generateDefaultAdminCredentials();
  const schoolInfo = Object.assign(body, dbDetails);
  await Db.school.set(schoolId, schoolInfo);
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
