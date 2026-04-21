"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "/images/slide-1.jpg",
    subtitle: "New Collection 2026",
    title: "Living Room\nEssentials",
    description: "Sculptural forms meet everyday comfort. Discover sofas, chairs, and accents designed to transform your living space into a sanctuary.",
    cta: "Explore Living",
    href: "/shop?category=sofas",
  },
  {
    image: "/images/slide-2.jpg",
    subtitle: "Curated Dining",
    title: "The Art of\nGathering",
    description: "Natural stone tables and handcrafted seating for memorable moments. Each piece tells a story of material and making.",
    cta: "Shop Dining",
    href: "/shop?category=tables",
  },
  {
    image: "/images/slide-3.jpg",
    subtitle: "Bedroom Retreat",
    title: "Rest in\nQuiet Luxury",
    description: "Organic materials and considered design create spaces for deep rest. Beds, nightstands, and lighting for the modern bedroom.",
    cta: "View Bedroom",
    href: "/shop",
  },
]

export function FurnitureHero() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const goTo = useCallback((index: number, dir: "next" | "prev" = "next") => {
    if (isTransitioning) return
    setDirection(dir)
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next")
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev")
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-[80vh] lg:h-[90vh] overflow-hidden bg-secondary">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[800ms] ease-out ${
            i === current
              ? "opacity-100 z-10 scale-100"
              : "opacity-0 z-0 scale-105"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title.replace("\n", " ")}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/25" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
          <div className="max-w-xl">
            <p
              key={`sub-${current}`}
              className="text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500 font-medium"
            >
              {slides[current].subtitle}
            </p>
            <h1
              key={`title-${current}`}
              className="font-serif text-4xl md:text-6xl lg:text-[72px] font-light text-primary-foreground leading-[1.05] whitespace-pre-line animate-in fade-in slide-in-from-bottom-4 duration-700 tracking-[0.02em]"
            >
              {slides[current].title}
            </h1>
            <p
              key={`desc-${current}`}
              className="text-primary-foreground/60 text-[13px] lg:text-sm mt-6 max-w-md leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
            >
              {slides[current].description}
            </p>
            <Link
              key={`cta-${current}`}
              href={slides[current].href}
              className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-primary-foreground/90 transition-colors mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
            >
              {slides[current].cta}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 right-4 lg:right-8 z-20 flex items-center gap-2">
        <button
          onClick={prev}
          className="h-12 w-12 border border-primary-foreground/25 bg-primary-foreground/5 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/15 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.2} />
        </button>
        <button
          onClick={next}
          className="h-12 w-12 border border-primary-foreground/25 bg-primary-foreground/5 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/15 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.2} />
        </button>
      </div>

      {/* Slide counter + indicators */}
      <div className="absolute bottom-8 left-4 lg:left-8 z-20 flex items-center gap-4">
        <span className="text-[11px] text-primary-foreground/50 tracking-wider font-medium tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              className={`h-px transition-all duration-700 ${
                i === current ? "w-10 bg-primary-foreground" : "w-5 bg-primary-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
