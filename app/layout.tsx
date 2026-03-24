import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from "@/components/ui/sonner"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'ThemeMarket - Premium WordPress, Shopify & HTML Templates',
    template: '%s | ThemeMarket'
  },
  description: 'Discover premium WordPress themes, Shopify templates, WooCommerce stores, and HTML templates. Trusted by 50,000+ customers with lifetime updates and 24/7 support.',
  keywords: ['wordpress themes', 'shopify themes', 'html templates', 'woocommerce themes', 'website templates', 'premium themes', 'responsive templates'],
  authors: [{ name: 'ThemeMarket' }],
  creator: 'ThemeMarket',
  publisher: 'ThemeMarket',
  generator: 'v0.app',
  metadataBase: new URL('https://thememarket.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thememarket.com',
    siteName: 'ThemeMarket',
    title: 'ThemeMarket - Premium WordPress, Shopify & HTML Templates',
    description: 'Discover premium WordPress themes, Shopify templates, WooCommerce stores, and HTML templates. Trusted by 50,000+ customers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ThemeMarket - Premium Themes & Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThemeMarket - Premium Themes & Templates',
    description: 'Discover premium WordPress, Shopify, WooCommerce, and HTML templates.',
    images: ['/og-image.jpg'],
    creator: '@thememarket',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
