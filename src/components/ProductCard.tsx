import Image from 'next/image'
import Link from 'next/link'

import type { ProductAccent, ProductStatus } from '@/lib/site'

type ProductCardProps = {
  name: string
  tagline: string
  description: string
  href: string
  logo: string
  accent: ProductAccent
  status: ProductStatus
  external?: boolean
  buyHref?: string
  bundleHref?: string
}

const STATUS_LABEL: Record<ProductStatus, string> = {
  available: 'Available',
  'open-source': 'Open source',
  'coming-soon': 'Coming soon',
}

const accentStyles: Record<
  ProductAccent,
  {
    glow: string
    badge: string
    cta: string
    hoverBorder: string
    tagline: string
  }
> = {
  triage: {
    glow: 'group-hover:shadow-triage-glow',
    badge: 'text-mach-triage bg-mach-triage-subtle border-mach-triage-border',
    cta: 'bg-mach-triage-subtle text-mach-triage-bright border-mach-triage-border hover:bg-mach-triage/20',
    hoverBorder: 'group-hover:border-mach-triage-border',
    tagline: 'text-mach-triage-bright',
  },
  terminal: {
    glow: 'group-hover:shadow-terminal-glow',
    badge: 'text-mach-terminal bg-mach-terminal-subtle border-mach-terminal-border',
    cta: 'bg-mach-terminal-subtle text-mach-terminal-bright border-mach-terminal-border hover:bg-mach-terminal/20',
    hoverBorder: 'group-hover:border-mach-terminal-border',
    tagline: 'text-mach-terminal-bright',
  },
  armory: {
    glow: 'group-hover:shadow-armory-glow',
    badge: 'text-mach-armory bg-mach-armory-subtle border-mach-armory-border',
    cta: 'bg-mach-armory-subtle text-mach-armory-bright border-mach-armory-border hover:bg-mach-armory/20',
    hoverBorder: 'group-hover:border-mach-armory-border',
    tagline: 'text-mach-armory-bright',
  },
}

function ctaLabel(status: ProductStatus): string {
  if (status === 'available') return 'Visit product'
  if (status === 'open-source') return 'View product'
  return 'Preview site'
}

export function ProductCard({
  name,
  tagline,
  description,
  href,
  logo,
  accent,
  status,
  external = false,
  buyHref,
  bundleHref,
}: ProductCardProps) {
  const styles = accentStyles[accent]
  const className = `group panel-surface flex flex-col rounded-card border border-mach-border p-6 transition-all duration-300 ${styles.hoverBorder} ${styles.glow}`

  const productCta = external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-fit items-center gap-2 rounded-button border px-4 py-2 text-sm font-medium transition-colors ${styles.cta}`}
    >
      {ctaLabel(status)}
      <span aria-hidden>→</span>
    </a>
  ) : (
    <Link
      href={href}
      className={`inline-flex w-fit items-center gap-2 rounded-button border px-4 py-2 text-sm font-medium transition-colors ${styles.cta}`}
    >
      {ctaLabel(status)}
      <span aria-hidden>→</span>
    </Link>
  )

  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-mach-border bg-mach-bg-elevated p-1.5">
          <Image src={logo} alt="" fill className="object-contain" sizes="56px" />
        </div>
        <span
          className={`rounded-pill border px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase ${styles.badge}`}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-xl font-semibold tracking-tight text-mach-fg">{name}</h3>
        <p className={`text-sm font-medium ${styles.tagline}`}>{tagline}</p>
        <p className="text-sm leading-relaxed text-mach-fg-soft">{description}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {productCta}
        {buyHref ? (
          <a
            href={buyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-button border border-mach-border px-4 py-2 text-sm font-medium text-mach-fg-soft transition-colors hover:border-mach-border-strong hover:text-mach-fg"
          >
            Buy Pro
          </a>
        ) : null}
        {bundleHref ? (
          <a
            href={bundleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-button border border-mach-border px-4 py-2 text-sm font-medium text-mach-fg-soft transition-colors hover:border-mach-border-strong hover:text-mach-fg"
          >
            Mach Pro
          </a>
        ) : null}
      </div>
    </div>
  )
}
