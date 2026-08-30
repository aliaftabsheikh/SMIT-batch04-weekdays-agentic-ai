import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/rating";
import { formatPrice } from "@/lib/format";
import type { FoodItem } from "@/types";

export function FoodCard({ item }: { item: FoodItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1">
      <div className="relative aspect-[4/3]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-cta px-2.5 py-1 font-heading text-sm font-bold text-white shadow-[var(--shadow-btn)]">
          {formatPrice(item.price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg font-bold text-gray-900">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500">{item.restaurant}</p>
        <Rating value={item.rating} reviews={item.reviews} className="mt-2" />
        <Button className="mt-4 w-full rounded-lg bg-cta font-heading font-bold text-white shadow-[var(--shadow-btn)] hover:bg-cta-hover">
          Order Now
        </Button>
      </div>
    </article>
  );
}
