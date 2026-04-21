export type Platform = 'wordpress' | 'shopify' | 'html' | 'woocommerce'

export type LicenseType = 'regular' | 'extended' | 'unlimited'

export interface License {
  type: LicenseType
  name: string
  description: string
  features: string[]
  priceMultiplier: number
}

export interface SEOMetadata {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogImage?: string
}

export interface Product {
  id: string
  title: string
  description: string
  fullDescription: string
  category: string
  type: 'theme' | 'plugin' | 'starter'
  platform: Platform
  price: number
  compareAtPrice?: number
  author: string
  image: string
  gallery?: string[]
  tags: string[]
  reviews: number
  rating: number
  featured: boolean
  badge?: string
  inStock: boolean
  sales?: number
  license: LicenseType
  version: string
  lastUpdate: string
  compatibility: string[]
  seo: SEOMetadata
  features: string[]
  demoUrl?: string
  documentation?: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  fullDescription: string
  count: number
  image: string
  platform?: Platform
  seo: SEOMetadata
}

export interface PlatformInfo {
  id: Platform
  name: string
  description: string
  fullDescription: string
  icon: string
  color: string
  seo: SEOMetadata
}

// License types available
export const licenses: License[] = [
  {
    type: 'regular',
    name: 'Regular License',
    description: 'Use for a single end product which end users are not charged for.',
    features: [
      'Single website use',
      '6 months support',
      'Future updates',
      'Quality checked by ThemeMarket'
    ],
    priceMultiplier: 1
  },
  {
    type: 'extended',
    name: 'Extended License',
    description: 'Use for a single end product which end users can be charged for.',
    features: [
      'Single SaaS/product use',
      '12 months support',
      'Future updates',
      'Priority support',
      'Commercial use allowed'
    ],
    priceMultiplier: 5
  },
  {
    type: 'unlimited',
    name: 'Unlimited License',
    description: 'Use for unlimited projects with no restrictions.',
    features: [
      'Unlimited websites',
      'Lifetime support',
      'Lifetime updates',
      'Priority support',
      'Commercial use',
      'White-label rights',
      'Resell allowed'
    ],
    priceMultiplier: 20
  }
]

export const platforms: PlatformInfo[] = [
  { 
    id: 'wordpress', 
    name: 'WordPress', 
    description: 'Premium themes for WordPress CMS',
    fullDescription: 'Discover our collection of premium WordPress themes. Built with clean code, SEO optimization, and Gutenberg compatibility. Perfect for blogs, businesses, portfolios, and eCommerce stores.',
    icon: 'wordpress',
    color: 'blue',
    seo: {
      metaTitle: 'WordPress Themes | Premium Templates | ThemeMarket',
      metaDescription: 'Browse 100+ premium WordPress themes. Responsive, SEO-optimized, Gutenberg compatible. Business, blog, portfolio and WooCommerce themes with lifetime updates.',
      keywords: ['wordpress themes', 'wordpress templates', 'premium wordpress', 'gutenberg themes', 'responsive themes']
    }
  },
  { 
    id: 'shopify', 
    name: 'Shopify', 
    description: 'Premium themes for Shopify stores',
    fullDescription: 'Explore our Shopify 2.0 compatible themes designed for conversion. Built with sections everywhere, optimized checkout, and mobile-first design for maximum sales.',
    icon: 'shopify',
    color: 'green',
    seo: {
      metaTitle: 'Shopify Themes | Shopify 2.0 Templates | ThemeMarket',
      metaDescription: 'Premium Shopify themes built for conversion. Shopify 2.0 compatible, mobile-optimized, fast loading. Fashion, electronics, beauty store themes.',
      keywords: ['shopify themes', 'shopify 2.0', 'ecommerce themes', 'online store templates', 'shopify templates']
    }
  },
  { 
    id: 'html', 
    name: 'HTML', 
    description: 'Static HTML templates and UI kits',
    fullDescription: 'High-quality HTML5/CSS3 templates built with modern frameworks. Bootstrap 5, Tailwind CSS, and vanilla JS templates for landing pages, portfolios, and web apps.',
    icon: 'html',
    color: 'orange',
    seo: {
      metaTitle: 'HTML Templates | Bootstrap & Tailwind | ThemeMarket',
      metaDescription: 'Modern HTML5 templates and UI kits. Bootstrap 5, Tailwind CSS landing pages, portfolios, dashboards. Clean code, well documented.',
      keywords: ['html templates', 'bootstrap templates', 'tailwind templates', 'landing page templates', 'html5 css3']
    }
  },
  { 
    id: 'woocommerce', 
    name: 'WooCommerce', 
    description: 'eCommerce themes for WooCommerce',
    fullDescription: 'Powerful WooCommerce themes for online stores. Advanced product filtering, Ajax cart, wishlist integration, and optimized checkout for maximum conversions.',
    icon: 'woocommerce',
    color: 'purple',
    seo: {
      metaTitle: 'WooCommerce Themes | WordPress eCommerce | ThemeMarket',
      metaDescription: 'Best WooCommerce themes for WordPress. Advanced filtering, Ajax cart, product galleries. Build professional online stores with our premium themes.',
      keywords: ['woocommerce themes', 'wordpress ecommerce', 'online store themes', 'shop themes', 'woocommerce templates']
    }
  },
]

