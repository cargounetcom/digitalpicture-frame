import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/furniture-products"

export function FurnitureCategories() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-3 font-medium">
              Collections
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl font-light text-foreground tracking-[0.02em]">
              Shop by Room
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[11px] uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors font-medium"
          >
            View All
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-[12px] uppercase tracking-[0.15em] font-medium text-foreground">
                  {category.name}
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  {category.productCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
