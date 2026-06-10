import type { Request, Response } from "express";
import { z } from "zod";
import { ingestActivity, ingestNotification } from "../services/telemetryService.js";

const activitySchema = z.object({
  appName: z.string().min(1),
  bundleId: z.string().optional(),
  windowTitle: z.string().default("Untitled Window"),
  browserUrl: z.string().url().optional(),
  browserTabTitle: z.string().optional(),
  startedAt: z.string(),
  durationSeconds: z.number().nonnegative(),
  idleSeconds: z.number().nonnegative(),
  keyboardEvents: z.number().int().nonnegative(),
  mouseEvents: z.number().int().nonnegative()
});

const notificationSchema = z.object({
  source: z.enum(["SLACK", "TEAMS", "DISCORD", "WHATSAPP", "CHROME", "OUTLOOK", "OTHER"]),
  title: z.string().min(1),
  body: z.string().optional(),
  receivedAt: z.string()
});

export async function postActivity(req: Request, res: Response) {
  const activity = activitySchema.parse(req.body);
  const snapshot = await ingestActivity(activity);
  res.status(202).json(snapshot);
}

export async function postNotification(req: Request, res: Response) {
  const notification = notificationSchema.parse(req.body);
  await ingestNotification(notification);
  res.status(202).json(notification);
}
