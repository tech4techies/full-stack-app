/** @format */

import { Collection, Db as DbConn } from "mongodb";
import { IManagerContext } from "../types";
export default class Manager {
  colConn: Collection;
  constructor(dbConn: DbConn) {
    this.colConn = dbConn.collection("manager");
  }
  convertMongoId(obj: any) {
    const { _id: id, ...rest } = obj;
    return { id, ...rest };
  }
  async getCtx(mId: string) {}
  async findMngr(email: string): Promise<boolean> {
    const rows = await this.colConn.findOne(
      { email },
      { projection: { email: 1, userName: 1 } },
    );
    if (rows) return true;
    else return false;
  }
  async changeDefault(id: string, password: string, userName: string) {
    await this.colConn.updateOne(
      { _id: id, userName },
      { $set: { password, isDefault: false } },
    );
    return true;
  }
  async verifyLogin(userName: string, password: string) {
    const rows = await this.colConn.findOne(
      {
        userName,
        password,
      },
      { projection: { _id: 1, isDefault: 1, disabled: 1 } },
    );
    if (rows) {
      const res = this.convertMongoId(rows);
      return { isVerified: true, ...res };
    } else return { isVerfied: false };
  }
  async createMngrCtx(id: string, mangerInfo: IManagerContext) {
    const ctxObj = {
      _id: id,
      ...mangerInfo,
      isDefault: true,
    };
    await this.colConn.insertOne(ctxObj);
    return true;
  }
}
