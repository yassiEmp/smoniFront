// Smoni — "Nous trouver" illustrations
// Locked treatment recipe (per smoni-illustration-process.md §5):
//  • Radial brand halo + halftone-dot ground
//  • Solid indigo subject, white stroke via paint-order, diffuse brand shadow
//  • ONE blue (#3b82f6) highlight per scene
//  • Dotted-leader connector w/ terminator dot to the emphasized detail

import { useId } from "react";

const N_BG = "#f3f1ff";
const N_INDIGO = "#2c2876";
const N_INDIGO_DEEP = "#1e1b4b";
const N_PAPER = "#ffffff";
const N_RULE = "#e6e3f5";
const N_BLUE = "#3b82f6";
const N_INDIGO_60 = "#7472b0";
const N_INDIGO_20 = "#cfceea";

type Ids = { bg: string; dots: string; diffuse: string; softblur: string };

const useIds = (): Ids => {
  const uid = useId().replace(/[:]/g, "");
  return {
    bg: `nt_bg_${uid}`,
    dots: `nt_dots_${uid}`,
    diffuse: `nt_df_${uid}`,
    softblur: `nt_sb_${uid}`,
  };
};

const NDefs = ({ ids, haloX = 30, haloY = 50 }: { ids: Ids; haloX?: number; haloY?: number }) => (
  <defs>
    <radialGradient id={ids.bg} cx={`${haloX}%`} cy={`${haloY}%`} r="78%">
      <stop offset="0%" stopColor="#e6e3ff" />
      <stop offset="60%" stopColor={N_BG} />
      <stop offset="100%" stopColor="#f8fafc" />
    </radialGradient>
    <pattern id={ids.dots} width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="0.55" fill={N_INDIGO} fillOpacity="0.06" />
    </pattern>
    <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
    <filter id={ids.softblur} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

const NConnector = ({ x1, y1, x2, y2, color = N_BLUE }: { x1: number; y1: number; x2: number; y2: number; color?: string }) => (
  <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="2 3" opacity="0.8" />
    <circle cx={x2} cy={y2} r="2.5" fill={color} />
  </>
);

const NCardFrame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    {children}
  </svg>
);

