// Single source of truth for the Section -> Series -> Article hierarchy.
// The content schema, navigation, landing pages and archive all read from here.

export const SITE = {
  name: 'The Unplanned Show',
  tagline: 'Because Not Everything Needs a Plan.',
  description:
    'An independent satirical publication about urban planning, public policy and academia. Research seriously. Write absurdly.',
  github: 'https://github.com/zyang91/the-unplanned-show',
  copyright: 'Copyright © 2026 The Unplanned Show. All rights reserved.',
  disclaimer:
    'Independent satire. Not affiliated with any university, government agency, employer or professional association.',
} as const;

export const SECTION_SLUGS = ['unplanned-school', 'unplanned-plan', 'unplanned-implementation'] as const;
export const SERIES_SLUGS = ['mcp-session', 'musa-session', 'academia-research'] as const;

// What kind of piece an article is, shown as a small label above its headline.
// Add a kind here before using it in frontmatter.
export const KIND_SLUGS = ['course-docket', 'commentary'] as const;
export type KindSlug = (typeof KIND_SLUGS)[number];
export const KINDS: Record<KindSlug, string> = {
  'course-docket': 'Course Docket',
  commentary: 'Commentary',
};

export type SectionSlug = (typeof SECTION_SLUGS)[number];
export type SeriesSlug = (typeof SERIES_SLUGS)[number];

export interface Section {
  slug: SectionSlug;
  title: string;
  tagline: string;
  summary: string;
  coverage: string[];
  href: string;
}

export interface Series {
  slug: SeriesSlug;
  section: 'unplanned-school';
  title: string;
  tagline: string;
  summary: string;
  subjects: string[];
  href: string;
}

export const SECTIONS: Section[] = [
  {
    slug: 'unplanned-school',
    title: 'Unplanned School',
    tagline: 'Teaching the Next Generation to Make the Same Mistakes.',
    summary: 'Planning education, urban analytics and academic life, in three series.',
    coverage: [],
    href: '/sections/unplanned-school/',
  },
  {
    slug: 'unplanned-plan',
    title: 'Unplanned Plan',
    tagline: 'A Comprehensive Plan for Comprehensive Confusion.',
    summary: 'Policy formulation, comprehensive plans, zoning, public engagement and the political economy behind them.',
    coverage: [
      'Comprehensive planning',
      'Zoning',
      'Public hearings',
      'Policy formation',
      'Environmental planning',
      'Institutional decision-making',
    ],
    href: '/sections/unplanned-plan/',
  },
  {
    slug: 'unplanned-implementation',
    title: 'Unplanned Implementation',
    tagline: 'Everything Went According to Plan. Unfortunately.',
    summary: 'Infrastructure, transportation operations, project delivery and the unintended consequences that follow.',
    coverage: [
      'Infrastructure projects',
      'Transportation systems',
      'Construction',
      'Public spending',
      'Policy execution',
      'Unintended consequences',
    ],
    href: '/sections/unplanned-implementation/',
  },
];

export const SERIES: Series[] = [
  {
    slug: 'mcp-session',
    section: 'unplanned-school',
    title: 'MCP Session',
    tagline: 'We Teach You How to Plan. Results May Vary.',
    summary: 'Planning education, studios, theory and professional practice.',
    subjects: [
      'Planning studios and intervention bias',
      'Comprehensive planning',
      'Planning theory versus practice',
      'Professional training',
      'Studio deliverables and evaluation',
      'Institutional and pedagogical contradictions',
    ],
    href: '/sections/unplanned-school/mcp-session/',
  },
  {
    slug: 'musa-session',
    section: 'unplanned-school',
    title: 'MUSA Session',
    tagline: 'We Have a Model. We Are Looking for a Decision.',
    summary: 'Urban analytics, programming, AI, predictive modeling and applied data science.',
    subjects: [
      'Machine learning versus causal inference',
      'Predictive accuracy and policy relevance',
      'Student practicums and client deliverables',
      'Software development and maintainability',
      'AI-assisted technical education',
      'Data dashboards and analytics culture',
    ],
    href: '/sections/unplanned-school/musa-session/',
  },
  {
    slug: 'academia-research',
    section: 'unplanned-school',
    title: 'Academia & Research',
    tagline: 'Peer-Reviewed. Reality Pending.',
    summary: 'Academic publishing, research methodology, bibliometrics and institutional incentives.',
    subjects: [
      'Citation rankings and academic prestige',
      'Research design and validity',
      'Academic publishing incentives',
      'Methodological limitations',
      'Institutional research cultures',
      'Research communication and public understanding',
    ],
    href: '/sections/unplanned-school/academia-research/',
  },
];

export const sectionBySlug = (slug: string) => SECTIONS.find((s) => s.slug === slug);
export const seriesBySlug = (slug: string) => SERIES.find((s) => s.slug === slug);

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// The wordmark is the home link, so the section bar carries sections only.
export const NAV: NavItem[] = [
  {
    label: 'Unplanned School',
    href: '/sections/unplanned-school/',
    children: SERIES.map((s) => ({ label: s.title, href: s.href })),
  },
  { label: 'Unplanned Plan', href: '/sections/unplanned-plan/' },
  { label: 'Unplanned Implementation', href: '/sections/unplanned-implementation/' },
  { label: 'Archive', href: '/archive/' },
  { label: 'About', href: '/about/' },
];