export const collections: Collection[] = [
  { 
    id: 'all', 
    name: 'All Templates', 
    slug: 'all',
    description: 'Browse all themes and templates', 
    fullDescription: 'Explore our complete collection of premium themes and templates. WordPress, Shopify, WooCommerce, and HTML templates for every project.',
    count: 24,
    image: '/templates/flavor-business.jpg',
    seo: {
      metaTitle: 'All Templates & Themes | ThemeMarket',
      metaDescription: 'Browse 500+ premium themes and templates. WordPress, Shopify, WooCommerce, HTML. Find the perfect template for your next project.',
      keywords: ['themes', 'templates', 'website templates', 'premium themes']
    }
  },
  { 
    id: 'business', 
    name: 'Business', 
    slug: 'business',
    description: 'Corporate and business themes', 
    fullDescription: 'Professional business themes for corporate websites, agencies, and startups. Includes service showcases, team sections, testimonials, and contact forms.',
    count: 6,
    image: '/templates/corporate-elite.jpg',
    seo: {
      metaTitle: 'Business Themes & Templates | Corporate | ThemeMarket',
      metaDescription: 'Professional business themes for corporate websites. Agency, startup, consulting themes with booking systems and service showcases.',
      keywords: ['business themes', 'corporate templates', 'agency themes', 'startup templates', 'professional themes']
    }
  },
  { 
    id: 'ecommerce', 
    name: 'eCommerce', 
    slug: 'ecommerce',
    description: 'Online store themes', 
    fullDescription: 'High-converting eCommerce themes for WooCommerce and Shopify. Product filtering, Ajax cart, wishlist, and optimized checkout flows.',
    count: 8,
    image: '/templates/shopmax-woo.jpg',
    seo: {
      metaTitle: 'eCommerce Themes | Online Store Templates | ThemeMarket',
      metaDescription: 'Best eCommerce themes for online stores. WooCommerce, Shopify themes with product filtering, Ajax cart, and conversion optimization.',
      keywords: ['ecommerce themes', 'online store templates', 'shop themes', 'woocommerce themes', 'shopify themes']
    }
  },
  { 
    id: 'blog', 
    name: 'Blog & Magazine', 
    slug: 'blog-magazine',
    description: 'Content focused themes', 
    fullDescription: 'Beautiful blog and magazine themes optimized for content. Multiple layouts, SEO optimization, social sharing, and newsletter integration.',
    count: 4,
    image: '/templates/newspress-mag.jpg',
    seo: {
      metaTitle: 'Blog Themes | Magazine Templates | ThemeMarket',
      metaDescription: 'Premium blog and magazine themes. SEO optimized, fast loading, multiple layouts. Perfect for bloggers, news sites, and content creators.',
      keywords: ['blog themes', 'magazine templates', 'news themes', 'content themes', 'blogger templates']
    }
  },
  { 
    id: 'portfolio', 
    name: 'Portfolio', 
    slug: 'portfolio',
    description: 'Showcase your work', 
    fullDescription: 'Stunning portfolio themes for creatives, photographers, designers, and developers. Filterable galleries, project showcases, and client testimonials.',
    count: 5,
    image: '/templates/developer-portfolio.jpg',
    seo: {
      metaTitle: 'Portfolio Themes | Creative Templates | ThemeMarket',
      metaDescription: 'Creative portfolio themes for designers, photographers, and developers. Showcase your work with beautiful galleries and project pages.',
      keywords: ['portfolio themes', 'creative templates', 'photography themes', 'designer portfolio', 'developer portfolio']
    }
  },
  { 
    id: 'starter', 
    name: 'Starter Kits', 
    slug: 'starter-kits',
    description: 'Quick start templates', 
    fullDescription: 'Free and premium starter kits to jumpstart your project. Minimal, well-documented templates perfect for customization.',
    count: 4,
    image: '/templates/developer-starter.jpg',
    seo: {
      metaTitle: 'Starter Kits | Free Templates | ThemeMarket',
      metaDescription: 'Free starter kits and minimal templates. Perfect for developers who want a clean foundation to build upon. Well documented, easy to customize.',
      keywords: ['starter templates', 'free themes', 'minimal templates', 'starter kits', 'boilerplate']
    }
  },
]

