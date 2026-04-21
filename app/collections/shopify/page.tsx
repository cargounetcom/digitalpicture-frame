import type { Metadata } from 'next'
import { platforms, getProductsByPlatform } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const platform = platforms.find(p => p.id === 'shopify')!

export const metadata: Metadata = {
  title: platform.seo.metaTitle,
  description: platform.seo.metaDescription,
  keywords: platform.seo.keywords,
  openGraph: {
    title: platform.seo.metaTitle,
    description: platform.seo.metaDescription,
    type: 'website',
  },
}

export default function ShopifyCollectionPage() {
  const products = getProductsByPlatform('shopify')
  
  return (
    <CollectionPageContent
      title="Shopify Themes"
      description={platform.fullDescription}
      products={products}
      platformId="shopify"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'Shopify', href: '/collections/shopify' },
      ]}
    />
  )
}
