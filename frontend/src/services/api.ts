import type {
  AppLimit,
  AppUsage,
  NotificationAnalytics,
  RealtimeSnapshot,
  StreakMonth,
  Summary,
  TimelineHour,
  UsagePoint
} from "@/types/dashboard";

const API_URL = import.meta.env.VITE_API_URL ?? "";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}/api${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  summary: () => request<Summary>("/dashboard/summary"),
  apps: () => request<AppUsage[]>("/dashboard/apps"),
  usage: (range: string) => request<UsagePoint[]>(`/dashboard/usage?range=${range}`),
  timeline: () => request<TimelineHour[]>("/dashboard/timeline"),
  notifications: () => request<NotificationAnalytics>("/dashboard/notifications"),
  limits: () => request<AppLimit[]>("/dashboard/limits"),
  streak: (month: number, year: number) => request<StreakMonth>(`/dashboard/streak?month=${month}&year=${year}`),
  insights: () => request<string[]>("/dashboard/insights"),
  realtime: () => request<RealtimeSnapshot>("/dashboard/realtime")
};
