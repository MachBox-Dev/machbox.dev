import Image from 'next/image'

type Shot = {
  src: string
  alt: string
  caption: string
}

const SHOTS: Shot[] = [
  {
    src: '/screenshots/armory/01-sidebar.png',
    alt: 'Mach Armory sidebar showing a vault with folders and notes',
    caption: 'A fast, distraction-free workspace for every note in your vault.',
  },
  {
    src: '/screenshots/armory/02-note-editor-preview.png',
    alt: 'Mach Armory editor with live markdown preview, tags, and linked notes',
    caption: 'Live preview, tags, and metas next to a split markdown editor.',
  },
  {
    src: '/screenshots/armory/04-command-palette.png',
    alt: 'Mach Armory command palette filtering notes and commands',
    caption: 'Jump to any note or command in seconds with the command palette.',
  },
  {
    src: '/screenshots/armory/03-graph.png',
    alt: 'Mach Armory link graph showing notes connected by wiki-links',
    caption: 'See how your notes connect with the interactive link graph.',
  },
]

export function ArmoryScreenshots() {
  return (
    <section aria-labelledby="screenshots-heading" className="scroll-mt-24">
      <div className="mb-10 text-center">
        <h2 id="screenshots-heading" className="text-2xl font-semibold tracking-tight text-mach-fg">
          See it in action
        </h2>
        <p className="mt-2 text-sm text-mach-muted">Real renders from the app, not mockups</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {SHOTS.map((shot) => (
          <figure key={shot.src} className="m-0">
            <div className="overflow-hidden rounded-card border border-mach-armory-border bg-mach-panel shadow-armory-glow">
              <div className="relative aspect-[1100/720] w-full">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-mach-fg-soft">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
