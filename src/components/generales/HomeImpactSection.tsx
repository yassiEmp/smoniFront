import { motion } from "motion/react";
import { 
  Users, 
  MapPin, 
  Calendar, 
  Trophy, 
  GraduationCap, 
  CheckCircle2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statistics = [
  {
    icon: Users,
    value: "1",
    label: "Récupération de dossier",
    description: "On contacte votre ancienne auto-école, on récupère livret, code et NEPH. Sans frais."
  },
  {
    icon: Trophy,
    value: "1h",
    label: "Évaluation gratuite",
    description: "Vous conduisez 1h avec un moniteur Smoni. Aucun engagement. On vous dit honnêtement où vous en êtes."
  },
  {
    icon: MapPin,
    value: "0",
    label: "Pack 13h imposé",
    description: "Vous payez les heures dont vous avez besoin. Pas un forfait géant pour repartir à zéro."
  }
];

const bentoFeatures = [
  {
    title: "Plan personnalisé, pas un pack",
    description: "On bâtit votre reprise sur votre vrai niveau, pas sur le tarif le plus rentable. Préparation mentale anti-stress incluse.",
    icon: GraduationCap,
    className: "md:col-span-2 bg-slate-50 border-slate-200"
  },
  {
    title: "Repasse rapide",
    description: "Date d'examen sur Vincennes, Rungis ou Créteil — le centre le moins encombré au moment où vous êtes prêt·e.",
    icon: Calendar,
    className: "md:col-span-1 bg-primary/5 border-primary/10"
  },
  {
    title: "Transfert sans frais",
    description: "Frais de transfert facturés par l'ancienne école au-delà de l'administratif réel : illégal. On vous aide à contester.",
    icon: CheckCircle2,
    className: "md:col-span-1 bg-slate-50 border-slate-200"
  },
  {
    title: "« Plus tu rates, plus tu rates » — la spirale qu'on coupe.",
    description: "79% des candidats qui ratent 3 fois abandonnent. Pas parce qu'ils ne savent pas conduire — parce que les écoles s'en désintéressent. Pas ici.",
    icon: Trophy,
    className: "md:col-span-2 bg-slate-900 text-white border-slate-800"
  }
];

const HomeImpactSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden" id="impact">
      <div className="container mx-auto px-6 md:px-10 xl:px-32">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
              Recalés bienvenus
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e1b4b] leading-tight mb-6"
          >
            Vous avez déjà raté. <br className="hidden md:block" /> Ici, ça ne vous <span className="text-primary italic">pénalisera pas</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-700 text-lg md:text-xl max-w-3xl font-medium"
          >
            Les autres écoles refusent les dossiers "parce que ça baisse leur quota d'examens".
            Chez Smoni, on a un protocole différent pour les recalés — sans pack 13h imposé, sans frais de transfert.
          </motion.p>
        </div>

        {/* Statistics Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24"
        >
          {statistics.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-center text-center p-8 rounded-3xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-black text-[#1e1b4b] mb-2">{stat.value}</h3>
              <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">{stat.label}</p>
              <p className="text-slate-600 font-medium leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-[32px] border flex flex-col justify-between h-[300px] group transition-all hover:shadow-xl ${feature.className}`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:-rotate-12 ${feature.className.includes('bg-slate-900') ? 'bg-white/10 text-white' : 'bg-white border text-primary'}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight">{feature.title}</h4>
                <p className={`font-medium leading-relaxed opacity-70`}>{feature.description}</p>
              </div>
              <div className="pt-4">
                <div className={`w-10 h-1 h-px ${feature.className.includes('bg-slate-900') ? 'bg-[#00ff41]' : 'bg-primary'} rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeImpactSection;
