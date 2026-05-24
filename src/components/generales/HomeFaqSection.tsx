import { useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "./Reveal";

export const faqData = [
  {
    id: "item-1",
    question: "Combien coûte vraiment le permis chez Smoni, sans surprise ?",
    answer:
      "Tous nos tarifs sont publics sur la page Tarifs. Le forfait Permis B 20h démarre à 1 290 € (manuelle) ou 990 € (BVA 13h). Le contrat détaille chaque ligne. Vous ne paierez aucun supplément qui n'est pas mentionné à la signature — c'est dans nos 5 engagements.",
  },
  {
    id: "item-2",
    question: "J'ai déjà raté mon permis. Vous me prenez ?",
    answer:
      "Oui. Sans frais de transfert, sans pack 13h imposé. On commence par une évaluation gratuite d'1h pour estimer ce dont vous avez besoin, et on construit un plan sur-mesure. C'est exactement le profil qu'on accueille le mieux.",
  },
  {
    id: "item-3",
    question: "J'ai 35 ans, je n'ai jamais conduit. C'est gênant ?",
    answer:
      "Non. ~30% de nos candidats ont plus de 25 ans. Créneaux soir et samedi spécifiquement pour ça, moniteurs habitués aux adultes, zéro condescendance. Appelez quand vous voulez.",
  },
  {
    id: "item-4",
    question: "Vous acceptez le CPF ?",
    answer:
      "Oui, sous réserve de notre référencement EDOF (à confirmer à l'inscription). Depuis la réforme 2024, un reste à charge de 100 € s'applique. On vous accompagne dans le montage du dossier.",
  },
  {
    id: "item-5",
    question: "Et si vous fermez avec mon argent dedans ?",
    answer:
      "Impossible. La loi (art. L.213-2 Code de la route) nous oblige à souscrire une garantie financière qui protège votre argent. Si on devait fermer, vous récupérez vos heures non consommées. Attestation envoyée sur demande.",
  },
  {
    id: "item-6",
    question: "Heures supplémentaires : c'est obligatoire avant l'examen ?",
    answer:
      "Non. Si votre moniteur estime que vous êtes prêt·e après les 20h du forfait, vous passez. On ne facture pas « 9h obligatoires sur le centre d'examen » comme certaines auto-écoles. Si des heures supp sont nécessaires, c'est justifié par écrit, sur votre niveau réel.",
  },
  {
    id: "item-7",
    question: "Boîte automatique, c'est vraiment pour les nuls ?",
    answer:
      "Non. Statistique nationale 2024 : 75% de réussite en BVA vs 57% en manuelle. 13h légales vs 20h. Coût moyen 990 € vs 1 290 €. Si vous conduisez en ville ou en EV, c'est l'option rationnelle. Passerelle manuelle possible en 7h après.",
  },
  {
    id: "item-8",
    question: "Combien de temps entre l'inscription et l'examen ?",
    answer:
      "À Vincennes (centres d'examen Rungis ou Créteil), 4 à 8 semaines selon la période, une fois prêt·e. Notre objectif est de vous présenter au plus tôt — pas au plus rentable pour nous.",
  },
  {
    id: "item-9",
    question: "Mon moniteur peut-il changer en cours de formation ?",
    answer:
      "Oui, sans frais. Vous nous le dites, on vous propose un autre moniteur de l'équipe. Pas besoin de justifier en détail.",
  },
  {
    id: "item-10",
    question: "Le simulateur de conduite, vous en avez ?",
    answer:
      "Pas pour l'instant. On préfère vous mettre directement dans une vraie voiture, en circulation réelle. Si on en introduit un jour, ce sera un complément optionnel, pas une obligation facturée.",
  },
  {
    id: "item-11",
    question: "Quels documents je dois préparer avant de venir ?",
    answer:
      "Pièce d'identité, justificatif de domicile < 6 mois, photo d'identité, et pour les 17-25 ans l'attestation JDC. Pas votre NEPH ? On vous accompagne pour le créer sur l'ANTS.",
  },
  {
    id: "item-12",
    question: "Vous proposez le permis accéléré sur une semaine ?",
    answer:
      "Oui, sur 5-7 jours, 20h de conduite, prix tout-compris 1 590 €. Pas de « supplément à la dernière minute ». Demandez-nous les dates disponibles.",
  },
  {
    id: "item-13",
    question: "Permis A2 / moto / 125 cm³ : c'est possible chez Smoni ?",
    answer:
      "Oui pour le 125 cm³ (7h, 290 €) et selon la disponibilité du moniteur moto pour l'A2. Appelez-nous : on est honnête sur les délais.",
  },
  {
    id: "item-14",
    question: "Pourquoi vous n'avez pas (encore) d'avis Google ?",
    answer:
      "Parce qu'on est une petite équipe créée en 2022, et qu'on n'a jamais acheté ni sollicité d'avis. Plutôt que des étoiles inventées, on vous propose de parler à un·e ancien·ne élève en direct, de venir nous voir, ou de démarrer par une 1ʳᵉ leçon sans engagement.",
  },
  {
    id: "item-15",
    question: "Comment vous différenciez-vous d'Ornikar, Stych ou En Voiture Simone ?",
    answer:
      "On est physique. Vous voyez Arike (la directrice) en vrai. Vous appelez et c'est elle ou un moniteur qui répond. Si votre formation pose problème, vous venez à l'agence — pas un chatbot qui met 4 jours à répondre. C'est aussi pourquoi on coûte un peu plus que les plateformes online — mais vous ne vous retrouvez pas avec « 1 700 € disparus sur le CPF » comme on l'a beaucoup lu sur Reddit.",
  },
];

// Design tokens — keep as named constants (not Tailwind classes) per design handoff
const FQP = {
  indigo: "#2c2876",
  deep: "#1e1b4b",
  ind60: "#7472b0",
  ind40: "#a5a3c9",
  rule: "#e6e3f5",
  ruleSoft: "#eef0f7",
  bgTint: "#f4f2fb",
  paper: "#ffffff",
  blue: "#3b82f6",
  ink: "#0f172a",
  ink60: "#475569",
} as const;

type Cat = "ARGENT" | "PROFIL" | "LOGISTIQUE" | "TRANSPARENCE";

type Editorial = {
  n: string;
  cat: Cat;
  hl?: string;
};

// Per-item editorial metadata (category + highlight phrase). Indexed by faqData order.
const EDITORIAL: Editorial[] = [
  { n: "01", cat: "ARGENT",       hl: "aucun supplément qui n'est pas mentionné à la signature" },
  { n: "02", cat: "PROFIL",       hl: "évaluation gratuite d'1h" },
  { n: "03", cat: "PROFIL",       hl: "zéro condescendance" },
  { n: "04", cat: "ARGENT",       hl: "reste à charge de 100 €" },
  { n: "05", cat: "TRANSPARENCE", hl: "garantie financière qui protège votre argent" },
  { n: "06", cat: "ARGENT",       hl: "justifié par écrit, sur votre niveau réel" },
  { n: "07", cat: "PROFIL",       hl: "75% de réussite en BVA vs 57% en manuelle" },
  { n: "08", cat: "LOGISTIQUE",   hl: "4 à 8 semaines" },
  { n: "09", cat: "LOGISTIQUE",   hl: "sans frais" },
  { n: "10", cat: "LOGISTIQUE",   hl: "pas une obligation facturée" },
  { n: "11", cat: "LOGISTIQUE",   hl: "On vous accompagne pour le créer sur l'ANTS" },
  { n: "12", cat: "ARGENT",       hl: "prix tout-compris 1 590 €" },
  { n: "13", cat: "LOGISTIQUE",   hl: "on est honnête sur les délais" },
  { n: "14", cat: "TRANSPARENCE", hl: "jamais acheté ni sollicité d'avis" },
  { n: "15", cat: "TRANSPARENCE", hl: "Vous voyez Arike (la directrice) en vrai" },
];

const CATS: Record<Cat, { label: string }> = {
  ARGENT:       { label: "Argent · Prix" },
  PROFIL:       { label: "Votre profil" },
  LOGISTIQUE:   { label: "Logistique" },
  TRANSPARENCE: { label: "Transparence" },
};

const CAT_ORDER: Cat[] = ["ARGENT", "PROFIL", "LOGISTIQUE", "TRANSPARENCE"];

type Merged = (typeof faqData)[number] & Editorial;
const MERGED: Merged[] = faqData.map((f, i) => ({ ...f, ...EDITORIAL[i] }));
const ORDERED: Merged[] = CAT_ORDER.flatMap((c) => MERGED.filter((x) => x.cat === c));

type Row =
  | { kind: "divider"; cat: Cat; idx: number; key: string }
  | { kind: "item"; item: Merged; key: string };

const ROWS: Row[] = (() => {
  const out: Row[] = [];
  let lastCat: Cat | null = null;
  let catIndex = 0;
  for (const item of ORDERED) {
    if (item.cat !== lastCat) {
      catIndex += 1;
      out.push({ kind: "divider", cat: item.cat, idx: catIndex, key: `div-${item.cat}` });
      lastCat = item.cat;
    }
    out.push({ kind: "item", item, key: item.n });
  }
  return out;
})();

function highlightAnswer(text: string, hl?: string): ReactNode {
  if (!hl) return text;
  const i = text.indexOf(hl);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark
        style={{
          background:
            "linear-gradient(180deg, transparent 56%, rgba(59,130,246,0.20) 56%, rgba(59,130,246,0.20) 94%, transparent 94%)",
          color: FQP.deep,
          fontWeight: 600,
          padding: "0 1px",
          borderBottom: `1.5px solid ${FQP.blue}`,
        }}
      >
        {hl}
      </mark>
      {text.slice(i + hl.length)}
    </>
  );
}

