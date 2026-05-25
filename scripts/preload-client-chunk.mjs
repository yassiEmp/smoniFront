// Post-build: inject <link rel="modulepreload"> for vite-react-ssg's client.js
// chunk into every prerendered dist/**/index.html.
//
// Why: client-*.js is dynamically imported from app-*.js (vite-react-ssg's
// hydration entry pattern), so it only starts downloading AFTER app-*.js
// finishes evaluating. On throttled mobile that costs ~200-300ms of LCP.
// A modulepreload hint lets the browser start fetching client-*.js in
// parallel with app-*.js — same critical-path priority, no behavior change.
//
// We discover the hashed filename by scanning dist/assets/ for `client-*.js`,
// which vite-react-ssg always emits with that prefix.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ASSETS = 'dist/assets';
const MARKER = '<!-- preload-client-chunk -->';

const clientChunk = readdirSync(ASSETS).find((f) => /^client-[A-Za-z0-9_-]+\.js$/.test(f));
if (!clientChunk) {
  console.warn('[preload-client-chunk] no client-*.js chunk found in dist/assets/ — skipping');
  process.exit(0);
}

const tag = `${MARKER}<link rel="modulepreload" crossorigin href="/assets/${clientChunk}">`;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (name === 'index.html') patch(p);
  }
}

function patch(file) {
  let html = readFileSync(file, 'utf8');
  if (html.includes(MARKER)) return;
  const i = html.indexOf('</head>');
  if (i === -1) return;
  html = html.slice(0, i) + tag + html.slice(i);
  writeFileSync(file, html);
  console.log(`[preload-client-chunk] ${file} ← ${clientChunk}`);
}

walk(DIST);
