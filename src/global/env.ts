import { load } from "ts-dotenv";

interface ENV {
  PORT: number;
  MONGO_URI: string;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  REDIS_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  SESSION_SECRET: string;
  NODE_ENV: string;
}

export const {
  PORT,
  MONGO_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
  SESSION_SECRET,
  NODE_ENV,
}: ENV = load({
  PORT: Number,
  MONGO_URI: String,
  MONGO_USER: String,
  MONGO_PASSWORD: String,
  REDIS_PASSWORD: String,
  REDIS_HOST: String,
  REDIS_PORT: Number,
  SESSION_SECRET: String,
  NODE_ENV: String,
});
