/** @format */

import SchoolDb from "./schooldb";

export default class Profile {
  static async setSchoolProfile(schoolId: string, info: any) {
    await (await SchoolDb.profile(schoolId)).insertOne({
      _id: schoolId,
      ...info,
    });
  }
}
