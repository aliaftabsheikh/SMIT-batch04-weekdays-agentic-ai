"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useCartStore, useCartCount, useCartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/products";

export function CartSheet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const count = useCartCount();
  const total = useCartTotal();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="relative" />
        }
      >
        <ShoppingCart className="size-5" />
        <span className="sr-only">Open cart</span>
        {mounted && count > 0 && (
          <Badge className="absolute -top-1.5 -right-1.5 size-5 p-0 text-[10px] flex items-center justify-center bg-gradient-to-br from-violet-500 to-pink-500 border-0 text-white">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-full sm:max-w-sm bg-card border-border/40">
        <SheetHeader className="border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-0.5 rounded-full bg-gradient-to-b from-violet-500 to-pink-500" />
            <SheetTitle className="font-display font-semibold">
              {mounted && count > 0 ? `Cart (${count})` : "Cart"}
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-4">
            <ShoppingCart className="size-12 text-violet-500/30" />
            <div>
              <p className="font-display font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add some pieces to get started.
              </p>
            </div>
            <SheetClose
              render={
                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "border-border/60 hover:border-violet-500/50"
                  )}
                />
              }
            >
              Browse Collections
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Item list */}
            <ul className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-2">
              {items.map(({ product, quantity }) => (
                <li key={product.id}>
                  <div className="flex items-start gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted/50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug line-clamp-2">
                          {product.name}
                        </p>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="-m-2 shrink-0 rounded p-2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price)}
                      </p>

                      <div className="flex items-center gap-1 mt-1">
                        <Button
                          variant="outline"
                          size="icon-xs"
                          className="size-8 border-border/40"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-4" />
                        </Button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          className="size-8 border-border/40"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-4" />
                        </Button>
                        <span className="ml-auto text-sm font-medium">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4 bg-border/30" />
                </li>
              ))}
            </ul>

            {/* Footer */}
            <SheetFooter className="border-t border-border/40 pt-4">
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Taxes and shipping calculated at checkout.
                </p>
                <SheetClose
                  render={
                    <Link
                      href="/checkout"
                      className={cn(
                        buttonVariants({ size: "default" }),
                        "w-full justify-center shimmer-button border-0 font-semibold"
                      )}
                    />
                  }
                >
                  Checkout — {formatPrice(total)}
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
