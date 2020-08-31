/** @format */

import { MongoClient } from "mongodb";
import config from "../config";

export default class SchoolDb {
  static async dbConn(schoolId: string) {
    const mclient: MongoClient = await MongoClient.connect(
      config.serviceMongoDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    return mclient.db(schoolId);
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
