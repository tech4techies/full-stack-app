/** @format */

import { Collection, Db as DbConn } from "mongodb";
import { IMngrActivity } from "../types";
export default class ManagerActivity {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("manager_activity");
  }

  async setActivity(data: IMngrActivity) {
    const { id, activity, ip, iAt } = data;
    const { insertedId } = await this.colConn.insertOne({
      mId: id,
      activity,
      ip,
      iAt,
    });
    if (insertedId) return true;
    else return false;
  }
}
