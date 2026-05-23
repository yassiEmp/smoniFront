import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

type DocItem = {
  n: string;
  title: string;
  meta: string;
  help: string;
  required: boolean;
  condition: string | null;
  Icon: () => JSX.Element;
};

const INDIGO = "#2c2876";
const INDIGO_DEEP = "#1e1b4b";
const INDIGO_20 = "#cfceea";
const INDIGO_10 = "#e6e3f5";
const BLUE = "#3b82f6";
const PAPER = "#ffffff";
const BG_TINT = "#f3f1ff";
const RULE = "#e6e3f5";

/* ---------- mini icons (light-theme indigo pictograms) ---------- */

const MFrame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 56 56" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    {children}
  </svg>
);

const MIdentity = () => (
  <MFrame>
    <ellipse cx="28" cy="48" rx="18" ry="3" fill={INDIGO} opacity="0.18" />
    <rect x="6" y="14" width="44" height="30" rx="3" fill={INDIGO} stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
    <rect x="6" y="14" width="44" height="6" rx="3" fill={INDIGO_DEEP} />
    <rect x="6" y="17" width="44" height="3" fill={INDIGO_DEEP} />
    <rect x="11" y="24" width="12" height="15" rx="1" fill={PAPER} opacity="0.92" />
    <circle cx="17" cy="29" r="2.4" fill={INDIGO} />
    <path d="M 12.5 39 Q 17 33 21.5 39 Z" fill={INDIGO} />
    <rect x="27" y="26" width="18" height="2" rx="1" fill={PAPER} opacity="0.7" />
    <rect x="27" y="30" width="14" height="2" rx="1" fill={PAPER} opacity="0.55" />
    <rect x="27" y="34" width="16" height="2" rx="1" fill={PAPER} opacity="0.55" />
    <rect x="27" y="38" width="12" height="2" rx="1" fill={PAPER} opacity="0.45" />
  </MFrame>
);

const MDomicile = () => (
  <MFrame>
    <ellipse cx="28" cy="48" rx="18" ry="3" fill={INDIGO} opacity="0.18" />
    <rect x="14" y="14" width="28" height="34" rx="2" fill={PAPER} stroke={INDIGO} strokeWidth="2" />
    <path d="M 14 22 L 28 11 L 42 22 Z" fill={INDIGO} stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
    <rect x="25" y="18" width="6" height="6" rx="1" fill={INDIGO_DEEP} />
    <rect x="18" y="28" width="20" height="2" rx="1" fill={INDIGO} opacity="0.85" />
    <rect x="18" y="32" width="16" height="2" rx="1" fill={INDIGO} opacity="0.55" />
    <rect x="18" y="36" width="18" height="2" rx="1" fill={INDIGO} opacity="0.55" />
    <rect x="18" y="40" width="12" height="2" rx="1" fill={INDIGO} opacity="0.4" />
  </MFrame>
);

const MPhoto = () => (
  <MFrame>
    <ellipse cx="28" cy="48" rx="18" ry="3" fill={INDIGO} opacity="0.18" />
    <rect x="12" y="8" width="32" height="38" rx="2" fill={INDIGO} stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
    <rect x="16" y="12" width="24" height="26" rx="1" fill={PAPER} opacity="0.92" />
    <circle cx="28" cy="22" r="5" fill={INDIGO} />
    <path d="M 18 38 Q 28 28 38 38 L 18 38 Z" fill={INDIGO} />
    <rect x="16" y="40" width="24" height="3" rx="0.8" fill={PAPER} opacity="0.5" />
  </MFrame>
);

const MJDC = () => (
  <MFrame>
    <ellipse cx="28" cy="48" rx="18" ry="3" fill={INDIGO} opacity="0.18" />
    <rect x="13" y="9" width="30" height="36" rx="2" fill={PAPER} stroke={INDIGO} strokeWidth="2" />
    <rect x="13" y="9" width="30" height="7" rx="2" fill={INDIGO} />
    <rect x="13" y="12" width="30" height="4" fill={INDIGO} />
    <rect x="17" y="20" width="18" height="2" rx="1" fill={INDIGO} opacity="0.85" />
    <rect x="17" y="24" width="22" height="1.6" rx="0.8" fill={INDIGO} opacity="0.4" />
    <rect x="17" y="27" width="16" height="1.6" rx="0.8" fill={INDIGO} opacity="0.4" />
    <circle cx="36" cy="38" r="5.5" fill={INDIGO} />
    <circle cx="36" cy="38" r="3" fill={PAPER} opacity="0.95" />
    <circle cx="36" cy="38" r="1.4" fill={INDIGO} />
    <path d="M 17 38 Q 21 35 25 38 T 30 38" fill="none" stroke={INDIGO} strokeWidth="1.2" strokeLinecap="round" />
  </MFrame>
);

