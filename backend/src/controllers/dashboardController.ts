import type { Request, Response } from "express";
import {
  appLimits,
  dashboardSummary,
  insights,
  notificationAnalytics,
  streakMonth,
  timeline,
  trackedApps,
  usageSeries
} from "../services/mockData.js";
import { getRealtimeSnapshot, getRecentNotifications } from "../services/telemetryService.js";

export function getSummary(_req: Request, res: Response) {
  res.json(dashboardSummary());
}

export function getApps(_req: Request, res: Response) {
  res.json(trackedApps);
}

export function getUsage(req: Request, res: Response) {
  res.json(usageSeries(String(req.query.range ?? "daily")));
}

export function getTimeline(_req: Request, res: Response) {
  res.json(timeline());
}

export function getNotifications(_req: Request, res: Response) {
  res.json({ ...notificationAnalytics(), recent: getRecentNotifications() });
}

export function getAppLimits(_req: Request, res: Response) {
  res.json(appLimits());
}

export function getStreak(req: Request, res: Response) {
  const month = Number(req.query.month ?? new Date().getMonth());
  const year = Number(req.query.year ?? new Date().getFullYear());
  res.json(streakMonth(month, year));
}

export function getInsights(_req: Request, res: Response) {
  res.json(insights());
}

export function getRealtime(_req: Request, res: Response) {
  res.json(getRealtimeSnapshot());
}
