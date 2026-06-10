import { Activity, Keyboard, MousePointer2, Radio, Wifi } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useUIStore } from "@/store/uiStore";
import { formatDuration } from "@/utils";

export function RealtimePanel() {
  const realtime = useUIStore((state) => state.realtime);

  return (
    <aside className="hidden border-l border-line bg-ink/54 p-4 backdrop-blur-glass 2xl:block" aria-label="Real-time utility panel">
      <div className="sticky top-4 space-y-4">
        <div>
          <p className="text-sm text-white/50">Live Monitor</p>
          <h2 className="mt-1 text-xl font-semibold">Current Activity</h2>
        </div>
        <GlassCard interactive={false}>
          <div className="mb-4 flex items-center gap-2 text-success">
            <Radio size={18} aria-hidden />
            <span className="text-sm font-medium">Streaming</span>
          </div>
          <p className="text-sm text-white/48">Active App</p>
          <h3 className="mt-1 text-lg font-semibold">{realtime?.currentApp ?? "Waiting for agent"}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/58">{realtime?.windowTitle ?? "No active window received yet."}</p>
        </GlassCard>

        <GlassCard interactive={false} className="space-y-3">
          {[
            { label: "Session", value: formatDuration(realtime?.sessionLength ?? 0), icon: Activity },
            { label: "Idle", value: formatDuration(realtime?.idleSeconds ?? 0), icon: Wifi },
            { label: "Keys", value: String(realtime?.keyboardActivity ?? 0), icon: Keyboard },
            { label: "Mouse", value: String(realtime?.mouseActivity ?? 0), icon: MousePointer2 }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                <span className="inline-flex items-center gap-2 text-sm text-white/62">
                  <Icon size={16} aria-hidden />
                  {item.label}
                </span>
                <strong className="text-sm">{item.value}</strong>
              </div>
            );
          })}
        </GlassCard>

        <GlassCard interactive={false}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/52">Productivity</span>
            <strong>{realtime?.productivityScore ?? 0}%</strong>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/8">
            <div className="h-full rounded-full bg-success" style={{ width: `${realtime?.productivityScore ?? 0}%` }} />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/42">{realtime?.category ?? "OTHER"}</p>
        </GlassCard>
      </div>
    </aside>
  );
}
