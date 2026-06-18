import { GITHUB, PRODUCTS, TERMINAL_DOWNLOADS, TERMINAL_PRINCIPLES, TERMINAL_QUICK_START, TERMINAL_RELEASE } from '@/lib/site'

import { TerminalDownloadButton, TerminalReleaseBadge } from './TerminalDownloads'

export function TerminalInstall() {
  const product = PRODUCTS.terminal
  const primaryDownloads = TERMINAL_DOWNLOADS.filter((target) => target.recommended)
  const altDownloads = TERMINAL_DOWNLOADS.filter((target) => !target.recommended)

  return (
    <section id="install" className="scroll-mt-24">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <TerminalReleaseBadge />
        <p className="max-w-xl text-sm text-mach-muted">
          Release candidate builds from{' '}
          <a
            href={TERMINAL_RELEASE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mach-terminal-bright underline decoration-mach-terminal-border underline-offset-2 hover:text-mach-terminal"
          >
            {TERMINAL_RELEASE.tag}
          </a>
          . Expect rough edges — feedback welcome on GitHub.
        </p>
      </div>

      <div className="panel-surface rounded-card border border-mach-border p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Installers</p>
        <h2 className="mt-3 text-xl font-semibold text-mach-fg">Download Mach Terminal</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mach-fg-soft">
          No account required. Pick your platform below or browse all assets on{' '}
          <a
            href={TERMINAL_RELEASE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mach-terminal-bright underline decoration-mach-terminal-border underline-offset-2 hover:text-mach-terminal"
          >
            GitHub Releases
          </a>
          .
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {primaryDownloads.map((target) => (
            <TerminalDownloadButton
              key={target.id}
              label={target.label}
              href={target.href}
              recommended
              note={target.note}
            />
          ))}
        </div>

        {altDownloads.length > 0 ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {altDownloads.map((target) => (
              <TerminalDownloadButton
                key={target.id}
                label={target.label}
                href={target.href}
                note={target.note}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="panel-surface rounded-card border border-mach-border p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Verify</p>
          <h2 className="mt-3 text-xl font-semibold text-mach-fg">Checksums & signatures</h2>
          <p className="mt-3 text-sm leading-relaxed text-mach-fg-soft">
            Signed artifacts and <code className="text-mach-fg">.sig</code> sidecars ship with each release.
            See release notes and <code className="text-mach-fg">SHA256SUMS.txt</code> on tagged stable builds.
          </p>
          <a
            href={product.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-button border border-mach-border px-4 py-2 text-sm font-medium text-mach-fg-soft transition-colors hover:border-mach-terminal-border hover:text-mach-terminal-bright"
          >
            All releases →
          </a>
        </div>

        <div className="panel-surface rounded-card border border-mach-border p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Develop</p>
          <h2 className="mt-3 text-xl font-semibold text-mach-fg">Build from source</h2>
          <p className="mt-3 text-sm leading-relaxed text-mach-fg-soft">
            Requires Node.js, Rust, and platform Tauri prerequisites. On first launch, use{' '}
            <strong className="font-medium text-mach-fg">Quick start (AI off)</strong> in Settings.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-mach-border bg-mach-bg-elevated p-4 font-mono text-xs leading-relaxed text-mach-fg-soft">
            <code>{TERMINAL_QUICK_START}</code>
          </pre>
          <p className="mt-4 text-xs text-mach-muted">
            {TERMINAL_RELEASE.tag} · {product.license} ·{' '}
            <a
              href={GITHUB.terminal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mach-terminal-dim hover:text-mach-terminal-bright"
            >
              MachBox-Dev/mach-terminal
            </a>
          </p>
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {TERMINAL_PRINCIPLES.map((principle) => (
          <li
            key={principle}
            className="rounded-pill border border-mach-terminal-border/50 bg-mach-terminal-subtle px-3 py-1 text-xs font-medium text-mach-terminal-bright"
          >
            {principle}
          </li>
        ))}
      </ul>
    </section>
  )
}
