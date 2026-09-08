import { readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { parseReadme, reconcile } from './catalog.mjs';

const { values } = parseArgs({ options: { commit: { type: 'string' }, apply: { type: 'boolean' }, file: { type: 'string' }, date: { type: 'string' } } });
if (!/^[a-f0-9]{40}$/.test(values.commit || '')) throw new Error('Use --commit with a full, reviewed Git commit SHA.');
const root = new URL('../../_data/edge_catalog/', import.meta.url);
const meta = JSON.parse(await readFile(new URL('source.json', root), 'utf8'));
const previous = JSON.parse(await readFile(new URL('inventory.json', root), 'utf8').catch(() => '{"entries":[]}'));
let markdown;
if (values.file) markdown = await readFile(values.file, 'utf8');
else {
  const response = await fetch(`https://raw.githubusercontent.com/qijianpeng/awesome-edge-computing/${values.commit}/README.md`);
  if (!response.ok) throw new Error(`README request failed: ${response.status}`);
  markdown = await response.text();
}
const parsed = parseReadme(markdown);
if (parsed.entries.length === 0 || parsed.entries.length < previous.entries.length * 0.5) throw new Error('Unexpectedly small inventory: Review the Markdown structure before syncing.');
const result = reconcile(previous, parsed);
console.log(JSON.stringify({ commit: values.commit, count: result.entries.length, ...result.report, applied: Boolean(values.apply) }, null, 2));
if (values.apply) {
  // Curated annotations are intentionally a separate file and never written here.
  await writeFile(new URL('README.snapshot.md', root), markdown);
  await writeFile(new URL('inventory.json', root), JSON.stringify({ entries: result.entries, warnings: parsed.warnings }, null, 2) + '\n');
  await writeFile(new URL('source.json', root), JSON.stringify({ ...meta, commit: values.commit, retrievedAt: values.date || new Date().toISOString().slice(0, 10) }, null, 2) + '\n');
}
