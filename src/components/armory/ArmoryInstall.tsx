import { ACCOUNT, ARMORY_PRINCIPLES, ARMORY_QUICK_START, GITHUB, PRODUCTS } from '@/lib/site'
import type { ArmoryReleaseInfo } from '@/lib/armory-release'

import { ArmoryDownloadButton, ArmoryReleaseBadge } from './ArmoryDownloads'

type ArmoryInstallProps = {
  release: ArmoryReleaseInfo
}

export function ArmoryInstall({ release }: ArmoryInstallProps) {
  const product = PRODUCTS.armory
  const releaseNote = release.isPrerelease
    ? 'Pre-release build from GitHub. Expect rough edges; feedback welcome.'
    : 'Latest stable build from GitHub Releases.'

  return (
    <section id="install" className="scroll-mt-24">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <ArmoryReleaseBadge release={release} />
        <p className="max-w-xl text-sm text-mach-muted">
          {releaseNote}{' '}
          <a
            href={release.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mach-armory-bright underline decoration-mach-armory-border underline-offset-2 hover:text-mach-armory"
          >
            {release.tag}
          </a>
          .
        </p>
      </div>

      <div className="panel-surface rounded-card border border-mach-border p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Downloads</p>
        <h2 className="mt-3 text-xl font-semibold text-mach-fg">Download Mach Armory</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mach-fg-soft">
          Free forever for local edit, search, and preview. No account required. Pick your platform below or browse
          all assets on{' '}
          <a
            href={release.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mach-armory-bright underline decoration-mach-armory-border underline-offset-2 hover:text-mach-armory"
          >
            GitHub Releases
          </a>
          .
        </p>

        {release.downloads.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {release.downloads.map((target) => (
              <ArmoryDownloadButton
                key={target.id}
                label={target.label}
                href={target.href}
                recommended={target.recommended}
                note={target.note}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-mach-muted">
            Installers are not listed yet. Check{' '}
            <a href={release.url} className="text-mach-armory-bright hover:underline">
              {release.tag}
            </a>{' '}
            on GitHub or build from source below.
          </p>
        )}
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Develop</p>
          <h2 className="mt-3 text-xl font-semibold text-mach-fg">Build from source</h2>
          <p className="mt-3 text-sm leading-relaxed text-mach-fg-soft">
            Requires the Rust toolchain and platform GUI prerequisites (GTK on Linux). Vaults default to{' '}
            <code className="text-mach-fg">~/Mach/vaults/default</code>.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-mach-border bg-mach-bg-elevated p-4 font-mono text-xs leading-relaxed text-mach-fg-soft">
            <code>{ARMORY_QUICK_START}</code>
          </pre>
          <p className="mt-4 text-xs text-mach-muted">
            {release.tag} ·{' '}
            <a
              href={GITHUB.armory}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mach-armory-dim hover:text-mach-armory-bright"
            >
              mwhobrey/mach-armory
            </a>
          </p>
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
