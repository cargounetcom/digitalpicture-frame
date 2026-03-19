import { StoreHeader } from "@/components/store-header"
import { HeroBanner } from "@/components/hero-banner"
import { CollectionsGrid } from "@/components/collections-grid"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesSection } from "@/components/features-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { StoreFooter } from "@/components/store-footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main>
        <HeroBanner />
        <FeaturesSection />
        <CollectionsGrid />
        <ProductGrid />
        <NewsletterSection />
      </main>
      <StoreFooter />
      <CartDrawer />
    </div>
  )
}
