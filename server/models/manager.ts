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
  async getCtx(id: string) {
    const row = await this.colConn.findOne(
      { _id: id },
      {
        projection: {
          name: 1,
          mobile: 1,
          dob: 1,
          email: 1,
          _id: 0,
          isSuperAdmin: 1,
        },
      },
    );
    return row;
  }

  async setCtxByEmail(email: string, info: any) {
    await this.colConn.updateOne(
      { email },
      {
        $set: {
          ...info,
        },
      },
    );
  }
  async getCtxByEmail(email: string) {
    const row = await this.colConn.findOne(
      { email },
      {
        projection: {
          name: 1,
          mobile: 1,
          email: 1,
          gender: 1,
          dob: 1,
          _id: 0,
          isSuperAdmin: 1,
          disabled: 1,
        },
      },
    );
    return row;
  }
  async checkMngrExists(id: string, userName: string): Promise<boolean> {
    const rows = await this.colConn.findOne({ _id: id, userName });
    if (rows) return true;
    else return false;
  }
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
