"use client";

import { useState } from "react";
import { Hexagon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Protocol", href: "#features" },
  { label: "Metrics", href: "#stats" },
  { label: "How it works", href: "#how" },
  { label: "Docs", href: "#" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-display text-lg font-bold">
          <Hexagon className="h-6 w-6 text-cyan" strokeWidth={2.4} />
          <span>Nexus</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#cta"
            className="shimmer-btn inline-flex items-center rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-transform hover:scale-105"
          >
            Connect Wallet
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-auto max-w-6xl overflow-hidden px-2 transition-[max-height] duration-300 md:hidden",
          open ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="mt-2 flex flex-col gap-1 rounded-2xl glass p-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="shimmer-btn mt-2 rounded-xl px-5 py-2 text-center text-sm font-semibold text-white"
          >
            Connect Wallet
          </a>
        </div>
      </div>
    </header>
  );
}
