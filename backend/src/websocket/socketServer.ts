import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { config } from "../utils/config.js";
import { bindTelemetrySocket, getRealtimeSnapshot } from "../services/telemetryService.js";

export function createSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [config.FRONTEND_URL, "http://localhost:5173"],
      credentials: true
    }
  });

  bindTelemetrySocket(io);

  io.on("connection", (socket) => {
    socket.emit("activity:update", getRealtimeSnapshot());
    socket.on("focus:started", (payload) => socket.broadcast.emit("focus:started", payload));
    socket.on("focus:completed", (payload) => socket.broadcast.emit("focus:completed", payload));
  });

  return io;
}
