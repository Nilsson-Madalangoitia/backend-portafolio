import "./paths";
import config from "@infrastructure/config";
import mongoose from "mongoose";
import { server } from "@container/server";
import "reflect-metadata";

if (!config.MONGO_URI) {
  throw new Error("ERROR: URL DATABASE IF NOT EXISTS");
}

mongoose
  .connect(config.MONGO_URI)
  .then(() => server.start())
  .catch(console.log);