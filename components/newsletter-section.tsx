"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-foreground/10 mb-6">
            <Mail className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground">
            Stay in the Loop
          </h2>
          <p className="mt-3 text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Subscribe to get exclusive deals, new product announcements, and tips delivered to your inbox.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground"
            />
            <Button
              type="submit"
              variant="secondary"
              className="gap-2"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-4 text-sm text-primary-foreground/60">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
