export interface Product {
  id: string
  title: string
  description: string
  category: string
  type: 'template' | 'plugin' | 'saas'
  price: number
  compareAtPrice?: number
  author: string
  image: string
  tags: string[]
  reviews: number
  rating: number
  featured: boolean
  badge?: string
  inStock: boolean
}

export interface Collection {
  id: string
  name: string
  description: string
  count: number
}

export const collections: Collection[] = [
  { id: 'all', name: 'All Products', description: 'Browse all our digital products', count: 12 },
  { id: 'templates', name: 'Templates', description: 'Ready-to-use website templates', count: 5 },
  { id: 'plugins', name: 'Plugins', description: 'Extend your site functionality', count: 4 },
  { id: 'saas', name: 'SaaS Solutions', description: 'Complete software solutions', count: 3 },
]

export const products: Product[] = [
  {
    id: '1',
    title: 'Next.js Commerce Starter',
    description: 'Professional e-commerce template with Stripe, inventory management, and beautiful product pages.',
    category: 'templates',
    type: 'template',
    price: 0,
    author: 'DigitalFrame',
    image: '/templates/nextjs-boilerplate.jpg',
    tags: ['Next.js', 'React', 'E-commerce'],
    reviews: 847,
    rating: 4.9,
    featured: true,
    badge: 'Free',
    inStock: true,
  },
  {
    id: '2',
    title: 'AI Assistant Pro',
    description: 'Full-featured AI chatbot with GPT integration, custom training, and analytics dashboard.',
    category: 'saas',
    type: 'saas',
    price: 79,
    compareAtPrice: 129,
    author: 'AITools Inc',
    image: '/templates/ai-chatbot.jpg',
    tags: ['AI', 'ChatGPT', 'Automation'],
    reviews: 423,
    rating: 4.8,
    featured: true,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '3',
    title: 'Shopify Clone Template',
    description: 'Complete storefront solution with cart, checkout, order management, and admin panel.',
    category: 'templates',
    type: 'template',
    price: 149,
    author: 'StorePro',
    image: '/templates/ecommerce-kit.jpg',
    tags: ['Shopify', 'Commerce', 'Store'],
    reviews: 1203,
    rating: 4.9,
    featured: true,
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: '4',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics with beautiful charts, reports, and data visualization components.',
    category: 'saas',
    type: 'saas',
    price: 199,
    compareAtPrice: 249,
    author: 'DataViz Pro',
    image: '/templates/saas-dashboard.jpg',
    tags: ['Analytics', 'Dashboard', 'Reports'],
    reviews: 562,
    rating: 4.7,
    featured: true,
    inStock: true,
  },
  {
    id: '5',
    title: 'Photo Gallery Pro',
    description: 'Stunning image gallery with lightbox, lazy loading, and Cloudinary integration.',
    category: 'templates',
    type: 'template',
    price: 49,
    author: 'MediaKit',
    image: '/templates/gallery-starter.jpg',
    tags: ['Gallery', 'Photos', 'Portfolio'],
    reviews: 289,
    rating: 4.6,
    featured: false,
    inStock: true,
  },
  {
    id: '6',
    title: 'Blog CMS Platform',
    description: 'Complete blogging solution with MDX, comments, newsletter, and SEO optimization.',
    category: 'templates',
    type: 'template',
    price: 69,
    compareAtPrice: 99,
    author: 'ContentPro',
    image: '/templates/blog-platform.jpg',
    tags: ['Blog', 'CMS', 'Content'],
    reviews: 678,
    rating: 4.8,
    featured: false,
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '7',
    title: 'Voice AI Plugin',
    description: 'Add voice commands and text-to-speech to any website with our easy-to-use plugin.',
    category: 'plugins',
    type: 'plugin',
    price: 39,
    author: 'VoiceTech',
    image: '/templates/voice-interface.jpg',
    tags: ['Voice', 'AI', 'Accessibility'],
    reviews: 156,
    rating: 4.5,
    featured: false,
    inStock: true,
  },
  {
    id: '8',
    title: 'Admin Panel Kit',
    description: 'Professional admin dashboard with user management, roles, and activity logging.',
    category: 'templates',
    type: 'template',
    price: 129,
    author: 'AdminPro',
    image: '/templates/admin-dashboard.jpg',
    tags: ['Admin', 'Dashboard', 'Management'],
    reviews: 891,
    rating: 4.9,
    featured: false,
    badge: 'New',
    inStock: true,
  },
  {
    id: '9',
    title: 'SEO Toolkit Plugin',
    description: 'Boost rankings with meta tags, sitemaps, schema markup, and keyword analysis.',
    category: 'plugins',
    type: 'plugin',
    price: 29,
    author: 'RankBoost',
    image: '/templates/seo-plugin.jpg',
    tags: ['SEO', 'Marketing', 'Analytics'],
    reviews: 1456,
    rating: 4.7,
    featured: false,
    badge: 'Top Rated',
    inStock: true,
  },
]
