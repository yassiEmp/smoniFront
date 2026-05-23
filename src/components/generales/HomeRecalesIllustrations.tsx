// Smoni — "Recalés / Deuxième chance" section illustrations.
// Same Y-system as home-star: indigo + white + ONE blue accent,
// halftone ground, radial brand halo, soft diffuse shadow.
// Hero = broken-spiral metaphor; Steps = Swiss type-led; Benefits = pictograms.

import { memo, useId } from "react";

const INDIGO = "#2c2876";
const INDIGO_DEEP = "#1e1b4b";
const INDIGO_60 = "#7472b0";
const INDIGO_20 = "#cfceea";
const PAPER = "#ffffff";
const PAPER_RULE = "#e6e3f5";
const BG = "#f3f1ff";
const BLUE = "#3b82f6";

type DefIds = { bg: string; dots: string; diffuse: string; softblur: string };

// Hoisted geometry for R_Hero — pure constants of literal numbers.
const SP_CX = 248, SP_CY = 232, SP_R0 = 118;
const SPIRAL_PATH = (() => {
  const turns = 2.8, steps = 180;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2 - Math.PI / 2;
    const r = SP_R0 * (1 - t * 0.82);
    const x = SP_CX + Math.cos(a) * r;
    const y = SP_CY + Math.sin(a) * r;
    d += (i === 0 ? "M " : "L ") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  return d;
})();

const A_X1 = 130, A_Y1 = 366;
const A_X2 = 716, A_Y2 = 92;
const aDx = A_X2 - A_X1, aDy = A_Y2 - A_Y1;
const aLen = Math.hypot(aDx, aDy);
const aUx = aDx / aLen, aUy = aDy / aLen;
const aPx = -aUy, aPy = aUx;
const aHead = 22;
const aHeadW = 14;
const aHX = A_X2 - aUx * aHead;
const aHY = A_Y2 - aUy * aHead;
const aLX = aHX + aPx * aHeadW;
const aLY = aHY + aPy * aHeadW;
const aRX = aHX - aPx * aHeadW;
const aRY = aHY - aPy * aHeadW;
const labelT = 0.52;
const labelX = A_X1 + aDx * labelT;
const labelY = A_Y1 + aDy * labelT;
const labelDeg = (Math.atan2(aDy, aDx) * 180) / Math.PI;

