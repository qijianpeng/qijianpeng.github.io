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
test('Every reviewed dimension tag reaches the public filters with its original project source', async () => {
  const review = JSON.parse(await readFile(new URL('../../_data/edge_catalog/verification.json', import.meta.url), 'utf8'));
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  for (const tool of data.tools) {
    const record = review.tools[tool.id];
    assert.match(record.facetReviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(record.facetReviewNote.en && record.facetReviewNote.zh);
    for (const dimension of record.dimensions.filter(Boolean)) {
      for (const [facet, values] of Object.entries(dimension.facets || {})) {
        assert.equal(data.sources[dimension.source]?.kind, 'official');
        for (const value of values) {
          assert.ok(tool.facets[facet]?.includes(value), `${tool.id}: Missing ${facet} / ${value}`);
          assert.ok(tool.claims.some(c => c.facet === facet && c.value === value && c.source === dimension.source));
        }
      }
    }
  }
});
test('Actual catalog restores omitted paradigms and combined requirements without inheriting generic engines', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  const ids = facets => selectTools(data, { ...emptyState(), facets }).map(r => r.tool.id);
  for (const [paradigm, expected] of Object.entries({
    Cloud: ['cloudsim-plus', 'cloudsimpy', 'edgecloudsim', 'fogbed', 'yafs-yet-another-fog-simulator', 'onnx-runtime'],
    Edge: ['edgecloudsim', 'pureedgesim', 'simu5g', 'edgenet', 'nvidia-tensorrt'],
    Fog: ['fogify', 'fogbed', 'mobfogsim', 'yafs-yet-another-fog-simulator'],
    Serverless: ['simfaas', 'nfaas', 'apache-openwhisk', 'wasmedge-runtime'],
    Mist: ['pureedgesim', 'satedgesim', 'areg-sdk'],
    'In-network': ['cfn', 'nfaas', 'rice']
  })) for (const id of expected) assert.ok(ids({ paradigm: [paradigm] }).includes(id), `${paradigm}: ${id}`);
  for (const id of ['edgesimpy', 'yafs-yet-another-fog-simulator']) {
    assert.ok(ids({ category: ['simulators'], paradigm: ['Edge'], language: ['Python'] }).includes(id));
  }
  assert.ok(ids({ paradigm: ['Edge'], resource: ['CPU'], type: ['emulator'] }).includes('simu5g'));
  assert.ok(ids({ paradigm: ['Cloud', 'Fog'], language: ['Python'] }).includes('cloudsimpy'));
  assert.ok(!ids({ paradigm: ['Edge'] }).includes('ns-3'));
  assert.ok(!ids({ protocol: ['UDP'] }).includes('neurosurgeon')); // Still a TODO in the source.
  assert.ok(!ids({ metric: ['Latency'] }).includes('netem')); // Configured impairment is not an output.
  const state = { ...emptyState(), lang: 'zh', facets: { paradigm: ['Mist'], scenario: ['Satellite'] }, compare: ['satedgesim'] };
  assert.deepEqual(readState(writeState(state), data), state);
  assert.deepEqual(ids(state.facets), ['satedgesim']);
});
test('Within-group OR and cross-group AND are applied independently of display language', () => {
  const state = { ...emptyState(), facets: { language: ['Java', 'Python'], protocol: ['NDN'] } };
  assert.deepEqual(selectTools(sample, state).map(r => r.tool.id), ['A', 'B']);
  assert.deepEqual(selectTools(sample, { ...state, lang: 'zh', q: '边缘' }).map(r => r.tool.id), ['A', 'B']);
});
test('Required capabilities always need direct evidence, including legacy shared-link options', () => {
  const state = { ...emptyState(), required: ['visualization', 'logging'] };
  assert.deepEqual(selectTools(sample, state).map(r => r.tool.id), ['A']);
  const results = selectTools(sample, { ...state, includeUnknown: true });
  assert.deepEqual(results.map(r => r.tool.id), ['A']);
  assert.equal(matchTool(sample.tools[3], { ...state, includeUnknown: true }), null);
});
test('Shared state restores filters and comparison; malformed and obsolete values fail safely', () => {
  const state = { ...emptyState(), lang: 'zh', q: '边缘 A', facets: { language: ['Python'] }, required: ['logging'], compare: ['A', 'B'], includeUnknown: true };
  assert.deepEqual(readState(writeState(state), sample), { ...state, includeUnknown: false });
  const legacy = '?lang=zh&state=' + encodeURIComponent(JSON.stringify(state));
  assert.deepEqual(readState(legacy, sample), { ...state, includeUnknown: false });
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
    assert.equal(t.paper, undefined, 'Historical survey rows must not enter the public capability catalog');
  }
  const leaf = data.tools.find(t => t.id === 'leaf');
  assert.deepEqual(leaf.facets.language, ['Java']);
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
  assert.ok(!get('dfaas').facets.engine.includes('Containernet'));
  assert.ok(get('dfaas').facets.engine.includes('Kubernetes'));
  assert.equal(get('clawbox').features['real-code'].status, 'unknown');
  assert.equal(get('faas-sim').features['custom-metrics'].status, 'supported');
  assert.match(get('faas-sim').features.logging.note.en, /NullLogger/);
});
test('Project evidence drives capabilities, with explicit external-tool and configuration conditions', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  assert.equal(data.meta.evidencePolicy, 'project-documentation');
  for (const tool of data.tools) {
    for (const claim of [...tool.claims, ...Object.values(tool.features), ...tool.verification.dimensions.filter(Boolean)]) {
      if (claim.source && claim.source !== 'readme') assert.equal(data.sources[claim.source].kind, 'official', `${tool.id} / ${claim.source}`);
      assert.ok(!/Marked in Table|论文表.*列有标记/.test(JSON.stringify(claim)), tool.id);
    }
  }
  const get = id => data.tools.find(t => t.id === id);
  assert.match(get('ns-3').features.visualization.note.en, /NetAnim.*separate Qt/);
  assert.match(get('ndnsim').features.visualization.note.en, /Python bindings/);
  assert.match(get('omnetpp').features.logging.note.en, /record-eventlog = true/);
  assert.match(get('yafs-yet-another-fog-simulator').features.visualization.note.en, /NetworkX\/Matplotlib/);
  assert.equal(get('simfaas').features['custom-metrics'].status, 'unknown', 'Built-in measurements do not establish an arbitrary metric API');
  assert.ok(!selectTools(data, { ...emptyState(), q: 'SimFaaS', required: ['custom-metrics'] }).some(r => r.tool.id === 'simfaas'));
  assert.equal(selectTools(data, { ...emptyState(), q: 'SimFaaS', required: ['custom-metrics'], includeUnknown: true }).length, 0);
  assert.deepEqual(get('simgrid').facets.type, ['application']);
  assert.equal(get('dfaas').facets.type, undefined, 'Current Kubernetes deployment is not a confirmed emulator');
  assert.ok(get('lightmano').verification.dimensions.every(x => x === null));
});
test('Bilingual dimension search finds documented API details without converting text into capability support', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  assert.ok(selectTools(data, { ...emptyState(), q: 'fogify.metrics.json' }).some(r => r.tool.id === 'fogify'));
  assert.ok(selectTools(data, { ...emptyState(), q: '自定义插桩', lang: 'zh' }).some(r => r.tool.id === 'ns-3'));
  const unverified = tool('Documentation only', {});
  unverified.verification = { dimensions: [{ text: { en: 'Custom scheduling remains unverified.', zh: '自定义调度仍待核实。' } }] };
  assert.equal(matchTool(unverified, { ...emptyState(), required: ['custom-scheduling'] }), null);
});

