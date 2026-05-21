import { Link } from "react-router";
import Header from "@components/generales/Header";
import Footer from "@components/generales/Footer";
import PageHead from "@components/SEO/PageHead";
import JsonLd from "@components/SEO/JsonLd";
import { breadcrumbSchema } from "@components/SEO/schemas";
import { ArrowRight, GraduationCap, Award, MapPin } from "lucide-react";

const SITE_URL = "https://smoni.fr";

// Person schema for E-E-A-T: every blog article links back here, so the
// driving school's organisation schema gets a real human author authority signal.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/equipe/arike#person`,
  name: "Arike",
  jobTitle: "Directrice de l'auto-école Smoni",
  url: `${SITE_URL}/equipe/arike`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "BEPECASER",
      name: "Brevet pour l'Exercice de la Profession d'Enseignant de la Conduite Automobile et de la Sécurité Routière",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Titre Pro ECSR",
      name: "Titre Professionnel Enseignant de la Conduite et de la Sécurité Routière",
    },
  ],
};

const EquipeArike = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <PageHead
        title="Arike — Directrice de Smoni Auto-École Vincennes"
        description="Arike, directrice de l'auto-école Smoni à Vincennes : titulaire du BEPECASER et du Titre Pro ECSR. Découvrez son parcours et sa pédagogie."
        canonicalPath="/equipe/arike"
      />
      <JsonLd
        data={[
          personSchema,
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Équipe", path: "/equipe/arike" },
            { name: "Arike", path: "/equipe/arike" },
          ]),
        ]}
      />
      <Header />

      <main className="pt-[120px] pb-24 px-6 lg:px-16 max-w-5xl mx-auto">
        <nav className="text-xs uppercase tracking-widest text-slate-400 mb-8">
          <Link to="/" className="hover:text-[#2c2876]">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2c2876]">Équipe</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Photo placeholder — replace with real portrait when client provides */}
          <div className="aspect-square w-full bg-gradient-to-br from-[#2c2876]/10 to-blue-500/10 rounded-3xl flex items-center justify-center border border-[#2c2876]/10">
            {/* TODO: replace with real photo (src/assets/team/arike.jpg) */}
            <img
              src="/avatars/apprenant-1.jpg"
              alt="Arike, directrice de l'auto-école Smoni à Vincennes"
              className="w-full h-full object-cover rounded-3xl opacity-90"
              loading="eager"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2c2876]/10 text-[#2c2876] text-[10px] font-black uppercase tracking-[0.2em]">
                Directrice & Fondatrice
              </div>
              <h1
                className="text-4xl md:text-6xl font-[900] text-[#2c2876] leading-tight tracking-tighter"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Arike
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Directrice de l'auto-école Smoni à Vincennes (94300).
              </p>
            </div>

            {/* PLACEHOLDER BIO — to be replaced with client-supplied copy */}
            <div className="prose prose-slate max-w-none space-y-4 text-slate-700">
              <p>
                Titulaire du <strong>BEPECASER</strong> et du <strong>Titre Professionnel ECSR</strong>{" "}
                (Enseignant de la Conduite et de la Sécurité Routière), Arike a fondé Smoni en 2022
                avec une idée simple : redonner du sens à l'apprentissage de la conduite à Vincennes
                et dans le Val-de-Marne.
              </p>
              <p>
                Forte de plusieurs années d'expérience comme monitrice, elle a observé les
                travers du secteur — heures imposées, packs opaques, élèves recalés laissés
                de côté — et conçu Smoni comme l'antidote : tarifs affichés, pédagogie
                progressive, accompagnement personnalisé jusqu'à l'examen, y compris pour
                les profils anxieux ou en reprise.
              </p>
              <p className="text-sm italic text-slate-500">
                {/* TODO: replace this placeholder bio with the client's final copy */}
                (Biographie provisoire — à remplacer par le texte définitif fourni par la
                directrice.)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/60">
                <GraduationCap className="w-6 h-6 text-[#2c2876] mb-2" />
                <div className="text-xs font-black uppercase tracking-wider text-[#2c2876]">BEPECASER</div>
                <p className="text-xs text-slate-500 mt-1">Diplôme d'État de moniteur</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/60">
                <Award className="w-6 h-6 text-[#2c2876] mb-2" />
                <div className="text-xs font-black uppercase tracking-wider text-[#2c2876]">Titre Pro ECSR</div>
                <p className="text-xs text-slate-500 mt-1">Enseignement de la conduite</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/60">
                <MapPin className="w-6 h-6 text-[#2c2876] mb-2" />
                <div className="text-xs font-black uppercase tracking-wider text-[#2c2876]">Vincennes 94300</div>
                <p className="text-xs text-slate-500 mt-1">62 rue de la Jarry</p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2c2876] text-white rounded-full font-bold text-sm hover:bg-[#2c2876]/90 transition-colors"
              >
                Échanger avec Arike <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EquipeArike;
