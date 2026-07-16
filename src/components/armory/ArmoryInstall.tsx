import { ACCOUNT, ARMORY_PRINCIPLES, PRODUCTS } from '@/lib/site'
import type { ArmoryReleaseInfo } from '@/lib/armory-release'

import { ArmoryDownloadButton, ArmoryReleaseBadge } from './ArmoryDownloads'

type ArmoryInstallProps = {
  release: ArmoryReleaseInfo
}

export function ArmoryInstall({ release }: ArmoryInstallProps) {
  const product = PRODUCTS.armory
  const primaryDownloads = release.downloads.filter((target) => target.recommended)
  const altDownloads = release.downloads.filter((target) => !target.recommended)

  return (
    <section id="install" className="scroll-mt-24">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <ArmoryReleaseBadge release={release} />
        <p className="max-w-xl text-sm text-mach-muted">
          Latest stable build.{' '}
          <a
            href={release.url}
            className="text-mach-armory-bright underline decoration-mach-armory-border underline-offset-2 hover:text-mach-armory"
          >
            See what&apos;s new
          </a>
          .
        </p>
      </div>

      <div className="panel-surface rounded-card border border-mach-border p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Downloads</p>
        <h2 className="mt-3 text-xl font-semibold text-mach-fg">Download Mach Armory</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mach-fg-soft">
          Free forever for local edit, search, and preview. No account required. Pick your platform below.
        </p>

        {primaryDownloads.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {primaryDownloads.map((target) => (
              <ArmoryDownloadButton
                key={target.id}
                label={target.label}
                href={target.href}
                recommended
                note={target.note}
              />
            ))}
          </div>
        ) : null}

        {altDownloads.length > 0 ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {altDownloads.map((target) => (
              <ArmoryDownloadButton key={target.id} label={target.label} href={target.href} note={target.note} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="panel-surface min-w-0 rounded-card border border-mach-border p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Upgrade</p>
          <h2 className="mt-3 text-xl font-semibold text-mach-fg">Get Armory Pro</h2>
          <p className="mt-3 text-sm leading-relaxed text-mach-fg-soft">
            Pro unlocks MCP write, multi-vault, advanced graph, and advanced templates. Compare plans and billing
            periods before checkout.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={ACCOUNT.pricing}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-button border border-mach-armory-border bg-mach-armory-subtle px-4 py-2 text-sm font-medium text-mach-armory-bright transition-colors hover:bg-mach-armory/20"
            >
              Compare plans
            </a>
            {product.buyHref ? (
              <a
                href={product.buyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-button border border-mach-border px-4 py-2 text-sm font-medium text-mach-fg-soft transition-colors hover:border-mach-armory-border hover:text-mach-armory-bright"
              >
                Buy Armory Pro
              </a>
            ) : null}
          </div>
        </div>

        <div className="panel-surface min-w-0 rounded-card border border-mach-border p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Stay current</p>
          <h2 className="mt-3 text-xl font-semibold text-mach-fg">Signed automatic updates</h2>
          <p className="mt-3 text-sm leading-relaxed text-mach-fg-soft">
            Armory checks for new versions in the background and never installs anything without a click. Every
            update is Ed25519-signed at build time and verified against a key baked into the app before it ever
            touches disk.
          </p>
          <p className="mt-4 text-xs text-mach-muted">{release.tag}</p>
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {ARMORY_PRINCIPLES.map((principle) => (
          <li
            key={principle}
            className="rounded-pill border border-mach-armory-border/50 bg-mach-armory-subtle px-3 py-1 text-xs font-medium text-mach-armory-bright"
          >
            {principle}
          </li>
        ))}
      </ul>
    </section>
  )
}
