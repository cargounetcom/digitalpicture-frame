import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-16 lg:py-24">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-sm font-medium text-primary mb-4 bg-primary/10 px-3 py-1 rounded-full">
              Premium WordPress Themes
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Beautiful WordPress Themes for Every Project
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              Discover premium WordPress themes trusted by 50,000+ customers worldwide. 
              Launch your website today with professionally designed, fully responsive themes.
            </p>
            
            {/* Feature list */}
            <ul className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Free Lifetime Updates
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                24/7 Premium Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Easy Installation
              </li>
            </ul>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-base">
                Browse Themes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                View Demos
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8">
              <div>
                <div className="text-3xl font-bold text-foreground">450K+</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">50K+</div>
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
                  src="/templates/flavor-business.jpg"
                  alt="Featured WordPress theme preview"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg font-bold">30%</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Spring Sale</div>
                    <div className="text-xs text-muted-foreground">Code: SPRING30</div>
                  </div>
                </div>
              </div>
              {/* WordPress badge */}
              <div className="absolute -top-2 -right-2 bg-card rounded-xl shadow-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <svg className="h-6 w-6 text-[#21759b]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-1.187.258-2.313.717-3.334l3.944 10.806A8.57 8.57 0 013.443 12zm8.557 8.557c-.883 0-1.735-.141-2.533-.399l2.691-7.813 2.755 7.55c.018.045.039.087.062.127-.931.35-1.94.535-2.975.535zm1.187-12.555c.539-.028 1.025-.084 1.025-.084.483-.056.426-.766-.057-.74 0 0-1.451.114-2.388.114-.883 0-2.368-.114-2.368-.114-.484-.027-.54.712-.057.74 0 0 .459.056.941.084l1.398 3.83-1.964 5.887-3.27-9.717c.54-.028 1.025-.084 1.025-.084.483-.056.426-.766-.057-.74 0 0-1.451.114-2.388.114-.168 0-.365-.004-.57-.01A8.522 8.522 0 0112 3.443c2.213 0 4.231.843 5.75 2.224-.037-.002-.072-.007-.109-.007-.883 0-1.509.769-1.509 1.596 0 .74.427 1.368.883 2.108.342.598.74 1.366.74 2.476 0 .768-.295 1.66-.685 2.903l-.897 2.996-3.241-9.644zm5.037 9.631l2.69-7.778c.503-1.256.67-2.26.67-3.154 0-.324-.022-.625-.057-.904a8.53 8.53 0 011.03 4.103 8.565 8.565 0 01-4.333 7.733z"/>
                  </svg>
                  <span className="text-xs font-medium text-foreground">WordPress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
