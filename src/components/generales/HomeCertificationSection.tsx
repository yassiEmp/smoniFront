import { motion } from "framer-motion";
import { Link } from "react-router";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import imgLabelQualite from "@assets/blog/details7/label-ecole-qualite.png?w=240;480&format=avif;webp;png&as=picture";
import JsonLd from "@components/SEO/JsonLd";
import {
  IllustrationPrix,
  Illustration60Min,
  IllustrationPasDeCris,
  IllustrationRecales,
  IllustrationGarantie,
} from "./EngagementIllustrations";
import Reveal from "./Reveal";

// Each card carries a scannable micro-hierarchy: KEYWORD (F-pattern landing) → title → body w/ one bolded promise.
// `featured: true` triggers the Von Restorff visual anchor (1 card, distinct treatment) so the eye enters there.
const engagements = [
  {
    n: "01",
    keyword: "Tarif",
    featured: true,
    title: "Prix tout-compris, écrit dans le contrat.",
    body: "Tous nos tarifs sont publics. Pas de « supplément examen », pas d'« heures de centre » ajoutées à la dernière minute. Ce que vous voyez = ce que vous payez.",
    emphasis: "Ce que vous voyez = ce que vous payez.",
    Illustration: IllustrationPrix,
  },
  {
    n: "02",
    keyword: "60 min",
    title: "1 heure de conduite = 60 minutes au volant.",
    body: "Pas de plein d'essence, pas de café, pas de « déposer un dossier ». Heure de début et heure de fin notées sur votre livret.",
    emphasis: "Heure de début et heure de fin notées sur votre livret.",
    Illustration: Illustration60Min,
  },
  {
    n: "03",
    keyword: "Respect",
    title: "Aucun moniteur ne vous criera dessus.",
    body: "Si ça arrive, vous nous le dites. Changement gratuit, et entretien avec le moniteur concerné. C'est écrit dans la charte.",
    emphasis: "Changement gratuit",
    Illustration: IllustrationPasDeCris,
  },
  {
    n: "04",
    keyword: "Accès",
    title: "Recalés bienvenus — sans pack 13h imposé.",
    body: "Vous venez d'une autre auto-école ou vous avez raté ? On évalue votre niveau gratuitement, sans minimum d'heures forcé.",
    emphasis: "sans minimum d'heures forcé",
    Illustration: IllustrationRecales,
  },
  {
    n: "05",
    keyword: "Garantie",
    title: "Garantie financière obligatoire (loi).",
    body: "Article L.213-2 du Code de la route : votre argent est protégé. Si on ferme, vous récupérez vos leçons. Attestation sur demande.",
    emphasis: "votre argent est protégé",
    Illustration: IllustrationGarantie,
  },
];

// Mobile-only reorder: in a single-column stack the featured card belongs near the eye's natural rest point
// (middle of the list), not at the top. Pure CSS via Tailwind `order-*` — reset with md:order-none so the
// multi-col grid restores DOM order. Class strings are static so the JIT picks them up.
const MOBILE_ORDER_CLASS = ["order-1", "order-2", "order-3", "order-4", "order-5"] as const;
const featuredIdx = engagements.findIndex((e) => e.featured);
const middleSlot = Math.ceil(engagements.length / 2);
const slotFor = (i: number) => {
  if (i === featuredIdx) return middleSlot;
  const rank = i < featuredIdx ? i + 1 : i;
  return rank < middleSlot ? rank : rank + 1;
};

// Render body text with the emphasis fragment bolded so a single scannable promise pops inside the paragraph.
const renderBody = (body: string, emphasis: string) => {
  const idx = body.indexOf(emphasis);
  if (idx === -1) return body;
  return (
    <>
      {body.slice(0, idx)}
      <strong className="font-extrabold text-[#2c2876]">{body.slice(idx, idx + emphasis.length)}</strong>
      {body.slice(idx + emphasis.length)}
    </>
  );
};

const engagementsItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Les 5 engagements écrits de l'auto-école Smoni Vincennes",
  description:
    "Les cinq engagements contractuels de l'auto-école Smoni à Vincennes (94300) pour toutes nos formations : prix tout-compris, heures de 60 minutes réelles, charte de respect, accueil des candidats recalés, garantie financière L.213-2.",
  numberOfItems: 5,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: engagements.map((e, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: e.title,
    description: e.body,
  })),
};

