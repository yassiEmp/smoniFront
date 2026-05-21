import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "framer-motion";
import { GraduationCap, Shield, MousePointerClick, Check, ArrowLeft, Clock, History, FileText, AlertTriangle, TrendingDown, Heart, Eye, Users, Scale, Brain, Timer, Award, Milestone, MessageCircle, ChevronRight, Siren, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import PageHead from "@components/SEO/PageHead";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import imgTraditionnel from "@assets/blog/details7/conduite-traditionnelle.png?w=600;1000&format=avif;webp;png&as=picture";
import imgAccompagnee from "@assets/blog/details7/conduite-accompagnee.png?w=600;1000&format=avif;webp;png&as=picture";
import imgLabelQualite from "@assets/blog/details7/label-ecole-qualite.png?w=240;480&format=avif;webp;png&as=picture";

const Details7 = () => {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

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
        { title: "Permis de conduire", desc: "Votre permis original (recto-verso) en cours de validité." },
        { title: "Pièce d'identité", desc: "CNI ou Passeport en cours de validité, si différente du permis." },
        { title: "Justificatif de domicile", desc: "Document de moins de 6 mois (EDF, Internet, etc.)." }
    ];
    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <PageHead
                title="Formation post-permis - Smoni Auto-Ecole Vincennes"
                description="Formation post-permis pour jeunes conducteurs a Vincennes : reduisez la periode probatoire et roulez plus sereinement avec Smoni Auto-Ecole."
                canonicalPath="/post-permis"
            />
            <Header />

            <main className="relative pt-[120px] sm:pt-[140px] pb-16 md:pb-24 overflow-hidden border-b border-slate-200">
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.04) 0px, transparent 50%),
                                radial-gradient(at 100% 0%, rgba(147, 51, 234, 0.06) 0px, transparent 50%)
                            `
                        }}
                    />
                    <motion.div
                        className="fixed w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 60%)',
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
                        <Shield className="w-4 h-4 mr-2" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Formation Complémentaire</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Formation <span className="bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent italic pr-2">Post-Permis.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-3xl mx-auto"
                    >
                        Découvrez en 60 secondes chrono quels sont les avantages de la formation post-permis. Une formation d'une journée à effectuer entre 6 et 12 mois après obtention du permis de conduire.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 text-left">
                        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <Clock className="w-10 h-10 text-purple-600 mb-4" />
                            <h3 className="text-xl font-bold text-[#2c2876] mb-2 tracking-tight">C'est quoi ?</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Une formation d'une journée (7 heures) pour engager une prise de conscience sur le risque afin d'éviter un sentiment de surconfiance au moment où le jeune conducteur a acquis davantage d'assurance au volant.</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <History className="w-10 h-10 text-purple-600 mb-4" />
                            <h3 className="text-xl font-bold text-[#2c2876] mb-2 tracking-tight">Réduction Probatoire</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">En suivant ce stage, la période probatoire est réduite à **2 ans** (au lieu de 3) pour les formations traditionnelles, et à **1,5 an** (au lieu de 2) pour la conduite accompagnée.</p>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => { navigate('/learners/boutique'); window.scrollTo(0, 0); }}
                            className="bg-purple-600 text-white hover:bg-purple-700 rounded-2xl px-10 h-16 text-xl font-black shadow-[0_15px_30px_-10px_rgba(147,51,234,0.4)] transition-all hover:scale-[1.03] border-none"
                        >
                            Souscrire à la formation <MousePointerClick className="ml-2 w-6 h-6" />
                        </Button>
                    </motion.div>
                </motion.div>
            </main>

            <section className="py-16 md:py-24 bg-white relative z-10">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
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
                                Les conditions d'accès
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed">
                                Le stage s'adresse aux titulaires d'un premier permis de conduire qui n'ont pas commis d'infraction entraînant la perte de points sur leur permis.
                            </motion.p>
                            <motion.ul variants={containerVariants} className="space-y-5">
                                {[
                                    "Être entre 6 et 12 mois après l'obtention du permis",
                                    "Ne pas avoir perdu de points sur son permis",
                                    "Formation collective pour favoriser les échanges",
                                    "Animé par un enseignant de la conduite spécialisé"
                                ].map((perk, i) => (
                                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50">
                                        <div className="min-w-6 min-h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-purple-600 font-bold" />
                                        </div>
                                        <span className="text-[#2c2876] font-bold text-sm tracking-wide">{perk}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants} className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                                        <FileText className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-[#2c2876] tracking-tight">Documents requis</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-6">Préparez les éléments suivants pour votre inscription définitive au stage :</p>

                                <div className="space-y-4">
                                    {documents.map((doc, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                                        >
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-black shadow-inner shrink-0 text-base">
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

                    {/* Infographies Section */}
                    <div className="mt-24 pt-24 border-t border-slate-100">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants} className="text-center mb-14">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-widest border border-purple-100 mb-5">Infographie officielle — Sécurité Routière</span>
                                <h3 className="text-3xl md:text-4xl font-black text-[#2c2876] mb-4 tracking-tight">Récupération de points expliquée</h3>
                                <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">Votre mode d'apprentissage influence directement votre période probatoire.<br />Comparez les deux parcours possibles.</p>
                            </motion.div>

                            {/* Two elegant cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-14">
                                {/* Card 1 */}
                                <motion.div variants={itemVariants} className="group relative">
                                    <div className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                        style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 70%)' }} />
                                    <div className="relative rounded-[2rem] overflow-hidden border border-purple-200/60 shadow-xl group-hover:shadow-2xl transition-all duration-500 bg-white cursor-zoom-in"
                                        onClick={() => setLightbox({ src: imgTraditionnel.img.src, alt: 'Cas n°1 : Conduite Traditionnelle' })}>
                                        <ResponsivePicture picture={imgTraditionnel} alt="Cas n°1: Permis traditionnel" sizes="(min-width: 1024px) 600px, 92vw" loading="lazy" decoding="async" className="w-full h-auto block" />
                                        {/* iOS frosted glass footer */}
                                        <div className="absolute bottom-0 left-0 right-0 px-5 py-3.5 flex items-center gap-3"
                                            style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.6)' }}>
                                            <span className="w-7 h-7 rounded-xl bg-[#2c2876]/90 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                                            <span className="font-bold text-[#2c2876] text-sm flex-1">Conduite Traditionnelle</span>
                                            <ZoomIn className="w-4 h-4 text-purple-500 shrink-0" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Card 2 */}
                                <motion.div variants={itemVariants} className="group relative lg:mt-8">
                                    <div className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)' }} />
                                    <div className="relative rounded-[2rem] overflow-hidden border border-indigo-200/60 shadow-xl group-hover:shadow-2xl transition-all duration-500 bg-white cursor-zoom-in"
                                        onClick={() => setLightbox({ src: imgAccompagnee.img.src, alt: 'Cas n°2 : Conduite Accompagnée' })}>
                                        <ResponsivePicture picture={imgAccompagnee} alt="Cas n°2: Conduite accompagnée" sizes="(min-width: 1024px) 600px, 92vw" loading="lazy" decoding="async" className="w-full h-auto block" />
                                        {/* iOS frosted glass footer */}
                                        <div className="absolute bottom-0 left-0 right-0 px-5 py-3.5 flex items-center gap-3"
                                            style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.6)' }}>
                                            <span className="w-7 h-7 rounded-xl bg-[#2c2876]/90 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                                            <span className="font-bold text-[#2c2876] text-sm flex-1">Conduite Accompagnée</span>
                                            <ZoomIn className="w-4 h-4 text-indigo-500 shrink-0" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Label Qualité — Premium Dark Card */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-[3rem] max-w-2xl mx-auto"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2c2876] to-[#1a1550]" />
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(147,51,234,0.8) 0%, transparent 60%)' }} />
                                <div className="relative z-10 flex flex-col items-center justify-center p-10 text-center">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
                                        <ResponsivePicture picture={imgLabelQualite} alt="Label École Conduite Qualité" sizes="176px" loading="lazy" decoding="async" className="w-44 h-auto hover:scale-105 transition-transform" />
                                    </div>
                                    <p className="text-white/80 font-semibold text-sm max-w-sm leading-relaxed">
                                        SMONI est un établissement <span className="text-purple-300 font-black">labellisé par la Sécurité Routière</span>, garantissant la qualité de nos formations post-permis.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 1 — Loi post-permis janvier 2019         */}
            {/*  Design: Full-width legal citation band + sidebar      */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-12">
                            <span className="text-purple-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">01 — Cadre réglementaire</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tight leading-[1.1] mb-6">
                                La formation post-permis : ce que dit la <span className="text-purple-600">loi française</span>
                            </h2>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Main content */}
                            <motion.div variants={itemVariants} className="lg:w-[65%]">
                                {/* Legal citation block */}
                                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-8">
                                    <div className="bg-[#2c2876] p-5">
                                        <div className="flex items-center gap-3">
                                            <Scale className="w-5 h-5 text-purple-300" />
                                            <span className="text-white/80 font-bold text-sm">Décret n° 2018-715 du 3 août 2018 — Article R.223-4-1 du Code de la route</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <p className="text-[#6e6e73] text-[15px] leading-[1.85] mb-6">
                                            Depuis le <span className="font-bold text-[#1d1d1f]">1er janvier 2019</span>, tout titulaire d'un premier permis de conduire peut suivre une formation complémentaire appelée « formation post-permis » entre 6 et 12 mois après l'obtention de son titre. Cette formation, d'une durée d'une journée (7 heures), est encadrée par un enseignant de la conduite titulaire d'une autorisation spécifique délivrée par le préfet.
                                        </p>
                                        <p className="text-[#6e6e73] text-[15px] leading-[1.85]">
                                            L'objectif législatif est clair : réduire l'accidentalité des jeunes conducteurs pendant la période la plus critique de leur parcours automobile. Les statistiques de la Sécurité Routière montrent que le risque d'accident mortel est <span className="font-bold text-[#1d1d1f]">4 fois supérieur</span> chez les 18–24 ans par rapport au reste de la population. La formation post-permis vise à briser ce cycle en provoquant une prise de conscience avant que les mauvaises habitudes ne s'installent.
                                        </p>
                                    </div>
                                </div>

                                <p className="text-[#6e6e73] text-[15px] leading-[1.85]">
                                    En contrepartie de cet effort volontaire, le législateur accorde un avantage concret : la réduction de la période probatoire. Pour un conducteur issu de la filière traditionnelle, elle passe de 3 ans à 2 ans. Pour un conducteur ayant suivi la conduite accompagnée (AAC), elle passe de 2 ans à 1 an et 6 mois. Cette réduction est automatique dès la transmission de l'attestation de formation par l'auto-école à la préfecture.
                                </p>
                            </motion.div>

                            {/* Sidebar — key dates */}
                            <motion.div variants={itemVariants} className="lg:w-[35%]">
                                <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:sticky lg:top-32">
                                    <h3 className="font-bold text-[#1d1d1f] text-lg mb-6 flex items-center gap-2">
                                        <Milestone className="w-5 h-5 text-purple-600" />
                                        Dates clés
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { year: "2015", event: "Première mention dans le rapport du CNSR (Conseil National de la Sécurité Routière)" },
                                            { year: "2018", event: "Publication du décret n°2018-715 fixant les modalités de la formation" },
                                            { year: "2019", event: "Entrée en vigueur le 1er janvier — les auto-écoles labellisées peuvent proposer le stage" },
                                            { year: "2024", event: "Intégration renforcée avec le CPF (Compte Personnel de Formation) pour certains cas" },
                                        ].map(({ year, event }, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="shrink-0 text-2xl font-black text-purple-600 w-14 text-right">{year}</div>
                                                <div className="border-l-2 border-purple-100 pl-4">
                                                    <p className="text-sm text-[#6e6e73] leading-relaxed">{event}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 2 — Réduction période probatoire         */}
            {/*  Design: Horizontal comparison ribbons (not table)     */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">02 — L'avantage concret</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Réduire sa période probatoire grâce à la formation post-permis
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">Votre parcours d'apprentissage détermine la durée de probation. La formation post-permis la raccourcit dans les deux cas.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            {/* Ribbon 1 — filière traditionnelle */}
                            <div className="bg-[#f8fafc] rounded-3xl border border-slate-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <GraduationCap className="w-6 h-6 text-[#2c2876]" />
                                    <h3 className="font-bold text-[#1d1d1f] text-lg">Filière traditionnelle (permis classique)</h3>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                                    <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 text-center">
                                        <div className="text-xs text-[#6e6e73] font-semibold uppercase tracking-widest mb-2">Sans post-permis</div>
                                        <div className="text-4xl font-black text-[#6e6e73]">3 ans</div>
                                        <div className="text-xs text-[#6e6e73] mt-1">de période probatoire</div>
                                    </div>
                                    <div className="flex items-center justify-center px-3">
                                        <ChevronRight className="w-6 h-6 text-purple-400 rotate-90 md:rotate-0" />
                                    </div>
                                    <div className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-5 text-center">
                                        <div className="text-xs text-purple-600 font-semibold uppercase tracking-widest mb-2">Avec post-permis</div>
                                        <div className="text-4xl font-black text-purple-700">2 ans</div>
                                        <div className="text-xs text-purple-500 mt-1 font-bold">1 an de gagné !</div>
                                    </div>
                                </div>
                            </div>

                            {/* Ribbon 2 — conduite accompagnée */}
                            <div className="bg-[#f8fafc] rounded-3xl border border-slate-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Users className="w-6 h-6 text-[#2c2876]" />
                                    <h3 className="font-bold text-[#1d1d1f] text-lg">Conduite accompagnée (AAC)</h3>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                                    <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 text-center">
                                        <div className="text-xs text-[#6e6e73] font-semibold uppercase tracking-widest mb-2">Sans post-permis</div>
                                        <div className="text-4xl font-black text-[#6e6e73]">2 ans</div>
                                        <div className="text-xs text-[#6e6e73] mt-1">de période probatoire</div>
                                    </div>
                                    <div className="flex items-center justify-center px-3">
                                        <ChevronRight className="w-6 h-6 text-purple-400 rotate-90 md:rotate-0" />
                                    </div>
                                    <div className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-5 text-center">
                                        <div className="text-xs text-purple-600 font-semibold uppercase tracking-widest mb-2">Avec post-permis</div>
                                        <div className="text-4xl font-black text-purple-700">1,5 an</div>
                                        <div className="text-xs text-purple-500 mt-1 font-bold">6 mois de gagné !</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 3 — Accidentalité jeunes conducteurs     */}
            {/*  Design: Stat callout blocks with big numbers left     */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gradient-to-br from-[#1a1040] via-[#2c2876] to-[#1a1040] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(147,51,234,0.5) 0%, transparent 60%)' }} />
                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-purple-300 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">03 — Le constat</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                                Jeunes conducteurs et sécurité routière : les vrais chiffres
                            </h2>
                            <p className="text-white/60 text-lg max-w-3xl">Les données de l'ONISR (Observatoire National Interministériel de la Sécurité Routière) parlent d'elles-mêmes.</p>
                        </motion.div>

                        <div className="space-y-5">
                            {[
                                { stat: "18–24 ans", text: "Tranche d'âge la plus touchée par les accidents mortels de la route en France. Ils représentent 9% de la population mais 17% des tués sur la route.", icon: Siren },
                                { stat: "×4", text: "C'est le facteur de sur-risque d'un conducteur novice par rapport à un conducteur expérimenté. Cette sur-représentation est constante depuis plus de 20 ans dans les statistiques nationales.", icon: TrendingDown },
                                { stat: "6–12 mois", text: "La fenêtre critique après l'obtention du permis. C'est la période où la confiance augmente plus vite que la compétence, un phénomène documenté par les chercheurs en accidentologie sous le nom d'\"excès de confiance\".", icon: AlertTriangle },
                                { stat: "−20%", text: "La réduction estimée du risque d'accident pour les conducteurs ayant suivi une formation post-permis, selon les études européennes menées en Autriche, en Finlande et au Luxembourg.", icon: BarChart3 },
                            ].map(({ stat, text, icon: Icon }, i) => (
                                <motion.div key={i} variants={itemVariants} className="flex flex-col md:flex-row items-start gap-6 bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-colors">
                                    <div className="flex items-center gap-4 md:w-52 shrink-0">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-400/20 shrink-0">
                                            <Icon className="w-6 h-6 text-purple-300" />
                                        </div>
                                        <div className="text-3xl md:text-4xl font-black text-white">{stat}</div>
                                    </div>
                                    <p className="text-white/70 text-sm leading-relaxed flex-1">{text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 4 — Contenu pédagogique de la journée    */}
            {/*  Design: Tabbed content with highlighted modules       */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-teal-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">04 — Au programme</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Que fait-on pendant la formation post-permis ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">7 heures de modules interactifs, loin d'un cours magistral ennuyeux. Voici le programme complet de la journée.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { module: "Module 1", title: "Retour d'expérience collectif", duration: "1h30", desc: "Chaque participant partage ses premières expériences de conduite depuis l'obtention du permis. Situations dangereuses rencontrées, réflexes adoptés, difficultés persistantes — le groupe échange sans jugement sous la guidance du formateur.", color: "bg-purple-50 border-purple-100", iconColor: "text-purple-600", icon: MessageCircle },
                                { module: "Module 2", title: "Analyse de situations à risque", duration: "2h00", desc: "À partir de vidéos et de cas pratiques, vous identifiez les pièges classiques des conducteurs novices : angles morts, vitesse en virage, distances de sécurité sous-estimées, conduite de nuit, et distraction au volant. Le formateur déconstruit chaque scénario.", color: "bg-blue-50 border-blue-100", iconColor: "text-blue-600", icon: Eye },
                                { module: "Module 3", title: "Psychologie du conducteur", duration: "1h30", desc: "Ce module aborde les facteurs humains de l'accident : la fatigue, les effets de l'alcool et des substances, la pression des passagers, l'usage du téléphone. Vous découvrez comment votre état émotionnel affecte directement votre conduite.", color: "bg-amber-50 border-amber-100", iconColor: "text-amber-600", icon: Brain },
                                { module: "Module 4", title: "Bilan personnel et plan d'action", duration: "2h00", desc: "Vous établissez un auto-diagnostic honnête de vos points forts et de vos axes d'amélioration. Le formateur vous aide à construire un plan d'action concret pour les mois suivants afin de maintenir une conduite responsable et sûre.", color: "bg-emerald-50 border-emerald-100", iconColor: "text-emerald-600", icon: Award },
                            ].map(({ module, title, duration, desc, color, iconColor, icon: Icon }, i) => (
                                <div key={i} className={`${color} border rounded-2xl p-7 hover:shadow-md transition-shadow`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-5 h-5 ${iconColor}`} />
                                            <span className="text-xs font-black text-[#6e6e73] uppercase tracking-widest">{module}</span>
                                        </div>
                                        <span className="text-xs font-bold text-[#6e6e73] bg-white/60 px-3 py-1 rounded-full border border-slate-200">{duration}</span>
                                    </div>
                                    <h3 className="font-bold text-[#1d1d1f] text-lg mb-3">{title}</h3>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 5 — Qui peut faire le post-permis ?      */}
            {/*  Design: Eligibility flowchart as nested conditions    */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-indigo-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">05 — Éligibilité</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Êtes-vous éligible à la formation post-permis ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg">Trois conditions cumulatives doivent être remplies. Vérifiez votre éligibilité en quelques secondes.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-5">
                            {[
                                { condition: "Condition 1", title: "Vous avez obtenu votre premier permis il y a entre 6 et 12 mois", detail: "Le compteur commence à la date de réussite de l'épreuve pratique, visible sur votre Certificat d'Examen du Permis de Conduire (CEPC). Si vous êtes à moins de 6 mois, il faut attendre. Si vous avez dépassé 12 mois, la fenêtre est malheureusement fermée — la formation ne sera plus éligible à la réduction de la période probatoire.", status: "Obligatoire" },
                                { condition: "Condition 2", title: "Vous n'avez commis aucune infraction ayant entraîné une perte de points", detail: "Votre solde de points doit être intact (6 points si formation traditionnelle, 6 points si AAC). Un simple excès de vitesse de moins de 20 km/h avec retrait d'un point vous rend inéligible. Vérifiez votre solde sur le site Télépoints du gouvernement.", status: "Obligatoire" },
                                { condition: "Condition 3", title: "Vous suivez la formation dans un établissement labellisé", detail: "Seules les auto-écoles titulaires du label « École Conduite Qualité » délivré par la Préfecture peuvent dispenser la formation post-permis. SMONI dispose de ce label, garantissant que la formation est conforme au programme national et que l'attestation sera reconnue par l'administration.", status: "Obligatoire" },
                            ].map(({ condition, title, detail, status }, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                    <div className="flex items-center justify-between p-5 bg-indigo-50/50 border-b border-slate-100">
                                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{condition}</span>
                                        <span className="text-[10px] font-bold text-white bg-indigo-600 px-3 py-1 rounded-full">{status}</span>
                                    </div>
                                    <div className="p-6 md:p-8">
                                        <h3 className="font-bold text-[#1d1d1f] text-base md:text-lg mb-3">{title}</h3>
                                        <p className="text-[#6e6e73] text-sm leading-relaxed">{detail}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-8 bg-purple-50 rounded-2xl p-6 border border-purple-100">
                            <p className="text-sm text-[#1d1d1f]">
                                <span className="font-bold">Vous cochez les 3 &#63;</span> <span className="text-[#6e6e73]">Vous êtes éligible. Inscrivez-vous dès maintenant chez SMONI pour bénéficier de la réduction de votre période probatoire avant la date limite des 12 mois.</span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 6 — Post-permis et assurance auto        */}
            {/*  Design: Long editorial with inline highlight boxes    */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-12">
                            <span className="text-sky-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">06 — Impact financier</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-6">
                                Formation post-permis et assurance auto : quel impact ?
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6 text-[#6e6e73] text-[15px] leading-[1.85]">
                            <p>
                                La surprime d'assurance auto appliquée aux jeunes conducteurs est directement liée à la durée de la période probatoire. En France, les assureurs sont autorisés à appliquer une majoration pouvant aller jusqu'à <span className="font-bold text-[#1d1d1f]">100% de la cotisation de référence</span> la première année, puis dégressivement les années suivantes.
                            </p>

                            {/* Inline highlight */}
                            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 my-8">
                                <h4 className="font-bold text-[#1d1d1f] text-base mb-3 flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-sky-600" />
                                    Ce que la réduction de la probation change concrètement
                                </h4>
                                <p className="text-sm text-[#6e6e73] leading-relaxed">
                                    En réduisant votre période probatoire d'un an (filière traditionnelle) ou de 6 mois (AAC), vous atteignez le statut de conducteur confirmé plus rapidement. Cela signifie que la surprime disparaît plus tôt. Sur 3 ans, l'économie peut représenter <span className="font-bold text-[#1d1d1f]">plusieurs centaines d'euros</span> cumulés selon votre profil et votre assureur.
                                </p>
                            </div>

                            <p>
                                De plus, certaines mutuelles et assureurs auto proposent déjà des réductions complémentaires aux conducteurs pouvant justifier d'une formation post-permis. L'attestation délivrée par SMONI constitue un justificatif recevable auprès de votre compagnie d'assurance. Nous vous recommandons de transmettre une copie de votre attestation à votre assureur dès réception pour bénéficier d'un éventuel réajustement tarifaire.
                            </p>

                            <p>
                                Il est également important de souligner que la réduction de la période probatoire accélère le passage à 12 points sur votre permis. Pendant la période probatoire, votre capital est limité à 6 points la première année, puis augmente progressivement. Plus tôt vous sortez de la probation, plus tôt vous atteignez le capital complet de 12 points, ce qui offre une marge de sécurité supplémentaire en cas d'infraction mineure.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 7 — Formation collective post-permis     */}
            {/*  Design: Centered text + testimony-style quotes        */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f0f4f8]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="text-center mb-14">
                            <span className="text-rose-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">07 — L'approche collective</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Pourquoi la formation post-permis est-elle collective ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl mx-auto">Le format en groupe de 6 à 12 participants n'est pas un choix économique mais un choix pédagogique délibéré.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-8 max-w-3xl mx-auto">
                            <p className="text-[#6e6e73] text-[15px] leading-[1.85]">
                                Les recherches en sciences de l'éducation montrent que la prise de conscience du risque est beaucoup plus efficace lorsqu'elle provient de pairs plutôt que d'une figure d'autorité. Entendre un autre jeune conducteur raconter un quasi-accident provoque un impact émotionnel et cognitif bien supérieur à une simple leçon théorique.
                            </p>

                            {/* Testimony-style quote blocks */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {[
                                    { text: "Quand un participant a raconté comment il a failli percuter un cycliste dans un angle mort, j'ai réalisé que je faisais exactement la même erreur sans m'en rendre compte.", context: "Dynamique de groupe type" },
                                    { text: "Le formateur nous a montré qu'on sous-estimait tous notre temps de réaction. Quand tu le mesures devant les autres, tu ne peux plus te raconter d'histoires.", context: "Exercice pratique type" },
                                ].map(({ text, context }, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 relative">
                                        <div className="text-5xl font-black text-purple-100 absolute top-3 left-5 leading-none select-none pointer-events-none">"</div>
                                        <p className="text-sm text-[#6e6e73] leading-relaxed italic relative z-10 pt-6">{text}</p>
                                        <div className="mt-4 pt-3 border-t border-slate-100">
                                            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">{context}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-[#6e6e73] text-[15px] leading-[1.85]">
                                Le formateur SMONI agit comme facilitateur et non comme professeur. Son rôle est de guider les échanges, de poser les bonnes questions et de créer un espace où chacun peut s'exprimer librement sur ses craintes, ses erreurs et ses habitudes. C'est cette méthode participative qui rend la formation post-permis réellement transformatrice.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 8 — Différence avec stage de             */}
            {/*  récupération de points                                */}
            {/*  Design: Split explainer — two distinct zones          */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-amber-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">08 — Ne pas confondre</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Formation post-permis vs. stage de récupération de points
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">Deux formations souvent confondues mais fondamentalement différentes dans leur objectif, leur public et leur résultat.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-slate-200">
                            {/* Post-permis */}
                            <div className="bg-purple-50/30 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
                                <div className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Formation post-permis</div>
                                <div className="space-y-5">
                                    {[
                                        { label: "Public", value: "Jeunes conducteurs (6–12 mois de permis)" },
                                        { label: "Condition", value: "Aucune infraction, tous les points intacts" },
                                        { label: "Objectif", value: "Prévention et prise de conscience du risque" },
                                        { label: "Durée", value: "1 journée (7 heures)" },
                                        { label: "Résultat", value: "Réduction de la période probatoire" },
                                        { label: "Format", value: "Collectif (6–12 participants)" },
                                        { label: "Coût moyen", value: "Variable selon l'auto-école" },
                                    ].map(({ label, value }, i) => (
                                        <div key={i} className="flex justify-between items-start gap-3 text-sm">
                                            <span className="text-[#6e6e73] font-medium shrink-0">{label}</span>
                                            <span className="text-[#1d1d1f] font-bold text-right">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stage récupération */}
                            <div className="bg-slate-50/50 p-8 lg:p-10">
                                <div className="inline-flex items-center px-3 py-1.5 bg-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Stage de récupération</div>
                                <div className="space-y-5">
                                    {[
                                        { label: "Public", value: "Conducteurs ayant perdu des points" },
                                        { label: "Condition", value: "Avoir perdu au moins 1 point sur le permis" },
                                        { label: "Objectif", value: "Récupérer jusqu'à 4 points sur le permis" },
                                        { label: "Durée", value: "2 jours (14 heures)" },
                                        { label: "Résultat", value: "Récupération de 4 points maximum" },
                                        { label: "Format", value: "Collectif (stage agréé préfecture)" },
                                        { label: "Coût moyen", value: "250€ à 300€ les 2 jours" },
                                    ].map(({ label, value }, i) => (
                                        <div key={i} className="flex justify-between items-start gap-3 text-sm">
                                            <span className="text-[#6e6e73] font-medium shrink-0">{label}</span>
                                            <span className="text-[#1d1d1f] font-bold text-right">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6 bg-amber-50 rounded-2xl p-5 border border-amber-100">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-[#6e6e73]">
                                    <span className="font-bold text-[#1d1d1f]">Attention :</span> la formation post-permis ne permet pas de récupérer des points. Si vous avez déjà perdu des points sur votre permis probatoire, vous ne pouvez pas bénéficier de la formation post-permis et devrez vous orienter vers un stage de récupération classique.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 9 — Formation post-permis Paris SMONI    */}
            {/*  Design: Brand positioning with feature strips         */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-violet-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">09 — Pourquoi SMONI</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Votre formation post-permis à Paris avec SMONI
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">SMONI fait partie des rares auto-écoles parisiennes habilitées à dispenser la formation post-permis. Voici ce qui nous distingue.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            {[
                                { icon: Award, title: "Label École Conduite Qualité", text: "SMONI est titulaire du label national délivré par la Sécurité Routière. Ce label est obligatoire pour dispenser la formation post-permis et garantit le respect du programme officiel, la qualification du formateur et la qualité de l'accueil." },
                                { icon: Users, title: "Groupes à taille humaine", text: "Nous limitons nos sessions à 10 participants maximum pour garantir que chacun puisse s'exprimer, poser ses questions et participer activement aux échanges. Un groupe trop grand nuit à la qualité de la dynamique collective." },
                                { icon: GraduationCap, title: "Formateurs spécialisés", text: "Nos formateurs post-permis sont titulaires de l'autorisation préfectorale spécifique et suivent des formations continues sur les techniques d'animation de groupe et la psychologie du conducteur novice." },
                                { icon: Timer, title: "Sessions régulières", text: "Nous organisons des sessions de formation post-permis chaque mois à Paris. Plusieurs dates sont proposées pour vous permettre de trouver un créneau compatible avec votre emploi du temps, y compris le samedi." },
                                { icon: FileText, title: "Démarches administratives incluses", text: "À l'issue de la formation, SMONI transmet directement votre attestation à la préfecture pour déclencher la réduction de votre période probatoire. Vous n'avez aucune démarche supplémentaire à effectuer." },
                            ].map(({ icon: Icon, title, text }, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-7 flex items-start gap-5 hover:border-purple-200 transition-colors">
                                    <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center shrink-0 border border-purple-100">
                                        <Icon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-[#1d1d1f] text-base mb-1.5">{title}</h3>
                                        <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 10 — Inscription post-permis Paris       */}
            {/*  Design: Narrow editorial + full-width callout         */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-12">
                            <span className="text-slate-400 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">10 — S'inscrire</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-6">
                                Comment s'inscrire à la formation post-permis chez SMONI à Paris ?
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6 text-[#6e6e73] text-[15px] leading-[1.85] mb-12">
                            <p>
                                L'inscription à la formation post-permis chez SMONI est simple et rapide. Vous pouvez la réaliser directement sur notre plateforme en ligne ou en contactant notre équipe par téléphone. Il vous suffit de fournir une copie de votre permis de conduire pour que nous vérifiions votre éligibilité (date d'obtention comprise entre 6 et 12 mois, aucune perte de points).
                            </p>
                            <p>
                                Une fois votre inscription confirmée, vous recevez une convocation indiquant la date, l'horaire et le lieu de la formation à Paris. La journée se déroule dans nos locaux ou dans un espace partenaire adapté aux sessions de groupe, dans un cadre confortable et convivial. Prévoyez de quoi prendre des notes — même si la formation est essentiellement interactive.
                            </p>
                            <p>
                                À la fin de la formation, si votre participation active est validée par le formateur, vous repartez avec votre attestation officielle. SMONI se charge ensuite de la transmettre à la préfecture pour que votre période probatoire soit automatiquement réduite. Vous recevez une confirmation par email lorsque la mise à jour est effective dans le fichier national des permis de conduire.
                            </p>
                        </motion.div>

                        {/* Final urgency callout */}
                        <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-8 md:p-10 text-center">
                            <Timer className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                            <h3 className="font-black text-[#1d1d1f] text-xl md:text-2xl mb-3">La fenêtre est limitée : 6 à 12 mois</h3>
                            <p className="text-[#6e6e73] text-sm leading-relaxed max-w-xl mx-auto mb-6">
                                Passé les 12 mois après l'obtention de votre permis, vous perdez définitivement le droit de suivre la formation post-permis. Ne laissez pas passer cette opportunité unique de réduire votre période probatoire.
                            </p>
                            <Button
                                size="lg"
                                onClick={() => { navigate('/learners/boutique'); window.scrollTo(0, 0); }}
                                className="bg-purple-600 text-white hover:bg-purple-700 rounded-2xl px-10 h-14 text-lg font-black shadow-lg transition-all hover:scale-[1.03]"
                            >
                                S'inscrire maintenant <MousePointerClick className="ml-2 w-5 h-5" />
                            </Button>
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

            <Footer />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        key="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
                        style={{ background: 'rgba(10,8,30,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.88, opacity: 0, y: 16 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="relative max-w-2xl w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Glass top bar */}
                            <div className="flex items-center justify-between px-5 py-3 rounded-t-3xl"
                                style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                                <span className="text-white font-bold text-sm tracking-wide">{lightbox.alt}</span>
                                <button onClick={() => setLightbox(null)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            {/* Image */}
                            <img
                                src={lightbox.src}
                                alt={lightbox.alt}
                                className="w-full h-auto block rounded-b-3xl shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Details7;
