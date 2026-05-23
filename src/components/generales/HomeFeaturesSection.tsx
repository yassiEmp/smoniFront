import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  IllustrationDelai,
  IllustrationAudit,
  IllustrationVolume,
  IllustrationExamen,
  IllustrationCreneaux,
  IllustrationMoniteur,
} from "./MesureIllustrations";

// Distinct from "Notre différence" (contractual engagements below): this section is operational reality —
// what we measure, what we track, what we offer day-to-day. No overlap with the 5 engagements written in the contract.
const features = [
  {
    Illustration: IllustrationDelai,
    title: "Réponse sous 24h ouvrées",
    description: "Appel manqué, email, formulaire de contact — on revient toujours sous 24h en semaine. Pas de standard qui filtre, pas de devis qui se perd.",
    tag: "Délai mesuré"
  },
  {
    Illustration: IllustrationAudit,
    title: "Livret horodaté à chaque cours",
    description: "Heure de début et heure de fin notées et signées sur votre livret. Vous gardez la trace écrite. 100% des cours documentés, sans exception.",
    tag: "Audit"
  },
  {
    Illustration: IllustrationVolume,
    title: "200+ dossiers depuis 2022",
    description: "Petite équipe, croissance lente, pas d'avis Google achetés. Si vous voulez parler à un·e ancien·ne élève en direct, on vous met en relation.",
    tag: "Volume honnête"
  },
  {
    Illustration: IllustrationExamen,
    title: "Examens blancs en conditions réelles",
    description: "Itinéraires d'examen reconnus, inspecteur simulé, briefing pré-examen et débrief post. Pour transformer le stress en certitude le jour J.",
    tag: "Anti-stress"
  },
  {
    Illustration: IllustrationCreneaux,
    title: "Créneaux jusqu'à 20h + samedi entier",
    description: "Pas besoin de poser une demi-journée pour conduire 1h. Réservation en ligne, annulation jusqu'à 24h avant sans frais.",
    tag: "Adultes actifs"
  },
  {
    Illustration: IllustrationMoniteur,
    title: "Un moniteur référent, pas une rotation",
    description: "Le même moniteur vous suit du début à la fin — il connaît vos points faibles, votre progression, votre stress. Changement gratuit possible si le courant ne passe pas.",
    tag: "Continuité"
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
              Ce qu'on mesure, ce qu'on offre
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e1b4b] leading-[1.1]">
              6 preuves de <span className="text-primary italic">fonctionnement</span> — pas des slogans.
            </h2>
          </motion.div>
          <motion.p className="text-slate-700 text-lg md:text-xl max-w-md font-medium lg:mb-2" variants={itemVariants}>
            Le secteur parle beaucoup de « qualité ». Voici ce qu'on mesure, ce qu'on trace, ce qu'on propose au quotidien. Les engagements contractuels, eux, sont juste en dessous.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, idx) => {
            const Illustration = feature.Illustration;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="group h-full border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[24px] overflow-hidden p-0 flex flex-col gap-0">
                  <div className="relative aspect-[16/9] bg-[#f3f1ff] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]">
                      <Illustration />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-slate-50/30 group-hover:to-white transition-colors duration-500" />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-end mb-3">
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
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HomeFeaturesSection;
