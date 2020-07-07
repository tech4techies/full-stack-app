/** @format */

import { MongoClient } from "mongodb";
import config from "../config";

export default class SchoolDb {
  async dbConn(schoolId: string) {
    const mclient: MongoClient = await MongoClient.connect(
      config.serviceMongoDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    return mclient.db(schoolId);
  }

  async adminInfo(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("admin_info");
  }

  async profile(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("profile");
  }

  async students(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("students");
  }

  async staff(schoolId: string) {
    return await (await this.dbConn(schoolId)).collection("staff");
  }

  async classes(schoolId: string) {
    await (await this.dbConn(schoolId)).collection("classes");
  }

  async assignmentConfig(schoolId: string) {
    await (await this.dbConn(schoolId)).collection("assignment_config");
  }

  async assignmentLog(schoolId: string) {
    await (await this.dbConn(schoolId)).collection("assignment_log");
  }

  async results(schoolId: string) {
    await (await this.dbConn(schoolId)).collection("results");
  }
}
