#!/usr/bin/env node
// One-shot in-place compression for large source assets that bypass vite-imagetools
// (CSS-background PNGs, public/ files referenced by string path).
// Run with: node scripts/compress-assets.mjs

import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Files that feed vite-imagetools — DO NOT compress in-place, lossy quantization
// would propagate into all generated AVIF/WebP/JPG variants. vite-imagetools
// already produces optimized outputs at build time from these originals.
const IMAGETOOLS_SOURCES = new Set([
  "src/assets/authentification/form-image-1.png",
  "src/assets/images/home/question.png",
  "src/assets/images/home/img_hero1.jpg",
  "src/assets/images/home/img_hero2.jpg",
  "src/assets/images/home/img_hero3.jpg",
  "src/assets/images/home/img_hero4.jpg",
  "src/assets/images/home/logo/1.png",
  "src/assets/images/home/logo/2.png",
  "src/assets/logo/label.png",
  "src/assets/logo/Logo-CPF.png",
  "src/assets/logo/logo-permis-1-euro-jour-large.png",
  "src/assets/logo/LogoQualiopi-300dpi-Avec-Marianne.png",
  "src/assets/services/location.png",
  "src/assets/services/conduite.png",
  "src/assets/services/code.png",
  "src/assets/services/accompagnement.png",
  "src/assets/services/passerelle.png",
  "src/assets/services/post-permis.png",
  "src/assets/blog/details7/conduite-traditionnelle.png",
  "src/assets/blog/details7/conduite-accompagnee.png",
  "src/assets/blog/details7/label-ecole-qualite.png",
].map((p) => p.replace(/\//g, "\\")));

const TARGETS = [
  // PNG → keep PNG (referenced by string elsewhere). Just re-encode with palette+zlib.
  { glob: "public", exts: [".png", ".jpg", ".jpeg"], mode: "smart", minBytes: 50 * 1024 },
  // Hero JPGs in HomeGroupeSection are routed through vite-imagetools, but the source
  // still ships to git/CI. Keep them compressed too. Filenames preserved.
  {
    glob: "src/assets/images/home",
    exts: [".jpg", ".jpeg", ".png"],
    mode: "smart",
    minBytes: 50 * 1024,
  },
  // Other src/assets paths used in private dashboards.
  { glob: "src/assets/authentification", exts: [".png", ".jpg", ".jpeg"], mode: "smart", minBytes: 50 * 1024 },
  { glob: "src/assets/apprenants", exts: [".png", ".jpg", ".jpeg"], mode: "smart", minBytes: 50 * 1024 },
  { glob: "src/assets/dashboard-moniteur", exts: [".png", ".jpg", ".jpeg"], mode: "smart", minBytes: 50 * 1024 },
  { glob: "src/assets/logo", exts: [".png", ".jpg", ".jpeg"], mode: "smart", minBytes: 50 * 1024 },
  { glob: "src/assets/navbar", exts: [".png", ".jpg", ".jpeg"], mode: "smart", minBytes: 50 * 1024 },
  { glob: "src/assets/ressources", exts: [".png", ".jpg", ".jpeg"], mode: "smart", minBytes: 50 * 1024 },
];

const fmt = (n) => `${(n / 1024).toFixed(0)}KB`;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function tryEncode(file, opts) {
  const tmp = file + "." + opts.tag + ".tmp";
  await opts.pipeline.toFile(tmp);
  return { tmp, size: (await stat(tmp)).size };
}

async function processFile(file) {
  const ext = extname(file).toLowerCase();
  const before = (await stat(file)).size;
  const candidates = [];

  if (ext === ".png") {
    candidates.push({
      tag: "palette",
      pipeline: sharp(file, { failOn: "none" }).rotate().png({ quality: 85, compressionLevel: 9, palette: true }),
    });
    candidates.push({
      tag: "lossless",
      pipeline: sharp(file, { failOn: "none" }).rotate().png({ compressionLevel: 9, effort: 10 }),
    });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    candidates.push({
      tag: "moz",
      pipeline: sharp(file, { failOn: "none" }).rotate().jpeg({ quality: 82, mozjpeg: true }),
    });
  } else {
    return null;
  }

  const results = await Promise.all(candidates.map((c) => tryEncode(file, c)));
  results.sort((a, b) => a.size - b.size);
  const best = results[0];

  for (const r of results) if (r.tmp !== best.tmp) await unlink(r.tmp);

  if (best.size >= before * 0.95) {
    await unlink(best.tmp);
    return { file, before, after: before, skipped: true };
  }
  await rename(best.tmp, file);
  return { file, before, after: best.size, skipped: false };
}

const results = [];
for (const target of TARGETS) {
  const dir = join(ROOT, target.glob);
  const files = await walk(dir);
  for (const f of files) {
    if (!target.exts.includes(extname(f).toLowerCase())) continue;
    if (target.skip?.includes(basename(f))) continue;
    const relForSkip = f.replace(ROOT + "\\", "").replace(ROOT + "/", "");
    if (IMAGETOOLS_SOURCES.has(relForSkip)) {
      console.log(`- skip (imagetools source) ${relForSkip}`);
      continue;
    }
    const size = (await stat(f)).size;
    if (size < target.minBytes) continue;
    try {
      const r = await processFile(f);
      if (r) results.push(r);
    } catch (err) {
      console.error(`! ${f}: ${err.message}`);
    }
  }
}

let totalBefore = 0;
let totalAfter = 0;
for (const r of results) {
  totalBefore += r.before;
  totalAfter += r.after;
  const rel = r.file.replace(ROOT + "\\", "").replace(ROOT + "/", "");
  if (r.skipped) {
    console.log(`= ${rel} ${fmt(r.before)} (no gain)`);
  } else {
    const pct = (((r.before - r.after) / r.before) * 100).toFixed(0);
    console.log(`✓ ${rel}  ${fmt(r.before)} → ${fmt(r.after)}  (-${pct}%)`);
  }
}
console.log(
  `\nTotal: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (saved ${fmt(totalBefore - totalAfter)})`,
);
