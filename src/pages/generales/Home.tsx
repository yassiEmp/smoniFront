import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ClientOnly } from "vite-react-ssg";
import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeHeroSection from "@components/generales/HomeHeroSection";
import HomeCertificationSection from "@components/generales/HomeCertificationSection";
import HomeStarSection from "@components/generales/HomeStarSection";
import HomeRecalesSection from "@components/generales/HomeRecalesSection";
import HomeAdultesSection from "@components/generales/HomeAdultesSection";
// SEO-critical sections: rendered in SSG HTML (no ClientOnly wrapper).
import HomeFaqSection from "@components/generales/HomeFaqSection";
import HomeTarifSection from "@components/generales/HomeTarifSection";
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
const HomeStepSection = lazy(() => import("@components/generales/HomeStepSection"));
const Testimonials = lazy(() => import("@components/generales/Testimonials"));
const HomeNewStudentSection = lazy(() => import("@components/generales/HomeNewStudentSection"));
const HomeLocationSection = lazy(() => import("@components/generales/HomeLocationSection"));

// CSS-only fade+blur reveal — no framer-motion. SSR-safe (server renders the
// initial class; client toggles `is-visible` via IntersectionObserver). Avoids
// React 19 hydration mismatches that came from framer-motion's inline styles.
const FadeInSection = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className={`fade-blur-in${visible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <PageHead
        title="Auto-école Smoni Vincennes (94300) — Permis B, boîte auto, code"
        description="Auto-école Smoni à Vincennes (94300) : permis B boîte manuelle et automatique, code en ligne 24/7, stage accéléré. Prix transparents, recalés bienvenus."
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
            </>
          )}
        </ClientOnly>

        <div id="adultes"><HomeAdultesSection /></div>

        <div id="recales"><HomeRecalesSection /></div>

        {/* SEO-critical: prerendered in SSG HTML (Tarif + FAQ surface organic queries). */}
        <div id="tarifs"><HomeTarifSection /></div>

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
        <div id="faq"><HomeFaqSection /></div>
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
