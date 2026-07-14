import { ACCOUNT, GITHUB, SITE } from '@/lib/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-auto border-t border-mach-border/80 px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-sm text-mach-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {SITE.name}. Built for builders.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="https://mach-triage.com" className="transition-colors hover:text-mach-triage">
            Mach Triage
          </a>
          <a href={ACCOUNT.pricing} className="transition-colors hover:text-mach-armory">
            Mach Armory
          </a>
          <a href="https://terminal.machbox.dev" className="transition-colors hover:text-mach-terminal">
            Mach Terminal
          </a>
          <a
            href={GITHUB.org}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-mach-fg-soft"
          >
            {GITHUB.orgName}
          </a>
        </div>
      </div>
    </footer>
  )
}
