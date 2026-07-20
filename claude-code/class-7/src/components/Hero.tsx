"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroCanvas } from "@/components/three/HeroCanvas";

const chips = [
  { label: "Total Value Locked", value: "$4.8B" },
  { label: "Chains", value: "24" },
  { label: "Avg. Swap", value: "0.4s" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      {/* Backdrops */}
      <div className="grid-bg absolute inset-0" />
      <div className="glow-blob left-[-10%] top-[10%] h-[38rem] w-[38rem] bg-violet/40" />
      <div className="glow-blob right-[-8%] bottom-[-5%] h-[34rem] w-[34rem] bg-cyan/30" />

      {/* 3D canvas — fills the section, sits behind text */}
      <div className="absolute inset-0 z-0 opacity-90 md:left-[35%]">
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2">
        <div className="flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan" />
            Now live on 24 chains
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            The <span className="gradient-text">liquidity layer</span> for
            on-chain finance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-lg text-muted"
          >
            Swap, stake and bridge assets across every major network with a
            single trustless protocol. No custodians. No compromise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#cta"
              className="shimmer-btn group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition-transform hover:scale-105"
            >
              Launch App
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
            >
              Read the docs
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {chips.map((c) => (
              <div key={c.label}>
                <div className="font-display text-2xl font-bold text-foreground">
                  {c.value}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted">
                  {c.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Spacer so the grid keeps text on the left; canvas shows through */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
}
