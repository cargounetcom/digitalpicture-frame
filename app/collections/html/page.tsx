import type { Metadata } from 'next'
import { platforms, getProductsByPlatform } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const platform = platforms.find(p => p.id === 'html')!

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

export default function HTMLCollectionPage() {
  const products = getProductsByPlatform('html')
  
  return (
    <CollectionPageContent
      title="HTML Templates"
      description={platform.fullDescription}
      products={products}
      platformId="html"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'HTML', href: '/collections/html' },
      ]}
    />
  )
}
