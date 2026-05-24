// Smoni · 6 preuves de fonctionnement — polished hybrid illustrations.
// Sibling to EngagementIllustrations: same locked recipe (indigo subject +
// white paper document + ONE blue accent + dashed connector pointing at the
// emphasized detail). One story per card, asymmetric composition.

import { memo, useId } from "react";

const BG = "#f3f1ff";
const INDIGO = "#2c2876";
const INDIGO_DEEP = "#1e1b4b";
const PAPER = "#ffffff";
const PAPER_RULE = "#e6e3f5";
const BLUE = "#3b82f6";
const INDIGO_60 = "#7472b0";
const INDIGO_20 = "#cfceea";

const useDefIds = () => {
  const id = useId();
  return {
    bg: `mes_bg_${id}`,
    dots: `mes_dots_${id}`,
    diffuse: `mes_df_${id}`,
    softblur: `mes_sb_${id}`,
  };
};
type DefIds = ReturnType<typeof useDefIds>;

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

// 01 · Délai mesuré — 24h ouvrées
export const IllustrationDelai = memo(function IllustrationDelai() {
  const ids = useDefIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={26} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(3 268 116)">
        <rect x="184" y="40" width="190" height="158" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="180" y="32" width="190" height="154" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="196" y="54" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">BOÎTE · ENTRANT</text>
        <text x="356" y="54" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="9">3</text>
        <line x1="196" y1="62" x2="356" y2="62" stroke={INDIGO_20} />

        <g transform="translate(0 76)">
          <circle cx="206" cy="0" r="6" fill="none" stroke={INDIGO} strokeWidth="1.5" />
          <path d="M 202 -2 a 4 4 0 0 1 8 0 v 2 a 1.5 1.5 0 0 1 -3 0" fill={INDIGO} />
          <text x="220" y="2" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Appel manqué</text>
          <text x="356" y="2" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8">09:14</text>
        </g>

        <g transform="translate(0 102)">
          <rect x="190" y="-12" width="172" height="24" rx="3" fill={BLUE} fillOpacity="0.1" />
          <rect x="200" y="-6" width="12" height="9" rx="1.5" fill="none" stroke={INDIGO} strokeWidth="1.5" />
          <path d="M 200 -5 L 206 0 L 212 -5" fill="none" stroke={INDIGO} strokeWidth="1.5" strokeLinejoin="round" />
          <text x="220" y="2" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10">Email · devis</text>
          <text x="356" y="2" textAnchor="end" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8">RÉPONDU</text>
          <rect x="328" y="5" width="34" height="2" rx="1" fill={BLUE} />
        </g>

        <g transform="translate(0 128)">
          <rect x="200" y="-6" width="12" height="10" rx="1.5" fill="none" stroke={INDIGO} strokeWidth="1.5" />
          <line x1="203" y1="-3" x2="209" y2="-3" stroke={INDIGO} strokeWidth="1" />
          <line x1="203" y1="0" x2="209" y2="0" stroke={INDIGO} strokeWidth="1" />
          <line x1="203" y1="3" x2="207" y2="3" stroke={INDIGO} strokeWidth="1" />
          <text x="220" y="2" fill={INDIGO_DEEP} fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10">Formulaire · contact</text>
          <text x="356" y="2" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8">12:48</text>
        </g>

        <line x1="196" y1="150" x2="356" y2="150" stroke={PAPER_RULE} />
        <text x="196" y="166" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7" letterSpacing="0.18em">SLA · 24H OUVRÉES</text>
      </g>

      <g opacity="0.32" filter={`url(#${ids.diffuse})`}>
        <rect x="93" y="50" width="14" height="12" rx="2" fill={INDIGO} />
        <rect x="80" y="46" width="40" height="6" rx="2" fill={INDIGO} />
        <circle cx="100" cy="146" r="68" fill={INDIGO} />
      </g>
      <g stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round">
        <rect x="93" y="44" width="14" height="12" rx="2" fill={INDIGO} />
        <rect x="80" y="40" width="40" height="6" rx="2" fill={INDIGO} />
      </g>
      <circle cx="100" cy="140" r="68" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" />
      <circle cx="100" cy="140" r="56" fill="none" stroke={PAPER} strokeWidth="1" strokeOpacity="0.28" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
        const r1 = 56;
        const r2 = i % 6 === 0 ? 44 : i % 2 === 0 ? 50 : 53;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={140 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2}
            y2={140 + Math.sin(a) * r2}
            stroke={PAPER}
            strokeOpacity={i % 6 === 0 ? 0.9 : 0.35}
            strokeWidth={i % 6 === 0 ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}
      <text x="100" y="140" textAnchor="middle" dominantBaseline="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="36" letterSpacing="-0.02em">24h</text>
      <text x="100" y="162" textAnchor="middle" fill={PAPER} fillOpacity="0.55" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">OUVRÉES</text>
      <rect x="97" y="80" width="6" height="12" rx="1" fill={BLUE} stroke={PAPER} strokeWidth="1.2" />

      <Connector x1={170} y1={120} x2={328} y2={106} />
    </Frame>
  );
});

