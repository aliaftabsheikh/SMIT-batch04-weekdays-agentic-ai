---
name: ecommerce-scaffold
description: Scaffold a new ecommerce storefront with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Use when the user asks to start, scaffold, bootstrap, or set up a new online store / ecommerce / shop project.
---

# Ecommerce Scaffold

Bootstraps a professional ecommerce storefront foundation. All packages are free
and no API keys are required (data is mocked, checkout is mocked).

## Stack
- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** + **lucide-react** (icons)
- **Zustand** (cart state) + **sonner** (toasts)
- Mock product data (no database)

## Steps

1. **Create the app** (skip if already in a Next.js project):
   ```bash
   npx create-next-app@latest storefront --ts --tailwind --app --eslint --src-dir=false --import-alias "@/*"
   cd storefront
   ```

2. **Init shadcn/ui and add base components:**
   ```bash
   npx shadcn@latest init -d
   npx shadcn@latest add button card badge sheet separator input sonner
   ```
   > If the `tailwind-v4-shadcn` skill is installed, follow it for the exact
   > Tailwind v4 + shadcn setup details.

3. **Install runtime packages:**
   ```bash
   npm install zustand lucide-react
   ```

4. **Create the folder structure:**
   ```text
   app/
     layout.tsx          # root layout: <Header/>, <Toaster/>, <Footer/>
     page.tsx            # home / featured products
     products/page.tsx   # catalog grid
     products/[slug]/page.tsx
     checkout/page.tsx
   components/
     header.tsx  footer.tsx  product-card.tsx  product-grid.tsx
     cart-sheet.tsx  add-to-cart-button.tsx
   data/products.ts      # mock products
   types/product.ts      # Product type
   lib/products.ts       # data helpers + formatPrice
   store/cart.ts         # Zustand cart store
   ```

5. **Set up the data layer** — delegate to the **product-data-manager** subagent
   to create `types/product.ts`, `data/products.ts`, and `lib/products.ts`.

6. **Build the base layout** (`app/layout.tsx` with `<Header/>`, shadcn
   `<Toaster/>` from sonner, `<Footer/>`) — delegate to the
   **storefront-builder** subagent.

7. **Allow remote product images** in `next.config.js`:
   ```js
   images: { remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }] }
   ```

## Next steps
After scaffolding, use the `product-catalog` skill (listing + detail pages) and
the `shopping-cart` skill (cart + mock checkout). Follow `ecommerce-ui-kit` for
component styling conventions.

## Verify
`npm run dev` → home page loads with header/footer and no console errors.
