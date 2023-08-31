import mongoose from "mongoose";
import { MONGO_URI, MONGO_USER, MONGO_PASSWORD } from "@global/env";
import Logging from "lib/Logging";

export const mongoConnect = async () => {
  try {
    return await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}`
    );
  } catch (err) {
    Logging.error(`Mongo is not connected: ${err}`);
    process.exit(1);
  }
};
