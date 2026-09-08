import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, mkdir, cp, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { parseReadme, reconcile, safeUrl } from '../../bin/edge-catalog/catalog.mjs';
import { emptyState, matchTool, selectTools, readState, writeState, normalizeState, toggleCompare, relaxations } from '../../assets/js/edge-explorer/core.mjs';

const fixture = '# Simulators\n- [CloudSim Plus\n  Automation](https://example.com/a_(b)): YAML scenarios.\n- [FogNetSim\\+\\+](https://example.com/fog): Networking.\n  - [Secondary resource](https://example.com/secondary)\n# Tools\n- [OpenVINO](): Inference.\n- vivo dataset (in\n  Chinese) : Resource scheduling.\n  - Dataset: https://example.com/data\n  - Codes: https://example.com/code\n';
test('Markdown AST retains multiline titles, parentheses, escapes, empty links, and nested download URLs without importing secondary links', () => {
  const result = parseReadme(fixture);
  assert.equal(result.entries.length, 4);
  assert.equal(result.entries[0].name, 'CloudSim Plus Automation');
  assert.equal(result.entries[0].url, 'https://example.com/a_(b)');
  assert.equal(result.entries[1].name, 'FogNetSim++');
  assert.equal(result.entries[2].url, null);
  assert.equal(result.entries[3].url, 'https://example.com/data');
  assert.equal(result.entries[3].name, 'vivo dataset (in Chinese)');
  assert.equal(result.warnings.length, 2);
});
test('Source reconciliation keeps stable IDs on renames and does not mutate curated records', () => {
  const old = parseReadme('# Tools\n- [Old name](https://example.com/tool): Original.\n- [Removed](https://example.com/removed): Old.');
  const incoming = parseReadme('# Tools\n- [New name](https://example.com/tool): Updated.\n- [New tool](https://example.com/new): New.');
  const annotations = { 'old-name': { aliases: ['Legacy'], summary: '人工翻译', features: { visualization: 'unknown' } } };
  const before = structuredClone(annotations);
  const { entries, report } = reconcile(old, incoming);
  assert.equal(entries[0].id, 'old-name');
  assert.deepEqual(report.changed, ['old-name']);
  assert.deepEqual(report.removed, ['removed']);
  assert.deepEqual(report.added, ['new-tool']);
  assert.deepEqual(annotations, before);
});
test('Applying a pinned sync updates inventory while preserving curated evidence and translations byte for byte', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'edge-sync-'));
  try {
    const catalog = join(directory, '_data/edge_catalog');
    await mkdir(catalog, { recursive: true });
    await cp(new URL('../../bin/edge-catalog/', import.meta.url), join(directory, 'bin/edge-catalog'), { recursive: true });
    await symlink(fileURLToPath(new URL('../../node_modules/', import.meta.url)), join(directory, 'node_modules'), 'dir');
    const original = parseReadme('# Tools\n- [Original](https://example.com/tool): Original description.');
    const annotations = '{"original":{"aliases":["Legacy"],"notes":[{"zh":"已核实","en":"Verified"}],"features":{"logging":{"status":"supported","source":"official:example"}}}}\n';
    const translation = 'original\t人工翻译\n';
    await writeFile(join(catalog, 'source.json'), '{}');
    await writeFile(join(catalog, 'inventory.json'), JSON.stringify(original));
    await writeFile(join(catalog, 'curated.json'), annotations);
    await writeFile(join(catalog, 'verification.json'), annotations);
    await writeFile(join(catalog, 'summaries.tsv'), translation);
    const incoming = join(directory, 'incoming.md');
    await writeFile(incoming, '# Tools\n- [Renamed](https://example.com/tool): Revised description.');
    execFileSync(process.execPath, [join(directory, 'bin/edge-catalog/sync.mjs'), '--commit', 'a'.repeat(40), '--file', incoming, '--date', '2026-09-08', '--apply']);
    const result = JSON.parse(await readFile(join(catalog, 'inventory.json'), 'utf8'));
    assert.equal(result.entries[0].id, 'original');
    assert.equal(result.entries[0].name, 'Renamed');
    assert.equal(await readFile(join(catalog, 'curated.json'), 'utf8'), annotations);
    assert.equal(await readFile(join(catalog, 'verification.json'), 'utf8'), annotations);
    assert.equal(await readFile(join(catalog, 'summaries.tsv'), 'utf8'), translation);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
const tool = (id, facets, statuses = {}, comparable = true) => ({ id, name: id, aliases: [], summary: { en: 'Edge experiment', zh: '边缘实验' }, comparable, facets, features: Object.fromEntries(Object.entries(statuses).map(([k, status]) => [k, { status }])) });
const sample = { tools: [tool('A', { category: ['simulators'], language: ['Python'], protocol: ['NDN'] }, { visualization: 'supported', logging: 'supported' }), tool('B', { category: ['simulators'], language: ['Java'], protocol: ['NDN'] }, { visualization: 'unknown', logging: 'supported' }), tool('C', { category: ['edge-ai'], language: ['Python'] }, { visualization: 'unsupported', logging: 'supported' }), tool('D', { category: ['resources'], language: ['Python'] }, { visualization: 'not-applicable' }, false)] };
test('Within-group OR and cross-group AND are applied independently of display language', () => {
  const state = { ...emptyState(), facets: { language: ['Java', 'Python'], protocol: ['NDN'] } };
  assert.deepEqual(selectTools(sample, state).map(r => r.tool.id), ['A', 'B']);
  assert.deepEqual(selectTools(sample, { ...state, lang: 'zh', q: '边缘' }).map(r => r.tool.id), ['A', 'B']);
});
test('Every required capability must match; unknown candidates are separate and negative or inapplicable evidence never passes', () => {
  const state = { ...emptyState(), required: ['visualization', 'logging'] };
  assert.deepEqual(selectTools(sample, state).map(r => r.tool.id), ['A']);
  const results = selectTools(sample, { ...state, includeUnknown: true });
  assert.deepEqual(results.map(r => r.tool.id), ['A', 'B']);
  assert.deepEqual(results[1].unknown, ['visualization']);
  assert.equal(results[1].tentative, true);
  assert.equal(matchTool(sample.tools[3], { ...state, includeUnknown: true }), null);
});
test('Shared state restores filters and comparison; malformed and obsolete values fail safely', () => {
  const state = { ...emptyState(), lang: 'zh', q: '边缘 A', facets: { language: ['Python'] }, required: ['logging'], compare: ['A', 'B'], includeUnknown: true };
  assert.deepEqual(readState(writeState(state), sample), state);
  assert.deepEqual(readState('?state=%7Bbad&lang=zh', sample), { ...emptyState(), lang: 'zh' });
  assert.deepEqual(readState('?state=null'), emptyState());
  const cleaned = normalizeState({ compare: ['D', 'A', 'A', 'missing'], facets: { language: ['Imaginary'], nonexistent: ['A'] } }, sample);
  assert.deepEqual(cleaned.compare, ['A']); assert.deepEqual(cleaned.facets, {});
});
test('Comparison enforces four distinct tools, excludes references, and survives changing search conditions', () => {
  const list = ['A', 'B', 'C', 'E', 'F'].map(id => tool(id, {}));
  let state = emptyState(); for (const t of list) state = toggleCompare(state, t);
  assert.deepEqual(state.compare, ['A', 'B', 'C', 'E']);
  assert.equal(toggleCompare(state, sample.tools[3]), state);
  state = { ...state, q: 'No match', lang: 'zh' };
  assert.deepEqual(toggleCompare(state, list[1]).compare, ['A', 'C', 'E']);
});
test('Zero-result suggestions actually increase the candidate count', () => {
  const state = { ...emptyState(), q: 'Impossible term', facets: { language: ['Python'] } };
  assert.equal(selectTools(sample, state).length, 0);
  assert.deepEqual(relaxations(sample, state), [{ kind: 'q', count: 3 }]);
});
test('Catalog exactly covers the pinned README and retains a source for every filter claim and supported feature', async () => {
  const read = file => readFile(new URL(file, import.meta.url), 'utf8');
  const data = JSON.parse(await read('../../assets/data/edge-tools.json'));
  const inventory = JSON.parse(await read('../../_data/edge_catalog/inventory.json'));
  const markdown = await read('../../_data/edge_catalog/README.snapshot.md');
  const snapshot = parseReadme(markdown);
  const sourceItems = markdown.slice(markdown.indexOf('# Simulators')).split('\n').filter(line => /^[-*] /.test(line)).length;
  assert.equal(snapshot.entries.length, sourceItems, 'Every top-level source resource must survive AST import');
  assert.equal(snapshot.entries.length, inventory.entries.length);
  assert.deepEqual(data.tools.map(t => t.id), inventory.entries.map(e => e.id));
  assert.equal(new Set(data.tools.map(t => t.id)).size, data.tools.length);
  for (const t of data.tools) {
    assert.ok(t.summary.en && t.summary.zh && /[\u4e00-\u9fff]/.test(t.summary.zh), t.id);
    assert.ok(safeUrl(t.source.url), t.id);
    for (const claim of [...t.claims, ...Object.values(t.features)]) {
      if (['supported', 'unsupported'].includes(claim.status) || claim.facet) assert.ok(claim.source === 'readme' || data.sources[claim.source], `${t.id}: ${JSON.stringify(claim)}`);
    }
    if (t.paper.length) assert.deepEqual(t.paper.map(r => r.table), [1, 2, 3, 4, 5], t.id);
  }
  const leaf = data.tools.find(t => t.id === 'leaf');
  assert.deepEqual(leaf.facets.language, ['Java']);
  assert.ok(leaf.paper[4].fields.find(f => f.name === 'PL').value.includes('python'));
  const cloudsim = data.tools.find(t => t.id === 'cloudsim');
  assert.equal(cloudsim.features.visualization.status, 'unknown');
  assert.ok(data.tools.find(t => t.id === 'openvino').url.includes('openvinotoolkit'));
});
test('Non-HTTP URLs are never accepted as resource links', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', 'file:///etc/passwd', '/relative', '']) assert.equal(safeUrl(url), null);
  assert.equal(safeUrl('https://example.com'), 'https://example.com/');
});
test('Every resource has five review slots, bilingual source-backed evidence, and honest access outcomes', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  let count = 0;
  for (const tool of data.tools) {
    const review = tool.verification;
    assert.equal(review.dimensions.length, 5, tool.id);
    assert.match(review.date, /^\d{4}-\d{2}-\d{2}$/);
    for (const dimension of review.dimensions.filter(Boolean)) {
      count++;
      assert.ok(dimension.text.en && /[\u4e00-\u9fff]/.test(dimension.text.zh), tool.id);
      assert.ok(review.sources.includes(dimension.source), tool.id);
      const source = data.sources[dimension.source];
      assert.ok(safeUrl(source.url) && source.date && source.version, tool.id);
    }
    if (!review.sources.length) assert.ok(review.accessNote?.en && review.accessNote?.zh, tool.id);
  }
  assert.equal(count, data.meta.dimensionEvidenceCount);
  assert.equal(data.meta.reviewedCount, data.tools.length);
  const get = id => data.tools.find(t => t.id === id);
  assert.equal(get('edgesim').name, 'SimEdgeIntel (EdgeSim)');
  assert.equal(get('edgesim').paper.length, 5);
  assert.ok(!get('dfaas').facets.engine.includes('Containernet'));
  assert.ok(get('dfaas').facets.engine.includes('Kubernetes'));
  assert.equal(get('clawbox').features['real-code'].status, 'unknown');
  assert.equal(get('faas-sim').features['custom-metrics'].status, 'supported');
  assert.match(get('faas-sim').features.logging.note.en, /NullLogger/);
});
test('Bilingual dimension search finds documented API details without converting text into capability support', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  assert.ok(selectTools(data, { ...emptyState(), q: 'fogify.metrics.json' }).some(r => r.tool.id === 'fogify'));
  assert.ok(selectTools(data, { ...emptyState(), q: '自定义插桩', lang: 'zh' }).some(r => r.tool.id === 'ns-3'));
  const unverified = tool('Documentation only', {});
  unverified.verification = { dimensions: [{ text: { en: 'Custom scheduling remains unverified.', zh: '自定义调度仍待核实。' } }] };
  assert.equal(matchTool(unverified, { ...emptyState(), required: ['custom-scheduling'] }), null);
});
