import { z } from "zod";

const schema = z.object({
  BACKEND_URL: z.string().default("http://localhost:8080"),
  AGENT_TOKEN: z.string().default("change-me-agent-token"),
  TRACKING_INTERVAL_MS: z.coerce.number().default(2000),
  SCREENSHOT_INTERVAL_MS: z.coerce.number().default(300000)
});

export const config = schema.parse(process.env);
