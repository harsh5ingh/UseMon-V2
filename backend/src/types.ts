export type ProductivityCategory =
  | "WORK"
  | "STUDY"
  | "CODING"
  | "ENTERTAINMENT"
  | "SOCIAL"
  | "SHOPPING"
  | "OTHER";

export type AgentActivityEvent = {
  appName: string;
  bundleId?: string;
  windowTitle: string;
  browserUrl?: string;
  browserTabTitle?: string;
  startedAt: string;
  durationSeconds: number;
  idleSeconds: number;
  keyboardEvents: number;
  mouseEvents: number;
};

export type AgentNotificationEvent = {
  source: "SLACK" | "TEAMS" | "DISCORD" | "WHATSAPP" | "CHROME" | "OUTLOOK" | "OTHER";
  title: string;
  body?: string;
  receivedAt: string;
};

export type RealtimeSnapshot = {
  activeWindow: string;
  currentApp: string;
  windowTitle: string;
  category: ProductivityCategory;
  productivityScore: number;
  sessionLength: number;
  idleSeconds: number;
  browserTabs: Array<{ title: string; url: string; durationSeconds: number }>;
  keyboardActivity: number;
  mouseActivity: number;
  updatedAt: string;
};
