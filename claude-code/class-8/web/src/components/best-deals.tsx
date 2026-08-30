import Image from "next/image";
import { bestDeals } from "@/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BestDeals() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {bestDeals.map((deal, i) => (
          <div
            key={deal.id}
            className="grid overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)] md:grid-cols-2"
          >
            {/* Text */}
            <div
              className={cn(
                "flex flex-col justify-center gap-5 p-8 md:p-14",
                i % 2 === 1 && "md:order-2"
              )}
            >
              <p className="font-heading text-lg font-semibold text-gray-500">
                {deal.eyebrow}
              </p>
              <h3 className="font-heading text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                {deal.title}{" "}
                <span className="text-cta">{deal.highlight}</span>
              </h3>
              <div>
                <Button className="rounded-lg bg-cta px-8 py-6 font-heading text-base font-bold text-white shadow-[var(--shadow-btn)] hover:bg-cta-hover">
                  Proceed to order
                </Button>
              </div>
            </div>

            {/* Image */}
            <div
              className={cn(
                "relative min-h-64 md:min-h-80",
                i % 2 === 1 && "md:order-1"
              )}
            >
              <Image
                src={deal.image}
                alt={`${deal.title} ${deal.highlight}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
