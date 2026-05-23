import { useMemo, useState } from "react";
import { PRICING, PROFILES, type StaticBoutiqueService } from "@/data/pricingData";
import { Link } from "react-router";

// ──────────────────────────────────────────────────────────────
// Smoni · Tarifs publics — design from Claude Design handoff (tarifs.html).
// Data is statically embedded from src/data/pricingData.ts (SSG-friendly,
// no runtime fetch). The DecisionHelper maps a user profile → recommended
// plan via PROFILES[].matchTitle when the active category is Permis B
// Classique. Other categories fall back to the heuristic (max hours,
// tiebreak max price).
// ──────────────────────────────────────────────────────────────

const INDIGO        = "#2c2876";
const INDIGO_DEEP   = "#1e1b4b";
const INDIGO_60     = "#7472b0";
const INDIGO_20     = "#cfceea";
const INDIGO_TINT   = "#f1f0fb";
const INDIGO_BORDER = "#e6e3f5";
const BLUE          = "#3b82f6";
const BLUE_DEEP     = "#2563eb";
const PAPER         = "#ffffff";
const INK           = "#475569";

const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const ALL_INCLUDED = [
  "Présentation à l'examen",
  "Kilométrage illimité",
  "Essence",
  "Contrat écrit, prix au centime",
  "Aucun supplément non prévu",
];

const RISK_REVERSAL = [
  "Sans engagement de durée",
  "Annulation gratuite sous 14 j",
  "Présentation à l'examen incluse",
];

const TRUST_ROW = [
  { v: "CPF",        l: "Mon Compte Formation" },
  { v: "1 €/jour",   l: "Permis à 1 € (jeunes)" },
  { v: "Région IDF", l: "Aide jusqu'à 1 300 €" },
  { v: "3× / 4×",    l: "Paiement sans frais" },
];

// French thousand separator (narrow no-break space).
const fmt = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const fmtPerHour = (n: number) =>
  n.toFixed(2).replace(".", ",");

// Pad a plan index to "01"/"02" style without depending on backend ids.
const padIdx = (i: number) => String(i + 1).padStart(2, "0");

// ──────────────────────────────────────────────────────────────
// PriceArt — type-led illustration: the price IS the iconography.
// ──────────────────────────────────────────────────────────────
let _uid = 0;
const uid = (p: string) => `${p}_${++_uid}`;

interface PlanView {
  id: number;
  n: string;          // "01 / 06"
  total: number;      // 6 (denominator)
  tag: string;
  name: string;
  forWhom?: string;
  price: number;
  pricePerHour: string; // formatted
  duration: string;     // "10 H"
  validity?: string;
  features: string[];
  diffLine?: string;
  isLowestPerHour?: boolean;
}

interface PriceArtProps {
  plan: PlanView;
  dark: boolean;
}

