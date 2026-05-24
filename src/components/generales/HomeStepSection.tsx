import { useId } from "react";
import type { CSSProperties, MouseEvent, ReactElement } from "react";
import Reveal from "./Reveal";
import "./HomeStepSection.css";

// ──────────────────────────────────────────────────────────────
// Smoni · "Comment ça se passe" — 4 étapes
// Design ported from Claude Design handoff (process.html + process-section.jsx
// + process-illustrations.jsx). Card chrome: 16:9 illustration banner on top,
// body lifted -16px overlapping the banner, mono tag → Outfit title → indigo
// rule → Inter copy. Stepper rail on ≥1240px. CTA strip below.
// ──────────────────────────────────────────────────────────────

const INDIGO        = "#2c2876";
const INDIGO_DEEP   = "#1e1b4b";
const INDIGO_60     = "#7472b0";
const INDIGO_20     = "#cfceea";
const INDIGO_TINT   = "#f3f1ff";
const PAPER         = "#ffffff";
const PAPER_RULE    = "#e6e3f5";
const BLUE          = "#3b82f6";
const INK_60        = "#475569";

const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

// ───────────────────────────────────────────────────────────────
// Shared illustration primitives
// ───────────────────────────────────────────────────────────────
type IllusIds = { bg: string; dots: string; diffuse: string; softblur: string };

const PDefs = ({ ids, haloX = 30 }: { ids: IllusIds; haloX?: number }) => (
  <defs>
    <radialGradient id={ids.bg} cx={`${haloX}%`} cy="55%" r="72%">
      <stop offset="0%" stopColor="#e6e3ff" />
      <stop offset="55%" stopColor="#f3f1ff" />
      <stop offset="100%" stopColor="#f8fafc" />
    </radialGradient>
    <pattern id={ids.dots} width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="0.55" fill={INDIGO} fillOpacity="0.06" />
    </pattern>
    <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
    <filter id={ids.softblur} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

const PConnector = ({ x1, y1, x2, y2, color = BLUE }: { x1: number; y1: number; x2: number; y2: number; color?: string }) => (
  <>
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.78" />
    <circle cx={x2} cy={y2} r="2.5" fill={color} />
  </>
);

const PFrame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 400 225" width="100%" height="100%"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}>
    {children}
  </svg>
);

const StepNumeral = ({ n }: { n: string }) => (
  <text x="18" y="58" fill={INDIGO} opacity="0.10"
    fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="76"
    letterSpacing="-0.04em">{n}</text>
);

