import { Suspense, lazy } from "react";
import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeHeroSection from "@components/generales/HomeHeroSection";
import HomeCertificationSection from "@components/generales/HomeCertificationSection";
import HomeStarSection from "@components/generales/HomeStarSection";
import CookieConsent from "react-cookie-consent";
import { motion } from "framer-motion";
import PageHead from "@components/SEO/PageHead";
import JsonLd from "@components/SEO/JsonLd";
import { drivingSchoolSchema } from "@components/SEO/schemas";

// Lazy load non-critical sections below the fold
const HomeGroupeSection = lazy(() => import("@components/generales/HomeGroupeSection"));
const HomeFeaturesSection = lazy(() => import("@components/generales/HomeFeaturesSection"));
const HomeImpactSection = lazy(() => import("@components/generales/HomeImpactSection"));
const HomeUnicornSection = lazy(() => import("@components/generales/HomeUnicornSection"));
const HomeTarifSection = lazy(() => import("@components/generales/HomeTarifSection"));
const HomeStepSection = lazy(() => import("@components/generales/HomeStepSection"));
const Testimonials = lazy(() => import("@components/generales/Testimonials"));
const HomeNewStudentSection = lazy(() => import("@components/generales/HomeNewStudentSection"));
const HomeLocationSection = lazy(() => import("@components/generales/HomeLocationSection"));
const HomeFaqSection = lazy(() => import("@components/generales/HomeFaqSection"));

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
        description="Auto-école Smoni à Vincennes (94300) : permis B boîte manuelle et automatique, code en ligne 24/7, stage accéléré, accompagnement examen. Tarifs transparents."
        canonicalPath="/"
      />
      <JsonLd data={drivingSchoolSchema()} />
      <Header />
      <main>
        {/* Critical Path: Loadded immediately */}
        <div id="hero"><HomeHeroSection /></div>
        <HomeCertificationSection />
        <div id="stats"><HomeStarSection /></div>

        {/* Deferred Loading: Loaded as you scroll */}
        <Suspense fallback={<div className="h-96 w-full bg-slate-50 animate-pulse rounded-3xl" />}>
          <FadeInSection id="groupe"><HomeGroupeSection /></FadeInSection>
          <FadeInSection id="features"><HomeFeaturesSection /></FadeInSection>
          <FadeInSection id="impact"><HomeImpactSection /></FadeInSection>
          <FadeInSection id="unicorn"><HomeUnicornSection /></FadeInSection>
          <FadeInSection id="tarifs"><HomeTarifSection /></FadeInSection>
          <FadeInSection id="etapes"><HomeStepSection /></FadeInSection>
          <FadeInSection id="avis"><Testimonials /></FadeInSection>
          <FadeInSection id="inscription"><HomeNewStudentSection /></FadeInSection>
          <FadeInSection id="localisation"><HomeLocationSection /></FadeInSection>
          <FadeInSection id="faq"><HomeFaqSection /></FadeInSection>
        </Suspense>
      </main>

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
      <Footer />
    </>
  );
};

export default Home;
