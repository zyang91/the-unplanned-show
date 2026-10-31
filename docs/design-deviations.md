# Design deviations and accepted lint findings

Records where the site deliberately differs from the Hallmark design skill or its linter. `design/design.md` is the source of truth.

## Hallmark rule 58 (about 80 words per screen)

The rule targets marketing landing pages. It conflicts with pages whose job is to be read in full:

- **About, Copyright, Editorial policy:** legal and editorial prose (copyright terms, the satire/fact policy, editorial standards). Shortening it to fit a word budget would weaken the licensing and disclaimer language required by `design.md` sections 7 and 8, so it is kept complete. These pages are set as long documents: a 68ch measure and generous line height.
- **Home, section and series pages:** kept sparse, but a newspaper front page is denser than the rule's budget. The linter still reports roughly 110 words on one screen for some of them. This is accepted, not fixed.

The skill treats rule 58 as non-waivable, so the linter reports it as FAIL. This document is the record of the decision.

## Other accepted deviations

- **Palette and faces** (Hallmark gates 37, 65): cream paper, Georgia, system sans and red accent are specified by `design/design.md` section 6.
- **Monospace** (gate 64): used for figures in the staff report and the archive count, as `design.md` specifies for data labels.
- **Colon headline:** the hero headline "Breaking News: Planning Continues Despite Uncertain Results." is the placeholder given in `design.md` section 3.
- **Footer links:** `design.md` lists Contact in the footer. It is omitted until a real public contact address exists.
- **Linter heuristics on inner pages** (44a, 44c, 77, 78): short headers, a thin "latest" column and few sections are normal for index and document pages.
- **`ArticleLayout.astro` overflow-x finding (34):** a false positive. The file has no CSS; `overflow-x: clip` is set on `html` and `body` in `src/styles/base.css`. A separate real overflow bug in the article column was found and fixed.

## Front-page redesign

- **Primary nav omits Home:** `design.md` section 2 lists Home, but the newspaper section bar carries only the five sections the redesign brief names. The centred wordmark is the home link.
- **Unplanned School dropdown:** the three series open under Unplanned School on hover and keyboard focus at desktop widths; below 60rem they are listed inline in the menu.
- **Pre-launch placeholders:** with no published stories, the lead keeps the `design.md` placeholder headline and approved deck, and the secondary positions are labelled "No story filed. Position reserved." Published stories fill the lead, the three secondary positions and a "more" row automatically.
- **Masthead strip:** "Independent satire" and "Pre-launch edition" are labels, not invented dateline, volume or issue numbers.
