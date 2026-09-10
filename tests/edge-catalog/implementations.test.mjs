import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { emptyState, selectTools, networkEntries, networkValues, normalizeState, readState, writeState, relaxations, contributionUrl, implementationRoutes, evidenceKinds } from '../../assets/js/edge-explorer/core.mjs';
import { resolveInheritance } from '../../bin/edge-catalog/inheritance.mjs';
const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
const get = id => data.tools.find(tool => tool.id === id);
const ids = (protocol, options = {}) => selectTools(data, { ...emptyState(), facets: { protocol: [protocol] }, ...options }).map(result => result.tool.id);

test('BGP matches documented providers, with historical and additional-install options applied to the matching path', () => {
  for (const id of ['ns-3', 'minnet', 'omnetpp', 'core', 'kathar']) assert.ok(ids('BGP').includes(id), id);
  assert.ok(!ids('BGP', { includeHistorical: false }).includes('ns-3'));
  assert.ok(ids('BGP', { includeHistorical: false }).includes('omnetpp'), 'Current INET route survives hiding historical Quagga');
  assert.ok(!ids('BGP', { networkMode: 'builtin' }).includes('ns-3'), 'Native TCP must not satisfy the additional BGP path');
  assert.ok(!ids('BGP').includes('easiei'), 'A fork does not bundle DCE/Quagga automatically');
  const bgp = get('ns-3').network.entries.find(e => e.values.includes('BGP'));
  assert.deepEqual(bgp.implementation.chain.map(x => x.name), ['NS-3', 'DCE', 'Quagga integration']);
  assert.equal(bgp.scope, 'runtime');
  assert.equal(bgp.implementation.lifecycle, 'historical');
  assert.ok(bgp.additionalSources.some(source => data.sources[source].url.endsWith('quagga-helper.h')));
});

test('EasiEI inherits versioned ns-3 modules with distinct provenance and a source for the relationship', () => {
  for (const protocol of ['TCP', 'WiFi', 'LTE', 'AODV', '6LoWPAN', 'IEEE 802.11p', 'WiMAX', 'TCP BBR']) {
    assert.ok(ids(protocol).includes('easiei'), protocol);
    assert.ok(ids(protocol, { networkMode: 'builtin' }).includes('easiei'), protocol);
  }
  const inherited = get('easiei').network.entries.filter(e => e.implementation.route === 'inherited');
  assert.ok(inherited.length > 5);
  assert.ok(inherited.every(e => e.additionalSources.length && e.inheritanceNote.en && e.inheritanceNote.zh));
  assert.ok(inherited.every(e => e.implementation.version.includes('e965728')));
  assert.ok(!networkValues(get('easiei')).includes('Zigbee'));
  assert.ok(!networkValues(get('easiei')).includes('IEEE 802.11be'));
  assert.ok(ids('IEEE 802.11be').includes('ns3-gym'), 'A different documented base version can include newer models');
  assert.ok(!ids('IEEE 802.11p').includes('ns3-gym'), 'Do not carry the removed WAVE module into the 3.40 profile');
});

test('New options, protocol aliases, language and shortlist survive share and browser history serialization', () => {
  const state = { ...emptyState(), lang: 'zh', networkMode: 'builtin', includeHistorical: false, facets: { protocol: ['WiFi', 'TCP'] }, compare: ['easiei', 'ns-3'] };
  assert.deepEqual(readState(writeState(state), data), state);
  assert.equal(readState('?lang=en&state=' + encodeURIComponent(JSON.stringify({ facets: { protocol: ['BGP-4'] } })), data).facets.protocol[0], 'BGP');
  assert.equal(normalizeState({ networkMode: '<script>', includeHistorical: 'false' }).networkMode, 'all');
  assert.equal(normalizeState({}).includeHistorical, true);
  for (const q of ['bgpd', '边界网关协议', 'DCE', 'IPMininet']) assert.ok(selectTools(data, { ...emptyState(), q }).length > 0, q);
});

test('Zero-result recovery can restore an excluded implementation path', () => {
  const state = { ...emptyState(), facets: { protocol: ['BGP'], engine: ['ns-3'] }, includeHistorical: false };
  assert.equal(selectTools(data, state).length, 0);
  assert.ok(relaxations(data, state).some(option => option.kind === 'includeHistorical' && option.count > 0));
  const builtin = { ...state, includeHistorical: true, networkMode: 'builtin' };
  assert.ok(relaxations(data, builtin).some(option => option.kind === 'networkMode' && option.count > 0));
});

test('Every implementation has independent delivery, network role, evidence and version; coverage is a source log', () => {
  const all = new Set();
  for (const tool of data.tools) {
    assert.ok(tool.network.coverage.length);
    for (const e of tool.network.entries) {
      assert.ok(!all.has(e.id), e.id); all.add(e.id);
      assert.ok(implementationRoutes.includes(e.implementation.route));
      assert.ok(evidenceKinds.includes(e.implementation.evidence.kind));
      assert.ok(e.implementation.version);
      assert.ok(data.sources[e.implementation.evidence.source]);
      assert.ok(e.implementation.chain.every(node => /^https?:/.test(node.url) && node.name));
      assert.notEqual(e.scope, 'extension');
      if (e.implementation.evidence.kind === 'reproduced') assert.ok(e.implementation.evidence.run.artifact);
    }
    for (const group of tool.network.coverage) assert.ok(group.sources.every(source => tool.network.reviewedSources.includes(source)));
  }
  assert.equal(all.size, data.meta.implementationCount);
});

test('Inheritance rejects cycles and duplicate links instead of recursively claiming all upstream capabilities', () => {
  const profile = parent => ({ parent, version: '1.0', entries: [{ id: 'tcp', values: ['TCP'], source: 'source' }] });
  const relation = (tool, p) => ({ tool, profile: p, source: 'source', note: { en: 'Base', zh: '基础' } });
  const inventory = [{ id: 'a' }, { id: 'b' }];
  assert.throws(() => resolveInheritance({}, { profiles: { x: profile('b'), y: profile('a') }, relationships: [relation('a', 'x'), relation('b', 'y')] }, inventory), /cycle/);
  const network = { tools: { a: { entries: [], reviewedSources: [], coverage: [] } } };
  assert.throws(() => resolveInheritance(network, { profiles: { x: profile('b') }, relationships: [relation('a', 'x'), relation('a', 'x')] }, inventory), /Duplicate/);
});

test('Contribution links prefill project context without submitting or creating an issue', () => {
  const url = new URL(contributionUrl({ id: 'x', name: 'A & B\n<test>' }));
  assert.equal(url.origin, 'https://github.com');
  assert.equal(url.pathname, '/qijianpeng/qijianpeng.github.io/issues/new');
  assert.equal(url.searchParams.get('template'), 'edge-capability.yml');
  assert.equal(url.searchParams.get('project'), 'A & B\n<test> (x)');
  assert.equal(networkEntries(get('omnetpp'), { networkMode: 'builtin' }).length, 0);
});
