import type { Metadata } from 'next'
import { collections, getProductsByCategory } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const collection = collections.find(c => c.id === 'portfolio')!

export const metadata: Metadata = {
  title: collection.seo.metaTitle,
  description: collection.seo.metaDescription,
  keywords: collection.seo.keywords,
  openGraph: {
    title: collection.seo.metaTitle,
    description: collection.seo.metaDescription,
    type: 'website',
  },
}

export default function PortfolioCategoryPage() {
  const products = getProductsByCategory('portfolio')
  
  return (
    <CollectionPageContent
      title="Portfolio Themes"
      description={collection.fullDescription}
      products={products}
      categoryId="portfolio"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'Portfolio', href: '/collections/category/portfolio' },
      ]}
    />
  )
}