const HomeCertificationSection = () => {
  return (
    <section
      className="pb-16 sm:pb-24 pt-4 bg-[#f8fafc] relative overflow-hidden"
      aria-labelledby="engagements-heading"
    >
      <JsonLd data={engagementsItemListSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">

        {/* Quality Certification Banner */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 mb-16 md:mb-36 pt-10 md:pt-16 pb-10 md:pb-16 border-b border-slate-200/70">
          <motion.div
            className="text-center md:text-left max-w-md"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#2c2876] mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Établissement Certifié Qualité
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              SMONI est fier d'être détenteur du label <span className="text-blue-600 font-bold">"Qualité des formations au sein des écoles de conduite"</span> délivré par le Ministère de l'Intérieur.
            </p>
          </motion.div>

          <motion.div
            className="relative group"
          >
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ResponsivePicture
              picture={imgLabelQualite}
              alt="Label École Conduite Qualité"
              sizes="(min-width: 768px) 224px, 160px"
              loading="lazy"
              decoding="async"
              className="w-40 md:w-56 h-auto relative z-10 drop-shadow-xl hover:rotate-3 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-bold text-[#2c2876]">Formation Post-Permis Agréée</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-bold text-[#2c2876]">Intervenants Spécialisés ANTS</span>
            </div>
          </motion.div>
        </div>

        {/* Section Heading */}
        <motion.header
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <p className="inline-block text-[11px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.3em] text-[#2c2876]/90 mb-3 px-2">
            Notre différence — Auto-école Smoni Vincennes
          </p>
          <h2
            id="engagements-heading"
            className="text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#2c2876] leading-tight text-balance"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Nos 5 engagements <span className="italic text-blue-600">écrits</span> pour toutes nos formations.
          </h2>
          <p className="sr-only">
            Auto-école Smoni à Vincennes 94300 — cinq engagements contractuels valables pour toutes nos formations.
          </p>
          <p className="text-slate-600 font-medium leading-relaxed mt-4 max-w-2xl mx-auto text-[15px] sm:text-base">
            Moniteur qui crie, heures « obligatoires » la veille de l'examen, factures qui doublent — on connaît
            les histoires. On a écrit une charte pour que ça ne se passe pas ici. Elle est signée avec votre contrat.
          </p>
        </motion.header>

        {/* Engagements list — semantic <ol> w/ ItemList schema. 6-col on lg / 4-col on md so the orphan row (4 & 5) sits centered. */}
        <motion.ol
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 list-none p-0"
          aria-label="Les 5 engagements écrits de Smoni"
        >
          {engagements.map((e, i) => {
            const Illustration = e.Illustration;
            // Center the orphan row: md (4 cols) → item 5 col-start-2; lg (6 cols) → item 4 col-start-2, item 5 col-start-4
            const placement =
              i === 3
                ? "md:col-span-2 lg:col-span-2 lg:col-start-2"
                : i === 4
                  ? "md:col-span-2 md:col-start-2 lg:col-span-2 lg:col-start-4"
                  : "md:col-span-2 lg:col-span-2";
            return (
              <motion.li
                key={e.n}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`${MOBILE_ORDER_CLASS[slotFor(i) - 1]} md:order-none ${placement} w-full max-w-md mx-auto md:max-w-none md:mx-0`}
              >
              <Reveal delay={i * 90} style={{ height: "100%" }}>
                <article
                  aria-labelledby={`engagement-${e.n}-title`}
                  className={`group h-full rounded-2xl overflow-hidden flex flex-col transition-[box-shadow,border-color] duration-300 ${
                    e.featured
                      ? "bg-white shadow-md ring-2 ring-blue-500/25 hover:shadow-2xl hover:ring-blue-500/40"
                      : "bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#2c2876]/15"
                  }`}
                >
                  <div className="relative aspect-[16/9] bg-[#f3f1ff] overflow-hidden">
                    {/* Decoration — opacity reduced so it reads as context, not content (Bringhurst hierarchy).
                        Featured card stays at full strength so it dominates the row. motion-safe guards
                        suppress the scale on touch devices where :hover state can stick after a tap. */}
                    <div
                      className={`absolute inset-0 transition-[transform,opacity] duration-500 ease-out motion-safe:group-hover:scale-[1.03] group-hover:opacity-100 ${
                        e.featured ? "opacity-100" : "opacity-[0.78]"
                      }`}
                    >
                      <Illustration />
                    </div>
                    {e.featured && (
                      <span
                        className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-600 text-white text-[9px] sm:text-[10px] font-black tracking-[0.12em] sm:tracking-[0.14em] shadow-sm"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        ★ LE PLUS DEMANDÉ
                      </span>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-white" />
                  </div>
                  <div className="p-5 sm:p-6 pt-4 sm:pt-5 flex-1 flex flex-col">
                    <div className="mb-2.5 sm:mb-3">
                      <span
                        className="text-[11px] font-black uppercase tracking-[0.18em] sm:tracking-[0.22em] text-blue-600 truncate"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {e.keyword}
                      </span>
                    </div>
                    <h3
                      id={`engagement-${e.n}-title`}
                      className={`font-black text-[#2c2876] leading-snug mb-2.5 text-balance ${
                        e.featured ? "text-[17px] sm:text-lg" : "text-[16px] sm:text-base"
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      <span className="sr-only">Engagement n°{e.n} — </span>
                      {e.title}
                    </h3>
                    <p className="text-[15px] sm:text-sm text-slate-600 leading-relaxed">
                      {renderBody(e.body, e.emphasis)}
                    </p>
                  </div>
                </article>
              </Reveal>
              </motion.li>
            );
          })}
        </motion.ol>

        {/* Conversion CTA — Cialdini commitment + Krug clarity: one primary, one secondary, action-first verbs. */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            to="/tarifs"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full bg-[#2c2876] text-white font-bold text-sm sm:text-[15px] shadow-sm hover:bg-[#1e1b4b] hover:shadow-md transition-all w-full sm:w-auto"
            aria-label="Voir les tarifs détaillés à Vincennes"
          >
            Voir les tarifs détaillés →
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full bg-white text-[#2c2876] font-bold text-sm sm:text-[15px] border border-[#2c2876]/20 hover:border-[#2c2876]/40 hover:bg-slate-50 transition-all w-full sm:w-auto"
            aria-label="Prendre rendez-vous à l'auto-école Smoni Vincennes"
          >
            Prendre rendez-vous gratuit
          </Link>
        </motion.div>

        <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-10 px-2">
          Auto-école déclarée • SAS Arike Bello • SIREN 915 387 013 • Agrément préfectoral sur demande
        </p>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default HomeCertificationSection;
