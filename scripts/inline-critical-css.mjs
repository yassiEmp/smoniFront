// Post-build: inline a small hand-curated critical CSS into every prerendered
// HTML file's <head>, and swap the bundled app-*.css <link rel="stylesheet">
// for a non-blocking preload+swap pattern.
//
// Why hand-rolled (not beasties): beasties matches every selector present in
// the prerendered DOM, but the SSG output contains the WHOLE page (not just
// above the fold). On the home page that comes out to ~30 KB which defeats
// the purpose. A 5 KB hand-curated reset + layout is enough to prevent
// catastrophic FOUC; the full bundle arrives within ~100 ms and replaces it.
import { readFile, writeFile } from 'node:fs/promises'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')
const criticalCssPath = path.resolve(__dirname, '..', 'src', 'styles', 'critical.css')

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    const s = statSync(full)
    if (s.isDirectory()) out.push(...walk(full))
    else if (full.endsWith('.html')) out.push(full)
  }
  return out
}

// Minify CSS: strip comments + collapse whitespace (lossless for our subset).
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

const criticalCssRaw = await readFile(criticalCssPath, 'utf8')
const criticalCss = minifyCss(criticalCssRaw)
console.log(`[critical-css] inline block: ${Buffer.byteLength(criticalCss, 'utf8')} bytes (minified, from ${Buffer.byteLength(criticalCssRaw, 'utf8')} raw)`)

// Match the main app stylesheet link. The hashed filename varies per build.
// We swap *only* the app-*.css one (skip e.g. Home-*.css route chunks — those
// are tiny and already loaded after the JS chunk that needs them).
const linkRegex = /<link[^>]*rel="stylesheet"[^>]*href="(\/assets\/app-[^"]+\.css)"[^>]*>/

const htmlFiles = walk(distDir)
let processed = 0
let swapped = 0
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  const match = html.match(linkRegex)
  if (!match) {
    // No bundled stylesheet link to swap (might be a fragment); leave alone.
    await writeFile(file, html)
    processed++
    continue
  }
  const href = match[1]
  // Build replacement: preload-as-style + onload-swap + noscript fallback.
  const replacement =
    `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="${href}"></noscript>`
  let next = html.replace(linkRegex, replacement)
  // Inject inline <style> with critical CSS before </head>.
  next = next.replace(/<\/head>/, `<style data-critical>${criticalCss}</style></head>`)
  await writeFile(file, next)
  swapped++
  processed++
}
console.log(`[critical-css] processed ${processed} html files, swapped main stylesheet in ${swapped}`)
