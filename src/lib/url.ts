// Prefix an absolute site path with the configured base (GitHub Pages serves from /<repo>/).
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^[a-z]+:/i.test(path) || path.startsWith('#')) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
