import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function CTA() {
  return (
    <section id="cta" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl gradient-border px-6 py-16 text-center sm:px-16">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="glow-blob left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-cyan/30" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to move value <span className="gradient-text">without limits?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Join 890,000+ wallets already building on the trustless liquidity
              layer. Get started in under a minute.
            </p>

            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              action="#"
            >
              <input
                type="email"
                required
                placeholder="you@wallet.xyz"
                className="flex-1 rounded-xl border border-border bg-background-soft px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-violet focus:outline-none"
              />
              <button
                type="submit"
                className="shimmer-btn group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Launch App
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
