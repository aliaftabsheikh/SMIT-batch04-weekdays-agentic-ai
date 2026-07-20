import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-brand">
      {/* decorative food peeking in from the sides */}
      <div className="pointer-events-none absolute -left-16 -top-10 hidden size-64 opacity-90 lg:block">
        <Image src="/foodwagon/salad-bowl.png" alt="" fill className="rounded-full object-cover" />
      </div>
      <div className="pointer-events-none absolute -bottom-12 -right-12 hidden size-72 opacity-90 lg:block">
        <Image src="/foodwagon/pumpkin-soup.png" alt="" fill className="rounded-full object-cover" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24">
        <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
          Are you ready to order with the best deals?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Fresh meals from your favorite restaurants, delivered fast.
        </p>
        <Button className="mt-8 rounded-lg bg-white px-8 py-6 font-heading text-base font-bold text-cta shadow-[var(--shadow-btn)] hover:bg-gray-100">
          Proceed To Order
        </Button>
      </div>
    </section>
  );
}
