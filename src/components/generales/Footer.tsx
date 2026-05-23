import { Facebook, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router";

const INDIGO_DEEP = "#1e1b4b";
const INDIGO = "#2c2876";
const INDIGO_60 = "#7472b0";
const INDIGO_40 = "#a4a2cc";
const BLUE = "#3b82f6";
const PAPER = "#ffffff";
const PAPER_RULE = "#e6e3f5";
const BG = "#f8fafc";

const mono = '"JetBrains Mono", ui-monospace, monospace';
const display = '"Outfit", sans-serif';

const indexLinks = [
  { num: "A1", name: "Accueil", path: "/" },
  { num: "A2", name: "Services", path: "/services" },
  { num: "A3", name: "Tarifs", path: "/tarifs" },
  { num: "A4", name: "Contact", path: "/contact" },
  { num: "A5", name: "Blog", path: "/ressources" },
];

const formationsLinks = [
  { num: "F1", name: "Permis B", path: "/conduite" },
  { num: "F2", name: "Passerelle boîte auto", path: "/passerelle" },
  { num: "F3", name: "Code en ligne", path: "/code-en-ligne" },
  { num: "F4", name: "Double commande", path: "/location" },
  { num: "F5", name: "Post-permis", path: "/post-permis" },
];

const garantiesLinks = [
  { num: "G1", name: "Financement CPF", path: "/services" },
  { num: "G2", name: "Permis 1 €/jour", path: "/tarifs" },
  { num: "G3", name: "Qualiopi", path: "/qualiopi-cert-smoni.pdf", external: true },
  { num: "G4", name: "Label Qualité", path: "/a-propos" },
  { num: "G5", name: "Garantie L.213-2", path: "/politique-confidentialite" },
];

const legalLinks = [
  { name: "Mentions légales", path: "/politique-confidentialite" },
  { name: "Confidentialité", path: "/politique-confidentialite" },
  { name: "CGU / CGV", path: "/cgu" },
];

const monoCap = {
  fontFamily: mono,
  fontWeight: 700,
  fontSize: 10.5,
  letterSpacing: "0.24em",
  textTransform: "uppercase" as const,
};

const DirList = ({
  items,
  onNav,
}: {
  items: { num: string; name: string; path: string; external?: boolean }[];
  onNav: (p: string) => void;
}) => (
  <ul className="list-none m-0 p-0">
    {items.map((l, i) => (
      <li
        key={l.name}
        style={{ borderTop: i === 0 ? "none" : `1px solid ${PAPER_RULE}` }}
      >
        {l.external ? (
          <a
            href={l.path}
            target="_blank"
            rel="noreferrer"
            className="group grid items-center transition-all hover:pl-3"
            style={{
              gridTemplateColumns: "auto 1fr auto",
              gap: 14,
              padding: "14px 0",
              fontFamily: display,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.015em",
              color: INDIGO_DEEP,
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.18em",
                color: INDIGO_40,
                minWidth: 26,
              }}
            >
              {l.num}
            </span>
            <span className="group-hover:text-[#3b82f6] transition-colors">
              {l.name}
            </span>
            <span
              aria-hidden
              className="group-hover:text-[#3b82f6] group-hover:translate-x-1 transition-all"
              style={{ fontFamily: display, color: INDIGO_40 }}
            >
              →
            </span>
          </a>
        ) : (
          <span
            onClick={() => onNav(l.path)}
            className="group grid items-center cursor-pointer transition-all hover:pl-3"
            style={{
              gridTemplateColumns: "auto 1fr auto",
              gap: 14,
              padding: "14px 0",
              fontFamily: display,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.015em",
              color: INDIGO_DEEP,
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.18em",
                color: INDIGO_40,
                minWidth: 26,
              }}
            >
              {l.num}
            </span>
            <span className="group-hover:text-[#3b82f6] transition-colors">
              {l.name}
            </span>
            <span
              aria-hidden
              className="group-hover:text-[#3b82f6] group-hover:translate-x-1 transition-all"
              style={{ fontFamily: display, color: INDIGO_40 }}
            >
              →
            </span>
          </span>
        )}
      </li>
    ))}
  </ul>
);

const ColTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ ...monoCap, color: INDIGO, marginBottom: 18 }}>{children}</h3>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: PAPER,
        color: INDIGO_DEEP,
        fontFamily: '"Inter", system-ui, sans-serif',
        isolation: "isolate",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* ============ MARQUEE HERO ============ */}
        <section
          style={{
            padding: "96px 0 56px",
            borderBottom: "1px solid rgba(44,40,118,0.12)",
          }}
        >
          <div
            className="flex items-center gap-3"
            style={{ color: INDIGO, marginBottom: 28 }}
          >
            <span style={monoCap}>Smoni · footer · 2026</span>
            <span
              aria-hidden
              className="flex-1"
              style={{ maxWidth: 80, height: 1, background: INDIGO, opacity: 0.4 }}
            />
            <span style={monoCap}>Conduite éco-responsable</span>
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: display,
              fontWeight: 900,
              fontSize: "clamp(72px, 14vw, 220px)",
              lineHeight: 0.85,
              letterSpacing: "-0.055em",
              color: INDIGO_DEEP,
              textWrap: "balance",
            }}
          >
            Le permis,
            <br />
            <span
              className="italic"
              style={{ color: BLUE, fontWeight: 800 }}
            >
              enfin pour vous.
            </span>
          </h2>

          <div
            className="grid items-end gap-7 lg:gap-12"
            style={{
              marginTop: 36,
              gridTemplateColumns: "1fr",
            }}
          >
            <div className="grid gap-7 lg:gap-12 lg:grid-cols-[1.4fr_1fr_auto] items-end">
              <p
                style={{
                  margin: 0,
                  maxWidth: 520,
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: INDIGO_60,
                  textWrap: "pretty",
                }}
              >
                Rejoignez l'auto-école nouvelle génération à Paris &amp;
                Île-de-France. Simple, rapide et 100&nbsp;% financé par votre
                CPF.
              </p>

              <div style={{ color: INDIGO }}>
                <span style={monoCap}>Smoni en chiffres</span>
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px 24px",
                    marginTop: 14,
                  }}
                >
                  {[
                    { v: "2 min", l: "Pour s'inscrire" },
                    { v: "100 %", l: "CPF · zéro avance", em: true },
                    { v: "28 j", l: "Durée moyenne" },
                    { v: "94300", l: "Vincennes · IDF" },
                  ].map((m) => (
                    <div key={m.l}>
                      <div
                        className={m.em ? "italic" : ""}
                        style={{
                          fontFamily: display,
                          fontWeight: 900,
                          fontSize: 32,
                          letterSpacing: "-0.025em",
                          color: m.em ? BLUE : INDIGO_DEEP,
                          lineHeight: 1,
                        }}
                      >
                        {m.v}
                      </div>
                      <div
                        style={{
                          marginTop: 4,
                          color: INDIGO_60,
                          fontSize: 12,
                        }}
                      >
                        {m.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleNavigation("/inscription")}
                className="inline-flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                style={{
                  padding: "20px 28px",
                  background: INDIGO_DEEP,
                  color: "#fff",
                  fontFamily: display,
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "-0.005em",
                  borderRadius: 9999,
                  border: 0,
                  cursor: "pointer",
                  boxShadow: "0 24px 50px -20px rgba(28,25,90,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                S'inscrire
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center rounded-full"
                  style={{ width: 28, height: 28, background: BLUE }}
                >
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h7M5.5 2.5 9 6 5.5 9.5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ============ DIRECTORY ============ */}
        <section
          className="grid gap-10 lg:gap-14"
          style={{
            padding: "56px 0 48px",
            gridTemplateColumns: "1fr",
          }}
        >
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-[200px_1fr_1fr_1fr]">
            {/* Index */}
            <div>
              <ColTitle>Index</ColTitle>
              <DirList items={indexLinks} onNav={handleNavigation} />
            </div>

            {/* Formations */}
            <div>
              <ColTitle>Formations</ColTitle>
              <DirList items={formationsLinks} onNav={handleNavigation} />
            </div>

            {/* Garanties */}
            <div>
              <ColTitle>Garanties</ColTitle>
              <DirList items={garantiesLinks} onNav={handleNavigation} />
            </div>

            {/* Contact */}
            <div>
              <ColTitle>Contact</ColTitle>
              <div style={{ padding: "14px 0 4px" }}>
                {[
                  {
                    label: "Tél.",
                    value: (
                      <a
                        href="tel:+33749464978"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                          borderBottom: "1px dashed rgba(44,40,118,0.3)",
                          paddingBottom: 1,
                        }}
                      >
                        +33 7 49 46 49 78
                      </a>
                    ),
                  },
                  {
                    label: "Email",
                    value: (
                      <a
                        href="mailto:contact@smoni.fr"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                          borderBottom: "1px dashed rgba(44,40,118,0.3)",
                          paddingBottom: 1,
                        }}
                      >
                        contact@smoni.fr
                      </a>
                    ),
                  },
                  { label: "Adresse", value: "62 rue de la Jarry, Vincennes" },
                  { label: "Horaires", value: "Lun – Sam · 9h–19h" },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className="flex items-baseline gap-3"
                    style={{
                      padding: "12px 0",
                      borderBottom:
                        i === arr.length - 1
                          ? "none"
                          : `1px solid ${PAPER_RULE}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: mono,
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        color: INDIGO_60,
                        textTransform: "uppercase",
                        minWidth: 64,
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontFamily: display,
                        fontWeight: 700,
                        fontSize: 16,
                        color: INDIGO_DEEP,
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ SIGNATURE ============ */}
        <section
          className="grid gap-4 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8"
          style={{
            padding: "32px 0",
            borderTop: `1px solid ${PAPER_RULE}`,
          }}
        >
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-baseline gap-1 no-underline"
            style={{
              fontFamily: display,
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: "-0.035em",
              color: INDIGO_DEEP,
            }}
          >
            smoni
            <span
              aria-hidden
              style={{
                width: 9,
                height: 9,
                borderRadius: 9999,
                background: BLUE,
                transform: "translateY(-2px)",
              }}
            />
          </Link>

          <nav
            className="flex flex-wrap"
            style={{ gap: "8px 22px", ...monoCap, fontWeight: 600 }}
            aria-label="Mentions légales"
          >
            {legalLinks.map((l) => (
              <span
                key={l.name}
                onClick={() => handleNavigation(l.path)}
                className="cursor-pointer transition-colors hover:text-[#1e1b4b]"
                style={{ color: INDIGO_60 }}
              >
                {l.name}
              </span>
            ))}
            <a
              href="https://www.facebook.com/SmoniAE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex items-center transition-colors hover:text-[#1e1b4b]"
              style={{ color: INDIGO_60 }}
            >
              <Facebook className="h-[14px] w-[14px]" />
            </a>
            <a
              href="https://www.instagram.com/smoni_ame/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center transition-colors hover:text-[#1e1b4b]"
              style={{ color: INDIGO_60 }}
            >
              <Instagram className="h-[14px] w-[14px]" />
            </a>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            {[
              { mark: "CPF", text: "Permis financé", blue: true },
              { mark: "Q", text: "Qualiopi" },
              { mark: "★", text: "Label Qualité" },
            ].map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-2"
                style={{
                  padding: "6px 12px 6px 6px",
                  border: "1px solid rgba(44,40,118,0.16)",
                  borderRadius: 9999,
                  background: BG,
                  fontFamily: display,
                  fontWeight: 700,
                  fontSize: 12.5,
                  color: INDIGO_DEEP,
                }}
              >
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: b.blue ? BLUE : INDIGO_DEEP,
                    color: "#fff",
                    fontFamily: display,
                    fontWeight: 900,
                    fontSize: 10,
                    letterSpacing: "0.04em",
                  }}
                >
                  {b.mark}
                </span>
                {b.text}
              </span>
            ))}
          </div>
        </section>

        {/* ============ LEGAL ============ */}
        <p
          style={{
            padding: "18px 0 64px",
            color: INDIGO_60,
            fontSize: 12,
            lineHeight: 1.6,
            borderTop: `1px solid ${PAPER_RULE}`,
            maxWidth: 1100,
            margin: 0,
          }}
        >
          <strong style={{ color: INDIGO_DEEP, fontWeight: 700 }}>
            SMONI Auto-École
          </strong>{" "}
          — SIREN 915 387 013 · 62 rue de la Jarry, 94300 Vincennes · Garantie
          financière conforme à l'art. L.213-2 du Code de la route. ©{" "}
          {new Date().getFullYear()} Smoni Auto-École · Conduite éco-responsable
          à Paris · Designed for elite drivers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
