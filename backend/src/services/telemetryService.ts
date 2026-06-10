import type { Server } from "socket.io";
import type { AgentActivityEvent, AgentNotificationEvent, RealtimeSnapshot } from "../types.js";
import { classifyActivity } from "./classifier.js";
import { realtimeSnapshot } from "./mockData.js";
import { prisma } from "../utils/prisma.js";
import { redis } from "../utils/redis.js";

let io: Server | null = null;
let currentSnapshot: RealtimeSnapshot = realtimeSnapshot;
const recentNotifications: AgentNotificationEvent[] = [];

export function bindTelemetrySocket(server: Server) {
  io = server;
}

export function getRealtimeSnapshot() {
  return currentSnapshot;
}

export function getRecentNotifications() {
  return recentNotifications.slice(-25).reverse();
}

export async function ingestActivity(event: AgentActivityEvent) {
  const classification = classifyActivity(event.appName, event.windowTitle, event.browserUrl);
  currentSnapshot = {
    activeWindow: event.windowTitle,
    currentApp: event.appName,
    windowTitle: event.windowTitle,
    category: classification.category,
    productivityScore: classification.score,
    sessionLength: event.durationSeconds,
    idleSeconds: event.idleSeconds,
    browserTabs: event.browserUrl
      ? [{ title: event.browserTabTitle ?? event.windowTitle, url: event.browserUrl, durationSeconds: event.durationSeconds }]
      : currentSnapshot.browserTabs,
    keyboardActivity: event.keyboardEvents,
    mouseActivity: event.mouseEvents,
    updatedAt: new Date().toISOString()
  };

  try {
    await redis.set("telemetry:current", JSON.stringify(currentSnapshot), "EX", 60);
  } catch {
    // Redis is optional for local development; Socket.io still carries live updates.
  }

  try {
    const user = await prisma.user.upsert({
      where: { email: "local@digital-wellbeing.app" },
      update: {},
      create: { email: "local@digital-wellbeing.app", name: "Local User" }
    });
    const app = await prisma.application.upsert({
      where: { name: event.appName },
      update: { bundleId: event.bundleId, category: classification.category },
      create: {
        name: event.appName,
        bundleId: event.bundleId,
        category: classification.category,
        iconColor: classification.category === "CODING" ? "#22C55E" : classification.category === "ENTERTAINMENT" ? "#EF4444" : "#4F7CFF"
      }
    });
    await prisma.activitySession.create({
      data: {
        userId: user.id,
        appId: app.id,
        windowTitle: event.windowTitle,
        browserUrl: event.browserUrl,
        browserTabTitle: event.browserTabTitle,
        category: classification.category,
        productivityScore: classification.score,
        startedAt: new Date(event.startedAt),
        endedAt: new Date(),
        durationSeconds: event.durationSeconds,
        idleSeconds: event.idleSeconds,
        keyboardEvents: event.keyboardEvents,
        mouseEvents: event.mouseEvents
      }
    });
  } catch (error) {
    console.warn("Skipping activity persistence", error instanceof Error ? error.message : error);
  }

  io?.emit("activity:update", currentSnapshot);
  return currentSnapshot;
}

export async function ingestNotification(event: AgentNotificationEvent) {
  recentNotifications.push(event);
  if (recentNotifications.length > 100) {
    recentNotifications.shift();
  }
  io?.emit("notification:new", event);
  try {
    const user = await prisma.user.upsert({
      where: { email: "local@digital-wellbeing.app" },
      update: {},
      create: { email: "local@digital-wellbeing.app", name: "Local User" }
    });
    await prisma.notification.create({
      data: {
        userId: user.id,
        source: event.source,
        title: event.title,
        body: event.body,
        receivedAt: new Date(event.receivedAt)
      }
    });
  } catch (error) {
    console.warn("Skipping notification persistence", error instanceof Error ? error.message : error);
  }
  return event;
}
