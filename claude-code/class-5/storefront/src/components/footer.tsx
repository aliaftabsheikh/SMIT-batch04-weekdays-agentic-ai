import Link from "next/link";
import { Gem } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const COLLECTION_LINKS = [
  { label: "All Collections", href: "/products" },
  { label: "Apparel", href: "/products?category=Apparel" },
  { label: "Footwear", href: "/products?category=Footwear" },
  { label: "Accessories", href: "/products?category=Accessories" },
  { label: "Home", href: "/products?category=Home" },
];

const COMPANY_LINKS = [
  { label: "About LUMINARY", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Returns & Exchanges", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Settings", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t-0 bg-card mt-16">
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit"
            >
              <Gem className="size-4 text-violet-400" aria-hidden="true" />
              <span className="gradient-text font-display font-bold tracking-widest uppercase text-base">
                LUMINARY
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Where rarity meets ritual. Each piece is selected for exceptional
              material, craft, and longevity.
            </p>
          </div>

          {/* Collections column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Collections
            </h3>
            <ul className="space-y-2">
              {COLLECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Legal
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border/40" />

        <p className="text-center text-xs text-muted-foreground tracking-widest uppercase">
          &copy; {new Date().getFullYear()} LUMINARY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
