// Smoni · 5 engagements écrits — polished hybrid illustrations.
// Each illustration tells one story: a primary subject + supporting written
// document, linked by a dotted leader that points at the emphasized line.
// Restricted palette: indigo (#2c2876) + white + a single blue accent.

import { memo } from "react";

const BG = "#f3f1ff";
const INDIGO = "#2c2876";
const INDIGO_DEEP = "#1e1b4b";
const PAPER = "#ffffff";
const PAPER_RULE = "#e6e3f5";
const BLUE = "#3b82f6";
const INDIGO_60 = "#7472b0";
const INDIGO_20 = "#cfceea";

// Module-level id counter — avoids the React useId hook cost. Each illustration
// instance gets a stable, unique id at first render. Five cards × few defs each
// means a handful of ids per mount.
let _idCounter = 0;
const makeIds = () => {
  const n = ++_idCounter;
  return {
    bg: `eng_bg_${n}`,
    dots: `eng_dots_${n}`,
    diffuse: `eng_df_${n}`,
  };
};
type DefIds = ReturnType<typeof makeIds>;

// Filter region tightened from 200% → 140%. The blur barely spills past the
// shape so paying for a full 4× area was waste. Cuts GPU filter work ~50%.
// Softblur on paper shadows was dropped entirely — the offset ghost shapes
// still read as shadows from opacity alone, and we save 5 filter passes per
// section render.
const Defs = ({ ids, haloX = 30 }: { ids: DefIds; haloX?: number }) => (
  <defs>
    <radialGradient id={ids.bg} cx={`${haloX}%`} cy="55%" r="70%">
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
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="1.5"
      strokeDasharray="2 3"
      opacity="0.75"
    />
    <circle cx={x2} cy={y2} r="2.5" fill={color} />
  </>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 400 225"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    style={{ display: "block" }}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// 01 · Prix tout-compris
export const IllustrationPrix = memo(function IllustrationPrix() {
  const ids = makeIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={28} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(4 254 116)">
        <rect x="156" y="44" width="212" height="158" rx="3" fill={INDIGO_DEEP} opacity="0.18" />
        <rect x="152" y="36" width="212" height="154" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="168" y="58" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">TARIFS · 2026</text>
        <line x1="168" y1="66" x2="350" y2="66" stroke={INDIGO_20} />
        <text x="168" y="86" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Permis B 20h</text>
        <text x="350" y="86" textAnchor="end" fill={INDIGO_DEEP} fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">€1 290</text>
        <text x="168" y="104" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Code inclus</text>
        <text x="350" y="104" textAnchor="end" fill={INDIGO_DEEP} fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">€0</text>
        <text x="168" y="122" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Examen</text>
        <text x="350" y="122" textAnchor="end" fill={INDIGO_DEEP} fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="10">€0</text>

        <rect x="164" y="136" width="190" height="24" rx="3" fill={BLUE} fillOpacity="0.1" />
        <line x1="168" y1="136" x2="350" y2="136" stroke={INDIGO_DEEP} strokeWidth="1.5" />
        <text x="168" y="153" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13">TOTAL</text>
        <text x="350" y="153" textAnchor="end" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13">€1 290</text>
        <rect x="318" y="158" width="34" height="2" rx="1" fill={BLUE} />
        <g transform="translate(322 182) rotate(-12)">
          <rect x="-26" y="-12" width="52" height="24" fill="none" stroke={BLUE} strokeWidth="1.5" />
          <text x="0" y="3" textAnchor="middle" fill={BLUE} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7">TOUT COMPRIS</text>
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="180" letterSpacing="-0.04em" opacity="0.32" filter={`url(#${ids.diffuse})`}>€</text>
      <text x="98" y="176" textAnchor="middle" fill={INDIGO} stroke={PAPER} strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="180" letterSpacing="-0.04em">€</text>

      <Connector x1={158} y1={130} x2={252} y2={156} />
    </Frame>
  );
});

