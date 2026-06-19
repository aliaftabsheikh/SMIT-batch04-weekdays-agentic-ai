---
name: ecommerce-ui-kit
description: Professional Tailwind + shadcn/ui design conventions and copy-paste component patterns for ecommerce storefronts (product cards, responsive grids, price tags, rating stars, badges). Use when building or styling storefront UI and you need consistent, polished patterns.
---

# Ecommerce UI Kit

Shared visual conventions so every part of the storefront looks consistent and
professional. Apply these whenever building storefront UI.

## Design tokens & rules
- **Spacing:** stick to the Tailwind scale (`2,3,4,6,8,12`). Card padding `p-4`,
  section padding `py-12 md:py-16`, grid gap `gap-4 md:gap-6`.
- **Container:** `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- **Radius/shadow:** `rounded-xl` for cards, `shadow-sm` resting → `hover:shadow-md`.
- **Color:** use shadcn theme tokens (`bg-background`, `text-foreground`,
  `text-muted-foreground`, `border`, `primary`) — never hard-coded hex.
- **Type:** product name `font-medium`, price `font-semibold tabular-nums`,
  meta `text-sm text-muted-foreground`.
- **Motion:** `transition-* duration-200`; keep it subtle.

## Core patterns
- **Responsive product grid:** `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6`.
- **Product card:** image (square, `object-cover`, `next/image`), name (truncate
  to 2 lines), category badge, price. Whole card is one focusable link.
- **Price tag:** always `formatPrice(value)` (Intl.NumberFormat) — never a raw
  number; use `tabular-nums`.
- **Rating:** filled/empty stars from `lucide-react` (`Star`), with an
  `aria-label` like `"Rated 4.5 out of 5"`.
- **Badges:** category and status ("New", "Sale") via shadcn `Badge`.

## Accessibility baseline
`alt` on every product image; visible focus rings; tap targets ≥ 44px; headings
in order; color is never the only signal (pair with text/icon).

## Snippets
Copy-paste, ready-to-adapt JSX for the product card, grid, price tag, and rating
stars live in [`references/components.md`](references/components.md). Read that
file when you need the actual markup.

> If the `tailwind-design-system` skill is installed, defer to it for global
> design-token decisions; this kit covers the ecommerce-specific patterns on top.