// 02 · Audit — livret horodaté
export const IllustrationAudit = memo(function IllustrationAudit() {
  const ids = useDefIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={28} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(3 264 116)">
        <rect x="160" y="40" width="216" height="158" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="156" y="32" width="216" height="154" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <rect x="156" y="32" width="216" height="22" fill={INDIGO} />
        <text x="172" y="48" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">LIVRET · HORODATAGE</text>
        <text x="362" y="48" textAnchor="end" fill={PAPER} fillOpacity="0.6" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8">100%</text>

        <text x="170" y="68" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">DATE</text>
        <text x="222" y="68" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">DÉBUT</text>
        <text x="266" y="68" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">FIN</text>
        <text x="362" y="68" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">SIGNÉ</text>

        {[
          { d: "12/03", s: "14:00", e: "15:00", hl: false },
          { d: "15/03", s: "10:00", e: "11:00", hl: false },
          { d: "18/03", s: "16:30", e: "17:30", hl: true },
          { d: "22/03", s: "09:00", e: "10:00", hl: false },
        ].map((r, i) => (
          <g key={i} transform={`translate(0 ${82 + i * 22})`}>
            {r.hl && <rect x="160" y="-8" width="208" height="22" rx="3" fill={BLUE} fillOpacity="0.1" />}
            <line x1="170" y1="-8" x2="362" y2="-8" stroke={PAPER_RULE} />
            <text x="170" y="8" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="10">{r.d}</text>
            <text x="222" y="8" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="10">{r.s}</text>
            <text x="266" y="8" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="10">{r.e}</text>
            <path d="M 318 4 c 6 -4 10 4 16 -2 s 12 2 18 -2" fill="none" stroke={r.hl ? BLUE : INDIGO_60} strokeWidth={r.hl ? 2 : 1.4} strokeLinecap="round" />
          </g>
        ))}

        <rect x="316" y="130" width="40" height="2" rx="1" fill={BLUE} />
      </g>

      <g opacity="0.32" filter={`url(#${ids.diffuse})`} transform="rotate(-14 90 130)">
        <rect x="62" y="68" width="56" height="22" rx="4" fill={INDIGO} />
        <rect x="74" y="86" width="32" height="14" fill={INDIGO} />
        <rect x="40" y="98" width="100" height="34" rx="3" fill={INDIGO} />
      </g>
      <g transform="rotate(-14 86 126)">
        <rect x="58" y="62" width="56" height="22" rx="6" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
        <rect x="70" y="80" width="32" height="14" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
        <rect x="36" y="92" width="100" height="34" rx="3" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
        <text x="86" y="114" textAnchor="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.06em">SIGNÉ</text>
        <rect x="44" y="128" width="84" height="3" rx="1.5" fill={BLUE} stroke={PAPER} strokeWidth="1" />
      </g>
      <circle cx="172" cy="146" r="2.5" fill={BLUE} opacity="0.55" />
      <circle cx="184" cy="138" r="1.8" fill={BLUE} opacity="0.45" />

      <Connector x1={158} y1={148} x2={328} y2={132} />
    </Frame>
  );
});

