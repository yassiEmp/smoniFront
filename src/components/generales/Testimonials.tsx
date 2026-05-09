import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Arike Nawade",
    role: "La meilleure monitrice",
    text: "J'ai eu l'opportunité d'être formé par Arike tout au long de mon apprentissage, et je tiens à souligner la qualité remarquable de son accompagnement. Une monitrice à la fois pédagogue, patiente et rigoureuse. Grâce à sa méthode claire, j'ai pu progresser rapidement.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Salina Turay",
    role: "Nouveau Conducteur",
    text: "J'ai eu la chance de passer mon permis en boîte automatique avec Arike, et je ne peux que la recommander chaleureusement ! Dès le premier cours, elle a su me mettre à l'aise grâce à sa patience, son professionnalisme et sa bienveillance.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Sylvain Faure",
    role: "Ancien Élève",
    text: "Monitrice patiente et à la critique constructive. Les exercices sont répétés et ré-expliqués jusqu'à être maîtrisés. Accompagnement de qualité jusqu'au bout, avec une préparation solide aux conditions de l'examen.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 4,
    name: "Nathalie Roche",
    role: "Apprenante",
    text: "Après 13 ans de galère et de nombreuses dépenses, j'ai enfin décroché le précieux sésame ! Je suis ravie et infiniment reconnaissante pour l'aide précieuse et l'excellente continuation. Merci encore !",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      {/* Premium glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-10 xl:px-32">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="px-5 py-1 text-xs font-bold tracking-[0.2em] uppercase border-white/10 text-white/60 rounded-full bg-white/5"
          >
            Témoignages
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            La réussite de <span className="text-primary italic">nos élèves</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Leurs mots sont notre plus grande fierté.
          </p>
        </motion.div>

        {/* Testimonial Display */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="bg-[#0c0c0c] border-[#1a1a1a] p-8 md:p-14 rounded-[32px] md:rounded-[40px] shadow-2xl relative overflow-hidden group">
                {/* Subtle gradient border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-8">
                  {/* Stars at Top Left */}
                  <div className="flex gap-1.5">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-white fill-white"
                      />
                    ))}
                  </div>

                  {/* Main Quote Text */}
                  <p className="text-xl md:text-3xl font-bold text-white leading-snug md:leading-tight tracking-tight">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author Section */}
                  <div className="flex items-center gap-5 pt-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                      <img 
                        src={testimonials[currentIndex].avatar} 
                        alt={testimonials[currentIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-white/50 text-sm font-semibold tracking-wide uppercase">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Premium Navigation Controls */}
          <div className="flex items-center justify-between mt-12 px-2">
            <div className="flex gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "w-10 bg-primary"
                      : "w-3 bg-white/10 hover:bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full border-white/5 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="w-12 h-12 rounded-full border-white/5 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
