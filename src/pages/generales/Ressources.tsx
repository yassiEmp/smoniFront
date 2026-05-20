import Footer from "@components/generales/Footer"
import Header from "@components/generales/Header"
import { CgChevronRight } from "react-icons/cg"
import { Link, useNavigate } from "react-router"
import { motion } from "framer-motion"
import { FiDownload, FiFileText, FiArrowRight } from "react-icons/fi"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import PageHead from "@components/SEO/PageHead"

// Import des fichiers PDF
import pdf1 from "@assets/ressources/1_enjeux_de_la_formation.pdf"
import pdf2 from "@assets/ressources/2_reglement_interieur.pdf"
import pdf3 from "@assets/ressources/3_Apprentissage_Anticipe_Conduite.pdf"
import pdf4 from "@assets/ressources/4_Conduite_supervisee.pdf"
import pdf5 from "@assets/ressources/5_formation_post_permis.pdf"
import pdf6 from "@assets/ressources/6_EVALUATION-DE-DEPART-eval-plus-B.pdf"
import pdf7 from "@assets/ressources/7_Procede_de_positionnement.pdf"
import pdf8 from "@assets/ressources/8_prise_en_compte_du_handicap.pdf"
import pdf9 from "@assets/ressources/9_parcours.pdf"
import pdf10 from "@assets/ressources/10_financeurs.pdf"
import pdf11 from "@assets/ressources/11_description_ttt_reclamations.pdf"
import pdf100Questions from "@assets/smoni100questionsdeverificationssmoniautoecole1.pdf"

interface ResourceSession {
    id: string
    anchor: string
    title: string
    description: string
    document: string
    bulletPoints?: string[]
}

