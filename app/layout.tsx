import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

// Nordic minimalist font pairing
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
})
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500'] 
})

export const metadata: Metadata = {
  title: 'Digital Picture Frames | Minimalist Design',
  description: 'Nordic inspired digital picture frames.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-nordic-bg text-nordic-text font-sans antialiased selection:bg-nordic-accent selection:text-white">
        {/* Minimalist Navigation */}
        <nav className="w-full border-b border-nordic-border bg-nordic-bg py-6 px-8 flex justify-between items-center">
          <div className="font-serif text-2xl tracking-wide uppercase">DPF.</div>
          <ul className="flex space-x-8 text-sm uppercase tracking-widest text-nordic-muted">
            <li className="hover:text-nordic-text transition-colors cursor-pointer">Shop</li>
            <li className="hover:text-nordic-text transition-colors cursor-pointer">About</li>
            <li className="hover:text-nordic-text transition-colors cursor-pointer">Cart (0)</li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
