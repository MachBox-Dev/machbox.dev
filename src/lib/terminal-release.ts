import { GITHUB } from '@/lib/site'
import { resolveRelease, type DownloadTarget, type GitHubReleaseAsset, type ReleaseInfo } from '@/lib/github-release'

export const TERMINAL_RELEASE_REVALIDATE_SECONDS = 3600

export type TerminalDownloadTarget = DownloadTarget
export type TerminalReleaseInfo = ReleaseInfo

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

export async function getTerminalRelease(): Promise<TerminalReleaseInfo> {
  return resolveRelease(
    'MachBox-Dev/mach-terminal',
    FALLBACK_RELEASE,
    TERMINAL_RELEASE_REVALIDATE_SECONDS,
    buildDownloads,
  )
}
