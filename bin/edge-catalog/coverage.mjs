import { readFile, writeFile } from 'node:fs/promises';
import { networkEntries } from '../../assets/js/edge-explorer/core.mjs';
const data = JSON.parse(await readFile(new URL('../../assets/data/edge-tools.json', import.meta.url), 'utf8'));
const escape = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const protocols = [...new Set(data.tools.flatMap(tool => tool.facets.protocol || []))].sort((a, b) => a.localeCompare(b, 'en'));
const count = route => data.tools.flatMap(tool => tool.network.entries).filter(record => record.implementation.route === route).length;
const lines = [
  '# Implementation and source coverage', '',
  `[Snapshot] ${data.meta.evidenceUpdatedAt}. ${data.tools.length} resources, ${data.meta.implementationCount} implementation records, ${protocols.length} network choices and ${data.meta.inheritanceCount} explicit inheritance relationships.`, '',
  `[Scope] This is a register of recorded evidence, not a percentage of all possible capabilities. Direct project records, contributed modules, external services and inherited base modules have separate paths. Documentation/source evidence does not mean the software was installed or its examples reproduced.`, '',
  `[Paths] ${count('builtin')} built-in, ${count('module')} additional-module, ${count('integration')} external-integration and ${count('inherited')} inherited records.`, '',
  '[Review] The September 10 routing pass compared BGP/OSPF/RIP providers across ns-3 DCE/Quagga, Mininet/IPMininet, CORE, Kathará and OMNeT++/INET. It also reviewed INET version changes and the ns-3 baselines used by EasiEI, MEC-simulator, ns3-ai, ns3-gym and ndnSIM. Existing protocol records retain their earlier evidence dates. This pass does not assert exhaustive plugin discovery.', '',
  '[Inheritance] Base profiles retain their own source revision and available modules. A derived tool can match those modules while its default application uses a different network model. External modules such as DCE/Quagga do not become bundled components of every fork. The EasiEI fork has Wi-Fi through 802.11ax and retains WAVE/WiMAX; newer upstream Zigbee or 802.11be records are not copied into it.', '',
  '## Capability-first index', '',
  '| Network model / protocol | Recorded tools | Implementations and evidence |',
  '| --- | ---: | --- |'
];
for (const protocol of protocols) {
  const tools = data.tools.filter(tool => tool.facets.protocol?.includes(protocol));
  const paths = tools.flatMap(tool => networkEntries(tool).filter(record => record.values.includes(protocol)).map(record => `[${escape(record.implementation.chain.map(node => node.name).join(' → '))}](${data.sources[record.source].url}) (${record.implementation.route}; ${record.scope}; ${record.implementation.lifecycle})`));
  lines.push(`| ${escape(protocol)} | ${tools.length} | ${paths.join('; ')} |`);
}
lines.push('', '## Source checks by resource', '', '| Resource | Checks logged | Sources examined |', '| --- | --- | --- |');
for (const tool of data.tools) lines.push(`| ${escape(tool.name)} | ${[...new Set(tool.network.coverage.map(group => group.area))].join(', ')} | ${tool.network.reviewedSources.map(id => `[${escape(data.sources[id].title || id)}](${data.sources[id].url})`).join('; ') || escape(tool.network.summary.en)} |`);
lines.push('', '## Maintaining this register', '',
  'Run `npm run catalog:build`, `npm run catalog:coverage`, and `npm run test:catalog` after an evidence update. `npm run catalog:coverage -- --check` rejects an out-of-date register.', '',
  'For each capability correction, search the project, its base version, module catalogs, adapters, examples, and the same capability in peer tools. Record the implementation provider, source revision, installation conditions and evidence type. Track a specific access failure as an access note. A missing capability record is not a negative support claim.', '',
  'The page offers a GitHub issue form for source-backed additions. Opening the form does not submit it. Runtime evidence requires the exact environment and a result/log artifact; catalog and browser tests validate the website only.', '');
const output = lines.join('\n');
const path = new URL('../../docs/edge-implementation-coverage.md', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(path, 'utf8') !== output) throw new Error('Implementation coverage register is stale.');
  console.log('Implementation coverage register verified.');
} else {
  await writeFile(path, output);
  console.log(`Wrote coverage register: ${protocols.length} network choices, ${data.meta.inheritanceCount} inheritance relationships.`);
}
