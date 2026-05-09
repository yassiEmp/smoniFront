import { motion, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

// Hex to RGB normalized for Sketchfab API
const hexToSrgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [Math.pow(r, 2.2), Math.pow(g, 2.2), Math.pow(b, 2.2)]; // Gamma correction for PBR
};

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80",
];

const HomeHeroSection = () => {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const brandColor = "#2c2876";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initialize Sketchfab API to change color
  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const client = new (window as any).Sketchfab('1.12.1', iframe);

    client.init('1094ee784f7d4b63a9c43efefdbacca5', {
      success: (api: any) => {
        api.start();
        api.addEventListener('viewerready', () => {
          api.getMaterialList((err: any, materials: any[]) => {
            if (err) return;
            const targetColor = hexToSrgb(brandColor);

            materials.forEach((mat) => {
              // Targeting common paint material components for this model
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
      transparent: 1,
      ui_controls: 0,
      ui_infos: 0,
      ui_watermark: 0,
      preload: 1,
      ui_loading: 0
    });
  }, []);

  const smoothX = useSpring(mousePos.x, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mousePos.y, { damping: 50, stiffness: 400 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#f8fafc] pt-24 pb-12 2xl:pt-40">
      {/* Dynamic Background */}
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
        <motion.div
          className="fixed w-[400px] h-[400px] 2xl:w-[600px] 2xl:h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(44, 40, 118, 0.1) 0%, transparent 70%)',
            left: 0, top: 0, translateX: '-50%', translateY: '-50%',
            x: mousePos.x * 20 + (typeof window !== 'undefined' ? window.innerWidth / 2 : 0),
            y: mousePos.y * 20 + (typeof window !== 'undefined' ? window.innerHeight / 2 : 0),
          }}
        />
      </div>

      <motion.div
        className="w-full px-6 lg:px-16 xl:px-32 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 2xl:gap-32">

          {/* Left Content (Elite Reference Refined) */}
          <div className="lg:w-1/2 w-full space-y-6 2xl:space-y-10">
            <div className="flex flex-col gap-3 2xl:gap-4">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center w-fit px-4 py-1.5 2xl:px-6 2xl:py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#2c2876]/10 shadow-sm"
              >
                <span className="text-[9px] 2xl:text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]">Auto-école nouvelle génération</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="text-[9px] 2xl:text-[10px] font-black uppercase tracking-[0.4em] text-[#2c2876]/30 ml-4 2xl:ml-6"
              >
                Paris • Île-de-France
              </motion.div>
            </div>

            <div className="space-y-4 2xl:space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] 2xl:text-[140px] font-[900] text-[#2c2876] leading-[1.05] lg:leading-[1] 2xl:leading-[0.85] tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                L'avenir <br />
                <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic">Conducteur.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base lg:text-lg 2xl:text-2xl text-slate-500 max-w-lg leading-relaxed font-medium"
              >
                La meilleure auto-école à Paris pour apprendre à conduire sur des véhicules 100% écologiques avec une plateforme intuitive. <br />
                <span className="text-[#2c2876] font-extrabold">— Gagnez jusqu'à 300€ offerts.</span>
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4 2xl:gap-6 2xl:pt-6"
            >
              <Button
                size="lg"
                onClick={() => handleNavigate("/tarifs")}
                className="bg-[#2c2876] text-white hover:bg-[#1e1b4b] rounded-xl px-8 h-14 2xl:rounded-2xl 2xl:px-12 2xl:h-20 text-base 2xl:text-xl font-black shadow-[0_20px_40px_-10px_rgba(44,40,118,0.4)] transition-all hover:scale-[1.05] group border-none"
              >
                S'inscrire en 2 min
                <ArrowRight className="ml-3 h-5 w-5 2xl:h-6 2xl:w-6 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavigate("/services")}
                className="bg-white border-2 border-slate-200 rounded-xl px-8 h-14 2xl:rounded-2xl 2xl:px-12 2xl:h-20 text-base 2xl:text-xl font-black text-[#2c2876] hover:bg-slate-50 transition-all hover:border-slate-300"
              >
                Découvrir nos offres
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
                  <span className="text-sm font-black text-[#2c2876] uppercase tracking-tighter whitespace-nowrap">Plus de 1500 élèves</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Nous font confiance</span>
                </div>
              </div>

              {/* Glassmorphism Rating Badge */}
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-6 py-3.5 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-105">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[#2c2876] text-lg leading-none">4.9/5</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Note Google</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (Interactive Car) */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              className="relative w-full aspect-square lg:aspect-auto lg:h-[500px] pointer-events-auto"
              style={{
                x: smoothX, y: smoothY,
                rotateX: useTransform(smoothY, [20, -20], [-5, 5]),
                rotateY: useTransform(smoothX, [-20, 20], [-5, 5]),
              }}
            >
              <div className="w-full h-full relative overflow-hidden bg-transparent">
                <iframe
                  ref={iframeRef}
                  className="absolute w-[130%] h-[130%] top-[-15%] left-[-15%] pointer-events-auto"
                  style={{ background: 'transparent' }}
                  title="Peugeot e-2008"
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src=""
                />
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default HomeHeroSection;