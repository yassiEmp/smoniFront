export interface BlogTable {
  headers: string[];
  rows: string[][];
}

export interface BlogSection {
  title: string;
  content: string;
  secondContent?: string;
  iconName?: string; // Name of Lucide icon
  bullets?: string[];
  table?: BlogTable;
  tip?: {
    label: string;
    text: string;
  };
  quote?: {
    text: string;
    author: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "peur-mecanique",
    title: "Peur au Volant : Comprendre et Vaincre l'Anxiété",
    subtitle: "Pourquoi la peur mécanique est normale, comment elle fonctionne, et surtout comment s'en libérer durablement.",
    excerpt: "Plus de 20% des conducteurs souffrent de peur au volant. Ce guide décortique chaque source d'anxiété — des bruits du moteur à la pression des autres usagers — et propose un protocole concret en 12 étapes pour reprendre confiance.",
    category: "Conduite",
    date: "26 Avr 2026",
    readingTime: "15 min",
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=2000",
    author: { name: "SMONI Team", avatar: "S" },
    tags: ["Peur mécanique", "Amaxophobie", "Psychologie", "Maintenance", "Neurosciences"],
    featured: true,
    sections: [
      {
        title: "Introduction : Pourquoi avons-nous peur d'une machine ?",
        iconName: "Target",
        content: "La peur mécanique — ou amaxophobie — touche plus de 20% des conducteurs en Europe, et pourtant elle reste l'un des sujets les plus tabous de l'apprentissage. Ce n'est pas un manque de compétence ni de courage : c'est une réaction de survie parfaitement logique face à une machine de 1,5 tonne capable de se déplacer à 130 km/h. Votre cerveau reptilien perçoit la voiture comme une menace, et il a techniquement raison.",
        secondContent: "La différence entre un conducteur anxieux et un conducteur serein n'est pas génétique : c'est une question d'informations. Celui qui est à l'aise au volant a simplement appris le langage de la machine — ses bruits, ses sensations, ses limites. Chez Smoni, nous ne vous demandons pas d'ignorer votre peur. Nous vous apprenons à la décoder, à l'utiliser comme outil de vigilance, et à la remplacer progressivement par une confiance construite sur des faits concrets et des expériences réussies.",
        quote: {
          text: "La peur n'est pas votre ennemie. C'est un signal que votre cerveau envoie quand il manque d'informations. Donnez-lui les informations, et la peur se transforme en précision.",
          author: "Équipe pédagogique Smoni"
        },
      },
      {
        title: "Neurobiologie de l'Anxiété au Volant",
        iconName: "Brain",
        content: "Voici ce qui se passe dans les 200 millisecondes qui suivent un klaxon agressif ou une voiture qui surgit d'une rue : votre thalamus capte le signal, l'envoie à l'amygdale, et cette dernière déclenche une cascade de cortisol et d'adrénaline AVANT même que votre cortex préfrontal n'ait eu le temps de raisonner. C'est ce qu'on appelle le 'hijacking amygdalien'. Le résultat ? Vos mains serrent le volant, votre champ visuel se rétrécit, et vous avez l'impression de 'perdre vos moyens'.",
        secondContent: "Ce n'est pas de la faiblesse — c'est de la biologie pure. La bonne nouvelle est que le cerveau est plastique : ces circuits de peur peuvent être recâblés. Les neurosciences modernes ont prouvé qu'une exposition graduelle et contrôlée au stimulus anxiogène, combinée à des techniques de respiration cohérente (4 secondes inspiration, 6 secondes expiration), suffit à réduire significativement l'activité de l'amygdale en 4 à 6 semaines. C'est exactement le protocole que nos moniteurs appliquent en session.",
        bullets: [
          "Le Thalamus : Le centre de tri des informations visuelles.",
          "L'Amygdale : Le bouton d'alarme qui déclenche la peur.",
          "L'Hippocampe : Le stockage des mauvais souvenirs (ex: un calage stressant).",
          "Le Cortex Préfrontal : La zone que nous devons réactiver par la logique."
        ]
      },
      {
        title: "Mécanique 101 : Ce qui se passe sous le capot",
        iconName: "Wrench",
        content: "Imaginez la peur du noir : elle disparaît dès qu'on allume la lumière. La peur mécanique fonctionne exactement de la même façon. La voiture n'est pas une boîte noire magique — c'est une suite de systèmes logiques, redondants, conçus avec des marges de sécurité considérables dès la conception.",
        secondContent: "Le moteur thermique suit un cycle en quatre temps (Admission, Compression, Explosion, Échappement) qui se répète 800 fois par minute au ralenti. Il est dimensionné pour encaisser des surcharges bien supérieures à celles qu'un conducteur occasionnel peut lui infliger. Le circuit de refroidissement régule sa température. Le système de lubrification protège ses pièces internes. La transmission convertit la force en mouvement avec une précision mécanique. Comprendre ces systèmes, c'est réaliser que votre voiture veut rouler — et qu'elle est conçue pour vous protéger, pas pour vous trahir.",
        bullets: [
          "Le circuit de refroidissement : Pourquoi votre voiture ne peut pas 'fondre'.",
          "Le système de lubrification : Le rôle vital de l'huile moteur.",
          "La transmission : Comment les engrenages transforment la force en mouvement.",
          "L'embrayage : Pourquoi il est physiquement impossible de 'casser' la voiture en calant."
        ]
      },
      {
        title: "La Physique du Freinage : Pourquoi vous ne raterez jamais un arrêt",
        iconName: "Zap",
        content: "La peur de 'ne pas pouvoir s'arrêter' est la plus répandue chez nos élèves — et la plus facile à démystifier avec un peu de physique. Votre système de freinage est en réalité double : deux circuits hydrauliques indépendants alimentent respectivement les roues avant et arrière. Si l'un tombe en panne, l'autre fonctionne toujours. L'ABS pulse les freins jusqu'à 20 fois par seconde pour éviter le blocage des roues.",
        secondContent: "Le frein à main mécanique, totalement indépendant du circuit hydraulique, constitue un troisième niveau de sécurité. Sur les véhicules récents, le freinage d'urgence automatique (AEB) peut déclencher un arrêt complet sans intervention du conducteur si un obstacle est détecté. En résumé : pour qu'une voiture moderne perde toute capacité de freinage, il faudrait une défaillance simultanée de cinq systèmes indépendants. La probabilité est statistiquement inférieure à celle d'être frappé par la foudre deux fois de suite.",
        table: {
          headers: ["Composant", "Rôle", "Sécurité intégrée"],
          rows: [
            ["Liquide de frein", "Transmet la pression", "Incompressible et résistant à la chaleur"],
            ["Plaquettes", "Créent la friction", "Témoin d'usure sonore (sifflement)"],
            ["ABS", "Empêche le blocage", "Permet de diriger pendant le freinage"],
            ["Frein à main", "Système de secours", "Indépendant du circuit hydraulique principal"]
          ]
        }
      },
      {
        title: "Le Langage des Sons : Votre voiture vous parle",
        iconName: "Volume2",
        content: "Votre voiture communique en permanence — mais seulement avec ceux qui savent écouter. La grande majorité des bruits inquiétants que perçoivent les conducteurs anxieux sont parfaitement normaux : le turbo qui siffle à l'accélération, les injecteurs qui claquent à froid, les disques qui grincent légèrement après une nuit humide.",
        secondContent: "Paniquer à chaque son inhabituel, c'est comme appeler les urgences à chaque battement de cœur légèrement plus fort. Apprendre à catégoriser les bruits en trois niveaux — normal, à surveiller, urgent — transforme radicalement votre rapport à la conduite. Le sifflement du turbo ? Signe de santé. Un grincement métallique régulier lors du freinage ? Plaquettes à prévoir dans les prochaines semaines, rien d'urgent. Un claquement fort et soudain sous le capot à froid ? À signaler au garagiste mais pas une raison de paniquer sur la route. Un conducteur qui lit ses bruits ne stresse plus : il diagnostique.",
        bullets: [
          "Sifflement turbo : Normal à l'accélération, signe de santé.",
          "Grincement métallique : Plaquettes à changer prochainement.",
          "Vrombissement sourd : Roulement de roue fatigué, rien de dangereux immédiatement.",
          "Claquement régulier : Souvent lié aux injecteurs ou aux soupapes, à vérifier sans urgence."
        ]
      },
      {
        title: "Psychologie Appliquée : Sortir de la 'Vision Tunnel'",
        iconName: "Activity",
        content: "Sous l'effet du stress, votre champ visuel se rétrécit de manière mesurable — c'est le phénomène de 'vision tunnel'. Là où un conducteur détendu balaye naturellement 180° d'information visuelle, un conducteur anxieux peut se focaliser sur un seul point devant lui, ignorant les rétroviseurs, les côtés et le comportement des autres véhicules.",
        secondContent: "C'est paradoxalement cette focalisation qui augmente le risque réel d'accident. Les techniques oculaires que nous enseignons chez Smoni — le balayage en Z, la règle des 15 secondes, l'ancrage au sol par les ombres des véhicules — ne sont pas de simples gadgets pédagogiques. Elles envoient un signal de sécurité direct à votre système nerveux autonome, réduisant le cortisol en temps réel et restaurant votre capacité de traitement visuel périphérique. En pratique : les élèves qui maîtrisent ces techniques voient leur niveau de stress objectif chuter de 40% en seulement trois sessions.",
        bullets: [
          "La règle des 15 secondes : Regardez là où vous serez dans 15 secondes.",
          "Le balayage latéral : Un coup d'œil aux rétros toutes les 8 secondes.",
          "L'ancrage au sol : Vérifier les ombres des autres véhicules pour anticiper leurs mouvements.",
          "La lecture des indices : Un ballon sur la route = un enfant qui arrive."
        ]
      },
      {
        title: "Gestion des Passagers et de l'Environnement Social",
        iconName: "UserCheck",
        content: "Personne ne vous dit que la peur sociale — la peur d'être klaxonné, jugé, de caler au feu, de bloquer la circulation — est souvent plus paralysante que la peur de l'accident lui-même. Nos élèves le confirment systématiquement lors des bilans de première séance : c'est le klaxon derrière eux, pas le camion en face, qui les fait perdre leurs moyens.",
        secondContent: "Cette peur-là est 100% psychologique et 100% traitable. Nous travaillons en session sur le 'bouclier mental' : l'art de rester dans sa bulle, de percevoir les autres usagers comme de simples obstacles physiques plutôt que comme des juges. Nous abordons aussi la gestion du passager anxiogène — ce proche bien intentionné qui commente chaque manœuvre et multiplie votre stress par deux. Et surtout, nous normalisons l'erreur publique : caler au feu rouge n'est pas une honte, c'est un événement mécanique ordinaire qui arrive à tous les conducteurs, même expérimentés.",
        bullets: [
          "Le 'bouclier mental' : Votre voiture est votre espace, les autres sont des obstacles extérieurs.",
          "L'autocollant 'A' : Une protection légale qui appelle à la patience.",
          "Le passager toxique : Apprendre à demander le silence en situation complexe.",
          "L'erreur publique : Caler au feu vert n'est pas une honte, c'est un droit."
        ]
      },
      {
        title: "L'Autoroute : Dompter la Vitesse",
        iconName: "Maximize",
        content: "Contre-intuitif mais statistiquement prouvé : l'autoroute est la voie de circulation la plus sûre qui existe. Avec 0,4 mort pour 100 millions de kilomètres parcourus, contre 3,5 en zone urbaine, elle est statistiquement 8 fois moins meurtrière que la ville. Ce qui effraie les conducteurs anxieux, c'est la vitesse perçue — pas la vitesse réelle.",
        secondContent: "Depuis l'habitacle d'une voiture moderne, 130 km/h sur une voie droite avec une distance de sécurité adaptée est une situation parfaitement maîtrisable. La piste cyclable du dimanche matin est objectivement plus dangereuse. Nous décomposons l'insertion sur voie rapide, le maintien de couloir et le dépassement en micro-étapes praticables progressivement. Objectif : que votre premier trajet autoroutier soit une expérience positive, pas un traumatisme. Nous choisissons les heures creuses, les portions droites, et nous sommes à vos côtés le temps qu'il faut.",
        bullets: [
          "La voie d'insertion : Utiliser toute sa longueur pour égaliser les vitesses.",
          "L'effet d'aspiration : Comprendre les flux d'air entre les camions.",
          "La distance de sécurité : La règle des deux secondes (ou deux traits de bande d'arrêt d'urgence).",
          "L'anticipation des sorties : Se placer 2km avant pour éviter les manœuvres brusques."
        ]
      },
      {
        title: "Protocole de Désensibilisation : 12 Étapes vers l'Autonomie",
        iconName: "ClipboardCheck",
        content: "La désensibilisation progressive est la technique thérapeutique la plus validée scientifiquement contre toutes les formes de phobies spécifiques. Le principe est d'une simplicité désarmante : exposer votre cerveau au stimulus anxiogène dans un contexte parfaitement contrôlé et sécurisant, jusqu'à ce qu'il enregistre que le danger perçu n'est pas réel.",
        secondContent: "Appliquée à la conduite automobile, cette approche produit des résultats remarquables en 4 à 6 semaines. Le protocole ci-dessous est notre méthode maison, affinée au fil de 15 années de pratique et de centaines d'élèves accompagnés. La règle d'or : ne brûlez aucune étape. Chaque réussite, même minuscule, libère de la dopamine et crée un souvenir positif associé à la conduite. Ces souvenirs s'accumulent, reconfigurent votre mémoire émotionnelle, et finissent par étouffer les anciens souvenirs négatifs. C'est lent, mais c'est durable.",
        table: {
          headers: ["Étape", "Action", "Objectif Psychologique"],
          rows: [
            ["1", "S'asseoir dans la voiture sans démarrer", "Réappropriation de l'espace"],
            ["2", "Démarrer le moteur à l'arrêt", "Apprivoiser le son et les vibrations"],
            ["3", "Faire 10m sur un parking", "Maîtrise du point de patinage"],
            ["4", "Faire le tour du quartier (dimanche matin)", "Confrontation à l'environnement réel calme"],
            ["5", "Prendre un passager bienveillant", "Gestion de l'aspect social"],
            ["6", "Conduire sous une pluie légère", "Adaptation aux conditions variables"],
            ["7", "Aller chercher le pain seul", "Première mission d'utilité"],
            ["8", "Traverser un grand carrefour", "Gestion de la complexité"],
            ["9", "Prendre une voie rapide (1 sortie)", "Gestion de la vitesse"],
            ["10", "Conduire de nuit en ville", "Gestion de la visibilité réduite"],
            ["11", "Faire un trajet de 1h", "Endurance mentale"],
            ["12", "Conduire dans une ville inconnue avec GPS", "Autonomie totale"]
          ]
        }
      },
      {
        title: "FAQ : Les réponses à vos peurs les plus profondes",
        iconName: "HelpCircle",
        content: "Après 15 ans de formation et des centaines d'élèves accompagnés, nous avons entendu toutes les questions — y compris celles que personne n'ose formuler à voix haute. Ces angoisses sont universelles, légitimes, et elles ont toutes une réponse technique précise et rassurante.",
        secondContent: "Nous avons sélectionné les quatre questions les plus fréquentes, celles qui expriment les peurs les plus profondes. Elles méritent des réponses franches, sans condescendance. La mécanique automobile est un domaine rationnel et prévisible : une fois que vous en comprenez les règles, les pires scénarios imaginaires s'effacent d'eux-mêmes. Lisez ces réponses attentivement — et revenez-y chaque fois que l'inquiétude revient.",
        bullets: [
          "Puis-je faire exploser le moteur en me trompant de vitesse ? Non, les limiteurs électroniques protègent la mécanique.",
          "Que se passe-t-il si je cale sur une voie ferrée ? Gardez votre calme, redémarrez, le moteur repartira immédiatement.",
          "Et si mon frein à main ne tient pas en côte ? Le frein à pied est 10 fois plus puissant, il prendra le relais.",
          "Pourquoi ma jambe tremble-t-elle sur l'embrayage ? C'est une réaction physiologique au stress, respirez et posez le talon au sol."
        ]
      },
      {
        title: "Conclusion : La route est à vous",
        iconName: "Compass",
        content: "Vaincre la peur mécanique n'est pas une fin en soi — c'est le commencement d'une liberté nouvelle. La liberté de partir en week-end spontanément, d'accepter le poste qui nécessite de se déplacer, d'aller chercher ses proches sans dépendre de personne. Ces libertés concrètes, nos élèves les décrivent comme une transformation de vie, pas juste de conduite.",
        secondContent: "Avec la méthode Smoni, vous ne devenez pas seulement un conducteur compétent : vous devenez quelqu'un qui comprend sa machine, qui lit la route, qui gère ses émotions au volant avec la même fluidité qu'un musicien joue ses gammes. Chaque conducteur que nous avons accompagné a eu son moment de bascule — ce premier trajet où, soudain, tout s'est mis en place naturellement. Ce moment vous attend. Il ne tient qu'à vous de faire le premier pas.",
        tip: {
          label: "LE MOT DE LA FIN",
          text: "La confiance ne vient pas de l'absence de peur, mais de la certitude que vous avez les outils pour gérer l'imprévu. Vous êtes capable."
        }
      }
    ]
  },
  {
    slug: "reussir-le-code-en-ligne",
    title: "Réussir le Code de la Route du Premier Coup",
    subtitle: "Les 10 thèmes décortiqués, les pièges classiques de l'examen et la méthode pour viser le 40/40.",
    excerpt: "L'examen du code a changé : nouvelles questions, nouvelles thématiques. Ce guide passe en revue chaque thème officiel, vous apprend à lire les photos d'examen et vous donne un planning de révision sur 30 jours.",
    category: "Code",
    date: "26 Avr 2026",
    readingTime: "12 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Julie Durand", avatar: "JD" },
    tags: ["Code de la route", "E-learning", "Réforme 2026", "Sécurité", "Examen"],
    sections: [
      {
        title: "La Nouvelle Banque de Questions 2026 : Ce qui change vraiment",
        iconName: "ShieldAlert",
        content: "Le Ministère de l'Intérieur a injecté 1200 nouvelles questions centrées sur la 'cohabitation'. L'objectif n'est plus de tester si vous connaissez la vitesse limite sur autoroute sous la pluie — mais si vous savez protéger un cycliste qui change de file sans clignotant, ou céder le passage à un piéton qui n'a pas encore posé le pied sur le passage clouté.",
        secondContent: "Ce changement de paradigme est profond. L'examen 2026 ne teste plus des réflexes mécanisés mais une intelligence de la route. Les candidats qui échouent sont souvent ceux qui ont appris les 'bonnes réponses' par cœur sans comprendre le 'pourquoi' derrière chaque règle. Chez Smoni, nous partons toujours de la logique : si vous comprenez pourquoi une règle existe, vous n'avez plus besoin de la mémoriser. Elle devient du bon sens.",
      },
      {
        title: "Les 10 Thèmes Officiels Décortiqués",
        iconName: "Book",
        content: "Chaque série d'examen est une répartition stratégique de thèmes. Connaître cette architecture vous donne un avantage considérable : vous pouvez concentrer 80% de vos révisions sur les thèmes qui rapportent le plus de points et où se cachent les pièges les plus redoutables.",
        secondContent: "Le tableau ci-dessous détaille les 10 thèmes officiels, le nombre de questions par thème, leur niveau de difficulté réelle et le point-clé à maîtriser absolument. Notez que les thèmes S (Secours) et U (Usagers vulnérables) sont les plus piégés malgré leur faible volume. Un seul faux pas sur ces thèmes peut coûter l'épreuve.",
        table: {
          headers: ["Thème", "Nombre de Questions", "Difficulté perçue", "Point clé"],
          rows: [
            ["L : La circulation routière", "10", "Moyenne", "Signalisation et intersections"],
            ["C : Le conducteur", "10", "Basse", "État physique et perception"],
            ["R : La route", "4", "Moyenne", "Conditions dégradées (nuit, pluie)"],
            ["U : Les autres usagers", "4", "Haute", "Usagers vulnérables et partage"],
            ["D : Notions diverses", "3", "Basse", "Documents administratifs"],
            ["S : Premiers secours", "3", "Haute", "Protocole PAS et protection"],
            ["P : Précautions en quittant le véhicule", "3", "Basse", "Sécurité des passagers"],
            ["M : Mécanique et équipements", "3", "Moyenne", "Entretien et voyants"],
            ["E : Éco-mobilité / Éco-conduite", "3", "Moyenne", "Économie de carburant"],
            ["S : Sécurité du véhicule", "3", "Basse", "Aides à la conduite (ADAS)"]
          ]
        }
      },
      {
        title: "Usagers Vulnérables : Le Nouveau Coeur du Code",
        iconName: "Bike",
        content: "La loi Laure et ses amendements successifs ont fondamentalement recentré le code autour des usagers les plus vulnérables. En 2026, un refus de priorité à un cycliste ou un piéton constitue une faute grave à l'examen — et un retrait de 6 points dans la réalité. Les nouvelles signalisations se multiplient dans les villes.",
        secondContent: "Ce changement reflète une mutation profonde de la vision de la route : l'automobile n'est plus reine. Apprendre à identifier une zone de rencontre (pictogramme spécifique), à gérer un double-sens cyclable sans paniquer, et à respecter l'espace du sas vélo aux feux n'est pas optionnel. Ce sont des points 'offerts' à l'examen si vous les connaissez, et des pièges fatals si vous ne les avez pas étudiés.",
        bullets: [
          "Les Zones de Rencontre : Priorité absolue aux piétons, vitesse limitée à 20km/h.",
          "Le double-sens cyclable : Pourquoi il existe et comment le gérer sans stress.",
          "Les EDPM : Réglementation stricte sur les trottoirs et les pistes cyclables.",
          "Le Sas Vélo : L'interdiction d'y mordre, même avec un pare-choc."
        ]
      },
      {
        title: "Éco-conduite et Mobilités Douces : Questions Gratuites ?",
        iconName: "Zap",
        content: "L'éco-conduite représente 3 questions qui semblent 'faciles' — mais seuls ceux qui en comprennent la logique sous-jacente les réussissent systématiquement. La clé : choisir toujours la réponse la plus fluide, la moins consommatrice en énergie, et la plus respectueuse de l'environnement sonore et atmosphérique.",
        secondContent: "L'erreur classique est de raisonner en termes de 'vitesse maximale autorisée' plutôt qu'en termes de 'comportement optimal'. Par exemple : dans une zone 50, la bonne réponse n'est jamais 'd'accélérer jusqu'à 50' mais 'd'adapter sa vitesse à la situation'. L'éco-conduite au code, c'est l'art du juste assez — ni trop, ni trop peu. Trois questions bien préparées peuvent faire la différence entre 35 et 38 points.",
        bullets: [
          "Le passage de rapport : Passer la vitesse supérieure dès 2000 tr/min.",
          "Le Stop & Start : Utilité réelle pour la réduction des émissions en ville.",
          "L'anticipation : Pourquoi lever le pied est plus efficace que de freiner.",
          "Les aides à la conduite : Limiteur vs Régulateur pour l'économie."
        ]
      },
      {
        title: "Méthode d'Analyse Neurologique des Photos d'Examen",
        iconName: "Maximize",
        content: "Votre cerveau est évolutionnairement programmé pour fixer le centre d'une image. L'examen du code est conçu par des psychologues qui le savent parfaitement — et qui placent les éléments déterminants dans les coins, les bords, les ombres. Nous formons nos élèves à la 'Vision Périphérique Active' : une technique de lecture d'image empruntée à la radiologie et adaptée à l'examen du code.",
        secondContent: "En pratique, cela signifie analyser la photo en balayage systématique : d'abord le fond (autoroute ? ville ? campagne ?), ensuite la signalisation (panneaux, marquages), puis les usagers présents (où sont-ils, vers où vont-ils ?), enfin la situation de notre véhicule (dans les rétroviseurs, sur quelle voie). Cette grille de lecture, appliquée en 8 secondes, élimine 90% des erreurs d'interprétation. Nos élèves passent de 30 à 38 points en moyenne après 2 semaines d'entraînement.",
        bullets: [
          "Le balayage en 'Z' : De haut en bas, de gauche à droite.",
          "La lecture des rétros : Toujours vérifier si quelqu'un nous dépasse avant de répondre 'Oui' à un changement de direction.",
          "L'analyse des indices formels : La couleur d'un panneau, la forme d'un marquage.",
          "Le contexte global : Est-on en ville, sur autoroute, ou en zone rurale ?"
        ]
      },
      {
        title: "Premiers Secours : Le Protocole PAS en Détail",
        iconName: "Activity",
        content: "En cas d'accident, les 60 premières secondes sont statistiquement les plus déterminantes pour la survie des victimes. En tant que premier témoin, vous êtes le premier maillon d'une chaîne de survie qui nécessite ordre et sang-froid. L'examen du code teste non seulement vos connaissances théoriques, mais aussi votre capacité à gérer une situation de crise.",
        secondContent: "Le protocole PAS (Protéger, Alerter, Secourir) est l'ossature de toute intervention. Chaque lettre représente une priorité absolue et un ordre impératif : on ne secourt pas avant d'avoir protégé, on n'alerte pas avant d'avoir protégé. Comprendre le 'pourquoi' de cet ordre — éviter que les secouristes ne deviennent eux-mêmes des victimes — vous permet de le retenir naturellement sans effort de mémorisation.",
        bullets: [
          "P - Protéger : Baliser la zone, mettre le gilet jaune, ne pas devenir une victime.",
          "A - Alerter : Appeler le 112 ou le 15 avec des informations précises (lieu, nombre de blessés).",
          "S - Secourir : Ne pas déplacer un blessé, ne pas donner à boire, couvrir et rassurer.",
          "L'usage du défibrillateur (DAE) : Pourquoi tout citoyen peut l'utiliser."
        ]
      },
      {
        title: "Technique de Mémorisation : Le Palais de Mémoire du Code",
        iconName: "Brain",
        content: "Apprendre par cœur les 1000 questions de la banque officielle est non seulement impossible en 30 jours — c'est aussi une stratégie perdante. Les concepteurs de l'examen renouvellent régulièrement les images et les formulations précisément pour piéger ceux qui ont mémorisé sans comprendre. La vraie méthode : maîtriser les 50 principes fondamentaux dont découlent toutes les réponses.",
        secondContent: "Pour les données chiffrées — distances d'arrêt, taux d'alcoólémie, vitesses limites — nous utilisons des techniques de mémorisation visuelle et des règles de calcul mental. Le tableau ci-dessous illustre la méthode du 'carré de la vitesse' pour mémoriser les distances d'arrêt sans effort. Une fois ce pattern compris, vous ne pourrez plus l'oublier, même sous stress.",
        table: {
          headers: ["Vitesse (km/h)", "Distance d'arrêt (m)", "Distance de sécurité (m)", "Astuce de calcul"],
          rows: [
            ["30", "9", "18", "3 x 3 pour arrêt / 3 x 6 pour sécu"],
            ["50", "25", "30", "5 x 5 pour arrêt / 5 x 6 pour sécu"],
            ["90", "81", "54", "9 x 9 pour arrêt / 9 x 6 pour sécu"],
            ["110", "121", "66", "11 x 11 pour arrêt / 11 x 6 pour sécu"],
            ["130", "169", "78", "13 x 13 pour arrêt / 13 x 6 pour sécu"]
          ]
        }
      },
      {
        title: "Alcool, Drogues et Médicaments : Le point légal",
        iconName: "ShieldAlert",
        content: "En 2026, les tests salivaires pour la détection de stupéfiants sont systématiques après tout accident matiériel, et les contrôles aléatoires se multiplient sur les routes. La tolérance zéro n'est plus un slogan : c'est la réalité juridique du conducteur français en 2026. Et l'examen du code le teste de manière très ciblée.",
        secondContent: "Comprendre comment l'alcool et les stupéfiants altèrent spécifiquement vos capacités — réduction du champ visuel, augmentation du temps de réaction, euphorie trompeuse, surestimation de ses capacités — n'est pas seulement utile pour l'épreuve. C'est une connaissance vitale. Les questions sur les médicaments (pictogrammes de niveaux 1, 2 et 3) sont fréquentes et très spécifiques : nous y consacrons une session complète.",
        bullets: [
          "Alcoolémie : 0.5 g/l (0.2 g/l pour les permis probatoires).",
          "Stupéfiants : Zéro tolérance, retrait immédiat du permis.",
          "Médicaments : Les 3 niveaux de danger (pictogrammes sur les boîtes).",
          "Calcul d'élimination : Pourquoi un café ou une douche froide ne servent à rien."
        ]
      },
      {
        title: "Le Planning de Révision 30 Jours : Jour après Jour",
        iconName: "Calendar",
        content: "La réussite au code n'est pas une question de talent — c'est une question d'organisation. Les élèves qui échouent ont presque toujours le même profil : ils ont révisé 'beaucoup' mais de manière aléatoire, sans progression structurée ni objectif mesurable. Ceux qui réussissent du premier coup ont suivi un plan.",
        secondContent: "Notre programme de 30 jours est conçu sur la base de la courbe d'Ebbinghaus (la courbe de l'oubli) et des principes de la répétition espacée. Chaque semaine a un objectif précis, mesurable, et les jours 29-30 sont sacrés : aucune question de code, aucun écran. Le cerveau consolide les apprentissages pendant le sommeil — le priver de repos à la veille de l'examen est la pire erreur que vous puissiez commettre.",
        bullets: [
          "Jours 1-5 : Lecture complète du livre de code et vidéos thématiques Smoni.",
          "Jours 6-12 : Séries thématiques de 20 questions (Focus sur les points faibles).",
          "Jours 13-20 : Séries de 40 questions (Analyse systématique des corrections).",
          "Jours 21-28 : Examens blancs intensifs (Objectif : 5 fautes max 5 fois de suite).",
          "Jours 29-30 : Repos total du cerveau et préparation mentale."
        ]
      },
      {
        title: "Inscriptions et ANTS : Le Guide Administratif",
        iconName: "ClipboardCheck",
        content: "Beaucoup de candidats perdent des semaines précieuses dans les méandres administratifs du système ANTS. Obtenir son numéro NEPH, constituer son dossier, choisir et réserver sa session d'examen : chaque étape a ses pièges et ses délais. Chez Smoni, nous vous guidons étape par étape pour que la bureaucratie ne soit jamais un obstacle à votre réussite.",
        secondContent: "Un élément souvent négligé : la date de votre session d'examen doit être réservée AVANT de commencer à réviser. Avoir un objectif daté transforme radicalement votre niveau de motivation et de discipline. Sans date fixe, les révisions s'étirent indéfinîrement. Avec une date dans 30 jours, chaque heure de travail a un sens concret et une urgence productive.",
        bullets: [
          "Le dossier ANTS : Les pièces justificatives indispensables.",
          "Le numéro NEPH : Pourquoi il est vital et comment l'activer.",
          "Réserver sa session : La Poste, Objectif Code, SGS... comment choisir ?",
          "Le coût : 30€ de redevance nationale, pas un centime de plus."
        ]
      },
      {
        title: "FAQ : Les questions que vous n'osez pas poser",
        iconName: "HelpCircle",
        content: "Voici les dernières questions que nos élèves posent avant l'épreuve. Des réponses directes, sans jargon juridique, pour que vous abordiez le jour J avec toutes les cartes en main.",
        secondContent: "La plus importante à retenir : le code de la route n'a pas de 'questions pièges' au sens manipulatoire du terme. Il a des questions qui nécessitent une lecture lente et attentive. La précipitation est l'ennemi numéro un. Prenez vos 20 secondes pour chaque question, relisez une fois, et faites confiance à vos acquis. La panique efface les connaissances que vous possédez pourtant bel et bien.",
        bullets: [
          "Combien de temps le code est-il valide ? 5 ans ou jusqu'à l'obtention du permis.",
          "Peut-on passer le code en candidat libre ? Oui, et Smoni vous accompagne pour le réussir.",
          "Y a-t-il des questions pièges ? Non, il y a des questions précises qui demandent une lecture attentive.",
          "Combien de fois peut-on le rater ? Autant de fois que nécessaire, mais avec nous, une fois suffira."
        ]
      }
    ]
  },
  {
    slug: "maitriser-les-ronds-points",
    title: "Ronds-points : Tout Comprendre pour ne Plus Hésiter",
    subtitle: "Priorités, choix de voie, clignotants et interactions avec les cyclistes — le guide complet.",
    excerpt: "Les giratoires font peur aux jeunes conducteurs, mais ils sont bien plus simples qu'ils n'en ont l'air. Cet article vous explique les vraies règles de priorité, le bon positionnement et les erreurs qui coûtent des points à l'examen.",
    category: "Conduite",
    date: "26 Avr 2026",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Marc Lefebvre", avatar: "ML" },
    tags: ["Ronds-points", "Sécurité", "Technique", "Législation", "Urbanisme"],
    sections: [
      {
        title: "Petite Histoire du Rond-Point : Une invention Européenne",
        iconName: "Compass",
        content: "Le premier rond-point moderne, tel qu'on le connaît aujourd'hui, est né en Grande-Bretagne en 1966 avec l'introduction de la priorité à l'anneau. La France a adopté ce modèle et l'a développé avec une constance remarquable : elle en possède aujourd'hui plus de 65 000, soit la plus grande densité au monde, loin devant ses voisins européens.",
        secondContent: "Cette prévalence n'est pas un hasard. Chaque giratoire installé en remplacement d'un carrefour à feux réduit le nombre d'accidents corporels de 40% en moyenne. Ils éliminent les chocs frontaux (impossibles dans un anneau) et remplacent les collisions à grande vitesse par des accrochages latéraux à basse vitesse. Comprendre cette logique sécuritaire fondamentale, c'est comprendre pourquoi la France en construit encore environ 1 000 nouveaux chaque année.",
      },
      {
        title: "Rond-point vs Sens Giratoire : Le Débat Légal",
        iconName: "ShieldAlert",
        content: "La confusion entre 'rond-point' et 'carrefour giratoire' n'est pas qu'une question de terminologie — c'est une question de règles de priorité radicalement différentes. En France, 99% des intersections circulaires sont des carrefours giratoires régis par l'Article R415-10 du Code de la route : la priorité appartient à ceux qui sont DÉJÀ dans l'anneau.",
        secondContent: "Le vrai 'rond-point' historique — comme la Place de l'Étoile à Paris — fonctionne encore selon la priorité à droite traditionnelle : celui qui entre est prioritaire sur celui qui est dans l'anneau. Confondre les deux systèmes est l'une des erreurs les plus dangereuses et les plus fréquentes. La règle mémori-aide : si vous voyez un panneau triangulaire avec des flèches circulaires (AB25), vous cédez le passage. S'il n'y en a pas, vous avez peut-être la priorité à droite.",
        bullets: [
          "Le panneau AB25 : Le triangle avec les flèches circulaires.",
          "La ligne d'effet : La ligne pointillée à l'entrée.",
          "Le panneau Cédez le passage : Obligation de laisser passer ceux venant de gauche.",
          "L'absence de panneaux : Signe d'un vrai rond-point (priorité à droite)."
        ]
      },
      {
        title: "L'Approche Stratégique : Anticiper pour ne pas s'arrêter",
        iconName: "Zap",
        content: "Le secret des conducteurs expérimentés : ils ne s'arrêtent presque jamais au giratoire. Pas parce qu'ils ignorent les règles, mais parce qu'ils anticipent suffisamment tôt pour régler leur vitesse et trouver leur fenêtre d'insertion en mouvement. Tout se joue dans les 50 mètres avant l'entrée.",
        secondContent: "En ralentissant dès 80 mètres, vous passez en 2ème vitesse, vous cherchez à gauche les clignotants et les trajectoires des véhicules dans l'anneau, et vous évaluez si une fenêtre va se libérer dans les secondes qui suivent. Cette anticipation active transforme complètement l'expérience du giratoire : au lieu d'une zone de stress, c'est un problème logistique simple à résoudre. Les roues des véhicules giratoires tournent toujours avant leur carrosserie — observez les roues, pas les phares.",
        bullets: [
          "Rétrogradage en 2ème : La vitesse idéale pour la reprise.",
          "Le regard à gauche : Chercher les clignotants et les trajectoires.",
          "L'analyse des roues : Les roues d'un véhicule tournent avant que sa carrosserie ne bouge.",
          "Le clignotant d'approche : Indiquer sa destination dès la file d'attente."
        ]
      },
      {
        title: "La Géométrie du Choix des Voies",
        iconName: "Maximize",
        content: "Le choix de la voie d'entrée est l'élément qui génère le plus d'erreurs éliminatoires lors de l'examen du permis. La règle fondamentale est simple à énoncer — mais réclame de la pratique pour devenir réflexe : la voie choisie à l'entrée doit correspondre à la sortie voulue.",
        secondContent: "Concrètement : première sortie à droite = voie de droite, restez à l'extérieur. Sortie à gauche = voie de gauche, traversez l'anneau en intérieur puis migrez vers l'extérieur avant de sortir. Demi-tour = voie de gauche, restez en intérieur maximum. Le tableau ci-dessous résume toutes les configurations avec les clignotants associés. Négligez le clignotant de sortie, et vous créez immédiatement un angle mort pour les véhicules qui cherchent à entrer.",
        table: {
          headers: ["Destination", "Voie à l'entrée", "Trajectoire dans l'anneau", "Clignotant"],
          rows: [
            ["1ère sortie à droite", "Voie de droite", "Reste à l'extérieur", "Droit dès l'entrée"],
            ["En face (2ème sortie)", "Voie de droite (conseillé)", "Reste à l'extérieur", "Droit après la 1ère sortie"],
            ["À gauche (3ème sortie)", "Voie de gauche", "Intérieur puis extérieur", "Gauche puis Droit avant sortie"],
            ["Demi-tour", "Voie de gauche", "Reste à l'intérieur au max", "Gauche puis Droit avant sortie"]
          ]
        }
      },
      {
        title: "Les Usagers Fragiles dans l'Anneau : Une Vigilance Accrue",
        iconName: "Bike",
        content: "Les cyclistes et les motocyclistes concentrent une part disproportionnée des accidents en giratoire. En 2026, les aménagements 'cyclables à la hollandaise' se généralisent dans les villes françaises : une piste cyclable séparée court autour de l'anneau, et les conducteurs de véhicules motorisés doivent céder le passage aux cyclistes à chaque sortie, comme à un passage piéton.",
        secondContent: "Cette règle est nouvelle et méconnue — ce qui en fait un piège idéal à l'examen du permis. L'angle mort droit lors de la sortie est le danger n°1 : un cycliste circulant vite sur la piste extérieure peut être complètement invisible depuis le siège conducteur. La règle pratique : avant toute sortie, un coup d'œil systématique dans le rétroviseur extérieur droit ET une vérification de l'angle mort physique. Sans négociation.",
        bullets: [
          "Le cycliste en pourtour : Il a le droit de rester à l'extérieur même s'il va à gauche.",
          "L'angle mort droit : Le danger n°1 lors de la sortie.",
          "Le sas cyclable de sortie : Une zone tampon à respecter.",
          "La distance latérale : Ne pas serrer un deux-roues dans la courbe."
        ]
      },
      {
        title: "Interactions avec les Poids Lourds : Les Angles Morts",
        iconName: "AlertTriangle",
        content: "Un semi-remorque de 25 mètres de long et 40 tonnes engage un giratoire comme un bateau manoeuvre dans un port. Son rayon de giration est tel qu'il doit souvent empiéter physiquement sur les deux voies pour négocier le virage. Ce n'est pas de l'incorrection — c'est de la physique. Chercher à le dépasser intérieurement dans ces conditions est une erreur qui peut être fatale.",
        secondContent: "La règle absolue avec les poids lourds : patience et distance. L'arrière du camion (le porte-à-faux) se déporte systématiquement à l'opposé du virage — il peut balayer votre capot en quelques centimètres si vous vous trouvez dans son angle mort. Et rappelez-vous : si vous ne voyez pas les rétroviseurs extérieurs du chauffeur, il ne vous voit pas non plus. Attendez toujours qu'il soit intégralement sorti de l'anneau avant d'entamer votre propre insertion.",
        bullets: [
          "Le porte-à-faux : L'arrière du camion se déporte à l'opposé du virage.",
          "La zone d'invisibilité : Si vous ne voyez pas les rétros du chauffeur, il ne vous voit pas.",
          "La courtoisie technique : Laisser passer un bus ou un camion facilite la fluidité pour tous.",
          "Le risque de basculement : Attention aux chargements instables dans les courbes serrées."
        ]
      },
      {
        title: "Conditions Dégradées : Pluie, Verglas et Nuit",
        iconName: "Activity",
        content: "Le giratoire sollicite vos pneus latitudinalement et longitudinalement en même temps — c'est l'une des configurations les plus exigeantes en termes d'adhérence. Sous la pluie, les résidus de carburant et d'huile accumulés au centre de l'anneau créent un film glissant extrêmement traître, surtout lors du premier orage après une longue période sèche.",
        secondContent: "La technique de survie en conditions dégradées : entrer LENTEMENT dans l'anneau (quitte à sembler excessivement pruent), ne jamais freiner DANS la courbe (freinez AVANT d'entrer), et garder le volant aussi stable que possible. En cas de verglas, la moindre action brusque des pneus provoque un sur-braquage ou un sous-virage immédiat. La nuit, fiez-vous exclusivement aux panneaux rétrofléchissants et aux marquages — la perception de vitesse est traite dans les courbes obscures.",
        bullets: [
          "Adhérence réduite : Les ronds-points sont souvent gras (résidus de carburant).",
          "Visibilité nocturne : Les panneaux et marquages sont vos seuls repères.",
          "Verglas : Évitez tout coup de frein brusque dans la courbe.",
          "Aquaplaning : Attention aux flaques stagnantes sur les bords extérieurs."
        ]
      },
      {
        title: "Tramways et Ronds-points Complexes : Le Niveau Expert",
        iconName: "Zap",
        content: "Dans les grandes métropoles comme Lyon, Bordeaux ou Strasbourg, les tramways traversent de plus en plus fréquemment des carrefours giratoires. Les règles changent radicalement : le tramway est TOUJOURS prioritaire, quelle que soit sa direction d'approche, peu importe votre position dans l'anneau.",
        secondContent: "Cette priorité absolue est signalée par le feu spécifique R17 (un carré blanc ou lumineux) qui impose un arrêt dès que le tramway est en approche. La difficulté : ces feux ne ressemblent pas aux feux tricolores classiques. Les conducteurs qui ne les identifient pas se retrouvent sans réponse face à la situation. Les giratoires à double anneau à feux représentent un autre niveau de complexité : le positionnement sur le bon anneau dès l'entrée est absolument déterminant. Une erreur là et vous vous retrouvez 'enfermé' sur l'anneau intérieur avec des sorties bloquées.",
        bullets: [
          "Le feu R17 : Le signal spécifique pour le passage du tramway.",
          "Le franchissement des rails : Attention à ne pas rester bloqué sur les voies.",
          "Les giratoires à feux : Quand la signalisation lumineuse remplace la règle de priorité.",
          "Le double anneau : Savoir se placer sur le bon anneau pour ne pas être 'enfermé'."
        ]
      },
      {
        title: "Tableau Complet des Sanctions et Points",
        iconName: "ClipboardCheck",
        content: "Les infractions commises dans un giratoire sont systématiquement observées par les inspecteurs lors de l'examen du permis, et sanctionnées dans la vraie vie par des amendes et des retraits de points qui s'accumulent rapidement. Comprendre les conséquences concrètes de chaque erreur est l'un des meilleurs moteurs de changement de comportement.",
        secondContent: "L'infraction la plus fréquente — et la plus dangereuse — reste le refus de priorité à l'entrée, suivi du défaut de clignotant de sortie. Sur ces deux points, une tolerànce zéro s'applique à l'examen. Le tableau ci-dessous détaille les 4 infractions les plus fréquentes avec leur coût exact, aussi bien en points qu'en euros. Conséquence trop méconnue : le franchissement de ligne continue sur l'anneau intérieur entraîne la même sanction que sur une route nationale.",
        table: {
          headers: ["Infraction", "Retrait de Points", "Amende Forfaitaire", "Conséquence"],
          rows: [
            ["Refus de priorité au giratoire", "4 points", "135 €", "Risque d'accident latéral"],
            ["Non-usage du clignotant", "3 points", "35 €", "Surprise pour les usagers derrière"],
            ["Franchissement de ligne continue", "3 points", "135 €", "Dangereux pour le flux"],
            ["Circulation à contre-sens", "4 points", "135 €", "Suspension de permis immédiate"]
          ]
        }
      },
      {
        title: "Exercices Pratiques pour se Perfectionner",
        iconName: "Target",
        content: "La théorie ne suffit pas. La maîtrise du giratoire nécessite une répétition physique jusqu'à l'automatisation complète des réflexes. Chez Smoni, nous utilisons des séquences d'exercices spécifiquement conçus pour créer ces automatismes de manière accélérée, sans exposition inutile au risque.",
        secondContent: "L'exercice le plus efficace — et le plus surprenant pour les élèves — est 'le tour infini' : rester dans l'anneau pendant 3 à 5 minutes complètes, en observant les entrées et sorties des autres véhicules sans s'en préoccuper. Cet exercice développe une lecture naturelle des flux et des intentions des autres usagers. Après deux séances de ce type, les élèves rapportent systématiquement une réduction massive de leur anxiété en giratoire.",
        bullets: [
          "L'exercice de l'horloge : Visualiser le giratoire comme un cadran de montre.",
          "Le tour infini : Rester dans l'anneau pour apprendre à gérer les entrées des autres.",
          "Le changement de file intérieur : Maîtriser ses rétroviseurs en courbe.",
          "L'insertion dynamique : Passer de l'arrêt à l'insertion sans temps mort."
        ]
      },
      {
        title: "FAQ : Tout ce qu'il reste à savoir",
        iconName: "HelpCircle",
        content: "Voici les dernières zones d'ombre que nos élèves soulèvent systématiquement en fin de formation. Des réponses claires et definitives pour que vous ne possédiez plus aucun doute au moment de l'épreuve ou sur la route.",
        secondContent: "Le giratoire est souvent ce qui distingue un conducteur nerveux d'un conducteur fluide. Une fois ses règles internalisées, il devient paradoxalement l'une des configurations les plus simples à gérer : pas de feux à interpréter, pas de priorité ambiguë, une seule direction de circulation. Faites confiance à votre formation — et si un doute subsiste sur la route, ralentissez. Un conducteur lent dans un giratoire est infiniment moins dangereux qu'un conducteur pressé qui hésite.",
        bullets: [
          "Puis-je sortir à gauche depuis la voie de droite ? Non, c'est extrêmement dangereux et sanctionnable.",
          "Qui est prioritaire si deux voitures sortent en même temps ? Celle sur la voie la plus à droite.",
          "Que faire si j'ai raté ma sortie ? Refaites un tour complet, ne tentez jamais de marche arrière.",
          "Pourquoi y a-t-il des arbres au milieu ? Pour masquer la vue et forcer les conducteurs à ralentir."
        ]
      }
    ]
  },
  {
    slug: "eco-conduite-guide",
    title: "Éco-conduite : Rouler Mieux, Dépenser Moins",
    subtitle: "Techniques concrètes pour réduire votre consommation de carburant sans sacrifier votre confort.",
    excerpt: "L'éco-conduite, c'est rouler plus intelligemment. Ce guide vous montre comment économiser jusqu'à 25% sur votre budget carburant grâce à des gestes simples : passage de vitesse, anticipation, entretien et gestion de l'autoroute.",
    category: "Sécurité",
    date: "26 Avr 2026",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Smoni Experts", avatar: "SE" },
    tags: ["Écologie", "Économie", "Technique", "Hybride", "Performance"],
    sections: [
      {
        title: "Introduction : L'Éco-conduite, l'Art de la Fluidité",
        iconName: "Activity",
        content: "En 2026, l'éco-conduite est entrée dans le programme officiel du permis de conduire et du code de la route. Ce n'est pas un gadget écologique — c'est une réponse économique directe à une crise énergétique durable. Un conducteur formé à nos techniques consomme en moyenne 2 litres de moins aux 100 km, ce qui représente une économie annuelle réelle de plus de 700 euros pour un conducteur moyen.",
        secondContent: "Mais l'éco-conduite n'est pas seulement une question d'argent. C'est une philosophie de conduite qui rend les trajets plus séréins, les véhicules plus durables, et les routes plus fluides pour tout le monde. Un conducteur éco-responsable freine moins souvent, accélère moins brutalement, anticipe davantage — et se retrouve, paradoxalement, bien moins stressé qu'un conducteur 'nerveux'. La fluidité, c'est le luxe ultime de la route.",
      },
      {
        title: "La Physique du Mouvement : Inertie et Résistance",
        iconName: "Zap",
        content: "Pour avancer, une voiture doit vaincre simultanément trois forces physiques : la résistance au roulement (générée par la déformation des pneus sur la chaussée), la résistance aérodynamique (qui augmente avec le carré de la vitesse), et la gravité (decisive en côte). Ce que la plupart des conducteurs ignorent : à 130 km/h, 70% de l'énergie dépensée sert uniquement à vaincre la résistance de l'air. D'où l'impact spectaculaire d'un simple ralentissement de 10 km/h sur autoroute.",
        secondContent: "Chaque énergie gaspillée en freinage inutile est une énergie qui ne sera jamais récupérée sur un véhicule thermique (contrairement aux véhicules électriques avec le freinage régénératif). C'est la raison fondamentale pour laquelle l'anticipation est la compétence n°1 de l'éco-conduite : moins vous freinez, moins vous gaspillez. Un conducteur qui anticipe sufisamment peut parcourir des kilomètres entiers sans toucher la pédale de frein, utilisant la seule décélération naturelle du moteur.",
        bullets: [
          "L'Énergie Cinétique : Pourquoi une voiture lancée veut continuer à rouler.",
          "Le coefficient de traînée (Cx) : L'impact de votre vitesse sur la consommation (exponentiel).",
          "La résistance au roulement : L'importance du label des pneus.",
          "L'inertie thermique : Pourquoi un moteur froid est un désastre économique."
        ]
      },
      {
        title: "Maîtriser le Régime Moteur : La Zone de Rendement",
        iconName: "BarChart3",
        content: "Chaque moteur thermique possède une 'cartographie de rendement' — une zone de régime dans laquelle il produit le maximum de force motrice pour le minimum de carburant injecté. En dehors de cette zone, vous brulez du carburant pour générer de la chaleur plutôt que du mouvement. Comprendre et viser cette zone est la compétence centrale de l'éco-conduite.",
        secondContent: "En boite manuelle, la règle pratique est de passer la vitesse supérieure avant d'atteindre 2000 tr/min (essence) ou 1800 tr/min (diesel). En automatique, le mode ECO ajuste la boîte en conséquence — mais votre pied droit reste le vrai maître de la consommation. Un accélérateur donné à 30% au bon régime est infiniment plus efficace qu'un accélérateur donné à 70% au mauvais régime. Le tableau ci-dessous détaille les zones optimales par type de motorisation.",
        table: {
          headers: ["Type de Moteur", "Vitesse de passage (tr/min)", "Plage de couple idéale", "Consigne"],
          rows: [
            ["Essence (VTI/TSI)", "2000 - 2200", "1500 - 2500", "Passer la 5ème dès 50km/h"],
            ["Diesel (HDI/TDI)", "1800 - 2000", "1400 - 2000", "Éviter les montées en régime"],
            ["Hybride (HSD)", "N/A", "Zone 'Power' évitée", "Glisse en mode électrique au max"],
            ["Électrique", "N/A", "Linéaire", "Éviter les accélérations 'On/Off'"]
          ]
        }
      },
      {
        title: "La Technique du 'Pulse and Glide'",
        iconName: "Zap",
        content: "Le Pulse and Glide n'est pas une technique de conducteur marginal — c'est la stratégie utilisée par les champions des épreuves de consommation, les tests de constructeurs, et les conducteurs de VE qui cherchent à maximiser leur autonomie. Le principe : accélérer franchement jusqu'à la vitesse cible (Pulse), puis lever intégralement le pied pour laisser l'inertie faire le travail (Glide).",
        secondContent: "Ce qui est contre-intuitif, c'est que cette technique est plus efficace qu'un accélérateur maintenu à pression constante. Pourquoi ? Parce qu'au moment du Glide, la plupart des moteurs modernes coupent totalement l'injection de carburant (coupure décélération). Vous roulez littéralement à 0L/100. La clé est d'anticiper les obstacles suffisamment tôt pour démarrer le Glide plusieurs centaines de mètres à l'avance — et d'atteindre le feu rouge ou le ralentissement exactement à la bonne vitesse, sans freiner.",
        bullets: [
          "Le Pulse : Accélération à 75% de charge pour un rendement moteur optimal.",
          "Le Glide : Utilisation de la coupure d'injection ou de la roue libre.",
          "Anticipation : Voir le feu rouge 300m avant pour ne jamais freiner.",
          "Le maintien de l'élan : Ne pas ralentir inutilement en bas d'une côte."
        ]
      },
      {
        title: "Aérodynamisme et Équipements : Les Tueurs Silencieux",
        iconName: "Wrench",
        content: "Un coffre de toit laissé sur le véhicule 'juste au cas où' représente une augmentation permanente de la traînée aérodynamique d'environ 15% à 110 km/h. Sur un an et 15 000 km, cela représente environ 200 euros de carburant brûlé pour rien. La climatisation, elle, agit comme un moteur auxiliaire qui pompe directement dans la réserve — environ 0,5 à 1L/100km selon les conditions.",
        secondContent: "Ces 'tueurs silencieux' sont appelés ainsi parce qu'ils agissent de manière invisible et continue. Un pneu gonflé à 0,3 bar sous la pression recommandée consomme 3% de plus — chaque jour, silencieusement. Un filtre à air encrasé depuis 2 ans étouffe littéralement votre moteur. La bonne nouvelle : ces pertes sont 100% récupérables par des gestes simples et peu coûteux. Un contrôle de pression des pneus (gratuit dans la plupart des stations) toutes les 4 semaines suffit à économiser plus de 100 euros par an.",
        bullets: [
          "La règle des fenêtres : Ouvertes en ville, fermées sur autoroute.",
          "La climatisation : Régler à 5°C max en dessous de la température extérieure.",
          "Les barres de toit : À démonter systématiquement après usage.",
          "La pression des pneus : +0.2 bar par rapport à la consigne constructeur pour réduire la friction."
        ]
      },
      {
        title: "GPS et Optimisation de Trajet",
        iconName: "Compass",
        content: "Le chemin le plus court en kilomètres est rarement le plus court en carburant. Un itinéraire qui évite les zones de travaux, les ronds-points en cascade et les fortes déclivités peut être de 15% plus consommateur malgré 5 km de moins. Le secret : privilégier la fluidité et la constance de vitesse sur la distance brute.",
        secondContent: "En 2026, les applications de navigation intègrent un mode 'écologique' qui calcule l'itinéraire à partir des pentes, des feux et de la densité du trafic en temps réel. Ce mode peut faire économiser jusqu'à 12% de carburant sur les trajets urbains. Mais la vraie optimisation commence avant le démarrage : grouper ses courses et trajets en une seule boucle avec un moteur chaud est l'un des gestes éco-responsables les plus efficaces — un moteur froid consomme jusqu'à 50% de plus dans les premières minutes.",
        bullets: [
          "Waze/Google Maps : Choisir l'itinéraire 'le plus écologique'.",
          "Éviter les heures de pointe : Les bouchons sont l'ennemi n°1 du rendement.",
          "Le groupage des trajets : Faire toutes ses courses en une seule boucle moteur chaud.",
          "Le télétravail : La meilleure éco-conduite est celle que l'on ne fait pas."
        ]
      },
      {
        title: "Véhicules Électriques : Gérer l'Autonomie comme un Pro",
        iconName: "BatteryCharging",
        content: "Passer à l'électrique change radicalement le vocabulaire de l'éco-conduite. On ne parle plus de litres aux cent kilomètres mais de kWh consommés, de charge restante, et d'autonomie projetée. La gestion de la batterie est un véritable art — et le froid est son ennemi numéro un : à -10°C, une batterie peut perdre jusqu'à 35% de sa capacité réelle.",
        secondContent: "La stratégie optimale pour les utilisateurs de VE se joue en trois temps : le préchauffage sur secteur (chauffer l'habitacle et la batterie avec l'électricité du réseau avant de débrancher), la gestion fine du freinage régénératif (plusieurs niveaux B1/B2/B3 selon le relief), et l'optimisation de la vitesse d'autoroute (110 km/h représente généralement le meilleur compromis entre temps de trajet et autonomie). Les conducteurs formés par Smoni récupèrent en moyenne 18% d'autonomie supplémentaire.",
        bullets: [
          "Préchauffage sur secteur : Utiliser l'énergie de la borne pour chauffer l'habitacle.",
          "Freinage régénératif : Maîtriser les différents niveaux (B1, B2, B3) selon le relief.",
          "Vitesse et Résistance : Pourquoi 110km/h est le 'sweet spot' de l'autoroute en VE.",
          "Pompe à chaleur : Pourquoi c'est l'option indispensable en 2026."
        ]
      },
      {
        title: "Entretien Mécanique et Éco-Performance",
        iconName: "ClipboardCheck",
        content: "L'éco-conduite commence dans le garage. Une voiture mal entretenue est une voiture qui consomme structurellement plus que nécessaire, quelle que soit la douceur de votre pied sur l'accélérateur. La mécanique doit être impeccable pour que l'éco-conduite donne ses pleins résultats.",
        secondContent: "Ce que la plupart des automobilistes ignorent : les gains sont cumulatifs. Un filtre à air neuf économise 3%, une huile moteur de bonne qualité en ajoute 2%, des bougies fraiches encore 5%. Combinés à une éco-conduite active, ces gains représentent une réduction de consommation pouvant dépasser 20% sur un véhicule qui n'avait pas été révisé depuis deux ans. Le tableau ci-dessous illustre l'impact financier exact de chaque élément mécanique sur votre facture annuelle.",
        table: {
          headers: ["Élément", "Impact si usé", "Gain après changement", "Fréquence"],
          rows: [
            ["Filtre à air", "Moteur étouffé", "-3% conso", "Chaque année"],
            ["Huile moteur", "Frictions internes", "-2% conso", "Selon constructeur"],
            ["Bougies d'allumage", "Mauvaise combustion", "-5% conso", "Tous les 60 000 km"],
            ["Injecteurs", "Pulvérisation médiocre", "-10% conso", "Nettoyage si besoin"]
          ]
        }
      },
      {
        title: "Le Bilan Financier : Combien gagnez-vous ?",
        iconName: "Table",
        content: "Les chiffres sont implacables. Deux conducteurs parcourant exactement le même trajet, avec le même véhicule, peuvent afficher une différence de consommation de 40% selon leur style de conduite. Sur une année, cette différence se mesure en centaines d'euros — et en milliers d'euros sur la durée de vie du véhicule.",
        secondContent: "Le tableau ci-dessous prend l'exemple concret d'un conducteur parcourant 15 000 km par an avec de l'essence à 1,95 €/L. Il illustre la différence financiere nette entre un style nerveux, un style standard, et un style éco-Smoni. La conclusion est sans appel : l'éco-conduite ne soulève pas seulment une question morale. C'est un investissement financier à rendement immédiat, et à retour élevé.",
        table: {
          headers: ["Style de conduite", "Conso Moyenne", "Coût Annuel", "Économie"],
          rows: [
            ["Nerveux", "8.5 L/100", "2 486 €", "0 €"],
            ["Standard", "7.2 L/100", "2 106 €", "380 €"],
            ["Éco-conduite Smoni", "5.9 L/100", "1 726 €", "760 €"]
          ]
        }
      },
      {
        title: "FAQ : Les mythes de l'Éco-conduite",
        iconName: "HelpCircle",
        content: "L'éco-conduite est entourée de mythes tenaces qui dissuadent certains conducteurs de l'adopter. Les plus répandus tournent autour de la durée de vie du moteur, de l'embrayage, et de l'efficacité réelle par rapport au régulateur de vitesse. Il est temps d'établir les faits.",
        secondContent: "La vérité mécanique est sans équivoque : l'éco-conduite allônge la durée de vie des composants en réduisant les contraintes thermiques et mécaniques. Un moteur qui monte rarement en régime s'use deux à trois fois moins vite qu'un moteur sollicité à plein régime quotidiennement. Quant à l'embrayage : les conducteurs nerveux le remplacent tous les 60 000 km, ceux formis en éco-conduite dépassent souvent les 150 000 km. C'est l'argument économique définitif.",
        bullets: [
          "Est-ce que je vais encrasser mon moteur ? Non, si vous faites un trajet autoroutier de temps en temps.",
          "Faut-il couper le moteur au feu rouge ? Oui, si l'arrêt dure plus de 10 secondes (ou laissez faire le Start & Stop).",
          "Le régulateur est-il toujours meilleur ? Non, sur terrain vallonné, le pied humain est plus intelligent pour gérer l'élan.",
          "L'éco-conduite abîme-t-elle l'embrayage ? Au contraire, elle favorise des changements de rapports doux et moins fréquents."
        ]
      }
    ]
  },
  {
    slug: "permis-accelere-avis",
    title: "Permis Accéléré : Ce qu'il Faut Savoir Avant de se Lancer",
    subtitle: "Coûts réels, rythme de formation, taux de réussite et conseils pour bien se préparer.",
    excerpt: "Le permis accéléré permet d'obtenir son permis en 2 à 4 semaines. Mais est-ce fait pour vous ? Cet article fait le point sur le programme, les tarifs, la préparation mentale et les résultats concrets de la formule intensive.",
    category: "Formation",
    date: "26 Avr 2026",
    readingTime: "12 min",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000",
    author: { name: "SMONI Team", avatar: "S" },
    tags: ["Formation", "Accéléré", "Intensif", "Examen", "Réussite"],
    sections: [
      {
        title: "Introduction : Le Permis à la Vitesse de la Lumière",
        iconName: "Zap",
        content: "Le permis accéléré n'est pas une 'version allégée' du permis. C'est exactement la même formation — les mêmes 20 ou 30 heures légalement exigées, les mêmes compétences à maîtriser — mais concentrée sur une période de 2 à 4 semaines. C'est un défi intellectuel et physique que Smoni a optimisé avec des méthodologies empruntées au coaching sportif de haut niveau.",
        secondContent: "Ce format n'est pas pour tout le monde — et c'est précisément ce qui le rend efficace. Seuls les candidats qui présentent le bon profil sont acceptés. En contrepartie, ceux qui s'y investissent pleinement obtiennent des résultats spectaculaires : moins d'heures supplémentaires, moins d'oubli entre les séances, et une courbe d'apprentissage nettement supérieure à la filiere classique. Le tout en gagnant 4 à 5 mois sur leur calendrier.",
      },
      {
        title: "La Science de l'Apprentissage Intensif",
        iconName: "Brain",
        content: "Le cerveau humain apprend par répétition, certes, mais la qualité de la répétition compte autant que la quantité. En conduite classique au rythme d'une heure par semaine, le candidat passe 20 des 60 minutes de chaque séance à 'réchauffer' les circuits neurologiques endormis de la semaine précédente. En accéléré, cette perte est nulle.",
        secondContent: "Les automatismes — changer de vitesse sans regarder la pédale, vérifier les angles morts comme un réflexe involontaire, anticiper à 300 mètres — s'ancrent en moyenne 4 fois plus vite lors d'un apprentissage intensif que lors d'un apprentissage espacé. La consolidation synaptique (le processus par lequel le cerveau fixe les nouveaux automatismes) est optimisée par le sommeil entre les sessions quotidiennes. C'est pourquoi le repos est aussi important que les heures de conduite elle-mêmes.",
        bullets: [
          "La consolidation synaptique : Pourquoi dormir entre deux sessions est vital.",
          "La surcharge cognitive : Comment nos moniteurs détectent vos signes de fatigue.",
          "L'immersion totale : Vivre, manger et dormir 'conduite' pendant 15 jours.",
          "La courbe de progression : Un décollage vertical suivi d'un plateau de stabilisation."
        ]
      },
      {
        title: "Le Programme Heure par Heure : Une Semaine Type",
        iconName: "Clock",
        content: "'Oubliez vos loisirs, vos séries et vos sorties' — c'est la première chose que nous disons aux candidats lors du bilan d'entrée. Pas pour être sévères, mais parce que la réussite de votre formation intensive dépend d'une seule chose : l'exclusivité mentale. Votre cerveau doit être disponible à 100% pour intégrer les automatismes.",
        secondContent: "La semaine type ci-dessous n'est pas une suggestion — c'est le cadre structurant de votre stage. Chaque matin, chaque après-midi, chaque soir a un objectif précis et une progression logique. La fatigue est anticipée et gérée : les sessions les plus exigeantes (circulation dense, manœuvres complexes) sont placées en début d'après-midi, quand la vigilance est à son apogée après le repas et une courte pause.",
        table: {
          headers: ["Jour", "Matin (3h)", "Après-midi (3h)", "Soir (1h)"],
          rows: [
            ["Lundi", "Évaluation et Mécanique", "Maîtrise du volant et pédales", "Révision Code"],
            ["Mardi", "Priorités en ville", "Insertion voies rapides", "Analyse vidéo"],
            ["Mercredi", "Ronds-points complexes", "Manoeuvres (Rangements)", "Auto-évaluation"],
            ["Jeudi", "Conduite autonome (GPS)", "Circulation dense (Paris/Lyon)", "Gestion du stress"],
            ["Vendredi", "Parcours examen type", "Vérifications techniques", "Repos mental"]
          ]
        }
      },
      {
        title: "L'Évaluation de Départ : Le Filtre de Réussite",
        iconName: "Target",
        content: "Chez Smoni, l'accès au permis accéléré est conditionnel. Nous ne promettons pas le succès à tous les candidats indépendamment de leur profil — parce que ce serait vous mentir. Une évaluation initiale de 45 minutes, combineé sur simulateur et en voiture réelle, permet de mesurer avec précision vos capacités actuelles et votre prédisposition à l'apprentissage intensif.",
        secondContent: "Cette évaluation n'est pas un jugement de votre intelligence ou de votre valeur. C'est un outil de précision qui nous permet de vous conseiller honnêtement : si vous êtes taille pour l'intensif, vous commencez dans les 48h. Si vous avez besoin d'un peu plus de temps, nous vous proposons la formule semi-accélérée (5 semaines au lieu de 2), qui offre des résultats comparables avec une charge mentale plus répartie.",
        bullets: [
          "Test de réactivité : Mesurer le temps de réaction en millisecondes.",
          "Test de coordination : Pieds/Mains/Regard.",
          "Évaluation psychologique : Résistance au stress et à la fatigue.",
          "Estimation d'heures : Soyons honnêtes dès le début sur le volume nécessaire."
        ]
      },
      {
        title: "Coûts et Investissement : Le Vrai Calcul",
        iconName: "Table",
        content: "Le prix facial du permis accéléré est indéniablement plus élevé que la filiere classique. Mais ce calcul en surface masque une réalité financière beaucoup plus nuancée. Le coût réel d'un permis classique inclut des facteurs souvent ignorés à la signature.",
        secondContent: "Les leçons supplémentaires dues à l'oubli entre les séances espacees représentent en moyenne 10 heures supplémentaires par candidat en filiere classique, soit près de 600 euros. Sans compter les frais de transport accumulés sur 6 mois, et surtout le coût d'opportunité de 5 mois sans permis. Le tableau ci-dessous compare les coûts réels, poste par poste, pour que vous puissiez prendre une décision éclairée.",
        table: {
          headers: ["Poste", "Classique", "Accéléré Smoni", "Note"],
          rows: [
            ["Forfait de base", "1 400 €", "2 100 €", "Disponibilité prioritaire"],
            ["Heures sup. moyennes", "10h (600€)", "2h (120€)", "Moins de perte d'acquis"],
            ["Frais administratifs", "150 €", "150 €", "Dossier ANTS inclus"],
            ["TOTAL REEL", "2 150 €", "2 370 €", "Différence minime pour 5 mois gagnés"]
          ]
        }
      },
      {
        title: "Le Mental du Candidat : Préparation Psychologique",
        iconName: "Activity",
        content: "Si la technique est le corps du permis accéléré, le mental en est l'âme. La concentration requise pendant 7 heures de conduite quotidienne ne peut pas être soutenue sans une préparation psychologique spécifique. Smoni intègre dans son programme des techniques de performance mentale directement inspirées de la préparation des sportifs de haut niveau.",
        secondContent: "La visualisation nocturne est l'exercice le plus efficace : chaque soir, pendant 10 minutes avant de dormir, vous 're-conducez' mentalement les situations difficiles de la journée — mais cette fois-ci, avec les bons réflexes. Votre cerveau ne fait pas la différence entre le vécu réel et une visualisation précise : il consolide les mêmes connexions synaptiques. L'ancrage, lui, est un geste ou une phrase court-circuit permettant de retrouver un état de calme en 2 secondes avant une manœuvre délicate.",
        bullets: [
          "Visualisation : 'Conduire' mentalement son parcours d'examen le soir.",
          "Ancrage : Une phrase ou un geste pour retrouver son calme avant une manoeuvre.",
          "Gestion de l'échec : Pourquoi rater un examen blanc est la meilleure chose qui puisse vous arriver.",
          "Le sommeil : L'interdiction des écrans après 21h pour favoriser la mémorisation."
        ]
      },
      {
        title: "Logistique et Organisation : Préparez votre environnement",
        iconName: "ClipboardCheck",
        content: "La réussite d'un stage intensif ne dépend pas seulement de vous — elle dépend aussi de votre environnement immédiat. Un seul élément perturbateur extérieur — un problème de couple, une urgence professionnelle, une question de logement — peut s'abattre sur votre concentration comme un nuage sur un panneau solaire.",
        secondContent: "Nous vous conseillons donc de traiter votre stage comme une retraite professionnelle. Prévenez vos proches, déléguez ce qui peut l'être, préparez vos repas de la semaine en avance. Certains de nos élèves viennent de province ou même de l'étranger : nous avons des partenariats avec des hôtels et des Airbnb à distance de marche de notre centre pour minimiser la fatigue de transport quotidienne. Votre seule mission pendant 15 jours : conduire, manger, dormir. Tout le reste est superflu.",
        bullets: [
          "La bulle Smoni : Nous pouvons vous proposer des partenariats pour l'hébergement si vous venez de loin.",
          "L'alimentation : Privilégier les sucres lents et éviter les repas lourds le midi.",
          "Le transport : Comment venir au centre sans fatigue supplémentaire.",
          "Le dossier complet : Avoir tous ses documents (Code, NEPH) validés AVANT de commencer."
        ]
      },
      {
        title: "Statistiques et Taux de Réussite : La Transparence",
        iconName: "BarChart3",
        content: "Chez Smoni, nous publions nos statistiques réelles — pas des chiffres marketing arrondiés. Nous suivons nos anciens élèves pendant 3 ans après l'obtention du permis pour mesurer non seulement leur taux de réussite à l'examen, mais aussi leur comportement sur route dans la durée.",
        secondContent: "Le résultat le plus frappant de nos données : le taux d'accidentologie première année des conducteurs formés en intensif est rigoureusement identique à celui de la filière classique. Les détracteurs du permis accéléré prétendent qu'il forme des conducteurs dangereux. Les chiffres réels prouvent le contraire. La rigueur de la formation et l'intensité de l'exposition produisent des conducteurs qui connaissent leurs limites parce qu'ils les ont testées dans un cadre sécurisé.",
        bullets: [
          "Taux de réussite national : 58%.",
          "Taux de réussite Smoni Accéléré : 74%.",
          "Taux d'accidentologie 1ère année : Identique à la filière classique.",
          "Taux de satisfaction : 92% des élèves recommandent l'intensif."
        ]
      },
      {
        title: "Le Jour de l'Examen : Le Sprint Final",
        iconName: "Zap",
        content: "Après 15 jours d'immersion totale, l'examen lui-même peut sembler presque anecdotique. Vous avez conduit dans des conditions bien plus complexes que celles du parcours d'examen. Vous avez vu des situations bien plus tendues que ce qu'un inspecteur peut provoquer. Vous êtes prêt.",
        secondContent: "Notre accompagnement va jusqu'au bout : un de nos moniteurs vous retrouve devant le centre d'examen 30 minutes avant le début, pour un dernier briefing de mise en confiance. Il connait les pièges locaux de votre centre d'examen. Vous passerez l'épreuve sur le même véhicule que vous avez conduit pendant les 15 jours — pas sur une voiture inconnue. Ce détail psychologique compte énormément : votre cerveau associe confiance et sécurité à cette voiture spécifique.",
        bullets: [
          "Le repérage des centres d'examen : Connaître les pièges locaux.",
          "Le véhicule habituel : Vous passez l'examen sur la voiture que vous avez conduite tout le stage.",
          "Le moniteur accompagnateur : Un visage connu pour réduire le stress.",
          "La réception des résultats : 48h de patience avant la liberté."
        ]
      },
      {
        title: "FAQ : Les questions que vous vous posez encore",
        iconName: "HelpCircle",
        content: "Voici les dernières questions que nos candidats posent à la veille de s'inscrire. Nous y répondons avec la même franchise que nous apportons à toute notre pédagogie : sans édulcorer la réalité, mais sans la noircir non plus.",
        secondContent: "Notre engagement fondamental : nous ne vous promettons pas le succès à coup sûr. Nous vous promettons une formation rigoureuse, adaptée à votre profil, avec un accompagnement humain réel à chaque étape. Et si malgré tout vous ratez l'examen une première fois, nous avons des places de rattrapage réservées dans les 15 jours, avec une séance d'analyse post-échec pour comprendre ce qui s'est passé et le corriger définitivement.",
        bullets: [
          "Peut-on passer le permis en 1 semaine ? C'est possible si vous avez déjà une expérience (conduite accompagnée ou étrangère).",
          "Et si je rate ? Nous avons des places de rattrapage réservées sous 15 jours.",
          "Puis-je utiliser mon CPF ? Oui, toutes nos formations sont éligibles au compte personnel de formation.",
          "Faut-il avoir déjà son code ? C'est extrêmement recommandé pour profiter pleinement de la conduite."
        ]
      }
    ]
  },
  {
    slug: "conduire-de-nuit",
    title: "Conduire de Nuit en Toute Sécurité",
    subtitle: "Adapter sa vision, gérer la fatigue et préparer son véhicule pour les trajets nocturnes.",
    excerpt: "La nuit concentre 44% des accidents mortels pour seulement 10% du trafic. Cet article vous explique comment votre vision fonctionne dans l'obscurité, comment éviter la somnolence et quels réflexes adopter face aux phares, aux animaux et à la météo.",
    category: "Sécurité",
    date: "26 Avr 2026",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Lucie Bernard", avatar: "LB" },
    tags: ["Nuit", "Sécurité", "Vigilance", "Technique", "Santé"],
    sections: [
      {
        title: "Introduction : Le Paradoxe de la Nuit",
        iconName: "Eye",
        content: "Moins de voitures, pas de bouchons, une ambiance presque apaisante... La conduite nocturne semble être un plaisir. C'est précisément ce sentiment trompeur qui tue. 44% des accidents mortels surviennent la nuit, alors que la nuit ne concentre que 10% du trafic total français. Le risque est donc 6 fois plus élevé qu'en journée, toutes choses égales par ailleurs.",
        secondContent: "Ce paradoxe s'explique par trois facteurs cumulatifs : la dégradation de la vision humaine dans l'obscurité, la somnolence provoquée par les rythmes circadiens, et la fréquence plus élevée de conducteurs sous influence (alcool, stupéfiants) dans les heures nocturnes. Chez Smoni, nous consacrons une séance complète à la conduite nocturne, que ce soit dans le cadre du permis classique ou d'une formation de perfectionnement. Cet article est la synthèse de ce que nous y enseignons.",
      },
      {
        title: "La Biologie de la Vision : Bâtonnets et Photons",
        iconName: "Brain",
        content: "Votre œil n'est pas un capteur numérique à sensibilité ISO variable. Il possède deux types de photocepteurs : les cônes (actifs en pleine lumière, permettant la vision en couleur et la haute résolution) et les bâtonnets (actifs dans l'obscurité, sensibles aux mouvements mais daltoniens et peu précis). La transition entre les deux systèmes prend 20 à 30 minutes complètes.",
        secondContent: "C'est ce qu'on appelle l'adaptation scotopique. Ce que cela signifie concrètement : dans les 5 premières minutes après avoir quitté un lieu éclairé, votre vision nocturne n'est pas encore opérationnelle. Si vous sortez d'un restaurant brillamment éclairé pour monter dans votre voiture, vous conduisez dans les premières minutes avec une acuité visuelle significativement réduite. La bonne pratique : restez quelques minutes dans la pénombre avant de démarrer. Et surtout, ne regardez jamais les phares d'un véhicule arrivant en face — vous perdrez immédiatement votre adaptation nocturne.",
        bullets: [
          "Le temps d'adaptation : 20 à 30 minutes pour une vision nocturne optimale.",
          "La tache aveugle centrale : Pourquoi on voit mieux un objet la nuit en regardant légèrement à côté.",
          "La perte de contraste : Pourquoi un piéton en vêtements sombres est invisible à plus de 30 mètres.",
          "La myopie nocturne : Pourquoi votre vision de loin se dégrade légèrement dans le noir."
        ]
      },
      {
        title: "L'Éblouissement : Le Choc Lumineux",
        iconName: "ShieldAlert",
        content: "Un véhicule arrivant en face en pleins phares peut vous aveugler pendant 5 à 10 secondes. À 90 km/h, vous parcourez 250 mètres à l'aveugle — l'équivalent d'une ligne droite de 8 secondes où votre conduite est purement instinctive et dénuée de toute perception réelle. C'est l'une des situations les plus dangereuses de la conduite nocturne.",
        secondContent: "La parade systématique : ne regardez JAMAIS les phares adverses. Fixez plutôt la ligne blanche de rive à votre droite — elle reste visible même sous éblouissement et vous guide en sécurité. Les rétroviseurs doivent être réglés en position nuit (levier anti-reflet) dès la tombée du soir pour éviter que les phares arrière ne vous aveuglent à leur tour. Quant aux lunettes jaunes : elles augmentent le contraste mais réduisent la quantité de lumière reçue — réserver à la conduite sous brouillard ou neige, pas en obscurité totale.",
        bullets: [
          "La technique du regard déporté : Fixer la ligne de rive droite.",
          "La gestion des rétros : Utiliser la position nuit ou les régler pour éviter les reflets directs.",
          "L'éblouissement par l'arrière : Comment réagir si on vous 'colle' en pleins phares.",
          "Les lunettes de conduite nuit : Mythe ou réalité ? (Le point sur les verres jaunes)."
        ]
      },
      {
        title: "Technologie d'Éclairage : De l'Halogène au Laser",
        iconName: "Zap",
        content: "La technologie d'éclairage automobile a connu une révolution en 20 ans. L'halogène jauni des années 90 s'est transformé en laser capable d'éclairer à 600 mètres devant vous avec une précision chirurgicale. Comprendre ces différentes technologies, c'est comprendre les capacités et les limites de votre véhicule dans l'obscurité.",
        secondContent: "La révolution la plus importante est le Matrix LED adaptatif : grâce à une caméra frontale et des algorithmes de détection, ce système peut éclairer la route en pleine lumière tout en éteignant précisément les segments lumineux qui pourraient éblouir les véhicules arrivant en face. Résultat : vous pouvez rouler en pleins phares en permanence sans jamais gêner personne. Si votre véhicule en est équipé, ne vous en privez pas — c'est un gain de sécurité considérable par rapport aux codes classiques.",
        table: {
          headers: ["Technologie", "Portée moyenne", "Couleur de lumière", "Avantages"],
          rows: [
            ["Halogène", "100 - 150m", "Jaune (3000K)", "Pas cher, facile à changer"],
            ["Xénon", "200 - 250m", "Bleu/Blanc (4500K)", "Éclairage large et puissant"],
            ["LED / Matrix LED", "300m+", "Blanc pur (6000K)", "Adaptatif, ne fatigue pas l'œil"],
            ["Laser", "600m", "Lumière du jour", "Puissance extrême (uniquement route)"]
          ]
        }
      },
      {
        title: "Le Péril Animal : Une Guerre de Territoire",
        iconName: "Squirrel",
        content: "En France, on recense près de 20 000 accidents impliquant des animaux chaque année, dont une écrasante majorité survient entre 22h et 5h du matin. Sangliers, chevreuils, biches, renards, loutres — la route de nuit traverse leur territoire ancestral, et ils n'ont aucun instinct de survie programmé pour gérer 130 km/h de métal.",
        secondContent: "Ce qui rend ces accidents particulièrement dangereux : le réflexe instinctif de TOURNÉR le volant pour éviter l'animal. C'est la pire chose à faire. Une voiture qui évite brusquement un sanglier peut partir dans le fossé, percuter un arbre, ou se retrouver sur la voie opposée. La bonne décision, aussi contre-intuitive qu'elle soit : freiner franchement en ligne droite et heurter l'animal si nécessaire. Les dégâts matériels seront gérables, le risque humain sera minimal.",
        bullets: [
          "Le balayage des bas-côtés : Surveiller les points brillants (les yeux).",
          "Le klaxon : Plus efficace que les appels de phares pour faire fuir un animal.",
          "Le freinage d'urgence : Pourquoi il ne faut JAMAIS tenter une manœuvre d'évitement brutale.",
          "La signalisation spécifique : Respecter scrupuleusement les panneaux 'Grande Faune'."
        ]
      },
      {
        title: "Fatigue et Rythmes Circadiens : L'Horloge Interne",
        iconName: "Clock",
        content: "Votre corps possède une horloge interne — le rythme circadien — programmée par des millions d'années d'évolution pour dormir la nuit. Entre 2h et 5h du matin, la vigilance humaine atteint son minimum absolu, indépendamment de votre niveau de forme. À ce moment-là, vos capacités cognitives sont équivalentes à celles d'un conducteur ayant 0,5g d'alcool dans le sang.",
        secondContent: "La somnolence est la première cause de mort sur autoroute en France. Son caractère insidieux : elle arrive progressivement, par vagues, et le conducteur la détecte souvent trop tard. Le micro-sommeil — une déconnection du cerveau de 1 à 4 secondes — peut survenir sans que le conducteur en soit conscient. À 130 km/h, 3 secondes de micro-sommeil équivalent à plus de 100 mètres parcourus à l'aveugle. La seule solution : s'arrêter et dormir. Le café donne 20 minutes de répit, pas davantage.",
        bullets: [
          "La somnolence : 1ère cause de mort sur autoroute.",
          "Le micro-sommeil : Ces quelques secondes où votre cerveau décroche.",
          "La pause active : Marcher, s'étirer, ne pas rester dans la voiture.",
          "L'alimentation nocturne : Pourquoi le sucre est votre ennemi (le pic d'insuline fatigue)."
        ]
      },
      {
        title: "Entretien et Préparation du Véhicule",
        iconName: "Wrench",
        content: "Votre véhicule est votre bouclier nocturne, et comme tout bouclier, il doit être en parfait état. Une vitre légèrement embuée, un phare mal réglé ou des essuie-glaces usés — des inconvénients mineurs de jour — deviennent des facteurs de risque sérieux de nuit. La préparation du véhicule est la première ligne de défense.",
        secondContent: "Un détail méconnu et pourtant crucial : le réglage de la portée des phares. Quand vous chargez la voiture (coffre plein, 4 passagers), l'avant se lève et les phares pointent trop haut — éblouissant les autres conducteurs et réduisant votre vision de la route immédiate. La plupart des véhicules modernes ont un correcteur de portée manuel ou automatique. Vérifiez-le avant chaque long trajet nocturne. Un phare qui pointe 2° trop haut réduit de 40% la zone éclairée devant vous.",
        bullets: [
          "Le nettoyage du pare-brise : Intérieur et extérieur, sans traces.",
          "Le réglage des phares : Vérifier la hauteur selon la charge de la voiture.",
          "Les essuie-glaces : Doivent être parfaits, le moindre voile d'eau est fatal de nuit.",
          "Le kit d'urgence : Lampe torche, piles, gilets jaunes accessibles."
        ]
      },
      {
        title: "Météo et Nuit : Le Combo Dangereux",
        iconName: "AlertTriangle",
        content: "Pluie et nuit forment l'un des combos les plus dangereux de la conduite. La pluie réduit la portée des phares de 50%, crée des reflets trompeurs sur le marquage au sol, et noie les contrastes visuels que le cerveau utilise pour estimer les distances et les vitesses.",
        secondContent: "Le brouillard nocturne est une menace à part entière : vos phares éclairent les gouttelettes en suspension et créent un 'mur blanc' qui réduit votre visibilité à néant si vous insistez avec les feux de route. La technique correcte : codes + antibrouillards avant uniquement (jamais les 4 en même temps, au risque de gêner les autres). La neige fraiche produit le même phénomène de 'mur blanc'. Et quelle que soit la météo, tripler ses distances de sécurité par rapport à un trajet de jour n'est pas une option : c'est une nécessité physique, dictée par les lois de l'optique et de la mécanique.",
        bullets: [
          "La gestion du brouillard : Anti-brouillards avant et arrière (règles d'usage).",
          "L'aquaplaning nocturne : Sentir la perte d'adhérence sans la voir.",
          "La neige : Pourquoi les pleins phares sont inutilisables (effet mur blanc).",
          "Les distances de sécurité : Les tripler par rapport à un trajet de jour."
        ]
      },
      {
        title: "Checklist du Voyageur Nocturne",
        iconName: "ClipboardCheck",
        content: "Les professionnels du transport ne montent pas dans un camion à 3h du matin sans avoir préparé leur véhicule et leur organisme. La conduite nocturne sérieuse réclame un protocole de préparation aussi rigoureux qu'un pilote vérifie sa checklist avant le décollage. Ce n'est pas de la paranoia — c'est de la responsabilité.",
        secondContent: "La règle d'or est souvent la plus négligée : ne jamais partir pour un long trajet nocturne si vous n'avez pas dormi au moins 7 heures dans les 24 heures précédentes. Une sieste de 20 minutes avant le départ double littéralement votre résistance à la somnolence pour les 3 premières heures. L'utilisation d'une application de surveillance de somnolence (nombreuses disponibles en 2026, certaines intégrées aux voitures) est fortement recommandée pour les trajets de plus de 2 heures.",
        table: {
          headers: ["Action", "Vérification", "Pourquoi ?"],
          rows: [
            ["Nettoyage", "Optiques et vitres", "Maximiser la clarté"],
            ["Éclairage", "Test de toutes les ampoules", "Être vu et voir"],
            ["Repos", "Sieste de 20 min avant départ", "Repousser la fatigue"],
            ["Itinéraire", "Vérifier les zones de travaux", "Éviter les surprises complexes"]
          ]
        }
      },
      {
        title: "FAQ : Les questions sur l'obscurité",
        iconName: "HelpCircle",
        content: "Voici les questions que nos élèves et nos abonnes posent le plus fréquemment sur la conduite nocturne. Certaines semblent anecdotiques — elles ne le sont pas. Ces petits détails font souvent la différence entre un trajet de nuit réussi et un incident.",
        secondContent: "Notre conclusion sur la conduite nocturne est simple : c'est le moment où vous êtes le plus vulnérable, le moins visible, et le moins performant biologiquement. Mais c'est aussi le moment où la préparation et les bons réflexes font le plus de différence. Un conducteur bien formé à la conduite nocturne est statistiquement aussi sûr la nuit que le jour. Tout est dans la connaissance, l'anticipation, et le respect de ses propres limites physiologiques.",
        bullets: [
          "Les lunettes jaunes aident-elles ? Elles améliorent le contraste mais réduisent la quantité de lumière, à utiliser avec prudence.",
          "Puis-je rester en pleins phares sur l'autoroute ? Oui, si personne n'est devant vous ou en face (terre-plein central opaque).",
          "Comment voir les piétons sans trottoir ? Cherchez le mouvement des jambes et les reflets sur les chaussures.",
          "Est-ce que je peux boire du café ? Oui, mais l'effet est temporaire, il ne remplace jamais le sommeil."
        ]
      }
    ]
  },
  {
    slug: "permis-b-a-vincennes-prix-duree-demarches-en-2026",
    title: "Permis B à Vincennes : prix, durée, démarches en 2026",
    subtitle:
      "Prix réel à Vincennes en 2026, délais en Île-de-France, démarches NEPH/ANTS, financement CPF et permis à 1 €/jour, scénario recalé : tout ce qu'il faut savoir avant de signer.",
    excerpt:
      "À Vincennes (94300), le permis B coûte en moyenne 1 800 €, jusqu'à 2 300 € avec un repassage. Délais réels en Île-de-France, démarches NEPH/ANTS pas-à-pas, financement CPF en 2026 et examen pratique à Rungis : le guide complet pour candidats du Val-de-Marne.",
    category: "Examen",
    date: "22 Mai 2026",
    readingTime: "12 min",
    // TODO: replace with final hero image once generated from runs/<slug>/image-prompts.json
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Arike Bello", avatar: "AB" },
    tags: [
      "Permis B",
      "Vincennes",
      "Auto-école 94",
      "ANTS NEPH",
      "CPF permis 2026",
      "Examen Rungis",
      "Prix permis"
    ],
    sections: [
      {
        title: "Combien coûte le permis B à Vincennes en 2026 ?",
        iconName: "BarChart3",
        content:
          "La fourchette de référence vient de l'enquête UFC-Que Choisir 2024, menée sur 1 374 auto-écoles : le prix moyen d'un permis B en France est de 1 800 €, et grimpe à 2 300 € tout compris lorsqu'on inclut un repassage. À Paris, le permis B atteint 2 140 €. Vincennes, en proche couronne est, se situe logiquement entre la moyenne nationale et le tarif parisien — les loyers commerciaux, la pression sur les places d'examen et le coût horaire des moniteurs poussent les forfaits vers le haut, sans atteindre les sommets intra-muros.",
        secondContent:
          "Un forfait standard 20 h d'une auto-école de Vincennes inclut généralement : l'accès au code de la route en salle ou en ligne, vingt heures de conduite, la présentation à l'examen pratique, et les 30 € officiels du passage de l'épreuve théorique générale (ETG), un tarif réglementé partout en France selon Service-Public.gouv.fr. Ce qu'un forfait n'inclut presque jamais : les heures de conduite supplémentaires, facturées en moyenne 43 € de l'heure en auto-école traditionnelle selon Ornikar 2026 ; la seconde présentation à l'examen pratique après un échec ; les frais de dossier ; et certains frais d'inscription ANTS gérés par l'école. Ce sont ces postes qui transforment un forfait affiché bon marché en facture salée. Le choix de la boîte change aussi la donne : selon Ornikar 2026, un permis B en boîte manuelle coûte en moyenne 1 965 €, contre 1 299 € en boîte automatique. L'écart s'explique par le volume horaire minimum légal : 20 heures en boîte manuelle, 13 heures en boîte automatique. Pour le budget précis chez Smoni à Vincennes — forfait, heures sup, examen blanc, financement —, la grille Smoni détaillée est publiée sur notre page Tarifs et fait office de simulateur prix permis B local.",
        tip: {
          label: "Avant de signer",
          text: "Demandez systématiquement le détail écrit du forfait avant de signer : prix de l'heure supplémentaire, frais de présentation à un deuxième passage, et conditions d'annulation. Une auto-école qui refuse de mettre ces chiffres noir sur blanc est un signal d'alerte."
        }
      },
      {
        title: "Combien de temps faut-il pour obtenir son permis B en 2026 ?",
        iconName: "Clock",
        content:
          "La loi fixe un plancher, pas le temps réel. Selon Service-Public.gouv.fr, le volume minimal légal de formation pratique est de 20 heures de conduite en boîte manuelle et 13 heures en boîte automatique. Sur le terrain, la moyenne nationale tourne plutôt autour de 35 heures de conduite — un volume cohérent avec un taux de réussite à l'épreuve pratique de 58,2 % en 2024 selon la Sécurité Routière. Dit autrement : si environ 4 candidats sur 10 échouent au premier passage, c'est notamment parce que 20 heures ne suffisent pas pour la majorité — autant le savoir avant de signer.",
        secondContent:
          "Entre la signature du contrat et le permis en main, comptez entre 3 et 6 mois en Île-de-France hors période de saturation. Les goulots d'étranglement sont connus : le délai d'attribution du numéro NEPH par l'ANTS, la disponibilité des places d'examen pratique via RdvPermis, et le temps de progression pédagogique entre l'évaluation de départ et le seuil examen. L'épreuve pratique elle-même dure 32 minutes selon l'arrêté du 19 février 2010 (Légifrance), dont au moins 25 minutes de conduite effective, environ 5 minutes de conduite autonome, et un temps dédié aux vérifications intérieures et extérieures et aux questions de sécurité, plus une manœuvre imposée par l'inspecteur. Le permis B accéléré, vendu 4 à 8 semaines par certaines auto-écoles, fonctionne — mais à conditions strictes : vraie disponibilité (3 à 5 séances par semaine), bonne aisance dès l'évaluation de départ, discipline entre les leçons. Pour un étudiant en stage ou un actif à plein temps, c'est rarement réaliste. Bonne nouvelle pour les plus jeunes : depuis le décret du 20 décembre 2023, l'âge minimum pour le permis B est de 17 ans (Service-Public.gouv.fr). L'apprentissage anticipé de la conduite (AAC) reste accessible dès 15 ans, et la conduite supervisée est ouverte aux candidats majeurs déjà en formation."
      },
      {
        title: "Les démarches administratives pas-à-pas : NEPH, ANTS, RdvPermis",
        iconName: "ClipboardCheck",
        content:
          "Toute la procédure d'inscription au permis B passe désormais par ants.gouv.fr. Voici la séquence à suivre, dans l'ordre, sans rater une étape.",
        bullets: [
          "Étape 1 — Créer votre compte sur ants.gouv.fr et lancer une demande de permis de conduire, catégorie B.",
          "Étape 2 — Déposer les pièces justificatives : pièce d'identité en cours de validité, justificatif de domicile de moins de 6 mois, photo-signature numérique réalisée chez un photographe agréé ou en cabine ANTS, ASSR2 ou ASR si vous avez moins de 21 ans, et justificatifs de Journée Défense et Citoyenneté (JDC) pour les 17-25 ans (Service-Public.gouv.fr).",
          "Étape 3 — Recevoir votre numéro NEPH, l'identifiant unique du candidat au permis. Il est attribué sous quelques semaines, puis transmis à votre auto-école, qui ouvre votre livret d'apprentissage.",
          "Étape 4 — Passer l'épreuve théorique générale (ETG, le code). L'examen comprend 40 questions, et il faut au minimum 35 bonnes réponses sur 40 pour valider. Tarif officiel : 30 € par passage. Validité du code une fois obtenu : 5 ans, ou jusqu'à 5 tentatives à l'épreuve pratique (Service-Public.gouv.fr).",
          "Étape 5 — Réserver votre place d'examen pratique via la plateforme RdvPermis : vous recevrez une convocation officielle avant le jour J. En Île-de-France, ce passage est obligatoire — votre auto-école se charge généralement de la réservation, mais le compte est nominatif (DRIEAT Île-de-France)."
        ],
        secondContent:
          "Un point crucial souvent ignoré : une place d'examen réservée puis non utilisée déclenche un délai d'attente de 40 jours avant la prochaine réservation, selon la DRIEAT Île-de-France. Un désistement de dernière minute peut décaler votre permis d'un mois et demi. Confirmez votre disponibilité avant chaque réservation, et signalez tout empêchement à votre moniteur au plus vite."
      },
      {
        title: "Financer son permis B en 2026 : CPF, permis à 1 € par jour, échelonnement",
        iconName: "ListChecks",
        content:
          "Trois leviers existent pour étaler ou alléger la facture, et il est légal — et fréquent — de les combiner. Le Compte personnel de formation (CPF) reste mobilisable pour le permis B en 2026, mais le cadre se durcit. Selon Codes Rousseau Pro, le CPF permis B 2026 est plafonné à 900 €. Toujours selon la même source, l'aide de 500 € pour les apprentis souhaitant passer le permis est supprimée à compter du 1er janvier 2026, et l'aide France Travail au permis sera supprimée le 1er avril 2026. Ces dates sont à confirmer auprès de votre conseiller France Travail ou de votre OPCO selon votre situation, le cadre réglementaire pouvant évoluer.",
        secondContent:
          "Le permis à 1 € par jour est un prêt à taux zéro réservé aux 15-25 ans pour une première formation au permis B, A1 ou A2 (Sécurité Routière). Selon le devis de l'auto-école, le montant emprunté peut être de 600 €, 800 €, 1 000 € ou 1 200 €. Le remboursement est de 30 € par mois, et les intérêts sont pris en charge par l'État. Condition non négociable : seule une auto-école labellisée qualité, signataire de la convention type avec l'État, peut proposer ce dispositif. Smoni Vincennes est labellisée Qualiopi et reconnue Qualité Ministère, ce qui rend ce financement accessible chez nous. Quand le CPF ne suffit pas ou n'est pas mobilisable, l'échelonnement direct avec l'auto-école reste l'alternative la plus simple : vous payez en plusieurs mensualités, sans frais bancaires. Combiner un solde CPF, un prêt permis à 1 €, et un échelonnement du reste est parfaitement légal en 2026, et c'est même la configuration la plus fréquente chez nos candidats. Pour chiffrer votre cas précis, prenez 20 minutes avec un conseiller Smoni."
      },
      {
        title: "Recalé à l'examen : combien coûte une deuxième tentative ?",
        iconName: "AlertTriangle",
        content:
          "Première chose à savoir : être recalé n'est pas l'exception. Selon UFC-Que Choisir 2024, environ 40 % des candidats échouent à la première tentative au permis B — c'est cohérent avec un taux de réussite national de 58,2 %. Vous n'êtes ni seul, ni en retard. Vous êtes dans la moyenne.",
        secondContent:
          "Le prix pour repasser le permis B après un échec se découpe en deux postes : les heures de conduite supplémentaires ciblées sur le point faible identifié au débrief, à 43 € de l'heure en moyenne selon Ornikar 2026, et les frais de seconde présentation pratiqués par l'auto-école. Comptez en général 2 à 5 heures supplémentaires utiles, plus le forfait de présentation. En Île-de-France, le délai d'attente entre deux passages oscille en moyenne entre 4 et 8 semaines, selon les places ouvertes par les inspecteurs et la zone d'examen. Bonne nouvelle administrative : tant que la validité du code de la route court, vous n'avez pas à le repasser. Il reste valide 5 ans après son obtention, ou jusqu'à 5 tentatives à l'épreuve pratique (Service-Public.gouv.fr). Vous repassez seulement la conduite. Notre protocole chez Smoni après un échec est précis : on analyse la grille d'évaluation de l'inspecteur, on identifie une ou deux compétences faibles (gestion d'intersection, allure adaptée, contrôles visuels, vérifications, manœuvre), et on bâtit 2 à 5 heures ciblées sur ces points. Un examen blanc est calé dans les conditions de Rungis avant le 2e passage. Pas de moralisation : un protocole concret, centré sur ce qui vous a manqué le jour J."
      },
      {
        title: "Passer son permis B à Vincennes avec Smoni (94300)",
        iconName: "Compass",
        content:
          "Smoni, votre auto-école à Vincennes, est ancrée 94300 à 5 minutes du château — RER A et ligne 1 du métro. Zone couverte : Vincennes, Porte de Vincennes (75012), Saint-Mandé, Fontenay-sous-Bois et l'ouest du Val-de-Marne. Si vous habitez à l'est du périphérique, vous êtes chez nous. Smoni est labellisée Qualiopi et reconnue Qualité Ministère : nos méthodes, notre transparence tarifaire et notre suivi de formation sont audités par l'État, ce qui vous ouvre le permis à 1 € par jour et le financement CPF chez nous. Vos guides pédagogiques sont signés par Arike Bello, monitrice référente sur les centres d'examen du 94 ; tous nos forfaits sont publiés noir sur blanc sur notre page Tarifs.",
        secondContent:
          "Le centre d'examen pratique de rattachement pour les candidats du Val-de-Marne (94) est celui de Rungis, selon la DRIEAT Île-de-France ; le centre de Joinville-le-Pont reste secondaire pour certaines zones limitrophes. C'est un centre exigeant — zones industrielles, quartiers résidentiels, accès rapides aux autoroutes A6 et A86 — et c'est précisément là que vous serez préparé. La méthode : une évaluation de départ honnête, un forfait calibré sur vos besoins réels, des leçons étalées intelligemment, et un examen blanc dans les conditions exactes de Rungis avant votre passage. À titre d'ordre de grandeur, le taux de réussite régional Île-de-France est d'environ 55 % en 2024 (Sécurité Routière), sous la moyenne nationale du fait du trafic et du volume de candidats. Aucun chiffre officiel n'est publié par centre, donc nous ne vous inventerons pas un taux Rungis. Ce qu'on vous garantit, c'est la méthode. Le plus simple pour démarrer, c'est un cours d'évaluation : 1 heure en voiture pour mesurer votre niveau réel et estimer précisément votre forfait."
      },
      {
        title: "FAQ : prix, durée et démarches du permis B en 2026",
        iconName: "HelpCircle",
        content:
          "Les questions les plus fréquentes posées par nos candidats vincennois, avec des réponses sourcées et datées 2026.",
        bullets: [
          "Quel est le prix du permis B en 2026 ? — En moyenne 1 800 € en France pour un forfait 20 heures, et jusqu'à 2 300 € tout compris en incluant un repassage, selon l'enquête UFC-Que Choisir 2024. À Paris, le tarif monte à 2 140 €. À Vincennes, le prix Smoni est publié en clair sur la page Tarifs.",
          "Combien de temps dure l'épreuve pratique du permis B ? — 32 minutes au total, selon l'arrêté du 19 février 2010 (Légifrance) : au moins 25 minutes de conduite effective, environ 5 minutes de conduite autonome, plus les vérifications intérieures et extérieures et une manœuvre imposée par l'inspecteur.",
          "Comment obtenir son numéro NEPH ? — Créez un compte sur ants.gouv.fr et déposez une demande de permis B avec votre pièce d'identité, un justificatif de domicile de moins de 6 mois, votre photo-signature numérique et l'ASSR2 ou l'ASR si vous avez moins de 21 ans. Le NEPH est généralement attribué sous quelques semaines, puis transmis à votre auto-école.",
          "Peut-on payer le permis B avec le CPF en 2026 ? — Oui, dans la limite d'un plafond de 900 € fixé pour 2026, selon Codes Rousseau Pro. L'aide de 500 € pour les apprentis est supprimée au 1er janvier 2026, et l'aide France Travail au permis au 1er avril 2026. Ces calendriers restent à confirmer auprès de votre conseiller.",
          "Quel est le prix pour repasser le permis B après un échec ? — Comptez 2 à 5 heures supplémentaires à 43 € de l'heure en moyenne selon Ornikar 2026, plus les frais de seconde présentation pratiqués par votre auto-école. La validité du code de la route reste de 5 ans après son obtention (Service-Public.gouv.fr), donc vous ne repassez que la conduite.",
          "Où se trouve le centre d'examen pour les candidats de Vincennes ? — À Rungis, pour les candidats du Val-de-Marne (94), Vincennes inclus — selon la DRIEAT Île-de-France. Le centre de Joinville-le-Pont peut être mobilisé en secondaire selon les places disponibles. Rungis couvre zones industrielles, résidentielles et axes rapides A6 et A86.",
          "Quel est le taux de réussite au permis B en Île-de-France ? — Environ 55 % en 2024 selon la Sécurité Routière, contre 58,2 % au niveau national. Aucun chiffre officiel n'est publié au niveau d'un centre comme Rungis, donc tout chiffre local annoncé doit être considéré avec prudence."
        ]
      }
    ]
  },
  {
    slug: "prix-pour-repasser-le-permis-b-apres-echec",
    title: "Prix pour repasser le permis B après échec : guide complet 2026",
    subtitle:
      "Combien coûte vraiment de repasser le permis B après un échec en 2026 ? Delta réel, trois scénarios chiffrés, délais d'attente en Île-de-France et financement CPF post-réforme, expliqués pour les candidats franciliens.",
    excerpt:
      "Repasser le permis B après échec coûte 50 à 600 € en 2026 selon votre situation, et 250 à 450 € pour la majorité des candidats à Vincennes — bien loin des 2 140 € d'un permis complet en Île-de-France. Trois scénarios chiffrés, délais réels franciliens et leviers de financement post-réforme CPF du 21 février 2026 : le guide complet pour rebondir sans se ruiner.",
    category: "Examen",
    date: "22 Mai 2026",
    readingTime: "12 min",
    // TODO: replace with final hero image once generated from runs/<slug>/image-prompts.json
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Arike Bello", avatar: "AB" },
    tags: [
      "Permis B",
      "Échec permis",
      "Repassage",
      "CPF 2026",
      "Auto-école Vincennes",
      "Permis 1€/jour",
      "NEPH",
      "Examen Rungis"
    ],
    sections: [
      {
        title: "Échec au permis B : ce qui se passe vraiment juste après",
        iconName: "AlertTriangle",
        content:
          "Premier recadrage : l'échec à l'épreuve pratique est la norme, pas l'exception. Le taux de réussite en première présentation au permis B s'établissait à 57,5 % en 2023 (Bilan Sécurité Routière 2023, relayé par SANEER). Près de 42,5 % des candidats repassent — vous n'êtes ni seul, ni en retard.",
        secondContent:
          "Deuxième point : vous ne repartez pas de zéro. Votre NEPH reste valide, votre code de la route reste valide 5 ans (Service-Public.fr, 2025), et depuis le décret du 17 novembre 2022 il n'y a plus de plafond de 5 tentatives à l'épreuve pratique tant que le code court. Vous repassez jusqu'à la convocation positive. Troisième point, économique : vous ne \"repayez pas tout\". Le forfait initial reste acquis. Vous réglez uniquement le delta — frais de présentation, heures de conduite supplémentaires, éventuelle nouvelle inscription. La suite chiffre ce delta sur trois scénarios.",
        tip: {
          label: "Bon à savoir",
          text: "Plus de plafond de 5 tentatives à l'épreuve pratique depuis le décret du 17 novembre 2022. Tant que votre code court (5 ans), vous repassez la conduite autant de fois que nécessaire."
        }
      },
      {
        title: "Combien coûte précisément de repasser le permis B en 2026 ?",
        iconName: "Euro",
        content:
          "En 2026, le prix pour repasser le permis B après échec va de 50 € (présentation seule, candidat libre, forfait actif) à 600 € (réinscription avec heures de conduite supplémentaires en auto-école). Pour la majorité des candidats franciliens, comptez 250 à 450 €. Trois variables expliquent le coût : état du forfait initial, heures de conduite nécessaires, formule choisie.",
        secondContent:
          "Ce n'est pas le prix d'un permis B complet (1 804 € national, 2 140 € en Île-de-France selon UFC-Que Choisir 2024 et En Voiture Simone 2026) : le repassage, c'est uniquement le surcoût marginal. Décomposition : (1) frais d'accompagnement à l'examen — souvent inclus ; (2) heures supplémentaires, à partir de 47,40 €/h en boîte manuelle (Lepermislibre 2026), généralement un peu plus en IDF ; (3) frais de dossier si changement d'école. Le code de la route n'est à repasser que si plus de 5 ans se sont écoulés depuis l'obtention (Service-Public.fr) : prévoyez alors 30 € de droit d'examen réglementé. Sinon, code et NEPH restent intacts. Grille détaillée 2026 publiée sur notre page Tarifs."
      },
      {
        title: "Les 3 scénarios de repassage et leur prix réel",
        iconName: "ListChecks",
        content:
          "Trois cas de figure couvrent l'écrasante majorité des candidats qui repassent. Chacun a son coût marginal type et son délai indicatif en Île-de-France en 2026.",
        bullets: [
          "Scénario 1 — Présentation seule. Forfait initial encore actif, vous re-réservez une date. Coût marginal 0 à 100 € selon que les frais de présentation sont inclus ou facturés à part. Délai indicatif 6 à 10 semaines. Cas le plus fréquent quand l'échec arrive tôt dans la formation.",
          "Scénario 2 — Présentation + heures supplémentaires. Forfait actif, besoin de réactivation : typiquement 5 à 10 heures pour consolider. La moyenne nationale est de 35 heures consommées contre les 20 du forfait initial (UFC-Que Choisir 2024) — l'écart couvre tout le parcours, la fourchette 5 à 10 est une estimation observée chez Smoni en 2026. À un tarif francilien estimé autour de 47-55 €/h, comptez 235 à 550 € plus les frais de présentation. Délai 6 à 12 semaines.",
          "Scénario 3 — Réinscription complète. Forfait expiré ou changement d'école : nouveau contrat, frais de dossier (à demander en devis), forfait partiel adapté aux heures restantes. Budget à partir de 600 €, variable selon l'école. Délai 8 à 16 semaines. Cas le plus lourd, le plus rare."
        ],
        secondContent:
          "Hors location véhicule double-commandes en candidat libre et certificat médical éventuel. Variante boîte automatique : moins d'heures en moyenne, mais le permis BEA implique une restriction temporaire à la boîte automatique. Le tarif détaillé chez Smoni est publié en clair sur notre page Tarifs."
      },
      {
        title: "Quand pouvez-vous repasser ? Délais légaux vs délais réels en Île-de-France",
        iconName: "Clock",
        content:
          "Sur le papier, le délai de représentation est de 2 jours date à date après l'échec (Service-Public.fr 2025). Vous pourriez théoriquement repasser le surlendemain. Dans la vraie vie francilienne, c'est tout autre chose.",
        secondContent:
          "La sénatrice Catherine Dumas a rapporté dans sa question écrite n° 07724 au Sénat (9 octobre 2025) que les délais d'attente pour une place d'examen pratique atteignent jusqu'à 8 mois en Île-de-France. Origine du goulot : moins de 1 500 inspecteurs IPCSR pour environ 1,4 million de candidats annuels. La pénurie est née sur le 92, 94 et 95 avant de se généraliser (Permis Mag 2025) — Vincennes est en plein dedans. Concrètement, depuis Vincennes vous passez par Rungis et Joinville-le-Pont. Nous y observons des délais réels de 6 à 10 semaines en 2026 (observation Smoni, non sourcée publiquement) — loin des 8 mois du pire scénario régional, mais bien au-delà des 2 jours légaux. Levier auto-école : votre école dispose d'un quota de places attribuées par la préfecture. Une auto-école active sur RdvPermis vous fera gagner des semaines. Re-réservez dès J+2 : vous pourrez décaler, mais pas avancer une date non posée.",
        tip: {
          label: "Réflexe utile",
          text: "Re-réservez votre date d'examen dès J+2 après l'échec. Vous pourrez toujours la décaler si besoin, mais vous ne pourrez jamais avancer une date qui n'a pas été posée."
        }
      },
      {
        title: "Financer le repassage : CPF, permis 1€/jour et autres leviers en 2026",
        iconName: "Wrench",
        content:
          "La réforme du compte personnel de formation du 21 février 2026 a rebattu les cartes. Désormais, mobiliser son CPF pour le permis B exige soit d'être demandeur d'emploi inscrit à France Travail, soit, pour les salariés, un cofinancement tiers d'au moins 100 € (Mon Compte Formation 2026 ; Service-Public.fr 2026). Le plafond est désormais de 900 € pour les permis du groupe léger.",
        secondContent:
          "Point critique souvent ignoré pour qui cherche un permis B pas cher : si votre CPF a déjà financé votre première inscription, son solde résiduel peut couvrir des heures supplémentaires — uniquement si ces heures étaient déclarées au dossier initial. Sinon, refus a posteriori. Méfiez-vous des promesses \"permis 1€/jour\" sans condition : le dispositif existe (Service-Public.fr, 1er avril 2026) mais reste réservé aux 15-25 ans, en auto-école labellisée \"École conduite qualité\", accordé une seule fois par catégorie (Ornikar 2025). Spécificité repassants : un prêt complémentaire de 300 € peut s'ajouter au prêt initial de 600 à 1 200 € après un échec, remboursement plafonné à 30 €/mois sans intérêt. Aides locales à ne pas négliger : ville, département (Val-de-Marne) et région proposent ponctuellement des aides — vérifiez à la mairie de Vincennes et au Conseil départemental 94. Demandez l'échelonnement : 3 à 4 fois sans frais, rarement affiché, presque toujours négociable."
      },
      {
        title: "Préparation mentale : rebondir sans se saboter à la 2e tentative",
        iconName: "Brain",
        content:
          "Le piège numéro un : attendre trop longtemps pour \"reprendre confiance\". Plus l'attente est longue, plus les automatismes s'érodent. Pas de statistique publique sur le taux d'abandon post-échec, mais nous observons chez Smoni en 2026 que les candidats qui repassent dans les 6 semaines réussissent mieux que ceux qui attendent 3 mois.",
        secondContent:
          "Protocole de 7 jours, à poser sur agenda dès la sortie du centre. (1) Débrief écrit dans les 48 h, livret à l'appui : les 2 ou 3 erreurs éliminatoires précises. (2) Deux heures de conduite ciblées entre J+5 et J+10. (3) Re-réservation avant J+14. Un retry tenu sur dates réussit mieux qu'un retry \"quand je me sentirai prêt\". Travaillez l'erreur précise. Refus de priorité ? Une heure ronds-points. Vitesse mal gérée ? Une heure zones 30. Calage en côte ? Les rampes de Fontenay-sous-Bois. La spécificité bat la généralité. Désensibilisez-vous au stress : une présentation \"blanche\" avec votre moniteur jouant l'inspecteur vaut dix heures de révision théorique. Pour repartir de zéro à Vincennes, voir notre guide complet du permis B à Vincennes ; pour le travail technique, notre page Conduite."
      },
      {
        title: "Questions fréquentes sur le repassage du permis B",
        iconName: "HelpCircle",
        content:
          "Les questions les plus posées par nos candidats post-échec à Vincennes, avec des réponses sourcées et datées 2026.",
        bullets: [
          "Combien coûte de repasser le permis B après un échec ? — Entre 50 € (présentation seule en candidat libre, forfait actif) et 600 € (réinscription avec heures de conduite supplémentaires) en 2026. À Vincennes, comptez 250 à 450 € — bien en-deçà du permis complet (1 804 € national, 2 140 € IDF).",
          "Quand peut-on repasser le permis après un échec ? — Légalement, 2 jours date à date (Service-Public.fr), sans limite de tentatives tant que votre code de la route reste valide 5 ans. En Île-de-France, le délai réel va de 6 semaines à 8 mois — pénurie d'inspecteurs IPCSR marquée sur le 92, 94 et 95.",
          "Faut-il tout repayer si on est recalé au permis B ? — Non. NEPH valide, code valide 5 ans, dossier auto-école valide tant que le contrat court. Vous payez uniquement le delta : frais de présentation (souvent inclus), heures de conduite supplémentaires (à partir de 47,40 €/h, plus en IDF), et le code seulement si plus de 5 ans se sont écoulés.",
          "Le CPF peut-il financer un repassage du permis B en 2026 ? — Depuis le 21 février 2026, le CPF pour le permis B est réservé aux demandeurs d'emploi France Travail ou aux salariés avec cofinancement tiers d'au moins 100 €, plafonné à 900 € (Mon Compte Formation et Service-Public.fr 2026). Pour un repassage, le solde résiduel ne couvre des heures sup que si elles étaient déclarées au dossier initial.",
          "Peut-on repasser le permis B en candidat libre après un échec en auto-école ? — Oui, à condition de récupérer votre NEPH et votre livret d'apprentissage auprès de l'auto-école d'origine. La présentation en candidat libre revient moins cher (l'inscription à l'examen pratique est gratuite auprès de l'État, seule la location d'un véhicule à double commandes est à votre charge), mais vous gérez seul la réservation via RdvPermis — chronophage en Île-de-France.",
          "Que faire si on échoue deux fois au permis B ? — Aucun plafond légal depuis le décret du 17 novembre 2022. Après deux échecs : débrief avec un moniteur différent, leçon d'évaluation pour repartir sur bases neutres, heures ciblées sur les erreurs éliminatoires, présentation blanche avant la 3e tentative. Une fois le permis obtenu, vous entrez en permis probatoire."
        ]
      },
      {
        title: "Repasser le permis B à Vincennes avec Smoni : notre accompagnement post-échec",
        iconName: "Compass",
        content:
          "Smoni est une auto-école Vincennes de quartier ancrée au 94300. Vouvoiement systématique, anti-bullshit, recalés bienvenus — notre ADN. Nous accompagnons chaque semaine des candidats recalés ailleurs. Notre programme retry tient sur 7 jours : débrief écrit dans les 48 heures, deux heures ciblées sur l'erreur éliminatoire, présentation blanche avant la nouvelle date. Une méthode, pas une promesse.",
        secondContent:
          "Côté tarifs, transparence stricte : pas de frais cachés, devis détaillé avant engagement, échelonnement 3 à 4 fois sans frais. Nous sommes certifiés Qualiopi, labellisés Qualité Ministère et \"École conduite qualité\" — éligibles au permis 1€/jour, prêt complémentaire de 300 € après échec inclus. Centre d'examen principal : Rungis, délais observés 6 à 10 semaines en 2026. Pour un diagnostic précis — état du forfait, heures à prévoir, date réaliste — réservez en 2 minutes votre leçon d'évaluation d'une heure, sans engagement. Vous repartirez avec un plan de retry chiffré."
      }
    ]
  },
  {
    slug: "auto-ecole-vincennes-formation-permis-b-2026",
    title: "Auto-école à Vincennes : choisir sa formation permis B en 2026",
    subtitle:
      "Comment choisir une auto-école à Vincennes, comparer les formules permis B, AAC ou boîte automatique, et préparer sereinement votre examen en 2026.",
    excerpt:
      "Choisir une auto-école à Vincennes en 2026, c'est arbitrer entre quatre filières permis B encadrées par Service-Public.gouv.fr (traditionnelle, AAC dès 15 ans, conduite supervisée, boîte automatique), comparer sept critères de qualité dont la certification Qualiopi, et anticiper un examen pratique de 32 minutes noté sur 20 points. Ce guide local détaille la checklist avant signature, les pièges du forfait à 20 heures, et les itinéraires d'apprentissage spécifiques au Bois de Vincennes et à l'est francilien.",
    category: "Formation",
    date: "22 Mai 2026",
    readingTime: "10 min",
    // TODO: replace with final hero image once generated from image-prompts.json
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Arike Bello", avatar: "AB" },
    tags: [
      "Auto-école Vincennes",
      "Permis B 2026",
      "AAC",
      "Conduite supervisée",
      "Boîte automatique",
      "Qualiopi",
      "Val-de-Marne",
      "Formation conduite",
    ],
    sections: [
      {
        title: "Pourquoi choisir une auto-école à Vincennes plutôt qu'à Paris ?",
        iconName: "Compass",
        content:
          "Vincennes (94300) est une commune du Val-de-Marne intégrée à l'intercommunalité Paris Est Marne & Bois, selon le site officiel de la mairie. Sa position immédiatement à l'est de Paris en fait un terrain d'apprentissage très intéressant pour le permis B : la circulation y est dense, mais beaucoup plus prévisible qu'à l'intérieur du périphérique. Le réseau de voies ouvertes — avenues larges autour du Château de Vincennes, accès rapide à l'A4 par la Porte de Bercy, traversée du Bois de Vincennes pour les manœuvres — permet aux moniteurs de couvrir toutes les exigences pédagogiques du référentiel REMC sans subir une heure d'embouteillage par leçon.",
        secondContent:
          "Pour un candidat qui vise un examen pratique dans l'un des centres de la grande couronne est (Rosny-sous-Bois, Nogent-sur-Marne, Joinville), une auto-école implantée à Vincennes offre un avantage logistique réel : les zones d'examen sont traversées régulièrement en formation, ce qui réduit le stress le jour J. À budget équivalent, une heure de conduite à Vincennes vaut souvent une heure et demie à Paris intra-muros, simplement parce que l'on roule plus. Comparer les forfaits ne suffit donc pas — il faut aussi comparer le temps réel passé volant en main.",
        tip: {
          label: "Repère local",
          text: "Demandez systématiquement à votre auto-école si les leçons couvrent au moins une fois chaque centre d'examen accessible depuis Vincennes : c'est l'un des meilleurs indicateurs de préparation réelle.",
        },
      },
      {
        title: "Les 4 formules permis B en 2026 : ce que dit la loi",
        iconName: "Book",
        content:
          "Le cadre réglementaire 2026 s'appuie sur les règles fixées par le Code de la route et précisées sur Service-Public.gouv.fr (fiches F2828 et F2826, vérifiées en mai 2025). Quatre filières coexistent et chacune a des conditions d'âge et d'heures différentes.",
        secondContent:
          "La formule traditionnelle s'adresse aux candidats de 17 ans ou plus, avec un minimum de 20 heures de conduite dont au moins 15 heures sur voies ouvertes (ou 10 heures avec simulateur agréé). L'apprentissage anticipé de la conduite (AAC) ouvre dès 15 ans, suivi d'au moins 1 an et 3 000 km accompagnés, et permet le passage de l'examen à 17 ans avec période probatoire réduite à 2 ans. La conduite supervisée s'adresse aux 18 ans ou plus déjà inscrits qui souhaitent renforcer leur expérience. La boîte automatique raccourcit la formation initiale et reste convertible vers la boîte manuelle.",
        bullets: [
          "Traditionnelle : 17 ans, 20 h minimum dont 15 h sur voies ouvertes (Service-Public.gouv.fr F2828).",
          "AAC : dès 15 ans, 20 h en auto-école puis 1 an et 3 000 km accompagnés (F2826).",
          "Conduite supervisée : 18 ans ou plus, accompagnateur titulaire du permis B depuis 5 ans (F2826).",
          "Boîte automatique (BEA) : durée raccourcie, conversion possible vers boîte manuelle.",
        ],
      },
      {
        title: "Critères pour comparer les auto-écoles à Vincennes",
        iconName: "ListChecks",
        content:
          "Au-delà du prix affiché, sept critères distinguent une auto-école sérieuse à Vincennes d'une enseigne qui maquille ses tarifs. Voici la checklist à parcourir avant de signer.",
        bullets: [
          "Certification Qualiopi : obligatoire pour accepter les financements CPF, audit annuel sur la qualité pédagogique.",
          "Label École conduite qualité : signal fort, attribué après contrôle préfectoral.",
          "Contrat type clair : nombre d'heures, tarif des heures supplémentaires, frais d'examen, conditions de rupture.",
          "Taux de réussite affiché : la transparence sur ce taux est un indicateur clé.",
          "Simulateur agréé : permet de remplacer jusqu'à 10 heures sur voies ouvertes (cadre Service-Public).",
          "Disponibilité du planning : un cycle de plus de 10 jours entre deux leçons allonge mécaniquement la formation.",
          "Examens internes blancs : indispensables avant le passage officiel.",
        ],
        tip: {
          label: "Piège fréquent",
          text: "Le forfait '20 h à 990 €' qui ne couvre ni les frais d'examen, ni l'accompagnement, ni le code, ni la présentation à l'examen. Demandez systématiquement un devis détaillé écrit avant tout versement.",
        },
      },
      {
        title: "Comprendre les coûts d'une formation à Vincennes",
        iconName: "BarChart3",
        content:
          "Le budget total d'un permis B à Vincennes se compose de quatre lignes principales : l'inscription administrative (dossier ANTS, photo, signature électronique), la formation au code de la route (ETG, en présentiel ou en ligne), le forfait de 20 heures de conduite, et le passage de l'examen (présentation + accompagnement). À cela s'ajoutent, pour une large majorité de candidats, des heures supplémentaires — non parce que le candidat est en difficulté, mais parce que les 20 heures réglementaires sont un plancher, pas une moyenne réaliste pour réussir.",
        secondContent:
          "Le fonctionnement transparent consiste à fournir, dès le premier rendez-vous, une grille tarifaire complète : prix de l'heure supplémentaire (souvent au même tarif que les heures du forfait), prix d'une présentation à l'examen, prix d'un rendez-vous pédagogique en AAC. Tout flou sur ces lignes est un signal d'alerte.",
      },
      {
        title: "Préparer l'examen pratique : 32 minutes, 20 points",
        iconName: "Target",
        content:
          "L'examen pratique du permis B est cadré par l'arrêté du 19 février 2010, mis à jour pour 2026. Selon Service-Public.gouv.fr, il dure 32 minutes, et le candidat doit obtenir 20 points ou plus sans commettre d'erreur éliminatoire. La grille couvre la maîtrise du véhicule, le respect du code, l'autonomie de décision, la conscience du risque, et le partage de la route avec les autres usagers.",
        secondContent:
          "Pour les candidats inscrits à Vincennes, les centres d'examen accessibles couvrent l'est francilien. Ce qui compte : avoir conduit dans les conditions du centre d'examen pendant la formation. Les 15 heures minimum sur voies ouvertes prennent ici tout leur sens. Elles ne sont pas une formalité : c'est ce qui transforme une compétence motrice en réflexes de conduite. Une bonne auto-école à Vincennes organise ces heures pour couvrir au moins une fois chaque configuration que l'examinateur peut demander : créneau en pente, demi-tour en sécurité, dépassement, intégration sur voie rapide.",
      },
      {
        title: "Conduite accompagnée à Vincennes : itinéraires malins",
        iconName: "UserCheck",
        content:
          "L'AAC est régulièrement présentée comme la filière la plus solide pour aborder l'examen pratique, en raison du volume de kilomètres accumulés avant le passage. Pour un jeune de 15 à 17 ans à Vincennes, c'est une formule particulièrement adaptée : le Bois de Vincennes permet de travailler les manœuvres lentes en environnement sécurisé, la Nationale 4 et la Nationale 34 fournissent des conditions de route ouverte sans quitter le département, et l'A4 est accessible en quelques minutes pour les phases autoroute.",
        secondContent:
          "Le profil de l'accompagnateur reste strict : permis B depuis 5 ans ou plus, sans retrait du permis dans les 5 années précédentes (Service-Public.gouv.fr F2826). C'est souvent un parent, mais cela peut aussi être un proche, ce que beaucoup de familles ignorent. Les deux rendez-vous pédagogiques de 3 heures avec un moniteur — premier 4 à 6 mois après la formation initiale, second après les 3 000 km parcourus — sont obligatoires et permettent de corriger d'éventuels mauvais réflexes pris en accompagnement. Démarrer trop tard rend la filière mathématiquement impossible : la fenêtre de deux ans entre 15 et 17 ans est juste suffisante pour cumuler les 3 000 km.",
      },
      {
        title: "Qualité d'enseignement : ce que Qualiopi change vraiment",
        iconName: "ShieldAlert",
        content:
          "Qualiopi est devenue, depuis 2022, la certification de référence pour les organismes de formation professionnelle en France — y compris les auto-écoles qui acceptent les financements CPF. Mais Qualiopi va plus loin qu'une simple accréditation administrative : il s'agit d'un audit annuel par un organisme tiers, qui vérifie la qualité pédagogique réelle, la traçabilité des heures, la formation continue des moniteurs, et le suivi individuel des candidats.",
        secondContent:
          "Concrètement, une auto-école certifiée Qualiopi doit pouvoir vous présenter un livret pédagogique nominatif, un suivi écrit après chaque leçon, des objectifs de compétences alignés sur le REMC (Référentiel pour l'Éducation à une Mobilité Citoyenne), et un dispositif d'évaluation finale avant présentation à l'examen. Un audit annuel signifie qu'aucun de ces points ne peut être improvisé. Smoni détient cette certification et la rend consultable.",
      },
      {
        title: "Questions fréquentes",
        iconName: "HelpCircle",
        content:
          "Quatre questions reviennent systématiquement lors des premiers échanges avec les candidats à Vincennes. Voici les réponses cadrées sur le droit en vigueur.",
        bullets: [
          "À quel âge commencer ? AAC dès 15 ans, conduite supervisée à 18 ans, formule classique dès 16 ans pour passer l'examen à 17 ans.",
          "Combien de temps dure la formation ? Minimum 20 heures de conduite ; durée moyenne réelle plus longue. Comptez 4 à 9 mois entre l'inscription et l'obtention selon votre rythme.",
          "Boîte auto ou manuelle ? La BEA raccourcit la formation initiale et reste convertible vers la boîte manuelle après quelques heures supplémentaires.",
          "Candidat libre ? Le code (ETG) peut se passer via une auto-école ou en candidat libre selon Service-Public.gouv.fr ; pour la conduite, l'accompagnement professionnel reste fortement recommandé.",
        ],
      },
    ],
  },
  {
    slug: "prix-permis-b-2026-tarifs-aides-cpf",
    title:
      "Prix du permis B en 2026 : combien ça coûte vraiment et comment payer moins ?",
    subtitle:
      "Tarif moyen, fourchette régionale, permis accéléré, aides CPF et permis 1€/jour : le vrai budget à prévoir et les leviers pour le réduire.",
    excerpt:
      "Le permis B coûte en moyenne 1 804 € en France en 2026, avec une fourchette de 1 468 € à 2 140 €. Mais ce chiffre cache des coûts supplémentaires (heures dépassées, frais annexes) et ignore les aides cumulables — CPF, permis 1€/jour, France Travail, aides régionales — qui peuvent diviser votre reste à charge par deux. Guide complet : décomposition ligne par ligne, comparaison par format, aides 2026 et leviers concrets pour réduire la facture.",
    category: "Conduite",
    date: "22 Mai 2026",
    readingTime: "16 min",
    // TODO: replace with final hero image once generated from image-prompts.json
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Arike Bello", avatar: "AB" },
    tags: [
      "Permis B",
      "Prix permis",
      "CPF 2026",
      "Aides permis",
      "Permis 1€/jour",
      "NEPH",
      "Auto-école Vincennes",
    ],
    sections: [
      {
        title:
          "Le vrai prix du permis B en 2026 (et pourquoi personne ne vous le dit clairement)",
        iconName: "BarChart3",
        content:
          "Quand on tape \"prix permis b\" sur Google, on tombe sur tout et n'importe quoi : des forfaits à 519 €, des moyennes à 1 800 €, des témoignages qui parlent de 3 000 €. La vérité, c'est qu'aucun de ces chiffres n'est faux pris isolément. Mais aucun ne raconte l'histoire complète non plus. En 2026, le permis B coûte en moyenne 1 804 € en auto-école traditionnelle en France, selon les données compilées par UFC Que Choisir et relayées par les plateformes du secteur. La fourchette réelle observée s'étend de 1 468 € à 2 140 € pour un parcours classique. Et ce chiffre, déjà déstabilisant, ne reflète qu'une partie du budget total : il suppose que vous passez votre examen du premier coup, que vous ne dépassez pas le forfait d'heures, et que vous n'avez pas besoin de cours particuliers. Dans la réalité, l'UFC Que Choisir constate qu'un candidat moyen consomme environ 35 heures de conduite, alors que le forfait de base en couvre 20.",
        secondContent:
          "La conséquence est mécanique : la facture finale dépasse presque toujours le devis initial. Et c'est précisément là que se joue la différence entre une bonne décision et une mauvaise. Comprendre la structure du prix avant de signer permet d'éviter les mauvaises surprises et de comparer les auto-écoles sur des critères réels, pas sur un prix d'appel. Dans ce guide, nous décomposons chaque ligne du budget réel d'un permis B en 2026, nous expliquons pourquoi les tarifs varient autant d'une ville à l'autre, et nous listons toutes les aides mobilisables — y compris celles que les auto-écoles ne mentionnent jamais spontanément. Pour voir directement la grille tarifaire d'une auto-école qui affiche tout sans surcoût caché, vous pouvez consulter la page Tarifs.",
      },
      {
        title: "Décomposition ligne par ligne : ce que vous payez vraiment",
        iconName: "ListChecks",
        content:
          "Un permis B ne se résume pas à \"un forfait d'auto-école\". C'est un empilement de postes de coût, dont certains sont fixes et régulés par l'État, d'autres totalement libres. Comprendre cette décomposition, c'est avoir une grille de lecture pour comparer deux devis qui paraissent identiques mais qui ne le sont pas. Voici ce que vous payez réellement quand vous payez votre permis B en 2026.",
        bullets: [
          "Frais d'inscription administrative à l'auto-école : entre 50 € et 250 € selon l'établissement (libre).",
          "Demande de NEPH (Numéro d'Enregistrement Préfectoral Harmonisé) : 0 €, mais l'auto-école peut facturer la gestion du dossier (souvent inclus, parfois 30-80 € en supplément).",
          "Forfait code de la route : 150 à 400 € selon que vous prenez du présentiel illimité ou de l'e-learning.",
          "Examen théorique (le code) : 30 € — tarif officiel uniforme dans toute la France, fixé par l'État.",
          "Forfait conduite (20 heures minimum boîte manuelle, 13 heures boîte automatique) : 800 à 1 600 €.",
          "Heures supplémentaires : 45 à 65 € l'heure en moyenne, parfois plus à Paris.",
          "Présentation à l'examen pratique : entre 0 € (gratuit pour l'État) et 100-200 € (frais d'accompagnement facturés par l'auto-école le jour J).",
          "Frais administratifs annexes (édition du livret, accès plateforme, gestion en ligne) : 0 à 100 €.",
        ],
        secondContent:
          "Le piège classique : un \"forfait à 999 €\" affiché en vitrine ne contient souvent que le code, les 20 heures réglementaires et une présentation à chaque examen. Si vous échouez au code, c'est 30 € de plus. Si vous dépassez 20 heures de conduite — ce qui est statistiquement la norme — chaque heure supplémentaire à 55 € en moyenne s'ajoute. Quinze heures de plus, c'est déjà 825 € de surcoût. Voilà comment un \"forfait à 999 €\" devient un budget réel de 1 800 €. Pour éviter ce piège, demandez systématiquement un devis qui inclut une estimation honnête du nombre d'heures probable, et pas seulement le minimum légal.",
      },
      {
        title:
          "Pourquoi le prix varie autant selon la ville (et l'auto-école)",
        iconName: "Compass",
        content:
          "Un permis B passé à Lille ne coûte pas la même chose qu'un permis B passé à Paris. L'écart peut atteindre 40 % à prestation équivalente. Pourquoi ? Parce que le marché du permis est entièrement dérégulé sur le prix : chaque auto-école fixe ses tarifs librement, et plusieurs facteurs structurels créent ces écarts importants. Le coût du foncier d'abord — un local à Paris coûte plusieurs fois le prix d'un local dans le Nord, et cette charge fixe se répercute sur l'heure de conduite. La densité de trafic ensuite : enseigner la conduite en zone urbaine dense use davantage les véhicules et exige des moniteurs plus expérimentés, donc mieux payés. Enfin, la pression concurrentielle : dans les zones où les auto-écoles en ligne sont très implantées, les écoles traditionnelles sont obligées de tirer leurs prix vers le bas.",
        table: {
          headers: [
            "Zone",
            "Prix moyen permis B 2026",
            "Heure de conduite (moyenne)",
          ],
          rows: [
            ["Paris / Île-de-France", "1 800 € à 2 140 €", "55-65 €"],
            [
              "Grandes métropoles (Lyon, Marseille, Bordeaux)",
              "1 500 € à 1 900 €",
              "50-58 €",
            ],
            [
              "Villes moyennes (Vincennes, Nantes, Rennes)",
              "1 400 € à 1 800 €",
              "48-55 €",
            ],
            ["Province / zones rurales", "1 100 € à 1 400 €", "42-48 €"],
            ["Nord (référence basse)", "1 484 € moyenne", "45 €"],
            ["Auto-écoles 100 % en ligne", "519 € à 1 200 €", "35-45 €"],
          ],
        },
        secondContent:
          "Cette grille n'est pas une fatalité. Vous avez deux leviers concrets. Le premier : si vous habitez à la limite de deux zones, comparez les auto-écoles des deux côtés — la différence sur une frontière administrative peut représenter plusieurs centaines d'euros. Le deuxième : un parcours hybride, où le code se fait en ligne (très peu cher) et la conduite avec une auto-école locale qui connaît bien votre centre d'examen, donne souvent le meilleur ratio prix/réussite. Si vous êtes en région parisienne et que vous souhaitez ce type de parcours hybride à un tarif transparent, l'équipe vous accompagne via la page Préinscription pour un parcours sur mesure.",
      },
      {
        title:
          "Permis classique, accéléré, boîte auto : quel format pour quel budget ?",
        iconName: "Zap",
        content:
          "Trois grands formats coexistent sur le marché, et chacun obéit à une logique économique différente. Choisir le bon format n'est pas qu'une question de prix : c'est aussi une question de temps disponible, de stress toléré et d'objectif de date d'obtention. Voici ce que coûte chaque format en 2026, et dans quel cas il est rationnel de le choisir.",
        bullets: [
          "Permis B classique (boîte manuelle, 20h légales) : 1 400 à 2 100 € en moyenne. Délai 3 à 9 mois. C'est le format universel, qui maximise vos options (vous pourrez conduire toutes les voitures).",
          "Permis B automatique (13h légales) : 1 100 à 1 700 €. Délai souvent plus court car moins d'heures requises. Restriction : vous ne pourrez conduire qu'en boîte automatique (sauf passerelle ultérieure de 7h).",
          "Permis B accéléré (stage intensif) : 959 à 1 469 € en formule en ligne, 1 600 à 2 200 € en formule premium présentielle. Délai 2 à 6 semaines. Format adapté si vous avez un besoin pro urgent et un emploi du temps libérable à 100 %.",
          "Permis 100 % en ligne (Ornikar, lePERMISLIBRE et concurrents) : 519 à 1 200 €. Code en e-learning, conduite avec moniteurs indépendants. Économie réelle mais demande beaucoup d'autonomie.",
        ],
        secondContent:
          "Le réflexe à éviter : choisir uniquement sur le prix d'affichage. Un permis accéléré à 1 600 € peut être plus rentable qu'un permis classique à 1 400 € si vous obtenez votre permis en 4 semaines et que cela vous permet de prendre un emploi 6 mois plus tôt. À l'inverse, un permis en ligne à 519 € peut finir à 1 800 € si vous prenez 25 heures supplémentaires parce que vous n'avez pas trouvé le bon moniteur. Le bon réflexe : raisonner en coût total estimé (forfait + heures supplémentaires prévisibles), pas en prix d'appel.",
        tip: {
          label: "Astuce budget",
          text: "Avant de signer, demandez à voir le taux de réussite à l'examen pratique de l'auto-école pour les 12 derniers mois. Une école avec 75 % de réussite vous coûtera quasi systématiquement moins cher au total qu'une école à 45 %, même si son forfait initial est plus élevé. Le coût d'un échec, c'est 200 à 600 € de leçons supplémentaires plus le délai d'attente d'une nouvelle place d'examen.",
        },
      },
      {
        title:
          "CPF, permis 1€/jour, aides régionales : ce que vous pouvez vraiment toucher en 2026",
        iconName: "HelpCircle",
        content:
          "La majorité des candidats au permis B ignorent l'existence de la moitié des aides auxquelles ils ont droit. Pourtant, en combinant intelligemment plusieurs dispositifs, beaucoup de profils peuvent réduire leur reste à charge de 50 % ou plus. Voici l'inventaire à jour des aides mobilisables pour le permis B en 2026, avec les conditions et les montants concrets — pas les promesses marketing.",
        bullets: [
          "CPF (Compte Personnel de Formation) : peut financer jusqu'à 100 % du permis B si vous justifiez d'un lien avec votre activité professionnelle. Une participation obligatoire du bénéficiaire reste due (100 € forfaitaires, sauf exonération). La réforme 2026 a réintroduit des conditions plus strictes : vérifiez votre solde et l'éligibilité sur moncompteformation.gouv.fr avant de signer un devis.",
          "Permis 1€/jour : prêt à taux zéro pour les 15 à 25 ans, montant de 600 à 1 200 € remboursé à environ 30 € par mois. C'est l'État qui prend en charge les intérêts. Conditions : être en formation initiale ou en début de vie active, présenter une attestation de l'auto-école partenaire.",
          "Aide de France Travail : jusqu'à 1 200 € pour les demandeurs d'emploi dont le permis est un frein direct à un retour à l'emploi. Demande à faire auprès de votre conseiller avant de commencer la formation.",
          "Aides régionales et départementales : 200 à 1 500 € selon votre département. Les conseils régionaux Île-de-France, Hauts-de-France et Auvergne-Rhône-Alpes ont chacun leurs dispositifs. À vérifier sur le site de votre conseil régional.",
          "Aide à l'apprentissage : 500 € versés par l'État aux apprentis majeurs en cours de contrat (dispositif maintenu en 2026).",
          "Aide jeune via la mission locale ou la CAF : variable, souvent forfaitaire (300 à 500 €), conditionnée à un projet professionnel.",
        ],
        secondContent:
          "La règle d'or pour maximiser ces aides : faites votre demande AVANT de signer le contrat avec l'auto-école, pas après. Beaucoup de dispositifs exigent que la formation ne soit pas encore commencée pour ouvrir le financement. Et surtout, les aides peuvent se cumuler. Un apprenti de 19 ans peut, par exemple, combiner le permis 1€/jour (1 200 €), l'aide à l'apprentissage (500 €) et une aide régionale (300 €), pour réduire un budget de 1 800 € à un reste à charge réel inférieur à 100 €. Pour savoir précisément quelles aides vous pouvez activer dans votre situation, l'équipe peut faire un point gratuit avec vous via la page Contact.",
        tip: {
          label: "Vérification CPF",
          text: "Avant de signer un devis qui mobilise votre CPF, exigez de l'auto-école un devis daté et un identifiant de session sur moncompteformation. C'est ce qui vous protège en cas de litige sur les heures effectivement réalisées.",
        },
      },
      {
        title: "Les coûts cachés que personne ne vous facture clairement",
        iconName: "AlertTriangle",
        content:
          "Au-delà du forfait affiché, plusieurs lignes de coût apparaissent en cours de route et peuvent gonfler la facture de 200 à 800 €. Les connaître avant de signer permet soit de les négocier dès le départ, soit de choisir une auto-école qui les inclut déjà. Voici les huit coûts cachés les plus fréquents constatés sur le marché français en 2026.",
        bullets: [
          "Frais de présentation au permis : 80 à 200 € facturés par certaines auto-écoles pour 'l'accompagnement à l'examen' (la place d'examen est gratuite côté État).",
          "Heures de conduite supplémentaires en cas de moniteur absent ou de véhicule indisponible : parfois facturées même quand l'erreur vient de l'école. À clarifier au contrat.",
          "Frais de transfert de dossier si vous changez d'auto-école : 100 à 250 €. Ce frais est encadré mais souvent abusif. Demandez le détail.",
          "Édition du livret d'apprentissage et accès à la plateforme en ligne : 30 à 80 €.",
          "Heures de conduite sur boîte automatique facturées plus cher (5 à 10 € de plus l'heure dans certaines écoles).",
          "Frais de prise en charge dossier ANTS / NEPH : devrait être gratuit, parfois facturé 50-100 €.",
          "Stage de récupération de points si vous accumulez une infraction pendant la période probatoire : 150 à 280 €.",
          "Cours particuliers ou stage de perfectionnement avant examen : 200 à 500 € selon le format.",
        ],
        secondContent:
          "La parade simple : demandez un devis détaillé avec mention \"tout inclus\" et faites-le mentionner sur le contrat. Une auto-école sérieuse n'a aucun problème à le faire. Si l'établissement refuse ou reste vague, c'est un signal de méfiance. La transparence tarifaire est l'un des principaux critères de qualité que retiennent les organismes de contrôle Qualiopi et les fédérations professionnelles, et c'est la même logique que nous appliquons sur la page Tarifs où chaque ligne est listée sans astérisque.",
      },
      {
        title:
          "Comment réduire concrètement votre facture (sans sacrifier la qualité)",
        iconName: "Target",
        content:
          "Réduire le coût de son permis B sans passer par une auto-école au rabais est possible. Cela demande surtout de la méthode et un peu d'anticipation. Voici les sept leviers les plus efficaces, classés par ordre d'impact financier décroissant. Combinés, ils peuvent diviser votre budget par deux.",
        bullets: [
          "Maximiser les aides cumulables (CPF + permis 1€/jour + aide régionale) : économie potentielle de 800 à 2 000 €.",
          "Choisir la boîte automatique si vous n'avez pas besoin de la manuelle : 13h légales au lieu de 20h, économie de 400 à 700 €.",
          "Passer le code en e-learning (15 à 30 €) au lieu d'un forfait présentiel : économie de 150 à 350 €.",
          "Préparer l'examen pratique en conduite accompagnée (AAC) à partir de 15 ans : taux de réussite très supérieur, donc moins d'heures supplémentaires payées et moins d'échecs. Économie indirecte de 300 à 800 €.",
          "Comparer trois auto-écoles minimum, en demandant systématiquement le taux de réussite, le détail du forfait et les frais annexes : économie de 200 à 600 €.",
          "Réserver les heures de conduite par paquets (10 ou 20 heures) plutôt qu'à l'unité : remise fréquente de 5 à 15 %.",
          "Passer son permis en province pendant les vacances si vous étudiez à Paris : économie de 400 à 900 € sur le forfait total.",
        ],
        secondContent:
          "L'erreur la plus coûteuse, ironiquement, c'est de choisir la solution la moins chère sans analyser le taux de réussite. Un permis à 700 € avec 35 % de réussite finit à 1 800 € après deux échecs. Un permis à 1 500 € avec 75 % de réussite reste à 1 500 €. Le bon arbitrage se fait sur le coût total probable, pas sur le prix d'appel. Si vous souhaitez voir une grille construite sur cette logique — chaque ligne incluse, pas de surprise, taux de réussite publié — vous pouvez consulter directement la page Tarifs ou découvrir le détail du parcours sur la page Permis B.",
      },
      {
        title: "Le budget réaliste à prévoir selon votre profil",
        iconName: "Calendar",
        content:
          "Pour conclure, voici quatre profils typiques avec leur budget total réaliste 2026, en intégrant les heures supplémentaires probables, les aides activables et les frais annexes. Utilisez ces fourchettes comme repère pour évaluer si un devis que vous recevez est cohérent ou s'il faut creuser.",
        table: {
          headers: [
            "Profil",
            "Budget brut prévisible",
            "Aides mobilisables",
            "Reste à charge réel",
          ],
          rows: [
            [
              "Étudiant 19 ans, Paris, boîte manuelle",
              "1 900 - 2 200 €",
              "CPF + permis 1€/jour + aide régionale",
              "200 - 700 €",
            ],
            [
              "Apprenti 18 ans, province, boîte auto",
              "1 300 - 1 600 €",
              "Aide apprentissage + permis 1€/jour",
              "100 - 400 €",
            ],
            [
              "Demandeur d'emploi 32 ans, IDF",
              "1 700 - 2 000 €",
              "France Travail + aide régionale",
              "300 - 800 €",
            ],
            [
              "Salarié 28 ans, formule accélérée",
              "1 800 - 2 200 €",
              "CPF (selon solde) + paiement fractionné",
              "500 - 1 500 €",
            ],
          ],
        },
        secondContent:
          "Le permis B reste un investissement important, mais en 2026, c'est aussi l'un des dispositifs de formation les mieux subventionnés en France pour les profils éligibles. Le plus important, c'est de ne pas signer le premier devis venu et de prendre le temps de monter votre dossier d'aides. Une heure consacrée à explorer vos droits peut représenter plusieurs centaines d'euros d'économie réelle. Pour démarrer votre parcours avec une grille tarifaire détaillée et un accompagnement sur les aides mobilisables dans votre situation, vous pouvez passer par la page Préinscription ou consulter la page Tarifs qui détaille chaque ligne de coût.",
        quote: {
          text: "Le vrai prix d'un permis, ce n'est pas le chiffre sur la vitrine. C'est le chiffre à la fin, quand vous tenez le rose entre les mains.",
          author: "Principe de transparence tarifaire (UFC Que Choisir, rapport 2024)",
        },
      },
    ],
  },
  {
    slug: "jai-rate-ma-manoeuvre-au-permis-quoi-faire",
    title:
      "J'ai raté ma manoeuvre au permis : est-ce éliminatoire et comment rebondir ?",
    subtitle:
      "Créneau, demi-tour, marche arrière : ce que la grille mesure vraiment, manoeuvre par manoeuvre, et le drill correctif pour repasser sereinement.",
    excerpt:
      "Rater une manoeuvre au permis n'est presque jamais éliminatoire en soi. Ce qui élimine, c'est la mise en danger — pas le créneau imparfait, pas le demi-tour repris, pas le calage. Guide manoeuvre par manoeuvre : ce que l'examinateur regarde dans sa grille, les vraies erreurs qui font basculer la note, et un drill correctif en 5 séances pour repasser sans la boule au ventre.",
    category: "Examen",
    date: "22 Mai 2026",
    readingTime: "11 min",
    // TODO: replace with final hero image once generated from image-prompts.json
    image:
      "https://images.unsplash.com/photo-1532751203793-812308a10d8e?auto=format&fit=crop&q=80&w=2000",
    author: { name: "Arike Bello", avatar: "AB" },
    tags: [
      "Permis B",
      "Manoeuvre permis",
      "Créneau",
      "Demi-tour",
      "Examen pratique",
      "Échec permis",
      "Auto-école Vincennes",
    ],
    sections: [
      {
        title:
          "J'ai raté ma manoeuvre au permis : est-ce vraiment éliminatoire ?",
        iconName: "HelpCircle",
        content:
          "Vous sortez du véhicule, vous savez exactement à quel moment vous avez tout fait basculer : ce créneau qui s'est terminé à un mètre du trottoir, ce demi-tour où vous avez calé deux fois, cette marche arrière où vous avez mordu la ligne. Et là, une seule question tourne en boucle : c'est éliminatoire, oui ou non ? La réponse honnête, celle qu'on n'entend presque jamais clairement, est plus nuancée que ce que les forums laissent croire. Rater une manoeuvre au permis n'est, dans l'immense majorité des cas, pas éliminatoire en soi. Ce qui élimine, c'est autre chose.",
        secondContent:
          "Première chose à poser sur la table : l'examen pratique du permis B dure environ 32 minutes et il est noté sur 31 points. Pour obtenir le permis, il faut atteindre 20 points minimum et ne commettre aucune faute éliminatoire. Sur cette grille, chaque compétence reçoit une note A, B, C ou D. La compétence qui couvre les manoeuvres est notée comme toutes les autres : vous pouvez très bien obtenir un C sur votre créneau et décrocher quand même votre permis si le reste de votre examen est solide. Ce qui élimine, en revanche, c'est une faute dangereuse — provoquer un freinage d'urgence chez un autre usager, monter sur le trottoir avec un piéton à proximité, refuser une priorité, franchir une ligne continue. Ces fautes-là sont indépendantes de la manoeuvre elle-même.",
        tip: {
          label: "À retenir",
          text: "Un créneau imparfait, un demi-tour repris, un calage pendant une marche arrière : ce sont des points perdus, parfois beaucoup, jamais une élimination automatique. L'élimination vient de la mise en danger, pas du ratage technique.",
        },
      },
      {
        title:
          "Les 5 manoeuvres que l'examinateur peut vous demander (et ce qu'il regarde vraiment)",
        iconName: "ListChecks",
        content:
          "L'arrêté du 19 février 2010, le texte qui encadre les conditions de l'examen, liste précisément les manoeuvres que vous pouvez tirer au sort le jour J. Il y en a cinq, et l'examinateur en choisit une, pas plus.",
        bullets: [
          "Le créneau — stationnement en parallèle entre deux véhicules.",
          "Le rangement en épi — en avant ou en arrière.",
          "Le rangement en bataille — en avant ou en arrière.",
          "La marche arrière en ligne droite — parfois enchaînée d'une marche arrière en courbe.",
          "Le demi-tour — en utilisant la chaussée, parfois une entrée d'allée.",
        ],
        secondContent:
          "Sur chacune, l'examinateur observe quatre choses, dans cet ordre de priorité. D'abord la sécurité : avez-vous regardé partout avant de bouger, contrôlé les angles morts, anticipé les autres usagers ? C'est le critère numéro un. Un créneau parfaitement positionné sans contrôle visuel sera moins bien noté qu'un créneau imparfait mais sécurisé. Ensuite la trajectoire : sans à-coups extrêmes, sans monter sur le trottoir, sans accrocher une autre voiture. Puis la maîtrise du véhicule : embrayage maîtrisé, volant tenu correctement, vitesse lente. Enfin la finalisation : êtes-vous arrivé à un résultat acceptable, même après une reprise ? Vous avez le droit de reprendre une manoeuvre. Reprendre n'est pas raté.",
      },
      {
        title: "Créneau raté : ce qui compte, ce qui ne compte pas",
        iconName: "Target",
        content:
          "Le créneau est la manoeuvre la plus redoutée, et probablement la plus mal comprise. Beaucoup de candidats croient qu'il faut absolument finir collé au trottoir, à 30 centimètres maximum, sinon c'est foutu. C'est faux. Voici ce qui se passe vraiment dans la tête de l'examinateur quand vous faites un créneau.",
        bullets: [
          "Ralenti et signalé avec le clignotant avant de vous positionner — bon début.",
          "Rétroviseur intérieur, rétroviseur gauche, tête tournée avant de braquer — excellent.",
          "Monté sur le trottoir avec un piéton proche — bascule possible vers la faute éliminatoire (mise en danger).",
          "Fini à 80 cm du trottoir au lieu de 30 — points perdus sur la finalisation, mais pas d'élimination.",
          "Repris une ou deux fois calmement — toléré, à condition que la sécurité reste assurée à chaque reprise.",
        ],
        secondContent:
          "Le piège classique, ce n'est pas la finition imparfaite. C'est de paniquer en cours de manoeuvre, d'oublier les contrôles visuels, et de braquer en aveugle pour sauver la manoeuvre. C'est là qu'on bascule du C au D, voire à la faute éliminatoire si on cogne un véhicule garé ou si on déborde sur une voie où circulent d'autres usagers. Si vous avez raté un créneau récemment, posez-vous une seule question : qu'est-ce qui a vraiment lâché ? La trajectoire, ou les contrôles visuels ? La réponse oriente tout le drill correctif. L'équipe peut vous écouter raconter votre examen et identifier la cause réelle via la page Contact.",
      },
      {
        title:
          "Demi-tour : les 3 erreurs qui font perdre des points (et celle qui élimine)",
        iconName: "Compass",
        content:
          "Le demi-tour est techniquement plus simple que le créneau, mais c'est celui où on voit le plus de candidats craquer mentalement. Trois erreurs reviennent en boucle, et une quatrième élimine.",
        bullets: [
          "Ne pas regarder loin devant ET loin derrière avant de bouger : si vous n'observez pas l'absence de véhicules sur 50 à 80 mètres en agglomération, vous prenez un D direct sur la sécurité.",
          "Caler une ou deux fois : perte de points sur la maîtrise, oui. Mais pas éliminatoire. L'important : redémarrer calmement, en refaisant les contrôles visuels.",
          "Reprendre cinq, six, sept fois en oubliant les contrôles à chaque reprise : à ce stade, l'examinateur ne vous reproche pas la manoeuvre en elle-même, il vous reproche d'avoir cessé d'observer.",
          "Forcer la priorité d'un autre usager pour finir votre demi-tour — celle qui élimine. Si une voiture arrive et que vous décidez quand même de couper sa trajectoire, c'est mise en danger.",
        ],
        secondContent:
          "Le réflexe correct, toujours : freiner, attendre, reprendre les contrôles, repartir. Le temps perdu à laisser passer un véhicule n'est jamais comptabilisé contre vous. La précipitation qui crée une situation à risque, elle, oui.",
      },
      {
        title:
          "Marche arrière en ligne droite et rangement en épi : les pièges silencieux",
        iconName: "AlertTriangle",
        content:
          "La marche arrière en ligne droite paraît la manoeuvre la plus facile. C'est aussi celle où le plus grand nombre de candidats perdent des points sans s'en rendre compte. Pourquoi ? Parce qu'ils oublient simplement de tourner la tête. Reculer en ne regardant que par le rétroviseur intérieur est une erreur classique. L'examinateur attend que vous tourniez la tête vers l'arrière droit du véhicule, idéalement en passant le bras sur le siège passager. C'est la position qui prouve que vous voyez réellement la zone derrière vous. Sans ce geste, même si votre trajectoire est parfaite, vous prenez un C sur les contrôles.",
        secondContent:
          "Le rangement en épi, lui, est piégeux pour une autre raison : la fluidité. L'examinateur regarde si vous savez positionner le véhicule dès le premier mouvement, ou si vous multipliez les corrections de volant. Une stratégie qui marche bien : vous arrêter parallèle à la place, faire vos contrôles complets, puis braquer en une seule fois en avançant lentement, embrayage maîtrisé. Si vous devez reprendre, prenez le temps de marquer un arrêt complet avant de repartir. C'est ce temps d'arrêt qui prouve que vous reprenez le contrôle, pas que vous improvisez. Le rangement en bataille suit la même logique, avec une variante : en marche arrière, l'angle de braquage est plus précis. Beaucoup de candidats braquent trop tôt et finissent en biais. La correction se fait en deux temps : reculer un peu, avancer un peu, reculer à nouveau.",
        tip: {
          label: "Le geste qui change tout",
          text: "En marche arrière, tournez la tête vers la lunette arrière droite, bras posé sur le dossier passager. Ce seul geste convaincra l'examinateur que vous voyez ce qui se passe — et passera votre note de C à B sur les contrôles.",
        },
      },
      {
        title:
          "Le drill correctif : 5 séances pour ne plus jamais rater une manoeuvre",
        iconName: "ClipboardCheck",
        content:
          "Maintenant qu'on a compris ce que la grille mesure vraiment, voici un drill correctif qui marche. Il tient en cinq séances de conduite ciblées, idéalement espacées sur trois à quatre semaines. Si vous voulez le faire encadré par un moniteur qui sait exactement quoi corriger, l'équipe peut vous caler un parcours de leçons correctives dédiées via la page Contact.",
        bullets: [
          "Séance 1 — Diagnostic. Vous refaites les cinq manoeuvres sans pression. L'objectif : identifier précisément où votre regard décroche. Le moniteur prend des notes sur les contrôles visuels manqués.",
          "Séance 2 — Contrôles visuels en boucle. Vous reprenez UNE manoeuvre, celle où le diagnostic a montré le plus de trous, et vous la répétez en verbalisant à voix haute chaque contrôle. La séance la moins glamour, la plus utile.",
          "Séance 3 — Reprises propres. Vous travaillez délibérément l'art de reprendre une manoeuvre : marquer l'arrêt, refaire les contrôles, repartir. Transformer la reprise en geste réflexe propre, pas en panique.",
          "Séance 4 — Conditions d'examen. Le moniteur joue l'examinateur, vous tire une manoeuvre au sort, vous l'exécutez sans aide. Débriefing à la fin, pas pendant.",
          "Séance 5 — Simulation complète. Examen blanc de 32 minutes avec manoeuvre intégrée. Si vous obtenez les 20 points sur cette simulation, vous êtes prêt à repasser.",
        ],
        secondContent:
          "Ce drill fonctionne parce qu'il sépare le diagnostic, l'entraînement et la mise en condition. La plupart des candidats échouent à corriger leurs manoeuvres parce qu'ils répètent au hasard, sans cibler la vraie cause de leur erreur. Pour le détail des leçons correctives et stages de préparation à l'examen, la page Services liste les formats disponibles, et la page Tarifs affiche chaque ligne sans astérisque.",
      },
      {
        title:
          "Repasser l'examen sereinement : checklist J-7 et état d'esprit",
        iconName: "Calendar",
        content:
          "À une semaine du repassage, votre travail technique est derrière vous. Les sept derniers jours servent uniquement à arriver dans le bon état mental. Voici ce qui fait la différence.",
        bullets: [
          "Dormez normalement. Ne relisez pas le code la veille à 23h. Votre cerveau a besoin d'être frais, pas saturé.",
          "Le jour J, arrivez 30 minutes en avance au centre d'examen pour éviter la course, le stress du retard, l'embouteillage de dernière minute.",
          "Quand l'examinateur vous donne la manoeuvre, prenez 3 secondes de respiration calme avant de bouger. Ces 3 secondes réactivent la séquence des contrôles répétée en séance 2.",
          "Si vous ratez votre première tentative, reprenez. Marquez l'arrêt, refaites les contrôles, repartez. Ce n'est pas un signe de faiblesse, c'est exactement ce que l'examinateur veut voir.",
          "Sortez de l'examen sans demander à l'examinateur si vous l'avez eu. Vous le saurez par le résultat officiel.",
        ],
        secondContent:
          "Le mot de la fin : raté une manoeuvre, ce n'est pas raté un permis. C'est une donnée, pas un verdict. La grille B est faite pour ça — elle pondère, elle nuance, elle laisse de la place à l'humain qui apprend. Ce qui élimine vraiment, ce n'est pas l'erreur technique, c'est l'erreur de sécurité. Et ça, ça se travaille — séance par séance, contrôle visuel par contrôle visuel. Pour comprendre le coût réel d'un repassage, le guide Prix pour repasser le permis B après échec détaille chaque poste. Et pour démarrer un parcours de leçons correctives ciblées sur vos manoeuvres faibles, la page Contact est la porte d'entrée.",
        quote: {
          text: "Reprendre une manoeuvre n'est jamais éliminatoire. Forcer une priorité pour ne pas la reprendre, si.",
          author: "Principe de la grille d'évaluation E (arrêté du 19 février 2010)",
        },
      },
    ],
  }
];

export const allCategories = ["Tous", "Code", "Conduite", "Mécanique", "Sécurité"];
