"use client"

import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/cart-store"
import type { Product, Platform } from "@/lib/data"

interface ProductCardProps {
  product: Product
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

function getPlatformIcon(platform: Platform) {
  switch (platform) {
    case 'wordpress':
      return <WordPressIcon className="h-3.5 w-3.5" />
    case 'shopify':
      return <ShopifyIcon className="h-3.5 w-3.5" />
    case 'html':
      return <HtmlIcon className="h-3.5 w-3.5" />
  }
}

function getPlatformColor(platform: Platform) {
  switch (platform) {
    case 'wordpress':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'shopify':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'html':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
  }
}

function getPlatformName(platform: Platform) {
  switch (platform) {
    case 'wordpress':
      return 'WordPress'
    case 'shopify':
      return 'Shopify'
    case 'html':
      return 'HTML'
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Free':
        return 'default'
      case 'Sale':
        return 'destructive'
      case 'Bestseller':
        return 'default'
      case 'New':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <Card className="group relative overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges row */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {/* Platform badge */}
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${getPlatformColor(product.platform)}`}>
            {getPlatformIcon(product.platform)}
            {getPlatformName(product.platform)}
          </div>
          
          {/* Status badge */}
          {product.badge && (
            <Badge
              variant={getBadgeVariant(product.badge)}
            >
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full shadow-md bg-card/90 backdrop-blur-sm hover:bg-card"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>

        {/* Add to cart overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            className="w-full"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <div className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Rating and Sales */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
          {product.sales && (
            <span className="text-xs text-muted-foreground">
              {product.sales.toLocaleString()} sales
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          {product.price === 0 ? (
            <span className="text-lg font-bold text-primary">Free</span>
          ) : (
            <>
              <span className="text-lg font-bold text-foreground">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.compareAtPrice}
                </span>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
