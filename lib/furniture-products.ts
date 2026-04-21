export interface Product {
  id: string
  name: string
  slug: string
  price: number
  salePrice?: number
  image: string
  category: string
  categorySlug: string
  brand: string
  description: string
  shortDescription: string
  rating: number
  reviewCount: number
  inStock: boolean
  tags: string[]
  featured: boolean
  isNew?: boolean
}

export interface Category {
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    name: "Sofas",
    slug: "sofas",
    description: "Sculptural sofas and sectionals in premium fabrics for contemporary living.",
    image: "/images/cat-sofas.jpg",
    productCount: 12,
  },
  {
    name: "Chairs",
    slug: "chairs",
    description: "Designer dining and accent chairs with exceptional craftsmanship.",
    image: "/images/cat-chairs.jpg",
    productCount: 18,
  },
  {
    name: "Tables",
    slug: "tables",
    description: "Natural stone and solid wood tables for dining and living spaces.",
    image: "/images/cat-tables.jpg",
    productCount: 15,
  },
  {
    name: "Lighting",
    slug: "lighting",
    description: "Architectural floor lamps, pendants, and sculptural lighting pieces.",
    image: "/images/cat-lighting.jpg",
    productCount: 9,
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Elara Curved Sofa",
    slug: "elara-curved-sofa",
    price: 5200,
    salePrice: 4400,
    image: "/images/prod-sofa-1.jpg",
    category: "Sofas",
    categorySlug: "sofas",
    brand: "Atelier Perseida",
    description: "The Elara Curved Sofa draws from mid-century modernism and Italian sculpture. Its sweeping arc silhouette is upholstered in premium cream boucle with high-resilience foam cushioning. Hand-finished solid walnut legs and reinforced steel frame ensure lasting beauty and structural integrity. Each piece is made to order in our European atelier.",
    shortDescription: "Sculptural curved sofa in premium cream boucle.",
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    tags: ["sofa", "boucle", "curved", "living room"],
    featured: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Nyx Modular Sectional",
    slug: "nyx-modular-sectional",
    price: 6800,
    salePrice: 5900,
    image: "/images/prod-sofa-2.jpg",
    category: "Sofas",
    categorySlug: "sofas",
    brand: "Atelier Perseida",
    description: "The Nyx Modular Sectional offers limitless configuration possibilities. Deep feather-wrapped cushions in warm sand velvet sit atop a solid beech frame. The modular design allows you to reconfigure as your space evolves. Available in 14 fabric options.",
    shortDescription: "Modular L-shaped sectional in warm sand velvet.",
    rating: 4.8,
    reviewCount: 33,
    inStock: true,
    tags: ["sofa", "modular", "velvet", "sectional"],
    featured: true,
  },
  {
    id: "3",
    name: "Callisto Dining Table",
    slug: "callisto-dining-table",
    price: 4200,
    image: "/images/prod-table-1.jpg",
    category: "Tables",
    categorySlug: "tables",
    brand: "Maison Ember",
    description: "The Callisto Dining Table is crafted from a single slab of Italian travertine, each piece uniquely patterned by nature. The monolithic base with rounded edges creates a sculptural presence. Seats 8 comfortably. Sealed and protected for daily use while preserving the stone's natural character.",
    shortDescription: "Monolithic Italian travertine dining table.",
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    tags: ["table", "travertine", "dining", "stone"],
    featured: true,
    isNew: true,
  },
  {
    id: "4",
    name: "Selene Side Table",
    slug: "selene-side-table",
    price: 1950,
    image: "/images/prod-table-2.jpg",
    category: "Tables",
    categorySlug: "tables",
    brand: "Maison Ember",
    description: "The Selene Side Table pairs a hand-turned oak pedestal base with a Calacatta marble top. The geometric tension between the organic wood grain and the precision-cut stone creates a compelling visual dialogue. Ideal as a bedside companion or living room accent.",
    shortDescription: "Oak pedestal side table with Calacatta marble top.",
    rating: 4.7,
    reviewCount: 22,
    inStock: true,
    tags: ["side table", "marble", "oak", "bedroom"],
    featured: true,
  },
  {
    id: "5",
    name: "Artemis Dining Chair",
    slug: "artemis-dining-chair",
    price: 1680,
    image: "/images/prod-chair-1.jpg",
    category: "Chairs",
    categorySlug: "chairs",
    brand: "Atelier Perseida",
    description: "The Artemis Dining Chair embodies quiet luxury. A gracefully curved backrest in cream velvet meets hand-polished brushed brass legs. The ergonomic form provides extended comfort for long dinner parties. Stain-resistant fabric treatment comes standard.",
    shortDescription: "Velvet dining chair with brushed brass legs.",
    rating: 4.9,
    reviewCount: 58,
    inStock: true,
    tags: ["chair", "dining", "velvet", "brass"],
    featured: true,
    isNew: true,
  },
  {
    id: "6",
    name: "Io Accent Chair",
    slug: "io-accent-chair",
    price: 1520,
    salePrice: 1290,
    image: "/images/prod-chair-2.jpg",
    category: "Chairs",
    categorySlug: "chairs",
    brand: "Maison Ember",
    description: "The Io Accent Chair balances organic softness with structural clarity. Its enveloping boucle shell sits on hand-turned solid ash legs. The wide seat and supportive back make it perfect for reading nooks and conversation corners.",
    shortDescription: "Sculptural boucle accent chair with ash legs.",
    rating: 4.6,
    reviewCount: 36,
    inStock: true,
    tags: ["chair", "accent", "boucle", "living room"],
    featured: true,
  },
  {
    id: "7",
    name: "Lyra Arc Floor Lamp",
    slug: "lyra-arc-floor-lamp",
    price: 2450,
    image: "/images/prod-lamp-1.jpg",
    category: "Lighting",
    categorySlug: "lighting",
    brand: "Atelier Perseida",
    description: "The Lyra Arc Floor Lamp rises in a dramatic sweep of matte black steel, extending a generous linen drum shade over seating areas below. At 210cm tall, it transforms any corner into an intimate reading vignette. Dimmable LED compatible for perfect ambiance control.",
    shortDescription: "Arched floor lamp with oversized linen shade.",
    rating: 4.8,
    reviewCount: 25,
    inStock: true,
    tags: ["lamp", "floor lamp", "arched", "steel"],
    featured: false,
    isNew: true,
  },
  {
    id: "8",
    name: "Mira Pendant Light",
    slug: "mira-pendant-light",
    price: 1980,
    image: "/images/prod-lamp-2.jpg",
    category: "Lighting",
    categorySlug: "lighting",
    brand: "Maison Ember",
    description: "The Mira Pendant Light is inspired by Japanese wabi-sabi aesthetics. Layered handcrafted ceramic shades create a soft, diffused glow with subtle texture variations. Each piece is hand-finished, making every light uniquely beautiful.",
    shortDescription: "Layered ceramic pendant with Japanese influence.",
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    tags: ["pendant", "ceramic", "japanese", "dining"],
    featured: false,
  },
  {
    id: "9",
    name: "Vesta Nightstand",
    slug: "vesta-nightstand",
    price: 1350,
    image: "/images/prod-sidetable-1.jpg",
    category: "Tables",
    categorySlug: "tables",
    brand: "Maison Ember",
    description: "The Vesta Nightstand is crafted from FSC-certified European oak with a single soft-close drawer and open display shelf. The clean geometric form is finished with a hand-applied matte lacquer that enhances the natural grain. Available in natural oak and smoked walnut.",
    shortDescription: "Minimalist European oak nightstand.",
    rating: 4.5,
    reviewCount: 28,
    inStock: true,
    tags: ["nightstand", "oak", "bedroom", "minimal"],
    featured: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew)
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.includes(lower))
  )
}
