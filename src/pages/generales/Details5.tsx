import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "framer-motion";
import { BookOpen, CheckCircle2, FileText, MonitorSmartphone, MousePointerClick, Check, ArrowLeft, MapPin, Smartphone, Clock, Wallet, Star, Award, Map, Car, PiggyBank, ShieldCheck, Target, UserCheck, Trophy, ThumbsUp, Users, Zap, Gauge, CalendarDays, Leaf, Wind, BatteryCharging } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageHead from "@components/SEO/PageHead";
import JsonLd from "@components/SEO/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@components/SEO/schemas";
import RelatedServices from "@components/SEO/RelatedServices";

const Details5 = () => {
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

    const documents = [
        { title: "Pièce d'identité", desc: "En cours de validité (Carte d'identité, passeport ou titre de séjour)." },
        { title: "Justificatif de domicile", desc: "Datant de moins de 6 mois (Facture internet, électricité ou avis d'imposition)." },
        { title: "Photo d'identité", desc: "e-Photo agréée ANTS avec signature numérique intégrée." }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <PageHead
                title="Code de la route en ligne - Smoni Auto-Ecole Vincennes"
                description="Revisez le code de la route en ligne avec Smoni Vincennes : cours, examens blancs et suivi de progression depuis chez vous."
                canonicalPath="/code-en-ligne"
                ogImage="/og/code-en-ligne.png"
            />
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Accueil", path: "/" },
                        { name: "Code en ligne", path: "/code-en-ligne" },
                    ]),
                    serviceSchema({
                        name: "Code de la route en ligne 24/7",
                        description:
                            "Plateforme Pass Rousseau incluse : tests illimités, accessible 24h/24, sessions présentielles hebdo à l'agence Smoni Vincennes.",
                        path: "/code-en-ligne",
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
                            background: 'radial-gradient(circle, rgba(44, 40, 118, 0.15) 0%, transparent 60%)',
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
                        className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shadow-sm mb-6 font-bold"
                    >
                        <MonitorSmartphone className="w-4 h-4 mr-2" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">100% Digital</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Code de la route <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent italic pr-2">en ligne.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Révisez votre code de la route quand vous voulez, où vous voulez. Smoni vous propose une plateforme d'entraînement immersive pour décrocher votre code du premier coup.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => { navigate('/tarifs'); window.scrollTo(0, 0); }}
                            className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-2xl px-8 h-14 text-lg font-black shadow-[0_15px_30px_-10px_rgba(5,150,105,0.4)] transition-all hover:scale-[1.03] border-none"
                        >
                            Accéder à la plateforme <MousePointerClick className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                </motion.div>
            </main>

            <section className="py-16 md:py-24 bg-white relative z-10">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
                    >
                        {/* L'avantage */}
                        <div>
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl font-extrabold text-[#2c2876] mb-6 tracking-tight"
                            >
                                Apprenez à votre rythme
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed">
                                Finies les contraintes de déplacements en salle. Que vous soyez dans les transports, chez vous ou en pause au bureau, vous avez accès à tous nos cours et centaines de séries d'entraînements conformes à l'examen officiel de {new Date().getFullYear()}.
                            </motion.p>
                            <motion.ul variants={containerVariants} className="space-y-5">
                                {[
                                    "Séries thématiques et tests blancs",
                                    "Suivi des statistiques et de votre progression",
                                    "Cours interactifs et vidéos explicatives",
                                    "Compatible Mobile, Tablette, et Ordinateur"
                                ].map((perk, i) => (
                                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="min-w-6 min-h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                                        </div>
                                        <span className="text-[#2c2876] font-bold text-sm tracking-wide">{perk}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>

                        {/* Documents à fournir */}
                        <div>
                            <motion.div variants={itemVariants} className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                                        <FileText className="w-6 h-6 text-[#2c2876]" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-[#2c2876] tracking-tight">Documents à fournir</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-6">Pour valider votre inscription officielle auprès de l'ANTS, nous aurons besoin de ces éléments :</p>

                                <div className="space-y-4">
                                    {documents.map((doc, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                                        >
                                            <div className="w-10 h-10 bg-[#2c2876] text-white rounded-xl flex items-center justify-center font-black shadow-inner shrink-0 text-lg">
                                                {idx + 1}
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-[#2c2876] mb-1">{doc.title}</h3>
                                                <p className="text-slate-400 text-xs leading-relaxed">{doc.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 1: Auto-école en ligne à Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-20 pt-16 border-t border-slate-100"
                    >
                        {/* Premium Dark Glass Card */}
                        <div className="relative overflow-hidden rounded-[3rem] max-w-5xl mx-auto shadow-2xl group cursor-default">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2c2876] via-[#1a1550] to-[#0a0720]" />
                            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.5) 0%, transparent 60%)' }} />
                            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)' }} />

                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12 lg:p-16">
                                {/* Content Side */}
                                <div className="flex-1 text-left">
                                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-emerald-300 text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-6 backdrop-blur-md">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        La référence locale
                                    </div>
                                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                                        L'ultime <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 italic">Auto-école en ligne à Paris</span>
                                    </h2>
                                    <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                                        À la recherche de l'outil idéal pour obtenir votre permis ? SMONI est la plateforme rêvée pour les Parisiens. Oubliez les contraintes classiques et réussissez votre code sans stress grâce à un système taillé pour la capitale.
                                    </p>

                                    <div className="space-y-4">
                                        {/* Benefit 1 */}
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                                                <Smartphone className="w-6 h-6 text-blue-300" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm mb-0.5">Mobilité Absolue</h4>
                                                <p className="text-white/60 text-xs">Révisez partout à Paris, même dans le métro.</p>
                                            </div>
                                        </div>
                                        {/* Benefit 2 */}
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/30">
                                                <Clock className="w-6 h-6 text-amber-300" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm mb-0.5">Gain de Temps</h4>
                                                <p className="text-white/60 text-xs">Aucun déplacement en salle requis : 100% digital.</p>
                                            </div>
                                        </div>
                                        {/* Benefit 3 */}
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/30">
                                                <Wallet className="w-6 h-6 text-emerald-300" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm mb-0.5">Financement CPF</h4>
                                                <p className="text-white/60 text-xs">Préservez votre budget, formation prise en charge à 100%.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Dashboard Block without images */}
                                <div className="lg:w-[45%] w-full flex flex-col gap-5">
                                    <div className="relative rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-xl p-8 transform transition-transform duration-500 group-hover:scale-[1.03]">
                                        <div className="absolute top-0 right-0 p-8 opacity-20 blur-xl pointer-events-none">
                                            <CheckCircle2 className="w-48 h-48 text-emerald-400" />
                                        </div>
                                        <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Taux de réussite</h4>
                                        <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-teal-500 mb-4 tracking-tighter" style={{ fontFamily: "Outfit, sans-serif" }}>98%</div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                                            <div className="w-[98%] h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse" />
                                        </div>
                                        <p className="text-white/80 text-xs mt-3 leading-relaxed font-semibold">Une pédagogie innovante pour une réussite éclair de l'examen parisien.</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                                            <MapPin className="w-8 h-8 text-blue-300 mb-3" />
                                            <span className="text-white font-bold text-sm">Paris</span>
                                            <span className="text-white/50 text-[10px] uppercase tracking-widest mt-1">+ Île de france</span>
                                        </div>
                                        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                                            <Smartphone className="w-8 h-8 text-violet-300 mb-3" />
                                            <span className="text-white font-bold text-sm">App Mobile</span>
                                            <span className="text-white/50 text-[10px] uppercase tracking-widest mt-1">Connecté 24/7</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 2: Code de la route en ligne Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-20 pt-16 border-t border-slate-100"
                    >
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
                                    <BookOpen className="w-4 h-4 mr-2" /> Préparation Officielle
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black text-[#2c2876] mb-6 tracking-tight">
                                    Votre <span className="underline decoration-blue-400 decoration-4 underline-offset-8">Code de la route en ligne Paris</span>
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                    Conçu pour l'accessibilité absolue des candidats franciliens. Un apprentissage à votre rythme, parfaitement aligné sur la réforme stricte de l'examen {new Date().getFullYear()}.
                                </motion.p>
                            </div>

                            {/* Bento Grid Layout (Strictly Light UI) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Big Box - Conformity (Span 2) */}
                                <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute -right-8 -bottom-8 opacity-[0.03] transition-transform group-hover:scale-110">
                                        <Award className="w-64 h-64 text-[#2c2876]" />
                                    </div>
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100">
                                        <CheckCircle2 className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-[#2c2876] mb-4">Conformité Examen 2026</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-8 relative z-10">
                                        Ne prenez aucun risque avec des contenus obsolètes. Notre plateforme vous entraîne sur des séries de questions strictement conformes aux exigences officielles de {new Date().getFullYear()}. L'algorithme simule les conditions réelles pour vous garantir le succès le jour J.
                                    </p>
                                    <div className="flex flex-wrap gap-4 relative z-10">
                                        <div className="bg-slate-50 px-5 py-2.5 rounded-xl text-sm font-bold text-[#2c2876] border border-slate-100 flex items-center shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Vidéos 3D immersives
                                        </div>
                                        <div className="bg-slate-50 px-5 py-2.5 rounded-xl text-sm font-bold text-[#2c2876] border border-slate-100 flex items-center shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Nouvelles thématiques
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Small Box - Accessibility */}
                                <motion.div variants={itemVariants} className="bg-cyan-50 rounded-[2rem] p-8 border border-cyan-100 relative overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
                                    <div className="absolute -top-4 -right-4 p-4 opacity-10">
                                        <MonitorSmartphone className="w-40 h-40 text-cyan-600" />
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 border border-cyan-100">
                                                <MonitorSmartphone className="w-6 h-6 text-cyan-600" />
                                            </div>
                                            <h3 className="text-xl font-extrabold text-[#2c2876] mb-3">Accessibilité 24/7</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                Votre auto-école ouverte de jour comme de nuit. Révisez sur PC, tablette ou smartphone.
                                            </p>
                                        </div>
                                        <div className="mt-8">
                                            <div className="text-5xl font-black tracking-tighter text-cyan-600" style={{ fontFamily: "Outfit, sans-serif" }}>100%</div>
                                            <div className="text-cyan-800 text-xs font-bold uppercase tracking-widest mt-1">Cross-platform</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Small Box - Paris Focus */}
                                <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center">
                                    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-5 border border-rose-100">
                                        <MapPin className="w-8 h-8 text-rose-500" />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-[#2c2876] mb-3">Excellence Parisienne</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Le programme cible les pièges de l'examen francilien, indispensable pour tout candidat visant de valider son <strong>code de la route en ligne Paris</strong> rapidement.
                                    </p>
                                </motion.div>

                                {/* Wide Box - Stats/Progress */}
                                <motion.div variants={itemVariants} className="md:col-span-2 bg-[#f8fafc] rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-inner flex flex-col md:flex-row items-center gap-10">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-extrabold text-[#2c2876] mb-3">Suivi Pédagogique Intelligent</h3>
                                        <p className="text-slate-500 text-base leading-relaxed">
                                            Nos algorithmes analytiques décomposent vos faiblesses statistiques et génèrent des séries sur-mesure pour combler vos lacunes. Vous savez exactement quand vous êtes prêt.
                                        </p>
                                    </div>
                                    <div className="w-full md:w-72 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm shrink-0 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prêt pour l'examen</span>
                                            <span className="text-2xl font-black text-emerald-500" style={{ fontFamily: "Outfit, sans-serif" }}>38/40</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="w-[95%] h-full bg-emerald-500 rounded-full" />
                                        </div>
                                        <div className="mt-3 text-[#2c2876] text-[10px] font-bold uppercase tracking-widest text-right">Moyenne estimée</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 3: Permis de conduire Paris (Île-de-France) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-20 pt-16 border-t border-slate-100"
                    >
                        <div className="max-w-6xl mx-auto px-4 sm:px-0">
                            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                                {/* Large Typography Left Pane */}
                                <motion.div variants={itemVariants} className="w-full lg:w-[45%]">
                                    <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-[#2c2876] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                        <Map className="w-4 h-4 mr-2 text-blue-500" /> Réseau Francilien
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2c2876] tracking-tight leading-tight mb-8">
                                        <span className="text-slate-300 font-serif">03.</span><br />
                                        Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Permis de conduire Paris</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-10">
                                        Viser le <strong>permis de conduire Paris</strong> est souvent perçu comme un défi en raison de la densité et de la nervosité du trafic. SMONI transforme cet obstacle urbain en votre meilleur atout grâce à une pédagogie ciblée et un maillage territorial exceptionnel sur toute l'Île-de-France.
                                    </p>
                                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 relative overflow-hidden group hover:border-blue-300 transition-colors">
                                        <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
                                            <MapPin className="w-48 h-48 text-blue-900" />
                                        </div>
                                        <div className="text-4xl font-black text-blue-600 mb-2 tracking-tighter" style={{ fontFamily: "Outfit, sans-serif" }}>100%</div>
                                        <p className="text-blue-900 text-sm font-semibold opacity-80 uppercase tracking-widest">Couverture des centres d'examen de la région IDF.</p>
                                    </div>
                                </motion.div>

                                {/* Feature List Right Pane */}
                                <motion.div variants={containerVariants} className="w-full lg:w-[55%] space-y-5">
                                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:border-indigo-200 hover:-translate-y-1 transition-all flex flex-col sm:flex-row items-start gap-6 group">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                            <MapPin className="w-8 h-8 text-indigo-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2c2876] mb-2">Couverture Totale Île-de-France</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">Que vous résidiez intramuros, dans le 92, 93, 94 ou au-delà, nos moniteurs hautement qualifiés se déplacent près de chez vous. Plus besoin de perdre des heures dans les transports, la leçon commence à votre arrêt de métro.</p>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:border-rose-200 hover:-translate-y-1 transition-all flex flex-col sm:flex-row items-start gap-6 group">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                            <Car className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2c2876] mb-2">Préparation Centres Officiels</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">Nos leçons pratiques sont minutieusement modélisées et tracées autour des véritables centres d'examens franciliens. Vous apprenez et vous vous entraînez directement là où vous serez évalué par les inspecteurs.</p>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:border-emerald-200 hover:-translate-y-1 transition-all flex flex-col sm:flex-row items-start gap-6 group">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                            <Award className="w-8 h-8 text-emerald-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2c2876] mb-2">Pédagogie Urbaine Adaptée</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">L'environnement parisien comporte des pièges uniques : insertion difficile, circulation hypersaturée, ronds-points complexes (comme l'Étoile). Nous vous formons spécifiquement à la maîtrise de ces scénarios stressants.</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 4: Auto-école CPF Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-20 pt-16 border-t border-slate-100"
                    >
                        <div className="max-w-6xl mx-auto px-4 sm:px-0">
                            <div className="flex flex-col lg:flex-row items-center gap-16">
                                {/* Visual Graphic (Non-image / Invoice Mockup) */}
                                <motion.div variants={itemVariants} className="w-full lg:w-1/2">
                                    <div className="bg-emerald-50 rounded-[3rem] p-10 md:p-14 border border-emerald-100 relative overflow-hidden flex flex-col items-center justify-center text-center h-full group hover:bg-emerald-100/50 transition-colors">
                                        <div className="absolute -top-10 -left-10 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                            <PiggyBank className="w-72 h-72 text-emerald-900" />
                                        </div>

                                        <h3 className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-4">Votre Reste à Charge</h3>
                                        <div className="text-[7rem] md:text-[8rem] font-black text-emerald-500 tracking-tighter leading-none mb-6 relative z-10" style={{ fontFamily: "Outfit, sans-serif" }}>0<span className="text-6xl text-emerald-400 absolute top-4">€</span></div>

                                        {/* Pure UI Invoice Widget */}
                                        <div className="w-full max-w-sm mt-4 bg-white p-8 rounded-3xl shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] border border-emerald-100 relative z-10 text-left transform group-hover:-translate-y-2 transition-transform duration-500">
                                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                                                <span className="text-slate-500 font-medium">Prix de la formation</span>
                                                <span className="text-[#2c2876] font-bold">Inclus</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                                                <span className="text-slate-500 font-medium">Prise en charge CPF</span>
                                                <span className="text-emerald-500 font-black">100%</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-[#2c2876] font-black uppercase text-xs tracking-widest">À payer aujourd'hui</span>
                                                <span className="text-[#2c2876] font-black text-2xl">0 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <motion.div variants={itemVariants} className="w-full lg:w-1/2">
                                    <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100">
                                        <Wallet className="w-4 h-4 mr-2" /> Financement d'État
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-[#2c2876] tracking-tight leading-tight mb-8">
                                        La référence <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">auto école CPF Paris</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-10">
                                        Le financement est historiquement le principal frein pour les candidats. Ne touchez plus à vos économies personnelles. En tant qu'établissement certifié Qualiopi, SMONI vous permet de mobiliser vos droits à la formation de manière immédiate et transparente.
                                    </p>

                                    <ul className="space-y-6">
                                        <li className="flex items-start gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                                                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div className="pt-1">
                                                <h4 className="font-bold text-[#2c2876] text-lg mb-1">Démarche Simplifiée</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed">Nos conseillers s'occupent du montage de votre dossier sur la plateforme officielle MonCompteFormation. Vous validez en un clic via FranceConnect.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                                                <PiggyBank className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div className="pt-1">
                                                <h4 className="font-bold text-[#2c2876] text-lg mb-1">Aucun fond à avancer</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed">La Caisse des Dépôts règle directement l'auto-école. Vous préservez totalement votre budget parisien tout en investissant dans votre mobilité.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 5: Permis CPF 100% financé */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-20 pt-20 border-t border-slate-100 pb-24 relative"
                    >
                        {/* Massive Full Bleed Background */}
                        <div className="absolute inset-0 bg-[#f8fafc] w-[200vw] left-1/2 -translate-x-1/2 -z-10" />

                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="text-center mb-16">
                                <motion.div variants={itemVariants} className="inline-flex items-center px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-200 shadow-sm">
                                    <Target className="w-4 h-4 mr-2" /> Dispositif Officiel
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black text-[#2c2876] mb-6 tracking-tight">
                                    Le <span className="underline decoration-blue-500 decoration-4 underline-offset-8">permis CPF financement</span> intégral
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                    Une opportunité en or d'obtenir votre indépendance. Décryptage de vos droits et des garanties uniques offertes par notre plateforme pour vous couvrir financièrement.
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                                {/* Left Column: Eligibility Vertical Timeline */}
                                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-slate-200 shadow-sm relative group hover:border-blue-200 transition-colors">
                                    <h3 className="text-2xl font-bold text-[#2c2876] mb-10 pb-6 border-b border-slate-100 flex items-center">
                                        <div className="bg-blue-50 p-3 rounded-2xl mr-4 border border-blue-100">
                                            <UserCheck className="w-6 h-6 text-blue-500" />
                                        </div>
                                        Critères d'Éligibilité
                                    </h3>

                                    <div className="relative border-l-2 border-dashed border-blue-200 ml-6 space-y-12 py-2">
                                        {/* Timeline Step 1 */}
                                        <div className="relative pl-10">
                                            <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border-[6px] border-white shadow-sm transition-transform group-hover:scale-110">
                                                <span className="text-blue-600 font-bold text-sm">1</span>
                                            </div>
                                            <h4 className="font-bold text-[#2c2876] text-lg mb-2">Acquisition de droits</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">Vous devez disposer d'un solde positif sur votre Compte Personnel de Formation (CPF), généré par vos heures ou années de travail précédentes.</p>
                                        </div>

                                        {/* Timeline Step 2 */}
                                        <div className="relative pl-10">
                                            <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border-[6px] border-white shadow-sm transition-transform group-hover:scale-110">
                                                <span className="text-blue-600 font-bold text-sm">2</span>
                                            </div>
                                            <h4 className="font-bold text-[#2c2876] text-lg mb-2">Projet Professionnel</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">L'obtention du permis doit s'inscrire dans une démarche de maintien ou de retour à l'emploi (réalisation d'un projet professionnel).</p>
                                        </div>

                                        {/* Timeline Step 3 */}
                                        <div className="relative pl-10">
                                            <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border-[6px] border-white shadow-sm transition-transform group-hover:scale-110">
                                                <span className="text-blue-600 font-bold text-sm">3</span>
                                            </div>
                                            <h4 className="font-bold text-[#2c2876] text-lg mb-2">Validité Civile</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">Ne pas faire l'objet d'une sanction vous interdisant de vous inscrire à l'examen (suspension en cours ou annulation judiciaire du permis).</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Right Column: Benefits Stack List */}
                                <motion.div variants={containerVariants} className="space-y-6 flex flex-col justify-center">
                                    <motion.h3 variants={itemVariants} className="text-xl font-bold text-slate-400 mb-2 pl-2 uppercase tracking-widest text-sm flex items-center">
                                        <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
                                        Les garanties SMONI
                                    </motion.h3>

                                    {/* Benefit Card 1 */}
                                    <motion.div variants={itemVariants} className="bg-white p-7 rounded-[2rem] border border-emerald-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:translate-x-3 transition-transform flex items-start gap-6 cursor-default">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-emerald-100">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-[#2c2876] text-lg mb-1">0€ de Frais Cachés</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">Votre solde CPF prend en charge l'intégralité du pack sélectionné y compris l'inscription à l'épreuve.</p>
                                        </div>
                                    </motion.div>

                                    {/* Benefit Card 2 */}
                                    <motion.div variants={itemVariants} className="bg-white p-7 rounded-[2rem] border border-emerald-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:translate-x-3 transition-transform flex items-start gap-6 cursor-default">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-emerald-100">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-[#2c2876] text-lg mb-1">Prise en charge intégrale</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">Nos équipes sécurisent et vérifient votre montage administratif sur Mon Compte Formation pour éviter les erreurs.</p>
                                        </div>
                                    </motion.div>

                                    {/* Benefit Card 3 */}
                                    <motion.div variants={itemVariants} className="bg-white p-7 rounded-[2rem] border border-emerald-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:translate-x-3 transition-transform flex items-start gap-6 cursor-default">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-emerald-100">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-[#2c2876] text-lg mb-1">Activation immédiate</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">Dès la validation de la Caisse des Dépôts, vos accès à la plateforme et au planning d'heures sont instantanément débloqués.</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 6: Meilleure auto-école Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-20 pt-20 border-t border-slate-100 pb-16 relative"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                            <motion.div variants={itemVariants} className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] border border-blue-100 shadow-sm mb-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                <Trophy className="w-14 h-14 text-blue-500" />
                            </motion.div>

                            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black text-[#2c2876] tracking-tight mb-8">
                                L'exigence de la <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 block mt-2 p-1">meilleure auto école Paris</span>
                            </motion.h2>

                            <motion.p variants={itemVariants} className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed mb-16 px-4">
                                Nous ne sommes pas une simple plateforme de mise en relation. SMONI est un établissement d'excellence : moniteurs rigoureusement diplômés d'État, outils pédagogiques exclusifs, et un accompagnement premium qui fait l'unanimité auprès des candidats parisiens.
                            </motion.p>

                            <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-0 text-left">
                                {/* Card 1: Pédagogie */}
                                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-500 cursor-default group relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                                        <Award className="w-48 h-48 text-blue-500" />
                                    </div>
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-blue-100">
                                        <Award className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#2c2876] mb-5 relative z-10">Une Pédagogie d'Excellence</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed relative z-10">
                                        Pour être considérée comme la meilleure auto école à Paris, nous mettons un point d'honneur à recruter uniquement des moniteurs diplômés d'État, expérimentés et dotés d'une véritable vocation. Ils maîtrisent parfaitement les spécificités et les complexités de la conduite en région parisienne, assurant ainsi une préparation irréprochable et sereine aux candidats.
                                    </p>
                                </motion.div>

                                {/* Card 2: Social Proof / Avis */}
                                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-500 cursor-default group relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                                        <Star className="w-48 h-48 text-indigo-500" />
                                    </div>
                                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-indigo-100">
                                        <Star className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#2c2876] mb-5 relative z-10">La force de la preuve sociale</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed relative z-10">
                                        Les avis certifiés laissés par nos précédents élèves témoignent de leur satisfaction. Contrairement aux plateformes Low-Cost, notre modèle repose sur un service réactif et un suivi pédagogique exclusif. Chaque candidat est encadré jusqu'à l'obtention définitive de son permis, garantissant une position de leader dans l'écosystème parisien.
                                    </p>
                                </motion.div>

                                {/* Card 3: Positionnement Premium */}
                                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-500 cursor-default group relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                                        <ThumbsUp className="w-48 h-48 text-emerald-500" />
                                    </div>
                                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-emerald-100">
                                        <ThumbsUp className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#2c2876] mb-5 relative z-10">Un positionnement haut de gamme</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed relative z-10">
                                        Nous assumons la volonté de proposer un service haut de gamme. Cela se traduit par l'utilisation d'une flotte de véhicules confortables et modernes, une interface digitale ultra-fluide pour organiser votre planning sur-mesure, et des points de rencontre idéalement situés pour débuter votre parcours dans les meilleures conditions.
                                    </p>
                                </motion.div>

                                {/* Card 4: Differentiation */}
                                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-500 cursor-default group relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                                        <ShieldCheck className="w-48 h-48 text-purple-500" />
                                    </div>
                                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-purple-100">
                                        <ShieldCheck className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#2c2876] mb-5 relative z-10">La transparence avant tout</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed relative z-10">
                                        Se différencier dans la capitale exige une honnêteté sans faille. Chez SMONI, nos packs sont 100% transparents. Vous savez précisément ce que vous investissez dès le premier regard, sans surcoûts injustifiés ni frais cachés en fin de parcours. C'est spécifiquement cette fiabilité qui fonde notre réputation globale.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 7: Permis rapide Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-16 pt-16 border-t border-slate-100 mb-16"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                                {/* Left Content */}
                                <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative z-10">
                                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
                                        <Zap className="w-4 h-4 mr-2" /> Formation Accélérée
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2c2876] tracking-tight mb-8 leading-tight">
                                        Votre parcours <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">permis rapide Paris</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                        Les écoles de conduite traditionnelles parisiennes saturent et imposent des mois de délai. SMONI réinvente l'apprentissage grâce à une flotte surdimensionnée garantissant une disponibilité permanente. Validez votre permis en mode intensif, à votre rythme.
                                    </p>

                                    <div className="space-y-6 bg-[#f8fafc] p-8 rounded-[2rem] border border-slate-100">
                                        <div className="flex items-start gap-5">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-slate-200">
                                                <CalendarDays className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-[#2c2876] font-bold text-lg mb-1">Disponibilité massive</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed">Réservez vos heures de conduite la même semaine. Fini la frustration et les listes d'attente interminables.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-5">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-slate-200">
                                                <Gauge className="w-6 h-6 text-indigo-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-[#2c2876] font-bold text-lg mb-1">Mode Stage Intensif</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed">Concentrez vos leçons et validez votre parcours complet en 3 à 4 semaines de conduite régulière.</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Right CSS Faux-UI Planning block (No Images, Pure UI, Blue Theme) */}
                                <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-[3rem] transform rotate-3 scale-105 -z-10" />
                                    <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 lg:p-10 relative z-10 transition-transform duration-500 hover:-translate-y-2">
                                        <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                                            <div>
                                                <h3 className="text-[#2c2876] font-black text-xl">Planning Smoni</h3>
                                                <p className="text-slate-400 text-sm font-medium">Créneaux ouverts dès la semaine prochaine</p>
                                            </div>
                                            <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200 flex items-center shadow-sm">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> +45 dispos
                                            </div>
                                        </div>

                                        {/* Elegantly styled CSS Grid for Fake Interactive Calendar */}
                                        <div className="space-y-4">
                                            {/* Line 1 */}
                                            <div className="flex items-center gap-4 group">
                                                <div className="text-slate-400 w-10 text-sm font-black tracking-widest pt-1 group-hover:text-[#2c2876] transition-colors">LUN</div>
                                                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 flex h-14 bg-[#f8fafc] p-1 gap-1">
                                                    <div className="flex-1" />
                                                    <div className="bg-white border border-blue-100 text-[#2c2876] shadow-sm rounded-xl flex-[2] flex items-center justify-center font-bold text-sm cursor-default hover:border-blue-300 transition-colors">08h00 - 10h00</div>
                                                    <div className="flex-1" />
                                                </div>
                                            </div>
                                            {/* Line 2 */}
                                            <div className="flex items-center gap-4 group">
                                                <div className="text-slate-400 w-10 text-sm font-black tracking-widest pt-1 group-hover:text-[#2c2876] transition-colors">MAR</div>
                                                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 flex h-14 bg-[#f8fafc] p-1 gap-1">
                                                    <div className="bg-blue-50 border border-blue-200 text-blue-700 shadow-sm rounded-xl flex-[1.5] flex items-center justify-center font-bold text-sm cursor-default hover:border-blue-300 transition-colors">10h00 - 12h00</div>
                                                    <div className="flex-[0.5]" />
                                                    <div className="bg-white border border-blue-100 text-[#2c2876] shadow-sm rounded-xl flex-1 flex items-center justify-center font-bold text-sm cursor-default hover:border-blue-300 transition-colors">16h00 - 18h00</div>
                                                </div>
                                            </div>
                                            {/* Line 3 */}
                                            <div className="flex items-center gap-4 group">
                                                <div className="text-slate-400 w-10 text-sm font-black tracking-widest pt-1 group-hover:text-[#2c2876] transition-colors">MER</div>
                                                <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 flex h-14 bg-[#f8fafc] p-1 gap-1">
                                                    <div className="flex-[0.5]" />
                                                    <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-sm rounded-xl flex-[2.5] flex items-center justify-center font-bold text-sm cursor-default hover:border-indigo-300 transition-colors">16h00 - 20h00 (Intensif)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 8: Formation conduite boîte automatique Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-16 pt-16 border-t border-slate-100 mb-16"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                                {/* Left Content */}
                                <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative z-10">
                                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
                                        <Car className="w-4 h-4 mr-2" /> Flotte Récente & Boîte Auto
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-[#2c2876] tracking-tight mb-8 leading-tight">
                                        L'excellence de la <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">conduite en boîte automatique Paris</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                        SMONI vous propose de passer votre permis sur des véhicules récents équipés de boîtes automatiques. Profitez de l'absence totale d'embrayage pour vous concentrer sur votre sécurité et votre environnement. C'est la solution ultime pour naviguer dans le trafic dense de la capitale.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-5">
                                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100">
                                                <Zap className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-[#2c2876] font-bold text-lg mb-1">Apprentissage Accéléré</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed">Le permis BEA (boîte automatique) ne nécessite que 13 heures de conduite légales minimum contre 20 heures. Vous gagnez en temps de formation et en budget global.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-5">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                                                <Gauge className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-[#2c2876] font-bold text-lg mb-1">Simplicité Extrême</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed">Oubliez les calages intempestifs et les démarrages en côte stressants. La boîte auto vous libère l'esprit pour une observation optimale et une sécurité décuplée.</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Right Metric Grid (Clean Staggered Bento) */}
                                <motion.div variants={itemVariants} className="w-full lg:w-1/2">
                                    <div className="grid grid-cols-2 gap-4 lg:gap-6">
                                        <div className="bg-[#f8fafc] p-6 lg:p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-center shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                                <Clock className="w-24 h-24" />
                                            </div>
                                            <div className="text-4xl lg:text-5xl font-black text-[#2c2876] mb-2 drop-shadow-sm relative z-10">13h</div>
                                            <div className="text-slate-500 font-bold text-sm uppercase tracking-wide relative z-10">Minimum Légal</div>
                                            <p className="text-slate-400 text-xs mt-3 leading-relaxed relative z-10">Passez votre permis auto beaucoup plus rapidement qu'en boîte manuelle classique.</p>
                                        </div>

                                        <div className="bg-[#f8fafc] p-6 lg:p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-center shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors mt-6 lg:mt-12">
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                                <Target className="w-24 h-24" />
                                            </div>
                                            <div className="text-4xl lg:text-5xl font-black text-blue-600 mb-2 drop-shadow-sm relative z-10">100%</div>
                                            <div className="text-slate-500 font-bold text-sm uppercase tracking-wide relative z-10">Concentration</div>
                                            <p className="text-slate-400 text-xs mt-3 leading-relaxed relative z-10">Fini la gestion mécanique fastidieuse, restez entièrement focalisé sur la route.</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 lg:p-8 rounded-[2rem] border border-indigo-400 flex flex-col justify-center shadow-lg relative overflow-hidden group -mt-6 lg:-mt-12">
                                            <div className="text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-md relative z-10">0</div>
                                            <div className="text-indigo-100 font-bold text-sm uppercase tracking-wide relative z-10">Calage</div>
                                            <p className="text-indigo-100 text-xs mt-3 leading-relaxed relative z-10">L'ordinateur gère les vitesses, garantissant une sérénité totale même dans les pires bouchons.</p>

                                            <div className="absolute -bottom-6 -right-6 bg-white/20 w-32 h-32 rounded-full blur-2xl pointer-events-none" />
                                        </div>

                                        <div className="bg-[#f8fafc] p-6 lg:p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-center shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                                <Car className="w-24 h-24" />
                                            </div>
                                            <div className="text-3xl lg:text-4xl font-black text-[#2c2876] mb-3 drop-shadow-sm relative z-10">B.E.A</div>
                                            <div className="text-slate-500 font-bold text-sm uppercase tracking-wide relative z-10">Permis Facilité</div>
                                            <p className="text-slate-400 text-xs mt-3 leading-relaxed relative z-10">Évolutif plus tard vers une passerelle boîte manuelle facilement via une formation de seulement 7h.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 9: Réserver des heures de conduite à Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-16 pt-16 border-t border-slate-100 mb-16"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 shadow-sm cursor-default hover:bg-blue-100 transition-colors">
                                    <Clock className="w-4 h-4 mr-2" /> Flexibilité Totale
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2c2876] tracking-tight mb-8">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Réserver des heures de conduite à Paris</span> en toute simplicité
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-slate-500 text-lg leading-relaxed">
                                    Oubliez les plannings rigides et les appels interminables. Avec notre plateforme digitale, vous bénéficiez d'une flexibilité absolue pour organiser votre apprentissage selon votre propre rythme parisien.
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Flexibilité */}
                                <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-500 group text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                                        <Smartphone className="w-32 h-32" />
                                    </div>
                                    <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors border border-blue-100 relative z-10 group-hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)]">
                                        <Smartphone className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-[#2c2876] font-bold text-xl mb-4 relative z-10">Application Mobile</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed relative z-10">Consultez les plannings et réservez instantanément avec tous nos moniteurs en temps réel directement depuis votre smartphone.</p>
                                </motion.div>

                                {/* Points de Rendez-vous */}
                                <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-500 group text-center relative overflow-hidden mt-0 md:mt-8">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                                        <MapPin className="w-32 h-32" />
                                    </div>
                                    <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition-colors border border-indigo-100 relative z-10 group-hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)]">
                                        <MapPin className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-[#2c2876] font-bold text-xl mb-4 relative z-10">Rendez-vous Flexibles</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed relative z-10">Débutez votre leçon n'importe où dans Paris, que ce soit au pied de votre domicile, près de votre bureau ou à la sortie de l'école.</p>
                                </motion.div>

                                {/* Liberté Horaires */}
                                <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-500 group text-center relative overflow-hidden mt-0 md:-mt-8">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                                        <Clock className="w-32 h-32" />
                                    </div>
                                    <div className="w-16 h-16 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors border border-sky-100 relative z-10 group-hover:shadow-[0_10px_20px_rgba(14,165,233,0.3)]">
                                        <Clock className="w-8 h-8 text-sky-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-[#2c2876] font-bold text-xl mb-4 relative z-10">Disponibilité 7j/7</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed relative z-10">Adaptez vos leçons à votre emploi du temps chargé avec des créneaux étendus tous les jours. Annulation gratuite jusqu'à 48h.</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO SECTION 30: Auto-école nouvelle génération à Paris */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-24 py-24 border-y border-slate-100 bg-[#f8fafc] w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden flex justify-center"
                    >
                        {/* Abstract graphics in background */}
                        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[800px] bg-blue-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                        {/* Giant background text for brand framing */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black italic text-slate-200/50 leading-none whitespace-nowrap pointer-events-none z-0 select-none">
                            NOUVELLE GÉNÉRATION
                        </div>

                        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                            {/* Text Content */}
                            <motion.div variants={itemVariants} className="w-full lg:w-[55%]">
                                <div className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
                                    <Star className="w-4 h-4 mr-2" /> La Référence Parisienne
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2c2876] tracking-tight mb-8 leading-tight">
                                    L'<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">auto-école nouvelle génération</span> à Paris
                                </h2>
                                <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                                    SMONI redéfinit entièrement les standards du permis de conduire. Oubliez les processus archaïques des auto-écoles classiques : notre auto école moderne à Paris combine l'excellence pédagogique de nos moniteurs avec la puissance des outils digitaux.
                                </p>
                                <ul className="space-y-6">
                                    <li className="flex items-start text-[#2c2876] font-bold text-lg">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mr-5 shrink-0 border border-slate-200 shadow-sm mt-0.5">
                                            <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            Expérience 100% digitale
                                            <div className="text-base font-normal text-slate-500 mt-1.5 leading-relaxed">De l'inscription à la réservation instantanée de vos heures, tout se fait depuis l'application.</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start text-[#2c2876] font-bold text-lg">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mr-5 shrink-0 border border-slate-200 shadow-sm mt-0.5">
                                            <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            Transparence tarifaire totale
                                            <div className="text-base font-normal text-slate-500 mt-1.5 leading-relaxed">Aucun frais caché. Un suivi clair de votre progression et de votre budget global.</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start text-[#2c2876] font-bold text-lg">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mr-5 shrink-0 border border-slate-200 shadow-sm mt-0.5">
                                            <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            Pédagogie d'élite bienveillante
                                            <div className="text-base font-normal text-slate-500 mt-1.5 leading-relaxed">Nos moniteurs diplômés maximisent votre taux de réussite dans un apprentissage sans stress.</div>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Right Tech Visual purely CSS */}
                            <motion.div variants={itemVariants} className="w-full lg:w-[45%] flex justify-center py-10">
                                <div className="relative w-80 h-80 lg:w-[28rem] lg:h-[28rem]">
                                    {/* Rotating Rings */}
                                    <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-slate-300/60 animate-[spin_20s_linear_infinite]" />
                                    <div className="absolute inset-8 lg:inset-10 rounded-full border-2 border-blue-200 animate-[spin_15s_linear_infinite_reverse]" />
                                    <div className="absolute inset-16 lg:inset-20 rounded-full border-2 border-indigo-200/50" />

                                    {/* Center Core */}
                                    <div className="absolute inset-24 lg:inset-28 bg-white rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center overflow-hidden group">
                                        <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply group-hover:bg-blue-500/10 transition-colors" />
                                        <span className="font-black text-[#2c2876] text-4xl lg:text-5xl tracking-tighter absolute z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">SMONI</span>
                                    </div>

                                    {/* Orbiting Satellites */}
                                    <div className="absolute top-4 lg:top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 z-10 transform -rotate-12 hover:rotate-0 transition-transform cursor-pointer">
                                        <Smartphone className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
                                    </div>
                                    <div className="absolute bottom-16 lg:bottom-20 right-0 translate-x-1/2 translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 z-10 transform rotate-12 hover:rotate-0 transition-transform cursor-pointer">
                                        <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-indigo-600" />
                                    </div>
                                    <div className="absolute bottom-24 lg:bottom-28 left-0 -translate-x-1/2 translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 z-10 transform rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                                        <Users className="w-8 h-8 lg:w-10 lg:h-10 text-[#2c2876]" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="mt-20 pt-16 border-t border-slate-100 flex justify-center"
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
                            className="rounded-2xl h-14 px-8 text-[#2c2876] border-slate-200 hover:bg-slate-50 font-bold text-base transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-3" /> Retour à tous les services
                        </Button>
                    </motion.div>
                </div>
            </section>

            <div className="relative z-10 bg-white border-t border-slate-100">
                <HomeNewStudentSection />
            </div>

            <RelatedServices currentSlug="code-en-ligne" />

            <Footer />
        </div>
    );
}

export default Details5;
