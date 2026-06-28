export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: "seed" | "sapling" | "manure" | "wellness";
  tagline: string;
  weather?: string;
  temp?: string;
  soil?: string;
  water?: string;
  season?: string;
  regions?: string[];
  benefits: string;
  emoji: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "neem-sapling",
    name: "Neem Sapling",
    price: 49,
    unit: "each",
    category: "sapling",
    tagline: "Natural pesticide & shade tree",
    weather: "Hot & Dry",
    temp: "20–35°C",
    soil: "Well-drained",
    water: "Low",
    season: "Monsoon",
    regions: ["Rajasthan", "Gujarat", "Madhya Pradesh"],
    benefits: "Natural pesticide, shade tree, medicinal leaves.",
    emoji: "🌱",
  },
  {
    id: "jamun-sapling",
    name: "Jamun Sapling",
    price: 79,
    unit: "each",
    category: "sapling",
    tagline: "Fruit-bearing canopy tree",
    weather: "Humid & Moderate",
    temp: "25–35°C",
    soil: "Loamy",
    water: "Medium",
    season: "Monsoon",
    regions: ["Uttar Pradesh", "Bihar", "Maharashtra"],
    benefits: "Fruit-bearing, supports pollinators, dense canopy.",
    emoji: "🫐",
  },
  {
    id: "moringa",
    name: "Moringa (Drumstick)",
    price: 39,
    unit: "each",
    category: "sapling",
    tagline: "Nutrient-rich fast grower",
    weather: "Warm Tropical",
    temp: "25–35°C",
    soil: "Sandy Loam",
    water: "Low",
    season: "Spring & Monsoon",
    regions: ["Tamil Nadu", "Karnataka", "Andhra Pradesh"],
    benefits: "Highly nutritious leaves & pods, fast-growing.",
    emoji: "🌿",
  },
  {
    id: "bamboo",
    name: "Bamboo",
    price: 99,
    unit: "each",
    category: "sapling",
    tagline: "Sustainable timber, soil binder",
    weather: "High Rainfall",
    temp: "20–30°C",
    soil: "Moist Loamy",
    water: "High",
    season: "Monsoon",
    regions: ["Assam", "Meghalaya", "Kerala"],
    benefits: "Soil binder, sustainable timber, fast carbon capture.",
    emoji: "🎋",
  },
  {
    id: "tomato-seed",
    name: "Heirloom Tomato Seeds",
    price: 29,
    unit: "20g pack",
    category: "seed",
    tagline: "Reliable kitchen-garden classic",
    weather: "Humid & Moderate",
    temp: "18–30°C",
    soil: "Loamy",
    water: "Medium",
    season: "Spring & Monsoon",
    regions: ["Maharashtra", "Karnataka", "Uttar Pradesh"],
    benefits: "High germination, firm fruit, disease-tolerant.",
    emoji: "🍅",
  },
  {
    id: "chili-seed",
    name: "Country Chili Seeds",
    price: 35,
    unit: "15g pack",
    category: "seed",
    tagline: "Pungent, sun-loving variety",
    weather: "Hot & Dry",
    temp: "22–35°C",
    soil: "Sandy Loam",
    water: "Low",
    season: "Spring & Monsoon",
    regions: ["Andhra Pradesh", "Tamil Nadu", "Gujarat"],
    benefits: "Strong heat, long shelf life, drought-friendly.",
    emoji: "🌶️",
  },
  {
    id: "organic-manure",
    name: "Organic Manure",
    price: 120,
    unit: "5kg",
    category: "manure",
    tagline: "Composted fruit peels & farm waste",
    benefits: "Restores soil fertility naturally.",
    emoji: "🪴",
  },
  {
    id: "neem-cake",
    name: "Neem Cake",
    price: 150,
    unit: "2kg",
    category: "manure",
    tagline: "Natural pest deterrent",
    benefits: "Soil enricher and pest deterrent.",
    emoji: "🌾",
  },
  {
    id: "vermicompost",
    name: "Vermicompost",
    price: 180,
    unit: "5kg",
    category: "manure",
    tagline: "Earthworm-processed compost",
    benefits: "Boosts microbial activity in soil.",
    emoji: "🐛",
  },
  {
    id: "jamun-powder",
    name: "Jamun Seed Powder",
    price: 220,
    unit: "250g",
    category: "wellness",
    tagline: "Heritage food product",
    benefits: "Traditional wellness from sun-dried jamun seeds.",
    emoji: "🫙",
  },
];

export const STATES = [
  "All","Andhra Pradesh","Assam","Bihar","Gujarat","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Meghalaya","Rajasthan","Tamil Nadu","Uttar Pradesh",
];
export const WEATHERS = ["All","High Rainfall","Hot & Dry","Humid & Moderate","Warm Tropical"];
export const SEASONS = ["All","Monsoon","Spring & Monsoon"];
export const SOILS = ["All","Loamy","Moist Loamy","Sandy Loam","Well-drained"];
export const WATERS = ["All","Low","Medium","High"];
