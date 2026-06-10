import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { RealtimePanel } from "@/sections/RealtimePanel";
import { useUIStore } from "@/store/uiStore";

export function AppShell({ children }: { children: ReactNode }) {
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] 2xl:grid-cols-[18rem_minmax(0,1fr)_23rem]">
      <Sidebar />
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-line bg-ink/70 px-4 backdrop-blur-glass lg:hidden">
          <button type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)} className="grid size-10 place-items-center rounded-lg border border-line bg-white/5">
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold">Digital Wellbeing</span>
          <span className="size-10" />
        </header>
        <main className="mx-auto w-full max-w-[1660px] px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
      </div>
      <RealtimePanel />
      <BottomNav />
    </div>
  );
}
