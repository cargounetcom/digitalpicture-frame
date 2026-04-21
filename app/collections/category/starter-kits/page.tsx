import type { Metadata } from 'next'
import { collections, products } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const collection = collections.find(c => c.id === 'starter')!

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

export default function StarterKitsCategoryPage() {
  const starterProducts = products.filter(p => p.type === 'starter' || p.category === 'starter')
  
  return (
    <CollectionPageContent
      title="Starter Kits"
      description={collection.fullDescription}
      products={starterProducts}
      categoryId="starter"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'Starter Kits', href: '/collections/category/starter-kits' },
      ]}
    />
  )
}
