import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product-grid";
import { getFeaturedProducts } from "@/lib/products";
import { ArrowRight, Sparkles, Truck, Shield, RefreshCw, Award } from "lucide-react";

const CATEGORIES = [
  {
    name: "Apparel",
    href: "/products?category=Apparel",
    gradient: "from-violet-500/20 to-violet-500/5",
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-[0_0_32px_oklch(0.54_0.24_285/0.2)]",
  },
  {
    name: "Footwear",
    href: "/products?category=Footwear",
    gradient: "from-pink-500/20 to-pink-500/5",
    border: "hover:border-pink-500/40",
    glow: "hover:shadow-[0_0_32px_oklch(0.62_0.24_340/0.2)]",
  },
  {
    name: "Accessories",
    href: "/products?category=Accessories",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-[0_0_32px_oklch(0.70_0.18_200/0.2)]",
  },
  {
    name: "Home",
    href: "/products?category=Home",
    gradient: "from-violet-500/15 via-pink-500/10 to-cyan-500/10",
    border: "hover:border-violet-500/30",
    glow: "hover:shadow-[0_0_32px_oklch(0.54_0.24_285/0.15)]",
  },
];

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Complimentary Shipping",
    desc: "On all orders over $150",
    color: "text-violet-400",
  },
  {
    icon: Shield,
    title: "Authenticity Guarantee",
    desc: "Every item verified by our team",
    color: "text-pink-400",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    desc: "Hassle-free, no questions asked",
    color: "text-cyan-400",
  },
  {
    icon: Award,
    title: "Artisan Crafted",
    desc: "Selected from master makers only",
    color: "text-violet-400",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 size-[600px] rounded-full bg-violet-500/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-pink-500/8 blur-[100px]" />
          <div className="absolute top-1/2 left-2/3 -translate-y-1/2 size-[300px] rounded-full bg-cyan-500/6 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
              <Sparkles className="size-3" aria-hidden="true" />
              New Collection 2026
            </p>

            {/* Animated gradient headline */}
            <h1 className="gradient-text font-display text-5xl font-extrabold tracking-tight leading-none sm:text-6xl lg:text-7xl">
              Crafted for<br />the rare few.
            </h1>

            {/* Subheading */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Each piece is selected for exceptional material, craft, and
              longevity. No compromise. No shortcuts.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                render={<Link href="/products" />}
                variant="ghost"
                size="lg"
                className="shimmer-button border-0 font-semibold px-8"
              >
                Explore Collection
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                render={<Link href="/products?category=Apparel" />}
                variant="outline"
                size="lg"
                className="border-border/60 hover:border-violet-500/50 px-8"
              >
                Shop Apparel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category showcase ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group relative overflow-hidden rounded-2xl aspect-[3/4] bg-card border border-border/40 transition-all duration-300 ${cat.border} ${cat.glow} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
            >
              {/* Gradient hover overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${cat.gradient}`}
              />
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Collection
                </p>
                <p className="font-display text-lg font-bold">{cat.name}</p>
              </div>
              {/* Arrow on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured products ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400 mb-2">
              Curated Picks
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Featured this Season
            </h2>
          </div>
          <Button
            render={<Link href="/products" />}
            variant="ghost"
            size="sm"
            className="shrink-0 text-muted-foreground"
          >
            View all
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* ── Trust strip ────────────────────────────────────────────────────── */}
      <section className="border-t border-border/30 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex flex-col items-center gap-2 text-center">
                <Icon className={`size-6 ${color}`} aria-hidden="true" />
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