const MTuteur = () => (
  <MFrame>
    <ellipse cx="28" cy="48" rx="18" ry="3" fill={INDIGO} opacity="0.18" />
    <circle cx="20" cy="18" r="5.5" fill={INDIGO} stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
    <path d="M 8 44 Q 8 28 20 28 Q 32 28 32 44 Z" fill={INDIGO} stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
    <circle cx="36" cy="24" r="4" fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
    <path d="M 27 44 Q 27 32 36 32 Q 45 32 45 44 Z" fill={INDIGO_DEEP} stroke={PAPER} strokeWidth="2" style={{ paintOrder: "stroke" }} />
  </MFrame>
);

/* ---------- hero illustration (dossier + 5 fanned papers + stamp) ---------- */

const NHero = () => (
  <svg
    viewBox="0 0 520 460"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    <defs>
      <radialGradient id="nhBg" cx="42%" cy="48%" r="78%">
        <stop offset="0%" stopColor="#e6e3ff" />
        <stop offset="55%" stopColor={BG_TINT} />
        <stop offset="100%" stopColor="#f8fafc" />
      </radialGradient>
      <pattern id="nhDots" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="0.55" fill={INDIGO} fillOpacity="0.06" />
      </pattern>
      <filter id="nhBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>

    <rect width="520" height="460" fill="url(#nhBg)" />
    <rect width="520" height="460" fill="url(#nhDots)" />
    <line x1="40" y1="392" x2="480" y2="392" stroke={INDIGO_20} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.7" />

    {/* fanned papers behind the dossier */}
    <g transform="rotate(-14 200 230)">
      <rect x="64" y="106" width="158" height="208" rx="3" fill={INDIGO_DEEP} opacity="0.16" filter="url(#nhBlur)" />
      <rect x="60" y="100" width="158" height="208" rx="3" fill={PAPER} stroke={RULE} strokeWidth="1" />
      <rect x="60" y="100" width="158" height="14" fill={INDIGO_DEEP} />
      {[130, 144, 158, 172, 186, 200, 220, 234, 248].map((y, i) => (
        <rect key={i} x="72" y={y} width={i % 2 === 0 ? 110 : 86} height="3" rx="1.5" fill={INDIGO_20} opacity={0.55} />
      ))}
    </g>

    <g transform="rotate(-7 220 240)">
      <rect x="124" y="98" width="158" height="216" rx="3" fill={INDIGO} opacity="0.14" filter="url(#nhBlur)" />
      <rect x="120" y="92" width="158" height="216" rx="3" fill={PAPER} stroke={RULE} strokeWidth="1" />
      <rect x="120" y="92" width="158" height="14" fill={INDIGO} />
      {[124, 142, 160, 178, 196, 214, 232, 250, 268].map((y, i) => (
        <rect key={i} x="132" y={y} width={i % 2 === 0 ? 122 : 92} height="3" rx="1.5" fill={INDIGO_20} opacity={0.55} />
      ))}
    </g>

    <g transform="rotate(6 260 250)">
      <rect x="184" y="96" width="158" height="220" rx="3" fill={INDIGO} opacity="0.14" filter="url(#nhBlur)" />
      <rect x="180" y="90" width="158" height="220" rx="3" fill={PAPER} stroke={RULE} strokeWidth="1" />
      <rect x="180" y="90" width="158" height="14" fill={INDIGO} />
      {[120, 138, 156, 174, 192, 210, 228, 246, 264].map((y, i) => (
        <rect key={i} x="192" y={y} width={i % 2 === 0 ? 128 : 96} height="3" rx="1.5" fill={INDIGO_20} opacity={0.55} />
      ))}
    </g>

    <g transform="rotate(13 290 245)">
      <rect x="244" y="106" width="158" height="208" rx="3" fill={INDIGO_DEEP} opacity="0.16" filter="url(#nhBlur)" />
      <rect x="240" y="100" width="158" height="208" rx="3" fill={PAPER} stroke={RULE} strokeWidth="1" />
      <rect x="240" y="100" width="158" height="14" fill={INDIGO_DEEP} />
      {[130, 144, 158, 172, 186, 200, 220, 234, 248].map((y, i) => (
        <rect key={i} x="252" y={y} width={i % 2 === 0 ? 110 : 86} height="3" rx="1.5" fill={INDIGO_20} opacity={0.55} />
      ))}
    </g>

    {/* dossier folder (front) */}
    <g>
      <rect x="120" y="180" width="280" height="200" rx="6" fill={INDIGO_DEEP} opacity="0.18" filter="url(#nhBlur)" />
      <rect x="118" y="170" width="284" height="206" rx="8" fill={INDIGO} />
      {/* tab */}
      <rect x="148" y="160" width="120" height="20" rx="4" fill={INDIGO_DEEP} />
      {/* paper peeking out of the dossier — top paper with stamp */}
      <rect x="148" y="190" width="224" height="160" rx="4" fill={PAPER} stroke={INDIGO_20} strokeWidth="1" />
      {/* paper header band */}
      <rect x="148" y="190" width="224" height="22" rx="4" fill={BG_TINT} />
      <rect x="160" y="199" width="80" height="5" rx="2" fill={INDIGO} opacity="0.7" />
      {/* paper body lines */}
      {[224, 240, 256, 272, 288, 304, 320, 336].map((y, i) => (
        <rect key={i} x="162" y={y} width={i % 3 === 0 ? 200 : i % 3 === 1 ? 160 : 184} height="4" rx="2" fill={INDIGO_20} opacity={0.7} />
      ))}
      {/* "DOSSIER COMPLET" stamp */}
      <g transform="rotate(-9 300 270)">
        <rect x="220" y="240" width="170" height="60" rx="6" fill="none" stroke={BLUE} strokeWidth="3" />
        <text
          x="305"
          y="266"
          textAnchor="middle"
          fill={BLUE}
          fontFamily="ui-monospace, monospace"
          fontWeight="800"
          fontSize="16"
          letterSpacing="0.18em"
        >
          DOSSIER
        </text>
        <text
          x="305"
          y="288"
          textAnchor="middle"
          fill={BLUE}
          fontFamily="ui-monospace, monospace"
          fontWeight="800"
          fontSize="16"
          letterSpacing="0.18em"
        >
          COMPLET
        </text>
      </g>
      {/* dossier front lip */}
      <path d="M 118 280 L 402 280 L 402 376 L 118 376 Z" fill={INDIGO_DEEP} opacity="0.92" />
      <rect x="118" y="278" width="284" height="4" fill={INDIGO_DEEP} opacity="0.4" />
    </g>
  </svg>
);

