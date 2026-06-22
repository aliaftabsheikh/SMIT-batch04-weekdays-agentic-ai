import { Star } from "lucide-react";

export function Rating({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rated ${value} out of 5`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < Math.round(value)
                ? "size-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]"
                : "size-3.5 text-muted-foreground/30"
            }
          />
        ))}
      </div>
      <span className="text-xs font-medium tabular-nums text-muted-foreground">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
