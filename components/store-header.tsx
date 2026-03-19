"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingBag, Menu, X, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/cart-store"

const navigation = [
  { name: "All Products", href: "#" },
  { name: "Templates", href: "#" },
  { name: "Plugins", href: "#" },
  { name: "SaaS", href: "#" },
  { name: "Sale", href: "#" },
]

export function StoreHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { toggleCart, getItemCount } = useCartStore()
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium">
        Free shipping on orders over $100 — Limited time offer
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu */}
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col gap-6 pt-6">
                  <Link href="/" className="text-xl font-bold text-foreground">
                    DigitalFrame
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DF</span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-foreground">
                DigitalFrame
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex flex-1 items-center justify-end gap-2">
            {/* Search */}
            <div className="hidden sm:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>

            {/* Mobile search */}
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
