import { products } from "@/data/products";
import type { Product } from "@/types/product";

/**
 * Returns all products.
 * Signature is intentionally DB-friendly — swap the body for an async DB call
 * and update the return type to Promise<Product[]> without touching callers.
 */
export function getProducts(): Product[] {
  return products;
}

/**
 * Finds a single product by its URL slug, or undefined if not found.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Returns all products whose category matches the supplied string
 * (case-insensitive comparison).
 */
export function getProductsByCategory(category: string): Product[] {
  const normalised = category.toLowerCase();
  return products.filter((p) => p.category.toLowerCase() === normalised);
}

/**
 * Returns products explicitly marked as featured.
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured === true);
}

/**
 * Returns a deduplicated, sorted list of all category names present in the
 * product catalogue.
 */
export function getCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

/**
 * Formats a numeric dollar amount (e.g. 29.99) as a USD currency string
 * (e.g. "$29.99") using the browser/Node Intl API.
 *
 * Accepts whole-dollar amounts as well as values with cents.
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
