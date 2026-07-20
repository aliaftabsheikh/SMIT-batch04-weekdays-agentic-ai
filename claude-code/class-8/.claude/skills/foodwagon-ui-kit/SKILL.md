---
name: foodwagon-ui-kit
description: FoodWagon design tokens and Tailwind + shadcn/ui component conventions (amber/orange food-delivery palette, cards, badges, buttons, section spacing) for the landing page. Use when building or styling any FoodWagon section so every part stays consistent with the Figma design.
---

# FoodWagon UI Kit

Shared visual conventions extracted from the FoodWagon Figma file so every
section matches the design. Apply these whenever building landing-page UI.

## Design tokens (from Figma variables)
Put these in the `@theme` block of `globals.css` and reference via Tailwind
utility classes — never hard-code hex in components.

| Token | Value | Use |
|-------|-------|-----|
| `--color-primary` | `#FFB30E` | hero background, highlights, accents |
| `--color-cta` | `#F17228` | primary buttons, "Order Now", price accents |
| `--color-success` | `#79B93C` | "Open Now" status |
| `--color-gray-100` | `#F5F5F5` | section backgrounds |
| `--color-gray-200` | `#EEEEEE` | borders, dividers |
| `--color-gray-500` | `#9E9E9E` | muted meta text |
| `--color-gray-600` | `#757575` | secondary text |
| `--color-gray-700` | `#616161` | body text |
| `--color-gray-800` | `#424242` | strong body / footer bg base |
| `--color-gray-900` | `#212121` | headings, dark footer bg |

**Fonts:** `--font-heading` = Source Sans 3 (bold headings & buttons),
`--font-body` = Open Sans (body copy).

**Type scale (desktop → clamp down on mobile):** hero h1 `text-5xl md:text-6xl
font-heading font-bold`; section title `text-3xl md:text-4xl font-heading
font-bold`; card title `text-lg font-heading font-semibold`; body `text-base
font-body text-gray-700`; meta `text-sm text-gray-500`.

**Shadows:** soft amber glow for cards/images
`shadow-[0_20px_40px_rgba(255,174,0,0.28)]`; button shadow
`shadow-[0_14px_32px_rgba(255,178,14,0.29)]`. Keep resting shadows subtle,
lift slightly on hover.

## Layout rules
- **Container:** `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- **Section padding:** `py-12 md:py-20`.
- **Radius:** cards `rounded-2xl`, buttons `rounded-lg`/`rounded-full` (pills),
  images `rounded-2xl`.
- **Spacing:** stick to the Tailwind scale (`2,3,4,6,8,12,16`).
- **Grid gap:** `gap-6 md:gap-8`.
- **Motion:** `transition duration-200`; subtle `hover:-translate-y-1` on cards.

## Core patterns
- **Primary button:** `bg-cta text-white font-heading font-bold rounded-lg px-6
  py-3 hover:brightness-95 shadow-[0_14px_32px_rgba(255,178,14,0.29)]`.
- **Food/product card:** rounded-2xl white card, `next/image` (`object-cover`),
  title, star rating, price in `text-cta font-semibold`, full-width "Order Now"
  CTA. Lift on hover.
- **Discount badge:** small pill top-left of the image, `bg-cta text-white
  text-sm font-bold rounded-md px-2 py-0.5` (e.g. "-15%").
- **Rating:** `Star` from `lucide-react`, amber fill, with `aria-label`
  like `"Rated 4.5 out of 5"`.
- **Status pill:** "Open Now" → `text-success`; "Closed" → `text-gray-500`.
- **Carousel:** shadcn `Carousel` (Embla) with round nav arrows for Popular
  Items and Search-by-Food.

## Accessibility baseline
`alt` on every image; real `<button>`/`<a>`; visible focus rings; tap targets
≥ 44px; headings in order; color never the only signal (pair with text/icon).

## Responsiveness
Mobile-first. Card grids `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`; hero
stacks (text over image) on mobile, side-by-side at `lg:`. No horizontal scroll
at 375px.
