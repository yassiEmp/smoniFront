import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "framer-motion";
import { ClipboardCheck, FileText, MousePointerClick, Check, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Details3 = () => {
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
        { title: "Justificatif d'identité", desc: "Carte d'identité ou passeport." },
        { title: "Justificatif de domicile", desc: "Document récent datant de moins de 6 mois." },
        { title: "Photo d'identité certifiée", desc: "e-Photo avec signature habilitée." },
        { title: "ASSR2 ou ASR", desc: "Ou, à défaut, une déclaration sur l'honneur en vue de la délivrance du titre." },
        { title: "Extrait si mineur", desc: "Carte identité du responsable légal et sa signature." }
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
                            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
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
                        className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 shadow-sm mb-6 font-bold"
                    >
                        <ClipboardCheck className="w-4 h-4 mr-2" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Post-Examen</span>
                    </motion.div>
                    
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Fabrication du <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent italic pr-2">Permis.</span>
                    </motion.h1>

                    <motion.p 
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Félicitations pour la réussite de votre examen ! Laissez-nous nous occuper des démarches fastidieuses pour la commande officielle et l'impression de votre titre final.
                    </motion.p>
                    
                </motion.div>
            </main>

            <section className="py-16 md:py-24 bg-white relative z-10">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        {/* Infos */}
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
                                On s'occupe de la paperasse.
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed">
                                Finies les interfaces compliquées et la bureaucratie ! Réunissez vos documents, transmettez-les via notre plateforme et notre équipe administrative s'occupe du reste.
                            </motion.p>
                            
                            <motion.div variants={itemVariants} className="p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm font-bold border border-yellow-200 flex items-start gap-4 mb-6">
                                <Star className="w-6 h-6 shrink-0 mt-0.5" />
                                <div>
                                    <span className="block mb-1">Service exclusif aux élèves</span>
                                    Cette offre de prise en charge documentaire est disponible uniquement pour les formés qui ont complété leur parcours sur la plateforme Smoni.
                                </div>
                            </motion.div>
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
                                    <h2 className="text-2xl font-extrabold text-[#2c2876] tracking-tight">Documents requis</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-6">Fournissez via votre espace apprenant les éléments suivants pour activer la procédure de fabrication :</p>
                                
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
                    
                    <div className="mt-16 pt-16 border-t border-slate-100 flex justify-center">
                        <Button 
                            variant="outline" 
                            size="lg"
                            onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
                            className="rounded-2xl h-14 px-8 text-[#2c2876] border-slate-200 hover:bg-slate-50 font-bold text-base transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-3" /> Retour à tous les services
                        </Button>
                    </div>
                </div>
            </section>
            
            <div className="relative z-10 bg-white border-t border-slate-100">
                <HomeNewStudentSection />
            </div>
            
            <Footer />
        </div>
    );
}

export default Details3;
