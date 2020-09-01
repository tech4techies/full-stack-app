/** @format */

import { Collection, Db as DbConn } from "mongodb";
import { ISchoolDetails } from "../types";
import { genId } from "../utils/generate-random";
export default class School {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("school");
  }

  async save(id: string, info: ISchoolDetails) {
    await this.colConn.insertOne({
      _id: id,
      ...info,
    });
  }

  async checkIdExists(id: string) {
    const row = await this.colConn.findOne({
      _id: id,
    });
    if (!row) return false;
    else return true;
  }

  async getCtx(id: string, pocEmail: string, pocMobile: string) {
    const row = await this.colConn.findOne({
      $or: [{ pocMobile }, { pocEmail }],
    });
    return row;
  }
}
