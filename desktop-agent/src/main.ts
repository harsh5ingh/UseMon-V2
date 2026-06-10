import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron";
import { createActivityTracker } from "../trackers/activityTracker.js";
import { createNotificationSampler } from "../notification-monitor/notificationMonitor.js";
import { sendNotification, socket } from "./backendClient.js";

let tray: Tray | undefined;
let tracker: ReturnType<typeof createActivityTracker> | undefined;
let notifications: ReturnType<typeof createNotificationSampler> | undefined;

function createHiddenWindow() {
  const window = new BrowserWindow({
    width: 360,
    height: 220,
    show: false,
    title: "Digital Wellbeing Agent",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  return window;
}

function createTray() {
  const image = nativeImage.createEmpty();
  tray = new Tray(image);
  tray.setToolTip("Digital Wellbeing Agent");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Digital Wellbeing Agent", enabled: false },
      { type: "separator" },
      { label: "Quit", click: () => app.quit() }
    ])
  );
}

app.whenReady().then(() => {
  createHiddenWindow();
  createTray();

  socket.on("connect", () => console.info("Agent socket connected"));
  tracker = createActivityTracker();
  tracker.start();

  notifications = createNotificationSampler((payload) => {
    void sendNotification(payload).catch((error) => console.warn("Unable to send notification", error.message));
  });
  notifications.start();
});

app.on("before-quit", () => {
  tracker?.stop();
  notifications?.stop();
  socket.close();
});
