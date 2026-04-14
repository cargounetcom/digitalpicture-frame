import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nordic: {
          bg: '#f8f7f5',       // Warm off-white/cream
          paper: '#ffffff',    // Pure white for product cards
          text: '#2c2a29',     // Deep charcoal (softer than black)
          muted: '#8b8986',    // Warm gray for secondary text
          accent: '#bfa78a',   // Muted wood/beige accent
          border: '#e6e4e0',   // Subtle border color
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
        sans: ['var(--font-inter)'],
      }
    },
  },
  plugins: [],
}
export default config
