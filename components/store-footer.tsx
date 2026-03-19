import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  shop: {
    title: "Themes",
    links: [
      { name: "All Themes", href: "#" },
      { name: "Business", href: "#" },
      { name: "eCommerce", href: "#" },
      { name: "Blog & Magazine", href: "#" },
      { name: "Portfolio", href: "#" },
      { name: "Free Themes", href: "#" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "License", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Partners", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
]

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"]

export function StoreFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">TM</span>
              </div>
              <span className="text-xl font-bold text-foreground">ThemeMarket</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Premium WordPress themes for businesses, blogs, and online stores. Trusted by 50,000+ customers.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground text-sm">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        {/* Bottom footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ThemeMarket. All rights reserved.
          </p>
          {/* Payment methods */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">We accept:</span>
            <div className="flex items-center gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="h-7 px-2 rounded bg-muted flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {method}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
