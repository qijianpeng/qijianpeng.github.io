// Local, decorative line icons. Text labels always carry the meaning.
const paths = {
  chip: ['M7 7h10v10H7z', 'M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4', 'M10 10h4v4h-4z'],
  cloud: ['M7 18h11a4 4 0 0 0 .5-8 6.5 6.5 0 0 0-12-2A5 5 0 0 0 7 18Z'],
  fog: ['M5 12a4 4 0 0 1 1-8 5 5 0 0 1 9 1 4 4 0 0 1 4 7', 'M3 16h18M6 20h12'],
  sensor: ['M10 17h4v5h-4z', 'M12 13v4M8 12a5 5 0 0 1 8 0M5 9a9 9 0 0 1 14 0M2 6a13 13 0 0 1 20 0'],
  network: ['M9 2h6v5H9zM2 17h6v5H2zM16 17h6v5h-6z', 'M12 7v5M5 17v-5h14v5'],
  flask: ['M9 2h6M10 2v7L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 9V2', 'M7 15h10M9 18h.01M14 19h.01'],
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 12 10 5 10-5M2 17l10 5 10-5'],
  chart: ['M3 3v18h18', 'M7 15v3m5-8v8m5-13v13'],
  wrench: ['M21 3a6 6 0 0 1-8 8L5 20a2 2 0 0 1-3-3l9-8a6 6 0 0 1 8-8l-4 4 4 2Z'],
  window: ['M3 3h18v18H3z', 'M3 8h18M7 5.5h.01M10 5.5h.01M7 12h4v5H7zM14 12h3m-3 4h3'],
  brain: ['M12 4a3 3 0 0 0-5-2 4 4 0 0 0-4 5 4 4 0 0 0 0 7 4 4 0 0 0 4 5 3 3 0 0 0 5 2V4Z', 'M12 4a3 3 0 0 1 5-2 4 4 0 0 1 4 5 4 4 0 0 1 0 7 4 4 0 0 1-4 5 3 3 0 0 1-5 2', 'M7 6v4H4m13-4v4h3M7 16h5m5 0h-5'],
  building: ['m2 8 10-6 10 6H2Z', 'M4 11v8m5-8v8m6-8v8m5-8v8M2 22h20'],
  book: ['M12 5C9 2 5 2 2 3v17c3-1 7-1 10 2 3-3 7-3 10-2V3c-3-1-7-1-10 2Zm0 0v17'],
  code: ['m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18'],
  target: ['M12 2a10 10 0 1 0 10 10M12 7a5 5 0 1 0 5 5', 'm12 12 9-9M16 3h5v5'],
  route: ['M5 3h4v4H5zM15 17h4v4h-4z', 'M9 5h7a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h7'],
  check: ['M4 3h16v18H4z', 'm8 12 3 3 6-7'],
  bolt: ['m13 2-9 12h7l-1 8 10-13h-7Z'],
  server: ['M3 3h18v7H3zM3 14h18v7H3z', 'M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6'],
  globe: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z', 'M2 12h20M12 2a18 18 0 0 1 0 20 18 18 0 0 1 0-20'],
};
export const iconNames = {
  simulators: 'flask', engines: 'layers', networks: 'network', hardware: 'chip', benchmarks: 'chart', tools: 'wrench', applications: 'window', 'edge-ai': 'brain', institutions: 'building', resources: 'book',
  category: 'layers', type: 'flask', purpose: 'target', language: 'code', paradigm: 'cloud', scenario: 'window', engine: 'chip', protocol: 'network', resource: 'server', metric: 'chart', scheduling: 'route', platform: 'window', required: 'check',
  Edge: 'chip', Cloud: 'cloud', Fog: 'fog', IoT: 'sensor', Mist: 'sensor', Networking: 'network', Serverless: 'bolt', P2P: 'network', 'In-network': 'route', 'Federated learning': 'brain', 'Volunteer computing': 'globe', 'Osmotic computing': 'route', Grid: 'network', HPC: 'server',
};
export function icon(key) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  for (const [name, value] of Object.entries({ viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.65', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'ee-icon', 'aria-hidden': 'true', focusable: 'false' })) svg.setAttribute(name, value);
  for (const d of paths[iconNames[key] || key] || paths.layers) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d); svg.append(path);
  }
  return svg;
}
