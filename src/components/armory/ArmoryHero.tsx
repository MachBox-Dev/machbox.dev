import Image from 'next/image'
import Link from 'next/link'

import { ACCOUNT, PRODUCTS } from '@/lib/site'
import type { ArmoryReleaseInfo } from '@/lib/armory-release'

import { ArmoryReleaseBadge } from './ArmoryDownloads'

const product = PRODUCTS.armory

type ArmoryHeroProps = {
  release: ArmoryReleaseInfo
}

export function ArmoryHero({ release }: ArmoryHeroProps) {
  return (
    <section className="relative text-center">
      <div
        className="pointer-events-none absolute inset-x-0 -top-8 h-80 bg-[radial-gradient(ellipse_at_center,var(--color-mach-armory-subtle),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto mb-8 h-28 w-28 overflow-hidden rounded-2xl border border-mach-armory-border bg-mach-panel p-3 shadow-armory-glow">
        <Image src={product.logo} alt="" fill className="object-contain" sizes="112px" priority />
      </div>

      <div className="mb-4 flex justify-center">
        <ArmoryReleaseBadge release={release} />
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.22em] text-mach-armory-dim">
        Free local core · Pro unlocks more
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mach-fg md:text-5xl">
        <span className="text-glow-armory text-mach-armory-bright">{product.name}</span>
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-lg text-mach-fg-soft">{product.tagline}</p>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mach-muted">{product.description}</p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#install"
          className="inline-flex items-center rounded-button border border-mach-armory-border bg-mach-armory-subtle px-5 py-2.5 text-sm font-medium text-mach-armory-bright transition-colors hover:bg-mach-armory/20"
        >
          Download {release.version}
        </a>
        <a
          href={ACCOUNT.pricing}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-button border border-mach-border px-5 py-2.5 text-sm font-medium text-mach-fg-soft transition-colors hover:border-mach-armory-border hover:text-mach-armory-bright"
        >
          Compare plans
        </a>
        <Link
          href="/changelog"
          className="inline-flex items-center rounded-button border border-mach-border px-5 py-2.5 text-sm font-medium text-mach-fg-soft transition-colors hover:border-mach-armory-border hover:text-mach-armory-bright"
        >
          Changelog
        </Link>
      </div>
    </section>
  )
}
