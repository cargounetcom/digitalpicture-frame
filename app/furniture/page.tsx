"use client"

import { FurnitureHero } from "@/components/furniture-hero"
import { FurnitureProducts } from "@/components/furniture-products"
import { FurnitureCategories } from "@/components/furniture-categories"
import { FurnitureBanner } from "@/components/furniture-banner"
import { FurnitureTestimonials } from "@/components/furniture-testimonials"
import { FurnitureTrustBadges } from "@/components/furniture-trust-badges"
import { FurnitureHeader } from "@/components/furniture-header"
import { FurnitureFooter } from "@/components/furniture-footer"
import { FurnitureCartProvider } from "@/lib/furniture-cart-context"

export default function FurniturePage() {
  return (
    <FurnitureCartProvider>
      <div className="min-h-screen bg-background">
        <FurnitureHeader />
        <main>
          <FurnitureHero />
          <FurnitureCategories />
          <FurnitureProducts />
          <FurnitureBanner />
          <FurnitureTestimonials />
          <FurnitureTrustBadges />
        </main>
        <FurnitureFooter />
      </div>
    </FurnitureCartProvider>
  )
}
