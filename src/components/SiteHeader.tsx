import Link from 'next/link'

import { MachBoxLogo } from '@/components/MachBoxLogo'
import { GITHUB, SITE } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-6 md:px-10">
      <Link href="/" className="group flex items-center gap-3">
        <MachBoxLogo size="sm" className="transition-colors group-hover:border-mach-border-strong" />
        <span className="text-lg font-semibold tracking-tight text-mach-fg">{SITE.name}</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm text-mach-fg-soft sm:gap-6">
        <a href="#products" className="transition-colors hover:text-mach-fg">
          Products
        </a>
        <Link href="/changelog" className="transition-colors hover:text-mach-fg">
          Changelog
        </Link>
        <a
          href={GITHUB.org}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-mach-fg"
        >
          GitHub
        </a>
      </nav>
    </header>
  )
}
