import type { Metadata } from 'next'

import { ChangelogTimeline } from '@/components/ChangelogTimeline'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { CHANGELOG } from '@/lib/changelog'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Changelog',
  description: `Site and product updates across the ${SITE.name} family.`,
}

export default function ChangelogPage() {
  return (
    <>
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 pb-20 pt-4 md:px-10 md:pt-8">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-mach-fg md:text-4xl">Changelog</h1>
          <p className="mt-3 text-sm leading-relaxed text-mach-fg-soft">
            Site and product updates across the {SITE.name}
            {' '}family. For desktop-app-specific release notes, see each product&apos;s own GitHub Releases.
          </p>
        </div>
        <ChangelogTimeline periods={CHANGELOG} />
      </main>

      <SiteFooter />
    </>
  )
}
