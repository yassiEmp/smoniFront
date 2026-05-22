import { motion } from "framer-motion";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import imgLabelQualite from "@assets/blog/details7/label-ecole-qualite.png?w=240;480&format=avif;webp;png&as=picture";
import {
  IllustrationPrix,
  Illustration60Min,
  IllustrationPasDeCris,
  IllustrationRecales,
  IllustrationGarantie,
} from "./EngagementIllustrations";

const engagements = [
  {
    n: "01",
    title: "Prix tout-compris, écrit dans le contrat.",
    body: "Tous nos tarifs sont publics. Pas de \"supplément examen\", pas d'\"heures de centre\" ajoutées à la dernière minute. Ce que vous voyez = ce que vous payez.",
    Illustration: IllustrationPrix,
  },
  {
    n: "02",
    title: "1 heure de conduite = 60 minutes au volant.",
    body: "Pas de plein d'essence, pas de café, pas de \"déposer un dossier\". Heure de début et heure de fin notées sur votre livret.",
    Illustration: Illustration60Min,
  },
  {
    n: "03",
    title: "Aucun moniteur ne vous criera dessus.",
    body: "Si ça arrive, vous nous le dites. Changement gratuit, et entretien avec le moniteur concerné. C'est écrit dans la charte.",
    Illustration: IllustrationPasDeCris,
  },
  {
    n: "04",
    title: "Recalés bienvenus — sans pack 13h imposé.",
    body: "Vous venez d'une autre auto-école ou vous avez raté ? On évalue votre niveau gratuitement, sans minimum d'heures forcé.",
    Illustration: IllustrationRecales,
  },
  {
    n: "05",
    title: "Garantie financière obligatoire (loi).",
    body: "Article L.213-2 du Code de la route : votre argent est protégé. Si on ferme, vous récupérez vos leçons. Attestation sur demande.",
    Illustration: IllustrationGarantie,
  },
];

const HomeCertificationSection = () => {
  return (
    <section className="pb-24 pt-4 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-20">

        {/* Quality Certification Banner */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-28 md:mb-36 pb-12 md:pb-16 border-b border-slate-200/70">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ResponsivePicture
              picture={imgLabelQualite}
              alt="Label École Conduite Qualité"
              sizes="(min-width: 768px) 224px, 160px"
              loading="lazy"
              decoding="async"
              className="w-40 md:w-56 h-auto relative z-10 drop-shadow-xl hover:rotate-3 transition-transform duration-500"
            />
          </motion.div>

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
          {engagements.map((e, i) => {
            const Illustration = e.Illustration;
            return (
              <motion.div
                key={e.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/9] bg-[#f3f1ff]">
                  <Illustration />
                  <span
                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-bold tracking-[0.18em] text-[#2c2876]"
                    style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                  >
                    ENGAGEMENT · N°{e.n}
                  </span>
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold tabular-nums text-[#2c2876]/70"
                    style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                  >
                    {e.n} / 05
                  </span>
                </div>
                <div className="p-6 pt-5 flex-1 flex flex-col">
                  <h3 className="text-base font-extrabold text-[#2c2876] leading-snug mb-2">{e.title}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{e.body}</p>
                </div>
              </motion.div>
            );
          })}
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
