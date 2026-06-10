import type { NextFunction, Request, Response } from "express";
import { config } from "../utils/config.js";

export function agentAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-agent-token");
  if (token !== config.AGENT_TOKEN) {
    res.status(401).json({ error: "Invalid desktop agent token" });
    return;
  }
  next();
}
