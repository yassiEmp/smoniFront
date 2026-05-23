import { useState, type ComponentType } from "react";
import {
  NT_CardAgence,
  NT_CardRER,
  NT_CardMetro,
} from "./HomeLocationIllustrations";
import "./HomeLocationSection.css";

// Smoni — "Nous trouver" — redesigned per nous-trouver.html handoff.
// Left: 3 expandable location cards with 4:3 illustrated banners.
// Right (sticky desktop): live Google Maps embed framed with editorial chrome
//   + chip overlay + 3-column legend strip (Agence / RER A / M1 Bérault).

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.54148!2d2.43632!3d48.84758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67299!2s62%20Rue%20de%20la%20Jarry%2C%2094300%20Vincennes!5e0!3m2!1sfr!2sfr!4v1625000000000";

type Detail = { label: string; value: string };
type Location = {
  id: string;
  tag: string;
  title: string;
  sub: string;
  Illustration: ComponentType;
  details: [Detail, Detail];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const LOCATIONS: Location[] = [
  {
    id: "agence",
    tag: "AGENCE · UNIQUE",
    title: "62 rue de la Jarry",
    sub: "Vincennes · 94300 · Val-de-Marne",
    Illustration: NT_CardAgence,
    details: [
      { label: "TÉLÉPHONE", value: "07 71 26 51 19" },
      { label: "HORAIRES", value: "Lun – Sam · 9h – 20h · Dim fermé" },
    ],
    primary: { label: "Appeler", href: "tel:+33771265119" },
    secondary: { label: "Itinéraire", href: "https://maps.google.com/?q=62+rue+de+la+Jarry+Vincennes" },
  },
  {
    id: "rer",
    tag: "RER A · VINCENNES",
    title: "4 min à pied de la station",
    sub: "Sortie place Pierre Sémard, direction rue de la Jarry",
    Illustration: NT_CardRER,
    details: [
      { label: "DEPUIS PARIS", value: "≈ 15 min via Nation" },
      { label: "ITINÉRAIRE", value: "Pl. Sémard → rue de la Jarry" },
    ],
    primary: { label: "Voir trajet", href: "https://maps.google.com/?q=RER+Vincennes+to+62+rue+de+la+Jarry" },
    secondary: { label: "Plan RATP", href: "https://www.ratp.fr" },
  },
  {
    id: "metro",
    tag: "MÉTRO 1 · BÉRAULT",
    title: "6 min à pied de la station",
    sub: "Sortie Bérault, direction rue Defrance puis rue de la Jarry",
    Illustration: NT_CardMetro,
    details: [
      { label: "DEPUIS PARIS", value: "≈ 20 min via Châtelet" },
      { label: "ITINÉRAIRE", value: "Bérault → r. Defrance → r. de la Jarry" },
    ],
    primary: { label: "Voir trajet", href: "https://maps.google.com/?q=Berault+to+62+rue+de+la+Jarry" },
    secondary: { label: "Plan RATP", href: "https://www.ratp.fr" },
  },
];

const ChevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const RouteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="6" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 19h7a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

type CardProps = { loc: Location; active: boolean; onClick: () => void };
const LocationCard = ({ loc, active, onClick }: CardProps) => {
  const { Illustration } = loc;
  return (
    <article
      className={`nt-card ${active ? "is-active" : ""}`}
      onClick={onClick}
      aria-expanded={active}
    >
      <div className="nt-card-head">
        <div className="nt-card-banner" aria-hidden="true">
          <Illustration />
        </div>
        <div className="nt-card-meta">
          <span className="nt-card-tag">{loc.tag}</span>
          <h3 className="nt-card-title">{loc.title}</h3>
          <p className="nt-card-sub">{loc.sub}</p>
        </div>
        <div className="nt-card-chev" aria-hidden="true">
          <ChevIcon />
        </div>
      </div>

      <div className="nt-card-body">
        <div className="nt-card-body-inner">
          {loc.details.map((d, i) => (
            <div className="nt-detail-row" key={d.label}>
              <div className="nt-detail-icon">
                {i === 0 ? <PhoneIcon /> : <RouteIcon />}
              </div>
              <div>
                <span className="nt-detail-label">{d.label}</span>
                <span className="nt-detail-value">{d.value}</span>
              </div>
            </div>
          ))}
          <div className="nt-card-actions">
            <a
              className="nt-btn nt-btn--primary"
              href={loc.primary.href}
              onClick={(e) => e.stopPropagation()}
            >
              {loc.primary.label}
              <ChevIcon />
            </a>
            <a
              className="nt-btn nt-btn--ghost"
              href={loc.secondary.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {loc.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

const HomeLocationSection = () => {
  const [activeId, setActiveId] = useState<string>(LOCATIONS[0].id);

  return (
    <section className="nt-section" data-screen-label="HomeLocationSection">
      <div className="nt-bg-halo nt-bg-halo--a" aria-hidden="true" />
      <div className="nt-bg-halo nt-bg-halo--b" aria-hidden="true" />

      <div className="nt-container">
        <header className="nt-header">
          <span className="nt-eyebrow">SMONI · NOUS TROUVER</span>
          <h2 className="nt-title">
            Une seule agence. À Vincennes.{" "}
            <span className="nt-title-em">Pour vrai</span>.
          </h2>
          <p className="nt-subtitle">
            Pas de « réseau national » inventé. Vous savez où nous trouver,
            qui vous accueille, et qui répond au téléphone.
          </p>
        </header>

        <div className="nt-layout">
          <div>
            <div className="nt-cards">
              {LOCATIONS.map((loc) => (
                <LocationCard
                  key={loc.id}
                  loc={loc}
                  active={activeId === loc.id}
                  onClick={() => setActiveId(loc.id)}
                />
              ))}
            </div>

            <div className="nt-bottom-cta">
              <a
                className="nt-cta-tile is-blue"
                href="tel:+33771265119"
                aria-label="Appeler Smoni au 07 71 26 51 19"
              >
                <div className="nt-cta-tile-icon"><PhoneIcon /></div>
                <div className="nt-cta-tile-text">
                  <span className="nt-cta-tile-label">TÉLÉPHONE</span>
                  <span className="nt-cta-tile-value">07 71 26 51 19</span>
                </div>
              </a>
              <a
                className="nt-cta-tile"
                href="https://www.google.com/maps/dir/?api=1&destination=62+rue+de+la+Jarry,+Vincennes"
                target="_blank"
                rel="noreferrer"
                aria-label="Ouvrir l'itinéraire dans Google Maps"
              >
                <div className="nt-cta-tile-icon"><RouteIcon /></div>
                <div className="nt-cta-tile-text">
                  <span className="nt-cta-tile-label">ITINÉRAIRE</span>
                  <span className="nt-cta-tile-value">Google Maps</span>
                </div>
              </a>
            </div>
          </div>

          <div className="nt-right">
            <div className="nt-hero-frame">
              <div className="nt-hero-map">
                <iframe
                  src={MAP_EMBED_URL}
                  title="Carte — Smoni Auto-École, 62 rue de la Jarry, Vincennes"
                  aria-label="Localisation Smoni Auto-École à Vincennes"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <span className="nt-hero-corner nt-hero-corner--tr" aria-hidden="true" />
                <span className="nt-hero-corner nt-hero-corner--bl" aria-hidden="true" />
                <span className="nt-hero-corner nt-hero-corner--br" aria-hidden="true" />
                <span className="nt-hero-coords" aria-hidden="true">48.8476°N · 2.4363°E</span>

                <div className="nt-hero-chip">
                  <span className="nt-hero-chip-dot" />
                  <div>
                    <span className="nt-hero-chip-label">AGENCE UNIQUE · 94300</span>
                    <span className="nt-hero-chip-value">62 rue de la Jarry</span>
                  </div>
                </div>
              </div>

              <div className="nt-hero-legend">
                <div className="nt-legend-item">
                  <div className="nt-legend-row">
                    <span className="nt-legend-mark" style={{ background: "var(--indigo-deep)" }}>S</span>
                    <span className="nt-legend-name">AGENCE</span>
                  </div>
                  <div>
                    <span className="nt-legend-time">62</span>
                    <span className="nt-legend-time-unit">RUE</span>
                  </div>
                </div>
                <div className="nt-legend-item">
                  <div className="nt-legend-row">
                    <span className="nt-legend-mark" style={{ background: "var(--indigo)" }}>A</span>
                    <span className="nt-legend-name">RER A</span>
                  </div>
                  <div>
                    <span className="nt-legend-time">4</span>
                    <span className="nt-legend-time-unit">MIN</span>
                  </div>
                </div>
                <div className="nt-legend-item">
                  <div className="nt-legend-row">
                    <span className="nt-legend-mark" style={{ background: "var(--indigo)" }}>M</span>
                    <span className="nt-legend-name">M1 BÉRAULT</span>
                  </div>
                  <div>
                    <span className="nt-legend-time">6</span>
                    <span className="nt-legend-time-unit">MIN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLocationSection;
