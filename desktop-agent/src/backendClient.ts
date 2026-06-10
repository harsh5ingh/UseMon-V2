import axios from "axios";
import { io } from "socket.io-client";
import { config } from "./config.js";
import type { ActivityPayload, NotificationPayload } from "./types.js";

const api = axios.create({
  baseURL: `${config.BACKEND_URL}/api/agent`,
  timeout: 5000,
  headers: {
    "x-agent-token": config.AGENT_TOKEN
  }
});

export const socket = io(config.BACKEND_URL, {
  transports: ["websocket"],
  auth: { token: config.AGENT_TOKEN }
});

export async function sendActivity(payload: ActivityPayload) {
  await api.post("/activity", payload);
}

export async function sendNotification(payload: NotificationPayload) {
  await api.post("/notification", payload);
}
