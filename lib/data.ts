export interface Template {
  id: string
  title: string
  description: string
  category: string
  type: 'template' | 'plugin' | 'saas'
  price: number
  author: string
  authorAvatar: string
  image: string
  tags: string[]
  downloads: number
  rating: number
  featured: boolean
}

export interface Category {
  id: string
  name: string
  count: number
}

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', count: 24 },
  { id: 'ai', name: 'AI', count: 6 },
  { id: 'starter', name: 'Starter', count: 4 },
  { id: 'ecommerce', name: 'E-commerce', count: 5 },
  { id: 'saas', name: 'SaaS', count: 4 },
  { id: 'blog', name: 'Blog', count: 3 },
  { id: 'portfolio', name: 'Portfolio', count: 2 },
]

export const templates: Template[] = [
  {
    id: '1',
    title: 'Next.js Boilerplate',
    description: 'Get started with Next.js and React in seconds. Includes authentication, database, and more.',
    category: 'starter',
    type: 'template',
    price: 0,
    author: 'DigitalFrame',
    authorAvatar: 'DF',
    image: '/templates/nextjs-boilerplate.jpg',
    tags: ['Next.js', 'React', 'TypeScript'],
    downloads: 15420,
    rating: 4.9,
    featured: true,
  },
  {
    id: '2',
    title: 'AI Chatbot Template',
    description: 'A full-featured, hackable AI chatbot built with Next.js and OpenAI integration.',
    category: 'ai',
    type: 'template',
    price: 49,
    author: 'DigitalFrame',
    authorAvatar: 'DF',
    image: '/templates/ai-chatbot.jpg',
    tags: ['AI', 'OpenAI', 'Next.js'],
    downloads: 8930,
    rating: 4.8,
    featured: true,
  },
  {
    id: '3',
    title: 'E-commerce Starter Kit',
    description: 'Complete e-commerce solution with Stripe integration, product management, and checkout.',
    category: 'ecommerce',
    type: 'template',
    price: 79,
    author: 'ShopMaster',
    authorAvatar: 'SM',
    image: '/templates/ecommerce-kit.jpg',
    tags: ['Stripe', 'Commerce', 'Payments'],
    downloads: 12340,
    rating: 4.7,
    featured: true,
  },
  {
    id: '4',
    title: 'SaaS Dashboard Pro',
    description: 'Professional SaaS dashboard with analytics, user management, and subscription billing.',
    category: 'saas',
    type: 'saas',
    price: 129,
    author: 'ProDash',
    authorAvatar: 'PD',
    image: '/templates/saas-dashboard.jpg',
    tags: ['Dashboard', 'Analytics', 'SaaS'],
    downloads: 6780,
    rating: 4.9,
    featured: true,
  },
  {
    id: '5',
    title: 'Image Gallery Starter',
    description: 'An image gallery built on Next.js and Cloudinary with beautiful transitions.',
    category: 'portfolio',
    type: 'template',
    price: 29,
    author: 'GalleryPro',
    authorAvatar: 'GP',
    image: '/templates/gallery-starter.jpg',
    tags: ['Gallery', 'Images', 'Cloudinary'],
    downloads: 4520,
    rating: 4.6,
    featured: false,
  },
  {
    id: '6',
    title: 'Blog Platform',
    description: 'Modern blog platform with MDX support, comments, and newsletter integration.',
    category: 'blog',
    type: 'template',
    price: 39,
    author: 'BlogMaster',
    authorAvatar: 'BM',
    image: '/templates/blog-platform.jpg',
    tags: ['Blog', 'MDX', 'Newsletter'],
    downloads: 7890,
    rating: 4.7,
    featured: false,
  },
  {
    id: '7',
    title: 'AI Voice Interface',
    description: 'Create a voice chat using AI empathic voice interface technology.',
    category: 'ai',
    type: 'plugin',
    price: 59,
    author: 'VoiceAI',
    authorAvatar: 'VA',
    image: '/templates/voice-interface.jpg',
    tags: ['AI', 'Voice', 'Chat'],
    downloads: 3240,
    rating: 4.5,
    featured: false,
  },
  {
    id: '8',
    title: 'Admin Dashboard Template',
    description: 'Tailwind CSS, PostgreSQL, and Auth set up for rapid admin panel development.',
    category: 'saas',
    type: 'template',
    price: 89,
    author: 'AdminPro',
    authorAvatar: 'AP',
    image: '/templates/admin-dashboard.jpg',
    tags: ['Admin', 'Dashboard', 'Auth'],
    downloads: 9120,
    rating: 4.8,
    featured: false,
  },
  {
    id: '9',
    title: 'SEO Optimizer Plugin',
    description: 'Boost your search rankings with automated meta tags, sitemaps, and analytics.',
    category: 'plugin',
    type: 'plugin',
    price: 29,
    author: 'SEOMaster',
    authorAvatar: 'SE',
    image: '/templates/seo-plugin.jpg',
    tags: ['SEO', 'Analytics', 'Meta'],
    downloads: 11230,
    rating: 4.6,
    featured: false,
  },
]
