import { redisClient } from "@configs/redis";
import { SESSION_SECRET, NODE_ENV } from "@global/env";
import RedisStore from "connect-redis";
import session from "express-session";

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  saveUninitialized: false,
  name: "user-session",
  resave: false,
  cookie: {
    sameSite: "lax",
    httpOnly: true,
    secure: NODE_ENV !== "prod" ? false : true,
  },
});
