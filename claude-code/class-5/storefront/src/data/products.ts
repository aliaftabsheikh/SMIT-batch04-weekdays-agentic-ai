import type { Product } from "@/types/product";

export const products: Product[] = [
  // ── Apparel ────────────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "classic-crew-tee",
    name: "Obsidian Supima Tee",
    price: 89,
    image: "https://picsum.photos/seed/classic-crew-tee/600/600",
    description:
      "Woven from 140-count Supima cotton with a mercerised finish that reflects light as cleanly as polished stone. Pre-shrunk and enzyme-washed for an effortless drape from day one.",
    category: "Apparel",
    rating: 4.5,
    featured: true,
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "slim-chino-pants",
    name: "Nocturne Slim Trouser",
    price: 185,
    image: "https://picsum.photos/seed/slim-chino-pants/600/600",
    description:
      "A precision-cut slim trouser in Japanese stretch-wool canvas. The deep inky dye has been triple-fixed to resist fading across a decade of wear.",
    category: "Apparel",
    rating: 4.3,
    badge: "New",
  },
  {
    id: "3",
    slug: "quilted-puffer-jacket",
    name: "Aether Down Shell",
    price: 285,
    image: "https://picsum.photos/seed/quilted-puffer-jacket/600/600",
    description:
      "Responsible-down insulation sealed inside a 40D ripstop shell treated with C0 DWR. Compresses to 14 cm × 9 cm for travel and delivers 650-fill warmth.",
    category: "Apparel",
    rating: 4.7,
    featured: true,
  },
  {
    id: "4",
    slug: "merino-roll-neck",
    name: "Venetian Merino Rollneck",
    price: 145,
    image: "https://picsum.photos/seed/merino-roll-neck/600/600",
    description:
      "Spun from 15.9-micron extra-fine merino sourced from a single estate in New Zealand. The generous roll neck folds twice for variable silhouettes.",
    category: "Apparel",
    rating: 4.6,
    badge: "Limited",
  },

  // ── Footwear ───────────────────────────────────────────────────────────────
  {
    id: "5",
    slug: "canvas-low-top",
    name: "Monolith Low Sneaker",
    price: 145,
    image: "https://picsum.photos/seed/canvas-low-top/600/600",
    description:
      "Uncoated full-grain calfskin upper on a hand-vulcanised natural crepe sole. Each pair is finished by a single craftsman over three hours.",
    category: "Footwear",
    rating: 4.4,
    featured: true,
    badge: "Bestseller",
  },
  {
    id: "6",
    slug: "leather-derby-shoe",
    name: "Cedarwood Oxford",
    price: 245,
    image: "https://picsum.photos/seed/leather-derby-shoe/600/600",
    description:
      "English-last construction in single-piece beeswax calf leather. Goodyear-welted to a leather-lined oak-bark sole; indefinitely resoleable.",
    category: "Footwear",
    rating: 4.8,
    badge: "Limited",
  },
  {
    id: "7",
    slug: "trail-runner-pro",
    name: "Altitude Trail Runner",
    price: 195,
    image: "https://picsum.photos/seed/trail-runner-pro/600/600",
    description:
      "Carbon-fibre plate midsole with a hand-lasted recycled-nylon upper. Vibram Megagrip outsole tested across 2,500 km of alpine terrain.",
    category: "Footwear",
    rating: 4.5,
  },
  {
    id: "8",
    slug: "suede-chelsea-boot",
    name: "Midnight Suede Chelsea",
    price: 215,
    image: "https://picsum.photos/seed/suede-chelsea-boot/600/600",
    description:
      "Full-grain suede sourced from a Certified Leather Working Group tannery. The stacked brass heel is turned by hand in the Marche region of Italy.",
    category: "Footwear",
    rating: 4.2,
  },

  // ── Accessories ────────────────────────────────────────────────────────────
  {
    id: "9",
    slug: "waxed-canvas-tote",
    name: "Noir Utility Tote",
    price: 175,
    image: "https://picsum.photos/seed/waxed-canvas-tote/600/600",
    description:
      "Bridle-wax canvas with solid-brass hardware and a single-piece leather base. Holds 22 litres and improves in character over years of daily use.",
    category: "Accessories",
    rating: 4.6,
    featured: true,
    badge: "New",
  },
  {
    id: "10",
    slug: "minimalist-leather-wallet",
    name: "Folio Card Wallet",
    price: 95,
    image: "https://picsum.photos/seed/minimalist-leather-wallet/600/600",
    description:
      "Eight-card bifold hand-stitched in vegetable-tanned Florentine calf. The leather is selected by eye from a single tannery in Santa Croce.",
    category: "Accessories",
    rating: 4.4,
  },
  {
    id: "11",
    slug: "merino-beanie",
    name: "Cloud Merino Beanie",
    price: 75,
    image: "https://picsum.photos/seed/merino-beanie/600/600",
    description:
      "Knitted from undyed 100% Merino Nativa-certified wool on heritage circular machines. The natural ivory tones deepen with each gentle wash.",
    category: "Accessories",
    rating: 4.3,
  },
  {
    id: "12",
    slug: "aviator-sunglasses",
    name: "Obsidian Aviator",
    price: 165,
    image: "https://picsum.photos/seed/aviator-sunglasses/600/600",
    description:
      "Titanium-core frame at 18 g total weight, with mineral-glass polarised lenses in a graphite smoke tint. Ships in a full-grain leather hard case.",
    category: "Accessories",
    rating: 4.5,
  },

  // ── Home ───────────────────────────────────────────────────────────────────
  {
    id: "13",
    slug: "ceramic-pour-over",
    name: "Raku Pour-Over Cone",
    price: 95,
    image: "https://picsum.photos/seed/ceramic-pour-over/600/600",
    description:
      "Each cone is individually raku-fired and glazed in a reduction atmosphere, producing a unique carbon-blackened surface that purifies the flavour profile.",
    category: "Home",
    rating: 4.7,
  },
  {
    id: "14",
    slug: "linen-throw-blanket",
    name: "Bianco Linen Throw",
    price: 145,
    image: "https://picsum.photos/seed/linen-throw-blanket/600/600",
    description:
      "Pre-washed Belgian linen in a 2×2 hopsack weave at 230 gsm. Stone-bleached to a natural ivory and finished without optical brighteners.",
    category: "Home",
    rating: 4.6,
    badge: "Bestseller",
  },
  {
    id: "15",
    slug: "oak-cutting-board",
    name: "End-Grain Walnut Board",
    price: 125,
    image: "https://picsum.photos/seed/oak-cutting-board/600/600",
    description:
      "End-grain American black walnut, face-glued under 12 tonnes of cold press. Oiled three times in Osmo hardwax before leaving the workshop.",
    category: "Home",
    rating: 4.8,
  },
  {
    id: "16",
    slug: "soy-pillar-candle",
    name: "Vetiver Noir Candle",
    price: 65,
    image: "https://picsum.photos/seed/soy-pillar-candle/600/600",
    description:
      "Hand-poured in small batches from coconut-soy blend with a raw cotton wick. Notes of smoked vetiver, patchouli, and dark amber. 55-hour burn.",
    category: "Home",
    rating: 4.2,
  },
];
