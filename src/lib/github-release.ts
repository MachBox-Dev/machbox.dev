import type { DownloadPlatform } from '@/lib/site'

export type GitHubReleaseAsset = {
  name: string
  browser_download_url: string
}

export type GitHubRelease = {
  tag_name: string
  html_url: string
  prerelease: boolean
  draft: boolean
  assets: GitHubReleaseAsset[]
}

export type DownloadTarget = {
  id: string
  platform: DownloadPlatform
  label: string
  href: string
  recommended?: boolean
  note?: string
}

export type ReleaseInfo = {
  tag: string
  version: string
  isPrerelease: boolean
  url: string
  downloads: DownloadTarget[]
  source: 'github' | 'fallback'
}

export function versionFromTag(tag: string): string {
  return tag.startsWith('v') ? tag.slice(1) : tag
}

export function pickRelease(releases: GitHubRelease[]): GitHubRelease | undefined {
  const published = releases.filter((release) => !release.draft)
  if (published.length === 0) return undefined

  const stable = published.find((release) => !release.prerelease)
  return stable ?? published[0]
}

async function fetchLatestRelease(repoSlug: string, revalidateSeconds: number): Promise<GitHubRelease | undefined> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }

    const token = process.env.GITHUB_TOKEN?.trim()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`https://api.github.com/repos/${repoSlug}/releases?per_page=10`, {
      headers,
      next: { revalidate: revalidateSeconds },
    })

    if (!response.ok) return undefined

    const releases = (await response.json()) as GitHubRelease[]
    return pickRelease(releases)
  } catch {
    return undefined
  }
}

/**
 * Fetch the latest published release for `repoSlug` (e.g. "MachBox-Dev/mach-terminal")
 * and convert its assets to download targets via the caller-supplied `buildDownloads`,
 * which encodes each product's own asset-naming convention. Falls back to `fallback`
 * when GitHub is unreachable or the release has no recognized assets.
 */
export async function resolveRelease(
  repoSlug: string,
  fallback: ReleaseInfo,
  revalidateSeconds: number,
  buildDownloads: (assets: GitHubReleaseAsset[]) => DownloadTarget[],
): Promise<ReleaseInfo> {
  const release = await fetchLatestRelease(repoSlug, revalidateSeconds)
  if (!release || release.assets.length === 0) {
    return fallback
  }

  const downloads = buildDownloads(release.assets)
  if (downloads.length === 0) {
    return fallback
  }

  return {
    tag: release.tag_name,
    version: versionFromTag(release.tag_name),
    isPrerelease: release.prerelease,
    url: release.html_url,
    downloads,
    source: 'github',
  }
}
