import { 
  Zap, 
  Palette, 
  Code2, 
  LifeBuoy, 
  Smartphone,
  RefreshCw 
} from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Scandinavian Aesthetic",
    description: "Clean lines, natural colors, and thoughtful whitespace inspired by Nordic design principles.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized code and minimal dependencies ensure your store loads in under 2 seconds.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Every template is designed mobile-first, ensuring a seamless experience on all devices.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Well-documented, modular code that is easy to customize and extend.",
  },
  {
    icon: RefreshCw,
    title: "Regular Updates",
    description: "Continuous improvements and new features to keep your store modern and secure.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Support",
    description: "Our team of experts is here to help you get the most out of your template.",
  },
]

export function MarketFeatures() {
  return (
    <section id="features" className="border-y border-border bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Built for success
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every template is crafted with purpose, combining beauty with functionality 
            to help your business thrive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group rounded-sm border border-transparent bg-card p-6 transition-all hover:border-border hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-20 max-w-3xl rounded-sm bg-foreground p-8 text-center text-background lg:p-12">
          <h3 className="font-serif text-2xl lg:text-3xl">
            Ready to transform your store?
          </h3>
          <p className="mt-4 text-sm text-background/70 lg:text-base">
            Join thousands of merchants who trust Nordic templates to power their online business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90">
              Get Started Now
            </button>
            <button className="rounded border border-background/30 px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