const Ressources = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState<string>('')
    const HEADER_OFFSET = 140 // Offset pour le header fixe + marge

    // Gestion du scroll vers l'ancre si présente dans l'URL au chargement
    useEffect(() => {
        if (location.hash) {
            const elementId = location.hash.replace('#', '')
            // Attendre que le DOM soit complètement chargé
            const timeoutId = setTimeout(() => {
                const el = document.getElementById(elementId)
                if (el) {
                    const yOffset = -HEADER_OFFSET
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
                    window.scrollTo({ top: y, behavior: 'smooth' })
                    setActiveSection(elementId)
                }
            }, 300)
            return () => clearTimeout(timeoutId)
        }
    }, [location])

    const sessions: ResourceSession[] = [
        {
            id: "100-questions",
            anchor: "100-questions",
            title: "100 Questions de Vérifications - SMONI Auto-École",
            description: "Téléchargez notre guide complet de 100 questions de vérifications pour préparer efficacement votre examen du permis de conduire. Ce document regroupe toutes les questions essentielles sur les vérifications intérieures et extérieures du véhicule, ainsi que les questions de sécurité routière et de premiers secours. Un outil indispensable pour réussir votre examen !",
            document: "smoni100questionsdeverificationssmoniautoecole1.pdf"
        },
        {
            id: "enjeux",
            anchor: "enjeux",
            title: "Les enjeux de la formation préparatoire à l'examen du permis de conduire",
            description: "L'automobile est devenue un outil social indispensable pour une très grande partie des jeunes de notre société. Au-delà du plaisir de conduire, l'utilisation d'une voiture est souvent indispensable pour les études, le travail ou les loisirs. Rouler en sécurité est donc une nécessité pour tous. Le programme de formation au permis de conduire est mis en place pour aider les nouveaux conducteurs à se déplacer avec un risque faible de perdre la vie ou de la dégrader. L'objectif général est d'amener tout automobiliste débutant à la maîtrise de compétences en termes de savoir être, savoirs, savoir-faire et savoir devenir. Apprendre à conduire est une démarche éducative exigeante.",
            document: "1_enjeux_de_la_formation.pdf"
        },
        {
            id: "reglement_interieur",
            anchor: "reglement_interieur",
            title: "Notre règlement intérieur",
            description: "Ce règlement a pour objet de définir les règles relatives à l'hygiène, à la sécurité ainsi qu'à la discipline nécessaire au bon fonctionnement de l'établissement SMONI auto-école situé au 62 rue de la Jarry 94300 Vincennes. Ce règlement est applicable par l'ensemble des élèves et de leurs accompagnateurs.",
            document: "2_reglement_interieur.pdf"
        },
        {
            id: "aac",
            anchor: "AAC",
            title: "L'Apprentissage Anticipé Conduite",
            description: "L'AAC, souvent appelée conduite accompagnée, permet aux jeunes dès 15 ans de se familiariser progressivement avec la route. Après une formation initiale en auto-école, l'élève conduit sous la supervision d'un accompagnateur expérimenté, généralement un parent. Cette méthode favorise l'acquisition d'une expérience solide avant l'examen du permis de conduire. Elle développe la confiance, la responsabilité et une meilleure maîtrise des situations de circulation. En plus d'augmenter les chances de réussite à l'examen, elle contribue à une conduite plus sûre et plus responsable dès les premiers trajets en autonomie..",
            document: "3_Apprentissage_Anticipe_Conduite.pdf"
        },
        // Placeholders pour les 6 autres sessions
        {
            id: "cs",
            anchor: "cs",
            title: "La conduite supervisée",
            description: "La conduite supervisée est une étape importante dans l'apprentissage de la conduite automobile. Elle permet à un élève, après avoir réussi l'examen du code de la route et suivi une formation initiale en auto-école, de continuer à se perfectionner aux côtés d'un accompagnateur expérimenté. Cette période offre l'occasion d'acquérir davantage d'assurance, de pratiquer dans diverses conditions de circulation et de renforcer les bons réflexes avant de passer l'examen pratique. C'est une formule souple et formatrice qui favorise une meilleure préparation à la conduite autonome et responsable.",
            document: "4_Conduite_supervisee.pdf"
        },
        {
            id: "post-permis",
            anchor: "post-permis",
            title: "La formation post permis",
            description: "La formation post-permis est une étape volontaire proposée aux jeunes conducteurs ayant obtenu leur permis depuis 6 à 12 mois. Elle vise à renforcer les compétences acquises pendant l'apprentissage et à sensibiliser aux risques de la route.Durant une journée, les participants échangent sur leurs expériences de conduite, analysent leurs comportements et apprennent à mieux anticiper les situations dangereuses. Cette formation permet aussi, dans certains cas, de réduire la durée de la période probatoire. C'est une démarche responsable qui favorise la confiance, la sécurité et une meilleure maîtrise de la route.",
            document: "5_formation_post_permis.pdf"
        },
        {
            id: "procede-evaluation",
            anchor: "procede-evaluation",
            title: "Le procédé d'évaluation",
            description: "Les catégories de compétences évaluées durant cette heure sont :",
            document: "6_EVALUATION-DE-DEPART-eval-plus-B.pdf",
            bulletPoints: [
                "Les capacités et connaissances sensori-motrices",
                "Les capacités de compréhension et de traitement",
                "Les aspects émotionnels et affectifs",
                "Les facteurs de volonté",
                "Les capacités de perception, d'analyse et de décision",
                "Les capacités d'attention et de mémoire de travail"
            ]
        },
        {
            id: "positionnement",
            anchor: "positionnement",
            title: "Le procédé de positionnement",
            description: "Ce court questionnaire nous permettra de clarifier votre projet professionnel et d'adapter votre formation à vos besoins spécifiques",
            document: "7_Procede_de_positionnement.pdf"
        },
        {
            id: "handicap",
            anchor: "handicap",
            title: "Vous êtes en situation de handicap",
            description: "Vous êtes en situation de handicap et vous souhaitez passer votre permis ? Malheureusement SMONI n'est pas spécialisé dans ce domaine, toutefois ce document vous permettra de vous orienter vers les bonnes personnes.",
            document: "8_prise_en_compte_du_handicap.pdf"
        },
        {
            id: "parcours",
            anchor: "parcours",
            title: "Modalités d'organisation des formations théoriques et pratiques",
            description: "Vous allez apprendre à manipuler une automobile, à circuler dans différentes configurations et à en connaître les risques et les limites. Cela demande de la motivation et de la persévérance. Le parcours de formation qui vous est proposé vous permettra de progresser, de connaître les règles du code de la route, de devenir un conducteur responsable et de vous préparer aux examens du permis de conduire.",
            document: "9_parcours.pdf"
        },
        {
            id: "financement",
            anchor: "financement",
            title: "Financement du permis",
            description: "Obtenir le permis de conduire représente souvent un investissement important, mais plusieurs dispositifs existent pour en faciliter le financement. Parmi ces dispositifs on peut trouver le CPF, les missions locales ou encore certaines régions et collectivités locales. Ces dispositifs visent à rendre le permis de conduire plus accessible, en particulier pour les jeunes et les personnes en insertion professionnelle",
            document: "10_financeur.pdf"
        },
        {
            id: "traitement_reclamations",
            anchor: "traitement_reclamations",
            title: "Modalité de traitement des réclamations",
            description: "SMONI auto-école accorde une importance particulière à la satisfaction de ses élèves et s’engage à traiter chaque réclamation avec sérieux, transparence et réactivité. Dès qu’une remarque ou une insatisfaction est exprimée, une écoute attentive est assurée afin de comprendre la situation et d’y apporter une réponse adaptée. Un suivi personnalisé est mis en place pour chaque dossier, permettant d’analyser les causes du problème et de proposer des solutions concrètes dans les meilleurs délais. L’objectif est d’améliorer en permanence la qualité des services et de garantir une expérience d’apprentissage sereine et équitable pour tous les élèves. Chaque retour client est considéré comme une opportunité d’évolution et de perfectionnement, dans un esprit de dialogue et de confiance.",
            document: "11_description_ttt_reclamations.pdf"
        }
    ]

    // Fonction pour scroller vers une section
    const scrollToSection = (anchor: string, event?: React.MouseEvent) => {
        // Empêcher la propagation de l'événement
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
        
        // Vérifier que l'ancre est valide
        if (!anchor) {
            console.warn('Ancre non définie')
            return
        }
        
        // Attendre un peu pour s'assurer que le DOM est prêt (surtout sur mobile)
        setTimeout(() => {
            const el = document.getElementById(anchor)
            if (el) {
                // Utiliser scrollIntoView avec options pour un meilleur contrôle sur mobile
                const yOffset = -HEADER_OFFSET
                const elementTop = el.getBoundingClientRect().top
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0
                const y = elementTop + scrollTop + yOffset
                
                // Sur mobile, utiliser scrollIntoView avec block: 'start' et inline: 'nearest'
                if (window.innerWidth < 768) {
                    // Utiliser scrollIntoView qui est plus fiable sur mobile
                    el.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    })
                    // Ajuster manuellement après le scroll pour compenser le header
                    setTimeout(() => {
                        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0
                        window.scrollTo({ top: currentScroll + yOffset, behavior: 'smooth' })
                    }, 150)
                } else {
                    window.scrollTo({ top: y, behavior: 'smooth' })
                }
                
                // Mettre à jour l'URL et l'état
                navigate(`/ressources#${anchor}`, { replace: true })
                setActiveSection(anchor)
            } else {
                console.warn(`Élément avec l'ancre "${anchor}" non trouvé`)
            }
        }, 50)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 260,
                damping: 20
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.3
            }
        }
    }

    // Mapping entre les noms de documents et leurs imports
    const documentMap: Record<string, string> = {
        "smoni100questionsdeverificationssmoniautoecole1.pdf": pdf100Questions,
        "1_enjeux_de_la_formation.pdf": pdf1,
        "2_reglement_interieur.pdf": pdf2,
        "3_Apprentissage_Anticipe_Conduite.pdf": pdf3,
        "4_Conduite_supervisee.pdf": pdf4,
        "5_formation_post_permis.pdf": pdf5,
        "6_EVALUATION-DE-DEPART-eval-plus-B.pdf": pdf6,
        "7_Procede_de_positionnement.pdf": pdf7,
        "8_prise_en_compte_du_handicap.pdf": pdf8,
        "9_parcours.pdf": pdf9,
        "10_financeur.pdf": pdf10,
        "11_description_ttt_reclamations.pdf": pdf11,
    }

    const handleDownload = (documentName: string) => {
        const fileUrl = documentMap[documentName]
        if (!fileUrl) {
            console.error(`Document non trouvé: ${documentName}`)
            return
        }
        
        const link = document.createElement('a')
        link.href = fileUrl
        link.download = documentName
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <PageHead
                title="Ressources et documents - Smoni Auto-Ecole Vincennes"
                description="Telechargez les documents officiels de Smoni Auto-Ecole : reglement interieur, parcours de formation, financement et fiches pratiques."
                canonicalPath="/ressources"
            />
            <Header />
            <div className="pt-[120px] relative overflow-hidden">
                <div className="min-h-screen">
                    {/* Breadcrumb */}
                    <div className="container flex justify-center mx-auto py-4 px-4 md:px-6 pt-8 lg:pt-16">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/"
                                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-black"
                                    >
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <CgChevronRight className="w-4 h-4 text-muted-foreground" />
                                        <span className="ml-1 text-sm font-bold text-primary md:ml-2">Ressources</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 lg:mb-12 text-center"
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
                                Ressources
                            </h1>
                            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                                Découvrez nos ressources documentaires pour vous accompagner dans votre formation au permis de conduire.
                            </p>
                        </motion.div>

                        {/* Table des matières */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1 w-12 bg-primary rounded-full"></div>
                                <h2 className="text-2xl md:text-3xl font-bold text-primary">Table des matières</h2>
                                <div className="h-1 flex-1 bg-primary/20 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {sessions.map((session, index) => (
                                    <motion.button
                                        key={session.id}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            scrollToSection(session.anchor, e)
                                        }}
                                        type="button"
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`group relative text-left p-5 rounded-xl transition-all duration-300 overflow-hidden ${
                                            activeSection === session.anchor
                                                ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/30'
                                                : 'bg-white text-gray-800 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 border-2 border-gray-200 hover:border-primary/30 shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        {/* Effet de brillance au hover */}
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] ${
                                            activeSection === session.anchor ? 'via-white/20' : ''
                                        }`}></div>
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg transition-all duration-300 ${
                                                    activeSection === session.anchor
                                                        ? 'bg-white/20 text-white scale-110'
                                                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <FiArrowRight className={`w-5 h-5 transition-all duration-300 ${
                                                    activeSection === session.anchor
                                                        ? 'text-white translate-x-1'
                                                        : 'text-gray-400 group-hover:text-primary group-hover:translate-x-1'
                                                }`} />
                                            </div>
                                            <h3 className={`font-semibold text-sm md:text-base leading-tight line-clamp-2 transition-colors duration-300 ${
                                                activeSection === session.anchor
                                                    ? 'text-white'
                                                    : 'text-gray-800 group-hover:text-primary'
                                            }`}>
                                                {session.title}
                                            </h3>
                                        </div>
                                        
                                        {/* Indicateur de section active */}
                                        {activeSection === session.anchor && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Sessions List */}
                        <motion.div
                            className="max-w-5xl mx-auto space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {sessions.map((session, index) => (
                                <motion.section
                                    key={session.id}
                                    id={session.anchor}
                                    className={`bg-white rounded-lg shadow-md border-2 overflow-hidden transition-all duration-300 ${
                                        activeSection === session.anchor
                                            ? 'border-primary shadow-lg scale-[1.02]'
                                            : 'border-gray-200'
                                    }`}
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <div className="p-6 md:p-8">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <button
                                                    onClick={() => scrollToSection(session.anchor)}
                                                    className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity w-full text-left"
                                                >
                                                    <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${
                                                        activeSection === session.anchor
                                                            ? 'bg-primary text-white scale-110'
                                                            : 'bg-gray-200 text-gray-700'
                                                    }`}>
                                                        {index + 1}
                                                    </span>
                                                    <h2 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                                                        activeSection === session.anchor
                                                            ? 'text-primary'
                                                            : 'text-gray-800'
                                                    }`}>
                                                        {session.title}
                                                    </h2>
                                                </button>
                                                <div className="text-muted-foreground mt-3 leading-relaxed">
                                                    <p>{session.description}</p>
                                                    {session.bulletPoints && session.bulletPoints.length > 0 && (
                                                        <ul className="mt-4 space-y-2 list-disc list-inside">
                                                            {session.bulletPoints.map((point, idx) => (
                                                                <li key={idx}>{point}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <motion.button
                                                onClick={() => handleDownload(session.document)}
                                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FiDownload className="w-5 h-5" />
                                                <span>Télécharger le document</span>
                                                <FiFileText className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.section>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Ressources

