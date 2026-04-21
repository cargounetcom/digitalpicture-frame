import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const promos = [
  {
    image: "/images/promo-living.jpg",
    label: "Living Room",
    discount: "30% Off",
    href: "/shop?category=sofas",
  },
  {
    image: "/images/promo-dining.jpg",
    label: "Dining",
    discount: "New Season",
    href: "/shop?category=tables",
  },
  {
    image: "/images/promo-bedroom.jpg",
    label: "Bedroom",
    discount: "20% Off",
    href: "/shop?category=tables",
  },
]

export function FurnitureBanner() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          {promos.map((promo) => (
            <Link
              key={promo.label}
              href={promo.href}
              className="group relative aspect-[4/5] overflow-hidden bg-secondary"
            >
              <Image
                src={promo.image}
                alt={promo.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-foreground/15 group-hover:bg-foreground/25 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <span className="text-[10px] uppercase tracking-[0.35em] text-primary-foreground/70 font-medium mb-2">
                  {promo.discount}
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl font-light text-primary-foreground tracking-[0.02em]">
                  {promo.label}
                </h3>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-foreground mt-4 border-b border-primary-foreground/40 pb-0.5 group-hover:border-primary-foreground transition-colors font-medium">
                  Explore
                  <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
