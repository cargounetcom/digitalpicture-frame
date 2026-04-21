"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import type { Product, Platform } from "@/lib/data"

interface BreadcrumbItem {
  label: string
  href: string
}

interface CollectionPageContentProps {
  title: string
  description: string
  products: Product[]
  platformId?: Platform
  categoryId?: string
  breadcrumb: BreadcrumbItem[]
}

export function CollectionPageContent({
  title,
  description,
  products,
  platformId,
  categoryId,
  breadcrumb,
}: CollectionPageContentProps) {
  const [sortBy, setSortBy] = useState("featured")
  const [gridCols, setGridCols] = useState<3 | 4>(3)
  const [priceFilter, setPriceFilter] = useState("all")

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "sales":
        return (b.sales || 0) - (a.sales || 0)
      case "newest":
        return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      default:
        return b.featured ? 1 : -1
    }
  })

  // Filter by price
  const filteredProducts = sortedProducts.filter(product => {
    switch (priceFilter) {
      case "free":
        return product.price === 0
      case "under-50":
        return product.price > 0 && product.price < 50
      case "50-100":
        return product.price >= 50 && product.price <= 100
      case "over-100":
        return product.price > 100
      default:
        return true
    }
  })

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))]

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          {breadcrumb.map((item, index) => (
            <span key={item.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {index === breadcrumb.length - 1 ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">{title}</h1>
          <p className="text-muted-foreground max-w-3xl text-pretty">{description}</p>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{filteredProducts.length} Templates</Badge>
            {categories.map(cat => (
              <Badge key={cat} variant="outline" className="capitalize">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[140px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="over-100">Over $100</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="sales">Best Selling</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={gridCols === 3 ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setGridCols(3)}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">3 columns</span>
            </Button>
            <Button
              variant={gridCols === 4 ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setGridCols(4)}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">4 columns</span>
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            gridCols === 4 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No templates found matching your filters.</p>
            <Button variant="outline" onClick={() => { setPriceFilter("all"); setSortBy("featured") }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            About {title}
          </h2>
          <div className="prose prose-sm text-muted-foreground max-w-none">
            <p className="text-pretty">
              Browse our curated collection of {title.toLowerCase()}. Each template is carefully reviewed for quality, 
              performance, and best practices. All templates include lifetime updates, detailed documentation, 
              and dedicated support to help you build your perfect website.
            </p>
            <p className="mt-4 text-pretty">
              Whether you are building a business website, online store, portfolio, or blog, 
              our {title.toLowerCase()} provide the perfect foundation. Choose from free starter templates 
              or premium themes with advanced features and priority support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
