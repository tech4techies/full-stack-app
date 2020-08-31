/** @format */

import { Collection, Db as DbConn } from "mongodb";
import { ISchoolDetails } from "../types";
export default class School {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("school");
  }

  async set(id: string, info: ISchoolDetails) {
    await this.colConn.insertOne({
      _id: id,
      ...info,
    });
  }
}
