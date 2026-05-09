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
    icon: Smartphone,
    title: "Apprentissage Digital",
    description: "Réservez vos cours et suivez votre progression 24h/24 via notre plateforme intuitive.",
    tag: "Moderne"
  },
  {
    icon: Target,
    title: "Formation Ciblée",
    description: "Des programmes personnalisés adaptés à votre rythme pour une réussite garantie dès le premier essai.",
    tag: "Efficace"
  },
  {
    icon: Award,
    title: "Moniteurs Experts",
    description: "Apprenez avec les meilleurs instructeurs certifiés, patients et passionnés par l'enseignement.",
    tag: "Qualité"
  },
  {
    icon: Clock,
    title: "Flexibilité Totale",
    description: "Choisissez vos créneaux horaires en toute liberté, même le soir et les week-ends.",
    tag: "Pratique"
  },
  {
    icon: ShieldCheck,
    title: "Accompagnement Sûr",
    description: "Nous vous suivons de A à Z, du code de la route jusqu'à l'obtention définitive du permis.",
    tag: "Sérénité"
  },
  {
    icon: Zap,
    title: "Réussite Accélérée",
    description: "Notre méthodologie innovante permet de diviser par deux le temps de formation moyen.",
    tag: "Rapide"
  }
];

const HomeFeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
              Pourquoi nous choisir
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e1b4b] leading-[1.1]">
              L'excellence au service de votre <span className="text-primary italic">liberté</span>.
            </h2>
          </motion.div>
          <motion.p className="text-[#64748b] text-lg md:text-xl max-w-md font-medium lg:mb-2" variants={itemVariants}>
            Plus qu'une auto-école, Smoni est votre partenaire privilégié pour devenir un conducteur serein et responsable.
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
                  <p className="text-[#64748b] font-medium leading-relaxed">
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
            <h4 className="text-3xl font-black mb-1">98%</h4>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Taux de réussite</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <h4 className="text-3xl font-black mb-1">+5000</h4>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Élèves diplômés</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <h4 className="text-3xl font-black mb-1">15 min</h4>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Délai d'inscription</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeFeaturesSection;
