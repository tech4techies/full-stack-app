/** @format */

import { Collection, Db as DbConn } from "mongodb";
import { IManagerContext } from "../types";
import generate from "nanoid/generate";
export default class Manager {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("manager");
  }
  async getContext(mId: string) {}
  async verify(mId: string, password: string) {}
  async authenticate(token: string) {}
  async createContext(mangerInfo: IManagerContext) {
    const id = generate("0123456789", 8);
    const ctxObj = {
      _id: id,
      ...mangerInfo,
    };
    console.log("ctxObj ---", ctxObj);
  }
}
