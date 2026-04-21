"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { Product } from "@/lib/furniture-products"

interface FurnitureProductCardProps {
  product: Product
}

export function FurnitureProductCard({ product }: FurnitureProductCardProps) {
  const hasDiscount = product.salePrice !== undefined
  const displayPrice = product.salePrice ?? product.price

  return (
    <article className="group relative bg-card">
      {/* Image */}
      <Link href={`/furniture/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-foreground text-background text-[9px] font-medium uppercase tracking-[0.15em] px-2.5 py-1">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-accent text-accent-foreground text-[9px] font-medium uppercase tracking-[0.15em] px-2.5 py-1">
              Sale
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4 text-foreground" strokeWidth={1.5} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5 font-medium">
          {product.brand}
        </p>
        <Link href={`/furniture/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-foreground leading-snug hover:text-muted-foreground transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
          {product.shortDescription}
        </p>
        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm font-medium text-foreground">
            ${displayPrice.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-muted-foreground line-through">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
