import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fingerprint, safeUrl } from './catalog.mjs';
import { featureKeys, facetKeys } from '../../assets/js/edge-explorer/core.mjs';

const root = new URL('../../_data/edge_catalog/', import.meta.url);
const json = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'));
const [inventory, meta, paper, curated, official] = await Promise.all(['inventory.json', 'source.json', 'paper.json', 'curated.json', 'official.json'].map(json));
const summaries = Object.fromEntries((await readFile(new URL('summaries.tsv', root), 'utf8')).trim().split('\n').map(line => { const [id, ...rest] = line.split('\t'); return [id, rest.join('\t')]; }));
const categories = ['simulators', 'engines', 'networks', 'hardware', 'benchmarks', 'tools', 'applications', 'edge-ai', 'institutions', 'resources'];
const sources = {};
for (let i = 1; i <= 5; i++) sources[`paper-${i}`] = { kind: 'paper', table: ['I', 'II', 'III', 'IV', 'V'][i - 1], date: meta.paperDate, url: `${meta.paper}#S${i + 1}.T${i}` };
for (const [repo, doc] of Object.entries(official)) if (doc.url) sources[`official:${repo}`] = { kind: 'official', date: doc.retrievedAt, url: doc.url, version: doc.blobSha };
const referenceIds = new Set(['awesome-pcaptools', 'webassembly-curated-list-of-awesome-things-regarding-webassembly-wasm-ecosystem', 'neural-network-accelerator-comparison']);
function category(entry) {
  if (entry.section === 'Frameworks') return entry.subsection === 'Networks' ? 'networks' : entry.subsection === 'Edge AI Hardware Products' ? 'hardware' : 'engines';
  return { Simulators: 'simulators', 'Test (data, benchmark)': 'benchmarks', Tools: 'tools', Applications: 'applications', 'Edge-AI frameworks': 'edge-ai', 'Academic institutions': 'institutions', 'Other awesome list': 'resources' }[entry.section];
}
const normalizeName = text => text.replace(/\[[\d,\s]+\]/g, '').replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim().toLowerCase();
function paperRows(entry) {
  const names = curated[entry.id]?.paperNames || [entry.name];
  return paper.flatMap((table, index) => {
    const rowIndex = table.rows.findIndex((row, i) => i > 0 && names.some(name => normalizeName(row.cells[0]) === normalizeName(name)));
    if (rowIndex < 0) return [];
    const cells = table.rows[rowIndex].cells;
    const fields = table.rows[0].cells.slice(1).map((name, i) => ({ name: name.replace(/\d+footnotemark:.*/g, '').replace(/ \(Or Optimization Target\).*$/, '').trim(), value: (cells[i + 1] || '').replace(/\d+footnotemark:\s*\d+/g, '') })).filter(f => f.name !== 'Statistics');
    // MathML text extraction drops superscript positioning; preserve powers explicitly.
    if (entry.id === 'peersim') for (const f of fields) f.value = f.value.replace('> 107', '> 10^7').replace('and 105', 'and 10^5');
    return [{ table: index + 1, row: rowIndex, name: cells[0], fields }];
  });
}
const ruleSets = {
  paradigm: { Cloud: /cloud/i, Edge: /edge/i, Fog: /fog/i, Mist: /mist/i, Serverless: /serverless|FaaS/i, 'In-network': /in-network/i, Networking: /networking/i, Grid: /\bgrid\b/i, P2P: /P2P|peer-to-peer/i, IoT: /\bIoT\b/i },
  scenario: { Vehicular: /V2X|vehicl/i, Satellite: /satellite/i, Mobility: /mobil|movement/i, Streaming: /stream/i, IoT: /\bIoT\b/i },
  protocol: { NDN: /\bNDN\b/, SDN: /\bSDN\b/, '5G': /\b5G\b/, '4G': /\b4G\b/, WiFi: /WiFi|WLAN|802\.11/i, HTTP: /\bHTTP\b/i, WSN: /\bWSN\b/, '6LoWPAN': /6LoWPAN/i, '6TiSCH': /6TiSCH/i, DTN: /\bDTN\b/, 'TCP/IP model': /TCP\/IP/, 'Abstract network': /abstract model|data flows \(no specific protocols\)/i },
  resource: { CPU: /CPU|MIPS|FLOPs/i, GPU: /\bGPU\b/, Memory: /RAM|memory/i, Storage: /disk|storage/i, Network: /network|bandwidth|\bBW\b/i, Energy: /energy|power/i, Containers: /container/i, 'Virtual machines': /virtual machine|\bVMs?\b/i },
  metric: { Latency: /latenc|delay|execution time|response time/i, Throughput: /throughput/i, Bandwidth: /bandwidth|link capacity/i, 'Packet loss': /packet loss/i, 'Energy consumption': /energy|power consumption/i, 'Resource utilization': /resource(s)? (usage|utilization)|CPU.*usage/i, 'Task success': /task(s)? (success|failure)/i, 'Cache hit': /cache hit/i, Jitter: /jitter/i },
  scheduling: { 'User-defined': /user[- ]defined/i, 'Round robin': /round robin/i, 'First fit': /first fit/i, FCFS: /FCFS/, Priority: /priority/i, 'Energy-aware': /energy-aware/i, 'Mobility-aware': /mobility-aware/i, 'Shortest path': /shortest path/i }
};
function buildTool(entry) {
  const c = curated[entry.id] || {}, cat = category(entry);
  if (!cat) throw new Error(`Unmapped source category: ${entry.section} / ${entry.subsection}`);
  if (!summaries[entry.id]) throw new Error(`Missing reviewed Chinese summary: ${entry.id}`);
  const reference = ['institutions', 'resources'].includes(cat) || referenceIds.has(entry.id);
  const tool = { id: entry.id, name: c.name || entry.name, aliases: [...new Set([...(c.aliases || []), ...(c.name ? [entry.name] : [])])], url: c.url || entry.url, description: entry.description, summary: { en: c.summaryEn || entry.description.split(/(?<=[.!?])\s/)[0] || entry.name, zh: summaries[entry.id] }, comparable: !reference, facets: { category: [cat] }, claims: [], features: Object.fromEntries(featureKeys.map(k => [k, { status: reference ? 'not-applicable' : 'unknown' }])), source: { kind: 'readme', date: meta.retrievedAt, url: `${meta.repository}/blob/${meta.commit}/README.md#L${entry.line}-L${entry.endLine}` }, paper: paperRows(entry), notes: c.notes || [], officialChecked: null };
  const add = (facet, value, source, note) => {
    if (!facetKeys.includes(facet) || !value) throw new Error(`Invalid claim ${entry.id}: ${facet}`);
    tool.facets[facet] ||= [];
    if (!tool.facets[facet].includes(value)) tool.facets[facet].push(value);
    tool.claims.push({ facet, value, source, ...(note ? { note } : {}) });
  };
  const documentFeature = (feature, source, note, status = 'supported') => {
    if (!featureKeys.includes(feature) || !['supported', 'unsupported', 'unknown', 'not-applicable'].includes(status)) throw new Error(`Invalid feature ${entry.id}: ${feature} / ${status}`);
    if (['supported', 'unsupported'].includes(status) && !source) throw new Error(`Missing feature evidence: ${entry.id} / ${feature}`);
    tool.features[feature] = { status, source, ...(note ? { note } : {}) };
  };
  if (!reference) {
    const sourcePurpose = c.purpose || (cat === 'simulators' ? 'simulation' : cat === 'engines' ? 'deployment' : cat === 'networks' ? 'networking' : cat === 'benchmarks' ? 'benchmark' : cat === 'tools' ? 'monitoring' : null);
    if (sourcePurpose) for (const p of (Array.isArray(sourcePurpose) ? sourcePurpose : [sourcePurpose])) add('purpose', p, 'readme');
  }
  for (const record of tool.paper) {
    const source = `paper-${record.table}`, values = Object.fromEntries(record.fields.map(f => [f.name, f.value]));
    if (c.paperClaims === false) continue;
    function extract(facet, text) {
      for (const [value, re] of Object.entries(ruleSets[facet] || {})) if (re.test(text)) add(facet, value, source, { en: text, zh: text });
    }
    if (record.table === 1) {
      add('type', record.row <= 11 ? 'packet' : record.row <= 32 ? 'application' : 'emulator', source, { en: 'Primary category in Table I; this is not a guarantee of packet fidelity.', zh: '按论文表 I 的主要类别记录，不能据此保证分组建模精度。' });
      extract('paradigm', values.Paradigms || ''); extract('scenario', `${values.Paradigms}; ${values['Highlights/Scenarios']}`);
      if (values['Core Engines'] !== '-') for (const engine of (values['Core Engines'] || '').split(/,\s*/)) add('engine', engine, source, { en: 'Reported dependency; exposed capabilities still require verification.', zh: '论文记载的依赖关系；实际暴露的能力仍需核实。' });
    }
    if (record.table === 2) { extract('protocol', values.Protocols || ''); extract('resource', `${values.Hardware}; ${values['Granularity & Representation']}`); }
    if (record.table === 3) {
      extract('metric', values.Basic || '');
      const custom = values['Custom (Interfaces)'];
      if (custom && custom !== 'NaF' && !custom.includes('≃')) documentFeature('custom-metrics', source, { en: custom, zh: custom });
    }
    if (record.table === 4) {
      extract('scheduling', values['Scheduling Policies'] || '');
      if (/user[- ]defined/i.test(values['Scheduling Policies'])) documentFeature('custom-scheduling', source, { en: values['Scheduling Policies'], zh: values['Scheduling Policies'] });
    }
    if (record.table === 5) {
      for (const lang of (values.PL || '').split(' ')) add('language', { cpp: 'C++', python: 'Python', java: 'Java', yaml: 'YAML', shell: 'Shell', rust: 'Rust', kotlin: 'Kotlin', matlab: 'MATLAB' }[lang] || lang, source);
      for (const [column, feature] of [['VIS', 'visualization'], ['LOG', 'logging'], ['SCN', 'scenario-scripts']]) if (values[column] === '⚫') documentFeature(feature, source, { en: `Marked in Table V (${column}); consult the cited version for conditions.`, zh: `论文表 V 中 ${column} 列有标记；适用条件以对应版本为准。` });
    }
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
  if (reference) tool.features = Object.fromEntries(featureKeys.map(k => [k, { status: 'not-applicable' }]));
  for (const claim of [...tool.claims, ...Object.values(tool.features)]) if (claim.source && claim.source !== 'readme' && !sources[claim.source]) throw new Error(`Missing source ${claim.source}`);
  if (tool.url && !safeUrl(tool.url)) throw new Error(`Unsafe URL: ${tool.id}`);
  return tool;
}
const tools = inventory.entries.map(buildTool);
const publicData = { schemaVersion: 1, meta: { ...meta, count: tools.length, inventoryHash: fingerprint(inventory.entries), paperCoverage: tools.filter(t => t.paper.length).length }, categories, sources, tools };
const output = JSON.stringify(publicData, null, 2) + '\n';
const destination = new URL('../../assets/data/edge-tools.json', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(destination, 'utf8') !== output) throw new Error('Catalog output is stale. Run npm run catalog:build.');
  console.log(`Catalog verified: ${tools.length} resources; ${publicData.meta.paperCoverage} with survey records.`);
} else { await writeFile(destination, output); console.log(`Wrote ${fileURLToPath(destination)}: ${tools.length} resources; ${publicData.meta.paperCoverage} survey records.`); }
