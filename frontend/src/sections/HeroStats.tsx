import { Bell, Clock, MousePointerClick, Target } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { GlassCard } from "@/components/GlassCard";
import type { Summary } from "@/types/dashboard";
import { formatDuration } from "@/utils";

export function HeroStats({ summary }: { summary?: Summary }) {
  const cards = [
    {
      label: "Screen Time",
      value: summary?.screenSeconds ?? 0,
      helper: `${summary ? Math.round(((summary.screenSeconds - summary.yesterdayScreenSeconds) / summary.yesterdayScreenSeconds) * 100) : 0}% vs yesterday`,
      icon: Clock,
      format: formatDuration
    },
    { label: "Pickups", value: summary?.pickups ?? 0, helper: `${summary?.pickupTrend ?? 0}% trend`, icon: MousePointerClick },
    { label: "Focus Time", value: summary?.focusSeconds ?? 0, helper: `${summary?.focusTrend ?? 0}% more deep work`, icon: Target, format: formatDuration },
    { label: "Notifications", value: summary?.notifications ?? 0, helper: `${summary?.notificationTrend ?? 0}% interruption trend`, icon: Bell }
  ];

  return (
    <section id="dashboard" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <GlassCard key={card.label} className="relative overflow-hidden">
            <motion.div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-3xl" animate={{ opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 4 + index, repeat: Infinity }} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm text-white/54">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold">
                  <AnimatedCounter value={card.value} formatter={card.format} />
                </p>
                <p className="mt-2 text-sm text-white/48">{card.helper}</p>
              </div>
              <div className="grid size-11 place-items-center rounded-lg border border-line bg-white/8">
                <Icon size={20} aria-hidden />
              </div>
            </div>
          </GlassCard>
        );
      })}
    </section>
  );
}
