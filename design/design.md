# The Unplanned Show — Website Design & Editorial Blueprint

**Version:** 0.2  
**Status:** Initial website design  
**Format:** Satirical urban planning blog  
**Tagline:** *Because Not Everything Needs a Plan.*

## 1. Project Vision

The Unplanned Show is an independent satirical publication exploring the absurdities, contradictions, and unintended consequences of urban planning, public policy, and academia.

Its editorial approach combines factual research, deadpan humor, institutional satire, and critical commentary.

**Editorial principle:** *Research seriously. Write absurdly. Let the contradiction deliver the punchline.*

The project begins as a written blog. Podcast and video formats may be introduced later.

## 2. Website Information Architecture

The website follows a three-level editorial hierarchy:

**Section → Series → Article**

### Primary Navigation

- Home
- Unplanned School
- Unplanned Plan
- Unplanned Implementation
- Archive
- About

### Unplanned School

Three editorial series:

1. **MCP Session** — Planning education, studios, theory, and professional practice.
2. **MUSA Session** — Urban analytics, programming, AI, predictive modeling, and applied data science.
3. **Academia & Research** — Academic publishing, research methodology, bibliometrics, and institutional incentives.

The series should appear as distinct cards or tabs within the Unplanned School landing page.

MCP and MUSA are initially based on experiences and observations within graduate education. Academia & Research has a broader scope and is not institution-specific.

### Unplanned Plan

Policy formulation, comprehensive plans, zoning, public engagement, institutional decision-making, and political economy.

No subseries required in version 1.

### Unplanned Implementation

Infrastructure, transportation operations, project delivery, construction, policy implementation, and unintended consequences.

No subseries required in version 1.

## 3. Homepage Design

### Header

- Publication wordmark
- Tagline
- Primary navigation
- Responsive mobile menu

### Hero

Featured story area with an editorial newspaper aesthetic.

Initial placeholder:

*Breaking News: Planning Continues Despite Uncertain Results.*

### Latest Stories

Chronological article cards displaying headline, section, series (if applicable), date, and excerpt.

### Editorial Sections

Three main section cards. Unplanned School additionally displays links to its three series.

### Footer

About, Editorial Policy, Copyright, Contact, and GitHub.

No advertising, paywalls, user accounts, or comments in version 1.

## 4. Editorial Sections and Series

### 4.1 Unplanned School

*Teaching the Next Generation to Make the Same Mistakes.*

#### MCP Session

*We Teach You How to Plan. Results May Vary.*

Subjects:

- Planning studios and intervention bias
- Comprehensive planning
- Planning theory versus practice
- Professional training
- Studio deliverables and evaluation
- Institutional and pedagogical contradictions

#### MUSA Session

*We Have a Model. We Are Looking for a Decision.*

Subjects:

- Machine learning versus causal inference
- Predictive accuracy and policy relevance
- Student practicums and client deliverables
- Software development and maintainability
- AI-assisted technical education
- Data dashboards and analytics culture

#### Academia & Research

*Peer-Reviewed. Reality Pending.*

Subjects:

- Citation rankings and academic prestige
- Research design and validity
- Academic publishing incentives
- Methodological limitations
- Institutional research cultures
- Research communication and public understanding

### 4.2 Unplanned Plan

*A Comprehensive Plan for Comprehensive Confusion.*

Coverage includes comprehensive planning, zoning, public hearings, policy formation, environmental planning, and institutional decision-making.

### 4.3 Unplanned Implementation

*Everything Went According to Plan. Unfortunately.*

Coverage includes infrastructure projects, transportation systems, construction, public spending, policy execution, and unintended consequences.

## 5. Initial Editorial Backlog

All entries are **planned only**. No full articles, article excerpts, or fabricated research findings should be generated during website setup.

### 5.1 MCP Session

| ID | Working Title |
|---|---|
| MCP-001 | The Intervention Industrial Complex |
| MCP-002 | The No-Action Alternative Nobody Wants |
| MCP-003 | Comprehensive Planning for an Incomprehensible Future |
| MCP-004 | The Studio Presentation Industrial Complex |
| MCP-005 | Planning Theory Meets Planning Reality |

### 5.2 MUSA Session

| ID | Working Title |
|---|---|
| MUSA-001 | We Have a Model. Now What? |
| MUSA-002 | The Practicum-to-Production Pipeline |
| MUSA-003 | Predictive Accuracy Is Not Public Policy |
| MUSA-004 | The AI Did My Homework. I Supervised. |
| MUSA-005 | Everything Is a Dashboard |

### 5.3 Academia & Research

| ID | Working Title |
|---|---|
| AR-001 | Peer-Reviewed Excellence, Now Ranked |
| AR-002 | Limitations Acknowledged. Problem Solved. |
| AR-003 | Publish or Perish, Preferably Both |
| AR-004 | Statistically Significant, Practically Irrelevant |
| AR-005 | The Professor Is Always Methodologically Correct |

