# PDS Stack — documentation site

The docs hub for PDS Stack, built with [Nextra 4](https://nextra.site) (Next.js App Router).
This is the intended replacement for the static `landing/` folder — a searchable,
versionable docs product rather than a single marketing page.

## Develop

```bash
cd site
npm install
npm run dev
```

Open http://localhost:3000.

## Build (static export)

```bash
npm run build
```

Produces a fully static site in `site/out/` (includes Pagefind search index).
Any static host can serve it.

## Content

All pages live in `content/` as `.mdx`. Navigation is controlled by `_meta.js`
files. The brand layer (fonts, accent colour, hero) is in `app/globals.css`.

## Architecture

The site ships as **one combined static bundle**:

- `/` — the animated marketing landing (`landing/`, unchanged)
- `/docs` — this Nextra docs app (built with `basePath: '/docs'`, `trailingSlash: true`)

The landing header links to `/docs` (highlighted) and a "Start here" section links into
the docs. The docs navbar logo links back to `/`.

## Deploying to Netlify (combined)

Replace the root `netlify.toml` with this to build and publish both together:

```toml
[build]
  command = "cd site && npm ci && npm run build && cd .. && rm -rf dist && mkdir -p dist && cp -R landing/. dist/ && cp -R site/out dist/docs"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

# Unknown paths fall back to the landing page (real files still serve directly).
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

To preview the combined bundle locally:

```bash
cd site && npm run build && cd ..
rm -rf dist && mkdir -p dist && cp -R landing/. dist/ && cp -R site/out dist/docs
cd dist && python3 -m http.server 3066   # → http://localhost:3066
```

Until you apply the combined `netlify.toml`, the live site keeps serving the old
`landing/` folder untouched.
