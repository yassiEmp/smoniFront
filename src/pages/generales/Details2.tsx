import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { motion, useSpring } from "framer-motion";
import { RefreshCw, MousePointerClick, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

const Details2 = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
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
                            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 60%)',
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
                        className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-rose-50 text-rose-600 rounded-full border border-rose-100 shadow-sm mb-6 font-bold"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Service Administratif</span>
                    </motion.div>
                    
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1.1] sm:leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto px-2 break-words"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Prolongation de <span className="bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent italic pr-2">Forfait.</span>
                    </motion.h1>

                    <motion.p 
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Ne perdez pas vos heures ! Prolongez facilement la durée de validité de votre abonnement si vous n'avez pas eu le temps de le terminer.
                    </motion.p>
                    
                </motion.div>
            </main>

            <section className="py-16 md:py-24 bg-white relative z-10">
                <div className="max-w-3xl mx-auto px-6 lg:px-12">
                    
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200 text-center"
                    >
                        <motion.div variants={itemVariants} className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mx-auto mb-6">
                            <Clock className="w-8 h-8 text-rose-500" />
                        </motion.div>
                        
                        <motion.h2 
                            variants={itemVariants}
                            className="text-2xl font-extrabold text-[#2c2876] mb-4 tracking-tight"
                        >
                            Comment ça marche ?
                        </motion.h2>
                        
                        <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                            Votre forfait arrive bientôt à expiration et vous n'aurez pas le temps de réaliser toutes vos heures réglées ? Pas de panique ! Chez SMONI, vous avez la possibilité de prolonger la date d'expiration de votre pack en quelques clics.
                        </motion.p>

                        <motion.div variants={itemVariants} className="p-4 bg-rose-50 text-rose-800 rounded-xl text-sm font-bold border border-rose-100 inline-block px-8 py-4">
                            Cette offre n'est valable que pour l'ensemble des forfaits éligibles. Connectez-vous à votre espace personnel pour vérifier vos conditions.
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="mt-8 flex justify-center">
                            {isAuthenticated ? (
                                <Button 
                                    size="lg" 
                                    onClick={() => { navigate('/learners/boutique'); window.scrollTo(0, 0); }}
                                    className="bg-rose-600 text-white hover:bg-rose-700 rounded-2xl px-10 h-16 text-xl font-black shadow-[0_15px_30px_-10px_rgba(225,29,72,0.4)] transition-all hover:scale-[1.03] border-none"
                                >
                                    Prolonger votre contrat <MousePointerClick className="ml-2 w-6 h-6" />
                                </Button>
                            ) : (
                                <Button 
                                    size="lg" 
                                    onClick={() => { navigate('/connexion'); window.scrollTo(0, 0); }}
                                    className="bg-rose-600 text-white hover:bg-rose-700 rounded-2xl px-8 h-12 text-base font-black shadow-[0_15px_30px_-10px_rgba(225,29,72,0.4)] transition-all hover:scale-[1.03] border-none"
                                >
                                    Se connecter à l'espace
                                </Button>
                            )}
                        </motion.div>

                    </motion.div>
                    
                    
                    <div className="mt-16 border-t border-slate-100 flex justify-center pt-8">
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

export default Details2;