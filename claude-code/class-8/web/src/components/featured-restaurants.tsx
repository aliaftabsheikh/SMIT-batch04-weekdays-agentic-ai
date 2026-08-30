import Image from "next/image";
import { Star } from "lucide-react";
import { restaurants } from "@/data";
import { cn } from "@/lib/utils";

export function FeaturedRestaurants() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Featured Restaurants
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {restaurants.map((r) => (
            <article
              key={r.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                {r.discount && (
                  <span className="absolute left-3 top-3 rounded-md bg-cta px-2.5 py-1 font-heading text-sm font-bold text-white shadow-[var(--shadow-btn)]">
                    {r.discount}% off
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gray-100 text-2xl">
                  {r.logo}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-lg font-bold text-gray-900">
                    {r.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-brand text-brand" />
                    <span className="font-semibold text-gray-700">
                      {r.rating}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs font-bold",
                    r.isOpen
                      ? "bg-success/15 text-success"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {r.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
