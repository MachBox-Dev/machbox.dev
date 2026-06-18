import { GITHUB, PRODUCTS, TERMINAL_PRINCIPLES, TERMINAL_QUICK_START } from '@/lib/site'

export function TerminalInstall() {
  const product = PRODUCTS.terminal

  return (
    <section id="install" className="scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="panel-surface rounded-card border border-mach-border p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">Installers</p>
          <h2 className="mt-3 text-xl font-semibold text-mach-fg">Desktop builds</h2>
          <p className="mt-3 text-sm leading-relaxed text-mach-fg-soft">
            Signed macOS, Windows, and Linux installers ship at GA. Pre-release builds are published to{' '}
            <a
              href={product.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mach-terminal-bright underline decoration-mach-terminal-border underline-offset-2 hover:text-mach-terminal"
            >
              GitHub Releases
            </a>{' '}
            as tags land.
          </p>
          <a
            href={product.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-button border border-mach-terminal-border bg-mach-terminal-subtle px-4 py-2 text-sm font-medium text-mach-terminal-bright transition-colors hover:bg-mach-terminal/20"
          >
            Check releases →
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
            v{product.version} · {product.license} ·{' '}
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
