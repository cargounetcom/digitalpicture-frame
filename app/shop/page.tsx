"use client"

import { MarketHeader } from "@/components/market-header"
import { MarketHero } from "@/components/market-hero"
import { TemplateShowcase } from "@/components/template-showcase"
import { MarketFeatures } from "@/components/market-features"
import { Testimonials } from "@/components/testimonials"
import { MarketFooter } from "@/components/market-footer"

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <MarketHeader />
      <MarketHero />
      <TemplateShowcase />
      <MarketFeatures />
      <Testimonials />
      <MarketFooter />
    </main>
  )
}