// 03 · Volume honnête — 200+ dossiers
export const IllustrationVolume = memo(function IllustrationVolume() {
  const ids = useDefIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={70} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(-8 250 196)">
        <rect x="186" y="180" width="148" height="38" rx="3" fill={INDIGO_DEEP} opacity="0.14" filter={`url(#${ids.softblur})`} />
        <path d="M 186 172 L 220 172 L 230 182 L 334 182 L 334 214 L 186 214 Z" fill={PAPER} stroke={PAPER_RULE} />
        <text x="194" y="200" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8">2022</text>
      </g>
      <g transform="rotate(4 250 168)">
        <rect x="180" y="148" width="160" height="42" rx="3" fill={INDIGO_DEEP} opacity="0.14" filter={`url(#${ids.softblur})`} />
        <path d="M 180 140 L 216 140 L 226 150 L 340 150 L 340 188 L 180 188 Z" fill={PAPER} stroke={PAPER_RULE} />
        <text x="188" y="170" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8">2023</text>
      </g>
      <g transform="rotate(-3 250 138)">
        <rect x="174" y="116" width="170" height="46" rx="3" fill={INDIGO_DEEP} opacity="0.16" filter={`url(#${ids.softblur})`} />
        <path d="M 174 108 L 212 108 L 222 118 L 344 118 L 344 158 L 174 158 Z" fill={PAPER} stroke={PAPER_RULE} />
        <text x="182" y="140" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8">2024</text>
      </g>
      <g transform="rotate(2 250 108)">
        <rect x="170" y="84" width="180" height="50" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <path d="M 170 76 L 210 76 L 220 86 L 350 86 L 350 130 L 170 130 Z" fill={PAPER} stroke={PAPER_RULE} />
        <text x="178" y="110" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8">2025</text>
      </g>
      <g transform="rotate(-2 250 78)">
        <rect x="166" y="52" width="190" height="56" rx="3" fill={INDIGO_DEEP} opacity="0.22" filter={`url(#${ids.softblur})`} />
        <path d="M 166 44 L 208 44 L 220 54 L 356 54 L 356 100 L 166 100 Z" fill={INDIGO} />
        <rect x="166" y="54" width="190" height="46" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <rect x="166" y="54" width="190" height="20" fill={INDIGO} />
        <text x="178" y="68" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="0.06em">DOSSIERS · DEPUIS 2022</text>
        <rect x="296" y="78" width="50" height="18" rx="3" fill={BLUE} fillOpacity="0.1" />
        <text x="321" y="92" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13">204</text>
        <line x1="178" y1="84" x2="280" y2="84" stroke={PAPER_RULE} />
        <line x1="178" y1="92" x2="262" y2="92" stroke={PAPER_RULE} />
      </g>

      <text x="158" y="156" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="110" letterSpacing="-0.04em" opacity="0.32" filter={`url(#${ids.diffuse})`}>200+</text>
      <text x="156" y="152" textAnchor="middle" fill={INDIGO} stroke={PAPER} strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="110" letterSpacing="-0.04em">200+</text>

      <Connector x1={228} y1={130} x2={300} y2={84} />
    </Frame>
  );
});

