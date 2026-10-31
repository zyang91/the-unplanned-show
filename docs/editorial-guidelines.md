# Editorial guidelines

Working rules for anyone writing for The Unplanned Show. The public version lives at `/editorial-policy/` (sourced from `DISCLAIMER.md`).

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

1. Copy `docs/article-template.md` to `src/content/articles/<slug>.md`.
2. Fill in the frontmatter. Keep `status: draft` and `date: null` while writing.
3. When the piece is verified and edited, set `status: published` and a real `date` (YYYY-MM-DD) and an `excerpt`.
4. Run `npm run build`. The schema rejects invalid combinations (for example a missing series under Unplanned School).
5. Only `published` articles with a date on or before the build date reach the site, archive and RSS feed.

## Copyright

Original content is All Rights Reserved. Do not add a license header or Creative Commons notice without approval.
