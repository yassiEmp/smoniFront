import { motion } from "framer-motion";
import {
  IllustrationDelai,
  IllustrationAudit,
  IllustrationVolume,
  IllustrationExamen,
  IllustrationCreneaux,
  IllustrationMoniteur,
} from "./MesureIllustrations";
import Reveal from "./Reveal";

// Distinct from "Notre différence" (contractual engagements below): this section is operational reality —
// what we measure, what we track, what we offer day-to-day.
// Same scannable micro-hierarchy as the engagements section: KEYWORD (F-pattern landing) → title → body w/ one bolded promise.
// `featured: true` triggers the Von Restorff visual anchor (1 card, distinct treatment) so the eye enters there.
const features = [
  {
    n: "01",
    keyword: "24h",
    featured: true,
    title: "Réponse sous 24h ouvrées",
    body: "Appel manqué, email, formulaire de contact — on revient toujours sous 24h en semaine. Pas de standard qui filtre, pas de devis qui se perd.",
    emphasis: "on revient toujours sous 24h en semaine",
    Illustration: IllustrationDelai,
  },
  {
    n: "02",
    keyword: "Livret",
    title: "Livret horodaté à chaque cours",
    body: "Heure de début et heure de fin notées et signées sur votre livret. Vous gardez la trace écrite. 100% des cours documentés, sans exception.",
    emphasis: "100% des cours documentés",
    Illustration: IllustrationAudit,
  },
  {
    n: "03",
    keyword: "200+",
    title: "200+ dossiers depuis 2022",
    body: "Petite équipe, croissance lente, pas d'avis Google achetés. Si vous voulez parler à un·e ancien·ne élève en direct, on vous met en relation.",
    emphasis: "on vous met en relation",
    Illustration: IllustrationVolume,
  },
  {
    n: "04",
    keyword: "Examen",
    title: "Examens blancs en conditions réelles",
    body: "Itinéraires d'examen reconnus, inspecteur simulé, briefing pré-examen et débrief post. Pour transformer le stress en certitude le jour J.",
    emphasis: "transformer le stress en certitude",
    Illustration: IllustrationExamen,
  },
  {
    n: "05",
    keyword: "20h + Sam",
    title: "Créneaux jusqu'à 20h + samedi entier",
    body: "Pas besoin de poser une demi-journée pour conduire 1h. Réservation en ligne, annulation jusqu'à 24h avant sans frais.",
    emphasis: "annulation jusqu'à 24h avant sans frais",
    Illustration: IllustrationCreneaux,
  },
  {
    n: "06",
    keyword: "Référent",
    title: "Un moniteur référent, pas une rotation",
    body: "Le même moniteur vous suit du début à la fin — il connaît vos points faibles, votre progression, votre stress. Changement gratuit possible si le courant ne passe pas.",
    emphasis: "Le même moniteur vous suit du début à la fin",
    Illustration: IllustrationMoniteur,
  },
];

// Mobile-only reorder: in a single-column stack the featured card belongs near the eye's natural rest point
// (middle of the list), not at the top. Pure CSS via Tailwind `order-*` — reset with md:order-none so the
// multi-col grid restores DOM order. Class strings are static so the JIT picks them up.
const MOBILE_ORDER_CLASS = ["order-1", "order-2", "order-3", "order-4", "order-5", "order-6"] as const;
const featuredIdx = features.findIndex((f) => f.featured);
const middleSlot = Math.ceil(features.length / 2);
const slotFor = (i: number) => {
  if (i === featuredIdx) return middleSlot;
  // Non-featured items keep their DOM rank but skip the middle slot reserved for the featured card.
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: {},
  visible: {},
};

const HomeFeaturesSection = () => {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6"
        variants={containerVariants}
      >
        {/* Section Header — mirrors engagements: small mobile-first type, text-balance, progressive spacing */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mb-12 sm:mb-14 lg:mb-20">
          <motion.div className="max-w-2xl space-y-3 sm:space-y-4" variants={itemVariants}>
            <p
              className="inline-block text-[11px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.3em] text-[#2c2876]/90 px-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Ce qu'on mesure, ce qu'on offre
            </p>
            <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[#1e1b4b] leading-tight lg:leading-[1.1] text-balance" style={{ fontFamily: "'Outfit', sans-serif" }}>
              6 preuves de <span className="text-primary italic">fonctionnement</span> — pas des slogans.
            </h2>
          </motion.div>
          <motion.p className="text-slate-700 text-[15px] sm:text-base md:text-lg lg:text-xl max-w-md font-medium lg:mb-2" variants={itemVariants}>
            Le secteur parle beaucoup de « qualité ». Voici ce qu'on mesure, ce qu'on trace, ce qu'on propose au quotidien. Les engagements contractuels, eux, sont juste en dessous.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0"
          variants={containerVariants}
        >
          {features.map((f, i) => {
            const Illustration = f.Illustration;
            return (
              <motion.li
                key={f.n}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`${MOBILE_ORDER_CLASS[slotFor(i) - 1]} md:order-none w-full max-w-md mx-auto md:max-w-none md:mx-0`}
              >
                <Reveal delay={i * 90} className="h-full">
                <article
                  aria-labelledby={`mesure-${f.n}-title`}
                  className={`group h-full rounded-2xl overflow-hidden flex flex-col transition-[box-shadow,border-color] duration-300 ${
                    f.featured
                      ? "bg-white shadow-md ring-2 ring-blue-500/25 hover:shadow-2xl hover:ring-blue-500/40"
                      : "bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#2c2876]/15"
                  }`}
                >
                  <div className="relative aspect-[16/9] bg-[#f3f1ff] overflow-hidden">
                    {/* Bringhurst hierarchy: drop non-featured opacity so the illustration reads as context, not content.
                        Featured card stays full strength so it dominates the row. Hover lifts everything back to 100%. */}
                    <div
                      className={`absolute inset-0 transition-[transform,opacity] duration-500 ease-out motion-safe:group-hover:scale-[1.03] group-hover:opacity-100 ${
                        f.featured ? "opacity-100" : "opacity-[0.78]"
                      }`}
                    >
                      <Illustration />
                    </div>
                    {f.featured && (
                      <span
                        className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-600 text-white text-[9px] sm:text-[10px] font-black tracking-[0.12em] sm:tracking-[0.14em] shadow-sm"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        ★ LE PLUS RASSURANT
                      </span>
                    )}
                    {/* Fade the SVG bottom into the card body — same trick as engagements: illustration blends, doesn't shout. */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-white" />
                  </div>
                  <div className="p-5 sm:p-6 pt-4 sm:pt-5 flex-1 flex flex-col">
                    <div className="mb-2.5 sm:mb-3">
                      <span
                        className="text-[11px] font-black uppercase tracking-[0.18em] sm:tracking-[0.22em] text-blue-600 truncate"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {f.keyword}
                      </span>
                    </div>
                    <h3
                      id={`mesure-${f.n}-title`}
                      className={`font-black text-[#2c2876] leading-snug mb-2.5 text-balance ${
                        f.featured ? "text-[17px] sm:text-lg" : "text-[16px] sm:text-base"
                      }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      <span className="sr-only">Preuve n°{f.n} — </span>
                      {f.title}
                    </h3>
                    <p className="text-[15px] sm:text-sm text-slate-600 leading-relaxed">
                      {renderBody(f.body, f.emphasis)}
                    </p>
                  </div>
                </article>
                </Reveal>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default HomeFeaturesSection;
