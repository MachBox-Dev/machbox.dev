# machbox

Umbrella site for the Mach product family — [machbox.dev](https://machbox.dev).

## Stack

- Next.js 16 (App Router)
- React 19 + Tailwind CSS 4
- Design tokens in `packages/tokens` (`@mach/tokens`)
- Deploy target: Vercel

## Domains

| Host | Route |
|------|-------|
| `machbox.dev` | Umbrella landing (`/`) |
| `terminal.machbox.dev` | [Mach Terminal](https://github.com/MachBox-Dev/mach-terminal) product site |

Local terminal subdomain: add `127.0.0.1 terminal.localhost` to `/etc/hosts`, then open `http://terminal.localhost:3000`.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Product accents

- **Mach Triage** — neon blue glow (`#56d9ff`)
- **Mach Terminal** — greenish glow (`#00d4b8`)

Logos live in `public/logos/`. Brand assets:

- `public/logos/machbox.png` — umbrella logo (UI, apple-touch)
- `public/og/machbox.jpg` — Open Graph / social preview (1200×630, ~170KB)
- `public/machbox.ico` — 32×32 favicon (also copied to `src/app/favicon.ico`)

Terminal download links are fetched from GitHub Releases at build time and revalidated every hour (ISR). Optional `GITHUB_TOKEN` in Vercel raises API rate limits.
