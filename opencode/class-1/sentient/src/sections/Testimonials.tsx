import { motion } from 'framer-motion'

const testimonials = [
  { initials: 'RK', name: 'Rebecca Kim', role: 'CTO, Stackforge', quote: 'Sentient cut our PR cycle from days to hours. The context awareness is uncanny.', stars: 5 },
  { initials: 'MJ', name: 'Marcus Johnson', role: 'Lead Engineer, Qwyk', quote: 'We replaced three separate tools with Sentient. The handoff between planning and execution is seamless.', stars: 5 },
  { initials: 'AL', name: 'Aisha Lopez', role: 'Security Architect, OmniCorp', quote: 'Finally, an AI tool that respects our security requirements. On-prem deployment was straightforward.', stars: 5 },
  { initials: 'DT', name: 'David Tran', role: 'Tech Lead, Pylon', quote: 'The observability features alone are worth it. We trace exactly why every decision was made.', stars: 4 },
  { initials: 'SP', name: 'Sarah Park', role: 'VP Eng, Driftwood', quote: 'Sentient understands our monorepo better than most onboarding docs. New hires ramp in days.', stars: 5 },
]

export default function Testimonials() {
  return (
    <section className="relative z-10 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-indigo-400 mb-3">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Trusted by engineering teams
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">From startups to enterprise — Sentient fits every workflow.</p>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass flex-shrink-0 w-[320px] sm:w-[340px] p-7 snap-start hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="text-amber-400 text-sm tracking-widest mb-3">
                {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
              </div>
              <blockquote className="text-sm text-zinc-400 leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
