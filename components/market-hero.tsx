"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MarketHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Aurora Ember-Cyber Templates
          </p>
          
          {/* Main Headline */}
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            EcoHome Templates for
            <br />
            <span className="italic">Digital Picture Frames</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Premium e-commerce templates designed specifically for digital picture frame stores. 
            Nordic-inspired design for WooCommerce, Shopify, and WordPress. 
            Built for digitalpictureframe.shop.
          </p>
          
          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="group h-12 px-8 text-sm tracking-wide"
            >
              Browse Templates
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-12 px-8 text-sm tracking-wide"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
            <div className="absolute inset-8 rounded-sm border border-border bg-card shadow-2xl">
              {/* Mock Browser Chrome */}
              <div className="flex h-10 items-center gap-2 border-b border-border px-4">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="ml-4 flex-1 rounded bg-secondary px-3 py-1">
                  <span className="text-[10px] text-muted-foreground">digitalpictureframe.shop</span>
                </div>
              </div>
              {/* Mock Content */}
              <div className="grid h-[calc(100%-2.5rem)] grid-cols-12 gap-4 p-6">
                <div className="col-span-4 space-y-4">
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="h-3 w-32 rounded bg-muted/60" />
                  <div className="mt-8 space-y-3">
                    <div className="h-3 w-24 rounded bg-muted/40" />
                    <div className="h-3 w-28 rounded bg-muted/40" />
                    <div className="h-3 w-20 rounded bg-muted/40" />
                    <div className="h-3 w-26 rounded bg-muted/40" />
                  </div>
                </div>
                <div className="col-span-8 grid grid-cols-3 gap-3">
                  <div className="aspect-square rounded bg-secondary" />
                  <div className="aspect-square rounded bg-muted" />
                  <div className="aspect-square rounded bg-secondary" />
                  <div className="aspect-square rounded bg-muted" />
                  <div className="aspect-square rounded bg-secondary" />
                  <div className="aspect-square rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          <div className="text-center">
            <p className="font-serif text-3xl text-foreground">12k+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Happy Customers</p>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="text-center">
            <p className="font-serif text-3xl text-foreground">4.9</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Average Rating</p>
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="text-center">
            <p className="font-serif text-3xl text-foreground">50+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Premium Templates</p>
          </div>
        </div>
      </div>
    </section>
  )
}
