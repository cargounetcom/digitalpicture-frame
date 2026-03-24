import type { Metadata } from 'next'
import { collections, getProductsByCategory } from "@/lib/data"
import { CollectionPageContent } from "@/components/collection-page-content"

const collection = collections.find(c => c.id === 'blog')!

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

export default function BlogMagazineCategoryPage() {
  const products = getProductsByCategory('blog')
  
  return (
    <CollectionPageContent
      title="Blog & Magazine Themes"
      description={collection.fullDescription}
      products={products}
      categoryId="blog"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: 'Blog & Magazine', href: '/collections/category/blog-magazine' },
      ]}
    />
  )
}
