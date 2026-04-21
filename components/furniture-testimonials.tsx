"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Charlotte Moreau",
    role: "Interior Designer, Paris",
    text: "Perseida pieces have become my go-to recommendation for clients seeking that perfect balance of timeless design and contemporary comfort. The Elara sofa is a masterpiece.",
  },
  {
    name: "James Whitfield",
    role: "Architect, London",
    text: "The craftsmanship is extraordinary. I've furnished three projects exclusively with Perseida and each piece elevates the entire space. Aurora's vision is unmatched.",
  },
  {
    name: "Sofia Andersson",
    role: "Homeowner, Stockholm",
    text: "We chose the Callisto table for our dining room and it has transformed every meal into an occasion. The travertine is absolutely stunning and each guest comments on it.",
  },
  {
    name: "Marcus Chen",
    role: "Creative Director, New York",
    text: "In a world of mass production, Perseida reminds us what design should feel like. Every detail is considered, every material is intentional. Simply beautiful.",
  },
]

export function FurnitureTestimonials() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left - collection image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src="/images/collection-set.jpg"
                alt="Perseida curated collection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right - testimonial carousel */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-6 font-medium">
              Client Stories
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground tracking-[0.02em] mb-10">
              What They Say
            </h2>

            <div className="relative min-h-[180px]">
              <blockquote
                key={current}
                className="animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <p className="text-foreground text-base lg:text-lg leading-relaxed font-light">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-[12px] font-medium text-foreground uppercase tracking-[0.1em]">
                    {testimonials[current].name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {testimonials[current].role}
                  </p>
                </footer>
              </blockquote>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="h-10 w-10 border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.2} />
              </button>
              <button
                onClick={next}
                className="h-10 w-10 border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.2} />
              </button>
              <span className="text-[11px] text-muted-foreground tracking-wider font-medium tabular-nums ml-2">
                {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
