import type { AgentActivityEvent } from "../types.js";
import { ingestActivity } from "../services/telemetryService.js";

export async function recordAgentActivity(event: AgentActivityEvent) {
  return ingestActivity(event);
}
