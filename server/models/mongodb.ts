/** @format */

import { MongoClient } from "mongodb";
import config from "../config";
import Manager from "./manager";
import ManagerActivity from "./managerActivity";
import School from "./school";

export default class MongoDb {
  static manager: Manager;
  static managerActivity: ManagerActivity;
  static school: School;

  static async init() {
    const mclient: MongoClient = await MongoClient.connect(
      config.serviceMongoDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const chaathraDb = mclient.db("chaathra");
    MongoDb.manager = new Manager(chaathraDb);
    MongoDb.managerActivity = new ManagerActivity(chaathraDb);
    MongoDb.school = new School(chaathraDb);
  }
}