const Defs = ({ ids, haloX = 30, haloY = 50 }: { ids: DefIds; haloX?: number; haloY?: number }) => (
  <defs>
    <radialGradient id={ids.bg} cx={`${haloX}%`} cy={`${haloY}%`} r="72%">
      <stop offset="0%" stopColor="#e6e3ff" />
      <stop offset="60%" stopColor={BG} />
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

const Connector = ({ x1, y1, x2, y2, color = BLUE }: {
  x1: number; y1: number; x2: number; y2: number; color?: string;
}) => (
  <>
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.75" />
    <circle cx={x2} cy={y2} r="2.5" fill={color} />
  </>
);

const Frame = ({ vb = "0 0 400 225", children }: { vb?: string; children: React.ReactNode }) => (
  <svg viewBox={vb} width="100%" height="100%"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    {children}
  </svg>
);

// ── HERO · La spirale qu'on coupe (16:9 — 800×450) ───────────────
export const R_Hero = memo(() => {
  const uid = useId();
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };

  return (
    <Frame vb="0 0 800 450">
      <Defs ids={ids} haloX={32} haloY={48} />
      <rect width="800" height="450" fill={`url(#${ids.bg})`} />
      <rect width="800" height="450" fill={`url(#${ids.dots})`} />

      {/* REFUSÉ paper — bottom-left, faded, behind spiral */}
      <g transform="rotate(-9 88 376)" opacity="0.88">
        <rect x="32" y="316" width="136" height="106" rx="2"
          fill={INDIGO_DEEP} opacity="0.16" filter={`url(#${ids.softblur})`} />
        <rect x="28" y="312" width="136" height="106" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="40" y="328" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="8" letterSpacing="0.22em">ÉCOLE PRÉCÉDENTE</text>
        <line x1="40" y1="334" x2="152" y2="334" stroke={INDIGO_20} />
        <line x1="40" y1="348" x2="140" y2="348" stroke={INDIGO_20} />
        <line x1="40" y1="358" x2="120" y2="358" stroke={INDIGO_20} />
        <line x1="40" y1="368" x2="146" y2="368" stroke={INDIGO_20} />
        <line x1="40" y1="378" x2="112" y2="378" stroke={INDIGO_20} />
        <g transform="translate(96 398) rotate(-14)">
          <rect x="-34" y="-13" width="68" height="24" rx="2"
            fill="none" stroke={INDIGO} strokeWidth="1.8" opacity="0.85" />
          <text textAnchor="middle" y="4" fill={INDIGO} opacity="0.88"
            fontFamily="JetBrains Mono, monospace" fontWeight="700"
            fontSize="10" letterSpacing="0.22em">REFUSÉ</text>
        </g>
      </g>

      {/* THE SPIRAL */}
      <g>
        <path d={SPIRAL_PATH} fill="none" stroke={INDIGO}
          strokeOpacity="0.34" strokeWidth="18" strokeLinecap="round"
          filter={`url(#${ids.diffuse})`} transform="translate(0 6)" />
        <path d={SPIRAL_PATH} fill="none" stroke={PAPER}
          strokeWidth="12" strokeLinecap="round" />
        <path d={SPIRAL_PATH} fill="none" stroke={INDIGO}
          strokeWidth="6" strokeLinecap="round" />
        <circle cx={SP_CX} cy={SP_CY} r="5" fill={INDIGO} />

        {[-128, -65, 0, 60, 125].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const r1 = SP_R0 + 12, r2 = SP_R0 + 22;
          const tx = SP_CX + Math.cos(a) * (r2 + 14);
          const ty = SP_CY + Math.sin(a) * (r2 + 14) + 3;
          return (
            <g key={i}>
              <line
                x1={SP_CX + Math.cos(a) * r1} y1={SP_CY + Math.sin(a) * r1}
                x2={SP_CX + Math.cos(a) * r2} y2={SP_CY + Math.sin(a) * r2}
                stroke={INDIGO} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
              <text x={tx} y={ty} textAnchor="middle" fill={INDIGO_60}
                fontFamily="JetBrains Mono, monospace" fontWeight="700"
                fontSize="9" letterSpacing="0.1em">×{i + 1}</text>
            </g>
          );
        })}
      </g>

      {/* THE CUT — blue arrow */}
      <g>
        <line x1={A_X1} y1={A_Y1} x2={A_X2} y2={A_Y2}
          stroke={PAPER} strokeWidth="14" strokeLinecap="round" />
        <line x1={A_X1} y1={A_Y1} x2={A_X2 - aUx * (aHead - 2)} y2={A_Y2 - aUy * (aHead - 2)}
          stroke={BLUE} strokeWidth="4.5" strokeLinecap="round" />
        <polygon
          points={`${A_X2},${A_Y2} ${aLX.toFixed(1)},${aLY.toFixed(1)} ${aRX.toFixed(1)},${aRY.toFixed(1)}`}
          fill={BLUE} stroke={BLUE} strokeWidth="2" strokeLinejoin="round" />
        <circle cx={A_X1} cy={A_Y1} r="5" fill={BLUE} />
        <circle cx={A_X1} cy={A_Y1} r="12" fill="none" stroke={BLUE} strokeOpacity="0.4" strokeWidth="1.4" />
        <circle cx={A_X1} cy={A_Y1} r="20" fill="none" stroke={BLUE} strokeOpacity="0.18" strokeWidth="1.2" />

        <g transform={`translate(${labelX.toFixed(1)} ${labelY.toFixed(1)}) rotate(${labelDeg.toFixed(2)}) translate(0 -14)`}>
          <rect x="-92" y="-11" width="184" height="22" rx="11" fill={PAPER} stroke={BLUE} strokeOpacity="0.4" />
          <circle cx="-80" cy="0" r="3" fill={BLUE} />
          <text x="-70" y="3.5" fill={BLUE}
            fontFamily="JetBrains Mono, monospace" fontWeight="700"
            fontSize="10" letterSpacing="0.22em">SORTIE · PROTOCOLE</text>
        </g>
      </g>

      {/* REPRIS paper — top-right, the destination */}
      <g transform="rotate(5 632 130)">
        <rect x="548" y="58" width="170" height="138" rx="3"
          fill={INDIGO_DEEP} opacity="0.2" filter={`url(#${ids.softblur})`} />
        <rect x="544" y="52" width="170" height="138" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <rect x="544" y="52" width="170" height="26" fill={INDIGO} />
        <text x="556" y="69" fill={PAPER}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="9" letterSpacing="0.22em">DOSSIER · ACTIF</text>
        <text x="556" y="94" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="8" letterSpacing="0.18em">NEPH</text>
        <text x="556" y="108" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="800"
          fontSize="12">12 0494 0023 18</text>
        <line x1="556" y1="118" x2="702" y2="118" stroke={INDIGO_20} />
        <text x="556" y="132" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="8" letterSpacing="0.18em">STATUT</text>
        <rect x="552" y="140" width="154" height="34" rx="3" fill={BLUE} fillOpacity="0.1" />
        <circle cx="566" cy="158" r="7" fill={BLUE} />
        <path d="M 562 158 L 565 162 L 571 154" fill="none"
          stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="580" y="162" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900"
          fontSize="13" letterSpacing="0.01em">REPRIS · J+1</text>
        <text x="556" y="184" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="600"
          fontSize="7" letterSpacing="0.18em">SMONI · VINCENNES · 94300</text>
      </g>

      {/* Mono caption pill — bottom-right */}
      <g transform="translate(540 410)">
        <rect x="0" y="0" width="232" height="26" rx="13" fill={PAPER} stroke={PAPER_RULE} />
        <circle cx="14" cy="13" r="3.2" fill={BLUE} />
        <text x="28" y="18" fill={INDIGO_DEEP}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="10" letterSpacing="0.22em">LA SPIRALE QU'ON COUPE</text>
      </g>
    </Frame>
  );
});

