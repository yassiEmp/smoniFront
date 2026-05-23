import { motion } from "framer-motion";
import {
  IllustrationCreation,
  IllustrationAgence,
  IllustrationOuverture,
  IllustrationPermis,
} from "./HomeStarIllustrations";

// "Une vraie agence, pas une vitrine" — 4 chiffres-clés cards.
// Layout per the design (smoni home-star.html §6 in-context card):
//   • 16:9 illustration banner top, no fade
//   • Body lifted -16px to overlap into the illustration's base
//   • Mono "SMONI · N°XX · CATEGORY" tag → Outfit value → 32×2 indigo rule → label/desc
//   • Top-right counter "0X / 04" pill, brand-tinted low alpha over the illustration
const stats = [
  {
    n: "01",
    category: "CRÉATION",
    value: "2022",
    label: "Auto-école indépendante",
    description: "Créée à Vincennes en juillet 2022. Petite équipe, vraie agence.",
    Illustration: IllustrationCreation,
  },
  {
    n: "02",
    category: "AGENCE",
    value: "1",
    label: "Adresse physique",
    description: "62 rue de la Jarry, 94300 Vincennes. Pas de réseau inventé.",
    Illustration: IllustrationAgence,
  },
  {
    n: "03",
    category: "OUVERTURE",
    value: "6/6",
    label: "Jours par semaine",
    description: "Lundi à samedi, 9h-20h. Cours du soir et samedi disponibles.",
    Illustration: IllustrationOuverture,
  },
  {
    n: "04",
    category: "PERMIS",
    value: "3",
    label: "Formations enseignées",
    description: "Permis B, boîte automatique (B78), moto selon disponibilité.",
    Illustration: IllustrationPermis,
  },
];

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

const HomeStarSection = () => {
  const total = stats.length;
  return (
    <section className="relative py-24 lg:py-32 bg-[#f8fafc] overflow-hidden">
      {/* Atmospheric halos behind the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[120px] left-[20%] w-[720px] h-[720px] rounded-full blur-[140px] bg-[#2c2876]/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[80px] right-[12%] w-[560px] h-[560px] rounded-full blur-[140px] bg-blue-500/[0.05]"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
        <motion.header
          className="max-w-[720px] mb-14 lg:mb-18"
        >
          <h2
            className="mt-[18px] mb-[14px] font-black text-[#2c2876] leading-[0.98] tracking-[-0.035em] text-balance"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(40px, 5.4vw, 76px)",
            }}
          >
            Une vraie agence, <br className="md:hidden" />
            <span className="italic font-extrabold text-blue-500">pas une vitrine</span>.
          </h2>
          <p className="max-w-[560px] text-slate-600 font-medium text-[17px] leading-[1.55]">
            Quatre choses qu'on peut vérifier sur place, au 62&nbsp;rue de la Jarry.
            Pas de chiffres gonflés, pas de réseau inventé.
          </p>
        </motion.header>

        {/* Hidden SEO heading kept from previous version. */}
        <h2 className="sr-only">
          Smoni Auto-École Vincennes (94300) en quelques chiffres — Permis B, boîte automatique et moto
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 min-[1240px]:grid-cols-4 gap-7 sm:gap-8 min-[1240px]:gap-7"
        >
          {stats.map((s) => {
            const Illustration = s.Illustration;
            return (
              <motion.article
                key={s.n}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative bg-white rounded-[20px] border border-[#eef2f7] overflow-hidden shadow-[0_24px_50px_-28px_rgba(15,23,42,0.22),0_2px_6px_-2px_rgba(15,23,42,0.06)] hover:shadow-[0_36px_70px_-32px_rgba(15,23,42,0.32),0_4px_10px_-2px_rgba(15,23,42,0.08)] transition-shadow duration-500"
              >
                <div className="relative w-full aspect-[16/9] bg-[#f3f1ff] overflow-hidden">
                  <Illustration />
                </div>

                <div className="relative -mt-4 bg-white rounded-t-[20px] px-[26px] pt-[26px] pb-[28px] min-[1240px]:px-7 min-[1240px]:pt-7 min-[1240px]:pb-8">
                  <div className="flex items-baseline gap-3.5 mt-2.5 mb-1.5">
                    <span
                      className="font-black text-[#2c2876] leading-[0.9] tracking-[-0.045em]"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "clamp(64px, 7vw, 96px)",
                      }}
                      aria-label={`${s.value} — ${s.label}`}
                    >
                      {s.value}
                    </span>
                  </div>

                  <span aria-hidden="true" className="block w-8 h-0.5 bg-[#2c2876] my-3.5" />

                  <h3
                    className="font-extrabold text-slate-900 text-[19px] leading-[1.2] tracking-[-0.005em] mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {s.label}
                  </h3>
                  <p className="text-slate-600 font-medium text-[14.5px] leading-[1.55] text-pretty">
                    {s.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeStarSection;
