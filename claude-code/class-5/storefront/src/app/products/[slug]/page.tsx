import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/price";
import { Rating } from "@/components/rating";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGrid } from "@/components/product-grid";
import { getProductBySlug, getProducts, getProductsByCategory } from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.name} — ${product.description.slice(0, 120)}...`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <nav
        className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
          <li>
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Collections
            </Link>
          </li>
          <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
          <li>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
          </li>
          <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
          <li className="text-foreground font-medium truncate max-w-[200px]">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main product section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-card">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Gradient vignette */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            {/* Badge overlay */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest",
                    product.badge === "New" && "bg-violet-500 text-white",
                    product.badge === "Bestseller" && "bg-pink-500 text-white",
                    product.badge === "Limited" &&
                      "bg-cyan-500/90 text-cyan-950 font-extrabold"
                  )}
                >
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                {product.category}
              </p>
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {product.name}
              </h1>
              <Rating value={product.rating} />
              <Price value={product.price} className="text-3xl font-bold" />
            </div>

            <Separator className="bg-border/30" />

            <div className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                About this piece
              </h2>
              <p className="text-base leading-relaxed text-foreground/80">
                {product.description}
              </p>
            </div>

            <Separator className="bg-border/30" />

            <div className="pt-2">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">
              You May Also Like
            </h2>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              See all {product.category} →
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </>
  );
}