/* ---------- data ---------- */

const DOCS: DocItem[] = [
  { n: "01", title: "Pièce d'identité", meta: "CNI · passeport · titre de séjour", help: "Comment l'obtenir", Icon: MIdentity, required: true, condition: null },
  { n: "02", title: "Justificatif de domicile", meta: "Facture, quittance, avis d'imposition", help: "Liste des justificatifs acceptés", Icon: MDomicile, required: true, condition: "Moins de 6 mois" },
  { n: "03", title: "Photo d'identité", meta: "Papier 35×45 mm ou ePhoto numérique", help: "Où la faire, normes ANTS", Icon: MPhoto, required: true, condition: null },
  { n: "04", title: "Attestation JDC", meta: "Journée Défense et Citoyenneté", help: "Récupérer sur majdc.fr", Icon: MJDC, required: false, condition: "Si vous avez 17 – 25 ans" },
  { n: "05", title: "Pièce du représentant légal", meta: "Pièce d'identité du parent / tuteur", help: "+ autorisation parentale signée", Icon: MTuteur, required: false, condition: "Si vous êtes mineur·e" },
];

const STORAGE_KEY = "smoni.dossier.checked";
const REQUIRED_COUNT = DOCS.filter((d) => d.required).length;

const useChecked = (): [Set<string>, (n: string) => void] => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setChecked(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* noop */
    }
  }, []);

  const toggle = (n: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* noop */
      }
      return next;
    });
  };

  return [checked, toggle];
};

/* ---------- list group ---------- */

type ListGroupProps = {
  label: string;
  count: string;
  docs: DocItem[];
  checked: Set<string>;
  toggle: (n: string) => void;
  variant?: "cond";
};

