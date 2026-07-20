import { motion } from 'framer-motion'

const stats = [
  { number: '98%', label: 'Task completion rate' },
  { number: '4.2×', label: 'Faster shipping' },
  { number: '47k+', label: 'Active developers' },
  { number: '99.9%', label: 'Platform uptime' },
]

export default function Stats() {
  return (
    <section className="relative z-10 px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="glass p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold gradient-text tracking-tight mb-1">
                {s.number}
              </div>
              <div className="text-sm text-zinc-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
