export default function Footer() {
  const links = ['Docs', 'Changelog', 'Status', 'Privacy', 'Terms']

  return (
    <footer className="relative z-10 border-t border-zinc-800/60 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="text-xs text-zinc-600">&copy; 2026 Sentient. All rights reserved.</p>
      </div>
    </footer>
  )
}
