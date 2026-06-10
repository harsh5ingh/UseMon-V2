import { useEffect } from "react";
import { socket } from "@/services/socket";
import { api } from "@/services/api";
import { useUIStore } from "@/store/uiStore";
import type { RealtimeSnapshot } from "@/types/dashboard";

export function useRealtime() {
  const setRealtime = useUIStore((state) => state.setRealtime);

  useEffect(() => {
    let mounted = true;
    api.realtime().then((snapshot) => mounted && setRealtime(snapshot)).catch(() => undefined);

    socket.connect();
    socket.on("activity:update", (snapshot: RealtimeSnapshot) => setRealtime(snapshot));

    return () => {
      mounted = false;
      socket.off("activity:update");
      socket.disconnect();
    };
  }, [setRealtime]);
}
