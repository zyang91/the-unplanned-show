import { getCollection, type CollectionEntry } from 'astro:content';
import type { SectionSlug, SeriesSlug } from '../data/site';

export type Article = CollectionEntry<'articles'>;

// The only door to public content: drafts, undated entries and future-dated
// entries are filtered out here, so no page, archive or feed can leak them.
export async function getPublished(filter?: { section?: SectionSlug; series?: SeriesSlug }): Promise<Article[]> {
  const now = Date.now();
  const all = await getCollection('articles');
  return all
    .filter((a) => a.data.status === 'published' && a.data.date && a.data.date.getTime() <= now)
    .filter((a) => !filter?.section || a.data.section === filter.section)
    .filter((a) => !filter?.series || a.data.series.includes(filter.series))
    .sort((a, b) => b.data.date!.getTime() - a.data.date!.getTime());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

// Every picture a story can use, keyed by its path from the project root ("/submissions/.../1.png").
const pictures = import.meta.glob<{ default: ImageMetadata }>(
  ['/submissions/*/*/*.{png,jpg,jpeg,webp,avif,gif}', '/src/content/articles/**/*.{png,jpg,jpeg,webp,avif,gif}'],
  { eager: true },
);

// A story's cover is the first local picture in its body, so contributors need no extra field.
export function coverOf(a: Article): { src: ImageMetadata; alt: string } | undefined {
  const m = a.body?.match(/!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?/);
  if (!m || !a.filePath || /^[a-z]+:/i.test(m[2])) return undefined;
  const dir = a.filePath.split('/').slice(0, -1);
  for (const part of decodeURI(m[2]).split('/')) {
    if (part === '..') dir.pop();
    else if (part !== '.' && part !== '') dir.push(part);
  }
  const src = pictures[`/${dir.join('/')}`]?.default;
  return src ? { src, alt: m[1] } : undefined;
}
