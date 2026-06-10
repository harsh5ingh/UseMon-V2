import {
  Bell,
  Brain,
  CalendarDays,
  Gauge,
  HeartPulse,
  LineChart,
  Moon,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset
} from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/utils";

const items = [
  { label: "Dashboard", icon: Gauge },
  { label: "Trends", icon: LineChart },
  { label: "Focus", icon: Target },
  { label: "Mindfulness", icon: HeartPulse },
  { label: "App Limits", icon: TimerReset },
  { label: "Notifications", icon: Bell },
  { label: "Insights", icon: Brain },
  { label: "Family Safety", icon: ShieldCheck },
  { label: "Settings", icon: Settings }
];

export function Sidebar() {
  const open = useUIStore((state) => state.sidebarOpen);
  const setOpen = useUIStore((state) => state.setSidebarOpen);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  return (
    <motion.aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col border-r border-line bg-ink/82 p-4 backdrop-blur-glass transition lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
        open && "translate-x-0"
      )}
      aria-label="Primary navigation"
    >
      <div className="mb-7 flex items-center gap-3 px-2">
        <div className="grid size-10 place-items-center rounded-lg bg-primary shadow-glow">
          <Sparkles size={20} aria-hidden />
        </div>
        <div>
          <p className="text-sm text-white/52">Digital Wellbeing</p>
          <h1 className="text-lg font-semibold">Activity Monitor</h1>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-white/68 transition hover:bg-white/8 hover:text-white",
                index === 0 && "bg-white/10 text-white"
              )}
            >
              <Icon size={18} className="transition group-hover:scale-110" aria-hidden />
              {item.label}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={toggleDarkMode}
        className="mt-4 flex min-h-11 items-center justify-between rounded-lg border border-line bg-white/5 px-3 text-sm text-white/72 transition hover:bg-white/10 hover:text-white"
      >
        <span className="inline-flex items-center gap-3">
          <Moon size={18} aria-hidden />
          Dark Mode
        </span>
        <span className="h-5 w-9 rounded-full bg-primary p-0.5">
          <span className="block size-4 rounded-full bg-white" />
        </span>
      </button>
    </motion.aside>
  );
}