// ───────────────────────────────────────────────────────────────
// 01 · Call
// ───────────────────────────────────────────────────────────────
const P1_Call = () => {
  const rid = useId();
  const ids: IllusIds = { bg: `bg_pr${rid}`, dots: `dots_pr${rid}`, diffuse: `df_pr${rid}`, softblur: `sb_pr${rid}` };
  return (
    <PFrame>
      <PDefs ids={ids} haloX={28} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />
      <StepNumeral n="01" />

      <g transform="rotate(4 268 116)">
        <rect x="180" y="44" width="184" height="124" rx="3"
          fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="176" y="36" width="184" height="120" rx="2"
          fill={PAPER} stroke={PAPER_RULE} />
        <rect x="176" y="36" width="184" height="22" fill={INDIGO} />
        <text x="190" y="52" fill={PAPER}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">AGENCE · VINCENNES</text>
        <text x="190" y="78" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7"
          letterSpacing="0.22em">TÉL</text>
        <text x="190" y="94" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14"
          letterSpacing="-0.01em">07 71 26 51 19</text>
        <rect x="184" y="106" width="168" height="38" rx="3"
          fill={BLUE} fillOpacity="0.1" />
        <text x="190" y="120" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7"
          letterSpacing="0.22em">ADRESSE</text>
        <text x="190" y="136" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13"
          letterSpacing="-0.01em">62 rue de la Jarry</text>
        <rect x="320" y="124" width="32" height="2" rx="1" fill={BLUE} />
      </g>

      <g transform="translate(96 122) rotate(-10)">
        <rect x="-44" y="-66" width="88" height="148" rx="14"
          fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <rect x="-44" y="-70" width="88" height="148" rx="14"
          fill={INDIGO} stroke={PAPER} strokeWidth="2.5"
          strokeLinejoin="round" paintOrder="stroke" />
        <rect x="-36" y="-54" width="72" height="118" rx="6"
          fill={INDIGO_DEEP} />
        <rect x="-10" y="-66" width="20" height="4" rx="2"
          fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="1" strokeOpacity="0.4" />
        <text x="0" y="-32" textAnchor="middle" fill={PAPER} fillOpacity="0.55"
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6"
          letterSpacing="0.22em">APPEL ENTRANT</text>
        <text x="0" y="-14" textAnchor="middle" fill={PAPER}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="10"
          letterSpacing="-0.01em">SMONI</text>
        <text x="0" y="2" textAnchor="middle" fill={PAPER} fillOpacity="0.7"
          fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7"
          letterSpacing="0.06em">07 71 26 51 19</text>
        <circle cx="0" cy="40" r="14" fill={BLUE}
          stroke={PAPER} strokeWidth="1.5" />
        <path d="M -5 35 a 2 2 0 0 1 2 -2 h 2 a 1.5 1.5 0 0 1 1.5 1.5 v 1 a 1 1 0 0 1 -1 1 h -0.6 a 0.5 0.5 0 0 0 -0.5 0.5 v 3.2 a 6 6 0 0 0 6 6 h 0.8 a 0.5 0.5 0 0 0 0.5 -0.5 v -0.6 a 1 1 0 0 1 1 -1 h 1 a 1.5 1.5 0 0 1 1.5 1.5 v 1.4 a 2 2 0 0 1 -2 2 h -0.8 a 11 11 0 0 1 -11 -11 Z"
          fill={PAPER} />
      </g>

      <g fill="none" stroke={INDIGO} strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M 142 46 Q 156 38 168 44" />
        <path d="M 130 32 Q 156 18 178 28" />
      </g>

      <PConnector x1={148} y1={70} x2={222} y2={134} />
    </PFrame>
  );
};

