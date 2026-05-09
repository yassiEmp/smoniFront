import { motion } from "framer-motion";
import { Users, GraduationCap, Award, Briefcase } from "lucide-react";

/**
 * HomeStarSection - Redesigned for Elite Fluidity
 * Features: Full-width edge-to-edge layout, massive typography, 
 * glassmorphism accents, and brand indigo #2c2876 synchronization.
 */
const HomeStarSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const stats = [
        {
            category: "Expériences",
            value: "8+",
            label: "Années d'excellence",
            description: "En éducation routière et formation digitale de pointe.",
            icon: Award,
        },
        {
            category: "Apprenants",
            value: "1.5k+",
            label: "Élèves actifs",
            description: "Nous font confiance pour leur formation quotidienne.",
            icon: Users,
        },
        {
            category: "Moniteurs",
            value: "50+",
            label: "Experts certifiés",
            description: "Enseignants diplômés d'État à votre entière service.",
            icon: GraduationCap,
        },
        {
            category: "Services",
            value: "10+",
            label: "Solutions sur-mesure",
            description: "Un accompagnement complet pour chaque profil d'élève.",
            icon: Briefcase,
        }
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-[#f8fafc] overflow-hidden">
            {/* Ultra-Wide Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#2c2876]/[0.02] rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px]" />
            </div>

            {/* Full-Width Container (Edge-to-Edge Fluidity) */}
            <div className="w-full px-6 lg:px-12 xl:px-32 relative z-10">
                {/* Hidden SEO Heading */}
                <h2 className="sr-only">Pourquoi Smoni est la meilleure auto-école à Paris</h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="group flex flex-col items-start"
                            variants={itemVariants}
                        >
                            {/* Head Section: Large Icon & Label */}
                            <div className="flex items-center gap-4 mb-8 w-full">
                                <div className="w-14 h-14 rounded-[1.5rem] bg-white shadow-[0_10px_30px_-5px_rgba(44,40,118,0.1)] flex items-center justify-center transition-all duration-700 group-hover:rounded-2xl group-hover:bg-[#2c2876] group-hover:text-white group-hover:scale-110">
                                    <stat.icon className="w-6 h-6 transition-colors duration-700" />
                                </div>
                                <div className="h-px flex-grow bg-slate-200/60 group-hover:bg-[#2c2876]/20 transition-colors duration-700" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-[#2c2876] transition-colors duration-700">
                                    {stat.category}
                                </span>
                            </div>

                            {/* Body Section: Massive Typography */}
                            <div className="space-y-4">
                                <h2
                                    className="text-6xl lg:text-7xl xl:text-8xl 2xl:text-[110px] font-[900] text-[#2c2876] leading-none tracking-tighter transition-transform duration-700 group-hover:translate-x-2"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    {stat.value}
                                </h2>

                                <div className="space-y-2 border-l-4 border-slate-100 pl-4 group-hover:border-[#2c2876] transition-colors duration-700">
                                    <h3 className="text-xl xl:text-2xl font-black text-slate-900 leading-tight">
                                        {stat.label}
                                    </h3>
                                    <p className="text-base xl:text-lg text-slate-500 font-medium leading-relaxed max-w-[280px]">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Background Glow (Hover) */}
                            <div className="absolute -inset-8 bg-[#2c2876]/[0.01] rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HomeStarSection;