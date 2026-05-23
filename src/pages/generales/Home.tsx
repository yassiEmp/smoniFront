import { Suspense, lazy } from "react";
import { ClientOnly } from "vite-react-ssg";
import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeHeroSection from "@components/generales/HomeHeroSection";
import HomeCertificationSection from "@components/generales/HomeCertificationSection";
import HomeStarSection from "@components/generales/HomeStarSection";
// SEO-critical sections: rendered in SSG HTML (no ClientOnly wrapper).
import HomeFaqSection from "@components/generales/HomeFaqSection";
import HomeTarifSection from "@components/generales/HomeTarifSection";
import { motion } from "framer-motion";
import PageHead from "@components/SEO/PageHead";
import JsonLd from "@components/SEO/JsonLd";
import { drivingSchoolSchema, faqSchema } from "@components/SEO/schemas";
import { faqData } from "@components/generales/HomeFaqSection";

// react-cookie-consent is a CJS module that doesn't interop cleanly through
// Vite's SSR externalization. Load it client-only via dynamic import.
const CookieConsent = lazy(() => import("react-cookie-consent"));

// Lazy load non-critical sections below the fold
const HomeGroupeSection = lazy(() => import("@components/generales/HomeGroupeSection"));
const HomeFeaturesSection = lazy(() => import("@components/generales/HomeFeaturesSection"));
const HomeImpactSection = lazy(() => import("@components/generales/HomeImpactSection"));
const HomeUnicornSection = lazy(() => import("@components/generales/HomeUnicornSection"));
const HomeStepSection = lazy(() => import("@components/generales/HomeStepSection"));
const Testimonials = lazy(() => import("@components/generales/Testimonials"));
const HomeNewStudentSection = lazy(() => import("@components/generales/HomeNewStudentSection"));
const HomeLocationSection = lazy(() => import("@components/generales/HomeLocationSection"));
const HomeRecalesSection = lazy(() => import("@components/generales/HomeRecalesSection"));

// Performance-optimized Fade In wrapper
const FadeInSection = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <>
      <PageHead
        title="Auto-école Smoni Vincennes (94300) — Permis B, code, conduite"
        description="Auto-école Smoni à Vincennes (94300) : permis B boîte manuelle et automatique, code en ligne 24/7, stage accéléré. Tarifs transparents."
        canonicalPath="/"
      />
      <JsonLd data={drivingSchoolSchema()} />
      <JsonLd
        data={faqSchema(
          faqData.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />
      <Header />
      <main>
        {/* Critical Path: Loadded immediately */}
        <div id="hero"><HomeHeroSection /></div>
        <HomeCertificationSection />
        <div id="stats"><HomeStarSection /></div>

        {/* Deferred Loading: client-only (React.lazy doesn't SSR well here).
            Fallback heights are tuned per-section to match real rendered height
            and avoid CLS when content swaps in. */}
        <ClientOnly>
          {() => (
            <>
              <Suspense fallback={<div className="min-h-[900px] w-full bg-slate-50/50" />}>
                <FadeInSection id="groupe"><HomeGroupeSection /></FadeInSection>
              </Suspense>
              <Suspense fallback={<div className="min-h-[700px] w-full bg-slate-50/50" />}>
                <FadeInSection id="features"><HomeFeaturesSection /></FadeInSection>
              </Suspense>
              <Suspense fallback={<div className="min-h-[600px] w-full bg-slate-50/50" />}>
                <FadeInSection id="impact"><HomeImpactSection /></FadeInSection>
              </Suspense>
              <Suspense fallback={<div className="min-h-[700px] w-full bg-slate-50/50" />}>
                <FadeInSection id="unicorn"><HomeUnicornSection /></FadeInSection>
              </Suspense>
              <Suspense fallback={<div className="min-h-[820px] w-full bg-slate-50/50" />}>
                <FadeInSection id="recales"><HomeRecalesSection /></FadeInSection>
              </Suspense>
            </>
          )}
        </ClientOnly>

        {/* SEO-critical: prerendered in SSG HTML (Tarif + FAQ surface organic queries). */}
        <FadeInSection id="tarifs"><HomeTarifSection /></FadeInSection>

        <ClientOnly>
          {() => (
            <>
              <Suspense fallback={<div className="min-h-[800px] w-full bg-slate-50/50" />}>
                <FadeInSection id="etapes"><HomeStepSection /></FadeInSection>
              </Suspense>
              <Suspense fallback={<div className="min-h-[600px] w-full bg-slate-50/50" />}>
                <FadeInSection id="avis"><Testimonials /></FadeInSection>
              </Suspense>
              <Suspense fallback={<div className="min-h-[700px] w-full bg-slate-50/50" />}>
                <FadeInSection id="inscription"><HomeNewStudentSection /></FadeInSection>
              </Suspense>
              <Suspense fallback={<div className="min-h-[600px] w-full bg-slate-50/50" />}>
                <FadeInSection id="localisation"><HomeLocationSection /></FadeInSection>
              </Suspense>
            </>
          )}
        </ClientOnly>

        {/* SEO-critical: FAQ schema needs the questions in initial HTML too. */}
        <FadeInSection id="faq"><HomeFaqSection /></FadeInSection>
      </main>

      <ClientOnly>
        {() => (
      <Suspense fallback={null}>
      <CookieConsent
        location="bottom"
        buttonText="J'ai compris"
        cookieName="smoni_consent"
        style={{ background: "#1e1b4b", color: "#fff", borderRadius: "20px", margin: "20px", width: "calc(100% - 40px)", left: "0" }}
        buttonStyle={{
          background: "#2c2876",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 900,
          borderRadius: "12px",
          padding: "10px 24px"
        }}
        expires={150}
      >
        <span className="text-sm font-medium">Ce site Web utilise des cookies pour améliorer votre expérience utilisateur.</span>
      </CookieConsent>
      </Suspense>
        )}
      </ClientOnly>
      <Footer />
    </>
  );
};

export default Home;
