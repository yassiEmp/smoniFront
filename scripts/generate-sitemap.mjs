#!/usr/bin/env node
/**
 * Sitemap freshness generator.
 *
 * Reads public/sitemap.xml, maps each <loc> to the source file that backs that
 * route, then rewrites each <lastmod> to the last-commit date of that source
 * file (from `git log -1 --format=%cI <file>`). Falls back to file mtime if
 * git is unavailable or the file is untracked.
 *
 * Wired via the package.json "prebuild" script — runs before every prod build.
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SITEMAP_PATH = resolve(REPO_ROOT, "public/sitemap.xml");
const BLOG_DATA = resolve(REPO_ROOT, "src/data/blogPosts.ts");
const ROUTES_FILE = resolve(REPO_ROOT, "src/routes.tsx");

// URL path → source file backing that route. Paths relative to REPO_ROOT.
// Kept in sync with src/routes.tsx.
const STATIC_ROUTE_MAP = {
  "/": "src/pages/generales/Home.tsx",
  "/a-propos": "src/pages/generales/APropos.tsx",
  "/services": "src/pages/generales/Service.tsx",
  "/tarifs": "src/pages/generales/Tarif.tsx",
  "/contact": "src/pages/generales/Contact.tsx",
  "/ressources": "src/pages/generales/Ressources.tsx",
  "/blog": "src/pages/generales/BlogIndex.tsx",
  "/conduite": "src/pages/generales/Details1.tsx",
  "/code-en-ligne": "src/pages/generales/Details5.tsx",
  "/passerelle": "src/pages/generales/Details4.tsx",
  "/accompagnement": "src/pages/generales/Details6.tsx",
  "/post-permis": "src/pages/generales/Details7.tsx",
  "/equipe/arike": "src/pages/generales/EquipeArike.tsx",
  "/location": "src/pages/generales/Details.tsx",
  "/actualisation": "src/pages/generales/Details2.tsx",
  "/fabrication-permis": "src/pages/generales/Details3.tsx",
  "/quiz": "src/pages/generales/Quiz.tsx",
  "/quiz/VE": "src/pages/learners/Quiz/QuizPage.tsx",
  "/quiz/VI": "src/pages/learners/Quiz/QuizPage.tsx",
  "/quiz/QSER": "src/pages/learners/Quiz/QuizPage.tsx",
  "/quiz/PS": "src/pages/learners/Quiz/QuizPage.tsx",
  "/politique-confidentialite": "src/pages/generales/Politique.tsx",
  "/cgu": "src/pages/generales/Condition.tsx",
};

/** Get ISO date (YYYY-MM-DD) of last commit touching the file. */
function lastmodForFile(relPath) {
  const abs = resolve(REPO_ROOT, relPath);
  if (!existsSync(abs)) {
    console.warn(`[sitemap] source missing: ${relPath} — keeping prior lastmod`);
    return null;
  }
  try {
    const isoFull = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }).trim();
    if (isoFull) return isoFull.slice(0, 10);
  } catch {
    /* fall through to mtime */
  }
  // Fallback: file mtime.
  return statSync(abs).mtime.toISOString().slice(0, 10);
}

/** Most-recent commit ISO date across multiple files. */
function lastmodAcrossFiles(relPaths) {
  const dates = relPaths
    .map((p) => lastmodForFile(p))
    .filter(Boolean)
    .sort();
  return dates.length ? dates[dates.length - 1] : null;
}

/** Resolve blog slug → source file. Body lives in blogPosts.ts so that's the
 *  signal; route component itself is BlogArticle.tsx. We use whichever moved
 *  most recently. */
function blogPostLastmod(slug) {
  return lastmodAcrossFiles([
    "src/data/blogPosts.ts",
    "src/pages/generales/BlogArticle.tsx",
  ]);
}

/** Given a URL path, return list of source files whose latest commit drives
 *  the lastmod for that URL. */
function sourceFilesForUrlPath(urlPath) {
  // Blog post: /blog/<slug>
  const blogMatch = urlPath.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    return ["src/data/blogPosts.ts", "src/pages/generales/BlogArticle.tsx"];
  }
  const direct = STATIC_ROUTE_MAP[urlPath];
  if (direct) return [direct];
  // Unknown — fall back to routes file so we at least bump on routing changes.
  return [ROUTES_FILE.replace(REPO_ROOT + "\\", "").replace(/\\/g, "/")];
}

/** Extract blog slugs from src/data/blogPosts.ts (regex, no TS parse). */
function discoverBlogSlugs() {
  if (!existsSync(BLOG_DATA)) return [];
  const src = readFileSync(BLOG_DATA, "utf8");
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) slugs.push(m[1]);
  return slugs;
}

/** Append any missing blog post URLs to the sitemap before </urlset>. */
function ensureBlogUrls(xml) {
  const slugs = discoverBlogSlugs();
  const missing = slugs.filter((s) => !xml.includes(`/blog/${s}<`));
  if (missing.length === 0) return xml;
  const blocks = missing
    .map(
      (s) =>
        `  <url>\n    <loc>https://smoni.fr/blog/${s}</loc>\n    <lastmod>1970-01-01</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`,
    )
    .join("\n");
  console.log(`[sitemap] adding ${missing.length} missing blog URLs`);
  return xml.replace("</urlset>", `${blocks}\n</urlset>`);
}

function main() {
  if (!existsSync(SITEMAP_PATH)) {
    console.error(`[sitemap] not found: ${SITEMAP_PATH}`);
    process.exit(1);
  }
  let xml = readFileSync(SITEMAP_PATH, "utf8");
  xml = ensureBlogUrls(xml);

  // Iterate every <url> block and rewrite its <lastmod>.
  xml = xml.replace(
    /<url>([\s\S]*?)<\/url>/g,
    (block) => {
      const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
      if (!locMatch) return block;
      const loc = locMatch[1].trim();
      let urlPath;
      try {
        urlPath = new URL(loc).pathname;
      } catch {
        return block;
      }
      // Normalise trailing slash on root.
      if (urlPath !== "/" && urlPath.endsWith("/")) urlPath = urlPath.slice(0, -1);

      const sources = sourceFilesForUrlPath(urlPath);
      const lastmod = lastmodAcrossFiles(sources);
      if (!lastmod) return block;

      if (/<lastmod>[^<]*<\/lastmod>/.test(block)) {
        return block.replace(
          /<lastmod>[^<]*<\/lastmod>/,
          `<lastmod>${lastmod}</lastmod>`,
        );
      }
      // No existing tag — insert one right after <loc>.
      return block.replace(
        /<\/loc>/,
        `</loc>\n    <lastmod>${lastmod}</lastmod>`,
      );
    },
  );

  writeFileSync(SITEMAP_PATH, xml, "utf8");
  console.log("[sitemap] stamped lastmod values from git history");
}

main();