// 04 · Anti-stress — examens blancs
export const IllustrationExamen = memo(function IllustrationExamen() {
  const ids = useDefIds();
  return (
    <Frame>
      <Defs ids={ids} haloX={32} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(3 268 116)">
        <rect x="148" y="34" width="232" height="166" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="144" y="26" width="232" height="162" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="160" y="46" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">ITINÉRAIRE · EXAMEN</text>
        <text x="364" y="46" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8">N°07</text>
        <line x1="160" y1="54" x2="364" y2="54" stroke={INDIGO_20} />

        <g opacity="0.45">
          {[68, 88, 108, 128, 148, 168].map((y) => (
            <line key={`h${y}`} x1="160" y1={y} x2="364" y2={y} stroke={PAPER_RULE} />
          ))}
          {[180, 210, 240, 270, 300, 330, 360].map((x) => (
            <line key={`v${x}`} x1={x} y1="64" x2={x} y2="172" stroke={PAPER_RULE} />
          ))}
        </g>

        <path d="M 170 162 L 200 162 L 200 134 L 250 134 L 250 100 L 308 100 L 308 76 L 348 76" fill="none" stroke={INDIGO} strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="200" cy="134" r="6" fill={PAPER} stroke={INDIGO} strokeWidth="2" />
        <text x="200" y="137" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="8">1</text>
        <circle cx="250" cy="100" r="6" fill={PAPER} stroke={INDIGO} strokeWidth="2" />
        <text x="250" y="103" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="8">2</text>
        <circle cx="308" cy="76" r="6" fill={PAPER} stroke={INDIGO} strokeWidth="2" />
        <text x="308" y="79" textAnchor="middle" fill={INDIGO} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="8">3</text>

        <g transform="translate(348 76)">
          <line x1="0" y1="0" x2="0" y2="22" stroke={INDIGO} strokeWidth="2.5" strokeLinecap="round" />
          <g>
            <rect x="0" y="-14" width="20" height="14" fill={PAPER} stroke={INDIGO} strokeWidth="1.5" />
            <rect x="0" y="-14" width="5" height="5" fill={INDIGO} />
            <rect x="10" y="-14" width="5" height="5" fill={INDIGO} />
            <rect x="5" y="-9" width="5" height="5" fill={INDIGO} />
            <rect x="15" y="-9" width="5" height="5" fill={INDIGO} />
            <rect x="0" y="-4" width="5" height="4" fill={INDIGO} />
            <rect x="10" y="-4" width="5" height="4" fill={INDIGO} />
          </g>
          <rect x="-6" y="22" width="32" height="2" rx="1" fill={BLUE} />
          <text x="10" y="38" textAnchor="middle" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.18em">RÉUSSITE</text>
        </g>

        <circle cx="170" cy="162" r="5" fill={INDIGO} />

        <g transform="translate(308 162) rotate(-10)">
          <rect x="-28" y="-11" width="56" height="22" fill="none" stroke={BLUE} strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill={BLUE} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">EXAMEN BLANC</text>
        </g>
      </g>

      <g opacity="0.32" filter={`url(#${ids.diffuse})`}>
        <path d="M 78 50 a 48 48 0 1 1 -0.01 0 z" fill={INDIGO} transform="translate(0 4)" />
        <path d="M 78 142 L 64 116 L 92 116 Z" fill={INDIGO} transform="translate(0 4)" />
      </g>
      <g>
        <circle cx="78" cy="92" r="46" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" />
        <path d="M 78 162 L 56 112 L 100 112 Z" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
        <circle cx="78" cy="92" r="34" fill="none" stroke={PAPER} strokeWidth="1" strokeOpacity="0.28" />
        <path d="M 70 78 L 70 106 L 96 92 Z" fill={PAPER} />
      </g>
      <text x="78" y="180" textAnchor="middle" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">DÉPART</text>

      <Connector x1={124} y1={132} x2={342} y2={66} />
    </Frame>
  );
});

