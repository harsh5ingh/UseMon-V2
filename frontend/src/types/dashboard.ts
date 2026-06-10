export type Summary = {
  screenSeconds: number;
  yesterdayScreenSeconds: number;
  pickups: number;
  pickupTrend: number;
  focusSeconds: number;
  focusTrend: number;
  notifications: number;
  notificationTrend: number;
  productivityScore: number;
};

export type AppUsage = {
  name: string;
  color: string;
  category: string;
  seconds: number;
  yesterday: number;
};

export type UsagePoint = {
  label: string;
  Chrome: number;
  "VS Code": number;
  Discord: number;
  Spotify: number;
  YouTube: number;
};

export type TimelineHour = {
  hour: number;
  label: string;
  events: Array<{
    id: string;
    app: string;
    type: "idle" | "focus" | "notification" | "switch";
    minute: number;
    durationMinutes: number;
    title: string;
  }>;
};

export type RealtimeSnapshot = {
  activeWindow: string;
  currentApp: string;
  windowTitle: string;
  category: string;
  productivityScore: number;
  sessionLength: number;
  idleSeconds: number;
  browserTabs: Array<{ title: string; url: string; durationSeconds: number }>;
  keyboardActivity: number;
  mouseActivity: number;
  updatedAt: string;
};

export type AppLimit = {
  name: string;
  limitSeconds: number;
  usageSeconds: number;
  remainingSeconds: number;
  exceeded: boolean;
  warning: boolean;
};

export type NotificationAnalytics = {
  sources: Array<{ source: string; count: number; trend: number }>;
  hourly: Array<{ hour: string; notifications: number }>;
  recent: Array<{ source: string; title: string; body?: string; receivedAt: string }>;
};

export type StreakMonth = {
  month: number;
  year: number;
  currentStreak: number;
  maximumStreak: number;
  level: string;
  days: Array<{ date: string; day: number; inMonth: boolean; completed: boolean; missed: boolean }>;
};
