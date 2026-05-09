import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "framer-motion";
import { Car, CheckCircle2, FileText, CalendarCheck, MousePointerClick, Check, ArrowLeft, Shield, MapPin, Clock, KeyRound, Users, Fuel, Gauge, AlertTriangle, Phone, ChevronDown, Cog, Eye, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Details = () => {
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
        { title: "Pièce d'identité de l'élève", desc: "La carte d'identité ou le passeport en cours de validité de l'apprenant." },
        { title: "Livret d'apprentissage", desc: "Prouvant que vous avez effectué un minimum de 20h de conduite." },
        { title: "Pièce d'identité de l'accompagnateur", desc: "Carte d'identité ou passeport de la personne qui vous accompagne." },
        { title: "Permis de l'accompagnateur", desc: "L'accompagnateur doit avoir son permis depuis au moins 5 ans sans interruption." },
        { title: "Caution", desc: "Un chèque de caution de 500€ ou une franchise de 150€ par carte bancaire." }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen">
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
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
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
                        className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shadow-sm mb-6 font-bold"
                    >
                        <Car className="w-4 h-4 mr-2" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Service Populaire</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Location Double <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent italic pr-2">Commande.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Réservez un véhicule à double commande chez SMONI à Paris et exercez-vous en toute tranquillité. La location se fait à la journée pour une flexibilité maximale.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => { navigate('/tarifs'); window.scrollTo(0, 0); }}
                            className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-8 h-14 text-lg font-black shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.03] border-none"
                        >
                            Réserver un véhicule <MousePointerClick className="ml-2 w-5 h-5" />
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
                                Conduisez plus, payez moins
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed">
                                La location de véhicules à double commande est la solution idéale pour compléter votre formation et accumuler de l'expérience à moindre coût avec l'accompagnateur de votre choix.
                            </motion.p>
                            <motion.ul variants={containerVariants} className="space-y-5">
                                {[
                                    "Véhicules modernes et parfaitement entretenus",
                                    "Assurance tous risques incluse dans le tarif",
                                    "Flexibilité totale: louez à l'heure ou à la journée",
                                    "Boîte manuelle ou automatique au choix"
                                ].map((perk, i) => (
                                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="min-w-6 min-h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-blue-600 font-bold" />
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
                            <motion.div variants={itemVariants} className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                                        <FileText className="w-6 h-6 text-[#2c2876]" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-[#2c2876] tracking-tight">Documents requis</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-6">Afin de procéder à la location, nous avons besoin de vérifier certains documents obligatoires :</p>

                                <div className="space-y-4">
                                    {documents.map((doc, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                                        >
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2c2876] text-white rounded-xl flex items-center justify-center font-black shadow-inner shrink-0 text-base md:text-lg">
                                                {idx + 1}
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-[#2c2876] mb-1 leading-tight">{doc.title}</h3>
                                                <p className="text-slate-400 text-xs leading-relaxed">{doc.desc}</p>
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
            {/*  SEO SECTION 1 — Louer un véhicule double commande   */}
            {/*  Design: Offset magazine editorial layout              */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f0f4f8] relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-16 items-start">
                            {/* Left editorial column */}
                            <div className="lg:w-[45%]">
                                <span className="text-blue-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">01 — Le concept</span>
                                <h2 className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tight leading-[1.1] mb-6">
                                    Louer un véhicule <span className="text-blue-600">double commande</span> à Paris
                                </h2>
                                <p className="text-[#6e6e73] text-lg leading-relaxed mb-8">
                                    SMONI met à votre disposition des véhicules à double commande en parfait état pour vous entraîner librement dans les rues de Paris avec l'accompagnateur de votre choix. Plus besoin de dépendre du planning d'un moniteur : vous choisissez votre créneau, votre parcours et votre rythme.
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200">
                                        <div className="text-3xl font-black text-[#2c2876] mb-1">7j/7</div>
                                        <div className="text-xs text-[#6e6e73] font-semibold">Disponibilité</div>
                                    </div>
                                    <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200">
                                        <div className="text-3xl font-black text-[#2c2876] mb-1">Paris</div>
                                        <div className="text-xs text-[#6e6e73] font-semibold">& Île-de-France</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right — stacked info blocks with left accent border */}
                            <div className="lg:w-[55%] space-y-5">
                                {[
                                    { icon: KeyRound, color: "border-l-blue-500 bg-blue-50/30", title: "Réservation simplifiée", text: "Réservez votre véhicule double commande en ligne en quelques clics. Choisissez votre date, votre créneau horaire et le type de boîte de vitesses souhaité. La confirmation est instantanée." },
                                    { icon: Shield, color: "border-l-emerald-500 bg-emerald-50/30", title: "Assurance tous risques incluse", text: "Chaque véhicule est couvert par une assurance tous risques complète. En cas d'incident, votre responsabilité financière est limitée à la franchise indiquée lors de la réservation." },
                                    { icon: Fuel, color: "border-l-amber-500 bg-amber-50/30", title: "Véhicule prêt à rouler", text: "Le véhicule vous est remis avec le plein de carburant, nettoyé intérieur et extérieur. Tous les contrôles techniques sont à jour. Vous n'avez qu'à tourner la clé et partir." },
                                ].map(({ icon: Icon, color, title, text }, i) => (
                                    <motion.div key={i} variants={itemVariants} className={`border-l-4 ${color} rounded-r-2xl p-6 hover:shadow-md transition-shadow`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <Icon className="w-5 h-5 text-[#2c2876]" />
                                            <h3 className="font-bold text-[#1d1d1f] text-lg">{title}</h3>
                                        </div>
                                        <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 2 — Location voiture auto-école Paris     */}
            {/*  Design: Dark editorial with large number counters     */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0c0a1d]" />
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.15) 0%, transparent 55%)' }} />

                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-16">
                            <span className="text-blue-400 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">02 — En chiffres</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                                Location voiture auto-école <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Paris</span>
                            </h2>
                            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                                Les chiffres qui font la différence. SMONI est le partenaire de confiance des candidats libres et des élèves en conduite accompagnée en Île-de-France.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { value: "+2 000", label: "Locations effectuées", sub: "depuis notre lancement" },
                                { value: "98%", label: "Satisfaction client", sub: "avis vérifiés" },
                                { value: "< 24h", label: "Délai de mise à disposition", sub: "véhicule prêt" },
                                { value: "0€", label: "Frais cachés", sub: "prix tout compris" },
                            ].map((stat, i) => (
                                <motion.div key={i} variants={itemVariants} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-6 lg:p-8 hover:bg-white/[0.08] transition-colors group">
                                    <div className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 group-hover:text-blue-300 transition-colors">{stat.value}</div>
                                    <div className="text-white/90 text-sm font-semibold mb-1">{stat.label}</div>
                                    <div className="text-white/40 text-xs">{stat.sub}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 3 — Voiture à double pédale Paris         */}
            {/*  Design: Horizontal process strip with connecting line */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="text-center mb-16">
                            <span className="text-sky-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">03 — Processus</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Comment louer une voiture à double pédale à Paris ?
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-2xl mx-auto">De la réservation à la restitution, tout est pensé pour être simple et rapide.</p>
                        </motion.div>

                        {/* Process steps with connecting line */}
                        <div className="relative">
                            {/* Desktop connector line */}
                            <div className="hidden lg:block absolute top-[3.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-200 via-sky-200 to-cyan-200 z-0" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                                {[
                                    { step: "01", icon: MousePointerClick, title: "Réservez en ligne", text: "Sélectionnez votre date et créneau sur notre plateforme. Paiement sécurisé en ligne ou sur place le jour même." },
                                    { step: "02", icon: FileText, title: "Transmettez vos documents", text: "Envoyez les justificatifs nécessaires (identité, livret, permis accompagnateur) via votre espace client." },
                                    { step: "03", icon: Car, title: "Récupérez le véhicule", text: "Présentez-vous au point de retrait à Paris avec votre accompagnateur. Le véhicule est prêt à rouler, plein fait." },
                                    { step: "04", icon: CalendarCheck, title: "Roulez & restituez", text: "Entraînez-vous en toute liberté pendant la durée réservée. Restituez le véhicule au même point de retrait." },
                                ].map(({ step, icon: Icon, title, text }, i) => (
                                    <motion.div key={i} variants={itemVariants} className="text-center group">
                                        <div className="w-[7rem] h-[7rem] mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.25)] flex items-center justify-center group-hover:scale-105 transition-transform">
                                            <Icon className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <span className="text-blue-400 font-black text-xs tracking-[0.2em] block mb-2">{step}</span>
                                        <h3 className="font-bold text-[#1d1d1f] text-lg mb-2">{title}</h3>
                                        <p className="text-[#6e6e73] text-sm leading-relaxed">{text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 4 — Location conduite accompagnée Paris   */}
            {/*  Design: Split asymmetric — large text + feature list  */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            {/* Left — massive type block */}
                            <motion.div variants={itemVariants} className="lg:w-1/2">
                                <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">04 — Conduite accompagnée</span>
                                <h2 className="text-4xl md:text-[3.25rem] font-black text-[#1d1d1f] tracking-tight leading-[1.1] mb-6">
                                    La location idéale pour la <span className="text-emerald-600">conduite accompagnée</span> à Paris
                                </h2>
                                <p className="text-[#6e6e73] text-lg leading-relaxed mb-8">
                                    Vous êtes en AAC (Apprentissage Anticipé de la Conduite) et vous souhaitez accumuler les kilomètres nécessaires sans dépendre du planning de l'auto-école ? La location d'un véhicule à double commande SMONI vous permet de rouler autant que vous le souhaitez avec votre accompagnateur, sur les trajets de votre choix, à Paris et en Île-de-France.
                                </p>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4">
                                    <Users className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-[#1d1d1f] text-sm mb-1">Rappel légal</div>
                                        <p className="text-[#6e6e73] text-xs leading-relaxed">L'accompagnateur doit être titulaire du permis B depuis au moins 5 ans sans interruption. Il doit être mentionné sur le contrat d'assurance du véhicule loué.</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right — stacked metric blocks */}
                            <motion.div variants={itemVariants} className="lg:w-1/2 space-y-4">
                                {[
                                    { icon: MapPin, val: "Paris + IDF", label: "Zone de circulation autorisée", desc: "Roulez librement dans toute l'Île-de-France. Découvrez les axes péri-urbains et les autoroutes en toute sécurité." },
                                    { icon: Clock, val: "Journée entière", label: "Durée de la location", desc: "Profitez du véhicule toute la journée pour vous entraîner à votre rythme. Pas de compteur horaire qui tourne." },
                                    { icon: Gauge, val: "BVM / BVA", label: "Boîte au choix", desc: "Vous décidez : boîte manuelle pour une formation complète, ou automatique pour vous concentrer sur l'environnement." },
                                ].map(({ icon: Icon, val, label, desc }, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-5 hover:border-emerald-200 hover:shadow-sm transition-all">
                                        <div className="w-12 h-12 shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                                            <Icon className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline gap-3 mb-1">
                                                <span className="text-lg font-black text-[#2c2876]">{val}</span>
                                                <span className="text-xs text-[#6e6e73] font-medium">{label}</span>
                                            </div>
                                            <p className="text-[#6e6e73] text-sm leading-relaxed">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 5 — Candidat libre permis Paris          */}
            {/*  Design: Full-width gradient banner + two-column      */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-gradient-to-br from-[#2c2876] via-[#1a1a5c] to-[#0f0f3d] relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 50%)' }} />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f0f3d] to-transparent" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-blue-300 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">05 — Candidat libre</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                                Passez votre permis en <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">candidat libre</span> à Paris
                            </h2>
                            <p className="text-white/70 text-lg max-w-3xl leading-relaxed">
                                De plus en plus de Parisiens choisissent de passer le permis en candidat libre pour réduire les coûts et gagner en autonomie. La location d'un véhicule à double commande est la colonne vertébrale de cette démarche : c'est le seul moyen légal de s'entraîner sans être inscrit dans une auto-école traditionnelle.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Inscription à l'examen", text: "En tant que candidat libre, vous vous inscrivez vous-même sur le site de l'ANTS pour obtenir votre numéro NEPH. SMONI vous accompagne dans ces démarches administratives si besoin." },
                                { title: "Entraînement en toute légalité", text: "La loi française autorise la conduite avec un accompagnateur uniquement à bord d'un véhicule à double commande. Notre flotte est homologuée et assurée spécifiquement pour cet usage." },
                                { title: "Économies substantielles", text: "En éliminant les frais de dossier, de gestion administrative et les marges de l'auto-école, vous pouvez économiser jusqu'à 40% sur le coût total de votre permis par rapport à une formule classique." },
                                { title: "Flexibilité totale du planning", text: "Vous roulez quand vous voulez, aussi longtemps que vous le souhaitez pendant la durée de location. Pas de créneau imposé, pas de leçon écourtée. Votre progression dépend uniquement de vous." },
                            ].map(({ title, text }, i) => (
                                <motion.div key={i} variants={itemVariants} className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-7 hover:bg-white/[0.1] transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                                            <span className="text-blue-300 font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                                        </div>
                                        <h3 className="font-bold text-white text-base">{title}</h3>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 6 — Comparatif prix location Paris       */}
            {/*  Design: Table comparison layout (no card spam)         */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-amber-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">06 — Comparatif</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Location double commande vs. leçons traditionnelles
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-2xl">Pourquoi la location est-elle le choix malin pour les candidats parisiens ? Comparons objectivement.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="overflow-hidden rounded-2xl border border-slate-200">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#f8fafc]">
                                        <th className="p-5 text-sm font-bold text-[#1d1d1f]">Critère</th>
                                        <th className="p-5 text-sm font-bold text-blue-600 text-center">Location SMONI</th>
                                        <th className="p-5 text-sm font-bold text-[#6e6e73] text-center">Leçon auto-école</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        { criteria: "Coût horaire moyen", smoni: "~15€/h", other: "~55€/h", smoniWins: true },
                                        { criteria: "Choix de l'accompagnateur", smoni: "Libre", other: "Moniteur imposé", smoniWins: true },
                                        { criteria: "Durée de la session", smoni: "Illimitée (journée)", other: "1h ou 2h fixes", smoniWins: true },
                                        { criteria: "Flexibilité horaires", smoni: "7j/7 · Vos horaires", other: "Créneaux limités", smoniWins: true },
                                        { criteria: "Encadrement pédagogique", smoni: "Accompagnateur", other: "Moniteur diplômé", smoniWins: false },
                                        { criteria: "Assurance incluse", smoni: "Tous risques", other: "Incluse", smoniWins: true },
                                    ].map(({ criteria, smoni, other, smoniWins }, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="p-5 text-sm text-[#1d1d1f] font-medium">{criteria}</td>
                                            <td className={`p-5 text-sm text-center font-bold ${smoniWins ? 'text-blue-600' : 'text-[#1d1d1f]'}`}>
                                                {smoni}
                                            </td>
                                            <td className={`p-5 text-sm text-center font-medium ${!smoniWins ? 'text-emerald-600 font-bold' : 'text-[#6e6e73]'}`}>
                                                {other}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100">
                            <p className="text-sm text-[#1d1d1f]">
                                <span className="font-bold">Le conseil SMONI :</span> <span className="text-[#6e6e73]">La location ne remplace pas la formation avec un moniteur professionnel mais la complète parfaitement. Idéal pour multiplier les heures de pratique entre deux leçons ou pour préparer l'examen en roulant sur les parcours officiels.</span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 7 — Véhicules double commande Paris      */}
            {/*  Design: Horizontal scrolling specs strip              */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc] overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-cyan-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">07 — Notre flotte</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Véhicules double commande à Paris
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-2xl">Des véhicules récents, fiables et parfaitement équipés pour un entraînement dans les meilleures conditions.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Cog, title: "Double pédalier complet", desc: "Frein et embrayage côté passager permettant à l'accompagnateur d'intervenir instantanément en cas de besoin. Dispositif homologué par la Préfecture.", bg: "bg-gradient-to-br from-slate-50 to-slate-100", border: "border-slate-200" },
                                { icon: Eye, title: "Rétroviseur additionnel", desc: "Un rétroviseur intérieur supplémentaire offre une visibilité optimale à l'accompagnateur pour anticiper les situations et vous guider efficacement.", bg: "bg-gradient-to-br from-cyan-50 to-sky-50", border: "border-cyan-100" },
                                { icon: Shield, title: "Contrôle technique à jour", desc: "Chaque véhicule de notre flotte est soumis à un entretien rigoureux et dispose d'un contrôle technique valide. Votre sécurité est notre priorité absolue.", bg: "bg-gradient-to-br from-blue-50 to-indigo-50", border: "border-blue-100" },
                            ].map(({ icon: Icon, title, desc, bg, border }, i) => (
                                <motion.div key={i} variants={itemVariants} className={`${bg} ${border} border rounded-3xl p-8 hover:-translate-y-1 transition-transform flex flex-col`}>
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                                        <Icon className="w-7 h-7 text-[#2c2876]" />
                                    </div>
                                    <h3 className="font-bold text-[#1d1d1f] text-xl mb-3">{title}</h3>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed flex-1">{desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Vehicle spec bar */}
                        <motion.div variants={itemVariants} className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap justify-center gap-x-10 gap-y-4">
                            {[
                                { label: "Marques", value: "Renault · Peugeot" },
                                { label: "Kilométrage max", value: "200 km/jour" },
                                { label: "Boîtes", value: "Manuelle & Auto" },
                                { label: "Carburant", value: "Essence / Diesel" },
                            ].map(({ label, value }, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-xs text-[#6e6e73] font-medium uppercase tracking-widest mb-1">{label}</div>
                                    <div className="text-sm font-bold text-[#1d1d1f]">{value}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 8 — Conditions & prérequis               */}
            {/*  Design: Checklist layout with warning callouts        */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-rose-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">08 — Prérequis</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Conditions de location à Paris
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-2xl">Avant de réserver, assurez-vous de remplir ces conditions réglementaires.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Checklist for the driver (learner) */}
                            <motion.div variants={itemVariants} className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200">
                                <h3 className="font-bold text-[#1d1d1f] text-xl mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                                        <Car className="w-5 h-5 text-blue-600" />
                                    </div>
                                    Pour le conducteur (élève)
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "Être inscrit au permis de conduire (numéro NEPH actif)",
                                        "Avoir validé le code de la route (ETG en cours de validité)",
                                        "Avoir effectué au minimum 20 heures de conduite en auto-école",
                                        "Disposer du livret d'apprentissage à jour",
                                        "Présenter une pièce d'identité valide le jour du retrait",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                            <span className="text-sm text-[#1d1d1f] font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Checklist for the accompanist */}
                            <motion.div variants={itemVariants} className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200">
                                <h3 className="font-bold text-[#1d1d1f] text-xl mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                                        <Users className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    Pour l'accompagnateur
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "Être titulaire du permis B depuis au moins 5 ans sans interruption",
                                        "Ne pas avoir fait l'objet d'une annulation ou suspension de permis",
                                        "Être mentionné sur le contrat d'apprentissage de l'élève",
                                        "Présenter son permis de conduire original le jour du retrait",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-sm text-[#1d1d1f] font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Warning callout */}
                                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                        L'accompagnateur doit obligatoirement être présent lors du retrait et de la restitution du véhicule. Il est le seul habilité à occuper le siège passager pendant la conduite de l'élève.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════ */}
            {/*  SEO SECTION 9 — FAQ Location double commande Paris   */}
            {/*  Design: Custom accordion with side trust signal      */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-indigo-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">09 — Questions fréquentes</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Tout savoir sur la location double commande à Paris
                            </h2>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* FAQ accordion */}
                            <motion.div variants={itemVariants} className="flex-1 space-y-3">
                                {[
                                    { q: "Quel est le prix de la location d'un véhicule double commande à Paris ?", a: "Le tarif de la location varie en fonction de la durée choisie. Chez SMONI, la location à la journée est la formule la plus avantageuse. Tous les prix sont affichés de manière transparente sur notre page tarifs — aucun frais caché, assurance tous risques incluse." },
                                    { q: "Puis-je louer un véhicule sans avoir commencé les leçons avec SMONI ?", a: "Oui. La location de véhicule double commande est ouverte à tous les candidats au permis B ayant validé leur code et effectué le minimum légal de 20 heures de conduite, que vous soyez inscrit chez SMONI ou dans une autre auto-école." },
                                    { q: "Quelle est la zone géographique autorisée pour circuler ?", a: "Vous pouvez circuler librement à Paris intra-muros et dans l'ensemble de l'Île-de-France (départements 75, 77, 78, 91, 92, 93, 94, 95). La circulation en dehors de la région IDF n'est pas autorisée dans le cadre du contrat de location." },
                                    { q: "Y a-t-il un kilométrage maximum autorisé ?", a: "Oui, un forfait kilométrique de 200 km par jour de location est inclus dans le tarif standard. Au-delà, un supplément par kilomètre est facturé. En pratique, 200 km couvrent largement une journée complète d'entraînement en zone urbaine et péri-urbaine." },
                                    { q: "Que se passe-t-il en cas d'accident ou de dommage au véhicule ?", a: "L'assurance tous risques couvre la majorité des sinistres. Une franchise est applicable et son montant est clairement indiqué dans votre contrat de location. En cas d'incident, contactez immédiatement notre service d'assistance qui vous guidera dans les démarches." },
                                    { q: "Comment régler la caution ?", a: "La caution peut être réglée par chèque de 500€ (non encaissé sauf sinistre) ou par empreinte de carte bancaire avec une franchise de 150€. La caution est restituée intégralement si le véhicule est rendu dans l'état initial." },
                                    { q: "Puis-je annuler ou reporter ma réservation ?", a: "Oui, toute réservation peut être annulée ou modifiée gratuitement jusqu'à 48 heures avant la date de retrait. Passé ce délai, des frais d'annulation peuvent s'appliquer selon les conditions générales." },
                                ].map(({ q, a }, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:border-indigo-200">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            className="w-full text-left p-5 flex items-center justify-between gap-4"
                                        >
                                            <span className="text-sm font-semibold text-[#1d1d1f]">{q}</span>
                                            <ChevronDown className={`w-5 h-5 text-[#6e6e73] shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openFaq === i && (
                                            <div className="px-5 pb-5">
                                                <div className="h-px bg-slate-100 mb-4" />
                                                <p className="text-sm text-[#6e6e73] leading-relaxed">{a}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </motion.div>

                            {/* Side trust signal */}
                            <motion.div variants={itemVariants} className="lg:w-80 shrink-0">
                                <div className="bg-white rounded-3xl border border-slate-200 p-8 sticky top-32">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                                        <Phone className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-[#1d1d1f] text-lg mb-3">Une question ?</h3>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed mb-6">
                                        Notre équipe répond à toutes vos questions sur la location de véhicules double commande en moins de 2 heures ouvrées.
                                    </p>
                                    <Button
                                        onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                                        className="w-full bg-[#2c2876] text-white hover:bg-[#1d1d5c] rounded-xl h-12 font-bold text-sm"
                                    >
                                        Nous contacter
                                    </Button>

                                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                        {[
                                            { icon: ThumbsUp, text: "98% de clients satisfaits" },
                                            { icon: Shield, text: "Assurance tous risques" },
                                            { icon: Clock, text: "Réponse en < 2h" },
                                        ].map(({ icon: Icon, text }, i) => (
                                            <div key={i} className="flex items-center gap-2.5">
                                                <Icon className="w-4 h-4 text-blue-400" />
                                                <span className="text-xs text-[#6e6e73] font-medium">{text}</span>
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
            {/*  SEO SECTION 10 — Préparer l'examen permis Paris      */}
            {/*  Design: Editorial long-form + arrondissement coverage */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                        <motion.div variants={itemVariants} className="mb-14">
                            <span className="text-violet-500 font-black text-[11px] uppercase tracking-[0.25em] block mb-4">10 — Préparation examen</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4">
                                Préparer l'examen du permis de conduire à Paris avec la location
                            </h2>
                            <p className="text-[#6e6e73] text-lg max-w-3xl leading-relaxed">
                                La location d'un véhicule à double commande est devenue un outil stratégique pour les candidats parisiens qui veulent maximiser leurs chances de réussite à l'épreuve pratique du permis de conduire.
                            </p>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            {/* Left — editorial content */}
                            <motion.div variants={itemVariants} className="lg:w-[60%] space-y-6">
                                <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-200">
                                    <h3 className="font-bold text-[#1d1d1f] text-xl mb-4">Rouler sur les parcours d'examen officiels</h3>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed mb-4">
                                        Les centres d'examen d'Île-de-France utilisent des parcours définis à l'avance. Grâce à la location de véhicule double commande chez SMONI, vous pouvez vous entraîner directement sur ces itinéraires avec votre accompagnateur. Cette familiarisation avec les intersections, ronds-points et axes spécifiques au centre de votre examen constitue un avantage décisif le jour J.
                                    </p>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed">
                                        Que votre centre d'examen se situe à Rungis, Nanterre, Gennevilliers, Créteil ou Saint-Denis, vous pouvez sillonner les parcours autant de fois que nécessaire pendant la durée de votre location — sans la pression d'un compteur horaire.
                                    </p>
                                </div>

                                <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-200">
                                    <h3 className="font-bold text-[#1d1d1f] text-xl mb-4">Compléter efficacement sa formation auto-école</h3>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed mb-4">
                                        Les statistiques nationales montrent que les candidats qui cumulent des heures de pratique supplémentaires en dehors de leur auto-école obtiennent un taux de réussite sensiblement supérieur. La location de votre véhicule à double commande vous permet de doubler ou tripler votre temps de conduite effective sans exploser votre budget.
                                    </p>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed">
                                        En Île-de-France, où la densité du trafic complexifie l'apprentissage, chaque heure de conduite compte. Travailler les manœuvres — créneau, rangement en bataille, demi-tour — dans le calme et sans pression pédagogique accélère considérablement la progression de l'élève.
                                    </p>
                                </div>

                                <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-200">
                                    <h3 className="font-bold text-[#1d1d1f] text-xl mb-4">Gérer le stress de la conduite parisienne</h3>
                                    <p className="text-[#6e6e73] text-sm leading-relaxed">
                                        Le trafic parisien est réputé pour être l'un des plus stressants d'Europe. Les deux-roues, les bus, les piétons, les pistes cyclables et les changements de voies incessants créent un environnement de conduite unique. Plus vous accumulez d'heures dans ce contexte, plus vos réflexes deviennent naturels. La location vous offre exactement cela : du temps de conduite réel en conditions réelles, à votre rythme, avec le soutien rassurant de votre accompagnateur.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right — coverage zones & stats */}
                            <motion.div variants={itemVariants} className="lg:w-[40%] space-y-5 lg:sticky lg:top-32">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                                    <h3 className="font-bold text-[#1d1d1f] text-lg mb-5 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                        Zones couvertes en Île-de-France
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { dept: "75", name: "Paris intra-muros", detail: "Tous arrondissements" },
                                            { dept: "92", name: "Hauts-de-Seine", detail: "Nanterre, Boulogne, Colombes…" },
                                            { dept: "93", name: "Seine-Saint-Denis", detail: "Saint-Denis, Bobigny, Montreuil…" },
                                            { dept: "94", name: "Val-de-Marne", detail: "Créteil, Vitry, Vincennes…" },
                                            { dept: "91", name: "Essonne", detail: "Évry, Massy, Palaiseau…" },
                                            { dept: "78", name: "Yvelines", detail: "Versailles, Poissy, Trappes…" },
                                            { dept: "95", name: "Val-d'Oise", detail: "Cergy, Sarcelles, Pontoise…" },
                                            { dept: "77", name: "Seine-et-Marne", detail: "Meaux, Melun, Chelles…" },
                                        ].map(({ dept, name, detail }, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-white/70 rounded-xl p-3 border border-blue-100/50">
                                                <span className="w-10 h-10 bg-[#2c2876] text-white rounded-lg flex items-center justify-center font-black text-xs shrink-0">{dept}</span>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-bold text-[#1d1d1f] truncate">{name}</div>
                                                    <div className="text-xs text-[#6e6e73] truncate">{detail}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
                                    <div className="text-4xl font-black text-[#2c2876] mb-1">8 depts</div>
                                    <div className="text-xs text-[#6e6e73] font-semibold uppercase tracking-widest">Couverture francilienne complète</div>
                                </div>
                            </motion.div>
                        </div>

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
        </div>
    );
}

export default Details;
