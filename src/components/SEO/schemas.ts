const SITE_URL = "https://smoni.fr";

const BUSINESS_ID = `${SITE_URL}/#organization`;

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "62 rue de la Jarry",
  addressLocality: "Vincennes",
  postalCode: "94300",
  addressRegion: "Île-de-France",
  addressCountry: "FR",
};

const GEO = {
  "@type": "GeoCoordinates",
  latitude: 48.8475,
  longitude: 2.4395,
};

export const drivingSchoolSchema = () => ({
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "@id": BUSINESS_ID,
  name: "Auto-école Smoni",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-smoni.png`,
  image: `${SITE_URL}/og-home.jpg`,
  telephone: "+33771265119",
  email: "contact@smoni.fr",
  address: ADDRESS,
  geo: GEO,
  hasMap: "https://www.google.com/maps/place/Smoni+Auto-école+Vincennes/",
  areaServed: [
    { "@type": "City", name: "Vincennes" },
    { "@type": "City", name: "Paris" },
    { "@type": "AdministrativeArea", name: "Val-de-Marne" },
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, CPF",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Formations permis",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Permis B (boîte manuelle)", url: `${SITE_URL}/conduite` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Permis B78 (boîte automatique)", url: `${SITE_URL}/conduite` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Code de la route en ligne", url: `${SITE_URL}/code-en-ligne` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Passerelle BVA → BVM", url: `${SITE_URL}/passerelle` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Permis accéléré", url: `${SITE_URL}/fabrication-permis` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Accompagnement post-permis", url: `${SITE_URL}/post-permis` },
      },
    ],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/smoni_ame/",
    "https://www.facebook.com/SmoniAE",
    "https://share.google/xjkuqJFNroRyaldmW",
    "https://www.pagesjaunes.fr/pros/61706499",
    "https://annuaire-entreprises.data.gouv.fr/labels-certificats/915387013#organisme-de-formation",
  ] as string[],
});

export const serviceSchema = (params: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: params.name,
  description: params.description,
  url: `${SITE_URL}${params.path}`,
  serviceType: params.serviceType ?? params.name,
  provider: { "@id": BUSINESS_ID },
  areaServed: { "@type": "City", name: "Vincennes" },
});

export const breadcrumbSchema = (
  items: { name: string; path: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const articleSchema = (params: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: params.headline,
  description: params.description,
  mainEntityOfPage: `${SITE_URL}${params.path}`,
  image: params.image
    ? params.image.startsWith("http")
      ? params.image
      : `${SITE_URL}${params.image}`
    : `${SITE_URL}/og-home.jpg`,
  datePublished: params.datePublished,
  dateModified: params.dateModified ?? params.datePublished,
  author: { "@id": BUSINESS_ID },
  publisher: { "@id": BUSINESS_ID },
});

// Place schema for /contact — gives Google a second explicit signal for the
// physical location (in addition to DrivingSchool.address). The @id ties back
// to the canonical business entity so it doesn't fork the knowledge graph.
export const placeSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${SITE_URL}/contact#place`,
  name: "Auto-école Smoni Vincennes",
  url: `${SITE_URL}/contact`,
  address: ADDRESS,
  geo: GEO,
  hasMap: "https://www.google.com/maps/place/Smoni+Auto-école+Vincennes/",
  containedInPlace: { "@type": "City", name: "Vincennes" },
});

export const faqSchema = (
  faqs: { question: string; answer: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
});
