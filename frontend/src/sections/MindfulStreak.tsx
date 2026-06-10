import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { api } from "@/services/api";
import { cn } from "@/utils";

const levels = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

export function MindfulStreak() {
  const today = new Date();
  const [cursor, setCursor] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const { data } = useQuery({ queryKey: ["streak", cursor], queryFn: () => api.streak(cursor.month, cursor.year) });
  const monthLabel = useMemo(() => new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(cursor.year, cursor.month, 1)), [cursor]);

  function shiftMonth(delta: number) {
    const next = new Date(cursor.year, cursor.month + delta, 1);
    setCursor({ month: next.getMonth(), year: next.getFullYear() });
  }

  return (
    <GlassCard id="mindfulness" interactive={false}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/52">Mindful Streak</p>
          <h2 className="mt-1 text-xl font-semibold">Monthly completion calendar</h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className="grid size-9 place-items-center rounded-lg border border-line bg-white/5">
            <ChevronLeft size={18} />
          </button>
          <span className="min-w-36 text-center text-sm font-medium">{monthLabel}</span>
          <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className="grid size-9 place-items-center rounded-lg border border-line bg-white/5">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="rounded-lg border border-line bg-white/5 p-4">
            <p className="text-sm text-white/50">Current Streak</p>
            <strong className="mt-2 block text-4xl">{data?.currentStreak ?? 0}</strong>
          </div>
          <div className="rounded-lg border border-line bg-white/5 p-4">
            <p className="text-sm text-white/50">Maximum Streak</p>
            <strong className="mt-2 block text-3xl">{data?.maximumStreak ?? 0}</strong>
          </div>
          <div className="rounded-lg border border-line bg-white/5 p-4">
            <p className="text-sm text-white/50">Level</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {levels.map((level) => (
                <span key={level} className={cn("rounded-full border border-line px-3 py-1 text-xs text-white/50", data?.level === level && "border-warning bg-warning/15 text-warning")}>{level}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day} className="text-center text-xs text-white/42">{day}</span>
          ))}
          {Array.from({ length: new Date(cursor.year, cursor.month, 1).getDay() }).map((_, index) => <span key={`blank-${index}`} />)}
          {data?.days.map((day) => (
            <motion.div
              key={day.date}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "grid aspect-square min-h-11 place-items-center rounded-lg border border-line bg-white/5 text-sm transition",
                day.completed && "border-warning/60 bg-warning/14 text-warning shadow-ember",
                day.missed && "bg-danger/10 text-danger"
              )}
              title={day.completed ? "Completed mindful day" : day.missed ? "Missed day" : "Upcoming day"}
            >
              {day.completed ? <Flame size={20} fill="currentColor" aria-label={`Completed ${day.date}`} /> : day.day}
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
