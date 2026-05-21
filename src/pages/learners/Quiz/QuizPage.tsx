import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '@components/generales/Header';
import Footer from '@components/generales/Footer';
import HomeNewStudentSection from '@components/generales/HomeNewStudentSection';
import PageHead from '@components/SEO/PageHead';

interface Question {
  id: number;
  question_number: number;
  question_text: string;
  options: string[];
  correct: number;
  info?: string;
}

const LOCAL_QUESTIONS: { [key: string]: Question[] } = {
  'VE': [ // VE - Vérifications Extérieures
    { id: 1, question_number: 1, question_text: "Montrez où s'effectue le remplissage du produit lave-glace.", options: ["Sous le capot, réservoir avec symbole de pare-brise", "Dans le coffre", "Près du moteur, bouchon jaune", "À côté de la batterie"], correct: 0 },
    { id: 2, question_number: 2, question_text: "Contrôlez l'état du flanc sur l'un des pneumatiques.", options: ["Vérifier l'absence de hernies ou déchirures", "Vérifier la profondeur des rainures", "Vérifier la pression avec un manomètre", "Vérifier la marque du pneu"], correct: 0 },
    { id: 3, question_number: 3, question_text: "Vérifiez l'état et la propreté des plaques d'immatriculation.", options: ["Propres et lisibles à l'avant et à l'arrière", "Seulement à l'arrière", "Peu importe si elles sont sales", "Juste vérifier qu'elles sont fixées"], correct: 0 },
    { id: 4, question_number: 4, question_text: "Montrez où s'effectue le contrôle du niveau du liquide de frein.", options: ["Sous le capot, réservoir avec pictogramme spécifique", "Dans le coffre", "Sur le côté du moteur", "Près du radiateur"], correct: 0 },
    { id: 5, question_number: 5, question_text: "Contrôlez l'état de tous les balais d'essuie-glace du véhicule.", options: ["Vérifier que le caoutchouc n'est pas déchiré ou durci", "Vérifier la couleur des balais", "Vérifier la marque des balais", "Vérifier qu'ils sont bien fixés au bras"], correct: 0 },
    { id: 6, question_number: 6, question_text: "Montrez où s'effectue le remplissage du liquide de refroidissement.", options: ["Sous le capot, vase d'expansion avec témoin mini/maxi", "Dans le réservoir de lave-glace", "Dans le carter d'huile", "Dans le circuit de freinage"], correct: 0 },
    { id: 7, question_number: 7, question_text: "Contrôlez l'état, la propreté et le fonctionnement de tous les clignotants.", options: ["Tous doivent être propres et fonctionner", "Seulement ceux à l'avant", "Seulement ceux à l'arrière", "Juste vérifier la propreté"], correct: 0 },
    { id: 8, question_number: 8, question_text: "Vérifiez l'état et la propreté des dispositifs réfléchissants (catadioptres).", options: ["Propres et non cassés pour être visibles la nuit", "Rien à vérifier", "Juste la couleur rouge", "Seulement à l'avant"], correct: 0 },
    { id: 9, question_number: 9, question_text: "Montrez où s'effectuerait le changement d'une ampoule à l'avant du véhicule.", options: ["Derrière le bloc optique sous le capot", "Par l'extérieur du phare", "En démontant le pare-choc", "Par l'intérieur du véhicule"], correct: 0 },
    { id: 10, question_number: 10, question_text: "Où se situe la sécurité enfant sur l'une des portières arrière ?", options: ["Sur la tranche de la portière, petit loquet", "Sur la poignée intérieure", "Sur la poignée extérieure", "Sur le tableau de bord"], correct: 0 },
    { id: 11, question_number: 11, question_text: "Désignez sur le flanc d'un pneu le repère du témoin d'usure.", options: ["Petit triangle ou logo TWI sur le haut du flanc", "Une rayure sur le côté", "Le numéro de série", "La date de fabrication"], correct: 1 },
    { id: 12, question_number: 12, question_text: "Où s'effectue le remplissage de l'huile moteur ?", options: ["Bouchon sur le dessus du moteur avec symbole de burette", "Jauge de niveau", "Réservoir de liquide de refroidissement", "Réservoir de carburant"], correct: 0 },
    { id: 13, question_number: 13, question_text: "Montrez où se situent les gicleurs de lave-glace avant.", options: ["Sur le capot ou à la base du pare-brise", "Dans les balais d'essuie-glace", "Sur le pare-choc", "Dans la calandre"], correct: 0 },
    { id: 14, question_number: 14, question_text: "Contrôlez l'état, la propreté et le fonctionnement du ou des feux de recul.", options: ["Demander l'aide de l'accompagnateur ou utiliser le reflet", "On ne peut pas les vérifier seul", "Ils ne sont pas obligatoires", "Ils sont toujours allumés"], correct: 0 },
    { id: 15, question_number: 15, question_text: "Vérifiez la présence du gilet de haute visibilité.", options: ["Doit être accessible dans l'habitacle", "Dans le coffre seulement", "Sous le capot", "Pas obligatoire"], correct: 0 },
    { id: 16, question_number: 16, question_text: "Vérifiez la présence du certificat d'immatriculation (carte grise).", options: ["Doit être présent dans le véhicule (original ou copie)", "Pas obligatoire", "Seulement le permis suffit", "Seulement l'assurance suffit"], correct: 0 },
    { id: 17, question_number: 17, question_text: "Vérifiez la présence de l'éthylotest.", options: ["Doit être présent et non périmé", "Pas obligatoire pour les jeunes", "Uniquement de nuit", "Facultatif"], correct: 0 },
    { id: 18, question_number: 18, question_text: "Vérifiez l'état de la plaque d'immatriculation arrière et son éclairage.", options: ["Plaque propre, lisible et ampoule fonctionnelle", "Juste la propreté", "Juste l'éclairage", "Rien à vérifier"], correct: 0 },
    { id: 19, question_number: 19, question_text: "Donnez la pression préconisée pour les pneus arrière, véhicule chargé.", options: ["Consulter la plaque sur la portière ou notice", "Toujours 2 bars", "Toujours 3 bars", "Au jugé"], correct: 0 },
    { id: 20, question_number: 20, question_text: "Vérifiez la présence du triangle de pré-signalisation.", options: ["Doit être présent dans le véhicule", "Non obligatoire sur autoroute", "Optionnel", "Remplacé par le gilet"], correct: 0 },
    { id: 21, question_number: 21, question_text: "Où se situe la sécurité enfant sur l'une des portières arrière ?", options: ["Sur le champ de la portière", "Sur le tableau de bord", "Près du levier de vitesse", "Sous le siège"], correct: 0 },
    { id: 22, question_number: 22, question_text: "Vérifiez le fonctionnement de l'éclairage de la plaque arrière.", options: ["Actionner les feux et vérifier visuellement", "Vérifier le fusible", "Pas besoin de vérifier", "Vérifier le tableau de bord"], correct: 0 },
    { id: 23, question_number: 23, question_text: "Où s'effectue le changement d'ampoule arrière ?", options: ["Par le coffre ou l'extérieur selon le modèle", "Toujours par le capot", "En démontant la roue", "Ce n'est pas possible par l'usager"], correct: 0 },
    { id: 24, question_number: 24, question_text: "Comment vérifier la fermeture du coffre ?", options: ["Le fermer et essayer de l'ouvrir sans la commande", "Vérifier le voyant", "Écouter le 'clic'", "Toutes les réponses"], correct: 3 },
    { id: 25, question_number: 25, question_text: "Désignez l'emplacement de la batterie du véhicule.", options: ["Sous le capot ou dans le coffre selon le modèle", "Toujours sous le siège passager", "Dans la boîte à gants", "Sous la voiture"], correct: 0 }
  ],
  'VI': [ // VI - Vérifications Intérieures
    { id: 101, question_number: 1, question_text: "Montrez la commande de réglage de hauteur des feux.", options: ["Généralement à gauche du volant sur le tableau de bord", "Sur le commodo de phares", "Sur l'écran tactile", "Dans les réglages du siège"], correct: 0 },
    { id: 102, question_number: 2, question_text: "Mettez le rétroviseur intérieur en position 'nuit'.", options: ["Actionner le petit levier ou système automatique", "Le tourner vers le haut", "Fermer les yeux", "Utiliser la commande électrique"], correct: 0 },
    { id: 103, question_number: 3, question_text: "Actionnez les essuie-glaces avants.", options: ["Utiliser la commande sur le commodo de droite", "Utiliser le commodo de gauche", "Appuyer sur un bouton central", "C'est automatique uniquement"], correct: 0 },
    { id: 104, question_number: 4, question_text: "Montrez l'indicateur de niveau de carburant.", options: ["Cadran ou barre sur le tableau de bord", "Sous le volant", "Sur l'autoradio", "À côté du compte-tours"], correct: 0 },
    { id: 105, question_number: 5, question_text: "Montrez le voyant d'alerte de pression d'huile.", options: ["Témoin rouge représentant une burette d'huile", "Témoin orange de moteur", "Témoin bleu", "Aiguille de température"], correct: 0 },
    { id: 106, question_number: 6, question_text: "Actionnez les feux de détresse (warning).", options: ["Appuyer sur le bouton rouge avec triangle blanc", "Actionner les deux clignotants", "Appuyer sur le klaxon", "Appuyer deux fois sur le frein"], correct: 0 },
    { id: 107, question_number: 7, question_text: "Montrez la commande de réglage du volant.", options: ["Dégager le levier sous ou côté colonne de direction", "Bouton sur le volant", "Sur le siège", "C'est fixe sur tous les modèles"], correct: 0 },
    { id: 108, question_number: 8, question_text: "Positionnez la commande pour diriger l'air vers le pare-brise.", options: ["Sélecteur de ventilation sur le pictogramme pare-brise", "Ouvrir les buses centrales", "Allumer le recyclage d'air", "Actionner le dégivrage arrière"], correct: 0 },
    { id: 109, question_number: 9, question_text: "Montrez le voyant d'alerte de charge batterie.", options: ["Pictogramme rouge en forme de pile/batterie (+/-)", "Une petite lumière jaune", "Le symbole du moteur", "Un éclair bleu"], correct: 0 },
    { id: 110, question_number: 10, question_text: "De quelle couleur est le voyant défaillance freinage ?", options: ["Rouge", "Orange", "Bleu", "Jaune"], correct: 0 },
    { id: 111, question_number: 11, question_text: "Montrez le voyant de température liquide refroidissement.", options: ["Pictogramme rouge de thermomètre sur l'eau", "L'aiguille de carburant", "Le témoin de batterie", "Le symbole de l'huile"], correct: 0 },
    { id: 112, question_number: 12, question_text: "Où se situe la commande du régulateur de vitesse ?", options: ["Sur le volant ou commodo spécifique", "Près de la pédale d'accélérateur", "Sur le levier de vitesse", "Dans le menu multimédia exclusif"], correct: 0 },
    { id: 113, question_number: 13, question_text: "Désignez la commande de l'avertisseur sonore (klaxon).", options: ["Centre du volant ou bout d'un commodo", "Une pédale spécifique", "Un bouton sur la portière", "Derrière le rétroviseur"], correct: 0 },
    { id: 114, question_number: 14, question_text: "Montrez la commande de désactivation de l'airbag passager.", options: ["Interrupteur sur le côté du tableau de bord ou boîte à gants", "Bouton SOS", "Levier sous le siège", "C'est automatique via le poids"], correct: 0 },
    { id: 115, question_number: 15, question_text: "Montrez le voyant de ceinture de sécurité conducteur.", options: ["Pictogramme rouge d'un personnage avec ceinture", "Une lumière verte", "Le symbole d'un airbag", "Le témoin de freinage"], correct: 0 },
    { id: 116, question_number: 16, question_text: "Actionnez le dégivrage de la lunette arrière.", options: ["Bouton avec rectangle et flèches ondulées", "Bouton AC", "Tourner le chauffage au max", "Actionner l'essuie-glace arrière"], correct: 0 },
    { id: 117, question_number: 17, question_text: "Montrez le voyant des feux de route.", options: ["Témoin bleu sur le combiné", "Témoin vert", "Témoin orange", "Aucun voyant"], correct: 0 },
    { id: 118, question_number: 18, question_text: "Montrez la commande de recyclage de l'air.", options: ["Bouton avec voiture et flèche tournante", "Bouton Air", "Bouton de ventilation", "Bouton de climatisation"], correct: 0 },
    { id: 119, question_number: 19, question_text: "Comment régler la hauteur de l'appui-tête conducteur ?", options: ["Appuyer sur le déverrouillage et faire coulisser", "Tourner l'appui-tête", "C'est fixe", "Il faut une clé"], correct: 0 },
    { id: 120, question_number: 20, question_text: "Actionnez les feux de brouillard arrière.", options: ["Utiliser la bague ou bouton spécifique sur le commodo de phares", "Ils s'allument avec les pleins phares", "Appuyer sur le frein", "C'est automatique"], correct: 0 },
    { id: 121, question_number: 21, question_text: "Actionnez le limiteur de vitesse si équipé.", options: ["Interrupteur sur le volant ou console centrale", "Appuyer fort sur le frein", "Lever le pied de l'accélérateur", "Appuyer sur l'embrayage"], correct: 0 },
    { id: 122, question_number: 22, question_text: "Faites fonctionner l'essuie-glace arrière.", options: ["Bout de commande sur le commodo de droite", "Commodo de gauche", "Bouton au tableau de bord", "C'est couplé à l'avant"], correct: 0 },
    { id: 123, question_number: 23, question_text: "Montrez le voyant de baisse de pression d'un pneu.", options: ["Pictogramme jaune pneu dégonflé avec point d'exclamation", "Témoin de frein", "Symbole de burette", "Indicateur de vitesse"], correct: 0 },
    { id: 124, question_number: 24, question_text: "Indiquez où se situent les attaches de type Isofix.", options: ["Entre le dossier et l'assise des sièges arrière", "Dans le coffre uniquement", "Sur le pavillon", "Sous les tapis de sol"], correct: 0 },
    { id: 125, question_number: 25, question_text: "Dégagez la commande d'ouverture du capot moteur.", options: ["Tirer la manette située en bas à gauche de la planche de bord", "Pousser le sigle de la marque", "Appuyer sur la clé", "Tirer une corde dans le coffre"], correct: 0 }
  ],
  'QSER': [ // QSER - Questions de Sécurité Routière
    { id: 201, question_number: 1, question_text: "Pourquoi doit-on régler la hauteur des feux ?", options: ["Pour ne pas éblouir les autres usagers", "Pour mieux voir les étoiles", "Pour économiser l'énergie", "Pour le design"], correct: 0 },
    { id: 202, question_number: 2, question_text: "Quel est l'intérêt de la position nuit du rétroviseur ?", options: ["Ne pas être ébloui par les feux du véhicule suiveur", "Mieux voir la nuit", "Rendre la voiture plus sombre", "Réduire la consommation"], correct: 0 },
    { id: 203, question_number: 3, question_text: "Où peut-on trouver les pressions préconisées des pneus ?", options: ["Portière, notice ou trappe à carburant", "Sur la batterie", "Sur le tableau de bord", "Dans le coffre"], correct: 0 },
    { id: 204, question_number: 4, question_text: "Comment détecter l'usure des essuie-glaces en circulation ?", options: ["Ils laissent des traces sur le pare-brise", "Ils font du bruit", "Ils bougent moins vite", "Le voyant s'allume"], correct: 0 },
    { id: 205, question_number: 5, question_text: "Précautions à prendre avec un porte-vélo ?", options: ["La plaque et les feux doivent rester visibles", "Aucune précaution particulière", "Il faut rouler moins vite", "Il faut allumer les warnings"], correct: 0 },
    { id: 206, question_number: 6, question_text: "Conséquence d'un niveau de liquide de frein insuffisant ?", options: ["Perte d'efficacité du freinage", "Le moteur s'arrête", "Les pneus s'usent", "La batterie se décharge"], correct: 0 },
    { id: 207, question_number: 7, question_text: "Quelles précautions lors du remplissage du réservoir ?", options: ["Moteur coupé, ne pas fumer, ne pas téléphoner", "Juste éteindre la radio", "Juste fermer les fenêtres", "Aucune précaution"], correct: 0 },
    { id: 208, question_number: 8, question_text: "Quel est le risque de circuler avec des balais d'essuie-glace défectueux ?", options: ["Mauvaise visibilité en cas d'intempéries", "Rayure du pare-brise uniquement", "Amende seulement", "Ils ne s'arrêteront plus"], correct: 0 },
    { id: 209, question_number: 9, question_text: "Risque de compléter le liquide de refroidissement moteur chaud ?", options: ["Risque de brûlures graves (vapeur/eau)", "Risque d'explosion du moteur", "Risque de casser le réservoir", "Aucun risque"], correct: 0 },
    { id: 210, question_number: 10, question_text: "Conséquence d'une panne de dégivrage de la lunette arrière ?", options: ["Insuffisance ou absence de visibilité vers l'arrière", "Rien d'important", "La voiture ne démarre plus", "Risque de court-circuit"], correct: 0 },
    { id: 211, question_number: 11, question_text: "Signification d'un clignotement plus rapide des clignotants ?", options: ["Non fonctionnement d'une des ampoules", "Batterie bientôt vide", "C'est normal", "On roule trop vite"], correct: 0 },
    { id: 212, question_number: 12, question_text: "Conditions pour contrôler le niveau d'huile moteur ?", options: ["Moteur froid et sur un terrain plat", "Moteur chaud", "En roulant", "En pente pour que tout l'huile descende"], correct: 0 },
    { id: 213, question_number: 13, question_text: "Dans quels cas utilise-t-on les feux de brouillard arrière ?", options: ["Brouillard et neige uniquement", "Forte pluie et neige", "Tout le temps", "La nuit sur autoroute"], correct: 0 },
    { id: 214, question_number: 14, question_text: "À partir de quel taux d'alcoolémie est-on en infraction (probatoire) ?", options: ["0,2 g/l de sang (zéro verre)", "0,5 g/l", "0,8 g/l", "0,1 g/l"], correct: 0 },
    { id: 215, question_number: 15, question_text: "Dans quel cas utilise-t-on les feux de détresse ?", options: ["Panne, accident ou ralentissement important", "Pour se garer en double file", "Pour dire merci", "Dans le brouillard"], correct: 0 },
    { id: 216, question_number: 16, question_text: "Conséquences d'un mauvais réglage des feux de croisement ?", options: ["Mauvaise vision et risque d'éblouissement", "Le moteur chauffe", "La voiture consomme plus", "Les ampoules grillent vite"], correct: 0 },
    { id: 217, question_number: 17, question_text: "Cas d'utilisation d'un appel lumineux ?", options: ["Avertir de son approche, danger ou à la place du klaxon", "Pour saluer quelqu'un", "Pour forcer le passage", "Juste la nuit"], correct: 0 },
    { id: 218, question_number: 18, question_text: "Conséquence d'une température trop élevée du liquide de refroidissement ?", options: ["Surchauffe ou casse moteur", "L'habitacle est plus chaud", "Rien de spécial", "Le chauffage ne marche plus"], correct: 0 },
    { id: 219, question_number: 19, question_text: "Risque de rouler avec un frein de parking mal desserré ?", options: ["Dégradation du système de freinage", "La voiture va plus vite", "On consomme moins", "C'est sans risque"], correct: 0 },
    { id: 220, question_number: 20, question_text: "Utilité des dispositifs réfléchissants ?", options: ["Rendre le véhicule visible la nuit", "Faire joli", "Indiquer la largeur", "C'est obligatoire uniquement pour les camions"], correct: 0 },
    { id: 221, question_number: 21, question_text: "Précautions enfant à l'arrière pour les portières ?", options: ["Actionner la sécurité enfant", "Fermer les vitres", "Verrouiller les portes de l'avant", "Pas de précaution nécessaire"], correct: 0 },
    { id: 222, question_number: 22, question_text: "Distance visible des feux de position par temps clair ?", options: ["150 mètres", "50 mètres", "300 mètres", "1 kilomètre"], correct: 0 },
    { id: 223, question_number: 23, question_text: "Qu'est-ce que l'aquaplanage ?", options: ["Film d'eau entre pneu et route entraînant perte de contrôle", "Nettoyage automatique des roues", "Conduite sous la pluie", "Franchissement d'un gué"], correct: 0 },
    { id: 224, question_number: 24, question_text: "Comment désactiver rapidement le régulateur de vitesse ?", options: ["Appuyer sur le frein ou l'embrayage", "Éteindre le moteur", "Ouvrir la porte", "Attendre qu'il s'arrête"], correct: 0 },
    { id: 225, question_number: 25, question_text: "Risque de circuler avec des objets sur la plage arrière ?", options: ["Mauvaise visibilité et risque de projection au freinage", "Ça décore la voiture", "Pas de risque particulier", "C'est interdit par la loi"], correct: 0 }
  ],
  'PS': [ // PS - Premiers Secours
    { id: 301, question_number: 1, question_text: "Pourquoi protéger une zone de danger en cas d'accident ?", options: ["Pour protéger les victimes et éviter un sur-accident", "Pour garder la place", "Pour attendre les journalistes", "On ne doit pas protéger"], correct: 0 },
    { id: 340, question_number: 2, question_text: "Comportement si signal SAIP (sirène) ?", options: ["Se mettre en sécurité, s'informer, respecter les consignes", "Sortir pour voir", "Prendre sa voiture", "Appeler les pompiers immédiatement sans bouger"], correct: 0 },
    { id: 303, question_number: 3, question_text: "Sur autoroute, comment indiquer les lieux de l'accident ?", options: ["Numéro autoroute, sens de circulation et point kilométrique", "Dire qu'on est près d'un arbre", "Donner le nom de la ville la plus proche seulement", "Utiliser la boussole"], correct: 0 },
    { id: 304, question_number: 4, question_text: "Comment vérifier la respiration d'une victime ?", options: ["Regarder si le ventre se soulève et sentir l'air", "Lui parler", "Lui pincer le bras", "Attendre 10 minutes"], correct: 0 },
    { id: 305, question_number: 5, question_text: "Qu'est-ce qu'une perte de connaissance ?", options: ["Victime qui ne répond pas mais respire", "Victime qui dort", "Victime qui a mal", "Victime qui crie"], correct: 0 },
    { id: 306, question_number: 6, question_text: "Où déplacer une victime si nécessaire (danger immédiat) ?", options: ["Dans un endroit éloigné du danger et sécurisé", "La laisser au milieu de la route", "La mettre dans sa voiture", "Derrière le triangle"], correct: 0 },
    { id: 307, question_number: 7, question_text: "Pourquoi l'alerte aux secours doit être rapide et précise ?", options: ["Pour apporter les moyens adaptés le plus vite possible", "Pour ne pas payer l'appel", "Pour être premier sur la liste", "Pour rassurer les proches"], correct: 0 },
    { id: 308, question_number: 8, question_text: "Quels sont les numéros d'urgence à composer ?", options: ["18 (Pompiers), 15 (SAMU), 112 (Europe)", "17 uniquement", "911", "0800..."], correct: 0 },
    { id: 309, question_number: 9, question_text: "Actions pour une victime inconsciente qui respire ?", options: ["Position Latérale de Sécurité (PLS) et surveiller", "Massage cardiaque", "Lui donner à boire", "La laisser sur le dos"], correct: 0 },
    { id: 310, question_number: 10, question_text: "Comment arrêter une hémorragie ?", options: ["Appuyer fort sur la plaie avec doigt/paume et tissu propre", "Mettre de l'eau", "Secouer le membre", "Utiliser un garrot tout de suite"], correct: 0 },
    { id: 311, question_number: 11, question_text: "À partir de quel âge peut-on suivre une formation PSC1 ?", options: ["À partir de 10 ans", "À partir de 18 ans", "Dès la naissance", "À la retraite"], correct: 0 },
    { id: 312, question_number: 12, question_text: "Pourquoi pratiquer immédiatement une réanimation (arrêt cardiaque) ?", options: ["Les lésions du cerveau arrivent après quelques minutes", "Pour réchauffer la victime", "Pour qu'elle se réveille tout de suite", "C'est la loi"], correct: 0 },
    { id: 313, question_number: 13, question_text: "Pourquoi attendre l'autorisation pour raccrocher avec les secours ?", options: ["Ils peuvent nous guider dans les gestes à faire", "Pour qu'ils localisent l'appel", "Par politesse", "Pour payer la communication"], correct: 0 },
    { id: 314, question_number: 14, question_text: "Trois informations à transmettre aux secours ?", options: ["Numéro appelant, nature du problème, localisation précise", "Prénom, âge et marque de la voiture", "Heure, météo et trafic", "Rien, ils savent déjà"], correct: 0 },
    { id: 315, question_number: 15, question_text: "Risques pour une victime inconsciente sur le dos ?", options: ["Étouffement (langue ou liquides) et arrêt respiratoire", "Mal au cou", "Elle va avoir froid", "Elle va faire un cauchemar"], correct: 0 },
    { id: 316, question_number: 16, question_text: "Risque d'utiliser un DAE sur une victime qui n'est pas en arrêt ?", options: ["Aucun, le DAE ne se déclenche que si nécessaire", "Risque de l'électrocuter par erreur", "Le DAE va exploser", "La victime va se réveiller en sursaut"], correct: 0 },
    { id: 317, question_number: 17, question_text: "Qu'est-ce qu'une hémorragie ?", options: ["Perte de sang prolongée qui imbibe un mouchoir vite", "Une petite coupure", "Un bleu", "Une griffure"], correct: 0 },
    { id: 318, question_number: 18, question_text: "Signes d'un arrêt cardiaque ?", options: ["Ne répond pas, ne réagit pas, ne respire pas", "La victime dort profondément", "Elle a mal au bras", "Elle respire très vite"], correct: 0 },
    { id: 319, question_number: 19, question_text: "Qu'est-ce qu'un Défibrillateur Automatisé Externe (DAE) ?", options: ["Appareil pour rétablir une activité cardiaque normale", "Un chargeur de batterie", "Un tensiomètre", "Un assistant vocal"], correct: 0 },
    { id: 320, question_number: 20, question_text: "Objectif du signal national d'alerte (SAIP) ?", options: ["Avertir d'un danger imminent ou événement grave", "Informer des embouteillages", "Annoncer le début de l'école", "Donner le résultat des élections"], correct: 0 },
    { id: 321, question_number: 21, question_text: "Risque principal d'un arrêt cardiaque sans intervention ?", options: ["La mort de la victime en quelques minutes", "Une simple fatigue", "Une hospitalisation courte", "Aucun risque majeur"], correct: 0 },
    { id: 322, question_number: 22, question_text: "Que signifie 'Alerter, Masser, Défibriller' ?", options: ["Les trois étapes de secours pour un arrêt cardiaque", "Un slogan publicitaire", "Des exercices de sport", "Une méthode de relaxation"], correct: 0 },
    { id: 323, question_number: 23, question_text: "Peut-on déplacer une victime soi-même ?", options: ["Uniquement si danger réel, immédiat et non contrôlable", "Toujours pour l'aider", "Jamais", "Pour la mettre à l'ombre"], correct: 0 },
    { id: 324, question_number: 24, question_text: "Comment est composé le signal d'alerte SAIP par sirène ?", options: ["3 cycles successifs (alerte) et signal continu (fin)", "10 coups courts", "Une musique rythmée", "Un cri d'oiseau"], correct: 0 },
    { id: 325, question_number: 25, question_text: "Comment protéger une zone de danger ?", options: ["Délimiter largement et de façon visible la zone", "Mettre des fleurs", "Crier fort", "Rien, les gens voient bien"], correct: 0 }
  ]
};

