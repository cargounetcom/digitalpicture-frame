import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-16 lg:py-24">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              New Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Premium Digital Products for Your Business
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              Discover our curated collection of templates, plugins, and SaaS solutions. 
              Launch faster with professionally designed digital products.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-base">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                View Collections
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8">
              <div>
                <div className="text-3xl font-bold text-foreground">2,500+</div>
                <div className="text-sm text-muted-foreground">Products Sold</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">15K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="hidden sm:block">
                <div className="text-3xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="flex-1 relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />
              <div className="absolute inset-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                <img
                  src="/templates/saas-dashboard.jpg"
                  alt="Featured product"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg">30%</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Spring Sale</div>
                    <div className="text-xs text-muted-foreground">Limited time offer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
