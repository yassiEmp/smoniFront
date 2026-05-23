// Smoni — "Recalés / Deuxième chance" home section.
// Bento: 12-col, 4-row layout, all chrome unified with home-star + bento.
// Row 1-2: [HERO 7×2]  [STAT 79% 5×1]  [QUOTE 5×1]
// Row 3:   [STEP1 4×1] [STEP2 4×1]     [STEP3 4×1]
// Row 4:   [BEN1 4×1]  [BEN2 4×1]      [BEN3 4×1]
// Responsiveness uses container queries on the section (containerName: rec).

import { CSSProperties } from "react";
import {
  R_Hero,
  R_Step1,
  R_Step2,
  R_Step3,
  R_BenefitPlan,
  R_BenefitFast,
  R_BenefitFree,
} from "./HomeRecalesIllustrations";
import "./HomeRecalesSection.css";

const C = {
  indigo: "#2c2876",
  deep: "#1e1b4b",
  ind60: "#7472b0",
  ind20: "#cfceea",
  paper: "#ffffff",
  rule: "#e6e3f5",
  bgTint: "#f1f0fb",
  blue: "#3b82f6",
  ink: "#0f172a",
  ink60: "#475569",
};

const baseCard: CSSProperties = {
  position: "relative",
  background: C.paper,
  border: "1px solid #eef0f7",
  borderRadius: 16,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow:
    "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)",
  transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
};

const Eyebrow = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.22em",
      color: tone === "dark" ? "rgba(255,255,255,0.78)" : C.indigo,
      textTransform: "uppercase",
      background: tone === "dark" ? "rgba(255,255,255,0.08)" : C.bgTint,
      border:
        tone === "dark"
          ? "1px solid rgba(255,255,255,0.15)"
          : `1px solid ${C.rule}`,
      padding: "5px 10px",
      borderRadius: 999,
      marginBottom: 14,
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: 6,
        height: 6,
        borderRadius: 999,
        background: C.blue,
        display: "inline-block",
      }}
    />
    {children}
  </div>
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
      color: tone === "dark" ? "rgba(255,255,255,0.55)" : "rgba(44,40,118,0.55)",
      zIndex: 2,
    }}
  >
    {n} / {of}
  </div>
);

const HeroCard = () => {
  return (
    <article
      data-rec="hero"
      style={{ ...baseCard, gridColumn: "1 / 8", gridRow: "1 / 3" }}
    >
      <div
        data-rec="hero-art"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          flexShrink: 0,
          background: "#f3f1ff",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <R_Hero />
        </div>
        <IndexBadge n="00" />
      </div>
      <div
        data-rec="hero-body"
        style={{
          padding: "24px 28px 28px",
          borderTop: "1px solid #eef0f7",
          background: "#fafafd",
        }}
      >
        <Eyebrow>Vous avez déjà raté</Eyebrow>
        <h3
          data-rec="hero-title"
          style={{
            margin: 0,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 28,
            lineHeight: 1.06,
            letterSpacing: "-0.026em",
            color: C.deep,
            textWrap: "balance",
          }}
        >
          Ici, ça ne vous{" "}
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 800,
              background: "linear-gradient(135deg, #2c2876 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            pénalisera pas
          </span>
          .
        </h3>
        <div
          style={{
            width: 40,
            height: 2,
            background: C.indigo,
            borderRadius: 1,
            marginTop: 16,
            marginBottom: 16,
            opacity: 0.85,
          }}
        />
        <p
          style={{
            margin: 0,
            maxWidth: 560,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 13.5,
            lineHeight: 1.6,
            color: C.ink60,
            textWrap: "pretty",
          }}
        >
          Les autres écoles refusent les dossiers «&nbsp;parce que ça baisse leur quota d'examens&nbsp;». Chez
          Smoni, on a un protocole différent pour les recalés —{" "}
          <strong style={{ color: C.deep, fontWeight: 700 }}>sans pack 13h imposé</strong>,{" "}
          <strong style={{ color: C.deep, fontWeight: 700 }}>sans frais de transfert</strong>.
        </p>
      </div>
    </article>
  );
};