test('Public catalog uses concrete project descriptions and keeps inaccessible resources honest', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  assert.doesNotMatch(JSON.stringify(data), /unverified|未核实/i);
  const complete = data.tools.filter(t => t.verification.dimensions.every(Boolean));
  assert.equal(complete.length, 209);
  for (const tool of data.tools) {
    if (!tool.verification.dimensions.every(Boolean)) {
      assert.ok(tool.verification.accessNote?.en && tool.verification.accessNote?.zh, tool.id);
      assert.equal(tool.verification.dimensions.filter(Boolean).length, 0, tool.id);
    }
  }
  const get = id => data.tools.find(t => t.id === id);
  assert.match(get('easiei').verification.dimensions[2].text.en, /RemainingCpu.*RemainingMemory/);
  assert.match(get('cloudsim-plus-automation').verification.dimensions[2].text.en, /wall-clock/);
  assert.match(get('wasmer').verification.dimensions[2].text.en, /not measured CPU time/);
  assert.match(get('edgex-foundry').verification.dimensions[2].text.en, /disabled by default/);
  assert.equal(get('nfaas').verification.accessNote, null);
  assert.equal(get('nfaas').features['scenario-scripts'].status, 'supported');
  assert.equal(get('nfaas').features['real-code'].status, 'unknown');
  for (const file of ['../../assets/js/edge-explorer/labels.mjs', '../../assets/js/edge-explorer/app.mjs', '../../_pages/edge-computing.html']) {
    assert.doesNotMatch(await readFile(new URL(file, import.meta.url), 'utf8'), /unverified|未核实/i);
  }
});

test('EasiEI appears in each documented paradigm and ns-3 combination, with component conditions retained', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  for (const paradigm of ['Cloud', 'Fog', 'IoT', 'Edge']) {
    const state = { ...emptyState(), facets: { paradigm: [paradigm], engine: ['ns-3'] }, required: ['custom-scheduling', 'logging'] };
    assert.ok(selectTools(data, state).some(r => r.tool.id === 'easiei'), paradigm);
  }
  const easiei = data.tools.find(t => t.id === 'easiei');
  assert.match(easiei.claims.find(c => c.facet === 'paradigm' && c.value === 'Fog').note.en, /composed fog scenarios/);
  assert.match(easiei.claims.find(c => c.facet === 'paradigm' && c.value === 'IoT').note.en, /Implement InitialMachine/);
});
test('Engine filters include base engines and explicit dependencies without importing baselines or model formats', async () => {
  const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
  const entries = Object.fromEntries(data.tools.map(t => [t.id, t]));
  for (const [id, engine] of [['ns-3', 'ns-3'], ['cloudsim', 'CloudSim'], ['edgecloudsim', 'EdgeCloudSim'], ['ifogsim', 'iFogSim'], ['ifogsim', 'CloudSim'], ['pfogsim', 'EdgeCloudSim'], ['yafs-yet-another-fog-simulator', 'SimPy'], ['edgesimpy', 'Mesa'], ['nndeploy', 'ONNX Runtime']]) {
    assert.ok(selectTools(data, { ...emptyState(), facets: { engine: [engine] } }).some(r => r.tool.id === id), `${id}: ${engine}`);
  }
  assert.ok(!entries.pureedgesim.facets.engine.includes('CloudSim Plus'));
  assert.ok(!entries.komondor.facets.engine.includes('ns-3'));
  assert.ok(!entries.pfogsim.facets.engine.includes('iFogSim'));
  assert.ok(!entries.ncnn.facets.engine.includes('PyTorch'));
});