// ───────────────────────────────────────────────────────────────
// 02 · Devis 24h
// ───────────────────────────────────────────────────────────────
const P2_Devis = () => {
  const rid = useId();
  const ids: IllusIds = { bg: `bg_pr${rid}`, dots: `dots_pr${rid}`, diffuse: `df_pr${rid}`, softblur: `sb_pr${rid}` };
  return (
    <PFrame>
      <PDefs ids={ids} haloX={70} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />
      <StepNumeral n="02" />

      <g transform="rotate(3 250 116)">
        <rect x="158" y="36" width="216" height="170" rx="3"
          fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="154" y="28" width="216" height="166" rx="2"
          fill={PAPER} stroke={PAPER_RULE} />
        <text x="170" y="50" fill={INDIGO}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">DEVIS · 2026/0419</text>
        <text x="356" y="50" textAnchor="end" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">SMONI</text>
        <line x1="170" y1="60" x2="356" y2="60" stroke={INDIGO_20} />
        <text x="170" y="78" fill={INDIGO_DEEP}
          fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Permis B · 26 H</text>
        <text x="356" y="78" textAnchor="end" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">1 116 €</text>
        <text x="170" y="94" fill={INDIGO_DEEP}
          fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Code en ligne</text>
        <text x="356" y="94" textAnchor="end" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">incl.</text>
        <text x="170" y="110" fill={INDIGO_DEEP}
          fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Présentation examen</text>
        <text x="356" y="110" textAnchor="end" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">incl.</text>
        <line x1="170" y1="122" x2="356" y2="122" stroke={INDIGO_DEEP} strokeWidth="1.5" />
        <rect x="166" y="124" width="194" height="22" rx="3" fill={BLUE} fillOpacity="0.1" />
        <text x="170" y="140" fill={INDIGO}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13">TOTAL</text>
        <text x="356" y="140" textAnchor="end" fill={INDIGO}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13">1 116 €</text>
        <rect x="322" y="146" width="34" height="2" rx="1" fill={BLUE} />
        <path d="M 170 168 C 184 162, 194 176, 210 168 S 240 162, 256 168"
          fill="none" stroke={INDIGO_60} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <text x="170" y="184" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7"
          letterSpacing="0.18em">SIGNÉ · DIRECTION SMONI</text>
      </g>

      <circle cx="84" cy="138" r="56" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <circle cx="82" cy="132" r="56" fill={INDIGO}
        stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
      <circle cx="82" cy="132" r="46" fill="none"
        stroke={PAPER} strokeOpacity="0.22" strokeWidth="3" />
      <circle cx="82" cy="132" r="46" fill="none"
        stroke={BLUE} strokeWidth="3" strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 46 * 0.18} ${2 * Math.PI * 46}`}
        transform="rotate(-90 82 132)" />
      <text x="82" y="132" textAnchor="middle" dominantBaseline="middle"
        fill={PAPER}
        fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="40"
        letterSpacing="-0.03em">24</text>
      <text x="82" y="156" textAnchor="middle" fill={PAPER} fillOpacity="0.7"
        fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
        letterSpacing="0.28em">HEURES</text>

      <PConnector x1={132} y1={108} x2={228} y2={140} />
    </PFrame>
  );
};

// ───────────────────────────────────────────────────────────────
// 03 · Inscription + 1ère leçon
// ───────────────────────────────────────────────────────────────
const P3_Inscription = () => {
  const rid = useId();
  const ids: IllusIds = { bg: `bg_pr${rid}`, dots: `dots_pr${rid}`, diffuse: `df_pr${rid}`, softblur: `sb_pr${rid}` };
  return (
    <PFrame>
      <PDefs ids={ids} haloX={32} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />
      <StepNumeral n="03" />

      <g transform="rotate(-5 132 116)">
        <path d="M 24 56 L 92 56 L 104 68 L 220 68 L 220 196 L 24 196 Z"
          fill={INDIGO_DEEP} opacity="0.20" filter={`url(#${ids.softblur})`} />
        <path d="M 20 50 L 88 50 L 100 62 L 216 62 L 216 190 L 20 190 Z" fill={INDIGO} />
        <rect x="20" y="62" width="196" height="128" rx="2"
          fill={PAPER} stroke={PAPER_RULE} />
        <rect x="20" y="62" width="196" height="24" fill={INDIGO} />
        <text x="32" y="79" fill={PAPER}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">DOSSIER · ANTS</text>
        <text x="206" y="79" textAnchor="end" fill={PAPER} fillOpacity="0.65"
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">N°042</text>
        <text x="32" y="104" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7"
          letterSpacing="0.18em">NOM</text>
        <line x1="60" y1="106" x2="206" y2="106" stroke={PAPER_RULE} />
        <text x="32" y="122" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7"
          letterSpacing="0.18em">CAT.</text>
        <text x="62" y="122" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">B · automatique</text>
        <text x="32" y="140" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7"
          letterSpacing="0.18em">CODE</text>
        <text x="62" y="140" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">Pass Rousseau</text>
        <rect x="32" y="156" width="80" height="20" rx="10"
          fill={INDIGO} fillOpacity="0.08" stroke={INDIGO_20} />
        <circle cx="44" cy="166" r="3" fill={BLUE} />
        <text x="52" y="170" fill={INDIGO}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8"
          letterSpacing="0.18em">OUVERT</text>
      </g>

      <rect x="178" y="46" width="196" height="166" rx="10"
        fill={INDIGO} opacity="0.30" filter={`url(#${ids.diffuse})`} />
      <rect x="178" y="38" width="196" height="162" rx="10"
        fill={INDIGO}
        stroke={PAPER} strokeWidth="2.5"
        strokeLinejoin="round" paintOrder="stroke" />
      <rect x="206" y="30" width="6" height="16" rx="2"
        fill={INDIGO} stroke={PAPER} strokeWidth="2" />
      <rect x="340" y="30" width="6" height="16" rx="2"
        fill={INDIGO} stroke={PAPER} strokeWidth="2" />
      <rect x="178" y="38" width="196" height="30" rx="10" fill={INDIGO_DEEP} />
      <rect x="178" y="58" width="196" height="10" fill={INDIGO_DEEP} />
      <text x="194" y="58" fill={PAPER}
        fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
        letterSpacing="0.22em">PLANNING · S+1</text>
      {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
        <text key={i} x={194 + i * 24} y={84}
          fill={PAPER} fillOpacity="0.45"
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8"
          letterSpacing="0.18em">{d}</text>
      ))}
      {Array.from({ length: 21 }).map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const x = 188 + col * 24;
        const y = 94 + row * 28;
        const isHL = i === 9;
        const isPast = i < 7;
        return (
          <g key={i}>
            <rect x={x} y={y} width="20" height="22" rx="3"
              fill={isHL ? BLUE : PAPER}
              fillOpacity={isHL ? 0.18 : (isPast ? 0.04 : 0.08)}
              stroke={isHL ? BLUE : "transparent"}
              strokeWidth={isHL ? 1.5 : 0} />
            <text x={x + 10} y={y + 15} textAnchor="middle"
              fill={PAPER}
              fillOpacity={isHL ? 1 : (isPast ? 0.3 : 0.7)}
              fontFamily="Outfit, sans-serif"
              fontWeight={isHL ? 900 : 700}
              fontSize="10">{i + 4}</text>
          </g>
        );
      })}
      <rect x="232" y="118" width="20" height="3" rx="1" fill={BLUE} />
      <text x="242" y="190" textAnchor="middle" fill={PAPER} fillOpacity="0.85"
        fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8"
        letterSpacing="0.22em">1ʳᵉ LEÇON · 14H</text>

      <PConnector x1={148} y1={170} x2={232} y2={128} />
    </PFrame>
  );
};

