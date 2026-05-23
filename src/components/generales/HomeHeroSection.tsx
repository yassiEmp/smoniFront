import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useId } from "react";
import { useNavigate } from "react-router";

const avatars = [
  "/avatars/apprenant-1.jpg",
  "/avatars/apprenant-2.jpg",
  "/avatars/apprenant-3.jpg",
  "/avatars/apprenant-4.jpg",
];

const INDIGO = "#2c2876";
const INDIGO_DEEP = "#1e1b4b";
const INDIGO_60 = "#7472b0";
const INDIGO_20 = "#cfceea";
const PAPER = "#ffffff";
const PAPER_RULE = "#e6e3f5";
const BLUE = "#3b82f6";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const ContractIllustration = () => {
  const rid = useId().replace(/:/g, "");
  const softId = `${rid}-soft`;
  return (
    <svg
      viewBox="0 0 720 700"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Contrat Smoni signé — le permis sans stress"
    >
      <defs>
        <filter id={softId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* back paper (slightly faded, behind) */}
      <g transform="rotate(-6 280 380)">
        <rect x="80" y="120" width="380" height="500" fill="#fff" stroke={PAPER_RULE} strokeWidth="1.5" />
        <rect x="80" y="120" width="380" height="40" fill={INDIGO_20} opacity="0.4" />
      </g>

      {/* shadow behind primary doc */}
      <g transform="rotate(4 380 360)" opacity="0.18">
        <rect x="170" y="120" width="420" height="540" fill={INDIGO_DEEP} filter={`url(#${softId})`} />
      </g>

      {/* primary document */}
      <g transform="rotate(4 380 360)">
        <rect x="170" y="120" width="420" height="540" fill={PAPER} stroke={PAPER_RULE} strokeWidth="1.5" />
        <rect x="170" y="120" width="420" height="56" fill={INDIGO} />
        <circle cx="200" cy="148" r="8" fill={BLUE} />
        <text x="220" y="153" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="1.5">
          SMONI · CONTRAT 2024
        </text>

        <text x="200" y="220" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="800" fill={INDIGO_60} letterSpacing="1">
          ARTICLE 1 — ENGAGEMENT
        </text>

        <text x="200" y="262" fontFamily="Outfit, sans-serif" fontSize="32" fontWeight="900" fill={INDIGO} letterSpacing="-0.02em">
          Le permis
        </text>
        <text x="200" y="296" fontFamily="Outfit, sans-serif" fontSize="32" fontWeight="900" fontStyle="italic" fill={INDIGO} letterSpacing="-0.02em">
          sans stress.
        </text>

        <rect x="196" y="320" width="320" height="22" fill={BLUE} opacity="0.1" />
        <text x="200" y="336" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill={INDIGO} letterSpacing="1">
          1 heure = 60 minutes au volant.
        </text>
        <line x1="200" y1="342" x2="402" y2="342" stroke={BLUE} strokeWidth="2" />

        {[368, 386, 404, 422, 440].map((y, i) => (
          <rect key={i} x="200" y={y} width={i === 4 ? 240 : 360} height="3" fill={PAPER_RULE} />
        ))}

        {["Prix tout-compris.", "Aucun cri.", "Recalés bienvenus."].map((t, i) => (
          <g key={i} transform={`translate(200 ${480 + i * 28})`}>
            <rect x="0" y="0" width="14" height="14" rx="2" fill="none" stroke={INDIGO} strokeWidth="1.5" />
            <path d="M3 7 L7 11 L13 3" stroke={INDIGO} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="22" y="11" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="700" fill={INDIGO}>{t}</text>
          </g>
        ))}

        <line x1="200" y1="600" x2="380" y2="600" stroke={INDIGO} strokeWidth="1.5" />
        <text x="200" y="618" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" fill={INDIGO_60} letterSpacing="2">
          SIGNÉ — A. BELLO, DIRECTEUR
        </text>
        <path d="M210 595 Q 230 575, 250 595 T 290 590 Q 310 580, 330 600" stroke={INDIGO_DEEP} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>

      {/* round stamp top-right */}
      <g transform="translate(560 110) rotate(-12)">
        <circle cx="0" cy="0" r="54" fill="none" stroke={BLUE} strokeWidth="2.5" />
        <circle cx="0" cy="0" r="44" fill="none" stroke={BLUE} strokeWidth="1" />
        <text x="0" y="-8" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" fill={BLUE} letterSpacing="2">CHARTE</text>
        <text x="0" y="8" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" fill={BLUE}>SIGNÉE</text>
        <text x="0" y="22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" fill={BLUE} letterSpacing="2">2024</text>
      </g>

      {/* paperclip */}
      <g transform="translate(180 90) rotate(20)">
        <path
          d="M0 0 L0 60 Q0 80, 20 80 Q40 80, 40 60 L40 14 Q40 0, 28 0 Q16 0, 16 14 L16 60"
          fill="none"
          stroke={INDIGO_60}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* mono caption */}
      <g>
        <line x1="40" y1="670" x2="80" y2="670" stroke={INDIGO_60} strokeWidth="1.5" />
        <text x="92" y="674" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill={INDIGO_60} letterSpacing="3">
          C · DOCUMENT · PROMESSE ÉCRITE
        </text>
      </g>
    </svg>
  );
};

