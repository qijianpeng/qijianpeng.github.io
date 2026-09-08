export const facetKeys = ['category', 'type', 'paradigm', 'scenario', 'engine', 'language', 'protocol', 'resource', 'metric', 'scheduling', 'platform', 'purpose'];
export const featureKeys = ['visualization', 'custom-metrics', 'scenario-scripts', 'logging', 'custom-scheduling', 'real-code'];
export const emptyState = () => ({ lang: 'en', q: '', facets: {}, required: [], includeUnknown: false, compare: [] });
export const unique = values => [...new Set(values)];
export function normalizeState(input = {}, data) {
  const state = emptyState();
  state.lang = input.lang === 'zh' ? 'zh' : 'en';
  state.q = typeof input.q === 'string' ? input.q.slice(0, 200) : '';
  for (const key of facetKeys) {
    if (Array.isArray(input.facets?.[key])) {
      const options = data ? new Set(data.tools.flatMap(t => t.facets[key] || [])) : null;
      const values = unique(input.facets[key].filter(v => typeof v === 'string' && v.length < 150 && (!options || options.has(v)))).slice(0, 30);
      if (values.length) state.facets[key] = values;
    }
  }
  state.required = unique((Array.isArray(input.required) ? input.required : []).filter(k => featureKeys.includes(k)));
  state.includeUnknown = input.includeUnknown === true;
  state.compare = unique((Array.isArray(input.compare) ? input.compare : []).filter(v => typeof v === 'string' && (!data || data.tools.some(t => t.id === v && t.comparable)))).slice(0, 4);
  return state;
}
export function readState(search, data) {
  const params = new URLSearchParams(search);
  let input = {};
  try { input = JSON.parse(params.get('state') || '{}') || {}; } catch { /* Invalid shared state falls back to the complete catalog. */ }
  return normalizeState({ ...input, lang: params.get('lang') || input.lang }, data);
}
export function writeState(state) {
  const { lang, ...rest } = normalizeState(state);
  const params = new URLSearchParams({ lang });
  if (rest.q || Object.keys(rest.facets).length || rest.required.length || rest.includeUnknown || rest.compare.length) params.set('state', JSON.stringify(rest));
  return `?${params}`;
}
const fold = text => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
export function matchTool(tool, state) {
  const haystack = fold([tool.name, ...(tool.aliases || []), tool.summary.en, tool.summary.zh, ...Object.values(tool.facets).flat()].join(' '));
  if (!fold(state.q.trim()).split(/\s+/).filter(Boolean).every(word => haystack.includes(word))) return null;
  for (const [key, values] of Object.entries(state.facets)) if (values.length && !values.some(v => (tool.facets[key] || []).includes(v))) return null;
  const unknown = [];
  for (const feature of state.required) {
    const status = tool.features[feature]?.status || 'unknown';
    if (status === 'unsupported' || status === 'not-applicable') return null;
    if (status === 'unknown') unknown.push(feature);
  }
  if (unknown.length && !state.includeUnknown) return null;
  return { tool, unknown, tentative: unknown.length > 0 };
}
export function selectTools(data, state) {
  return data.tools.map(t => matchTool(t, state)).filter(Boolean).sort((a, b) => Number(a.tentative) - Number(b.tentative) || a.tool.name.localeCompare(b.tool.name, 'en', { sensitivity: 'base', numeric: true }));
}
export function toggleCompare(state, tool) {
  if (state.compare.includes(tool.id)) return { ...state, compare: state.compare.filter(id => id !== tool.id) };
  if (!tool.comparable || state.compare.length >= 4) return state;
  return { ...state, compare: [...state.compare, tool.id] };
}
export function relaxations(data, state) {
  const options = [];
  if (state.q) options.push({ kind: 'q', count: selectTools(data, { ...state, q: '' }).length });
  for (const [key, values] of Object.entries(state.facets)) for (const value of values) {
    const facets = { ...state.facets, [key]: values.filter(v => v !== value) };
    options.push({ kind: 'facet', key, value, count: selectTools(data, { ...state, facets }).length });
  }
  for (const value of state.required) options.push({ kind: 'required', value, count: selectTools(data, { ...state, required: state.required.filter(v => v !== value) }).length });
  return options.filter(o => o.count > 0).sort((a, b) => b.count - a.count).slice(0, 3);
}
