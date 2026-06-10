import { getActiveWindowSample } from "../active-window/activeWindowTracker.js";
import { getBrowserMetadata } from "../browser-monitor/browserMonitor.js";
import { sampleHumanActivity, resetHumanActivityCounters } from "../focus-engine/focusEngine.js";
import { sendActivity } from "../src/backendClient.js";
import { config } from "../src/config.js";

export function createActivityTracker() {
  let timer: NodeJS.Timeout | undefined;
  let currentKey = "";
  let startedAt = new Date();

  async function tick() {
    const sample = await getActiveWindowSample();
    const key = `${sample.appName}:${sample.title}`;
    if (key !== currentKey) {
      currentKey = key;
      startedAt = new Date();
      resetHumanActivityCounters();
    }

    const human = await sampleHumanActivity();
    const browser = getBrowserMetadata(sample);

    await sendActivity({
      appName: sample.appName,
      bundleId: sample.bundleId,
      windowTitle: sample.title,
      ...browser,
      startedAt: startedAt.toISOString(),
      durationSeconds: Math.floor((Date.now() - startedAt.getTime()) / 1000),
      idleSeconds: human.idleSeconds,
      keyboardEvents: human.keyboardEvents,
      mouseEvents: human.mouseEvents
    }).catch((error) => {
      console.warn("Unable to send activity sample", error.message);
    });
  }

  return {
    start() {
      void tick();
      timer = setInterval(() => void tick(), config.TRACKING_INTERVAL_MS);
    },
    stop() {
      if (timer) clearInterval(timer);
    }
  };
}