const QuizPage = () => {
  const { categoryCode } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<any | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryCode) {
      const questions = LOCAL_QUESTIONS[categoryCode] || [];
      const categoryNames: { [key: string]: string } = {
        'VE': 'Vérifications Extérieures',
        'VI': 'Vérifications Intérieures',
        'QSER': 'Sécurité Routière',
        'PS': 'Premiers Secours'
      };

      setQuizData({
        category: {
          code: categoryCode,
          name: categoryNames[categoryCode] || categoryCode
        },
        questions,
        total: questions.length
      });
      setLoading(false);
    }
  }, [categoryCode]);

  const handleSubmit = () => {
    const results = {
      score: quizData.questions.filter((q: any) => answers[q.id] === q.correct).length,
      total_questions: quizData.total,
      passed: true,
      category: quizData.category,
      details: quizData.questions.map((q: any) => ({
        question_text: q.question_text,
        is_correct: answers[q.id] === q.correct,
        answerIndex: answers[q.id] ?? -1,
        correct_index: q.correct,
        options: q.options
      }))
    };
    navigate(`/quiz/results/${Date.now()}`, { state: { results } });
  };

  if (loading || !quizData) return <div className="p-20 text-center">Chargement...</div>;

  const currentQ = quizData.questions[currentIdx];

  const categoryName = quizData.category?.name ?? "Quiz";

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title={`Quiz ${categoryName} — Code de la route Smoni`}
        description={`Entraînez-vous gratuitement aux questions de ${categoryName.toLowerCase()} avec le quiz Smoni Auto-école. Préparation au permis B.`}
        canonicalPath={`/quiz/${categoryCode}`}
      />
      <Header />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Backoffice Navigation Style */}
          <div className="mb-6">
            <button onClick={() => navigate('/quiz')} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" /> Retour aux quiz
            </button>
            <h1 className="text-3xl font-semibold tracking-tight">{quizData.category.name}</h1>
          </div>

          {/* Original Card Design */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progression</span>
                  <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-full">{Math.round(((currentIdx + 1) / quizData.total) * 100)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500 rounded-full"
                    style={{ width: `${((currentIdx + 1) / quizData.total) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Question {currentIdx + 1} / {quizData.total}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-10 text-slate-900 leading-tight">
                {currentQ.question_text}
              </h2>

              <div className="grid gap-4 mb-12">
                {currentQ.options.map((opt: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: i }))}
                    className={`flex items-center p-5 rounded-xl border-2 transition-all text-left ${answers[currentQ.id] === i ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                  >
                    <div className={`h-6 w-6 rounded-full border-2 mr-4 flex items-center justify-center ${answers[currentQ.id] === i ? 'border-primary bg-primary' : 'border-slate-200'}`}>
                      {answers[currentQ.id] === i && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <span className="font-semibold text-slate-700">{opt}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-8 border-t">
                <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)} className="text-muted-foreground font-bold disabled:opacity-30">
                  Précédent
                </button>
                {currentIdx < quizData.total - 1 ? (
                  <button onClick={() => setCurrentIdx(prev => prev + 1)} disabled={answers[currentQ.id] === undefined} className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold shadow-sm">
                    Suivant
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={answers[currentQ.id] === undefined} className="bg-primary text-primary-foreground px-10 py-3 rounded-lg font-bold shadow-sm hover:opacity-90">
                    Terminer le quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <HomeNewStudentSection />
      <Footer />
    </div>
  );
};

export default QuizPage;
