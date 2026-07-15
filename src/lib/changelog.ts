export type ChangelogEntry = {
  id: string
  title: string
  summary: string
  href?: string
  linkLabel?: string
}

export type ChangelogPeriod = {
  period: string
  entries: ChangelogEntry[]
}

export const CHANGELOG: ChangelogPeriod[] = [
  {
    period: 'July 2026',
    entries: [
      {
        id: 'armory-site',
        title: 'Armory has its own site',
        summary:
          'armory.machbox.dev is live: downloads for macOS, Windows, and Linux, feature highlights, and the upgrade path to Armory Pro.',
        href: 'https://armory.machbox.dev',
        linkLabel: 'Visit armory.machbox.dev',
      },
      {
        id: 'armory-checkout',
        title: 'Armory Pro + Mach Pro checkout',
        summary:
          'Buy Armory Pro standalone, or the Mach Pro bundle for Triage Pro + Armory Pro together, straight from the homepage product cards.',
      },
    ],
  },
  {
    period: 'June 2026',
    entries: [
      {
        id: 'launch',
        title: 'MachBox launches',
        summary: 'The umbrella site and the Mach Terminal product page go live at machbox.dev and terminal.machbox.dev.',
      },
      {
        id: 'terminal-downloads',
        title: 'Terminal downloads auto-sync from GitHub',
        summary:
          'Install buttons on the Terminal page now pull the latest release assets directly from GitHub Releases, refreshed hourly.',
      },
    ],
  },
]
