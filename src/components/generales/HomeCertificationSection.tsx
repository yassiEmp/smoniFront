import { motion } from "framer-motion";

const HomeCertificationSection = () => {
  return (
    <section className="pb-24 pt-4 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-20">


        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left max-w-md"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#2c2876] mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Établissement Certifié Qualité
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              SMONI est fier d'être détenteur du label <span className="text-blue-600 font-bold">"Qualité des formations au sein des écoles de conduite"</span> délivré par le Ministère de l'Intérieur.
            </p>
          </motion.div>

          {/* Logo Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src="/6.png" 
              alt="Label École Conduite Qualité" 
              className="w-40 md:w-56 h-auto relative z-10 drop-shadow-xl hover:rotate-3 transition-transform duration-500"
            />
          </motion.div>

          {/* Additional Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-bold text-[#2c2876]">Formation Post-Permis Agréée</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-bold text-[#2c2876]">Intervenants Spécialisés ANTS</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default HomeCertificationSection;
