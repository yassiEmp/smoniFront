// Smoni — "Adultes 25-45+" section illustrations.
// Locked Y-system language: indigo solid + white 2.5px stroke + ONE blue accent,
// radial brand halo, halftone dot ground, diffuse brand-color shadow, dashed
// blue connector linking the side cue to the highlighted detail.

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
    <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
    <filter id={ids.softblur} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

const Connector = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BLUE} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.75" />
    <circle cx={x2} cy={y2} r="2.5" fill={BLUE} />
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
  >
    {children}
  </svg>
);

// A1 · HORAIRES — agenda with highlighted evening row + Saturday column,
// paired with a solid indigo "18-20h" tile.
export const A_Horaires = memo(function A_Horaires() {
  const uid = useId();
  const ids: DefIds = { bg: `${uid}-bg`, dots: `${uid}-d`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  const days = ["L", "M", "M", "J", "V", "S"];
  const rows = [
    { t: "14h", filled: [5], evening: false, blocked: [0, 1, 2, 3, 4] },
    { t: "17h", filled: [5], evening: false, blocked: [0, 1, 2, 3, 4] },
    { t: "19h", filled: [0, 1, 2, 3, 4, 5], evening: true, blocked: [] as number[] },
  ];
  return (
    <Frame>
      <Defs ids={ids} haloX={70} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      {/* Agenda paper on the right, tilted 4° */}
      <g transform="rotate(4 252 116)">
        <rect x="160" y="44" width="208" height="158" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="156" y="36" width="208" height="154" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="170" y="58" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">VOTRE SEMAINE</text>
        <text x="350" y="58" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">N°47</text>
        <line x1="170" y1="66" x2="350" y2="66" stroke={INDIGO_20} />

        {days.map((d, i) => {
          const isSat = i === 5;
          return (
            <g key={i}>
              {isSat && <rect x={170 + i * 30 - 2} y={74} width="28" height="116" rx="3" fill={BLUE} fillOpacity="0.1" />}
              <text
                x={170 + i * 30 + 12}
                y="84"
                textAnchor="middle"
                fill={isSat ? INDIGO : INDIGO_60}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={isSat ? 900 : 700}
                fontSize="10"
              >
                {d}
              </text>
            </g>
          );
        })}
        <line x1="170" y1="92" x2="350" y2="92" stroke={INDIGO_20} />

        {rows.map((row, ri) => (
          <g key={ri} transform={`translate(0 ${102 + ri * 28})`}>
            {row.evening && <rect x="168" y="-2" width="184" height="22" rx="3" fill={BLUE} fillOpacity="0.1" />}
            <text x="164" y="14" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8">
              {row.t}
            </text>
            {[0, 1, 2, 3, 4, 5].map((c) => {
              const isFilled = row.filled.includes(c);
              const isBlocked = row.blocked.includes(c);
              const cx = 170 + c * 30;
              return (
                <rect
                  key={c}
                  x={cx}
                  y="4"
                  width="24"
                  height="14"
                  rx="2"
                  fill={isFilled ? INDIGO : PAPER}
                  stroke={isFilled ? "none" : INDIGO_20}
                  strokeWidth={isFilled ? 0 : 1}
                  strokeDasharray={isBlocked ? "2 2" : "none"}
                  opacity={isBlocked ? 0.55 : 1}
                />
              );
            })}
          </g>
        ))}

        <text x="170" y="184" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7" letterSpacing="0.08em">
          SOIR + SAMEDI · DISPO
        </text>
      </g>

      {/* "18-20h" badge tile on the left */}
      <rect x="22" y="60" width="120" height="140" rx="16" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <rect x="16" y="52" width="120" height="140" rx="14" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" />
      <rect x="26" y="62" width="100" height="120" rx="8" fill="none" stroke={PAPER} strokeWidth="1" strokeOpacity="0.22" />

      {/* crescent moon */}
      <g transform="translate(76 84)">
        <circle r="13" fill={PAPER} fillOpacity="0.92" />
        <circle cx="5" cy="-3" r="12" fill={INDIGO} />
      </g>

      <text x="76" y="142" textAnchor="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="28" letterSpacing="-0.03em">
        18–20h
      </text>
      <text x="76" y="166" textAnchor="middle" fill={PAPER} fillOpacity="0.55" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">
        APRÈS LE BOULOT
      </text>

      <Connector x1={138} y1={158} x2={186} y2={162} />
    </Frame>
  );
});

// A2 · CODE À DISTANCE — laptop with QCM (answer B highlighted) + coffee mug "chez vous"
export const A_Code = memo(function A_Code() {
  const uid = useId();
  const ids: DefIds = { bg: `${uid}-bg`, dots: `${uid}-d`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  const answers = [
    { letter: "A", text: "Céder le passage à droite", hl: false },
    { letter: "B", text: "M'arrêter — stop au sol", hl: true },
    { letter: "C", text: "Continuer, je suis prioritaire", hl: false },
  ];
  return (
    <Frame>
      <Defs ids={ids} haloX={68} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g opacity="0.32" filter={`url(#${ids.diffuse})`}>
        <rect x="186" y="46" width="200" height="138" rx="8" fill={INDIGO} />
        <rect x="172" y="180" width="228" height="8" rx="4" fill={INDIGO} />
      </g>

      <rect x="180" y="40" width="200" height="138" rx="8" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" />
      <rect x="190" y="50" width="180" height="118" rx="4" fill={PAPER} />
      <path d="M 166 178 L 394 178 L 384 188 L 176 188 Z" fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="266" y="180" width="28" height="3" rx="1.5" fill={PAPER} fillOpacity="0.3" />

      <rect x="190" y="50" width="180" height="18" fill={INDIGO} />
      <text x="198" y="62" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.18em">CODE · QCM</text>
      <text x="362" y="62" textAnchor="end" fill={PAPER} fillOpacity="0.7" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.18em">12 / 40</text>

      <text x="198" y="84" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="9">À cette intersection,</text>
      <text x="198" y="96" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="9">je dois&nbsp;:</text>

      {answers.map((r, i) => (
        <g key={i} transform={`translate(0 ${106 + i * 18})`}>
          {r.hl && <rect x="194" y="0" width="172" height="16" rx="3" fill={BLUE} fillOpacity="0.1" />}
          <rect
            x="200"
            y="3"
            width="11"
            height="10"
            rx="2"
            fill={r.hl ? INDIGO : PAPER}
            stroke={r.hl ? "none" : INDIGO_20}
            strokeWidth={r.hl ? 0 : 1}
          />
          {r.hl && (
            <path d="M 202.5 8 L 205 10.5 L 209 5.5" stroke={PAPER} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )}
          <text
            x="217"
            y="11"
            fill={INDIGO_DEEP}
            fontFamily="Inter, sans-serif"
            fontWeight={r.hl ? 700 : 600}
            fontSize="8"
          >
            {r.letter}. {r.text}
          </text>
          {r.hl && <rect x="340" y="6" width="20" height="2" rx="1" fill={BLUE} />}
        </g>
      ))}

      {/* Coffee mug — "chez vous" cue */}
      <g opacity="0.32" filter={`url(#${ids.diffuse})`}>
        <rect x="56" y="138" width="76" height="60" rx="6" fill={INDIGO} />
      </g>
      <path
        d="M 48 116 L 124 116 L 118 184 a 6 6 0 0 1 -6 6 L 60 190 a 6 6 0 0 1 -6 -6 Z"
        fill={INDIGO}
        stroke={PAPER}
        strokeWidth="2.5"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
      <path d="M 124 132 a 18 18 0 0 1 0 36" fill="none" stroke={INDIGO} strokeWidth="9" strokeLinecap="round" />
      <path d="M 124 132 a 18 18 0 0 1 0 36" fill="none" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" opacity="0.92" />
      <ellipse cx="86" cy="116" rx="38" ry="5" fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="1.5" />
      <g stroke={PAPER} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.78">
        <path d="M 72 102 q -4 -8 0 -16 q 4 -8 0 -16" />
        <path d="M 90 102 q -4 -8 0 -16 q 4 -8 0 -16" />
        <path d="M 108 102 q -4 -8 0 -16 q 4 -8 0 -16" />
      </g>
      <text x="86" y="160" textAnchor="middle" fill={PAPER} fillOpacity="0.7" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">
        CHEZ VOUS
      </text>

      <Connector x1={132} y1={140} x2={196} y2={130} />
    </Frame>
  );
});

// A3 · DISCRÉTION — sedan with EMPTY rooftop (dashed) + struck-out "AUTO-ÉCOLE" sign in corner
export const A_Discretion = memo(function A_Discretion() {
  const uid = useId();
  const ids: DefIds = { bg: `${uid}-bg`, dots: `${uid}-d`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <Frame>
      <Defs ids={ids} haloX={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      {/* Rejected rooftop sign — top-left, struck through */}
      <g transform="translate(60 56) rotate(-6)">
        <rect x="-28" y="-10" width="56" height="22" rx="3" fill={INDIGO_DEEP} opacity="0.2" filter={`url(#${ids.softblur})`} />
        <rect x="-30" y="-12" width="60" height="22" rx="3" fill={PAPER} stroke={INDIGO_20} strokeWidth="1.5" />
        <rect x="-30" y="-12" width="60" height="6" rx="3" fill={INDIGO} />
        <text x="0" y="6" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="9" letterSpacing="0.04em">AUTO-ÉCOLE</text>
        <rect x="-22" y="10" width="6" height="6" rx="1" fill={INDIGO_60} />
        <rect x="16" y="10" width="6" height="6" rx="1" fill={INDIGO_60} />
        <line x1="-40" y1="-22" x2="40" y2="22" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="120" y="50" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">PAS DE</text>
      <text x="120" y="62" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">PANNEAU</text>

      {/* Car shadow */}
      <ellipse cx="220" cy="186" rx="148" ry="10" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />

      <path
        d="M 88 156 L 96 142 L 144 134 L 168 112 L 268 108 L 300 132 L 354 140 L 360 152 L 358 168 L 88 168 Z"
        fill={INDIGO_DEEP}
        opacity="0.22"
        filter={`url(#${ids.softblur})`}
        transform="translate(0 3)"
      />
      <path
        d="M 88 156 L 96 142 L 144 134 L 168 112 L 268 108 L 300 132 L 354 140 L 360 152 L 358 168 L 88 168 Z"
        fill={INDIGO}
        stroke={PAPER}
        strokeWidth="2.5"
        strokeLinejoin="round"
        paintOrder="stroke"
      />

      <path d="M 152 134 L 172 118 L 264 116 L 286 134 Z" fill={PAPER} fillOpacity="0.16" stroke={PAPER} strokeWidth="1.2" />
      <line x1="218" y1="116" x2="220" y2="134" stroke={PAPER} strokeWidth="1.4" strokeOpacity="0.55" />

      <rect x="178" y="148" width="14" height="3" rx="1.5" fill={PAPER} fillOpacity="0.4" />
      <rect x="248" y="148" width="14" height="3" rx="1.5" fill={PAPER} fillOpacity="0.4" />

      <g>
        <circle cx="138" cy="168" r="18" fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="2" />
        <circle cx="138" cy="168" r="8" fill={INDIGO} stroke={PAPER} strokeWidth="1" />
        <circle cx="138" cy="168" r="2" fill={PAPER} />
      </g>
      <g>
        <circle cx="316" cy="168" r="18" fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="2" />
        <circle cx="316" cy="168" r="8" fill={INDIGO} stroke={PAPER} strokeWidth="1" />
        <circle cx="316" cy="168" r="2" fill={PAPER} />
      </g>

      <ellipse cx="354" cy="148" rx="6" ry="3.5" fill={PAPER} fillOpacity="0.85" />
      <rect x="92" y="146" width="6" height="6" rx="1" fill={PAPER} fillOpacity="0.3" />

      {/* Empty rooftop — dashed outline */}
      <g>
        <rect x="194" y="86" width="76" height="22" rx="3" fill="none" stroke={BLUE} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        <line x1="194" y1="86" x2="200" y2="86" stroke={BLUE} strokeWidth="2" />
        <line x1="194" y1="86" x2="194" y2="92" stroke={BLUE} strokeWidth="2" />
        <line x1="270" y1="86" x2="264" y2="86" stroke={BLUE} strokeWidth="2" />
        <line x1="270" y1="86" x2="270" y2="92" stroke={BLUE} strokeWidth="2" />
        <line x1="194" y1="108" x2="200" y2="108" stroke={BLUE} strokeWidth="2" />
        <line x1="194" y1="108" x2="194" y2="102" stroke={BLUE} strokeWidth="2" />
        <line x1="270" y1="108" x2="264" y2="108" stroke={BLUE} strokeWidth="2" />
        <line x1="270" y1="108" x2="270" y2="102" stroke={BLUE} strokeWidth="2" />
      </g>

      <Connector x1={88} y1={72} x2={232} y2={96} />

      <text x="378" y="208" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">
        DISCRÉTION · OPTION
      </text>
    </Frame>
  );
});

// A4 · EXPAT — opened passport w/ "DOSSIER OK" stamp + FR↔EN language card
export const A_Expat = memo(function A_Expat() {
  const uid = useId();
  const ids: DefIds = { bg: `${uid}-bg`, dots: `${uid}-d`, diffuse: `${uid}-df`, softblur: `${uid}-sb` };
  return (
    <Frame>
      <Defs ids={ids} haloX={70} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      {/* Opened passport — right side, tilted -3° */}
      <g transform="rotate(-3 264 116)">
        <rect x="156" y="48" width="216" height="148" rx="4" fill={INDIGO_DEEP} opacity="0.22" filter={`url(#${ids.softblur})`} />
        <rect x="152" y="40" width="216" height="144" rx="3" fill={INDIGO_DEEP} />
        <rect x="158" y="46" width="204" height="132" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <line x1="260" y1="46" x2="260" y2="178" stroke={INDIGO_20} strokeDasharray="2 2" />

        {/* Left page — photo + info */}
        <rect x="168" y="58" width="42" height="54" rx="2" fill={INDIGO_20} />
        <circle cx="189" cy="78" r="9" fill={PAPER} />
        <path d="M 174 110 a 15 15 0 0 1 30 0 z" fill={PAPER} />
        <text x="218" y="64" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6" letterSpacing="0.18em">NOM</text>
        <line x1="218" y1="70" x2="252" y2="70" stroke={INDIGO_20} />
        <text x="218" y="82" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6" letterSpacing="0.18em">PRÉNOM</text>
        <line x1="218" y1="88" x2="252" y2="88" stroke={INDIGO_20} />
        <text x="218" y="100" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6" letterSpacing="0.18em">NATIONALITÉ</text>
        <line x1="218" y1="106" x2="252" y2="106" stroke={INDIGO_20} />

        <rect x="166" y="124" width="90" height="14" rx="1" fill={INDIGO} fillOpacity="0.08" />
        <text x="170" y="134" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6" letterSpacing="0.18em">
          P&lt;FRADUPONT&lt;&lt;&lt;
        </text>

        {/* Right page — visa stamps */}
        <text x="268" y="64" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.18em">VISAS · STAMPS</text>
        <line x1="268" y1="70" x2="354" y2="70" stroke={INDIGO_20} />

        <g transform="translate(312 116) rotate(-12)">
          <rect x="-38" y="-22" width="76" height="44" rx="3" fill={BLUE} fillOpacity="0.1" />
          <circle r="22" fill="none" stroke={BLUE} strokeWidth="2" />
          <circle r="17" fill="none" stroke={BLUE} strokeWidth="1" strokeOpacity="0.55" />
          <text x="0" y="-6" textAnchor="middle" fill={BLUE} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="10" letterSpacing="0.04em">DOSSIER</text>
          <text x="0" y="7" textAnchor="middle" fill={BLUE} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.04em">OK</text>
          <text x="0" y="18" textAnchor="middle" fill={BLUE} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="5" letterSpacing="0.18em">SMONI · 2026</text>
        </g>
        <rect x="266" y="148" width="42" height="20" fill="none" stroke={INDIGO_20} strokeWidth="1" strokeDasharray="2 2" />
        <text x="287" y="161" textAnchor="middle" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6" letterSpacing="0.18em">EU · 2024</text>
      </g>

      {/* Language card — left */}
      <rect x="22" y="74" width="120" height="92" rx="14" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <rect x="16" y="68" width="120" height="92" rx="12" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" />
      <rect x="26" y="78" width="100" height="72" rx="6" fill="none" stroke={PAPER} strokeWidth="1" strokeOpacity="0.22" />

      <text x="76" y="94" textAnchor="middle" fill={PAPER} fillOpacity="0.55" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.28em">
        LANGUE
      </text>

      <g>
        <rect x="32" y="104" width="40" height="32" rx="6" fill={PAPER} />
        <text x="52" y="126" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.02em">FR</text>
      </g>
      <g stroke={PAPER} strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 76 115 L 80 113 L 80 117 Z" fill={PAPER} />
        <path d="M 78 115 H 70" />
        <path d="M 76 125 L 72 123 L 72 127 Z" fill={PAPER} />
        <path d="M 74 125 H 82" />
      </g>
      <g>
        <rect x="84" y="104" width="40" height="32" rx="6" fill={PAPER} />
        <text x="104" y="126" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.02em">EN</text>
      </g>

      <text x="76" y="152" textAnchor="middle" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">
        EXPAT · ACCEPTÉ
      </text>

      <Connector x1={138} y1={120} x2={284} y2={108} />
    </Frame>
  );
});
