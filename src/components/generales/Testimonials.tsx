import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import Reveal from "./Reveal";

// "Avis · mot pour mot" — editorial press-style testimonials.
// Design: T3 Editorial (testimonials.html · variant D, kept after AI design iteration).
//   • Hero pull-quote (Nathalie · 13 ans → permis) anchors the page
//   • 3 supporting cards in a responsive grid
//   • Indigo + white + ONE blue accent ("sans filtre" underline, verified pill)
// Copy verbatim from the prior testimonials data — no fabrication.

type Testimonial = {
  id: number;
  name: string;
  initials: string;
  role: string;
  roleLong: string;
  rating: number;
  text: string;
  short: string;
  when: string;
  useReal: boolean;
  avatar: string | null;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Arike Nawade",
    initials: "AN",
    role: "Permis B",
    roleLong: "La meilleure monitrice",
    rating: 5,
    text: "J'ai eu l'opportunité d'être formé par Arike tout au long de mon apprentissage, et je tiens à souligner la qualité remarquable de son accompagnement. Une monitrice à la fois pédagogue, patiente et rigoureuse. Grâce à sa méthode claire, j'ai pu progresser rapidement.",
    short: "Pédagogue, patiente, rigoureuse. Méthode claire — j'ai progressé vite.",
    when: "Mars 2025",
    useReal: false,
    avatar: null,
  },
  {
    id: 2,
    name: "Salina Turay",
    initials: "ST",
    role: "Boîte automatique",
    roleLong: "Nouvelle conductrice",
    rating: 5,
    text: "J'ai eu la chance de passer mon permis en boîte automatique avec Arike, et je ne peux que la recommander chaleureusement ! Dès le premier cours, elle a su me mettre à l'aise grâce à sa patience, son professionnalisme et sa bienveillance.",
    short: "Dès le premier cours, mise à l'aise. Patience, pro, bienveillance — du début à la fin.",
    when: "Janvier 2025",
    useReal: false,
    avatar: null,
  },
  {
    id: 3,
    name: "Sylvain Faure",
    initials: "SF",
    role: "Permis B",
    roleLong: "Ancien élève",
    rating: 5,
    text: "Monitrice patiente et à la critique constructive. Les exercices sont répétés et ré-expliqués jusqu'à être maîtrisés. Accompagnement de qualité jusqu'au bout, avec une préparation solide aux conditions de l'examen.",
    short: "Critique constructive. Exercices répétés et ré-expliqués jusqu'à ce que ce soit maîtrisé.",
    when: "Novembre 2024",
    useReal: false,
    avatar: null,
  },
  {
    id: 4,
    name: "Nathalie Roche",
    initials: "NR",
    role: "Apprenante",
    roleLong: "13 ans de tentatives",
    rating: 5,
    text: "Après 13 ans de galère et de nombreuses dépenses, j'ai enfin décroché le précieux sésame ! Je suis ravie et infiniment reconnaissante pour l'aide précieuse et l'excellente continuation. Merci encore !",
    short: "Après 13 ans de galère, j'ai enfin décroché le précieux sésame. Merci encore.",
    when: "Février 2025",
    useReal: true,
    avatar: "/avatars/apprenant-4.jpg",
  },
];

const StarRow = ({ count = 5, size = 14 }: { count?: number; size?: number }) => (
  <span
    className="inline-flex items-center"
    style={{ gap: 3 }}
    aria-label={`${count} étoiles sur 5`}
  >
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15.2l-5.4 2.8 1.2-6L1.3 7.8l6.1-.7L10 1.5z"
          fill="#2c2876"
        />
      </svg>
    ))}
  </span>
);

const InitialsChip = ({ initials, size = 48 }: { initials: string; size?: number }) => (
  <span
    aria-hidden="true"
    className="inline-flex items-center justify-center flex-shrink-0 rounded-full text-white"
    style={{
      width: size,
      height: size,
      background: "#2c2876",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 900,
      fontSize: Math.round(size * 0.42),
      letterSpacing: "-0.02em",
      boxShadow: "0 0 0 3px #ffffff, 0 0 0 4px #cfceea",
    }}
  >
    {initials}
  </span>
);

