import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

// Platform icons
function WordPressIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-1.187.258-2.313.717-3.334l3.944 10.806A8.57 8.57 0 013.443 12zm8.557 8.557c-.883 0-1.735-.141-2.533-.399l2.691-7.813 2.755 7.55c.018.045.039.087.062.127-.931.35-1.94.535-2.975.535zm1.187-12.555c.539-.028 1.025-.084 1.025-.084.483-.056.426-.766-.057-.74 0 0-1.451.114-2.388.114-.883 0-2.368-.114-2.368-.114-.484-.027-.54.712-.057.74 0 0 .459.056.941.084l1.398 3.83-1.964 5.887-3.27-9.717c.54-.028 1.025-.084 1.025-.084.483-.056.426-.766-.057-.74 0 0-1.451.114-2.388.114-.168 0-.365-.004-.57-.01A8.522 8.522 0 0112 3.443c2.213 0 4.231.843 5.75 2.224-.037-.002-.072-.007-.109-.007-.883 0-1.509.769-1.509 1.596 0 .74.427 1.368.883 2.108.342.598.74 1.366.74 2.476 0 .768-.295 1.66-.685 2.903l-.897 2.996-3.241-9.644zm5.037 9.631l2.69-7.778c.503-1.256.67-2.26.67-3.154 0-.324-.022-.625-.057-.904a8.53 8.53 0 011.03 4.103 8.565 8.565 0 01-4.333 7.733z"/>
    </svg>
  )
}

function ShopifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.758c-.022-.145-.169-.233-.296-.238s-1.803-.135-1.803-.135-.994-.994-1.141-1.141c-.094-.094-.217-.135-.328-.135l-.912 20.948zM12.164 4.089l-.551 1.995s-.609-.308-1.347-.298c-1.077.016-1.088.744-1.088.932 0 .997 2.674 1.381 2.674 3.722 0 1.842-1.169 3.025-2.743 3.025-1.887 0-2.856-1.174-2.856-1.174l.509-1.668s.99.849 1.826.849c.549 0 .771-.432.771-.746 0-1.301-2.194-1.361-2.194-3.506 0-1.804 1.295-3.551 3.912-3.551.999 0 1.087.422 1.087.422z"/>
    </svg>
  )
}

function HtmlIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  )
}

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-16 lg:py-24">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Platform badges */}
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <WordPressIcon className="h-4 w-4 text-blue-500" />
                WordPress
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <ShopifyIcon className="h-4 w-4 text-green-500" />
                Shopify
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <HtmlIcon className="h-4 w-4 text-orange-500" />
                HTML
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Premium Templates for Every Platform
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              Discover premium themes and templates for WordPress, Shopify, and HTML. 
              Trusted by 50,000+ customers worldwide. Launch your website today.
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
                Browse Templates
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

          {/* Hero image stack */}
          <div className="flex-1 relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background cards */}
              <div className="absolute top-8 -left-4 w-48 h-32 bg-card rounded-xl shadow-lg border border-border overflow-hidden rotate-[-8deg] z-0">
                <img
                  src="/templates/shopify-dawn-pro.jpg"
                  alt="Shopify theme preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-12 -right-4 w-48 h-32 bg-card rounded-xl shadow-lg border border-border overflow-hidden rotate-[8deg] z-0">
                <img
                  src="/templates/html-startup-landing.jpg"
                  alt="HTML template preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Main featured image */}
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />
                <div className="absolute inset-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                  <img
                    src="/templates/flavor-business.jpg"
                    alt="Featured WordPress theme preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg border border-border p-4 z-20">
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
              
              {/* Multi-platform badge */}
              <div className="absolute -top-2 -right-2 bg-card rounded-xl shadow-lg border border-border p-3 z-20">
                <div className="flex items-center gap-2">
                  <WordPressIcon className="h-5 w-5 text-blue-500" />
                  <ShopifyIcon className="h-5 w-5 text-green-500" />
                  <HtmlIcon className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
