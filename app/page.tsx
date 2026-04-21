import Link from 'next/link';

// Server Component - Fetches securely
async function getProducts() {
  const auth = Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64');
  
  // Fix URL: remove www. prefix and trailing slash
  let wpUrl = process.env.NEXT_PUBLIC_WP_URL || 'https://wp.digitalpictureframe.shop';
  wpUrl = wpUrl.replace('www.wp.', 'wp.').replace(/\/$/, '');
  
  try {
    const res = await fetch(`${wpUrl}/wp-json/wc/v3/products`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('[v0] WooCommerce fetch error:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="relative min-h-screen pt-32 pb-20 bg-slate-950">
      
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[800px] h-[400px] bg-orange-500/15 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      {/* --- ADMIN NAV BAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl text-white">
            Digital Picture Frame
          </Link>
          <div className="flex gap-6 items-center">
            <Link 
              href="/collections" 
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Collections
            </Link>
            <Link 
              href="/dashboard/generator" 
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-purple-400 transition-colors"
            >
              AI Generator
            </Link>
            <Link 
              href="/woo-export" 
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors"
            >
              WooCommerce Export
            </Link>
            <Link 
              href="/admin" 
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-orange-400 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24 text-center">
        <p className="uppercase tracking-[0.4em] text-cyan-400 text-xs mb-6 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
          Cyber-Nordic Aesthetics
        </p>
        <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-none text-white drop-shadow-2xl">
          Ember & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">Aurora.</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto font-sans font-light mb-10 text-sm leading-relaxed">
          Minimalist luxury meets futuristic illumination. Curated smart-furniture and bespoke jewelry designed for the modern cyber-age.
        </p>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12 border-b border-slate-700 pb-4">
          <h2 className="font-serif text-3xl text-white">Latest Acquisitions</h2>
          <span className="text-xs uppercase tracking-widest text-gray-500">View All</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product.id} className="group relative">
              
              {/* Glowing hover effect behind the card */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-orange-500/0 group-hover:from-cyan-500/10 group-hover:to-orange-500/10 rounded-xl transition-all duration-700 blur-xl"></div>

              {/* Glassmorphism Card */}
              <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col">
                
                {/* Product Image */}
                <div className="aspect-[4/5] relative w-full mb-6 flex items-center justify-center overflow-hidden rounded-lg bg-black/50">
                  <img 
                    src={product.images[0]?.src || '/placeholder.jpg'} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-out"
                    style={{ filter: 'contrast(1.1) brightness(0.9)' }}
                  />
                  
                  {/* Cyber UI overlay elements */}
                  <div className="absolute top-4 left-4 border border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-cyan-400 rounded-full">
                    {product.categories[0]?.name || 'Object'}
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="mt-auto flex flex-col items-start">
                  <h3 
                    className="font-serif text-2xl mb-2 text-gray-100 group-hover:text-white transition-colors"
                    dangerouslySetInnerHTML={{ __html: product.name }} 
                  />
                  <div className="w-full flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <p className="font-sans font-light text-lg tracking-wide text-orange-400 drop-shadow-md">
                      {product.price ? `€${product.price}` : 'Price on request'}
                    </p>
                    <button className="text-xs uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors relative overflow-hidden group/btn">
                      <span className="relative z-10">Add +</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
