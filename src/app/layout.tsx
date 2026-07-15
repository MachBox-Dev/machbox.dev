import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { BRAND, SITE } from '@/lib/site'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const defaultTitle = `${SITE.name}: ${SITE.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: defaultTitle,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  icons: {
    icon: [{ url: BRAND.icon, sizes: '32x32', type: 'image/x-icon' }],
    apple: [{ url: BRAND.logo, type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: defaultTitle,
    description: SITE.description,
    images: [
      {
        url: BRAND.ogImage,
        width: BRAND.ogImageWidth,
        height: BRAND.ogImageHeight,
        alt: BRAND.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: SITE.description,
    images: [BRAND.ogImage],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  )
}
