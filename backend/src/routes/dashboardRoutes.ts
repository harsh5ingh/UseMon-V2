import { Router } from "express";
import {
  getAppLimits,
  getApps,
  getInsights,
  getNotifications,
  getRealtime,
  getStreak,
  getSummary,
  getTimeline,
  getUsage
} from "../controllers/dashboardController.js";

export const dashboardRoutes = Router();

dashboardRoutes.get("/summary", getSummary);
dashboardRoutes.get("/apps", getApps);
dashboardRoutes.get("/usage", getUsage);
dashboardRoutes.get("/timeline", getTimeline);
dashboardRoutes.get("/notifications", getNotifications);
dashboardRoutes.get("/limits", getAppLimits);
dashboardRoutes.get("/streak", getStreak);
dashboardRoutes.get("/insights", getInsights);
dashboardRoutes.get("/realtime", getRealtime);