// ───────────────────────────────────────────────────────────────
// 04 · Code → conduite → examen
// ───────────────────────────────────────────────────────────────
const P4_Examen = () => {
  const rid = useId();
  const ids: IllusIds = { bg: `bg_pr${rid}`, dots: `dots_pr${rid}`, diffuse: `df_pr${rid}`, softblur: `sb_pr${rid}` };
  return (
    <PFrame>
      <PDefs ids={ids} haloX={68} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />
      <StepNumeral n="04" />

      <path d="M 26 156 Q 200 134 374 156"
        fill="none" stroke={INDIGO} strokeWidth="22" strokeLinecap="round"
        opacity="0.22" filter={`url(#${ids.softblur})`} />
      <path d="M 24 150 Q 200 128 376 150"
        fill="none" stroke={INDIGO} strokeWidth="18" strokeLinecap="round" />
      <path d="M 32 150 Q 200 128 368 150"
        fill="none" stroke={PAPER} strokeOpacity="0.42" strokeWidth="1.5"
        strokeDasharray="6 8" strokeLinecap="round" />

      <g>
        <circle cx="74" cy="142" r="22" fill={INDIGO}
          opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <circle cx="74" cy="138" r="22" fill={INDIGO}
          stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
        <text x="74" y="138" textAnchor="middle" dominantBaseline="middle"
          fill={PAPER}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="12">§</text>
        <text x="74" y="180" textAnchor="middle" fill={INDIGO_DEEP}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">CODE</text>
      </g>

      <g>
        <circle cx="200" cy="124" r="22" fill={INDIGO}
          opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <circle cx="200" cy="120" r="22" fill={INDIGO}
          stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
        <circle cx="200" cy="120" r="11" fill="none"
          stroke={PAPER} strokeWidth="2" />
        <circle cx="200" cy="120" r="2.5" fill={PAPER} />
        <line x1="200" y1="111" x2="200" y2="118.5" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
        <line x1="191" y1="120" x2="197" y2="120" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
        <line x1="203" y1="120" x2="209" y2="120" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
        <text x="200" y="162" textAnchor="middle" fill={INDIGO_DEEP}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">CONDUITE</text>
      </g>

      <g>
        <line x1="328" y1="142" x2="328" y2="78" stroke={INDIGO} strokeWidth="3" strokeLinecap="round" />
        <path d="M 328 78 L 372 90 L 328 102 Z" fill={BLUE}
          stroke={PAPER} strokeWidth="2" strokeLinejoin="round" paintOrder="stroke" />
        <circle cx="328" cy="142" r="22" fill={INDIGO}
          opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <circle cx="328" cy="138" r="22" fill={INDIGO}
          stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
        <path d="M 320 138 L 326 144 L 336 132"
          fill="none" stroke={PAPER} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />
        <text x="328" y="180" textAnchor="middle" fill={INDIGO_DEEP}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9"
          letterSpacing="0.22em">EXAMEN</text>
      </g>

      <PConnector x1={222} y1={114} x2={326} y2={84} />

      <text x="22" y="200" fill={INDIGO_60}
        fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8"
        letterSpacing="0.22em">MONITEUR ATTITRÉ · 1×</text>
    </PFrame>
  );
};