// ── STEP 1 · Récupération de dossier ─────────────────────────────
export const R_Step1 = memo(() => {
  const uid = useId();
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <Frame>
      <Defs ids={ids} haloX={70} haloY={40} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <text x="36" y="200" fill={INDIGO}
        fontFamily="Outfit, sans-serif" fontWeight="900"
        fontSize="240" letterSpacing="-0.05em"
        opacity="0.96">1</text>
      <text x="62" y="216" textAnchor="middle" fill={INDIGO_60}
        fontFamily="JetBrains Mono, monospace" fontWeight="700"
        fontSize="8" letterSpacing="0.22em">APPEL</text>

      <g transform="translate(208 36) rotate(-4)">
        <rect x="0" y="0" width="98" height="22" rx="2"
          fill={PAPER} stroke={INDIGO_20} strokeDasharray="2 3" />
        <text x="49" y="15" textAnchor="middle" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="8" letterSpacing="0.2em">ANCIENNE ÉCOLE</text>
      </g>

      <g transform="translate(220 70) rotate(8)">
        <rect x="4" y="10" width="140" height="100" rx="6"
          fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <path d="M 0 8 L 56 8 L 64 0 L 140 0 L 140 100 L 0 100 Z"
          fill={INDIGO} stroke={PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <rect x="14" y="14" width="108" height="74" rx="2" fill={PAPER} />
        <text x="22" y="28" fill={INDIGO}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="7" letterSpacing="0.18em">NEPH · 12 0494 ...</text>
        <line x1="22" y1="36" x2="114" y2="36" stroke={INDIGO_20} />
        <text x="22" y="48" fill={INDIGO_DEEP}
          fontFamily="Inter, sans-serif" fontWeight="600"
          fontSize="9">Livret d'apprentissage</text>
        <text x="22" y="60" fill={INDIGO_60}
          fontFamily="Inter, sans-serif" fontWeight="500"
          fontSize="8">Code · 12 / 28 obtenu</text>
        <g transform="translate(96 72) rotate(-8)">
          <rect x="-26" y="-9" width="52" height="18" rx="2"
            fill="none" stroke={BLUE} strokeWidth="1.4" />
          <text textAnchor="middle" y="3" fill={BLUE}
            fontFamily="JetBrains Mono, monospace" fontWeight="700"
            fontSize="8" letterSpacing="0.18em">GRATUIT</text>
        </g>
      </g>

      <Connector x1={92} y1={148} x2={228} y2={120} />
    </Frame>
  );
});

