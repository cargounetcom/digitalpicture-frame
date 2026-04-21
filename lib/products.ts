import { products } from './data'

export interface StripeProduct {
  id: string
  name: string
  description: string
  priceInCents: number
  images?: string[]
}

// Map products from data.ts to Stripe format
// This is the source of truth for all products passed to Stripe
export const PRODUCTS: StripeProduct[] = products.map((product) => ({
  id: product.id,
  name: product.title,
  description: product.description,
  priceInCents: Math.round(product.price * 100), // Convert dollars to cents
}))

// Helper to find a product by ID
export function getProductById(id: string): StripeProduct | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

// Helper to get all products
export function getAllProducts(): StripeProduct[] {
  return PRODUCTS
}
