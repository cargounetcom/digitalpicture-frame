"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products, categories } from "@/lib/furniture-products"
import { FurnitureProductCard } from "@/components/furniture-product-card"

type Tab = "all" | "featured" | "new" | string

export function FurnitureProducts() {
  const [activeTab, setActiveTab] = useState<Tab>("all")

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "featured", label: "Featured" },
    { key: "new", label: "New Arrivals" },
    ...categories.map((c) => ({ key: c.slug, label: c.name })),
  ]

  const filtered = (() => {
    switch (activeTab) {
      case "all":
        return products.slice(0, 8)
      case "featured":
        return products.filter((p) => p.featured).slice(0, 8)
      case "new":
        return products.filter((p) => p.isNew).slice(0, 8)
      default:
        return products.filter((p) => p.categorySlug === activeTab).slice(0, 8)
    }
  })()

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-3 font-medium">
            Curated Selection
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl font-light text-foreground tracking-[0.02em]">
            Our Furniture
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 lg:gap-6 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-[11px] uppercase tracking-[0.15em] pb-1.5 border-b transition-colors font-medium ${
                activeTab === tab.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {filtered.map((product) => (
            <FurnitureProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all */}
        <div className="flex justify-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors font-medium"
          >
            View All Products
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
