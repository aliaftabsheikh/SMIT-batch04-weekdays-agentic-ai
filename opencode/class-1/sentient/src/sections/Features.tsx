import { motion } from 'framer-motion'

const features = [
  { icon: '🧠', title: 'Deep context', desc: 'Understands your entire codebase — semantic indexing across languages and frameworks.' },
  { icon: '🔌', title: 'Tool ecosystem', desc: 'Connects to your APIs, databases, and cloud services via custom MCP servers.' },
  { icon: '👥', title: 'Team sync', desc: 'Shared sessions, change reviews, and agent handoffs without leaving the flow.' },
  { icon: '🔒', title: 'Private by design', desc: 'Your code never leaves your infrastructure. On-prem with full audit trails.' },
  { icon: '⚡', title: 'Agentic workflows', desc: 'Multi-step pipelines that plan, research, test, and deploy autonomously.' },
  { icon: '📊', title: 'Observability', desc: 'Trace every decision and tool call with full session replay and cost analytics.' },
]

export default function Features() {
  return (
    <section id="features" className="relative z-10 px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-indigo-400 mb-3">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            One intelligent workspace that understands your codebase, your tools, and your team.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass p-7 cursor-default hover:border-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 flex items-center justify-center text-xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
