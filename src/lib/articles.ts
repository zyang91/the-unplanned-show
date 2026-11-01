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