const StatCard = () => {
  return (
    <article
      data-rec="stat"
      style={{
        ...baseCard,
        gridColumn: "8 / 13",
        gridRow: "1 / 2",
        background: C.deep,
        border: "1px solid #2c2876",
        color: C.paper,
        padding: "22px 24px",
        justifyContent: "space-between",
      }}
    >
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
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-12%",
          top: "-30%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,78,184,0.4) 0%, rgba(28,25,90,0) 65%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />
      <IndexBadge n="79" of="100" tone="dark" />

      <Eyebrow tone="dark">La spirale du décrochage</Eyebrow>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        <span
          data-rec="stat-num"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 72,
            lineHeight: 0.86,
            letterSpacing: "-0.045em",
            color: C.paper,
          }}
        >
          79
        </span>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 28,
            lineHeight: 1,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          %
        </span>
      </div>

      <p
        style={{
          position: "relative",
          margin: "12px 0 0",
          maxWidth: 360,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 12.5,
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.72)",
          textWrap: "pretty",
        }}
      >
        des candidats qui ratent 3 fois{" "}
        <strong style={{ color: C.paper, fontWeight: 700 }}>abandonnent</strong>. Pas parce qu'ils
        ne savent pas conduire — parce que les écoles s'en désintéressent.
      </p>

      <div
        style={{
          position: "relative",
          marginTop: 18,
          paddingTop: 14,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
          }}
        >
          Source · DGEC, abandon après 3 échecs
        </span>
      </div>
    </article>
  );
};

const QuoteCard = () => {
  return (
    <article
      data-rec="quote"
      style={{
        ...baseCard,
        gridColumn: "8 / 13",
        gridRow: "2 / 3",
        padding: "22px 24px",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #ffffff 0%, #f7f6fc 100%)",
      }}
    >
      <Eyebrow>Citation · réseau</Eyebrow>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 18,
          right: 24,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1,
          color: C.indigo,
          opacity: 0.08,
          pointerEvents: "none",
        }}
      >
        “
      </div>

      <blockquote
        data-rec="quote-text"
        style={{
          margin: 0,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          lineHeight: 1.15,
          letterSpacing: "-0.022em",
          color: C.deep,
          fontStyle: "italic",
          textWrap: "balance",
        }}
      >
        Plus tu rates,{" "}
        <span
          style={{
            background: `linear-gradient(transparent 70%, ${C.blue}40 70%)`,
            padding: "0 2px",
          }}
        >
          plus tu rates
        </span>
        .
      </blockquote>

      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{ width: 24, height: 2, background: C.indigo, opacity: 0.7 }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: C.indigo,
            textTransform: "uppercase",
          }}
        >
          La spirale qu'on coupe
        </span>
      </div>
    </article>
  );
};

type StepData = {
  n: string;
  gridColumn: string;
  label: string;
  title: string;
  body: string;
  chip?: string;
  Art: React.ComponentType;
};

const StepCard = ({ n, gridColumn, label, title, body, chip, Art }: StepData) => {
  return (
    <article
      data-rec="step"
      style={{ ...baseCard, gridColumn, gridRow: "3 / 4" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          flexShrink: 0,
        }}
      >
        <Art />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 14,
            left: 18,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: C.indigo,
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(6px)",
            padding: "4px 9px",
            borderRadius: 999,
            border: `1px solid ${C.ind20}`,
          }}
        >
          ÉTAPE · {n}
        </div>
        <IndexBadge n={n} of="03" />
      </div>
      <div
        style={{
          padding: "18px 20px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: C.ind60,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <h3
          style={{
            margin: "8px 0 0",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 16,
            lineHeight: 1.18,
            letterSpacing: "-0.018em",
            color: C.deep,
            textWrap: "balance",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            width: 28,
            height: 2,
            background: C.indigo,
            borderRadius: 1,
            marginTop: 12,
            marginBottom: 12,
            opacity: 0.85,
          }}
        />
        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 12.5,
            lineHeight: 1.55,
            color: C.ink60,
            textWrap: "pretty",
          }}
        >
          {body}
        </p>
        {chip && (
          <div
            style={{
              alignSelf: "flex-start",
              marginTop: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: C.indigo,
              background: C.bgTint,
              border: `1px solid ${C.rule}`,
              padding: "6px 10px",
              borderRadius: 999,
            }}
          >
            <span
              style={{ width: 6, height: 6, background: C.blue, borderRadius: 999 }}
              aria-hidden="true"
            />
            {chip}
          </div>
        )}
      </div>
    </article>
  );
};

type BenefitData = {
  n: string;
  gridColumn: string;
  Icon: React.ComponentType;
  title: string;
  body: string;
};

const BenefitCard = ({ n, gridColumn, Icon, title, body }: BenefitData) => {
  return (
    <article
      data-rec="benefit"
      style={{
        ...baseCard,
        gridColumn,
        gridRow: "4 / 5",
        padding: "20px 22px 22px",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div style={{ flexShrink: 0, paddingTop: 4 }}>
        <Icon />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: C.ind60,
            textTransform: "uppercase",
          }}
        >
          Avantage · {n}
        </span>
        <h3
          style={{
            margin: "6px 0 0",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 14,
            lineHeight: 1.18,
            letterSpacing: "-0.015em",
            color: C.deep,
            textWrap: "balance",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            width: 24,
            height: 2,
            background: C.indigo,
            borderRadius: 1,
            marginTop: 10,
            marginBottom: 10,
            opacity: 0.85,
          }}
        />
        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 12.5,
            lineHeight: 1.55,
            color: C.ink60,
            textWrap: "pretty",
          }}
        >
          {body}
        </p>
      </div>
    </article>
  );
};

