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
  }
> = {
  triage: {
    glow: 'group-hover:shadow-triage-glow',
    badge: 'text-mach-triage bg-mach-triage-subtle border-mach-triage-border',
    cta: 'bg-mach-triage-subtle text-mach-triage-bright border-mach-triage-border hover:bg-mach-triage/20',
    hoverBorder: 'group-hover:border-mach-triage-border',
  },
  terminal: {
    glow: 'group-hover:shadow-terminal-glow',
    badge: 'text-mach-terminal bg-mach-terminal-subtle border-mach-terminal-border',
    cta: 'bg-mach-terminal-subtle text-mach-terminal-bright border-mach-terminal-border hover:bg-mach-terminal/20',
    hoverBorder: 'group-hover:border-mach-terminal-border',
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
}: ProductCardProps) {
  const styles = accentStyles[accent]

  const inner = (
    <>
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
        <p
          className={`text-sm font-medium ${accent === 'triage' ? 'text-mach-triage-bright' : 'text-mach-terminal-bright'}`}
        >
          {tagline}
        </p>
        <p className="text-sm leading-relaxed text-mach-fg-soft">{description}</p>
      </div>

      <span
        className={`mt-8 inline-flex w-fit items-center gap-2 rounded-button border px-4 py-2 text-sm font-medium transition-colors ${styles.cta}`}
      >
        {ctaLabel(status)}
        <span aria-hidden>→</span>
      </span>
    </>
  )

  const className = `group panel-surface flex flex-col rounded-card border border-mach-border p-6 transition-all duration-300 ${styles.hoverBorder} ${styles.glow}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}
