import { Download, Shield, Headphones, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Download,
    title: "Instant Download",
    description: "Get immediate access to your purchases with secure download links.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Your payment information is encrypted and securely processed.",
  },
  {
    icon: RefreshCw,
    title: "Free Updates",
    description: "Receive lifetime updates for all your purchased products.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our expert team is here to help you with any questions.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
