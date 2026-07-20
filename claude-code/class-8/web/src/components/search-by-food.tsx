"use client";

import Image from "next/image";
import { categories } from "@/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function SearchByFood() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Search by Food
          </h2>
        </div>

        <Carousel opts={{ align: "start" }} className="mt-10">
          <CarouselContent className="-ml-4">
            {categories.map((c) => (
              <CarouselItem
                key={c.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <a
                  href="#"
                  className="group flex flex-col items-center gap-3 text-center"
                >
                  <span className="relative size-28 overflow-hidden rounded-full shadow-[var(--shadow-card)] ring-4 ring-white transition duration-200 group-hover:-translate-y-1 group-hover:ring-brand">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="112px"
                      className="object-cover transition duration-300 group-hover:scale-110"
                    />
                  </span>
                  <span className="font-heading font-bold text-gray-800 group-hover:text-cta">
                    {c.name}
                  </span>
                </a>
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
