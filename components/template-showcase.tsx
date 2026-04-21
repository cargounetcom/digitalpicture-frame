"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const platforms = [
  { id: "all", label: "All Templates" },
  { id: "shopify", label: "Shopify" },
  { id: "woocommerce", label: "WooCommerce" },
  { id: "wordpress", label: "WordPress" },
]

const templates = [
  {
    id: 1,
    name: "Woo EcoHome Shopify",
    description: "Premium Shopify theme for digital picture frames and smart home displays",
    platform: "shopify",
    price: "$89",
    category: "Digital Frames",
    featured: true,
    author: "Aurora Ember-Cyber",
  },
  {
    id: 2,
    name: "Woo EcoHome Shopify Pro",
    description: "Advanced Shopify theme with multi-variant support for digital frame stores",
    platform: "shopify",
    price: "$129",
    category: "Digital Frames",
    featured: false,
    author: "Aurora Ember-Cyber",
  },
  {
    id: 3,
    name: "News EcoHome Shopify",
    description: "Magazine-style Shopify theme for digital frame news, reviews, and tech content",
    platform: "shopify",
    price: "$79",
    category: "News & Magazine",
    featured: true,
    author: "Aurora Ember-Cyber",
  },
  {
    id: 4,
    name: "Parfume EcoHome Shopify",
    description: "Elegant Shopify theme for luxury fragrance and beauty e-commerce stores",
    platform: "shopify",
    price: "$99",
    category: "Luxury & Beauty",
    featured: true,
    author: "Aurora Ember-Cyber",
  },
  {
    id: 5,
    name: "Woo EcoHome WP",
    description: "WooCommerce theme designed for digital picture frame e-commerce stores",
    platform: "woocommerce",
    price: "$79",
    category: "Digital Frames",
    featured: true,
    author: "Aurora Ember-Cyber",
  },
  {
    id: 6,
    name: "Woo EcoHome WP Pro",
    description: "Professional WooCommerce theme with advanced product galleries and comparison tools",
    platform: "woocommerce",
    price: "$119",
    category: "Digital Frames",
    featured: false,
    author: "Aurora Ember-Cyber",
  },
  {
    id: 7,
    name: "News EcoHome WP",
    description: "WordPress theme for tech news, digital frame reviews, and smart home magazines",
    platform: "wordpress",
    price: "$69",
    category: "News & Magazine",
    featured: false,
    author: "Aurora Ember-Cyber",
  },
  {
    id: 8,
    name: "Parfume EcoHome WP",
    description: "WooCommerce theme for luxury perfume and fragrance boutiques",
    platform: "woocommerce",
    price: "$89",
    category: "Luxury & Beauty",
    featured: false,
    author: "Aurora Ember-Cyber",
  },
]

export function TemplateShowcase() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredTemplates = activeFilter === "all" 
    ? templates 
    : templates.filter(t => t.platform === activeFilter)

  return (
    <section id="templates" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Selected Work
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Premium templates
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Each theme is crafted with attention to detail, optimized for 
              performance, and designed to elevate your brand.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setActiveFilter(platform.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all",
                  activeFilter === platform.id
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* View All */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="h-12 px-8">
            View All Templates
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function TemplateCard({ template }: { template: typeof templates[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  const platformColors: Record<string, string> = {
    shopify: "bg-[#96BF47]/10 text-[#96BF47]",
    woocommerce: "bg-[#9B5C8F]/10 text-[#9B5C8F]",
    wordpress: "bg-[#21759B]/10 text-[#21759B]",
  }

  return (
    <article 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary">
        {/* Mock Template Preview */}
        <div className={cn(
          "absolute inset-0 transition-transform duration-500",
          isHovered ? "scale-105" : "scale-100"
        )}>
          <div className="absolute inset-4 rounded bg-card shadow-lg">
            {/* Mock Header */}
            <div className="flex h-8 items-center justify-between border-b border-border px-4">
              <div className="h-2 w-16 rounded bg-muted" />
              <div className="flex gap-2">
                <div className="h-2 w-8 rounded bg-muted/60" />
                <div className="h-2 w-8 rounded bg-muted/60" />
              </div>
            </div>
            {/* Mock Content - Digital Frame Preview */}
            <div className="grid grid-cols-2 gap-2 p-4">
              <div className="col-span-2 aspect-[16/9] rounded bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center">
                <div className="h-8 w-12 rounded border-2 border-muted/60" />
              </div>
              <div className="aspect-square rounded bg-muted/50" />
              <div className="aspect-square rounded bg-muted/40" />
            </div>
          </div>
        </div>

        {/* Overlay on Hover */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-foreground/80 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button 
            variant="secondary" 
            size="sm"
            className="text-xs"
          >
            Preview Theme
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        {/* Featured Badge */}
        {template.featured && (
          <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] uppercase tracking-wider text-accent-foreground">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-lg leading-tight">{template.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {template.description}
            </p>
          </div>
          <span className="font-serif text-lg">{template.price}</span>
        </div>

        {/* Author */}
        <p className="mt-2 text-xs text-muted-foreground">
          by <span className="text-foreground">{template.author}</span>
        </p>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-3">
          <span className={cn(
            "rounded-full px-3 py-1 text-[10px] uppercase tracking-wider",
            platformColors[template.platform]
          )}>
            {template.platform}
          </span>
          <span className="text-xs text-muted-foreground">
            {template.category}
          </span>
        </div>
      </div>
    </article>
  )
}
