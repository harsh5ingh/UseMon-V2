import { addDays, format, startOfMonth } from "date-fns";
import type { RealtimeSnapshot } from "../types.js";

export const trackedApps = [
  { name: "Chrome", color: "#4F7CFF", category: "WORK", seconds: 13860, yesterday: 11740 },
  { name: "VS Code", color: "#22C55E", category: "CODING", seconds: 11220, yesterday: 9860 },
  { name: "Discord", color: "#8B5CF6", category: "SOCIAL", seconds: 3240, yesterday: 4410 },
  { name: "Spotify", color: "#22C55E", category: "ENTERTAINMENT", seconds: 6120, yesterday: 5520 },
  { name: "Slack", color: "#F59E0B", category: "WORK", seconds: 4860, yesterday: 5380 },
  { name: "YouTube", color: "#EF4444", category: "ENTERTAINMENT", seconds: 2880, yesterday: 2420 }
];

export const realtimeSnapshot: RealtimeSnapshot = {
  activeWindow: "Visual Studio Code",
  currentApp: "VS Code",
  windowTitle: "Digital Wellbeing Dashboard - RopeTimer.tsx",
  category: "CODING",
  productivityScore: 94,
  sessionLength: 2840,
  idleSeconds: 42,
  browserTabs: [
    { title: "React Query Docs", url: "https://tanstack.com/query", durationSeconds: 930 },
    { title: "Apple HIG", url: "https://developer.apple.com/design", durationSeconds: 430 }
  ],
  keyboardActivity: 382,
  mouseActivity: 143,
  updatedAt: new Date().toISOString()
};

export function dashboardSummary() {
  const screenSeconds = trackedApps.reduce((sum, app) => sum + app.seconds, 0);
  const yesterday = trackedApps.reduce((sum, app) => sum + app.yesterday, 0);
  return {
    screenSeconds,
    yesterdayScreenSeconds: yesterday,
    pickups: 87,
    pickupTrend: -8,
    focusSeconds: 9360,
    focusTrend: 21,
    notifications: 143,
    notificationTrend: -16,
    productivityScore: 78
  };
}

export function usageSeries(range = "daily") {
  const points = range === "yearly" ? 12 : range === "monthly" ? 30 : range === "weekly" ? 7 : 24;
  return Array.from({ length: points }, (_, index) => ({
    label: range === "daily" ? `${index}:00` : `D${index + 1}`,
    Chrome: Math.round(45 + Math.sin(index / 2) * 22 + index * 0.6),
    "VS Code": Math.round(38 + Math.cos(index / 3) * 18 + index * 0.4),
    Discord: Math.round(12 + Math.max(0, Math.sin(index)) * 18),
    Spotify: Math.round(20 + Math.sin(index / 4) * 10),
    YouTube: Math.round(10 + Math.max(0, Math.cos(index / 2)) * 16)
  }));
}

export function timeline() {
  const apps = ["Chrome", "VS Code", "Slack", "Spotify", "Discord", "Idle"];
  return Array.from({ length: 17 }, (_, index) => {
    const hour = index + 8;
    return {
      hour,
      label: `${hour}:00`,
      events: Array.from({ length: 3 }, (_, eventIndex) => {
        const app = apps[(index + eventIndex) % apps.length];
        return {
          id: `${hour}-${eventIndex}`,
          app,
          type: app === "Idle" ? "idle" : eventIndex === 1 ? "focus" : eventIndex === 2 ? "notification" : "switch",
          minute: eventIndex * 18 + (index % 4) * 2,
          durationMinutes: app === "Idle" ? 14 : 18 + ((index + eventIndex) % 4) * 7,
          title: app === "Idle" ? "AFK / screen dimmed" : `${app} activity`
        };
      })
    };
  });
}

export function notificationAnalytics() {
  const sources = ["Slack", "Teams", "Discord", "WhatsApp", "Chrome", "Outlook"];
  return {
    sources: sources.map((source, index) => ({
      source,
      count: [42, 19, 31, 24, 17, 9][index],
      trend: [8, -4, 12, -7, -10, 2][index]
    })),
    hourly: Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour}:00`,
      notifications: Math.max(0, Math.round(3 + Math.sin(hour / 1.8) * 7 + (hour > 9 && hour < 18 ? 8 : 0)))
    }))
  };
}

export function appLimits() {
  return ["YouTube", "Chrome", "Discord", "Instagram", "Slack"].map((name, index) => {
    const limits = [3600, 21600, 5400, 2700, 7200];
    const usage = [2880, 13860, 3240, 3180, 4860][index];
    return {
      name,
      limitSeconds: limits[index],
      usageSeconds: usage,
      remainingSeconds: Math.max(0, limits[index] - usage),
      exceeded: usage > limits[index],
      warning: usage / limits[index] >= 0.8
    };
  });
}

export function streakMonth(month = new Date().getMonth(), year = new Date().getFullYear()) {
  const first = startOfMonth(new Date(year, month, 1));
  const days = Array.from({ length: 31 }, (_, index) => {
    const date = addDays(first, index);
    const inMonth = date.getMonth() === month;
    const completed = inMonth && ![3, 9, 17, 24].includes(index) && date <= new Date();
    return {
      date: format(date, "yyyy-MM-dd"),
      day: date.getDate(),
      inMonth,
      completed,
      missed: inMonth && !completed && date < new Date()
    };
  }).filter((day) => day.inMonth);
  return {
    month,
    year,
    currentStreak: 12,
    maximumStreak: 38,
    level: "Gold",
    days
  };
}

export function insights() {
  return [
    "Your Chrome usage increased 18% compared to yesterday.",
    "You are most productive between 9 AM and 11 AM.",
    "Notifications reduced your focus by 23 minutes today.",
    "Coding sessions are 21% longer when Slack is muted."
  ];
}
