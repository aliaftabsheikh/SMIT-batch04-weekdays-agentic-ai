import { motion } from 'framer-motion'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-extrabold tracking-tight">
          <span className="gradient-text">Sentient</span>
        </a>
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            Get Started
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
