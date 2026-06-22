import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/product-grid";
import { getProducts, getProductsByCategory, getCategories } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse the full LUMINARY catalogue — exceptional apparel, footwear, accessories, and home objects.",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const categories = getCategories();
  const products = category
    ? getProductsByCategory(category)
    : getProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {category ?? "All Collections"}
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center justify-center rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold px-2.5 py-0.5">
            {products.length}
          </span>
          {products.length === 1 ? "piece" : "pieces"} in this collection
        </p>
      </div>

      {/* Category filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={cn(
            "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !category
              ? "shimmer-button font-semibold"
              : "bg-muted/50 text-muted-foreground border border-border/40 hover:border-violet-500/30 hover:text-foreground"
          )}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/products?category=${encodeURIComponent(cat)}`}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              category === cat
                ? "shimmer-button font-semibold"
                : "bg-muted/50 text-muted-foreground border border-border/40 hover:border-violet-500/30 hover:text-foreground"
            )}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Gradient separator */}
      <div className="mb-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Grid */}
      <ProductGrid products={products} />
    </section>
  );
}
