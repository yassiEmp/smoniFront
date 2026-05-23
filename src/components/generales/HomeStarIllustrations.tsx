// Smoni · "Une vraie agence, pas une vitrine" — 4 chiffres-clés illustrations.
// Same polished hybrid recipe as EngagementIllustrations / MesureIllustrations:
// indigo subject + white paper document + ONE blue accent + dashed connector.

import { memo } from "react";

const BG = "#f3f1ff";
const INDIGO = "#2c2876";
const INDIGO_DEEP = "#1e1b4b";
const PAPER = "#ffffff";
const PAPER_RULE = "#e6e3f5";
const BLUE = "#3b82f6";
const INDIGO_60 = "#7472b0";
const INDIGO_20 = "#cfceea";

let _idCounter = 0;
const makeIds = () => {
  const n = ++_idCounter;
  return {
    bg: `hs_bg_${n}`,
    dots: `hs_dots_${n}`,
    diffuse: `hs_df_${n}`,
    softblur: `hs_sb_${n}`,
  };
};
type DefIds = ReturnType<typeof makeIds>;

const Defs = ({ ids, haloX = 30 }: { ids: DefIds; haloX?: number }) => (
  <defs>
    <radialGradient id={ids.bg} cx={`${haloX}%`} cy="55%" r="72%">
      <stop offset="0%" stopColor="#e6e3ff" />
      <stop offset="60%" stopColor={BG} />
      <stop offset="100%" stopColor="#f8fafc" />
    </radialGradient>
    <pattern id={ids.dots} width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="0.55" fill={INDIGO} fillOpacity="0.06" />
    </pattern>
    <filter id={ids.diffuse} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
    <filter id={ids.softblur} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

const Connector = ({
  x1,
  y1,
  x2,
  y2,
  color = BLUE,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) => (
  <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.75" />
    <circle cx={x2} cy={y2} r="2.5" fill={color} />
  </>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 400 225"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// 01 · CRÉATION — 2022
export const IllustrationCreation = memo(function IllustrationCreation() {
  const ids = makeIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={30} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="translate(38 56)">
        <rect x="-4" y="6" width="74" height="78" rx="8" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <rect x="0" y="0" width="66" height="74" rx="8" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
        <rect x="0" y="0" width="66" height="18" rx="8" fill={INDIGO_DEEP} />
        <rect x="0" y="12" width="66" height="6" fill={INDIGO_DEEP} />
        <circle cx="16" cy="6" r="3" fill="none" stroke={PAPER} strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="50" cy="6" r="3" fill="none" stroke={PAPER} strokeOpacity="0.5" strokeWidth="2" />
        <text x="33" y="32" textAnchor="middle" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.18em">JUIL</text>
        <text x="33" y="60" textAnchor="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="26">07</text>
      </g>

      <g transform="rotate(4 250 120)">
        <rect x="146" y="36" width="220" height="160" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="142" y="28" width="220" height="156" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="158" y="50" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="0.18em">REGISTRE · 2022</text>
        <line x1="158" y1="58" x2="346" y2="58" stroke={INDIGO_20} />

        <text x="158" y="78" fill={INDIGO_60} fontFamily="Inter, sans-serif" fontWeight="500" fontSize="9">Raison sociale</text>
        <text x="158" y="92" fill={INDIGO_DEEP} fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="11">SMONI AUTO-ÉCOLE</text>

        <text x="158" y="112" fill={INDIGO_60} fontFamily="Inter, sans-serif" fontWeight="500" fontSize="9">Siège</text>
        <text x="158" y="125" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">62 r. de la Jarry · Vincennes</text>

        <rect x="152" y="138" width="200" height="32" rx="3" fill={BLUE} fillOpacity="0.1" />
        <text x="158" y="152" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.18em">DATE D'IMMATRICULATION</text>
        <text x="158" y="166" fill={INDIGO_DEEP} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13">07 · JUILLET · 2022</text>
        <line x1="158" y1="170" x2="252" y2="170" stroke={BLUE} strokeWidth="2" />

        <g transform="translate(316 152) rotate(-12)">
          <circle r="22" fill="none" stroke={BLUE} strokeWidth="1.8" opacity="0.9" />
          <circle r="17" fill="none" stroke={BLUE} strokeWidth="0.8" opacity="0.6" />
          <text y="-3" textAnchor="middle" fill={BLUE} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6" letterSpacing="0.15em">VINCENNES</text>
          <text y="8" textAnchor="middle" fill={BLUE} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="9">2022</text>
        </g>
      </g>

      <Connector x1={106} y1={120} x2={170} y2={155} />
    </Frame>
  );
});

// 02 · AGENCE — 1
export const IllustrationAgence = memo(function IllustrationAgence() {
  const ids = makeIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={28} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g opacity="0.25" stroke={INDIGO_20} strokeWidth="0.6">
        <path d="M 0 64 Q 110 78 220 60 T 400 70" fill="none" />
        <path d="M 0 130 Q 100 118 200 140 T 400 132" fill="none" />
        <path d="M 0 180 Q 130 168 240 195 T 400 178" fill="none" />
        <path d="M 80 0 Q 92 100 78 200 T 100 225" fill="none" />
        <path d="M 220 0 Q 232 100 220 225" fill="none" />
        <path d="M 320 0 Q 310 110 326 225" fill="none" />
      </g>

      <g transform="rotate(-3 200 150)">
        <rect x="98" y="98" width="232" height="92" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="94" y="92" width="232" height="92" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="108" y="112" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">AGENCE UNIQUE · 94300</text>
        <rect x="100" y="120" width="216" height="26" rx="3" fill={BLUE} fillOpacity="0.1" />
        <text x="110" y="138" fill={INDIGO_DEEP} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14">62 RUE DE LA JARRY</text>
        <text x="110" y="160" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11">Vincennes · Val-de-Marne</text>
        <text x="110" y="175" fill={INDIGO_60} fontFamily="Inter, sans-serif" fontWeight="500" fontSize="9">4 min à pied · RER A Vincennes</text>
        <text x="310" y="175" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7" letterSpacing="0.18em">N° 01 / 01</text>
      </g>

      <g transform="translate(53 32)">
        <ellipse cx="38" cy="118" rx="22" ry="5" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <path d="M 38 8 C 60 8 76 24 76 46 C 76 70 38 114 38 114 C 38 114 0 70 0 46 C 0 24 16 8 38 8 Z" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
        <circle cx="38" cy="46" r="14" fill="none" stroke={PAPER} strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="38" cy="46" r="8" fill={PAPER} />
        <text x="38" y="50" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="11">1</text>
      </g>

      <Connector x1={91} y1={148} x2={142} y2={140} />
    </Frame>
  );
});

// 03 · OUVERTURE — 6/6
export const IllustrationOuverture = memo(function IllustrationOuverture() {
  const ids = makeIds();
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const dayW = 32;
  const gap = 6;
  const startX = 96;
  const startY = 78;
  return (
    <Frame>
      <Defs ids={ids} haloX={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="translate(34 42)">
        <ellipse cx="32" cy="68" rx="22" ry="5" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <circle cx="32" cy="32" r="32" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
        <circle cx="32" cy="32" r="24" fill="none" stroke={PAPER} strokeOpacity="0.28" strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180;
          const r1 = 26;
          const r2 = i % 3 === 0 ? 21 : 23.5;
          return (
            <line
              key={i}
              x1={32 + Math.cos(a) * r1}
              y1={32 + Math.sin(a) * r1}
              x2={32 + Math.cos(a) * r2}
              y2={32 + Math.sin(a) * r2}
              stroke={PAPER}
              strokeOpacity={i % 3 === 0 ? 0.85 : 0.4}
              strokeWidth={i % 3 === 0 ? 1.6 : 1}
            />
          );
        })}
        <line x1="32" y1="32" x2="32" y2="18" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="32" x2="18" y2="32" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="32" cy="32" r="2" fill={PAPER} />
      </g>

      <g transform="translate(20 116)">
        <rect x="0" y="0" width="92" height="22" rx="4" fill={PAPER} stroke={PAPER_RULE} />
        <text x="46" y="15" textAnchor="middle" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="0.12em">09:00 — 20:00</text>
      </g>

      <g transform="rotate(-2 250 124)">
        <rect x="80" y="44" width="296" height="118" rx="6" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="76" y="38" width="296" height="118" rx="4" fill={PAPER} stroke={PAPER_RULE} />
        <text x="92" y="58" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">SEMAINE TYPE</text>
        <text x="356" y="58" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.18em">6 / 7</text>

        {days.map((d, i) => {
          const x = startX + i * (dayW + gap) - 80;
          const isOpen = i < 6;
          const isSat = i === 5;
          return (
            <g key={i} transform={`translate(${x} ${startY})`}>
              {isOpen ? (
                <>
                  <rect x="0" y="0" width={dayW} height={dayW + 14} rx="4" fill={INDIGO} stroke={PAPER} strokeWidth="2" paintOrder="stroke" />
                  <text x={dayW / 2} y="14" textAnchor="middle" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" opacity="0.7">{d}</text>
                  <text x={dayW / 2} y="33" textAnchor="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="12">{i + 1}</text>
                  {isSat && (
                    <>
                      <rect x="-2" y="-2" width={dayW + 4} height={dayW + 18} rx="6" fill="none" stroke={BLUE} strokeWidth="1.5" />
                      <circle cx={dayW / 2} cy={dayW + 9} r="2" fill={BLUE} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <rect x="0" y="0" width={dayW} height={dayW + 14} rx="4" fill={PAPER} stroke={INDIGO_20} strokeWidth="1.2" strokeDasharray="2 3" />
                  <text x={dayW / 2} y="14" textAnchor="middle" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">{d}</text>
                  <text x={dayW / 2} y="33" textAnchor="middle" fill={INDIGO_20} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="12">{i + 1}</text>
                </>
              )}
            </g>
          );
        })}
      </g>

      <Connector x1={100} y1={74} x2={264} y2={84} />
    </Frame>
  );
});

// 04 · PERMIS — 3
export const IllustrationPermis = memo(function IllustrationPermis() {
  const ids = makeIds();

  const Card = ({
    rot,
    x,
    y,
    code,
    label,
    accent,
  }: {
    rot: number;
    x: number;
    y: number;
    code: string;
    label: string;
    accent: boolean;
  }) => (
    <g transform={`rotate(${rot} ${x + 78} ${y + 56})`}>
      <rect x={x + 4} y={y + 8} width="156" height="112" rx="10" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <rect x={x} y={y} width="156" height="112" rx="10" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" paintOrder="stroke" />
      <rect x={x} y={y} width="156" height="22" rx="10" fill={INDIGO_DEEP} />
      <rect x={x} y={y + 12} width="156" height="10" fill={INDIGO_DEEP} />
      <text x={x + 12} y={y + 16} fill={PAPER} opacity="0.75" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.2em">RÉPUBLIQUE · FR</text>
      <rect x={x + 12} y={y + 32} width="42" height="54" rx="3" fill="none" stroke={PAPER} strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="2 3" />
      <circle cx={x + 33} cy={y + 52} r="9" fill="none" stroke={PAPER} strokeOpacity="0.45" strokeWidth="1.2" />
      <path d={`M ${x + 18} ${y + 86} Q ${x + 33} ${y + 70} ${x + 48} ${y + 86}`} fill="none" stroke={PAPER} strokeOpacity="0.45" strokeWidth="1.2" />
      <text x={x + 64} y={y + 60} fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="32">{code}</text>
      <text x={x + 64} y={y + 78} fill={PAPER} opacity="0.7" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.18em">{label}</text>
      <line x1={x + 12} y1={y + 96} x2={x + 144} y2={y + 96} stroke={PAPER} strokeOpacity="0.25" strokeWidth="0.8" />
      <text x={x + 12} y={y + 106} fill={PAPER} opacity="0.6" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="6" letterSpacing="0.2em">VINCENNES · 94300</text>

      {accent && (
        <>
          <rect x={x - 1.5} y={y - 1.5} width="159" height="115" rx="11.5" fill="none" stroke={BLUE} strokeWidth="1.5" />
          <circle cx={x + 156} cy={y} r="3" fill={BLUE} />
        </>
      )}
    </g>
  );

  return (
    <Frame>
      <Defs ids={ids} haloX={48} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <Card rot={-10} x={56} y={62} code="A" label="MOTO" accent={false} />
      <Card rot={-2} x={118} y={56} code="B" label="MANUEL" accent={false} />
      <Card rot={6} x={178} y={66} code="B78" label="AUTOMATIQUE" accent={true} />

      <g transform="translate(28 28)">
        <rect x="0" y="0" width="64" height="22" rx="11" fill={PAPER} stroke={PAPER_RULE} />
        <circle cx="11" cy="11" r="3" fill={BLUE} />
        <text x="22" y="15" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="0.18em">3 · TYPES</text>
      </g>

      <Connector x1={92} y1={40} x2={196} y2={80} />
    </Frame>
  );
});

export const HOME_STAR_ILLUSTRATIONS = [
  IllustrationCreation,
  IllustrationAgence,
  IllustrationOuverture,
  IllustrationPermis,
];
