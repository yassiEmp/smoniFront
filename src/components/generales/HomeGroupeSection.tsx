import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { BookOpen, Monitor, LifeBuoy, Car, ArrowRight, ArrowRightLeft, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router";
import { ResponsivePicture } from "@/components/ui/responsive-picture";

import imgLocation from "@assets/images/home/img_hero1.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgConduite from "@assets/images/home/img_hero2.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgCode from "@assets/images/home/img_hero3.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgAccompagnement from "@assets/images/home/img_hero4.jpg?w=400;640;820&format=avif;webp;jpg&as=picture";
import imgPasserelle from "@assets/services/passerelle.png?w=400;640;820&format=avif;webp;png&as=picture";
import imgPostPermis from "@assets/services/post-permis.png?w=400;640;820&format=avif;webp;png&as=picture";

const services = [
  {
    icon: Car,
    title: "Permis B (boîte manuelle)",
    description:
      "20 à 30h de conduite réelle, code de la route inclus avec Pass Rousseau 24/7. Pas en option payante.",
    uri: "/conduite",
    image: imgConduite,
    badge: "Le plus demandé",
    altSuffix: "permis B 94300"
  },
  {
    icon: ArrowRightLeft,
    title: "Permis Boîte Automatique (B78)",
    description:
      "13 à 20h suffisent. 75% de réussite nationale vs 57% en manuelle. Passerelle 7h possible après.",
    uri: "/passerelle",
    image: imgPasserelle,
    badge: "Le plus efficace",
    altSuffix: "permis accéléré Vincennes"
  },
  {
    icon: BookOpen,
    title: "Permis Moto (A1 / A2 / 125)",
    description:
      "Plateau, circulation, code moto. Le plateau lent appris par étapes, sans panique. Selon dispo moniteur.",
    uri: "/conduite",
    image: imgLocation,
    badge: "Sur demande",
    altSuffix: "auto-école Val-de-Marne"
  },
  {
    icon: Monitor,
    title: "Code de la route — En ligne 24/7",
    description:
      "Pass Rousseau inclus dans tous nos forfaits. Tests illimités. Session présentielle hebdo à l'agence si vous préférez.",
    uri: "/code-en-ligne",
    image: imgCode,
    badge: "Inclus",
    altSuffix: "code de la route en ligne"
  },
  {
    icon: GraduationCap,
    title: "Stage accéléré 1 semaine",
    description:
      "20h de conduite sur 5-7 jours. Prix verrouillé, 0 supplément. Pour qui veut le permis vite, sans surprise.",
    uri: "/conduite",
    image: imgAccompagnement,
    badge: "Express",
    altSuffix: "près de Saint-Mandé"
  },
  {
    icon: LifeBuoy,
    title: "Reprise pour recalés",
    description:
      "Vous avez raté ? Évaluation gratuite (1h), plan personnalisé, pas de pack 13h imposé. Sans frais de transfert.",
    uri: "/contact",
    image: imgPostPermis,
    badge: "Sans pénalité",
    altSuffix: "moniteurs certifiés BEPECASER"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const HomeGroupeSection = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <motion.div
        className="container mx-auto px-4 lg:px-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16 space-y-4" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1e1b4b]">
            Nos formations
          </h2>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto font-medium">
            On enseigne ce qu'on sait enseigner — bien. Prix affichés, aucune surprise.
          </p>
        </motion.div>

        {/* Shadcn Modern Service Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="flex h-full">
                <Card className="group relative overflow-hidden border-slate-200/60 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 flex flex-col h-full rounded-2xl">
                  {/* Image Container with Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    {typeof service.image === "string" ? (
                      <img
                        src={service.image}
                        alt={`${service.title} — ${service.altSuffix}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <ResponsivePicture
                        picture={service.image}
                        alt={`${service.title} — ${service.altSuffix}`}
                        sizes="(min-width: 1280px) 410px, (min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Floating Icon/Badge Action Area */}
                    <CardAction className="absolute right-3 top-3 z-20">
                      <Badge variant="secondary" className="bg-white/95 text-primary border-none shadow-sm backdrop-blur-sm font-bold">
                        {service.badge}
                      </Badge>
                    </CardAction>
 
                    {/* Floating Icon */}
                    <div className="absolute left-4 top-4 z-20 w-10 h-10 rounded-xl bg-primary/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                  </div>
 
                  <CardHeader className="space-y-2 pb-4">
                    <CardTitle className="text-xl font-bold text-[#1e1b4b] transition-colors group-hover:text-primary">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium leading-relaxed min-h-[60px]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter className="mt-auto pb-6">
                    <Button
                      onClick={() => handleNavigate(service.uri)}
                      className="w-full bg-[#1e1b4b] hover:bg-primary text-white font-bold rounded-xl transition-all h-11 group/btn shadow-md"
                    >
                      Voir Détails
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeGroupeSection;