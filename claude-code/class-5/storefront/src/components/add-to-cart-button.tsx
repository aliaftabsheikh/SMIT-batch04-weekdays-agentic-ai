"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    addItem(product);
    toast.success("Added to cart", { description: product.name });
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    setLoading(false);
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      size="lg"
      variant="ghost"
      className={cn(
        "w-full sm:w-auto gap-2 border-0 font-semibold transition-all",
        loading
          ? "opacity-80 cursor-wait bg-violet-600/80 text-white"
          : "shimmer-button"
      )}
    >
      {loading ? (
        <>
          <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
