import rss from '@astrojs/rss';
import { getPublished } from '../lib/articles';
import { SITE } from '../data/site';

export async function GET(context) {
  const articles = await getPublished();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: new URL(`${base}/`, context.site),
    items: articles.map((a) => ({
      title: a.data.title,
      pubDate: a.data.date,
      description: a.data.excerpt,
      link: `${base}/articles/${a.id}/`,
    })),
  });
}
