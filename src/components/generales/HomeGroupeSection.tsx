import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

// ──────────────────────────────────────────────────────────
// Design tokens — Smoni "Nos formations" bento (Claude Design)
// ──────────────────────────────────────────────────────────
const FC = {
  indigo: "#2c2876",
  deep: "#1e1b4b",
  ind60: "#7472b0",
  ind20: "#cfceea",
  paper: "#ffffff",
  rule: "#e6e3f5",
  bgTint: "#f1f0fb",
  bgArt: "#f3f1ff",
  blue: "#3b82f6",
  ink: "#0f172a",
  ink60: "#475569",
};

// ── Reusable atoms ────────────────────────────────────────
const MonoLabel = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.22em",
      color: tone === "dark" ? "rgba(255,255,255,0.55)" : FC.ind60,
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
);

const Badge = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.22em",
      color: tone === "dark" ? "rgba(255,255,255,0.65)" : FC.indigo,
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
);


const Cta = ({
  children = "Voir détails",
  tone = "light",
}: {
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "0.01em",
      color: tone === "dark" ? FC.paper : FC.deep,
      marginTop: 14,
    }}
  >
    {children}
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        width: 22,
        height: 22,
        borderRadius: 999,
        background: tone === "dark" ? "rgba(255,255,255,0.14)" : FC.bgTint,
        border:
          tone === "dark"
            ? "1px solid rgba(255,255,255,0.22)"
            : `1px solid ${FC.rule}`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ArrowRight
        className="w-3 h-3"
        style={{ color: tone === "dark" ? "#fff" : FC.indigo }}
        strokeWidth={2.2}
      />
    </span>
  </span>
);

// ── Card chrome ───────────────────────────────────────────
const cardBase: React.CSSProperties = {
  position: "relative",
  background: FC.paper,
  border: "1px solid #eef0f7",
  borderRadius: 20,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow:
    "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)",
  transition:
    "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
};
const onEnter = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow =
    "0 1px 2px rgba(15, 23, 42, 0.04), 0 32px 60px -28px rgba(44, 40, 118, 0.28)";
  e.currentTarget.style.borderColor = "#dcd9f0";
};
const onLeave = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow =
    "0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 48px -32px rgba(28, 25, 90, 0.18)";
  e.currentTarget.style.borderColor = "#eef0f7";
};

// ──────────────────────────────────────────────────────────
// SVG illustrations — inlined from design package
// Each function generates unique IDs to avoid SVG defs collisions.
// ──────────────────────────────────────────────────────────
let __uid = 0;
const useId = (p: string) => `${p}_g${++__uid}`;

type DefIds = { bg: string; dots: string; diffuse: string; softblur: string };

