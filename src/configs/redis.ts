import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "@global/env";
import { Redis } from "ioredis";
import Logging from "lib/Logging";

export const redisClient = new Redis({
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  port: REDIS_PORT,
});

redisClient.on("error", function (err) {
  Logging.error("Failed to connect Redis: . " + err);
});
redisClient.on("connect", function () {
  Logging.info("Redis is connected successfully 🎉");
});
