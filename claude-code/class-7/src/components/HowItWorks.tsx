import { Wallet, Repeat, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: Wallet,
    step: "01",
    title: "Connect your wallet",
    body: "Link any EVM or Solana wallet in one click. No sign-ups, no KYC, no custody.",
  },
  {
    icon: Repeat,
    step: "02",
    title: "Swap or bridge instantly",
    body: "Choose your assets and networks. Nexus routes through the deepest liquidity automatically.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Earn on idle capital",
    body: "Provide liquidity to any pool and earn protocol fees plus NEX rewards in real time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-magenta">
          How it works
        </p>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three steps to <span className="gradient-text">go on-chain</span>
        </h2>
      </Reveal>

      <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent md:block" />

        {steps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.15}>
            <div className="relative flex flex-col items-center text-center">
              <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-border">
                <s.icon className="h-8 w-8 text-cyan" />
                <span className="absolute -right-2 -top-2 rounded-full bg-violet px-2 py-0.5 text-[10px] font-bold text-white">
                  {s.step}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
