import { Link } from "react-router";
import PageHead from "@components/SEO/PageHead";

const NotFound = () => {
  return (
    <>
      <PageHead
        title="Page introuvable — Smoni"
        description="Cette page n'existe pas ou a été déplacée."
        canonicalPath="/404"
        noindex
      />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Erreur 404
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
          Page introuvable
        </h1>
        <p className="mt-4 max-w-md text-slate-600">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Retour à l'accueil
        </Link>
      </main>
    </>
  );
};

export default NotFound;
