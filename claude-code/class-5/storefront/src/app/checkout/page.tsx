"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useCartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const total = useCartTotal();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  function handlePlaceOrder() {
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderNumber(`LMN-${num}`);
    clear();
    setPlaced(true);
  }

  /* ── Order confirmed ───────────────────────────────────────────────────── */
  if (placed) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Gradient ring around icon */}
          <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500 blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card border border-border/40">
              <CheckCircle2 className="size-10 text-violet-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-3xl font-extrabold">
              Order Confirmed
            </h1>
            <p className="text-muted-foreground">
              Your order has been received and is being prepared with care.
            </p>
            {orderNumber && (
              <p className="font-mono text-sm text-violet-400 tracking-wider mt-2">
                Order {orderNumber}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground max-w-sm">
            A confirmation will be sent to your email. Estimated dispatch
            within 2–3 business days.
          </p>

          <Button
            render={<Link href="/products" />}
            variant="ghost"
            size="lg"
            className="shimmer-button border-0 font-semibold px-10 mt-2"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </section>
    );
  }

  /* ── Empty cart guard ─────────────────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <Gem className="mx-auto size-14 text-muted-foreground/30" />
        <h1 className="mt-6 font-display text-2xl font-bold">
          Nothing in your cart
        </h1>
        <p className="mt-2 text-muted-foreground">
          Add some pieces before checking out.
        </p>
        <Button
          render={<Link href="/products" />}
          variant="ghost"
          className="shimmer-button border-0 font-semibold mt-8"
          size="lg"
        >
          Browse Collections
        </Button>
      </section>
    );
  }

  /* ── Main checkout ─────────────────────────────────────────────────────── */
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        Secure Checkout
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── Contact / address form ──────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          {/* Contact */}
          <fieldset className="flex flex-col gap-4">
            <legend className="text-base font-semibold font-display">
              Contact information
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="first-name" className="text-sm font-medium">
                  First name
                </label>
                <Input
                  id="first-name"
                  placeholder="Jane"
                  autoComplete="given-name"
                  className="bg-card border-border/40 focus-visible:ring-violet-500/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="last-name" className="text-sm font-medium">
                  Last name
                </label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  autoComplete="family-name"
                  className="bg-card border-border/40 focus-visible:ring-violet-500/50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
                className="bg-card border-border/40 focus-visible:ring-violet-500/50"
              />
            </div>
          </fieldset>

          <Separator className="bg-border/30" />

          {/* Shipping address */}
          <fieldset className="flex flex-col gap-4">
            <legend className="text-base font-semibold font-display">
              Shipping address
            </legend>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Input
                id="address"
                placeholder="123 Main Street"
                autoComplete="street-address"
                className="bg-card border-border/40 focus-visible:ring-violet-500/50"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="city" className="text-sm font-medium">
                  City
                </label>
                <Input
                  id="city"
                  placeholder="New York"
                  autoComplete="address-level2"
                  className="bg-card border-border/40 focus-visible:ring-violet-500/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="zip" className="text-sm font-medium">
                  ZIP / Postal code
                </label>
                <Input
                  id="zip"
                  placeholder="10001"
                  autoComplete="postal-code"
                  className="bg-card border-border/40 focus-visible:ring-violet-500/50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <Input
                id="country"
                placeholder="United States"
                autoComplete="country-name"
                className="bg-card border-border/40 focus-visible:ring-violet-500/50"
              />
            </div>
          </fieldset>
        </div>

        {/* ── Order summary ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 rounded-2xl bg-card border border-border/40 p-6">
          <h2 className="font-display text-base font-semibold">
            Order Summary
          </h2>

          <ul className="flex flex-col gap-4">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-start gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted/50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium leading-snug line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Qty {quantity}
                    </span>
                    <span className="text-sm font-medium">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Separator className="bg-border/30" />

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (8%)</span>
              <span>{formatPrice(total * 0.08)}</span>
            </div>
          </div>

          <Separator className="bg-border/30" />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span className="gradient-text font-bold text-lg">
              {formatPrice(total * 1.08)}
            </span>
          </div>

          <Button
            variant="ghost"
            className="shimmer-button w-full border-0 font-semibold text-base"
            size="lg"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Demo store — no real payment is processed.
          </p>
        </div>
      </div>
    </section>
  );
}
