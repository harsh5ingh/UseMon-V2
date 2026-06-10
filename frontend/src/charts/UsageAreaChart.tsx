import { memo } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { UsagePoint } from "@/types/dashboard";

type Props = {
  data: UsagePoint[];
  mode: "area" | "bar";
};

const colors = {
  Chrome: "#4F7CFF",
  "VS Code": "#22C55E",
  Discord: "#8B5CF6",
  Spotify: "#10B981",
  YouTube: "#EF4444"
};

function Chart({ data, mode }: Props) {
  const ChartComponent = mode === "bar" ? BarChart : AreaChart;
  return (
    <div className="h-[310px] w-full">
      <ResponsiveContainer>
        <ChartComponent data={data} margin={{ left: -18, right: 8, top: 10, bottom: 0 }}>
          <defs>
            {Object.entries(colors).map(([name, color]) => (
              <linearGradient key={name} id={`fill-${name}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.42} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#0B1020", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
          {Object.entries(colors).map(([key, color]) =>
            mode === "bar" ? (
              <Bar key={key} dataKey={key} fill={color} radius={[4, 4, 0, 0]} />
            ) : (
              <Area key={key} dataKey={key} type="monotone" stroke={color} fill={`url(#fill-${key})`} strokeWidth={2} />
            )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

export const UsageAreaChart = memo(Chart);