const ListGroup = ({ label, count, docs, checked, toggle, variant }: ListGroupProps) => (
  <section className="mt-1.5 first:mt-0">
    <header className="flex items-baseline justify-between gap-3 px-1 pb-2 mb-1 border-b border-dashed" style={{ borderColor: INDIGO_20 }}>
      <span
        className="font-mono font-bold uppercase"
        style={{
          fontSize: "10.5px",
          letterSpacing: "0.22em",
          color: variant === "cond" ? "#7472b0" : INDIGO,
        }}
      >
        {label}
      </span>
      <span
        className="font-mono font-semibold uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7472b0" }}
      >
        {count}
      </span>
    </header>
    <ol className="list-none m-0 p-0 flex flex-col">
      {docs.map((d) => {
        const Icon = d.Icon;
        const isOn = checked.has(d.n);
        return (
          <li key={d.n} className="relative border-b last:border-b-0 group" style={{ borderColor: "#f1f1f7" }}>
            <button
              type="button"
              onClick={() => toggle(d.n)}
              aria-pressed={isOn}
              className="w-full grid items-center gap-3 sm:gap-3.5 px-1 py-3 sm:px-2 sm:py-3.5 rounded-[10px] cursor-pointer transition-colors hover:bg-[#f3f1ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              style={{ gridTemplateColumns: "22px 44px 1fr 26px" }}
            >
              <span
                className="font-mono font-bold text-center"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  color: isOn ? BLUE : "#7472b0",
                }}
              >
                {d.n}
              </span>
              <span
                className="flex items-center justify-center rounded-xl p-1 transition-colors"
                style={{
                  width: 44,
                  height: 44,
                  background: isOn ? "rgba(59,130,246,0.1)" : BG_TINT,
                  border: `1px solid ${isOn ? "rgba(59,130,246,0.28)" : INDIGO_10}`,
                }}
                aria-hidden="true"
              >
                <Icon />
              </span>
              <span className="flex flex-col gap-[3px] min-w-0 text-left">
                <span className="flex items-baseline gap-2.5 flex-wrap">
                  <span
                    className="font-bold tracking-tight"
                    style={{ fontSize: "15px", lineHeight: 1.18, color: isOn ? INDIGO : "#0f172a" }}
                  >
                    {d.title}
                  </span>
                  {d.condition && (
                    <span
                      className="font-mono font-bold uppercase whitespace-nowrap rounded-full border border-dashed bg-white px-1.5 py-0.5"
                      style={{
                        fontSize: "9.5px",
                        letterSpacing: "0.18em",
                        color: "#7472b0",
                        borderColor: INDIGO_20,
                      }}
                    >
                      {d.condition}
                    </span>
                  )}
                </span>
                <span className="font-medium leading-snug" style={{ fontSize: "12.5px", color: "#475569" }}>
                  {d.meta}
                </span>
              </span>
              <span
                className="flex items-center justify-center rounded-full transition-all"
                style={{
                  width: 26,
                  height: 26,
                  background: isOn ? BLUE : PAPER,
                  border: `1.5px solid ${isOn ? BLUE : INDIGO_20}`,
                  color: isOn ? PAPER : "transparent",
                }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 18 18" width="14" height="14">
                  <path
                    d="M 4 9.5 L 7.5 12.5 L 14 5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <a
              href="tel:+33771265119"
              className="block overflow-hidden font-mono font-bold transition-all max-h-0 group-hover:max-h-8 group-focus-within:max-h-8 group-hover:pb-3 group-focus-within:pb-3"
              style={{
                paddingLeft: 60,
                fontSize: "10.5px",
                letterSpacing: "0.14em",
                color: BLUE,
              }}
              aria-label={`Comment obtenir : ${d.title}`}
            >
              <span>→ {d.help}</span>
            </a>
          </li>
        );
      })}
    </ol>
  </section>
);

/* ---------- main section ---------- */

