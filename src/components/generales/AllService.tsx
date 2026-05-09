import { motion, useSpring } from "framer-motion";
import { Car, BookOpen, Monitor, Shield, ArrowRightLeft, RefreshCw, ClipboardCheck, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const services = [
  {
    title: "Location de véhicule",
    description: "Réservez un véhicule double commande chez SMONI et exercez-vous en toute tranquillité.",
    icon: <Car className="w-8 h-8" />,
    uri: "/location",
    badge: "Populaire",
    color: "bg-blue-500/10 text-blue-600",
    image: "/service_location_image_1774287841678.png"
  },
  {
    title: "Conduite",
    description: "Via notre interface, réservez vos leçons de conduite avec un moniteur SMONI qualifié.",
    icon: <BookOpen className="w-8 h-8" />,
    uri: "/conduite",
    badge: "Indispensable",
    color: "bg-purple-500/10 text-purple-600",
    image: "/service_conduite_image_1774288066100.png"
  },
  {
    title: "Code en ligne",
    description: "SMONI vous met à disposition une plateforme accessible 24h/24 pour vous exercer au code.",
    icon: <Monitor className="w-8 h-8" />,
    uri: "/code-en-ligne",
    badge: "100% digital",
    color: "bg-emerald-500/10 text-emerald-600",
    image: "/service_code_image_1774288237421.png"
  },
  {
    title: "Accompagnement",
    description: "Nous vous accompagnons à votre centre d’examen avec notre véhicule loué et un accompagnateur au volant de notre véhicule.",
    icon: <Shield className="w-8 h-8" />,
    uri: "/accompagnement",
    color: "bg-orange-500/10 text-orange-600",
    image: "/service_accompagnement_image_1774288352713.png"
  },
  {
    title: "Passerelle",
    description: "Passez de la boîte automatique à la boîte manuelle avec une formation rapide chez SMONI.",
    icon: <ArrowRightLeft className="w-8 h-8" />,
    uri: "/passerelle",
    color: "bg-cyan-500/10 text-cyan-600",
    image: "/service_passerelle_image_1774287785105.png"
  },
  {
    title: "Post-Permis",
    description: "Réduisez votre période probatoire et gagnez vos 12 points plus rapidement après l'obtention de votre permis.",
    icon: <GraduationCap className="w-8 h-8" />,
    uri: "/post-permis",
    badge: "Nouveau",
    color: "bg-teal-500/10 text-teal-600",
    image: "/service_post_permis_image_1774287808051.png"
  },
  {
    title: "Renouvellement",
    description: "Prolongez votre abonnement et continuez votre formation sans aucune interruption.",
    icon: <RefreshCw className="w-8 h-8" />,
    uri: "/actualisation",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    title: "Fabrication du Permis",
    description: "Vous avez réussi votre permis ? Nous vous accompagnons pour demander sa fabrication.",
    icon: <ClipboardCheck className="w-8 h-8" />,
    uri: "/fabrication-permis",
    color: "bg-indigo-500/10 text-indigo-600",
  },
];

const AllService = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const smoothX = useSpring(mousePos.x, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mousePos.y, { damping: 50, stiffness: 400 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative pt-[120px] pb-24 overflow-hidden bg-[#f8fafc]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 0% 0%, rgba(44, 40, 118, 0.04) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(44, 40, 118, 0.06) 0px, transparent 50%)
            `
          }}
        />
        <motion.div 
          className="fixed w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(44, 40, 118, 0.15) 0%, transparent 60%)',
            left: 0, top: 0, translateX: '-50%', translateY: '-50%',
            x: typeof window !== 'undefined' ? smoothX.get() * 15 + window.innerWidth / 2 : 0,
            y: typeof window !== 'undefined' ? smoothY.get() * 15 + window.innerHeight / 2 : 0,
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Header Text */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center w-fit px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#2c2876]/10 shadow-sm mb-6"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]">Nos Services Premium</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[75px] font-[900] text-[#2c2876] leading-[1.1] lg:leading-[0.9] tracking-tighter mb-8 max-w-4xl px-2 break-words"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Conduire en sécurité, <br/> 
            <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic pr-1">Conduire</span>{" "}
            <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic pr-2">Intelligemment.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg lg:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl px-4"
          >
            SMONI propose des solutions accessibles et innovantes pour tout type d'apprenant, 
            partant de la théorie jusqu'à la réussite totale.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="h-full relative group"
            >
              <Card className="h-full border-slate-200/60 bg-white/70 backdrop-blur-md transition-all duration-500 overflow-hidden rounded-[2rem] relative z-20 group-hover:border-transparent flex flex-col">
                {/* Image Header */}
                {service.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  </div>
                )}

                {/* Animated Gradient Background on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/30" />
                  <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] opacity-20 bg-[conic-gradient(from_0deg,transparent_0deg,#2c2876_90deg,transparent_180deg,#3b82f6_270deg,transparent_360deg)]" />
                </div>

                <CardContent className="p-8 pt-4 flex flex-col items-start h-full relative flex-grow">
                  {/* Decorative Gradient Glow behind icon */}
                  <div className={`absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${service.color.replace(' text-', ' bg-')}`} />

                  <div className={`p-4 rounded-2xl ${service.color} mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10 ${service.image ? '-mt-12 bg-white/90 backdrop-blur-md shadow-xl' : ''}`}>
                    {service.icon}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <h3 className="text-2xl font-black text-[#2c2876] group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {service.title}
                    </h3>
                    {service.badge && (
                      <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                        {service.badge}
                      </Badge>
                    )}
                  </div>

                  <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow relative z-10 group-hover:text-slate-600">
                    {service.description}
                  </p>

                  <Link to={service.uri} className="w-full relative z-10">
                    <Button variant="ghost" className="w-full justify-between hover:bg-white/50 border-t border-slate-100/50 pt-6 px-0 h-auto rounded-none group/btn text-[#2c2876] font-bold">
                      <span className="flex items-center gap-2">
                        Voir le détail
                      </span>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2c2876] text-white group-hover/btn:translate-x-2 group-hover/btn:rotate-[-45deg] transition-all duration-300 shadow-md">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Button>
                  </Link>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#2c2876] to-blue-500 group-hover:w-full transition-all duration-700" />
                </CardContent>
              </Card>

              {/* Unique Outer Glow Effect */}
              <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-[#2c2876] to-blue-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AllService;
