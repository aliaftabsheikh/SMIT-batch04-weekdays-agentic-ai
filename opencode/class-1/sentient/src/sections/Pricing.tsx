import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/mo',
    desc: 'For solo developers and small projects.',
    features: ['5 active sessions', 'Basic tool integration', 'Community support', '500k tokens / month'],
    featured: false,
    cta: 'Get started',
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/mo',
    desc: 'For professional teams shipping daily.',
    features: ['Unlimited sessions', 'Custom MCP servers', 'Priority support', '5M tokens / month', 'Team workspaces'],
    featured: true,
    cta: 'Start trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations needing control and scale.',
    features: ['On-premise deployment', 'SSO & RBAC', 'Dedicated support', 'Unlimited tokens', 'SLA guarantee'],
    featured: false,
    cta: 'Contact sales',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 px-6 py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-indigo-400 mb-3">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Plans for every stage
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">Start free, upgrade when you need more.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              className={`glass p-8 relative ${p.featured ? 'border-indigo-500/40 bg-indigo-500/5 scale-[1.04] md:scale-105 shadow-xl shadow-indigo-500/10' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-xs font-semibold text-white whitespace-nowrap">
                  Most popular
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 mb-1">
                {p.price}<span className="text-base font-normal text-zinc-400">{p.period}</span>
              </div>
              <p className="text-sm text-zinc-400 mb-6">{p.desc}</p>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="text-sm text-zinc-300 flex items-center gap-2.5">
                    <span className="text-cyan-400 font-bold">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`block text-center w-full py-3 rounded-full text-sm font-semibold transition-all ${
                  p.featured
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40'
                    : 'border border-zinc-700 text-zinc-200 hover:border-indigo-500/40 hover:bg-indigo-500/10'
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
