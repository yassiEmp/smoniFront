import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  { slug: "conduite", title: "Cours de conduite", desc: "Leçons avec moniteurs diplômés." },
  { slug: "code-en-ligne", title: "Code en ligne", desc: "Pass Rousseau 24/7, tests illimités." },
  { slug: "passerelle", title: "Passerelle B78", desc: "Boîte auto vers manuelle en 7h." },
  { slug: "accompagnement", title: "Accompagnement examen", desc: "Véhicule + accompagnateur agréé." },
  { slug: "location", title: "Location véhicule", desc: "Voiture double-commande à la carte." },
  { slug: "post-permis", title: "Formation post-permis", desc: "Période probatoire réduite." },
  { slug: "actualisation", title: "Renouvellement", desc: "Prolongez votre formation." },
  { slug: "fabrication-permis", title: "Fabrication du permis", desc: "Accompagnement post-réussite." },
];

interface RelatedServicesProps {
  currentSlug: string;
  limit?: number;
}

const RelatedServices = ({ currentSlug, limit = 3 }: RelatedServicesProps) => {
  const others = SERVICES.filter((s) => s.slug !== currentSlug).slice(0, limit);

  return (
    <section className="bg-slate-50 border-t border-slate-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1e1b4b] mb-2">
          Nos autres formations
        </h2>
        <p className="text-slate-600 mb-8">
          Découvrez les services Smoni qui pourraient vous intéresser.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((s) => (
            <Link
              key={s.slug}
              to={`/${s.slug}`}
              className="group block rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <h3 className="text-lg font-bold text-[#1e1b4b] mb-2 group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                En savoir plus
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
