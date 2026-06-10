import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8080",
      "/socket.io": {
        target: "http://localhost:8080",
        ws: true
      }
    }
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          charts: ["recharts"],
          motion: ["framer-motion", "gsap"]
        }
      }
    }
  }
});
