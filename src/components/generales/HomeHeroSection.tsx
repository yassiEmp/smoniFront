import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";

// Hex to RGB normalized for Sketchfab API
const hexToSrgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [Math.pow(r, 2.2), Math.pow(g, 2.2), Math.pow(b, 2.2)]; // Gamma correction for PBR
};

const avatars = [
  "/avatars/apprenant-1.jpg",
  "/avatars/apprenant-2.jpg",
  "/avatars/apprenant-3.jpg",
  "/avatars/apprenant-4.jpg",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const HomeHeroSection = () => {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const apiRef = useRef<any>(null);
  // Captured on viewerready: lets us orbit around the model without drifting in/out.
  const orbitRef = useRef<{ radius: number; height: number; target: number[]; baseAngle: number } | null>(null);
  const brandColor = "#2c2876";

  // Initialize Sketchfab API to change color + capture initial camera orbit
  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const client = new (window as any).Sketchfab('1.12.1', iframe);

    client.init('1094ee784f7d4b63a9c43efefdbacca5', {
      success: (api: any) => {
        api.start();
        apiRef.current = api;
        api.addEventListener('viewerready', () => {
          // Stop autospin — mouse drives rotation now.
          if (typeof api.stop === 'function') {
            // no-op; placeholder if SDK exposes it
          }
          if (typeof api.setAutospin === 'function') api.setAutospin(0);

          // Cache initial orbit (radius around target, height, starting angle).
          api.getCameraLookAt((err: any, cam: any) => {
            if (err || !cam) return;
            const [ex, ey, ez] = cam.position;
            const [tx, ty, tz] = cam.target;
            const dx = ex - tx;
            const dy = ey - ty;
            const dz = ez - tz;
            orbitRef.current = {
              radius: Math.sqrt(dx * dx + dz * dz),
              height: dy,
              target: [tx, ty, tz],
              baseAngle: Math.atan2(dz, dx),
            };
          });

          api.getMaterialList((err: any, materials: any[]) => {
            if (err) return;
            const targetColor = hexToSrgb(brandColor);
            materials.forEach((mat) => {
              const name = mat.name.toLowerCase();
              if (name.includes('body') || name.includes('paint') || name.includes('car_paint') || name.includes('shell')) {
                mat.channels.AlbedoPBR.enable = true;
                mat.channels.AlbedoPBR.color = targetColor;
                api.setMaterial(mat);
              }
            });
          });
        });
      },
      error: () => console.error('Sketchfab API Error'),
      autostart: 1,
      autospin: 0,
      transparent: 1,
      ui_controls: 0,
      ui_infos: 0,
      ui_watermark: 0,
      preload: 1,
      ui_loading: 0,
    });
  }, []);

  // Mouse-driven orbit: car rotates left/right with cursor inside the hero.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let pendingNX = 0; // normalized cursor X within section, -1..1

    const apply = () => {
      raf = 0;
      const api = apiRef.current;
      const orbit = orbitRef.current;
      if (!api || !orbit) return;
      const swing = (Math.PI / 5) * pendingNX; // ±36°
      const angle = orbit.baseAngle + swing;
      const newX = orbit.target[0] + orbit.radius * Math.cos(angle);
      const newZ = orbit.target[2] + orbit.radius * Math.sin(angle);
      const newY = orbit.target[1] + orbit.height;
      // Small duration smooths between updates without queueing a long animation.
      api.setCameraLookAt([newX, newY, newZ], orbit.target, 0.25);
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pendingNX = Math.max(-1, Math.min(1, nx));
      if (!raf) raf = requestAnimationFrame(apply);
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      section.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#f8fafc] pt-24 pb-12 2xl:pt-40 select-none"
    >
      {/* Ambient brand radial wash */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 0% 0%, rgba(44, 40, 118, 0.05) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(44, 40, 118, 0.08) 0px, transparent 50%)
            `
          }}
        />
      </div>

      {/* Hero side visual — 3D car as ambient background, bleeds off the right edge.
          Hidden on mobile (perf + readability), revealed from md+. */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-y-0 right-0 w-[65%] lg:w-[60%] xl:w-[58%] pointer-events-none z-0"
      >
        <div
          className="relative w-full h-full overflow-visible"
          style={{
            // Soft fade on the left edge so the iframe blends into the section bg
            // (Stripe/Linear-style hero visual — no hard panel boundary).
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 18%, #000 38%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 18%, #000 38%)",
          }}
        >
          <iframe
            ref={iframeRef}
            className="absolute -inset-[15%] w-[130%] h-[130%]"
            style={{ background: "transparent", pointerEvents: "auto" }}
            title="Smoni Auto-École Vincennes — apprendre à conduire sur véhicule récent"
            aria-label="Auto-école Smoni à Vincennes, 62 rue de la Jarry, 94300"
            loading="lazy"
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src=""
          />
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
          {/* Left content takes a constrained width so the car bg has room to breathe on the right */}
          <div className="w-full md:max-w-[55%] lg:max-w-[52%] xl:max-w-[50%] space-y-6 2xl:space-y-10">
            <div className="flex flex-col gap-3 2xl:gap-4">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center w-fit px-4 py-1.5 2xl:px-6 2xl:py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#2c2876]/10 shadow-sm"
              >
                <span className="text-[9px] 2xl:text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]">Auto-école à Vincennes — depuis 2022</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="text-[9px] 2xl:text-[10px] font-black uppercase tracking-[0.4em] text-[#2c2876]/30 ml-4 2xl:ml-6"
              >
                62 rue de la Jarry • 4 min du RER A
              </motion.div>
            </div>

            <div className="space-y-4 2xl:space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] 2xl:text-[140px] font-[900] text-[#2c2876] leading-[1.05] lg:leading-[1] 2xl:leading-[0.85] tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Le permis <br />
                <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic">sans crier dessus.</span>
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
              className="flex flex-wrap gap-4 pt-4 2xl:gap-6 2xl:pt-6"
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
                size="lg"
                variant="outline"
                onClick={() => handleNavigate("/contact")}
                className="select-text bg-white border-2 border-slate-200 rounded-xl px-8 h-14 2xl:rounded-2xl 2xl:px-12 2xl:h-20 text-base 2xl:text-xl font-black text-[#2c2876] hover:bg-slate-50 transition-all hover:border-slate-300"
              >
                Appeler — 07 71 26 51 19
              </Button>
            </motion.div>

            {/* Trust Bar (Google Badge Integration) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-10 pt-12 border-t border-slate-200/60"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {avatars.map((url, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#f8fafc] bg-slate-200 overflow-hidden shadow-lg">
                      <img src={url} alt={`Apprenant ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-[#f8fafc] bg-[#2c2876] flex items-center justify-center text-[10px] font-black text-white shadow-lg">+1.5k</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-[#2c2876] uppercase tracking-tighter whitespace-nowrap">Adresse réelle</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">62 rue de la Jarry, 94300 Vincennes</span>
                </div>
              </div>

              {/* Glassmorphism Trust Badge */}
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-6 py-3.5 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-105">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[#2c2876] text-lg leading-none">SIREN</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">915 387 013 — déclarée</span>
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