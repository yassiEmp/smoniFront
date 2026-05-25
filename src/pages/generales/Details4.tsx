import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "motion/react";
import { ArrowRightLeft, FileText, MousePointerClick, Check, ArrowLeft, Clock, ShieldCheck, BookOpen, AlertTriangle, Car, ChevronDown, MapPin, GraduationCap, Scale, CircleDollarSign, Zap, Route, UserCheck, CalendarCheck, Repeat2, BadgeCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageHead from "@components/SEO/PageHead";
import JsonLd from "@components/SEO/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@components/SEO/schemas";
import RelatedServices from "@components/SEO/RelatedServices";

const Details4 = () => {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const smoothX = useSpring(mousePos.x, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mousePos.y, { damping: 50, stiffness: 400 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const documents = [
        { title: "Justificatif d'identité et Domicile", desc: "Vos documents classiques pour l'enregistrement (ID et Quittance)." },
        { title: "Attestation de sécurité routière", desc: "ASSR ou document valide." },
        { title: "Permis B BVA Actuel", desc: "Photocopie de votre permis boîte automatique obtenu en titre définitif." },
        { title: "Photo d'identité", desc: "Une e-photo d'identité récente (moins de 6 mois)." }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <PageHead
                title="Passerelle boite auto vers boite manuelle - Smoni"
                description="Formation passerelle pour passer du permis boite automatique a la boite manuelle a Vincennes (94300) avec Smoni Auto-Ecole."
                canonicalPath="/passerelle"
                ogImage="/og/passerelle.png"
            />
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Accueil", path: "/" },
                        { name: "Passerelle B78", path: "/passerelle" },
                    ]),
                    serviceSchema({
                        name: "Passerelle boîte automatique vers manuelle (B78)",
                        description:
                            "Formation passerelle 7h pour passer du permis B automatique au permis B manuel chez Smoni Vincennes.",
                        path: "/passerelle",
                    }),
                ]}
            />
            <Header />

            {/* Hero Section */}
            <main className="relative pt-[120px] sm:pt-[140px] pb-16 md:pb-24 overflow-hidden border-b border-slate-200">
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                radial-gradient(at 0% 0%, rgba(44, 40, 118, 0.04) 0px, transparent 50%),
                                radial-gradient(at 100% 0%, rgba(44, 40, 118, 0.06) 0px, transparent 50%)
                            `
                        }}
                    />
                    <motion.div
                        className="fixed w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
                            left: 0, top: 0, translateX: '-50%', translateY: '-50%',
                            x: typeof window !== 'undefined' ? smoothX.get() * 15 + window.innerWidth / 2 : 0,
                            y: typeof window !== 'undefined' ? smoothY.get() * 15 + window.innerHeight / 2 : 0,
                        }}
                    />
                </div>

                <motion.div
                    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-cyan-50 text-cyan-600 rounded-full border border-cyan-100 shadow-sm mb-6 font-bold"
                    >
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Formation Courte</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Passerelle Boîte Auto <br /> <span className="bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent italic pr-2">vers Manuelle.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Vous avez obtenu votre permis sur boîte automatique et souhaitez conduire un véhicule avec embrayage ? Smoni certifie votre passage officiel sur boîte manuelle.
                    </motion.p>

                    <motion.div variants={itemVariants} className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 mb-10 border border-slate-200 max-w-xl mx-auto shadow-sm">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="font-medium">Formation de 7h</span>
                                <span className="font-bold">430€</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="font-medium">Frais de dossier</span>
                                <span className="font-bold">89€</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="font-medium">Demande de fabrication du permis</span>
                                <span className="font-bold">30€</span>
                            </div>
                            <div className="h-px bg-slate-200 my-1" />
                            <div className="flex justify-between items-center text-[#2c2876] text-xl">
                                <span className="font-black">Total Pack Passerelle</span>
                                <span className="font-[900]">549€</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => { navigate('/learners/boutique'); window.scrollTo(0, 0); }}
                            className="bg-cyan-600 text-white hover:bg-cyan-700 rounded-2xl px-10 h-16 text-xl font-black shadow-[0_15px_30px_-10px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.03] border-none"
                        >
                            S'inscrire pour 549€ <MousePointerClick className="ml-2 w-6 h-6" />
                        </Button>
                    </motion.div>
                </motion.div>
            </main>

            <section className="py-16 md:py-24 bg-white relative z-10">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        {/* L'avantage */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl font-extrabold text-[#2c2876] mb-6 tracking-tight"
                            >
                                Une formation rapide (7H)
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed">
                                Sans avoir à repasser d'examen de la conduite, vous recevez une attestation officielle après 7 heures de formation pratique visant à maitriser la gestion de la pédale d'embrayage et la boîte de vitesse.
                            </motion.p>
                            <motion.ul variants={containerVariants} className="space-y-5">
                                {[
                                    "Pas de nouvel examen ! Remise d'une attestation",
                                    "Apprentissage sur la gestion du point de patinage",
                                    "Aide au perfectionnement des trajectoires (frein moteur)",
                                    "Valable 3 mois après l'obtention du permis BVA"
                                ].map((perk, i) => (
                                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100/50">
                                        <div className="min-w-6 min-h-6 bg-cyan-100 rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-cyan-600 font-bold" />
                                        </div>
                                        <span className="text-[#2c2876] font-bold text-sm tracking-wide">{perk}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Documents à fournir */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants} className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                                        <FileText className="w-6 h-6 text-[#2c2876]" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-[#2c2876] tracking-tight">Pièces justificatives</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-6">Pour pouvoir créer et valider la certification à l'issue de cette période, vous devez amener :</p>

                                <div className="space-y-3">
                                    {documents.map((doc, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                                        >
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2c2876] text-white rounded-xl flex items-center justify-center font-black shadow-inner shrink-0 text-base">
                                                {idx + 1}
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-[#2c2876] mb-1 leading-tight text-sm">{doc.title}</h3>
                                                <p className="text-slate-400 text-xs leading-snug">{doc.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 1 — Formation passerelle BVA manuelle    */}
            {/*  Design: Newspaper two-column editorial split          */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-12">
                            <span className="text-cyan-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">01 — Le cadre légal</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tight leading-[1.1] mb-6">
                                Formation passerelle <span className="text-cyan-600">boîte automatique vers manuelle</span> à Paris
                            </h2>
                        </motion.div>

                        {/* Newspaper two-column text layout */}
                        <motion.div variants={itemVariants} className="columns-1 md:columns-2 gap-12 text-[#6e6e73] text-[15px] leading-[1.85] space-y-6">
                            <p>
                                La formation passerelle, encadrée par l'arrêté du 14 octobre 2016 modifiant l'arrêté du 20 avril 2012, permet aux titulaires d'un permis B à embrayage automatique (code 78) de lever cette restriction et de conduire légalement des véhicules à boîte manuelle. Cette formation pratique de 7 heures, dispensée par une auto-école agréée comme SMONI, débouche sur la délivrance d'une attestation officielle qui autorise la conduite de tout véhicule de catégorie B.
                            </p>
                            <p>
                                Contrairement aux idées reçues, il ne s'agit pas de repasser l'examen du permis de conduire. La formation passerelle se concentre exclusivement sur la maîtrise de l'embrayage, le passage des vitesses et l'adaptation de votre conduite aux spécificités mécaniques d'un véhicule à boîte manuelle. À l'issue des 7 heures, votre moniteur vous remet une attestation qui vous permet de demander la fabrication d'un nouveau permis sans la mention restrictive 78.
                            </p>
                            <p>
                                Cette formation est accessible dès 3 mois après l'obtention de votre permis BVA. C'est une démarche simple, rapide et particulièrement économique comparée au coût total d'un permis classique en boîte manuelle, qui nécessite au minimum 20 heures de conduite obligatoires. La passerelle vous offre la liberté de conduire n'importe quel véhicule sans être limité dans vos choix de location ou d'achat automobile.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 2 — Programme de la formation 7h         */}
            {/*  Design: Vertical timeline with alternating sides      */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="text-center mb-16">
                            <span className="text-teal-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">02 — Programme détaillé</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Les 7 heures de formation passerelle en détail
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-2xl mx-auto">Chaque minute de votre formation est structurée pour maximiser votre apprentissage de la boîte manuelle.</p>
                        </motion.div>

                        {/* Vertical timeline */}
                        <div className="relative">
                            {/* Center line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-200 via-teal-200 to-emerald-200 -translate-x-1/2" />

                            <div className="space-y-8 md:space-y-0">
                                {[
                                    { hours: "H1–H2", title: "Découverte de l'embrayage et démarrage", text: "Vous apprenez le fonctionnement mécanique de l'embrayage, le point de patinage et les démarrages en douceur sur terrain plat. L'objectif est de ressentir la mécanique, pas simplement la comprendre.", side: "left" },
                                    { hours: "H2–H3", title: "Passage des vitesses en circulation calme", text: "Premiers passages de vitesses sur des axes à faible circulation. Vous travaillez la coordination pied gauche / main droite et la synchronisation accélérateur-embrayage sur les rapports 1 à 3.", side: "right" },
                                    { hours: "H3–H4", title: "Rétrogradation et frein moteur", text: "Apprentissage du rétrogradage progressif et de l'utilisation du frein moteur en descente. Vous comprenez quand et pourquoi changer de rapport en fonction de la vitesse et du régime moteur.", side: "left" },
                                    { hours: "H4–H5", title: "Démarrage en côte et manœuvres", text: "Maîtrise du démarrage en côte sans caler ni reculer. Pratique du créneau, du demi-tour et des manœuvres de précision avec la gestion simultanée de l'embrayage.", side: "right" },
                                    { hours: "H5–H7", title: "Conduite en conditions réelles à Paris", text: "Deux heures complètes de conduite en situation réelle dans le trafic parisien : gestion des embouteillages, ronds-points, insertions sur le périphérique. C'est la mise en pratique intégrale de tout ce que vous avez appris.", side: "left" },
                                ].map(({ hours, title, text, side }, i) => (
                                    <motion.div key={i} variants={itemVariants} className={`relative md:flex items-center gap-8 ${side === "right" ? "md:flex-row-reverse" : ""} md:min-h-[160px]`}>
                                        {/* Content */}
                                        <div className={`md:w-[calc(50%-2rem)] ${side === "right" ? "md:text-left" : "md:text-right"}`}>
                                            <div className={`bg-[#f8fafc] rounded-2xl p-6 border border-slate-200 hover:border-cyan-200 transition-colors ${side === "right" ? "" : "md:ml-auto"}`}>
                                                <span className="text-cyan-500 font-black text-xs tracking-widest block mb-2">{hours}</span>
                                                <h3 className="font-bold text-[#1d1d1f] text-base mb-2">{title}</h3>
                                                <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                            </div>
                                        </div>
                                        {/* Center dot */}
                                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-white shadow-md z-10" />
                                        {/* Spacer for the other side */}
                                        <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 3 — Permis BVA restriction 78            */}
            {/*  Design: Before/After horizontal split panel           */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-amber-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">03 — Avant / Après</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Supprimez la restriction code 78 de votre permis
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">La mention 78 limite votre permis aux seuls véhicules automatiques. Voici concrètement ce qui change après la passerelle.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 rounded-3xl overflow-hidden border border-slate-200">
                            {/* Before */}
                            <div className="bg-white p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-black text-red-600 uppercase tracking-wider text-sm">Avant la passerelle</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Conduite limitée aux véhicules à boîte automatique",
                                        "Impossible de louer la majorité des voitures en Europe",
                                        "Choix restreint à l'achat (gamme BVA plus chère)",
                                        "Mention 78 visible sur votre permis de conduire",
                                        "Ne peut pas conduire un utilitaire à boîte manuelle",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 shrink-0" />
                                            <span className="text-sm text-[#6e6e73]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* After */}
                            <div className="bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                                        <BadgeCheck className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-black text-emerald-600 uppercase tracking-wider text-sm">Après la passerelle</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Permis B complet : manuelle et automatique",
                                        "Location libre de tout véhicule partout dans le monde",
                                        "Accès à toutes les gammes, y compris les sportives",
                                        "Nouveau permis sans aucune mention restrictive",
                                        "Utilitaires, camionnettes, fourgons accessibles",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                            <span className="text-sm text-[#1d1d1f] font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 4 — Délai & éligibilité passerelle       */}
            {/*  Design: Single wide info banner + inline highlights   */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-violet-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">04 — Éligibilité</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Quand et comment faire sa passerelle boîte manuelle ?
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#2c2876] to-indigo-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                <div>
                                    <div className="text-5xl font-black text-white mb-2">3</div>
                                    <div className="text-cyan-300 font-bold text-sm uppercase tracking-widest mb-2">Mois minimum</div>
                                    <p className="text-white/60 text-sm leading-relaxed">Délai obligatoire après l'obtention de votre permis BVA avant de pouvoir suivre la formation passerelle.</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-white mb-2">7</div>
                                    <div className="text-cyan-300 font-bold text-sm uppercase tracking-widest mb-2">Heures de formation</div>
                                    <p className="text-white/60 text-sm leading-relaxed">Durée légale de la formation passerelle. Ni plus, ni moins. C'est un programme national standardisé et réglementé.</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-white mb-2">0</div>
                                    <div className="text-cyan-300 font-bold text-sm uppercase tracking-widest mb-2">Examen à passer</div>
                                    <p className="text-white/60 text-sm leading-relaxed">Aucune épreuve finale. Votre moniteur valide vos compétences et vous remet directement l'attestation officielle.</p>
                                </div>
                            </div>

                            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        <span className="font-bold text-white">Important :</span> le délai de 3 mois court à partir de la date d'obtention de votre permis B automatique, c'est-à-dire la date de réussite à l'épreuve pratique, et non la date de réception du titre. Si vous avez obtenu votre permis il y a plus de 3 mois, vous pouvez commencer la formation immédiatement chez SMONI.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 5 — Pourquoi lever la restriction 78     */}
            {/*  Design: Masonry-style text grid (2 wide + 3 narrow)  */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f0f4f8]">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-rose-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">05 — Les raisons</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Pourquoi passer de la boîte automatique à la boîte manuelle ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">Cinq raisons concrètes qui poussent les conducteurs parisiens à faire la passerelle.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                            {/* Wide block 1 */}
                            <motion.div variants={itemVariants} className="md:col-span-3 bg-white rounded-3xl p-8 border border-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Car className="w-6 h-6 text-[#2c2876]" />
                                    <h3 className="font-bold text-[#1d1d1f] text-lg">Location de voitures à l'étranger</h3>
                                </div>
                                <p className="text-[#6e6e73] text-sm leading-relaxed">
                                    En Europe du Sud, en Asie et dans de nombreux pays, les loueurs proposent principalement des véhicules à boîte manuelle. Les modèles automatiques sont souvent facturés avec un supplément de 30 à 50% par jour. Avec un permis complet, vous louez ce que vous voulez, où vous voulez, au tarif le plus avantageux.
                                </p>
                            </motion.div>

                            {/* Wide block 2 */}
                            <motion.div variants={itemVariants} className="md:col-span-3 bg-white rounded-3xl p-8 border border-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <CircleDollarSign className="w-6 h-6 text-[#2c2876]" />
                                    <h3 className="font-bold text-[#1d1d1f] text-lg">Marché de l'occasion plus accessible</h3>
                                </div>
                                <p className="text-[#6e6e73] text-sm leading-relaxed">
                                    Sur le marché de l'occasion français, les véhicules à boîte manuelle représentent encore la majorité des offres et sont généralement moins chers à l'achat. En ouvrant votre permis à la boîte manuelle, vous multipliez par trois le nombre d'annonces accessibles et vous négociez à de meilleurs tarifs.
                                </p>
                            </motion.div>

                            {/* Narrow block 1 */}
                            <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200">
                                <Route className="w-6 h-6 text-teal-600 mb-4" />
                                <h3 className="font-bold text-[#1d1d1f] text-base mb-2">Adaptabilité professionnelle</h3>
                                <p className="text-[#6e6e73] text-sm leading-relaxed">
                                    De nombreux métiers exigent la conduite de véhicules à boîte manuelle : utilitaires, camionnettes de livraison, véhicules de chantier. La passerelle élargit considérablement vos perspectives professionnelles.
                                </p>
                            </motion.div>

                            {/* Narrow block 2 */}
                            <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200">
                                <Zap className="w-6 h-6 text-amber-500 mb-4" />
                                <h3 className="font-bold text-[#1d1d1f] text-base mb-2">Maîtrise complète du véhicule</h3>
                                <p className="text-[#6e6e73] text-sm leading-relaxed">
                                    Conduire en boîte manuelle offre un contrôle accru sur le moteur (frein moteur en descente, rétrogradage d'urgence). C'est un savoir-faire qui améliore globalement votre niveau de conduite.
                                </p>
                            </motion.div>

                            {/* Narrow block 3 */}
                            <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200">
                                <UserCheck className="w-6 h-6 text-indigo-500 mb-4" />
                                <h3 className="font-bold text-[#1d1d1f] text-base mb-2">Autonomie au quotidien</h3>
                                <p className="text-[#6e6e73] text-sm leading-relaxed">
                                    Pouvoir emprunter la voiture d'un proche, dépanner un ami, prendre le relais sur un long trajet… La boîte manuelle reste la norme dans l'entourage de la plupart des conducteurs français.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 6 — Passerelle Paris déroulement          */}
            {/*  Design: Numbered prose blocks (no cards)              */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-indigo-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">06 — Jour de formation</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Comment se déroule la journée de passerelle chez SMONI ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg">Le déroulement concret de votre formation, heure par heure, sans surprise.</p>
                        </motion.div>

                        <div className="space-y-10">
                            {[
                                { time: "08h30", title: "Accueil et vérification des documents", text: "Vous êtes accueilli par votre moniteur au point de rendez-vous convenu à Paris. Il vérifie votre identité, votre permis BVA et votre livret. Il vous présente le véhicule d'entraînement — une voiture récente à boîte manuelle équipée d'un double pédalier." },
                                { time: "09h00", title: "Briefing mécanique et premiers essais", text: "Votre moniteur vous explique le fonctionnement de l'embrayage, de la boîte de vitesses et du point de patinage sur le véhicule. Vous commencez par des exercices stationnaires puis de courts déplacements en zone calme pour intégrer la coordination des pieds." },
                                { time: "10h30", title: "Montée en difficulté progressive", text: "Vous passez progressivement à des situations plus complexes : démarrage en côte, passages de vitesse rapides, rétrogradage en approche de feux et de ronds-points. Le moniteur adapte les exercices à votre rythme de progression individuel." },
                                { time: "12h30", title: "Pause déjeuner", text: "Une pause vous est accordée pour reprendre de l'énergie. Votre moniteur en profitera pour faire un point sur votre progression de la matinée et vous expliquer les axes de travail pour l'après-midi." },
                                { time: "13h30", title: "Conduite en circulation dense", text: "L'après-midi est consacrée à la conduite en conditions réelles dans Paris : embouteillages, insertion sur voies rapides, gestion du frein moteur en descente. C'est l'étape cruciale qui valide votre autonomie en boîte manuelle." },
                                { time: "16h00", title: "Bilan et remise de l'attestation", text: "Votre moniteur rédige le bilan de compétences de votre formation et vous remet l'attestation officielle. Ce document vous permet de commander votre nouveau permis B complet, sans la mention restrictive 78, directement sur le site de l'ANTS." },
                            ].map(({ time, title, text }, i) => (
                                <motion.div key={i} variants={itemVariants} className="flex gap-6 md:gap-10">
                                    <div className="shrink-0 w-16 md:w-20 text-right">
                                        <span className="text-cyan-600 font-black text-lg md:text-xl">{time}</span>
                                    </div>
                                    <div className="border-l-2 border-slate-200 pl-6 md:pl-10 pb-2">
                                        <h3 className="font-bold text-[#1d1d1f] text-base md:text-lg mb-2">{title}</h3>
                                        <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 7 — Passerelle boîte manuelle prix       */}
            {/*  Design: Stacked pricing breakdown with annotations    */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">07 — Tarification</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Prix de la passerelle boîte manuelle à Paris
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">Un investissement clair de 549€ qui vous ouvre la conduite sans restriction à vie. Détail complet de ce que comprend le tarif.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            {[
                                { label: "Formation pratique de 7 heures", price: "430€", desc: "7 heures de conduite sur un véhicule récent à boîte manuelle avec un moniteur diplômé d'État. Inclut le véhicule, le carburant et l'assurance.", percent: 78 },
                                { label: "Frais de dossier administratif", price: "89€", desc: "Constitution du dossier, enregistrement auprès de la préfecture, suivi de la démarche de demande de nouveau permis auprès de l'ANTS.", percent: 16 },
                                { label: "Demande de fabrication du permis", price: "30€", desc: "Fabrication de votre nouveau titre de conduite sans la mention 78. Vous recevez votre permis définitif par courrier sous 2 à 4 semaines.", percent: 6 },
                            ].map(({ label, price, desc, percent }, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[#1d1d1f] text-lg mb-1">{label}</h3>
                                            <p className="text-[#6e6e73] text-sm leading-relaxed">{desc}</p>
                                        </div>
                                        <div className="text-2xl font-black text-[#2c2876] shrink-0">{price}</div>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full transition-all" style={{ width: `${percent}%` }} />
                                    </div>
                                    <div className="text-xs text-[#6e6e73] mt-2 text-right">{percent}% du total</div>
                                </div>
                            ))}

                            <div className="bg-[#2c2876] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <div className="text-white font-black text-xl">Total Pack Passerelle SMONI</div>
                                    <div className="text-white/60 text-sm">Tout inclus — aucun frais supplémentaire</div>
                                </div>
                                <div className="text-4xl font-black text-white">549€</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 8 — Attestation et nouveau permis ANTS   */}
            {/*  Design: Two-panel step flow (left text, right panel)  */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-blue-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">08 — Après la formation</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Obtenir votre nouveau permis après la passerelle
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">De l'attestation à la réception de votre nouveau permis de conduire, voici les démarches à suivre.</p>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row gap-10 items-start">
                            {/* Left — step by step text */}
                            <motion.div variants={itemVariants} className="lg:w-[55%] space-y-8">
                                {[
                                    { num: "A", title: "Récupérer votre attestation", text: "À l'issue de vos 7 heures de formation, votre moniteur SMONI vous remet une attestation de formation datée et signée. Ce document officiel prouve que vous avez suivi et validé la formation passerelle boîte manuelle conformément à la réglementation." },
                                    { num: "B", title: "Déposer votre demande sur l'ANTS", text: "Connectez-vous à votre compte ANTS (Agence Nationale des Titres Sécurisés) et sélectionnez la catégorie « Demande de nouveau permis suite à formation passerelle ». Vous devrez télécharger l'attestation remise par SMONI ainsi qu'une e-photo d'identité conforme." },
                                    { num: "C", title: "Réception du nouveau permis", text: "Après validation de votre dossier par la préfecture, votre nouveau permis de conduire est fabriqué sans la mention restrictive 78. Vous le recevez directement par courrier recommandé à votre domicile sous 2 à 4 semaines en moyenne." },
                                ].map(({ num, title, text }, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border border-blue-200">
                                            <span className="text-blue-700 font-black text-sm">{num}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1d1d1f] text-lg mb-2">{title}</h3>
                                            <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Right — status panel */}
                            <motion.div variants={itemVariants} className="lg:w-[45%] lg:sticky lg:top-32">
                                <div className="bg-[#f8fafc] rounded-3xl border border-slate-200 p-8">
                                    <h3 className="font-bold text-[#1d1d1f] text-lg mb-6 flex items-center gap-3">
                                        <GraduationCap className="w-5 h-5 text-blue-600" />
                                        Résumé des délais
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-sm text-[#6e6e73]">Formation</span>
                                            <span className="text-sm font-bold text-[#1d1d1f]">1 journée (7h)</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-sm text-[#6e6e73]">Remise de l'attestation</span>
                                            <span className="text-sm font-bold text-[#1d1d1f]">Immédiate</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-sm text-[#6e6e73]">Dépôt ANTS</span>
                                            <span className="text-sm font-bold text-[#1d1d1f]">Le jour même</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-sm text-[#6e6e73]">Validation préfecture</span>
                                            <span className="text-sm font-bold text-[#1d1d1f]">1 à 2 semaines</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-[#6e6e73]">Réception du permis</span>
                                            <span className="text-sm font-bold text-cyan-600">2 à 4 semaines</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 bg-cyan-50 border border-cyan-100 rounded-xl p-4">
                                        <p className="text-xs text-[#6e6e73] leading-relaxed">
                                            <span className="font-bold text-[#1d1d1f]">Bon à savoir :</span> en attendant la réception de votre nouveau permis, l'attestation de formation passerelle vous autorise légalement à conduire un véhicule à boîte manuelle, à condition de la présenter avec votre permis BVA actuel.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 9 — FAQ passerelle permis Paris          */}
            {/*  Design: Full-width inline Q&A blocks (no accordion)   */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-orange-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">09 — Questions fréquentes</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Questions sur la passerelle boîte manuelle à Paris
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            {[
                                { q: "La passerelle est-elle obligatoire pour conduire en boîte manuelle ?", a: "Oui, légalement. Si votre permis porte la mention 78 (embrayage automatique), conduire un véhicule à boîte manuelle sans avoir suivi la formation passerelle constitue une infraction assimilée à la conduite sans permis valide. Les sanctions peuvent aller jusqu'à un an d'emprisonnement et 15 000€ d'amende." },
                                { q: "Peut-on échouer à la formation passerelle ?", a: "La formation passerelle ne comporte pas d'examen à proprement parler. Cependant, si votre moniteur estime que votre niveau n'est pas suffisant à l'issue des 7 heures, il peut vous recommander des heures supplémentaires de pratique avant de vous délivrer l'attestation. Chez SMONI, notre taux de délivrance est très élevé grâce à notre pédagogie progressive et adaptée." },
                                { q: "Puis-je faire la passerelle dans une autre ville que celle où j'ai obtenu mon permis ?", a: "Absolument. La formation passerelle peut être réalisée dans n'importe quelle auto-école agréée en France, indépendamment du lieu d'obtention de votre permis BVA. Vous pouvez donc la faire chez SMONI à Paris même si vous avez passé votre permis en province." },
                                { q: "Combien de temps l'attestation est-elle valable ?", a: "L'attestation de formation passerelle n'a pas de date d'expiration. Toutefois, il est recommandé de demander votre nouveau permis sur l'ANTS dans les meilleurs délais pour disposer d'un titre à jour. En pratique, conservez toujours l'attestation avec votre permis BVA tant que vous n'avez pas reçu votre nouveau titre." },
                                { q: "Mon assurance auto est-elle impactée par la passerelle ?", a: "La passerelle ne modifie pas votre contrat d'assurance en cours. Cependant, une fois votre nouveau permis reçu, vous n'avez plus la restriction 78, ce qui signifie que vous pouvez assurer et conduire n'importe quel véhicule à boîte manuelle. Pensez à informer votre assureur de la mise à jour de votre permis." },
                            ].map(({ q, a }, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                                    <h3 className="font-bold text-[#1d1d1f] text-base md:text-lg mb-4 flex items-start gap-3">
                                        <span className="text-cyan-500 font-black shrink-0">Q.</span>
                                        {q}
                                    </h3>
                                    <p className="text-[#6e6e73] text-sm leading-[1.85] ml-7">{a}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 10 — Embrayage et boîte manuelle Paris   */}
            {/*  Design: Long-form editorial with pull quotes          */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-slate-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">10 — Apprendre l'embrayage</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Maîtriser l'embrayage et la boîte manuelle après un permis automatique
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-8 text-[#6e6e73] text-[15px] leading-[1.85]">
                            <p>
                                La principale appréhension des conducteurs titulaires d'un permis BVA est l'embrayage. Cette pédale supplémentaire — absente des véhicules automatiques — nécessite une coordination spécifique entre le pied gauche et le pied droit. Le point de patinage, c'est-à-dire le moment précis où l'embrayage commence à transmettre la puissance du moteur aux roues, est une sensation mécanique qui s'acquiert exclusivement par la pratique.
                            </p>

                            {/* Pull quote */}
                            <div className="border-l-4 border-cyan-400 pl-6 md:pl-8 py-2 my-10">
                                <p className="text-xl md:text-2xl font-bold text-[#1d1d1f] leading-snug italic">
                                    « Le point de patinage s'apprend avec les pieds, pas avec la tête. C'est pour cette raison que la formation passerelle est exclusivement pratique. »
                                </p>
                            </div>

                            <p>
                                Chez SMONI, nos moniteurs sont spécifiquement formés pour accompagner les conducteurs venant de l'automatique. Ils connaissent les réflexes acquis en BVA — notamment la tendance à freiner uniquement avec le pied droit — et adaptent leur pédagogie pour que la transition soit progressive et sans stress. Vous passez de « je ne sais pas quoi faire de mon pied gauche » à « l'embrayage est devenu naturel » en quelques heures seulement.
                            </p>

                            <p>
                                La boîte de vitesses manuelle vous offre par ailleurs un contrôle accru du véhicule que la boîte automatique ne permet pas. Le frein moteur en descente, la rétrogradation avant un virage, le passage en seconde pour une montée raide — autant de techniques qui enrichissent votre conduite et renforcent votre sécurité dans le trafic dense parisien. De nombreux conducteurs ayant fait la passerelle chez SMONI rapportent qu'ils se sentent plus confiants et plus en contrôle de leur véhicule, même lorsqu'ils repassent ensuite sur un véhicule automatique.
                            </p>

                            <p>
                                Enfin, n'oublions pas l'aspect pratique au quotidien. En France, les véhicules à boîte manuelle restent majoritaires dans le parc automobile. Que ce soit pour emprunter la voiture d'un ami, prendre le relais sur un long trajet familial ou conduire un véhicule de fonction, la boîte manuelle reste un standard incontournable. La passerelle SMONI, c'est 7 heures pour une liberté de conduite à vie.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-16 pt-16 border-t border-slate-100 flex justify-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
                                className="rounded-2xl h-14 px-8 text-[#2c2876] border-slate-200 hover:bg-slate-50 font-bold text-base transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-3" /> Retour à tous les services
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <div className="relative z-10 bg-white border-t border-slate-100">
                <HomeNewStudentSection />
            </div>

            <RelatedServices currentSlug="passerelle" />

            <Footer />
        </div>
    );
}

export default Details4;