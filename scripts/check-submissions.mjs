#!/usr/bin/env node
// Checks every story under submissions/<section>/<slug>/ and writes a review
// report for the editor. Deterministic, no network, no contributor code run.
//
//   node --experimental-strip-types scripts/check-submissions.mjs [--report out.md] [--changed files.txt]
//
// --changed: a file listing changed paths (one per line, e.g. `git diff --name-only`).
//            The report then covers only the stories those paths touch; every story is still checked.
// Exit code 1 when any story has errors. Warnings never fail the run.
//
// The Astro build re-validates frontmatter against src/content.config.ts; this script adds
// the submission rules (folders, slugs, images, alt text, unsafe HTML) and readable messages.

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, posix } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { KIND_SLUGS, SECTION_SLUGS, SECTIONS, SERIES, SERIES_SLUGS } from '../src/data/site.ts';

const ROOT = 'submissions';
const EDITOR_DIR = 'src/content/articles';
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif']);
const MB = 1024 * 1024;
const WARN_BYTES = 5 * MB;
const MAX_BYTES = 20 * MB;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Template text that must not survive into a real submission.
const PLACEHOLDERS = ['Your headline here', 'Your name', 'YYYY-MM-DD', 'One or two sentences shown on cards', 'Delete this example text'];
const UNSAFE_HTML = [
  [/<\s*script\b/i, '`<script>`'],
  [/<\s*iframe\b/i, '`<iframe>`'],
  [/<\s*(object|embed)\b/i, '`<object>`/`<embed>`'],
  [/<\s*style\b/i, '`<style>`'],
  [/<\s*form\b/i, '`<form>`'],
  [/\son[a-z]+\s*=/i, 'inline event handler (`on...=`)'],
  [/javascript:/i, '`javascript:` link'],
];

const args = process.argv.slice(2);
const argValue = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const reportPath = argValue('--report');
const changedPath = argValue('--changed');

const ls = (dir) => (existsSync(dir) ? readdirSync(dir) : []).filter((n) => !n.startsWith('.'));
const isDir = (p) => statSync(p).isDirectory();
const extOf = (n) => posix.extname(n).toLowerCase();
// Contributor text shown in a PR comment: no HTML, no @-mentions, no table breaks, one line.
const clean = (v) =>
  String(v).replace(/[<>]/g, '').replace(/@/g, '@\u200b').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim().slice(0, 200);
const fmtBytes = (b) => (b >= MB ? `${(b / MB).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`);

/** @type {{dir:string, slug:string, section:string, errors:string[], warnings:string[], info:Record<string,string>, images:string[]}[]} */
const stories = [];
const stray = []; // { path, msg }: problems not tied to one story folder

// ── Discover ────────────────────────────────────────────────────────────────
for (const name of ls(ROOT)) {
  const p = join(ROOT, name);
  if (!isDir(p)) {
    if (name !== 'README.md') stray.push({ path: p, msg: `\`${p}\`: files go inside a story folder, \`${ROOT}/<section>/<slug>/index.md\`.` });
    continue;
  }
  if (!SECTION_SLUGS.includes(name)) {
    stray.push({ path: p, msg: `\`${p}/\`: "${name}" is not a section. Use one of: ${SECTION_SLUGS.map((s) => `\`${s}\``).join(', ')}.` });
    continue;
  }
  for (const slug of ls(p)) {
    const dir = join(p, slug);
    if (!isDir(dir)) {
      stray.push({ path: dir, msg: `\`${dir}\`: put the story in its own folder, e.g. \`${p}/${slug.replace(/\.md$/i, '')}/index.md\`.` });
      continue;
    }
    if (slug.startsWith('_')) continue; // templates
    stories.push({ dir, slug, section: name, errors: [], warnings: [], info: {}, images: [] });
  }
}

const editorSlugs = new Set(ls(EDITOR_DIR).filter((n) => n.endsWith('.md')).map((n) => n.slice(0, -3).toLowerCase()));

