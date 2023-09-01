import express, { NextFunction, Request, Response } from "express";
import { PORT } from "@global/env";
import { mongoConnect } from "@configs/mongo";
import session from "@middlewares/session";
import { authRouter } from "@routes/index";
import Logging from "@lib/Logging";
import { logger } from "@middlewares/logger";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(logger);
app.use("/", authRouter);

const start = async () => {
  mongoConnect().then((res) => {
    if (res) {
      Logging.info("MongoDB is connected successfully 🎉");
      app.listen(PORT, () => {
        Logging.info(`DEV✨: http://localhost:${PORT}`);
      });
    }
  });
};

start();
