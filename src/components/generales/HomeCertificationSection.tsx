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

const engagements = [
  {
    n: "01",
    title: "Prix tout-compris, écrit dans le contrat.",
    body: "Tous nos tarifs sont publics. Pas de \"supplément examen\", pas d'\"heures de centre\" ajoutées à la dernière minute. Ce que vous voyez = ce que vous payez.",
    Illustration: IllustrationPrix,
  },
  {
    n: "02",
    title: "1 heure de conduite = 60 minutes au volant.",
    body: "Pas de plein d'essence, pas de café, pas de \"déposer un dossier\". Heure de début et heure de fin notées sur votre livret.",
    Illustration: Illustration60Min,
  },
  {
    n: "03",
    title: "Aucun moniteur ne vous criera dessus.",
    body: "Si ça arrive, vous nous le dites. Changement gratuit, et entretien avec le moniteur concerné. C'est écrit dans la charte.",
    Illustration: IllustrationPasDeCris,
  },
  {
    n: "04",
    title: "Recalés bienvenus — sans pack 13h imposé.",
    body: "Vous venez d'une autre auto-école ou vous avez raté ? On évalue votre niveau gratuitement, sans minimum d'heures forcé.",
    Illustration: IllustrationRecales,
  },
  {
    n: "05",
    title: "Garantie financière obligatoire (loi).",
    body: "Article L.213-2 du Code de la route : votre argent est protégé. Si on ferme, vous récupérez vos leçons. Attestation sur demande.",
    Illustration: IllustrationGarantie,
  },
];

const engagementsItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Les 5 engagements écrits de l'auto-école Smoni Vincennes",
  description:
    "Les cinq engagements contractuels de l'auto-école Smoni à Vincennes (94300) pour le permis B : prix tout-compris, heures de 60 minutes réelles, charte de respect, accueil des candidats recalés, garantie financière L.213-2.",
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
      className="pb-24 pt-4 bg-[#f8fafc] relative overflow-hidden"
      aria-labelledby="engagements-heading"
    >
      <JsonLd data={engagementsItemListSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">

        {/* Quality Certification Banner */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-28 md:mb-36 pb-12 md:pb-16 border-b border-slate-200/70">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <p className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#2c2876]/90 mb-3">
            Notre différence — Auto-école Smoni Vincennes
          </p>
          <h2
            id="engagements-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2c2876] leading-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Nos 5 engagements <span className="italic text-blue-600">écrits</span>{" "}
            <span className="whitespace-nowrap">pour le permis B</span>.
          </h2>
          <p className="sr-only">
            Auto-école Smoni à Vincennes 94300 — cinq engagements contractuels pour les candidats au permis B,
            boîte manuelle, boîte automatique BVA et conduite accompagnée.
          </p>
          <p className="text-slate-600 font-medium leading-relaxed mt-4 max-w-2xl mx-auto text-[15px] sm:text-base">
            Moniteur qui crie, heures « obligatoires » la veille de l'examen, factures qui doublent — on connaît
            les histoires. On a écrit une charte pour que ça ne se passe pas ici. Elle est signée avec votre contrat.
          </p>
        </motion.header>

        {/* Engagements list — semantic <ol> w/ ItemList schema. 6-col on lg / 4-col on md so the orphan row (4 & 5) sits centered. */}
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
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
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.97 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`${placement} w-full max-w-md mx-auto md:max-w-none md:mx-0`}
              >
                <article
                  aria-labelledby={`engagement-${e.n}-title`}
                  className="group h-full bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#2c2876]/15 transition-[box-shadow,border-color] duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/9] bg-[#f3f1ff] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      <Illustration />
                    </div>
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold tabular-nums text-[#2c2876]/70"
                      style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                      aria-hidden="true"
                    >
                      {e.n} / 05
                    </span>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-white" />
                  </div>
                  <div className="p-5 sm:p-6 pt-5 flex-1 flex flex-col">
                    <h3
                      id={`engagement-${e.n}-title`}
                      className="text-[15px] sm:text-base font-extrabold text-[#2c2876] leading-snug mb-2"
                    >
                      <span className="sr-only">Engagement n°{e.n} — </span>
                      {e.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{e.body}</p>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ol>

        {/* Conversion CTA — Cialdini commitment + Krug clarity: one primary, one secondary, action-first verbs. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            to="/tarifs"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full bg-[#2c2876] text-white font-bold text-sm sm:text-[15px] shadow-sm hover:bg-[#1e1b4b] hover:shadow-md transition-all w-full sm:w-auto"
            aria-label="Voir les tarifs détaillés du permis B à Vincennes"
          >
            Voir les tarifs détaillés du permis B →
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
