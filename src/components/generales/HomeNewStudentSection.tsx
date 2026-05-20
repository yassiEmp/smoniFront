import car from "@assets/lottie/7isaYUlhIt.json";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HomeNewStudentSection = () => {
  const steps = [
    "Pièce d'identité",
    "Justificatif de domicile (< 6 mois)",
    "Photo d'identité (papier ou numérique)",
    "Pour les 17-25 ans : attestation JDC",
    "Pour les mineurs : pièce d'identité du représentant légal",
  ];

  return (
    <section style={{ backgroundColor: '#352564' }} className="relative overflow-hidden py-24 md:py-32">
      <motion.div
        className="container mx-auto px-6 lg:px-14 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
            variants={itemVariants}
          >
            Avant de venir, préparez ça.
          </motion.h2>
          <motion.p
            className="text-slate-100 text-lg md:text-xl font-medium max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Cinq documents — rien de plus. Pas votre numéro NEPH ? On vous accompagne pour le créer sur le site de l'ANTS.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
          
          {/* Right: Animation - Now Perfectly Merged */}
          <motion.div 
            className="w-full lg:w-1/2" 
            variants={itemVariants}
          >
            <Lottie 
              animationData={car} 
              className="w-full h-auto" 
            />
          </motion.div>

          {/* Left: Content */}
          <motion.div className="w-full lg:w-1/2 space-y-8" variants={itemVariants}>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Votre dossier d'inscription, simplement.
              </h3>
              <p className="text-slate-100 text-base md:text-lg leading-relaxed font-medium">
                Le permis démarre quand votre dossier est complet — pas avant. On vous donne la liste exacte
                pour ne rien oublier, et on vous aide à monter chaque pièce manquante. Pas de va-et-vient inutile.
              </p>
              <p className="text-slate-200 text-sm italic">
                Vous n'avez pas tous les documents ? Appelez-nous au 07 71 26 51 19 — on vous dit comment les obtenir,
                gratuitement, sans rendez-vous obligatoire.
              </p>
            </div>

            <div className="space-y-6">
              <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-white/10">
                Pièces à apporter
              </Badge>

              <div className="grid gap-3">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-white font-bold text-base tracking-tight">
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default HomeNewStudentSection;
