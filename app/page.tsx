// Server Component - Fetches securely
async function getProducts() {
  const auth = Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64');
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/products`, {
    headers: { Authorization: `Basic ${auth}` },
    next: { revalidate: 60 }, // Cache updates every 60 seconds
  });

  if (!res.ok) return [];
  return res.json();
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
      </section>
    </main>
  );
}
async function getWooCommerceProducts() {
  const auth = Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64');
  
  // Use your actual wp.digitalpictureframe.shop URL here
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/products`, {
    headers: { Authorization: `Basic ${auth}` },
    next: { revalidate: 60 }, 
  });

  if (!res.ok) return[];
  return res.json();
}

export default async function Home() {
  const products = await getWooCommerceProducts();

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      
      {/* --- BACKGROUND GLOW EFFECTS (Aurora & Ember) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Aurora Cyan/Purple Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-aurora-cyan/20 rounded-full blur-[120px] animate-aurora-shift mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-aurora-purple/10 rounded-full blur-[150px] animate-aurora-shift mix-blend-screen" style={{ animationDelay: '2s' }}></div>
        
        {/* Ember Orange Glow */}
        <div className="absolute bottom-[-20%] left-[20%] w-[800px] h-[400px] bg-ember-flame/15 rounded-full blur-[150px] animate-ember-pulse mix-blend-screen"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24 text-center">
        <p className="uppercase tracking-[0.4em] text-aurora-cyan text-xs mb-6 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
          Cyber-Nordic Aesthetics
        </p>
        <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-none text-white drop-shadow-2xl">
          Ember & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan via-white to-aurora-purple">Aurora.</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto font-sans font-light mb-10 text-sm leading-relaxed">
          Minimalist luxury meets futuristic illumination. Curated smart-furniture and bespoke jewelry designed for the modern cyber-age.
        </p>
      </section>

      {/* --- PRODUCT GRID (Glassmorphism Nordic Design) --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12 border-b border-cyber-border pb-4">
          <h2 className="font-serif text-3xl">Latest Acquisitions</h2>
          <span className="text-xs uppercase tracking-widest text-gray-500">View All</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product.id} className="group relative">
              
              {/* Glowing hover effect behind the card */}
              <div className="absolute inset-0 bg-gradient-to-b from-aurora-cyan/0 to-ember-flame/0 group-hover:from-aurora-cyan/10 group-hover:to-ember-flame/10 rounded-xl transition-all duration-700 blur-xl"></div>

              {/* Glassmorphism Card */}
              <div className="relative h-full bg-cyber-surface/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col">
                
                {/* Product Image */}
                <div className="aspect-[4/5] relative w-full mb-6 flex items-center justify-center overflow-hidden rounded-lg bg-black/50">
                  <img 
                    src={product.images[0]?.src || '/placeholder.jpg'} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-out"
                    style={{ filter: 'contrast(1.1) brightness(0.9)' }} // Gives images that moody, dark-nordic look
                  />
                  
                  {/* Cyber UI overlay elements */}
                  <div className="absolute top-4 left-4 border border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-aurora-cyan rounded-full">
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
                    <p className="font-sans font-light text-lg tracking-wide text-ember-glow shadow-ember-glow/20 drop-shadow-md">
                      ${product.price}
                    </p>
                    <button className="text-xs uppercase tracking-widest hover:text-aurora-cyan transition-colors relative overflow-hidden group/btn">
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