const HomeNewStudentSection = () => {
  const [checked, toggle] = useChecked();
  const reqDone = DOCS.filter((d) => d.required && checked.has(d.n)).length;
  const totalDone = DOCS.filter((d) => checked.has(d.n)).length;
  const pct = (reqDone / REQUIRED_COUNT) * 100;
  const complete = reqDone === REQUIRED_COUNT;

  const required = DOCS.filter((d) => d.required);
  const conditional = DOCS.filter((d) => !d.required);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: "#f8fafc" }}>
      {/* atmospheric halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          top: -120,
          left: "8%",
          width: 720,
          height: 720,
          filter: "blur(140px)",
          background: "rgba(44, 40, 118, 0.07)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          bottom: -100,
          right: "4%",
          width: 560,
          height: 560,
          filter: "blur(140px)",
          background: "rgba(59, 130, 246, 0.05)",
          zIndex: 0,
        }}
      />

      <motion.div
        className="relative z-10 mx-auto px-6 lg:px-12 xl:px-16"
        style={{ maxWidth: 1440 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* HEADER */}
        <motion.header className="max-w-[760px] mb-14 lg:mb-[72px]" variants={itemVariants}>
          <span
            className="inline-block font-mono font-bold rounded-full px-3 py-1.5 bg-white"
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: INDIGO,
              border: `1px solid ${INDIGO_20}`,
            }}
          >
            SMONI · DOSSIER · 05 PIÈCES
          </span>
          <h2
            className="mt-4 mb-3 font-black tracking-tighter"
            style={{
              fontSize: "clamp(40px, 5.4vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: INDIGO,
              textWrap: "balance",
            }}
          >
            Avant de venir, <span style={{ color: BLUE, fontStyle: "italic", fontWeight: 800 }}>préparez ça.</span>
          </h2>
          <p
            className="m-0 font-medium"
            style={{
              maxWidth: 580,
              color: "#475569",
              fontSize: 17,
              lineHeight: 1.55,
            }}
          >
            Cinq documents — rien de plus. Pas votre numéro NEPH&nbsp;? On vous accompagne pour le créer
            sur le site de l'ANTS.
          </p>
        </motion.header>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-7 lg:gap-8 items-start">
          {/* LEFT — hero card */}
          <motion.article
            className="relative overflow-hidden bg-white"
            style={{
              borderRadius: 20,
              border: "1px solid #eef2f7",
              boxShadow: "0 24px 50px -28px rgba(15, 23, 42, 0.22), 0 2px 6px -2px rgba(15, 23, 42, 0.06)",
            }}
            variants={itemVariants}
          >
            <div
              aria-hidden="true"
              style={{
                width: "100%",
                aspectRatio: "520 / 420",
                background: BG_TINT,
                overflow: "hidden",
              }}
            >
              <NHero />
            </div>
            <div
              className="relative -mt-5 bg-white p-7 lg:px-9 lg:py-9"
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
              <div
                className="inline-flex items-center gap-2 font-mono font-bold uppercase"
                style={{ fontSize: 10, letterSpacing: "0.22em", color: INDIGO }}
              >
                SMONI · INSCRIPTION
                <span style={{ opacity: 0.4 }}>·</span>
                <span style={{ color: BLUE }}>DOSSIER COMPLET</span>
              </div>
              <h3
                className="mt-3.5 mb-0 font-black tracking-tight"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: INDIGO,
                  textWrap: "balance",
                }}
              >
                Votre dossier d'inscription, <br />
                <span style={{ color: BLUE, fontStyle: "italic", fontWeight: 800 }}>simplement.</span>
              </h3>
              <span aria-hidden="true" className="block my-4" style={{ width: 32, height: 2, background: INDIGO }} />
              <p
                className="mb-6 font-medium"
                style={{ fontSize: "15.5px", lineHeight: 1.6, color: "#475569", maxWidth: "52ch" }}
              >
                Le permis démarre quand votre dossier est complet — pas avant. On vous donne la liste exacte
                pour ne rien oublier, et on vous aide à monter chaque pièce manquante. Pas de va-et-vient inutile.
              </p>

              {/* phone callout */}
              <a
                href="tel:+33771265119"
                className="grid items-center gap-3.5 no-underline text-inherit transition-colors hover:bg-[rgba(59,130,246,0.07)]"
                style={{
                  gridTemplateColumns: "auto 1fr auto",
                  padding: "16px 18px",
                  borderRadius: 14,
                  background: "linear-gradient(180deg, rgba(59,130,246,0.07), rgba(59,130,246,0.04))",
                  border: "1px solid rgba(59,130,246,0.22)",
                }}
              >
                <span
                  className="inline-flex items-center justify-center"
                  style={{ width: 36, height: 36, borderRadius: 10, background: BLUE, color: PAPER }}
                  aria-hidden="true"
                >
                  <Phone className="w-4 h-4" />
                </span>
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-semibold" style={{ fontSize: "12.5px", color: "#475569" }}>
                    Pas tous les documents&nbsp;? Appelez-nous
                  </span>
                  <span className="font-black tracking-tight" style={{ fontSize: 22, color: INDIGO }}>
                    07 71 26 51 19
                  </span>
                </span>
                <span
                  className="font-mono font-bold self-center whitespace-nowrap hidden sm:inline"
                  style={{ fontSize: 9, letterSpacing: "0.22em", color: BLUE }}
                >
                  GRATUIT · SANS RDV
                </span>
              </a>
            </div>
          </motion.article>

          {/* RIGHT — documents list */}
          <motion.aside
            className="relative bg-white"
            style={{
              borderRadius: 20,
              border: "1px solid #eef2f7",
              boxShadow: "0 24px 50px -28px rgba(15, 23, 42, 0.22), 0 2px 6px -2px rgba(15, 23, 42, 0.06)",
              padding: "26px 22px 22px",
            }}
            variants={itemVariants}
          >
            <header className="flex items-start justify-between gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <span
                  className="font-mono font-bold uppercase"
                  style={{ fontSize: "10.5px", letterSpacing: "0.22em", color: "#7472b0" }}
                >
                  VOTRE DOSSIER
                </span>
                <h3
                  className="m-0 font-extrabold tracking-tight"
                  style={{ fontSize: 22, lineHeight: 1.1, color: INDIGO }}
                >
                  Cochez au fur et à mesure
                </h3>
              </div>
              <div
                className="font-mono font-bold whitespace-nowrap transition-all"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: `1.5px dashed ${complete ? BLUE : INDIGO_20}`,
                  color: complete ? BLUE : "#7472b0",
                  background: complete ? "rgba(59,130,246,0.1)" : "transparent",
                  transform: complete ? "rotate(-3deg)" : "none",
                }}
              >
                {complete ? "DOSSIER COMPLET" : `${reqDone} / ${REQUIRED_COUNT}`}
              </div>
            </header>

            {/* progress */}
            <div
              className="mb-5"
              style={{
                padding: "14px 14px 12px",
                background: BG_TINT,
                borderRadius: 12,
                border: `1px solid ${INDIGO_10}`,
              }}
            >
              <div
                className="relative overflow-hidden rounded-full"
                style={{ height: 6, background: PAPER, border: `1px solid ${INDIGO_10}` }}
                aria-label={`${reqDone} sur ${REQUIRED_COUNT} pièces obligatoires`}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${INDIGO}, ${BLUE})`,
                    borderRadius: 999,
                    transition: "width 380ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                {required.map((d, i) => (
                  <span
                    key={d.n}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: -3,
                      left: `${((i + 1) / REQUIRED_COUNT) * 100}%`,
                      width: 2,
                      height: 12,
                      background: PAPER,
                      transform: "translateX(-1px)",
                    }}
                  />
                ))}
              </div>
              <div
                className="flex items-center gap-2 mt-2.5 font-mono font-semibold uppercase"
                style={{ fontSize: "10.5px", letterSpacing: "0.16em", color: "#7472b0" }}
              >
                <span>
                  <strong style={{ color: INDIGO, fontWeight: 700 }}>{reqDone}</strong> / {REQUIRED_COUNT} obligatoires
                </span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>
                  {totalDone - reqDone} / {DOCS.length - REQUIRED_COUNT} conditionnelles
                </span>
              </div>
            </div>

            {/* groups */}
            <ListGroup
              label="OBLIGATOIRES"
              count={`${required.length} pièces`}
              docs={required}
              checked={checked}
              toggle={toggle}
            />
            <div className="mt-4">
              <ListGroup
                label="SI APPLICABLE"
                count={`${conditional.length} pièces`}
                docs={conditional}
                checked={checked}
                toggle={toggle}
                variant="cond"
              />
            </div>

            {/* footer */}
            <footer
              className="flex items-center gap-2.5 mt-4"
              style={{ padding: "12px 14px", background: BG_TINT, borderRadius: 10 }}
            >
              <span
                aria-hidden="true"
                className="rounded-full flex-shrink-0"
                style={{ width: 6, height: 6, background: BLUE }}
              />
              <span className="font-medium" style={{ fontSize: 13, color: "#475569", lineHeight: 1.45 }}>
                Apportez les <strong style={{ color: INDIGO, fontWeight: 700 }}>originaux</strong>&nbsp;— on scanne sur place
                et on garde les copies pour votre dossier.
              </span>
            </footer>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeNewStudentSection;
