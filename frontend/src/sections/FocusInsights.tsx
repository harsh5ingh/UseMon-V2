import { useQuery } from "@tanstack/react-query";
import { Brain } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { api } from "@/services/api";

export function FocusInsights() {
  const { data = [] } = useQuery({ queryKey: ["insights"], queryFn: api.insights });

  return (
    <GlassCard id="insights" interactive={false}>
      <p className="text-sm text-white/52">Focus Insights AI</p>
      <h2 className="mt-1 text-xl font-semibold">Generated summaries</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {data.map((insight) => (
          <div key={insight} className="flex gap-3 rounded-lg border border-line bg-white/5 p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/14 text-primary">
              <Brain size={18} aria-hidden />
            </div>
            <p className="text-sm leading-6 text-white/72">{insight}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
