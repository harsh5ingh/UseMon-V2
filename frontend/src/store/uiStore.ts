import { create } from "zustand";
import type { RealtimeSnapshot } from "@/types/dashboard";

type TimerMode = 25 | 50 | number;

type UIState = {
  sidebarOpen: boolean;
  darkMode: boolean;
  fullscreenFocus: boolean;
  timerMode: TimerMode;
  realtime?: RealtimeSnapshot;
  setSidebarOpen: (value: boolean) => void;
  toggleDarkMode: () => void;
  setFullscreenFocus: (value: boolean) => void;
  setTimerMode: (mode: TimerMode) => void;
  setRealtime: (snapshot: RealtimeSnapshot) => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  darkMode: true,
  fullscreenFocus: false,
  timerMode: 25,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setFullscreenFocus: (fullscreenFocus) => set({ fullscreenFocus }),
  setTimerMode: (timerMode) => set({ timerMode }),
  setRealtime: (realtime) => set({ realtime })
}));
