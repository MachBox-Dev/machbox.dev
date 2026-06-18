import Image from 'next/image'

import { GITHUB, PRODUCTS, TERMINAL_RELEASE } from '@/lib/site'

import { TerminalReleaseBadge } from './TerminalDownloads'

const product = PRODUCTS.terminal

export function TerminalHero() {
  return (
    <section className="relative text-center">
      <div
        className="pointer-events-none absolute inset-x-0 -top-8 h-80 bg-[radial-gradient(ellipse_at_center,var(--color-mach-terminal-subtle),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto mb-8 h-28 w-28 overflow-hidden rounded-2xl border border-mach-terminal-border bg-mach-panel p-3 shadow-terminal-glow">
        <Image src={product.logo} alt="" fill className="object-contain" sizes="112px" priority />
      </div>

      <div className="mb-4 flex justify-center">
        <TerminalReleaseBadge />
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.22em] text-mach-terminal-dim">
        Open source · Apache-2.0 · no account
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mach-fg md:text-5xl">
        <span className="text-glow-terminal text-mach-terminal-bright">{product.name}</span>
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-lg text-mach-fg-soft">{product.tagline}</p>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mach-muted">{product.description}</p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#install"
          className="inline-flex items-center rounded-button border border-mach-terminal-border bg-mach-terminal-subtle px-5 py-2.5 text-sm font-medium text-mach-terminal-bright transition-colors hover:bg-mach-terminal/20"
        >
          Download {TERMINAL_RELEASE.version}
        </a>
        <a
          href={GITHUB.terminal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-button border border-mach-border px-5 py-2.5 text-sm font-medium text-mach-fg-soft transition-colors hover:border-mach-terminal-border hover:text-mach-terminal-bright"
        >
          View on GitHub
        </a>
      </div>
    </section>
  )
}