// ── STEP 2 · Évaluation gratuite (1h) ────────────────────────────
export const R_Step2 = memo(() => {
  const uid = useId();
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <Frame>
      <Defs ids={ids} haloX={30} haloY={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <text x="24" y="190" fill={INDIGO}
        fontFamily="Outfit, sans-serif" fontWeight="900"
        fontSize="200" letterSpacing="-0.05em">1h</text>
      <text x="116" y="208" textAnchor="middle" fill={INDIGO_60}
        fontFamily="JetBrains Mono, monospace" fontWeight="700"
        fontSize="8" letterSpacing="0.22em">SANS ENGAGEMENT</text>

      <g transform="translate(252 32)">
        <ellipse cx="58" cy="142" rx="42" ry="6" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <circle cx="58" cy="62" r="58" fill={INDIGO}
          stroke={PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <circle cx="58" cy="62" r="48" fill="none" stroke={PAPER} strokeOpacity="0.28" strokeWidth="1.2" />
        <circle cx="58" cy="62" r="18" fill={INDIGO_DEEP} />
        <circle cx="58" cy="62" r="14" fill="none" stroke={PAPER} strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="58" cy="62" r="4" fill={PAPER} />
        <path d="M 58 80 L 58 110" stroke={PAPER} strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 41 53 L 18 38" stroke={PAPER} strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 75 53 L 98 38" stroke={PAPER} strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />

        <circle cx="58" cy="62" r="64" fill="none"
          stroke={BLUE} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 4" />
        <path d="M 58 -2 A 64 64 0 1 1 57.9 -2"
          fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
        <circle cx="58" cy="-2" r="3.5" fill={BLUE} />
        <text x="58" y="-10" textAnchor="middle" fill={BLUE}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="7" letterSpacing="0.2em">00:00</text>
        <text x="46" y="-6" textAnchor="end" fill={BLUE} opacity="0.65"
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="7" letterSpacing="0.18em">60 MIN</text>
      </g>

      <Connector x1={172} y1={142} x2={302} y2={94} />
    </Frame>
  );
});

// ── STEP 3 · 0 pack 13h imposé ───────────────────────────────────
export const R_Step3 = memo(() => {
  const uid = useId();
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <Frame>
      <Defs ids={ids} haloX={32} haloY={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <text x="36" y="200" fill={INDIGO}
        fontFamily="Outfit, sans-serif" fontWeight="900"
        fontSize="240" letterSpacing="-0.05em">0</text>
      <text x="116" y="216" textAnchor="middle" fill={INDIGO_60}
        fontFamily="JetBrains Mono, monospace" fontWeight="700"
        fontSize="8" letterSpacing="0.22em">FORFAIT IMPOSÉ</text>

      <g transform="translate(220 38) rotate(-4)">
        <rect x="6" y="12" width="148" height="116" rx="6"
          fill={INDIGO} opacity="0.28" filter={`url(#${ids.diffuse})`} />
        <rect x="0" y="0" width="148" height="116" rx="6"
          fill={INDIGO} stroke={PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <rect x="0" y="14" width="148" height="14" fill={INDIGO_DEEP} />
        <line x1="74" y1="14" x2="74" y2="28" stroke={PAPER} strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="2 3" />
        <rect x="14" y="42" width="120" height="56" rx="3" fill={PAPER} />
        <text x="22" y="56" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700"
          fontSize="7" letterSpacing="0.2em">PACK STANDARD</text>
        <text x="22" y="80" fill={INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900"
          fontSize="26" letterSpacing="-0.03em">13h</text>
        <text x="22" y="92" fill={INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="600"
          fontSize="7" letterSpacing="0.18em">+ FRAIS DOSSIER</text>

        <line x1="-6" y1="-6" x2="154" y2="122"
          stroke={PAPER} strokeWidth="8" strokeLinecap="round" />
        <line x1="-6" y1="-6" x2="154" y2="122"
          stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
        <line x1="154" y1="-6" x2="-6" y2="122"
          stroke={PAPER} strokeWidth="8" strokeLinecap="round" />
        <line x1="154" y1="-6" x2="-6" y2="122"
          stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      </g>

      <Connector x1={120} y1={150} x2={264} y2={102} />
    </Frame>
  );
});

// ── BENEFIT pictograms (56×56) ───────────────────────────────────
export const R_BenefitPlan = memo(() => {
  const uid = useId();
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect x="11" y="14" width="44" height="44" rx="6" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <rect x="8" y="10" width="44" height="44" rx="6" fill={INDIGO}
        stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
      <rect x="20" y="6" width="20" height="8" rx="2" fill={INDIGO_DEEP}
        stroke={PAPER} strokeWidth="1.5" style={{ paintOrder: "stroke" }} />
      <line x1="16" y1="22" x2="40" y2="22" stroke={PAPER} strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="30" x2="34" y2="30" stroke={PAPER} strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="38" x2="44" y2="38" stroke={PAPER} strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="46" x2="38" y2="46" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="42" cy="46" r="2.2" fill={BLUE} />
    </svg>
  );
});

export const R_BenefitFast = memo(() => {
  const uid = useId();
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <ellipse cx="32" cy="58" rx="18" ry="3" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      {[{ x: 14, y: 30, blue: false }, { x: 32, y: 22, blue: true }, { x: 50, y: 30, blue: false }].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <path d="M 0 -10 C 7 -10 12 -5 12 2 C 12 10 0 24 0 24 C 0 24 -12 10 -12 2 C -12 -5 -7 -10 0 -10 Z"
            fill={INDIGO} stroke={PAPER} strokeWidth="1.5" style={{ paintOrder: "stroke" }} />
          <circle cx="0" cy="2" r="3.2" fill={p.blue ? BLUE : PAPER} />
        </g>
      ))}
      <line x1="6" y1="56" x2="58" y2="56" stroke={INDIGO} strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="2 2" />
    </svg>
  );
});

export const R_BenefitFree = memo(() => {
  const uid = useId();
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect x="11" y="14" width="44" height="44" rx="6" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <rect x="8" y="10" width="44" height="44" rx="4" fill={INDIGO}
        stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
      <rect x="8" y="10" width="44" height="10" fill={INDIGO_DEEP} />
      <line x1="14" y1="26" x2="34" y2="26" stroke={PAPER} strokeOpacity="0.55" strokeWidth="1.5" />
      <line x1="14" y1="32" x2="46" y2="32" stroke={PAPER} strokeOpacity="0.55" strokeWidth="1.5" />
      <line x1="14" y1="38" x2="40" y2="38" stroke={PAPER} strokeOpacity="0.55" strokeWidth="1.5" />
      <g transform="translate(40 46) rotate(-12)">
        <circle r="11" fill="none" stroke={BLUE} strokeWidth="1.6" />
        <text textAnchor="middle" y="3.5" fill={BLUE}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="11">0€</text>
      </g>
    </svg>
  );
});
