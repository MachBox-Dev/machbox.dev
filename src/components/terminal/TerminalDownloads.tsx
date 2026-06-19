import Link from 'next/link'

import type { TerminalReleaseInfo } from '@/lib/terminal-release'

type TerminalDownloadButtonProps = {
  label: string
  href: string
  recommended?: boolean
  note?: string
}

export function TerminalDownloadButton({ label, href, recommended, note }: TerminalDownloadButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col gap-1 rounded-button border px-4 py-3 text-left text-sm transition-colors ${
        recommended
          ? 'border-mach-terminal-border bg-mach-terminal-subtle text-mach-terminal-bright hover:bg-mach-terminal/20'
          : 'border-mach-border text-mach-fg-soft hover:border-mach-terminal-border hover:text-mach-terminal-bright'
      }`}
    >
      <span className="font-medium">{label}</span>
      {note ? <span className="text-xs text-mach-muted">{note}</span> : null}
    </a>
  )
}

type TerminalReleaseBadgeProps = {
  release: TerminalReleaseInfo
}

export function TerminalReleaseBadge({ release }: TerminalReleaseBadgeProps) {
  const label = release.isPrerelease ? `Pre-release · ${release.version}` : `v${release.version}`

  return (
    <Link
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-pill border border-mach-terminal-border/60 bg-mach-terminal-subtle px-3 py-1 text-xs font-medium text-mach-terminal-bright transition-colors hover:border-mach-terminal-border"
    >
      {label}
    </Link>
  )
}
