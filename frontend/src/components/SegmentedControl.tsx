import { cn } from "@/utils";

type Props<T extends string | number> = {
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
  ariaLabel: string;
};

export function SegmentedControl<T extends string | number>({ value, options, onChange, ariaLabel }: Props<T>) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-white/5 p-1" role="tablist" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={String(option.value)}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "min-h-9 rounded-md px-3 text-sm font-medium text-white/62 transition",
            value === option.value && "bg-white/14 text-white shadow"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
