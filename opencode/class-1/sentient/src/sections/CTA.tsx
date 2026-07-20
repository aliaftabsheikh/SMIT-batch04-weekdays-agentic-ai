import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section id="cta" className="relative z-10 px-6 py-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="glass p-10 md:p-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Ready to ship with AI?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            Join thousands of teams building faster with Sentient. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your work email"
              className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-zinc-700 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <a href="#" className="btn btn-primary justify-center text-sm whitespace-nowrap">
              Get started
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
