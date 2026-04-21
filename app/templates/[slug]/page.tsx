"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products, licenses } from "@/lib/data"
import { useCartStore } from "@/lib/cart-store"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCartStore()
  
  const product = products.find((p) => p.id === params.slug)
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/collections">Back to Collections</Link>
          </Button>
        </div>
      </div>
    )
  }

  const license = licenses.find((l) => l.type === product.license)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Link href="/" className="font-bold text-xl">Digital Picture Frame</Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.gallery.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="capitalize">{product.platform}</Badge>
              <Badge variant="outline">{product.category}</Badge>
              {product.badge && <Badge variant="destructive">{product.badge}</Badge>}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Author & Rating */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>by <span className="text-foreground font-medium">{product.author}</span></span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{product.rating}</span>
                <span>({product.reviews.toLocaleString()} reviews)</span>
              </div>
              {product.sales && (
                <span>{product.sales.toLocaleString()} sales</span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.fullDescription || product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {product.price === 0 ? (
                <span className="text-4xl font-bold text-primary">Free</span>
              ) : (
                <>
                  <span className="text-4xl font-bold">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.compareAtPrice}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* License Info */}
            {license && (
              <div className="p-4 rounded-lg bg-muted/50 border">
                <h3 className="font-semibold mb-2">{license.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{license.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {license.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1" onClick={() => addItem(product)}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/checkout/${product.id}`}>
                  Buy Now
                </Link>
              </Button>
              {product.demoUrl && (
                <Button size="lg" variant="secondary" asChild>
                  <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
              <div>
                <span className="text-muted-foreground">Version:</span>
                <span className="ml-2 font-medium">{product.version}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Update:</span>
                <span className="ml-2 font-medium">{product.lastUpdate}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Compatibility:</span>
                <span className="ml-2 font-medium">{product.compatibility.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Features & Documentation */}
        <div className="mt-12">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tags" className="mt-6">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="support" className="mt-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3>Documentation & Support</h3>
                <p>Get help with installation, customization, and troubleshooting.</p>
                {product.documentation && (
                  <Button asChild variant="outline">
                    <a href={product.documentation} target="_blank" rel="noopener noreferrer">
                      View Documentation
                    </a>
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
