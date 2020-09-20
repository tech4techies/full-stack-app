/** @format */

import { Collection, Db as DbConn } from "mongodb";
import { ISchoolDetails } from "../types";
import { genId } from "../utils/generate-random";
export default class School {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("school");
  }

  convertMongoId(obj: any) {
    const { _id: id, ...rest } = obj;
    return { id, ...rest };
  }

  async save(id: string, info: ISchoolDetails) {
    await this.colConn.insertOne({
      _id: id,
      ...info,
    });
  }

  async checkExists(inp: string) {
    const row = await this.colConn.findOne(
      {
        $or: [{ _id: inp }, { pocEmail: inp }, { pocMobile: inp }],
      },
      { projection: { _id: 1 } }
    );
    if (!row) return null;
    else return this.convertMongoId(row);
  }

  async checkIdExists(id: string) {
    const row = await this.colConn.findOne({
      _id: id,
    });
    if (!row) return false;
    else return true;
  }

  async getCtx(pocEmail: string, pocMobile: string) {
    const row = await this.colConn.findOne({
      $or: [{ pocMobile }, { pocEmail }],
    });
    return row;
  }
}
