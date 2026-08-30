"use client";

import { popularItems } from "@/data";
import { FoodCard } from "@/components/food-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function PopularItems() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Popular Items
        </h2>

        <Carousel opts={{ align: "start" }} className="mt-10">
          <CarouselContent className="-ml-4">
            {popularItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <FoodCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden size-11 border-none bg-white text-cta shadow-[var(--shadow-card)] hover:bg-cta hover:text-white sm:flex" />
          <CarouselNext className="hidden size-11 border-none bg-white text-cta shadow-[var(--shadow-card)] hover:bg-cta hover:text-white sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
