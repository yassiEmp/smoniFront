// Smoni — Home "Adultes 25-45+" section · V2 layout
// 2×2 quad of equal-weight promise cards + full-width indigo phone band.
// Locked Y-system palette and typography; SSG-rendered (no lazy/ClientOnly).

import { CSSProperties, ComponentType, MouseEvent } from "react";
import { A_Horaires, A_Code, A_Discretion, A_Expat } from "./HomeAdultesIllustrations";

type Promise = {
  n: string;
  tag: string;
  title: string;
  body: string;
  Art: ComponentType;
};

const PROMISES: Promise[] = [
  {
    n: "01",
    tag: "Horaires",
    title: "Cours 18h–20h + samedi entier.",
    body: "Pas besoin de poser un jour. Réservation en ligne, annulation jusqu'à 24h avant sans frais.",
    Art: A_Horaires,
  },
  {
    n: "02",
    tag: "Code à distance",
    title: "Le Code, depuis votre canapé.",
    body: "Plateforme en ligne, 40 QCM par série, suivi de progression. On vient à l'auto-école quand vous êtes prêt·e.",
    Art: A_Code,
  },
  {
    n: "03",
    tag: "Discrétion",
    title: "Voiture sans panneau, si vous voulez.",
    body: "Pas envie d'annoncer à vos collègues que vous passez le permis à 35 ans ? On vous comprend. Option discrétion sur demande.",
    Art: A_Discretion,
  },
  {
    n: "04",
    tag: "Expat · International",
    title: "Dossiers étrangers acceptés.",
    body: "Permis converti, dossier expat, papiers atypiques — on a déjà vu. Cours en français ou en anglais, au choix.",
    Art: A_Expat,
  },
];

const cardBase: CSSProperties = {
  position: "relative",
  background: "#ffffff",
  border: "1px solid #eef0f7",
  borderRadius: 20,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)",
  transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
};

const onCardEnter = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.04), 0 32px 60px -28px rgba(44, 40, 118, 0.28)";
  e.currentTarget.style.borderColor = "#dcd9f0";
};
const onCardLeave = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)";
  e.currentTarget.style.borderColor = "#eef0f7";
};

const Eyebrow = ({ tag, n }: { tag: string; n: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      alignSelf: "stretch",
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.22em",
      color: "#2c2876",
      textTransform: "uppercase",
      marginBottom: 12,
    }}
  >
    <span style={{ color: "#a5a3c9" }}>{n}</span>
    <span>{tag}</span>
    <span aria-hidden="true" style={{ flex: 1, height: 1, background: "#e6e3f5" }} />
  </div>
);

const IndexBadge = ({ n }: { n: string }) => (
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
      color: "rgba(44,40,118,0.55)",
      background: "rgba(255, 255, 255, 0.75)",
      backdropFilter: "blur(6px)",
      padding: "4px 9px",
      borderRadius: 999,
      border: "1px solid rgba(44, 40, 118, 0.1)",
      zIndex: 2,
    }}
  >
    {n} <span style={{ opacity: 0.45 }}>/</span> 04
  </div>
);

const PhoneIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size}>
    <path
      d="M3.5 1.5 L5.5 1.5 L6.5 4.5 L5 6 Q 6.5 9 10 10.5 L 11.5 9 L 14.5 10 L 14.5 12.5 Q 14.5 14.5 12.5 14.5 Q 3.5 14.5 1.5 5.5 Q 1.5 3.5 3.5 1.5 Z"
      fill="currentColor"
    />
  </svg>
);

const QuadCard = ({ c }: { c: Promise }) => (
  <article style={cardBase} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", flexShrink: 0 }}>
      <c.Art />
      <IndexBadge n={c.n} />
    </div>
    <div style={{ padding: "24px 26px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
      <Eyebrow tag={c.tag} n={c.n} />
      <h3
        style={{
          margin: 0,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          lineHeight: 1.14,
          letterSpacing: "-0.018em",
          color: "#1e1b4b",
          textWrap: "balance",
        }}
      >
        {c.title}
      </h3>
      <p
        style={{
          margin: "14px 0 0",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 14.5,
          lineHeight: 1.58,
          color: "#475569",
          textWrap: "pretty",
        }}
      >
        {c.body}
      </p>
    </div>
  </article>
);

const HomeAdultesSection = () => {
  return (
    <section
      style={{
        position: "relative",
        padding: "96px 32px 120px",
        background: "#f8fafc",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#0f172a",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        <header style={{ maxWidth: 760, marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: "#2c2876",
              marginBottom: 22,
              textTransform: "uppercase",
            }}
          >
            <span>Smoni · 25–45+ ans · adultes</span>
            <span aria-hidden="true" style={{ flex: 1, height: 1, background: "#cfceea", maxWidth: 220 }} />
          </div>
          <h2
            style={{
              margin: "0 0 14px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 52,
              lineHeight: 1.02,
              letterSpacing: "-0.032em",
              color: "#1e1b4b",
              textWrap: "balance",
            }}
          >
            30, 35, 45 ans sans permis&nbsp;?<br />
            <span style={{ fontStyle: "italic", fontWeight: 800, color: "#3b82f6" }}>
              On vous parle comme à un adulte.
            </span>
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: 580,
              color: "#475569",
              fontWeight: 500,
              fontSize: 17,
              lineHeight: 1.55,
              textWrap: "pretty",
            }}
          >
            Cours après le travail, code à distance, zéro condescendance, dossiers expat acceptés. Et — si vous préférez — pas de panneau ridicule sur la voiture.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {PROMISES.map((c) => (
            <QuadCard key={c.n} c={c} />
          ))}
        </div>

        {/* Full-width phone band */}
        <div
          style={{
            position: "relative",
            padding: "26px 36px",
            borderRadius: 20,
            background: "#1e1b4b",
            color: "#fff",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 36,
            alignItems: "center",
            overflow: "hidden",
            boxShadow: "0 24px 60px -28px rgba(28, 25, 90, 0.55)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 6px 6px",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "6%",
              top: "-50%",
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(90,78,184,0.4) 0%, rgba(28,25,90,0) 65%)",
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.65)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              On vous rappelle en 24h
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 28,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#fff",
                textWrap: "balance",
              }}
            >
              Pas sûr·e que ça vous convient&nbsp;?<br />
              <span style={{ color: "#7472b0" }}>Une leçon d'essai, c'est 59&nbsp;€.</span>
            </div>
          </div>
          <a
            href="tel:+33771265119"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              background: "#fff",
              color: "#1e1b4b",
              padding: "16px 22px 16px 18px",
              borderRadius: 14,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "transform 180ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#3b82f6",
                color: "#fff",
              }}
            >
              <PhoneIcon size={16} />
            </span>
            07&nbsp;71&nbsp;26&nbsp;51&nbsp;19
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeAdultesSection;
