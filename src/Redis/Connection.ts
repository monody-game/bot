import { debug, error } from "@moon250/yalogger";
import { createClient } from "redis";

debug("Connecting to Redis");

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`,
});
redisClient.on("error", (err) => error("Redis client error :", err));
await redisClient.connect();

export const client = {
  async get<T = any>(key: string): Promise<T> {
    return JSON.parse((await redisClient.get(key)) as string);
  },
  async set(key: string, value: any): Promise<void> {
    await redisClient.set(key, JSON.stringify(value));
  },
};

export const connection = redisClient;
