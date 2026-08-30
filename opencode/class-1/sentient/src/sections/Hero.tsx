import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.15 },
  }),
}

export default function Hero() {
  return (
    <section className="relative z-10 flex items-center justify-center min-h-screen px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-indigo-400 mb-8 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Now in public beta
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.06] tracking-tight mb-6"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          AI that
          <br />
          <span className="gradient-text">thinks with you</span>
        </motion.h1>

        <motion.p
          className="text-lg text-zinc-400 max-w-xl mx-auto mb-10"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          An agentic AI workspace that plans, researches, writes, and ships — all from a single conversation.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap pointer-events-auto"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <a href="#cta" className="btn btn-primary text-base">
            Start free trial &rarr;
          </a>
          <a href="#features" className="btn btn-outline text-base">
            Learn more
          </a>
        </motion.div>
      </div>
    </section>
  )
}
