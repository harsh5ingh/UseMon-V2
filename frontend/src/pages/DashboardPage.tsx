import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ActivityTimeline } from "@/sections/ActivityTimeline";
import { AppLimits } from "@/sections/AppLimits";
import { FocusInsights } from "@/sections/FocusInsights";
import { FocusTimer } from "@/sections/FocusTimer";
import { HeroStats } from "@/sections/HeroStats";
import { MindfulStreak } from "@/sections/MindfulStreak";
import { NotificationAnalytics } from "@/sections/NotificationAnalytics";
import { UsageAnalytics } from "@/sections/UsageAnalytics";
import { api } from "@/services/api";
import { fadeUp, stagger } from "@/animations/variants";

export function DashboardPage() {
  const { data: summary } = useQuery({ queryKey: ["summary"], queryFn: api.summary });

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-5">
      <motion.section variants={fadeUp} className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm text-white/52">macOS Activity Monitoring</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-normal sm:text-4xl">
            Digital wellbeing command center
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
            Real-time screen time, app usage, focus sessions, notification analytics, and streaks in one responsive glass interface.
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white/5 px-4 py-3 text-sm text-white/60 backdrop-blur-glass">
          Productivity Score <strong className="ml-2 text-white">{summary?.productivityScore ?? 0}%</strong>
        </div>
      </motion.section>

      <motion.div variants={fadeUp}><HeroStats summary={summary} /></motion.div>
      <motion.div variants={fadeUp}><UsageAnalytics /></motion.div>
      <motion.div variants={fadeUp}><FocusTimer /></motion.div>
      <motion.div variants={fadeUp} className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <MindfulStreak />
        <AppLimits />
      </motion.div>
      <motion.div variants={fadeUp}><ActivityTimeline /></motion.div>
      <motion.div variants={fadeUp}><NotificationAnalytics /></motion.div>
      <motion.div variants={fadeUp}><FocusInsights /></motion.div>
    </motion.div>
  );
}