export const products: Product[] = [
  // WordPress Themes
  {
    id: '1',
    title: 'Flavor Business Theme',
    description: 'Multi-purpose WordPress theme with 50+ demos, Elementor builder, and WooCommerce integration.',
    fullDescription: 'Flavor is the ultimate multi-purpose WordPress theme designed for businesses of all sizes. With over 50 pre-built demos, drag-and-drop Elementor page builder, and seamless WooCommerce integration, you can create any website in minutes. Features include mega menus, advanced typography options, custom widgets, and one-click demo import.',
    category: 'business',
    type: 'theme',
    platform: 'wordpress',
    price: 59,
    author: 'ThemeForest Elite',
    image: '/templates/flavor-business.jpg',
    gallery: ['/templates/flavor-business.jpg', '/templates/corporate-elite.jpg'],
    tags: ['Elementor', 'WooCommerce', 'Responsive', 'Multipurpose', 'Business'],
    reviews: 2847,
    rating: 4.9,
    featured: true,
    badge: 'Bestseller',
    inStock: true,
    sales: 45200,
    license: 'regular',
    version: '3.2.1',
    lastUpdate: '2024-01-15',
    compatibility: ['WordPress 6.4+', 'PHP 8.0+', 'WooCommerce 8.0+'],
    features: ['50+ Pre-built Demos', 'Elementor Page Builder', 'WooCommerce Ready', 'One-Click Import', 'Mega Menu', 'RTL Support', 'WPML Compatible', 'SEO Optimized'],
    demoUrl: 'https://demo.thememarket.com/flavor',
    seo: {
      metaTitle: 'Flavor Business Theme | Multi-Purpose WordPress | ThemeMarket',
      metaDescription: 'Flavor is a premium multi-purpose WordPress theme with 50+ demos, Elementor builder, and WooCommerce. Perfect for business, agency, and corporate sites.',
      keywords: ['flavor theme', 'business wordpress', 'multipurpose theme', 'elementor theme', 'corporate theme']
    }
  },
  {
    id: '2',
    title: 'ShopMax WooCommerce',
    description: 'Premium eCommerce theme built for WooCommerce with advanced product filtering and Ajax cart.',
    fullDescription: 'ShopMax is the most powerful WooCommerce theme on the market. Built specifically for online stores, it features advanced product filtering, Ajax-powered cart and wishlist, product quick view, and optimized checkout flow. Includes 15+ shop layouts and full Gutenberg support.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'woocommerce',
    price: 69,
    compareAtPrice: 89,
    author: 'PixelPro Studio',
    image: '/templates/shopmax-woo.jpg',
    tags: ['WooCommerce', 'Shop', 'Ajax', 'eCommerce', 'Product Filter'],
    reviews: 1523,
    rating: 4.8,
    featured: true,
    badge: 'Sale',
    inStock: true,
    sales: 28400,
    license: 'regular',
    version: '2.8.0',
    lastUpdate: '2024-02-01',
    compatibility: ['WordPress 6.4+', 'WooCommerce 8.2+', 'PHP 8.1+'],
    features: ['Ajax Product Filter', 'Quick View', 'Wishlist', 'Compare Products', '15+ Shop Layouts', 'Size Guide', 'Product Video', 'Mega Menu'],
    demoUrl: 'https://demo.thememarket.com/shopmax',
    seo: {
      metaTitle: 'ShopMax WooCommerce Theme | Premium eCommerce | ThemeMarket',
      metaDescription: 'ShopMax is the ultimate WooCommerce theme with Ajax filtering, quick view, wishlist, and 15+ shop layouts. Build your online store today.',
      keywords: ['woocommerce theme', 'shop theme', 'ecommerce wordpress', 'online store theme', 'product filter']
    }
  },
  {
    id: '3',
    title: 'Developer Portfolio Pro',
    description: 'Clean minimal portfolio theme for developers and designers with dark mode and project showcase.',
    fullDescription: 'Developer Portfolio Pro is designed specifically for developers, designers, and creative professionals. Features include a beautiful project showcase, skills section with progress bars, client testimonials, blog integration, and built-in dark mode. Fully responsive and optimized for performance.',
    category: 'portfolio',
    type: 'theme',
    platform: 'wordpress',
    price: 0,
    author: 'DevThemes',
    image: '/templates/developer-portfolio.jpg',
    tags: ['Portfolio', 'Minimal', 'Developer', 'Dark Mode', 'Creative'],
    reviews: 892,
    rating: 4.7,
    featured: true,
    badge: 'Free',
    inStock: true,
    sales: 67800,
    license: 'regular',
    version: '1.5.2',
    lastUpdate: '2024-01-20',
    compatibility: ['WordPress 6.3+', 'PHP 7.4+'],
    features: ['Dark Mode', 'Project Showcase', 'Skills Section', 'Testimonials', 'Blog Ready', 'Contact Form', 'Social Links', 'SEO Optimized'],
    demoUrl: 'https://demo.thememarket.com/developer-portfolio',
    seo: {
      metaTitle: 'Developer Portfolio Pro | Free WordPress Theme | ThemeMarket',
      metaDescription: 'Free developer portfolio WordPress theme with dark mode, project showcase, and skills section. Perfect for developers and designers.',
      keywords: ['developer portfolio', 'free wordpress theme', 'portfolio theme', 'dark mode theme', 'designer portfolio']
    }
  },
  {
    id: '4',
    title: 'NewsPress Magazine',
    description: 'Fast and SEO-optimized magazine theme with multiple layouts, ad management, and AMP support.',
    fullDescription: 'NewsPress is a lightning-fast magazine theme built for news sites, blogs, and online publications. Features advanced ad management, AMP support for mobile, infinite scroll, and video post formats. Includes breaking news ticker, weather widget, and social share optimization.',
    category: 'blog',
    type: 'theme',
    platform: 'wordpress',
    price: 49,
    author: 'MagPro Themes',
    image: '/templates/newspress-mag.jpg',
    tags: ['Magazine', 'News', 'SEO', 'AMP', 'Blog'],
    reviews: 1876,
    rating: 4.8,
    featured: true,
    inStock: true,
    sales: 31500,
    license: 'regular',
    version: '4.1.0',
    lastUpdate: '2024-01-25',
    compatibility: ['WordPress 6.4+', 'PHP 8.0+', 'AMP Plugin'],
    features: ['AMP Support', 'Ad Management', 'Breaking News Ticker', 'Infinite Scroll', 'Video Posts', 'Weather Widget', 'Social Share', 'Schema Markup'],
    demoUrl: 'https://demo.thememarket.com/newspress',
    seo: {
      metaTitle: 'NewsPress Magazine Theme | News & Blog WordPress | ThemeMarket',
      metaDescription: 'Fast magazine WordPress theme with AMP support, ad management, and SEO optimization. Perfect for news sites, blogs, and online magazines.',
      keywords: ['magazine theme', 'news theme', 'blog theme', 'amp wordpress', 'newspaper theme']
    }
  },
  {
    id: '5',
    title: 'Corporate Elite',
    description: 'Professional business theme with booking system, team management, and service showcases.',
    fullDescription: 'Corporate Elite is designed for corporate businesses, consulting firms, and professional services. Includes appointment booking system, team member profiles with social links, service packages with pricing tables, case studies portfolio, and client testimonials carousel.',
    category: 'business',
    type: 'theme',
    platform: 'wordpress',
    price: 79,
    compareAtPrice: 99,
    author: 'ThemeForest Elite',
    image: '/templates/corporate-elite.jpg',
    tags: ['Corporate', 'Business', 'Booking', 'Professional', 'Agency'],
    reviews: 723,
    rating: 4.6,
    featured: false,
    badge: 'Popular',
    inStock: true,
    sales: 18900,
    license: 'regular',
    version: '2.3.5',
    lastUpdate: '2024-01-10',
    compatibility: ['WordPress 6.4+', 'PHP 8.0+', 'WooCommerce 8.0+'],
    features: ['Booking System', 'Team Profiles', 'Service Packages', 'Pricing Tables', 'Case Studies', 'Testimonials', 'Contact Forms', 'Google Maps'],
    demoUrl: 'https://demo.thememarket.com/corporate-elite',
    seo: {
      metaTitle: 'Corporate Elite Theme | Business WordPress | ThemeMarket',
      metaDescription: 'Professional corporate WordPress theme with booking system, team profiles, and service packages. Perfect for consulting and business websites.',
      keywords: ['corporate theme', 'business theme', 'consulting theme', 'professional wordpress', 'agency theme']
    }
  },
  {
    id: '6',
    title: 'Blog Starter Kit',
    description: 'Starter theme with modular design, custom widgets, and lifetime updates.',
    fullDescription: 'Blog Starter Kit is the perfect foundation for bloggers and content creators. Features modular block design, custom Gutenberg blocks, newsletter integration, reading progress bar, and estimated reading time. Lightweight, fast, and fully customizable.',
    category: 'blog',
    type: 'starter',
    platform: 'wordpress',
    price: 39,
    author: 'Starter Labs',
    image: '/templates/developer-starter.jpg',
    tags: ['Starter', 'Blog', 'Modular', 'Gutenberg', 'Minimal'],
    reviews: 2134,
    rating: 4.9,
    featured: false,
    badge: 'Top Rated',
    inStock: true,
    sales: 52300,
    license: 'regular',
    version: '1.8.0',
    lastUpdate: '2024-02-05',
    compatibility: ['WordPress 6.4+', 'PHP 8.0+', 'Gutenberg'],
    features: ['Gutenberg Blocks', 'Newsletter Integration', 'Reading Progress', 'Reading Time', 'Social Sharing', 'Related Posts', 'Author Box', 'Schema Markup'],
    demoUrl: 'https://demo.thememarket.com/blog-starter',
    seo: {
      metaTitle: 'Blog Starter Kit | Minimal WordPress Theme | ThemeMarket',
      metaDescription: 'Minimal blog starter theme for WordPress with Gutenberg blocks, newsletter integration, and modular design. Perfect for bloggers.',
      keywords: ['blog starter', 'minimal theme', 'gutenberg theme', 'starter kit', 'wordpress blog']
    }
  },
  
  // Shopify Themes
  {
    id: '7',
    title: 'Dawn Pro - Shopify 2.0',
    description: 'Premium Shopify 2.0 theme with sections everywhere, optimized checkout, and mobile-first design.',
    fullDescription: 'Dawn Pro is the most advanced Shopify 2.0 theme available. Built with sections everywhere architecture, it offers unlimited customization possibilities. Features optimized checkout, mobile-first design, predictive search, and Google Lighthouse score of 95+.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'shopify',
    price: 89,
    author: 'Shopify Experts',
    image: '/templates/shopify-dawn-pro.jpg',
    tags: ['Shopify 2.0', 'Sections', 'Mobile', 'Fast', 'Conversion'],
    reviews: 1234,
    rating: 4.9,
    featured: true,
    badge: 'Bestseller',
    inStock: true,
    sales: 34500,
    license: 'regular',
    version: '5.0.2',
    lastUpdate: '2024-02-01',
    compatibility: ['Shopify 2.0', 'Online Store 2.0'],
    features: ['Sections Everywhere', 'Predictive Search', 'Quick Add to Cart', 'Color Swatches', 'Size Charts', 'Product Video', 'Cross-Selling', 'Cart Upsells'],
    demoUrl: 'https://demo.thememarket.com/dawn-pro',
    seo: {
      metaTitle: 'Dawn Pro Shopify 2.0 Theme | Premium eCommerce | ThemeMarket',
      metaDescription: 'Dawn Pro is a premium Shopify 2.0 theme with sections everywhere, optimized checkout, and 95+ Lighthouse score. Built for conversions.',
      keywords: ['shopify 2.0 theme', 'dawn theme', 'premium shopify', 'ecommerce theme', 'online store']
    }
  },
  {
    id: '8',
    title: 'Luxe Fashion Store',
    description: 'Elegant fashion Shopify theme with lookbook, quick view, advanced filtering, and Instagram shop.',
    fullDescription: 'Luxe is a stunning fashion Shopify theme designed for luxury brands and boutiques. Features beautiful lookbook layouts, Instagram shop integration, advanced product filtering, quick view modal, and size guide popup. Perfect for clothing, accessories, and jewelry stores.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'shopify',
    price: 99,
    compareAtPrice: 149,
    author: 'FashionThemes',
    image: '/templates/shopify-luxe-fashion.jpg',
    tags: ['Fashion', 'Lookbook', 'Instagram', 'Luxury', 'Boutique'],
    reviews: 876,
    rating: 4.8,
    featured: true,
    badge: 'Sale',
    inStock: true,
    sales: 21300,
    license: 'regular',
    version: '3.4.1',
    lastUpdate: '2024-01-28',
    compatibility: ['Shopify 2.0', 'Instagram'],
    features: ['Lookbook Layouts', 'Instagram Shop', 'Quick View', 'Size Guide', 'Wishlist', 'Color Swatches', 'Model Info', 'Style With Section'],
    demoUrl: 'https://demo.thememarket.com/luxe',
    seo: {
      metaTitle: 'Luxe Fashion Shopify Theme | Boutique Store | ThemeMarket',
      metaDescription: 'Luxe is an elegant Shopify fashion theme with lookbook, Instagram shop, and advanced filtering. Perfect for clothing and boutique stores.',
      keywords: ['fashion shopify theme', 'boutique theme', 'clothing store', 'luxury theme', 'instagram shop']
    }
  },
  {
    id: '9',
    title: 'Beauty & Cosmetics',
    description: 'Stunning Shopify theme for beauty brands with product bundles, subscriptions, and reward points.',
    fullDescription: 'Beauty is designed specifically for cosmetics, skincare, and beauty brands. Features include product bundles, subscription boxes, reward points integration, ingredient lists, before/after sliders, and tutorial videos. Includes 6 unique homepage layouts.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'shopify',
    price: 79,
    author: 'BeautyThemes',
    image: '/templates/shopify-beauty-store.jpg',
    tags: ['Beauty', 'Cosmetics', 'Subscriptions', 'Skincare', 'Wellness'],
    reviews: 654,
    rating: 4.7,
    featured: false,
    badge: 'New',
    inStock: true,
    sales: 12800,
    license: 'regular',
    version: '2.1.0',
    lastUpdate: '2024-02-03',
    compatibility: ['Shopify 2.0', 'Recharge', 'Smile.io'],
    features: ['Product Bundles', 'Subscriptions', 'Reward Points', 'Ingredient Lists', 'Before/After Slider', 'Tutorial Videos', 'Shade Finder', 'Reviews'],
    demoUrl: 'https://demo.thememarket.com/beauty',
    seo: {
      metaTitle: 'Beauty Shopify Theme | Cosmetics & Skincare | ThemeMarket',
      metaDescription: 'Beauty Shopify theme for cosmetics and skincare brands. Product bundles, subscriptions, and reward points. Build your beauty empire.',
      keywords: ['beauty shopify theme', 'cosmetics theme', 'skincare store', 'beauty brand', 'subscription box']
    }
  },
  {
    id: '10',
    title: 'Minimal Shopify Starter',
    description: 'Clean minimal Shopify starter theme, perfect for small stores and dropshipping businesses.',
    fullDescription: 'Minimal is a free Shopify starter theme perfect for new store owners and dropshippers. Clean, lightweight design with essential features including product quick view, newsletter popup, currency converter, and announcement bar. Easy to customize and fast loading.',
    category: 'starter',
    type: 'starter',
    platform: 'shopify',
    price: 0,
    author: 'StartupThemes',
    image: '/templates/shopify-minimal-starter.jpg',
    tags: ['Minimal', 'Starter', 'Dropship', 'Free', 'Clean'],
    reviews: 2341,
    rating: 4.6,
    featured: false,
    badge: 'Free',
    inStock: true,
    sales: 89200,
    license: 'regular',
    version: '1.2.0',
    lastUpdate: '2024-01-15',
    compatibility: ['Shopify 2.0'],
    features: ['Quick View', 'Newsletter Popup', 'Currency Converter', 'Announcement Bar', 'Collection Filters', 'Related Products', 'Social Sharing', 'Trust Badges'],
    demoUrl: 'https://demo.thememarket.com/minimal',
    seo: {
      metaTitle: 'Minimal Free Shopify Theme | Starter Template | ThemeMarket',
      metaDescription: 'Free minimal Shopify starter theme for new stores and dropshipping. Clean design, essential features, fast loading. Start selling today.',
      keywords: ['free shopify theme', 'minimal theme', 'starter theme', 'dropshipping theme', 'clean shopify']
    }
  },
  {
    id: '11',
    title: 'Electronics Mega Store',
    description: 'Feature-rich Shopify theme for electronics with mega menu, comparison, and spec tables.',
    fullDescription: 'Electronics Mega Store is built for large electronics and tech stores. Features mega menu navigation, product comparison tool, detailed spec tables, 360-degree product views, and advanced filtering by technical specifications. Supports thousands of products.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'shopify',
    price: 109,
    author: 'TechThemes',
    image: '/templates/shopify-electronics.jpg',
    tags: ['Electronics', 'Mega Menu', 'Compare', 'Tech', 'Gadgets'],
    reviews: 543,
    rating: 4.8,
    featured: false,
    badge: 'Popular',
    inStock: true,
    sales: 15600,
    license: 'regular',
    version: '2.5.0',
    lastUpdate: '2024-01-22',
    compatibility: ['Shopify 2.0'],
    features: ['Mega Menu', 'Product Compare', 'Spec Tables', '360 Product View', 'Advanced Filters', 'Flash Sales', 'Brand Logos', 'Video Reviews'],
    demoUrl: 'https://demo.thememarket.com/electronics',
    seo: {
      metaTitle: 'Electronics Shopify Theme | Tech Store | ThemeMarket',
      metaDescription: 'Electronics Shopify theme with mega menu, product comparison, and spec tables. Perfect for tech stores, gadgets, and large catalogs.',
      keywords: ['electronics shopify', 'tech store theme', 'gadget store', 'mega menu shopify', 'product comparison']
    }
  },

  // HTML Templates
  {
    id: '12',
    title: 'Startup Landing Page',
    description: 'Modern HTML5 landing page template with animations, pricing tables, and contact forms.',
    fullDescription: 'Startup Landing is a modern HTML5 template perfect for SaaS products, apps, and startups. Features smooth scroll animations, interactive pricing tables, testimonial carousels, and contact forms with validation. Built with Bootstrap 5 and SCSS.',
    category: 'business',
    type: 'theme',
    platform: 'html',
    price: 29,
    author: 'LaunchThemes',
    image: '/templates/html-startup-landing.jpg',
    tags: ['Landing', 'Startup', 'Animations', 'SaaS', 'Bootstrap'],
    reviews: 1567,
    rating: 4.8,
    featured: true,
    badge: 'Bestseller',
    inStock: true,
    sales: 42100,
    license: 'regular',
    version: '2.0.0',
    lastUpdate: '2024-02-01',
    compatibility: ['Bootstrap 5', 'All Modern Browsers', 'Node.js 18+'],
    features: ['Smooth Animations', 'Pricing Tables', 'Testimonials', 'Contact Form', 'Newsletter', 'FAQ Section', 'Video Modal', 'Sticky Header'],
    demoUrl: 'https://demo.thememarket.com/startup-landing',
    seo: {
      metaTitle: 'Startup Landing Page HTML | SaaS Template | ThemeMarket',
      metaDescription: 'Modern HTML5 startup landing page with animations, pricing tables, and contact forms. Perfect for SaaS, apps, and product launches.',
      keywords: ['landing page template', 'startup html', 'saas template', 'bootstrap landing', 'product page']
    }
  },
  {
    id: '13',
    title: 'Developer Portfolio HTML',
    description: 'Creative HTML portfolio template for developers with project showcase, skills, and blog.',
    fullDescription: 'Developer Portfolio is a creative HTML template designed for developers, programmers, and tech professionals. Features include animated skills bars, GitHub integration, project showcase with filters, blog section, and dark/light mode toggle.',
    category: 'portfolio',
    type: 'theme',
    platform: 'html',
    price: 19,
    author: 'DevTemplates',
    image: '/templates/html-developer-portfolio.jpg',
    tags: ['Portfolio', 'Developer', 'Creative', 'GitHub', 'Dark Mode'],
    reviews: 987,
    rating: 4.7,
    featured: true,
    badge: 'Popular',
    inStock: true,
    sales: 28900,
    license: 'regular',
    version: '1.4.0',
    lastUpdate: '2024-01-18',
    compatibility: ['All Modern Browsers', 'Node.js 18+'],
    features: ['Dark/Light Mode', 'Skills Animation', 'GitHub Integration', 'Project Filters', 'Blog Section', 'Contact Form', 'Smooth Scroll', 'Preloader'],
    demoUrl: 'https://demo.thememarket.com/developer-portfolio',
    seo: {
      metaTitle: 'Developer Portfolio HTML | Programmer Template | ThemeMarket',
      metaDescription: 'Creative HTML portfolio for developers with GitHub integration, project showcase, and dark mode. Stand out from the crowd.',
      keywords: ['developer portfolio', 'programmer template', 'github portfolio', 'tech portfolio', 'coding portfolio']
    }
  },
  {
    id: '14',
    title: 'Agency Starter Kit',
    description: 'Complete HTML agency template with services, team, case studies, and contact sections.',
    fullDescription: 'Agency Starter Kit is a free HTML template for digital agencies, studios, and freelancers. Includes service listings, team member profiles, case studies portfolio, client logos, testimonials, and contact form. Built with Tailwind CSS.',
    category: 'business',
    type: 'starter',
    platform: 'html',
    price: 0,
    author: 'AgencyPro',
    image: '/templates/html-agency-starter.jpg',
    tags: ['Agency', 'Starter', 'Services', 'Free', 'Tailwind'],
    reviews: 1876,
    rating: 4.9,
    featured: true,
    badge: 'Free',
    inStock: true,
    sales: 67400,
    license: 'regular',
    version: '1.0.0',
    lastUpdate: '2024-01-25',
    compatibility: ['All Modern Browsers', 'Tailwind CSS 3.4+'],
    features: ['Service Listings', 'Team Profiles', 'Case Studies', 'Client Logos', 'Testimonials', 'Contact Form', 'Blog Section', 'Responsive'],
    demoUrl: 'https://demo.thememarket.com/agency-starter',
    seo: {
      metaTitle: 'Agency Starter Kit | Free HTML Template | ThemeMarket',
      metaDescription: 'Free HTML agency template with services, team, and case studies. Built with Tailwind CSS. Perfect for agencies and freelancers.',
      keywords: ['agency template', 'free html', 'tailwind template', 'startup template', 'studio website']
    }
  },
  {
    id: '15',
    title: 'Restaurant HTML Template',
    description: 'Beautiful restaurant HTML template with menu builder, reservation form, and gallery.',
    fullDescription: 'Restaurant is a beautiful HTML template for restaurants, cafes, and food businesses. Features include interactive menu with categories and prices, reservation form with date picker, food gallery with lightbox, and Google Maps integration.',
    category: 'business',
    type: 'theme',
    platform: 'html',
    price: 35,
    author: 'FoodThemes',
    image: '/templates/html-restaurant.jpg',
    tags: ['Restaurant', 'Food', 'Menu', 'Cafe', 'Reservation'],
    reviews: 654,
    rating: 4.6,
    featured: false,
    inStock: true,
    sales: 13200,
    license: 'regular',
    version: '1.3.0',
    lastUpdate: '2024-01-12',
    compatibility: ['All Modern Browsers', 'Bootstrap 5'],
    features: ['Menu Builder', 'Reservation Form', 'Food Gallery', 'Google Maps', 'Opening Hours', 'Chef Profiles', 'Testimonials', 'Instagram Feed'],
    demoUrl: 'https://demo.thememarket.com/restaurant',
    seo: {
      metaTitle: 'Restaurant HTML Template | Cafe & Food | ThemeMarket',
      metaDescription: 'Beautiful restaurant HTML template with menu builder, reservations, and gallery. Perfect for restaurants, cafes, and food businesses.',
      keywords: ['restaurant template', 'cafe html', 'food website', 'menu template', 'reservation form']
    }
  },
  {
    id: '16',
    title: 'Photography Portfolio',
    description: 'Stunning HTML photography portfolio with fullscreen galleries, lightbox, and lazy loading.',
    fullDescription: 'Photography Portfolio is a stunning HTML template for photographers and visual artists. Features fullscreen image galleries with lightbox, lazy loading for fast performance, filterable portfolio, client proofing page, and contact form with file upload.',
    category: 'portfolio',
    type: 'theme',
    platform: 'html',
    price: 25,
    author: 'PhotoThemes',
    image: '/templates/html-photography.jpg',
    tags: ['Photography', 'Gallery', 'Lightbox', 'Visual', 'Artist'],
    reviews: 543,
    rating: 4.8,
    featured: false,
    badge: 'New',
    inStock: true,
    sales: 9800,
    license: 'regular',
    version: '1.1.0',
    lastUpdate: '2024-02-02',
    compatibility: ['All Modern Browsers'],
    features: ['Fullscreen Gallery', 'Lightbox', 'Lazy Loading', 'Portfolio Filters', 'Client Proofing', 'File Upload', 'Before/After', 'EXIF Display'],
    demoUrl: 'https://demo.thememarket.com/photography',
    seo: {
      metaTitle: 'Photography Portfolio HTML | Gallery Template | ThemeMarket',
      metaDescription: 'Stunning photography portfolio HTML with fullscreen galleries, lightbox, and lazy loading. Perfect for photographers and artists.',
      keywords: ['photography template', 'gallery html', 'portfolio template', 'photographer website', 'lightbox gallery']
    }
  },
  {
    id: '17',
    title: 'SaaS Dashboard UI',
    description: 'Complete HTML/CSS dashboard template with charts, tables, forms, and dark mode.',
    fullDescription: 'SaaS Dashboard UI is a complete admin dashboard template for web applications. Includes 50+ UI components, interactive charts with Chart.js, data tables with sorting and filtering, form elements, and both light and dark mode themes.',
    category: 'business',
    type: 'theme',
    platform: 'html',
    price: 49,
    compareAtPrice: 79,
    author: 'DashboardPro',
    image: '/templates/html-dashboard.jpg',
    tags: ['Dashboard', 'Admin', 'Charts', 'SaaS', 'UI Kit'],
    reviews: 1234,
    rating: 4.9,
    featured: false,
    badge: 'Sale',
    inStock: true,
    sales: 23400,
    license: 'regular',
    version: '3.0.0',
    lastUpdate: '2024-02-04',
    compatibility: ['All Modern Browsers', 'Chart.js 4', 'Bootstrap 5'],
    features: ['50+ Components', 'Interactive Charts', 'Data Tables', 'Form Elements', 'Dark Mode', 'Notifications', 'User Management', 'Settings Pages'],
    demoUrl: 'https://demo.thememarket.com/dashboard',
    seo: {
      metaTitle: 'SaaS Dashboard UI | Admin Template | ThemeMarket',
      metaDescription: 'Complete HTML dashboard template with 50+ components, charts, and dark mode. Perfect for SaaS admin panels and web apps.',
      keywords: ['dashboard template', 'admin html', 'saas dashboard', 'ui kit', 'chart.js template']
    }
  },
  {
    id: '18',
    title: 'Creative Agency HTML',
    description: 'Bold creative agency template with parallax effects, portfolio slider, and animations.',
    fullDescription: 'Creative Agency is a bold HTML template for creative studios, design agencies, and marketing firms. Features include parallax scrolling effects, portfolio slider with hover effects, team showcase, and smooth CSS animations throughout.',
    category: 'portfolio',
    type: 'theme',
    platform: 'html',
    price: 39,
    author: 'CreativeStack',
    image: '/templates/html-creative-agency.jpg',
    tags: ['Agency', 'Creative', 'Parallax', 'Design', 'Marketing'],
    reviews: 765,
    rating: 4.7,
    featured: false,
    inStock: true,
    sales: 16700,
    license: 'regular',
    version: '1.5.0',
    lastUpdate: '2024-01-20',
    compatibility: ['All Modern Browsers', 'GSAP'],
    features: ['Parallax Effects', 'Portfolio Slider', 'CSS Animations', 'Team Showcase', 'Service Cards', 'Video Background', 'Testimonials', 'Blog Grid'],
    demoUrl: 'https://demo.thememarket.com/creative-agency',
    seo: {
      metaTitle: 'Creative Agency HTML | Design Studio Template | ThemeMarket',
      metaDescription: 'Bold creative agency HTML template with parallax, animations, and portfolio slider. Perfect for design studios and marketing agencies.',
      keywords: ['creative agency', 'design studio', 'parallax template', 'agency html', 'marketing website']
    }
  },

  // Additional WooCommerce Themes
  {
    id: '19',
    title: 'FoodMart Grocery',
    description: 'WooCommerce grocery store theme with delivery zones, time slots, and product freshness badges.',
    fullDescription: 'FoodMart is the ultimate WooCommerce theme for grocery stores and food delivery. Features delivery zone management, time slot selection, product freshness indicators, weight-based pricing, and refrigerated product handling.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'woocommerce',
    price: 79,
    author: 'FoodThemes',
    image: '/templates/shopmax-woo.jpg',
    tags: ['Grocery', 'Food', 'Delivery', 'WooCommerce', 'Fresh'],
    reviews: 432,
    rating: 4.7,
    featured: false,
    badge: 'New',
    inStock: true,
    sales: 8900,
    license: 'regular',
    version: '1.2.0',
    lastUpdate: '2024-02-01',
    compatibility: ['WordPress 6.4+', 'WooCommerce 8.2+'],
    features: ['Delivery Zones', 'Time Slots', 'Freshness Badges', 'Weight Pricing', 'Product Labels', 'Quick Reorder', 'Shopping Lists', 'Recipe Links'],
    demoUrl: 'https://demo.thememarket.com/foodmart',
    seo: {
      metaTitle: 'FoodMart Grocery WooCommerce Theme | Food Delivery | ThemeMarket',
      metaDescription: 'WooCommerce grocery theme with delivery zones, time slots, and freshness badges. Perfect for supermarkets and food delivery stores.',
      keywords: ['grocery theme', 'food delivery', 'woocommerce grocery', 'supermarket theme', 'online grocery']
    }
  },
  {
    id: '20',
    title: 'Flavor Shop Pro',
    description: 'Multi-vendor WooCommerce marketplace theme with vendor dashboards and commission management.',
    fullDescription: 'Flavor Shop Pro transforms WooCommerce into a full multi-vendor marketplace. Includes vendor registration and dashboards, commission management, vendor verification badges, and review systems. Compatible with WCFM and Dokan.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'woocommerce',
    price: 99,
    compareAtPrice: 149,
    author: 'MarketThemes',
    image: '/templates/flavor-business.jpg',
    tags: ['Marketplace', 'Multi-vendor', 'WooCommerce', 'Commission', 'Dokan'],
    reviews: 567,
    rating: 4.8,
    featured: false,
    badge: 'Sale',
    inStock: true,
    sales: 12300,
    license: 'regular',
    version: '2.0.0',
    lastUpdate: '2024-01-28',
    compatibility: ['WordPress 6.4+', 'WooCommerce 8.2+', 'WCFM/Dokan'],
    features: ['Vendor Dashboards', 'Commission System', 'Vendor Verification', 'Store Pages', 'Vendor Reviews', 'Payout Reports', 'Product Import', 'Store Locator'],
    demoUrl: 'https://demo.thememarket.com/flavor-shop',
    seo: {
      metaTitle: 'Flavor Shop Pro | Multi-vendor Marketplace | ThemeMarket',
      metaDescription: 'WooCommerce multi-vendor marketplace theme with vendor dashboards and commission management. Build your own Amazon or Etsy.',
      keywords: ['marketplace theme', 'multi-vendor', 'woocommerce marketplace', 'dokan theme', 'vendor theme']
    }
  },

  // Additional WordPress Themes
  {
    id: '21',
    title: 'Flavor Portfolio Plus',
    description: 'Advanced WordPress portfolio theme with case study layouts and client management.',
    fullDescription: 'Flavor Portfolio Plus is designed for agencies and freelancers who want to showcase their work professionally. Features detailed case study layouts, client testimonials with ratings, project timeline visualization, and results metrics display.',
    category: 'portfolio',
    type: 'theme',
    platform: 'wordpress',
    price: 59,
    author: 'PortfolioPro',
    image: '/templates/developer-portfolio.jpg',
    tags: ['Portfolio', 'Case Study', 'Agency', 'Freelancer', 'Creative'],
    reviews: 345,
    rating: 4.8,
    featured: false,
    inStock: true,
    sales: 7600,
    license: 'regular',
    version: '1.6.0',
    lastUpdate: '2024-01-15',
    compatibility: ['WordPress 6.4+', 'Elementor Pro'],
    features: ['Case Study Layout', 'Client Management', 'Project Timeline', 'Results Metrics', 'Filterable Grid', 'Before/After', 'Video Showcase', 'PDF Proposals'],
    demoUrl: 'https://demo.thememarket.com/portfolio-plus',
    seo: {
      metaTitle: 'Flavor Portfolio Plus | Case Study WordPress | ThemeMarket',
      metaDescription: 'Advanced WordPress portfolio theme with case study layouts and client management. Perfect for agencies and freelancers.',
      keywords: ['portfolio theme', 'case study', 'agency portfolio', 'freelancer theme', 'creative wordpress']
    }
  },

  // Additional Shopify Themes  
  {
    id: '22',
    title: 'Flavor Food Delivery',
    description: 'Shopify theme for restaurants and food delivery with menu management and order tracking.',
    fullDescription: 'Flavor Food Delivery is designed for restaurants, cloud kitchens, and food delivery services on Shopify. Features visual menu builder, delivery area management, order tracking, and integration with delivery apps.',
    category: 'ecommerce',
    type: 'theme',
    platform: 'shopify',
    price: 89,
    author: 'FoodThemes',
    image: '/templates/html-restaurant.jpg',
    tags: ['Food', 'Restaurant', 'Delivery', 'Menu', 'Orders'],
    reviews: 234,
    rating: 4.6,
    featured: false,
    inStock: true,
    sales: 5400,
    license: 'regular',
    version: '1.3.0',
    lastUpdate: '2024-02-02',
    compatibility: ['Shopify 2.0', 'DoorDash', 'UberEats'],
    features: ['Menu Builder', 'Delivery Zones', 'Order Tracking', 'Table Reservations', 'Special Offers', 'Combo Deals', 'Allergen Info', 'Kitchen Display'],
    demoUrl: 'https://demo.thememarket.com/food-delivery',
    seo: {
      metaTitle: 'Flavor Food Delivery Shopify Theme | Restaurant | ThemeMarket',
      metaDescription: 'Shopify theme for restaurants and food delivery with menu builder and order tracking. Connect with DoorDash and UberEats.',
      keywords: ['food delivery theme', 'restaurant shopify', 'menu builder', 'online ordering', 'cloud kitchen']
    }
  },

  // Additional HTML Templates
  {
    id: '23',
    title: 'Flavor Event Landing',
    description: 'HTML event and conference landing page with countdown, speakers, and ticket booking.',
    fullDescription: 'Flavor Event Landing is perfect for conferences, webinars, and events. Features animated countdown timer, speaker profiles with social links, schedule timeline, sponsor logos, and integrated ticket booking with Eventbrite.',
    category: 'business',
    type: 'theme',
    platform: 'html',
    price: 29,
    author: 'EventThemes',
    image: '/templates/html-startup-landing.jpg',
    tags: ['Event', 'Conference', 'Countdown', 'Speakers', 'Tickets'],
    reviews: 456,
    rating: 4.7,
    featured: false,
    inStock: true,
    sales: 9800,
    license: 'regular',
    version: '1.2.0',
    lastUpdate: '2024-01-22',
    compatibility: ['All Modern Browsers', 'Eventbrite'],
    features: ['Countdown Timer', 'Speaker Profiles', 'Schedule Timeline', 'Sponsor Logos', 'Ticket Booking', 'Venue Map', 'Photo Gallery', 'Newsletter'],
    demoUrl: 'https://demo.thememarket.com/event-landing',
    seo: {
      metaTitle: 'Flavor Event Landing | Conference HTML | ThemeMarket',
      metaDescription: 'HTML event landing page with countdown, speakers, and ticket booking. Perfect for conferences, webinars, and meetups.',
      keywords: ['event template', 'conference landing', 'countdown html', 'speaker template', 'ticket booking']
    }
  },
  {
    id: '24',
    title: 'Flavor App Showcase',
    description: 'Mobile app showcase HTML template with feature highlights, screenshots, and download buttons.',
    fullDescription: 'Flavor App Showcase is designed for mobile app developers and startups. Features include device mockup carousels, feature highlights with icons, user testimonials, app store badges, and press kit download section.',
    category: 'business',
    type: 'theme',
    platform: 'html',
    price: 25,
    author: 'AppThemes',
    image: '/templates/html-startup-landing.jpg',
    tags: ['App', 'Mobile', 'Showcase', 'Startup', 'Download'],
    reviews: 678,
    rating: 4.8,
    featured: false,
    badge: 'Popular',
    inStock: true,
    sales: 14200,
    license: 'regular',
    version: '2.1.0',
    lastUpdate: '2024-01-30',
    compatibility: ['All Modern Browsers'],
    features: ['Device Mockups', 'Feature Icons', 'Screenshot Carousel', 'App Store Badges', 'Press Kit', 'Video Trailer', 'User Reviews', 'FAQ Section'],
    demoUrl: 'https://demo.thememarket.com/app-showcase',
    seo: {
      metaTitle: 'Flavor App Showcase HTML | Mobile Landing | ThemeMarket',
      metaDescription: 'Mobile app showcase HTML template with device mockups, features, and download buttons. Perfect for app launches and startups.',
      keywords: ['app landing page', 'mobile showcase', 'app template', 'startup landing', 'download page']
    }
  },
]

// Helper function to get products by platform
export function getProductsByPlatform(platform: Platform): Product[] {
  return products.filter(p => p.platform === platform)
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

// Helper function to get free products
export function getFreeProducts(): Product[] {
  return products.filter(p => p.price === 0)
}

// Helper function to calculate license price
export function calculateLicensePrice(basePrice: number, licenseType: LicenseType): number {
  const license = licenses.find(l => l.type === licenseType)
  if (!license || basePrice === 0) return basePrice
  return basePrice * license.priceMultiplier
}
