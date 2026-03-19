"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { ChevronDown, Grid3X3, LayoutList, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sortOptions = [
  { name: "Featured", value: "featured" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
  { name: "Best Rating", value: "rating" },
  { name: "Best Selling", value: "sales" },
]

const filterTabs = [
  { name: "All Themes", value: "all" },
  { name: "Business", value: "business" },
  { name: "eCommerce", value: "ecommerce" },
  { name: "Blog", value: "blog" },
  { name: "Portfolio", value: "portfolio" },
]

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  const filteredProducts = products.filter((product) => {
    if (activeFilter === "all") return true
    return product.category === activeFilter
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "sales":
        return (b.sales || 0) - (a.sales || 0)
      default:
        return b.featured ? 1 : -1
    }
  })

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Premium WordPress Themes
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our bestselling WordPress themes trusted by 50,000+ customers worldwide.
          </p>
        </div>

        {/* Filters and sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeFilter === tab.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(tab.value)}
                className="rounded-full"
              >
                {tab.name}
              </Button>
            ))}
          </div>

          {/* Sort and view options */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={sortBy === option.value ? "bg-accent" : ""}
                  >
                    {option.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {sortedProducts.length} themes
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Themes
          </Button>
        </div>
      </div>
    </section>
  )
}
