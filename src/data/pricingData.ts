// Static snapshot of the boutique pricing API (https://api.smoni.fr).
// Source of truth is the backend; this file is a build-time embed so the
// pricing section renders without a network round-trip and stays SSG-friendly.
// Refresh by re-running the pricing fetch agent.

export interface StaticBoutiqueItem {
  id: number;
  label: string;
  status: boolean;
}

export interface StaticBoutiqueService {
  id: number;
  category_service_id: number;
  title: string;
  price: number;
  time: number;       // minutes per session (60 in most records)
  type: "automatic" | "manual";
  hour: number;       // total hours in the plan (the user-facing "10 H", "26 H", …)
  month: number | null;
  status: number;
  items: StaticBoutiqueItem[];
}

export interface StaticBoutiqueCategory {
  id: number;
  label: string;
}

export interface StaticPricingBucket {
  automatic?: StaticBoutiqueService[];
  manual?: StaticBoutiqueService[];
  any?: StaticBoutiqueService[];
}

export interface StaticPricingPayload {
  categories: StaticBoutiqueCategory[];
  services: Record<string, StaticPricingBucket>;
}

export const PRICING: StaticPricingPayload = {
  categories: [
    { id: 1, label: "Permis B Classique" },
    { id: 2, label: "Permis B (CS)" },
    { id: 3, label: "Permis B (AAC)" },
    { id: 4, label: "Location Véhicule" },
    { id: 5, label: "Autres" },
    { id: 6, label: "CPF" },
    { id: 7, label: "Location double Commande aux professionnels" },
    { id: 8, label: "Passerelle" },
    { id: 9, label: "Post-Permis" },
    { id: 10, label: "Attestation de Fin de Formation Initiale (AFFI)" },
  ],
  services: {
    "1": {
      automatic: [
        { id: 1, category_service_id: 1, title: "Leçon de Conduite", price: 59, time: 60, type: "automatic", hour: 1, month: 2, status: 1, items: [
          { id: 1, label: "1H de cours de conduite", status: true },
          { id: 2, label: "1 mois de validité", status: true },
          { id: 3, label: "Kilométrage illimité", status: true },
          { id: 4, label: "Essence inclus", status: true },
        ] },
        { id: 2, category_service_id: 1, title: "Perfectionnement", price: 579, time: 60, type: "automatic", hour: 10, month: 2, status: 1, items: [
          { id: 5, label: "10H de cours de conduite", status: true },
          { id: 6, label: "6 mois de validité", status: true },
          { id: 7, label: "Kilométrage illimité", status: true },
          { id: 8, label: "Essence inclus", status: true },
        ] },
        { id: 3, category_service_id: 1, title: "Formule Classique", price: 505, time: 90, type: "automatic", hour: 10, month: 3, status: 1, items: [
          { id: 9, label: "13H de cours de conduite", status: true },
          { id: 10, label: "Gestion de l'élève", status: true },
          { id: 11, label: "Livret d'apprentissage", status: true },
          { id: 12, label: "1 an de validité", status: true },
          { id: 13, label: "Kilométrage illimité", status: true },
          { id: 14, label: "Essence inclus", status: true },
        ] },
        { id: 4, category_service_id: 1, title: "Formule Classique PLUS", price: 1116, time: 365, type: "automatic", hour: 26, month: 12, status: 1, items: [
          { id: 15, label: "26H de cours de conduite", status: true },
          { id: 16, label: "Gestion de l'élève", status: true },
          { id: 17, label: "Livret d'apprentissage", status: true },
          { id: 18, label: "1 an de validité", status: true },
          { id: 19, label: "Kilométrage illimité", status: true },
          { id: 20, label: "Essence inclus", status: true },
        ] },
        { id: 5, category_service_id: 1, title: "Formule Accéléré", price: 936, time: 90, type: "automatic", hour: 13, month: 3, status: 1, items: [
          { id: 21, label: "13H de cours de conduite", status: true },
          { id: 22, label: "Gestion de l'élève", status: true },
          { id: 23, label: "Livret d'apprentissage", status: true },
          { id: 24, label: "1 an de validité", status: true },
          { id: 25, label: "Kilométrage illimité", status: true },
          { id: 26, label: "Essence inclus", status: true },
        ] },
        { id: 6, category_service_id: 1, title: "Formule Accéléré PLUS", price: 1779, time: 365, type: "automatic", hour: 26, month: 12, status: 1, items: [
          { id: 27, label: "26H de cours de conduite", status: true },
          { id: 28, label: "Gestion de l'élève", status: true },
          { id: 29, label: "Livret d'apprentissage", status: true },
          { id: 30, label: "1 an de validité", status: true },
          { id: 31, label: "Kilométrage illimité", status: true },
          { id: 32, label: "Essence inclus", status: true },
        ] },
      ],
      manual: [
        { id: 7, category_service_id: 1, title: "Leçon de Conduite", price: 58, time: 60, type: "manual", hour: 1, month: 2, status: 1, items: [
          { id: 33, label: "1H de cours de conduite", status: true },
          { id: 34, label: "1 mois de validité", status: true },
          { id: 35, label: "Kilométrage illimité", status: true },
          { id: 36, label: "Essence inclus", status: true },
        ] },
        { id: 8, category_service_id: 1, title: "Perfectionnement", price: 569, time: 60, type: "manual", hour: 10, month: 2, status: 1, items: [
          { id: 37, label: "10H de cours de conduite", status: true },
          { id: 38, label: "6 mois de validité", status: true },
          { id: 39, label: "Kilométrage illimité", status: true },
          { id: 40, label: "Essence inclus", status: true },
        ] },
        { id: 9, category_service_id: 1, title: "Formule Classique", price: 899, time: 365, type: "manual", hour: 20, month: 12, status: 1, items: [
          { id: 41, label: "20H de cours de conduite", status: true },
          { id: 42, label: "Gestion de l'élève", status: true },
          { id: 43, label: "Livret d'apprentissage", status: true },
          { id: 44, label: "1 an de validité", status: true },
          { id: 45, label: "Kilométrage illimité", status: true },
          { id: 46, label: "Essence inclus", status: true },
        ] },
        { id: 10, category_service_id: 1, title: "Formule Classique PLUS", price: 1348, time: 365, type: "manual", hour: 30, month: 12, status: 1, items: [
          { id: 47, label: "30H de cours de conduite", status: true },
          { id: 48, label: "Gestion de l'élève", status: true },
          { id: 49, label: "Livret d'apprentissage", status: true },
          { id: 50, label: "1 an de validité", status: true },
          { id: 51, label: "Kilométrage illimité", status: true },
          { id: 52, label: "Essence inclus", status: true },
        ] },
        { id: 11, category_service_id: 1, title: "Formule Accéléré", price: 1100, time: 365, type: "manual", hour: 20, month: 12, status: 1, items: [
          { id: 53, label: "20H de cours de conduite", status: true },
          { id: 54, label: "Gestion de l'élève", status: true },
          { id: 55, label: "Livret d'apprentissage", status: true },
          { id: 56, label: "1 an de validité", status: true },
          { id: 57, label: "Kilométrage illimité", status: true },
          { id: 58, label: "Essence inclus", status: true },
        ] },
        { id: 12, category_service_id: 1, title: "Formule Accéléré PLUS", price: 1650, time: 365, type: "manual", hour: 30, month: 12, status: 1, items: [
          { id: 59, label: "30H de cours de conduite", status: true },
          { id: 60, label: "Gestion de l'élève", status: true },
          { id: 61, label: "Livret d'apprentissage", status: true },
          { id: 62, label: "1 an de validité", status: true },
          { id: 63, label: "Kilométrage illimité", status: true },
          { id: 64, label: "Essence inclus", status: true },
        ] },
      ],
    },
    "2": {
      automatic: [
        { id: 13, category_service_id: 2, title: "Formule Conduite Supervisée", price: 1230, time: 60, type: "automatic", hour: 10, month: null, status: 1, items: [
          { id: 65, label: "13H de cours de conduite", status: true },
          { id: 66, label: "Gestion de l'élève", status: true },
          { id: 67, label: "Livret d'apprentissage", status: true },
          { id: 68, label: "3 ans de validité", status: true },
          { id: 69, label: "Kilométrage illimité", status: true },
          { id: 70, label: "Essence inclus", status: true },
        ] },
        { id: 14, category_service_id: 2, title: "Formule Conduite Supervisée PLUS", price: 1790, time: 60, type: "automatic", hour: 10, month: null, status: 1, items: [
          { id: 71, label: "26H de cours de conduite", status: true },
          { id: 72, label: "Gestion de l'élève", status: true },
          { id: 73, label: "Livret d'apprentissage", status: true },
          { id: 74, label: "3 ans de validité", status: true },
          { id: 75, label: "Kilométrage illimité", status: true },
          { id: 76, label: "Essence inclus", status: true },
        ] },
      ],
      manual: [
        { id: 15, category_service_id: 2, title: "Formule Conduite Supervisée", price: 1230, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [
          { id: 77, label: "20H de cours de conduite", status: true },
          { id: 78, label: "Gestion de l'élève", status: true },
          { id: 79, label: "Livret d'apprentissage", status: true },
          { id: 80, label: "3 ans de validité", status: true },
          { id: 81, label: "Kilométrage illimité", status: true },
          { id: 82, label: "Essence inclus", status: true },
        ] },
        { id: 16, category_service_id: 2, title: "Formule Conduite Supervisée PLUS", price: 1790, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [
          { id: 83, label: "30H de cours de conduite", status: true },
          { id: 84, label: "Gestion de l'élève", status: true },
          { id: 85, label: "Livret d'apprentissage", status: true },
          { id: 86, label: "3 ans de validité", status: true },
          { id: 87, label: "Kilométrage illimité", status: true },
          { id: 88, label: "Essence inclus", status: true },
        ] },
      ],
    },
    "3": {
      automatic: [
        { id: 17, category_service_id: 3, title: "Formule AAC", price: 1230, time: 60, type: "automatic", hour: 10, month: null, status: 1, items: [
          { id: 89, label: "13H de cours de conduite", status: true },
          { id: 90, label: "Gestion de l'élève", status: true },
          { id: 91, label: "Livret d'apprentissage", status: true },
          { id: 92, label: "3 ans de validité", status: true },
          { id: 93, label: "Kilométrage illimité", status: true },
          { id: 94, label: "Essence inclus", status: true },
        ] },
        { id: 18, category_service_id: 3, title: "Formule AAC PLUS", price: 1790, time: 60, type: "automatic", hour: 10, month: null, status: 1, items: [
          { id: 95, label: "26H de cours de conduite", status: true },
          { id: 96, label: "Gestion de l'élève", status: true },
          { id: 97, label: "Livret d'apprentissage", status: true },
          { id: 98, label: "3 ans de validité", status: true },
          { id: 99, label: "Kilométrage illimité", status: true },
          { id: 100, label: "Essence inclus", status: true },
        ] },
      ],
      manual: [
        { id: 19, category_service_id: 3, title: "Formule AAC", price: 1230, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [
          { id: 101, label: "20H de cours de conduite", status: true },
          { id: 102, label: "Gestion de l'élève", status: true },
          { id: 103, label: "Livret d'apprentissage", status: true },
          { id: 104, label: "3 ans de validité", status: true },
          { id: 105, label: "Kilométrage illimité", status: true },
          { id: 106, label: "Essence inclus", status: true },
        ] },
        { id: 20, category_service_id: 3, title: "Formule AAC PLUS", price: 1790, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [
          { id: 107, label: "30H de cours de conduite", status: true },
          { id: 108, label: "Gestion de l'élève", status: true },
          { id: 109, label: "Livret d'apprentissage", status: true },
          { id: 110, label: "3 ans de validité", status: true },
          { id: 111, label: "Kilométrage illimité", status: true },
          { id: 112, label: "Essence inclus", status: true },
        ] },
      ],
    },
    "4": {
      automatic: [
        { id: 22, category_service_id: 4, title: "Location voiture automatic - sans moniteur SMONI", price: 99, time: 60, type: "automatic", hour: 8, month: 2, status: 1, items: [
          { id: 118, label: "Durée: 08 - 20h", status: true },
          { id: 119, label: "Accompagnateur externe", status: true },
          { id: 120, label: "1 mois de validité", status: true },
          { id: 121, label: "Kilométrage illimité", status: true },
          { id: 122, label: "Essence inclus", status: false },
        ] },
      ],
      manual: [
        { id: 21, category_service_id: 4, title: "Location voiture manuel - sans moniteur SMONI", price: 99, time: 60, type: "manual", hour: 8, month: 2, status: 1, items: [
          { id: 113, label: "Durée: 08 - 20h", status: true },
          { id: 114, label: "Accompagnateur externe", status: true },
          { id: 115, label: "1 mois de validité", status: true },
          { id: 116, label: "Kilométrage illimité", status: true },
          { id: 117, label: "Essence inclus", status: false },
        ] },
      ],
    },
    "5": {
      any: [
        { id: 23, category_service_id: 5, title: "Fabrication Permis", price: 30, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [] },
        { id: 24, category_service_id: 5, title: "Extension contrat", price: 249, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [] },
        { id: 25, category_service_id: 5, title: "Examen code", price: 30, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [] },
        { id: 26, category_service_id: 5, title: "Accompagnement", price: 247, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [
          { id: 123, label: "Frais de dossier - 89€", status: true },
          { id: 124, label: "Location du véhicule - 99€", status: true },
          { id: 125, label: "Prestation accompagnateur - 59€", status: true },
          { id: 126, label: "Véhicule double commande", status: true },
          { id: 127, label: "Accompagnateur qualifié", status: true },
          { id: 128, label: "Kilométrage illimité", status: true },
          { id: 129, label: "Essence inclus", status: true },
        ] },
        { id: 27, category_service_id: 5, title: "Pack code", price: 79, time: 60, type: "manual", hour: 10, month: 2, status: 1, items: [
          { id: 130, label: "Accès illimité à la salle de code durant 4 mois", status: true },
          { id: 131, label: "Code en ligne ou en salle valable 4 mois", status: true },
          { id: 132, label: "Livre de Code", status: true },
          { id: 133, label: "Contrôle de connaissance", status: true },
        ] },
      ],
    },
    "6": {},
    "7": {
      automatic: [
        { id: 29, category_service_id: 7, title: "Location double commande - Automatique", price: 160, time: 60, type: "automatic", hour: 10, month: null, status: 1, items: [
          { id: 136, label: "Véhicule double commande", status: true },
          { id: 137, label: "Usage professionnel", status: true },
        ] },
      ],
      manual: [
        { id: 28, category_service_id: 7, title: "Location double commande - Manuel", price: 150, time: 60, type: "manual", hour: 10, month: null, status: 1, items: [
          { id: 134, label: "Véhicule double commande", status: true },
          { id: 135, label: "Usage professionnel", status: true },
        ] },
      ],
    },
    "8": {
      automatic: [
        { id: 30, category_service_id: 8, title: "Formation Passerelle 7h", price: 549, time: 60, type: "automatic", hour: 7, month: 2, status: 1, items: [
          { id: 138, label: "Formation de 7h - 430€", status: true },
          { id: 139, label: "Frais de dossier - 89€", status: true },
          { id: 140, label: "Fabrication du permis - 30€", status: true },
          { id: 141, label: "Boite AUTOMATIQUE vers boite MANUELLE", status: true },
          { id: 142, label: "6 mois de validité", status: true },
          { id: 143, label: "Kilométrage illimité", status: true },
          { id: 144, label: "Essence inclus", status: true },
        ] },
      ],
      manual: [
        { id: 31, category_service_id: 8, title: "Formation Passerelle 7h", price: 549, time: 60, type: "manual", hour: 7, month: 2, status: 1, items: [
          { id: 145, label: "Formation de 7h - 430€", status: true },
          { id: 146, label: "Frais de dossier - 89€", status: true },
          { id: 147, label: "Fabrication du permis - 30€", status: true },
          { id: 148, label: "Boite AUTOMATIQUE vers boite MANUELLE", status: true },
          { id: 149, label: "6 mois de validité", status: true },
          { id: 150, label: "Kilométrage illimité", status: true },
          { id: 151, label: "Essence inclus", status: true },
        ] },
      ],
    },
    "9": {
      automatic: [
        { id: 32, category_service_id: 9, title: "Formation Post-Permis", price: 99, time: 60, type: "automatic", hour: 7, month: 2, status: 1, items: [
          { id: 152, label: "Formation théorique de 7h", status: true },
          { id: 153, label: "Réduction période probatoire", status: true },
          { id: 154, label: "Échanges entre conducteurs", status: true },
          { id: 155, label: "Uniquement après 6-12 mois", status: true },
        ] },
      ],
      manual: [
        { id: 33, category_service_id: 9, title: "Formation Post-Permis", price: 99, time: 60, type: "manual", hour: 7, month: 2, status: 1, items: [
          { id: 156, label: "Formation théorique de 7h", status: true },
          { id: 157, label: "Réduction période probatoire", status: true },
          { id: 158, label: "Échanges entre conducteurs", status: true },
          { id: 159, label: "Uniquement après 6-12 mois", status: true },
        ] },
      ],
    },
    "10": {},
  },
};

// Profile → plan-title mapping for the DecisionHelper.
// Titles match across automatic/manual records (only price/hour vary), so we
// match by title — keeps the helper working when the user flips transmission.
// Only applies to category 1 (Permis B Classique), which has all six plans.
export interface ProfileMatch {
  id: string;
  label: string;
  short: string;
  /** Title to look up in the active services list. Falls back to "Formule Classique PLUS" if not found. */
  matchTitle: string;
}

export const PROFILES: ProfileMatch[] = [
  { id: "premiere", label: "Première fois au volant", short: "Première fois", matchTitle: "Formule Classique PLUS" },
  { id: "deja",     label: "J'ai déjà conduit",        short: "Déjà conduit",   matchTitle: "Perfectionnement" },
  { id: "recale",   label: "Recalé / révision",        short: "Recalé",         matchTitle: "Leçon de Conduite" },
  { id: "pressed",  label: "Permis express",           short: "Express",        matchTitle: "Formule Accéléré PLUS" },
];
