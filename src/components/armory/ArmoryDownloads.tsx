import Link from 'next/link'

import type { ArmoryReleaseInfo } from '@/lib/armory-release'

type ArmoryDownloadButtonProps = {
  label: string
  href: string
  recommended?: boolean
  note?: string
}

export function ArmoryDownloadButton({ label, href, recommended, note }: ArmoryDownloadButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col gap-1 rounded-button border px-4 py-3 text-left text-sm transition-colors ${
        recommended
          ? 'border-mach-armory-border bg-mach-armory-subtle text-mach-armory-bright hover:bg-mach-armory/20'
          : 'border-mach-border text-mach-fg-soft hover:border-mach-armory-border hover:text-mach-armory-bright'
      }`}
    >
      <span className="font-medium">{label}</span>
      {note ? <span className="text-xs text-mach-muted">{note}</span> : null}
    </a>
  )
}

type ArmoryReleaseBadgeProps = {
  release: ArmoryReleaseInfo
}

export function ArmoryReleaseBadge({ release }: ArmoryReleaseBadgeProps) {
  const label = release.isPrerelease ? `Pre-release · ${release.version}` : `v${release.version}`

  return (
    <Link
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-pill border border-mach-armory-border/60 bg-mach-armory-subtle px-3 py-1 text-xs font-medium text-mach-armory-bright transition-colors hover:border-mach-armory-border"
    >
      {label}
    </Link>
  )
}
