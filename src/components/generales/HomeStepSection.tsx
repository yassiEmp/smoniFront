import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  CreditCard, 
  UserPlus, 
  CalendarCheck, 
  BarChart3,
  Wallet,
  Settings,
  Presentation,
  ShieldCheck
} from "lucide-react";
import Quiz from "@assets/images/home/question.png";
import { useNavigate } from "react-router";

const steps = [
  {
    number: 1,
    icon: Wallet,
    title: "Abonnement",
    description: "Choisissez un pack selon votre besoin et souscrivez à l'offre.",
    variant: "indigo",
  },
  {
    number: 2,
    icon: UserPlus,
    title: "Connexion",
    description: "Créez votre compte en ligne chez SMONI",
    variant: "purple",
  },
  {
    number: 3,
    icon: CalendarCheck,
    title: "Rendez-vous",
    description: "Recherchez des moniteurs et planifiez un rendez-vous pour un cours de conduite.",
    variant: "emerald",
  },
  {
    number: 4,
    icon: ShieldCheck,
    title: "Évaluation",
    description: "Accédez à votre espace et suivez à chaque instant votre évolution avant de passer votre examen.",
    variant: "amber",
  },
];

const HomeStepSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-32 bg-[#f8fafc]">
      <motion.div
        className="container mx-auto px-6 md:px-10 xl:px-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image with Floating Elements */}
          <motion.div
            className="w-full md:w-5/12 relative group"
            variants={itemVariants}
          >
            <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <img
              src={Quiz}
              alt="Comment ça marche"
              className="relative w-full max-w-sm mx-auto drop-shadow-2xl animate-float"
            />
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 p-4 bg-white rounded-2xl shadow-xl animate-bounce-subtle">
               <Presentation className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute bottom-10 left-0 p-4 bg-white rounded-2xl shadow-xl animate-bounce-subtle delay-700">
               <Settings className="w-8 h-8 text-[#342563]" />
            </div>
          </motion.div>

          {/* Steps Content */}
          <div className="w-full md:w-7/12">
            <motion.div className="space-y-6 mb-12" variants={itemVariants}>
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm font-bold uppercase border-primary/20 text-primary rounded-lg bg-primary/5"
              >
                Bon à savoir
              </Badge>
              <h2 className="text-[42px] md:text-[52px] font-black tracking-tight text-[#1e1b4b] leading-[1.1]">
                Comment <span className="text-primary italic">ça marche</span> ?
              </h2>
              <p className="text-[#64748b] text-xl font-medium max-w-lg">
                Commencez votre parcours chez SMONI en 4 étapes simples et intuitives.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.number} variants={itemVariants}>
                    <Card className="group relative p-8 border-slate-200/60 bg-white hover:border-primary/30 transition-all duration-500 overflow-hidden rounded-[24px]">
                      {/* Background Number */}
                      <span className="absolute -right-4 -top-6 text-[120px] font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {step.number}
                      </span>
                      
                      <div className="relative z-10 flex flex-col gap-6">
                        {/* Icon Slot */}
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                          <Icon className="w-7 h-7 text-[#1e1b4b] group-hover:text-white transition-colors" strokeWidth={2} />
                        </div>
 
                        <div className="space-y-3">
                          <h3 className="text-[22px] font-extrabold text-[#1e1b4b]">
                            {step.title}
                          </h3>
                          <p className="text-[14px] text-[#64748b] font-medium leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div className="mt-12" variants={itemVariants}>
              <Button
                onClick={() => handleNavigate("/tarifs")}
                className="bg-[#1e1b4b] text-white hover:bg-primary rounded-xl px-10 h-14 text-base font-black shadow-2xl shadow-primary/20 transition-all hover:scale-105 group"
              >
                Commencer maintenant
                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
      `}} />
    </section>
  );
};

export default HomeStepSection;