// CARD 1 — AGENCE — storefront, "62" plaque is the SOLE blue highlight
export const NT_CardAgence = () => {
  const ids = useIds();
  return (
    <NCardFrame>
      <NDefs ids={ids} haloX={32} haloY={48} />
      <rect width="200" height="150" fill={`url(#${ids.bg})`} />
      <rect width="200" height="150" fill={`url(#${ids.dots})`} />

      <line x1="0" y1="130" x2="200" y2="130" stroke={N_INDIGO_20} strokeWidth="0.6" strokeDasharray="2 4" />

      <g>
        <ellipse cx="104" cy="132" rx="58" ry="6" fill={N_INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <rect x="56" y="36" width="98" height="94" rx="3" fill={N_INDIGO} stroke={N_PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <path d="M 50 50 L 160 50 L 154 60 L 56 60 Z" fill={N_INDIGO_DEEP} stroke={N_PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <line x1="68" y1="50" x2="65" y2="60" stroke={N_PAPER} strokeOpacity="0.18" strokeWidth="0.8" />
        <line x1="86" y1="50" x2="84" y2="60" stroke={N_PAPER} strokeOpacity="0.18" strokeWidth="0.8" />
        <line x1="104" y1="50" x2="104" y2="60" stroke={N_PAPER} strokeOpacity="0.18" strokeWidth="0.8" />
        <line x1="122" y1="50" x2="123" y2="60" stroke={N_PAPER} strokeOpacity="0.18" strokeWidth="0.8" />
        <line x1="140" y1="50" x2="142" y2="60" stroke={N_PAPER} strokeOpacity="0.18" strokeWidth="0.8" />

        <rect x="66" y="66" width="78" height="14" rx="2" fill={N_PAPER} fillOpacity="0.1" />
        <text x="105" y="76" textAnchor="middle" fill={N_PAPER} opacity="0.85"
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="9" letterSpacing="0.16em">SMONI</text>

        <rect x="64" y="86" width="32" height="34" rx="1.5" fill={N_PAPER} fillOpacity="0.08"
          stroke={N_PAPER} strokeOpacity="0.32" strokeWidth="1" />
        <line x1="80" y1="86" x2="80" y2="120" stroke={N_PAPER} strokeOpacity="0.18" />
        <line x1="64" y1="103" x2="96" y2="103" stroke={N_PAPER} strokeOpacity="0.18" />

        <rect x="106" y="86" width="38" height="44" rx="1.5"
          fill={N_INDIGO_DEEP} stroke={N_PAPER} strokeOpacity="0.42" strokeWidth="1" />
        <rect x="111" y="92" width="28" height="20" rx="1" fill={N_PAPER} fillOpacity="0.12" />
        <circle cx="138" cy="118" r="1.2" fill={N_PAPER} opacity="0.7" />
      </g>

      <g transform="translate(124 28)">
        <rect x="-2" y="-2" width="42" height="28" rx="6" fill={N_BLUE} fillOpacity="0.12" />
        <rect x="0" y="0" width="38" height="24" rx="5" fill={N_PAPER} stroke={N_BLUE} strokeWidth="1.5" />
        <text x="19" y="17" textAnchor="middle" fill={N_INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14" letterSpacing="-0.02em">62</text>
      </g>

      <text x="16" y="140" fill={N_INDIGO_60}
        fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">RUE DE LA JARRY</text>

      <NConnector x1={70} y1={137} x2={124} y2={36} />
    </NCardFrame>
  );
};

// CARD 2 — RER A — platform sign + dotted walk + "4 min" blue chip (SOLE highlight)
export const NT_CardRER = () => {
  const ids = useIds();
  return (
    <NCardFrame>
      <NDefs ids={ids} haloX={28} haloY={50} />
      <rect width="200" height="150" fill={`url(#${ids.bg})`} />
      <rect width="200" height="150" fill={`url(#${ids.dots})`} />

      <g>
        <ellipse cx="50" cy="130" rx="22" ry="4" fill={N_INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <rect x="49" y="74" width="3" height="52" fill={N_INDIGO_60} opacity="0.7" />
        <rect x="18" y="28" width="66" height="50" rx="6" fill={N_INDIGO} stroke={N_PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <rect x="18" y="28" width="66" height="8" rx="6" fill={N_INDIGO_DEEP} />
        <rect x="18" y="32" width="66" height="4" fill={N_INDIGO_DEEP} />
        <text x="51" y="56" textAnchor="middle" fill={N_PAPER}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.02em">RER</text>
        <circle cx="51" cy="68" r="6" fill={N_PAPER} />
        <text x="51" y="72" textAnchor="middle" fill={N_INDIGO}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="9">A</text>
      </g>

      <path d="M 78 100 Q 108 110 130 120" fill="none" stroke={N_INDIGO_60} strokeWidth="1.4" strokeDasharray="2 4" opacity="0.7" />

      <g fill={N_INDIGO_60} opacity="0.6">
        <ellipse cx="92" cy="106" rx="2.2" ry="1.2" transform="rotate(20 92 106)" />
        <ellipse cx="108" cy="112" rx="2.2" ry="1.2" transform="rotate(20 108 112)" />
        <ellipse cx="124" cy="118" rx="2.2" ry="1.2" transform="rotate(20 124 118)" />
      </g>

      <g transform="translate(132 92)">
        <ellipse cx="0" cy="32" rx="9" ry="2" fill={N_INDIGO} opacity="0.3" filter={`url(#${ids.diffuse})`} />
        <path d="M 0 4 C 9 4 16 11 16 20 C 16 30 0 44 0 44 C 0 44 -16 30 -16 20 C -16 11 -9 4 0 4 Z"
          fill={N_INDIGO} stroke={N_PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
        <circle cx="0" cy="20" r="4" fill={N_PAPER} />
      </g>

      <g transform="translate(116 16)">
        <rect x="-2" y="-2" width="68" height="30" rx="14" fill={N_BLUE} fillOpacity="0.12" />
        <rect x="0" y="0" width="64" height="26" rx="13" fill={N_PAPER} stroke={N_BLUE} strokeWidth="1.5" />
        <circle cx="13" cy="13" r="6.5" fill="none" stroke={N_BLUE} strokeWidth="1.4" />
        <line x1="13" y1="13" x2="13" y2="8.5" stroke={N_BLUE} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="13" y1="13" x2="16.5" y2="13" stroke={N_BLUE} strokeWidth="1.2" strokeLinecap="round" />
        <text x="38" y="18" textAnchor="middle" fill={N_INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13" letterSpacing="-0.01em">4 min</text>
      </g>

      <NConnector x1={140} y1={42} x2={108} y2={112} />
    </NCardFrame>
  );
};

// CARD 3 — MÉTRO Bérault — roundel + dotted walk + "6 min" blue chip
export const NT_CardMetro = () => {
  const ids = useIds();
  return (
    <NCardFrame>
      <NDefs ids={ids} haloX={30} haloY={48} />
      <rect width="200" height="150" fill={`url(#${ids.bg})`} />
      <rect width="200" height="150" fill={`url(#${ids.dots})`} />

      <g transform="translate(50 64)">
        <ellipse cx="0" cy="42" rx="22" ry="4" fill={N_INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <circle r="32" fill={N_INDIGO} stroke={N_PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <circle r="26" fill="none" stroke={N_PAPER} strokeOpacity="0.32" strokeWidth="1" />
        <text x="0" y="-2" textAnchor="middle" fill={N_PAPER}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="22" letterSpacing="-0.04em">M</text>
        <text x="0" y="18" textAnchor="middle" fill={N_PAPER} opacity="0.7"
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">LIGNE</text>
      </g>

      <g transform="translate(82 38)">
        <circle r="13" fill={N_INDIGO_DEEP} stroke={N_PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
        <text y="5" textAnchor="middle" fill={N_PAPER}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14">1</text>
      </g>

      <path d="M 84 88 Q 110 102 132 118" fill="none" stroke={N_INDIGO_60} strokeWidth="1.4" strokeDasharray="2 4" opacity="0.7" />

      <g fill={N_INDIGO_60} opacity="0.6">
        <ellipse cx="96" cy="96" rx="2.2" ry="1.2" transform="rotate(28 96 96)" />
        <ellipse cx="110" cy="104" rx="2.2" ry="1.2" transform="rotate(28 110 104)" />
        <ellipse cx="124" cy="113" rx="2.2" ry="1.2" transform="rotate(28 124 113)" />
      </g>

      <g transform="translate(134 90)">
        <ellipse cx="0" cy="32" rx="9" ry="2" fill={N_INDIGO} opacity="0.3" filter={`url(#${ids.diffuse})`} />
        <path d="M 0 4 C 9 4 16 11 16 20 C 16 30 0 44 0 44 C 0 44 -16 30 -16 20 C -16 11 -9 4 0 4 Z"
          fill={N_INDIGO} stroke={N_PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
        <circle cx="0" cy="20" r="4" fill={N_PAPER} />
      </g>

      <g transform="translate(116 16)">
        <rect x="-2" y="-2" width="68" height="30" rx="14" fill={N_BLUE} fillOpacity="0.12" />
        <rect x="0" y="0" width="64" height="26" rx="13" fill={N_PAPER} stroke={N_BLUE} strokeWidth="1.5" />
        <circle cx="13" cy="13" r="6.5" fill="none" stroke={N_BLUE} strokeWidth="1.4" />
        <line x1="13" y1="13" x2="13" y2="8.5" stroke={N_BLUE} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="13" y1="13" x2="17" y2="14.5" stroke={N_BLUE} strokeWidth="1.2" strokeLinecap="round" />
        <text x="38" y="18" textAnchor="middle" fill={N_INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="13" letterSpacing="-0.01em">6 min</text>
      </g>

      <NConnector x1={140} y1={42} x2={110} y2={104} />
    </NCardFrame>
  );
};

// HERO MAP — stylized neighborhood map (4:5, 400x500), agency pin = sole blue highlight
export const NT_HeroMap = () => {
  const ids = useIds();
  return (
    <svg viewBox="0 0 400 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <NDefs ids={ids} haloX={50} haloY={48} />
      <rect width="400" height="500" fill={`url(#${ids.bg})`} />
      <rect width="400" height="500" fill={`url(#${ids.dots})`} />

      <g opacity="0.55">
        <path d="M 248 360 Q 300 340 360 360 L 380 410 Q 360 470 290 480 L 230 460 Z"
          fill={N_INDIGO_20} fillOpacity="0.45" />
        <text x="312" y="430" textAnchor="middle" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">PARC</text>

        <rect x="44" y="98" width="78" height="48" rx="10" fill={N_INDIGO_20} fillOpacity="0.4" />
        <text x="83" y="125" textAnchor="middle" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.18em">PL. SÉMARD</text>
      </g>

      <g stroke={N_INDIGO_20} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 0 222 Q 200 218 400 226" strokeWidth="6" stroke={N_INDIGO_20} opacity="0.5" />
        <path d="M 60 380 Q 200 260 360 180" strokeWidth="4" />
        <path d="M 100 60 Q 130 200 120 460" />
        <path d="M 280 30 Q 270 200 296 470" />
        <path d="M 0 320 Q 180 326 400 310" />
        <path d="M 0 130 Q 200 140 400 120" strokeWidth="3" stroke={N_INDIGO_20} opacity="0.6" />
      </g>

      <g fill={N_INDIGO_60} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.18em" opacity="0.85">
        <text x="20" y="214">AV. DE PARIS</text>
        <text transform="translate(168 312) rotate(-32)">RUE DE LA JARRY</text>
        <text x="306" y="118">R. DE FONTENAY</text>
        <text x="20" y="314">R. DEFRANCE</text>
      </g>

      <g transform="translate(98 168)">
        <ellipse cx="0" cy="40" rx="22" ry="4" fill={N_INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <rect x="-22" y="-22" width="44" height="44" rx="8"
          fill={N_INDIGO_DEEP} stroke={N_PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <text y="-3" textAnchor="middle" fill={N_PAPER}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="11" letterSpacing="-0.02em">RER</text>
        <circle cx="0" cy="10" r="6" fill={N_PAPER} />
        <text y="14" textAnchor="middle" fill={N_INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="9">A</text>
      </g>
      <g transform="translate(50 240)">
        <rect x="0" y="0" width="116" height="22" rx="6" fill={N_PAPER} stroke={N_INDIGO_20} strokeWidth="1" />
        <text x="10" y="15" fill={N_INDIGO_DEEP}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="0.18em">VINCENNES</text>
        <text x="96" y="15" textAnchor="end" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.18em">4'</text>
      </g>

      <g transform="translate(326 248)">
        <ellipse cx="0" cy="40" rx="22" ry="4" fill={N_INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <circle r="26" fill={N_INDIGO} stroke={N_PAPER} strokeWidth="2.5" style={{ paintOrder: "stroke" }} />
        <circle r="20" fill="none" stroke={N_PAPER} strokeOpacity="0.32" strokeWidth="1" />
        <text y="4" textAnchor="middle" fill={N_PAPER}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="22" letterSpacing="-0.04em">M</text>
        <g transform="translate(22 -22)">
          <circle r="10" fill={N_INDIGO_DEEP} stroke={N_PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
          <text y="4" textAnchor="middle" fill={N_PAPER}
            fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="11">1</text>
        </g>
      </g>
      <g transform="translate(258 312)">
        <rect x="0" y="0" width="116" height="22" rx="6" fill={N_PAPER} stroke={N_INDIGO_20} strokeWidth="1" />
        <text x="10" y="15" fill={N_INDIGO_DEEP}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="0.18em">BÉRAULT</text>
        <text x="96" y="15" textAnchor="end" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.18em">6'</text>
      </g>

      <path d="M 118 192 Q 158 240 200 280" fill="none" stroke={N_INDIGO} strokeWidth="1.8" strokeDasharray="3 5" opacity="0.55" />
      <g fill={N_INDIGO} opacity="0.5">
        <ellipse cx="132" cy="208" rx="2.6" ry="1.4" transform="rotate(45 132 208)" />
        <ellipse cx="150" cy="230" rx="2.6" ry="1.4" transform="rotate(45 150 230)" />
        <ellipse cx="170" cy="252" rx="2.6" ry="1.4" transform="rotate(45 170 252)" />
        <ellipse cx="188" cy="272" rx="2.6" ry="1.4" transform="rotate(45 188 272)" />
      </g>

      <path d="M 302 258 Q 256 270 218 286" fill="none" stroke={N_INDIGO} strokeWidth="1.8" strokeDasharray="3 5" opacity="0.55" />
      <g fill={N_INDIGO} opacity="0.5">
        <ellipse cx="284" cy="262" rx="2.6" ry="1.4" transform="rotate(-15 284 262)" />
        <ellipse cx="262" cy="268" rx="2.6" ry="1.4" transform="rotate(-15 262 268)" />
        <ellipse cx="240" cy="276" rx="2.6" ry="1.4" transform="rotate(-15 240 276)" />
        <ellipse cx="220" cy="284" rx="2.6" ry="1.4" transform="rotate(-15 220 284)" />
      </g>

      <g transform="translate(204 296)">
        <circle r="56" fill={N_BLUE} fillOpacity="0.08" />
        <circle r="38" fill={N_BLUE} fillOpacity="0.12" />
        <ellipse cx="0" cy="58" rx="22" ry="5" fill={N_INDIGO} opacity="0.32" filter={`url(#${ids.diffuse})`} />
        <path d="M 0 -32 C 22 -32 38 -14 38 8 C 38 32 0 64 0 64 C 0 64 -38 32 -38 8 C -38 -14 -22 -32 0 -32 Z"
          fill={N_INDIGO} stroke={N_PAPER} strokeWidth="3" style={{ paintOrder: "stroke" }} />
        <circle cx="0" cy="6" r="16" fill="none" stroke={N_PAPER} strokeOpacity="0.32" strokeWidth="1.2" />
        <circle cx="0" cy="6" r="11" fill={N_PAPER} />
        <text x="0" y="11" textAnchor="middle" fill={N_BLUE}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14" letterSpacing="-0.02em">62</text>
      </g>

      <g transform="translate(204 376)">
        <rect x="-94" y="6" width="188" height="76" rx="3"
          fill={N_INDIGO_DEEP} opacity="0.16" filter={`url(#${ids.softblur})`} />
        <rect x="-98" y="0" width="188" height="76" rx="3" fill={N_PAPER} stroke={N_RULE} strokeWidth="1" />
        <path d="M -8 0 L 0 -8 L 8 0 Z" fill={N_PAPER} stroke={N_RULE} />

        <text x="-86" y="20" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">AGENCE UNIQUE · 94300</text>

        <rect x="-90" y="26" width="172" height="22" rx="3" fill={N_BLUE} fillOpacity="0.1" />
        <text x="-82" y="42" fill={N_INDIGO_DEEP}
          fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="14" letterSpacing="-0.01em">62 RUE DE LA JARRY</text>
        <line x1="-82" y1="46" x2="40" y2="46" stroke={N_BLUE} strokeWidth="1.5" />

        <text x="-86" y="62" fill={N_INDIGO_DEEP}
          fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11">Vincennes · Val-de-Marne</text>
      </g>

      <g transform="translate(360 56)" opacity="0.85">
        <circle r="16" fill={N_PAPER} stroke={N_INDIGO_20} />
        <path d="M 0 -10 L 5 4 L 0 1 L -5 4 Z" fill={N_INDIGO} />
        <text y="11" textAnchor="middle" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="7" letterSpacing="0.22em">N</text>
      </g>

      <g transform="translate(28 470)" opacity="0.85">
        <text x="0" y="0" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" letterSpacing="0.22em">VINCENNES · 94300</text>
        <line x1="0" y1="8" x2="74" y2="8" stroke={N_INDIGO_60} strokeWidth="1" />
        <line x1="0" y1="6" x2="0" y2="10" stroke={N_INDIGO_60} strokeWidth="1" />
        <line x1="37" y1="6" x2="37" y2="10" stroke={N_INDIGO_60} strokeWidth="1" />
        <line x1="74" y1="6" x2="74" y2="10" stroke={N_INDIGO_60} strokeWidth="1" />
        <text x="0" y="20" fill={N_INDIGO_60}
          fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="7" letterSpacing="0.18em">~150 m</text>
      </g>
    </svg>
  );
};
