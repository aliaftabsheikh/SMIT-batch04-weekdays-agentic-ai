"use client";

import { useState } from "react";
import Image from "next/image";
import { Bike, MapPin, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Mode = "delivery" | "pickup";

export function Hero() {
  const [mode, setMode] = useState<Mode>("delivery");

  return (
    <section className="relative overflow-hidden bg-brand">
      {/* soft radial glow behind the bowl */}
      <div className="pointer-events-none absolute -right-40 top-0 hidden size-[720px] rounded-full bg-white/15 blur-3xl lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:pb-24 lg:pt-40">
        {/* Copy + search */}
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="font-heading text-5xl font-bold leading-[1.05] text-white drop-shadow-sm sm:text-6xl xl:text-7xl">
            Are you starving?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/90 lg:mx-0">
            Within a few clicks, find meals that are accessible near you
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] lg:mx-0">
            {/* Mode tabs */}
            <div className="flex gap-6 border-b border-gray-200 px-2">
              <TabButton
                active={mode === "delivery"}
                onClick={() => setMode("delivery")}
                icon={<Bike className="size-4" />}
                label="Delivery"
              />
              <TabButton
                active={mode === "pickup"}
                onClick={() => setMode("pickup")}
                icon={<ShoppingBag className="size-4" />}
                label="Pickup"
              />
            </div>

            {/* Search row */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-cta" />
                <Input
                  aria-label="Delivery address"
                  placeholder="Enter Your Address"
                  className="h-12 rounded-lg border-gray-200 pl-10 text-base"
                />
              </div>
              <Button className="h-12 gap-2 rounded-lg bg-cta px-6 font-heading text-base font-bold text-white shadow-[var(--shadow-btn)] hover:bg-cta-hover">
                <Search className="size-5" /> Find Food
              </Button>
            </div>
          </div>
        </div>

        {/* Bowl image */}
        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
          <div className="absolute inset-0 rounded-full bg-white/20" />
          <Image
            src="/foodwagon/hero-bowl.png"
            alt="A bowl of noodles with egg, chili and spring onion"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "-mb-px flex items-center gap-2 border-b-2 px-1 pb-3 font-heading text-sm font-bold transition-colors",
        active
          ? "border-cta text-cta"
          : "border-transparent text-gray-500 hover:text-gray-800"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
