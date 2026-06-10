import http from "node:http";
import express from "express";
import { apiRoutes } from "./routes/index.js";
import { applySecurity } from "./middleware/security.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { config } from "./utils/config.js";
import { connectRedis } from "./utils/redis.js";
import { createSocketServer } from "./websocket/socketServer.js";
import { scheduleRollups } from "./jobs/rollupJob.js";

const app = express();
const httpServer = http.createServer(app);

applySecurity(app);
app.use(express.json({ limit: "1mb" }));
app.use("/api", apiRoutes);
app.use(errorHandler);

createSocketServer(httpServer);
await connectRedis();
scheduleRollups();

httpServer.listen(config.PORT, () => {
  console.info(`Digital Wellbeing API listening on http://localhost:${config.PORT}`);
});
