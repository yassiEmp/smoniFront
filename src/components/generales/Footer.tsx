import { Facebook, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router";

const INDIGO_DEEP = "#1e1b4b";
const BLUE = "#3b82f6";
const BLUE_SOFT = "#93b8fb";
const INDIGO_40 = "#a4a2cc";
const PAPER = "#ffffff";

const navLinks = [
  { name: "Accueil", path: "/", num: "01" },
  { name: "À propos", path: "/a-propos", num: "02" },
  { name: "Nos services", path: "/services", num: "03" },
  { name: "Tarifs & forfaits", path: "/tarifs", num: "04" },
  { name: "Contactez-nous", path: "/contact", num: "05" },
  { name: "Ressources & blog", path: "/ressources", num: "06" },
];

const serviceLinks = [
  { name: "Location double commande", path: "/location" },
  { name: "Permis B", path: "/conduite" },
  { name: "Actualisation de conduite", path: "/actualisation" },
  { name: "Fabrication de permis", path: "/fabrication-permis" },
  { name: "Passerelle boîte auto", path: "/passerelle" },
  { name: "Code de la route en ligne", path: "/code-en-ligne" },
  { name: "Accompagnement examen", path: "/accompagnement" },
  { name: "Formation post-permis", path: "/post-permis" },
];

const legalLinks = [
  { name: "Mentions légales", path: "/politique-confidentialite" },
  { name: "Confidentialité", path: "/politique-confidentialite" },
  { name: "CGU / CGV", path: "/cgu" },
];

const ticketRows = [
  { label: "Délai", value: "2 min", sub: "pour s'inscrire", accent: true },
  { label: "Financement", value: "100 % CPF", sub: "Reste à charge 0 €" },
  { label: "Zone", value: "Paris · IDF", sub: "75 · 92 · 93 · 94" },
  { label: "Flotte", value: "100 % élec.", sub: "Boîte automatique" },
];

const mono = '"JetBrains Mono", ui-monospace, monospace';
const display = '"Outfit", sans-serif';

const ColTitle = ({ children }: { children: React.ReactNode }) => (
  <h3
    className="mb-5 uppercase text-white"
    style={{ fontFamily: mono, fontWeight: 700, fontSize: 10.5, letterSpacing: "0.24em" }}
  >
    <span
      aria-hidden
      className="inline-block align-middle mr-2.5"
      style={{ width: 18, height: 1, background: BLUE, transform: "translateY(-3px)" }}
    />
    {children}
  </h3>
);

const NavLink = ({ to, label, num, onNav }: { to: string; label: string; num?: string; onNav: (p: string) => void }) => (
  <li>
    <span
      onClick={() => onNav(to)}
      className="group inline-flex items-center gap-2.5 cursor-pointer transition-all hover:translate-x-0.5"
      style={{ color: "#d6d3ee", fontWeight: 500, fontSize: 14.5 }}
    >
      <span
        aria-hidden
        className="block rounded-full transition-all group-hover:scale-[1.4]"
        style={{ width: 6, height: 6, background: "rgba(255,255,255,0.18)" }}
      />
      <span className="group-hover:text-white transition-colors">{label}</span>
      {num && (
        <span
          style={{ fontFamily: mono, fontWeight: 600, fontSize: 10, letterSpacing: "0.22em", color: INDIGO_40, marginLeft: 4 }}
        >
          {num}
        </span>
      )}
    </span>
  </li>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: INDIGO_DEEP, fontFamily: '"Inter", system-ui, sans-serif', isolation: "isolate" }}
    >
      {/* halftone dot field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.2px)",
          backgroundSize: "6px 6px",
        }}
      />
      {/* soft brand halo top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          top: -160,
          left: -120,
          width: 720,
          height: 720,
          borderRadius: 9999,
          background: "radial-gradient(closest-side, rgba(59,130,246,0.18), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 2xl:px-16">

        {/* ============ CTA BANNER ============ */}
        <section
          className="border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)", padding: "96px 0 80px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20 items-end">
            <div>
              <span
                className="inline-flex items-center gap-2.5 uppercase"
                style={{
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  color: "#d6d3ee",
                }}
              >
                Inscription en 2 min
              </span>

              <h2
                className="text-white"
                style={{
                  margin: "22px 0 18px",
                  fontFamily: display,
                  fontWeight: 900,
                  fontSize: "clamp(44px, 6.4vw, 96px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                  textWrap: "balance",
                }}
              >
                Prêt à obtenir<br />
                votre permis à{" "}
                <span
                  className="relative inline-block italic"
                  style={{ color: BLUE, fontWeight: 800 }}
                >
                  Paris&nbsp;&amp;&nbsp;Île-de-France
                  <span
                    aria-hidden
                    className="absolute left-0"
                    style={{ right: "6%", bottom: "0.06em", height: "0.12em", background: BLUE, opacity: 0.22, borderRadius: 2 }}
                  />
                </span>
                &nbsp;?
              </h2>

              <p
                style={{
                  margin: 0,
                  maxWidth: 540,
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "#bfbcdb",
                  textWrap: "pretty",
                }}
              >
                Rejoignez l'auto-école nouvelle génération.<br />
                Simple, rapide et 100&nbsp;% financé par votre CPF.
              </p>

              <div className="flex flex-wrap items-center gap-[18px]" style={{ marginTop: 28 }}>
                <button
                  type="button"
                  onClick={() => handleNavigation("/inscription")}
                  className="inline-flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                  style={{
                    padding: "18px 26px",
                    borderRadius: 9999,
                    background: PAPER,
                    color: INDIGO_DEEP,
                    fontFamily: display,
                    fontWeight: 700,
                    fontSize: 17,
                    letterSpacing: "-0.005em",
                    boxShadow: "0 18px 40px -18px rgba(59,130,246,0.55), 0 2px 0 rgba(255,255,255,0.6) inset",
                  }}
                >
                  S'inscrire en 2 minutes
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center rounded-full text-white"
                    style={{ width: 22, height: 22, background: BLUE }}
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <span
                  className="uppercase"
                  style={{ fontFamily: mono, fontWeight: 600, fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.55)" }}
                >
                  Sans engagement · CPF accepté
                </span>
              </div>
            </div>

            {/* Editorial ticket card */}
            <aside
              aria-label="Inscription en bref"
              className="relative overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 22,
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                backdropFilter: "blur(8px)",
                padding: "26px 28px 24px",
              }}
            >
              <header
                className="flex items-center justify-between gap-4"
                style={{ paddingBottom: 16, borderBottom: "1px dashed rgba(255,255,255,0.16)" }}
              >
                <span
                  className="uppercase"
                  style={{ fontFamily: mono, fontWeight: 700, fontSize: 10, letterSpacing: "0.22em", color: "#c9c6e5" }}
                >
                  Smoni · Dossier express
                </span>
                <span
                  className="uppercase"
                  style={{ fontFamily: mono, fontWeight: 700, fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.5)" }}
                >
                  N°2026
                </span>
              </header>
              <div className="grid grid-cols-2 gap-x-[18px] gap-y-[22px]" style={{ paddingTop: 18 }}>
                {ticketRows.map((row) => (
                  <div key={row.label}>
                    <span
                      className="block uppercase"
                      style={{ fontFamily: mono, fontWeight: 600, fontSize: 9.5, letterSpacing: "0.22em", color: INDIGO_40, marginBottom: 6 }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="block"
                      style={{
                        fontFamily: display,
                        fontWeight: 800,
                        fontSize: 18,
                        letterSpacing: "-0.01em",
                        color: row.accent ? BLUE : "#ffffff",
                        lineHeight: 1.15,
                      }}
                    >
                      {row.value}
                    </span>
                    <span
                      className="block"
                      style={{ marginTop: 3, fontWeight: 500, fontSize: 12.5, color: INDIGO_40 }}
                    >
                      {row.sub}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ============ MAIN GRID ============ */}
        <section
          className="grid gap-12 sm:grid-cols-[1.4fr_1fr_1fr] xl:grid-cols-[1.6fr_0.9fr_1.1fr_1.2fr] sm:gap-x-12 sm:gap-y-14 xl:gap-16"
          style={{ padding: "64px 0 56px" }}
          aria-labelledby="sf-main-title"
        >
          <h2 id="sf-main-title" className="sr-only">Plan du site</h2>

          {/* Brand + newsletter */}
          <div>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-3.5 no-underline"
              aria-label="Smoni — Accueil"
            >
              <span
                aria-hidden
                className="relative inline-flex items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: PAPER,
                  color: INDIGO_DEEP,
                  fontFamily: display,
                  fontWeight: 900,
                  fontSize: 28,
                  letterSpacing: "-0.04em",
                  boxShadow: "0 18px 40px -18px rgba(59,130,246,0.5)",
                }}
              >
                S
                <span
                  aria-hidden
                  className="absolute"
                  style={{
                    right: -3,
                    bottom: -3,
                    width: 14,
                    height: 14,
                    borderRadius: 9999,
                    background: BLUE,
                    border: `3px solid ${INDIGO_DEEP}`,
                  }}
                />
              </span>
              <span
                className="text-white"
                style={{ fontFamily: display, fontWeight: 900, fontSize: 28, letterSpacing: "-0.03em" }}
              >
                smoni
              </span>
            </Link>
            <p
              style={{
                margin: "22px 0 0",
                maxWidth: 360,
                fontWeight: 500,
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "#bfbcdb",
                textWrap: "pretty",
              }}
            >
              Smoni est l'auto-école digitale de référence à Paris.<br />
              Formation premium sur véhicules électriques, accompagnement personnalisé et financement&nbsp;CPF.
            </p>

            <form
              className="mt-7"
              action="#"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="sf-email"
                className="block uppercase"
                style={{ marginBottom: 10, fontFamily: mono, fontWeight: 700, fontSize: 10, letterSpacing: "0.22em", color: "#c9c6e5" }}
              >
                Newsletter — 1 email / mois
              </label>
              <div
                className="flex items-center gap-2 transition-colors focus-within:!border-[#3b82f6]"
                style={{
                  padding: "6px 6px 6px 16px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.04)",
                  maxWidth: 380,
                }}
              >
                <input
                  id="sf-email"
                  type="email"
                  placeholder="votre@email.fr"
                  autoComplete="email"
                  className="flex-1 bg-transparent outline-none text-white"
                  style={{ border: 0, padding: "10px 4px", fontWeight: 500, fontSize: 14.5 }}
                />
                <button
                  type="submit"
                  className="cursor-pointer transition-[filter] hover:brightness-110"
                  style={{
                    border: 0,
                    padding: "10px 18px",
                    borderRadius: 9999,
                    background: BLUE,
                    color: "#ffffff",
                    fontFamily: display,
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.02em",
                  }}
                >
                  S'inscrire
                </button>
              </div>
              <p
                className="uppercase"
                style={{ margin: "10px 0 0", fontFamily: mono, fontWeight: 600, fontSize: 9.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}
              >
                Pas de spam · désinscription en 1 clic
              </p>
            </form>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/SmoniAE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center transition-colors"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#d6d3ee",
                }}
              >
                <Facebook className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.instagram.com/smoni_ame/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center transition-colors"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#d6d3ee",
                }}
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation principale">
            <ColTitle>Navigation</ColTitle>
            <ul className="grid gap-[13px] list-none m-0 p-0">
              {navLinks.map((l) => (
                <NavLink key={l.name} to={l.path} label={l.name} num={l.num} onNav={handleNavigation} />
              ))}
            </ul>
          </nav>

          {/* Formations */}
          <nav aria-label="Nos formations">
            <ColTitle>Nos formations</ColTitle>
            <ul className="grid gap-[13px] list-none m-0 p-0">
              {serviceLinks.map((l) => (
                <NavLink key={l.name} to={l.path} label={l.name} onNav={handleNavigation} />
              ))}
            </ul>
          </nav>

          {/* Contact — editorial agency card */}
          <div>
            <ColTitle>Auto-école Paris</ColTitle>
            <article
              className="relative overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 22,
                background: "#2d2a6e",
                isolation: "isolate",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.2px)",
                  backgroundSize: "6px 6px",
                }}
              />
              <header
                className="relative z-10 flex items-center justify-between gap-3"
                style={{ padding: "20px 22px 18px", borderBottom: "1px dashed rgba(255,255,255,0.14)" }}
              >
                <span
                  className="uppercase"
                  style={{ fontFamily: mono, fontWeight: 700, fontSize: 10, letterSpacing: "0.22em", color: "#c9c6e5" }}
                >
                  Smoni · Agence unique
                </span>
                <span
                  className="inline-flex items-center gap-2 uppercase"
                  style={{ fontFamily: mono, fontWeight: 700, fontSize: 9.5, letterSpacing: "0.22em", color: BLUE_SOFT }}
                >
                  <span
                    aria-hidden
                    style={{ width: 6, height: 6, borderRadius: 9999, background: BLUE, boxShadow: "0 0 0 4px rgba(59,130,246,0.18)" }}
                  />
                  Ouvert · 09h–19h
                </span>
              </header>

              <div
                className="relative z-10 grid items-start"
                style={{ padding: "22px 22px 20px", gridTemplateColumns: "auto 1fr", gap: 16 }}
              >
                <span
                  aria-hidden
                  className="relative inline-flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: PAPER,
                    color: INDIGO_DEEP,
                    boxShadow: "0 12px 28px -14px rgba(0,0,0,0.6)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 19s6-5 6-10A6 6 0 1 0 5 9c0 5 6 10 6 10Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
                    <circle cx="11" cy="9" r="2" fill="currentColor" />
                  </svg>
                  <span
                    aria-hidden
                    className="absolute"
                    style={{
                      right: -3,
                      bottom: -3,
                      width: 12,
                      height: 12,
                      borderRadius: 9999,
                      background: BLUE,
                      border: `2px solid ${INDIGO_DEEP}`,
                    }}
                  />
                </span>
                <div>
                  <span
                    className="block uppercase"
                    style={{ fontFamily: mono, fontWeight: 700, fontSize: 9.5, letterSpacing: "0.22em", color: INDIGO_40, marginBottom: 6 }}
                  >
                    Vincennes · 94300
                  </span>
                  <p
                    className="text-white"
                    style={{ margin: 0, fontFamily: display, fontWeight: 800, fontSize: 22, letterSpacing: "-0.015em", lineHeight: 1.15 }}
                  >
                    62 rue de la Jarry
                  </p>
                  <p style={{ margin: "4px 0 12px", fontWeight: 500, fontSize: 13, color: INDIGO_40 }}>
                    Val-de-Marne · 4&nbsp;min du RER&nbsp;A
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=62+rue+de+la+Jarry,+Vincennes"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 uppercase no-underline transition-colors"
                    style={{
                      fontFamily: mono,
                      fontWeight: 700,
                      fontSize: 10.5,
                      letterSpacing: "0.18em",
                      color: BLUE_SOFT,
                      paddingBottom: 2,
                      borderBottom: "1px dashed rgba(147,184,251,0.35)",
                    }}
                  >
                    Itinéraire
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6h7M5.5 2.5 9 6 5.5 9.5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* matrix: phone / email / hours / transports */}
              <div
                className="relative z-10 grid grid-cols-2"
                style={{ borderTop: "1px dashed rgba(255,255,255,0.14)" }}
              >
                {[
                  {
                    label: "Téléphone",
                    icon: (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 3.2c0-.4.3-.7.7-.7h1.1c.4 0 .7.3.8.6l.3 1.4c.1.3-.1.7-.4.9l-.6.4a5.5 5.5 0 0 0 2 2l.5-.6c.2-.3.5-.4.9-.4l1.4.3c.4.1.6.4.6.8v1.1c0 .5-.3.8-.8.8A7.2 7.2 0 0 1 2.5 3.2Z" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
                      </svg>
                    ),
                    value: <a href="tel:+33749464978" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dashed rgba(255,255,255,0.18)" }}>+33&nbsp;7&nbsp;49&nbsp;46&nbsp;49&nbsp;78</a>,
                    sub: "Lun–Sam · 9h–19h",
                    accent: true,
                  },
                  {
                    label: "Email",
                    icon: (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="1.6" y="2.6" width="8.8" height="6.8" rx="1" stroke="currentColor" strokeWidth={1.2} />
                        <path d="m2 3.4 4 3 4-3" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
                      </svg>
                    ),
                    value: <a href="mailto:contact@smoni.fr" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dashed rgba(255,255,255,0.18)" }}>contact@smoni.fr</a>,
                    sub: "Réponse sous 24h",
                  },
                  {
                    label: "Horaires",
                    icon: (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth={1.2} />
                        <path d="M6 3.6V6l1.6 1" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
                      </svg>
                    ),
                    value: "9h–19h",
                    sub: "Lun–Sam · Dim. fermé",
                  },
                  {
                    label: "Transports",
                    icon: (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="1.6" y="3.2" width="8.8" height="5.6" rx="1" stroke="currentColor" strokeWidth={1.2} />
                        <path d="M4 3.2V2h4v1.2M1.6 6h8.8" stroke="currentColor" strokeWidth={1.2} />
                      </svg>
                    ),
                    value: "RER A · M°1",
                    sub: "Vincennes · Bérault",
                  },
                ].map((cell, i) => {
                  const isRight = i % 2 === 1;
                  const isBottomRow = i >= 2;
                  return (
                    <div
                      key={cell.label}
                      style={{
                        padding: "16px 22px",
                        borderRight: isRight ? "0" : "1px dashed rgba(255,255,255,0.14)",
                        borderTop: isBottomRow ? "1px dashed rgba(255,255,255,0.14)" : "0",
                        background: cell.accent ? "rgba(59,130,246,0.06)" : "transparent",
                      }}
                    >
                      <span
                        className="flex items-center gap-2 uppercase"
                        style={{
                          fontFamily: mono,
                          fontWeight: 700,
                          fontSize: 9.5,
                          letterSpacing: "0.22em",
                          color: cell.accent ? BLUE_SOFT : INDIGO_40,
                          marginBottom: 6,
                        }}
                      >
                        {cell.icon}
                        {cell.label}
                      </span>
                      <p
                        className="text-white m-0"
                        style={{ fontFamily: display, fontWeight: 800, fontSize: 14.5, letterSpacing: "-0.005em", lineHeight: 1.25, wordBreak: "break-word" }}
                      >
                        {cell.value}
                      </p>
                      <span
                        className="block"
                        style={{ marginTop: 3, fontWeight: 500, fontSize: 11.5, color: INDIGO_40 }}
                      >
                        {cell.sub}
                      </span>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
        </section>

        {/* ============ TRUST STRIP ============ */}
        <section
          className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] sm:items-center gap-4 sm:gap-7"
          style={{ padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          aria-label="Certifications & financements"
        >
          <span
            className="uppercase text-white"
            style={{ fontFamily: mono, fontWeight: 700, fontSize: 10.5, letterSpacing: "0.24em" }}
          >
            Agréés · Certifiés
          </span>
          <div className="flex flex-wrap gap-2.5">
            {[
              { mark: "CPF", text: "Permis financé", markBg: PAPER, markColor: INDIGO_DEEP },
              { mark: "1€", text: "Permis à 1 € par jour", markBg: PAPER, markColor: INDIGO_DEEP },
              { mark: "Q", text: "Qualiopi", markBg: BLUE, markColor: "#fff", cert: { href: "/qualiopi-cert-smoni.pdf", label: "voir le certificat" } },
              { mark: "★", text: "Label Qualité Auto-école", markBg: PAPER, markColor: INDIGO_DEEP },
            ].map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-2.5"
                style={{
                  padding: "9px 14px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.04)",
                  color: "#e8e6f7",
                  fontWeight: 600,
                  fontSize: 12.5,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontFamily: display,
                    fontWeight: 900,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: b.markColor,
                    background: b.markBg,
                    padding: "3px 7px",
                    borderRadius: 6,
                  }}
                >
                  {b.mark}
                </span>
                {b.text}
                {b.cert && (
                  <a
                    href={b.cert.href}
                    target="_blank"
                    rel="noreferrer"
                    className="uppercase no-underline transition-colors hover:text-white"
                    style={{ fontFamily: mono, fontWeight: 600, fontSize: 10.5, letterSpacing: "0.18em", color: BLUE_SOFT }}
                  >
                    {b.cert.label}
                  </a>
                )}
              </span>
            ))}
          </div>
          <nav
            className="flex flex-wrap gap-[22px] uppercase"
            style={{ fontFamily: mono, fontWeight: 600, fontSize: 10.5, letterSpacing: "0.2em" }}
            aria-label="Mentions légales"
          >
            {legalLinks.map((l) => (
              <span
                key={l.name}
                onClick={() => handleNavigation(l.path)}
                className="cursor-pointer transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {l.name}
              </span>
            ))}
          </nav>
        </section>

        {/* ============ BASELINE ============ */}
        <section
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:items-center gap-3.5 lg:gap-7"
          style={{ padding: "26px 0 22px", fontFamily: mono, fontWeight: 500, fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
        >
          <p className="m-0">
            <strong style={{ color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>SMONI Auto-École</strong> — SIREN&nbsp;915&nbsp;387&nbsp;013 · 62&nbsp;rue de la Jarry, 94300&nbsp;Vincennes · Garantie financière conforme à l'art.&nbsp;L.213-2 du Code de la route.
          </p>
          <p className="m-0">
            © {new Date().getFullYear()} Smoni Auto-École · Conduite éco-responsable à Paris
          </p>
        </section>

        {/* ============ SIGN-OFF ============ */}
        <section
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:gap-8 items-end"
          style={{ padding: "40px 0 56px", borderTop: "1px solid rgba(255,255,255,0.07)", gap: 18 }}
          aria-label="Smoni signature"
        >
          <p
            className="m-0 select-none"
            style={{
              fontFamily: display,
              fontWeight: 900,
              fontSize: "clamp(48px, 12vw, 168px)",
              lineHeight: 0.86,
              letterSpacing: "-0.05em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.22)",
              textWrap: "balance",
            }}
          >
            Designed for{" "}
            <span
              className="italic"
              style={{
                color: "rgba(255,255,255,0.95)",
                WebkitTextStroke: 0,
                fontWeight: 800,
              }}
            >
              elite drivers
            </span>
            .
          </p>
          <div
            className="uppercase text-left sm:text-right"
            style={{ fontFamily: mono, fontWeight: 600, fontSize: 10.5, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}
          >
            <span className="block mb-1">
              <span className="text-white font-bold">Smoni</span> · Paris · {new Date().getFullYear()}
            </span>
            <span className="block mb-1">v1.0 · Footer</span>
            <span className="block">Made with care · 100 % électrique</span>
          </div>
        </section>

      </div>
    </footer>
  );
};

export default Footer;