// ── Check each story ────────────────────────────────────────────────────────
const slugCount = new Map();
for (const s of stories) slugCount.set(s.slug.toLowerCase(), (slugCount.get(s.slug.toLowerCase()) ?? 0) + 1);

for (const s of stories) {
  const { errors, warnings, info } = s;
  const err = (m) => errors.push(m);
  const warn = (m) => warnings.push(m);

  if (!SLUG_RE.test(s.slug)) err(`Folder name \`${s.slug}\` becomes the URL; use lowercase letters, digits and single dashes, e.g. \`zoning-by-vibes\`.`);
  if (slugCount.get(s.slug.toLowerCase()) > 1) err(`Another submission already uses the folder name \`${s.slug}\`; pick a unique one.`);
  if (editorSlugs.has(s.slug.toLowerCase())) err(`\`${EDITOR_DIR}/${s.slug}.md\` already uses this slug; pick a unique folder name.`);

  const files = ls(s.dir);
  const mdPath = join(s.dir, 'index.md');
  if (!files.includes('index.md')) {
    const other = files.find((f) => extOf(f) === '.md');
    err(other ? `Rename \`${other}\` to \`index.md\`.` : 'Missing `index.md`.');
    continue;
  }

  // Frontmatter
  const raw = readFileSync(mdPath, 'utf8').replace(/^\uFEFF/, '');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) {
    err('`index.md` must start with a `---` block of fields (copy it from the `_template` folder).');
    continue;
  }
  let fm;
  try {
    fm = parseYaml(m[1], { schema: 'core' }) ?? {};
  } catch (e) {
    err(`The fields block is not valid YAML: ${String(e.message).split('\n')[0]}`);
    continue;
  }
  if (typeof fm !== 'object' || Array.isArray(fm)) {
    err('The fields block must be a list of `name: value` lines.');
    continue;
  }
  const body = m[2];

  for (const p of PLACEHOLDERS) if (raw.includes(p)) err(`Template text left in place: "${p}". Replace or delete it.`);

  const str = (v) => (typeof v === 'string' ? v.trim() : v instanceof Date ? v.toISOString().slice(0, 10) : '');

  // title
  if (!str(fm.title)) err('`title` is missing.');
  info.title = clean(str(fm.title)) || '—';

  // section must match its folder
  if (!fm.section) err(`\`section\` is missing; it should be \`${s.section}\` to match the folder.`);
  else if (fm.section !== s.section) err(`\`section: ${fm.section}\` does not match the folder \`${s.section}/\`. Move the folder or fix the field.`);
  info.section = SECTIONS.find((x) => x.slug === s.section)?.title ?? s.section;

  // series
  const series = fm.series == null ? [] : Array.isArray(fm.series) ? fm.series : [fm.series];
  const badSeries = series.filter((x) => !SERIES_SLUGS.includes(x));
  if (badSeries.length) err(`Unknown series ${badSeries.map((x) => `\`${x}\``).join(', ')}. Use: ${SERIES_SLUGS.map((x) => `\`${x}\``).join(', ')}. New series are added by the editor.`);
  if (s.section === 'unplanned-school' && series.length === 0) err('Unplanned School stories need a `series`.');
  if (s.section !== 'unplanned-school' && series.length > 0) err('Only Unplanned School stories take a `series`; remove it.');
  info.series = series.map((x) => SERIES.find((y) => y.slug === x)?.title ?? x).join(' & ') || '—';

  // kind
  if (fm.kind != null && !KIND_SLUGS.includes(fm.kind)) err(`Unknown \`kind: ${fm.kind}\`. Use: ${KIND_SLUGS.map((x) => `\`${x}\``).join(', ')}.`);
  if (fm.kind == null) warn('No `kind`; the headline will have no label.');
  info.kind = fm.kind == null ? '—' : clean(fm.kind);

  // author
  if (!str(fm.author)) warn('No `author`; the story will run without a byline.');
  info.author = clean(str(fm.author)) || '—';

  // status / date / excerpt
  const status = fm.status ?? 'draft';
  if (!['draft', 'published'].includes(status)) err('`status` must be `published` or `draft`.');
  info.status = clean(status);
  const dateStr = str(fm.date);
  const date = dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr) ? new Date(`${dateStr}T00:00:00Z`) : null;
  if (fm.date != null && fm.date !== '' && (!date || Number.isNaN(date.getTime()))) err('`date` must look like `2026-11-08`.');
  info.date = date ? dateStr : '—';
  if (status === 'published') {
    if (!date) err('Published stories need a `date`.');
    if (!str(fm.excerpt)) err('Published stories need an `excerpt`.');
    if (date && date.getTime() > Date.now()) warn(`Dated ${dateStr}, in the future: it stays hidden until the site is rebuilt on or after that day (any later merge, or run the Deploy workflow by hand).`);
  } else {
    warn('`status: draft`: merging will **not** publish this story.');
  }
  if (str(fm.excerpt).length > 300) warn('`excerpt` is long; aim for one or two sentences.');

  // sources
  if (fm.sources != null && !Array.isArray(fm.sources)) err('`sources` must be a list.');
  for (const [i, src] of (Array.isArray(fm.sources) ? fm.sources : []).entries()) {
    if (!src || typeof src !== 'object' || !str(src.title)) err(`\`sources\` item ${i + 1} needs a \`title\`.`);
    else if (src.url && !/^https?:\/\//.test(src.url)) err(`\`sources\` item ${i + 1}: \`url\` must start with http:// or https://.`);
  }

  // unknown fields
  const known = new Set(['title', 'section', 'series', 'kind', 'status', 'date', 'excerpt', 'author', 'sources']);
  const unknown = Object.keys(fm).filter((k) => !known.has(k));
  if (unknown.length) err(`Unknown field(s): ${unknown.map((k) => `\`${k}\``).join(', ')}.`);

  // body
  const prose = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  if (!prose.trim()) err('The story body is empty.');
  for (const [re, label] of UNSAFE_HTML) if (re.test(prose)) err(`Raw HTML is limited for safety: remove the ${label}.`);
  if (/^#\s/m.test(prose)) warn('A `# ` heading in the body duplicates the headline; start subheadings at `##`.');

  // images: Markdown ![alt](src "title") and <img src alt>
  const refs = [];
  for (const im of prose.matchAll(/!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) refs.push({ alt: im[1], src: im[2] });
  for (const im of prose.matchAll(/<img\b[^>]*>/gi)) {
    const src = im[0].match(/\ssrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? '';
    const alt = im[0].match(/\salt\s*=\s*["']([^"']*)["']/i)?.[1];
    refs.push({ alt: alt ?? '', src, html: true });
  }
  const used = new Set();
  for (const { alt, src, html } of refs) {
    if (html) warn(`\`<img src="${src}">\` is not resized for the web; prefer \`![alt](./file.png)\`.`);
    if (!alt.trim()) err(`Image \`${src}\` needs alt text: \`![what the picture shows](${src})\`.`);
    if (/^https?:\/\//i.test(src)) {
      warn(`\`${src}\` is hot-linked from another site; add the file to the folder instead if you can.`);
      continue;
    }
    const rel = posix.normalize(decodeURI(src).replace(/^\.\//, ''));
    if (rel.startsWith('..') || rel.startsWith('/')) {
      err(`Image \`${src}\` must be a file inside this story's folder, e.g. \`./${posix.basename(rel)}\`.`);
      continue;
    }
    if (!existsSync(join(s.dir, rel))) {
      err(`Image \`${src}\` is not in the folder (file names are case-sensitive).`);
      continue;
    }
    used.add(rel);
    s.images.push(rel);
  }

  // internal article links
  for (const lk of prose.matchAll(/\]\((\/articles\/([^/)#?]+)\/?[^)]*)\)/g)) {
    const target = lk[2].toLowerCase();
    if (!slugCount.has(target) && !editorSlugs.has(target)) warn(`Link \`${lk[1]}\` points to an article that does not exist.`);
  }

  // files in the folder
  for (const f of files) {
    if (f === 'index.md') continue;
    const p = join(s.dir, f);
    if (isDir(p)) {
      warn(`Sub-folder \`${f}/\` is ignored unless images inside it are referenced as \`./${f}/...\`.`);
      continue;
    }
    if (!IMAGE_EXT.has(extOf(f))) {
      err(`\`${f}\`: only images (${[...IMAGE_EXT].join(', ')}) may sit beside \`index.md\`.`);
      continue;
    }
    const size = statSync(p).size;
    if (size > MAX_BYTES) err(`\`${f}\` is ${fmtBytes(size)}; the limit is ${fmtBytes(MAX_BYTES)}.`);
    else if (size > WARN_BYTES) warn(`\`${f}\` is ${fmtBytes(size)}; it will be compressed, but please keep originals under ${fmtBytes(WARN_BYTES)}.`);
    if (!used.has(f)) warn(`\`${f}\` is in the folder but not used in the story.`);
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
let changed = null;
if (changedPath) {
  const paths = readFileSync(changedPath, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
  changed = paths.filter((p) => p.startsWith(`${ROOT}/`));
}
const touches = (dir) => !changed || changed.some((p) => p === dir || p.startsWith(`${dir}/`));
const inReport = stories.filter((s) => touches(s.dir));
const strayInReport = stray.filter((x) => touches(x.path)).map((x) => x.msg);
const totalErrors = stories.reduce((n, s) => n + s.errors.length, 0) + stray.length;

const lines = [];
if (inReport.length || strayInReport.length) {
  lines.push('## Submission review', '');
  for (const s of inReport) {
    const ok = s.errors.length === 0;
    const publishes = ok && s.info.status === 'published';
    lines.push(`### ${ok ? '✅' : '❌'} ${s.info.title}`, '');
    lines.push('| | |', '|---|---|');
    lines.push(`| Folder | \`${s.dir}/\` |`);
    lines.push(`| URL | \`/articles/${s.slug}/\` |`);
    lines.push(`| Section | ${s.info.section} |`);
    lines.push(`| Series | ${s.info.series} |`);
    lines.push(`| Kind | ${s.info.kind} |`);
    lines.push(`| Byline | ${s.info.author} |`);
    lines.push(`| Date | ${s.info.date} |`);
    lines.push(`| Status | ${s.info.status} |`);
    lines.push(`| Images, in order | ${s.images.length ? s.images.map((i) => `\`${i}\``).join(' → ') : 'none'} |`);
    lines.push(`| On merge | ${publishes ? '**Publishes**' : ok ? 'Stored as a draft, not published' : 'Blocked until the errors are fixed'} |`, '');
    if (s.errors.length) lines.push('**Must fix**', '', ...s.errors.map((e) => `- ${e}`), '');
    if (s.warnings.length) lines.push('**For the editor**', '', ...s.warnings.map((w) => `- ${w}`), '');
  }
  if (strayInReport.length) lines.push('### ❌ Misplaced files', '', ...strayInReport.map((e) => `- ${e}`), '');
  lines.push('<sub>Checked by `scripts/check-submissions.mjs`. The editor can change any field in review; merging is publication.</sub>');
}
const report = lines.join('\n');

if (reportPath && report) writeFileSync(reportPath, `${report}\n`);
console.log(report || `No changed submissions to report. ${stories.length} submission(s) checked.`);
if (!report && changed) {
  // Still surface errors in stories outside this change.
  for (const s of stories) for (const e of s.errors) console.error(`${s.dir}: ${e}`);
  for (const e of stray) console.error(e.msg);
}
if (totalErrors) {
  console.error(`\n${totalErrors} error(s) in submissions.`);
  process.exit(1);
}
