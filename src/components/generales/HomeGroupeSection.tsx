import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { ResponsivePicture } from "@/components/ui/responsive-picture";

import imgLocation from "@assets/images/home/img_hero1.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgConduite from "@assets/images/home/img_hero2.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgCode from "@assets/images/home/img_hero3.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgAccompagnement from "@assets/images/home/img_hero4.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgPostPermis from "@assets/services/post-permis.png?w=400;640;820&format=avif;webp;png&as=picture";

// ──────────────────────────────────────────────────────────
// Design tokens — Smoni "Nos formations" bento (Claude Design)
// ──────────────────────────────────────────────────────────
const FC = {
  indigo: "#2c2876",
  deep: "#1e1b4b",
  ind60: "#7472b0",
  paper: "#ffffff",
  rule: "#e6e3f5",
  bgTint: "#f1f0fb",
  blue: "#3b82f6",
  ink60: "#475569",
};

// ── Reusable atoms ────────────────────────────────────────
const MonoLabel = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.22em",
      color: tone === "dark" ? "rgba(255,255,255,0.55)" : FC.ind60,
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
);

const Badge = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.22em",
      color: tone === "dark" ? "rgba(255,255,255,0.85)" : FC.indigo,
      textTransform: "uppercase",
      background: tone === "dark" ? "rgba(255,255,255,0.08)" : FC.bgTint,
      border:
        tone === "dark"
          ? "1px solid rgba(255,255,255,0.18)"
          : `1px solid ${FC.rule}`,
      padding: "5px 10px",
      borderRadius: 999,
      backdropFilter: "blur(6px)",
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: 6,
        height: 6,
        borderRadius: 999,
        background: FC.blue,
      }}
    />
    {children}
  </span>
);

const IndexBadge = ({
  n,
  of = "06",
  tone = "light",
}: {
  n: string;
  of?: string;
  tone?: "light" | "dark";
}) => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      top: 14,
      right: 18,
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.22em",
      color:
        tone === "dark" ? "rgba(255,255,255,0.55)" : "rgba(44,40,118,0.55)",
      zIndex: 2,
    }}
  >
    {n} / {of}
  </div>
);

const Cta = ({
  children = "Voir détails",
  tone = "light",
}: {
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.01em",
      color: tone === "dark" ? FC.paper : FC.deep,
    }}
  >
    {children}
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        width: 22,
        height: 22,
        borderRadius: 999,
        background: tone === "dark" ? "rgba(255,255,255,0.14)" : FC.bgTint,
        border:
          tone === "dark"
            ? "1px solid rgba(255,255,255,0.22)"
            : `1px solid ${FC.rule}`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ArrowRight
        className="w-3 h-3"
        style={{ color: tone === "dark" ? "#fff" : FC.indigo }}
        strokeWidth={2.2}
      />
    </span>
  </span>
);

// ── Card chrome ───────────────────────────────────────────
const cardBase: React.CSSProperties = {
  position: "relative",
  background: FC.paper,
  border: "1px solid #eef0f7",
  borderRadius: 20,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow:
    "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)",
  transition:
    "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
};
const onEnter = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow =
    "0 1px 2px rgba(15, 23, 42, 0.04), 0 32px 60px -28px rgba(44, 40, 118, 0.28)";
  e.currentTarget.style.borderColor = "#dcd9f0";
};
const onLeave = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow =
    "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)";
  e.currentTarget.style.borderColor = "#eef0f7";
};

// ── Media helper ──────────────────────────────────────────
type PictureSource = Parameters<typeof ResponsivePicture>[0]["picture"];
const Media = ({
  image,
  alt,
  sizes = "(min-width: 1280px) 410px, (min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw",
}: {
  image: string | PictureSource;
  alt: string;
  sizes?: string;
}) => (
  <>
    {/* atmospheric tint overlay — keeps imagery on-brand */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(44,40,118,0.05) 0%, rgba(44,40,118,0.18) 100%)",
        zIndex: 1,
      }}
    />
    {typeof image === "string" ? (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : (
      <ResponsivePicture
        picture={image}
        alt={alt}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )}
  </>
);

