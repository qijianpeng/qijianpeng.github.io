import MarkdownIt from 'markdown-it';
import { createHash } from 'node:crypto';

const md = new MarkdownIt({ html: false, linkify: false });
export const slug = value => value.toLowerCase().replace(/\+\+/g, 'pp').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const plain = children => (children || []).map(t => t.type === 'softbreak' || t.type === 'hardbreak' ? ' ' : t.type === 'text' || t.type === 'code_inline' ? t.content : '').join('').replace(/\s+/g, ' ').trim();
export function safeUrl(value) {
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; }
}
export function parseReadme(markdown) {
  const tokens = md.parse(markdown, {});
  const entries = [], warnings = [];
  let section = '', subsection = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'heading_open' && token.tag === 'h1') { section = plain(tokens[i + 1].children); subsection = ''; }
    if (token.type === 'heading_open' && token.tag === 'h2') subsection = plain(tokens[i + 1].children);
    if (token.type !== 'list_item_open' || token.level !== 1 || !section || /^(awesome edge computing|star history)$/i.test(section)) continue;
    const end = tokens.findIndex((t, j) => j > i && t.type === 'list_item_close' && t.level === token.level);
    const inline = tokens.slice(i, end).find(t => t.type === 'inline');
    const children = inline?.children || [];
    const linkStart = children.findIndex(t => t.type === 'link_open');
    const linkEnd = children.findIndex((t, j) => j > linkStart && t.type === 'link_close');
    const linked = linkStart >= 0 && linkEnd >= 0;
    const firstText = plain(children);
    const name = linked ? plain(children.slice(linkStart + 1, linkEnd)) : firstText.split(/\s+:\s+/)[0];
    const nestedText = tokens.slice(i, end).filter(t => t.type === 'inline').map(t => plain(t.children)).join(' ');
    const rawUrl = linked ? children[linkStart].attrGet('href') || '' : (nestedText.match(/https?:\/\/[^\s<>]+/) || [''])[0];
    if (!linked) warnings.push({ name, line: token.map[0] + 1, issue: 'Plain-text resource: Primary URL taken from its first nested URL' });
    const description = tokens.slice(i, end).filter(t => t.type === 'inline').map(t => plain(t.children)).join(' ').slice(name.length).replace(/^\s*[:\-–—]+\s*/, '').trim();
    const entry = { id: slug(name), name, url: safeUrl(rawUrl), rawUrl, section, subsection, description, line: token.map[0] + 1, endLine: token.map[1] };
    if (!entry.url) warnings.push({ name, line: entry.line, issue: 'Missing or non-HTTP primary URL', rawUrl });
    entries.push(entry);
  }
  if (new Set(entries.map(x => x.id)).size !== entries.length) throw new Error('Duplicate IDs: Add an explicit alias mapping before importing.');
  return { entries, warnings };
}
export function reconcile(previous, incoming) {
  const used = new Set();
  const entries = incoming.entries.map(e => {
    const old = previous.entries.find(p => !used.has(p.id) && (p.id === e.id || (e.url && p.url === e.url)));
    if (old) used.add(old.id);
    return { ...e, id: old?.id || e.id };
  });
  if (new Set(entries.map(e => e.id)).size !== entries.length) throw new Error('Ambiguous stable IDs: Resolve the source mapping before applying.');
  const changed = entries.filter(e => {
    const p = previous.entries.find(p => p.id === e.id);
    return p && ['name', 'rawUrl', 'section', 'subsection', 'description'].some(k => p[k] !== e[k]);
  }).map(e => e.id);
  return { entries, report: { added: entries.filter(e => !previous.entries.some(p => p.id === e.id)).map(e => e.id), changed, removed: previous.entries.filter(p => !entries.some(e => e.id === p.id)).map(e => e.id), warnings: incoming.warnings } };
}
export const fingerprint = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
