import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeFaqSection from "@components/generales/HomeFaqSection";
import Testimonials from "@components/generales/Testimonials";
import HomeTarifSection from "@components/generales/HomeTarifSection";
import PageHead from "@components/SEO/PageHead";

const Tarif = () => {
  return (
    <>
      <PageHead
        title="Tarifs permis B - Smoni Auto-Ecole Vincennes 94300"
        description="Decouvrez nos tarifs transparents pour le permis B a Vincennes (94300) : forfaits code, conduite, accompagnement et financement."
        canonicalPath="/tarifs"
      />
      <Header />
      <div className="relative overflow-hidden pt-[120px]">
        {/* Decoration */}
        <span className="absolute -left-3 -top-1 inline-block h-72 w-72 rotate-12 rounded-full bg-secondary/20"></span>
        <span className="absolute -bottom-20 -right-10 inline-block h-72 w-72 rotate-12 rounded-xl bg-secondary/10"></span>
        <span className="absolute bottom-4 left-4 inline-block h-16 w-16 rounded-full bg-secondary/20"></span>

        <HomeTarifSection />
      </div>

      <Testimonials />
      <HomeFaqSection />
      <Footer />
    </>
  );
};

export default Tarif;
