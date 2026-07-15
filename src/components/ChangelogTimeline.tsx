import type { ChangelogPeriod } from '@/lib/changelog'

type ChangelogTimelineProps = {
  periods: ChangelogPeriod[]
}

export function ChangelogTimeline({ periods }: ChangelogTimelineProps) {
  return (
    <div className="space-y-8">
      {periods.map(({ period, entries }) => (
        <section key={period}>
          <h2 className="mb-4 text-xl font-semibold text-mach-fg">{period}</h2>
          <ol className="relative space-y-4 border-l border-mach-border pl-6">
            {entries.map((entry) => (
              <li key={entry.id} className="relative">
                <span
                  className="absolute -left-[calc(0.75rem+1px)] top-1.5 h-2.5 w-2.5 rounded-full border border-mach-border-strong bg-mach-accent/30"
                  aria-hidden
                />
                <article className="panel-surface rounded-card border border-mach-border p-4">
                  <h3 className="m-0 text-base font-semibold text-mach-fg">{entry.title}</h3>
                  <p className="mt-2 mb-0 text-sm leading-relaxed text-mach-fg-soft">{entry.summary}</p>
                  {entry.href ? (
                    <p className="mt-3 mb-0 text-sm">
                      <a
                        className="text-mach-accent underline underline-offset-2"
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.linkLabel ?? 'Learn more'}
                      </a>
                    </p>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
