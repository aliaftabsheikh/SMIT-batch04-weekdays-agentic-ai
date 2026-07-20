import { ShieldCheck, Zap, Globe, Lock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const features = [
  {
    icon: ShieldCheck,
    title: "Trustless by design",
    body: "Non-custodial smart contracts audited by three independent firms. Your keys, your assets, always.",
    color: "text-cyan",
  },
  {
    icon: Zap,
    title: "Sub-second finality",
    body: "Optimistic routing settles swaps in under 400ms with MEV protection baked into every transaction.",
    color: "text-violet",
  },
  {
    icon: Globe,
    title: "Omnichain liquidity",
    body: "A unified liquidity pool spanning 24 networks. Bridge and swap without leaving the protocol.",
    color: "text-magenta",
  },
  {
    icon: Lock,
    title: "Institutional-grade",
    body: "Formal verification, real-time monitoring and a $50M security bounty protecting every pool.",
    color: "text-cyan",
  },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan">
          The protocol
        </p>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Built for the <span className="gradient-text">next trillion</span> on-chain
        </h2>
        <p className="mt-4 text-muted">
          Everything you need to move value across chains — secure, instant and
          fully decentralized.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="group h-full rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40">
              <div className="mb-5 inline-flex rounded-xl bg-white/5 p-3 transition-colors group-hover:bg-white/10">
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
