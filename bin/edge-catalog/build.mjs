import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fingerprint, safeUrl } from './catalog.mjs';
import { featureKeys, facetKeys } from '../../assets/js/edge-explorer/core.mjs';

const root = new URL('../../_data/edge_catalog/', import.meta.url);
const json = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'));
const [inventory, meta, curated, official, verification] = await Promise.all(['inventory.json', 'source.json', 'curated.json', 'official.json', 'verification.json'].map(json));
const summaries = Object.fromEntries((await readFile(new URL('summaries.tsv', root), 'utf8')).trim().split('\n').map(line => { const [id, ...rest] = line.split('\t'); return [id, rest.join('\t')]; }));
const categories = ['simulators', 'engines', 'networks', 'hardware', 'benchmarks', 'tools', 'applications', 'edge-ai', 'institutions', 'resources'];
const sources = {};
for (const [repo, doc] of Object.entries(official)) if (doc.url) sources[`official:${repo}`] = { kind: 'official', date: doc.retrievedAt, url: doc.url, version: doc.blobSha };
Object.assign(sources, verification.sources);
for (const [id, source] of Object.entries(sources)) if (!safeUrl(source.url) || !source.date) throw new Error(`Invalid evidence source: ${id}`);
const referenceIds = new Set(['awesome-pcaptools', 'webassembly-curated-list-of-awesome-things-regarding-webassembly-wasm-ecosystem', 'neural-network-accelerator-comparison']);
function category(entry) {
  if (entry.section === 'Frameworks') return entry.subsection === 'Networks' ? 'networks' : entry.subsection === 'Edge AI Hardware Products' ? 'hardware' : 'engines';
  return { Simulators: 'simulators', 'Test (data, benchmark)': 'benchmarks', Tools: 'tools', Applications: 'applications', 'Edge-AI frameworks': 'edge-ai', 'Academic institutions': 'institutions', 'Other awesome list': 'resources' }[entry.section];
}
function buildTool(entry) {
  const c = curated[entry.id] || {}, cat = category(entry);
  if (!cat) throw new Error(`Unmapped source category: ${entry.section} / ${entry.subsection}`);
  if (!summaries[entry.id]) throw new Error(`Missing reviewed Chinese summary: ${entry.id}`);
  const reference = ['institutions', 'resources'].includes(cat) || referenceIds.has(entry.id);
  const tool = { id: entry.id, name: c.name || entry.name, aliases: [...new Set([...(c.aliases || []), ...(c.name ? [entry.name] : [])])], url: c.url || entry.url, description: entry.description, summary: { en: c.summaryEn || entry.description.split(/(?<=[.!?])\s/)[0] || entry.name, zh: summaries[entry.id] }, comparable: !reference, facets: { category: [cat] }, claims: [], features: Object.fromEntries(featureKeys.map(k => [k, { status: reference ? 'not-applicable' : 'unknown' }])), source: { kind: 'readme', date: meta.retrievedAt, url: `${meta.repository}/blob/${meta.commit}/README.md#L${entry.line}-L${entry.endLine}` }, notes: c.notes || [], officialChecked: null };
  const projectSource = source => sources[source]?.kind === 'official';
  const add = (facet, value, source, note) => {
    if (source !== 'readme' && !sources[source]) throw new Error(`Missing claim source: ${entry.id} / ${source}`);
    if (source !== 'readme' && !projectSource(source)) return;
    if (!facetKeys.includes(facet) || !value) throw new Error(`Invalid claim ${entry.id}: ${facet}`);
    tool.facets[facet] ||= [];
    if (!tool.facets[facet].includes(value)) tool.facets[facet].push(value);
    tool.claims.push({ facet, value, source, ...(note ? { note } : {}) });
  };
  const documentFeature = (feature, source, note, status = 'supported') => {
    if (source && source !== 'readme' && !sources[source]) throw new Error(`Missing feature source: ${entry.id} / ${source}`);
    if (!projectSource(source)) return;
    if (!featureKeys.includes(feature) || !['supported', 'unsupported', 'unknown', 'not-applicable'].includes(status)) throw new Error(`Invalid feature ${entry.id}: ${feature} / ${status}`);
    if (['supported', 'unsupported'].includes(status) && !source) throw new Error(`Missing feature evidence: ${entry.id} / ${feature}`);
    // Keep archival absence-of-evidence notes in the manual file, not the public description.
    tool.features[feature] = status === 'unknown' ? { status } : { status, source, ...(note ? { note } : {}) };
  };
  if (!reference) {
    const sourcePurpose = c.purpose || (cat === 'simulators' ? 'simulation' : cat === 'engines' ? 'deployment' : cat === 'networks' ? 'networking' : cat === 'benchmarks' ? 'benchmark' : cat === 'tools' ? 'monitoring' : null);
    if (sourcePurpose) for (const p of (Array.isArray(sourcePurpose) ? sourcePurpose : [sourcePurpose])) add('purpose', p, 'readme');
  }
  for (const facet of c.clearFacets || []) { delete tool.facets[facet]; tool.claims = tool.claims.filter(x => x.facet !== facet); }
  for (const claim of c.claims || []) {
    add(claim.facet, claim.value, claim.source || 'readme', claim.note);
    if (claim.source?.startsWith('official:')) tool.officialChecked ||= claim.source;
  }
  for (const [feature, claim] of Object.entries(c.features || {})) {
    documentFeature(feature, claim.source || 'readme', claim.note, claim.status || 'supported');
    if (claim.source?.startsWith('official:')) tool.officialChecked ||= claim.source;
  }
  const review = verification.tools[entry.id];
  tool.verification = review ? { date: review.date, dimensions: review.dimensions.map(record => record && projectSource(record.source) ? record : null), sources: review.sources.filter(projectSource), accessNote: review.accessNote || (review.sources.length && !review.sources.some(projectSource) ? { en: "Direct project documentation has not yet been recovered. Historical research records are excluded from capability judgments.", zh: "尚未找到可核对的项目直接资料；历史研究记录不用于判断工具能力。" } : null) } : null;
  if (review) {
    if (!review.date || !Array.isArray(review.sources)) throw new Error(`Invalid review metadata: ${entry.id}`);
    if (review.dimensions.length !== 5) throw new Error(`Expected five review dimensions: ${entry.id}`);
    for (const source of review.sources) if (!sources[source]) throw new Error(`Unknown review source: ${entry.id} / ${source}`);
    for (const record of review.dimensions) if (record && (!record.text?.en || !record.text?.zh || !sources[record.source])) throw new Error(`Invalid dimension evidence: ${entry.id}`);
    for (const facet of review.clearFacets || []) { delete tool.facets[facet]; tool.claims = tool.claims.filter(x => x.facet !== facet); }
    for (const claim of review.claims || []) add(claim.facet, claim.value, claim.source, claim.note);
    for (const [key, claim] of Object.entries(review.features || {})) documentFeature(key, claim.source, claim.note, claim.status);
    tool.notes.push(...(review.notes || []));
    if (review.sources.some(projectSource)) tool.officialChecked = review.sources.find(projectSource);
  }
  if (reference) tool.features = Object.fromEntries(featureKeys.map(k => [k, { status: 'not-applicable' }]));
  for (const claim of [...tool.claims, ...Object.values(tool.features)]) if (claim.source && claim.source !== 'readme' && !sources[claim.source]) throw new Error(`Missing source ${claim.source}`);
  if (tool.url && !safeUrl(tool.url)) throw new Error(`Unsafe URL: ${tool.id}`);
  return tool;
}
const tools = inventory.entries.map(buildTool);
const publicData = { schemaVersion: 1, meta: { ...meta, evidenceUpdatedAt: verification.date, count: tools.length, inventoryHash: fingerprint(inventory.entries), evidencePolicy: 'project-documentation', reviewedCount: tools.filter(t => t.verification).length, dimensionEvidenceCount: tools.reduce((sum, tool) => sum + (tool.verification?.dimensions.filter(Boolean).length || 0), 0), accessIssueCount: tools.filter(t => t.verification?.accessNote).length }, categories, sources: Object.fromEntries(Object.entries(sources).filter(([, source]) => source.kind === 'official')), tools };
const output = JSON.stringify(publicData, null, 2) + '\n';
const destination = new URL('../../assets/data/edge-tools.json', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(destination, 'utf8') !== output) throw new Error('Catalog output is stale. Run npm run catalog:build.');
  console.log(`Catalog verified: ${tools.length} resources; Project documentation evidence only.`);
} else { await writeFile(destination, output); console.log(`Wrote ${fileURLToPath(destination)}: ${tools.length} resources; Project documentation evidence only.`); }