const PriceArt = ({ plan, dark }: PriceArtProps) => {
  const ids = useMemo(
    () => ({ bg: uid("bg"), dots: uid("dots"), diffuse: uid("df") }),
    [],
  );

  const bgFill   = dark ? INDIGO_DEEP : `url(#${ids.bg})`;
  const fg       = dark ? PAPER : INDIGO;
  const fgSoft   = dark ? "rgba(255,255,255,0.55)" : INDIGO_60;
  const fgMuted  = dark ? "rgba(255,255,255,0.16)" : INDIGO_20;
  const shadowFill = dark ? "#0c0926" : INDIGO;
  const shadowOp   = dark ? 0.55 : 0.32;

  return (
    <svg
      viewBox="0 0 400 225"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <defs>
        {!dark && (
          <radialGradient id={ids.bg} cx="32%" cy="55%" r="75%">
            <stop offset="0%" stopColor="#e6e3ff" />
            <stop offset="55%" stopColor="#f3f1ff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </radialGradient>
        )}
        <pattern id={ids.dots} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.55" fill={dark ? "#ffffff" : INDIGO} fillOpacity={dark ? 0.08 : 0.06} />
        </pattern>
        <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="400" height="225" fill={bgFill} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <text x="200" y="56" textAnchor="middle" fill={fgSoft}
        fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="9"
        letterSpacing="0.32em">À PARTIR DE · TTC</text>

      {/* diffuse brand shadow */}
      <text x="200" y="156" textAnchor="middle"
        fill={shadowFill} opacity={shadowOp} filter={`url(#${ids.diffuse})`}
        fontFamily="Outfit, sans-serif" fontWeight="900" letterSpacing="-0.04em">
        <tspan fontSize="58" dy="-32">€</tspan>
        <tspan fontSize="124" dy="32" dx="4">{fmt(plan.price)}</tspan>
      </text>

      <text x="200" y="152" textAnchor="middle"
        fill={fg}
        stroke={dark ? INDIGO_DEEP : PAPER}
        strokeWidth={dark ? 2 : 3}
        strokeLinejoin="round"
        paintOrder="stroke"
        fontFamily="Outfit, sans-serif" fontWeight="900" letterSpacing="-0.04em">
        <tspan fontSize="58" dy="-32">€</tspan>
        <tspan fontSize="124" dy="32" dx="4">{fmt(plan.price)}</tspan>
      </text>

      <line x1="40" y1="180" x2="360" y2="180" stroke={fgMuted} strokeWidth="1" />

      <text x="40" y="200" fill={fgSoft}
        fontFamily={MONO} fontWeight="700" fontSize="9"
        letterSpacing="0.22em">{plan.n} / {String(plan.total).padStart(2, "0")}</text>

      {!dark && (
        <text x="200" y="201" textAnchor="middle" fill={fg}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14"
          letterSpacing="-0.01em">{plan.duration}</text>
      )}

      {!dark && plan.validity && (
        <text x="360" y="200" textAnchor="end" fill={fgSoft}
          fontFamily={MONO} fontWeight="700" fontSize="9"
          letterSpacing="0.22em">{plan.validity.toUpperCase()} DE VALIDITÉ</text>
      )}

      <rect x="197" y="184" width="6" height="2" rx="1" fill={BLUE} />
    </svg>
  );
};

// ──────────────────────────────────────────────────────────────
// Plan card
// ──────────────────────────────────────────────────────────────
interface PlanCardProps {
  plan: PlanView;
  isRecommended: boolean;
}