// 02 · 60 minutes au volant
export const Illustration60Min = memo(function Illustration60Min() {
  const ids = makeIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={72} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(-3 110 116)">
        <rect x="22" y="44" width="180" height="158" rx="3" fill={INDIGO_DEEP} opacity="0.18" />
        <rect x="18" y="36" width="180" height="154" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <rect x="18" y="36" width="180" height="22" fill={INDIGO} />
        <text x="32" y="52" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">LIVRET · TEMPS</text>
        <text x="184" y="52" textAnchor="end" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">60′</text>
        <text x="32" y="74" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">DÉBUT</text>
        <text x="108" y="74" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">FIN</text>
        <text x="184" y="74" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">DURÉE</text>
        {[
          { s: "14:00", e: "15:00", hl: false },
          { s: "15:00", e: "16:00", hl: true },
          { s: "16:00", e: "17:00", hl: false },
        ].map((r, i) => (
          <g key={i} transform={`translate(0 ${88 + i * 28})`}>
            {r.hl && <rect x="22" y="-8" width="172" height="24" rx="3" fill={BLUE} fillOpacity="0.1" />}
            <line x1="32" y1="-8" x2="184" y2="-8" stroke={PAPER_RULE} />
            <text x="32" y="10" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="12">{r.s}</text>
            <text x="88" y="10" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="500" fontSize="12">→</text>
            <text x="108" y="10" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="12">{r.e}</text>
            <text x="184" y="10" textAnchor="end" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="12">60′</text>
          </g>
        ))}
      </g>

      <g opacity="0.32" filter={`url(#${ids.diffuse})`}>
        <rect x="293" y="50" width="14" height="12" rx="2" fill={INDIGO} />
        <rect x="280" y="46" width="40" height="6" rx="2" fill={INDIGO} />
        <circle cx="300" cy="146" r="68" fill={INDIGO} />
      </g>
      <g stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round">
        <rect x="293" y="44" width="14" height="12" rx="2" fill={INDIGO} />
        <rect x="280" y="40" width="40" height="6" rx="2" fill={INDIGO} />
      </g>
      <circle cx="300" cy="140" r="68" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" />
      <circle cx="300" cy="140" r="56" fill="none" stroke={PAPER} strokeWidth="1" strokeOpacity="0.28" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const r1 = 56,
          r2 = i % 3 === 0 ? 44 : 50;
        return (
          <line
            key={i}
            x1={300 + Math.cos(a) * r1}
            y1={140 + Math.sin(a) * r1}
            x2={300 + Math.cos(a) * r2}
            y2={140 + Math.sin(a) * r2}
            stroke={PAPER}
            strokeOpacity={i % 3 === 0 ? 0.9 : 0.35}
            strokeWidth={i % 3 === 0 ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}
      <text x="300" y="140" textAnchor="middle" dominantBaseline="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="34" letterSpacing="-0.02em">60</text>
      <text x="300" y="160" textAnchor="middle" fill={PAPER} fillOpacity="0.55" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">MINUTES</text>
      <rect x="297" y="80" width="6" height="12" rx="1" fill={BLUE} stroke={PAPER} strokeWidth="1.2" />

      <Connector x1={196} y1={113} x2={272} y2={140} />
    </Frame>
  );
});

// 03 · Pas de cris
export const IllustrationPasDeCris = memo(function IllustrationPasDeCris() {
  const ids = makeIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={28} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(3 268 116)">
        <rect x="184" y="44" width="184" height="158" rx="3" fill={INDIGO_DEEP} opacity="0.18" />
        <rect x="180" y="36" width="184" height="154" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="196" y="58" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">CHARTE INTERNE</text>
        <line x1="196" y1="66" x2="350" y2="66" stroke={INDIGO_20} />
        <rect x="188" y="78" width="174" height="42" rx="3" fill={BLUE} fillOpacity="0.1" />
        <text x="196" y="98" fill={INDIGO_DEEP} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="15">RÈGLE N°03</text>
        <text x="196" y="114" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Le moniteur ne crie pas.</text>
        <rect x="318" y="92" width="34" height="2" rx="1" fill={BLUE} />
        <path d="M 196 156 C 208 150, 218 164, 230 156 S 256 150, 274 156" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
        <text x="196" y="176" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7" letterSpacing="0.08em">SIGNÉ · ÉQUIPE SMONI</text>
      </g>

      <path d="M 22 60 H 158 a 16 16 0 0 1 16 16 V 138 a 16 16 0 0 1 -16 16 H 110 L 84 184 L 86 154 H 22 a 16 16 0 0 1 -16 -16 V 76 a 16 16 0 0 1 16 -16 Z" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <path d="M 20 54 H 156 a 16 16 0 0 1 16 16 V 132 a 16 16 0 0 1 -16 16 H 108 L 82 178 L 84 148 H 20 a 16 16 0 0 1 -16 -16 V 70 a 16 16 0 0 1 16 -16 Z" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
      {[0.45, 0.7, 0.55, 0.8, 0.6, 0.4, 0.55, 0.45, 0.7, 0.5].map((h, i) => (
        <rect key={i} x={30 + i * 14} y={101 - h * 14} width="6" height={h * 28} rx="3" fill={PAPER} opacity={0.45 + h * 0.45} />
      ))}
      <circle cx="156" cy="74" r="10" fill={BLUE} stroke={PAPER} strokeWidth="1.5" />
      <rect x="151" y="72" width="10" height="4" rx="2" fill={PAPER} />
    </Frame>
  );
});

