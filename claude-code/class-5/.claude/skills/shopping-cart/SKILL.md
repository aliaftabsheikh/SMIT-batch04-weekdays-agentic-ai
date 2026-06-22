---
name: shopping-cart
description: Add shopping cart and mock checkout to an ecommerce store — a Zustand cart store, add-to-cart with toast, a cart drawer with quantity/remove controls, and a mock checkout page with order summary. Use when the user wants a cart, "add to cart", a basket, or checkout.
---

# Shopping Cart + Mock Checkout

Adds client-side cart state and a simulated checkout. No real payment, no API
keys.

## Prerequisites
- `zustand` and `sonner` installed; shadcn `sheet`, `button`, `separator`,
  `input` added; sonner `<Toaster/>` mounted in `app/layout.tsx`.
- The data layer and `formatPrice` exist.

## What to build

1. **Cart store** — `store/cart.ts` (Zustand + `persist` to `localStorage`):
   - State: `items: { product: Product; quantity: number }[]`.
   - Actions: `addItem`, `removeItem`, `updateQuantity`, `clear`.
   - Selectors/derived: `totalItems`, `totalPrice`.

2. **Add-to-cart button** — `components/add-to-cart-button.tsx` (`"use client"`):
   - Calls `addItem(product)` and fires a `sonner` toast ("Added to cart").

3. **Cart sheet** — `components/cart-sheet.tsx` (`"use client"`):
   - shadcn `Sheet` triggered by a header cart icon with a live count `Badge`.
   - Lists items (image, name, price), quantity stepper, remove button, running
     subtotal, and a "Checkout" link to `/checkout`. Empty state when no items.

4. **Mock checkout** — `app/checkout/page.tsx`:
   - Editable order summary (line items + total via `formatPrice`).
   - A simple (non-functional) contact/address form for realism.
   - "Place order" button → clears cart, shows a confirmation / order-success
     state. No network call.

## Conventions
- Render the header cart count only after mount to avoid hydration mismatch.
- Keep store logic pure; components only read/dispatch.
- Delegate implementation to the **cart-engineer** subagent for consistency.

## Verify
Add a product → toast fires and header badge increments → open drawer → adjust
quantity / remove → go to `/checkout` → "Place order" clears the cart and shows
confirmation.
