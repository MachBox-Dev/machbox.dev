import { MachBoxLogo } from '@/components/MachBoxLogo'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS, SITE } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8 md:px-10 md:pb-24 md:pt-16">
          <div className="max-w-3xl">
            <MachBoxLogo size="lg" priority className="mb-8 shadow-panel" />
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-mach-muted">
              Local-first · keyboard-first
            </p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-mach-fg md:text-6xl">
              Tools that keep up with{' '}
              <span className="bg-gradient-to-r from-mach-triage-bright via-mach-fg to-mach-terminal-bright bg-clip-text text-transparent">
                how you work
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mach-fg-soft">
              {SITE.description}
            </p>
          </div>
        </section>

        <section id="products" className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-mach-fg">Products</h2>
              <p className="mt-2 text-sm text-mach-muted">
                Each tool stands alone. Same craft, different glow.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ProductCard {...PRODUCTS.triage} />
            <ProductCard {...PRODUCTS.terminal} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-10">
          <div className="panel-surface rounded-card border border-mach-border px-6 py-10 md:px-10 md:py-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-mach-muted">On the horizon</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-mach-fg">Mach Cloud</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mach-fg-soft">
              Unified Mach sign-in and cloud conveniences — starting with optional AI providers for
              Terminal. Triage will migrate here when the time is right. No rush, no lock-in theater.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
