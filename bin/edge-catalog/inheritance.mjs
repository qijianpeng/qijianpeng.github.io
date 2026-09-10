// Explicit, versioned profiles describe the base modules available to derived tools.
// Profiles avoid importing new upstream capabilities into an older fork automatically.
export function resolveInheritance(network, inheritance, inventory) {
  const result = structuredClone(network);
  const tools = new Map(inventory.map(tool => [tool.id, tool]));
  const edges = new Map();
  for (const relation of inheritance.relationships) {
    const profile = inheritance.profiles[relation.profile];
    if (!tools.has(relation.tool) || !profile || !tools.has(profile.parent)) throw new Error('Unknown inheritance endpoint');
    if (!relation.source || !relation.note?.en || !relation.note?.zh || !profile.version || !profile.entries?.length) throw new Error('Incomplete inheritance evidence');
    edges.set(relation.tool, [...(edges.get(relation.tool) || []), profile.parent]);
  }
  function visit(id, path = []) {
    if (path.includes(id)) throw new Error(`Inheritance cycle: ${[...path, id].join(' -> ')}`);
    for (const parent of edges.get(id) || []) visit(parent, [...path, id]);
  }
  for (const id of edges.keys()) visit(id);
  const seen = new Set();
  for (const relation of inheritance.relationships) {
    const profile = inheritance.profiles[relation.profile];
    const tool = tools.get(relation.tool), parent = tools.get(profile.parent), review = result.tools[tool.id];
    const relationId = `${tool.id}:${relation.profile}`;
    if (seen.has(relationId)) throw new Error(`Duplicate inheritance relationship: ${relationId}`);
    seen.add(relationId);
    review.inheritance ||= [];
    review.inheritance.push({ parent: parent.id, profile: relation.profile, version: profile.version, source: relation.source, note: relation.note });
    for (const record of profile.entries) {
      review.entries.push({
        ...structuredClone(record), id: `${tool.id}:inherited:${relation.profile}:${record.id}`,
        additionalSources: [...new Set([...(record.additionalSources || []), relation.source])],
        inheritanceNote: relation.note,
        implementation: {
          route: 'inherited', delivery: 'bundled',
          chain: [{ name: tool.name, url: tool.url }, { name: parent.name, url: parent.url }],
          version: profile.version, evidence: { kind: record.evidenceKind || 'documentation', source: record.source },
          lifecycle: record.lifecycle || 'documented', profile: relation.profile
        }
      });
    }
    review.disposition = 'documented';
    review.pathReviewedAt = inheritance.date;
    const sources = [...new Set([relation.source, ...profile.entries.flatMap(record => [record.source, ...(record.additionalSources || [])])])];
    review.reviewedSources = [...new Set([...review.reviewedSources, ...sources])];
    review.coverage.push({ area: 'base', sources });
  }
  return result;
}
