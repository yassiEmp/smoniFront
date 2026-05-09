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

// Import real images from the assets
import imgLocation from "@assets/images/home/img_hero1.jpg";
import imgConduite from "@assets/images/home/img_hero2.jpg";
import imgCode from "@assets/images/home/img_hero3.jpg";
import imgAccompagnement from "@assets/images/home/img_hero4.jpg";

const services = [
  {
    icon: Car,
    title: "Location",
    description:
      "Des véhicules mis à disposition par SMONI pour permettre aux apprenants de s'exercer en toute sérénité.",
    uri: "/location",
    image: imgLocation,
    badge: "Populaire"
  },
  {
    icon: BookOpen,
    title: "Conduite",
    description:
      "Réserver une leçon de conduite complète pour de meilleur résultat.",
    uri: "/conduite",
    image: imgConduite,
    badge: "Essentiel"
  },
  {
    icon: Monitor,
    title: "Code en ligne",
    description:
      "SMONI vous met à disposition une plateforme en ligne accessible 24h/24 pour vous exercer au code de la route.",
    uri: "/code-en-ligne",
    image: imgCode,
    badge: "Nouveau"
  },
  {
    icon: LifeBuoy,
    title: "Accompagnement",
    description:
      "Vous cherchez un accompagnateur à l'épreuve du permis de conduire ? Un moniteur SMONI peut être votre accompagnateur.",
    uri: "/accompagnement",
    image: imgAccompagnement,
    badge: "Premium"
  },
  {
    icon: ArrowRightLeft,
    title: "Passerelle",
    description:
      "Passez de la boîte automatique à la boîte manuelle avec une formation rapide chez SMONI.",
    uri: "/passerelle",
    image: "/service_passerelle_image_1774287785105.png",
    badge: "Rapide"
  },
  {
    icon: GraduationCap,
    title: "Post-Permis",
    description:
      "Réduisez votre période probatoire et gagnez vos 12 points plus rapidement après l'obtention de votre permis.",
    uri: "/post-permis",
    image: "/service_post_permis_image_1774287808051.png",
    badge: "Avantage"
  },
];

const HomeGroupeSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
            Nos services
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-medium">
            Une approche moderne pour réussir votre permis de conduire avec assurance et sérénité.
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
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
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