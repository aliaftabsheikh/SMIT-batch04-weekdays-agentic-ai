"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Price } from "@/components/price";
import { Rating } from "@/components/rating";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative rounded-xl"
      style={{ willChange: "transform" }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        <Card className="overflow-hidden border border-border/40 bg-card h-full transition-shadow duration-300 group-hover:shadow-[var(--glow-violet)]">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Badge overlay */}
            {product.badge && (
              <div className="absolute top-2 left-2 z-10">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                    product.badge === "New" && "bg-violet-500/90 text-white",
                    product.badge === "Bestseller" && "bg-pink-500/90 text-white",
                    product.badge === "Limited" && "bg-cyan-500/90 text-cyan-950"
                  )}
                >
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          <CardContent className="space-y-2 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {product.category}
            </p>
            <h3 className="font-display font-semibold text-base leading-snug line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <Price value={product.price} className="text-base font-bold" />
              <Rating value={product.rating} />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
