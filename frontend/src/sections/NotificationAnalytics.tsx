import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GlassCard } from "@/components/GlassCard";
import { api } from "@/services/api";

export function NotificationAnalytics() {
  const { data } = useQuery({ queryKey: ["notifications"], queryFn: api.notifications });

  return (
    <GlassCard id="notifications" interactive={false}>
      <p className="text-sm text-white/52">Notification Analytics</p>
      <h2 className="mt-1 text-xl font-semibold">Interruption sources</h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="space-y-2">
          {data?.sources.map((source) => (
            <div key={source.source} className="flex items-center justify-between rounded-lg border border-line bg-white/5 px-3 py-2">
              <span className="text-sm">{source.source}</span>
              <span className="text-sm text-white/58">{source.count} · {source.trend > 0 ? "+" : ""}{source.trend}%</span>
            </div>
          ))}
        </div>
        <div className="h-64 min-w-0">
          <ResponsiveContainer>
            <BarChart data={data?.hourly ?? []} margin={{ left: -22, right: 8 }}>
              <XAxis dataKey="hour" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0B1020", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
              <Bar dataKey="notifications" fill="#F59E0B" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}
