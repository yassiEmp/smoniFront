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
  telephone: "+33 7 71 26 51 19",
  email: "contact@smoni.fr",
  address: ADDRESS,
  geo: GEO,
  areaServed: [
    { "@type": "City", name: "Vincennes" },
    { "@type": "City", name: "Paris" },
    { "@type": "AdministrativeArea", name: "Val-de-Marne" },
  ],
  priceRange: "€€",
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
    // TODO: replace with real URL — Google Business Profile listing
    // TODO: replace with real URL — Facebook page (currently linked in Footer as /SmoniAE)
    "https://www.facebook.com/SmoniAE",
    // TODO: replace with real URL — Pages Jaunes profile
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