const HomeHeroSection = () => {
  const navigate = useNavigate();
  const dotsId = useId().replace(/:/g, "");

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] flex items-center overflow-hidden bg-[#f8fafc] pt-[44px] lg:pt-[52px] 2xl:pt-[70px] pb-6 select-none">
      {/* Ambient brand radial wash + halftone dots */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(1100px 700px at 85% 30%, #e6e3ff 0%, rgba(243,241,255,0) 70%),
            radial-gradient(900px 600px at 15% 90%, #f3f1ff 0%, rgba(248,250,252,0) 65%),
            #f8fafc
          `,
        }}
      >
        <svg width="100%" height="100%" className="absolute inset-0" style={{ mixBlendMode: "multiply" }}>
          <defs>
            <pattern id={`${dotsId}-dots`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(44,40,118,0.06)" />
            </pattern>
            <linearGradient id={`${dotsId}-fade`} x1="0" y1="0" x2="1" y2="0.5">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fff" stopOpacity="1" />
            </linearGradient>
            <mask id={`${dotsId}-mask`}>
              <rect width="100%" height="100%" fill={`url(#${dotsId}-fade)`} />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${dotsId}-dots)`} mask={`url(#${dotsId}-mask)`} />
        </svg>
      </div>

      {/* Right-side illustration — tilted contract, fades into left content */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-y-0 right-0 w-[65%] lg:w-[60%] xl:w-[58%] pointer-events-none z-0"
      >
        <div
          className="relative w-full h-full pt-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 14%, #000 32%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 14%, #000 32%)",
          }}
        >
          <ContractIllustration />
        </div>
      </div>

      <motion.div
        className="w-full px-6 lg:px-16 xl:px-32 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col">
          <div className="w-full md:max-w-[55%] lg:max-w-[52%] xl:max-w-[50%] space-y-5 2xl:space-y-8">
            <motion.div
              variants={itemVariants}
              className="text-[11px] 2xl:text-[13px] font-bold uppercase tracking-[0.32em] text-[#2c2876]/80"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Auto-école Vincennes (94300) • 4 min du RER A
            </motion.div>

            <div className="space-y-4 2xl:space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-6xl sm:text-7xl md:text-6xl lg:text-[64px] 2xl:text-[140px] font-[900] text-[#2c2876] leading-[1.05] lg:leading-[1] 2xl:leading-[0.85] tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Le permis <br />
                <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic">sans stress.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base lg:text-lg 2xl:text-2xl text-slate-500 max-w-lg leading-relaxed font-medium"
              >
                Permis B, boîte automatique et moto à Vincennes. Prix affichés, heures pleines, moniteurs qui respectent. <br />
                <span className="text-[#2c2876] font-extrabold">— Recalés bienvenus, sans heures imposées.</span>
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2 2xl:gap-6 2xl:pt-4"
            >
              <Button
                size="lg"
                onClick={() => handleNavigate("/tarifs")}
                className="select-text bg-[#2c2876] text-white hover:bg-[#1e1b4b] rounded-xl px-8 h-14 2xl:rounded-2xl 2xl:px-12 2xl:h-20 text-base 2xl:text-xl font-black shadow-[0_20px_40px_-10px_rgba(44,40,118,0.4)] transition-all hover:scale-[1.05] group border-none"
              >
                Voir nos tarifs (sans surprise)
                <ArrowRight className="ml-3 h-5 w-5 2xl:h-6 2xl:w-6 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="select-text bg-white border-2 border-slate-200 rounded-xl px-8 h-14 2xl:rounded-2xl 2xl:px-12 2xl:h-20 text-base 2xl:text-xl font-black text-[#2c2876] hover:bg-slate-50 transition-all hover:border-slate-300"
              >
                <a href="tel:+33771265119">Appeler — 07 71 26 51 19</a>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-8 pt-6 2xl:pt-8 border-t border-slate-200/60"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {avatars.map((url, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#f8fafc] bg-slate-200 overflow-hidden shadow-lg">
                      <img src={url} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-[#f8fafc] bg-[#2c2876] flex items-center justify-center text-[10px] font-black text-white shadow-lg">+1.5k</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-[#2c2876] uppercase tracking-tighter whitespace-nowrap">Adresse réelle</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">62 rue de la Jarry, 94300 Vincennes</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/70 shadow-sm transition-transform hover:scale-105">
                <div className="flex gap-px text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[#2c2876] text-base leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>SIREN déclarée</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>915 387 013</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeHeroSection;
