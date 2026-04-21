"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { products, platforms, type Platform } from "@/lib/data"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
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

const categoryTabs = [
  { name: "All", value: "all" },
  { name: "Business", value: "business" },
  { name: "eCommerce", value: "ecommerce" },
  { name: "Blog", value: "blog" },
  { name: "Portfolio", value: "portfolio" },
  { name: "Starter Kits", value: "starter" },
]

// Platform icons
function WordPressIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-1.187.258-2.313.717-3.334l3.944 10.806A8.57 8.57 0 013.443 12zm8.557 8.557c-.883 0-1.735-.141-2.533-.399l2.691-7.813 2.755 7.55c.018.045.039.087.062.127-.931.35-1.94.535-2.975.535zm1.187-12.555c.539-.028 1.025-.084 1.025-.084.483-.056.426-.766-.057-.74 0 0-1.451.114-2.388.114-.883 0-2.368-.114-2.368-.114-.484-.027-.54.712-.057.74 0 0 .459.056.941.084l1.398 3.83-1.964 5.887-3.27-9.717c.54-.028 1.025-.084 1.025-.084.483-.056.426-.766-.057-.74 0 0-1.451.114-2.388.114-.168 0-.365-.004-.57-.01A8.522 8.522 0 0112 3.443c2.213 0 4.231.843 5.75 2.224-.037-.002-.072-.007-.109-.007-.883 0-1.509.769-1.509 1.596 0 .74.427 1.368.883 2.108.342.598.74 1.366.74 2.476 0 .768-.295 1.66-.685 2.903l-.897 2.996-3.241-9.644zm5.037 9.631l2.69-7.778c.503-1.256.67-2.26.67-3.154 0-.324-.022-.625-.057-.904a8.53 8.53 0 011.03 4.103 8.565 8.565 0 01-4.333 7.733z"/>
    </svg>
  )
}

function ShopifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.758c-.022-.145-.169-.233-.296-.238s-1.803-.135-1.803-.135-.994-.994-1.141-1.141c-.094-.094-.217-.135-.328-.135l-.912 20.948zM12.164 4.089l-.551 1.995s-.609-.308-1.347-.298c-1.077.016-1.088.744-1.088.932 0 .997 2.674 1.381 2.674 3.722 0 1.842-1.169 3.025-2.743 3.025-1.887 0-2.856-1.174-2.856-1.174l.509-1.668s.99.849 1.826.849c.549 0 .771-.432.771-.746 0-1.301-2.194-1.361-2.194-3.506 0-1.804 1.295-3.551 3.912-3.551.999 0 1.087.422 1.087.422z"/>
    </svg>
  )
}

function HtmlIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  )
}

function getPlatformIcon(platform: Platform) {
  switch (platform) {
    case 'wordpress':
      return <WordPressIcon className="h-4 w-4" />
    case 'shopify':
      return <ShopifyIcon className="h-4 w-4" />
    case 'html':
      return <HtmlIcon className="h-4 w-4" />
  }
}

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activePlatform, setActivePlatform] = useState<Platform | "all">("all")
  const [sortBy, setSortBy] = useState("featured")

  const filteredProducts = products.filter((product) => {
    const categoryMatch = activeCategory === "all" || product.category === activeCategory || (activeCategory === "starter" && product.type === "starter")
    const platformMatch = activePlatform === "all" || product.platform === activePlatform
    return categoryMatch && platformMatch
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
            Premium Templates & Themes
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our bestselling templates for WordPress, Shopify, and HTML trusted by 50,000+ customers worldwide.
          </p>
        </div>

        {/* Platform filter */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activePlatform === "all" ? "default" : "outline"}
            onClick={() => setActivePlatform("all")}
            className="gap-2"
          >
            All Platforms
          </Button>
          <Button
            variant={activePlatform === "wordpress" ? "default" : "outline"}
            onClick={() => setActivePlatform("wordpress")}
            className="gap-2"
          >
            <WordPressIcon className="h-4 w-4" />
            WordPress
          </Button>
          <Button
            variant={activePlatform === "shopify" ? "default" : "outline"}
            onClick={() => setActivePlatform("shopify")}
            className="gap-2"
          >
            <ShopifyIcon className="h-4 w-4" />
            Shopify
          </Button>
          <Button
            variant={activePlatform === "html" ? "default" : "outline"}
            onClick={() => setActivePlatform("html")}
            className="gap-2"
          >
            <HtmlIcon className="h-4 w-4" />
            HTML
          </Button>
        </div>

        {/* Category filters and sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeCategory === tab.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(tab.value)}
                className="rounded-full"
              >
                {tab.name}
              </Button>
            ))}
          </div>

          {/* Sort options */}
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
          Showing {sortedProducts.length} {activePlatform !== "all" ? activePlatform : ""} templates
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load more */}
        {sortedProducts.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Templates
            </Button>
          </div>
        )}

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found matching your filters.</p>
            <Button 
              variant="link" 
              onClick={() => { setActiveCategory("all"); setActivePlatform("all"); }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
