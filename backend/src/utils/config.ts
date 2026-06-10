import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  AGENT_TOKEN: z.string().default("change-me-agent-token")
});

export const config = schema.parse(process.env);
