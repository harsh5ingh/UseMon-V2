import { motion } from "framer-motion";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export function HeatmapChart() {
  const cells = Array.from({ length: 7 * 12 }, (_, index) => {
    const value = Math.abs(Math.sin(index * 0.72)) * 100;
    return { id: index, value };
  });

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-[1.5rem_repeat(12,minmax(0,1fr))] gap-1 text-xs text-white/42">
        <span />
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} className="text-center">{index + 1}</span>
        ))}
      </div>
      {days.map((day, row) => (
        <div key={`${day}-${row}`} className="grid grid-cols-[1.5rem_repeat(12,minmax(0,1fr))] gap-1">
          <span className="text-xs text-white/42">{day}</span>
          {cells.slice(row * 12, row * 12 + 12).map((cell) => (
            <motion.div
              key={cell.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-md border border-white/5"
              style={{ background: `rgba(79, 124, 255, ${0.08 + cell.value / 190})` }}
              title={`${Math.round(cell.value)}% focus intensity`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
