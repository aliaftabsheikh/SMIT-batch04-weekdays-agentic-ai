# Ecommerce UI Snippets

Copy-paste JSX/TSX patterns for a Next.js + Tailwind + shadcn/ui storefront.
Adapt names/imports to the project. Assumes `formatPrice` from `@/lib/products`
and the `Product` type from `@/types/product`.

## Price tag

```tsx
import { formatPrice } from "@/lib/products";

export function Price({ value, className = "" }: { value: number; className?: string }) {
  return <span className={`font-semibold tabular-nums ${className}`}>{formatPrice(value)}</span>;
}
```

`lib/products.ts` formatter:

```ts
export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
```

## Rating stars

```tsx
import { Star } from "lucide-react";

export function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < Math.round(value) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}
```

## Product card

```tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/price";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <Card className="overflow-hidden border shadow-sm transition-shadow duration-200 group-hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <CardContent className="space-y-1 p-4">
          <Badge variant="secondary" className="capitalize">{product.category}</Badge>
          <h3 className="line-clamp-2 font-medium leading-snug">{product.name}</h3>
          <Price value={product.price} />
        </CardContent>
      </Card>
    </Link>
  );
}
```

## Responsive product grid

```tsx
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">No products found.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

## Page container / section

```tsx
export function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      {children}
    </section>
  );
}
```

## Add-to-cart button (cart layer)

```tsx
"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  return (
    <Button
      onClick={() => { addItem(product); toast.success(`${product.name} added to cart`); }}
      className="w-full sm:w-auto"
    >
      <ShoppingCart className="mr-2 size-4" /> Add to cart
    </Button>
  );
}
```
