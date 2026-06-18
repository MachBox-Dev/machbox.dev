import type { Metadata } from 'next'

import { SiteFooter } from '@/components/SiteFooter'
import { TerminalFeatures } from '@/components/terminal/TerminalFeatures'
import { TerminalHeader } from '@/components/terminal/TerminalHeader'
import { TerminalHero } from '@/components/terminal/TerminalHero'
import { TerminalInstall } from '@/components/terminal/TerminalInstall'
import { BRAND, PRODUCTS, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mach Terminal',
  description: PRODUCTS.terminal.description,
  openGraph: {
    title: `Mach Terminal · ${SITE.name}`,
    description: PRODUCTS.terminal.description,
    url: PRODUCTS.terminal.href,
    images: [
      {
        url: BRAND.ogImage,
        width: BRAND.ogImageWidth,
        height: BRAND.ogImageHeight,
        alt: BRAND.ogImageAlt,
      },
    ],
  },
}

export default function TerminalSitePage() {
  return (
    <>
      <TerminalHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-6 pb-20 pt-4 md:px-10 md:pt-8">
        <TerminalHero />
        <TerminalFeatures />
        <TerminalInstall />
      </main>

      <SiteFooter />
    </>
  )
}
