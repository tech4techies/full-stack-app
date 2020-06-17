/** @format */

import { Collection, Db as DbConn } from "mongodb";
import { IMngrActivity } from "../types";
export default class ManagerActivity {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("manager_activity");
  }

  async set(data: IMngrActivity) {
    const { id, activity, ip, iAt, browser, os, userAgent } = data;
    await this.colConn.insertOne({
      mId: id,
      activity,
      ip,
      userAgent,
      browser,
      os,
      iAt,
    });
  }

  async getList(mId: string, from: string, to: string) {
    return await this.colConn
      .find(
        { mId, iAt: { $gte: from, $lt: to } },
        { projection: { activity: 1, browser: 1, os: 1, iAt: 1, _id: 0 } },
      )
      .toArray();
  }
}
