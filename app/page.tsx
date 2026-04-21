// Server Component - Fetches securely
async function getProducts() {
  // Skip fetch during build if WooCommerce is not configured
  if (!process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET || !process.env.NEXT_PUBLIC_WP_URL) {
    return [];
  }

  try {
    const auth = Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64');
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/products`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 60 }, // Cache updates every 60 seconds
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    // Return empty array if fetch fails (e.g., during build or if WP is unreachable)
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen">
      {/* Hero Section - Analog / Editorial Feel */}
      <section className="max-w-7xl mx-auto px-8 py-24 text-center">
        <p className="uppercase tracking-[0.3em] text-nordic-muted text-xs mb-6">The Analog Collection</p>
        <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
          Digital Memories,<br/> Crafted in Wood.
        </h1>
        <button className="uppercase tracking-widest text-xs border border-nordic-text px-8 py-4 hover:bg-nordic-text hover:text-nordic-bg transition-all duration-300">
          Discover Collection
        </button>
      </section>

      {/* Product Grid - Minimalist */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product: any) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image Container with subtle overflow logic */}
                <div className="bg-nordic-paper aspect-[4/5] relative w-full mb-6 overflow-hidden flex items-center justify-center p-8">
                  <img 
                    src={product.images[0]?.src || '/placeholder.jpg'} 
                    alt={product.name}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                
                {/* Text / Pricing */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 
                      className="font-serif text-xl mb-1 group-hover:text-nordic-accent transition-colors"
                      dangerouslySetInnerHTML={{ __html: product.name }} 
                    />
                    <p className="text-nordic-muted text-sm" dangerouslySetInnerHTML={{ __html: product.categories[0]?.name || 'Frame' }} />
                  </div>
                  <p className="font-sans font-medium">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-nordic-muted text-lg">Our collection is coming soon.</p>
            <p className="text-nordic-muted text-sm mt-2">Check back later for our handcrafted digital frames.</p>
          </div>
        )}
      </section>
    </main>
  );
}
