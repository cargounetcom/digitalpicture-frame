import type { Metadata } from 'next'
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { platforms, collections, products } from "@/lib/data"

export const metadata: Metadata = {
  title: 'All Collections | Browse Themes & Templates',
  description: 'Browse all ThemeMarket collections. WordPress, Shopify, WooCommerce, and HTML templates organized by platform and category.',
  keywords: ['theme collections', 'template categories', 'wordpress themes', 'shopify themes', 'html templates'],
}

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

function WooCommerceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.227 4.857A2.228 2.228 0 000 7.094v7.457c0 1.236 1.001 2.237 2.237 2.237h9.253l4.229 2.355-.962-2.355h7.006c1.236 0 2.237-1 2.237-2.237V7.094c0-1.236-1.001-2.237-2.237-2.237H2.227zm.424 1.093h18.698c.625 0 1.134.509 1.134 1.134v7.457c0 .625-.509 1.134-1.134 1.134h-7.721l.601 1.47-2.64-1.47H2.651c-.625 0-1.134-.509-1.134-1.134V7.084c0-.625.509-1.134 1.134-1.134z"/>
    </svg>
  )
}

const platformIcons = {
  wordpress: WordPressIcon,
  shopify: ShopifyIcon,
  html: HtmlIcon,
  woocommerce: WooCommerceIcon,
}

const platformColors = {
  wordpress: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  shopify: 'bg-green-500/10 text-green-600 border-green-500/20',
  html: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  woocommerce: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

export default function CollectionsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Browse Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our curated collections of premium themes and templates for every platform and category.
          </p>
        </div>

        {/* Platforms Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">By Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform) => {
              const Icon = platformIcons[platform.id]
              const productCount = products.filter(p => p.platform === platform.id).length
              
              return (
                <Link key={platform.id} href={`/collections/${platform.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${platformColors[platform.id]}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        {platform.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{productCount} templates</Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">By Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.filter(c => c.id !== 'all').map((collection) => {
              const categoryProducts = products.filter(p => p.category === collection.id)
              
              return (
                <Link key={collection.id} href={`/collections/category/${collection.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {collection.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {collection.description}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4 flex items-center justify-between">
                      <Badge variant="secondary">{categoryProducts.length} templates</Badge>
                      <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Browse <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
