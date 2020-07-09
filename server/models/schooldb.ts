/** @format */

import { MongoClient } from "mongodb";
import config from "../config";
import Profile from "./school-profile";

export default class SchoolDb {
  static profileCol: Profile;
  static async dbConn(schoolId: string) {
    const mclient: MongoClient = await MongoClient.connect(
      config.serviceMongoDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    return mclient.db(schoolId);
  }

  static async profile(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("profile");
  }

  static async students(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("students");
  }

  static async staff(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("staff");
  }

  static async classes(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("classes");
  }

  static async assignmentConfig(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("assignment_config");
  }

  static async assignmentLog(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("assignment_log");
  }

  static async results(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("results");
  }
}
