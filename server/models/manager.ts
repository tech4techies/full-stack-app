/** @format */

import { Collection, Db as DbConn } from "mongodb";

export default class Manager {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("manager");
  }
  async getContext(mId: string) {}
  async verify(mId: string, password: string) {}
  async authenticate(token: string) {}
}
