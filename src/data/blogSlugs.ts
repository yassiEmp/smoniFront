// Slug-only manifest used by routes.tsx getStaticPaths() at SSG build time.
// Lives separately from blogPosts.ts (294 KB of article bodies) so that the
// home route's static module graph does NOT pull the full corpus into the
// app chunk — visitors who never open /blog/* shouldn't pay for it.
//
// IMPORTANT: keep in sync with blogPosts.ts. If you add/remove an article,
// add/remove its slug here too.
export const blogSlugs = [
  "peur-mecanique",
  "reussir-le-code-en-ligne",
  "maitriser-les-ronds-points",
  "eco-conduite-guide",
  "permis-accelere-avis",
  "conduire-de-nuit",
  "permis-b-a-vincennes-prix-duree-demarches-en-2026",
  "prix-pour-repasser-le-permis-b-apres-echec",
  "auto-ecole-vincennes-formation-permis-b-2026",
  "prix-permis-b-2026-tarifs-aides-cpf",
  "jai-rate-ma-manoeuvre-au-permis-quoi-faire",
  "heures-supplementaires-auto-ecole-vos-droits-2026",
  "boite-automatique-vs-manuelle-quel-permis-choisir-2026",
  "passer-son-permis-a-30-40-ans-guide-2026",
  "transfert-dossier-auto-ecole-droits-procedure-2026",
  "auto-ecole-sans-frais-caches-grille-tarifaire-honnete-2026",
  "gerer-stress-examen-permis-7-techniques",
  "jai-rate-mon-permis-comment-le-repasser-rapidement-2026",
] as const;
