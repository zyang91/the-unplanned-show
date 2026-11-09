# Submitting a story

You write one Markdown file, put it in a folder with its images, and open a pull request. The site lays it out automatically. The editor reviews the pull request; **merging it is publication**. You do not need to know TypeScript, Astro or how the site works, and you do not need write access to this repository.

## 1. Pick a section

| Folder | Section | What it covers |
|---|---|---|
| `submissions/unplanned-school/` | Unplanned School | Planning education, urban analytics, academic life. Needs a `series`: `mcp-session`, `musa-session` or `academia-research` (or several). |
| `submissions/unplanned-plan/` | Unplanned Plan | Comprehensive plans, zoning, public hearings, how policy gets made. |
| `submissions/unplanned-implementation/` | Unplanned Implementation | Infrastructure, transportation, construction, what happens after the plan. |

Not sure? Pick the closest one and say so in the pull request. The editor can move it.

## 2. Make your story folder

Copy the `_template` folder inside that section and rename the copy. The folder name becomes the link, so use lowercase words joined by dashes:

```text
submissions/
  unplanned-plan/
    _template/              ← copy this
    zoning-by-vibes/        ← your copy, renamed
      index.md              ← your story (required)
      panel-01.png          ← images (optional)
      panel-02.png
```

The link will be `/articles/zoning-by-vibes/`. Folders starting with `_` are templates and never appear on the site.

## 3. Fill in the fields and write

`index.md` starts with a block of fields between two `---` lines, then your story in plain Markdown:

```markdown
---
title: "Zoning by Vibes"
section: unplanned-plan
kind: comic
author: "A. Planner"
date: 2026-11-08
excerpt: "The council adopts a land-use map drawn entirely from mood."
status: published
sources: []
---

The meeting opened with a moment of silence for the previous plan.

![Panel one: the council studies a map coloured by feelings](./panel-01.png)

![Panel two: the map is adopted unanimously](./panel-02.png)
```

| Field | Required | Notes |
|---|---|---|
| `title` | yes | The headline. Don't repeat it in the body. |
| `section` | yes | Must match the folder you're in (the template already has it). |
| `series` | Unplanned School only | `mcp-session`, `musa-session`, `academia-research`, or a list like `[mcp-session, musa-session]`. |
| `kind` | no | The label above the headline: `commentary`, `short-satire`, `breaking-news`, `comic`, `course-docket`, `opinion` (a longer, more serious piece; it runs in the home page's Opinion column). The first picture in the story becomes its cover image on the home page. |
| `author` | no | Your byline, printed as written. Leave it out to publish unsigned. |
| `author_title` | no | Your role, printed after your name: "By A. Planner, Staff Reporter". |
| `date` | yes | `YYYY-MM-DD`. A proposal: the editor sets the final date. |
| `excerpt` | yes | One or two sentences for cards, the archive and the line under the headline. |
| `status` | no | `published` (merging publishes it) or `draft` (merged but hidden). |
| `sources` | no | References for any real facts, each with a `title` and optional `url` and `note`. |

**Images** go in the same folder and show up where you place them, in order, so a comic is just images one after another. Every image needs alt text, the words in the square brackets that describe the picture. Illustrations, edited or AI-generated images are fine; the site states that no image is a guaranteed record of a real scene, so you don't need to label each one. Use PNG, JPG, GIF, WebP or AVIF, under 20 MB each (under 5 MB is better). The site resizes them.

**Not allowed**: scripts, iframes, embedded forms or other active HTML; files other than `index.md` and images.

## 4. Open a pull request

**In the browser, no git needed:**

1. On the repository page, open the section folder (e.g. `submissions/unplanned-plan/`), then **Add file → Create new file**.
2. Type the name as `your-slug/index.md`. Typing the `/` creates the folder.
3. Paste the template and your story, then **Commit changes → Propose changes**. GitHub makes a copy (fork) for you and opens a pull request.
4. To add images, open your new folder on your fork's branch and use **Add file → Upload files**, committing to the same branch.

**With git:** fork the repository, add your folder on a branch, push, and open a pull request against `main`.

## 5. Review

Within a few minutes the pull request gets:

- **A submission review comment** with the URL, section, series, byline, date, images in order, and whether merging will publish it. Anything under **Must fix** blocks publication; fix it and push again. The comment updates itself.
- **CI checks** that build the whole site with your story in it.
- **A preview link** from Vercel, if the editor has it switched on, to see the page exactly as it will look.

GitHub may hold the checks on a first-time contributor's pull request until the editor approves them. That's normal.

The editor may change the title, section, series, date, excerpt, captions or credit, ask you for changes, or decline. When the editor merges, the site rebuilds and the story is live a few minutes later.

## Editorial rules in brief

This is satire: irony, exaggeration and parody are welcome. Keep invented material visibly separate from documented fact, and list real sources in `sources`. Criticise institutions and practices, not private individuals. Don't claim to speak for a university, agency or employer. Only submit images you made (AI-generated included) or have the right to use. No per-article satire notice is needed: the site carries one. See the public [editorial guidelines](docs/public-editorial-guidelines.md).

By submitting, you agree the editor may edit and publish your story on the site with your byline. Content on the site is All Rights Reserved; see [COPYRIGHT.md](COPYRIGHT.md).
