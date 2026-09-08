import { emptyState, readState, writeState, selectTools, toggleCompare, relaxations, featureKeys } from './core.mjs';
import { ui, groups, features, terms, dimensions, columns } from './labels.mjs';

const root = document.getElementById('edge-explorer');
const $ = selector => root.querySelector(selector);
const h = (tag, attrs = {}, ...children) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) if (value !== undefined && value !== null && value !== false) element.setAttribute(key, value === true ? '' : String(value));
  for (const child of children.flat(Infinity)) if (child !== null && child !== undefined) element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  return element;
};
let data, state = readState(location.search), visibleLimit = 24, comparisonOpen = state.compare.length > 0;
const openGroups = new Set(['type', 'purpose', 'language', 'required']);
const t = key => ui[state.lang][key] || key;
const localized = value => typeof value === 'object' && value !== null ? value[state.lang] || value.en || '' : value || '';
const label = value => terms[value]?.[state.lang === 'zh' ? 1 : 0] || value;
const groupLabel = key => groups[key]?.[state.lang === 'zh' ? 1 : 0] || key;
const featureLabel = key => features[key]?.[state.lang === 'zh' ? 1 : 0] || key;
const safeLink = value => { try { return ['https:', 'http:'].includes(new URL(value).protocol) ? value : null; } catch { return null; } };
const link = (text, url, className) => safeLink(url) ? h('a', { href: url, target: '_blank', rel: 'noopener noreferrer', class: className }, text) : h('span', { class: className }, text);
function sourceLink(tool, id) {
  const source = id === 'readme' ? tool.source : data.sources[id];
  if (!source) return h('span', { class: 'ee-source' }, t('unknown'));
  const name = source.kind === 'paper' ? `${state.lang === 'zh' ? '论文表' : 'Table'} ${source.table || ''}` : source.kind === 'official' ? (state.lang === 'zh' ? '官方资料' : 'Official docs') : 'README';
  return link(`${name} · ${source.date}`, source.url, 'ee-source');
}
function translateShell() {
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === state.lang)));
  $('#ee-search').placeholder = t('placeholder');
  document.title = state.lang === 'zh' ? '边缘计算工具选型 | 齐建鹏' : 'Edge Computing Tool Explorer | Jianpeng Qi';
}
function update(next, options = {}) {
  state = next; visibleLimit = 24;
  const target = `${location.pathname}${writeState(state)}`;
  if (target !== `${location.pathname}${location.search}`) history[options.replace ? 'replaceState' : 'pushState'](null, '', target);
  render(options);
}
function removeFilter(kind, key, value) {
  if (kind === 'q') return update({ ...state, q: '' });
  if (kind === 'required') return update({ ...state, required: state.required.filter(v => v !== value) });
  if (kind === 'unknown') return update({ ...state, includeUnknown: false });
  const facets = { ...state.facets, [key]: state.facets[key].filter(v => v !== value) };
  if (!facets[key].length) delete facets[key];
  update({ ...state, facets });
}
function chip(text, kind, key = '', value = '') { return h('button', { type: 'button', class: 'ee-chip', 'data-remove-filter': kind, 'data-key': key, 'data-value': value, 'aria-label': `${t('remove')} ${text}` }, `${text} ×`); }
function renderCategories() {
  const withoutCategory = { ...state, facets: { ...state.facets } }; delete withoutCategory.facets.category;
  const matches = selectTools(data, withoutCategory);
  const max = Math.max(1, ...data.categories.map(c => matches.filter(m => m.tool.facets.category.includes(c)).length));
  $('#ee-categories').replaceChildren(...data.categories.map(category => {
    const count = matches.filter(m => m.tool.facets.category.includes(category)).length;
    const bar = h('span'); bar.style.width = `${count / max * 100}%`;
    return h('button', { type: 'button', class: 'ee-category', 'data-category': category, id: `ee-category-${category}`, 'aria-pressed': String((state.facets.category || []).includes(category)) }, h('span', { class: 'ee-category-label' }, h('span', {}, label(category)), h('strong', {}, count)), h('span', { class: 'ee-category-bar', 'aria-hidden': true }, bar));
  }));
}
function renderFilters() {
  const nodes = [];
  for (const key of ['type', 'purpose', 'language', 'paradigm', 'scenario', 'engine', 'protocol', 'resource', 'metric', 'scheduling', 'platform']) {
    const values = [...new Set(data.tools.flatMap(tool => tool.facets[key] || []))].sort((a, b) => label(a).localeCompare(label(b), state.lang));
    if (!values.length) continue;
    const options = values.map((value, index) => {
      const count = data.tools.filter(tool => tool.facets[key]?.includes(value)).length;
      return h('label', { class: 'ee-option' }, h('input', { type: 'checkbox', id: `ee-filter-${key}-${index}`, 'data-facet': key, value, checked: state.facets[key]?.includes(value) }), h('span', {}, label(value)), h('span', { class: 'ee-option-count', 'aria-hidden': true }, count));
    });
    nodes.push(h('details', { class: 'ee-filter-group', 'data-group': key, open: openGroups.has(key) }, h('summary', {}, groupLabel(key)), h('p', { class: 'ee-group-help' }, groups[key][state.lang === 'zh' ? 3 : 2]), h('div', { class: 'ee-filter-options' }, options)));
  }
  const required = h('details', { class: 'ee-filter-group', 'data-group': 'required', open: openGroups.has('required') }, h('summary', {}, t('required')), h('p', { class: 'ee-group-help' }, t('requiredHelp')), h('div', { class: 'ee-filter-options' }, featureKeys.map(key => h('label', { class: 'ee-option' }, h('input', { type: 'checkbox', id: `ee-feature-${key}`, 'data-feature': key, checked: state.required.includes(key) }), featureLabel(key)))));
  nodes.splice(3, 0, required);
  nodes.push(h('label', { class: 'ee-option ee-unknown-option' }, h('input', { type: 'checkbox', id: 'ee-include-unknown', checked: state.includeUnknown }), t('includeUnknown')));
  $('#ee-filters').replaceChildren(...nodes);
}
function featureStatus(tool, key) {
  const claim = tool.features[key] || { status: 'unknown' };
  return h('div', { class: 'ee-feature-row' }, h('span', {}, featureLabel(key)), h('span', { class: 'ee-status', 'data-status': claim.status }, t(claim.status)), claim.source ? sourceLink(tool, claim.source) : null, claim.note ? h('p', { class: 'ee-note' }, localized(claim.note)) : null);
}
function paperDetails(tool) {
  if (!tool.paper.length) return [];
  return [h('h4', {}, t('snapshot')), h('p', { class: 'ee-note' }, state.lang === 'zh' ? '以下保留论文英文原始字段以便核对；未记录项不表示不支持。规模数字只对应原文实验条件。' : 'Original survey fields are preserved for verification. Missing entries do not mean unsupported. Scale figures apply only to the reported experiment.'), ...tool.paper.map(record => h('details', { class: 'ee-details' }, h('summary', {}, dimensions[record.table - 1][state.lang === 'zh' ? 1 : 0], sourceLink(tool, `paper-${record.table}`)), h('dl', {}, record.fields.map(field => [h('dt', {}, columns[field.name]?.[state.lang === 'zh' ? 1 : 0] || field.name), h('dd', {}, field.value === 'NaF' || !field.value ? t('unknown') : field.value)]))))];
}
function toolDetails(tool) {
  const claims = tool.claims.map(claim => h('p', {}, h('strong', {}, `${groupLabel(claim.facet)}: `), label(claim.value), sourceLink(tool, claim.source), claim.note ? h('span', { class: 'ee-note' }, ` · ${localized(claim.note)}`) : null));
  return h('details', { class: 'ee-details', 'data-tool-details': tool.id }, h('summary', {}, t('details')), h('p', {}, localized(tool.summary)), ...tool.notes.map(note => h('p', { class: 'ee-note' }, localized(note))), h('h4', {}, t('required')), ...featureKeys.map(key => featureStatus(tool, key)), h('h4', {}, t('provenance')), ...(claims.length ? claims : [h('p', {}, t('noFacets'))]), ...paperDetails(tool), h('details', { class: 'ee-details' }, h('summary', {}, t('fullSummary')), h('p', {}, tool.description), sourceLink(tool, 'readme')), h('div', { class: 'ee-detail-links' }, tool.url ? link(t('official'), tool.url) : null, link(t('sourceRecord'), tool.source.url)));
}
function resultCard(result) {
  const { tool, unknown } = result;
  const selected = state.compare.includes(tool.id);
  const tagValues = ['type', 'language', 'purpose'].flatMap(k => tool.facets[k] || []).slice(0, 5);
  const matching = Object.entries(state.facets).flatMap(([k, values]) => values.filter(v => tool.facets[k]?.includes(v)).map(label)).concat(state.required.filter(k => !unknown.includes(k)).map(featureLabel));
  return h('article', { class: 'ee-card', 'data-selected': String(selected), 'data-tool': tool.id }, h('div', { class: 'ee-card-heading' }, h('h3', {}, tool.name), tool.comparable ? h('button', { class: 'ee-add', type: 'button', id: `ee-add-${tool.id}`, 'data-compare-toggle': tool.id, 'aria-pressed': String(selected), 'aria-label': `${selected ? t('remove') : t('add')} ${tool.name}`, disabled: !selected && state.compare.length === 4 }, selected ? `✓ ${t('remove')}` : t('add')) : null), h('span', { class: 'ee-card-category' }, tool.facets.category.map(label).join(' / '), !tool.comparable ? ` · ${t('reference')}` : ''), h('p', { class: 'ee-card-summary' }, localized(tool.summary)), h('div', { class: 'ee-tags' }, tagValues.map(value => h('span', { class: 'ee-tag' }, label(value)))), h('p', { class: 'ee-evidence' }, tool.officialChecked ? t('officialRecord') : tool.paper.length ? t('paperRecord') : t('repositoryRecord'), sourceLink(tool, tool.officialChecked || (tool.paper.length ? 'paper-1' : 'readme'))), matching.length ? h('p', { class: 'ee-match' }, `${t('matching')}: ${matching.join(' · ')}`) : null, unknown.length ? h('p', { class: 'ee-match ee-tentative' }, `${t('pending')}: ${unknown.map(featureLabel).join(' · ')}`) : null, toolDetails(tool));
}
function renderResults() {
  const previousOpen = [...root.querySelectorAll('[data-tool-details][open]')].map(el => el.dataset.toolDetails);
  const results = selectTools(data, state);
  const pending = results.filter(r => r.tentative).length;
  $('#ee-count').textContent = `${results.length} ${t('results')}${pending ? ` · ${pending} ${t('tentative')}` : ''}`;
  const chips = [];
  if (state.q) chips.push(chip(state.q, 'q'));
  for (const [key, values] of Object.entries(state.facets)) for (const value of values) chips.push(chip(`${groupLabel(key)}: ${label(value)}`, 'facet', key, value));
  for (const key of state.required) chips.push(chip(featureLabel(key), 'required', '', key));
  if (state.includeUnknown) chips.push(chip(t('includeUnknown'), 'unknown'));
  $('#ee-chips').replaceChildren(...chips);
  if (results.length) {
    const cards = results.slice(0, visibleLimit).map(resultCard);
    if (results.length > visibleLimit) cards.push(h('button', { type: 'button', class: 'ee-secondary', id: 'ee-more' }, `${t('more')} (${results.length - visibleLimit})`));
    $('#ee-results').replaceChildren(...cards);
    for (const id of previousOpen) { const details = root.querySelector(`[data-tool-details="${CSS.escape(id)}"]`); if (details) details.open = true; }
  } else {
    $('#ee-results').replaceChildren(h('div', { class: 'ee-empty' }, h('h3', {}, t('empty')), h('p', {}, t('emptyHelp')), relaxations(data, state).map(o => h('button', { class: 'ee-secondary', type: 'button', 'data-remove-filter': o.kind, 'data-key': o.key || '', 'data-value': o.value || '' }, `${t('removeCondition')} ${o.kind === 'q' ? state.q : o.kind === 'required' ? featureLabel(o.value) : label(o.value)} → ${o.count}`)), h('button', { class: 'ee-primary', type: 'button', 'data-reset': true }, t('reset'))));
  }
}
function renderComparison() {
  const selected = state.compare.map(id => data.tools.find(tool => tool.id === id)).filter(Boolean);
  $('#ee-shortlist').hidden = !selected.length;
  $('#ee-shortlist-count').textContent = `${selected.length} / 4 ${t('shortlist')}`;
  $('#ee-shortlist-items').replaceChildren(...selected.map(tool => h('button', { type: 'button', class: 'ee-chip', id: `ee-short-${tool.id}`, 'data-compare-toggle': tool.id, 'aria-label': `${t('remove')} ${tool.name}` }, `${tool.name} ×`)));
  $('#ee-comparison').hidden = !comparisonOpen || !selected.length;
  if (!comparisonOpen || !selected.length) return;
  const row = (name, cell) => h('tr', {}, h('th', { scope: 'row' }, name), selected.map(tool => h('td', {}, cell(tool))));
  const rows = [row(t('overview'), tool => localized(tool.summary)), ...Object.keys(groups).map(key => row(groupLabel(key), tool => {
    const claims = tool.claims.filter(c => c.facet === key);
    if (key === 'category') return tool.facets.category.map(label).join(' / ');
    return claims.length ? claims.map(c => h('p', {}, label(c.value), sourceLink(tool, c.source), c.note ? h('span', { class: 'ee-note' }, ` · ${localized(c.note)}`) : null)) : t('unknown');
  })), ...featureKeys.map(key => row(featureLabel(key), tool => featureStatus(tool, key))), ...dimensions.map((dimension, index) => row(dimension[state.lang === 'zh' ? 1 : 0], tool => {
    const record = tool.paper.find(r => r.table === index + 1);
    return record ? [sourceLink(tool, `paper-${index + 1}`), ...record.fields.map(f => h('p', {}, h('strong', {}, `${columns[f.name]?.[state.lang === 'zh' ? 1 : 0] || f.name}: `), f.value === 'NaF' || !f.value ? t('unknown') : f.value))] : t('unknown');
  })), row(t('condition'), tool => [t('scopeNote'), ...tool.notes.map(note => h('p', { class: 'ee-note' }, localized(note)))]), row(t('source'), tool => [tool.url ? link(t('official'), tool.url) : null, h('br'), link(t('sourceRecord'), tool.source.url)])];
  $('#ee-comparison-table').replaceChildren(h('table', {}, h('caption', { class: 'ee-sr-only' }, t('comparison')), h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, t('dimensions')), selected.map(tool => h('th', { scope: 'col' }, tool.name)))), h('tbody', {}, rows)));
}
function renderMethod() {
  const texts = state.lang === 'zh' ? [
    '收录范围是 awesome-edge-computing 的固定提交快照。分类与简介参考原清单；仿真工具详情对照 2025 年综述的五张表。其他能力只根据明确的仓库记录或官方资料补充。',
    '“支持”表示所引资料有明确记录；“不支持”需有明确否定依据；空白和 NaF 均记为“未核实”。“不适用”用于参考资料等无法比较该能力的资源。开启待核实候选后，仍有未知必需能力的项目会单独标出并排在后面。',
    '编程语言包括来源列出的脚本和配置语言。网络协议字段可能描述抽象模型，核心引擎关系也不保证继承全部能力。分类沿用论文的主要用途划分，不能单凭类别判断协议精度。',
    '论文原始记录保留为英文，并标注 2025 年日期。官方资料更新不会删除历史记录；发生版本或项目对应差异时，查看工具详情中的说明。规模数值只适用于原文实验条件，不用于工具排名。',
    '资源按名称排列；每次手动核对后更新目录。首页数量和各类别数量包含参考资源；机构与资源清单不能加入工具比较。'
  ] : [
    'This catalog captures a fixed commit of awesome-edge-computing. Categories and summaries follow the list; simulator details reference the five tables of the 2025 survey. Additional capabilities require explicit repository or official documentation.',
    'Supported means explicitly documented in the cited source. Unsupported requires explicit negative evidence. Blank cells and NaF remain unverified. Not applicable is used for reference resources. When unverified candidates are included, candidates with unknown required capabilities are labeled and listed after documented matches.',
    'Languages include documented scripting and configuration languages. Protocol fields may describe abstract models. Core-engine relationships do not guarantee inherited capabilities. Survey categories describe primary use and do not by themselves establish protocol fidelity.',
    'Original survey fields are preserved in English and dated 2025. Official updates retain historical records; project or version differences appear in the tool details. Scale figures apply only to the original experimental conditions and are not rankings.',
    'Resources are listed alphabetically and updated after manual review. Category totals include reference resources. Institutions and resource collections cannot be added to the tool comparison.'
  ];
  $('#ee-method-content').replaceChildren(...texts.map(text => h('p', {}, text)), h('p', {}, link(`${data.meta.repository} · ${data.meta.commit.slice(0, 7)}`, `${data.meta.repository}/tree/${data.meta.commit}`)));
}
function render(options = {}) {
  const activeId = document.activeElement?.id;
  translateShell();
  if (!data) return;
  $('#ee-dataset-meta').textContent = `${data.tools.length} ${t('dataset')} · ${t('updated')}: ${data.meta.retrievedAt}`;
  if ($('#ee-search').value !== state.q) $('#ee-search').value = state.q;
  renderCategories(); if (!options.searchOnly) renderFilters(); renderResults(); renderComparison(); renderMethod();
  if (activeId && activeId !== 'ee-search') document.getElementById(activeId)?.focus({ preventScroll: true });
}
root.addEventListener('toggle', event => { const key = event.target.dataset?.group; if (key) event.target.open ? openGroups.add(key) : openGroups.delete(key); }, true);
root.addEventListener('change', event => {
  if (!data) return;
  const input = event.target;
  if (input.dataset.facet) {
    const key = input.dataset.facet, values = state.facets[key] || [];
    const facets = { ...state.facets, [key]: input.checked ? [...values, input.value] : values.filter(v => v !== input.value) };
    if (!facets[key].length) delete facets[key]; update({ ...state, facets });
  } else if (input.dataset.feature) {
    const key = input.dataset.feature;
    update({ ...state, required: input.checked ? [...state.required, key] : state.required.filter(v => v !== key) });
  } else if (input.id === 'ee-include-unknown') update({ ...state, includeUnknown: input.checked });
});
root.addEventListener('click', async event => {
  const button = event.target.closest('button'); if (!button) return;
  if (button.dataset.lang) { update({ ...state, lang: button.dataset.lang }); return; }
  if (button.id === 'ee-retry') { await load(); return; }
  if (!data) return;
  if (button.dataset.category) {
    const value = button.dataset.category, values = state.facets.category || [];
    const facets = { ...state.facets, category: values.includes(value) ? values.filter(v => v !== value) : [...values, value] };
    if (!facets.category.length) delete facets.category; update({ ...state, facets });
  } else if (button.hasAttribute('data-remove-filter')) removeFilter(button.dataset.removeFilter, button.dataset.key, button.dataset.value);
  else if (button.id === 'ee-reset' || button.hasAttribute('data-reset')) update({ ...emptyState(), lang: state.lang, compare: state.compare });
  else if (button.dataset.compareToggle) {
    const next = toggleCompare(state, data.tools.find(tool => tool.id === button.dataset.compareToggle));
    update(next); $('#ee-announcement').textContent = next.compare.length === 4 ? t('maximum') : `${next.compare.length} ${t('shortlist')}`;
  } else if (button.id === 'ee-compare') { comparisonOpen = true; renderComparison(); $('#ee-comparison').focus(); $('#ee-comparison').scrollIntoView({ block: 'start', behavior: 'auto' }); }
  else if (button.id === 'ee-close-comparison') { comparisonOpen = false; renderComparison(); $('#ee-compare').focus(); }
  else if (button.id === 'ee-more') { visibleLimit += 24; renderResults(); }
  else if (button.id === 'ee-share') {
    try { await navigator.clipboard.writeText(`${location.origin}${location.pathname}${writeState(state)}`); $('#ee-announcement').textContent = t('copied'); button.textContent = t('copied'); }
    catch { $('#ee-announcement').textContent = t('copyFallback'); button.textContent = t('copyFallback'); }
  }
});
let typing = false;
$('#ee-search').addEventListener('focus', () => { typing = false; });
$('#ee-search').addEventListener('input', event => { if (data) { update({ ...state, q: event.target.value }, { replace: typing, searchOnly: true }); typing = true; } });
window.addEventListener('popstate', () => { state = readState(location.search, data); visibleLimit = 24; comparisonOpen = state.compare.length > 0; typing = false; render(); });
async function load() {
  translateShell(); $('#ee-load-error').hidden = true;
  try {
    const response = await fetch(root.dataset.catalog, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`Catalog HTTP ${response.status}`);
    const incoming = await response.json();
    if (incoming.schemaVersion !== 1 || !Array.isArray(incoming.tools) || !incoming.tools.length) throw new Error('Unsupported catalog');
    data = incoming; state = readState(location.search, data); comparisonOpen = state.compare.length > 0; render();
  } catch (error) { console.error('Edge catalog:', error); $('#ee-load-error').hidden = false; $('#ee-count').textContent = t('loadError'); $('#ee-dataset-meta').textContent = t('loadError'); }
}
if (matchMedia('(max-width: 760px)').matches) $('#ee-filter-drawer').open = false;
await load();
