import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "framer-motion";
import { BookOpen, CheckCircle2, FileText, MousePointerClick, Check, GraduationCap, MapPin, Car, Clock, Users, Award, Target, Shield, Star, Zap, Calendar, TrendingUp, ThumbsUp, UserCheck, Trophy, Gauge, Route, Navigation, Sparkles, BadgeCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Details1 = () => {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    // iOS-style animation variants for new sections
    const fade = {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    };
    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    };

    const documents = [
        { title: "Pièce d'identité", desc: "La carte d'identité de l'élève en cours de validité." },
        { title: "Justificatif de domicile", desc: "Ou attestation d'hébergement, datant de moins de 6 mois." },
        { title: "Photo d'identité", desc: "Une e-photo d'identité conforme de moins de 6 mois." },
        { title: "Autorisation parentale", desc: "Requis avec la carte d'identité du parent, uniquement pour les mineurs." },
        { title: "ASSR2 / JDC / SNU", desc: "Selon votre âge : ASSR2 (si scolarisé en France et -21ans), ou JDC (17-25ans), ou SNU." },
        { title: "Visite médicale", desc: "Uniquement si applicable (problème de santé spécifique)." },
        { title: "Numéro NEPH", desc: "Votre numéro de dossier ou Code si vous l'avez déjà." }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <Header />

            {/* Hero Section — ORIGINAL UNCHANGED */}
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
                            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%)',
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
                        className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-purple-50 text-purple-600 rounded-full border border-purple-100 shadow-sm mb-6 font-bold"
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Indispensable</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Permis B & Conduite <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent italic pr-2">Accompagnée.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Smoni vous aide à obtenir votre permis en toute simplicité, quelle que soit la méthode choisie : Classique, Accompagnée ou Supervisée.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => { navigate('/tarifs'); window.scrollTo(0, 0); }}
                            className="bg-purple-600 text-white hover:bg-purple-700 rounded-2xl px-8 h-14 text-lg font-black shadow-[0_15px_30px_-10px_rgba(147,51,234,0.4)] transition-all hover:scale-[1.03] border-none"
                        >
                            Voir nos formules <MousePointerClick className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                </motion.div>
            </main>

            {/* Pédagogie + Documents — ORIGINAL UNCHANGED */}
            <section className="py-16 md:py-24 bg-white relative z-10">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
                                Une pédagogie d'excellence
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed">
                                Un accompagnement personnalisé dès votre première heure de conduite. Notre objectif est de vous former non seulement à l'examen du permis, mais surtout à devenir un conducteur sûr et responsable.
                            </motion.p>
                            <motion.ul variants={containerVariants} className="space-y-5">
                                {[
                                    "Moniteurs diplômés et pédagogues",
                                    "Véhicules récents et sécurisés (100% Electriques disponibles)",
                                    "Suivi digital de l'évolution de vos compétences",
                                    "Taux de réussite largement supérieur à la moyenne nationale"
                                ].map((perk, i) => (
                                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="min-w-6 min-h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-purple-600 font-bold" />
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
                                    <h2 className="text-2xl font-extrabold text-[#2c2876] tracking-tight">Pièces à fournir</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-6">Pour compléter votre dossier d'inscription ANTS, voici ce dont nous aurons besoin :</p>

                                <div className="space-y-3">
                                    {documents.map((doc, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                                        >
                                            <div className="w-8 h-8 bg-[#2c2876] text-white rounded-xl flex items-center justify-center font-black shadow-inner shrink-0 text-sm">
                                                {idx + 1}
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-[#2c2876] mb-1 leading-tight text-sm">{doc.title}</h3>
                                                <p className="text-slate-400 text-xs leading-snug">{doc.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div variants={itemVariants} className="mt-6 p-4 bg-purple-50 text-purple-800 rounded-xl text-xs sm:text-sm font-medium border border-purple-100">
                                    <span className="font-bold block mb-1">Passage en conduite accompagnée/supervisée ?</span>
                                    Il faudra également fournir les pièces d'identité des accompagnateurs et éventuellement l'extension de garantie de l'assurance auto.
                                </motion.div>

                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════ */}
            {/* NEW SEO SECTIONS — iOS / Light Design          */}
            {/* ═══════════════════════════════════════════════ */}

            {/* SEO 1: Leçons de conduite Paris */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-5 gap-5"
                    >
                        <motion.div variants={fade} className="lg:col-span-3 bg-white rounded-3xl p-10 border border-black/[0.04] shadow-sm">
                            <Badge className="mb-6 bg-purple-50 text-purple-600 border-purple-100 shadow-none font-bold text-[10px]">
                                <MapPin className="w-3 h-3 mr-1" /> Paris & Île-de-France
                            </Badge>
                            <h2 className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-4">
                                Leçons de conduite Paris
                            </h2>
                            <p className="text-[#6e6e73] text-sm leading-relaxed mb-8">
                                Chaque leçon est une étape précise vers votre permis. Programme sur-mesure en fonction de votre niveau, de vos horaires et des centres d'examen de votre arrondissement.
                            </p>
                            <div className="space-y-3">
                                {[
                                    { Icon: Clock, text: "Créneaux 7j/7 dès 7h00" },
                                    { Icon: MapPin, text: "Point de RDV à votre adresse" },
                                    { Icon: CheckCircle2, text: "Progression mesurée à chaque heure" },
                                ].map(({ Icon, text }, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                                        <Icon className="w-4 h-4 text-purple-400 shrink-0" />
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            {[
                                { value: "20h", label: "Formation minimum", sub: "légal obligatoire" },
                                { value: "92%", label: "Taux de réussite", sub: "au 1er passage" },
                                { value: "+500", label: "Élèves formés", sub: "à Paris" },
                            ].map((s, i) => (
                                <motion.div key={i} variants={fade} className="flex-1 bg-white rounded-3xl p-6 border border-black/[0.04] shadow-sm flex flex-col justify-between min-h-[100px]">
                                    <div className="text-4xl font-black text-[#2c2876] tracking-tight">{s.value}</div>
                                    <div>
                                        <div className="text-sm font-semibold text-[#1d1d1f]">{s.label}</div>
                                        <div className="text-xs text-[#6e6e73]">{s.sub}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SEO 2: Cours de conduite Paris — Tabs */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="mb-10">
                            <Badge className="mb-4 bg-slate-100 text-slate-500 border-0 shadow-none font-bold text-[10px] uppercase tracking-widest">Formation sur-mesure</Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">Cours de conduite Paris</h2>
                            <p className="text-[#6e6e73] mt-2 text-sm max-w-lg">Trois voies pour obtenir votre permis B. Choisissez celle qui vous correspond.</p>
                        </motion.div>
                        <motion.div variants={fade}>
                            <Tabs defaultValue="classique">
                                <TabsList className="bg-[#f5f5f7] p-1 rounded-2xl h-auto mb-8 w-full sm:w-auto gap-1">
                                    <TabsTrigger value="classique" className="rounded-xl px-5 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Classique</TabsTrigger>
                                    <TabsTrigger value="intensif" className="rounded-xl px-5 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Stage Intensif</TabsTrigger>
                                    <TabsTrigger value="aac" className="rounded-xl px-5 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Accompagnée</TabsTrigger>
                                </TabsList>
                                {[
                                    { val: "classique", title: "Permis B Classique", desc: "Le parcours standard : leçons progressives, évaluation de départ, mise en situation sur les axes parisiens. Adapté à votre propre rythme.", tags: ["Code inclus", "20h min.", "Double commande", "Moniteur dédié"], stat: "BEPECASER", statSub: "Moniteurs diplômés", Icon: GraduationCap, iconColor: "text-purple-400" },
                                    { val: "intensif", title: "Stage Intensif", desc: "Concentrez vos heures sur 3 à 4 semaines. Idéal pour les candidats pressés ou en reconversion professionnelle nécessitant le permis.", tags: ["Leçons quotidiennes", "Coaching examen", "Suivi personnalisé", "Bilan hebdo"], stat: "3–4 sem.", statSub: "Durée moyenne", Icon: Zap, iconColor: "text-amber-400" },
                                    { val: "aac", title: "Conduite Accompagnée (AAC)", desc: "Démarrez dès 15 ans avec un accompagnateur agréé. Accumulez 3 000 km avant votre examen pour maximiser vos chances au 1er passage.", tags: ["Dès 15 ans", "3 000 km min.", "Formation accompagnateur", "RDV intermédiaire"], stat: "–40%", statSub: "Accidentalité jeune", Icon: Users, iconColor: "text-emerald-400" },
                                ].map(({ val, title, desc, tags, stat, statSub, Icon, iconColor }) => (
                                    <TabsContent key={val} value={val}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <Card className="md:col-span-2 border-0 shadow-sm rounded-3xl bg-[#f5f5f7]">
                                                <CardContent className="p-8">
                                                    <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">{title}</h3>
                                                    <p className="text-[#6e6e73] text-sm leading-relaxed mb-6">{desc}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {tags.map(t => <Badge key={t} variant="secondary" className="font-medium text-xs bg-white border border-black/[0.06]">{t}</Badge>)}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card className="border-0 shadow-sm rounded-3xl">
                                                <CardContent className="p-8 flex flex-col h-full justify-between">
                                                    <Icon className={`w-8 h-8 ${iconColor} mb-4`} />
                                                    <div>
                                                        <div className="text-3xl font-black text-[#2c2876] tracking-tight mb-1">{stat}</div>
                                                        <div className="text-xs text-[#6e6e73] font-medium uppercase tracking-widest">{statSub}</div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SEO 5: Auto-école Paris */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div variants={fade}>
                            <Badge className="mb-5 bg-purple-50 text-purple-600 border-purple-100 shadow-none font-bold text-[10px] uppercase tracking-widest">Agréée Préfecture</Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-4">L'auto-école Paris de référence</h2>
                            <p className="text-[#6e6e73] leading-relaxed text-sm mb-8">Smoni est agréée par la Préfecture de Police de Paris, certifiée Qualiopi et référencée ANTS. Vous vous formez dans un cadre entièrement légal et sécurisé.</p>
                            <div className="space-y-4">
                                {[
                                    { Icon: Shield, text: "Certification Qualiopi en vigueur" },
                                    { Icon: Car, text: "Flotte 100% double commande homologuée" },
                                    { Icon: Star, text: "Avis certifiés et transparents" },
                                    { Icon: CheckCircle2, text: "Financement CPF accepté" },
                                ].map(({ Icon, text }, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                                        <Icon className="w-4 h-4 text-slate-300 shrink-0" />{text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={fade} className="bg-white rounded-3xl p-8 border border-black/[0.04] shadow-sm">
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {[
                                    { val: "Qualiopi", sub: "Certifiée", cls: "bg-purple-50 text-purple-700" },
                                    { val: "Agréée", sub: "Préfecture IDF", cls: "bg-blue-50 text-blue-700" },
                                    { val: "ANTS", sub: "Référencée", cls: "bg-emerald-50 text-emerald-700" },
                                    { val: "CPF", sub: "Pris en charge", cls: "bg-amber-50 text-amber-700" },
                                ].map((s, i) => (
                                    <div key={i} className={`${s.cls} rounded-2xl p-5`}>
                                        <div className="text-xl font-black tracking-tight mb-0.5">{s.val}</div>
                                        <div className="text-xs font-medium opacity-70">{s.sub}</div>
                                    </div>
                                ))}
                            </div>
                            <Separator className="mb-4" />
                            <p className="text-xs text-[#6e6e73] text-center font-medium">Réservation en ligne · Annulation gratuite 48h avant</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SEO 6: Heures de conduite Paris */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="mb-10">
                            <Badge className="mb-4 bg-slate-100 text-slate-500 border-0 shadow-none font-bold text-[10px] uppercase tracking-widest">Forfaits conduite</Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">Heures de conduite Paris</h2>
                            <p className="text-[#6e6e73] mt-2 text-sm max-w-lg">Formules claires, sans frais cachés. Le volume d'heures adapté à votre niveau.</p>
                        </motion.div>
                        <motion.div variants={stagger} className="divide-y divide-slate-100 rounded-3xl border border-slate-100 overflow-hidden">
                            {[
                                { hours: "20h", name: "Essentiel", popular: false, desc: "Pour les candidats avec de l'expérience préalable (AAC).", features: ["Évaluation de départ", "Accompagnement examen", "Livret pédagogique"] },
                                { hours: "30h", name: "Recommandé", popular: true, desc: "Le forfait le plus choisi pour une préparation sereine et complète.", features: ["Tout Essentiel inclus", "Code en ligne", "Bilan mi-parcours", "RDV préfecture"] },
                                { hours: "40h", name: "Intensif", popular: false, desc: "Pour les débutants ou les objectifs de formation accélérée.", features: ["Tout Recommandé inclus", "Leçons quotidiennes", "Garantie 2ème passage"] },
                            ].map((plan, i) => (
                                <motion.div key={i} variants={fade} className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-white hover:bg-[#f5f5f7] transition-colors group cursor-default">
                                    <div className="sm:w-20 shrink-0">
                                        <div className="text-4xl font-black text-[#2c2876] tracking-tight leading-none">{plan.hours}</div>
                                        <div className="text-xs text-[#6e6e73] font-medium mt-1">{plan.name}</div>
                                    </div>
                                    <Separator orientation="vertical" className="hidden sm:block h-12 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-[#1d1d1f]">{plan.name}</span>
                                            {plan.popular && <Badge className="bg-purple-50 text-purple-600 border-purple-100 text-[10px] font-bold shadow-none">Populaire</Badge>}
                                        </div>
                                        <p className="text-xs text-[#6e6e73] mb-3">{plan.desc}</p>
                                        <div className="flex flex-wrap gap-3">
                                            {plan.features.map(f => (
                                                <span key={f} className="text-[11px] text-[#6e6e73] flex items-center gap-1">
                                                    <Check className="w-3 h-3 text-purple-400" />{f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => { navigate('/tarifs'); window.scrollTo(0, 0); }} className="shrink-0 flex items-center gap-1 text-sm font-bold text-[#2c2876] opacity-0 group-hover:opacity-100 transition-opacity">
                                        Choisir <ChevronRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SEO 7: Formation permis B — Accordion */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div variants={fade}>
                            <Badge className="mb-5 bg-purple-50 text-purple-600 border-purple-100 shadow-none font-bold text-[10px] uppercase tracking-widest">Programme officiel DSCR</Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-4">Formation permis B Paris</h2>
                            <p className="text-[#6e6e73] text-sm leading-relaxed mb-8">Un programme encadré par les textes réglementaires. Chaque phase prépare l'élève à franchir une nouvelle étape vers l'autonomie de conduite.</p>
                            <div className="bg-[#2c2876]/[0.05] border border-[#2c2876]/[0.08] rounded-2xl p-6">
                                <div className="text-4xl font-black text-[#2c2876] mb-1 tracking-tight">100%</div>
                                <div className="text-xs text-[#2c2876]/70 font-bold uppercase tracking-widest">Conforme programme officiel DSCR</div>
                            </div>
                        </motion.div>
                        <motion.div variants={fade}>
                            <Accordion type="single" collapsible className="space-y-2">
                                {[
                                    { v: "s1", title: "1. Évaluation de départ", body: "Votre moniteur réalise un bilan complet de vos acquis et définit un programme personnalisé pour optimiser chaque heure de conduite." },
                                    { v: "s2", title: "2. Maîtrise du véhicule", body: "Apprentissage des commandes et manœuvres de base en zone calme, avant d'aborder la circulation parisienne dense." },
                                    { v: "s3", title: "3. Circulation urbaine parisienne", body: "Insertion dans le trafic, gestion des carrefours complexes, ronds-points et voies rapides spécifiques à Paris et l'Île-de-France." },
                                    { v: "s4", title: "4. Conduite sur route & autoroute", body: "Extension aux axes péri-urbains, maîtrise des vitesses élevées et des dépassements sécurisés. Obligatoire pour tout candidat." },
                                    { v: "s5", title: "5. Préparation à l'examen", body: "Simulation de l'épreuve pratique et gestion du stress le jour J, jusqu'au dernier créneau avant le passage officiel." },
                                ].map(item => (
                                    <AccordionItem key={item.v} value={item.v} className="border border-black/[0.06] rounded-2xl overflow-hidden bg-white px-4">
                                        <AccordionTrigger className="text-sm font-semibold text-[#1d1d1f] hover:no-underline py-4 hover:text-[#2c2876] transition-colors">{item.title}</AccordionTrigger>
                                        <AccordionContent className="text-[#6e6e73] text-sm leading-relaxed pb-4">{item.body}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SEO 8: Conduite accompagnée Paris */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="mb-12">
                            <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-100 shadow-none font-bold text-[10px] uppercase tracking-widest">AAC · Apprentissage Anticipé</Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">Conduite accompagnée Paris</h2>
                            <p className="text-[#6e6e73] text-sm max-w-xl">Le chemin le plus sûr vers le permis. Commencez dès 15 ans et construisez une expérience solide avant l'examen.</p>
                        </motion.div>
                        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { num: "01", Icon: Target, cls: "bg-emerald-50 text-emerald-500", label: "Dès 15 ans", text: "Commencez la conduite tôt avec un accompagnateur agréé. Smoni organise la formation initiale obligatoire et le suivi intermédiaire." },
                                { num: "02", Icon: Route, cls: "bg-blue-50 text-blue-500", label: "3 000 km min.", text: "Minimum légal d'expérience. Chaque kilomètre renforce vos réflexes et réduit significativement votre risque d'accident." },
                                { num: "03", Icon: Trophy, cls: "bg-amber-50 text-amber-500", label: "–40% accidentalité", text: "Les élèves AAC ont un taux de réussite et une sinistralité bien meilleurs que la voie classique. Statistiques officielles DSCR." },
                            ].map(({ num, Icon, cls, label, text }, i) => (
                                <motion.div key={i} variants={fade}>
                                    <Card className="border-0 shadow-sm rounded-3xl h-full bg-[#f5f5f7]">
                                        <CardContent className="p-8">
                                            <span className="text-xs font-black text-slate-300 tracking-[0.2em] block mb-4">{num}</span>
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-5 ${cls.split(" ")[0]}`}>
                                                <Icon className={`w-5 h-5 ${cls.split(" ")[1]}`} />
                                            </div>
                                            <div className="font-bold text-[#1d1d1f] mb-2">{label}</div>
                                            <p className="text-sm text-[#6e6e73] leading-relaxed">{text}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SEO 9: Examen permis Paris */}
            <section className="py-20 bg-[#f5f5f7]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="mb-10">
                            <Badge className="mb-4 bg-rose-50 text-rose-500 border-rose-100 shadow-none font-bold text-[10px] uppercase tracking-widest">Épreuve pratique</Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">Réussir l'examen permis Paris</h2>
                            <p className="text-[#6e6e73] text-sm max-w-lg">L'inspecteur DSCR évalue 8 compétences clés. Voici notre taux de préparation sur chacune.</p>
                        </motion.div>
                        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                                { skill: "Maîtrise du véhicule", pct: 98 },
                                { skill: "Gestion des intersections", pct: 95 },
                                { skill: "Respect du code de la route", pct: 97 },
                                { skill: "Circulation en agglomération", pct: 92 },
                                { skill: "Manœuvres & stationnement", pct: 90 },
                                { skill: "Conduite sur voie rapide", pct: 94 },
                                { skill: "Anticipation & observation", pct: 96 },
                                { skill: "Maîtrise émotionnelle", pct: 91 },
                            ].map((item, i) => (
                                <motion.div key={i} variants={fade} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-sm">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-[#1d1d1f] mb-2">{item.skill}</div>
                                        <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#2c2876] rounded-full" style={{ width: `${item.pct}%` }} />
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-[#2c2876] shrink-0 tabular-nums">{item.pct}%</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SEO 10: Permis boîte automatique Paris */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="mb-10 text-center">
                            <Badge className="mb-4 bg-amber-50 text-amber-600 border-amber-100 shadow-none font-bold text-[10px] uppercase tracking-widest">BVA · Boîte automatique</Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">Permis boîte automatique Paris</h2>
                            <p className="text-[#6e6e73] text-sm max-w-lg mx-auto">Moins de gestes, plus de concentration sur la route. Idéal dans la circulation dense parisienne.</p>
                        </motion.div>
                        <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                            {[
                                { type: "Boîte Automatique", abbr: "BVA", pros: ["Idéal en ville dense", "Apprentissage plus rapide", "Moins de fatigue physique", "Accessible PMR"], cons: ["Limité aux véhicules automatiques", "Surcoût si conversion en manuelle"], header: "bg-amber-50 border-amber-100", badge: "bg-amber-100 text-amber-700" },
                                { type: "Boîte Manuelle", abbr: "BVM", pros: ["Conduit tout type de véhicule", "Maîtrise technique complète", "Accès à tous les modèles de location", "Aucune restriction attestation"], cons: ["Apprentissage plus long", "Plus d'attention requise en ville"], header: "bg-slate-50 border-slate-100", badge: "bg-white text-[#2c2876] border border-slate-200" },
                            ].map((opt, i) => (
                                <motion.div key={i} variants={fade}>
                                    <Card className="border border-black/[0.06] shadow-sm rounded-3xl overflow-hidden">
                                        <div className={`${opt.header} border-b px-8 py-5 flex items-center justify-between`}>
                                            <span className="font-bold text-[#1d1d1f]">{opt.type}</span>
                                            <span className={`text-xs font-black px-3 py-1 rounded-full ${opt.badge}`}>{opt.abbr}</span>
                                        </div>
                                        <CardContent className="p-8 space-y-2">
                                            {opt.pros.map(p => <div key={p} className="flex items-center gap-2.5 text-sm text-[#1d1d1f]"><Check className="w-4 h-4 text-emerald-400 shrink-0" />{p}</div>)}
                                            <Separator className="!my-4" />
                                            {opt.cons.map(c => <div key={c} className="flex items-center gap-2.5 text-sm text-[#6e6e73]"><span className="w-4 text-slate-300 font-black text-center shrink-0">–</span>{c}</div>)}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div variants={fade} className="bg-[#f5f5f7] rounded-2xl p-5 text-center">
                            <p className="text-sm text-[#6e6e73]">
                                💡 <span className="font-semibold text-[#1d1d1f]">Le conseil Smoni :</span> Si vous conduirez principalement à Paris, la boîte automatique est un excellent choix. Pour une liberté totale partout, optez pour la boîte manuelle.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* SEO EXTRA 2 — FAQ · Questions fréquentes · Featured Snippets  */}
            {/* Keywords: prix permis Paris, combien heures, comment passer…   */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white relative">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="mb-12">
                            <Badge className="mb-4 bg-slate-100 text-slate-500 border-0 shadow-none font-bold text-[10px] uppercase tracking-widest">
                                Questions fréquentes
                            </Badge>
                            <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                                Tout savoir sur le permis de conduire à Paris
                            </h2>
                            <p className="text-[#6e6e73] text-sm max-w-xl">
                                Les réponses aux questions les plus posées par nos élèves avant leur inscription chez Smoni.
                            </p>
                        </motion.div>

                        <motion.div variants={fade} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            {/* Left column FAQ */}
                            <div>
                                <Accordion type="single" collapsible className="space-y-2">
                                    {[
                                        {
                                            v: "faq1",
                                            q: "Quel est le prix du permis de conduire à Paris ?",
                                            a: "Le coût total d'un permis B à Paris varie généralement entre 1 200 € et 2 200 € selon le nombre d'heures nécessaires. Chez Smoni, nos formules commencent dès 20h de conduite. Le financement par CPF (Compte Personnel de Formation) est accepté, ce qui peut réduire significativement votre reste à charge."
                                        },
                                        {
                                            v: "faq2",
                                            q: "Combien d'heures de conduite faut-il pour passer le permis ?",
                                            a: "La loi impose un minimum légal de 20 heures de conduite (13h en boîte automatique). En pratique, la moyenne nationale est de 30 à 35 heures. À Paris, la densité du trafic peut rallonger légèrement la formation — votre moniteur définit le volume idéal lors de l'évaluation de départ."
                                        },
                                        {
                                            v: "faq3",
                                            q: "À quel âge peut-on commencer la conduite accompagnée à Paris ?",
                                            a: "La conduite accompagnée (AAC) est accessible dès 15 ans. C'est la voie la plus efficace : les élèves AAC ont un taux de réussite à l'examen supérieur de 15 à 20 % par rapport à la voie classique, et une accidentalité réduite de 40 % dans les 6 premiers mois après l'obtention du permis."
                                        },
                                        {
                                            v: "faq4",
                                            q: "Puis-je payer mon permis avec le CPF à Paris ?",
                                            a: "Oui. Smoni est agréée pour la prise en charge CPF (Compte Personnel de Formation). Si votre solde CPF est suffisant, la formation peut être intégralement financée. Contactez-nous pour vérifier votre éligibilité et le montant disponible sur votre compte MonCompteFormation.gouv.fr."
                                        },
                                        {
                                            v: "faq5",
                                            q: "Comment obtenir une date d'examen pratique rapidement à Paris ?",
                                            a: "Les places d'examen à Paris sont gérées via la plateforme RdvPermis. Smoni, en tant qu'auto-école agréée, dispose d'un quota de places attribué par la DSCR. Notre équipe s'occupe de réserver votre créneau dès que votre moniteur estime que vous êtes prêt à passer."
                                        },
                                    ].map(item => (
                                        <AccordionItem key={item.v} value={item.v} className="border border-black/[0.05] rounded-2xl overflow-hidden bg-[#f5f5f7] px-5 hover:bg-white hover:border-purple-100 transition-[background-color,border-color] duration-200">
                                            <AccordionTrigger className="text-sm font-semibold text-[#1d1d1f] hover:no-underline py-4 text-left hover:text-[#2c2876] transition-colors">
                                                {item.q}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-[#6e6e73] text-sm leading-relaxed pb-5">
                                                {item.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>

                            {/* Right column FAQ */}
                            <div>
                                <Accordion type="single" collapsible className="space-y-2">
                                    {[
                                        {
                                            v: "faq6",
                                            q: "Quelle est la différence entre permis boîte auto et boîte manuelle ?",
                                            a: "Le permis boîte automatique (BVA) est plus rapide à obtenir et exige 13h minimum au lieu de 20h. L'attestation délivrée est toutefois limitée aux véhicules automatiques. Pour conduire un véhicule à boîte manuelle, il faut suivre une formation complémentaire de 7h. À Paris, où les embouteillages sont fréquents, la boîte auto est un vrai confort."
                                        },
                                        {
                                            v: "faq7",
                                            q: "Est-ce possible de changer d'auto-école en cours de formation ?",
                                            a: "Oui, votre dossier ANTS vous appartient. Vous pouvez transférer votre numéro NEPH à Smoni à tout moment. Nous réalisons un bilan de vos heures effectuées et nous adaptons votre programme en conséquence, sans frais de dossier supplémentaires."
                                        },
                                        {
                                            v: "faq8",
                                            q: "Combien de temps faut-il pour obtenir le permis à Paris ?",
                                            a: "En formation classique, compter 3 à 6 mois en moyenne selon votre disponibilité et votre progression. En stage intensif chez Smoni, il est possible d'obtenir le permis en 3 à 5 semaines si votre niveau le permet et qu'une place d'examen est disponible rapidement dans votre secteur de Paris."
                                        },
                                        {
                                            v: "faq9",
                                            q: "Le moniteur vient-il me chercher à domicile ?",
                                            a: "Oui. Chez Smoni, le point de rendez-vous est défini par l'élève : à votre domicile, à votre lieu de travail ou à la sortie de votre métro. Cette flexibilité est pensée pour s'adapter à la vie parisienne et supprime toute perte de temps entre votre quotidien et votre leçon de conduite."
                                        },
                                        {
                                            v: "faq10",
                                            q: "Mon code est-il valable si je change d'auto-école ?",
                                            a: "Oui. L'ETG (Examen Théorique Général, communément appelé 'le code') est valable 5 ans à partir de sa date d'obtention. Il est rattaché à votre numéro NEPH et non à l'auto-école. Vous pouvez donc changer d'établissement sans repasser le code, tant que celui-ci est encore valide."
                                        },
                                    ].map(item => (
                                        <AccordionItem key={item.v} value={item.v} className="border border-black/[0.05] rounded-2xl overflow-hidden bg-[#f5f5f7] px-5 hover:bg-white hover:border-purple-100 transition-[background-color,border-color] duration-200">
                                            <AccordionTrigger className="text-sm font-semibold text-[#1d1d1f] hover:no-underline py-4 text-left hover:text-[#2c2876] transition-colors">
                                                {item.q}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-[#6e6e73] text-sm leading-relaxed pb-5">
                                                {item.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>

                                {/* Trust signal */}
                                <motion.div variants={fade} className="mt-4 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-sm font-bold text-[#1d1d1f] mb-1">Une question non listée ?</div>
                                            <p className="text-xs text-[#6e6e73] leading-relaxed">
                                                Notre équipe répond à toutes vos questions en moins de 2h ouvrées. Contactez-nous directement ou venez en rendez-vous gratuit de découverte dans l'un de nos centres à Paris.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* BONUS A — Moniteur auto-école Paris · Glass cards     */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ede9fe] via-[#f0f4ff] to-[#e0f2fe]" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(147,51,234,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.10) 0%, transparent 55%)' }} />

                <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        {/* Header */}
                        <motion.div variants={fade} className="text-center mb-16">
                            <Badge className="mb-5 bg-white text-purple-700 border border-purple-200 shadow-sm font-bold text-[10px] uppercase tracking-widest">
                                <Award className="w-3 h-3 mr-1" /> Enseignants diplômés
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4 leading-tight">
                                Votre <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">moniteur auto-école Paris</span>
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-2xl mx-auto leading-relaxed">
                                Un professionnel certifié dédié à votre progression. Patience, pédagogie et expertise de la conduite parisienne — c'est notre standard minimum.
                            </p>
                        </motion.div>

                        {/* Glass cards bento */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Large feature card */}
                            <div
                                className="md:col-span-2 group relative rounded-3xl overflow-hidden cursor-default transition-transform duration-200 ease-out hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 bg-white border border-white/70 rounded-3xl" />
                                <div className="absolute inset-0 bg-purple-500/[0.04] transition-[background-color] duration-200 group-hover:bg-purple-500/[0.08] rounded-3xl" />
                                <div className="relative z-10 p-10">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-8 shadow-lg shadow-purple-200">
                                        <UserCheck className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">Un moniteur, un élève, une méthode</h3>
                                    <p className="text-[#6e6e73] leading-relaxed mb-8">
                                        Contrairement aux grandes auto-écoles de masse, votre moniteur Smoni vous suit de A à Z. Il connaît votre niveau, vos points faibles et adapte chaque leçon. Cette continuité pédagogique est la clé de votre réussite au permis parisien.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { val: "BEPECASER", sub: "ou Titre Professionnel" },
                                            { val: "Autorisation", sub: "Préfectorale en vigueur" },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100">
                                                <div className="font-black text-[#2c2876] text-sm tracking-tight">{s.val}</div>
                                                <div className="text-xs text-[#6e6e73] mt-0.5">{s.sub}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Small cards column */}
                            <div className="flex flex-col gap-5">
                                {[
                                    { Icon: Gauge, color: "bg-purple-600", title: "Pédagogie active", text: "Retours en temps réel, corrections immédiates, encouragements constants.", stat: "100%", statSub: "satisfaction élèves" },
                                    { Icon: ThumbsUp, color: "bg-indigo-600", title: "Bonne humeur garantie", text: "Apprendre dans un environnement bienveillant accélère votre progression.", stat: "4.9/5", statSub: "note moyenne" },
                                ].map(({ Icon, color, title, text, stat, statSub }, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 group relative rounded-3xl overflow-hidden cursor-default transition-transform duration-200 ease-out hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 bg-white border border-white/70 rounded-3xl" />
                                        <div className="relative z-10 p-7">
                                            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4 shadow-md`}>
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h4 className="font-bold text-[#1d1d1f] mb-2 text-sm">{title}</h4>
                                            <p className="text-xs text-[#6e6e73] leading-relaxed mb-4">{text}</p>
                                            <div className="text-2xl font-black text-[#2c2876] tracking-tight">{stat}</div>
                                            <div className="text-[10px] text-[#6e6e73] font-medium uppercase tracking-widest">{statSub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom strip stats */}
                        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { val: "10 ans", sub: "d'expérience moyenne", Icon: Star },
                                { val: "7j/7", sub: "disponibilité moniteurs", Icon: Calendar },
                                { val: "<48h", sub: "délai premier RDV", Icon: Clock },
                                { val: "1 moniteur", sub: "par élève, de A à Z", Icon: Users },
                            ].map(({ val, sub, Icon }, i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-slate-100 rounded-2xl p-5 text-center transition-[transform,background-color] duration-200 ease-out hover:bg-white hover:scale-[1.02] cursor-default shadow-sm"
                                >
                                    <Icon className="w-4 h-4 text-purple-400 mx-auto mb-2" />
                                    <div className="font-black text-[#2c2876] text-lg tracking-tight">{val}</div>
                                    <div className="text-[10px] text-[#6e6e73] font-medium uppercase tracking-widest mt-0.5">{sub}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* BONUS B — Permis accéléré Paris · Timeline            */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gradient-to-br from-[#f8faff] via-white to-[#fdfdff] relative overflow-hidden">
                {/* Decorative blobs - slightly more visible for glass contrast */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fade} className="text-center mb-16">
                            <Badge className="mb-5 bg-indigo-50 text-indigo-600 border-indigo-100 shadow-none font-bold text-[10px] uppercase tracking-widest">
                                <Zap className="w-3 h-3 mr-1" /> Formation intensive
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Permis <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">accéléré Paris</span> en 4 étapes
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-2xl mx-auto">
                                De zéro au permis B en quelques semaines. Un parcours structuré, des créneaux en priorité, un résultat garanti.
                            </p>
                        </motion.div>

                        {/* Timeline steps */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                            {/* Connector line on desktop */}
                            <div className="hidden md:block absolute top-[1.75rem] left-[12.5%] right-[12.5%] h-[2px] bg-slate-200 z-0" />

                            {[
                                { step: "01", Icon: Target, badgeColor: "bg-purple-600", title: "Inscription & bilan", text: "Évaluation de départ en ligne. Nous définissons ensemble votre volume d'heures optimal et votre planning intensif.", tag: "Jour 1" },
                                { step: "02", Icon: BookOpen, badgeColor: "bg-indigo-600", title: "Code en ligne", text: "Accès immédiat à notre plateforme de code. Révisez en parallèle de vos leçons, disponible 24h/24.", tag: "Semaine 1" },
                                { step: "03", Icon: Car, badgeColor: "bg-blue-600", title: "Leçons intensives", text: "Créneaux quotidiens possibles. Le même moniteur suit chaque étape pour une continuité pédagogique maximale.", tag: "Semaines 1–3" },
                                { step: "04", Icon: BadgeCheck, badgeColor: "bg-emerald-600", title: "Examen & permis", text: "Présentation à l'épreuve pratique. Accompagnement jusqu'au bout, avec coaching le jour du passage.", tag: "Semaine 4" },
                            ].map(({ step, Icon, badgeColor, title, text, tag }, i) => (
                                <div
                                    key={i}
                                    className="relative z-10 group cursor-default transition-transform duration-200 ease-out hover:-translate-y-2"
                                >
                                    {/* Step circle - Real Glass Effect */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-14 h-14 rounded-full bg-white/60 backdrop-blur-md border border-white flex items-center justify-center shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] transition-transform duration-200 ease-out group-hover:scale-105">
                                            <Icon className="w-6 h-6 text-black" />
                                        </div>
                                    </div>
                                    {/* Card */}
                                    <div className="bg-[#f5f5f7] rounded-3xl p-6 border border-black/[0.04] transition-[background-color,border-color,box-shadow] duration-200 group-hover:bg-white group-hover:shadow-md group-hover:border-indigo-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-black text-slate-300 tracking-widest">{step}</span>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${badgeColor} text-white`}>{tag}</span>
                                        </div>
                                        <h4 className="font-bold text-[#1d1d1f] mb-2 text-sm leading-tight">{title}</h4>
                                        <p className="text-xs text-[#6e6e73] leading-relaxed">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA strip */}
                        <motion.div
                            variants={fade}
                            className="mt-12 relative rounded-3xl overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2c2876] via-indigo-700 to-purple-700" />
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(167,139,250,0.3) 0%, transparent 60%)' }} />
                            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">
                                <div>
                                    <div className="text-white font-black text-xl mb-1">Prêt à commencer votre stage intensif ?</div>
                                    <div className="text-white/60 text-sm">Créneaux disponibles cette semaine à Paris et Île-de-France.</div>
                                </div>
                                <button
                                    onClick={() => { navigate('/tarifs'); window.scrollTo(0, 0); }}
                                    className="shrink-0 bg-white text-[#2c2876] font-black px-8 py-3.5 rounded-2xl text-sm hover:bg-purple-50 hover:scale-[1.03] active:scale-[0.98] transition-[transform,background-color] duration-150 ease-out will-change-transform shadow-lg"
                                >
                                    Voir les formules intensives →
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <div className="relative z-10 bg-white border-t border-slate-100">
                <HomeNewStudentSection />
            </div>

            <Footer />
        </div>
    );
}

export default Details1;
