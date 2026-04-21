"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Checkout from "@/components/checkout"
import { products } from "@/lib/data"

export default function CheckoutPage() {
  const params = useParams()
  const productId = params.productId as string
  
  const product = products.find((p) => p.id === productId)
  
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/templates/${product.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Product
            </Link>
          </Button>
          <Link href="/" className="font-bold text-xl">Digital Picture Frame</Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-xl border bg-card">
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  
                  <div className="flex gap-4 pb-4 border-b">
                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-2">{product.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{product.platform} {product.type}</p>
                      <p className="text-sm text-muted-foreground capitalize">{product.license} License</p>
                    </div>
                  </div>
                  
                  <div className="py-4 space-y-2 border-b">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="p-4 rounded-xl border bg-muted/50">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Secure Purchase</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Instant digital delivery</li>
                    <li>30-day money back guarantee</li>
                    <li>Lifetime updates included</li>
                    <li>Premium support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stripe Checkout */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="rounded-xl border bg-card overflow-hidden">
                <div className="p-6 border-b bg-muted/50">
                  <h1 className="text-xl font-semibold">Complete Your Purchase</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your payment details to complete the order
                  </p>
                </div>
                <div className="p-6">
                  <Checkout productId={productId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
