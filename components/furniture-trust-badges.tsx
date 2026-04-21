import { Truck, ShieldCheck, Award, Headphones } from "lucide-react"

const badges = [
  { icon: Truck, title: "Free Shipping", description: "Orders over $500" },
  { icon: ShieldCheck, title: "3-Year Warranty", description: "Full coverage" },
  { icon: Award, title: "Handcrafted", description: "European ateliers" },
  { icon: Headphones, title: "Design Consult", description: "Expert advice" },
]

export function FurnitureTrustBadges() {
  return (
    <section className="py-10 lg:py-14 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                <badge.icon className="h-5 w-5 text-foreground" strokeWidth={1.2} />
              </div>
              <div>
                <h3 className="text-[12px] font-medium text-foreground uppercase tracking-[0.1em]">{badge.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