// ── Data ──────────────────────────────────────────────────
type Formation = {
  uri: string;
  badge: string;
  label: string;
  title: string;
  body: string;
  chip?: string;
  image: string | PictureSource;
  alt: string;
};

const HERO: Formation = {
  uri: "/conduite",
  badge: "Le plus demandé",
  label: "Formation · 01 · Permis B",
  title: "Permis B (boîte manuelle)",
  body: "20 à 30h de conduite réelle, code de la route inclus avec Pass Rousseau 24/7. Pas en option payante.",
  image: imgConduite,
  alt: "Permis B (boîte manuelle) — permis B 94300",
};

const CODE: Formation = {
  uri: "/code-en-ligne",
  badge: "Inclus",
  label: "Formation · 04 · Code",
  title: "Code de la route — En ligne 24/7",
  body: "Pass Rousseau inclus dans tous nos forfaits. Tests illimités. Session présentielle hebdo à l'agence si vous préférez.",
  image: imgCode,
  alt: "Code de la route — En ligne 24/7 — Pass Rousseau",
};

const FORMATIONS: Array<Formation & { n: string }> = [
  {
    n: "03",
    uri: "/conduite",
    badge: "Sur demande",
    label: "Formation · 03 · Moto",
    title: "Permis Moto (A1 / A2 / 125)",
    body: "Plateau, circulation, code moto. Le plateau lent appris par étapes, sans panique. Selon dispo moniteur.",
    chip: "SELON DISPO MONITEUR",
    image: imgLocation,
    alt: "Permis Moto — auto-école Val-de-Marne",
  },
  {
    n: "05",
    uri: "/conduite",
    badge: "Express",
    label: "Formation · 05 · Stage",
    title: "Stage accéléré 1 semaine",
    body: "20h de conduite sur 5-7 jours. Prix verrouillé, 0 supplément. Pour qui veut le permis vite, sans surprise.",
    chip: "PRIX VERROUILLÉ",
    image: imgAccompagnement,
    alt: "Stage accéléré 1 semaine — près de Saint-Mandé",
  },
  {
    n: "06",
    uri: "/contact",
    badge: "Sans pénalité",
    label: "Formation · 06 · Reprise",
    title: "Reprise pour recalés",
    body: "Vous avez raté ? Évaluation gratuite (1h), plan personnalisé, pas de pack 13h imposé. Sans frais de transfert.",
    chip: "0 € · SANS ENGAGEMENT",
    image: imgPostPermis,
    alt: "Reprise pour recalés — moniteurs certifiés BEPECASER",
  },
];

