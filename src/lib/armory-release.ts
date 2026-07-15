import { GITHUB } from '@/lib/site'
import { resolveRelease, type DownloadTarget, type GitHubReleaseAsset, type ReleaseInfo } from '@/lib/github-release'

export const ARMORY_RELEASE_REVALIDATE_SECONDS = 3600

export type ArmoryDownloadTarget = DownloadTarget
export type ArmoryReleaseInfo = ReleaseInfo

/** Static fallback when GitHub is unreachable at build time. */
const FALLBACK_RELEASE: ArmoryReleaseInfo = {
  tag: 'v0.2.0',
  version: '0.2.0',
  isPrerelease: false,
  url: `${GITHUB.armory}/releases/tag/v0.2.0`,
  source: 'fallback',
  downloads: [
    {
      id: 'mac',
      platform: 'mac',
      label: 'macOS (Apple Silicon)',
      href: `${GITHUB.armory}/releases/download/v0.2.0/mach-armory-v0.2.0-macos-aarch64.tar.gz`,
      recommended: true,
      note: '.tar.gz',
    },
    {
      id: 'windows',
      platform: 'windows',
      label: 'Windows',
      href: `${GITHUB.armory}/releases/download/v0.2.0/mach-armory-v0.2.0-windows-x86_64.zip`,
      recommended: true,
      note: '.zip',
    },
    {
      id: 'linux',
      platform: 'linux',
      label: 'Linux',
      href: `${GITHUB.armory}/releases/download/v0.2.0/mach-armory-v0.2.0-linux-x86_64.tar.gz`,
      recommended: true,
      note: '.tar.gz',
    },
  ],
}

/** Mach Armory ships plain archives (no installers): mach-armory-{tag}-{target}.{tar.gz|zip}. */
function buildDownloads(assets: GitHubReleaseAsset[]): ArmoryDownloadTarget[] {
  const downloads: ArmoryDownloadTarget[] = []

  for (const asset of assets) {
    const lower = asset.name.toLowerCase()

    if (lower.includes('macos')) {
      downloads.push({
        id: 'mac',
        platform: 'mac',
        label: lower.includes('aarch64') ? 'macOS (Apple Silicon)' : 'macOS',
        href: asset.browser_download_url,
        recommended: true,
        note: '.tar.gz',
      })
      continue
    }

    if (lower.includes('windows')) {
      downloads.push({
        id: 'windows',
        platform: 'windows',
        label: 'Windows',
        href: asset.browser_download_url,
        recommended: true,
        note: '.zip',
      })
      continue
    }

    if (lower.includes('linux')) {
      downloads.push({
        id: 'linux',
        platform: 'linux',
        label: 'Linux',
        href: asset.browser_download_url,
        recommended: true,
        note: '.tar.gz',
      })
    }
  }

  return downloads
}

export async function getArmoryRelease(): Promise<ArmoryReleaseInfo> {
  return resolveRelease('mwhobrey/mach-armory', FALLBACK_RELEASE, ARMORY_RELEASE_REVALIDATE_SECONDS, buildDownloads)
}
