import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const faqData = [
  {
    id: "item-1",
    question: "Combien coûte vraiment le permis chez Smoni, sans surprise ?",
    answer:
      "Tous nos tarifs sont publics sur la page Tarifs. Le forfait Permis B 20h démarre à 1 290 € (manuelle) ou 990 € (BVA 13h). Le contrat détaille chaque ligne. Vous ne paierez aucun supplément qui n'est pas mentionné à la signature — c'est dans nos 5 engagements.",
  },
  {
    id: "item-2",
    question: "J'ai déjà raté mon permis. Vous me prenez ?",
    answer:
      "Oui. Sans frais de transfert, sans pack 13h imposé. On commence par une évaluation gratuite d'1h pour estimer ce dont vous avez besoin, et on construit un plan sur-mesure. C'est exactement le profil qu'on accueille le mieux.",
  },
  {
    id: "item-3",
    question: "J'ai 35 ans, je n'ai jamais conduit. C'est gênant ?",
    answer:
      "Non. ~30% de nos candidats ont plus de 25 ans. Créneaux soir et samedi spécifiquement pour ça, moniteurs habitués aux adultes, zéro condescendance. Appelez quand vous voulez.",
  },
  {
    id: "item-4",
    question: "Vous acceptez le CPF ?",
    answer:
      "Oui, sous réserve de notre référencement EDOF (à confirmer à l'inscription). Depuis la réforme 2024, un reste à charge de 100 € s'applique. On vous accompagne dans le montage du dossier.",
  },
  {
    id: "item-5",
    question: "Et si vous fermez avec mon argent dedans ?",
    answer:
      "Impossible. La loi (art. L.213-2 Code de la route) nous oblige à souscrire une garantie financière qui protège votre argent. Si on devait fermer, vous récupérez vos heures non consommées. Attestation envoyée sur demande.",
  },
  {
    id: "item-6",
    question: "Heures supplémentaires : c'est obligatoire avant l'examen ?",
    answer:
      "Non. Si votre moniteur estime que vous êtes prêt·e après les 20h du forfait, vous passez. On ne facture pas \"9h obligatoires sur le centre d'examen\" comme certaines auto-écoles. Si des heures supp sont nécessaires, c'est justifié par écrit, sur votre niveau réel.",
  },
  {
    id: "item-7",
    question: "Boîte automatique, c'est vraiment pour les nuls ?",
    answer:
      "Non. Statistique nationale 2024 : 75% de réussite en BVA vs 57% en manuelle. 13h légales vs 20h. Coût moyen 990 € vs 1 290 €. Si vous conduisez en ville ou en EV, c'est l'option rationnelle. Passerelle manuelle possible en 7h après.",
  },
  {
    id: "item-8",
    question: "Combien de temps entre l'inscription et l'examen ?",
    answer:
      "À Vincennes (centres d'examen Rungis ou Créteil), 4 à 8 semaines selon la période, une fois prêt·e. Notre objectif est de vous présenter au plus tôt — pas au plus rentable pour nous.",
  },
  {
    id: "item-9",
    question: "Mon moniteur peut-il changer en cours de formation ?",
    answer:
      "Oui, sans frais. Vous nous le dites, on vous propose un autre moniteur de l'équipe. Pas besoin de justifier en détail.",
  },
  {
    id: "item-10",
    question: "Le simulateur de conduite, vous en avez ?",
    answer:
      "Pas pour l'instant. On préfère vous mettre directement dans une vraie voiture, en circulation réelle. Si on en introduit un jour, ce sera un complément optionnel, pas une obligation facturée.",
  },
  {
    id: "item-11",
    question: "Quels documents je dois préparer avant de venir ?",
    answer:
      "Pièce d'identité, justificatif de domicile < 6 mois, photo d'identité, et pour les 17-25 ans l'attestation JDC. Pas votre NEPH ? On vous accompagne pour le créer sur l'ANTS.",
  },
  {
    id: "item-12",
    question: "Vous proposez le permis accéléré sur une semaine ?",
    answer:
      "Oui, sur 5-7 jours, 20h de conduite, prix tout-compris 1 590 €. Pas de « supplément à la dernière minute ». Demandez-nous les dates disponibles.",
  },
  {
    id: "item-13",
    question: "Permis A2 / moto / 125 cm³ : c'est possible chez Smoni ?",
    answer:
      "Oui pour le 125 cm³ (7h, 290 €) et selon la disponibilité du moniteur moto pour l'A2. Appelez-nous : on est honnête sur les délais.",
  },
  {
    id: "item-14",
    question: "Pourquoi vous n'avez pas (encore) d'avis Google ?",
    answer:
      "Parce qu'on est une petite équipe créée en 2022, et qu'on n'a jamais acheté ni sollicité d'avis. Plutôt que des étoiles inventées, on vous propose de parler à un·e ancien·ne élève en direct, de venir nous voir, ou de démarrer par une 1ʳᵉ leçon sans engagement.",
  },
  {
    id: "item-15",
    question: "Comment vous différenciez-vous d'Ornikar, Stych ou En Voiture Simone ?",
    answer:
      "On est physique. Vous voyez Arike (la directrice) en vrai. Vous appelez et c'est elle ou un moniteur qui répond. Si votre formation pose problème, vous venez à l'agence — pas un chatbot qui met 4 jours à répondre. C'est aussi pourquoi on coûte un peu plus que les plateformes online — mais vous ne vous retrouvez pas avec « 1 700 € disparus sur le CPF » comme on l'a beaucoup lu sur Reddit.",
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

const HomeFaqSection = () => {
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
            Ce que les autres auto-écoles évitent de dire.
          </h2>
          <p className="text-slate-700 text-lg max-w-xl mx-auto">
            Les vraies questions qu'on nous pose — et celles qu'on devrait nous poser. Réponses directes, sans langue de bois.
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