// ───────────────────────────────────────────────────────────────
// Steps data
// ───────────────────────────────────────────────────────────────
type Step = {
  n: string;
  tag: string;
  title: string;
  body: string;
  meta: string;
  Illustration: () => ReactElement;
};

const STEPS: Step[] = [
  {
    n: "01",
    tag: "PRISE DE CONTACT",
    title: "Vous appelez ou passez",
    body: "07 71 26 51 19 ou 62 rue de la Jarry. 15 min, on évalue votre profil. Aucune vente forcée.",
    meta: "15 min",
    Illustration: P1_Call,
  },
  {
    n: "02",
    tag: "DEVIS",
    title: "Devis écrit sous 24h",
    body: "Tarifs détaillés, contrat-type Smoni, charte des 5 engagements. Vous lisez à tête reposée.",
    meta: "≤ 24 h",
    Illustration: P2_Devis,
  },
  {
    n: "03",
    tag: "INSCRIPTION",
    title: "Inscription + 1ʳᵉ leçon",
    body: "Dossier ANTS, code démarré (Pass Rousseau), 1ʳᵉ conduite planifiée selon vos dispos.",
    meta: "Semaine S+1",
    Illustration: P3_Inscription,
  },
  {
    n: "04",
    tag: "FORMATION",
    title: "Code → conduite → examen",
    body: "Moniteur attitré, examen blanc en conditions réelles. Date d'examen calée sur votre niveau, pas sur un quota.",
    meta: "Jusqu'au permis",
    Illustration: P4_Examen,
  },
];

// ───────────────────────────────────────────────────────────────
// Stepper rail (≥1240px)
// ───────────────────────────────────────────────────────────────
const StepperRail = () => (
  <div
    aria-hidden="true"
    style={{
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: 28,
      marginBottom: 24,
      paddingTop: 4,
    }}
  >
    {STEPS.map((s, i) => (
      <div
        key={s.n}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingRight: 8,
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: 999,
            background: INDIGO_DEEP,
            color: PAPER,
            border: `2px solid ${PAPER}`,
            boxShadow: `0 0 0 1px ${INDIGO_20}, 0 8px 20px -10px rgba(28,25,90,0.35)`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 14,
            letterSpacing: "-0.01em",
            flexShrink: 0,
          }}
        >
          {s.n}
        </div>
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: INDIGO,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s.tag}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: INK_60,
              marginTop: 2,
            }}
          >
            {s.meta}
          </div>
        </div>
        {i < STEPS.length - 1 && (
          <div
            style={{
              position: "absolute",
              top: 18,
              right: -20,
              width: 40,
              height: 2,
              backgroundImage: `linear-gradient(to right, ${INDIGO_20} 50%, transparent 0)`,
              backgroundSize: "8px 2px",
              backgroundRepeat: "repeat-x",
              zIndex: 1,
            }}
          />
        )}
      </div>
    ))}
  </div>
);

// ───────────────────────────────────────────────────────────────
// Step card
// ───────────────────────────────────────────────────────────────
const cardBaseShadow = "0 24px 50px -28px rgba(15, 23, 42, 0.22), 0 2px 6px -2px rgba(15, 23, 42, 0.06)";
const cardHoverShadow = "0 36px 70px -32px rgba(15, 23, 42, 0.32), 0 4px 10px -2px rgba(15, 23, 42, 0.08)";

