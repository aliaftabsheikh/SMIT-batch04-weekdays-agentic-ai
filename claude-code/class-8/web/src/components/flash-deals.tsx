import Image from "next/image";
import { flashDeals } from "@/data";

export function FlashDeals() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {flashDeals.map((deal) => (
            <article
              key={deal.id}
              className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              </div>

              <span className="absolute left-3 top-3 rounded-md bg-cta px-2.5 py-1 font-heading text-sm font-bold text-white shadow-[var(--shadow-btn)]">
                {deal.discount}% off
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
                <h3 className="font-heading text-base font-bold sm:text-lg">
                  {deal.name}
                </h3>
                <p className="text-xs text-white/80 sm:text-sm">
                  {deal.restaurant} · Free Delivery
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
