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
npm run check:submissions   # submission folder rules and the editor's review report
npm run verify     # all of the above plus build, in one go
```

The same steps run in CI (`.github/workflows/ci.yml`) on every pull request. The accessibility rules catch static problems such as missing `alt` text, invalid links and click handlers without keyboard support. They do not replace manual keyboard and screen-reader testing.

## Writing articles

Stories are folders under [`submissions/`](submissions/), one per story: `submissions/<section>/<slug>/index.md` plus its images. Each section has a `_template` folder to copy. Contributors, including anyone without write access, follow [`CONTRIBUTING.md`](CONTRIBUTING.md): copy the template, fill in the fields, open a pull request. No TypeScript involved.

The publication flow:

1. A pull request adds or changes a story folder (forks welcome).
2. CI runs `npm run check:submissions` (folder and slug rules, required fields, images exist and have alt text, file types and sizes, no active HTML), then lint, type check and build.
3. `.github/workflows/submission-report.yml` posts one review comment on the PR with the URL, section, series, byline, date, images in order, problems, and whether merging publishes. It updates that comment on every push. It runs with comment permission but never checks out PR code.
4. The editor reviews (and the Vercel preview, if enabled), edits fields if needed, and merges. **Merging is publication**: `deploy.yml` rebuilds and deploys on every push to `main`.

For the merge to be the only gate, protect `main` (Settings → Branches): require a pull request, require review from Code Owners ([`.github/CODEOWNERS`](.github/CODEOWNERS)), and require the CI check. The report comment starts working once `submission-report.yml` is on `main`.

Editor-only pieces can still go in `src/content/articles/<slug>.md` from [`docs/article-template.md`](docs/article-template.md). Both locations feed the same collection; the URL is `/articles/<slug>/` either way, and slugs must be unique across both.

Frontmatter is validated at build time (`src/content.config.ts`): Unplanned School articles require a `series` (`mcp-session`, `musa-session`, `academia-research`); other sections must not set one; published articles require a date and an excerpt. Only published, dated articles reach article pages, section and series pages, the archive and `rss.xml`; drafts and the planning backlog never do. Internal editorial rules are in [`docs/editorial-guidelines.md`](docs/editorial-guidelines.md) (repo only, not published); the public, satirical version is [`docs/public-editorial-guidelines.md`](docs/public-editorial-guidelines.md), rendered at `/editorial-guidelines/`; the backlog is [`planning/editorial-backlog.md`](planning/editorial-backlog.md) and is never rendered.

## Project layout

```text
submissions/              stories: <section>/<slug>/index.md + images; _template per section
scripts/check-submissions.mjs   submission checks and PR review report
src/data/site.ts          sections, series, kinds, navigation (single source of truth)
src/content.config.ts     article schema
src/lib/articles.ts       getPublished(), the only door to public content
src/components, layouts   reusable parts
src/pages                 routes, matching design.md section 9
src/styles                tokens.css (palette, type, scale), base.css, global.css
COPYRIGHT.md, DISCLAIMER.md   rendered at /copyright/ and /editorial-policy/
docs/public-editorial-guidelines.md   rendered at /editorial-guidelines/
```

## Pull request previews (Vercel)

`vercel.json` builds the site at the domain root (`BASE=/`) so every pull request gets a Vercel preview URL. One-time setup: import this repository at vercel.com/new (Framework: Astro, no further settings). Vercel then comments a preview link on each PR. This is for review only; production stays on GitHub Pages.

## Deployment (GitHub Pages)

The site is configured for `https://zyang91.github.io/the-unplanned-show/` (`astro.config.mjs`). For a custom domain or a different repository name, set `SITE` and `BASE` at build time, for example `SITE=https://example.org BASE=/ npm run build`.

`.github/workflows/deploy.yml` builds and deploys to Pages on every push to `main` (and can be run by hand). It requires Settings → Pages → Source: GitHub Actions. Future-dated stories appear at the first deploy on or after their date; run the workflow by hand to release one without a new merge.

## Copyright

Accepted deviations from the design skill are recorded in [`docs/design-deviations.md`](docs/design-deviations.md).

Copyright © 2026 The Unplanned Show. All rights reserved. Editorial content, branding and source code are All Rights Reserved; no open or Creative Commons license is granted. See [`COPYRIGHT.md`](COPYRIGHT.md). The site is satire; see [`DISCLAIMER.md`](DISCLAIMER.md).
