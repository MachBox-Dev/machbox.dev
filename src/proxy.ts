import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { HOSTS } from '@/lib/site'

function normalizeHost(host: string | null): string {
  if (!host) return ''
  return host.split(':')[0]?.toLowerCase() ?? ''
}

function isTerminalHost(host: string): boolean {
  return (HOSTS.terminal as readonly string[]).includes(host)
}

export function proxy(request: NextRequest) {
  const host = normalizeHost(request.headers.get('host'))

  if (isTerminalHost(host)) {
    const url = request.nextUrl.clone()
    const path = url.pathname === '/' ? '' : url.pathname
    url.pathname = `/terminal-site${path}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|machbox.ico|logos|og|.*\\..*).*)'],
}
