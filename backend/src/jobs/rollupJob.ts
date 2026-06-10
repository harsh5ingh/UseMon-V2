import cron from "node-cron";

export function scheduleRollups() {
  cron.schedule("*/15 * * * *", () => {
    console.info(`[rollup] Aggregating activity windows at ${new Date().toISOString()}`);
  });
}
