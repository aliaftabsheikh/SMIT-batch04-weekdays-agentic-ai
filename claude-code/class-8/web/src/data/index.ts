import type {
  BestDeal,
  Category,
  FlashDeal,
  FoodItem,
  Restaurant,
} from "@/types";

export const flashDeals: FlashDeal[] = [
  {
    id: "fd1",
    name: "Green Salad Bowl",
    image: "/foodwagon/salad-bowl.png",
    discount: 15,
    restaurant: "Ashville Kitchen",
  },
  {
    id: "fd2",
    name: "Pesto Pasta",
    image: "/foodwagon/pasta.png",
    discount: 10,
    restaurant: "The Italian Corner",
  },
  {
    id: "fd3",
    name: "Buddha Veggie Bowl",
    image: "/foodwagon/veggie-bowl.png",
    discount: 25,
    restaurant: "Green Garden",
  },
  {
    id: "fd4",
    name: "Spicy Red Curry",
    image: "/foodwagon/red-curry.png",
    discount: 20,
    restaurant: "Bangkok Street",
  },
];

export const popularItems: FoodItem[] = [
  {
    id: "pi1",
    name: "Cheese Burger",
    image: "/foodwagon/burger.png",
    price: 12,
    rating: 4.8,
    reviews: 210,
    restaurant: "Burger Arena",
  },
  {
    id: "pi2",
    name: "Toffe's Cake",
    image: "/foodwagon/pancakes.png",
    price: 9.5,
    rating: 4.7,
    reviews: 185,
    restaurant: "Cake World",
  },
  {
    id: "pi3",
    name: "Dancakes",
    image: "/foodwagon/crispy-sandwich.png",
    price: 8,
    rating: 4.6,
    reviews: 142,
    restaurant: "Sweet Stack",
  },
  {
    id: "pi4",
    name: "Crispy Sandwich",
    image: "/foodwagon/grilled-sandwich.png",
    price: 10,
    rating: 4.9,
    reviews: 320,
    restaurant: "Grill House",
  },
  {
    id: "pi5",
    name: "Thai Soup",
    image: "/foodwagon/pumpkin-soup.png",
    price: 7.5,
    rating: 4.5,
    reviews: 98,
    restaurant: "Bangkok Street",
  },
];

const restaurantImages = [
  "/foodwagon/red-curry.png",
  "/foodwagon/pasta.png",
  "/foodwagon/pancakes.png",
  "/foodwagon/veggie-bowl.png",
  "/foodwagon/burger.png",
  "/foodwagon/crispy-sandwich.png",
  "/foodwagon/pumpkin-soup.png",
  "/foodwagon/salad-bowl.png",
];

const restaurantNames = [
  "Foodworld",
  "Pizza Palace",
  "The Sweet Tooth",
  "Fresh & Green",
  "Burger Arena",
  "Grill House",
  "Bangkok Street",
  "Salad Days",
];

export const restaurants: Restaurant[] = restaurantImages.map((image, i) => ({
  id: `r${i + 1}`,
  name: restaurantNames[i],
  image,
  logo: ["🍔", "🍕", "🍰", "🥗", "🍟", "🥪", "🍜", "🥙"][i],
  rating: [4.5, 4.7, 4.3, 4.8, 4.6, 4.9, 4.4, 4.2][i],
  discount: [10, 20, undefined, 15, undefined, 25, 10, undefined][i],
  isOpen: [true, true, false, true, true, true, false, true][i],
}));

export const categories: Category[] = [
  { id: "c1", name: "Pizza", image: "/foodwagon/red-curry.png" },
  { id: "c2", name: "Burger", image: "/foodwagon/burger.png" },
  { id: "c3", name: "Noodles", image: "/foodwagon/hero-bowl.png" },
  { id: "c4", name: "Sub Sandwich", image: "/foodwagon/grilled-sandwich.png" },
  { id: "c5", name: "Cheese Steak", image: "/foodwagon/crispy-sandwich.png" },
  { id: "c6", name: "Salad", image: "/foodwagon/salad-bowl.png" },
  { id: "c7", name: "Pasta", image: "/foodwagon/pasta.png" },
  { id: "c8", name: "Soup", image: "/foodwagon/pumpkin-soup.png" },
];

export const bestDeals: BestDeal[] = [
  {
    id: "bd1",
    eyebrow: "Best deals",
    title: "Crispy",
    highlight: "Sandwiches",
    image: "/foodwagon/crispy-sandwich.png",
  },
  {
    id: "bd2",
    eyebrow: "Celebrate parties with",
    title: "Fried",
    highlight: "Chicken",
    image: "/foodwagon/red-curry.png",
  },
  {
    id: "bd3",
    eyebrow: "Wanna eat hot & spicy",
    title: "Pizza",
    highlight: "?",
    image: "/foodwagon/pasta.png",
  },
];
