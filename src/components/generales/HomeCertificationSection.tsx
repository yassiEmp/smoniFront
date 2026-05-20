import { motion } from "framer-motion";

const engagements = [
  {
    n: "01",
    title: "Prix tout-compris, écrit dans le contrat.",
    body: "Tous nos tarifs sont publics. Pas de \"supplément examen\", pas d'\"heures de centre\" ajoutées à la dernière minute. Ce que vous voyez = ce que vous payez.",
  },
  {
    n: "02",
    title: "1 heure de conduite = 60 minutes au volant.",
    body: "Pas de plein d'essence, pas de café, pas de \"déposer un dossier\". Heure de début et heure de fin notées sur votre livret.",
  },
  {
    n: "03",
    title: "Aucun moniteur ne vous criera dessus.",
    body: "Si ça arrive, vous nous le dites. Changement gratuit, et entretien avec le moniteur concerné. C'est écrit dans la charte.",
  },
  {
    n: "04",
    title: "Recalés bienvenus — sans pack 13h imposé.",
    body: "Vous venez d'une autre auto-école ou vous avez raté ? On évalue votre niveau gratuitement, sans minimum d'heures forcé.",
  },
  {
    n: "05",
    title: "Garantie financière obligatoire (loi).",
    body: "Article L.213-2 du Code de la route : votre argent est protégé. Si on ferme, vous récupérez vos leçons. Attestation sur demande.",
  },
];

const HomeCertificationSection = () => {
  return (
    <section className="pb-24 pt-4 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-20">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#2c2876]/90 mb-3">
            Notre différence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2c2876] leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Nos 5 engagements <span className="italic text-blue-600">écrits</span>.
          </h2>
          <span className="sr-only">Auto-école Smoni à Vincennes 94300 — engagements pour les candidats au permis B, boîte automatique et moto</span>
          <p className="text-slate-600 font-medium leading-relaxed mt-4 max-w-2xl mx-auto">
            Moniteur qui crie, heures "obligatoires" la veille de l'examen, factures qui doublent — on connaît les histoires.
            On a écrit une charte pour que ça ne se passe pas ici. Elle est signée avec votre contrat.
          </p>
        </motion.div>

        {/* Engagements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {engagements.map((e, i) => (
            <motion.div
              key={e.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-2xl font-black text-[#2c2876]/20 tabular-nums">{e.n}</span>
                <h3 className="text-base font-extrabold text-[#2c2876] leading-snug">{e.title}</h3>
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{e.body}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-10">
          Auto-école déclarée • SAS Arike Bello • SIREN 915 387 013 • Agrément préfectoral sur demande
        </p>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default HomeCertificationSection;
