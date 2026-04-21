import { Metadata } from "next"
import Link from "next/link"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "All Templates | Digital Picture Frame",
  description: "Browse all premium templates for WordPress, Shopify, WooCommerce, and HTML.",
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Link href="/" className="font-bold text-xl">Digital Picture Frame</Link>
          <div className="flex gap-4">
            <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground">Collections</Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">Admin</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Templates</h1>
          <p className="text-muted-foreground">Browse {products.length} premium templates</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
