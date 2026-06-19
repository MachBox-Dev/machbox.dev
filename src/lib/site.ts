export const SITE = {
  name: 'MachBox',
  tagline: 'Developer tools built for speed.',
  description:
    'MachBox builds local-first developer tools — fast triage for your work queue and a speed-first terminal for serious builders.',
  url: 'https://machbox.dev',
} as const

export const GITHUB = {
  org: 'https://github.com/MachBox-Dev',
  orgName: 'MachBox-Dev',
  terminal: 'https://github.com/MachBox-Dev/mach-terminal',
  terminalReleases: 'https://github.com/MachBox-Dev/mach-terminal/releases',
} as const

export type DownloadPlatform = 'mac' | 'windows' | 'linux'

export const BRAND = {
  logo: '/logos/machbox.png',
  icon: '/machbox.ico',
  ogImage: '/og/machbox.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'MachBox — developer tools with triage blue and terminal green glow',
} as const

export type ProductStatus = 'available' | 'open-source' | 'coming-soon'

export const PRODUCTS = {
  triage: {
    id: 'triage',
    name: 'Mach Triage',
    tagline: 'Desktop command center for your work queue',
    description:
      'Local-first triage across Jira, Linear, GitHub Issues, and local workspaces. Automated standups, Armory macros, and a keyboard-first workflow.',
    href: 'https://mach-triage.com',
    external: true,
    accent: 'triage' as const,
    logo: '/logos/mach-triage.png',
    status: 'available' as const satisfies ProductStatus,
  },
  terminal: {
    id: 'terminal',
    name: 'Mach Terminal',
    tagline: 'Speed-first terminal for builders',
    description:
      'A native terminal with splits, composer-first input, and optional AI providers — no account required, fully open source.',
    href: 'https://terminal.machbox.dev',
    external: false,
    accent: 'terminal' as const,
    logo: '/logos/mach-terminal.png',
    status: 'open-source' as const satisfies ProductStatus,
    repo: GITHUB.terminal,
    releases: GITHUB.terminalReleases,
    license: 'Apache-2.0',
  },
} as const

export type ProductAccent = 'triage' | 'terminal'

export const HOSTS = {
  umbrella: ['machbox.dev', 'www.machbox.dev', 'localhost'],
  terminal: ['terminal.machbox.dev', 'terminal.localhost'],
} as const

export const TERMINAL_FEATURES = [
  {
    title: 'Composer-first input',
    description:
      'Type in a dedicated composer while the viewport stays output-focused — no fighting the scrollback for stdin.',
  },
  {
    title: 'Splits & sessions',
    description:
      'Tabs, splits, and reliable session lifecycle — exit overlays, batch restart, and layout restore across relaunches.',
  },
  {
    title: 'Command palette',
    description: 'Ctrl/Cmd+K for palette-driven actions — find, scroll, split, and session ops without leaving the keyboard.',
  },
  {
    title: 'Safe paste guard',
    description:
      'Multiline and risky clipboard payloads get a confirmation card before they hit your shell — no surprise `rm` chains.',
  },
  {
    title: 'Shell integration',
    description:
      'OSC 7 cwd tracking and optional OSC 133 markers — restart lands where you left off when your shell emits them.',
  },
  {
    title: 'Optional AI (BYOK)',
    description:
      'OpenAI, Anthropic, Ollama, or custom endpoints — disabled by default, keychain-backed, never required for core terminal use.',
  },
] as const

export const TERMINAL_PRINCIPLES = [
  'No account requirement',
  'No cloud lock-in',
  'Bring your own API keys',
  'AI is optional — never a dependency',
] as const

export const TERMINAL_QUICK_START = `git clone ${GITHUB.terminal}.git
cd mach-terminal
npm install
npm run tauri dev` as const
