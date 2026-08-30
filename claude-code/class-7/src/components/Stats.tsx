"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

const stats: Stat[] = [
  { prefix: "$", value: 4.8, suffix: "B", decimals: 1, label: "Total value locked" },
  { value: 128, suffix: "M+", label: "Transactions settled" },
  { value: 890, suffix: "K", label: "Active wallets" },
  { value: 24, label: "Networks connected" },
];

function Counter({ value, prefix = "", suffix = "", decimals = 0 }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative py-24">
      <div className="glow-blob left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 bg-violet/20" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 rounded-3xl gradient-border px-8 py-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                <Counter {...s} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-wide text-muted sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
