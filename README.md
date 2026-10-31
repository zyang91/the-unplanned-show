# The Unplanned Show

Zhanchao Yang

*Because Not Everything Needs a Plan.*

An independent satirical urban planning blog. Static site built with [Astro](https://astro.build), Markdown articles, no backend, no database, no accounts. The editorial and visual specification is [`design/design.md`](design/design.md).

**Structure:** Section → Series → Article. Unplanned School (MCP Session, MUSA Session, Academia & Research), Unplanned Plan, Unplanned Implementation.

## Requirements

Node.js 22.12 or newer.

## Install and develop

```sh
npm install
npm run dev        # http://localhost:4321/the-unplanned-show/
```

## Build

```sh
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

Astro prints a harmless warning that the `articles` collection is empty until the first article exists.

## Linting and checks

```sh
npm run lint       # ESLint: TypeScript and Astro rules plus jsx-a11y accessibility rules
npm run check      # astro check: type-checks .astro and .ts files and the content schema
npm run verify     # lint, check and build in one go
```

The same three steps run in CI (`.github/workflows/ci.yml`) on every pull request. The accessibility rules catch static problems such as missing `alt` text, invalid links and click handlers without keyboard support. They do not replace manual keyboard and screen-reader testing.

## Writing articles

1. Copy [`docs/article-template.md`](docs/article-template.md) to `src/content/articles/<slug>.md`.
2. Keep `status: draft` and `date: null` while writing.
3. To publish, set `status: published`, a real `date` and an `excerpt`.

Frontmatter is validated at build time (`src/content.config.ts`): Unplanned School articles require a `series` (`mcp-session`, `musa-session`, `academia-research`); other sections must not set one; published articles require a date and an excerpt. Only published, dated articles reach article pages, section and series pages, the archive and `rss.xml`; drafts and the planning backlog never do. Editorial rules are in [`docs/editorial-guidelines.md`](docs/editorial-guidelines.md); the backlog is [`planning/editorial-backlog.md`](planning/editorial-backlog.md) and is never rendered.

## Project layout

```text
src/data/site.ts          sections, series, navigation (single source of truth)
src/content.config.ts     article schema
src/lib/articles.ts       getPublished(), the only door to public content
src/components, layouts   reusable parts
src/pages                 routes, matching design.md section 9
src/styles                tokens.css (palette, type, scale), base.css, global.css
COPYRIGHT.md, DISCLAIMER.md   rendered at /copyright/ and /editorial-policy/
```

## Pull request previews (Vercel)

`vercel.json` builds the site at the domain root (`BASE=/`) so every pull request gets a Vercel preview URL. One-time setup: import this repository at vercel.com/new (Framework: Astro, no further settings). Vercel then comments a preview link on each PR. This is for review only; production stays on GitHub Pages.

## Deployment (GitHub Pages)

The site is configured for `https://zyang91.github.io/the-unplanned-show/` (`astro.config.mjs`). For a custom domain or a different repository name, set `SITE` and `BASE` at build time, for example `SITE=https://example.org BASE=/ npm run build`.

`.github/workflows/deploy.yml` builds and deploys to Pages but is **manual-trigger only**. Nothing is published until the repository owner enables Pages (Settings → Pages → Source: GitHub Actions) and runs the workflow.

## Copyright

Accepted deviations from the design skill are recorded in [`docs/design-deviations.md`](docs/design-deviations.md).

Copyright © 2026 The Unplanned Show. All rights reserved. Editorial content, branding and source code are All Rights Reserved; no open or Creative Commons license is granted. See [`COPYRIGHT.md`](COPYRIGHT.md). The site is satire; see [`DISCLAIMER.md`](DISCLAIMER.md).