const PhotoChip = ({ src, alt, size = 48 }: { src: string; alt: string; size?: number }) => (
  <span
    className="inline-block overflow-hidden flex-shrink-0 rounded-full"
    style={{
      width: size,
      height: size,
      boxShadow: "0 0 0 3px #ffffff, 0 0 0 4px #cfceea",
    }}
  >
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className="w-full h-full object-cover block"
    />
  </span>
);

const Avatar = ({ t, size = 48 }: { t: Testimonial; size?: number }) =>
  t.useReal && t.avatar ? (
    <PhotoChip src={t.avatar} alt={t.name} size={size} />
  ) : (
    <InitialsChip initials={t.initials} size={size} />
  );

const VerifiedPill = () => (
  <span
    className="inline-flex items-center"
    style={{
      gap: 6,
      padding: "4px 10px 4px 8px",
      background: "rgba(59,130,246,0.10)",
      color: "#2563eb",
      borderRadius: 999,
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontWeight: 700,
      fontSize: 9,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
    }}
  >
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="6" fill="#3b82f6" />
      <path
        d="M3.4 6.1l1.8 1.8 3.4-4"
        stroke="#fff"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Avis vérifié
  </span>
);

const QuoteGlyph = ({ size = 150 }: { size?: number }) => (
  <svg
    width={size}
    height={size * 0.85}
    viewBox="0 0 100 85"
    aria-hidden="true"
    className="block"
  >
    <path
      d="M8 65 Q 8 40, 28 22 L 36 30 Q 22 42, 22 54 L 30 54 Q 38 54, 38 62 L 38 70 Q 38 78, 30 78 L 16 78 Q 8 78, 8 70 Z M 56 65 Q 56 40, 76 22 L 84 30 Q 70 42, 70 54 L 78 54 Q 86 54, 86 62 L 86 70 Q 86 78, 78 78 L 64 78 Q 56 78, 56 70 Z"
      fill="#2c2876"
    />
  </svg>
);