// ── Motion variants ───────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// ──────────────────────────────────────────────────────────
const HomeGroupeSection = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="formations-heading"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28"
    >
      {/* top hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(44,40,118,0.16) 35%, rgba(44,40,118,0.16) 65%, transparent 100%)",
        }}
      />
      {/* atmospheric halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block"
        style={{
          top: -120,
          width: 1100,
          height: 480,
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(44,40,118,0.07) 0%, rgba(59,130,246,0.04) 35%, rgba(255,255,255,0) 70%)",
          filter: "blur(6px)",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-[1280px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* ─── Header ─── */}
        <motion.header
          variants={itemVariants}
          className="mb-10 grid items-end gap-6 md:mb-12 md:grid-cols-[1.4fr_1fr] md:gap-14"
        >
          <div>
            <div
              className="mb-5 inline-flex items-center gap-2"
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                color: FC.indigo,
                background: FC.bgTint,
                border: `1px solid ${FC.rule}`,
                borderRadius: 999,
                padding: "8px 14px",
                textTransform: "uppercase",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  background: FC.blue,
                  borderRadius: 999,
                }}
              />
              06 formations · prix affichés
            </div>
            <h2
              id="formations-heading"
              className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[60px]"
              style={{
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-0.028em",
                color: FC.deep,
              }}
            >
              On enseigne ce qu'on sait{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #2c2876 0%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                enseigner — bien
              </span>
              .
            </h2>
          </div>
          <div className="pb-1 md:pb-2">
            <p
              className="text-pretty text-[15px] md:text-[17px]"
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.55,
                color: "#334155",
                fontWeight: 500,
                maxWidth: 460,
              }}
            >
              Six formations, six promesses écrites.{" "}
              <strong style={{ color: FC.deep, fontWeight: 700 }}>
                Prix affichés
              </strong>
              , aucune surprise sur la facture.
            </p>
          </div>
        </motion.header>

        {/* ─── Bento grid ─── */}
        <motion.div
          aria-label="Formations Smoni"
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-6 lg:grid-cols-12"
          style={{ gridAutoRows: "minmax(0, auto)" }}
        >
          {/* HERO · Permis B — large */}
          <motion.article
            variants={itemVariants}
            onClick={() => handleNavigate(HERO.uri)}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="cursor-pointer sm:col-span-6 lg:col-span-8 lg:row-span-2"
            style={cardBase}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "16 / 9", background: "#f3f1ff" }}
            >
              <Media
                image={HERO.image}
                alt={HERO.alt}
                sizes="(min-width: 1280px) 820px, (min-width: 1024px) 60vw, 92vw"
              />
              <div className="absolute left-4 top-4 z-10">
                <Badge>{HERO.badge}</Badge>
              </div>
              <IndexBadge n="01" />
            </div>
            <div
              className="flex flex-col"
              style={{
                padding: "26px 28px 28px",
                borderTop: "1px solid #eef0f7",
                background: "#fafafd",
              }}
            >
              <MonoLabel>{HERO.label}</MonoLabel>
              <h3
                className="text-balance text-2xl md:text-[32px] lg:text-[36px]"
                style={{
                  margin: "10px 0 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  lineHeight: 1.04,
                  letterSpacing: "-0.028em",
                  color: FC.deep,
                }}
              >
                Permis B{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #2c2876 0%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  boîte manuelle
                </span>
                .
              </h3>
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: FC.indigo,
                  borderRadius: 1,
                  marginTop: 16,
                  marginBottom: 16,
                  opacity: 0.85,
                }}
              />
              <p
                className="text-pretty"
                style={{
                  margin: 0,
                  maxWidth: 560,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: FC.ink60,
                }}
              >
                <strong style={{ color: FC.deep, fontWeight: 700 }}>
                  20 à 30 h de conduite réelle
                </strong>
                , code de la route inclus avec Pass Rousseau 24/7. Pas en
                option payante.
              </p>
              <div style={{ marginTop: 18 }}>
                <Cta>Voir le forfait</Cta>
              </div>
            </div>
          </motion.article>

          {/* STAT · B78 75% — dark indigo */}
          <motion.article
            variants={itemVariants}
            onClick={() => handleNavigate("/passerelle")}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative cursor-pointer sm:col-span-3 lg:col-span-4"
            style={{
              ...cardBase,
              background: FC.deep,
              border: "1px solid #2c2876",
              color: FC.paper,
              padding: "26px 28px",
              justifyContent: "space-between",
            }}
          >
            {/* halftone */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 6px 6px",
                pointerEvents: "none",
              }}
            />
            {/* glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-15%",
                top: "-30%",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(90,78,184,0.45) 0%, rgba(28,25,90,0) 65%)",
                filter: "blur(6px)",
                pointerEvents: "none",
              }}
            />
            <IndexBadge n="02" tone="dark" />
            <Badge tone="dark">Le plus efficace</Badge>

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginTop: 14,
              }}
            >
              <span
                className="text-[64px] sm:text-[76px] lg:text-[96px]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  lineHeight: 0.86,
                  letterSpacing: "-0.045em",
                  color: FC.paper,
                }}
              >
                75
              </span>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 36,
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                %
              </span>
            </div>

            <p
              className="text-pretty"
              style={{
                position: "relative",
                margin: "10px 0 0",
                maxWidth: 320,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 13.5,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              de réussite nationale en{" "}
              <strong style={{ color: FC.paper, fontWeight: 700 }}>
                boîte auto (B78)
              </strong>{" "}
              vs 57 % en manuelle. 13 à 20 h suffisent.
            </p>

            <div
              style={{
                position: "relative",
                marginTop: 18,
                paddingTop: 14,
                borderTop: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <MonoLabel tone="dark">Passerelle 7 h possible</MonoLabel>
              <Cta tone="dark">Voir B78</Cta>
            </div>
          </motion.article>

          {/* CODE · 24/7 */}
          <motion.article
            variants={itemVariants}
            onClick={() => handleNavigate(CODE.uri)}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="cursor-pointer sm:col-span-3 lg:col-span-4"
            style={cardBase}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Media image={CODE.image} alt={CODE.alt} />
              <div className="absolute left-4 top-4 z-10">
                <Badge>{CODE.badge}</Badge>
              </div>
              <IndexBadge n="04" />
            </div>
            <div
              className="flex flex-1 flex-col"
              style={{ padding: "20px 22px 22px" }}
            >
              <MonoLabel>{CODE.label}</MonoLabel>
              <h3
                className="text-balance"
                style={{
                  margin: "6px 0 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 19,
                  lineHeight: 1.18,
                  letterSpacing: "-0.018em",
                  color: FC.deep,
                }}
              >
                {CODE.title}
              </h3>
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: FC.indigo,
                  borderRadius: 1,
                  marginTop: 10,
                  marginBottom: 10,
                  opacity: 0.85,
                }}
              />
              <p
                className="text-pretty"
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: FC.ink60,
                }}
              >
                {CODE.body}
              </p>
              <div style={{ marginTop: "auto", paddingTop: 14 }}>
                <Cta />
              </div>
            </div>
          </motion.article>

          {/* Bottom row · 3 formation cards */}
          {FORMATIONS.map((f) => (
            <motion.article
              key={f.n}
              variants={itemVariants}
              onClick={() => handleNavigate(f.uri)}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="cursor-pointer sm:col-span-3 lg:col-span-4"
              style={cardBase}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Media image={f.image} alt={f.alt} />
                <div className="absolute left-4 top-4 z-10">
                  <Badge>{f.badge}</Badge>
                </div>
                <IndexBadge n={f.n} />
              </div>
              <div
                className="flex flex-1 flex-col"
                style={{ padding: "22px 24px 24px" }}
              >
                <MonoLabel>{f.label}</MonoLabel>
                <h3
                  className="text-balance"
                  style={{
                    margin: "8px 0 0",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    lineHeight: 1.18,
                    letterSpacing: "-0.018em",
                    color: FC.deep,
                  }}
                >
                  {f.title}
                </h3>
                <div
                  style={{
                    width: 28,
                    height: 2,
                    background: FC.indigo,
                    borderRadius: 1,
                    marginTop: 12,
                    marginBottom: 12,
                    opacity: 0.85,
                  }}
                />
                <p
                  className="text-pretty"
                  style={{
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: FC.ink60,
                  }}
                >
                  {f.body}
                </p>
                {f.chip && (
                  <div
                    style={{
                      alignSelf: "flex-start",
                      marginTop: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily:
                        "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: FC.indigo,
                      background: FC.bgTint,
                      border: `1px solid ${FC.rule}`,
                      padding: "6px 10px",
                      borderRadius: 999,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        background: FC.blue,
                        borderRadius: 999,
                      }}
                      aria-hidden="true"
                    />
                    {f.chip}
                  </div>
                )}
                <div style={{ marginTop: "auto", paddingTop: 14 }}>
                  <Cta />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeGroupeSection;
