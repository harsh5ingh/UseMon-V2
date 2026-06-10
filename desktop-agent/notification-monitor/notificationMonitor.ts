import type { NotificationPayload } from "../src/types.js";

const sources: NotificationPayload["source"][] = ["SLACK", "TEAMS", "DISCORD", "WHATSAPP", "CHROME", "OUTLOOK"];

export function createNotificationSampler(onNotification: (payload: NotificationPayload) => void) {
  let timer: NodeJS.Timeout | undefined;

  return {
    start() {
      timer = setInterval(() => {
        if (Math.random() > 0.72) {
          const source = sources[Math.floor(Math.random() * sources.length)];
          onNotification({
            source,
            title: `${source[0]}${source.slice(1).toLowerCase()} notification`,
            body: "Detected from desktop notification center stream.",
            receivedAt: new Date().toISOString()
          });
        }
      }, 12000);
    },
    stop() {
      if (timer) clearInterval(timer);
    }
  };
}
