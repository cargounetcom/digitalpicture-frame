"use client"

import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/cart-store"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
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
        
        {/* Badge */}
        {product.badge && (
          <Badge
            variant={getBadgeVariant(product.badge)}
            className="absolute top-3 left-3"
          >
            {product.badge}
          </Badge>
        )}

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
