import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { Award, BookOpen, Clock, HeartHandshake, Leaf, ShieldCheck, Target, Users, MapPin, Navigation, CarFront, Euro, BatteryCharging, CheckCircle2, MessageSquare, ChevronDown } from "lucide-react";
import { motion, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import PageHead from "@components/SEO/PageHead";

const APropos = () => {
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

    const stats = [
        { label: "Élèves formés", value: "5 000+", icon: <Users className="w-6 h-6 text-blue-500" /> },
        { label: "Taux de réussite", value: "85%", icon: <Target className="w-6 h-6 text-blue-500" /> },
        { label: "Moniteurs experts", value: "30+", icon: <Award className="w-6 h-6 text-blue-500" /> },
        { label: "Véhicules écologiques", value: "100%", icon: <Leaf className="w-6 h-6 text-blue-500" /> },
    ];

    const values = [
        {
            title: "Pédagogie Moderne",
            description: "Nous utilisons des outils numériques exclusifs et des méthodes éprouvées pour garantir un apprentissage rapide et efficace.",
            icon: <BookOpen className="w-7 h-7 text-[#2c2876]" />
        },
        {
            title: "Engagement Écologique",
            description: "Une flotte 100% écologique pour réduire notre empreinte tout en vous offrant un confort de conduite inégalé.",
            icon: <Leaf className="w-7 h-7 text-[#2c2876]" />
        },
        {
            title: "Expertise & Sécurité",
            description: "Des moniteurs diplômés et passionnés, formés pour vous accompagner avec patience et professionnalisme.",
            icon: <ShieldCheck className="w-7 h-7 text-[#2c2876]" />
        },
        {
            title: "Accompagnement Sur-Mesure",
            description: "Votre parcours est unique. Nous adaptons nos plannings et notre suivi à vos besoins spécifiques.",
            icon: <HeartHandshake className="w-7 h-7 text-[#2c2876]" />
        }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <PageHead
                title="A propos - Smoni Auto-Ecole Vincennes (94300)"
                description="Decouvrez Smoni Auto-Ecole a Vincennes : notre equipe, nos valeurs et notre pedagogie pour reussir votre permis dans le 94300."
                canonicalPath="/a-propos"
            />
            <Header />

            {/* Hero Section */}
            <main className="relative pt-[120px] sm:pt-[140px] pb-16 md:pb-24 overflow-hidden">
                {/* Dynamic Background */}
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
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#2c2876]/10 shadow-sm mb-6"
                    >
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]">Notre Histoire</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] lg:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Redéfinir la conduite pour la <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic pr-1">nouvelle</span>{" "}
                        <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic pr-2">génération.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-12 max-w-2xl mx-auto"
                    >
                        Smoni n'est pas qu'une auto-école. C'est une vision moderne de l'apprentissage de la conduite, alliant <strong className="text-[#2c2876]">technologie de pointe</strong>, <strong className="text-[#2c2876]">engagement écologique</strong> et <strong className="text-[#2c2876]">bienveillance</strong>.
                    </motion.p>
                </motion.div>
            </main>

            {/* Stats Section */}
            <section className="relative z-10 -mt-10 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 lg:p-8 rounded-[2rem] flex flex-col items-center justify-center text-center shadow-[0_20px_40px_-15px_rgba(44,40,118,0.05)] hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-extrabold text-[#2c2876] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    {stat.value}
                                </h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Vision & Values Section */}
            <section className="py-20 lg:py-32 bg-white border-t border-slate-100 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center"
                    >
                        {/* Left Text */}
                        <div className="lg:w-1/2 flex flex-col items-start text-left">
                            <motion.span variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876] mb-4 bg-slate-100 px-4 py-1.5 rounded-full">Nos Valeurs</motion.span>
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl lg:text-5xl font-extrabold text-[#2c2876] mb-8 leading-tight"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                L'Excellence comme <span className="text-blue-500 italic">Standard.</span>
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg leading-relaxed font-medium mb-6">
                                Fondée sur des principes d'innovation et de respect de l'environnement, <b>Smoni</b> transforme une étape souvent stressante en une expérience enrichissante et gratifiante.
                            </motion.p>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg leading-relaxed font-medium">
                                Nous croyons que chaque élève mérite une attention particulière. C'est pourquoi nos méthodes s'adaptent à vous, et non l'inverse. Rejoignez la révolution de la mobilité.
                            </motion.p>

                            {/* Mission point */}
                            <motion.div variants={itemVariants} className="mt-10 bg-slate-50 p-6 rounded-3xl border border-slate-200 border-l-4 border-l-[#2c2876]">
                                <h4 className="font-bold text-[#2c2876] text-lg mb-2 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-blue-500" /> Notre Mission Principale
                                </h4>
                                <p className="text-slate-500 text-sm font-medium">
                                    Démocratiser l'accès au permis de conduire tout en formant des conducteurs responsables, conscients des enjeux écologiques et sécuritaires de demain.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Grid (Values) */}
                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:border-[#2c2876]/20 hover:shadow-[0_15px_30px_-10px_rgba(44,40,118,0.1)] transition-all group"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                        {val.icon}
                                    </div>
                                    <h4 className="font-bold text-[#2c2876] text-lg mb-3">{val.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{val.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 1. Pourquoi passer son permis à Paris */}
            <section className="py-20 lg:py-32 bg-[#f8fafc] relative z-10 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.span variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876] mb-4 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">Auto-École Parisienne</motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-5xl font-extrabold text-[#2c2876] mt-4"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Pourquoi passer son permis à <span className="text-blue-500 italic">Paris</span> avec nous ?
                        </motion.h2>
                        <motion.p variants={itemVariants} className="mt-6 text-slate-500 text-lg max-w-3xl mx-auto">
                            Apprendre à conduire à Paris et en région parisienne exige une formation de haut niveau. Nos formateurs maîtrisent les défis spécifiques de la circulation en Île-de-France.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { title: "Densité du Traffic", desc: "Apprenez à anticiper et à gérer votre stress dans la circulation parisienne, de la Place de l'Étoile aux grands boulevards.", icon: <CarFront className="w-8 h-8 text-[#2c2876]" /> },
                            { title: "Maîtrise Environnementale", desc: "Adaptation aux Zones à Faibles Émissions (ZFE) de Paris avec nos véhicules 100% écologiques de dernière génération.", icon: <Leaf className="w-8 h-8 text-[#2c2876]" /> },
                            { title: "Financement CPF Paris", desc: "Nos formations au permis de conduire sont éligibles au CPF. Utilisez vos droits pour financer votre permis à Paris.", icon: <Euro className="w-8 h-8 text-[#2c2876]" /> }
                        ].map((item, idx) => (
                            <motion.div key={idx} variants={itemVariants} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#2c2876] mb-4">{item.title}</h3>
                                <p className="text-slate-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 2. Notre Équipe de Moniteurs Parisiens */}
            <section className="py-20 lg:py-32 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="flex flex-col lg:flex-row gap-12 items-center"
                    >
                        <div className="lg:w-1/2">
                            <motion.span variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876] mb-4 bg-slate-100 px-4 py-1.5 rounded-full inline-block">Instructeurs d'Excellence</motion.span>
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl lg:text-5xl font-extrabold text-[#2c2876] my-6 leading-tight"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Une équipe de moniteurs <br /> <span className="text-blue-500 italic">dédiés à votre réussite.</span>
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-6">
                                Tous nos moniteurs d'auto-école opérant sur Paris et le Val-de-Marne sont diplômés d'État. Ils bénéficient d'une formation continue pour s'adapter aux nouvelles mobilités urbaines en Île-de-France.
                            </motion.p>
                            <motion.ul variants={containerVariants} className="space-y-4">
                                {["Accompagnement psychologique anti-stress", "Pédagogie adaptée au rythme de chacun", "Expertise locale des centres d'examens franciliens"].map((point, index) => (
                                    <motion.li key={index} variants={itemVariants} className="flex items-center gap-3 text-slate-600 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <motion.div variants={itemVariants} className="lg:w-1/2 w-full">
                            <div className="aspect-[4/3] bg-slate-100 rounded-[2rem] overflow-hidden relative border border-slate-200">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#2c2876]/20 to-blue-500/20 mix-blend-multiply" />
                                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                                    <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
                                        <Users className="w-10 h-10 text-[#2c2876] mx-auto mb-3" />
                                        <div className="font-black text-[#2c2876] text-xl">30+ Moniteurs</div>
                                        <div className="text-sm font-bold text-slate-500 uppercase">Diplômés d'État</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Formations Franciliens */}
            <section className="py-20 lg:py-32 bg-[#2c2876] text-white relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-5xl font-extrabold text-white"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Nos formations phares en <span className="text-blue-400 italic">Île-de-France.</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
                            Que vous soyez à Paris intramuros ou en banlieue, Smoni vous propose le permis adapté à votre quotidien.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { title: "Permis B", desc: "La norme de demain disponible aujourd'hui. Silencieux, propre, et sans passage de vitesse.", icon: <BatteryCharging className="w-6 h-6" /> },
                            { title: "Boîte Automatique", desc: "Pour une conduite fluide dans les bouchons parisiens. Apprentissage plus rapide et serein.", icon: <CarFront className="w-6 h-6" /> },
                            { title: "Passerelle Boîte Manuelle", desc: "7 heures de formation pour convertir votre permis automatique en manuel.", icon: <Navigation className="w-6 h-6" /> },
                            { title: "Code en ligne", desc: "Révisez votre code de la route 100% en ligne, partout dans le métro parisien.", icon: <BookOpen className="w-6 h-6" /> }
                        ].map((item, idx) => (
                            <motion.div key={idx} variants={itemVariants} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. Secteurs */}
            <section className="py-20 lg:py-32 bg-white relative z-10 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="flex flex-col lg:flex-row-reverse gap-12 items-center"
                    >
                        <div className="lg:w-1/2">
                            <motion.span variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876] mb-4 bg-slate-100 px-4 py-1.5 rounded-full inline-block">Ancrage Local</motion.span>
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl lg:text-5xl font-extrabold text-[#2c2876] my-6 leading-tight"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Vincennes & Paris Est : <br /> <span className="text-blue-500 italic">Notre terrain de jeu.</span>
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-6">
                                Idéalement située aux portes de Paris, notre auto-école de Vincennes est le point de départ parfait. Nous couvrons le <strong className="text-[#2c2876]">Val-de-Marne (94)</strong>, le <strong className="text-[#2c2876]">12ème</strong> et le <strong className="text-[#2c2876]">20ème arrondissement de Paris</strong>.
                            </motion.p>
                            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4 mt-8">
                                {[
                                    { place: "Vincennes (94300)", desc: "Notre agence principale" },
                                    { place: "Paris 12ème (75012)", desc: "Porte Dorée, Daumesnil" },
                                    { place: "Paris 20ème (75020)", desc: "Nation, Cours de Vincennes" },
                                    { place: "Montreuil (93100)", desc: "Proximité immédiate" },
                                ].map((loc, idx) => (
                                    <motion.div key={idx} variants={itemVariants} className="flex flex-col gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-2 text-[#2c2876] font-bold">
                                            <MapPin className="w-4 h-4 text-blue-500" />
                                            {loc.place}
                                        </div>
                                        <div className="text-xs text-slate-400 font-medium ml-6">{loc.desc}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div variants={itemVariants} className="lg:w-1/2 w-full">
                            <div className="w-full h-[400px] bg-slate-100 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-100">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21008.23439487405!2d2.4116491953043813!3d48.84755106888461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e672a11b65ce37%3A0x67b1dbd83f124a35!2sVincennes!5e0!3m2!1sfr!2sfr!4v1715000000000!5m2!1sfr!2sfr"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "brightness(0.95) contrast(1.1) grayscale(0.2)" }}
                                    loading="lazy"
                                    title="Zone d'intervention Paris et Val de Marne"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 5. FAQ Locale (SEO) */}
            <section className="py-20 lg:py-32 bg-[#f8fafc] relative z-10">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="text-center mb-12"
                    >
                        <motion.div variants={itemVariants} className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                            <MessageSquare className="w-8 h-8" />
                        </motion.div>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-4xl font-extrabold text-[#2c2876] mb-4"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Questions Fréquentes • Permis à Paris
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {[
                            { q: "Quels sont les délais pour passer l'examen du permis à Paris / Île-de-France ?", a: "Grâce à notre statut privilégié et notre excellente réputation, nous obtenons régulièrement des places d'examen en Île-de-France. Les délais varient, mais notre gestion de planning intelligente vous permet d'être présenté(e) dès que vous avez le niveau requis, sans attente inutile." },
                            { q: "Puis-je utiliser mon Compte Personnel de Formation (CPF) chez vous ?", a: "Absolument. En tant qu'auto-école certifiée Qualiopi, toutes nos formations au permis de conduire (Code + Conduite) sont 100% finançables via le CPF si vous résidez ou travaillez à Paris et environs." },
                            { q: "Où se déroulent les heures de conduite si je vis à Paris Intra-muros ?", a: "Pour maximiser l'efficacité de vos heures de conduite, nos points de rendez-vous sont souvent situés près de grands axes accessibles en métro (Ligne 1, RER A) côté Vincennes / Nation, permettant d'accéder rapidement aux zones d'examen." },
                            { q: "Est-ce plus difficile de passer son permis à Paris ?", a: "La circulation parisienne est certes plus dense, mais y apprendre la conduite fait de vous un excellent conducteur, paré à toute éventualité. Nos véhicules à boîte automatique et électriques facilitent d'ailleurs grandement l'apprentissage au milieu de cette circulation." }
                        ].map((faq, index) => (
                            <motion.div key={index} variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-[#2c2876]/20">
                                <h3 className="text-[#2c2876] font-bold text-lg mb-2 flex items-center justify-between">
                                    {faq.q}
                                </h3>
                                <div className="text-slate-500 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-100">
                                    {faq.a}
                                </div>
                            </motion.div>
                        ))}
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

export default APropos;
