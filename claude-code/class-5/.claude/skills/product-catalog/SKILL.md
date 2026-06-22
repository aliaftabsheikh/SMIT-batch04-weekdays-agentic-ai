---
name: product-catalog
description: Build the product catalog for an ecommerce store — a product listing/grid page and product detail pages from mock data, using shadcn/ui cards and next/image. Use when the user wants to show products, a product list, a shop page, or a product detail page.
---

# Product Catalog

Builds the browsing experience: a responsive product grid and individual product
detail pages, sourced from the mock data layer.

## Prerequisites
- The data layer exists (`types/product.ts`, `data/products.ts`,
  `lib/products.ts`). If not, delegate to the **product-data-manager** subagent
  first.
- shadcn `card`, `button`, `badge` components are installed.

## What to build

1. **Product card** — `components/product-card.tsx`
   - shadcn `Card` with `next/image` (square, `object-cover`), product name,
     category `Badge`, price via `formatPrice`, and a link to `/products/[slug]`.
   - Hover state (subtle scale/shadow). Whole card is keyboard-accessible.

2. **Product grid** — `components/product-grid.tsx`
   - `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6`.
   - Takes `products: Product[]`; renders an empty state if none.

3. **Catalog page** — `app/products/page.tsx` (Server Component)
   - Calls `getProducts()`; optional category filter via `getCategories()` +
     search params.

4. **Detail page** — `app/products/[slug]/page.tsx` (Server Component)
   - `getProductBySlug(params.slug)`; `notFound()` if missing.
   - Two-column on `lg`: image left, info right (name, price, rating, category,
     description, `<AddToCartButton/>` from the cart layer).
   - `generateStaticParams` from `getProducts()` and `generateMetadata` for SEO.

5. **Home page** — feature `getFeaturedProducts()` in a hero + grid.

## Conventions
Follow the `ecommerce-ui-kit` skill for card/grid/price/rating patterns. Delegate
the actual component construction to the **storefront-builder** subagent so it
stays consistent with the rest of the storefront.

## Verify
`/products` shows a responsive grid; clicking a card opens its detail page;
unknown slugs render the not-found page.
