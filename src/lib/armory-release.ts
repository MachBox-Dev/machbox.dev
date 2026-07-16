import type { DownloadTarget, ReleaseInfo } from '@/lib/github-release'

export const ARMORY_RELEASE_REVALIDATE_SECONDS = 3600

export type ArmoryDownloadTarget = DownloadTarget
export type ArmoryReleaseInfo = ReleaseInfo

/**
 * Mach Armory's repo is private and its downloads are real installers, not
 * GitHub Release assets -- everything is hosted on Firebase Storage
 * (public/stable/), same bucket mach-triage uses. See
 * mach-armory/.github/workflows/release.yml and
 * mach-armory/crates/armory-core/src/updater.rs for the producer/consumer
 * of the same manifest this fetches the version from.
 */
const FIREBASE_BUCKET = 'mach-triage.firebasestorage.app'
const STABLE_PREFIX = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/public%2Fstable%2F`

function storageUrl(fileName: string): string {
  return `${STABLE_PREFIX}${encodeURIComponent(fileName)}?alt=media`
}

const MANIFEST_URL = storageUrl('Mach-Armory-update-manifest.json')

const ARMORY_DOWNLOAD_TARGETS: ArmoryDownloadTarget[] = [
  {
    id: 'mac-dmg',
    platform: 'mac',
    label: 'macOS (Apple Silicon)',
    href: storageUrl('Mach-Armory-Mac-Latest.dmg'),
    recommended: true,
    note: '.dmg',
  },
  {
    id: 'windows-exe',
    platform: 'windows',
    label: 'Windows',
    href: storageUrl('Mach-Armory-Windows-Latest.exe'),
    recommended: true,
    note: '.exe installer',
  },
  {
    id: 'windows-msi',
    platform: 'windows',
    label: 'Windows (MSI)',
    href: storageUrl('Mach-Armory-Windows-Latest.msi'),
    note: '.msi',
  },
  {
    id: 'linux-appimage',
    platform: 'linux',
    label: 'Linux',
    href: storageUrl('Mach-Armory-Linux-Latest.AppImage'),
    recommended: true,
    note: '.AppImage',
  },
  {
    id: 'linux-deb',
    platform: 'linux',
    label: 'Linux (.deb)',
    href: storageUrl('Mach-Armory-Linux-Latest.deb'),
    note: '.deb',
  },
]

const FALLBACK_VERSION = '0.4.0'

function releaseFor(version: string, source: ArmoryReleaseInfo['source']): ArmoryReleaseInfo {
  return {
    tag: `v${version}`,
    version,
    isPrerelease: false,
    url: 'https://armory.machbox.dev/changelog',
    downloads: ARMORY_DOWNLOAD_TARGETS,
    source,
  }
}

export async function getArmoryRelease(): Promise<ArmoryReleaseInfo> {
  try {
    const response = await fetch(MANIFEST_URL, { next: { revalidate: ARMORY_RELEASE_REVALIDATE_SECONDS } })
    if (!response.ok) return releaseFor(FALLBACK_VERSION, 'fallback')

    const manifest = (await response.json()) as { version?: unknown }
    if (typeof manifest.version !== 'string' || !manifest.version) {
      return releaseFor(FALLBACK_VERSION, 'fallback')
    }

    return releaseFor(manifest.version, 'firebase')
  } catch {
    return releaseFor(FALLBACK_VERSION, 'fallback')
  }
}