// 04 · Recalés bienvenus
export const IllustrationRecales = memo(function IllustrationRecales() {
  const ids = makeIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <rect x="62" y="32" width="120" height="180" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />

      <rect x="60" y="24" width="120" height="178" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
      <rect x="72" y="36" width="96" height="154" fill={PAPER} />
      <polygon points="72,36 72,190 28,176 28,50" fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
      <circle cx="44" cy="116" r="3" fill={PAPER} />

      <g transform="rotate(-4 240 130)">
        <path d="M 184 76 L 232 76 L 244 88 L 376 88 L 376 198 L 184 198 Z" fill={INDIGO_DEEP} opacity="0.18" />
        <path d="M 180 70 L 228 70 L 240 82 L 372 82 L 372 192 L 180 192 Z" fill={INDIGO} />
        <rect x="180" y="82" width="192" height="110" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <rect x="180" y="82" width="192" height="26" fill={INDIGO} />
        <text x="276" y="100" textAnchor="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.04em">DOSSIER · RECALÉS</text>
        <line x1="194" y1="126" x2="358" y2="126" stroke={PAPER_RULE} />
        <line x1="194" y1="140" x2="338" y2="140" stroke={PAPER_RULE} />
        <line x1="194" y1="154" x2="358" y2="154" stroke={PAPER_RULE} />
        <g transform="translate(338 174) rotate(-14)">
          <rect x="-24" y="-12" width="48" height="24" fill="none" stroke={BLUE} strokeWidth="2.5" />
          <text x="0" y="5" textAnchor="middle" fill={BLUE} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13">OK</text>
        </g>
      </g>

      <g stroke={PAPER} strokeWidth="2" strokeLinejoin="round" paintOrder="stroke">
        <path d="M 8 116 Q 100 116 156 100" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
        <polygon points="148,90 168,98 152,108" fill={BLUE} />
      </g>
    </Frame>
  );
});

// 05 · Garantie financière
export const IllustrationGarantie = memo(function IllustrationGarantie() {
  const ids = makeIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(10 280 116)">
        <rect x="232" y="48" width="120" height="150" rx="3" fill={INDIGO_DEEP} opacity="0.14" />
        <rect x="228" y="40" width="120" height="146" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <line x1="238" y1="56" x2="338" y2="56" stroke={INDIGO_20} />
        <line x1="238" y1="70" x2="328" y2="70" stroke={PAPER_RULE} />
        <line x1="238" y1="80" x2="338" y2="80" stroke={PAPER_RULE} />
        <line x1="238" y1="90" x2="312" y2="90" stroke={PAPER_RULE} />
      </g>
      <g transform="rotate(-9 120 116)">
        <rect x="52" y="48" width="120" height="150" rx="3" fill={INDIGO_DEEP} opacity="0.14" />
        <rect x="48" y="40" width="120" height="146" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <line x1="58" y1="56" x2="158" y2="56" stroke={INDIGO_20} />
        <line x1="58" y1="70" x2="148" y2="70" stroke={PAPER_RULE} />
        <line x1="58" y1="80" x2="158" y2="80" stroke={PAPER_RULE} />
        <line x1="58" y1="90" x2="132" y2="90" stroke={PAPER_RULE} />
      </g>
      <rect x="146" y="38" width="108" height="150" rx="3" fill={INDIGO_DEEP} opacity="0.18" />
      <rect x="142" y="30" width="108" height="146" rx="2" fill={PAPER} stroke={PAPER_RULE} />
      <line x1="152" y1="46" x2="242" y2="46" stroke={INDIGO_20} />

      <path d="M 202 52 L 286 80 L 286 142 Q 286 192 200 220 Q 114 192 114 142 L 114 80 Z" fill={INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
      <path d="M 200 46 L 282 74 L 282 138 Q 282 184 200 210 Q 118 184 118 138 L 118 74 Z" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
      <path d="M 200 64 L 266 86 L 266 138 Q 266 174 200 196 Q 134 174 134 138 L 134 86 Z" fill="none" stroke={PAPER} strokeWidth="1" strokeOpacity="0.28" />
      <text x="200" y="146" textAnchor="middle" dominantBaseline="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="58" letterSpacing="-0.02em">€</text>
      <text x="200" y="184" textAnchor="middle" fill={PAPER} fillOpacity="0.7" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="0.22em">L.213-2</text>
    </Frame>
  );
});

export const ENGAGEMENT_ILLUSTRATIONS = [
  IllustrationPrix,
  Illustration60Min,
  IllustrationPasDeCris,
  IllustrationRecales,
  IllustrationGarantie,
];
