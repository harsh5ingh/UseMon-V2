import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GlassCard } from "@/components/GlassCard";
import { SegmentedControl } from "@/components/SegmentedControl";
import { HeatmapChart } from "@/charts/HeatmapChart";
import { UsageAreaChart } from "@/charts/UsageAreaChart";
import { api } from "@/services/api";

const ranges = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" }
] as const;

export function UsageAnalytics() {
  const [range, setRange] = useState<(typeof ranges)[number]["value"]>("daily");
  const [mode, setMode] = useState<"area" | "bar">("area");
  const { data = [] } = useQuery({ queryKey: ["usage", range], queryFn: () => api.usage(range) });

  return (
    <section id="usage" className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(20rem,0.8fr)]">
      <GlassCard interactive={false}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white/52">App Usage Analytics</p>
            <h2 className="mt-1 text-xl font-semibold">Usage by app and period</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <SegmentedControl ariaLabel="Usage range" value={range} options={[...ranges]} onChange={setRange} />
            <SegmentedControl ariaLabel="Chart style" value={mode} options={[{ label: "Area", value: "area" }, { label: "Bar", value: "bar" }]} onChange={setMode} />
          </div>
        </div>
        <UsageAreaChart data={data} mode={mode} />
      </GlassCard>

      <GlassCard interactive={false}>
        <p className="text-sm text-white/52">Focus Heatmap</p>
        <h2 className="mt-1 text-xl font-semibold">Weekly intensity</h2>
        <div className="mt-5">
          <HeatmapChart />
        </div>
      </GlassCard>
    </section>
  );
}