const FDefs = ({
  ids,
  haloX = 30,
  haloY = 50,
}: {
  ids: DefIds;
  haloX?: number;
  haloY?: number;
}) => (
  <defs>
    <radialGradient id={ids.bg} cx={`${haloX}%`} cy={`${haloY}%`} r="74%">
      <stop offset="0%" stopColor="#e6e3ff" />
      <stop offset="60%" stopColor={FC.bgArt} />
      <stop offset="100%" stopColor="#f8fafc" />
    </radialGradient>
    <pattern id={ids.dots} width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="0.55" fill={FC.indigo} fillOpacity="0.06" />
    </pattern>
    <filter id={ids.diffuse} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
    <filter id={ids.softblur} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

const FConnector = ({
  x1,
  y1,
  x2,
  y2,
  color = FC.blue,
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

const FFrame = ({
  vb = "0 0 400 225",
  title,
  children,
}: {
  vb?: string;
  title: string;
  children: React.ReactNode;
}) => (
  <svg
    viewBox={vb}
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", position: "absolute", inset: 0 }}
  >
    <title>{title}</title>
    {children}
  </svg>
);

// HERO · Permis B — manual shifter "H" gate + 30h plate
const ArtHero = ({ title }: { title: string }) => {
  const ids: DefIds = {
    bg: useId("bg"),
    dots: useId("dots"),
    diffuse: useId("df"),
    softblur: useId("sb"),
  };
  return (
    <FFrame vb="0 0 800 450" title={title}>
      <FDefs ids={ids} haloX={32} haloY={48} />
      <rect width="800" height="450" fill={`url(#${ids.bg})`} />
      <rect width="800" height="450" fill={`url(#${ids.dots})`} />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="11"
        letterSpacing="3"
        fill={FC.ind60}
      >
        <text x="44" y="56">CATÉGORIE · B</text>
      </g>

      {/* faint "H" gate pattern */}
      <g
        stroke={FC.indigo}
        strokeOpacity="0.16"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      >
        <line x1="240" y1="135" x2="240" y2="335" />
        <line x1="370" y1="135" x2="370" y2="335" />
        <line x1="500" y1="135" x2="500" y2="335" />
        <line x1="240" y1="235" x2="500" y2="235" />
      </g>
      <g
        fontFamily="'Outfit', sans-serif"
        fontWeight="800"
        fontSize="20"
        fill={FC.indigo}
        fillOpacity="0.55"
        textAnchor="middle"
      >
        <text x="240" y="120">1</text>
        <text x="370" y="120">3</text>
        <text x="500" y="120">5</text>
        <text x="240" y="365">2</text>
        <text x="370" y="365">4</text>
        <text x="500" y="365">R</text>
      </g>

      {/* shadow under knob */}
      <ellipse
        cx="370"
        cy="252"
        rx="74"
        ry="20"
        fill={FC.indigo}
        fillOpacity="0.32"
        filter={`url(#${ids.diffuse})`}
      />

      {/* shifter stem */}
      <rect
        x="362"
        y="160"
        width="16"
        height="80"
        rx="3"
        fill={FC.indigo}
        stroke={FC.paper}
        strokeWidth="2.5"
        paintOrder="stroke"
      />

      {/* knob */}
      <circle
        cx="370"
        cy="160"
        r="42"
        fill={FC.indigo}
        stroke={FC.paper}
        strokeWidth="3"
        paintOrder="stroke"
      />
      <circle
        cx="370"
        cy="160"
        r="32"
        fill="none"
        stroke={FC.paper}
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <text
        x="370"
        y="174"
        fontFamily="'Outfit', sans-serif"
        fontWeight="900"
        fontSize="44"
        fill={FC.paper}
        textAnchor="middle"
        letterSpacing="-0.04em"
      >
        B
      </text>

      {/* 30 H plate */}
      <g transform="translate(548, 308) rotate(-3)">
        <rect
          x="2"
          y="6"
          width="200"
          height="92"
          rx="8"
          fill={FC.deep}
          fillOpacity="0.18"
          filter={`url(#${ids.softblur})`}
        />
        <rect
          x="0"
          y="0"
          width="200"
          height="92"
          rx="8"
          fill={FC.paper}
          stroke={FC.rule}
          strokeWidth="1"
        />
        <rect x="0" y="0" width="200" height="22" rx="8" fill={FC.indigo} />
        <rect x="0" y="14" width="200" height="8" fill={FC.indigo} />
        <text
          x="12"
          y="16"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          letterSpacing="2.4"
          fill="#fff"
          fillOpacity="0.86"
        >
          FORFAIT · CONDUITE
        </text>
        <rect
          x="10"
          y="44"
          width="180"
          height="32"
          rx="4"
          fill={FC.blue}
          fillOpacity="0.10"
        />
        <text
          x="20"
          y="69"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="-0.03em"
          fill={FC.deep}
        >
          30
        </text>
        <text
          x="68"
          y="69"
          fontFamily="'Outfit', sans-serif"
          fontWeight="700"
          fontSize="18"
          fill={FC.ind60}
        >
          h conduite
        </text>
        <line x1="20" y1="73" x2="60" y2="73" stroke={FC.blue} strokeWidth="2" />
        <text
          x="20"
          y="86"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="600"
          fontSize="8"
          letterSpacing="1.8"
          fill={FC.ind60}
        >
          + CODE INCLUS · 24/7
        </text>
      </g>

      <FConnector x1={410} y1={180} x2={568} y2={356} />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="10"
        letterSpacing="2.6"
        fill={FC.ind60}
        opacity="0.6"
      >
        <text x="44" y="412">01 / 06 · LE PLUS DEMANDÉ</text>
      </g>
    </FFrame>
  );
};

// CODE · "24/7" type-led
const ArtCode = ({ title }: { title: string }) => {
  const ids: DefIds = {
    bg: useId("bg"),
    dots: useId("dots"),
    diffuse: useId("df"),
    softblur: useId("sb"),
  };
  return (
    <FFrame title={title}>
      <FDefs ids={ids} haloX={30} haloY={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="10"
        letterSpacing="2.6"
        fill={FC.ind60}
      >
        <text x="24" y="36">CODE · EN LIGNE</text>
      </g>

      <ellipse
        cx="200"
        cy="160"
        rx="140"
        ry="18"
        fill={FC.indigo}
        fillOpacity="0.28"
        filter={`url(#${ids.diffuse})`}
      />

      <g
        fontFamily="'Outfit', sans-serif"
        fontWeight="900"
        fill={FC.indigo}
        textAnchor="middle"
        letterSpacing="-0.04em"
      >
        <text x="200" y="146" fontSize="104">24/7</text>
      </g>
      <line
        x1="208"
        y1="160"
        x2="232"
        y2="78"
        stroke={FC.blue}
        strokeWidth="6"
        strokeLinecap="round"
      />

      <line
        x1="120"
        y1="174"
        x2="280"
        y2="174"
        stroke={FC.indigo}
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="9"
        letterSpacing="2.4"
        fill={FC.indigo}
        textAnchor="middle"
      >
        <text x="200" y="194">PASS ROUSSEAU · ILLIMITÉ</text>
      </g>
    </FFrame>
  );
};

// MOTO · A2 with helmet
const ArtMoto = ({ title }: { title: string }) => {
  const ids: DefIds = {
    bg: useId("bg"),
    dots: useId("dots"),
    diffuse: useId("df"),
    softblur: useId("sb"),
  };
  return (
    <FFrame title={title}>
      <FDefs ids={ids} haloX={34} haloY={55} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="10"
        letterSpacing="2.6"
        fill={FC.ind60}
      >
        <text x="24" y="36">CATÉGORIES · A1 · A2 · 125</text>
      </g>

      <ellipse
        cx="200"
        cy="178"
        rx="120"
        ry="16"
        fill={FC.indigo}
        fillOpacity="0.30"
        filter={`url(#${ids.diffuse})`}
      />

      <g>
        <path
          d="M 120 156 C 120 95, 160 60, 200 60 C 240 60, 280 95, 280 156 L 280 168 L 120 168 Z"
          fill={FC.indigo}
          stroke={FC.paper}
          strokeWidth="3"
          paintOrder="stroke"
        />
        <path
          d="M 140 132 C 140 105, 168 90, 200 90 C 232 90, 260 105, 260 132 L 260 142 L 140 142 Z"
          fill={FC.paper}
          fillOpacity="0.92"
        />
        <path
          d="M 140 132 C 140 105, 168 90, 200 90 C 232 90, 260 105, 260 132"
          fill="none"
          stroke={FC.indigo}
          strokeOpacity="0.18"
          strokeWidth="2"
        />
        <line
          x1="138"
          y1="158"
          x2="262"
          y2="158"
          stroke={FC.paper}
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </g>

      <text
        x="200"
        y="135"
        fontFamily="'Outfit', sans-serif"
        fontWeight="900"
        fontSize="42"
        letterSpacing="-0.03em"
        textAnchor="middle"
        fill={FC.deep}
      >
        A2
      </text>
      <circle cx="226" cy="143" r="3" fill={FC.blue} />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="9"
        letterSpacing="2.4"
        fill={FC.indigo}
        textAnchor="middle"
      >
        <text x="200" y="200">PLATEAU + CIRCULATION + CODE MOTO</text>
      </g>
    </FFrame>
  );
};

// STAGE · 7 days
const ArtStage = ({ title }: { title: string }) => {
  const ids: DefIds = {
    bg: useId("bg"),
    dots: useId("dots"),
    diffuse: useId("df"),
    softblur: useId("sb"),
  };
  return (
    <FFrame title={title}>
      <FDefs ids={ids} haloX={28} haloY={45} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="10"
        letterSpacing="2.6"
        fill={FC.ind60}
      >
        <text x="24" y="36">STAGE · 5 À 7 JOURS</text>
      </g>

      <ellipse
        cx="115"
        cy="160"
        rx="58"
        ry="14"
        fill={FC.indigo}
        fillOpacity="0.30"
        filter={`url(#${ids.diffuse})`}
      />

      <text
        x="68"
        y="158"
        fontFamily="'Outfit', sans-serif"
        fontWeight="900"
        fontSize="156"
        letterSpacing="-0.05em"
        fill={FC.indigo}
        stroke={FC.paper}
        strokeWidth="3"
        paintOrder="stroke"
      >
        7
      </text>

      <g transform="translate(190, 96)">
        <text
          x="0"
          y="-10"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          letterSpacing="2.4"
          fill={FC.ind60}
        >
          LUN — DIM
        </text>
        {Array.from({ length: 7 }).map((_, i) => {
          const x = i * 26;
          const isLast = i === 6;
          return (
            <g key={i} transform={`translate(${x}, 0)`}>
              <rect
                width="22"
                height="36"
                rx="3"
                fill={isLast ? FC.blue : FC.paper}
                stroke={isLast ? FC.blue : FC.rule}
                strokeWidth="1"
                fillOpacity={isLast ? 0.16 : 1}
              />
              <rect
                width="22"
                height="10"
                rx="3"
                fill={isLast ? FC.blue : FC.indigo}
                fillOpacity={isLast ? 0.6 : 1}
              />
              <rect
                y="6"
                width="22"
                height="4"
                fill={isLast ? FC.blue : FC.indigo}
                fillOpacity={isLast ? 0.6 : 1}
              />
              <text
                x="11"
                y="28"
                fontFamily="'Outfit', sans-serif"
                fontWeight="800"
                fontSize="11"
                textAnchor="middle"
                fill={isLast ? FC.deep : FC.indigo}
              >
                {i + 1}
              </text>
              {!isLast && (
                <path
                  d="M 6 32 L 10 35 L 17 30"
                  stroke={FC.indigo}
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              )}
              {isLast && (
                <text
                  x="11"
                  y="50"
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                  fontWeight="700"
                  fontSize="7"
                  letterSpacing="1.6"
                  fill={FC.blue}
                  textAnchor="middle"
                >
                  EXAM
                </text>
              )}
            </g>
          );
        })}
      </g>

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="9"
        letterSpacing="2.4"
        fill={FC.indigo}
      >
        <text x="24" y="198">20 H · PRIX VERROUILLÉ · 0 SUPPLÉMENT</text>
      </g>
    </FFrame>
  );
};

// REPRISE · 1H + 0€ stamp
const ArtReprise = ({ title }: { title: string }) => {
  const ids: DefIds = {
    bg: useId("bg"),
    dots: useId("dots"),
    diffuse: useId("df"),
    softblur: useId("sb"),
  };
  return (
    <FFrame title={title}>
      <FDefs ids={ids} haloX={32} haloY={50} />
      <rect width="400" height="225" fill={`url(#${ids.bg})`} />
      <rect width="400" height="225" fill={`url(#${ids.dots})`} />

      <g
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="10"
        letterSpacing="2.6"
        fill={FC.ind60}
      >
        <text x="24" y="36">ÉVALUATION · 1 RDV</text>
      </g>

      <ellipse
        cx="160"
        cy="172"
        rx="80"
        ry="14"
        fill={FC.indigo}
        fillOpacity="0.30"
        filter={`url(#${ids.diffuse})`}
      />

      <g
        fontFamily="'Outfit', sans-serif"
        fontWeight="900"
        fill={FC.indigo}
        letterSpacing="-0.05em"
        stroke={FC.paper}
        strokeWidth="3"
        paintOrder="stroke"
      >
        <text x="60" y="168" fontSize="140">1</text>
        <text x="138" y="168" fontSize="80">H</text>
      </g>

      <text
        x="98"
        y="198"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="9"
        letterSpacing="2.4"
        fill={FC.ind60}
        textAnchor="middle"
      >
        AU VOLANT
      </text>

      <g transform="translate(282, 92) rotate(-12)">
        <circle r="58" fill="none" stroke={FC.blue} strokeWidth="3" />
        <circle
          r="50"
          fill="none"
          stroke={FC.blue}
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.55"
        />
        <text
          x="0"
          y="14"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="-0.05em"
          fill={FC.deep}
          textAnchor="middle"
        >
          0€
        </text>
        <text
          x="0"
          y="36"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="7"
          letterSpacing="1.8"
          fill={FC.blue}
          textAnchor="middle"
        >
          SANS ENGAGEMENT
        </text>
      </g>

      <FConnector x1={200} y1={120} x2={240} y2={100} />
    </FFrame>
  );
};

// ── Motion variants ───────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0 } },
};

const itemVariants = {
  hidden: {},
  visible: {},
};

// ──────────────────────────────────────────────────────────
const HomeGroupeSection = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="formations-heading"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28"
    >
      {/* top hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(44,40,118,0.16) 35%, rgba(44,40,118,0.16) 65%, transparent 100%)",
        }}
      />
      <motion.div
        className="relative mx-auto max-w-[1280px]"
      >
        {/* ─── Header ─── */}
        <motion.header
          variants={itemVariants}
          className="mb-10 grid items-end gap-6 md:mb-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-14"
        >
          <div>
            <h2
              id="formations-heading"
              className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[60px]"
              style={{
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-0.028em",
                color: FC.deep,
              }}
            >
              On enseigne ce qu'on sait{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #2c2876 0%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  paddingRight: "0.06em",
                }}
              >
                enseigner — bien
              </span>
              .
            </h2>
          </div>
          <div className="pb-1 md:pb-2">
            <p
              className="text-pretty text-[15px] md:text-[17px]"
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.55,
                color: "#334155",
                fontWeight: 500,
                maxWidth: 460,
              }}
            >
              Six formations, six promesses écrites.{" "}
              <strong style={{ color: FC.deep, fontWeight: 700 }}>
                Prix affichés
              </strong>
              , aucune surprise sur la facture.
            </p>
          </div>
        </motion.header>

        {/* ─── Bento grid ─── */}
        <motion.div
          aria-label="Formations Smoni"
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-6 lg:grid-cols-12"
          style={{ gridAutoRows: "minmax(0, auto)" }}
        >
          {/* HERO · Permis B — 8×2 */}
          <motion.article
            variants={itemVariants}
            onClick={() => handleNavigate("/conduite")}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="cursor-pointer sm:col-span-6 lg:col-span-8 lg:row-span-2"
            style={cardBase}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "16 / 9", background: FC.bgArt, flexShrink: 0 }}
            >
              <ArtHero title="Permis B (boîte manuelle) — permis B 94300" />
            </div>
            <div
              className="flex flex-col"
              style={{
                padding: "30px 36px 32px",
                borderTop: "1px solid #eef0f7",
                background: "#fafafd",
              }}
            >
              <MonoLabel>Formation · 01 · Permis B</MonoLabel>
              <h3
                className="text-balance text-2xl md:text-[32px] lg:text-[36px]"
                style={{
                  margin: "10px 0 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  lineHeight: 1.04,
                  letterSpacing: "-0.028em",
                  color: FC.deep,
                }}
              >
                Permis B{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #2c2876 0%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  boîte manuelle
                </span>
                .
              </h3>
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: FC.indigo,
                  borderRadius: 1,
                  marginTop: 16,
                  marginBottom: 16,
                  opacity: 0.85,
                }}
              />
              <p
                className="text-pretty"
                style={{
                  margin: 0,
                  maxWidth: 560,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: FC.ink60,
                }}
              >
                <strong style={{ color: FC.deep, fontWeight: 700 }}>
                  20 à 30 h de conduite réelle
                </strong>
                , code de la route inclus avec Pass Rousseau 24/7. Pas en
                option payante.
              </p>
              <Cta>Voir le forfait</Cta>
            </div>
          </motion.article>

          {/* STAT · B78 75% — dark indigo, 4×1 (row 1) */}
          <motion.article
            variants={itemVariants}
            onClick={() => handleNavigate("/passerelle")}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative cursor-pointer sm:col-span-3 lg:col-span-4"
            style={{
              ...cardBase,
              background: FC.deep,
              border: "1px solid #2c2876",
              color: FC.paper,
              padding: "26px 28px",
              justifyContent: "space-between",
            }}
            aria-label="B78 boîte auto — passerelle — permis accéléré Vincennes"
          >
            {/* halftone */}
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
            {/* glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-15%",
                top: "-30%",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(90,78,184,0.45) 0%, rgba(28,25,90,0) 65%)",
                filter: "blur(6px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginTop: 14,
              }}
            >
              <span
                className="text-[64px] sm:text-[76px] lg:text-[96px]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  lineHeight: 0.86,
                  letterSpacing: "-0.045em",
                  color: FC.paper,
                }}
              >
                75
              </span>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 36,
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                %
              </span>
            </div>

            <p
              className="text-pretty"
              style={{
                position: "relative",
                margin: "10px 0 0",
                maxWidth: 320,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 13.5,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              de réussite nationale en{" "}
              <strong style={{ color: FC.paper, fontWeight: 700 }}>
                boîte auto (B78)
              </strong>{" "}
              vs 57 % en manuelle. 13 à 20 h suffisent.
            </p>

            <div
              style={{
                position: "relative",
                marginTop: 18,
                paddingTop: 14,
                borderTop: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <MonoLabel tone="dark">Passerelle 7 h possible</MonoLabel>
              <Cta tone="dark">Voir B78</Cta>
            </div>
          </motion.article>

          {/* CODE · 24/7 — 4×1 (row 2) */}
          <motion.article
            variants={itemVariants}
            onClick={() => handleNavigate("/code-en-ligne")}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="cursor-pointer sm:col-span-3 lg:col-span-4"
            style={cardBase}
            aria-label="Code de la route — Pass Rousseau"
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "16 / 9", background: FC.bgArt, flexShrink: 0 }}
            >
              <ArtCode title="Code de la route — Pass Rousseau" />
            </div>
            <div
              className="flex flex-1 flex-col"
              style={{ padding: "20px 22px 22px" }}
            >
              <MonoLabel>Formation · 04 · Code</MonoLabel>
              <h3
                className="text-balance"
                style={{
                  margin: "6px 0 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 19,
                  lineHeight: 1.18,
                  letterSpacing: "-0.018em",
                  color: FC.deep,
                }}
              >
                Code de la route — en ligne 24/7
              </h3>
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: FC.indigo,
                  borderRadius: 1,
                  marginTop: 10,
                  marginBottom: 10,
                  opacity: 0.85,
                }}
              />
              <p
                className="text-pretty"
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: FC.ink60,
                }}
              >
                Pass Rousseau inclus dans tous nos forfaits. Tests illimités.
                Session présentielle hebdo à l'agence si vous préférez.
              </p>
              <div style={{ marginTop: "auto" }}>
                <Cta />
              </div>
            </div>
          </motion.article>

          {/* MOTO · 03 */}
          <FormationCard
            n="03"
            badge="Sur demande"
            label="Formation · 03 · Moto"
            title="Permis Moto — A1 / A2 / 125."
            body="Plateau, circulation, code moto. Le plateau lent appris par étapes, sans panique."
            chip="SELON DISPO MONITEUR"
            uri="/conduite"
            ariaLabel="Permis Moto — auto-école Val-de-Marne"
            Art={ArtMoto}
            onNavigate={handleNavigate}
          />
          {/* STAGE · 05 */}
          <FormationCard
            n="05"
            badge="Express"
            label="Formation · 05 · Stage"
            title="Stage accéléré — 1 semaine."
            body="20 h de conduite sur 5–7 jours. Prix verrouillé, 0 supplément. Pour qui veut le permis vite."
            chip="PRIX VERROUILLÉ"
            uri="/conduite"
            ariaLabel="Stage accéléré 1 semaine — près de Saint-Mandé"
            Art={ArtStage}
            onNavigate={handleNavigate}
          />
          {/* REPRISE · 06 */}
          <FormationCard
            n="06"
            badge="Sans pénalité"
            label="Formation · 06 · Reprise"
            title="Reprise pour recalés."
            body="Évaluation gratuite (1 h), plan personnalisé, pas de pack 13 h imposé. Sans frais de transfert."
            chip="0 € · SANS ENGAGEMENT"
            uri="/contact"
            ariaLabel="Reprise pour recalés — moniteurs certifiés BEPECASER"
            Art={ArtReprise}
            onNavigate={handleNavigate}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ── Formation card (bottom-row · 4×1) ─────────────────────
