import type { Metadata } from 'next'
import { collections, getProductsByCategory } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const collection = collections.find(c => c.id === 'ecommerce')!

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

export default function EcommerceCategoryPage() {
  const products = getProductsByCategory('ecommerce')
  
  return (
    <CollectionPageContent
      title="eCommerce Themes"
      description={collection.fullDescription}
      products={products}
      categoryId="ecommerce"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'eCommerce', href: '/collections/category/ecommerce' },
      ]}
    />
  )
}
