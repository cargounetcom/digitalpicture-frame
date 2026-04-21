import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  templates: [
    { label: "Shopify Themes", href: "#" },
    { label: "WooCommerce Themes", href: "#" },
    { label: "WordPress Themes", href: "#" },
    { label: "New Releases", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Story", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  support: [
    { label: "Documentation", href: "#" },
    { label: "Contact", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "License", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
}

export function MarketFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-serif text-2xl lg:text-3xl">
              Stay in the loop
            </h3>
            <p className="mt-2 text-muted-foreground">
              Get updates on new templates, design tips, and exclusive offers.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-sm border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Button type="submit" className="px-6">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-6">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-foreground">
                  <span className="font-serif text-sm text-background">AE</span>
                </div>
                <span className="font-serif text-lg tracking-tight">Aurora Ember-Cyber</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Premium e-commerce templates for digital picture frames and smart home displays. 
                Nordic-inspired design for digitalpictureframe.shop.
              </p>
              <div className="mt-6 flex gap-4">
                {["Twitter", "Instagram", "Dribbble", "GitHub"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {social.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-foreground">
                Templates
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.templates.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-foreground">
                Company
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-foreground">
                Support
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-foreground">
                Legal
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row lg:px-8">
          <p className="text-xs text-muted-foreground">
            © 2026 Aurora Ember-Cyber. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              digitalpictureframe.shop
            </span>
            <div className="h-3 w-px bg-border" />
            <span className="text-xs text-muted-foreground">
              Licensed Templates
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
