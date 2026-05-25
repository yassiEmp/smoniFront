import { spawnSync } from 'node:child_process';
import { readFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL = 'http://localhost:4183/';
const RUNS = 5;
const OUT_DIR = join(tmpdir(), 'lh-bench-' + Date.now());
mkdirSync(OUT_DIR, { recursive: true });

const PRESETS = [
  { name: 'mobile',  preset: null },        // mobile is the default form factor
  { name: 'desktop', preset: 'desktop' },
];

const METRICS = [
  ['perf-score', r => Math.round(r.categories.performance.score * 100)],
  ['FCP',  r => r.audits['first-contentful-paint'].numericValue],
  ['LCP',  r => r.audits['largest-contentful-paint'].numericValue],
  ['TBT',  r => r.audits['total-blocking-time'].numericValue],
  ['CLS',  r => r.audits['cumulative-layout-shift'].numericValue],
  ['SI',   r => r.audits['speed-index'].numericValue],
  ['TTI',  r => r.audits['interactive']?.numericValue ?? NaN],
];

const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const fmt = (k, v) => {
  if (k === 'CLS') return v.toFixed(3);
  if (k === 'perf-score') return Math.round(v).toString();
  return Math.round(v) + ' ms';
};

for (const p of PRESETS) {
  console.log(`\n=== ${p.name} (${RUNS} runs) ===`);
  const results = {};
  METRICS.forEach(([k]) => results[k] = []);

  for (let i = 1; i <= RUNS; i++) {
    const outPath = join(OUT_DIR, `${p.name}-${i}.json`);
    process.stdout.write(`  run ${i}/${RUNS}…`);
    const args = [
      '--yes', 'lighthouse', URL,
      '--quiet',
      '--output=json',
      `--output-path=${outPath}`,
      ...(p.preset ? [`--preset=${p.preset}`] : []),
      '--only-categories=performance',
      `--chrome-flags="--headless=new --no-sandbox"`,
    ];
    const r = spawnSync('npx', args, { shell: true, encoding: 'utf8' });
    // Lighthouse on Windows often exits non-zero on EPERM during temp-dir
    // cleanup AFTER the JSON has been written. Treat any case where the
    // output file exists as success.
    if (!existsSync(outPath)) {
      console.log(' FAIL'); console.error(r.stderr?.slice(-400)); continue;
    }
    const j = JSON.parse(readFileSync(outPath, 'utf8'));
    METRICS.forEach(([k, fn]) => results[k].push(fn(j)));
    console.log(' ok  perf=' + Math.round(j.categories.performance.score * 100) +
      ' LCP=' + Math.round(j.audits['largest-contentful-paint'].numericValue) +
      ' TBT=' + Math.round(j.audits['total-blocking-time'].numericValue));
  }

  console.log(`\n  ${p.name.toUpperCase()} aggregate (n=${results['LCP'].length})`);
  console.log('    metric        mean        median      raw');
  for (const [k] of METRICS) {
    const arr = results[k].filter(v => !Number.isNaN(v));
    if (!arr.length) continue;
    const raw = arr.map(v => fmt(k, v)).join(', ');
    console.log(`    ${k.padEnd(13)} ${fmt(k, mean(arr)).padEnd(11)} ${fmt(k, median(arr)).padEnd(11)} [${raw}]`);
  }
}

rmSync(OUT_DIR, { recursive: true, force: true });
