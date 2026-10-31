import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SECTION_SLUGS, SERIES_SLUGS } from './data/site';

// Articles are Markdown files in src/content/articles/. Only `status: published`
// articles with a date ever get a page, an archive entry or an RSS item.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z
    .object({
      title: z.string().min(1),
      section: z.enum(SECTION_SLUGS),
      series: z.enum(SERIES_SLUGS).optional(),
      status: z.enum(['draft', 'published']).default('draft'),
      date: z.coerce.date().nullable().default(null),
      excerpt: z.string().optional(),
      author: z.string().optional(),
      sources: z
        .array(
          z.object({
            title: z.string().min(1),
            url: z.string().url().optional(),
            note: z.string().optional(),
          }),
        )
        .default([]),
    })
    .superRefine((a, ctx) => {
      if (a.section === 'unplanned-school' && !a.series) {
        ctx.addIssue({ code: 'custom', path: ['series'], message: 'Unplanned School articles require a series.' });
      }
      if (a.section !== 'unplanned-school' && a.series) {
        ctx.addIssue({ code: 'custom', path: ['series'], message: 'Only Unplanned School articles take a series.' });
      }
      if (a.status === 'published') {
        if (!a.date) ctx.addIssue({ code: 'custom', path: ['date'], message: 'Published articles require a date.' });
        if (!a.excerpt) ctx.addIssue({ code: 'custom', path: ['excerpt'], message: 'Published articles require an excerpt.' });
      }
    }),
});

export const collections = { articles };
