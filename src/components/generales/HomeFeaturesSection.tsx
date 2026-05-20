import { motion } from "framer-motion";
import {
  Zap,
  Target,
  Smartphone,
  Award,
  Clock,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Target,
    title: "Prix publics, contrat écrit",
    description: "Tous nos tarifs sont sur la page Tarifs. Le contrat de formation détaille chaque centime. Aucun frais découvert en route.",
    tag: "Transparence"
  },
  {
    icon: Clock,
    title: "60 minutes de conduite par heure",
    description: "Heure de début et de fin notées sur votre livret. Si on coupe court, vous récupérez le temps. Sans débat.",
    tag: "Heures pleines"
  },
  {
    icon: ShieldCheck,
    title: "Moniteurs qui ne crient pas",
    description: "Charte signée par l'équipe. Changement gratuit si problème — pas besoin de justifier en détail. On vous croit.",
    tag: "Respect"
  },
  {
    icon: Smartphone,
    title: "Soir & week-end",
    description: "Créneaux jusqu'à 20h, samedi toute la journée. Pour les adultes qui bossent en semaine.",
    tag: "Disponibilité"
  },
  {
    icon: Award,
    title: "Reprise sans frais ni heures imposées",
    description: "Évaluation gratuite (1h), plan personnalisé selon votre vrai niveau. Pas de pack 13h obligatoire.",
    tag: "Recalés"
  },
  {
    icon: Zap,
    title: "Préparation mentale incluse",
    description: "Examens blancs en conditions réelles, briefing pré-examen, débrief post. Pour transformer le stress en certitude.",
    tag: "Anti-stress"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const HomeFeaturesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <motion.div
        className="container mx-auto px-6 md:px-10 xl:px-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <motion.div className="max-w-2xl space-y-4" variants={itemVariants}>
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-4 py-1 rounded-full font-bold uppercase tracking-wider">
              Ce que vous obtenez chez Smoni
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e1b4b] leading-[1.1]">
              6 promesses concrètes — pas des <span className="text-primary italic">slogans</span>.
            </h2>
          </motion.div>
          <motion.p className="text-slate-700 text-lg md:text-xl max-w-md font-medium lg:mb-2" variants={itemVariants}>
            Le secteur parle beaucoup de "qualité" et d'"excellence". Ça ne veut rien dire. Voici ce qu'on s'engage à faire — mesurable.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[24px] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <Badge variant="secondary" className="bg-white text-slate-500 font-semibold border-slate-100 uppercase text-[10px] tracking-widest">
                      {feature.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#1e1b4b]">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stat Bar for SEO */}
        <motion.div
          className="mt-20 p-8 rounded-[32px] bg-[#1e1b4b] text-white flex flex-wrap justify-around items-center gap-8 shadow-2xl"
          variants={itemVariants}
        >
          <div className="text-center">
            <h4 className="text-3xl font-black mb-1">&lt; 24h</h4>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Réponse aux appels</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <h4 className="text-3xl font-black mb-1">7 jours</h4>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Premier RDV</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <h4 className="text-3xl font-black mb-1">0</h4>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Supplément non prévu</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeFeaturesSection;
