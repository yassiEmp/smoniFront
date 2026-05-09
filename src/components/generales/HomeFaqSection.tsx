import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    id: "item-1",
    question: "Qui sommes-nous ?",
    answer:
      "SMONI est une entreprise, qui mêle le meilleur des outils digitaux et des agences physiques, pour aider des élèves à passer le permis de conduire au meilleur prix.",
  },
  {
    id: "item-2",
    question: "Quels sont les taux de réussite aux examens ?",
    answer:
      "SMONI est une nouvelle entreprise donc n'a pas à ce jour assez de données pour faire des statistiques sur ces points. En revanche, les moniteurs de SMONI ont de l'expérience. Sur leur dernière année d'exercice dans une autre entreprise, ils totalisent 62% de réussite au permis.",
  },
  {
    id: "item-3",
    question: "Vous souhaitez payer en plusieurs fois ?",
    answer:
      "C'est possible, écrivez-nous tout simplement sur contact@smoni.fr et nous mettrons en place le paiement en plusieurs fois.",
  },
  {
    id: "item-4",
    question: "Est-ce que SMONI accepte le financement de mon permis par le CPF ?",
    answer:
      'Oui, vous pouvez financer votre permis grâce à votre CPF chez SMONI auto-école. Nous faisons aussi le permis à 1€/ Jours. <a href="https://www.smoni.fr/ressources#financement" target="_blank" class="text-primary underline hover:text-primary/80 transition-colors">En savoir plus sur les financements</a>',
  },
  {
    id: "item-5",
    question: "Par où débuter ?",
    answer:
      "Avant toute chose vous devez être en possession de votre numéro N.E.P.H. Préparez les documents suivants : Un justificatif d'identité, un justificatif de domicile datant de moins de 6 mois, une photo d'identité datant de moins de 6 mois (au format papier ou numérique). Pour les candidats âgés de 17 ans révolus à 25 ans non révolus et pour une première demande, fournir un des quatre documents suivants : le certificat individuel de participation à la journée défense et citoyenneté (JDC), l'attestation provisoire de situation vis-à-vis du service national, l'attestation individuelle d'exemption, l'attestation de situation vis-à-vis du service national. Pour les demandes le nécessitant : un avis médical d'un médecin agréé. Pour une personne mineure ou sous tutelle légale : les informations du représentant légal et copie de son justificatif d'identité. Ensuite, rendez-vous sur le site de l'ants en choisissant le motif 'Je m'inscris pour pouvoir me présenter aux épreuves du permis de conduire'.",
  },
];

const HomeFaqSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  return (
    <section className="py-20 md:py-28 bg-white" id="faq">
      <motion.div
        className="container mx-auto px-6 md:px-10 xl:px-32 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12 space-y-4" variants={itemVariants}>
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border-primary/20 rounded-full"
          >
            <HelpCircle className="w-3 h-3 mr-1.5" />
            Questions fréquentes
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            FAQ
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Trouvez les réponses aux questions les plus fréquemment posées.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div className="w-full max-w-3xl" variants={itemVariants}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border/50 rounded-2xl px-6 bg-card hover:bg-accent/50 transition-colors data-[state=open]:bg-accent/50 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-base md:text-lg font-bold text-foreground hover:no-underline py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeFaqSection;