const STEPS: StepData[] = [
  {
    n: "01",
    gridColumn: "1 / 5",
    label: "01 · Appel · 24 h",
    title: "Récupération de dossier.",
    body: "On contacte votre ancienne auto-école, on récupère livret, code et NEPH. Vous n'avez rien à faire.",
    chip: "0 € · ZÉRO FRAIS",
    Art: R_Step1,
  },
  {
    n: "02",
    gridColumn: "5 / 9",
    label: "02 · 1 h au volant",
    title: "Évaluation honnête, gratuite.",
    body: "Vous conduisez 1 h avec un moniteur Smoni. Aucun engagement. On vous dit où vous en êtes — vraiment.",
    chip: "1 H · SANS ENGAGEMENT",
    Art: R_Step2,
  },
  {
    n: "03",
    gridColumn: "9 / 13",
    label: "03 · Plan sur-mesure",
    title: "Pas de pack 13 h imposé.",
    body: "Vous payez les heures dont vous avez besoin. Pas un forfait géant pour repartir à zéro.",
    chip: "0 · FORFAIT IMPOSÉ",
    Art: R_Step3,
  },
];

const BENEFITS: BenefitData[] = [
  {
    n: "01",
    gridColumn: "1 / 5",
    Icon: R_BenefitPlan,
    title: "Plan personnalisé, pas un pack.",
    body: "On bâtit votre reprise sur votre vrai niveau, pas sur le tarif le plus rentable. Préparation mentale anti-stress incluse.",
  },
  {
    n: "02",
    gridColumn: "5 / 9",
    Icon: R_BenefitFast,
    title: "Repasse rapide.",
    body: "Date d'examen sur Vincennes, Rungis ou Créteil — le centre le moins encombré au moment où vous êtes prêt·e.",
  },
  {
    n: "03",
    gridColumn: "9 / 13",
    Icon: R_BenefitFree,
    title: "Transfert sans frais.",
    body: "Frais de transfert facturés par l'ancienne école au-delà de l'administratif réel : illégal. On vous aide à contester.",
  },
];

const HomeRecalesSection = () => (
  <section
    data-rec="section"
    aria-labelledby="recales-heading"
    style={{
      position: "relative",
      padding: "56px 24px 68px",
      background: C.paper,
      overflow: "hidden",
      containerType: "inline-size",
      containerName: "rec",
    }}
  >
    {/* top hairline */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background:
          "linear-gradient(to right, transparent 0%, rgba(44,40,118,0.16) 35%, rgba(44,40,118,0.16) 65%, transparent 100%)",
      }}
    />
    {/* atmospheric halo */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -120,
        left: "50%",
        transform: "translateX(-50%)",
        width: 1100,
        height: 480,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(44,40,118,0.07) 0%, rgba(59,130,246,0.04) 35%, rgba(255,255,255,0) 70%)",
        filter: "blur(6px)",
      }}
    />

    <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
      <header
        data-rec="header"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: 40,
          alignItems: "end",
          marginBottom: 36,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: C.indigo,
              background: C.bgTint,
              border: `1px solid ${C.rule}`,
              borderRadius: 999,
              padding: "8px 14px",
              marginBottom: 24,
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: 6, height: 6, background: C.blue, borderRadius: 999 }}
            />
            Recalés ailleurs · protocole Smoni
          </div>
          <h2
            id="recales-heading"
            data-rec="headline"
            style={{
              margin: 0,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 46,
              lineHeight: 1.04,
              letterSpacing: "-0.028em",
              color: C.deep,
              textWrap: "balance",
            }}
          >
            Déjà raté ? On vous{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 800,
                background: "linear-gradient(135deg, #2c2876 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              remet sur la route
            </span>
            .
          </h2>
        </div>
        <div data-rec="header-sub" style={{ paddingBottom: 10 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14.5,
              lineHeight: 1.55,
              color: "#334155",
              fontWeight: 500,
              textWrap: "pretty",
              maxWidth: 460,
            }}
          >
            Trois étapes claires, trois engagements écrits. On reprend où vous en êtes —{" "}
            <strong style={{ color: C.deep, fontWeight: 700 }}>pas à zéro</strong>.
          </p>
        </div>
      </header>

      <div
        aria-label="Protocole recalés Smoni"
        data-rec="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "minmax(200px, auto)",
          gap: 12,
        }}
      >
        <HeroCard />
        <StatCard />
        <QuoteCard />
        {STEPS.map((s) => (
          <StepCard key={s.n} {...s} />
        ))}
        {BENEFITS.map((b) => (
          <BenefitCard key={b.n} {...b} />
        ))}
      </div>
    </div>
  </section>
);

export default HomeRecalesSection;
