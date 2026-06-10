import { Router } from "express";
import { agentRoutes } from "./agentRoutes.js";
import { dashboardRoutes } from "./dashboardRoutes.js";

export const apiRoutes = Router();

apiRoutes.get("/health", (_req, res) => {
  res.json({ ok: true, service: "digital-wellbeing-backend", time: new Date().toISOString() });
});

apiRoutes.use("/dashboard", dashboardRoutes);
apiRoutes.use("/agent", agentRoutes);
