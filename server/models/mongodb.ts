/** @format */

import { MongoClient } from "mongodb";
import config from "../config";
import Manager from "./manager";

export default class MongoDb {
  static manager: Manager;

  static async init() {
    const mclient: MongoClient = await MongoClient.connect(
      config.serviceMongoDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    const chaathraDb = mclient.db("chaathra");
    const manager = new Manager(chaathraDb);
  }
}
