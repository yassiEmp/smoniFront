#!/usr/bin/env node
// Convert public/hero-car.jpeg → transparent PNG/WebP/AVIF by keying out near-white.
// Pixels above WHITE_THRESHOLD become fully transparent; near-white gets a soft alpha
// falloff so JPEG ringing doesn't leave a halo around the car.
// Run: node scripts/encode-hero-car.mjs

import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public", "hero-car.jpeg");
const OUT_DIR = join(ROOT, "public");

const HARD = 250; // ≥ this on all channels → fully transparent
const SOFT = 235; // ≥ this → linear alpha ramp toward HARD

const fmt = (n) => `${(n / 1024).toFixed(0)}KB`;

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const m = Math.min(r, g, b);
  let alpha = 255;
  if (m >= HARD) alpha = 0;
  else if (m >= SOFT) alpha = Math.round(((HARD - m) / (HARD - SOFT)) * 255);
  data[i + 3] = alpha;
}

const keyed = sharp(data, { raw: { width, height, channels } });

const WIDTHS = [800, 1200, 1600];
for (const w of WIDTHS) {
  const base = keyed.clone().resize({ width: w, withoutEnlargement: true });
  const png = join(OUT_DIR, `hero-car-${w}.png`);
  const webp = join(OUT_DIR, `hero-car-${w}.webp`);
  const avif = join(OUT_DIR, `hero-car-${w}.avif`);
  await base.clone().png({ compressionLevel: 9, palette: false }).toFile(png);
  await base.clone().webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile(webp);
  await base.clone().avif({ quality: 55, effort: 6 }).toFile(avif);
  const [p, we, a] = await Promise.all([stat(png), stat(webp), stat(avif)]);
  console.log(`w=${w}  avif=${fmt(a.size)}  webp=${fmt(we.size)}  png=${fmt(p.size)}`);
}
