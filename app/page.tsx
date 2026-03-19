import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { TemplateGrid } from '@/components/template-grid'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <TemplateGrid />
        </div>
      </main>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}
