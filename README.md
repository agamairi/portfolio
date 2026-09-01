# Agam Airi — portfolio

Interactive "mobile OS home screen" portfolio for Agam Airi (Toronto mobile / iOS
app developer). Built with React on [vinext](https://github.com/cloudflare/vinext)
(a Vite runtime for Next.js apps).

Live: <https://agamairi.github.io/portfolio/>

## Develop

```bash
npm ci
npm run dev        # http://localhost:5173
```

Source lives in `app/` — `app/page.tsx` is the whole site (one client component),
`app/globals.css` is the hand-written stylesheet.

## Build

```bash
npm run build          # full vinext / Cloudflare build (needs Linux + GNU timeout)
npm run build:static   # vite build --base=./  +  scripts/build-static.mjs
```

`build:static` server-renders `/` once, rewrites every root-absolute asset path to
a relative one, and writes a self-contained static site to `dist/static/` that
works from any base path.

## Hosting (GitHub Pages)

`.github/workflows/deploy-pages.yml` runs `npm run build:static` on every push to
`main` and publishes `dist/static/` to GitHub Pages. Pages source must be set to
"GitHub Actions" in the repo settings.

## Content

Copy, projects, and metrics are grounded in the résumé PDFs in `public/`.
Do not add fabricated metrics, employers, or dates.
