import type { Metadata } from 'next'
import { collections, getProductsByCategory } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const collection = collections.find(c => c.id === 'business')!

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

export default function BusinessCategoryPage() {
  const products = getProductsByCategory('business')
  
  return (
    <CollectionPageContent
      title="Business Themes"
      description={collection.fullDescription}
      products={products}
      categoryId="business"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'Business', href: '/collections/category/business' },
      ]}
    />
  )
}
