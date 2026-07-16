import Link from 'next/link'

import { MachBoxLogo } from '@/components/MachBoxLogo'

export function ArmoryHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 md:px-10">
      <Link
        href="https://machbox.dev"
        className="group flex items-center gap-2.5 text-sm text-mach-muted transition-colors hover:text-mach-fg-soft"
      >
        <MachBoxLogo size="sm" className="group-hover:border-mach-border-strong" />
        <span>MachBox</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm text-mach-muted">
        <a href="#features" className="transition-colors hover:text-mach-armory-bright">
          Features
        </a>
        <a href="#install" className="transition-colors hover:text-mach-armory-bright">
          Install
        </a>
        <Link href="/changelog" className="transition-colors hover:text-mach-armory-bright">
          Changelog
        </Link>
      </nav>
    </header>
  )
}
