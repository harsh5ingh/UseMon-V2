import { Redis } from "ioredis";
import { config } from "./config.js";

export const redis = new Redis(config.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  enableReadyCheck: false,
  retryStrategy: () => null
});

redis.on("error", () => {
  // Redis is optional in local/demo mode. Startup reports availability once via connectRedis.
});

export async function connectRedis() {
  try {
    if (redis.status === "wait") {
      await redis.connect();
    }
  } catch {
    console.warn("Redis unavailable; continuing with in-memory socket state.");
  }
}
