"use client";

import { useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = ["Home", "Browse Menu", "Special Offers", "Restaurants", "Track Order"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-heading text-[15px] font-semibold text-gray-800 transition-colors hover:text-cta"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            className="gap-2 font-heading font-semibold text-gray-800 hover:text-cta"
          >
            <User className="size-4" /> Login
          </Button>
          <Button className="gap-2 rounded-lg bg-cta font-heading font-bold text-white shadow-[var(--shadow-btn)] hover:bg-cta-hover">
            <ShoppingBag className="size-4" /> Sign Up
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg bg-white/70 text-gray-900 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-4 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-heading font-semibold text-gray-800 hover:bg-gray-100 hover:text-cta"
              >
                <Search className="size-4 text-gray-400" />
                {link}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button variant="outline" className="gap-2 font-heading font-semibold">
                <User className="size-4" /> Login
              </Button>
              <Button className="gap-2 bg-cta font-heading font-bold text-white hover:bg-cta-hover">
                <ShoppingBag className="size-4" /> Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
