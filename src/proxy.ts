import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { HOSTS } from '@/lib/site'

function normalizeHost(host: string | null): string {
  if (!host) return ''
  return host.split(':')[0]?.toLowerCase() ?? ''
}

const SUBDOMAIN_REWRITES: ReadonlyArray<{ hosts: readonly string[]; prefix: string }> = [
  { hosts: HOSTS.terminal, prefix: '/terminal-site' },
  { hosts: HOSTS.armory, prefix: '/armory-site' },
]

export function proxy(request: NextRequest) {
  const host = normalizeHost(request.headers.get('host'))
  const match = SUBDOMAIN_REWRITES.find((entry) => entry.hosts.includes(host))

  if (match) {
    const url = request.nextUrl.clone()
    const path = url.pathname === '/' ? '' : url.pathname
    url.pathname = `${match.prefix}${path}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|machbox.ico|logos|og|.*\\..*).*)'],
}