// 05 · Adultes actifs — 20h + samedi entier
export const IllustrationCreneaux = memo(function IllustrationCreneaux() {
  const ids = useDefIds();
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const hours = ["10h", "14h", "17h", "20h"];
  const gridX = 184;
  const gridY = 70;
  const cellW = 24;
  const cellH = 26;
  const satIdx = 5;
  const lateIdx = 3;
  return (
    <Frame>
      <Defs ids={ids} haloX={28} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(3 268 116)">
        <rect x="152" y="34" width="220" height="166" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="148" y="26" width="220" height="162" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="164" y="46" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">SEMAINE · 14</text>
        <text x="356" y="46" textAnchor="end" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8">RÉSERVER</text>
        <line x1="164" y1="54" x2="356" y2="54" stroke={INDIGO_20} />

        <rect x={gridX + satIdx * cellW - 2} y={gridY - 14} width={cellW} height={cellH * hours.length + 14} rx="2" fill={BLUE} fillOpacity="0.1" />
        <rect x={gridX - 2} y={gridY + lateIdx * cellH - 14} width={cellW * days.length} height={cellH} rx="2" fill={BLUE} fillOpacity="0.1" />

        {days.map((d, i) => {
          const isWeekend = i === satIdx || i === 6;
          return (
            <text
              key={i}
              x={gridX + i * cellW + cellW / 2 - 2}
              y={gridY - 4}
              textAnchor="middle"
              fill={isWeekend ? INDIGO : INDIGO_60}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={isWeekend ? 700 : 600}
              fontSize="9"
            >
              {d}
            </text>
          );
        })}

        {hours.map((h, i) => (
          <text
            key={i}
            x={gridX - 8}
            y={gridY + i * cellH + cellH / 2 - 2}
            textAnchor="end"
            dominantBaseline="middle"
            fill={i === lateIdx ? INDIGO : INDIGO_60}
            fontFamily="JetBrains Mono, monospace"
            fontWeight={i === lateIdx ? 700 : 600}
            fontSize="8"
          >
            {h}
          </text>
        ))}

        {hours.map((_, r) =>
          days.map((__, c) => {
            const isSat = c === satIdx;
            const isSun = c === 6;
            const isEve = r === lateIdx;
            const isBookable = (!isSun && !isEve && !isSat) || isSat || (isEve && !isSun);
            const isBlue = isSat || (isEve && !isSun);
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={gridX + c * cellW - 2}
                  y={gridY + r * cellH - 14}
                  width={cellW}
                  height={cellH}
                  fill="none"
                  stroke={PAPER_RULE}
                  strokeWidth="1"
                />
                {isBookable && (
                  <circle
                    cx={gridX + c * cellW + cellW / 2 - 2}
                    cy={gridY + r * cellH + cellH / 2 - 2}
                    r="3"
                    fill={isBlue ? BLUE : INDIGO}
                    opacity={isBlue ? 1 : 0.45}
                  />
                )}
              </g>
            );
          }),
        )}

        <rect x={gridX - 24} y={gridY + lateIdx * cellH + 2} width="20" height="2" rx="1" fill={BLUE} />
      </g>

      <g opacity="0.32" filter={`url(#${ids.diffuse})`}>
        <circle cx="86" cy="124" r="58" fill={INDIGO} />
      </g>
      <circle cx="86" cy="118" r="58" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" />
      <circle cx="86" cy="118" r="48" fill="none" stroke={PAPER} strokeWidth="1" strokeOpacity="0.28" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const r1 = 48;
        const r2 = i % 3 === 0 ? 38 : 43;
        return (
          <line
            key={i}
            x1={86 + Math.cos(a) * r1}
            y1={118 + Math.sin(a) * r1}
            x2={86 + Math.cos(a) * r2}
            y2={118 + Math.sin(a) * r2}
            stroke={PAPER}
            strokeOpacity={i % 3 === 0 ? 0.9 : 0.35}
            strokeWidth={i % 3 === 0 ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}
      <line x1="86" y1="118" x2="86" y2="80" stroke={PAPER} strokeWidth="3" strokeLinecap="round" />
      {(() => {
        const a = (8 / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <line
            x1="86"
            y1="118"
            x2={86 + Math.cos(a) * 26}
            y2={118 + Math.sin(a) * 26}
            stroke={PAPER}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })()}
      <circle cx="86" cy="118" r="3" fill={PAPER} />
      <text x="86" y="148" textAnchor="middle" fill={PAPER} fillOpacity="0.55" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">20:00</text>
      {(() => {
        const a = (8 / 12) * Math.PI * 2 - Math.PI / 2;
        const cx = 86 + Math.cos(a) * 46;
        const cy = 118 + Math.sin(a) * 46;
        return (
          <rect
            x={cx - 5}
            y={cy - 3}
            width="10"
            height="6"
            rx="1.2"
            fill={BLUE}
            stroke={PAPER}
            strokeWidth="1.2"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${cx} ${cy})`}
          />
        );
      })()}

      <Connector x1={146} y1={120} x2={170} y2={154} />
    </Frame>
  );
});

// 06 · Continuité — moniteur référent
export const IllustrationMoniteur = memo(function IllustrationMoniteur() {
  const ids = useDefIds();
  const sig = "M 0 4 c 4 -6 8 6 12 -2 s 8 4 14 -2 s 8 4 14 0";
  return (
    <Frame>
      <Defs ids={ids} haloX={28} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g transform="rotate(3 264 116)">
        <rect x="160" y="34" width="216" height="166" rx="3" fill={INDIGO_DEEP} opacity="0.18" filter={`url(#${ids.softblur})`} />
        <rect x="156" y="26" width="216" height="162" rx="2" fill={PAPER} stroke={PAPER_RULE} />
        <text x="172" y="46" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">LIVRET · MONITEUR</text>
        <line x1="172" y1="54" x2="362" y2="54" stroke={INDIGO_20} />

        <text x="172" y="68" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">COURS</text>
        <text x="222" y="68" fill={INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7">DATE</text>
        <text x="358" y="68" textAnchor="end" fill={INDIGO} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7">SIGNÉ</text>

        <rect x="290" y="74" width="74" height="106" rx="3" fill={BLUE} fillOpacity="0.1" />

        {[
          { n: "01", d: "12/03" },
          { n: "02", d: "15/03" },
          { n: "03", d: "18/03" },
          { n: "04", d: "22/03" },
          { n: "05", d: "26/03" },
        ].map((r, i) => (
          <g key={i} transform={`translate(0 ${88 + i * 18})`}>
            <line x1="172" y1="-6" x2="362" y2="-6" stroke={PAPER_RULE} />
            <text x="172" y="6" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">#{r.n}</text>
            <text x="222" y="6" fill={INDIGO_DEEP} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9">{r.d}</text>
            <path d={sig} transform="translate(298 -2)" fill="none" stroke={INDIGO} strokeWidth="1.6" strokeLinecap="round" />
          </g>
        ))}

        <rect x="332" y="70" width="30" height="2" rx="1" fill={BLUE} />
      </g>

      <g opacity="0.32" filter={`url(#${ids.diffuse})`} transform="rotate(-6 84 130)">
        <rect x="32" y="64" width="106" height="124" rx="6" fill={INDIGO} />
        <rect x="78" y="36" width="14" height="32" fill={INDIGO} />
      </g>
      <g transform="rotate(-6 84 124)">
        <rect x="76" y="30" width="14" height="30" rx="2" fill={INDIGO} stroke={PAPER} strokeWidth="2" strokeLinejoin="round" />
        <path d="M 60 8 Q 84 22 108 8" fill="none" stroke={INDIGO} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="30" y="58" width="108" height="124" rx="6" fill={INDIGO} stroke={PAPER} strokeWidth="2.5" strokeLinejoin="round" paintOrder="stroke" />
        <rect x="30" y="58" width="108" height="22" fill={INDIGO_DEEP} />
        <text x="84" y="73" textAnchor="middle" fill={PAPER} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.18em">MONITEUR</text>
        <circle cx="84" cy="108" r="22" fill={PAPER} fillOpacity="0.12" stroke={PAPER} strokeWidth="1.5" />
        <circle cx="84" cy="102" r="7" fill={PAPER} fillOpacity="0.85" />
        <path d="M 68 124 a 16 12 0 0 1 32 0 z" fill={PAPER} fillOpacity="0.85" />
        <text x="84" y="150" textAnchor="middle" fill={PAPER} fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13" letterSpacing="-0.01em">T. MARIN</text>
        <path d={sig} transform="translate(60 158) scale(1.4 1.4)" fill="none" stroke={PAPER} strokeWidth="1.8" strokeLinecap="round" />
        <rect x="60" y="172" width="48" height="3" rx="1.5" fill={BLUE} />
      </g>

      <Connector x1={148} y1={154} x2={310} y2={70} />
    </Frame>
  );
});

export const MESURE_ILLUSTRATIONS = [
  IllustrationDelai,
  IllustrationAudit,
  IllustrationVolume,
  IllustrationExamen,
  IllustrationCreneaux,
  IllustrationMoniteur,
];
