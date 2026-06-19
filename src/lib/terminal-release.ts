import { GITHUB, type DownloadPlatform } from '@/lib/site'

export const TERMINAL_RELEASE_REVALIDATE_SECONDS = 3600

export type TerminalDownloadTarget = {
  id: string
  platform: DownloadPlatform
  label: string
  href: string
  recommended?: boolean
  note?: string
}

export type TerminalReleaseInfo = {
  tag: string
  version: string
  isPrerelease: boolean
  url: string
  downloads: TerminalDownloadTarget[]
  source: 'github' | 'fallback'
}

type GitHubReleaseAsset = {
  name: string
  browser_download_url: string
}

type GitHubRelease = {
  tag_name: string
  html_url: string
  prerelease: boolean
  draft: boolean
  assets: GitHubReleaseAsset[]
}

/** Static fallback when GitHub is unreachable at build time. */
const FALLBACK_RELEASE: TerminalReleaseInfo = {
  tag: 'v0.1.0-rc.1',
  version: '0.1.0-rc.1',
  isPrerelease: true,
  url: `${GITHUB.terminal}/releases/tag/v0.1.0-rc.1`,
  source: 'fallback',
  downloads: [
    {
      id: 'mac-dmg',
      platform: 'mac',
      label: 'macOS (Apple Silicon)',
      href: `${GITHUB.terminal}/releases/download/v0.1.0-rc.1/Mach.Terminal_0.1.0_aarch64.dmg`,
      recommended: true,
      note: '.dmg',
    },
    {
      id: 'windows-exe',
      platform: 'windows',
      label: 'Windows',
      href: `${GITHUB.terminal}/releases/download/v0.1.0-rc.1/Mach.Terminal_0.1.0_x64-setup.exe`,
      recommended: true,
      note: '.exe installer',
    },
    {
      id: 'windows-msi',
      platform: 'windows',
      label: 'Windows (MSI)',
      href: `${GITHUB.terminal}/releases/download/v0.1.0-rc.1/Mach.Terminal_0.1.0_x64_en-US.msi`,
      note: '.msi',
    },
    {
      id: 'linux-appimage',
      platform: 'linux',
      label: 'Linux',
      href: `${GITHUB.terminal}/releases/download/v0.1.0-rc.1/Mach.Terminal_0.1.0_amd64.AppImage`,
      recommended: true,
      note: 'AppImage',
    },
    {
      id: 'linux-deb',
      platform: 'linux',
      label: 'Linux (Debian)',
      href: `${GITHUB.terminal}/releases/download/v0.1.0-rc.1/Mach.Terminal_0.1.0_amd64.deb`,
      note: '.deb',
    },
  ],
}

function isInstallerAsset(name: string): boolean {
  const lower = name.toLowerCase()
  return (
    !lower.endsWith('.sig') &&
    lower !== 'latest.json' &&
    !lower.includes('sha256sums') &&
    !lower.endsWith('.tar.gz')
  )
}

function extensionNote(name: string): string {
  if (name.endsWith('.dmg')) return '.dmg'
  if (name.endsWith('.msi')) return '.msi'
  if (name.toLowerCase().endsWith('.appimage')) return 'AppImage'
  if (name.endsWith('.deb')) return '.deb'
  if (name.endsWith('.rpm')) return '.rpm'
  if (name.endsWith('.exe')) return '.exe installer'
  return name.split('.').pop() ?? ''
}

function macLabel(name: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('aarch64') || lower.includes('arm64') || lower.includes('universal')) {
    return lower.includes('universal') ? 'macOS' : 'macOS (Apple Silicon)'
  }
  if (lower.includes('x64') || lower.includes('amd64') || lower.includes('x86_64')) {
    return 'macOS (Intel)'
  }
  return 'macOS'
}

function buildDownloads(assets: GitHubReleaseAsset[]): TerminalDownloadTarget[] {
  const installers = assets.filter((asset) => isInstallerAsset(asset.name))
  const downloads: TerminalDownloadTarget[] = []
  const used = new Set<string>()

  const add = (target: TerminalDownloadTarget) => {
    if (used.has(target.id)) return
    used.add(target.id)
    downloads.push(target)
  }

  for (const asset of installers) {
    const name = asset.name
    const lower = name.toLowerCase()

    if (lower.endsWith('.dmg')) {
      add({
        id: lower.includes('aarch64') || lower.includes('arm64') ? 'mac-dmg-arm' : 'mac-dmg',
        platform: 'mac',
        label: macLabel(name),
        href: asset.browser_download_url,
        recommended: true,
        note: extensionNote(name),
      })
      continue
    }

    if (lower.endsWith('-setup.exe') || (lower.endsWith('.exe') && lower.includes('setup'))) {
      add({
        id: 'windows-exe',
        platform: 'windows',
        label: 'Windows',
        href: asset.browser_download_url,
        recommended: true,
        note: extensionNote(name),
      })
      continue
    }

    if (lower.endsWith('.msi')) {
      add({
        id: 'windows-msi',
        platform: 'windows',
        label: 'Windows (MSI)',
        href: asset.browser_download_url,
        note: extensionNote(name),
      })
      continue
    }

    if (lower.endsWith('.appimage')) {
      add({
        id: 'linux-appimage',
        platform: 'linux',
        label: 'Linux',
        href: asset.browser_download_url,
        recommended: true,
        note: extensionNote(name),
      })
      continue
    }

    if (lower.endsWith('.deb')) {
      add({
        id: 'linux-deb',
        platform: 'linux',
        label: 'Linux (Debian)',
        href: asset.browser_download_url,
        note: extensionNote(name),
      })
      continue
    }

    if (lower.endsWith('.rpm')) {
      add({
        id: 'linux-rpm',
        platform: 'linux',
        label: 'Linux (RPM)',
        href: asset.browser_download_url,
        note: extensionNote(name),
      })
    }
  }

  return downloads
}

function pickRelease(releases: GitHubRelease[]): GitHubRelease | undefined {
  const published = releases.filter((release) => !release.draft)
  if (published.length === 0) return undefined

  const stable = published.find((release) => !release.prerelease)
  return stable ?? published[0]
}

function toReleaseInfo(release: GitHubRelease): TerminalReleaseInfo {
  const tag = release.tag_name
  return {
    tag,
    version: tag.startsWith('v') ? tag.slice(1) : tag,
    isPrerelease: release.prerelease,
    url: release.html_url,
    downloads: buildDownloads(release.assets),
    source: 'github',
  }
}

export async function getTerminalRelease(): Promise<TerminalReleaseInfo> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }

    const token = process.env.GITHUB_TOKEN?.trim()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(
      'https://api.github.com/repos/MachBox-Dev/mach-terminal/releases?per_page=10',
      {
        headers,
        next: { revalidate: TERMINAL_RELEASE_REVALIDATE_SECONDS },
      },
    )

    if (!response.ok) {
      return FALLBACK_RELEASE
    }

    const releases = (await response.json()) as GitHubRelease[]
    const latest = pickRelease(releases)

    if (!latest || latest.assets.length === 0) {
      return FALLBACK_RELEASE
    }

    const info = toReleaseInfo(latest)
    return info.downloads.length > 0 ? info : FALLBACK_RELEASE
  } catch {
    return FALLBACK_RELEASE
  }
}
