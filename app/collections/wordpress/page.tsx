import type { Metadata } from 'next'
import { platforms, getProductsByPlatform } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const platform = platforms.find(p => p.id === 'wordpress')!

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

export default function WordPressCollectionPage() {
  const products = getProductsByPlatform('wordpress')
  
  return (
    <CollectionPageContent
      title="WordPress Themes"
      description={platform.fullDescription}
      products={products}
      platformId="wordpress"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'WordPress', href: '/collections/wordpress' },
      ]}
    />
  )
}
