// Keep the module graph on the same published version as the entry point.
const release = new URL(import.meta.url).search;
const [{ emptyState, readState, writeState, selectTools, toggleCompare, relaxations, featureKeys }, { ui, groups, features, terms, dimensions }] = await Promise.all([
  import(new URL(`./core.mjs${release}`, import.meta.url).href),
  import(new URL(`./labels.mjs${release}`, import.meta.url).href),
]);

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
  if (!source) return null;
  const name = source.kind === 'official' ? (state.lang === 'zh' ? '官方资料' : 'Official docs') : 'README';
  const result = link(`${source.title || name} · ${source.date}`, source.url, 'ee-source');
  if (source.version) result.title = `${t('version')}: ${source.version}`;
  return result;
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
  $('#ee-filters').replaceChildren(...nodes);
}
function documentedFeatures(tool) {
  const keys = featureKeys.filter(key => ['supported', 'unsupported'].includes(tool.features[key]?.status));
  return keys.length ? keys.map(key => {
    const claim = tool.features[key];
    return h('div', { class: 'ee-feature-row' }, h('strong', {}, featureLabel(key)), claim.status === 'unsupported' ? h('span', { class: 'ee-status', 'data-status': claim.status }, t('unsupported')) : null, claim.source ? sourceLink(tool, claim.source) : null, claim.note ? h('p', { class: 'ee-note' }, localized(claim.note)) : null);
  }) : [h('p', { class: 'ee-note' }, t('readScope'))];
}
function dimensionEvidence(tool, index) {
  const record = tool.verification?.dimensions[index];
  if (record) {
    const source = data.sources[record.source];
    return [h('p', {}, localized(record.text)), sourceLink(tool, record.source), source?.version ? h('p', { class: 'ee-note ee-version' }, `${t('version')}: ${/^[a-f0-9]{40}$/.test(source.version) ? source.version.slice(0, 12) : source.version}`) : null];
  }
  return index === 0 && tool.verification?.accessNote ? [h('p', { class: 'ee-note' }, localized(tool.verification.accessNote))] : [h('span', { 'aria-label': t('readScope') }, '—')];
}
function reviewedDimensions(tool) {
  const records = dimensions.flatMap((dimension, index) => tool.verification?.dimensions[index] ? [h('div', { class: 'ee-dimension' }, h('h5', {}, `${index + 1}. ${dimension[state.lang === 'zh' ? 1 : 0]}`), ...dimensionEvidence(tool, index))] : []);
  return records.length ? h('section', { class: 'ee-dimension-evidence', 'aria-label': t('reviewedDimensions') }, h('h4', {}, t('reviewedDimensions')), ...records) : null;
}
function toolDetails(tool) {
  const claims = tool.claims.map(claim => h('p', {}, h('strong', {}, `${groupLabel(claim.facet)}: `), label(claim.value), sourceLink(tool, claim.source), claim.note ? h('span', { class: 'ee-note' }, ` · ${localized(claim.note)}`) : null));
  return h('details', { class: 'ee-details', 'data-tool-details': tool.id }, h('summary', {}, t('details')), h('p', {}, localized(tool.summary)), ...tool.notes.map(note => h('p', { class: 'ee-note' }, localized(note))), tool.verification?.accessNote ? h('p', { class: 'ee-note ee-tentative' }, localized(tool.verification.accessNote)) : null, reviewedDimensions(tool), h('h4', {}, t('documented')), ...documentedFeatures(tool), h('h4', {}, t('provenance')), ...(claims.length ? claims : [h('p', {}, t('noFacets'))]), h('details', { class: 'ee-details' }, h('summary', {}, t('fullSummary')), h('p', {}, tool.description), sourceLink(tool, 'readme')), h('div', { class: 'ee-detail-links' }, tool.url ? link(t('official'), tool.url) : null, link(t('sourceRecord'), tool.source.url)));
}
function resultCard(result) {
  const { tool } = result;
  const selected = state.compare.includes(tool.id);
  const tagValues = ['type', 'language', 'purpose'].flatMap(k => tool.facets[k] || []).slice(0, 5);
  const matching = Object.entries(state.facets).flatMap(([k, values]) => values.filter(v => tool.facets[k]?.includes(v)).map(label)).concat(state.required.map(featureLabel));
  return h('article', { class: 'ee-card', 'data-selected': String(selected), 'data-tool': tool.id }, h('div', { class: 'ee-card-heading' }, h('h3', {}, tool.name), tool.comparable ? h('button', { class: 'ee-add', type: 'button', id: `ee-add-${tool.id}`, 'data-compare-toggle': tool.id, 'aria-pressed': String(selected), 'aria-label': `${selected ? t('remove') : t('add')} ${tool.name}`, disabled: !selected && state.compare.length === 4 }, selected ? `✓ ${t('remove')}` : t('add')) : null), h('span', { class: 'ee-card-category' }, tool.facets.category.map(label).join(' / '), !tool.comparable ? ` · ${t('reference')}` : ''), h('p', { class: 'ee-card-summary' }, localized(tool.summary)), h('div', { class: 'ee-tags' }, tagValues.map(value => h('span', { class: 'ee-tag' }, label(value)))), h('p', { class: 'ee-evidence' }, tool.officialChecked ? t('evidenceRecord') : t('repositoryRecord'), sourceLink(tool, tool.officialChecked || 'readme')), matching.length ? h('p', { class: 'ee-match' }, `${t('matching')}: ${matching.join(' · ')}`) : null, toolDetails(tool));
}
function renderResults() {
  const previousOpen = [...root.querySelectorAll('[data-tool-details][open]')].map(el => el.dataset.toolDetails);
  const results = selectTools(data, state);
  $('#ee-count').textContent = `${results.length} ${t('results')}`;
  const chips = [];
  if (state.q) chips.push(chip(state.q, 'q'));
  for (const [key, values] of Object.entries(state.facets)) for (const value of values) chips.push(chip(`${groupLabel(key)}: ${label(value)}`, 'facet', key, value));
  for (const key of state.required) chips.push(chip(featureLabel(key), 'required', '', key));
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
  const rows = [row(t('overview'), tool => localized(tool.summary)), ...dimensions.map((dimension, index) => row(dimension[state.lang === 'zh' ? 1 : 0], tool => dimensionEvidence(tool, index))), row(t('documented'), tool => documentedFeatures(tool)), row(t('condition'), tool => [t('scopeNote'), tool.verification?.accessNote ? h('p', { class: 'ee-note' }, localized(tool.verification.accessNote)) : null, ...tool.notes.map(note => h('p', { class: 'ee-note' }, localized(note)))]), row(t('source'), tool => [tool.url ? link(t('official'), tool.url) : null, h('br'), link(t('sourceRecord'), tool.source.url)])];
  $('#ee-comparison-table').replaceChildren(h('table', {}, h('caption', { class: 'ee-sr-only' }, t('comparison')), h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, t('dimensions')), selected.map(tool => h('th', { scope: 'col' }, tool.name)))), h('tbody', {}, rows)));
}
function renderMethod() {
  const texts = state.lang === 'zh' ? [
    '五个维度依据项目官网、使用手册、API、固定提交源码及项目技术文档整理。能力说明写明具体功能与适用条件，不根据综述表格、依赖关系或图示推断功能。',
    '收录范围是 awesome-edge-computing 的固定提交快照。原清单用于资源身份、分类与简介；必需能力判断只使用项目直接资料。',
    '功能区列出资料明确描述的能力、接口及条件。勾选必需能力后，只返回有直接依据的项目；未列出的功能不据此判为不支持。比较表以五个维度的具体内容为主，入口失效或仅剩历史介绍时展示实际资料状况。',
    '每项证据展示来源、版本或查阅日期。外部可视化工具、可选依赖和配置要求会注明；基于源码或文档的核查不代表已安装实测所有工具。',
    '编程语言包括脚本和配置语言。抽象网络模型、协议实现与应用调度需要分别核对。规模数据只对应来源所述实验条件，不用于工具排名。',
    '资源按名称排列；每次手动核对后更新目录。机构与资源清单保留参考入口，不能加入工具比较。'
  ] : [
    'The five dimensions use project websites, manuals, APIs, pinned source code, and project technical documents. Capability descriptions explain concrete behavior and conditions; survey marks, dependencies, and diagrams do not establish support.',
    'The inventory follows a fixed commit of awesome-edge-computing. The list provides resource identity, categories, and summaries. Required capabilities use direct project evidence only.',
    'Capability lists describe documented interfaces and conditions. Required filters return only projects with direct evidence; an omitted capability does not establish lack of support. Compare the concrete five-dimension descriptions. Retired or inaccessible resources show their actual source availability.',
    'Each record includes its source, version, or access date. External visualization tools, optional dependencies, and configuration requirements are stated. Documentation and source review do not mean every tool has been installed and tested.',
    'Languages include scripting and configuration languages. Abstract network models, protocol implementations, and application scheduling are checked separately. Scale figures apply only to their documented experimental conditions and are not rankings.',
    'Resources are alphabetical and manually reviewed. Institutions and resource lists retain reference links and cannot enter capability comparisons.'
  ];
  $('#ee-method-content').replaceChildren(...texts.map(text => h('p', {}, text)), h('p', {}, link(`${data.meta.repository} · ${data.meta.commit.slice(0, 7)}`, `${data.meta.repository}/tree/${data.meta.commit}`)));
}
function render(options = {}) {
  const activeId = document.activeElement?.id;
  translateShell();
  if (!data) return;
  $('#ee-dataset-meta').textContent = `${data.tools.length} ${t('dataset')} · ${t('updated')}: ${data.meta.evidenceUpdatedAt || data.meta.retrievedAt} · ${data.meta.dimensionEvidenceCount} ${t('dimensionRecords')}`;
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
  }
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
