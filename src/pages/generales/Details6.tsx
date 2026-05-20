import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "framer-motion";
import { Shield, FileText, MousePointerClick, Check, ArrowLeft, MapPin, Clock, Car, AlertTriangle, ChevronDown, CalendarCheck, Route, Phone, ThumbsUp, Zap, Eye, Target, UserCheck, CircleCheck, Lightbulb, Navigation, Gauge, HeartPulse, Star, Timer, Ban, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageHead from "@components/SEO/PageHead";

const Details6 = () => {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeTip, setActiveTip] = useState(0);

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

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <PageHead
                title="Accompagnement a l'examen du permis - Smoni Vincennes"
                description="Accompagnement personnalise jusqu'a l'examen du permis B : preparation mentale, conseils et passage en confiance avec Smoni Auto-Ecole."
                canonicalPath="/accompagnement"
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
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Service Examen</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Accompagnement <br /> <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent italic pr-2">au Centre d'Examen.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Nous vous accompagnons à votre centre d'examen avec notre véhicule loué et un accompagnateur au volant de notre véhicule.
                    </motion.p>

                    <motion.div variants={itemVariants} className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 mb-10 border border-slate-200 max-w-xl mx-auto shadow-sm">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="font-medium">Frais de dossier</span>
                                <span className="font-bold">89€</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="font-medium">Location du véhicule</span>
                                <span className="font-bold">99€</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="font-medium">Prestation de l'accompagnateur</span>
                                <span className="font-bold">59€</span>
                            </div>
                            <div className="h-px bg-slate-200 my-1" />
                            <div className="flex justify-between items-center text-[#2c2876] text-xl">
                                <span className="font-black">Total Pack Accompagnement</span>
                                <span className="font-[900]">247€ TTC</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => { navigate('/learners/boutique'); window.scrollTo(0, 0); }}
                            className="bg-purple-600 text-white hover:bg-purple-700 rounded-2xl px-10 h-16 text-xl font-black shadow-[0_15px_30px_-10px_rgba(147,51,234,0.4)] transition-all hover:scale-[1.03] border-none"
                        >
                            Souscrire pour 247€ <MousePointerClick className="ml-2 w-6 h-6" />
                        </Button>
                    </motion.div>
                </motion.div>
            </main>

            <section className="py-16 md:py-24 bg-white relative z-10 text-left">
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
                                Votre réussite, notre priorité
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed">
                                Finis le stress du transport le jour J. Nous nous occupons de tout pour que vous puissiez vous concentrer à 100% sur votre conduite.
                            </motion.p>
                            <motion.ul variants={containerVariants} className="space-y-5">
                                {[
                                    "Véhicule double-commande identique à vos leçons",
                                    "Prise en charge à un point de rendez-vous",
                                    "Accompagnateur expérimenté et rassurant",
                                    "Disponibilité sur tous les centres d'examen"
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
                                        <FileText className="w-6 h-6 text-[#2c2876]" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-[#2c2876] tracking-tight">Modalités</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-6">L'accompagnement comprend la mise à disposition du véhicule et la présence d'un professionnel SMONI.</p>

                                <div className="space-y-3">
                                    {[
                                        { title: "Réservation", desc: "À effectuer au moins 15 jours avant la date de l'examen." },
                                        { title: "Convocation", desc: "Nous transmettre votre convocation dès réception." },
                                        { title: "Point de RDV", desc: "Fixé avec votre moniteur pour le départ vers le centre." }
                                    ].map((doc, idx) => (
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
            {/*  SEO SECTION 1 — Passer le permis en candidat libre   */}
            {/*  Design: Immersive gradient header band + prose        */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="relative overflow-hidden text-left">
                {/* Top gradient band */}
                <div className="bg-gradient-to-br from-[#2c2876] via-purple-800 to-[#1a1040] py-20 px-6 relative">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 0%, rgba(168,85,247,0.3) 0%, transparent 60%), radial-gradient(ellipse at 10% 100%, rgba(79,70,229,0.2) 0%, transparent 50%)' }} />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="relative z-10 max-w-5xl mx-auto">
                        <motion.div variants={itemVariants}>
                            <span className="text-purple-300 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">01 — Le service clé</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6 max-w-3xl">
                                Accompagnement examen du permis de conduire à <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Paris</span>
                            </h2>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                Le jour de l'épreuve pratique est le moment le plus stressant de tout votre parcours. SMONI élimine chaque source d'anxiété logistique pour que votre seule préoccupation soit votre conduite.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
                {/* Content below */}
                <div className="bg-white py-16 px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="max-w-5xl mx-auto">
                        <motion.div variants={itemVariants} className="columns-1 md:columns-2 gap-12 text-[#6e6e73] text-[15px] leading-[1.85] space-y-6">
                            <p>
                                L'accompagnement à l'examen du permis de conduire est un service pensé pour les candidats qui ne disposent pas d'un véhicule à double commande le jour de l'épreuve pratique. En France, la réglementation impose que le candidat se présente au centre d'examen avec un véhicule équipé d'un double pédalier, en état de marche et assuré. C'est à l'auto-école — ou au candidat lui-même s'il est en candidat libre — de fournir ce véhicule.
                            </p>
                            <p>
                                SMONI propose un pack clé en main : un véhicule homologué, un accompagnateur professionnel qui vous conduit au centre d'examen, et une prise en charge complète de la logistique. Vous êtes récupéré à un point de rendez-vous convenu à Paris, conduit directement au centre d'examen, et raccompagné après l'épreuve. Vous n'avez rien à organiser, rien à anticiper — nous gérons tout.
                            </p>
                            <p>
                                Ce service est particulièrement utilisé par les candidats libres qui se sont entraînés avec un accompagnateur privé et ont besoin d'un véhicule homologué uniquement pour le jour J. Mais il s'adresse aussi aux élèves d'auto-écoles qui souhaitent bénéficier d'un accompagnement plus serein et personnalisé que celui proposé par leur établissement d'origine.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 2 — Déroulement jour d'examen            */}
            {/*  Design: Clean editorial prose with time markers       */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc] text-left">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-indigo-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">02 — Votre journée</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Le jour de l'examen du permis : comment ça se passe avec SMONI ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg">Voici concrètement ce qui se passe du début à la fin quand vous choisissez l'accompagnement SMONI.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-10">
                            {[
                                { time: "La veille", title: "Confirmation de votre rendez-vous", text: "SMONI vous appelle ou vous envoie un SMS la veille de l'examen pour confirmer l'heure exacte de prise en charge, le point de rendez-vous et le centre d'examen où vous êtes convoqué. Vous n'avez rien à vérifier de votre côté — nous avons déjà tout calé avec la préfecture." },
                                { time: "08:00", title: "Votre accompagnateur arrive au point de rendez-vous", text: "Le matin de l'examen, l'accompagnateur SMONI vous récupère au point de rendez-vous convenu à Paris avec le véhicule double commande prêt à rouler. Le véhicule est propre, le plein est fait, les rétroviseurs sont réglés. Vous montez côté passager et vous vous détendez." },
                                { time: "08:30", title: "Trajet vers le centre d'examen", text: "C'est l'accompagnateur qui conduit jusqu'au centre d'examen. Vous n'avez pas à naviguer dans le trafic parisien ni à stresser sur l'itinéraire. Ce temps de trajet est l'occasion de vous poser, de réviser mentalement vos vérifications et d'arriver dans un état calme." },
                                { time: "08:50", title: "Arrivée en avance au centre", text: "Nous arrivons systématiquement avec 20 à 30 minutes d'avance. L'accompagnateur se gare, vous fait un dernier briefing rapide sur le véhicule (position de la commande de clignotant, réglage du siège) et vous souhaite bonne chance. Vous descendez serein." },
                                { time: "09:00", title: "Vous passez l'épreuve pratique", text: "L'inspecteur monte dans le véhicule SMONI. L'épreuve dure environ 32 minutes et couvre un parcours en agglomération. Vous êtes évalué sur votre capacité à conduire de manière autonome et sûre. L'accompagnateur SMONI attend à l'extérieur pendant toute la durée de l'examen." },
                                { time: "09:45", title: "Retour à votre point de départ", text: "L'épreuve terminée, l'accompagnateur vous ramène exactement où il vous a récupéré le matin. Votre résultat sera disponible sous 48 heures sur le site de la Sécurité Routière avec votre numéro NEPH. En attendant, vous pouvez rentrer chez vous l'esprit tranquille." },
                            ].map(({ time, title, text }, i) => (
                                <div key={i} className="flex gap-6 md:gap-10">
                                    <div className="shrink-0 w-16 md:w-20 text-right pt-1">
                                        <span className="text-purple-600 font-black text-sm md:text-base">{time}</span>
                                    </div>
                                    <div className="border-l-2 border-slate-200 pl-6 md:pl-8 pb-2">
                                        <h3 className="font-bold text-[#1d1d1f] text-base md:text-lg mb-2">{title}</h3>
                                        <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 3 — Centres d'examen Île-de-France       */}
            {/*  Design: Grid of location chips with dept badges       */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white text-left">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">03 — Couverture</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Centres d'examen du permis desservis en Île-de-France
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">SMONI vous accompagne à n'importe quel centre d'examen d'Île-de-France, quel que soit votre lieu de résidence.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { dept: "92", centers: ["Nanterre", "Gennevilliers", "Boulogne-Billancourt"], color: "bg-emerald-50 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200" },
                                { dept: "93", centers: ["La Courneuve", "Saint-Denis", "Rosny-sous-Bois"], color: "bg-blue-50 border-blue-100 hover:bg-blue-100 hover:border-blue-200" },
                                { dept: "94", centers: ["Rungis", "Créteil", "Maisons-Alfort"], color: "bg-purple-50 border-purple-100 hover:bg-purple-100 hover:border-purple-200" },
                                { dept: "95", centers: ["Cergy", "Argenteuil", "Sarcelles"], color: "bg-amber-50 border-amber-100 hover:bg-amber-100 hover:border-amber-200" },
                                { dept: "91", centers: ["Évry-Courcouronnes", "Sainte-Geneviève-des-Bois"], color: "bg-rose-50 border-rose-100 hover:bg-rose-100 hover:border-rose-200" },
                                { dept: "78", centers: ["Versailles", "Trappes", "Poissy"], color: "bg-sky-50 border-sky-100 hover:bg-sky-100 hover:border-sky-200" },
                            ].map(({ dept, centers, color }, i) => (
                                <div key={i} className={`${color} border rounded-2xl p-6 transition-colors duration-200`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="w-10 h-10 bg-[#2c2876] text-white rounded-lg flex items-center justify-center font-black text-sm">{dept}</span>
                                        <MapPin className="w-4 h-4 text-[#6e6e73]" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {centers.map((center, j) => (
                                            <span key={j} className="bg-white/80 border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-[#1d1d1f]">{center}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6 text-center">
                            <p className="text-sm text-[#6e6e73]">Votre centre ne figure pas dans la liste ? <span className="font-bold text-[#1d1d1f]">Contactez-nous</span> — nous couvrons tous les centres franciliens sans exception.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 4 — Stress examen permis Paris           */}
            {/*  Design: Diagonal split (dark/light) with counter     */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc] text-left">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-rose-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">04 — Le facteur stress</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Gérer le stress de l'examen du permis de conduire
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">Le stress est la première cause d'échec à l'épreuve pratique. Comprendre ses mécanismes, c'est déjà commencer à le maîtriser.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {/* Left — big stat block */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-[#2c2876] to-purple-900 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="text-7xl md:text-8xl font-black text-white mb-2 leading-none">56%</div>
                                    <div className="text-purple-200 font-bold text-sm uppercase tracking-widest mb-4">Taux de réussite national</div>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        En Île-de-France, le taux de réussite à l'épreuve pratique est l'un des plus bas de France. Le stress, la densité du trafic et l'imprévisibilité des parcours expliquent cet écart avec la moyenne nationale.
                                    </p>
                                </div>
                            </div>

                            {/* Right — stress factors */}
                            <div className="lg:col-span-3 space-y-4">
                                {[
                                    { icon: HeartPulse, title: "Stress anticipatoire", text: "L'anxiété commence souvent des jours avant l'examen. Le simple fait de savoir que quelqu'un gère toute la logistique — véhicule, trajet, horaire — permet de recentrer son énergie mentale sur la conduite elle-même.", color: "text-rose-500" },
                                    { icon: Navigation, title: "Stress du trajet", text: "Se rendre seul au centre d'examen dans le trafic parisien, trouver où se garer, arriver en retard… autant de micro-angoisses que l'accompagnement SMONI élimine totalement puisque c'est l'accompagnateur qui conduit.", color: "text-indigo-500" },
                                    { icon: Car, title: "Stress du véhicule inconnu", text: "Un véhicule que vous ne connaissez pas peut déstabiliser. Avec SMONI, vous passez votre examen sur un véhicule que vous pouvez tester lors d'une leçon préalable pour vous y habituer avant le jour J.", color: "text-purple-500" },
                                    { icon: Eye, title: "Stress de l'inspecteur", text: "La présence de l'inspecteur est inévitable, mais arriver calme et reposé (au lieu de stressé par la route) améliore considérablement votre capacité à gérer cette pression silencieuse pendant les 32 minutes d'épreuve.", color: "text-amber-500" },
                                ].map(({ icon: Icon, title, text, color }, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 hover:border-purple-200 transition-colors">
                                        <Icon className={`w-6 h-6 ${color} shrink-0 mt-0.5`} />
                                        <div>
                                            <h3 className="font-bold text-[#1d1d1f] text-sm mb-1">{title}</h3>
                                            <p className="text-[#6e6e73] text-xs leading-relaxed">{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 5 — Conseils réussir examen permis       */}
            {/*  Design: Interactive tabbed tips (clickable sidebar)   */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white text-left">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-amber-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">05 — Conseils d'experts</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                7 conseils pour réussir l'examen du permis du premier coup
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-6">
                            {/* Left tab list */}
                            <div className="lg:w-80 shrink-0 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                                {[
                                    "Dormir 8h la veille",
                                    "Arriver 30 min en avance",
                                    "Réviser les vérifications",
                                    "Observer avant d'agir",
                                    "Gérer les priorités à droite",
                                    "Rester calme après une erreur",
                                    "Écouter l'inspecteur"
                                ].map((tip, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveTip(i)}
                                        className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all shrink-0 ${activeTip === i ? 'bg-[#2c2876] text-white shadow-lg' : 'bg-[#f8fafc] text-[#6e6e73] hover:bg-purple-50 border border-slate-200'}`}
                                    >
                                        <span className="font-black text-xs mr-2 opacity-50">{String(i + 1).padStart(2, '0')}</span>
                                        {tip}
                                    </button>
                                ))}
                            </div>

                            {/* Right content area */}
                            <div className="flex-1 bg-[#f8fafc] rounded-3xl border border-slate-200 p-8 md:p-10 min-h-[280px]">
                                {(() => {
                                    const tips = [
                                        { title: "Dormez au moins 8 heures la veille de l'examen", text: "La fatigue affecte directement vos temps de réaction, votre vigilance et votre capacité de décision. Une nuit complète de sommeil est le facteur n°1 de performance le jour J. Évitez les écrans après 22h, préparez vos affaires la veille et couchez-vous tôt. L'examen du permis est un effort cognitif intense de 32 minutes — votre cerveau doit être au maximum de ses capacités." },
                                        { title: "Arrivez 30 minutes avant l'heure de convocation", text: "Arriver en avance vous permet de vous familiariser avec l'environnement du centre d'examen, de repérer les alentours et de vous poser calmement. Le stress de la ponctualité est l'un des pires ennemis du candidat. Avec l'accompagnement SMONI, cette marge est automatiquement intégrée — l'accompagnateur vous dépose en avance." },
                                        { title: "Révisez les questions de vérification intérieure et extérieure", text: "Au début de l'épreuve, l'inspecteur vous posera 3 questions : une vérification intérieure, une extérieure et une question de premiers secours. Ces 3 points valent chacun 1 point sur le barème. Révisez-les la veille avec les fiches officielles — c'est un point facile à sécuriser et qui met en confiance pour la suite." },
                                        { title: "Observez systématiquement avant chaque action", text: "Le contrôle visuel est le critère le plus évalué par les inspecteurs. Avant de tourner le volant, vérifiez vos rétroviseurs et faites un contrôle d'angle mort. Cette habitude doit être mécanique. L'inspecteur note chaque contrôle visuel manqué. Exagérez légèrement le mouvement de tête pour qu'il soit visible." },
                                        { title: "Maîtrisez les priorités à droite et les cédez-le-passage", text: "En Île-de-France, les intersections à priorité à droite sont omniprésentes, surtout dans les zones résidentielles. Un refus de priorité est une faute éliminatoire immédiate. En cas de doute, ralentissez et observez. Il vaut mieux être trop prudent que pas assez — l'inspecteur ne sanctionnera jamais un excès de prudence." },
                                        { title: "Ne vous décomposez pas après une erreur mineure", text: "Cabler, rater un créneau au premier essai ou hésiter à un carrefour n'est pas éliminatoire. Ce qui l'est, c'est de perdre ses moyens et d'enchaîner les erreurs par effet domino. Si vous faites une petite erreur, respirez profondément et passez à la suite. L'inspecteur évalue votre conduite globale, pas la perfection absolue." },
                                        { title: "Écoutez précisément les consignes de l'inspecteur", text: "L'inspecteur vous indique clairement la direction à prendre. Écoutez attentivement, ne devancez pas les consignes et si vous n'avez pas compris, demandez de répéter — c'est votre droit. Ne confondez pas vitesse et précipitation. Un inspecteur préfèrera toujours un candidat qui demande de répéter plutôt qu'un candidat qui tourne au mauvais endroit." },
                                    ];
                                    const tip = tips[activeTip];
                                    return (
                                        <div>
                                            <span className="text-purple-400 font-black text-xs tracking-[0.2em] block mb-3">CONSEIL {String(activeTip + 1).padStart(2, '0')}</span>
                                            <h3 className="font-bold text-[#1d1d1f] text-xl md:text-2xl mb-4 leading-tight">{tip.title}</h3>
                                            <p className="text-[#6e6e73] text-sm leading-[1.85]">{tip.text}</p>
                                        </div>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 6 — Épreuve pratique permis barème       */}
            {/*  Design: Grading bar visualization                     */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f0f4f8] text-left">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-sky-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">06 — Le barème</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Comprendre le barème de l'épreuve pratique du permis
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">L'examen est noté sur 31 points. Il faut obtenir au minimum 20 points sans aucune faute éliminatoire.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            {[
                                { domain: "Connaître et maîtriser son véhicule", points: 7, max: 31, desc: "Installation au poste de conduite, réglages, vérifications techniques, maîtrise de la direction et du freinage." },
                                { domain: "Appréhender la route", points: 6, max: 31, desc: "Adaptation de la vitesse, respect des distances de sécurité, gestion des intersections et signalisation." },
                                { domain: "Partager la route", points: 6, max: 31, desc: "Communication avec les autres usagers, respect des priorités, courtoisie et partage de l'espace." },
                                { domain: "Autonomie et conscience du risque", points: 9, max: 31, desc: "Analyse des situations, anticipation des dangers, prise de décision autonome et adaptation au contexte." },
                                { domain: "Vérifications et premiers secours", points: 3, max: 31, desc: "Questions de vérification (intérieure, extérieure) et question de premiers secours." },
                            ].map(({ domain, points, max, desc }, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                                        <h3 className="font-bold text-[#1d1d1f] text-sm flex-1">{domain}</h3>
                                        <span className="text-lg font-black text-[#2c2876] shrink-0">{points} pts</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-2">
                                        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${(points / max) * 100}%` }} />
                                    </div>
                                    <p className="text-xs text-[#6e6e73] leading-relaxed">{desc}</p>
                                </div>
                            ))}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                                    <div className="text-3xl font-black text-emerald-700 mb-1">≥ 20/31</div>
                                    <div className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Résultat favorable</div>
                                </div>
                                <div className="flex-1 bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                                    <div className="text-3xl font-black text-red-600 mb-1">{"< 20/31"}</div>
                                    <div className="text-xs text-red-500 font-bold uppercase tracking-widest">Résultat insuffisant</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 7 — Fautes éliminatoires permis          */}
            {/*  Design: Red zone danger list                          */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white text-left">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-red-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">07 — Zone rouge</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Les fautes éliminatoires à l'examen du permis
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">Une seule de ces erreurs suffit à invalider votre examen, quel que soit votre score. Connaissez-les pour les éviter.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Non-respect d'un feu rouge ou d'un stop",
                                "Franchissement d'une ligne continue",
                                "Refus de priorité à un piéton sur un passage protégé",
                                "Circulation à contresens",
                                "Excès de vitesse significatif",
                                "Non-respect d'un signal de cédez-le-passage avec danger",
                                "Intervention physique de l'accompagnateur sur les commandes",
                                "Mise en danger grave d'un autre usager",
                            ].map((fault, i) => (
                                <div key={i} className="flex items-center gap-4 bg-red-50/50 border border-red-100 rounded-xl p-4 hover:bg-red-50 transition-colors">
                                    <Ban className="w-5 h-5 text-red-500 shrink-0" />
                                    <span className="text-sm font-medium text-[#1d1d1f]">{fault}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left">
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                <p className="text-sm text-[#6e6e73] leading-relaxed">
                                    <span className="font-bold text-[#1d1d1f]">À savoir :</span> l'intervention de l'accompagnateur (appui sur le frein ou le volant) est automatiquement éliminatoire. C'est pourquoi il est essentiel de s'entraîner suffisamment avant de se présenter à l'examen. Si vous avez le moindre doute sur votre niveau, n'hésitez pas à prendre quelques heures de conduite supplémentaires avant la date.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 8 — Candidat libre examen permis Paris   */}
            {/*  Design: Two-column problem/solution narrative         */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc] text-left">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-teal-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">08 — Candidat libre</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Candidat libre : comment se présenter à l'examen du permis ?
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-10">
                            {/* Problem */}
                            <div className="lg:w-1/2 bg-white rounded-3xl border border-slate-200 p-8">
                                <div className="inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-6 border border-amber-100">Le problème</div>
                                <h3 className="font-bold text-[#1d1d1f] text-lg mb-4">Passer l'examen en candidat libre nécessite un véhicule homologué</h3>
                                <p className="text-[#6e6e73] text-sm leading-relaxed mb-4">
                                    En tant que candidat libre, vous gérez votre formation de manière autonome : inscription au code en ligne, entraînement avec un accompagnateur privé sur un véhicule à double commande, et prise de rendez-vous pour l'épreuve pratique directement sur le site de l'ANTS via RDV Permis.
                                </p>
                                <p className="text-[#6e6e73] text-sm leading-relaxed">
                                    Mais le jour de l'examen, la réglementation exige que vous vous présentiez avec un véhicule à double commande équipé, assuré et accompagné d'une personne titulaire du permis depuis au moins 5 ans. Si vous n'avez pas accès à un tel véhicule, vous ne pouvez tout simplement pas passer l'examen.
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="lg:w-1/2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl border border-purple-200 p-8">
                                <div className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-6 border border-purple-200">La solution SMONI</div>
                                <h3 className="font-bold text-[#1d1d1f] text-lg mb-4">Un pack tout-en-un pour passer l'examen sans auto-école</h3>
                                <p className="text-[#6e6e73] text-sm leading-relaxed mb-4">
                                    SMONI fournit le véhicule homologué et l'accompagnateur en une seule prestation à 247€. Vous n'avez rien d'autre à trouver — pas de voiture à louer séparément, pas d'accompagnateur à convaincre, pas de démarches d'assurance à effectuer. Tout est inclus et prêt pour le jour J.
                                </p>
                                <p className="text-[#6e6e73] text-sm leading-relaxed">
                                    C'est la solution la plus simple et la plus économique pour les candidats libres parisiens qui ont besoin d'un véhicule uniquement pour l'examen. Plus de 2000 candidats ont déjà utilisé ce service pour passer leur épreuve pratique sereinement.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 9 — Résultat examen permis ANTS          */}
            {/*  Design: Stepped info blocks with transitions          */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white text-left">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-violet-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">09 — Après l'examen</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Résultat de l'examen du permis : que se passe-t-il après ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl">Obtenir le résultat, comprendre le CEPC, demander votre permis — voici la marche à suivre complète.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6 text-left">
                            {[
                                { label: "48h après l'examen", title: "Consultez votre résultat en ligne", text: "Connectez-vous sur le site de la Sécurité Routière (securite-routiere.gouv.fr) avec votre numéro NEPH et votre date de naissance. Votre résultat s'affiche : favorable (≥ 20/31) ou insuffisant (< 20/31). En cas de résultat favorable, vous pouvez télécharger votre CEPC (Certificat d'Examen du Permis de Conduire)." },
                                { label: "Le CEPC", title: "Conduire immédiatement avec le certificat", text: "Le CEPC est un permis provisoire valable 4 mois. Il vous autorise à conduire en France à condition de le présenter accompagné d'une pièce d'identité lors d'un contrôle routier. Imprimez-le ou gardez-le en version numérique sur votre téléphone — il fait foi en cas de vérification par les forces de l'ordre." },
                                { label: "Sous 2 semaines", title: "Demandez votre permis définitif sur l'ANTS", text: "Rendez-vous sur le site de l'ANTS pour déposer votre demande de fabrication du permis de conduire. Vous aurez besoin d'une e-photo d'identité conforme, d'un justificatif de domicile et de votre CEPC. Le permis plastifié vous sera envoyé par courrier recommandé sous 3 à 6 semaines." },
                                { label: "En cas d'échec", title: "Repasser l'examen — pas de panique", text: "Si votre résultat est insuffisant, vous pouvez vous réinscrire à une nouvelle épreuve pratique. Le code de la route reste valable 5 ans. Chez SMONI, nous proposons à nouveau l'accompagnement examen pour votre prochaine tentative, avec la possibilité de réserver des heures de conduite supplémentaires entre les deux passages." },
                            ].map(({ label, title, text }, i) => (
                                <div key={i} className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden">
                                    <div className="bg-purple-50 border-b border-purple-100 px-6 py-3">
                                        <span className="text-xs font-black text-purple-600 uppercase tracking-widest">{label}</span>
                                    </div>
                                    <div className="p-6 md:p-8">
                                        <h3 className="font-bold text-[#1d1d1f] text-lg mb-3">{title}</h3>
                                        <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 10 — Pourquoi choisir SMONI examen       */}
            {/*  Design: High-contrast Editorial Split (Unique)        */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#fdfaff] relative overflow-hidden text-left">
                <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="flex flex-col lg:flex-row items-center gap-16"
                    >
                        {/* Left Side: Bold Text & CTA */}
                        <div className="lg:w-1/2 text-left">
                            <motion.span variants={itemVariants} className="text-purple-600 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">
                                10 — Expertise Examen Paris & IDF
                            </motion.span>
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-[60px] font-[900] text-[#2c2876] tracking-tight leading-[1] mb-8">
                                Pourquoi choisir SMONI pour votre <br />examen du <span className="text-purple-500 italic">permis à Paris ?</span>
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-10 leading-relaxed max-w-md">
                                Que vous soyez en candidat libre ou élève d'auto-école, nous optimisons chaque détail de votre passage en centre d'examen parisien pour maximiser vos chances.
                            </motion.p>

                            <motion.div variants={itemVariants}>
                                <Button
                                    size="lg"
                                    onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
                                    className="rounded-2xl h-16 px-10 bg-[#2c2876] text-white hover:bg-purple-900 font-black text-lg transition-all shadow-[0_20px_40px_-12px_rgba(44,40,118,0.3)] hover:scale-[1.02]"
                                >
                                    Consulter tous nos services
                                </Button>
                            </motion.div>
                        </div>

                        {/* Right Side: Unique Benefit Strips */}
                        <div className="lg:w-1/2 space-y-4">
                            {[
                                { icon: Car, title: "Véhicules Homologués", text: "Voitures double commande récentes et entretenues selon les normes de la Sécurité Routière à Paris." },
                                { icon: UserCheck, title: "Spécialiste Centres Paris", text: "Expertise complète des parcours d'examen de Paris (Porte de la Chapelle, etc.) et IDF." },
                                { icon: Clock, title: "Logistique Parisienne Libérée", text: "La solution n°1 pour passer son permis à Paris sans auto-école de manière autonome." },
                                { icon: Shield, title: "Accompagnateur Certifié", text: "Encadrement professionnel pour une sérénité totale le jour de votre épreuve pratique à Paris." }
                            ].map(({ icon: Icon, title, text }, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="group flex items-center gap-6 p-6 bg-white rounded-[24px] border border-slate-100 hover:border-purple-200 transition-all hover:translate-x-2 shadow-sm text-left"
                                >
                                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors">
                                        <Icon className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-[#2c2876] text-base mb-0.5">{title}</h3>
                                        <p className="text-slate-500 text-xs leading-relaxed">{text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="relative z-10 bg-white">
                <HomeNewStudentSection />
            </div>

            <Footer />
        </div>
    );
};

export default Details6;
