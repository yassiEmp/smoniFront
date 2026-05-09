import { motion } from "framer-motion";
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
    value: "15,000+",
    label: "Élèves formés",
    description: "Des milliers de conducteurs nous ont fait confiance pour leur formation."
  },
  {
    icon: Trophy,
    value: "92%",
    label: "Taux de réussite",
    description: "Une méthodologie pédagogique éprouvée pour une réussite dès le premier examen."
  },
  {
    icon: MapPin,
    value: "50+",
    label: "Points de rendez-vous",
    description: "Une présence nationale pour faciliter vos leçons de conduite près de chez vous."
  }
];

const bentoFeatures = [
  {
    title: "Accompagnement Personnalisé",
    description: "Chaque élève bénéficie d'un suivi unique adapté à son rythme d'apprentissage.",
    icon: GraduationCap,
    className: "md:col-span-2 bg-slate-50 border-slate-200"
  },
  {
    title: "Planning Flexible",
    description: "Réservez vos heures via l'application 24/7.",
    icon: Calendar,
    className: "md:col-span-1 bg-primary/5 border-primary/10"
  },
  {
    title: "Moniteurs Diplômés",
    description: "Tous nos enseignants sont certifiés par l'État pour une expertise garantie.",
    icon: CheckCircle2,
    className: "md:col-span-1 bg-slate-50 border-slate-200"
  },
  {
    title: "Financement CPF",
    description: "Utilisez vos droits à la formation pour financer l'intégralité de votre permis de conduire chez SMONI.",
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
              Impact & Excellence
            </Badge>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e1b4b] leading-tight mb-6"
          >
            Pourquoi SMONI est le <span className="text-primary italic">leader</span> <br className="hidden md:block" /> de l'auto-école digitale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#64748b] text-lg md:text-xl max-w-3xl font-medium"
          >
            Nous avons repensé la formation au permis de conduire pour allier technologie 
            et pédagogie humaine, offrant ainsi une expérience incomparable.
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
              <p className="text-slate-500 font-medium leading-relaxed">{stat.description}</p>
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
