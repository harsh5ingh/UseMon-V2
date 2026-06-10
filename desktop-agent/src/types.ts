export type ActivityPayload = {
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

export type NotificationPayload = {
  source: "SLACK" | "TEAMS" | "DISCORD" | "WHATSAPP" | "CHROME" | "OUTLOOK" | "OTHER";
  title: string;
  body?: string;
  receivedAt: string;
};

export type WindowSample = {
  appName: string;
  title: string;
  bundleId?: string;
  pid?: number;
};