const PlanCard = ({ plan, isRecommended }: PlanCardProps) => {
  const dark = isRecommended;

  const surface = dark ? INDIGO_DEEP : PAPER;
  const border  = dark ? "#2a276b"   : "#eef0f7";
  const titleC  = dark ? PAPER       : INDIGO_DEEP;
  const subC    = dark ? "rgba(255,255,255,0.78)" : INK;
  const tagBg   = dark ? "rgba(255,255,255,0.08)" : INDIGO_TINT;
  const tagBd   = dark ? "rgba(255,255,255,0.16)" : INDIGO_BORDER;
  const tagFg   = dark ? PAPER : INDIGO;
  const ruleC   = dark ? "rgba(255,255,255,0.85)" : INDIGO;
  const bodyC   = dark ? "rgba(255,255,255,0.78)" : INK;
  const ctaBg   = dark ? PAPER : INDIGO_DEEP;
  const ctaFg   = dark ? INDIGO_DEEP : PAPER;
  const linkC   = dark ? "rgba(255,255,255,0.75)" : INDIGO_60;

  const showBestValue = plan.isLowestPerHour && !isRecommended;

  return (
    <article
      style={{
        position: "relative",
        background: surface,
        border: `1px solid ${border}`,
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: dark
          ? "0 1px 2px rgba(15, 23, 42, 0.06), 0 32px 70px -28px rgba(28, 25, 90, 0.5)"
          : "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)",
        transform: dark ? "translateY(-6px)" : "none",
        transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
        height: "100%",
      }}
    >
      <div className="tarifs-art" style={{ position: "relative", width: "100%", aspectRatio: "24 / 9" }}>
        <PriceArt plan={plan} dark={dark} />
      </div>

      <div style={{ position: "relative", padding: "14px 16px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
        {dark && (
          <div
            aria-label="Plan recommandé"
            style={{
              position: "absolute",
              top: -16,
              right: 20,
              zIndex: 3,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 12px 7px 10px",
              background: BLUE,
              color: PAPER,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.22em",
              borderRadius: 999,
              textTransform: "uppercase",
              boxShadow: "0 10px 24px -8px rgba(59,130,246,0.6), 0 0 0 4px " + INDIGO_DEEP,
            }}
          >
            <span aria-hidden="true" style={{ width: 6, height: 6, background: PAPER, borderRadius: 999 }} />
            Recommandé pour vous
          </div>
        )}

        {showBestValue && (
          <div
            aria-label="Meilleur €/h"
            style={{
              position: "absolute",
              top: -14,
              right: 18,
              zIndex: 3,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 11px 6px 9px",
              background: PAPER,
              color: INDIGO_DEEP,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.22em",
              borderRadius: 999,
              textTransform: "uppercase",
              border: `1px solid ${INDIGO_BORDER}`,
              boxShadow: "0 8px 20px -8px rgba(28,25,90,0.25)",
            }}
          >
            <span aria-hidden="true" style={{ width: 6, height: 6, background: BLUE, borderRadius: 999 }} />
            Meilleur €/h
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 4,
              padding: "5px 10px",
              borderRadius: 999,
              background: dark ? "rgba(59,130,246,0.18)" : "#eef4ff",
              border: dark ? "1px solid rgba(59,130,246,0.32)" : "1px solid #d8e6ff",
              color: dark ? "#bcd5ff" : BLUE_DEEP,
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
              {plan.pricePerHour}
            </span>
            <span style={{ opacity: 0.85, fontSize: 10, letterSpacing: "0.06em" }}>€/heure</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: tagFg,
              textTransform: "uppercase",
              background: tagBg,
              border: `1px solid ${tagBd}`,
              padding: "5px 10px",
              borderRadius: 999,
            }}
          >
            {plan.tag}
          </div>
        </div>

        <h3
          style={{
            margin: 0,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 17,
            lineHeight: 1.15,
            letterSpacing: "-0.018em",
            color: titleC,
          }}
        >
          {plan.name}
        </h3>

        {plan.forWhom && (
          <p
            style={{
              margin: "6px 0 0",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12.5,
              lineHeight: 1.4,
              color: subC,
            }}
          >
            {plan.forWhom}
          </p>
        )}

        <div
          aria-hidden="true"
          style={{ width: 24, height: 2, background: ruleC, borderRadius: 1, marginTop: 10, marginBottom: 10, opacity: 0.85 }}
        />

        {plan.features.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
            {plan.features.map((f, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  alignItems: "start",
                  gap: 8,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12.5,
                  lineHeight: 1.35,
                  color: bodyC,
                  fontWeight: 500,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    background: dark ? "rgba(59,130,246,0.2)" : "#eef4ff",
                    border: dark ? "1px solid rgba(59,130,246,0.36)" : "1px solid #d8e6ff",
                    marginTop: 1,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <path
                      d="M1.5 5 L4 7.4 L8.5 2.5"
                      fill="none"
                      stroke={dark ? "#bcd5ff" : BLUE_DEEP}
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {plan.diffLine && (
          <div
            style={{
              marginTop: 10,
              padding: "8px 10px",
              borderRadius: 10,
              background: dark ? "rgba(255,255,255,0.05)" : "#fafafd",
              border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #eceaf6",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              fontStyle: "italic",
              lineHeight: 1.4,
              color: dark ? "rgba(255,255,255,0.78)" : INDIGO_DEEP,
            }}
          >
            {plan.diffLine}
          </div>
        )}

        <div style={{ flex: 1, minHeight: 6 }} />

        <Link
          to="/learners/boutique"
          style={{
            marginTop: 10,
            width: "100%",
            height: 38,
            borderRadius: 12,
            background: ctaBg,
            color: ctaFg,
            border: dark ? "1px solid rgba(255,255,255,0.85)" : "1px solid " + INDIGO_DEEP,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 14.5,
            letterSpacing: "-0.005em",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            textDecoration: "none",
            boxShadow: dark ? "0 12px 28px -14px rgba(255,255,255,0.4)" : "0 12px 28px -14px rgba(28,25,90,0.5)",
          }}
        >
          {dark ? "Réserver ce forfait" : "Choisir ce forfait"}
          <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
            <path d="M1 6 H14 M10 1 L15 6 L10 11"
              fill="none" stroke={ctaFg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <Link
          to="/learners/boutique"
          style={{
            marginTop: 6,
            height: 22,
            background: "transparent",
            color: linkC,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 12.5,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            textDecoration: "underline",
            textDecorationThickness: 1,
            textUnderlineOffset: 3,
          }}
        >
          Voir le détail complet
        </Link>
      </div>
    </article>
  );
};

// ──────────────────────────────────────────────────────────────
// Static brand strips
// ──────────────────────────────────────────────────────────────
const RiskStrip = () => (
  <div
    style={{
      margin: "0 0 28px",
      padding: "14px 22px",
      borderRadius: 14,
      background: "#fcfcff",
      border: `1px dashed ${INDIGO_BORDER}`,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px 22px",
    }}
  >
    {RISK_REVERSAL.map((t, i) => (
      <span
        key={t}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: INDIGO_DEEP,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M7 1 L12 3.5 V7 Q12 11 7 13 Q2 11 2 7 V3.5 Z"
            fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.2" />
          <path d="M4.5 7 L6.5 9 L9.5 5"
            fill="none" stroke={BLUE_DEEP} strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t}
        {i < RISK_REVERSAL.length - 1 && (
          <span aria-hidden="true" style={{ width: 1, height: 16, background: INDIGO_20, marginLeft: 22 }} />
        )}
      </span>
    ))}
  </div>
);

const AllIncluded = () => (
  <div
    style={{
      marginTop: 28,
      padding: "20px 24px",
      border: `1px solid ${INDIGO_BORDER}`,
      borderRadius: 16,
      background: "#fafafd",
      display: "grid",
      gridTemplateColumns: "auto minmax(0, 1fr)",
      gap: 28,
      alignItems: "center",
    }}
    className="tarifs-included"
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.22em",
        color: INDIGO,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      Tous les forfaits incluent
    </div>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 18px",
      }}
    >
      {ALL_INCLUDED.map((f) => (
        <li
          key={f}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            fontWeight: 600,
            color: INDIGO_DEEP,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="6.5" fill="none" stroke={INDIGO_20} />
            <path d="M3.5 7.2 L6 9.5 L10.5 4.5"
              fill="none" stroke={BLUE_DEEP} strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

const TrustFooter = () => (
  <div
    style={{
      marginTop: 28,
      position: "relative",
      padding: "32px 44px",
      borderRadius: 24,
      background: INDIGO_DEEP,
      color: PAPER,
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 36,
      alignItems: "center",
      overflow: "hidden",
      boxShadow: "0 24px 60px -28px rgba(28, 25, 90, 0.55)",
    }}
    className="tarifs-trust"
  >
    <div
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 6px 6px",
        pointerEvents: "none",
      }}
    />
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "4%", top: "-50%",
        width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(90,78,184,0.4) 0%, rgba(28,25,90,0) 65%)",
        filter: "blur(8px)",
        pointerEvents: "none",
      }}
    />

    <div style={{ position: "relative", maxWidth: 280 }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        03 · Financement
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: 26,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        Aucun ne paye plein pot. <span style={{ color: BLUE }}>4 manières</span> d'alléger.
      </div>
    </div>

    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 0,
        alignItems: "stretch",
      }}
      className="tarifs-trust-row"
    >
      {TRUST_ROW.map((item, i) => (
        <div
          key={item.l}
          style={{
            padding: "0 22px",
            borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 6,
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 22,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            {item.v}
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}
          >
            {item.l}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────
// DecisionHelper — profile chips → recommended plan readout.
// ──────────────────────────────────────────────────────────────
interface DecisionHelperProps {
  profile: string | null;
  onPick: (id: string | null) => void;
  matchedPlan: PlanView | null;
  planCount: number;
}

const DecisionHelper = ({ profile, onPick, matchedPlan, planCount }: DecisionHelperProps) => {
  const eyebrow =
    planCount === 1
      ? "Pas envie de comparer 1 forfait ?"
      : `Pas envie de comparer ${planCount} forfaits ?`;

  return (
    <div
      style={{
        position: "relative",
        padding: "22px 28px 24px",
        background: "linear-gradient(135deg, #1e1b4b 0%, #2c2876 100%)",
        borderRadius: 20,
        marginBottom: 20,
        color: PAPER,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 6px 6px",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-10%", top: "-60%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.32) 0%, rgba(28,25,90,0) 65%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="tarifs-helper"
        style={{
          position: "relative",
          display: "grid",
          gap: 28,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            <span aria-hidden="true" style={{ width: 6, height: 6, background: BLUE, borderRadius: 999 }} />
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 24,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: PAPER,
              marginBottom: 16,
              textWrap: "balance",
            }}
          >
            Dites-nous qui vous êtes — on vous pointe le bon.
          </div>
          <div
            role="radiogroup"
            aria-label="Quel est votre profil"
            style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
          >
            {PROFILES.map((p) => {
              const active = p.id === profile;
              return (
                <button
                  key={p.id}
                  role="radio"
                  type="button"
                  aria-checked={active}
                  onClick={() => onPick(active ? null : p.id)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 999,
                    border: `1px solid ${active ? BLUE : "rgba(255,255,255,0.16)"}`,
                    background: active ? BLUE : "rgba(255,255,255,0.06)",
                    color: PAPER,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 600,
                    letterSpacing: "-0.005em",
                    cursor: "pointer",
                    transition: "background 160ms ease, border-color 160ms ease",
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            padding: "16px 20px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)",
            minWidth: 240,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {profile && matchedPlan ? "Pour votre profil" : "En attente de votre profil"}
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 20,
              lineHeight: 1.15,
              color: PAPER,
              marginBottom: profile && matchedPlan ? 4 : 0,
              textWrap: "balance",
            }}
          >
            {profile && matchedPlan ? matchedPlan.name : "—"}
          </div>
          {profile && matchedPlan && (
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12.5,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}
            >
              {matchedPlan.duration} · {fmt(matchedPlan.price)} € TTC · {matchedPlan.pricePerHour} €/h
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// Map a static service into the view-model the cards expect.
// `hour` is the user-facing duration ("10 H"); `time` is minutes/session.
// ──────────────────────────────────────────────────────────────
const toPlanView = (s: StaticBoutiqueService, index: number, total: number): PlanView => {
  const price = Number(s.price) || 0;
  const hours = Number(s.hour) || 0;
  const perHour = hours > 0 ? price / hours : price;
  const features = (s.items || [])
    .filter((it) => it.status)
    .map((it) => it.label);
  return {
    id: s.id,
    n: padIdx(index),
    total,
    tag: "Forfait",
    name: s.title,
    price,
    pricePerHour: fmtPerHour(perHour),
    duration: hours > 0 ? `${hours} H` : "—",
    features,
  };
};

const HomeTarifSection = () => {
  const categories = PRICING.categories;
  const [activeFormation, setActiveFormation] = useState<number>(categories[0].id);
  const [transmission, setTransmission] = useState<"automatic" | "manual">("automatic");
  const [profile, setProfile] = useState<string | null>(null);

  const currentLabel = (categories.find((c) => c.id === activeFormation)?.label || "")
    .toLowerCase()
    .trim();
  const isAutres = currentLabel.includes("autres") || currentLabel.includes("cpf");
  const isCpf = currentLabel === "cpf";

  const services = useMemo<StaticBoutiqueService[]>(() => {
    const bucket = PRICING.services[String(activeFormation)];
    if (!bucket) return [];
    if (bucket.any && bucket.any.length > 0) return bucket.any;
    return bucket[transmission] ?? [];
  }, [activeFormation, transmission]);

  const { plans, recommendedId, matchedPlan } = useMemo(() => {
    const base = services.map((s, i) => toPlanView(s, i, services.length));

    if (base.length === 0) {
      return { plans: base, recommendedId: null as number | null, matchedPlan: null as PlanView | null };
    }

    // Profile match — only attempts when active category has plans named per
    // PROFILES.matchTitle (currently only category 1 / Permis B Classique).
    let recIndex = -1;
    if (profile) {
      const match = PROFILES.find((p) => p.id === profile);
      if (match) {
        recIndex = base.findIndex((p) => p.name === match.matchTitle);
      }
    }

    // Heuristic fallback: max hours, tiebreak max price.
    if (recIndex < 0) {
      recIndex = 0;
      for (let i = 1; i < base.length; i++) {
        const a = base[i];
        const b = base[recIndex];
        const aHours = parseInt(a.duration, 10) || 0;
        const bHours = parseInt(b.duration, 10) || 0;
        if (aHours > bHours || (aHours === bHours && a.price > b.price)) recIndex = i;
      }
    }

    // Cheapest €/h (only shown when it's NOT the recommended one).
    let cheap = 0;
    for (let i = 1; i < base.length; i++) {
      if (parseFloat(base[i].pricePerHour.replace(",", ".")) <
          parseFloat(base[cheap].pricePerHour.replace(",", "."))) {
        cheap = i;
      }
    }

    const decoratedBase = base.map((p, i) => ({
      ...p,
      isLowestPerHour: i === cheap && i !== recIndex,
    }));

    // When a profile is picked, surface the recommended plan first so the
    // user immediately sees the match — visual order, not data order.
    const decorated =
      profile && recIndex > 0
        ? [decoratedBase[recIndex], ...decoratedBase.filter((_, i) => i !== recIndex)]
        : decoratedBase;

    // matchedPlan: only surface when profile→title actually resolved (so
    // categories without profile-mapped titles show "En attente …").
    let matched: PlanView | null = null;
    if (profile) {
      const match = PROFILES.find((p) => p.id === profile);
      if (match) {
        const found = decorated.find((p) => p.name === match.matchTitle);
        if (found) matched = found;
      }
    }

    return {
      plans: decorated,
      recommendedId: decoratedBase[recIndex]?.id ?? null,
      matchedPlan: matched,
    };
  }, [services, profile]);

  return (
    <section
      aria-labelledby="tarifs-heading"
      className="tarifs-section"
      style={{
        position: "relative",
        padding: "96px 24px 120px",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent 0%, rgba(44,40,118,0.16) 35%, rgba(44,40,118,0.16) 65%, transparent 100%)",
        }}
      />
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <header className="tarifs-header">
          <div>
            <h2
              id="tarifs-heading"
              style={{
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-0.028em",
                color: INDIGO_DEEP,
              }}
              className="tarifs-title"
            >
              Combien ça coûte.{" "}
              <span style={{ color: INDIGO }}>Tout.</span>{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${INDIGO} 0%, ${BLUE} 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Au centime.
              </span>
            </h2>
          </div>

          <div style={{ paddingBottom: 10 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                lineHeight: 1.55,
                color: "#334155",
                fontWeight: 500,
                maxWidth: 460,
              }}
            >
              On affiche tout parce qu'on en a marre du « <em style={{ color: INDIGO_DEEP, fontStyle: "normal", fontWeight: 600 }}>on en parle quand vous venez</em> ».
              CPF, Permis 1 €/jour, aide Région IDF, paiement 3× / 4× —{" "}
              <strong style={{ color: INDIGO_DEEP, fontWeight: 700 }}>tout est possible</strong>.
            </p>
          </div>
        </header>

        {/* DecisionHelper — first interaction, sits above the selectors */}
        <DecisionHelper
          profile={profile}
          onPick={setProfile}
          matchedPlan={matchedPlan}
          planCount={plans.length}
        />

        {/* Selectors */}
        <div
          className="tarifs-selectors"
          style={{
            position: "relative",
            padding: "20px 24px",
            background: INDIGO_TINT,
            border: `1px solid ${INDIGO_BORDER}`,
            borderRadius: 18,
            marginBottom: 20,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: INDIGO,
                textTransform: "uppercase",
              }}
            >
              <span aria-hidden="true">01</span>
              <span aria-hidden="true" style={{ width: 18, height: 1, background: INDIGO_20 }} />
              Formation
            </div>
            <div role="tablist" aria-label="Formations" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {categories.map((f) => {
                const isActive = f.id === activeFormation;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveFormation(f.id)}
                    style={{
                      padding: "9px 14px",
                      borderRadius: 999,
                      border: `1px solid ${isActive ? INDIGO_DEEP : INDIGO_BORDER}`,
                      background: isActive ? INDIGO_DEEP : PAPER,
                      color: isActive ? PAPER : INDIGO_DEEP,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 600,
                      cursor: "pointer",
                      transition: "background 160ms ease, color 160ms ease, border-color 160ms ease",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {!isAutres && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: INDIGO,
                  textTransform: "uppercase",
                }}
              >
                <span aria-hidden="true">02</span>
                <span aria-hidden="true" style={{ width: 18, height: 1, background: INDIGO_20 }} />
                Boîte
              </div>
              <div
                role="radiogroup"
                aria-label="Type de boîte de vitesses"
                style={{
                  display: "inline-flex",
                  padding: 4,
                  background: PAPER,
                  border: `1px solid ${INDIGO_BORDER}`,
                  borderRadius: 999,
                }}
              >
                {([
                  { id: "automatic", label: "Automatique" },
                  { id: "manual",    label: "Manuel" },
                ] as const).map((t) => {
                  const isActive = t.id === transmission;
                  return (
                    <button
                      key={t.id}
                      role="radio"
                      type="button"
                      aria-checked={isActive}
                      onClick={() => setTransmission(t.id)}
                      style={{
                        padding: "9px 22px",
                        borderRadius: 999,
                        border: "none",
                        background: isActive ? INDIGO_DEEP : "transparent",
                        color: isActive ? PAPER : INDIGO_DEEP,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13.5,
                        fontWeight: isActive ? 700 : 600,
                        cursor: "pointer",
                        transition: "background 160ms ease, color 160ms ease",
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <RiskStrip />

        {/* Cards grid */}
        {plans.length === 0 && isCpf ? (
          <div
            role="region"
            aria-label="Financement CPF"
            style={{
              padding: "32px 28px",
              borderRadius: 16,
              background: INDIGO_TINT,
              border: `1px solid ${INDIGO_BORDER}`,
              fontFamily: "'Inter', sans-serif",
              color: INDIGO_DEEP,
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
              gap: 28,
              alignItems: "center",
            }}
            className="tarifs-cpf-card"
          >
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: INDIGO,
                  marginBottom: 12,
                }}
              >
                Financement CPF
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: 24,
                  lineHeight: 1.15,
                  letterSpacing: "-0.018em",
                  color: INDIGO_DEEP,
                }}
              >
                Payez votre permis avec Mon Compte Formation.
              </h3>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: INK,
                }}
              >
                Smoni est <strong style={{ color: INDIGO_DEEP, fontWeight: 700 }}>agréée CPF</strong> pour la formation au permis B
                (boîte manuelle et automatique). On monte votre dossier avec vous, on attend la validation de votre
                compteur, et vous commencez les leçons — <strong style={{ color: INDIGO_DEEP, fontWeight: 700 }}>sans avance de frais</strong>.
              </p>
              <ul
                style={{
                  margin: "16px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 8,
                  fontSize: 13.5,
                  color: INK,
                }}
              >
                {[
                  "Code en ligne + 20 h de conduite, intégralement éligibles CPF",
                  "Dossier monté sous 48 h ouvrées",
                  "Reste à charge possible en 3× ou 4× sans frais",
                ].map((line) => (
                  <li key={line} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        marginTop: 6,
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: BLUE,
                      }}
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
              className="tarifs-cpf-actions"
            >
              <a
                href="https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/results?q=%7B%22quoi%22%3A%22permis+b%22%7D"
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 44,
                  padding: "0 18px",
                  borderRadius: 12,
                  background: INDIGO_DEEP,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  border: `1px solid ${INDIGO_DEEP}`,
                }}
              >
                Vérifier mon solde CPF
              </a>
              <a
                href="/contact?sujet=cpf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 44,
                  padding: "0 18px",
                  borderRadius: 12,
                  background: "#fff",
                  color: INDIGO_DEEP,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  border: `1px solid ${INDIGO_BORDER}`,
                }}
              >
                Monter mon dossier avec Smoni
              </a>
              <p
                style={{
                  margin: "4px 2px 0",
                  fontSize: 12,
                  lineHeight: 1.45,
                  color: INDIGO_60,
                }}
              >
                Pas de CPF suffisant ? Contactez-nous, on cumule CPF + Permis 1 €/jour + aides Région.
              </p>
            </div>
          </div>
        ) : plans.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              color: INK,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              border: `1px dashed ${INDIGO_BORDER}`,
              borderRadius: 16,
            }}
          >
            Aucun forfait disponible pour cette sélection.
          </div>
        ) : (
          <>
            {profile && recommendedId != null && (() => {
              const reco = plans.find((p) => p.id === recommendedId);
              if (!reco) return null;
              return (
                <div
                  className="tarifs-reco-frame"
                  role="note"
                  style={{
                    display: "none",
                    margin: "0 0 14px",
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: INDIGO_TINT,
                    border: `1px solid ${INDIGO_BORDER}`,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: INDIGO_DEEP,
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: INDIGO,
                      marginRight: 8,
                    }}
                  >
                    Recommandé pour vous
                  </span>
                  <span style={{ fontWeight: 700 }}>
                    {reco.duration} · {reco.pricePerHour}/h
                  </span>
                </div>
              );
            })()}
          <ol
            aria-label="Forfaits disponibles"
            className="tarifs-grid"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            {plans.map((plan) => (
              <li key={plan.id} style={{ display: "flex" }}>
                <div style={{ width: "100%" }}>
                  <PlanCard plan={plan} isRecommended={plan.id === recommendedId} />
                </div>
              </li>
            ))}
          </ol>
          </>
        )}

        <AllIncluded />
        <TrustFooter />

        <p
          style={{
            marginTop: 22,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            lineHeight: 1.55,
            color: INDIGO_60,
            textAlign: "center",
            maxWidth: 780,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Tarifs TTC. Frais d'inscription, présentation à l'examen et code en ligne inclus dans tous les forfaits.
          Devis détaillé sous 24 h ouvrées sur demande — sans engagement.
        </p>
      </div>

      {/* Responsive: collapse selectors / header / grid below desktop */}
      <style>{`
        .tarifs-title { font-size: 60px; }
        .tarifs-header {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 56px;
          align-items: end;
          margin-bottom: 48px;
        }
        .tarifs-helper { grid-template-columns: minmax(0, 1fr) auto; }
        @media (min-width: 769px) and (max-width: 1279px) {
          .tarifs-section { padding: 72px 20px 96px !important; }
          .tarifs-title { font-size: 48px !important; }
          .tarifs-header { gap: 32px !important; }
          .tarifs-helper { gap: 18px !important; }
          .tarifs-trust { padding: 24px 32px !important; gap: 24px !important; }
          .tarifs-art { aspect-ratio: 28 / 9 !important; }
        }
        @media (max-width: 1024px) {
          .tarifs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .tarifs-trust-row { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 20px 0 !important; }
        }
        @media (max-width: 768px) {
          .tarifs-section { padding: 64px 16px 80px !important; }
          .tarifs-title { font-size: 36px; }
          .tarifs-header { grid-template-columns: 1fr !important; gap: 20px !important; margin-bottom: 28px !important; }
          .tarifs-helper { grid-template-columns: 1fr !important; gap: 18px !important; }
          .tarifs-selectors { grid-template-columns: 1fr !important; gap: 18px !important; }
          .tarifs-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .tarifs-reco-frame { display: block !important; }
          .tarifs-cpf-card { grid-template-columns: 1fr !important; gap: 22px !important; padding: 24px 20px !important; }
          .tarifs-included { grid-template-columns: 1fr !important; gap: 14px !important; }
          .tarifs-trust { grid-template-columns: 1fr !important; padding: 24px !important; gap: 24px !important; }
          .tarifs-trust-row { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </section>
  );
};

export default HomeTarifSection;
