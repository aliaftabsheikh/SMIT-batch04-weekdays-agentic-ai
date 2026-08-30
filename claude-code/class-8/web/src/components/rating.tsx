import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviews,
  className,
}: {
  value: number;
  reviews?: number;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Rated ${value} out of 5`}
    >
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < rounded
                ? "fill-brand text-brand"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-700">{value}</span>
      {reviews !== undefined && (
        <span className="text-sm text-gray-500">({reviews})</span>
      )}
    </div>
  );
}
