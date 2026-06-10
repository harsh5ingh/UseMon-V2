import { Bell, Gauge, HeartPulse, LineChart, Target } from "lucide-react";

const items = [
  { label: "Dashboard", icon: Gauge, href: "#dashboard" },
  { label: "Trends", icon: LineChart, href: "#usage" },
  { label: "Focus", icon: Target, href: "#focus" },
  { label: "Streak", icon: HeartPulse, href: "#mindfulness" },
  { label: "Alerts", icon: Bell, href: "#notifications" }
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-lg border border-line bg-ink/86 p-1.5 backdrop-blur-glass lg:hidden" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a key={item.label} href={item.href} className="grid min-h-12 place-items-center rounded-md text-white/64 transition hover:bg-white/10 hover:text-white">
            <Icon size={18} aria-hidden />
            <span className="sr-only">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
