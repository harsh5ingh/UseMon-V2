import compression from "compression";
import cors from "cors";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { config } from "../utils/config.js";

export function applySecurity(app: Express) {
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  app.use(
    cors({
      origin: [config.FRONTEND_URL, "http://localhost:5173"],
      credentials: true
    })
  );
  app.use(
    rateLimit({
      windowMs: 60_000,
      max: 240,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
}