const StepCard = ({ step, total }: { step: Step; total: number }) => {
  const { Illustration } = step;
  const articleStyle: CSSProperties = {
    position: "relative",
    background: PAPER,
    borderRadius: 20,
    border: "1px solid #eef2f7",
    boxShadow: cardBaseShadow,
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms cubic-bezier(0.16, 1, 0.3, 1)",
  };
  return (
    <article
      style={articleStyle}
      onMouseEnter={(e: MouseEvent<HTMLElement>) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = cardHoverShadow;
      }}
      onMouseLeave={(e: MouseEvent<HTMLElement>) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = cardBaseShadow;
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          background: INDIGO_TINT,
          overflow: "hidden",
        }}
      >
        <Illustration />
      </div>

      <div
        style={{
          position: "relative",
          padding: "26px 26px 28px",
          marginTop: -16,
          background: PAPER,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.22em",
            color: INDIGO,
            textTransform: "uppercase",
          }}
        >
          ÉTAPE · N°{step.n}{" "}
          <span style={{ color: INDIGO_60, fontWeight: 600 }}>· {step.tag}</span>
        </div>

        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: 32,
            height: 2,
            background: INDIGO,
            margin: "14px 0 14px",
          }}
        />

        <h3
          style={{
            margin: "0 0 8px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 21,
            lineHeight: 1.18,
            letterSpacing: "-0.012em",
            color: INDIGO_DEEP,
            textWrap: "balance",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 14.5,
            lineHeight: 1.55,
            color: INK_60,
            textWrap: "pretty",
          }}
        >
          {step.body}
        </p>
      </div>
    </article>
  );
};

// ───────────────────────────────────────────────────────────────
// Section
// ───────────────────────────────────────────────────────────────
const HomeStepSection = () => {
  const total = STEPS.length;
  return (
    <section
      aria-labelledby="process-heading"
      style={{
        position: "relative",
        padding: "112px 24px 128px",
        background: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -140,
          left: "18%",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: "rgba(44, 40, 118, 0.06)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -100,
          right: "10%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.05)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto" }}>
        <header
          className="process-header"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
            gap: 56,
            alignItems: "end",
            marginBottom: 56,
          }}
        >
          <div>
            <h2
              id="process-heading"
              style={{
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 1.02,
                letterSpacing: "-0.032em",
                color: INDIGO,
                textWrap: "balance",
              }}
            >
              De la 1ʳᵉ question{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 800,
                  color: BLUE,
                }}
              >
                à votre permis
              </span>{" "}
              en poche.
            </h2>
          </div>

          <div style={{ paddingBottom: 8 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                lineHeight: 1.55,
                color: INK_60,
                fontWeight: 500,
                textWrap: "pretty",
                maxWidth: 460,
              }}
            >
              Quatre étapes,{" "}
              <strong style={{ color: INDIGO_DEEP, fontWeight: 700 }}>
                pas de boîte noire
              </strong>
              . Vous savez ce qui se passe — et quand — à chaque instant.
            </p>
          </div>
        </header>

        <div className="process-stepper-wrap">
          <StepperRail />
        </div>

        <ol
          className="process-grid"
          aria-label="Étapes du parcours Smoni"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          {STEPS.map((step, i) => (
            <li key={step.n} style={{ display: "flex" }}>
              <Reveal delay={i * 90} style={{ width: "100%" }}>
                <StepCard step={step} total={total} />
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={STEPS.length * 90 + 120}>
        <div
          className="process-cta"
          style={{
            marginTop: 56,
            padding: "26px 32px",
            borderRadius: 18,
            background: INDIGO_DEEP,
            color: PAPER,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 28,
            alignItems: "center",
            boxShadow: "0 24px 60px -28px rgba(28, 25, 90, 0.55)",
            position: "relative",
            overflow: "hidden",
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
              right: "-6%",
              top: "-80%",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.32) 0%, rgba(28,25,90,0) 65%)",
              filter: "blur(10px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Prêt·e à commencer
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 26,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              Étape 01 — c'est juste un appel.{" "}
              <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>
                Pas d'engagement.
              </span>
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="tel:+33771265119"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 22px",
                borderRadius: 12,
                background: PAPER,
                color: INDIGO_DEEP,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 15,
                letterSpacing: "-0.005em",
                textDecoration: "none",
                boxShadow: "0 12px 28px -14px rgba(255,255,255,0.4)",
                transition: "transform 180ms ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >
              Commencer maintenant
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                <path
                  d="M1 6 H14 M10 1 L15 6 L10 11"
                  fill="none"
                  stroke={INDIGO_DEEP}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="tel:+33771265119"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 22px",
                borderRadius: 12,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.32)",
                color: PAPER,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  width: 18,
                  height: 18,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  background: BLUE,
                  color: PAPER,
                  fontSize: 11,
                }}
              >
                ☏
              </span>
              07 71 26 51 19
            </a>
          </div>
        </div>
        </Reveal>
      </div>

    </section>
  );
};

export default HomeStepSection;