const Testimonials = () => {
  const hero = TESTIMONIALS[3];
  const supports = [TESTIMONIALS[0], TESTIMONIALS[1], TESTIMONIALS[2]];

  return (
    <section
      data-screen-label="Home · Témoignages"
      className="relative overflow-hidden bg-[#f8fafc] py-24 lg:py-32"
    >
      {/* Atmospheric halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[180px] left-1/2 w-[720px] h-[720px] rounded-full blur-[140px] bg-[#2c2876]/[0.06]"
        style={{ transform: "translateX(-60%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[240px] -right-[120px] w-[560px] h-[560px] rounded-full blur-[140px] bg-blue-500/[0.10]"
      />

      <div className="relative max-w-[1180px] mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.header
          className="text-center max-w-[760px] mx-auto mb-14"
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block mb-5"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#2c2876",
            }}
          >
            Avis · mot pour mot
          </span>
          <h2
            className="m-0 text-[#2c2876]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 5.2vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              textWrap: "balance",
            }}
          >
            4 voix vraies,{" "}
            <span
              className="relative whitespace-nowrap italic"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                color: "#2563eb",
              }}
            >
              sans filtre
              <svg
                width="100%"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                className="absolute left-0 -bottom-0.5 w-full h-2"
                aria-hidden="true"
              >
                <path
                  d="M2 6 C 50 1, 120 9, 198 4"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h2>
          <p
            className="mt-6 mx-auto max-w-[620px]"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: "#475569",
              fontWeight: 500,
              textWrap: "pretty",
            }}
          >
            Petite équipe, 4 avis bruts —{" "}
            <span style={{ color: "#2c2876", fontWeight: 600 }}>
              pas un mot retouché
            </span>
            . Vous en voulez un cinquième&nbsp;? On vous met en relation directe avec un·e ancien·ne élève.
          </p>
        </motion.header>

        <div className="max-w-[1120px] mx-auto">
          {/* Hero pull-quote */}
          <Reveal delay={0}>
          <motion.article
            className="relative overflow-hidden bg-white grid items-center gap-8 md:gap-12 p-8 md:p-14 rounded-[28px]"
            style={{
              border: "1px solid #e6e3f5",
              boxShadow:
                "0 28px 56px -32px rgba(15,23,42,0.22), 0 2px 6px -2px rgba(15,23,42,0.06)",
              gridTemplateColumns: "minmax(0, 1fr)",
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-7 left-9 opacity-[0.06] pointer-events-none">
              <QuoteGlyph size={150} />
            </div>

            <div className="grid md:grid-cols-[minmax(0,1fr)_320px] gap-8 md:gap-12 items-center">
              <div className="relative pl-3">
                <div className="flex items-center gap-2.5 mb-5">
                  <StarRow count={hero.rating} size={18} />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "#7472b0",
                    }}
                  >
                    AVIS · 13 ANS, 1 PERMIS
                  </span>
                </div>
                <blockquote
                  className="m-0 text-[#1e1b4b]"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(24px, 3vw, 40px)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.025em",
                    textWrap: "balance",
                  }}
                >
                  «&nbsp;Après{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#2c2876]">
                      13 ans de galère
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute"
                      style={{
                        left: -4,
                        right: -4,
                        bottom: 2,
                        height: 14,
                        background: "rgba(59,130,246,0.16)",
                        borderRadius: 4,
                        zIndex: 0,
                      }}
                    />
                  </span>{" "}
                  et de nombreuses dépenses, j'ai enfin décroché le précieux sésame.&nbsp;»
                </blockquote>
                <p
                  className="mt-5 max-w-[540px]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "#475569",
                    fontWeight: 500,
                  }}
                >
                  «&nbsp;Je suis ravie et infiniment reconnaissante&nbsp;». Treize ans d'auto-écoles, et c'est ici que Nathalie l'a eu. On ne va pas faire semblant que c'est banal.
                </p>
              </div>

              {/* Hero byline + photo */}
              <div
                className="flex flex-col items-center gap-3.5 p-6 rounded-[20px] relative"
                style={{
                  background: "#f3f1ff",
                  border: "1px solid #cfceea",
                }}
              >
                <PhotoChip src={hero.avatar!} alt={hero.name} size={104} />
                <div className="text-center">
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: 20,
                      letterSpacing: "-0.01em",
                      color: "#2c2876",
                    }}
                  >
                    {hero.name}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#475569",
                      fontWeight: 500,
                    }}
                  >
                    {hero.roleLong}
                  </div>
                  <div
                    className="mt-2.5"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "#7472b0",
                    }}
                  >
                    {hero.when.toUpperCase()}
                  </div>
                </div>
                <VerifiedPill />
              </div>
            </div>
          </motion.article>
          </Reveal>

          {/* 3-up support grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[18px]">
            {supports.map((t, i) => (
              <Reveal key={t.id} delay={120 + i * 90} className="h-full">
              <motion.article
                className="flex flex-col gap-3.5 bg-white p-6 md:p-[26px_24px_24px] rounded-[22px]"
                style={{
                  border: "1px solid #e6e3f5",
                  boxShadow: "0 10px 24px -16px rgba(15,23,42,0.10)",
                  minHeight: 280,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.05 * i,
                }}
              >
                <div className="flex justify-between items-start">
                  <Avatar t={t} size={48} />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "#7472b0",
                    }}
                  >
                    N°{String(i + 2).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      letterSpacing: "-0.01em",
                      color: "#2c2876",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="mt-0.5"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "#475569",
                      fontWeight: 500,
                    }}
                  >
                    {t.role} · {t.when}
                  </div>
                </div>
                <StarRow count={t.rating} size={13} />
                <p
                  className="m-0 flex-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "#1e1b4b",
                    fontWeight: 500,
                    textWrap: "pretty",
                  }}
                >
                  {t.short}
                </p>
              </motion.article>
              </Reveal>
            ))}
          </div>

          {/* Footer note */}
          <div
            className="mt-8 flex flex-wrap items-center justify-between gap-4 px-7 py-5"
            style={{ borderTop: "1px dashed #cfceea" }}
          >
            <p
              className="m-0 max-w-[560px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#475569",
                fontWeight: 500,
              }}
            >
              <strong style={{ color: "#2c2876", fontWeight: 700 }}>
                4 vrais avis, pas 400 achetés.
              </strong>{" "}
              Vous en voulez un cinquième, en chair et en voix&nbsp;? On vous met en relation directe — numéro ou email, vous choisissez.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                gap: 10,
                padding: "10px 16px",
                background: "#2c2876",
                color: "#fff",
                border: "1.5px solid #2c2876",
                borderRadius: 999,
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "-0.01em",
                boxShadow: "0 8px 20px -10px rgba(44,40,118,0.5)",
              }}
            >
              <MessageSquare className="w-4 h-4" />
              Demander un contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
