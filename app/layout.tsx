import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Space_Grotesk, Cormorant_Garamond, Space_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], weight: ['300','400','500','600','700'],
  variable: '--font-space-grotesk', display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['300','400','500','600','700'],
  style: ['normal','italic'],
  variable: '--font-cormorant', display: 'swap',
})
const spaceMono = Space_Mono({
  subsets: ['latin'], weight: ['400','700'],
  variable: '--font-space-mono', display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,          // prevents iOS zoom on input focus
  userScalable: false,
  themeColor: '#070707',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'HOORIA AMIR — Classified Archive',
  description: 'Software Engineer specializing in Data Engineering, AI Tooling, and Storytelling Architectures. Access restricted.',
  keywords: ['portfolio','software engineer','Data Engineering','AI tooling','Next.js','TypeScript'],
  authors: [{ name: 'Hooria Amir' }],
  creator: 'Hooria Amir',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'HOORIA AMIR — Classified Archive',
    description: 'Software Engineer · Data Engineering · AI Tooling · Business Intelligence · Full-Stack Interactive Systems',
    siteName: 'Hooria Amir Portfolio',
    // REPLACE: add your real OG image at /public/og-image.jpg (1200×630)
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Hooria Amir — Classified Archive' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOORIA AMIR — Classified Archive',
    description: 'Software Engineer · Data Engineering · AI Tooling · Business Intelligence · Full-Stack Interactive Systems',
    // REPLACE: your Twitter handle
    creator: '@hooria',
    images: ['/og-image.jpg'],
  },
  icons: {
    // Use the explicit JPEG favicon provided in public/
    icon: '/favicon.jpeg',
    shortcut: '/favicon.jpeg',
    apple: '/favicon.jpeg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.jpeg" />
        <link rel="shortcut icon" href="/favicon.jpeg" />
        <link rel="apple-touch-icon" href="/favicon.jpeg" />
      </head>
      <body className="bg-obsidian text-ivory font-sans antialiased overflow-x-hidden">
        {/* Skip to content for keyboard users */}
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
