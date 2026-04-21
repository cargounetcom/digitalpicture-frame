"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote: "The Hygge theme transformed our brand. Sales increased by 40% within the first month of launch. The attention to detail is remarkable.",
    author: "Emma Lindqvist",
    role: "Founder, Kulla Home",
    platform: "Shopify",
  },
  {
    quote: "Finally, a theme that understands minimalism without sacrificing functionality. Our customers love the clean, intuitive shopping experience.",
    author: "Marcus Berg",
    role: "Creative Director, Studio Norden",
    platform: "WooCommerce",
  },
  {
    quote: "The support team is incredible. They helped us customize the Fjord theme to perfectly match our brand identity. Highly recommended.",
    author: "Sofia Hansen",
    role: "CEO, Scandinavian Ceramics",
    platform: "WooCommerce",
  },
  {
    quote: "We switched from a custom-built solution to the Birch theme. The result? Faster load times, better UX, and a 25% increase in conversions.",
    author: "Andreas Mikkelsen",
    role: "Tech Lead, Nordic Agency",
    platform: "WordPress",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Recognition
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mx-auto mt-12 max-w-4xl">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <Quote className="h-12 w-12 text-accent/20" />
          </div>

          {/* Testimonial Content */}
          <div className="relative min-h-[280px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500",
                  index === activeIndex 
                    ? "opacity-100 translate-x-0" 
                    : index < activeIndex 
                      ? "opacity-0 -translate-x-full" 
                      : "opacity-0 translate-x-full"
                )}
              >
                <blockquote className="font-serif text-xl leading-relaxed sm:text-2xl lg:text-3xl text-balance">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-8">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.platform}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button 
              onClick={prevTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    index === activeIndex 
                      ? "w-6 bg-accent" 
                      : "bg-border hover:bg-muted-foreground"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by leading brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {["Muuto", "HAY", "Fritz Hansen", "Menu", "Ferm Living", "Normann"].map((brand) => (
              <span 
                key={brand} 
                className="font-serif text-lg text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
