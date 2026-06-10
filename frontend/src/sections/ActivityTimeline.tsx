import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { api } from "@/services/api";
import { cn } from "@/utils";

const colors = {
  switch: "bg-primary",
  focus: "bg-success",
  notification: "bg-warning",
  idle: "bg-white/24"
};

export function ActivityTimeline() {
  const { data = [] } = useQuery({ queryKey: ["timeline"], queryFn: api.timeline });

  return (
    <GlassCard id="trends" interactive={false}>
      <div className="mb-5">
        <p className="text-sm text-white/52">macOS Style Activity Timeline</p>
        <h2 className="mt-1 text-xl font-semibold">24-hour activity flow</h2>
      </div>
      <div className="scrollbar-thin overflow-x-auto pb-2">
        <div className="min-w-[980px] space-y-3">
          {data.map((hour) => (
            <div key={hour.hour} className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3">
              <span className="text-sm text-white/44">{hour.label}</span>
              <div className="relative h-12 rounded-lg border border-line bg-white/[0.035]">
                {hour.events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: `${Math.max(6, event.durationMinutes)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={cn("absolute top-2 h-8 rounded-md px-2 py-1 text-xs text-white shadow", colors[event.type])}
                    style={{ left: `${event.minute * 1.62}%` }}
                    title={event.title}
                  >
                    <span className="line-clamp-1">{event.app}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
