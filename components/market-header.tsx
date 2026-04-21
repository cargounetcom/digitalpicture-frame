"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MarketHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-foreground">
              <span className="font-serif text-sm text-background">AE</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg leading-none tracking-tight">Aurora Ember-Cyber</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Digital Frame Templates</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 md:flex">
            <Link 
              href="#templates" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Templates
            </Link>
            <Link 
              href="#features" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link 
              href="#support" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Support
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                0
              </span>
            </Button>
            <Button variant="outline" className="text-sm">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-4 px-6 py-6">
            <Link 
              href="#templates" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              href="#features" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="#support" 
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1 text-sm">
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