const monoStyle = (extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: FQP.indigo,
  ...extra,
});

const Mono = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <span style={monoStyle(style)}>{children}</span>
);

const Plus = ({ open, color }: { open: boolean; color: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
    style={{
      flexShrink: 0,
      transition: "transform 240ms cubic-bezier(.2,.7,.3,1)",
      transform: open ? "rotate(45deg)" : "rotate(0deg)",
    }}
  >
    <circle cx="8" cy="8" r="7.2" fill="none" stroke={color} strokeOpacity="0.18" strokeWidth="1" />
    <line x1="8" y1="3.5" x2="8" y2="12.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="3.5" y1="8" x2="12.5" y2="8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const rowBaseStyle: CSSProperties = {
  width: "100%",
  textAlign: "left",
  padding: "22px 8px 22px 0",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "grid",
  gridTemplateColumns: "60px 1fr 32px",
  alignItems: "start",
  gap: 18,
  color: "inherit",
  fontFamily: "inherit",
  transition: "background 180ms ease",
  borderRadius: 8,
};

const HomeFaqSection = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({ "01": true });
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  return (
    <section
      id="faq"
      style={{
        background: FQP.paper,
        padding: "clamp(64px, 8vw, 104px) clamp(20px, 4vw, 56px) clamp(80px, 9vw, 132px)",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: FQP.ink,
      }}
    >
      <div className="faq-grid" style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* ── LEFT · sticky manifesto ────────────────────────────── */}
        <aside className="faq-aside">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 22,
              paddingBottom: 14,
              borderBottom: `1px solid ${FQP.rule}`,
            }}
          >
            <Mono>FAQ · Vol. 01</Mono>
            <span style={{ flex: 1, height: 1, background: FQP.rule }} />
            <Mono style={{ color: FQP.ind60 }}>Mai 2026</Mono>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, background: FQP.blue }} />
            <Mono>Questions fréquentes</Mono>
            <span aria-hidden="true" style={{ flex: 1, height: 1, background: FQP.rule, maxWidth: 120 }} />
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 5.2vw, 56px)",
              lineHeight: 1.0,
              letterSpacing: "-0.034em",
              color: FQP.deep,
              textWrap: "balance",
            }}
          >
            Ce que les autres
            <br />
            auto-écoles évitent
            <br />
            de dire.
          </h2>

          <div style={{ marginTop: 20, width: 56, height: 2, background: FQP.indigo }} />

          <p
            style={{
              marginTop: 22,
              fontSize: 16.5,
              lineHeight: 1.6,
              color: FQP.ink60,
              maxWidth: 380,
              fontWeight: 500,
            }}
          >
            Les vraies questions qu'on nous pose — et celles qu'on devrait nous poser. Réponses
            directes, sans langue de bois.
          </p>

          <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { k: "15", v: "questions" },
              { k: "04", v: "dossiers" },
              { k: "~4 min", v: "lecture" },
            ].map((s) => (
              <div
                key={s.v}
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: FQP.bgTint,
                  border: `1px solid ${FQP.rule}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    fontSize: 13,
                    color: FQP.deep,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {s.k}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: FQP.ind60,
                  }}
                >
                  {s.v}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "20px 22px",
              borderRadius: 14,
              background: FQP.deep,
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(59,130,246,0.18)",
                filter: "blur(20px)",
              }}
            />
            <Mono style={{ color: "rgba(255,255,255,0.68)", marginBottom: 8, display: "block" }}>
              Pas dans la liste ?
            </Mono>
            <a
              href="tel:+33771265119"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 24,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "-0.014em",
                position: "relative",
                zIndex: 1,
              }}
            >
              <PhoneIcon color={FQP.blue} />
              07 71 26 51 19
            </a>
            <div
              style={{
                marginTop: 6,
                fontSize: 13.5,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.5,
                position: "relative",
                zIndex: 1,
              }}
            >
              Arike ou un moniteur décroche — pas un chatbot.
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              paddingTop: 18,
              borderTop: `1px solid ${FQP.rule}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: FQP.bgTint,
                border: `1px solid ${FQP.rule}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                color: FQP.indigo,
                fontSize: 16,
                letterSpacing: "-0.01em",
              }}
            >
              A
            </div>
            <div>
              <Mono style={{ color: FQP.ind60, display: "block", marginBottom: 2 }}>
                Réponses signées
              </Mono>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: FQP.deep,
                  letterSpacing: "-0.008em",
                }}
              >
                Arike · directrice
              </div>
            </div>
          </div>
        </aside>

        {/* ── RIGHT · running list ───────────────────────────────── */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
            <Mono style={{ color: FQP.ind60 }}>
              {faqData.length} questions · {CAT_ORDER.length} dossiers
            </Mono>
            <span style={{ flex: 1, height: 1, background: FQP.rule, alignSelf: "center" }} />
            <Mono style={{ color: FQP.ind40 }}>Cliquez pour ouvrir</Mono>
          </div>

          <Reveal>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 56,
                top: 0,
                bottom: 0,
                width: 1,
                background: FQP.rule,
              }}
            />
            {ROWS.map((entry) => {
              if (entry.kind === "divider") {
                return (
                  <li
                    key={entry.key}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px 1fr",
                      alignItems: "center",
                      gap: 18,
                      padding: "26px 0 12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 900,
                          fontSize: 22,
                          color: FQP.indigo,
                          letterSpacing: "-0.02em",
                          background: FQP.paper,
                          padding: "0 6px",
                        }}
                      >
                        {`0${entry.idx}`}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 900,
                          fontSize: 18,
                          color: FQP.deep,
                          letterSpacing: "-0.012em",
                        }}
                      >
                        Dossier · {CATS[entry.cat].label}
                      </div>
                      <span style={{ flex: 1, height: 1, background: FQP.rule }} />
                      <Mono style={{ color: FQP.ind40 }}>
                        {MERGED.filter((x) => x.cat === entry.cat).length} Q
                      </Mono>
                    </div>
                  </li>
                );
              }

              const item = entry.item;
              const isOpen = !!open[item.n];
              return (
                <li key={item.n} style={{ borderBottom: `1px solid ${FQP.rule}` }}>
                  <button
                    type="button"
                    onClick={() => toggle(item.n)}
                    aria-expanded={isOpen}
                    onMouseEnter={(e) => {
                      if (!isOpen)
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(241, 240, 251, 0.55)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                    style={rowBaseStyle}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: 4,
                        width: 56,
                      }}
                    >
                      <span
                        style={{
                          background: FQP.paper,
                          padding: "2px 6px",
                          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          color: isOpen ? FQP.blue : FQP.ind40,
                          transition: "color 180ms ease",
                        }}
                      >
                        {item.n}
                      </span>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 700,
                          fontSize: 20,
                          lineHeight: 1.28,
                          color: isOpen ? FQP.deep : FQP.ink,
                          letterSpacing: "-0.014em",
                          transition: "color 180ms ease",
                          textWrap: "balance",
                        }}
                      >
                        {item.question}
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                          transition:
                            "grid-template-rows 260ms ease, margin-top 260ms ease",
                          marginTop: isOpen ? 14 : 0,
                        }}
                      >
                        <div style={{ overflow: "hidden" }}>
                          <p
                            style={{
                              margin: 0,
                              paddingRight: 24,
                              fontSize: 16,
                              lineHeight: 1.65,
                              color: FQP.ink60,
                              fontWeight: 500,
                            }}
                          >
                            {highlightAnswer(item.answer, item.hl)}
                          </p>
                          <div
                            style={{
                              marginTop: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <Mono style={{ color: FQP.ind60 }}>
                              <span style={{ color: FQP.ind40 }}>Dossier · </span>
                              {CATS[item.cat].label}
                            </Mono>
                            <span
                              aria-hidden="true"
                              style={{
                                flex: 1,
                                height: 1,
                                background: FQP.ruleSoft,
                                maxWidth: 80,
                              }}
                            />
                            <a
                              href="tel:+33771265119"
                              style={{
                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: "0.2em",
                                color: FQP.blue,
                                textTransform: "uppercase",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              Plus de détails
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                aria-hidden="true"
                              >
                                <path d="M2 5h6m-2-2l2 2-2 2" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        paddingTop: 4,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Plus open={isOpen} color={isOpen ? FQP.blue : FQP.indigo} />
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
          </Reveal>

          <div
            style={{
              marginTop: 36,
              padding: "24px 28px",
              borderRadius: 16,
              background: FQP.bgTint,
              border: `1px solid ${FQP.rule}`,
              display: "flex",
              alignItems: "center",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1 1 320px" }}>
              <Mono style={{ color: FQP.ind60, display: "block", marginBottom: 6 }}>
                Fin du dossier · {faqData.length}
                <sup style={{ fontSize: 7 }}>e</sup> question lue
              </Mono>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: 20,
                  color: FQP.deep,
                  letterSpacing: "-0.014em",
                }}
              >
                La 16<sup style={{ fontSize: 11 }}>e</sup>, on la trouve ensemble.
              </div>
            </div>
            <a
              href="tel:+33771265119"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 18px",
                borderRadius: 999,
                background: FQP.indigo,
                color: "#fff",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              <PhoneIcon color="#fff" size={14} />
              Appeler · 07 71 26 51 19
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: minmax(340px, 420px) 1fr;
          gap: 88px;
          align-items: start;
        }
        .faq-aside {
          position: sticky;
          top: 72px;
          align-self: start;
        }
        @media (max-width: 1023px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .faq-aside {
            position: static;
            top: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeFaqSection;
