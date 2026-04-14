import { StoreHeader } from "@/components/store-header"
import { HeroBanner } from "@/components/hero-banner"
import { CollectionsGrid } from "@/components/collections-grid"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesSection } from "@/components/features-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { StoreFooter } from "@/components/store-footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main>
        <HeroBanner />
        <FeaturesSection />
        <CollectionsGrid />
        <ProductGrid />
        <NewsletterSection />
      </main>
      <StoreFooter />
      <CartDrawer />
    </div>
  )
}
import { Inter } from 'next/font/google';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

// Securely fetch products from WooCommerce API
async function getProducts() {
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  // Fetch from WP API. Next.js caches this and revalidates every 60 seconds (ISR)
  const res = await fetch(`${wpUrl}/wp-json/wc/v3/products`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();
return (
    <main className={`min-h-screen bg-gray-50 text-gray-900 ${inter.className}`}>
      {/* Header Template */}
      <header className="text-center py-16 bg-white shadow-sm mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Digital Picture Frames</h1>
        <p className="mt-2 text-gray-500">Premium headless storefront.</p>
      </header>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
            >
              <div className="aspect-square relative w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
                {/* Note: In production, use Next.js <Image> and configure remote patterns */}
                <img 
                  src={product.images[0]?.src || '/placeholder.jpg'} 
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <h2 className="text-lg font-semibold mb-1" dangerouslySetInnerHTML={{ __html: product.name }} />
              <p className="text-xl font-bold text-gray-700 mb-4">${product.price}</p>
              
              <button className="mt-auto w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
