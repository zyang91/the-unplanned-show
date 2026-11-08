# Editorial guidelines

Working rules for anyone writing for The Unplanned Show. This file is internal and is never published. Two public pages exist: `/editorial-policy/` (sourced from `DISCLAIMER.md`) and the satirical `/editorial-guidelines/` (sourced from `docs/public-editorial-guidelines.md`).

## Principle

Research seriously. Write absurdly. Let the contradiction deliver the punchline.

## Before drafting

1. Pick a topic from `planning/editorial-backlog.md`. Backlog entries are working titles, not findings.
2. Verify every substantive factual claim and keep the references.
3. Decide which parts are fact and which are satire. They must stay visibly separate.

## Rules

- Fictional quotations are labelled as fictional. Never attribute an invented quote to a real person without making the invention unmistakable.
- No fabricated statistics. Invented numbers are never presented as results.
- Cite documented events, research and institutional records under `sources` in the frontmatter.
- Criticise institutional practices, not unsupported allegations about individuals.
- Irony, exaggeration, parody and self-deprecation are welcome. A policy solution is not required.
- Do not claim to speak for a university, agency, employer or professional association.
- Third-party material needs permission, a license or a legal exception.

## Publishing workflow

1. A story arrives as a pull request adding `submissions/<section>/<slug>/` (see `CONTRIBUTING.md`).
2. Read the submission review comment on the PR: anything under **Must fix** blocks the build; warnings are for judgment (no byline, draft status, future date, unused images, large files).
3. Check the piece against these guidelines and the Vercel preview. Edit fields or copy directly on the PR branch, or request changes. Final say on title, section, series, date, excerpt and credit is the editor's.
4. To hold a piece, set `status: draft` before merging, or don't merge.
5. Merge. That is publication: the site rebuilds and only `published` articles with a date on or before the build date reach the site, archive and RSS feed.

Editor-only pieces can skip the PR route: copy `docs/article-template.md` to `src/content/articles/<slug>.md`.

## Copyright

Original content is All Rights Reserved. Do not add a license header or Creative Commons notice without approval.
