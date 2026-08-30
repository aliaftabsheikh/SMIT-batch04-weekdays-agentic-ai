import { Hexagon, AtSign, Send, MessageCircle } from "lucide-react";

const columns = [
  { title: "Protocol", links: ["Swap", "Bridge", "Liquidity", "Governance"] },
  { title: "Developers", links: ["Documentation", "SDK", "Audits", "Bug bounty"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Brand kit"] },
];

const socials = [
  { icon: AtSign, label: "X / Twitter" },
  { icon: Send, label: "Telegram" },
  { icon: MessageCircle, label: "Discord" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 md:grid-cols-5">
        <div className="col-span-2">
          <a href="#" className="flex items-center gap-2 font-display text-lg font-bold">
            <Hexagon className="h-6 w-6 text-cyan" strokeWidth={2.4} />
            Nexus
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted">
            The decentralized liquidity layer powering the next generation of
            on-chain finance.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="rounded-lg border border-border p-2 text-muted transition-colors hover:border-violet/40 hover:text-foreground"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold text-foreground">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Nexus Protocol. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
