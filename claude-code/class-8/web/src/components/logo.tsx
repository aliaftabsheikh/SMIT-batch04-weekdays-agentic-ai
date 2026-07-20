import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-heading text-2xl font-bold",
        onDark ? "text-white" : "text-gray-900",
        className
      )}
    >
      <span className="grid size-9 place-items-center rounded-lg bg-cta text-white shadow-[var(--shadow-btn)]">
        <UtensilsCrossed className="size-5" />
      </span>
      Food
      <span className="-ml-2 text-cta">wagon</span>
    </span>
  );
}
