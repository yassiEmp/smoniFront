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

// Match every render-blocking stylesheet link pointing at a bundled chunk in
// /assets/*.css (app-*.css, route chunks like Home-*.css, component chunks
// like HomeLocationSection-*.css). All become async preload+swap with a
// noscript fallback so nothing in <head> blocks first paint.
// Use a global regex so we can iterate over every match per file.
const linkRegex = /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="(\/assets\/[^"]+\.css)"[^>]*>/g

// Guard: don't rewrite a <link rel="stylesheet"> that's already inside a
// <noscript> wrapper (those are the intentional fallbacks).
function stripNoscript(html) {
  return html.replace(/<noscript>[\s\S]*?<\/noscript>/g, '')
}

const htmlFiles = walk(distDir)
let processed = 0
let swapped = 0
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  // Find matches only outside <noscript> blocks. We do this by scanning a
  // copy with <noscript>...</noscript> stripped, collecting hrefs, then
  // replacing those exact tags in the original.
  const scanned = stripNoscript(html)
  const hrefs = new Set()
  for (const m of scanned.matchAll(linkRegex)) hrefs.add(m[1])

  if (hrefs.size === 0) {
    await writeFile(file, html)
    processed++
    continue
  }

  let next = html
  for (const href of hrefs) {
    // Build a per-href regex to replace the (first/only) blocking link.
    // We escape the href for use inside the pattern.
    const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const perHref = new RegExp(
      `<link\\b[^>]*\\brel="stylesheet"[^>]*\\bhref="${escaped}"[^>]*>`,
      'g'
    )
    const replacement =
      `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
      `<noscript><link rel="stylesheet" href="${href}"></noscript>`
    // Replace ALL occurrences (handles the duplicate-tag bug too: every
    // blocking link becomes the async pattern; the noscript fallback is
    // appended once per unique href via this single replacement string).
    // To avoid emitting multiple noscript fallbacks for the same href when
    // the source has the link twice, only the first match gets the full
    // replacement; subsequent matches get an empty string.
    let first = true
    next = next.replace(perHref, () => {
      if (first) {
        first = false
        return replacement
      }
      return ''
    })
  }

  // Inject inline <style> with critical CSS before </head>.
  next = next.replace(/<\/head>/, `<style data-critical>${criticalCss}</style></head>`)
  await writeFile(file, next)
  swapped++
  processed++
}
console.log(`[critical-css] processed ${processed} html files, swapped stylesheets in ${swapped}`)