const FormationCard = ({
  n,
  badge,
  label,
  title,
  body,
  chip,
  uri,
  ariaLabel,
  Art,
  onNavigate,
}: {
  n: string;
  badge: string;
  label: string;
  title: string;
  body: string;
  chip?: string;
  uri: string;
  ariaLabel: string;
  Art: React.FC<{ title: string }>;
  onNavigate: (uri: string) => void;
}) => (
  <motion.article
    variants={itemVariants}
    onClick={() => onNavigate(uri)}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className="cursor-pointer sm:col-span-3 lg:col-span-4"
    style={cardBase}
    aria-label={ariaLabel}
  >
    <div
      className="relative w-full"
      style={{ aspectRatio: "16 / 9", background: FC.bgArt, flexShrink: 0 }}
    >
      <Art title={ariaLabel} />
    </div>
    <div
      className="flex flex-1 flex-col"
      style={{ padding: "22px 24px 24px" }}
    >
      <MonoLabel>{label}</MonoLabel>
      <h3
        className="text-balance"
        style={{
          margin: "8px 0 0",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 20,
          lineHeight: 1.18,
          letterSpacing: "-0.018em",
          color: FC.deep,
        }}
      >
        {title}
      </h3>
      <div
        style={{
          width: 28,
          height: 2,
          background: FC.indigo,
          borderRadius: 1,
          marginTop: 12,
          marginBottom: 12,
          opacity: 0.85,
        }}
      />
      <p
        className="text-pretty"
        style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 13.5,
          lineHeight: 1.55,
          color: FC.ink60,
        }}
      >
        {body}
      </p>
      {chip && (
        <div
          style={{
            marginTop: 14,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: FC.ink60,
          }}
        >
          {chip}
        </div>
      )}
      <div style={{ marginTop: "auto" }}>
        <Cta />
      </div>
    </div>
  </motion.article>
);

export default HomeGroupeSection;
