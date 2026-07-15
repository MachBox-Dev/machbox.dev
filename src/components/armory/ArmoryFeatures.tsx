import { ARMORY_FEATURES } from '@/lib/site'

export function ArmoryFeatures() {
  return (
    <section id="features" className="scroll-mt-24">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-mach-fg">A vault that stays out of your way</h2>
        <p className="mt-2 text-sm text-mach-muted">Native egui app · hybrid markdown + SQLite vault</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ARMORY_FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="panel-surface rounded-card border border-mach-border p-5 transition-colors hover:border-mach-armory-border/60"
          >
            <h3 className="text-base font-semibold text-mach-fg">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mach-fg-soft">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
