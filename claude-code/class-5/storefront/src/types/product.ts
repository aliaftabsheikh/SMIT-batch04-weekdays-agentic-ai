export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Price in US dollars (e.g. 29.99) */
  price: number;
  image: string;
  description: string;
  category: string;
  /** Rating from 0 to 5 */
  rating: number;
  featured?: boolean;
  badge?: "New" | "Bestseller" | "Limited";
};
