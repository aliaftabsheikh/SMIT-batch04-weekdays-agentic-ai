import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/products";

export function Price({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span className={cn("font-semibold tabular-nums", className)}>
      {formatPrice(value)}
    </span>
  );
}