### 5.4 Unplanned Plan — Future Topics

- The Comprehensive Plan to End All Comprehensive Plans
- Public Engagement: We Heard You. Anyway...
- The No-Action Alternative
- A Vision for 2050, Funding Pending
- Planning by Committee, Responsibility by Nobody

### 5.5 Unplanned Implementation — Future Topics

- Just One More Lane
- Parking Our Way to Carbon Neutrality
- The Project Was Delivered. The Problem Was Not.
- Infrastructure That Outlived Its Original Purpose
- The Unintended Consequences Department

Working titles are satirical concepts, not factual allegations or completed findings.

## 6. Visual Design

The website combines traditional newspaper design, modern editorial publishing, and deliberately understated institutional satire.

**Palette:**

- Background: `#F7F5F0`
- Primary text: `#171717`
- Accent: `#B3262D`
- Secondary text: `#666666`
- Dividers: `#D8D4CC`

**Typography:**

- Headlines: Editorial serif, such as Georgia
- Body: System sans-serif or Inter
- Data labels: Monospace where appropriate

Priorities: readability, accessible contrast, mobile responsiveness, restrained animation, and clear visual separation between satire and factual evidence.

## 7. Editorial Standards

The publication is explicitly satirical and independent.

- Verify substantive factual claims.
- Clearly distinguish fictional quotations from real statements.
- Do not fabricate statistics or present invented results as empirical findings.
- Provide references when relying on documented events, research, or institutional records.
- Distinguish criticism of institutional practices from unsupported allegations about individuals.
- Allow irony, exaggeration, parody, and self-deprecating humor.
- Do not require every article to propose a policy solution.

The publication does not claim to represent a university, government agency, employer, or professional association.

## 8. Copyright and Licensing

### Editorial Content

**All Rights Reserved.**

Original articles, scripts, graphics, illustrations, audio, video, and editorial materials are protected by copyright. No general Creative Commons license is granted at launch.

Readers may share links and make uses permitted by applicable law. Other reproduction, adaptation, or redistribution requires permission.

### Source Code

Website source code is initially All Rights Reserved. A separate open-source license may be adopted later for selected components.

### Brand

The publication name and visual identity are reserved for project use. This does not establish trademark registration or confirm that the name is available for exclusive use.

### Third-Party Content

Third-party materials must be used under appropriate permissions, licenses, or applicable legal exceptions.

**Copyright notice:** Copyright © 2026 The Unplanned Show. All rights reserved.

## 9. Technical Architecture

Version 1 is a lightweight static website suitable for GitHub Pages.

Preferred implementation:

- Astro or another static-site generator
- Markdown-based articles
- Responsive layouts
- Reusable article templates
- Section and series archive pages
- No backend or database
- RSS support when publishing begins

### Repository Structure

```text
the-unplanned-show/
├── README.md
├── design.md
├── COPYRIGHT.md
├── DISCLAIMER.md
├── public/
│   └── assets/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── archive.astro
│   │   └── sections/
│   │       ├── unplanned-school/
│   │       │   ├── index.astro
│   │       │   ├── mcp-session.astro
│   │       │   ├── musa-session.astro
│   │       │   └── academia-research.astro
│   │       ├── unplanned-plan.astro
│   │       └── unplanned-implementation.astro
│   ├── content/
│   │   └── articles/
│   └── styles/
├── docs/
│   ├── editorial-guidelines.md
│   └── article-template.md
└── planning/
    └── editorial-backlog.md
```

### Article Metadata

```yaml
title: "Example Article"
section: unplanned-school
series: musa-session
status: draft
date: null
```

Allowed series under `unplanned-school`:

- `mcp-session`
- `musa-session`
- `academia-research`

Other sections do not require a series.

Editorial backlog entries must not appear as published articles. The archive should display published content only.

## 10. Development Roadmap

### Phase 1 — Website Foundation

- Repository setup
- Homepage and navigation
- Three section landing pages
- Three Unplanned School series pages
- About and Archive pages
- Copyright and editorial policies
- Responsive design and static deployment

### Phase 2 — First Publications

- Select initial articles from the backlog
- Research and verify factual material
- Draft and edit satire
- Add references and visual materials
- Publish individual articles

### Phase 3 — Future Expansion

- Additional editorial series
- Interactive reports
- Podcast
- Video commentary
- Newsletter or RSS distribution

No publishing schedule or monetization commitment is required.

## 11. Guiding Philosophy

The Unplanned Show does not exist to prove urban planning is useless. It explores the contradictions of a profession dedicated to shaping uncertain futures.

Its criticism should be informed, curious, self-aware, and willing to question its own assumptions.

*Keep Planning. Results Not Guaranteed.*