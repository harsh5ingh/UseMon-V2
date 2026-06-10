import { Router } from "express";
import { postActivity, postNotification } from "../controllers/agentController.js";
import { agentAuth } from "../middleware/agentAuth.js";

export const agentRoutes = Router();

agentRoutes.post("/activity", agentAuth, postActivity);
agentRoutes.post("/notification", agentAuth, postNotification);
