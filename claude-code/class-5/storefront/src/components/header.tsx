"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartSheet } from "@/components/cart-sheet";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/30 backdrop-blur-md transition-all duration-300",
        scrolled ? "bg-background/95" : "bg-background/60"
      )}
    >
      {/* Gradient pixel accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          <Gem className="size-5 text-violet-400" aria-hidden="true" />
          <span className="gradient-text font-display text-xl font-bold tracking-widest uppercase">
            LUMINARY
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <Link
            href="/"
            className={cn(
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
              pathname === "/"
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={cn(
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
              pathname === "/products" || pathname.startsWith("/products/")
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Collections
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
