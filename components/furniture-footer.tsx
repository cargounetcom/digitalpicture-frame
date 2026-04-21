import Link from "next/link"

const footerLinks = {
  shop: [
    { label: "All Furniture", href: "/shop" },
    { label: "Sofas", href: "/shop?category=sofas" },
    { label: "Chairs", href: "/shop?category=chairs" },
    { label: "Tables", href: "/shop?category=tables" },
    { label: "Lighting", href: "/shop?category=lighting" },
  ],
  company: [
    { label: "Our Story", href: "#" },
    { label: "Ateliers", href: "#" },
    { label: "Journal", href: "#" },
    { label: "Press", href: "#" },
  ],
  support: [
    { label: "Contact", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "Care Guide", href: "#" },
    { label: "Trade Program", href: "#" },
  ],
}

export function FurnitureFooter() {
  return (
    <footer className="bg-foreground text-primary-foreground" role="contentinfo">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-14 lg:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-light text-primary-foreground tracking-[0.02em]">
                Stay Inspired
              </h3>
              <p className="text-primary-foreground/50 mt-2 max-w-md text-sm">
                Receive early access to new collections, design insights, and exclusive offers from Aurora Ember.
              </p>
            </div>
            <form className="flex w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                className="flex-1 lg:w-72 px-5 py-3.5 bg-primary-foreground/5 border border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-primary-foreground/40 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-primary-foreground text-foreground text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-primary-foreground/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex flex-col" aria-label="Perseida home">
              <span className="font-serif text-xl font-light text-primary-foreground tracking-[0.06em]">
                Perseida
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-primary-foreground/40 mt-1 font-medium">
                By Aurora Ember
              </span>
            </Link>
            <p className="text-primary-foreground/40 text-sm mt-4 leading-relaxed max-w-xs">
              Curated luxury furniture and interior design pieces, handcrafted in European ateliers for the modern home.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] font-medium text-primary-foreground uppercase tracking-[0.2em] mb-5">Shop</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-medium text-primary-foreground uppercase tracking-[0.2em] mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-medium text-primary-foreground uppercase tracking-[0.2em] mb-5">Support</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-primary-foreground/30 tracking-wide">
            2026 Perseida. Designed by Aurora Ember. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[11px] text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors tracking-wide">
              Privacy
            </Link>
            <Link href="#" className="text-[11px] text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors tracking-wide">
              Terms
            </Link>
            <Link href="#" className="text-[11px] text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors tracking-wide">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
