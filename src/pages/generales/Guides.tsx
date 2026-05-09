import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import { Link } from "react-router";
import { CgChevronRight } from "react-icons/cg";
import { motion } from "framer-motion";
import { BookOpen, Car, FileText, CheckCircle, ArrowRight } from "lucide-react";

const guidesData = [
  {
    id: 1,
    title: "Comment bien se préparer à l'examen du Code de la Route",
    category: "Code de la Route",
    excerpt: "Découvrez nos astuces pour réviser efficacement, gérer le stress et arriver serein le jour de votre examen théorique.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textLight: "text-blue-600",
    date: "12 Mars 2026",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Les 10 erreurs les plus fréquentes le jour du permis",
    category: "Conduite",
    excerpt: "Anticipez et évitez les pièges classiques lors de l'examen pratique pour maximiser vos chances de réussite du premier coup.",
    icon: <Car className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
    textLight: "text-green-600",
    date: "05 Mars 2026",
    readTime: "7 min",
  },
  {
    id: 3,
    title: "Démarches administratives : S'inscrire au permis (ANTS)",
    category: "Administratif",
    excerpt: "Un guide étape par étape pour créer votre dossier sur l'ANTS sans tracas et obtenir votre numéro NEPH rapidement.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    textLight: "text-purple-600",
    date: "28 Fév 2026",
    readTime: "4 min",
  },
  {
    id: 4,
    title: "Eco-conduite : Adoptez les bons réflexes",
    category: "Bon à savoir",
    excerpt: "L'éco-conduite est désormais évaluée lors de l'examen. Apprenez comment réduire votre de consommation et impressionner l'inspecteur.",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    textLight: "text-orange-600",
    date: "20 Fév 2026",
    readTime: "6 min",
  },
  {
    id: 5,
    title: "Conduite Supervisée vs Conduite Accompagnée (AAC)",
    category: "Formation",
    excerpt: "Comprendre les différences entre ces deux formules pour choisir la meilleure option selon votre âge et vos besoins.",
    icon: <Car className="w-6 h-6" />,
    color: "from-teal-500 to-teal-600",
    bgLight: "bg-teal-50",
    textLight: "text-teal-600",
    date: "15 Fév 2026",
    readTime: "8 min",
  },
  {
    id: 6,
    title: "Gérer l'anxiété au volant : Nos conseils d'experts",
    category: "Conseils",
    excerpt: "Des exercices de respiration et des techniques mentales pour retrouver confiance au volant et surmonter l'appréhension.",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    textLight: "text-rose-600",
    date: "10 Fév 2026",
    readTime: "5 min",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Guides = () => {
  return (
    <>
      <Header />
      <main className="pt-[120px] pb-24 relative overflow-hidden bg-slate-50 min-h-screen">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <span className="absolute -left-10 top-20 inline-block h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <span className="absolute -right-10 top-60 inline-block h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <CgChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span className="ml-1 text-sm font-bold text-primary md:ml-2">
                    Guides & Conseils
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="container mx-auto px-4 sm:px-6 mt-8 md:mt-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-4 border border-primary/20">
              RESSOURCES & SEO
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e1b4b] mb-6 leading-tight">
              Guides & <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Conseils Pratiques
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium">
              Découvrez nos articles d'experts pour réussir votre code, maîtriser la conduite et tout savoir sur les démarches administratives.
            </p>
          </motion.div>

          {/* Featured Article or Newsletter Signup (SEO friendly) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 rounded-3xl overflow-hidden bg-white shadow-xl shadow-primary/5 border border-slate-100 flex flex-col lg:flex-row items-center"
          >
            <div className="lg:w-1/2 p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                Dossier à la Une
              </div>
              <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">
                Le Guide Complet du Conducteur Novice en 2026
              </h2>
              <p className="text-slate-600 mb-8 text-lg">
                Nouvelles réglementations, aides financières, comment s'équiper... Tout ce qu'il faut savoir cette année condensé dans un guide unique.
              </p>
              <button className="flex items-center gap-3 bg-[#1e1b4b] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-fit group">
                Lire le dossier complet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="lg:w-1/2 w-full bg-gradient-to-br from-primary/10 to-blue-500/10 h-64 lg:h-full min-h-[400px] relative flex items-center justify-center p-8">
              {/* Decorative Elements for visual appeal */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <div className="relative w-full max-w-sm aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 flex items-center justify-center border-4 border-white">
                <Car className="w-32 h-32 text-primary/20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply"></div>
              </div>
            </div>
          </motion.div>

          {/* Article Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {guidesData.map((guide) => (
              <motion.article
                key={guide.id}
                variants={itemVariants}
                className="group bg-white rounded-3xl p-6 shadow-md shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Visual Flair Line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${guide.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${guide.bgLight} ${guide.textLight} transition-colors`}>
                    {guide.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {guide.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1e1b4b] mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {guide.title}
                </h3>

                <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
                  {guide.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>{guide.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{guide.readTime} de lecture</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <CgChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Bottom CTA for SEO clustering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center bg-[#1e1b4b] text-white rounded-3xl p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-6">Prêt à passer à l'action ?</h2>
              <p className="text-lg text-slate-300 mb-10">Mettez nos conseils en pratique dès aujourd'hui avec nos moniteurs expérimentés et obtenez votre permis en un temps record.</p>
              <Link to="/tarifs" className="inline-block bg-white text-[#1e1b4b] px-8 py-4 rounded-xl font-black text-lg hover:bg-primary hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">
                Découvrir nos offres
              </Link>
            </div>
            {/* Shapes */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Guides;
