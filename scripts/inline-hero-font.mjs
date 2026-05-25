// Post-build: inject the Outfit-900 woff2 base64 as an inline <style>@font-face
// into every prerendered dist/**/index.html, AFTER beasties has run.
//
// Why: beasties analyzes the rendered DOM for critical selectors and rebuilds
// the <head>'s inline <style>. It strips standalone @font-face rules whose
// family isn't matched by an analyzed selector — that nuked our hero font.
// Running after beasties guarantees the rule survives.
//
// The data URL means the woff2 bytes ship inside the HTML response → the real
// Outfit-900 is parsed before first paint, eliminating the hero <h1> FOUT.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FONT_PATH = 'public/fonts/outfit-900.woff2';
const DIST = 'dist';
const MARKER = '<!-- inline-hero-font -->';

const b64 = readFileSync(FONT_PATH).toString('base64');
// font-display: optional — bytes are already in the HTML response (base64),
// so the font is available before first paint without needing a separate
// network round-trip. `optional` skips the FOUT/swap repaint that `swap`
// would force if for any reason the font isn't ready in time, and the
// metric-overridden 'Outfit Fallback' (in fonts.css) keeps layout stable.
const tag = `${MARKER}<style>@font-face{font-family:'Outfit';font-style:normal;font-display:optional;font-weight:900;src:url('data:font/woff2;base64,${b64}') format('woff2');}</style>`;

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
  console.log(`[inline-hero-font] ${file}`);
}

walk(DIST);
