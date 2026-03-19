import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const wpCollections = [
  { 
    id: 'business', 
    name: 'Business', 
    description: 'Corporate themes', 
    count: 4,
    image: '/templates/corporate-elite.jpg'
  },
  { 
    id: 'ecommerce', 
    name: 'eCommerce', 
    description: 'WooCommerce themes', 
    count: 3,
    image: '/templates/shopmax-woo.jpg'
  },
  { 
    id: 'blog', 
    name: 'Blog & Magazine', 
    description: 'Content themes', 
    count: 3,
    image: '/templates/newspress-mag.jpg'
  },
  { 
    id: 'portfolio', 
    name: 'Portfolio', 
    description: 'Showcase themes', 
    count: 2,
    image: '/templates/developer-portfolio.jpg'
  },
]

export function CollectionsGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Browse by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Find the perfect WordPress theme for your project
            </p>
          </div>
          <Button variant="ghost" className="hidden sm:flex gap-2">
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wpCollections.map((collection) => (
            <Card
              key={collection.id}
              className="group relative overflow-hidden cursor-pointer border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
              </div>

              <CardContent className="relative p-6 flex flex-col justify-end min-h-[200px]">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {collection.count} themes
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Browse Themes</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
