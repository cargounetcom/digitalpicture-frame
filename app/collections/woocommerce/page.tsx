import type { Metadata } from 'next'
import { platforms, getProductsByPlatform } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const platform = platforms.find(p => p.id === 'woocommerce')!

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

export default function WooCommerceCollectionPage() {
  const products = getProductsByPlatform('woocommerce')
  
  return (
    <CollectionPageContent
      title="WooCommerce Themes"
      description={platform.fullDescription}
      products={products}
      platformId="woocommerce"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'WooCommerce', href: '/collections/woocommerce' },
      ]}
    />
  )
}
