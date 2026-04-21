"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingBag, Search, Menu, X, User, Heart } from "lucide-react"
import { useFurnitureCart } from "@/lib/furniture-cart-context"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart-drawer"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=sofas", label: "Sofas" },
  { href: "/shop?category=chairs", label: "Chairs" },
  { href: "/shop?category=tables", label: "Tables" },
  { href: "/shop?category=lighting", label: "Lighting" },
]

export function FurnitureHeader() {
  const { itemCount, setIsCartOpen } = useFurnitureCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Announcement */}
      <div className="bg-foreground text-primary-foreground text-center py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase">
        Complimentary shipping on all orders over $500 | By Aurora Ember
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center" aria-label="Perseida home">
              <span className="font-serif text-2xl lg:text-[28px] font-light text-foreground tracking-[0.06em] leading-none">
                Perseida
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground mt-1 font-medium">
                Interior & Living
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="text-foreground h-9 w-9" aria-label="Search">
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground h-9 w-9" aria-label="Wishlist">
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground h-9 w-9" aria-label="Account">
                <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground h-9 w-9"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[9px] font-bold h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-border bg-background" aria-label="Mobile navigation">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 text-[12px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
