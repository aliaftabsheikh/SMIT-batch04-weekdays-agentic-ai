export type FlashDeal = {
  id: string;
  name: string;
  image: string;
  discount: number; // percent off
  restaurant: string;
};

export type FoodItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  restaurant: string;
};

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  logo: string; // emoji stand-in for the brand mark
  rating: number;
  discount?: number;
  isOpen: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type BestDeal = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  image: string;
};
