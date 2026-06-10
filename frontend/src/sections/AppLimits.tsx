import { useQuery } from "@tanstack/react-query";
import { GlassCard } from "@/components/GlassCard";
import { api } from "@/services/api";
import { formatDuration, percent, cn } from "@/utils";

export function AppLimits() {
  const { data = [] } = useQuery({ queryKey: ["limits"], queryFn: api.limits });

  return (
    <GlassCard id="app-limits" interactive={false}>
      <p className="text-sm text-white/52">App Limits</p>
      <h2 className="mt-1 text-xl font-semibold">Daily boundaries</h2>
      <div className="mt-5 space-y-4">
        {data.map((app) => {
          const width = percent(app.usageSeconds, app.limitSeconds);
          return (
            <div key={app.name} className="rounded-lg border border-line bg-white/5 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium">{app.name}</h3>
                  <p className="text-sm text-white/48">{formatDuration(app.usageSeconds)} used · {formatDuration(app.remainingSeconds)} left</p>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-xs", app.exceeded ? "bg-danger/15 text-danger" : app.warning ? "bg-warning/15 text-warning" : "bg-success/15 text-success")}>
                  {app.exceeded ? "Exceeded" : app.warning ? "Warning" : "Healthy"}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/8">
                <div className={cn("h-full rounded-full transition-all", app.exceeded ? "bg-danger" : app.warning ? "bg-warning" : "bg-primary")} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
