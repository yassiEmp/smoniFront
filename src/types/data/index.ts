import { PricingCardPropsType } from "@mytypes/general";
import { MeetingPointType } from "../monitor/settings/configuration";

export const LocationPricingManuelData1: PricingCardPropsType = {
  id: "LPM001",
  title: "Location voiture manuel - sans moniteur SMONI",
  price: 99.9,
  list: [
    {
      id: "L001",
      text: "Durée: 08 - 20h",
      valide: true,
    },
    {
      id: "L002",
      text: "Accompagnateur externe",
      valide: true,
    },
    {
      id: "L003",
      text: "1 mois de validité",
      valide: true,
    },
    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: false,
    },
  ],
};

export const LocationPricingManuelData2: PricingCardPropsType = {
  id: "LPM002",
  title: "Location voiture manuel - avec moniteur SMONI",
  price: 99.9,
  list: [
    {
      id: "L001",
      text: "Durée: 08 - 20h",
      valide: true,
    },
    {
      id: "L002",
      text: "Accompagnateur SMONI",
      valide: true,
    },
    {
      id: "L003",
      text: "1 mois de validité",
      valide: true,
    },
    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: false,
    },
  ],
};

export const LocationPricingAutoData1: PricingCardPropsType = {
  id: "LPM003",
  title: "Location voiture automatique - sans moniteur SMONI",
  price: 99,
  list: [
    {
      id: "L001",
      text: "Durée: 08 - 20h",
      valide: true,
    },
    {
      id: "L002",
      text: "Accompagnateur externe",
      valide: true,
    },
    {
      id: "L003",
      text: "1 mois de validité",
      valide: true,
    },
    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: false,
    },
  ],
};

// export const LocationPricingAutoData2: PricingCardPropsType = {
//   id: "LPM004",
//   title: "Location voiture automatique - avec moniteur SMONI",
//   price: 99,
//   list: [
//     {
//       id: "L001",
//       text: "Durée: 08 - 20h",
//       valide: true,
//     },
//     {
//       id: "L002",
//       text: "Accompagnateur SMONI",
//       valide: true,
//     },
//     {
//       id: "L003",
//       text: "1 mois de validité",
//       valide: true,
//     },
//     {
//       id: "L004",
//       text: "Kilométrage illimité",
//       valide: true,
//     },
//     {
//       id: "L005",
//       text: "Essence inclus",
//       valide: false,
//     },
//   ],
// };

// PermisAAC

export const PermisAacPricingData1: PricingCardPropsType = {
  id: "PAPD001",
  title: "Formule AAC",
  price: 1230,
  list: [
    {
      id: "L001",
      text: "20H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "3 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisAacPricingData2: PricingCardPropsType = {
  id: "PAPD002",
  title: "Formule base2-MANUELLE",
  price: 1790,
  list: [
    {
      id: "L001",
      text: "30H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "3 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisAacPricingData4: PricingCardPropsType = {
  id: "PAPD004",
  title: "Pack accéléré2-MANUELLE",
  price: 2205,
  list: [
    {
      id: "L001",
      text: "Code",
      valide: true,
    },
    {
      id: "L002",
      text: "Durée: 30h",
      valide: true,
    },
    {
      id: "L003",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

// Permis conduire auto
export const PermisConduirePricingAutoData1: PricingCardPropsType = {
  id: "PCPA001",
  title: "Leçon de Conduite",
  price: 62,
  list: [
    {
      id: "L001",
      text: "1H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "1 mois de validité",
      valide: true,
    },
    {
      id: "L003",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L004",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisConduirePricingAutoData2: PricingCardPropsType = {
  id: "PCPA002",
  title: "Perfectionnement",
  price: 490,
  list: [
    {
      id: "L001",
      text: "10H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "6 mois de validité",
      valide: true,
    },
    {
      id: "L003",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L004",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisConduirePricingAutoData3: PricingCardPropsType = {
  id: "PCPA003",
  title: "Formule Classique",
  price: 890,
  list: [
    {
      id: "L001",
      text: "13H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisConduirePricingAutoData4: PricingCardPropsType = {
  id: "PCPA004",
  title: "Formule Classique PLUS",
  price: 1750,
  list: [
    {
      id: "L001",
      text: "26H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d'apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisConduirePricingAutoData5: PricingCardPropsType = {
  id: "PCPA005",
  title: "Formule Accéléré",
  price: 998,
  list: [
    {
      id: "L001",
      text: "13H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisConduirePricingAutoData6: PricingCardPropsType = {
  id: "PCPA006",
  title: "Formule Accéléré PLUS",
  price: 1990,
  list: [
    {
      id: "L001",
      text: "26H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisConduirePricingAutoData7: PricingCardPropsType = {
  id: "PCPA007",
  title: "Pack accéléré 2 automatique",
  price: 1990,
  list: [
    {
      id: "L001",
      text: "26H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Code",
      valide: true,
    },
    {
      id: "L003",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisSuperviseManuelleData1: PricingCardPropsType = {
  id: "PSPA001",
  title: "Formule Conduite Supervisée",
  price: 1230,
  list: [
    {
      id: "L001",
      text: "20H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "3 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisSuperviseManuelleData2: PricingCardPropsType = {
  id: "PSPA002",
  title: "Formule Conduite Supervisée PLUS",
  price: 1790,
  list: [
    {
      id: "L001",
      text: "30H de cours de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "L003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "L004",
      text: "3 an de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisSupervisePricingAutoData1: PricingCardPropsType = {
  id: "PSMD001",
  title: "Formule base 1 manuelle",
  price: 1149,
  list: [
    {
      id: "L001",
      text: "code",
      valide: true,
    },
    {
      id: "L002",
      text: "20h de conduite",
      valide: true,
    },
    {
      id: "L003",
      text: "1an de validité",
      valide: true,
    },

    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisSupervisePricingAutoData2: PricingCardPropsType = {
  id: "PSMD002",
  title: "Formule base 2 manuelle",
  price: 1549,
  list: [
    {
      id: "L001",
      text: "code",
      valide: true,
    },
    {
      id: "L002",
      text: "30h de conduite",
      valide: true,
    },
    {
      id: "L003",
      text: "1an de validité",
      valide: true,
    },

    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PermisSuperviseManuelleData4: PricingCardPropsType = {
  id: "PSMD004",
  title: "pack accéléré 2 manuelle",
  price: 1990,
  list: [
    {
      id: "L001",
      text: "code",
      valide: true,
    },
    {
      id: "L002",
      text: "30h de conduite",
      valide: true,
    },
    {
      id: "L003",
      text: "1an de validité",
      valide: true,
    },

    {
      id: "L004",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

// ---------------------
export const PermisBAACPricingAutoData1: PricingCardPropsType = {
  id: "LPBPAD1",
  title: "formule base 1 - AUTOMATIQUE",
  price: 855,
  list: [
    {
      id: "L001",
      text: "Durée: 13h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L003",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const PermisBAACPricingAutoData2: PricingCardPropsType = {
  id: "LPBPAD2",
  title: "formule base 2 - AUTOMATIQUE",
  price: 1590,
  list: [
    {
      id: "L001",
      text: "Durée: 26h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L003",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const PermisBAACPricingAutoData3: PricingCardPropsType = {
  id: "LPBPAD3",
  title: "pack accéléré 1 - AUTOMATIQUE",
  price: 990,
  list: [
    {
      id: "L001",
      text: "Durée: 13h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L003",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const PermisBAACPricingAutoData4: PricingCardPropsType = {
  id: "LPBPAD4",
  title: "pack accéléré 2 - AUTOMATIQUE",
  price: 1849,
  list: [
    {
      id: "L001",
      text: "Durée: 26h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L00”",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const PermisBAACPricingAutoData5: PricingCardPropsType = {
  id: "LPBPAD5",
  title: "formule base 2 - MANUELLE",
  price: 1149,
  list: [
    {
      id: "L001",
      text: "Durée: 20h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L00”",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const PermisBAACPricingAutoData6: PricingCardPropsType = {
  id: "LPBPAD6",
  title: "formule base 2 - MANUELLE",
  price: 1549,
  list: [
    {
      id: "L001",
      text: "Durée: 30h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L00”",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const PermisBAACPricingAutoData7: PricingCardPropsType = {
  id: "LPBPAD7",
  title: "pack accéléré 1 - MANUELLE",
  price: 1509,
  list: [
    {
      id: "L001",
      text: "Durée: 20h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L00”",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const PermisBAACPricingAutoData8: PricingCardPropsType = {
  id: "LPBPA8",
  title: "pack accéléré 2 - MANUELLE",
  price: 1990,
  list: [
    {
      id: "L001",
      text: "Durée: 30h de conduite",
      valide: true,
    },
    {
      id: "L002",
      text: "Validité du forfait: 1 an",
      valide: true,
    },
    {
      id: "L00”",
      text: "Code",
      valide: true,
    },
    {
      id: "L004",
      text: " Km illimité",
      valide: true,
    },
    {
      id: "L005",
      text: "essence inclus",
      valide: true,
    },
  ],
};

// Autre services

export const DrivingLicenseManualData: PricingCardPropsType = {
  id: "DLM001",
  title: "Leçon de Conduite",
  price: 62,
  unit: "€/h",
  list: [
    {
      id: "D001",
      text: "1H Cours de conduite",
      valide: true,
    },
    {
      id: "D002",
      text: "1 mois de validité",
      valide: true,
    },
    {
      id: "D003",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "D004",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const DrivingImprovementManualData: PricingCardPropsType = {
  id: "DIM001",
  title: "Perfectionnement",
  price: 490,
  list: [
    {
      id: "P001",
      text: "10H de cours de conduite",
      valide: true,
    },
    {
      id: "P002",
      text: "6 mois de validité",
      valide: true,
    },
    {
      id: "P003",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "P004",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const MiniPackManualData: PricingCardPropsType = {
  id: "MPM001",
  title: "Formule classique",
  price: 1130,
  list: [
    {
      id: "M001",
      text: "20H de cours de conduite",
      valide: true,
    },
    {
      id: "M002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "M003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "M004",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "M005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "M006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const BaseFormula1ManualData: PricingCardPropsType = {
  id: "BFM001",
  title: "Formule Classique PLUS",
  price: 1690,
  list: [
    {
      id: "B001",
      text: "30H de cours de conduite",
      valide: true,
    },
    {
      id: "B002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "B003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "B004",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "B005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "B006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const BaseFormula2ManualData: PricingCardPropsType = {
  id: "BFM002",
  title: "Formule Accéléré",
  price: 1590,
  list: [
    {
      id: "B101",
      text: "20H de cours de conduite",
      valide: true,
    },
    {
      id: "B102",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "B103",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "B104",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "B105",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "B105",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const AcceleratedPack1ManualData: PricingCardPropsType = {
  id: "APM001",
  title: "Formule Accéléré PLUS",
  price: 2290,
  list: [
    {
      id: "A001",
      text: "30H de cours de conduite",
      valide: true,
    },
    {
      id: "A002",
      text: "Gestion de l’élève",
      valide: true,
    },
    {
      id: "A003",
      text: "Livret d’apprentissage",
      valide: true,
    },
    {
      id: "A004",
      text: "1 an de validité",
      valide: true,
    },
    {
      id: "A005",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "A006",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const AcceleratedPack2ManualData: PricingCardPropsType = {
  id: "APM002",
  title: "Pack accéléré 2 - MANUELLE",
  price: 2290,
  list: [
    {
      id: "A101",
      text: "Code",
      valide: true,
    },
    {
      id: "A102",
      text: "30h de conduite",
      valide: true,
    },
    {
      id: "A103",
      text: "Validité du forfait : 1 an",
      valide: true,
    },
    {
      id: "A104",
      text: "Kilométrage illimité ",
      valide: true,
    },
    {
      id: "A105",
      text: "essence inclus",
      valide: true,
    },
  ],
};

export const AccompagnementExamen: PricingCardPropsType = {
  id: "EAD001",
  title: "Accompagnement",
  price: 247,
  list: [
    {
      id: "L001",
      text: "Frais de dossier - 89€",
      valide: true,
    },
    {
      id: "L002",
      text: "Location du véhicule - 99€",
      valide: true,
    },
    {
      id: "L003",
      text: "Prestation accompagnateur - 59€",
      valide: true,
    },
    {
      id: "L004",
      text: "Véhicule double commande",
      valide: true,
    },
    {
      id: "L005",
      text: "Accompagnateur qualifié",
      valide: true,
    },
    {
      id: "L006",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L007",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PasserelleData: PricingCardPropsType = {
  id: "PD001",
  title: "Passerelle",
  price: 549,
  list: [
    {
      id: "L001",
      text: "Formation de 7h - 430€",
      valide: true,
    },
    {
      id: "L002",
      text: "Frais de dossier - 89€",
      valide: true,
    },
    {
      id: "L003",
      text: "Fabrication du permis - 30€",
      valide: true,
    },
    {
      id: "L004",
      text: "Boite AUTOMATIQUE vers boite MANUELLE",
      valide: true,
    },
    {
      id: "L005",
      text: "Formation certifiante",
      valide: true,
    },
    {
      id: "L006",
      text: "6 mois de validité",
      valide: true,
    },
    {
      id: "L007",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L008",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const ExtensionContrat: PricingCardPropsType = {
  id: "AC001",
  title: "Extension contrat",
  price: 299,
  list: [

  ],
};

export const CodeEnLigne: PricingCardPropsType = {
  id: "CEL001",
  title: "Code",
  price: 30,
  list: [
    {
      id: "L001",
      text: "Code en ligne",
      valide: true,
    },
    {
      id: "L002",
      text: "4 mois de validité",
      valide: true,
    },
  ],
};

export const ExamenCode: PricingCardPropsType = {
  id: "EC001",
  title: "Examen code",
  price: 30,
  list: [

  ],
};

export const FabricationPermis: PricingCardPropsType = {
  id: "FP001",
  title: "Fabrication Permis",
  price: 30,
  list: [

  ],
};

export const Passerelle: PricingCardPropsType = {
  id: "PA001",
  title: "Passerelle",
  price: 549,
  list: [
    {
      id: "L001",
      text: "Formation de 7h - 430€",
      valide: true,
    },
    {
      id: "L002",
      text: "Frais de dossier - 89€",
      valide: true,
    },
    {
      id: "L003",
      text: "Fabrication du permis - 30€",
      valide: true,
    },
    {
      id: "L004",
      text: "7H de cours certifiant",
      valide: true,
    },
    {
      id: "L005",
      text: "Formation boite automatique vers boite manuelle",
      valide: true,
    },
    {
      id: "L006",
      text: "6 mois de validité",
      valide: true,
    },
    {
      id: "L007",
      text: "kilométrage illimité",
      valide: true,
    },
    {
      id: "L008",
      text: "Essence inclus",
      valide: true,
    },
  ],
};

export const PackCode: PricingCardPropsType = {
  id: "PA002",
  title: "Pack code",
  price: 249,
  list: [
    {
      id: "L001",
      text: "Accès illimité (cours thématique + controle de connaisance) à la salle de code durant 4 mois",
      valide: true,
    },
    {
      id: "L002",
      text: "Code en ligne ou en salle valable 4mois",
      valide: true,
    },
    {
      id: "L003",
      text: "Délivrance de la maitrise de la boite manuelle",
      valide: true,
    },
    {
      id: "L004",
      text: "4 mois de validité",
      valide: true,
    },
    {
      id: "L005",
      text: "Livre de Code",
      valide: true,
    },
    {
      id: "L006",
      text: "Contrôle de connaissance du Code en ligne (e-learning)",
      valide: true,
    },
  ],
};

export const AccompagnementExamenPratique: PricingCardPropsType = {
  id: "EC002",
  title: "Accompagnement à l'examen",
  price: 247,
  list: [
    {
      id: "L001",
      text: "Frais de dossier - 89€",
      valide: true,
    },
    {
      id: "L002",
      text: "Location du véhicule - 99€",
      valide: true,
    },
    {
      id: "L003",
      text: "Prestation accompagnateur - 59€",
      valide: true,
    },
    {
      id: "L004",
      text: "Véhicule double commande",
      valide: true,
    },
    {
      id: "L005",
      text: "Accompagnateur qualifié",
      valide: true,
    },
    {
      id: "L006",
      text: "Kilométrage illimité",
      valide: true,
    },
    {
      id: "L007",
      text: "Essence inclus",
      valide: true,
    },
  ],
};




export const meetingPoints: MeetingPointType[] = [
  {
    "label": "Mairie de MONTESSON",
    "address": "\u00cele-de-France - MONTESSON",
    "city": "MONTESSON",
    "postal_code": "418",
    "latitude": 48.90861634,
    "longitude": 2.14972193,
    "id": 1
  },
  {
    "label": "Mairie de EGLY",
    "address": "\u00cele-de-France - EGLY",
    "city": "EGLY",
    "postal_code": "207",
    "latitude": 48.58063976,
    "longitude": 2.2240609,
    "id": 2
  },
  {
    "label": "Mairie de LA FORET-SAINTE-CROIX",
    "address": "\u00cele-de-France - LA FORET-SAINTE-CROIX",
    "city": "LA FORET-SAINTE-CROIX",
    "postal_code": "248",
    "latitude": 48.3846639,
    "longitude": 2.22988355,
    "id": 3
  },
  {
    "label": "Mairie de PECQUEUSE",
    "address": "\u00cele-de-France - PECQUEUSE",
    "city": "PECQUEUSE",
    "postal_code": "482",
    "latitude": 48.645964,
    "longitude": 2.04892966,
    "id": 4
  },
  {
    "label": "Mairie de SOUZY-LA-BRICHE",
    "address": "\u00cele-de-France - SOUZY-LA-BRICHE",
    "city": "SOUZY-LA-BRICHE",
    "postal_code": "602",
    "latitude": 48.52930294,
    "longitude": 2.14837775,
    "id": 5
  },
  {
    "label": "Mairie de STAINS",
    "address": "\u00cele-de-France - STAINS",
    "city": "STAINS",
    "postal_code": "72",
    "latitude": 48.95548734,
    "longitude": 2.3815363400000003,
    "id": 6
  },
  {
    "label": "Mairie de SEUGY",
    "address": "\u00cele-de-France - SEUGY",
    "city": "SEUGY",
    "postal_code": "594",
    "latitude": 49.12082559,
    "longitude": 2.39399912,
    "id": 7
  },
  {
    "label": "Mairie de VALLANGOUJARD",
    "address": "\u00cele-de-France - VALLANGOUJARD",
    "city": "VALLANGOUJARD",
    "postal_code": "627",
    "latitude": 49.13949627,
    "longitude": 2.1119063,
    "id": 8
  },
  {
    "label": "Mairie de LIZY-SUR-OURCQ",
    "address": "\u00cele-de-France - LIZY-SUR-OURCQ",
    "city": "LIZY-SUR-OURCQ",
    "postal_code": "257",
    "latitude": 49.02542272,
    "longitude": 3.0224739,
    "id": 9
  },
  {
    "label": "Mairie de MEIGNEUX",
    "address": "\u00cele-de-France - MEIGNEUX",
    "city": "MEIGNEUX",
    "postal_code": "286",
    "latitude": 48.51168831,
    "longitude": 3.1036812400000002,
    "id": 10
  },
  {
    "label": "Mairie de THIEUX",
    "address": "\u00cele-de-France - THIEUX",
    "city": "THIEUX",
    "postal_code": "462",
    "latitude": 49.00985788,
    "longitude": 2.66708769,
    "id": 11
  },
  {
    "label": "Mairie de VARREDDES",
    "address": "\u00cele-de-France - VARREDDES",
    "city": "VARREDDES",
    "postal_code": "483",
    "latitude": 49.00255574,
    "longitude": 2.92928973,
    "id": 12
  },
  {
    "label": "Mairie de BLANDY",
    "address": "\u00cele-de-France - BLANDY",
    "city": "BLANDY",
    "postal_code": "34",
    "latitude": 48.56637416,
    "longitude": 2.78212013,
    "id": 13
  },
  {
    "label": "Mairie de COMMENY",
    "address": "\u00cele-de-France - COMMENY",
    "city": "COMMENY",
    "postal_code": "169",
    "latitude": 49.12629427,
    "longitude": 1.8901627699999999,
    "id": 14
  },
  {
    "label": "Mairie de BOIS-LE-ROI",
    "address": "\u00cele-de-France - BOIS-LE-ROI",
    "city": "BOIS-LE-ROI",
    "postal_code": "37",
    "latitude": 48.47316766,
    "longitude": 2.6975005999999997,
    "id": 15
  },
  {
    "label": "Mairie de CHAUMES-EN-BRIE",
    "address": "\u00cele-de-France - CHAUMES-EN-BRIE",
    "city": "CHAUMES-EN-BRIE",
    "postal_code": "107",
    "latitude": 48.66771002,
    "longitude": 2.84269813,
    "id": 16
  },
  {
    "label": "Mairie de COUPVRAY",
    "address": "\u00cele-de-France - COUPVRAY",
    "city": "COUPVRAY",
    "postal_code": "132",
    "latitude": 48.89171541,
    "longitude": 2.79309014,
    "id": 17
  },
  {
    "label": "Mairie de ESBLY",
    "address": "\u00cele-de-France - ESBLY",
    "city": "ESBLY",
    "postal_code": "171",
    "latitude": 48.90332397,
    "longitude": 2.81227793,
    "id": 18
  },
  {
    "label": "Mairie de LA TRETOIRE",
    "address": "\u00cele-de-France - LA TRETOIRE",
    "city": "LA TRETOIRE",
    "postal_code": "472",
    "latitude": 48.87379674,
    "longitude": 3.25210036,
    "id": 19
  },
  {
    "label": "Mairie de AIGREMONT",
    "address": "\u00cele-de-France - AIGREMONT",
    "city": "AIGREMONT",
    "postal_code": "7",
    "latitude": 48.90294646,
    "longitude": 2.01887185,
    "id": 20
  },
  {
    "label": "Mairie de BLARU",
    "address": "\u00cele-de-France - BLARU",
    "city": "BLARU",
    "postal_code": "68",
    "latitude": 49.04856179,
    "longitude": 1.47796556,
    "id": 21
  },
  {
    "label": "Mairie de FONTENAY-SAINT-PERE",
    "address": "\u00cele-de-France - FONTENAY-SAINT-PERE",
    "city": "FONTENAY-SAINT-PERE",
    "postal_code": "246",
    "latitude": 49.0268509,
    "longitude": 1.75163739,
    "id": 22
  },
  {
    "label": "Mairie de EPINAY-SUR-ORGE",
    "address": "\u00cele-de-France - EPINAY-SUR-ORGE",
    "city": "EPINAY-SUR-ORGE",
    "postal_code": "216",
    "latitude": 48.6741793,
    "longitude": 2.32700753,
    "id": 23
  },
  {
    "label": "Mairie de CHATEAUFORT",
    "address": "\u00cele-de-France - CHATEAUFORT",
    "city": "CHATEAUFORT",
    "postal_code": "143",
    "latitude": 48.73684316,
    "longitude": 2.09055097,
    "id": 24
  },
  {
    "label": "Mairie de LE TREMBLAY-SUR-MAULDRE",
    "address": "\u00cele-de-France - LE TREMBLAY-SUR-MAULDRE",
    "city": "LE TREMBLAY-SUR-MAULDRE",
    "postal_code": "623",
    "latitude": 48.77755874,
    "longitude": 1.8782051499999999,
    "id": 25
  },
  {
    "label": "Mairie de SAINT-CLOUD",
    "address": "\u00cele-de-France - SAINT-CLOUD",
    "city": "SAINT-CLOUD",
    "postal_code": "64",
    "latitude": 48.84668917,
    "longitude": 2.21530993,
    "id": 26
  },
  {
    "label": "Mairie de HAUTE-ISLE",
    "address": "\u00cele-de-France - HAUTE-ISLE",
    "city": "HAUTE-ISLE",
    "postal_code": "301",
    "latitude": 49.08386729,
    "longitude": 1.6579632800000002,
    "id": 27
  },
  {
    "label": "Mairie de OMERVILLE",
    "address": "\u00cele-de-France - OMERVILLE",
    "city": "OMERVILLE",
    "postal_code": "462",
    "latitude": 49.14080765,
    "longitude": 1.71884352,
    "id": 28
  },
  {
    "label": "Mairie de BURCY",
    "address": "\u00cele-de-France - BURCY",
    "city": "BURCY",
    "postal_code": "56",
    "latitude": 48.23891331,
    "longitude": 2.52226023,
    "id": 29
  },
  {
    "label": "Mairie de CHAILLY-EN-BIERE",
    "address": "\u00cele-de-France - CHAILLY-EN-BIERE",
    "city": "CHAILLY-EN-BIERE",
    "postal_code": "69",
    "latitude": 48.46711604,
    "longitude": 2.60688357,
    "id": 30
  },
  {
    "label": "Mairie de COUTENCON",
    "address": "\u00cele-de-France - COUTENCON",
    "city": "COUTENCON",
    "postal_code": "140",
    "latitude": 48.47098042,
    "longitude": 2.99627506,
    "id": 31
  },
  {
    "label": "Mairie de NOINTEL",
    "address": "\u00cele-de-France - NOINTEL",
    "city": "NOINTEL",
    "postal_code": "452",
    "latitude": 49.12801853,
    "longitude": 2.29131882,
    "id": 32
  },
  {
    "label": "Mairie de SAINT-CLAIR-SUR-EPTE",
    "address": "\u00cele-de-France - SAINT-CLAIR-SUR-EPTE",
    "city": "SAINT-CLAIR-SUR-EPTE",
    "postal_code": "541",
    "latitude": 49.20709005,
    "longitude": 1.67965052,
    "id": 33
  },
  {
    "label": "Mairie de BREUIL-BOIS-ROBERT",
    "address": "\u00cele-de-France - BREUIL-BOIS-ROBERT",
    "city": "BREUIL-BOIS-ROBERT",
    "postal_code": "104",
    "latitude": 48.9457959,
    "longitude": 1.71707999,
    "id": 34
  },
  {
    "label": "Mairie de MILLEMONT",
    "address": "\u00cele-de-France - MILLEMONT",
    "city": "MILLEMONT",
    "postal_code": "404",
    "latitude": 48.80932511,
    "longitude": 1.74456583,
    "id": 35
  },
  {
    "label": "Mairie de IGNY",
    "address": "\u00cele-de-France - IGNY",
    "city": "IGNY",
    "postal_code": "312",
    "latitude": 48.74244054,
    "longitude": 2.22642665,
    "id": 36
  },
  {
    "label": "Mairie de MANDRES-LES-ROSES",
    "address": "\u00cele-de-France - MANDRES-LES-ROSES",
    "city": "MANDRES-LES-ROSES",
    "postal_code": "47",
    "latitude": 48.701864,
    "longitude": 2.54427574,
    "id": 37
  },
  {
    "label": "Mairie de LE BELLAY-EN-VEXIN",
    "address": "\u00cele-de-France - LE BELLAY-EN-VEXIN",
    "city": "LE BELLAY-EN-VEXIN",
    "postal_code": "54",
    "latitude": 49.15143718,
    "longitude": 1.88583527,
    "id": 38
  },
  {
    "label": "Mairie de CRISENOY",
    "address": "\u00cele-de-France - CRISENOY",
    "city": "CRISENOY",
    "postal_code": "145",
    "latitude": 48.5952807,
    "longitude": 2.74306591,
    "id": 39
  },
  {
    "label": "Mairie de LISSY",
    "address": "\u00cele-de-France - LISSY",
    "city": "LISSY",
    "postal_code": "253",
    "latitude": 48.62689531,
    "longitude": 2.69585141,
    "id": 40
  },
  {
    "label": "Mairie de MESSY",
    "address": "\u00cele-de-France - MESSY",
    "city": "MESSY",
    "postal_code": "292",
    "latitude": 48.96662423,
    "longitude": 2.7009350999999997,
    "id": 41
  },
  {
    "label": "Mairie de NANTEAU-SUR-ESSONNE",
    "address": "\u00cele-de-France - NANTEAU-SUR-ESSONNE",
    "city": "NANTEAU-SUR-ESSONNE",
    "postal_code": "328",
    "latitude": 48.31635569,
    "longitude": 2.41739157,
    "id": 42
  },
  {
    "label": "Mairie de VAUCOURTOIS",
    "address": "\u00cele-de-France - VAUCOURTOIS",
    "city": "VAUCOURTOIS",
    "postal_code": "484",
    "latitude": 48.8954994,
    "longitude": 2.95123888,
    "id": 43
  },
  {
    "label": "Mairie de DOUE",
    "address": "\u00cele-de-France - DOUE",
    "city": "DOUE",
    "postal_code": "162",
    "latitude": 48.86635562,
    "longitude": 3.16341632,
    "id": 44
  },
  {
    "label": "Mairie de EVERLY",
    "address": "\u00cele-de-France - EVERLY",
    "city": "EVERLY",
    "postal_code": "174",
    "latitude": 48.46660367,
    "longitude": 3.24902788,
    "id": 45
  },
  {
    "label": "Mairie de LOUAN-VILLEGRUIS-FONTAINE",
    "address": "\u00cele-de-France - LOUAN-VILLEGRUIS-FONTAINE",
    "city": "LOUAN-VILLEGRUIS-FONTAINE",
    "postal_code": "262",
    "latitude": 48.62554283,
    "longitude": 3.47827552,
    "id": 46
  },
  {
    "label": "Mairie de SAINT-GERMAIN-SOUS-DOUE",
    "address": "\u00cele-de-France - SAINT-GERMAIN-SOUS-DOUE",
    "city": "SAINT-GERMAIN-SOUS-DOUE",
    "postal_code": "411",
    "latitude": 48.85120854,
    "longitude": 3.14410786,
    "id": 47
  },
  {
    "label": "Mairie de SAINT-HILLIERS",
    "address": "\u00cele-de-France - SAINT-HILLIERS",
    "city": "SAINT-HILLIERS",
    "postal_code": "414",
    "latitude": 48.621171939999996,
    "longitude": 3.25715619,
    "id": 48
  },
  {
    "label": "Mairie de SAINT-OUEN-EN-BRIE",
    "address": "\u00cele-de-France - SAINT-OUEN-EN-BRIE",
    "city": "SAINT-OUEN-EN-BRIE",
    "postal_code": "428",
    "latitude": 48.55769761,
    "longitude": 2.9174697,
    "id": 49
  },
  {
    "label": "Mairie de SAMOIS-SUR-SEINE",
    "address": "\u00cele-de-France - SAMOIS-SUR-SEINE",
    "city": "SAMOIS-SUR-SEINE",
    "postal_code": "441",
    "latitude": 48.45231828,
    "longitude": 2.75006519,
    "id": 50
  },
  {
    "label": "Mairie de SOISY-BOUY",
    "address": "\u00cele-de-France - SOISY-BOUY",
    "city": "SOISY-BOUY",
    "postal_code": "456",
    "latitude": 48.5111974,
    "longitude": 3.29445866,
    "id": 51
  },
  {
    "label": "Mairie de TOURNAN-EN-BRIE",
    "address": "\u00cele-de-France - TOURNAN-EN-BRIE",
    "city": "TOURNAN-EN-BRIE",
    "postal_code": "470",
    "latitude": 48.74081031,
    "longitude": 2.7686638500000003,
    "id": 52
  },
  {
    "label": "Mairie de BOINVILLIERS",
    "address": "\u00cele-de-France - BOINVILLIERS",
    "city": "BOINVILLIERS",
    "postal_code": "72",
    "latitude": 48.91762604,
    "longitude": 1.6601435,
    "id": 53
  },
  {
    "label": "Mairie de VAUGRIGNEUSE",
    "address": "\u00cele-de-France - VAUGRIGNEUSE",
    "city": "VAUGRIGNEUSE",
    "postal_code": "634",
    "latitude": 48.60207325,
    "longitude": 2.12236219,
    "id": 54
  },
  {
    "label": "Mairie de WISSOUS",
    "address": "\u00cele-de-France - WISSOUS",
    "city": "WISSOUS",
    "postal_code": "689",
    "latitude": 48.73080699,
    "longitude": 2.32699638,
    "id": 55
  },
  {
    "label": "Mairie de ALFORTVILLE",
    "address": "\u00cele-de-France - ALFORTVILLE",
    "city": "ALFORTVILLE",
    "postal_code": "2",
    "latitude": 48.79728803,
    "longitude": 2.42357552,
    "id": 56
  },
  {
    "label": "Mairie de VALENTON",
    "address": "\u00cele-de-France - VALENTON",
    "city": "VALENTON",
    "postal_code": "74",
    "latitude": 48.74511788,
    "longitude": 2.46697976,
    "id": 57
  },
  {
    "label": "Mairie de AINCOURT",
    "address": "\u00cele-de-France - AINCOURT",
    "city": "AINCOURT",
    "postal_code": "8",
    "latitude": 49.07278329,
    "longitude": 1.77300046,
    "id": 58
  },
  {
    "label": "Mairie de GENICOURT",
    "address": "\u00cele-de-France - GENICOURT",
    "city": "GENICOURT",
    "postal_code": "271",
    "latitude": 49.08908754,
    "longitude": 2.06834555,
    "id": 59
  },
  {
    "label": "Mairie de BAZOCHES-LES-BRAY",
    "address": "\u00cele-de-France - BAZOCHES-LES-BRAY",
    "city": "BAZOCHES-LES-BRAY",
    "postal_code": "25",
    "latitude": 48.39872552,
    "longitude": 3.1884375,
    "id": 60
  },
  {
    "label": "Mairie de CHEVILLY-LARUE",
    "address": "\u00cele-de-France - CHEVILLY-LARUE",
    "city": "CHEVILLY-LARUE",
    "postal_code": "21",
    "latitude": 48.76675923,
    "longitude": 2.35282272,
    "id": 61
  },
  {
    "label": "Mairie de BAILLET-EN-FRANCE",
    "address": "\u00cele-de-France - BAILLET-EN-FRANCE",
    "city": "BAILLET-EN-FRANCE",
    "postal_code": "42",
    "latitude": 49.06242644,
    "longitude": 2.29958178,
    "id": 62
  },
  {
    "label": "Mairie de SAINTE-MESME",
    "address": "\u00cele-de-France - SAINTE-MESME",
    "city": "SAINTE-MESME",
    "postal_code": "569",
    "latitude": 48.53064672,
    "longitude": 1.9588809600000001,
    "id": 63
  },
  {
    "label": "Mairie de CROSNE",
    "address": "\u00cele-de-France - CROSNE",
    "city": "CROSNE",
    "postal_code": "191",
    "latitude": 48.71456339,
    "longitude": 2.46147038,
    "id": 64
  },
  {
    "label": "Mairie de LIMOURS",
    "address": "\u00cele-de-France - LIMOURS",
    "city": "LIMOURS",
    "postal_code": "338",
    "latitude": 48.64512796,
    "longitude": 2.07606404,
    "id": 65
  },
  {
    "label": "Mairie de LINAS",
    "address": "\u00cele-de-France - LINAS",
    "city": "LINAS",
    "postal_code": "339",
    "latitude": 48.6337093,
    "longitude": 2.26734346,
    "id": 66
  },
  {
    "label": "Mairie de PLESSIS-SAINT-BENOIST",
    "address": "\u00cele-de-France - PLESSIS-SAINT-BENOIST",
    "city": "PLESSIS-SAINT-BENOIST",
    "postal_code": "495",
    "latitude": 48.44358333,
    "longitude": 2.00545394,
    "id": 67
  },
  {
    "label": "Mairie de CHATILLON",
    "address": "\u00cele-de-France - CHATILLON",
    "city": "CHATILLON",
    "postal_code": "20",
    "latitude": 48.80090465,
    "longitude": 2.28888715,
    "id": 68
  },
  {
    "label": "Mairie de GUERCHEVILLE",
    "address": "\u00cele-de-France - GUERCHEVILLE",
    "city": "GUERCHEVILLE",
    "postal_code": "220",
    "latitude": 48.25953309,
    "longitude": 2.55734235,
    "id": 69
  },
  {
    "label": "Mairie de LE PLESSIS-FEU-AUSSOUX",
    "address": "\u00cele-de-France - LE PLESSIS-FEU-AUSSOUX",
    "city": "LE PLESSIS-FEU-AUSSOUX",
    "postal_code": "365",
    "latitude": 48.71708284,
    "longitude": 3.03335344,
    "id": 70
  },
  {
    "label": "Mairie de SAINT-MAMMES",
    "address": "\u00cele-de-France - SAINT-MAMMES",
    "city": "SAINT-MAMMES",
    "postal_code": "419",
    "latitude": 48.38644546,
    "longitude": 2.81433605,
    "id": 71
  },
  {
    "label": "Mairie de EPINAY-SUR-SEINE",
    "address": "\u00cele-de-France - EPINAY-SUR-SEINE",
    "city": "EPINAY-SUR-SEINE",
    "postal_code": "31",
    "latitude": 48.95459326,
    "longitude": 2.3078478000000002,
    "id": 72
  },
  {
    "label": "Mairie de ERAGNY",
    "address": "\u00cele-de-France - ERAGNY",
    "city": "ERAGNY",
    "postal_code": "218",
    "latitude": 49.01725035,
    "longitude": 2.09194548,
    "id": 73
  },
  {
    "label": "Mairie de OSNY",
    "address": "\u00cele-de-France - OSNY",
    "city": "OSNY",
    "postal_code": "476",
    "latitude": 49.05942224,
    "longitude": 2.06303053,
    "id": 74
  },
  {
    "label": "Mairie de AMILLIS",
    "address": "\u00cele-de-France - AMILLIS",
    "city": "AMILLIS",
    "postal_code": "2",
    "latitude": 48.74165364,
    "longitude": 3.12881662,
    "id": 75
  },
  {
    "label": "Mairie de BOISSISE-LA-BERTRAND",
    "address": "\u00cele-de-France - BOISSISE-LA-BERTRAND",
    "city": "BOISSISE-LA-BERTRAND",
    "postal_code": "39",
    "latitude": 48.52738665,
    "longitude": 2.58960029,
    "id": 76
  },
  {
    "label": "Mairie de CHALIFERT",
    "address": "\u00cele-de-France - CHALIFERT",
    "city": "CHALIFERT",
    "postal_code": "75",
    "latitude": 48.88819702,
    "longitude": 2.77261626,
    "id": 77
  },
  {
    "label": "Mairie de FONTAINEBLEAU",
    "address": "\u00cele-de-France - FONTAINEBLEAU",
    "city": "FONTAINEBLEAU",
    "postal_code": "186",
    "latitude": 48.40932536,
    "longitude": 2.70111222,
    "id": 78
  },
  {
    "label": "Mairie de LA TOMBE",
    "address": "\u00cele-de-France - LA TOMBE",
    "city": "LA TOMBE",
    "postal_code": "467",
    "latitude": 48.388607,
    "longitude": 3.08973009,
    "id": 79
  },
  {
    "label": "Mairie de MORTERY",
    "address": "\u00cele-de-France - MORTERY",
    "city": "MORTERY",
    "postal_code": "319",
    "latitude": 48.59867955,
    "longitude": 3.2594700100000003,
    "id": 80
  },
  {
    "label": "Mairie de RECLOSES",
    "address": "\u00cele-de-France - RECLOSES",
    "city": "RECLOSES",
    "postal_code": "386",
    "latitude": 48.34745888,
    "longitude": 2.64133604,
    "id": 81
  },
  {
    "label": "Mairie de CHAMBOURCY",
    "address": "\u00cele-de-France - CHAMBOURCY",
    "city": "CHAMBOURCY",
    "postal_code": "133",
    "latitude": 48.90569882,
    "longitude": 2.04066792,
    "id": 82
  },
  {
    "label": "Mairie de GRESSEY",
    "address": "\u00cele-de-France - GRESSEY",
    "city": "GRESSEY",
    "postal_code": "285",
    "latitude": 48.83373402,
    "longitude": 1.6081412099999999,
    "id": 83
  },
  {
    "label": "Mairie de MONDEVILLE",
    "address": "\u00cele-de-France - MONDEVILLE",
    "city": "MONDEVILLE",
    "postal_code": "412",
    "latitude": 48.49167102,
    "longitude": 2.4149555,
    "id": 84
  },
  {
    "label": "Mairie de TIGERY",
    "address": "\u00cele-de-France - TIGERY",
    "city": "TIGERY",
    "postal_code": "617",
    "latitude": 48.63989816,
    "longitude": 2.5087644300000003,
    "id": 85
  },
  {
    "label": "Mairie de DRANCY",
    "address": "\u00cele-de-France - DRANCY",
    "city": "DRANCY",
    "postal_code": "29",
    "latitude": 48.92309379,
    "longitude": 2.4456053300000002,
    "id": 86
  },
  {
    "label": "Mairie de ENNERY",
    "address": "\u00cele-de-France - ENNERY",
    "city": "ENNERY",
    "postal_code": "211",
    "latitude": 49.07479041,
    "longitude": 2.10671761,
    "id": 87
  },
  {
    "label": "Mairie de AUBEPIERRE-OZOUER-LE-REPOS",
    "address": "\u00cele-de-France - AUBEPIERRE-OZOUER-LE-REPOS",
    "city": "AUBEPIERRE-OZOUER-LE-REPOS",
    "postal_code": "10",
    "latitude": 48.63155617,
    "longitude": 2.88710054,
    "id": 88
  },
  {
    "label": "Mairie de CHEVRY-COSSIGNY",
    "address": "\u00cele-de-France - CHEVRY-COSSIGNY",
    "city": "CHEVRY-COSSIGNY",
    "postal_code": "114",
    "latitude": 48.72496902,
    "longitude": 2.6625633300000002,
    "id": 89
  },
  {
    "label": "Mairie de LOGNES",
    "address": "\u00cele-de-France - LOGNES",
    "city": "LOGNES",
    "postal_code": "258",
    "latitude": 48.83561189,
    "longitude": 2.62785879,
    "id": 90
  },
  {
    "label": "Mairie de LUZANCY",
    "address": "\u00cele-de-France - LUZANCY",
    "city": "LUZANCY",
    "postal_code": "265",
    "latitude": 48.973141150000004,
    "longitude": 3.18696381,
    "id": 91
  },
  {
    "label": "Mairie de OCQUERRE",
    "address": "\u00cele-de-France - OCQUERRE",
    "city": "OCQUERRE",
    "postal_code": "343",
    "latitude": 49.03870059,
    "longitude": 3.05682157,
    "id": 92
  },
  {
    "label": "Mairie de VILLENEUVE-SAINT-DENIS",
    "address": "\u00cele-de-France - VILLENEUVE-SAINT-DENIS",
    "city": "VILLENEUVE-SAINT-DENIS",
    "postal_code": "510",
    "latitude": 48.81532332,
    "longitude": 2.79241925,
    "id": 93
  },
  {
    "label": "Mairie de HARDRICOURT",
    "address": "\u00cele-de-France - HARDRICOURT",
    "city": "HARDRICOURT",
    "postal_code": "299",
    "latitude": 49.00859197,
    "longitude": 1.89391266,
    "id": 94
  },
  {
    "label": "Mairie de PORCHEVILLE",
    "address": "\u00cele-de-France - PORCHEVILLE",
    "city": "PORCHEVILLE",
    "postal_code": "501",
    "latitude": 48.97215988,
    "longitude": 1.77819306,
    "id": 95
  },
  {
    "label": "Mairie de RENNEMOULIN",
    "address": "\u00cele-de-France - RENNEMOULIN",
    "city": "RENNEMOULIN",
    "postal_code": "518",
    "latitude": 48.83380402,
    "longitude": 2.04244029,
    "id": 96
  },
  {
    "label": "Mairie de THOIRY",
    "address": "\u00cele-de-France - THOIRY",
    "city": "THOIRY",
    "postal_code": "616",
    "latitude": 48.86528683,
    "longitude": 1.79433033,
    "id": 97
  },
  {
    "label": "Mairie de VIEILLE-EGLISE-EN-YVELINES",
    "address": "\u00cele-de-France - VIEILLE-EGLISE-EN-YVELINES",
    "city": "VIEILLE-EGLISE-EN-YVELINES",
    "postal_code": "655",
    "latitude": 48.66968427,
    "longitude": 1.87508499,
    "id": 98
  },
  {
    "label": "Mairie de ARRANCOURT",
    "address": "\u00cele-de-France - ARRANCOURT",
    "city": "ARRANCOURT",
    "postal_code": "22",
    "latitude": 48.34232506,
    "longitude": 2.16118955,
    "id": 99
  },
  {
    "label": "Mairie de CHILLY-MAZARIN",
    "address": "\u00cele-de-France - CHILLY-MAZARIN",
    "city": "CHILLY-MAZARIN",
    "postal_code": "161",
    "latitude": 48.705638,
    "longitude": 2.31613688,
    "id": 100
  },
  {
    "label": "Mairie de MAULE",
    "address": "\u00cele-de-France - MAULE",
    "city": "MAULE",
    "postal_code": "380",
    "latitude": 48.90866046,
    "longitude": 1.84841214,
    "id": 101
  },
  {
    "label": "Mairie de VELIZY-VILLACOUBLAY",
    "address": "\u00cele-de-France - VELIZY-VILLACOUBLAY",
    "city": "VELIZY-VILLACOUBLAY",
    "postal_code": "640",
    "latitude": 48.78374415,
    "longitude": 2.18825568,
    "id": 102
  },
  {
    "label": "Mairie de BOIS-HERPIN",
    "address": "\u00cele-de-France - BOIS-HERPIN",
    "city": "BOIS-HERPIN",
    "postal_code": "75",
    "latitude": 48.37028256,
    "longitude": 2.23396111,
    "id": 103
  },
  {
    "label": "Mairie de BRIIS-SOUS-FORGES",
    "address": "\u00cele-de-France - BRIIS-SOUS-FORGES",
    "city": "BRIIS-SOUS-FORGES",
    "postal_code": "111",
    "latitude": 48.62454843,
    "longitude": 2.12362545,
    "id": 104
  },
  {
    "label": "Mairie de MEROBERT",
    "address": "\u00cele-de-France - MEROBERT",
    "city": "MEROBERT",
    "postal_code": "393",
    "latitude": 48.41571746,
    "longitude": 2.00698119,
    "id": 105
  },
  {
    "label": "Mairie de ISSY-LES-MOULINEAUX",
    "address": "\u00cele-de-France - ISSY-LES-MOULINEAUX",
    "city": "ISSY-LES-MOULINEAUX",
    "postal_code": "40",
    "latitude": 48.82336476,
    "longitude": 2.26981029,
    "id": 106
  },
  {
    "label": "Mairie de SAINT-MAUR-DES-FOSSES",
    "address": "\u00cele-de-France - SAINT-MAUR-DES-FOSSES",
    "city": "SAINT-MAUR-DES-FOSSES",
    "postal_code": "68",
    "latitude": 48.80262055,
    "longitude": 2.48481118,
    "id": 107
  },
  {
    "label": "Mairie de VAUDHERLAND",
    "address": "\u00cele-de-France - VAUDHERLAND",
    "city": "VAUDHERLAND",
    "postal_code": "633",
    "latitude": 49.00033466,
    "longitude": 2.48674108,
    "id": 108
  },
  {
    "label": "Mairie de FONTENAY-TRESIGNY",
    "address": "\u00cele-de-France - FONTENAY-TRESIGNY",
    "city": "FONTENAY-TRESIGNY",
    "postal_code": "192",
    "latitude": 48.70804528,
    "longitude": 2.8688949,
    "id": 109
  },
  {
    "label": "Mairie de GERMIGNY-L'EVEQUE",
    "address": "\u00cele-de-France - GERMIGNY-L'EVEQUE",
    "city": "GERMIGNY-L'EVEQUE",
    "postal_code": "203",
    "latitude": 48.99260254,
    "longitude": 2.94283211,
    "id": 110
  },
  {
    "label": "Mairie de LONGUEVILLE",
    "address": "\u00cele-de-France - LONGUEVILLE",
    "city": "LONGUEVILLE",
    "postal_code": "260",
    "latitude": 48.51426785,
    "longitude": 3.24715379,
    "id": 111
  },
  {
    "label": "Mairie de MONTOLIVET",
    "address": "\u00cele-de-France - MONTOLIVET",
    "city": "MONTOLIVET",
    "postal_code": "314",
    "latitude": 48.82996789,
    "longitude": 3.43920405,
    "id": 112
  },
  {
    "label": "Mairie de RUPEREUX",
    "address": "\u00cele-de-France - RUPEREUX",
    "city": "RUPEREUX",
    "postal_code": "396",
    "latitude": 48.63584999,
    "longitude": 3.33201403,
    "id": 113
  },
  {
    "label": "Mairie de SAACY-SUR-MARNE",
    "address": "\u00cele-de-France - SAACY-SUR-MARNE",
    "city": "SAACY-SUR-MARNE",
    "postal_code": "397",
    "latitude": 48.9630791,
    "longitude": 3.2113667,
    "id": 114
  },
  {
    "label": "Mairie de AVERNES",
    "address": "\u00cele-de-France - AVERNES",
    "city": "AVERNES",
    "postal_code": "40",
    "latitude": 49.08579235,
    "longitude": 1.87272851,
    "id": 115
  },
  {
    "label": "Mairie de BERNES-SUR-OISE",
    "address": "\u00cele-de-France - BERNES-SUR-OISE",
    "city": "BERNES-SUR-OISE",
    "postal_code": "58",
    "latitude": 49.16126711,
    "longitude": 2.3008796,
    "id": 116
  },
  {
    "label": "Mairie de LA BOISSIERE-ECOLE",
    "address": "\u00cele-de-France - LA BOISSIERE-ECOLE",
    "city": "LA BOISSIERE-ECOLE",
    "postal_code": "77",
    "latitude": 48.68293492,
    "longitude": 1.64283446,
    "id": 117
  },
  {
    "label": "Mairie de SAINT-MARTIN-LA-GARENNE",
    "address": "\u00cele-de-France - SAINT-MARTIN-LA-GARENNE",
    "city": "SAINT-MARTIN-LA-GARENNE",
    "postal_code": "567",
    "latitude": 49.04000508,
    "longitude": 1.68861156,
    "id": 118
  },
  {
    "label": "Mairie de ANGERVILLIERS",
    "address": "\u00cele-de-France - ANGERVILLIERS",
    "city": "ANGERVILLIERS",
    "postal_code": "17",
    "latitude": 48.59296718,
    "longitude": 2.06548431,
    "id": 119
  },
  {
    "label": "Mairie de MORTCERF",
    "address": "\u00cele-de-France - MORTCERF",
    "city": "MORTCERF",
    "postal_code": "318",
    "latitude": 48.78962002,
    "longitude": 2.91597973,
    "id": 120
  },
  {
    "label": "Mairie de LA HAUTEVILLE",
    "address": "\u00cele-de-France - LA HAUTEVILLE",
    "city": "LA HAUTEVILLE",
    "postal_code": "302",
    "latitude": 48.70437758,
    "longitude": 1.62081896,
    "id": 121
  },
  {
    "label": "Mairie de ORPHIN",
    "address": "\u00cele-de-France - ORPHIN",
    "city": "ORPHIN",
    "postal_code": "470",
    "latitude": 48.57848911,
    "longitude": 1.78105893,
    "id": 122
  },
  {
    "label": "Mairie de SAVIGNY-SUR-ORGE",
    "address": "\u00cele-de-France - SAVIGNY-SUR-ORGE",
    "city": "SAVIGNY-SUR-ORGE",
    "postal_code": "589",
    "latitude": 48.67417872,
    "longitude": 2.3527950300000002,
    "id": 123
  },
  {
    "label": "Mairie de BEAUCHAMP",
    "address": "\u00cele-de-France - BEAUCHAMP",
    "city": "BEAUCHAMP",
    "postal_code": "51",
    "latitude": 49.01381731,
    "longitude": 2.19032499,
    "id": 124
  },
  {
    "label": "Mairie de NERVILLE-LA-FORET",
    "address": "\u00cele-de-France - NERVILLE-LA-FORET",
    "city": "NERVILLE-LA-FORET",
    "postal_code": "445",
    "latitude": 49.08937551,
    "longitude": 2.27903984,
    "id": 125
  },
  {
    "label": "Mairie de GRISY-SUR-SEINE",
    "address": "\u00cele-de-France - GRISY-SUR-SEINE",
    "city": "GRISY-SUR-SEINE",
    "postal_code": "218",
    "latitude": 48.43907213,
    "longitude": 3.31881196,
    "id": 126
  },
  {
    "label": "Mairie de MAUREGARD",
    "address": "\u00cele-de-France - MAUREGARD",
    "city": "MAUREGARD",
    "postal_code": "282",
    "latitude": 49.03432705,
    "longitude": 2.5811415699999998,
    "id": 127
  },
  {
    "label": "Mairie de MONTARLOT",
    "address": "\u00cele-de-France - MONTARLOT",
    "city": "MONTARLOT",
    "postal_code": "299",
    "latitude": 48.34943156,
    "longitude": 2.85041792,
    "id": 128
  },
  {
    "label": "Mairie de ORMESSON",
    "address": "\u00cele-de-France - ORMESSON",
    "city": "ORMESSON",
    "postal_code": "348",
    "latitude": 48.24403037,
    "longitude": 2.65285207,
    "id": 129
  },
  {
    "label": "Mairie de PECY",
    "address": "\u00cele-de-France - PECY",
    "city": "PECY",
    "postal_code": "357",
    "latitude": 48.65568322,
    "longitude": 3.07866421,
    "id": 130
  },
  {
    "label": "Mairie de SALINS",
    "address": "\u00cele-de-France - SALINS",
    "city": "SALINS",
    "postal_code": "439",
    "latitude": 48.42228141,
    "longitude": 3.02267657,
    "id": 131
  },
  {
    "label": "Mairie de THENISY",
    "address": "\u00cele-de-France - THENISY",
    "city": "THENISY",
    "postal_code": "461",
    "latitude": 48.48961797,
    "longitude": 3.17639314,
    "id": 132
  },
  {
    "label": "Mairie de ROSNY-SOUS-BOIS",
    "address": "\u00cele-de-France - ROSNY-SOUS-BOIS",
    "city": "ROSNY-SOUS-BOIS",
    "postal_code": "64",
    "latitude": 48.87272347,
    "longitude": 2.48501069,
    "id": 133
  },
  {
    "label": "Mairie de ARCUEIL",
    "address": "\u00cele-de-France - ARCUEIL",
    "city": "ARCUEIL",
    "postal_code": "3",
    "latitude": 48.80630715,
    "longitude": 2.33514561,
    "id": 134
  },
  {
    "label": "Mairie de MONDREVILLE",
    "address": "\u00cele-de-France - MONDREVILLE",
    "city": "MONDREVILLE",
    "postal_code": "297",
    "latitude": 48.14253298,
    "longitude": 2.60925024,
    "id": 135
  },
  {
    "label": "Mairie de NOISY-SUR-ECOLE",
    "address": "\u00cele-de-France - NOISY-SUR-ECOLE",
    "city": "NOISY-SUR-ECOLE",
    "postal_code": "339",
    "latitude": 48.37381755,
    "longitude": 2.49574775,
    "id": 136
  },
  {
    "label": "Mairie de PONTAULT-COMBAULT",
    "address": "\u00cele-de-France - PONTAULT-COMBAULT",
    "city": "PONTAULT-COMBAULT",
    "postal_code": "373",
    "latitude": 48.79791486,
    "longitude": 2.60588014,
    "id": 137
  },
  {
    "label": "Mairie de ROZAY-EN-BRIE",
    "address": "\u00cele-de-France - ROZAY-EN-BRIE",
    "city": "ROZAY-EN-BRIE",
    "postal_code": "393",
    "latitude": 48.6833418,
    "longitude": 2.9582383500000002,
    "id": 138
  },
  {
    "label": "Mairie de SAINT-SAUVEUR-LES-BRAY",
    "address": "\u00cele-de-France - SAINT-SAUVEUR-LES-BRAY",
    "city": "SAINT-SAUVEUR-LES-BRAY",
    "postal_code": "434",
    "latitude": 48.43813289,
    "longitude": 3.20934677,
    "id": 139
  },
  {
    "label": "Mairie de BONNIERES-SUR-SEINE",
    "address": "\u00cele-de-France - BONNIERES-SUR-SEINE",
    "city": "BONNIERES-SUR-SEINE",
    "postal_code": "89",
    "latitude": 49.03576755,
    "longitude": 1.57932182,
    "id": 140
  },
  {
    "label": "Mairie de HARGEVILLE",
    "address": "\u00cele-de-France - HARGEVILLE",
    "city": "HARGEVILLE",
    "postal_code": "300",
    "latitude": 48.89019653,
    "longitude": 1.74091518,
    "id": 141
  },
  {
    "label": "Mairie de MEULAN-EN-YVELINES",
    "address": "\u00cele-de-France - MEULAN-EN-YVELINES",
    "city": "MEULAN-EN-YVELINES",
    "postal_code": "401",
    "latitude": 49.0059411,
    "longitude": 1.90622907,
    "id": 142
  },
  {
    "label": "Mairie de SAILLY",
    "address": "\u00cele-de-France - SAILLY",
    "city": "SAILLY",
    "postal_code": "536",
    "latitude": 49.04056063,
    "longitude": 1.8006901800000001,
    "id": 143
  },
  {
    "label": "Mairie de BRIERES-LES-SCELLES",
    "address": "\u00cele-de-France - BRIERES-LES-SCELLES",
    "city": "BRIERES-LES-SCELLES",
    "postal_code": "109",
    "latitude": 48.4573685,
    "longitude": 2.13917636,
    "id": 144
  },
  {
    "label": "Mairie de ORMOY",
    "address": "\u00cele-de-France - ORMOY",
    "city": "ORMOY",
    "postal_code": "468",
    "latitude": 48.57614902,
    "longitude": 2.4462391500000003,
    "id": 145
  },
  {
    "label": "Mairie de TORFOU",
    "address": "\u00cele-de-France - TORFOU",
    "city": "TORFOU",
    "postal_code": "619",
    "latitude": 48.53120012,
    "longitude": 2.22687514,
    "id": 146
  },
  {
    "label": "Mairie de CHAVENAY",
    "address": "\u00cele-de-France - CHAVENAY",
    "city": "CHAVENAY",
    "postal_code": "152",
    "latitude": 48.85342508,
    "longitude": 1.9864893,
    "id": 147
  },
  {
    "label": "Mairie de GOUPILLIERES",
    "address": "\u00cele-de-France - GOUPILLIERES",
    "city": "GOUPILLIERES",
    "postal_code": "278",
    "latitude": 48.87953236,
    "longitude": 1.76556556,
    "id": 148
  },
  {
    "label": "Mairie de BOISSY-LE-CUTTE",
    "address": "\u00cele-de-France - BOISSY-LE-CUTTE",
    "city": "BOISSY-LE-CUTTE",
    "postal_code": "80",
    "latitude": 48.47190653,
    "longitude": 2.2837837,
    "id": 149
  },
  {
    "label": "Mairie de DRAVEIL",
    "address": "\u00cele-de-France - DRAVEIL",
    "city": "DRAVEIL",
    "postal_code": "201",
    "latitude": 48.68584284,
    "longitude": 2.40981524,
    "id": 150
  },
  {
    "label": "Mairie de OLLAINVILLE",
    "address": "\u00cele-de-France - OLLAINVILLE",
    "city": "OLLAINVILLE",
    "postal_code": "461",
    "latitude": 48.58962375,
    "longitude": 2.21862125,
    "id": 151
  },
  {
    "label": "Mairie de BOBIGNY",
    "address": "\u00cele-de-France - BOBIGNY",
    "city": "BOBIGNY",
    "postal_code": "8",
    "latitude": 48.90961931,
    "longitude": 2.43876012,
    "id": 152
  },
  {
    "label": "Mairie de NEUILLY-SUR-MARNE",
    "address": "\u00cele-de-France - NEUILLY-SUR-MARNE",
    "city": "NEUILLY-SUR-MARNE",
    "postal_code": "50",
    "latitude": 48.85737854,
    "longitude": 2.5312761200000002,
    "id": 153
  },
  {
    "label": "Mairie de MONTMAGNY",
    "address": "\u00cele-de-France - MONTMAGNY",
    "city": "MONTMAGNY",
    "postal_code": "427",
    "latitude": 48.97346849,
    "longitude": 2.34605949,
    "id": 154
  },
  {
    "label": "Mairie de CITRY",
    "address": "\u00cele-de-France - CITRY",
    "city": "CITRY",
    "postal_code": "117",
    "latitude": 48.96916632,
    "longitude": 3.2387707199999998,
    "id": 155
  },
  {
    "label": "Mairie de AULNAY-SUR-MAULDRE",
    "address": "\u00cele-de-France - AULNAY-SUR-MAULDRE",
    "city": "AULNAY-SUR-MAULDRE",
    "postal_code": "33",
    "latitude": 48.92929627,
    "longitude": 1.84003366,
    "id": 156
  },
  {
    "label": "Mairie de CRAVENT",
    "address": "\u00cele-de-France - CRAVENT",
    "city": "CRAVENT",
    "postal_code": "188",
    "latitude": 48.99112183,
    "longitude": 1.4884793,
    "id": 157
  },
  {
    "label": "Mairie de LES ESSARTS-LE-ROI",
    "address": "\u00cele-de-France - LES ESSARTS-LE-ROI",
    "city": "LES ESSARTS-LE-ROI",
    "postal_code": "220",
    "latitude": 48.71649665,
    "longitude": 1.8936861,
    "id": 158
  },
  {
    "label": "Mairie de RICHEBOURG",
    "address": "\u00cele-de-France - RICHEBOURG",
    "city": "RICHEBOURG",
    "postal_code": "520",
    "latitude": 48.82312894,
    "longitude": 1.63823633,
    "id": 159
  },
  {
    "label": "Mairie de LE PLESSIS-LUZARCHES",
    "address": "\u00cele-de-France - LE PLESSIS-LUZARCHES",
    "city": "LE PLESSIS-LUZARCHES",
    "postal_code": "493",
    "latitude": 49.09652106,
    "longitude": 2.45417942,
    "id": 160
  },
  {
    "label": "Mairie de BLENNES",
    "address": "\u00cele-de-France - BLENNES",
    "city": "BLENNES",
    "postal_code": "35",
    "latitude": 48.25773994,
    "longitude": 3.02322063,
    "id": 161
  },
  {
    "label": "Mairie de CHAMBRY",
    "address": "\u00cele-de-France - CHAMBRY",
    "city": "CHAMBRY",
    "postal_code": "77",
    "latitude": 48.99822701,
    "longitude": 2.89509577,
    "id": 162
  },
  {
    "label": "Mairie de DAMPMART",
    "address": "\u00cele-de-France - DAMPMART",
    "city": "DAMPMART",
    "postal_code": "155",
    "latitude": 48.88653288,
    "longitude": 2.73444344,
    "id": 163
  },
  {
    "label": "Mairie de DOUY-LA-RAMEE",
    "address": "\u00cele-de-France - DOUY-LA-RAMEE",
    "city": "DOUY-LA-RAMEE",
    "postal_code": "163",
    "latitude": 49.06658278,
    "longitude": 2.88215829,
    "id": 164
  },
  {
    "label": "Mairie de LAGNY-SUR-MARNE",
    "address": "\u00cele-de-France - LAGNY-SUR-MARNE",
    "city": "LAGNY-SUR-MARNE",
    "postal_code": "243",
    "latitude": 48.87763344,
    "longitude": 2.70712368,
    "id": 165
  },
  {
    "label": "Mairie de MORET-SUR-LOING",
    "address": "\u00cele-de-France - MORET-SUR-LOING",
    "city": "MORET-SUR-LOING",
    "postal_code": "316",
    "latitude": 48.37385887,
    "longitude": 2.8142213700000003,
    "id": 166
  },
  {
    "label": "Mairie de NEUFMOUTIERS-EN-BRIE",
    "address": "\u00cele-de-France - NEUFMOUTIERS-EN-BRIE",
    "city": "NEUFMOUTIERS-EN-BRIE",
    "postal_code": "336",
    "latitude": 48.76932281,
    "longitude": 2.83280865,
    "id": 167
  },
  {
    "label": "Mairie de PRINGY",
    "address": "\u00cele-de-France - PRINGY",
    "city": "PRINGY",
    "postal_code": "378",
    "latitude": 48.5211587,
    "longitude": 2.55709183,
    "id": 168
  },
  {
    "label": "Mairie de BOUGIVAL",
    "address": "\u00cele-de-France - BOUGIVAL",
    "city": "BOUGIVAL",
    "postal_code": "92",
    "latitude": 48.86456149,
    "longitude": 2.13898347,
    "id": 169
  },
  {
    "label": "Mairie de BUCHELAY",
    "address": "\u00cele-de-France - BUCHELAY",
    "city": "BUCHELAY",
    "postal_code": "118",
    "latitude": 48.97970903,
    "longitude": 1.6729839800000001,
    "id": 170
  },
  {
    "label": "Mairie de CRESPIERES",
    "address": "\u00cele-de-France - CRESPIERES",
    "city": "CRESPIERES",
    "postal_code": "189",
    "latitude": 48.88287721,
    "longitude": 1.92224233,
    "id": 171
  },
  {
    "label": "Mairie de DANNEMARIE",
    "address": "\u00cele-de-France - DANNEMARIE",
    "city": "DANNEMARIE",
    "postal_code": "194",
    "latitude": 48.76181758,
    "longitude": 1.60643118,
    "id": 172
  },
  {
    "label": "Mairie de JUMEAUVILLE",
    "address": "\u00cele-de-France - JUMEAUVILLE",
    "city": "JUMEAUVILLE",
    "postal_code": "325",
    "latitude": 48.91109548,
    "longitude": 1.78839638,
    "id": 173
  },
  {
    "label": "Mairie de BRUYERES-LE-CHATEL",
    "address": "\u00cele-de-France - BRUYERES-LE-CHATEL",
    "city": "BRUYERES-LE-CHATEL",
    "postal_code": "115",
    "latitude": 48.59318922,
    "longitude": 2.19151053,
    "id": 174
  },
  {
    "label": "Mairie de NOISY-LE-SEC",
    "address": "\u00cele-de-France - NOISY-LE-SEC",
    "city": "NOISY-LE-SEC",
    "postal_code": "53",
    "latitude": 48.89073269,
    "longitude": 2.45371513,
    "id": 175
  },
  {
    "label": "Mairie de BOULEURS",
    "address": "\u00cele-de-France - BOULEURS",
    "city": "BOULEURS",
    "postal_code": "47",
    "latitude": 48.88134344,
    "longitude": 2.90610214,
    "id": 176
  },
  {
    "label": "Mairie de CHAMPCENEST",
    "address": "\u00cele-de-France - CHAMPCENEST",
    "city": "CHAMPCENEST",
    "postal_code": "80",
    "latitude": 48.66951668,
    "longitude": 3.28244029,
    "id": 177
  },
  {
    "label": "Mairie de SCEAUX",
    "address": "\u00cele-de-France - SCEAUX",
    "city": "SCEAUX",
    "postal_code": "71",
    "latitude": 48.77843541,
    "longitude": 2.29026804,
    "id": 178
  },
  {
    "label": "Mairie de CHARENTON-LE-PONT",
    "address": "\u00cele-de-France - CHARENTON-LE-PONT",
    "city": "CHARENTON-LE-PONT",
    "postal_code": "18",
    "latitude": 48.82156326,
    "longitude": 2.41136607,
    "id": 179
  },
  {
    "label": "Mairie de MAISONS-ALFORT",
    "address": "\u00cele-de-France - MAISONS-ALFORT",
    "city": "MAISONS-ALFORT",
    "postal_code": "46",
    "latitude": 48.8062652,
    "longitude": 2.43719735,
    "id": 180
  },
  {
    "label": "Mairie de BELLEFONTAINE",
    "address": "\u00cele-de-France - BELLEFONTAINE",
    "city": "BELLEFONTAINE",
    "postal_code": "55",
    "latitude": 49.09740696,
    "longitude": 2.46649672,
    "id": 181
  },
  {
    "label": "Mairie de GRISY-LES-PLATRES",
    "address": "\u00cele-de-France - GRISY-LES-PLATRES",
    "city": "GRISY-LES-PLATRES",
    "postal_code": "287",
    "latitude": 49.13217302,
    "longitude": 2.04895079,
    "id": 182
  },
  {
    "label": "Mairie de MERY-SUR-OISE",
    "address": "\u00cele-de-France - MERY-SUR-OISE",
    "city": "MERY-SUR-OISE",
    "postal_code": "394",
    "latitude": 49.06323543,
    "longitude": 2.18608203,
    "id": 183
  },
  {
    "label": "Mairie de PORT-VILLEZ",
    "address": "\u00cele-de-France - PORT-VILLEZ",
    "city": "PORT-VILLEZ",
    "postal_code": "503",
    "latitude": 49.06235563,
    "longitude": 1.52286399,
    "id": 184
  },
  {
    "label": "Mairie de VILLEMOISSON-SUR-ORGE",
    "address": "\u00cele-de-France - VILLEMOISSON-SUR-ORGE",
    "city": "VILLEMOISSON-SUR-ORGE",
    "postal_code": "667",
    "latitude": 48.66519083,
    "longitude": 2.33108031,
    "id": 185
  },
  {
    "label": "Mairie de GENNEVILLIERS",
    "address": "\u00cele-de-France - GENNEVILLIERS",
    "city": "GENNEVILLIERS",
    "postal_code": "36",
    "latitude": 48.92583083,
    "longitude": 2.29286199,
    "id": 186
  },
  {
    "label": "Mairie de BAILLY-ROMAINVILLIERS",
    "address": "\u00cele-de-France - BAILLY-ROMAINVILLIERS",
    "city": "BAILLY-ROMAINVILLIERS",
    "postal_code": "18",
    "latitude": 48.84666112,
    "longitude": 2.82265324,
    "id": 187
  },
  {
    "label": "Mairie de BOISSY-AUX-CAILLES",
    "address": "\u00cele-de-France - BOISSY-AUX-CAILLES",
    "city": "BOISSY-AUX-CAILLES",
    "postal_code": "41",
    "latitude": 48.31986181,
    "longitude": 2.503673,
    "id": 188
  },
  {
    "label": "Mairie de VILLENEUVE-LE-COMTE",
    "address": "\u00cele-de-France - VILLENEUVE-LE-COMTE",
    "city": "VILLENEUVE-LE-COMTE",
    "postal_code": "508",
    "latitude": 48.81337961,
    "longitude": 2.82914653,
    "id": 189
  },
  {
    "label": "Mairie de VILLENEUVE-LES-BORDES",
    "address": "\u00cele-de-France - VILLENEUVE-LES-BORDES",
    "city": "VILLENEUVE-LES-BORDES",
    "postal_code": "509",
    "latitude": 48.48599757,
    "longitude": 3.04244604,
    "id": 190
  },
  {
    "label": "Mairie de CHAUSSY",
    "address": "\u00cele-de-France - CHAUSSY",
    "city": "CHAUSSY",
    "postal_code": "150",
    "latitude": 49.12179459,
    "longitude": 1.69169034,
    "id": 191
  },
  {
    "label": "Mairie de VILLAINES-SOUS-BOIS",
    "address": "\u00cele-de-France - VILLAINES-SOUS-BOIS",
    "city": "VILLAINES-SOUS-BOIS",
    "postal_code": "660",
    "latitude": 49.07680805,
    "longitude": 2.35701965,
    "id": 192
  },
  {
    "label": "Mairie de CHALMAISON",
    "address": "\u00cele-de-France - CHALMAISON",
    "city": "CHALMAISON",
    "postal_code": "76",
    "latitude": 48.48097629,
    "longitude": 3.25063098,
    "id": 193
  },
  {
    "label": "Mairie de LA HOUSSAYE-EN-BRIE",
    "address": "\u00cele-de-France - LA HOUSSAYE-EN-BRIE",
    "city": "LA HOUSSAYE-EN-BRIE",
    "postal_code": "229",
    "latitude": 48.75386023,
    "longitude": 2.87480096,
    "id": 194
  },
  {
    "label": "Mairie de GOMMECOURT",
    "address": "\u00cele-de-France - GOMMECOURT",
    "city": "GOMMECOURT",
    "postal_code": "276",
    "latitude": 49.07628825,
    "longitude": 1.59240569,
    "id": 195
  },
  {
    "label": "Mairie de MEDAN",
    "address": "\u00cele-de-France - MEDAN",
    "city": "MEDAN",
    "postal_code": "384",
    "latitude": 48.95321241,
    "longitude": 1.9967296600000002,
    "id": 196
  },
  {
    "label": "Mairie de COURDIMANCHE-SUR-ESSONNE",
    "address": "\u00cele-de-France - COURDIMANCHE-SUR-ESSONNE",
    "city": "COURDIMANCHE-SUR-ESSONNE",
    "postal_code": "184",
    "latitude": 48.41797028,
    "longitude": 2.3783801,
    "id": 197
  },
  {
    "label": "Mairie de PALAISEAU",
    "address": "\u00cele-de-France - PALAISEAU",
    "city": "PALAISEAU",
    "postal_code": "477",
    "latitude": 48.71819135,
    "longitude": 2.24957089,
    "id": 198
  },
  {
    "label": "Mairie de MARGENCY",
    "address": "\u00cele-de-France - MARGENCY",
    "city": "MARGENCY",
    "postal_code": "369",
    "latitude": 49.00221614,
    "longitude": 2.29006473,
    "id": 199
  },
  {
    "label": "Mairie de EMERAINVILLE",
    "address": "\u00cele-de-France - EMERAINVILLE",
    "city": "EMERAINVILLE",
    "postal_code": "169",
    "latitude": 48.81045973,
    "longitude": 2.62227475,
    "id": 200
  },
  {
    "label": "Mairie de FUBLAINES",
    "address": "\u00cele-de-France - FUBLAINES",
    "city": "FUBLAINES",
    "postal_code": "199",
    "latitude": 48.93782015,
    "longitude": 2.93537046,
    "id": 201
  },
  {
    "label": "Mairie de LIVRY-SUR-SEINE",
    "address": "\u00cele-de-France - LIVRY-SUR-SEINE",
    "city": "LIVRY-SUR-SEINE",
    "postal_code": "255",
    "latitude": 48.51096532,
    "longitude": 2.68423126,
    "id": 202
  },
  {
    "label": "Mairie de SAINT-MERY",
    "address": "\u00cele-de-France - SAINT-MERY",
    "city": "SAINT-MERY",
    "postal_code": "426",
    "latitude": 48.57699048,
    "longitude": 2.82556209,
    "id": 203
  },
  {
    "label": "Mairie de SAINT-SIMEON",
    "address": "\u00cele-de-France - SAINT-SIMEON",
    "city": "SAINT-SIMEON",
    "postal_code": "436",
    "latitude": 48.79956097,
    "longitude": 3.20317126,
    "id": 204
  },
  {
    "label": "Mairie de LA CELLE-SAINT-CLOUD",
    "address": "\u00cele-de-France - LA CELLE-SAINT-CLOUD",
    "city": "LA CELLE-SAINT-CLOUD",
    "postal_code": "126",
    "latitude": 48.85019059,
    "longitude": 2.14448579,
    "id": 205
  },
  {
    "label": "Mairie de LA FALAISE",
    "address": "\u00cele-de-France - LA FALAISE",
    "city": "LA FALAISE",
    "postal_code": "230",
    "latitude": 48.94453918,
    "longitude": 1.8317011600000002,
    "id": 206
  },
  {
    "label": "Mairie de MONDREVILLE",
    "address": "\u00cele-de-France - MONDREVILLE",
    "city": "MONDREVILLE",
    "postal_code": "413",
    "latitude": 48.90348589,
    "longitude": 1.55262748,
    "id": 207
  },
  {
    "label": "Mairie de VOISINS-LE-BRETONNEUX",
    "address": "\u00cele-de-France - VOISINS-LE-BRETONNEUX",
    "city": "VOISINS-LE-BRETONNEUX",
    "postal_code": "688",
    "latitude": 48.75832637,
    "longitude": 2.05102516,
    "id": 208
  },
  {
    "label": "Mairie de MORSANG-SUR-SEINE",
    "address": "\u00cele-de-France - MORSANG-SUR-SEINE",
    "city": "MORSANG-SUR-SEINE",
    "postal_code": "435",
    "latitude": 48.57070406,
    "longitude": 2.49228234,
    "id": 209
  },
  {
    "label": "Mairie de FLACOURT",
    "address": "\u00cele-de-France - FLACOURT",
    "city": "FLACOURT",
    "postal_code": "234",
    "latitude": 48.92833176,
    "longitude": 1.6463640499999999,
    "id": 210
  },
  {
    "label": "Mairie de MERICOURT",
    "address": "\u00cele-de-France - MERICOURT",
    "city": "MERICOURT",
    "postal_code": "391",
    "latitude": 49.03606127,
    "longitude": 1.6271554799999999,
    "id": 211
  },
  {
    "label": "Mairie de FORGES-LES-BAINS",
    "address": "\u00cele-de-France - FORGES-LES-BAINS",
    "city": "FORGES-LES-BAINS",
    "postal_code": "249",
    "latitude": 48.62809754,
    "longitude": 2.09920215,
    "id": 212
  },
  {
    "label": "Mairie de MARCOUSSIS",
    "address": "\u00cele-de-France - MARCOUSSIS",
    "city": "MARCOUSSIS",
    "postal_code": "363",
    "latitude": 48.64177089,
    "longitude": 2.22935364,
    "id": 213
  },
  {
    "label": "Mairie de ORVEAU",
    "address": "\u00cele-de-France - ORVEAU",
    "city": "ORVEAU",
    "postal_code": "473",
    "latitude": 48.44763664,
    "longitude": 2.29191665,
    "id": 214
  },
  {
    "label": "Mairie de NEUILLY-SUR-SEINE",
    "address": "\u00cele-de-France - NEUILLY-SUR-SEINE",
    "city": "NEUILLY-SUR-SEINE",
    "postal_code": "51",
    "latitude": 48.887174,
    "longitude": 2.26700164,
    "id": 215
  },
  {
    "label": "Mairie de GAGNY",
    "address": "\u00cele-de-France - GAGNY",
    "city": "GAGNY",
    "postal_code": "32",
    "latitude": 48.88163299,
    "longitude": 2.53818026,
    "id": 216
  },
  {
    "label": "Mairie de CLERY-EN-VEXIN",
    "address": "\u00cele-de-France - CLERY-EN-VEXIN",
    "city": "CLERY-EN-VEXIN",
    "postal_code": "166",
    "latitude": 49.12698726,
    "longitude": 1.83812817,
    "id": 217
  },
  {
    "label": "Mairie de HARAVILLIERS",
    "address": "\u00cele-de-France - HARAVILLIERS",
    "city": "HARAVILLIERS",
    "postal_code": "298",
    "latitude": 49.17349779,
    "longitude": 2.04597881,
    "id": 218
  },
  {
    "label": "Mairie de CHEVRU",
    "address": "\u00cele-de-France - CHEVRU",
    "city": "CHEVRU",
    "postal_code": "113",
    "latitude": 48.73579879,
    "longitude": 3.19531456,
    "id": 219
  },
  {
    "label": "Mairie de EGREVILLE",
    "address": "\u00cele-de-France - EGREVILLE",
    "city": "EGREVILLE",
    "postal_code": "168",
    "latitude": 48.17760045,
    "longitude": 2.87159593,
    "id": 220
  },
  {
    "label": "Mairie de LA ROCHETTE",
    "address": "\u00cele-de-France - LA ROCHETTE",
    "city": "LA ROCHETTE",
    "postal_code": "389",
    "latitude": 48.52003494,
    "longitude": 2.65587345,
    "id": 221
  },
  {
    "label": "Mairie de PUISIEUX",
    "address": "\u00cele-de-France - PUISIEUX",
    "city": "PUISIEUX",
    "postal_code": "380",
    "latitude": 49.06552359,
    "longitude": 2.91633597,
    "id": 222
  },
  {
    "label": "Mairie de SAINT-THIBAULT-DES-VIGNES",
    "address": "\u00cele-de-France - SAINT-THIBAULT-DES-VIGNES",
    "city": "SAINT-THIBAULT-DES-VIGNES",
    "postal_code": "438",
    "latitude": 48.86959861,
    "longitude": 2.68935561,
    "id": 223
  },
  {
    "label": "Mairie de LE RAINCY",
    "address": "\u00cele-de-France - LE RAINCY",
    "city": "LE RAINCY",
    "postal_code": "62",
    "latitude": 48.89873292,
    "longitude": 2.5232522299999998,
    "id": 224
  },
  {
    "label": "Mairie de SOISY-SOUS-MONTMORENCY",
    "address": "\u00cele-de-France - SOISY-SOUS-MONTMORENCY",
    "city": "SOISY-SOUS-MONTMORENCY",
    "postal_code": "598",
    "latitude": 48.9878413,
    "longitude": 2.2996361,
    "id": 225
  },
  {
    "label": "Mairie de BONNELLES",
    "address": "\u00cele-de-France - BONNELLES",
    "city": "BONNELLES",
    "postal_code": "87",
    "latitude": 48.61894248,
    "longitude": 2.02738624,
    "id": 226
  },
  {
    "label": "Mairie de CHANTELOUP-LES-VIGNES",
    "address": "\u00cele-de-France - CHANTELOUP-LES-VIGNES",
    "city": "CHANTELOUP-LES-VIGNES",
    "postal_code": "138",
    "latitude": 48.97846721,
    "longitude": 2.03069418,
    "id": 227
  },
  {
    "label": "Mairie de LOMMOYE",
    "address": "\u00cele-de-France - LOMMOYE",
    "city": "LOMMOYE",
    "postal_code": "344",
    "latitude": 48.99399917,
    "longitude": 1.51438048,
    "id": 228
  },
  {
    "label": "Mairie de CHALOU-MOULINEUX",
    "address": "\u00cele-de-France - CHALOU-MOULINEUX",
    "city": "CHALOU-MOULINEUX",
    "postal_code": "131",
    "latitude": 48.38519074,
    "longitude": 2.02202107,
    "id": 229
  },
  {
    "label": "Mairie de CHOISY-EN-BRIE",
    "address": "\u00cele-de-France - CHOISY-EN-BRIE",
    "city": "CHOISY-EN-BRIE",
    "postal_code": "116",
    "latitude": 48.75810894,
    "longitude": 3.21743514,
    "id": 230
  },
  {
    "label": "Mairie de VOULTON",
    "address": "\u00cele-de-France - VOULTON",
    "city": "VOULTON",
    "postal_code": "530",
    "latitude": 48.61876081,
    "longitude": 3.3330437,
    "id": 231
  },
  {
    "label": "Mairie de BOIS-D'ARCY",
    "address": "\u00cele-de-France - BOIS-D'ARCY",
    "city": "BOIS-D'ARCY",
    "postal_code": "73",
    "latitude": 48.80142102,
    "longitude": 2.03173959,
    "id": 232
  },
  {
    "label": "Mairie de MULCENT",
    "address": "\u00cele-de-France - MULCENT",
    "city": "MULCENT",
    "postal_code": "439",
    "latitude": 48.8789283,
    "longitude": 1.6511104300000001,
    "id": 233
  },
  {
    "label": "Mairie de BRUNOY",
    "address": "\u00cele-de-France - BRUNOY",
    "city": "BRUNOY",
    "postal_code": "114",
    "latitude": 48.69833263,
    "longitude": 2.50352557,
    "id": 234
  },
  {
    "label": "Mairie de NOZAY",
    "address": "\u00cele-de-France - NOZAY",
    "city": "NOZAY",
    "postal_code": "458",
    "latitude": 48.66065907,
    "longitude": 2.24288335,
    "id": 235
  },
  {
    "label": "Mairie de SAINT-CYR-LA-RIVIERE",
    "address": "\u00cele-de-France - SAINT-CYR-LA-RIVIERE",
    "city": "SAINT-CYR-LA-RIVIERE",
    "postal_code": "544",
    "latitude": 48.35668934,
    "longitude": 2.14765114,
    "id": 236
  },
  {
    "label": "Mairie de EPINAY-CHAMPLATREUX",
    "address": "\u00cele-de-France - EPINAY-CHAMPLATREUX",
    "city": "EPINAY-CHAMPLATREUX",
    "postal_code": "214",
    "latitude": 49.08487365,
    "longitude": 2.41174402,
    "id": 237
  },
  {
    "label": "Mairie de SAINT-OUEN",
    "address": "\u00cele-de-France - SAINT-OUEN",
    "city": "SAINT-OUEN",
    "postal_code": "70",
    "latitude": 48.90696631,
    "longitude": 2.33241484,
    "id": 238
  },
  {
    "label": "Mairie de DEUIL-LA-BARRE",
    "address": "\u00cele-de-France - DEUIL-LA-BARRE",
    "city": "DEUIL-LA-BARRE",
    "postal_code": "197",
    "latitude": 48.97526579,
    "longitude": 2.32831305,
    "id": 239
  },
  {
    "label": "Mairie de FAREMOUTIERS",
    "address": "\u00cele-de-France - FAREMOUTIERS",
    "city": "FAREMOUTIERS",
    "postal_code": "176",
    "latitude": 48.79998757,
    "longitude": 2.99636876,
    "id": 240
  },
  {
    "label": "Mairie de FONTAINS",
    "address": "\u00cele-de-France - FONTAINS",
    "city": "FONTAINS",
    "postal_code": "190",
    "latitude": 48.5266929,
    "longitude": 3.00103868,
    "id": 241
  },
  {
    "label": "Mairie de LA MADELEINE-SUR-LOING",
    "address": "\u00cele-de-France - LA MADELEINE-SUR-LOING",
    "city": "LA MADELEINE-SUR-LOING",
    "postal_code": "267",
    "latitude": 48.20342081,
    "longitude": 2.70372144,
    "id": 242
  },
  {
    "label": "Mairie de LECHELLE",
    "address": "\u00cele-de-France - LECHELLE",
    "city": "LECHELLE",
    "postal_code": "246",
    "latitude": 48.57783297,
    "longitude": 3.38781081,
    "id": 243
  },
  {
    "label": "Mairie de MONTCEAUX-LES-MEAUX",
    "address": "\u00cele-de-France - MONTCEAUX-LES-MEAUX",
    "city": "MONTCEAUX-LES-MEAUX",
    "postal_code": "300",
    "latitude": 48.94294092,
    "longitude": 2.98727394,
    "id": 244
  },
  {
    "label": "Mairie de VILLEBEON",
    "address": "\u00cele-de-France - VILLEBEON",
    "city": "VILLEBEON",
    "postal_code": "500",
    "latitude": 48.20873855,
    "longitude": 2.94052018,
    "id": 245
  },
  {
    "label": "Mairie de DAMMARTIN-SUR-TIGEAUX",
    "address": "\u00cele-de-France - DAMMARTIN-SUR-TIGEAUX",
    "city": "DAMMARTIN-SUR-TIGEAUX",
    "postal_code": "154",
    "latitude": 48.81925906,
    "longitude": 2.92039342,
    "id": 246
  },
  {
    "label": "Mairie de LE PLESSIS-TREVISE",
    "address": "\u00cele-de-France - LE PLESSIS-TREVISE",
    "city": "LE PLESSIS-TREVISE",
    "postal_code": "59",
    "latitude": 48.81146845,
    "longitude": 2.57192945,
    "id": 247
  },
  {
    "label": "Mairie de GARENTREVILLE",
    "address": "\u00cele-de-France - GARENTREVILLE",
    "city": "GARENTREVILLE",
    "postal_code": "200",
    "latitude": 48.23617049,
    "longitude": 2.54916891,
    "id": 248
  },
  {
    "label": "Mairie de LA HAUTE-MAISON",
    "address": "\u00cele-de-France - LA HAUTE-MAISON",
    "city": "LA HAUTE-MAISON",
    "postal_code": "225",
    "latitude": 48.88264735,
    "longitude": 3.00150801,
    "id": 249
  },
  {
    "label": "Mairie de LES MARETS",
    "address": "\u00cele-de-France - LES MARETS",
    "city": "LES MARETS",
    "postal_code": "275",
    "latitude": 48.67106158,
    "longitude": 3.31368525,
    "id": 250
  },
  {
    "label": "Mairie de PONTCARRE",
    "address": "\u00cele-de-France - PONTCARRE",
    "city": "PONTCARRE",
    "postal_code": "374",
    "latitude": 48.79675039,
    "longitude": 2.70518708,
    "id": 251
  },
  {
    "label": "Mairie de VILLENOY",
    "address": "\u00cele-de-France - VILLENOY",
    "city": "VILLENOY",
    "postal_code": "513",
    "latitude": 48.94086269,
    "longitude": 2.86173549,
    "id": 252
  },
  {
    "label": "Mairie de SAINT-ESCOBILLE",
    "address": "\u00cele-de-France - SAINT-ESCOBILLE",
    "city": "SAINT-ESCOBILLE",
    "postal_code": "547",
    "latitude": 48.4299773,
    "longitude": 1.96501284,
    "id": 253
  },
  {
    "label": "Mairie de PERSAN",
    "address": "\u00cele-de-France - PERSAN",
    "city": "PERSAN",
    "postal_code": "487",
    "latitude": 49.15316757,
    "longitude": 2.27074874,
    "id": 254
  },
  {
    "label": "Mairie de CONFLANS-SAINTE-HONORINE",
    "address": "\u00cele-de-France - CONFLANS-SAINTE-HONORINE",
    "city": "CONFLANS-SAINTE-HONORINE",
    "postal_code": "172",
    "latitude": 48.99748616,
    "longitude": 2.09477068,
    "id": 255
  },
  {
    "label": "Mairie de SAINT-REMY-L'HONORE",
    "address": "\u00cele-de-France - SAINT-REMY-L'HONORE",
    "city": "SAINT-REMY-L'HONORE",
    "postal_code": "576",
    "latitude": 48.75599818,
    "longitude": 1.88111439,
    "id": 256
  },
  {
    "label": "Mairie de LE PLESSIS-PATE",
    "address": "\u00cele-de-France - LE PLESSIS-PATE",
    "city": "LE PLESSIS-PATE",
    "postal_code": "494",
    "latitude": 48.61395365,
    "longitude": 2.32837504,
    "id": 257
  },
  {
    "label": "Mairie de LONGJUMEAU",
    "address": "\u00cele-de-France - LONGJUMEAU",
    "city": "LONGJUMEAU",
    "postal_code": "345",
    "latitude": 48.6966441,
    "longitude": 2.2957731900000002,
    "id": 258
  },
  {
    "label": "Mairie de LE PRE-SAINT-GERVAIS",
    "address": "\u00cele-de-France - LE PRE-SAINT-GERVAIS",
    "city": "LE PRE-SAINT-GERVAIS",
    "postal_code": "61",
    "latitude": 48.88537897,
    "longitude": 2.4032807099999998,
    "id": 259
  },
  {
    "label": "Mairie de MONTFERMEIL",
    "address": "\u00cele-de-France - MONTFERMEIL",
    "city": "MONTFERMEIL",
    "postal_code": "47",
    "latitude": 48.8986595,
    "longitude": 2.56550869,
    "id": 260
  },
  {
    "label": "Mairie de BOISSY-SAINT-LEGER",
    "address": "\u00cele-de-France - BOISSY-SAINT-LEGER",
    "city": "BOISSY-SAINT-LEGER",
    "postal_code": "4",
    "latitude": 48.75045734,
    "longitude": 2.50912925,
    "id": 261
  },
  {
    "label": "Mairie de CORMEILLES-EN-PARISIS",
    "address": "\u00cele-de-France - CORMEILLES-EN-PARISIS",
    "city": "CORMEILLES-EN-PARISIS",
    "postal_code": "176",
    "latitude": 48.97338992,
    "longitude": 2.1999954,
    "id": 262
  },
  {
    "label": "Mairie de LE HEAULME",
    "address": "\u00cele-de-France - LE HEAULME",
    "city": "LE HEAULME",
    "postal_code": "303",
    "latitude": 49.16618759,
    "longitude": 1.99943329,
    "id": 263
  },
  {
    "label": "Mairie de DAMMARIE-LES-LYS",
    "address": "\u00cele-de-France - DAMMARIE-LES-LYS",
    "city": "DAMMARIE-LES-LYS",
    "postal_code": "152",
    "latitude": 48.51559642,
    "longitude": 2.63419637,
    "id": 264
  },
  {
    "label": "Mairie de LA CHAPELLE-MOUTILS",
    "address": "\u00cele-de-France - LA CHAPELLE-MOUTILS",
    "city": "LA CHAPELLE-MOUTILS",
    "postal_code": "93",
    "latitude": 48.77466782,
    "longitude": 3.39179127,
    "id": 265
  },
  {
    "label": "Mairie de SAINTE-AULDE",
    "address": "\u00cele-de-France - SAINTE-AULDE",
    "city": "SAINTE-AULDE",
    "postal_code": "401",
    "latitude": 48.99390526,
    "longitude": 3.1736479,
    "id": 266
  },
  {
    "label": "Mairie de CONDE-SUR-VESGRE",
    "address": "\u00cele-de-France - CONDE-SUR-VESGRE",
    "city": "CONDE-SUR-VESGRE",
    "postal_code": "171",
    "latitude": 48.74146738,
    "longitude": 1.6610792,
    "id": 267
  },
  {
    "label": "Mairie de MOUSSEAUX-SUR-SEINE",
    "address": "\u00cele-de-France - MOUSSEAUX-SUR-SEINE",
    "city": "MOUSSEAUX-SUR-SEINE",
    "postal_code": "437",
    "latitude": 49.04246339,
    "longitude": 1.64620498,
    "id": 268
  },
  {
    "label": "Mairie de NOISY-LE-ROI",
    "address": "\u00cele-de-France - NOISY-LE-ROI",
    "city": "NOISY-LE-ROI",
    "postal_code": "455",
    "latitude": 48.84642903,
    "longitude": 2.06007132,
    "id": 269
  },
  {
    "label": "Mairie de PERDREAUVILLE",
    "address": "\u00cele-de-France - PERDREAUVILLE",
    "city": "PERDREAUVILLE",
    "postal_code": "484",
    "latitude": 48.96417335,
    "longitude": 1.62814192,
    "id": 270
  },
  {
    "label": "Mairie de SONCHAMP",
    "address": "\u00cele-de-France - SONCHAMP",
    "city": "SONCHAMP",
    "postal_code": "601",
    "latitude": 48.57620494,
    "longitude": 1.87726808,
    "id": 271
  },
  {
    "label": "Mairie de SAINT-SULPICE-DE-FAVIERES",
    "address": "\u00cele-de-France - SAINT-SULPICE-DE-FAVIERES",
    "city": "SAINT-SULPICE-DE-FAVIERES",
    "postal_code": "578",
    "latitude": 48.54193398,
    "longitude": 2.17946946,
    "id": 272
  },
  {
    "label": "Mairie de LE PLESSIS-BOUCHARD",
    "address": "\u00cele-de-France - LE PLESSIS-BOUCHARD",
    "city": "LE PLESSIS-BOUCHARD",
    "postal_code": "491",
    "latitude": 49.00308185,
    "longitude": 2.23679507,
    "id": 273
  },
  {
    "label": "Mairie de BREAU",
    "address": "\u00cele-de-France - BREAU",
    "city": "BREAU",
    "postal_code": "52",
    "latitude": 48.56147925,
    "longitude": 2.87823592,
    "id": 274
  },
  {
    "label": "Mairie de NOISY-RUDIGNON",
    "address": "\u00cele-de-France - NOISY-RUDIGNON",
    "city": "NOISY-RUDIGNON",
    "postal_code": "338",
    "latitude": 48.33557254,
    "longitude": 2.9298436800000003,
    "id": 275
  },
  {
    "label": "Mairie de OZOIR-LA-FERRIERE",
    "address": "\u00cele-de-France - OZOIR-LA-FERRIERE",
    "city": "OZOIR-LA-FERRIERE",
    "postal_code": "350",
    "latitude": 48.7689651,
    "longitude": 2.6791555000000002,
    "id": 276
  },
  {
    "label": "Mairie de SAINTS",
    "address": "\u00cele-de-France - SAINTS",
    "city": "SAINTS",
    "postal_code": "433",
    "latitude": 48.75922937,
    "longitude": 3.05023217,
    "id": 277
  },
  {
    "label": "Mairie de SIGY",
    "address": "\u00cele-de-France - SIGY",
    "city": "SIGY",
    "postal_code": "452",
    "latitude": 48.47789319,
    "longitude": 3.18161372,
    "id": 278
  },
  {
    "label": "Mairie de VAUDOY-EN-BRIE",
    "address": "\u00cele-de-France - VAUDOY-EN-BRIE",
    "city": "VAUDOY-EN-BRIE",
    "postal_code": "486",
    "latitude": 48.68894004,
    "longitude": 3.07913804,
    "id": 279
  },
  {
    "label": "Mairie de VILLENEUVE-SOUS-DAMMARTIN",
    "address": "\u00cele-de-France - VILLENEUVE-SOUS-DAMMARTIN",
    "city": "VILLENEUVE-SOUS-DAMMARTIN",
    "postal_code": "511",
    "latitude": 49.0350913,
    "longitude": 2.63991424,
    "id": 280
  },
  {
    "label": "Mairie de GUERARD",
    "address": "\u00cele-de-France - GUERARD",
    "city": "GUERARD",
    "postal_code": "219",
    "latitude": 48.82445869,
    "longitude": 2.95856563,
    "id": 281
  },
  {
    "label": "Mairie de TANCROU",
    "address": "\u00cele-de-France - TANCROU",
    "city": "TANCROU",
    "postal_code": "460",
    "latitude": 49.00011056,
    "longitude": 3.04808952,
    "id": 282
  },
  {
    "label": "Mairie de ALLAINVILLE",
    "address": "\u00cele-de-France - ALLAINVILLE",
    "city": "ALLAINVILLE",
    "postal_code": "9",
    "latitude": 48.45671026,
    "longitude": 1.8958904699999999,
    "id": 283
  },
  {
    "label": "Mairie de BALLANCOURT-SUR-ESSONNE",
    "address": "\u00cele-de-France - BALLANCOURT-SUR-ESSONNE",
    "city": "BALLANCOURT-SUR-ESSONNE",
    "postal_code": "45",
    "latitude": 48.52584806,
    "longitude": 2.38523199,
    "id": 284
  },
  {
    "label": "Mairie de PANTIN",
    "address": "\u00cele-de-France - PANTIN",
    "city": "PANTIN",
    "postal_code": "55",
    "latitude": 48.89795868,
    "longitude": 2.40738603,
    "id": 285
  },
  {
    "label": "Mairie de NOISEAU",
    "address": "\u00cele-de-France - NOISEAU",
    "city": "NOISEAU",
    "postal_code": "53",
    "latitude": 48.77646161,
    "longitude": 2.54729285,
    "id": 286
  },
  {
    "label": "Mairie de GOUSSAINVILLE",
    "address": "\u00cele-de-France - GOUSSAINVILLE",
    "city": "GOUSSAINVILLE",
    "postal_code": "280",
    "latitude": 49.03180274,
    "longitude": 2.4731658,
    "id": 287
  },
  {
    "label": "Mairie de MAFFLIERS",
    "address": "\u00cele-de-France - MAFFLIERS",
    "city": "MAFFLIERS",
    "postal_code": "353",
    "latitude": 49.07770462,
    "longitude": 2.30777769,
    "id": 288
  },
  {
    "label": "Mairie de ANDILLY",
    "address": "\u00cele-de-France - ANDILLY",
    "city": "ANDILLY",
    "postal_code": "14",
    "latitude": 49.00491543,
    "longitude": 2.29962368,
    "id": 289
  },
  {
    "label": "Mairie de BEZONS",
    "address": "\u00cele-de-France - BEZONS",
    "city": "BEZONS",
    "postal_code": "63",
    "latitude": 48.92577795,
    "longitude": 2.21648756,
    "id": 290
  },
  {
    "label": "Mairie de LASSY",
    "address": "\u00cele-de-France - LASSY",
    "city": "LASSY",
    "postal_code": "331",
    "latitude": 49.09742736,
    "longitude": 2.44597128,
    "id": 291
  },
  {
    "label": "Mairie de PISCOP",
    "address": "\u00cele-de-France - PISCOP",
    "city": "PISCOP",
    "postal_code": "489",
    "latitude": 49.01211024,
    "longitude": 2.34333385,
    "id": 292
  },
  {
    "label": "Mairie de SAINT-PRIX",
    "address": "\u00cele-de-France - SAINT-PRIX",
    "city": "SAINT-PRIX",
    "postal_code": "574",
    "latitude": 49.00669539,
    "longitude": 2.26274137,
    "id": 293
  },
  {
    "label": "Mairie de AUTOUILLET",
    "address": "\u00cele-de-France - AUTOUILLET",
    "city": "AUTOUILLET",
    "postal_code": "36",
    "latitude": 48.84915291,
    "longitude": 1.80403213,
    "id": 294
  },
  {
    "label": "Mairie de BAULNE",
    "address": "\u00cele-de-France - BAULNE",
    "city": "BAULNE",
    "postal_code": "47",
    "latitude": 48.49259345,
    "longitude": 2.35950359,
    "id": 295
  },
  {
    "label": "Mairie de VILLABE",
    "address": "\u00cele-de-France - VILLABE",
    "city": "VILLABE",
    "postal_code": "659",
    "latitude": 48.58872495,
    "longitude": 2.45575053,
    "id": 296
  },
  {
    "label": "Mairie de VILLEBON-SUR-YVETTE",
    "address": "\u00cele-de-France - VILLEBON-SUR-YVETTE",
    "city": "VILLEBON-SUR-YVETTE",
    "postal_code": "661",
    "latitude": 48.70019639,
    "longitude": 2.22787456,
    "id": 297
  },
  {
    "label": "Mairie de ANDREZEL",
    "address": "\u00cele-de-France - ANDREZEL",
    "city": "ANDREZEL",
    "postal_code": "4",
    "latitude": 48.61119865,
    "longitude": 2.81368199,
    "id": 298
  },
  {
    "label": "Mairie de HERICY",
    "address": "\u00cele-de-France - HERICY",
    "city": "HERICY",
    "postal_code": "226",
    "latitude": 48.44597726,
    "longitude": 2.76352845,
    "id": 299
  },
  {
    "label": "Mairie de LA CROIX-EN-BRIE",
    "address": "\u00cele-de-France - LA CROIX-EN-BRIE",
    "city": "LA CROIX-EN-BRIE",
    "postal_code": "147",
    "latitude": 48.59367844,
    "longitude": 3.0750720400000002,
    "id": 300
  },
  {
    "label": "Mairie de LIEUSAINT",
    "address": "\u00cele-de-France - LIEUSAINT",
    "city": "LIEUSAINT",
    "postal_code": "251",
    "latitude": 48.6326436,
    "longitude": 2.54806914,
    "id": 301
  },
  {
    "label": "Mairie de MOISENAY",
    "address": "\u00cele-de-France - MOISENAY",
    "city": "MOISENAY",
    "postal_code": "295",
    "latitude": 48.56294247,
    "longitude": 2.73604256,
    "id": 302
  },
  {
    "label": "Mairie de SAINT-ANGE-LE-VIEL",
    "address": "\u00cele-de-France - SAINT-ANGE-LE-VIEL",
    "city": "SAINT-ANGE-LE-VIEL",
    "postal_code": "399",
    "latitude": 48.26558309,
    "longitude": 2.90077251,
    "id": 303
  },
  {
    "label": "Mairie de SAINT-JUST-EN-BRIE",
    "address": "\u00cele-de-France - SAINT-JUST-EN-BRIE",
    "city": "SAINT-JUST-EN-BRIE",
    "postal_code": "416",
    "latitude": 48.61319357,
    "longitude": 3.11601967,
    "id": 304
  },
  {
    "label": "Mairie de VAUX-SUR-LUNAIN",
    "address": "\u00cele-de-France - VAUX-SUR-LUNAIN",
    "city": "VAUX-SUR-LUNAIN",
    "postal_code": "489",
    "latitude": 48.22764767,
    "longitude": 2.93535446,
    "id": 305
  },
  {
    "label": "Mairie de TREMBLAY-EN-FRANCE",
    "address": "\u00cele-de-France - TREMBLAY-EN-FRANCE",
    "city": "TREMBLAY-EN-FRANCE",
    "postal_code": "73",
    "latitude": 48.95615408,
    "longitude": 2.5766793100000003,
    "id": 306
  },
  {
    "label": "Mairie de FOSSES",
    "address": "\u00cele-de-France - FOSSES",
    "city": "FOSSES",
    "postal_code": "250",
    "latitude": 49.09825609,
    "longitude": 2.50618213,
    "id": 307
  },
  {
    "label": "Mairie de JAGNY-SOUS-BOIS",
    "address": "\u00cele-de-France - JAGNY-SOUS-BOIS",
    "city": "JAGNY-SOUS-BOIS",
    "postal_code": "316",
    "latitude": 49.07766135,
    "longitude": 2.44319398,
    "id": 308
  },
  {
    "label": "Mairie de SARCELLES",
    "address": "\u00cele-de-France - SARCELLES",
    "city": "SARCELLES",
    "postal_code": "585",
    "latitude": 48.99682687,
    "longitude": 2.37747463,
    "id": 309
  },
  {
    "label": "Mairie de DORMELLES",
    "address": "\u00cele-de-France - DORMELLES",
    "city": "DORMELLES",
    "postal_code": "161",
    "latitude": 48.31593201,
    "longitude": 2.90131372,
    "id": 310
  },
  {
    "label": "Mairie de GESVRES-LE-CHAPITRE",
    "address": "\u00cele-de-France - GESVRES-LE-CHAPITRE",
    "city": "GESVRES-LE-CHAPITRE",
    "postal_code": "205",
    "latitude": 49.04515029,
    "longitude": 2.851858,
    "id": 311
  },
  {
    "label": "Mairie de GUERMANTES",
    "address": "\u00cele-de-France - GUERMANTES",
    "city": "GUERMANTES",
    "postal_code": "221",
    "latitude": 48.85427077,
    "longitude": 2.70559511,
    "id": 312
  },
  {
    "label": "Mairie de JOUY-MAUVOISIN",
    "address": "\u00cele-de-France - JOUY-MAUVOISIN",
    "city": "JOUY-MAUVOISIN",
    "postal_code": "324",
    "latitude": 48.9750767,
    "longitude": 1.64847023,
    "id": 313
  },
  {
    "label": "Mairie de MAGNY-LES-HAMEAUX",
    "address": "\u00cele-de-France - MAGNY-LES-HAMEAUX",
    "city": "MAGNY-LES-HAMEAUX",
    "postal_code": "356",
    "latitude": 48.724245260000004,
    "longitude": 2.08381798,
    "id": 314
  },
  {
    "label": "Mairie de COURANCES",
    "address": "\u00cele-de-France - COURANCES",
    "city": "COURANCES",
    "postal_code": "180",
    "latitude": 48.43947462,
    "longitude": 2.47432838,
    "id": 315
  },
  {
    "label": "Mairie de GIRONVILLE-SUR-ESSONNE",
    "address": "\u00cele-de-France - GIRONVILLE-SUR-ESSONNE",
    "city": "GIRONVILLE-SUR-ESSONNE",
    "postal_code": "273",
    "latitude": 48.37301781,
    "longitude": 2.37834479,
    "id": 316
  },
  {
    "label": "Mairie de SAINT-MAURICE",
    "address": "\u00cele-de-France - SAINT-MAURICE",
    "city": "SAINT-MAURICE",
    "postal_code": "69",
    "latitude": 48.81885029,
    "longitude": 2.43449954,
    "id": 317
  },
  {
    "label": "Mairie de SUCY-EN-BRIE",
    "address": "\u00cele-de-France - SUCY-EN-BRIE",
    "city": "SUCY-EN-BRIE",
    "postal_code": "71",
    "latitude": 48.76931191,
    "longitude": 2.5227888800000002,
    "id": 318
  },
  {
    "label": "Mairie de MONTSOULT",
    "address": "\u00cele-de-France - MONTSOULT",
    "city": "MONTSOULT",
    "postal_code": "430",
    "latitude": 49.07141522,
    "longitude": 2.31051663,
    "id": 319
  },
  {
    "label": "Mairie de BARCY",
    "address": "\u00cele-de-France - BARCY",
    "city": "BARCY",
    "postal_code": "23",
    "latitude": 49.01805939,
    "longitude": 2.88164681,
    "id": 320
  },
  {
    "label": "Mairie de BELLOT",
    "address": "\u00cele-de-France - BELLOT",
    "city": "BELLOT",
    "postal_code": "30",
    "latitude": 48.8561908,
    "longitude": 3.31853262,
    "id": 321
  },
  {
    "label": "Mairie de BOISDON",
    "address": "\u00cele-de-France - BOISDON",
    "city": "BOISDON",
    "postal_code": "36",
    "latitude": 48.68524694,
    "longitude": 3.22434843,
    "id": 322
  },
  {
    "label": "Mairie de COULOMBS-EN-VALOIS",
    "address": "\u00cele-de-France - COULOMBS-EN-VALOIS",
    "city": "COULOMBS-EN-VALOIS",
    "postal_code": "129",
    "latitude": 49.06971893,
    "longitude": 3.1256384600000002,
    "id": 323
  },
  {
    "label": "Mairie de CREVECOEUR-EN-BRIE",
    "address": "\u00cele-de-France - CREVECOEUR-EN-BRIE",
    "city": "CREVECOEUR-EN-BRIE",
    "postal_code": "144",
    "latitude": 48.75370822,
    "longitude": 2.90742373,
    "id": 324
  },
  {
    "label": "Mairie de FEROLLES-ATTILLY",
    "address": "\u00cele-de-France - FEROLLES-ATTILLY",
    "city": "FEROLLES-ATTILLY",
    "postal_code": "180",
    "latitude": 48.73224446,
    "longitude": 2.62999854,
    "id": 325
  },
  {
    "label": "Mairie de MAINCY",
    "address": "\u00cele-de-France - MAINCY",
    "city": "MAINCY",
    "postal_code": "269",
    "latitude": 48.54956756,
    "longitude": 2.70209005,
    "id": 326
  },
  {
    "label": "Mairie de MONTGE-EN-GOELE",
    "address": "\u00cele-de-France - MONTGE-EN-GOELE",
    "city": "MONTGE-EN-GOELE",
    "postal_code": "308",
    "latitude": 49.02757097,
    "longitude": 2.75055908,
    "id": 327
  },
  {
    "label": "Mairie de VULAINES-SUR-SEINE",
    "address": "\u00cele-de-France - VULAINES-SUR-SEINE",
    "city": "VULAINES-SUR-SEINE",
    "postal_code": "533",
    "latitude": 48.43068431,
    "longitude": 2.76610569,
    "id": 328
  },
  {
    "label": "Mairie de BEHOUST",
    "address": "\u00cele-de-France - BEHOUST",
    "city": "BEHOUST",
    "postal_code": "53",
    "latitude": 48.82987872,
    "longitude": 1.72118814,
    "id": 329
  },
  {
    "label": "Mairie de ABBEVILLE-LA-RIVIERE",
    "address": "\u00cele-de-France - ABBEVILLE-LA-RIVIERE",
    "city": "ABBEVILLE-LA-RIVIERE",
    "postal_code": "1",
    "latitude": 48.34682838,
    "longitude": 2.16656946,
    "id": 330
  },
  {
    "label": "Mairie de ARPAJON",
    "address": "\u00cele-de-France - ARPAJON",
    "city": "ARPAJON",
    "postal_code": "21",
    "latitude": 48.59054776,
    "longitude": 2.24707542,
    "id": 331
  },
  {
    "label": "Mairie de SAINT-AUBIN",
    "address": "\u00cele-de-France - SAINT-AUBIN",
    "city": "SAINT-AUBIN",
    "postal_code": "538",
    "latitude": 48.71356723,
    "longitude": 2.14091735,
    "id": 332
  },
  {
    "label": "Mairie de CHAMARANDE",
    "address": "\u00cele-de-France - CHAMARANDE",
    "city": "CHAMARANDE",
    "postal_code": "132",
    "latitude": 48.51590705,
    "longitude": 2.21608247,
    "id": 333
  },
  {
    "label": "Mairie de PRECY-SUR-MARNE",
    "address": "\u00cele-de-France - PRECY-SUR-MARNE",
    "city": "PRECY-SUR-MARNE",
    "postal_code": "376",
    "latitude": 48.93132916,
    "longitude": 2.77434286,
    "id": 334
  },
  {
    "label": "Mairie de PRESLES-EN-BRIE",
    "address": "\u00cele-de-France - PRESLES-EN-BRIE",
    "city": "PRESLES-EN-BRIE",
    "postal_code": "377",
    "latitude": 48.71484,
    "longitude": 2.74128209,
    "id": 335
  },
  {
    "label": "Mairie de HEROUVILLE",
    "address": "\u00cele-de-France - HEROUVILLE",
    "city": "HEROUVILLE",
    "postal_code": "308",
    "latitude": 49.10089602,
    "longitude": 2.13260177,
    "id": 336
  },
  {
    "label": "Mairie de MONTLIGNON",
    "address": "\u00cele-de-France - MONTLIGNON",
    "city": "MONTLIGNON",
    "postal_code": "426",
    "latitude": 49.0094023,
    "longitude": 2.283228,
    "id": 337
  },
  {
    "label": "Mairie de SAINT-BRICE-SOUS-FORET",
    "address": "\u00cele-de-France - SAINT-BRICE-SOUS-FORET",
    "city": "SAINT-BRICE-SOUS-FORET",
    "postal_code": "539",
    "latitude": 48.99862929,
    "longitude": 2.35698977,
    "id": 338
  },
  {
    "label": "Mairie de CHOISY-LE-ROI",
    "address": "\u00cele-de-France - CHOISY-LE-ROI",
    "city": "CHOISY-LE-ROI",
    "postal_code": "22",
    "latitude": 48.76673967,
    "longitude": 2.4072089,
    "id": 339
  },
  {
    "label": "Mairie de LE PERREUX-SUR-MARNE",
    "address": "\u00cele-de-France - LE PERREUX-SUR-MARNE",
    "city": "LE PERREUX-SUR-MARNE",
    "postal_code": "58",
    "latitude": 48.84214111,
    "longitude": 2.50398645,
    "id": 340
  },
  {
    "label": "Mairie de ENGHIEN-LES-BAINS",
    "address": "\u00cele-de-France - ENGHIEN-LES-BAINS",
    "city": "ENGHIEN-LES-BAINS",
    "postal_code": "210",
    "latitude": 48.96987056,
    "longitude": 2.30783912,
    "id": 341
  },
  {
    "label": "Mairie de VILLUIS",
    "address": "\u00cele-de-France - VILLUIS",
    "city": "VILLUIS",
    "postal_code": "523",
    "latitude": 48.41086072,
    "longitude": 3.35879821,
    "id": 342
  },
  {
    "label": "Mairie de ANDELU",
    "address": "\u00cele-de-France - ANDELU",
    "city": "ANDELU",
    "postal_code": "13",
    "latitude": 48.88070361,
    "longitude": 1.82551037,
    "id": 343
  },
  {
    "label": "Mairie de LE PERRAY-EN-YVELINES",
    "address": "\u00cele-de-France - LE PERRAY-EN-YVELINES",
    "city": "LE PERRAY-EN-YVELINES",
    "postal_code": "486",
    "latitude": 48.69387218,
    "longitude": 1.8545035300000001,
    "id": 344
  },
  {
    "label": "Mairie de MONTALET-LE-BOIS",
    "address": "\u00cele-de-France - MONTALET-LE-BOIS",
    "city": "MONTALET-LE-BOIS",
    "postal_code": "416",
    "latitude": 49.04606002,
    "longitude": 1.8252396800000001,
    "id": 345
  },
  {
    "label": "Mairie de PARIS",
    "address": "\u00cele-de-France - PARIS",
    "city": "PARIS",
    "postal_code": "56",
    "latitude": 48.86023255,
    "longitude": 2.34467815,
    "id": 346
  },
  {
    "label": "Mairie de CHENOISE",
    "address": "\u00cele-de-France - CHENOISE",
    "city": "CHENOISE",
    "postal_code": "109",
    "latitude": 48.61534749,
    "longitude": 3.19468698,
    "id": 347
  },
  {
    "label": "Mairie de CHEVRY-EN-SEREINE",
    "address": "\u00cele-de-France - CHEVRY-EN-SEREINE",
    "city": "CHEVRY-EN-SEREINE",
    "postal_code": "115",
    "latitude": 48.2536806,
    "longitude": 2.94372951,
    "id": 348
  },
  {
    "label": "Mairie de ISLES-LES-VILLENOY",
    "address": "\u00cele-de-France - ISLES-LES-VILLENOY",
    "city": "ISLES-LES-VILLENOY",
    "postal_code": "232",
    "latitude": 48.91135707,
    "longitude": 2.82598634,
    "id": 349
  },
  {
    "label": "Mairie de LE MEE-SUR-SEINE",
    "address": "\u00cele-de-France - LE MEE-SUR-SEINE",
    "city": "LE MEE-SUR-SEINE",
    "postal_code": "285",
    "latitude": 48.53717829,
    "longitude": 2.63161178,
    "id": 350
  },
  {
    "label": "Mairie de MAISONCELLES-EN-GATINAIS",
    "address": "\u00cele-de-France - MAISONCELLES-EN-GATINAIS",
    "city": "MAISONCELLES-EN-GATINAIS",
    "postal_code": "271",
    "latitude": 48.18745325,
    "longitude": 2.6256188099999997,
    "id": 351
  },
  {
    "label": "Mairie de PIERRE-LEVEE",
    "address": "\u00cele-de-France - PIERRE-LEVEE",
    "city": "PIERRE-LEVEE",
    "postal_code": "361",
    "latitude": 48.89951156,
    "longitude": 3.0385303,
    "id": 352
  },
  {
    "label": "Mairie de SAINT-FIACRE",
    "address": "\u00cele-de-France - SAINT-FIACRE",
    "city": "SAINT-FIACRE",
    "postal_code": "408",
    "latitude": 48.92244564,
    "longitude": 2.95428587,
    "id": 353
  },
  {
    "label": "Mairie de LARDY",
    "address": "\u00cele-de-France - LARDY",
    "city": "LARDY",
    "postal_code": "330",
    "latitude": 48.52223972,
    "longitude": 2.26478614,
    "id": 354
  },
  {
    "label": "Mairie de MOUSSY",
    "address": "\u00cele-de-France - MOUSSY",
    "city": "MOUSSY",
    "postal_code": "438",
    "latitude": 49.13804503,
    "longitude": 1.9092333799999999,
    "id": 355
  },
  {
    "label": "Mairie de SAINT-GERVAIS",
    "address": "\u00cele-de-France - SAINT-GERVAIS",
    "city": "SAINT-GERVAIS",
    "postal_code": "554",
    "latitude": 49.16891168,
    "longitude": 1.76920744,
    "id": 356
  },
  {
    "label": "Mairie de NEUILLY-PLAISANCE",
    "address": "\u00cele-de-France - NEUILLY-PLAISANCE",
    "city": "NEUILLY-PLAISANCE",
    "postal_code": "49",
    "latitude": 48.861007,
    "longitude": 2.50949562,
    "id": 357
  },
  {
    "label": "Mairie de SEVRAN",
    "address": "\u00cele-de-France - SEVRAN",
    "city": "SEVRAN",
    "postal_code": "71",
    "latitude": 48.94097154,
    "longitude": 2.52340396,
    "id": 358
  },
  {
    "label": "Mairie de VILLETANEUSE",
    "address": "\u00cele-de-France - VILLETANEUSE",
    "city": "VILLETANEUSE",
    "postal_code": "79",
    "latitude": 48.96448199,
    "longitude": 2.34469311,
    "id": 359
  },
  {
    "label": "Mairie de SAINT-MANDE",
    "address": "\u00cele-de-France - SAINT-MANDE",
    "city": "SAINT-MANDE",
    "postal_code": "67",
    "latitude": 48.84133157,
    "longitude": 2.41820236,
    "id": 360
  },
  {
    "label": "Mairie de VITRY-SUR-SEINE",
    "address": "\u00cele-de-France - VITRY-SUR-SEINE",
    "city": "VITRY-SUR-SEINE",
    "postal_code": "81",
    "latitude": 48.78741993,
    "longitude": 2.3922746,
    "id": 361
  },
  {
    "label": "Mairie de EGLIGNY",
    "address": "\u00cele-de-France - EGLIGNY",
    "city": "EGLIGNY",
    "postal_code": "167",
    "latitude": 48.4279698,
    "longitude": 3.12001641,
    "id": 362
  },
  {
    "label": "Mairie de MOISSY-CRAMAYEL",
    "address": "\u00cele-de-France - MOISSY-CRAMAYEL",
    "city": "MOISSY-CRAMAYEL",
    "postal_code": "296",
    "latitude": 48.62626331,
    "longitude": 2.59279114,
    "id": 363
  },
  {
    "label": "Mairie de PALEY",
    "address": "\u00cele-de-France - PALEY",
    "city": "PALEY",
    "postal_code": "353",
    "latitude": 48.2414995,
    "longitude": 2.85878547,
    "id": 364
  },
  {
    "label": "Mairie de VERNOU-LA-CELLE-SUR-SEINE",
    "address": "\u00cele-de-France - VERNOU-LA-CELLE-SUR-SEINE",
    "city": "VERNOU-LA-CELLE-SUR-SEINE",
    "postal_code": "494",
    "latitude": 48.38810811,
    "longitude": 2.8467475,
    "id": 365
  },
  {
    "label": "Mairie de ARMENTIERES-EN-BRIE",
    "address": "\u00cele-de-France - ARMENTIERES-EN-BRIE",
    "city": "ARMENTIERES-EN-BRIE",
    "postal_code": "8",
    "latitude": 48.97869552,
    "longitude": 3.021855,
    "id": 366
  },
  {
    "label": "Mairie de COULOMMES",
    "address": "\u00cele-de-France - COULOMMES",
    "city": "COULOMMES",
    "postal_code": "130",
    "latitude": 48.89111628,
    "longitude": 2.92937963,
    "id": 367
  },
  {
    "label": "Mairie de PERIGNY",
    "address": "\u00cele-de-France - PERIGNY",
    "city": "PERIGNY",
    "postal_code": "56",
    "latitude": 48.69556001,
    "longitude": 2.55103965,
    "id": 368
  },
  {
    "label": "Mairie de BESSANCOURT",
    "address": "\u00cele-de-France - BESSANCOURT",
    "city": "BESSANCOURT",
    "postal_code": "60",
    "latitude": 49.0381062,
    "longitude": 2.21349146,
    "id": 369
  },
  {
    "label": "Mairie de FERRIERES-EN-BRIE",
    "address": "\u00cele-de-France - FERRIERES-EN-BRIE",
    "city": "FERRIERES-EN-BRIE",
    "postal_code": "181",
    "latitude": 48.82101713,
    "longitude": 2.7053591,
    "id": 370
  },
  {
    "label": "Mairie de LAVAL-EN-BRIE",
    "address": "\u00cele-de-France - LAVAL-EN-BRIE",
    "city": "LAVAL-EN-BRIE",
    "postal_code": "245",
    "latitude": 48.42422559,
    "longitude": 2.99703683,
    "id": 371
  },
  {
    "label": "Mairie de SOIGNOLLES-EN-BRIE",
    "address": "\u00cele-de-France - SOIGNOLLES-EN-BRIE",
    "city": "SOIGNOLLES-EN-BRIE",
    "postal_code": "455",
    "latitude": 48.65474836,
    "longitude": 2.70011345,
    "id": 372
  },
  {
    "label": "Mairie de VILLIERS-SOUS-GREZ",
    "address": "\u00cele-de-France - VILLIERS-SOUS-GREZ",
    "city": "VILLIERS-SOUS-GREZ",
    "postal_code": "520",
    "latitude": 48.31956983,
    "longitude": 2.64791459,
    "id": 373
  },
  {
    "label": "Mairie de ACHERES",
    "address": "\u00cele-de-France - ACHERES",
    "city": "ACHERES",
    "postal_code": "5",
    "latitude": 48.96238348,
    "longitude": 2.06900393,
    "id": 374
  },
  {
    "label": "Mairie de AUTEUIL",
    "address": "\u00cele-de-France - AUTEUIL",
    "city": "AUTEUIL",
    "postal_code": "34",
    "latitude": 48.84022578,
    "longitude": 1.81773999,
    "id": 375
  },
  {
    "label": "Mairie de MANTES-LA-VILLE",
    "address": "\u00cele-de-France - MANTES-LA-VILLE",
    "city": "MANTES-LA-VILLE",
    "postal_code": "362",
    "latitude": 48.97452382,
    "longitude": 1.71127503,
    "id": 376
  },
  {
    "label": "Mairie de PARAY-VIEILLE-POSTE",
    "address": "\u00cele-de-France - PARAY-VIEILLE-POSTE",
    "city": "PARAY-VIEILLE-POSTE",
    "postal_code": "479",
    "latitude": 48.70833378,
    "longitude": 2.36231213,
    "id": 377
  },
  {
    "label": "Mairie de PRUNAY-SUR-ESSONNE",
    "address": "\u00cele-de-France - PRUNAY-SUR-ESSONNE",
    "city": "PRUNAY-SUR-ESSONNE",
    "postal_code": "507",
    "latitude": 48.357735,
    "longitude": 2.37428569,
    "id": 378
  },
  {
    "label": "Mairie de SACLAS",
    "address": "\u00cele-de-France - SACLAS",
    "city": "SACLAS",
    "postal_code": "533",
    "latitude": 48.35934745,
    "longitude": 2.12470712,
    "id": 379
  },
  {
    "label": "Mairie de CHATENAY-MALABRY",
    "address": "\u00cele-de-France - CHATENAY-MALABRY",
    "city": "CHATENAY-MALABRY",
    "postal_code": "19",
    "latitude": 48.76494789,
    "longitude": 2.27804376,
    "id": 380
  },
  {
    "label": "Mairie de MENUCOURT",
    "address": "\u00cele-de-France - MENUCOURT",
    "city": "MENUCOURT",
    "postal_code": "388",
    "latitude": 49.02685664,
    "longitude": 1.9812128800000002,
    "id": 381
  },
  {
    "label": "Mairie de GAILLON-SUR-MONTCIENT",
    "address": "\u00cele-de-France - GAILLON-SUR-MONTCIENT",
    "city": "GAILLON-SUR-MONTCIENT",
    "postal_code": "261",
    "latitude": 49.02566044,
    "longitude": 1.89239977,
    "id": 382
  },
  {
    "label": "Mairie de GALLUIS",
    "address": "\u00cele-de-France - GALLUIS",
    "city": "GALLUIS",
    "postal_code": "262",
    "latitude": 48.79517884,
    "longitude": 1.79370293,
    "id": 383
  },
  {
    "label": "Mairie de GAMBAIS",
    "address": "\u00cele-de-France - GAMBAIS",
    "city": "GAMBAIS",
    "postal_code": "263",
    "latitude": 48.77299372,
    "longitude": 1.67290767,
    "id": 384
  },
  {
    "label": "Mairie de MAREIL-SUR-MAULDRE",
    "address": "\u00cele-de-France - MAREIL-SUR-MAULDRE",
    "city": "MAREIL-SUR-MAULDRE",
    "postal_code": "368",
    "latitude": 48.89526214,
    "longitude": 1.86898429,
    "id": 385
  },
  {
    "label": "Mairie de ORCEMONT",
    "address": "\u00cele-de-France - ORCEMONT",
    "city": "ORCEMONT",
    "postal_code": "464",
    "latitude": 48.58761443,
    "longitude": 1.81077194,
    "id": 386
  },
  {
    "label": "Mairie de ETIOLLES",
    "address": "\u00cele-de-France - ETIOLLES",
    "city": "ETIOLLES",
    "postal_code": "225",
    "latitude": 48.63544944,
    "longitude": 2.47348779,
    "id": 387
  },
  {
    "label": "Mairie de MILLY-LA-FORET",
    "address": "\u00cele-de-France - MILLY-LA-FORET",
    "city": "MILLY-LA-FORET",
    "postal_code": "405",
    "latitude": 48.40442,
    "longitude": 2.46748535,
    "id": 388
  },
  {
    "label": "Mairie de ASNIERES-SUR-SEINE",
    "address": "\u00cele-de-France - ASNIERES-SUR-SEINE",
    "city": "ASNIERES-SUR-SEINE",
    "postal_code": "4",
    "latitude": 48.91144894,
    "longitude": 2.28605705,
    "id": 389
  },
  {
    "label": "Mairie de PUTEAUX",
    "address": "\u00cele-de-France - PUTEAUX",
    "city": "PUTEAUX",
    "postal_code": "62",
    "latitude": 48.88445753,
    "longitude": 2.23838772,
    "id": 390
  },
  {
    "label": "Mairie de VINCENNES",
    "address": "\u00cele-de-France - VINCENNES",
    "city": "VINCENNES",
    "postal_code": "80",
    "latitude": 48.84760719,
    "longitude": 2.43863878,
    "id": 391
  },
  {
    "label": "Mairie de BOISSY-L'AILLERIE",
    "address": "\u00cele-de-France - BOISSY-L'AILLERIE",
    "city": "BOISSY-L'AILLERIE",
    "postal_code": "78",
    "latitude": 49.07821607,
    "longitude": 2.03146983,
    "id": 392
  },
  {
    "label": "Mairie de ECOUEN",
    "address": "\u00cele-de-France - ECOUEN",
    "city": "ECOUEN",
    "postal_code": "205",
    "latitude": 49.01839254,
    "longitude": 2.38159022,
    "id": 393
  },
  {
    "label": "Mairie de BOISSISE-LE-ROI",
    "address": "\u00cele-de-France - BOISSISE-LE-ROI",
    "city": "BOISSISE-LE-ROI",
    "postal_code": "40",
    "latitude": 48.52561953,
    "longitude": 2.57470456,
    "id": 394
  },
  {
    "label": "Mairie de GRAVON",
    "address": "\u00cele-de-France - GRAVON",
    "city": "GRAVON",
    "postal_code": "212",
    "latitude": 48.39920198,
    "longitude": 3.11958615,
    "id": 395
  },
  {
    "label": "Mairie de SAINT-MARTIN-EN-BIERE",
    "address": "\u00cele-de-France - SAINT-MARTIN-EN-BIERE",
    "city": "SAINT-MARTIN-EN-BIERE",
    "postal_code": "425",
    "latitude": 48.43663258,
    "longitude": 2.56754513,
    "id": 396
  },
  {
    "label": "Mairie de COIGNIERES",
    "address": "\u00cele-de-France - COIGNIERES",
    "city": "COIGNIERES",
    "postal_code": "168",
    "latitude": 48.74715486,
    "longitude": 1.92060772,
    "id": 397
  },
  {
    "label": "Mairie de BOULLAY-LES-TROUX",
    "address": "\u00cele-de-France - BOULLAY-LES-TROUX",
    "city": "BOULLAY-LES-TROUX",
    "postal_code": "93",
    "latitude": 48.67832346,
    "longitude": 2.04875041,
    "id": 398
  },
  {
    "label": "Mairie de DANNEMOIS",
    "address": "\u00cele-de-France - DANNEMOIS",
    "city": "DANNEMOIS",
    "postal_code": "195",
    "latitude": 48.4520577,
    "longitude": 2.47706431,
    "id": 399
  },
  {
    "label": "Mairie de MAROLLES-EN-BEAUCE",
    "address": "\u00cele-de-France - MAROLLES-EN-BEAUCE",
    "city": "MAROLLES-EN-BEAUCE",
    "postal_code": "374",
    "latitude": 48.37474351,
    "longitude": 2.20021541,
    "id": 400
  },
  {
    "label": "Mairie de BANTHELU",
    "address": "\u00cele-de-France - BANTHELU",
    "city": "BANTHELU",
    "postal_code": "46",
    "latitude": 49.12598948,
    "longitude": 1.81486225,
    "id": 401
  },
  {
    "label": "Mairie de LE PLESSIS-GASSOT",
    "address": "\u00cele-de-France - LE PLESSIS-GASSOT",
    "city": "LE PLESSIS-GASSOT",
    "postal_code": "492",
    "latitude": 49.03365144,
    "longitude": 2.41577022,
    "id": 402
  },
  {
    "label": "Mairie de NUCOURT",
    "address": "\u00cele-de-France - NUCOURT",
    "city": "NUCOURT",
    "postal_code": "459",
    "latitude": 49.15850231,
    "longitude": 1.85426317,
    "id": 403
  },
  {
    "label": "Mairie de OBSONVILLE",
    "address": "\u00cele-de-France - OBSONVILLE",
    "city": "OBSONVILLE",
    "postal_code": "342",
    "latitude": 48.21726604,
    "longitude": 2.56120155,
    "id": 404
  },
  {
    "label": "Mairie de VIGNELY",
    "address": "\u00cele-de-France - VIGNELY",
    "city": "VIGNELY",
    "postal_code": "498",
    "latitude": 48.93030068,
    "longitude": 2.80843346,
    "id": 405
  },
  {
    "label": "Mairie de COURTACON",
    "address": "\u00cele-de-France - COURTACON",
    "city": "COURTACON",
    "postal_code": "137",
    "latitude": 48.69551675,
    "longitude": 3.29105996,
    "id": 406
  },
  {
    "label": "Mairie de COURTRY",
    "address": "\u00cele-de-France - COURTRY",
    "city": "COURTRY",
    "postal_code": "139",
    "latitude": 48.91745606,
    "longitude": 2.60240917,
    "id": 407
  },
  {
    "label": "Mairie de JOUY-SUR-MORIN",
    "address": "\u00cele-de-France - JOUY-SUR-MORIN",
    "city": "JOUY-SUR-MORIN",
    "postal_code": "240",
    "latitude": 48.79453144,
    "longitude": 3.27383191,
    "id": 408
  },
  {
    "label": "Mairie de MAROLLES-EN-BRIE",
    "address": "\u00cele-de-France - MAROLLES-EN-BRIE",
    "city": "MAROLLES-EN-BRIE",
    "postal_code": "278",
    "latitude": 48.77646481,
    "longitude": 3.16470658,
    "id": 409
  },
  {
    "label": "Mairie de NANTOUILLET",
    "address": "\u00cele-de-France - NANTOUILLET",
    "city": "NANTOUILLET",
    "postal_code": "332",
    "latitude": 49.00166696,
    "longitude": 2.70254739,
    "id": 410
  },
  {
    "label": "Mairie de NONVILLE",
    "address": "\u00cele-de-France - NONVILLE",
    "city": "NONVILLE",
    "postal_code": "340",
    "latitude": 48.28585054,
    "longitude": 2.78782409,
    "id": 411
  },
  {
    "label": "Mairie de SOGNOLLES-EN-MONTOIS",
    "address": "\u00cele-de-France - SOGNOLLES-EN-MONTOIS",
    "city": "SOGNOLLES-EN-MONTOIS",
    "postal_code": "454",
    "latitude": 48.51125922,
    "longitude": 3.16726934,
    "id": 412
  },
  {
    "label": "Mairie de THOMERY",
    "address": "\u00cele-de-France - THOMERY",
    "city": "THOMERY",
    "postal_code": "463",
    "latitude": 48.40813347,
    "longitude": 2.78617623,
    "id": 413
  },
  {
    "label": "Mairie de LA VILLENEUVE-EN-CHEVRIE",
    "address": "\u00cele-de-France - LA VILLENEUVE-EN-CHEVRIE",
    "city": "LA VILLENEUVE-EN-CHEVRIE",
    "postal_code": "668",
    "latitude": 49.01475065,
    "longitude": 1.52634643,
    "id": 414
  },
  {
    "label": "Mairie de ORGERUS",
    "address": "\u00cele-de-France - ORGERUS",
    "city": "ORGERUS",
    "postal_code": "465",
    "latitude": 48.83965733,
    "longitude": 1.7006478999999999,
    "id": 415
  },
  {
    "label": "Mairie de ROCQUENCOURT",
    "address": "\u00cele-de-France - ROCQUENCOURT",
    "city": "ROCQUENCOURT",
    "postal_code": "524",
    "latitude": 48.83664938,
    "longitude": 2.11049882,
    "id": 416
  },
  {
    "label": "Mairie de TRIEL-SUR-SEINE",
    "address": "\u00cele-de-France - TRIEL-SUR-SEINE",
    "city": "TRIEL-SUR-SEINE",
    "postal_code": "624",
    "latitude": 48.98109752,
    "longitude": 2.00610322,
    "id": 417
  },
  {
    "label": "Mairie de VAUX-SUR-SEINE",
    "address": "\u00cele-de-France - VAUX-SUR-SEINE",
    "city": "VAUX-SUR-SEINE",
    "postal_code": "638",
    "latitude": 49.00793154,
    "longitude": 1.96358506,
    "id": 418
  },
  {
    "label": "Mairie de VIROFLAY",
    "address": "\u00cele-de-France - VIROFLAY",
    "city": "VIROFLAY",
    "postal_code": "686",
    "latitude": 48.79990077,
    "longitude": 2.17188302,
    "id": 419
  },
  {
    "label": "Mairie de JANVILLE-SUR-JUINE",
    "address": "\u00cele-de-France - JANVILLE-SUR-JUINE",
    "city": "JANVILLE-SUR-JUINE",
    "postal_code": "318",
    "latitude": 48.5168483,
    "longitude": 2.26885306,
    "id": 420
  },
  {
    "label": "Mairie de LEUVILLE-SUR-ORGE",
    "address": "\u00cele-de-France - LEUVILLE-SUR-ORGE",
    "city": "LEUVILLE-SUR-ORGE",
    "postal_code": "333",
    "latitude": 48.61662849,
    "longitude": 2.2646549,
    "id": 421
  },
  {
    "label": "Mairie de LEVALLOIS-PERRET",
    "address": "\u00cele-de-France - LEVALLOIS-PERRET",
    "city": "LEVALLOIS-PERRET",
    "postal_code": "44",
    "latitude": 48.89347533,
    "longitude": 2.2874377900000002,
    "id": 422
  },
  {
    "label": "Mairie de CACHAN",
    "address": "\u00cele-de-France - CACHAN",
    "city": "CACHAN",
    "postal_code": "16",
    "latitude": 48.79192652,
    "longitude": 2.33242556,
    "id": 423
  },
  {
    "label": "Mairie de CERGY",
    "address": "\u00cele-de-France - CERGY",
    "city": "CERGY",
    "postal_code": "127",
    "latitude": 49.05216772,
    "longitude": 2.03572554,
    "id": 424
  },
  {
    "label": "Mairie de CHARMONT",
    "address": "\u00cele-de-France - CHARMONT",
    "city": "CHARMONT",
    "postal_code": "141",
    "latitude": 49.13576932,
    "longitude": 1.7914831599999999,
    "id": 425
  },
  {
    "label": "Mairie de CHENNEVIERES-LES-LOUVRES",
    "address": "\u00cele-de-France - CHENNEVIERES-LES-LOUVRES",
    "city": "CHENNEVIERES-LES-LOUVRES",
    "postal_code": "154",
    "latitude": 49.04426923,
    "longitude": 2.55111533,
    "id": 426
  },
  {
    "label": "Mairie de ERMONT",
    "address": "\u00cele-de-France - ERMONT",
    "city": "ERMONT",
    "postal_code": "219",
    "latitude": 48.99141684,
    "longitude": 2.26003226,
    "id": 427
  },
  {
    "label": "Mairie de RONQUEROLLES",
    "address": "\u00cele-de-France - RONQUEROLLES",
    "city": "RONQUEROLLES",
    "postal_code": "529",
    "latitude": 49.16661029,
    "longitude": 2.22414452,
    "id": 428
  },
  {
    "label": "Mairie de CHATILLON-LA-BORDE",
    "address": "\u00cele-de-France - CHATILLON-LA-BORDE",
    "city": "CHATILLON-LA-BORDE",
    "postal_code": "103",
    "latitude": 48.53020648,
    "longitude": 2.8345991,
    "id": 429
  },
  {
    "label": "Mairie de CHAUFFRY",
    "address": "\u00cele-de-France - CHAUFFRY",
    "city": "CHAUFFRY",
    "postal_code": "106",
    "latitude": 48.81857131,
    "longitude": 3.18443311,
    "id": 430
  },
  {
    "label": "Mairie de CHAMPIGNY-SUR-MARNE",
    "address": "\u00cele-de-France - CHAMPIGNY-SUR-MARNE",
    "city": "CHAMPIGNY-SUR-MARNE",
    "postal_code": "17",
    "latitude": 48.81695802,
    "longitude": 2.51615432,
    "id": 431
  },
  {
    "label": "Mairie de ARTHIES",
    "address": "\u00cele-de-France - ARTHIES",
    "city": "ARTHIES",
    "postal_code": "24",
    "latitude": 49.09532953,
    "longitude": 1.79054244,
    "id": 432
  },
  {
    "label": "Mairie de US",
    "address": "\u00cele-de-France - US",
    "city": "US",
    "postal_code": "625",
    "latitude": 49.09959985,
    "longitude": 1.9670267,
    "id": 433
  },
  {
    "label": "Mairie de FONTENAY-MAUVOISIN",
    "address": "\u00cele-de-France - FONTENAY-MAUVOISIN",
    "city": "FONTENAY-MAUVOISIN",
    "postal_code": "245",
    "latitude": 48.96430893,
    "longitude": 1.65134334,
    "id": 434
  },
  {
    "label": "Mairie de LA VERRIERE",
    "address": "\u00cele-de-France - LA VERRIERE",
    "city": "LA VERRIERE",
    "postal_code": "644",
    "latitude": 48.75897958,
    "longitude": 1.96265644,
    "id": 435
  },
  {
    "label": "Mairie de TILLY",
    "address": "\u00cele-de-France - TILLY",
    "city": "TILLY",
    "postal_code": "618",
    "latitude": 48.88206796,
    "longitude": 1.57611834,
    "id": 436
  },
  {
    "label": "Mairie de SAINT-CYR-SOUS-DOURDAN",
    "address": "\u00cele-de-France - SAINT-CYR-SOUS-DOURDAN",
    "city": "SAINT-CYR-SOUS-DOURDAN",
    "postal_code": "546",
    "latitude": 48.56862402,
    "longitude": 2.03581215,
    "id": 437
  },
  {
    "label": "Mairie de BRIE-COMTE-ROBERT",
    "address": "\u00cele-de-France - BRIE-COMTE-ROBERT",
    "city": "BRIE-COMTE-ROBERT",
    "postal_code": "53",
    "latitude": 48.69274084,
    "longitude": 2.61076808,
    "id": 438
  },
  {
    "label": "Mairie de LE CHATELET-EN-BRIE",
    "address": "\u00cele-de-France - LE CHATELET-EN-BRIE",
    "city": "LE CHATELET-EN-BRIE",
    "postal_code": "100",
    "latitude": 48.502518,
    "longitude": 2.78969303,
    "id": 439
  },
  {
    "label": "Mairie de SAINT-LEGER",
    "address": "\u00cele-de-France - SAINT-LEGER",
    "city": "SAINT-LEGER",
    "postal_code": "417",
    "latitude": 48.83871669,
    "longitude": 3.25556666,
    "id": 440
  },
  {
    "label": "Mairie de SOUPPES-SUR-LOING",
    "address": "\u00cele-de-France - SOUPPES-SUR-LOING",
    "city": "SOUPPES-SUR-LOING",
    "postal_code": "458",
    "latitude": 48.18353438,
    "longitude": 2.73585274,
    "id": 441
  },
  {
    "label": "Mairie de VILLIERS-EN-BIERE",
    "address": "\u00cele-de-France - VILLIERS-EN-BIERE",
    "city": "VILLIERS-EN-BIERE",
    "postal_code": "518",
    "latitude": 48.49410404,
    "longitude": 2.59890747,
    "id": 442
  },
  {
    "label": "Mairie de CHATENAY-EN-FRANCE",
    "address": "\u00cele-de-France - CHATENAY-EN-FRANCE",
    "city": "CHATENAY-EN-FRANCE",
    "postal_code": "144",
    "latitude": 49.06686415,
    "longitude": 2.45821495,
    "id": 443
  },
  {
    "label": "Mairie de AULNOY",
    "address": "\u00cele-de-France - AULNOY",
    "city": "AULNOY",
    "postal_code": "13",
    "latitude": 48.84073741,
    "longitude": 3.09628686,
    "id": 444
  },
  {
    "label": "Mairie de COCHEREL",
    "address": "\u00cele-de-France - COCHEREL",
    "city": "COCHEREL",
    "postal_code": "120",
    "latitude": 49.02044045,
    "longitude": 3.10302457,
    "id": 445
  },
  {
    "label": "Mairie de POMMEUSE",
    "address": "\u00cele-de-France - POMMEUSE",
    "city": "POMMEUSE",
    "postal_code": "371",
    "latitude": 48.81605794,
    "longitude": 3.01562677,
    "id": 446
  },
  {
    "label": "Mairie de TIGEAUX",
    "address": "\u00cele-de-France - TIGEAUX",
    "city": "TIGEAUX",
    "postal_code": "466",
    "latitude": 48.82654084,
    "longitude": 2.90141764,
    "id": 447
  },
  {
    "label": "Mairie de HERBEVILLE",
    "address": "\u00cele-de-France - HERBEVILLE",
    "city": "HERBEVILLE",
    "postal_code": "305",
    "latitude": 48.90611478,
    "longitude": 1.8866095600000001,
    "id": 448
  },
  {
    "label": "Mairie de TRAPPES",
    "address": "\u00cele-de-France - TRAPPES",
    "city": "TRAPPES",
    "postal_code": "621",
    "latitude": 48.77707324,
    "longitude": 2.00196419,
    "id": 449
  },
  {
    "label": "Mairie de DOMONT",
    "address": "\u00cele-de-France - DOMONT",
    "city": "DOMONT",
    "postal_code": "199",
    "latitude": 49.0273865,
    "longitude": 2.32693753,
    "id": 450
  },
  {
    "label": "Mairie de BEAUTHEIL",
    "address": "\u00cele-de-France - BEAUTHEIL",
    "city": "BEAUTHEIL",
    "postal_code": "28",
    "latitude": 48.76348884,
    "longitude": 3.08836021,
    "id": 451
  },
  {
    "label": "Mairie de BUTHIERS",
    "address": "\u00cele-de-France - BUTHIERS",
    "city": "BUTHIERS",
    "postal_code": "60",
    "latitude": 48.28757443,
    "longitude": 2.4308199200000002,
    "id": 452
  },
  {
    "label": "Mairie de CONDE-SAINTE-LIBIAIRE",
    "address": "\u00cele-de-France - CONDE-SAINTE-LIBIAIRE",
    "city": "CONDE-SAINTE-LIBIAIRE",
    "postal_code": "125",
    "latitude": 48.89785424,
    "longitude": 2.83131148,
    "id": 453
  },
  {
    "label": "Mairie de FRETOY",
    "address": "\u00cele-de-France - FRETOY",
    "city": "FRETOY",
    "postal_code": "197",
    "latitude": 48.70522041,
    "longitude": 3.19752642,
    "id": 454
  },
  {
    "label": "Mairie de LA CHAPELLE-IGER",
    "address": "\u00cele-de-France - LA CHAPELLE-IGER",
    "city": "LA CHAPELLE-IGER",
    "postal_code": "87",
    "latitude": 48.65261362,
    "longitude": 2.98907646,
    "id": 455
  },
  {
    "label": "Mairie de LE VAUDOUE",
    "address": "\u00cele-de-France - LE VAUDOUE",
    "city": "LE VAUDOUE",
    "postal_code": "485",
    "latitude": 48.35670226,
    "longitude": 2.51862919,
    "id": 456
  },
  {
    "label": "Mairie de SAINT-MARS-VIEUX-MAISONS",
    "address": "\u00cele-de-France - SAINT-MARS-VIEUX-MAISONS",
    "city": "SAINT-MARS-VIEUX-MAISONS",
    "postal_code": "421",
    "latitude": 48.74203159,
    "longitude": 3.31909568,
    "id": 457
  },
  {
    "label": "Mairie de CLAIREFONTAINE-EN-YVELINES",
    "address": "\u00cele-de-France - CLAIREFONTAINE-EN-YVELINES",
    "city": "CLAIREFONTAINE-EN-YVELINES",
    "postal_code": "164",
    "latitude": 48.6122783,
    "longitude": 1.90812957,
    "id": 458
  },
  {
    "label": "Mairie de ISSOU",
    "address": "\u00cele-de-France - ISSOU",
    "city": "ISSOU",
    "postal_code": "314",
    "latitude": 48.9893032,
    "longitude": 1.79302868,
    "id": 459
  },
  {
    "label": "Mairie de CERNY",
    "address": "\u00cele-de-France - CERNY",
    "city": "CERNY",
    "postal_code": "129",
    "latitude": 48.4773123,
    "longitude": 2.32839824,
    "id": 460
  },
  {
    "label": "Mairie de CHAUFFOUR-LES-ETRECHY",
    "address": "\u00cele-de-France - CHAUFFOUR-LES-ETRECHY",
    "city": "CHAUFFOUR-LES-ETRECHY",
    "postal_code": "148",
    "latitude": 48.50416236,
    "longitude": 2.16876099,
    "id": 461
  },
  {
    "label": "Mairie de SAINT-PIERRE-DU-PERRAY",
    "address": "\u00cele-de-France - SAINT-PIERRE-DU-PERRAY",
    "city": "SAINT-PIERRE-DU-PERRAY",
    "postal_code": "573",
    "latitude": 48.61294994,
    "longitude": 2.49511929,
    "id": 462
  },
  {
    "label": "Mairie de FOURQUEUX",
    "address": "\u00cele-de-France - FOURQUEUX",
    "city": "FOURQUEUX",
    "postal_code": "251",
    "latitude": 48.88688445,
    "longitude": 2.06530624,
    "id": 463
  },
  {
    "label": "Mairie de LES MUREAUX",
    "address": "\u00cele-de-France - LES MUREAUX",
    "city": "LES MUREAUX",
    "postal_code": "440",
    "latitude": 48.99337021,
    "longitude": 1.90906509,
    "id": 464
  },
  {
    "label": "Mairie de LES MOLIERES",
    "address": "\u00cele-de-France - LES MOLIERES",
    "city": "LES MOLIERES",
    "postal_code": "411",
    "latitude": 48.67207914,
    "longitude": 2.06914287,
    "id": 465
  },
  {
    "label": "Mairie de RICHARVILLE",
    "address": "\u00cele-de-France - RICHARVILLE",
    "city": "RICHARVILLE",
    "postal_code": "519",
    "latitude": 48.47144099,
    "longitude": 2.00122113,
    "id": 466
  },
  {
    "label": "Mairie de VAUHALLAN",
    "address": "\u00cele-de-France - VAUHALLAN",
    "city": "VAUHALLAN",
    "postal_code": "635",
    "latitude": 48.733433,
    "longitude": 2.20742286,
    "id": 467
  },
  {
    "label": "Mairie de AULNAY-SOUS-BOIS",
    "address": "\u00cele-de-France - AULNAY-SOUS-BOIS",
    "city": "AULNAY-SOUS-BOIS",
    "postal_code": "5",
    "latitude": 48.93652119,
    "longitude": 2.49337742,
    "id": 468
  },
  {
    "label": "Mairie de GENTILLY",
    "address": "\u00cele-de-France - GENTILLY",
    "city": "GENTILLY",
    "postal_code": "37",
    "latitude": 48.81349716,
    "longitude": 2.3446714699999998,
    "id": 469
  },
  {
    "label": "Mairie de BOUFFEMONT",
    "address": "\u00cele-de-France - BOUFFEMONT",
    "city": "BOUFFEMONT",
    "postal_code": "91",
    "latitude": 49.04355596,
    "longitude": 2.29959554,
    "id": 470
  },
  {
    "label": "Mairie de BREANCON",
    "address": "\u00cele-de-France - BREANCON",
    "city": "BREANCON",
    "postal_code": "102",
    "latitude": 49.14288621,
    "longitude": 2.02149927,
    "id": 471
  },
  {
    "label": "Mairie de AMPONVILLE",
    "address": "\u00cele-de-France - AMPONVILLE",
    "city": "AMPONVILLE",
    "postal_code": "3",
    "latitude": 48.27936321,
    "longitude": 2.529138,
    "id": 472
  },
  {
    "label": "Mairie de CRECY-LA-CHAPELLE",
    "address": "\u00cele-de-France - CRECY-LA-CHAPELLE",
    "city": "CRECY-LA-CHAPELLE",
    "postal_code": "142",
    "latitude": 48.85886919,
    "longitude": 2.90721773,
    "id": 473
  },
  {
    "label": "Mairie de SAINT-BARTHELEMY",
    "address": "\u00cele-de-France - SAINT-BARTHELEMY",
    "city": "SAINT-BARTHELEMY",
    "postal_code": "402",
    "latitude": 48.81629347,
    "longitude": 3.35997127,
    "id": 474
  },
  {
    "label": "Mairie de LA CHAPELLE-EN-VEXIN",
    "address": "\u00cele-de-France - LA CHAPELLE-EN-VEXIN",
    "city": "LA CHAPELLE-EN-VEXIN",
    "postal_code": "139",
    "latitude": 49.18400461,
    "longitude": 1.73203208,
    "id": 475
  },
  {
    "label": "Mairie de HEDOUVILLE",
    "address": "\u00cele-de-France - HEDOUVILLE",
    "city": "HEDOUVILLE",
    "postal_code": "304",
    "latitude": 49.15396694,
    "longitude": 2.16937757,
    "id": 476
  },
  {
    "label": "Mairie de VIENNE-EN-ARTHIES",
    "address": "\u00cele-de-France - VIENNE-EN-ARTHIES",
    "city": "VIENNE-EN-ARTHIES",
    "postal_code": "656",
    "latitude": 49.06622287,
    "longitude": 1.71836908,
    "id": 477
  },
  {
    "label": "Mairie de GAMBAISEUIL",
    "address": "\u00cele-de-France - GAMBAISEUIL",
    "city": "GAMBAISEUIL",
    "postal_code": "264",
    "latitude": 48.75712794,
    "longitude": 1.73156673,
    "id": 478
  },
  {
    "label": "Mairie de SAINT-GERMAIN-EN-LAYE",
    "address": "\u00cele-de-France - SAINT-GERMAIN-EN-LAYE",
    "city": "SAINT-GERMAIN-EN-LAYE",
    "postal_code": "551",
    "latitude": 48.89682374,
    "longitude": 2.08978942,
    "id": 479
  },
  {
    "label": "Mairie de SEPTEUIL",
    "address": "\u00cele-de-France - SEPTEUIL",
    "city": "SEPTEUIL",
    "postal_code": "591",
    "latitude": 48.89257749,
    "longitude": 1.68091584,
    "id": 480
  },
  {
    "label": "Mairie de TESSANCOURT-SUR-AUBETTE",
    "address": "\u00cele-de-France - TESSANCOURT-SUR-AUBETTE",
    "city": "TESSANCOURT-SUR-AUBETTE",
    "postal_code": "609",
    "latitude": 49.02486044,
    "longitude": 1.9197359299999999,
    "id": 481
  },
  {
    "label": "Mairie de BREUILLET",
    "address": "\u00cele-de-France - BREUILLET",
    "city": "BREUILLET",
    "postal_code": "105",
    "latitude": 48.5661945,
    "longitude": 2.17126951,
    "id": 482
  },
  {
    "label": "Mairie de CHATIGNONVILLE",
    "address": "\u00cele-de-France - CHATIGNONVILLE",
    "city": "CHATIGNONVILLE",
    "postal_code": "145",
    "latitude": 48.46762889,
    "longitude": 1.93229936,
    "id": 483
  },
  {
    "label": "Mairie de PUISELET-LE-MARAIS",
    "address": "\u00cele-de-France - PUISELET-LE-MARAIS",
    "city": "PUISELET-LE-MARAIS",
    "postal_code": "508",
    "latitude": 48.40536706,
    "longitude": 2.26224744,
    "id": 484
  },
  {
    "label": "Mairie de VILLEJUST",
    "address": "\u00cele-de-France - VILLEJUST",
    "city": "VILLEJUST",
    "postal_code": "666",
    "latitude": 48.68222643,
    "longitude": 2.23605701,
    "id": 485
  },
  {
    "label": "Mairie de CHAMPEAUX",
    "address": "\u00cele-de-France - CHAMPEAUX",
    "city": "CHAMPEAUX",
    "postal_code": "82",
    "latitude": 48.58515741,
    "longitude": 2.80666934,
    "id": 486
  },
  {
    "label": "Mairie de MERY-SUR-MARNE",
    "address": "\u00cele-de-France - MERY-SUR-MARNE",
    "city": "MERY-SUR-MARNE",
    "postal_code": "290",
    "latitude": 48.96674311,
    "longitude": 3.20187364,
    "id": 487
  },
  {
    "label": "Mairie de MONTHYON",
    "address": "\u00cele-de-France - MONTHYON",
    "city": "MONTHYON",
    "postal_code": "309",
    "latitude": 49.00841116,
    "longitude": 2.82690369,
    "id": 488
  },
  {
    "label": "Mairie de SAINT-MARD",
    "address": "\u00cele-de-France - SAINT-MARD",
    "city": "SAINT-MARD",
    "postal_code": "420",
    "latitude": 49.03853479,
    "longitude": 2.69460709,
    "id": 489
  },
  {
    "label": "Mairie de THORIGNY-SUR-MARNE",
    "address": "\u00cele-de-France - THORIGNY-SUR-MARNE",
    "city": "THORIGNY-SUR-MARNE",
    "postal_code": "464",
    "latitude": 48.88481041,
    "longitude": 2.71126319,
    "id": 490
  },
  {
    "label": "Mairie de BUC",
    "address": "\u00cele-de-France - BUC",
    "city": "BUC",
    "postal_code": "117",
    "latitude": 48.77376257,
    "longitude": 2.12573159,
    "id": 491
  },
  {
    "label": "Mairie de LE MESNIL-SAINT-DENIS",
    "address": "\u00cele-de-France - LE MESNIL-SAINT-DENIS",
    "city": "LE MESNIL-SAINT-DENIS",
    "postal_code": "397",
    "latitude": 48.74369984,
    "longitude": 1.96276655,
    "id": 492
  },
  {
    "label": "Mairie de MONTIGNY-LE-BRETONNEUX",
    "address": "\u00cele-de-France - MONTIGNY-LE-BRETONNEUX",
    "city": "MONTIGNY-LE-BRETONNEUX",
    "postal_code": "423",
    "latitude": 48.77086574,
    "longitude": 2.03327904,
    "id": 493
  },
  {
    "label": "Mairie de MOIGNY-SUR-ECOLE",
    "address": "\u00cele-de-France - MOIGNY-SUR-ECOLE",
    "city": "MOIGNY-SUR-ECOLE",
    "postal_code": "408",
    "latitude": 48.43320053,
    "longitude": 2.45674913,
    "id": 494
  },
  {
    "label": "Mairie de VILLIERS-LE-BACLE",
    "address": "\u00cele-de-France - VILLIERS-LE-BACLE",
    "city": "VILLIERS-LE-BACLE",
    "postal_code": "679",
    "latitude": 48.72522648,
    "longitude": 2.12592902,
    "id": 495
  },
  {
    "label": "Mairie de COURDIMANCHE",
    "address": "\u00cele-de-France - COURDIMANCHE",
    "city": "COURDIMANCHE",
    "postal_code": "183",
    "latitude": 49.03410477,
    "longitude": 2.00166346,
    "id": 496
  },
  {
    "label": "Mairie de VILLEMOMBLE",
    "address": "\u00cele-de-France - VILLEMOMBLE",
    "city": "VILLEMOMBLE",
    "postal_code": "77",
    "latitude": 48.89066301,
    "longitude": 2.51095709,
    "id": 497
  },
  {
    "label": "Mairie de MAROLLES-EN-BRIE",
    "address": "\u00cele-de-France - MAROLLES-EN-BRIE",
    "city": "MAROLLES-EN-BRIE",
    "postal_code": "48",
    "latitude": 48.73241249,
    "longitude": 2.55119118,
    "id": 498
  },
  {
    "label": "Mairie de BETHEMONT-LA-FORET",
    "address": "\u00cele-de-France - BETHEMONT-LA-FORET",
    "city": "BETHEMONT-LA-FORET",
    "postal_code": "61",
    "latitude": 49.05431545,
    "longitude": 2.25310212,
    "id": 499
  },
  {
    "label": "Mairie de REAU",
    "address": "\u00cele-de-France - REAU",
    "city": "REAU",
    "postal_code": "384",
    "latitude": 48.61091064,
    "longitude": 2.6238946,
    "id": 500
  },
  {
    "label": "Mairie de SANCY",
    "address": "\u00cele-de-France - SANCY",
    "city": "SANCY",
    "postal_code": "443",
    "latitude": 48.8864701,
    "longitude": 2.95930894,
    "id": 501
  },
  {
    "label": "Mairie de VILLEMER",
    "address": "\u00cele-de-France - VILLEMER",
    "city": "VILLEMER",
    "postal_code": "506",
    "latitude": 48.30098475,
    "longitude": 2.82568695,
    "id": 502
  },
  {
    "label": "Mairie de CHANGIS-SUR-MARNE",
    "address": "\u00cele-de-France - CHANGIS-SUR-MARNE",
    "city": "CHANGIS-SUR-MARNE",
    "postal_code": "84",
    "latitude": 48.95804274,
    "longitude": 3.01885236,
    "id": 503
  },
  {
    "label": "Mairie de EZANVILLE",
    "address": "\u00cele-de-France - EZANVILLE",
    "city": "EZANVILLE",
    "postal_code": "229",
    "latitude": 49.02828318,
    "longitude": 2.3611007,
    "id": 504
  },
  {
    "label": "Mairie de MONTGEROULT",
    "address": "\u00cele-de-France - MONTGEROULT",
    "city": "MONTGEROULT",
    "postal_code": "422",
    "latitude": 49.08173729,
    "longitude": 2.00408977,
    "id": 505
  },
  {
    "label": "Mairie de NANTEUIL-SUR-MARNE",
    "address": "\u00cele-de-France - NANTEUIL-SUR-MARNE",
    "city": "NANTEUIL-SUR-MARNE",
    "postal_code": "331",
    "latitude": 48.97828498,
    "longitude": 3.2211807,
    "id": 506
  },
  {
    "label": "Mairie de OISSERY",
    "address": "\u00cele-de-France - OISSERY",
    "city": "OISSERY",
    "postal_code": "344",
    "latitude": 49.07045805,
    "longitude": 2.81655058,
    "id": 507
  },
  {
    "label": "Mairie de TRILPORT",
    "address": "\u00cele-de-France - TRILPORT",
    "city": "TRILPORT",
    "postal_code": "475",
    "latitude": 48.95752125,
    "longitude": 2.94924518,
    "id": 508
  },
  {
    "label": "Mairie de VERT-SAINT-DENIS",
    "address": "\u00cele-de-France - VERT-SAINT-DENIS",
    "city": "VERT-SAINT-DENIS",
    "postal_code": "495",
    "latitude": 48.56686671,
    "longitude": 2.62229813,
    "id": 509
  },
  {
    "label": "Mairie de JOUARS-PONTCHARTRAIN",
    "address": "\u00cele-de-France - JOUARS-PONTCHARTRAIN",
    "city": "JOUARS-PONTCHARTRAIN",
    "postal_code": "321",
    "latitude": 48.80281149,
    "longitude": 1.90111244,
    "id": 510
  },
  {
    "label": "Mairie de LA FORET-LE-ROI",
    "address": "\u00cele-de-France - LA FORET-LE-ROI",
    "city": "LA FORET-LE-ROI",
    "postal_code": "247",
    "latitude": 48.47874129,
    "longitude": 2.04173933,
    "id": 511
  },
  {
    "label": "Mairie de PUSSAY",
    "address": "\u00cele-de-France - PUSSAY",
    "city": "PUSSAY",
    "postal_code": "511",
    "latitude": 48.34914537,
    "longitude": 1.99256376,
    "id": 512
  },
  {
    "label": "Mairie de VIRY-CHATILLON",
    "address": "\u00cele-de-France - VIRY-CHATILLON",
    "city": "VIRY-CHATILLON",
    "postal_code": "687",
    "latitude": 48.66967909,
    "longitude": 2.37586471,
    "id": 513
  },
  {
    "label": "Mairie de GARCHES",
    "address": "\u00cele-de-France - GARCHES",
    "city": "GARCHES",
    "postal_code": "33",
    "latitude": 48.8457577,
    "longitude": 2.18671585,
    "id": 514
  },
  {
    "label": "Mairie de FAVRIEUX",
    "address": "\u00cele-de-France - FAVRIEUX",
    "city": "FAVRIEUX",
    "postal_code": "231",
    "latitude": 48.94358502,
    "longitude": 1.6420674499999999,
    "id": 515
  },
  {
    "label": "Mairie de LIMETZ-VILLEZ",
    "address": "\u00cele-de-France - LIMETZ-VILLEZ",
    "city": "LIMETZ-VILLEZ",
    "postal_code": "337",
    "latitude": 49.06073262,
    "longitude": 1.54887139,
    "id": 516
  },
  {
    "label": "Mairie de NEAUPHLETTE",
    "address": "\u00cele-de-France - NEAUPHLETTE",
    "city": "NEAUPHLETTE",
    "postal_code": "444",
    "latitude": 48.93117079,
    "longitude": 1.52629122,
    "id": 517
  },
  {
    "label": "Mairie de FONTENAY-LE-VICOMTE",
    "address": "\u00cele-de-France - FONTENAY-LE-VICOMTE",
    "city": "FONTENAY-LE-VICOMTE",
    "postal_code": "244",
    "latitude": 48.54741689,
    "longitude": 2.39879122,
    "id": 518
  },
  {
    "label": "Mairie de LE COUDRAY-MONTCEAUX",
    "address": "\u00cele-de-France - LE COUDRAY-MONTCEAUX",
    "city": "LE COUDRAY-MONTCEAUX",
    "postal_code": "179",
    "latitude": 48.56621633,
    "longitude": 2.4868512799999998,
    "id": 519
  },
  {
    "label": "Mairie de CORMEILLES-EN-VEXIN",
    "address": "\u00cele-de-France - CORMEILLES-EN-VEXIN",
    "city": "CORMEILLES-EN-VEXIN",
    "postal_code": "177",
    "latitude": 49.11593042,
    "longitude": 2.02166424,
    "id": 520
  },
  {
    "label": "Mairie de ROISSY-EN-BRIE",
    "address": "\u00cele-de-France - ROISSY-EN-BRIE",
    "city": "ROISSY-EN-BRIE",
    "postal_code": "390",
    "latitude": 48.79150996,
    "longitude": 2.65209763,
    "id": 521
  },
  {
    "label": "Mairie de VILLENEUVE-SUR-BELLOT",
    "address": "\u00cele-de-France - VILLENEUVE-SUR-BELLOT",
    "city": "VILLENEUVE-SUR-BELLOT",
    "postal_code": "512",
    "latitude": 48.86318714,
    "longitude": 3.34182398,
    "id": 522
  },
  {
    "label": "Mairie de VILLEROY",
    "address": "\u00cele-de-France - VILLEROY",
    "city": "VILLEROY",
    "postal_code": "515",
    "latitude": 48.98342591,
    "longitude": 2.78160988,
    "id": 523
  },
  {
    "label": "Mairie de EPONE",
    "address": "\u00cele-de-France - EPONE",
    "city": "EPONE",
    "postal_code": "217",
    "latitude": 48.95525255,
    "longitude": 1.8152209,
    "id": 524
  },
  {
    "label": "Mairie de LE VESINET",
    "address": "\u00cele-de-France - LE VESINET",
    "city": "LE VESINET",
    "postal_code": "650",
    "latitude": 48.89420783,
    "longitude": 2.13205504,
    "id": 525
  },
  {
    "label": "Mairie de ROSNY-SUR-SEINE",
    "address": "\u00cele-de-France - ROSNY-SUR-SEINE",
    "city": "ROSNY-SUR-SEINE",
    "postal_code": "531",
    "latitude": 49.00014213,
    "longitude": 1.63174625,
    "id": 526
  },
  {
    "label": "Mairie de BOISSY-LE-SEC",
    "address": "\u00cele-de-France - BOISSY-LE-SEC",
    "city": "BOISSY-LE-SEC",
    "postal_code": "81",
    "latitude": 48.47705496,
    "longitude": 2.09042535,
    "id": 527
  },
  {
    "label": "Mairie de BREUX-JOUY",
    "address": "\u00cele-de-France - BREUX-JOUY",
    "city": "BREUX-JOUY",
    "postal_code": "106",
    "latitude": 48.55897906,
    "longitude": 2.15504154,
    "id": 528
  },
  {
    "label": "Mairie de BROU-SUR-CHANTEREINE",
    "address": "\u00cele-de-France - BROU-SUR-CHANTEREINE",
    "city": "BROU-SUR-CHANTEREINE",
    "postal_code": "55",
    "latitude": 48.8823428,
    "longitude": 2.62948346,
    "id": 529
  },
  {
    "label": "Mairie de BUSSIERES",
    "address": "\u00cele-de-France - BUSSIERES",
    "city": "BUSSIERES",
    "postal_code": "57",
    "latitude": 48.9233471,
    "longitude": 3.23660931,
    "id": 530
  },
  {
    "label": "Mairie de CROUY-SUR-OURCQ",
    "address": "\u00cele-de-France - CROUY-SUR-OURCQ",
    "city": "CROUY-SUR-OURCQ",
    "postal_code": "148",
    "latitude": 49.08981789,
    "longitude": 3.07395279,
    "id": 531
  },
  {
    "label": "Mairie de LESCHES",
    "address": "\u00cele-de-France - LESCHES",
    "city": "LESCHES",
    "postal_code": "248",
    "latitude": 48.9079433,
    "longitude": 2.77959909,
    "id": 532
  },
  {
    "label": "Mairie de LORREZ-LE-BOCAGE-PREAUX",
    "address": "\u00cele-de-France - LORREZ-LE-BOCAGE-PREAUX",
    "city": "LORREZ-LE-BOCAGE-PREAUX",
    "postal_code": "261",
    "latitude": 48.23681157,
    "longitude": 2.90046372,
    "id": 533
  },
  {
    "label": "Mairie de MAISON-ROUGE",
    "address": "\u00cele-de-France - MAISON-ROUGE",
    "city": "MAISON-ROUGE",
    "postal_code": "272",
    "latitude": 48.55902383,
    "longitude": 3.15042313,
    "id": 534
  },
  {
    "label": "Mairie de MAROLLES-SUR-SEINE",
    "address": "\u00cele-de-France - MAROLLES-SUR-SEINE",
    "city": "MAROLLES-SUR-SEINE",
    "postal_code": "279",
    "latitude": 48.38626578,
    "longitude": 3.03165378,
    "id": 535
  },
  {
    "label": "Mairie de THOURY-FEROTTES",
    "address": "\u00cele-de-France - THOURY-FEROTTES",
    "city": "THOURY-FEROTTES",
    "postal_code": "465",
    "latitude": 48.2914495,
    "longitude": 2.94281886,
    "id": 536
  },
  {
    "label": "Mairie de VILLEMARECHAL",
    "address": "\u00cele-de-France - VILLEMARECHAL",
    "city": "VILLEMARECHAL",
    "postal_code": "504",
    "latitude": 48.267531579999996,
    "longitude": 2.86847143,
    "id": 537
  },
  {
    "label": "Mairie de ESMANS",
    "address": "\u00cele-de-France - ESMANS",
    "city": "ESMANS",
    "postal_code": "172",
    "latitude": 48.34791988,
    "longitude": 2.9758434,
    "id": 538
  },
  {
    "label": "Mairie de SAINT-AUGUSTIN",
    "address": "\u00cele-de-France - SAINT-AUGUSTIN",
    "city": "SAINT-AUGUSTIN",
    "postal_code": "400",
    "latitude": 48.78452337,
    "longitude": 3.0288166,
    "id": 539
  },
  {
    "label": "Mairie de SIGNY-SIGNETS",
    "address": "\u00cele-de-France - SIGNY-SIGNETS",
    "city": "SIGNY-SIGNETS",
    "postal_code": "451",
    "latitude": 48.92809694,
    "longitude": 3.06756027,
    "id": 540
  },
  {
    "label": "Mairie de GUERNES",
    "address": "\u00cele-de-France - GUERNES",
    "city": "GUERNES",
    "postal_code": "290",
    "latitude": 49.01094941,
    "longitude": 1.63569717,
    "id": 541
  },
  {
    "label": "Mairie de MAUREPAS",
    "address": "\u00cele-de-France - MAUREPAS",
    "city": "MAUREPAS",
    "postal_code": "383",
    "latitude": 48.76251778,
    "longitude": 1.94495665,
    "id": 542
  },
  {
    "label": "Mairie de VILLEPREUX",
    "address": "\u00cele-de-France - VILLEPREUX",
    "city": "VILLEPREUX",
    "postal_code": "674",
    "latitude": 48.83010087,
    "longitude": 2.00162157,
    "id": 543
  },
  {
    "label": "Mairie de VERRIERES-LE-BUISSON",
    "address": "\u00cele-de-France - VERRIERES-LE-BUISSON",
    "city": "VERRIERES-LE-BUISSON",
    "postal_code": "645",
    "latitude": 48.74786202,
    "longitude": 2.26311245,
    "id": 544
  },
  {
    "label": "Mairie de MARNES-LA-COQUETTE",
    "address": "\u00cele-de-France - MARNES-LA-COQUETTE",
    "city": "MARNES-LA-COQUETTE",
    "postal_code": "47",
    "latitude": 48.83046644,
    "longitude": 2.17723092,
    "id": 545
  },
  {
    "label": "Mairie de PIERREFITTE-SUR-SEINE",
    "address": "\u00cele-de-France - PIERREFITTE-SUR-SEINE",
    "city": "PIERREFITTE-SUR-SEINE",
    "postal_code": "59",
    "latitude": 48.964479850000004,
    "longitude": 2.3610713,
    "id": 546
  },
  {
    "label": "Mairie de AMBLEVILLE",
    "address": "\u00cele-de-France - AMBLEVILLE",
    "city": "AMBLEVILLE",
    "postal_code": "11",
    "latitude": 49.14877163,
    "longitude": 1.6954618799999999,
    "id": 547
  },
  {
    "label": "Mairie de BAGNEAUX-SUR-LOING",
    "address": "\u00cele-de-France - BAGNEAUX-SUR-LOING",
    "city": "BAGNEAUX-SUR-LOING",
    "postal_code": "16",
    "latitude": 48.23129001,
    "longitude": 2.70526173,
    "id": 548
  },
  {
    "label": "Mairie de BAGNOLET",
    "address": "\u00cele-de-France - BAGNOLET",
    "city": "BAGNOLET",
    "postal_code": "6",
    "latitude": 48.86649734,
    "longitude": 2.41687937,
    "id": 549
  },
  {
    "label": "Mairie de LA QUEUE-EN-BRIE",
    "address": "\u00cele-de-France - LA QUEUE-EN-BRIE",
    "city": "LA QUEUE-EN-BRIE",
    "postal_code": "60",
    "latitude": 48.78988962,
    "longitude": 2.57591274,
    "id": 550
  },
  {
    "label": "Mairie de BERVILLE",
    "address": "\u00cele-de-France - BERVILLE",
    "city": "BERVILLE",
    "postal_code": "59",
    "latitude": 49.19062946,
    "longitude": 2.07192807,
    "id": 551
  },
  {
    "label": "Mairie de BRUYERES-SUR-OISE",
    "address": "\u00cele-de-France - BRUYERES-SUR-OISE",
    "city": "BRUYERES-SUR-OISE",
    "postal_code": "116",
    "latitude": 49.15677963,
    "longitude": 2.32691163,
    "id": 552
  },
  {
    "label": "Mairie de VIGNY",
    "address": "\u00cele-de-France - VIGNY",
    "city": "VIGNY",
    "postal_code": "658",
    "latitude": 49.0779099,
    "longitude": 1.92888203,
    "id": 553
  },
  {
    "label": "Mairie de VOINSLES",
    "address": "\u00cele-de-France - VOINSLES",
    "city": "VOINSLES",
    "postal_code": "527",
    "latitude": 48.69118084,
    "longitude": 3.00449458,
    "id": 554
  },
  {
    "label": "Mairie de VOULX",
    "address": "\u00cele-de-France - VOULX",
    "city": "VOULX",
    "postal_code": "531",
    "latitude": 48.28052608,
    "longitude": 2.96828753,
    "id": 555
  },
  {
    "label": "Mairie de LEVIS-SAINT-NOM",
    "address": "\u00cele-de-France - LEVIS-SAINT-NOM",
    "city": "LEVIS-SAINT-NOM",
    "postal_code": "334",
    "latitude": 48.72118572,
    "longitude": 1.94934388,
    "id": 556
  },
  {
    "label": "Mairie de ETRECHY",
    "address": "\u00cele-de-France - ETRECHY",
    "city": "ETRECHY",
    "postal_code": "226",
    "latitude": 48.4934034,
    "longitude": 2.19043637,
    "id": 557
  },
  {
    "label": "Mairie de MONNERVILLE",
    "address": "\u00cele-de-France - MONNERVILLE",
    "city": "MONNERVILLE",
    "postal_code": "414",
    "latitude": 48.34659019,
    "longitude": 2.04518223,
    "id": 558
  },
  {
    "label": "Mairie de ACHERES-LA-FORET",
    "address": "\u00cele-de-France - ACHERES-LA-FORET",
    "city": "ACHERES-LA-FORET",
    "postal_code": "1",
    "latitude": 48.34583393,
    "longitude": 2.56444855,
    "id": 559
  },
  {
    "label": "Mairie de COLLEGIEN",
    "address": "\u00cele-de-France - COLLEGIEN",
    "city": "COLLEGIEN",
    "postal_code": "121",
    "latitude": 48.83729126,
    "longitude": 2.67279816,
    "id": 560
  },
  {
    "label": "Mairie de COURTOMER",
    "address": "\u00cele-de-France - COURTOMER",
    "city": "COURTOMER",
    "postal_code": "138",
    "latitude": 48.6539578,
    "longitude": 2.90226126,
    "id": 561
  },
  {
    "label": "Mairie de FONTAINE-LE-PORT",
    "address": "\u00cele-de-France - FONTAINE-LE-PORT",
    "city": "FONTAINE-LE-PORT",
    "postal_code": "188",
    "latitude": 48.48733095,
    "longitude": 2.7638658400000002,
    "id": 562
  },
  {
    "label": "Mairie de GRISY-SUISNES",
    "address": "\u00cele-de-France - GRISY-SUISNES",
    "city": "GRISY-SUISNES",
    "postal_code": "217",
    "latitude": 48.68450986,
    "longitude": 2.66638298,
    "id": 563
  },
  {
    "label": "Mairie de SERVON",
    "address": "\u00cele-de-France - SERVON",
    "city": "SERVON",
    "postal_code": "450",
    "latitude": 48.71706062,
    "longitude": 2.5878038,
    "id": 564
  },
  {
    "label": "Mairie de VENDREST",
    "address": "\u00cele-de-France - VENDREST",
    "city": "VENDREST",
    "postal_code": "490",
    "latitude": 49.04655983,
    "longitude": 3.09384213,
    "id": 565
  },
  {
    "label": "Mairie de VERDELOT",
    "address": "\u00cele-de-France - VERDELOT",
    "city": "VERDELOT",
    "postal_code": "492",
    "latitude": 48.87466041,
    "longitude": 3.36657307,
    "id": 566
  },
  {
    "label": "Mairie de SEVRES",
    "address": "\u00cele-de-France - SEVRES",
    "city": "SEVRES",
    "postal_code": "72",
    "latitude": 48.82331721,
    "longitude": 2.21128143,
    "id": 567
  },
  {
    "label": "Mairie de EAUBONNE",
    "address": "\u00cele-de-France - EAUBONNE",
    "city": "EAUBONNE",
    "postal_code": "203",
    "latitude": 48.99142767,
    "longitude": 2.27915009,
    "id": 568
  },
  {
    "label": "Mairie de VILLERS-EN-ARTHIES",
    "address": "\u00cele-de-France - VILLERS-EN-ARTHIES",
    "city": "VILLERS-EN-ARTHIES",
    "postal_code": "676",
    "latitude": 49.08872874,
    "longitude": 1.72630831,
    "id": 569
  },
  {
    "label": "Mairie de CESSOY-EN-MONTOIS",
    "address": "\u00cele-de-France - CESSOY-EN-MONTOIS",
    "city": "CESSOY-EN-MONTOIS",
    "postal_code": "68",
    "latitude": 48.50510735,
    "longitude": 3.14687782,
    "id": 570
  },
  {
    "label": "Mairie de MONTIGNY-LE-GUESDIER",
    "address": "\u00cele-de-France - MONTIGNY-LE-GUESDIER",
    "city": "MONTIGNY-LE-GUESDIER",
    "postal_code": "310",
    "latitude": 48.38384605,
    "longitude": 3.25433553,
    "id": 571
  },
  {
    "label": "Mairie de LONGNES",
    "address": "\u00cele-de-France - LONGNES",
    "city": "LONGNES",
    "postal_code": "346",
    "latitude": 48.92078844,
    "longitude": 1.5878231999999999,
    "id": 572
  },
  {
    "label": "Mairie de TOUSSUS-LE-NOBLE",
    "address": "\u00cele-de-France - TOUSSUS-LE-NOBLE",
    "city": "TOUSSUS-LE-NOBLE",
    "postal_code": "620",
    "latitude": 48.74677846,
    "longitude": 2.1149683,
    "id": 573
  },
  {
    "label": "Mairie de CONGERVILLE-THIONVILLE",
    "address": "\u00cele-de-France - CONGERVILLE-THIONVILLE",
    "city": "CONGERVILLE-THIONVILLE",
    "postal_code": "613",
    "latitude": 48.37792315,
    "longitude": 1.99507346,
    "id": 574
  },
  {
    "label": "Mairie de ROINVILLIERS",
    "address": "\u00cele-de-France - ROINVILLIERS",
    "city": "ROINVILLIERS",
    "postal_code": "526",
    "latitude": 48.35590318,
    "longitude": 2.24073442,
    "id": 575
  },
  {
    "label": "Mairie de SOISY-SUR-ECOLE",
    "address": "\u00cele-de-France - SOISY-SUR-ECOLE",
    "city": "SOISY-SUR-ECOLE",
    "postal_code": "599",
    "latitude": 48.47451077,
    "longitude": 2.49470108,
    "id": 576
  },
  {
    "label": "Mairie de LE BOURGET",
    "address": "\u00cele-de-France - LE BOURGET",
    "city": "LE BOURGET",
    "postal_code": "13",
    "latitude": 48.93479358,
    "longitude": 2.42516879,
    "id": 577
  },
  {
    "label": "Mairie de VILLEPINTE",
    "address": "\u00cele-de-France - VILLEPINTE",
    "city": "VILLEPINTE",
    "postal_code": "78",
    "latitude": 48.96073146,
    "longitude": 2.5302987999999997,
    "id": 578
  },
  {
    "label": "Mairie de PRESLES",
    "address": "\u00cele-de-France - PRESLES",
    "city": "PRESLES",
    "postal_code": "504",
    "latitude": 49.11543491,
    "longitude": 2.28174812,
    "id": 579
  },
  {
    "label": "Mairie de FROMONT",
    "address": "\u00cele-de-France - FROMONT",
    "city": "FROMONT",
    "postal_code": "198",
    "latitude": 48.25602497,
    "longitude": 2.50347058,
    "id": 580
  },
  {
    "label": "Mairie de GIRONVILLE",
    "address": "\u00cele-de-France - GIRONVILLE",
    "city": "GIRONVILLE",
    "postal_code": "207",
    "latitude": 48.1849534,
    "longitude": 2.52879331,
    "id": 581
  },
  {
    "label": "Mairie de MELZ-SUR-SEINE",
    "address": "\u00cele-de-France - MELZ-SUR-SEINE",
    "city": "MELZ-SUR-SEINE",
    "postal_code": "289",
    "latitude": 48.50502377,
    "longitude": 3.38634618,
    "id": 582
  },
  {
    "label": "Mairie de MISY-SUR-YONNE",
    "address": "\u00cele-de-France - MISY-SUR-YONNE",
    "city": "MISY-SUR-YONNE",
    "postal_code": "293",
    "latitude": 48.35983832,
    "longitude": 3.08931678,
    "id": 583
  },
  {
    "label": "Mairie de ORLY-SUR-MORIN",
    "address": "\u00cele-de-France - ORLY-SUR-MORIN",
    "city": "ORLY-SUR-MORIN",
    "postal_code": "345",
    "latitude": 48.90451661,
    "longitude": 3.23082901,
    "id": 584
  },
  {
    "label": "Mairie de REMAUVILLE",
    "address": "\u00cele-de-France - REMAUVILLE",
    "city": "REMAUVILLE",
    "postal_code": "387",
    "latitude": 48.21377642,
    "longitude": 2.8235306700000002,
    "id": 585
  },
  {
    "label": "Mairie de BULLION",
    "address": "\u00cele-de-France - BULLION",
    "city": "BULLION",
    "postal_code": "120",
    "latitude": 48.62155357,
    "longitude": 1.99618553,
    "id": 586
  },
  {
    "label": "Mairie de GARANCIERES",
    "address": "\u00cele-de-France - GARANCIERES",
    "city": "GARANCIERES",
    "postal_code": "265",
    "latitude": 48.8219613,
    "longitude": 1.7553106299999999,
    "id": 587
  },
  {
    "label": "Mairie de LE CHESNAY",
    "address": "\u00cele-de-France - LE CHESNAY",
    "city": "LE CHESNAY",
    "postal_code": "158",
    "latitude": 48.82050647,
    "longitude": 2.1296243,
    "id": 588
  },
  {
    "label": "Mairie de VICQ",
    "address": "\u00cele-de-France - VICQ",
    "city": "VICQ",
    "postal_code": "653",
    "latitude": 48.81513106,
    "longitude": 1.83432256,
    "id": 589
  },
  {
    "label": "Mairie de VIGNEUX-SUR-SEINE",
    "address": "\u00cele-de-France - VIGNEUX-SUR-SEINE",
    "city": "VIGNEUX-SUR-SEINE",
    "postal_code": "657",
    "latitude": 48.70022023,
    "longitude": 2.41662487,
    "id": 590
  },
  {
    "label": "Mairie de BOURG-LA-REINE",
    "address": "\u00cele-de-France - BOURG-LA-REINE",
    "city": "BOURG-LA-REINE",
    "postal_code": "14",
    "latitude": 48.77844281,
    "longitude": 2.31610729,
    "id": 591
  },
  {
    "label": "Mairie de BOUAFLE",
    "address": "\u00cele-de-France - BOUAFLE",
    "city": "BOUAFLE",
    "postal_code": "90",
    "latitude": 48.96456407,
    "longitude": 1.89565471,
    "id": 592
  },
  {
    "label": "Mairie de OINVILLE-SUR-MONTCIENT",
    "address": "\u00cele-de-France - OINVILLE-SUR-MONTCIENT",
    "city": "OINVILLE-SUR-MONTCIENT",
    "postal_code": "460",
    "latitude": 49.02728689,
    "longitude": 1.84865676,
    "id": 593
  },
  {
    "label": "Mairie de BLANDY",
    "address": "\u00cele-de-France - BLANDY",
    "city": "BLANDY",
    "postal_code": "67",
    "latitude": 48.31365923,
    "longitude": 2.25833493,
    "id": 594
  },
  {
    "label": "Mairie de MENNECY",
    "address": "\u00cele-de-France - MENNECY",
    "city": "MENNECY",
    "postal_code": "386",
    "latitude": 48.56537009,
    "longitude": 2.4367357800000002,
    "id": 595
  },
  {
    "label": "Mairie de SOISY-SUR-SEINE",
    "address": "\u00cele-de-France - SOISY-SUR-SEINE",
    "city": "SOISY-SUR-SEINE",
    "postal_code": "600",
    "latitude": 48.64715799,
    "longitude": 2.45181387,
    "id": 596
  },
  {
    "label": "Mairie de BOIS-COLOMBES",
    "address": "\u00cele-de-France - BOIS-COLOMBES",
    "city": "BOIS-COLOMBES",
    "postal_code": "9",
    "latitude": 48.91773091,
    "longitude": 2.26832381,
    "id": 597
  },
  {
    "label": "Mairie de GONESSE",
    "address": "\u00cele-de-France - GONESSE",
    "city": "GONESSE",
    "postal_code": "277",
    "latitude": 48.9868968,
    "longitude": 2.44846985,
    "id": 598
  },
  {
    "label": "Mairie de CROISSY-BEAUBOURG",
    "address": "\u00cele-de-France - CROISSY-BEAUBOURG",
    "city": "CROISSY-BEAUBOURG",
    "postal_code": "146",
    "latitude": 48.82834132,
    "longitude": 2.65912749,
    "id": 599
  },
  {
    "label": "Mairie de JABLINES",
    "address": "\u00cele-de-France - JABLINES",
    "city": "JABLINES",
    "postal_code": "234",
    "latitude": 48.91789331,
    "longitude": 2.7619567099999998,
    "id": 600
  },
  {
    "label": "Mairie de MAGNY-LE-HONGRE",
    "address": "\u00cele-de-France - MAGNY-LE-HONGRE",
    "city": "MAGNY-LE-HONGRE",
    "postal_code": "268",
    "latitude": 48.8628767,
    "longitude": 2.81326962,
    "id": 601
  },
  {
    "label": "Mairie de VENEUX-LES-SABLONS",
    "address": "\u00cele-de-France - VENEUX-LES-SABLONS",
    "city": "VENEUX-LES-SABLONS",
    "postal_code": "491",
    "latitude": 48.37754037,
    "longitude": 2.79266178,
    "id": 602
  },
  {
    "label": "Mairie de ORLY",
    "address": "\u00cele-de-France - ORLY",
    "city": "ORLY",
    "postal_code": "54",
    "latitude": 48.74337832,
    "longitude": 2.39222798,
    "id": 603
  },
  {
    "label": "Mairie de SANTENY",
    "address": "\u00cele-de-France - SANTENY",
    "city": "SANTENY",
    "postal_code": "70",
    "latitude": 48.72608224,
    "longitude": 2.57154409,
    "id": 604
  },
  {
    "label": "Mairie de WY-DIT-JOLI-VILLAGE",
    "address": "\u00cele-de-France - WY-DIT-JOLI-VILLAGE",
    "city": "WY-DIT-JOLI-VILLAGE",
    "postal_code": "690",
    "latitude": 49.10271559,
    "longitude": 1.83562585,
    "id": 605
  },
  {
    "label": "Mairie de BRUEIL-EN-VEXIN",
    "address": "\u00cele-de-France - BRUEIL-EN-VEXIN",
    "city": "BRUEIL-EN-VEXIN",
    "postal_code": "113",
    "latitude": 49.0316591,
    "longitude": 1.81991575,
    "id": 606
  },
  {
    "label": "Mairie de FEUCHEROLLES",
    "address": "\u00cele-de-France - FEUCHEROLLES",
    "city": "FEUCHEROLLES",
    "postal_code": "233",
    "latitude": 48.87315623,
    "longitude": 1.97273122,
    "id": 607
  },
  {
    "label": "Mairie de MONTAINVILLE",
    "address": "\u00cele-de-France - MONTAINVILLE",
    "city": "MONTAINVILLE",
    "postal_code": "415",
    "latitude": 48.88174919,
    "longitude": 1.86093019,
    "id": 608
  },
  {
    "label": "Mairie de RAIZEUX",
    "address": "\u00cele-de-France - RAIZEUX",
    "city": "RAIZEUX",
    "postal_code": "516",
    "latitude": 48.62383431,
    "longitude": 1.6829454,
    "id": 609
  },
  {
    "label": "Mairie de ATHIS-MONS",
    "address": "\u00cele-de-France - ATHIS-MONS",
    "city": "ATHIS-MONS",
    "postal_code": "27",
    "latitude": 48.70832494,
    "longitude": 2.38947468,
    "id": 610
  },
  {
    "label": "Mairie de ITTEVILLE",
    "address": "\u00cele-de-France - ITTEVILLE",
    "city": "ITTEVILLE",
    "postal_code": "315",
    "latitude": 48.51417105,
    "longitude": 2.34192277,
    "id": 611
  },
  {
    "label": "Mairie de SERMAISE",
    "address": "\u00cele-de-France - SERMAISE",
    "city": "SERMAISE",
    "postal_code": "593",
    "latitude": 48.53636726,
    "longitude": 2.08066927,
    "id": 612
  },
  {
    "label": "Mairie de BEAUMONT-DU-GATINAIS",
    "address": "\u00cele-de-France - BEAUMONT-DU-GATINAIS",
    "city": "BEAUMONT-DU-GATINAIS",
    "postal_code": "27",
    "latitude": 48.13826817,
    "longitude": 2.47757369,
    "id": 613
  },
  {
    "label": "Mairie de CHATRES",
    "address": "\u00cele-de-France - CHATRES",
    "city": "CHATRES",
    "postal_code": "104",
    "latitude": 48.71099425,
    "longitude": 2.80916314,
    "id": 614
  },
  {
    "label": "Mairie de ICHY",
    "address": "\u00cele-de-France - ICHY",
    "city": "ICHY",
    "postal_code": "230",
    "latitude": 48.20290445,
    "longitude": 2.54768967,
    "id": 615
  },
  {
    "label": "Mairie de MARCILLY",
    "address": "\u00cele-de-France - MARCILLY",
    "city": "MARCILLY",
    "postal_code": "274",
    "latitude": 49.03694845,
    "longitude": 2.87774541,
    "id": 616
  },
  {
    "label": "Mairie de SEINE-PORT",
    "address": "\u00cele-de-France - SEINE-PORT",
    "city": "SEINE-PORT",
    "postal_code": "447",
    "latitude": 48.55622551,
    "longitude": 2.55317706,
    "id": 617
  },
  {
    "label": "Mairie de GROSROUVRE",
    "address": "\u00cele-de-France - GROSROUVRE",
    "city": "GROSROUVRE",
    "postal_code": "289",
    "latitude": 48.78244901,
    "longitude": 1.76255385,
    "id": 618
  },
  {
    "label": "Mairie de SAINT-HILAIRE",
    "address": "\u00cele-de-France - SAINT-HILAIRE",
    "city": "SAINT-HILAIRE",
    "postal_code": "556",
    "latitude": 48.43387057,
    "longitude": 2.07576806,
    "id": 619
  },
  {
    "label": "Mairie de BUHY",
    "address": "\u00cele-de-France - BUHY",
    "city": "BUHY",
    "postal_code": "119",
    "latitude": 49.19277456,
    "longitude": 1.6908008300000001,
    "id": 620
  },
  {
    "label": "Mairie de PONTOISE",
    "address": "\u00cele-de-France - PONTOISE",
    "city": "PONTOISE",
    "postal_code": "500",
    "latitude": 49.050518,
    "longitude": 2.10135742,
    "id": 621
  },
  {
    "label": "Mairie de PUISEUX-PONTOISE",
    "address": "\u00cele-de-France - PUISEUX-PONTOISE",
    "city": "PUISEUX-PONTOISE",
    "postal_code": "510",
    "latitude": 49.05662179,
    "longitude": 2.02065931,
    "id": 622
  },
  {
    "label": "Mairie de L'ILE-SAINT-DENIS",
    "address": "\u00cele-de-France - L'ILE-SAINT-DENIS",
    "city": "L'ILE-SAINT-DENIS",
    "postal_code": "39",
    "latitude": 48.93572464,
    "longitude": 2.33923261,
    "id": 623
  },
  {
    "label": "Mairie de BRY-SUR-MARNE",
    "address": "\u00cele-de-France - BRY-SUR-MARNE",
    "city": "BRY-SUR-MARNE",
    "postal_code": "15",
    "latitude": 48.84121626,
    "longitude": 2.5216844099999998,
    "id": 624
  },
  {
    "label": "Mairie de SAINT-GRATIEN",
    "address": "\u00cele-de-France - SAINT-GRATIEN",
    "city": "SAINT-GRATIEN",
    "postal_code": "555",
    "latitude": 48.97165867,
    "longitude": 2.28190237,
    "id": 625
  },
  {
    "label": "Mairie de LESIGNY",
    "address": "\u00cele-de-France - LESIGNY",
    "city": "LESIGNY",
    "postal_code": "249",
    "latitude": 48.74396503,
    "longitude": 2.6151147999999997,
    "id": 626
  },
  {
    "label": "Mairie de MONTEREAU-SUR-LE-JARD",
    "address": "\u00cele-de-France - MONTEREAU-SUR-LE-JARD",
    "city": "MONTEREAU-SUR-LE-JARD",
    "postal_code": "306",
    "latitude": 48.59635688,
    "longitude": 2.68751001,
    "id": 627
  },
  {
    "label": "Mairie de NANTEUIL-LES-MEAUX",
    "address": "\u00cele-de-France - NANTEUIL-LES-MEAUX",
    "city": "NANTEUIL-LES-MEAUX",
    "postal_code": "330",
    "latitude": 48.92991755,
    "longitude": 2.89708788,
    "id": 628
  },
  {
    "label": "Mairie de SAINT-BRICE",
    "address": "\u00cele-de-France - SAINT-BRICE",
    "city": "SAINT-BRICE",
    "postal_code": "403",
    "latitude": 48.56759414,
    "longitude": 3.32393946,
    "id": 629
  },
  {
    "label": "Mairie de COMPANS",
    "address": "\u00cele-de-France - COMPANS",
    "city": "COMPANS",
    "postal_code": "123",
    "latitude": 48.99369011,
    "longitude": 2.6642533200000003,
    "id": 630
  },
  {
    "label": "Mairie de BONNEUIL-SUR-MARNE",
    "address": "\u00cele-de-France - BONNEUIL-SUR-MARNE",
    "city": "BONNEUIL-SUR-MARNE",
    "postal_code": "11",
    "latitude": 48.77385584,
    "longitude": 2.48744917,
    "id": 631
  },
  {
    "label": "Mairie de FRESNES",
    "address": "\u00cele-de-France - FRESNES",
    "city": "FRESNES",
    "postal_code": "34",
    "latitude": 48.75867024,
    "longitude": 2.32427199,
    "id": 632
  },
  {
    "label": "Mairie de BELLOY-EN-FRANCE",
    "address": "\u00cele-de-France - BELLOY-EN-FRANCE",
    "city": "BELLOY-EN-FRANCE",
    "postal_code": "56",
    "latitude": 49.089385,
    "longitude": 2.37070598,
    "id": 633
  },
  {
    "label": "Mairie de VAUREAL",
    "address": "\u00cele-de-France - VAUREAL",
    "city": "VAUREAL",
    "postal_code": "637",
    "latitude": 49.02966394,
    "longitude": 2.02082445,
    "id": 634
  },
  {
    "label": "Mairie de ARVILLE",
    "address": "\u00cele-de-France - ARVILLE",
    "city": "ARVILLE",
    "postal_code": "9",
    "latitude": 48.18851788,
    "longitude": 2.5476320599999998,
    "id": 635
  },
  {
    "label": "Mairie de NOYEN-SUR-SEINE",
    "address": "\u00cele-de-France - NOYEN-SUR-SEINE",
    "city": "NOYEN-SUR-SEINE",
    "postal_code": "341",
    "latitude": 48.45230557,
    "longitude": 3.34879529,
    "id": 636
  },
  {
    "label": "Mairie de SAINT-DENIS-LES-REBAIS",
    "address": "\u00cele-de-France - SAINT-DENIS-LES-REBAIS",
    "city": "SAINT-DENIS-LES-REBAIS",
    "postal_code": "406",
    "latitude": 48.83545992,
    "longitude": 3.21057807,
    "id": 637
  },
  {
    "label": "Mairie de LAINVILLE-EN-VEXIN",
    "address": "\u00cele-de-France - LAINVILLE-EN-VEXIN",
    "city": "LAINVILLE-EN-VEXIN",
    "postal_code": "329",
    "latitude": 49.05950324,
    "longitude": 1.8169020900000001,
    "id": 638
  },
  {
    "label": "Mairie de MARLY-LE-ROI",
    "address": "\u00cele-de-France - MARLY-LE-ROI",
    "city": "MARLY-LE-ROI",
    "postal_code": "372",
    "latitude": 48.86717439,
    "longitude": 2.09401781,
    "id": 639
  },
  {
    "label": "Mairie de OSMOY",
    "address": "\u00cele-de-France - OSMOY",
    "city": "OSMOY",
    "postal_code": "475",
    "latitude": 48.86310315,
    "longitude": 1.71534454,
    "id": 640
  },
  {
    "label": "Mairie de BUNO-BONNEVAUX",
    "address": "\u00cele-de-France - BUNO-BONNEVAUX",
    "city": "BUNO-BONNEVAUX",
    "postal_code": "121",
    "latitude": 48.36132628,
    "longitude": 2.38777952,
    "id": 641
  },
  {
    "label": "Mairie de GUIGNEVILLE-SUR-ESSONNE",
    "address": "\u00cele-de-France - GUIGNEVILLE-SUR-ESSONNE",
    "city": "GUIGNEVILLE-SUR-ESSONNE",
    "postal_code": "293",
    "latitude": 48.46742259,
    "longitude": 2.35273353,
    "id": 642
  },
  {
    "label": "Mairie de LISSES",
    "address": "\u00cele-de-France - LISSES",
    "city": "LISSES",
    "postal_code": "340",
    "latitude": 48.59774027,
    "longitude": 2.42595557,
    "id": 643
  },
  {
    "label": "Mairie de FONTENAY-LE-FLEURY",
    "address": "\u00cele-de-France - FONTENAY-LE-FLEURY",
    "city": "FONTENAY-LE-FLEURY",
    "postal_code": "242",
    "latitude": 48.81404794,
    "longitude": 2.04935701,
    "id": 644
  },
  {
    "label": "Mairie de LES ALLUETS-LE-ROI",
    "address": "\u00cele-de-France - LES ALLUETS-LE-ROI",
    "city": "LES ALLUETS-LE-ROI",
    "postal_code": "10",
    "latitude": 48.91432218,
    "longitude": 1.9192633300000002,
    "id": 645
  },
  {
    "label": "Mairie de MONTFORT-L'AMAURY",
    "address": "\u00cele-de-France - MONTFORT-L'AMAURY",
    "city": "MONTFORT-L'AMAURY",
    "postal_code": "420",
    "latitude": 48.7772708,
    "longitude": 1.80884989,
    "id": 646
  },
  {
    "label": "Mairie de FLEURY-MEROGIS",
    "address": "\u00cele-de-France - FLEURY-MEROGIS",
    "city": "FLEURY-MEROGIS",
    "postal_code": "235",
    "latitude": 48.62923304,
    "longitude": 2.36091801,
    "id": 647
  },
  {
    "label": "Mairie de GOMETZ-LA-VILLE",
    "address": "\u00cele-de-France - GOMETZ-LA-VILLE",
    "city": "GOMETZ-LA-VILLE",
    "postal_code": "274",
    "latitude": 48.67129777,
    "longitude": 2.12750511,
    "id": 648
  },
  {
    "label": "Mairie de LES ULIS",
    "address": "\u00cele-de-France - LES ULIS",
    "city": "LES ULIS",
    "postal_code": "692",
    "latitude": 48.68214916,
    "longitude": 2.16818483,
    "id": 649
  },
  {
    "label": "Mairie de LEUDEVILLE",
    "address": "\u00cele-de-France - LEUDEVILLE",
    "city": "LEUDEVILLE",
    "postal_code": "332",
    "latitude": 48.56541131,
    "longitude": 2.32567448,
    "id": 650
  },
  {
    "label": "Mairie de RIS-ORANGIS",
    "address": "\u00cele-de-France - RIS-ORANGIS",
    "city": "RIS-ORANGIS",
    "postal_code": "521",
    "latitude": 48.65078502,
    "longitude": 2.41247964,
    "id": 651
  },
  {
    "label": "Mairie de LES PAVILLONS-SOUS-BOIS",
    "address": "\u00cele-de-France - LES PAVILLONS-SOUS-BOIS",
    "city": "LES PAVILLONS-SOUS-BOIS",
    "postal_code": "57",
    "latitude": 48.90594109,
    "longitude": 2.5110083100000002,
    "id": 652
  },
  {
    "label": "Mairie de CHARTRONGES",
    "address": "\u00cele-de-France - CHARTRONGES",
    "city": "CHARTRONGES",
    "postal_code": "97",
    "latitude": 48.74693018,
    "longitude": 3.26889645,
    "id": 653
  },
  {
    "label": "Mairie de ECUELLES",
    "address": "\u00cele-de-France - ECUELLES",
    "city": "ECUELLES",
    "postal_code": "166",
    "latitude": 48.35405227,
    "longitude": 2.82078587,
    "id": 654
  },
  {
    "label": "Mairie de MONTCEAUX-LES-PROVINS",
    "address": "\u00cele-de-France - MONTCEAUX-LES-PROVINS",
    "city": "MONTCEAUX-LES-PROVINS",
    "postal_code": "301",
    "latitude": 48.69424818,
    "longitude": 3.43768736,
    "id": 655
  },
  {
    "label": "Mairie de NANGIS",
    "address": "\u00cele-de-France - NANGIS",
    "city": "NANGIS",
    "postal_code": "327",
    "latitude": 48.55448292,
    "longitude": 3.01493394,
    "id": 656
  },
  {
    "label": "Mairie de POINCY",
    "address": "\u00cele-de-France - POINCY",
    "city": "POINCY",
    "postal_code": "369",
    "latitude": 48.96927273,
    "longitude": 2.935734,
    "id": 657
  },
  {
    "label": "Mairie de SAINT-JEAN-LES-DEUX-JUMEAUX",
    "address": "\u00cele-de-France - SAINT-JEAN-LES-DEUX-JUMEAUX",
    "city": "SAINT-JEAN-LES-DEUX-JUMEAUX",
    "postal_code": "415",
    "latitude": 48.95176006,
    "longitude": 3.01740507,
    "id": 658
  },
  {
    "label": "Mairie de VINCY-MANOEUVRE",
    "address": "\u00cele-de-France - VINCY-MANOEUVRE",
    "city": "VINCY-MANOEUVRE",
    "postal_code": "526",
    "latitude": 49.07876773,
    "longitude": 2.96299346,
    "id": 659
  },
  {
    "label": "Mairie de BOINVILLE-LE-GAILLARD",
    "address": "\u00cele-de-France - BOINVILLE-LE-GAILLARD",
    "city": "BOINVILLE-LE-GAILLARD",
    "postal_code": "71",
    "latitude": 48.4925763,
    "longitude": 1.87124173,
    "id": 660
  },
  {
    "label": "Mairie de DAMPIERRE-EN-YVELINES",
    "address": "\u00cele-de-France - DAMPIERRE-EN-YVELINES",
    "city": "DAMPIERRE-EN-YVELINES",
    "postal_code": "193",
    "latitude": 48.70421388,
    "longitude": 1.9834213200000002,
    "id": 661
  },
  {
    "label": "Mairie de SAULX-MARCHAIS",
    "address": "\u00cele-de-France - SAULX-MARCHAIS",
    "city": "SAULX-MARCHAIS",
    "postal_code": "588",
    "latitude": 48.84030169,
    "longitude": 1.83544017,
    "id": 662
  },
  {
    "label": "Mairie de CORBREUSE",
    "address": "\u00cele-de-France - CORBREUSE",
    "city": "CORBREUSE",
    "postal_code": "175",
    "latitude": 48.49918724,
    "longitude": 1.96046154,
    "id": 663
  },
  {
    "label": "Mairie de MONTLHERY",
    "address": "\u00cele-de-France - MONTLHERY",
    "city": "MONTLHERY",
    "postal_code": "425",
    "latitude": 48.63820686,
    "longitude": 2.27276262,
    "id": 664
  },
  {
    "label": "Mairie de VILLENEUVE-SUR-AUVERS",
    "address": "\u00cele-de-France - VILLENEUVE-SUR-AUVERS",
    "city": "VILLENEUVE-SUR-AUVERS",
    "postal_code": "671",
    "latitude": 48.47548141,
    "longitude": 2.24862605,
    "id": 665
  },
  {
    "label": "Mairie de ABLEIGES",
    "address": "\u00cele-de-France - ABLEIGES",
    "city": "ABLEIGES",
    "postal_code": "2",
    "latitude": 49.09065587,
    "longitude": 1.98077284,
    "id": 666
  },
  {
    "label": "Mairie de GARGES-LES-GONESSE",
    "address": "\u00cele-de-France - GARGES-LES-GONESSE",
    "city": "GARGES-LES-GONESSE",
    "postal_code": "268",
    "latitude": 48.97165467,
    "longitude": 2.40066072,
    "id": 667
  },
  {
    "label": "Mairie de NEUVILLE-SUR-OISE",
    "address": "\u00cele-de-France - NEUVILLE-SUR-OISE",
    "city": "NEUVILLE-SUR-OISE",
    "postal_code": "450",
    "latitude": 49.01448269,
    "longitude": 2.05917037,
    "id": 668
  },
  {
    "label": "Mairie de CESSON",
    "address": "\u00cele-de-France - CESSON",
    "city": "CESSON",
    "postal_code": "67",
    "latitude": 48.56601795,
    "longitude": 2.6006226,
    "id": 669
  },
  {
    "label": "Mairie de ISLES-LES-MELDEUSES",
    "address": "\u00cele-de-France - ISLES-LES-MELDEUSES",
    "city": "ISLES-LES-MELDEUSES",
    "postal_code": "231",
    "latitude": 48.99945639,
    "longitude": 3.00573996,
    "id": 670
  },
  {
    "label": "Mairie de JAULNES",
    "address": "\u00cele-de-France - JAULNES",
    "city": "JAULNES",
    "postal_code": "236",
    "latitude": 48.41786973,
    "longitude": 3.27249079,
    "id": 671
  },
  {
    "label": "Mairie de REBAIS",
    "address": "\u00cele-de-France - REBAIS",
    "city": "REBAIS",
    "postal_code": "385",
    "latitude": 48.8469812,
    "longitude": 3.23256155,
    "id": 672
  },
  {
    "label": "Mairie de SABLONNIERES",
    "address": "\u00cele-de-France - SABLONNIERES",
    "city": "SABLONNIERES",
    "postal_code": "398",
    "latitude": 48.87525136,
    "longitude": 3.29572913,
    "id": 673
  },
  {
    "label": "Mairie de SAINT-MARTIN-DU-BOSCHET",
    "address": "\u00cele-de-France - SAINT-MARTIN-DU-BOSCHET",
    "city": "SAINT-MARTIN-DU-BOSCHET",
    "postal_code": "424",
    "latitude": 48.7356912,
    "longitude": 3.4276928,
    "id": 674
  },
  {
    "label": "Mairie de BONDY",
    "address": "\u00cele-de-France - BONDY",
    "city": "BONDY",
    "postal_code": "10",
    "latitude": 48.90238288,
    "longitude": 2.48373205,
    "id": 675
  },
  {
    "label": "Mairie de COUBERT",
    "address": "\u00cele-de-France - COUBERT",
    "city": "COUBERT",
    "postal_code": "127",
    "latitude": 48.67093628,
    "longitude": 2.69751196,
    "id": 676
  },
  {
    "label": "Mairie de MONTEREAU-FAULT-YONNE",
    "address": "\u00cele-de-France - MONTEREAU-FAULT-YONNE",
    "city": "MONTEREAU-FAULT-YONNE",
    "postal_code": "305",
    "latitude": 48.38313245,
    "longitude": 2.94792849,
    "id": 677
  },
  {
    "label": "Mairie de REUIL-EN-BRIE",
    "address": "\u00cele-de-France - REUIL-EN-BRIE",
    "city": "REUIL-EN-BRIE",
    "postal_code": "388",
    "latitude": 48.96083573,
    "longitude": 3.14718173,
    "id": 678
  },
  {
    "label": "Mairie de SAINT-GERMAIN-SUR-ECOLE",
    "address": "\u00cele-de-France - SAINT-GERMAIN-SUR-ECOLE",
    "city": "SAINT-GERMAIN-SUR-ECOLE",
    "postal_code": "412",
    "latitude": 48.47449002,
    "longitude": 2.5095736,
    "id": 679
  },
  {
    "label": "Mairie de VAIRES-SUR-MARNE",
    "address": "\u00cele-de-France - VAIRES-SUR-MARNE",
    "city": "VAIRES-SUR-MARNE",
    "postal_code": "479",
    "latitude": 48.87423398,
    "longitude": 2.63761265,
    "id": 680
  },
  {
    "label": "Mairie de VILLEPARISIS",
    "address": "\u00cele-de-France - VILLEPARISIS",
    "city": "VILLEPARISIS",
    "postal_code": "514",
    "latitude": 48.94261004,
    "longitude": 2.6066308400000002,
    "id": 681
  },
  {
    "label": "Mairie de VILLIERS-SUR-MORIN",
    "address": "\u00cele-de-France - VILLIERS-SUR-MORIN",
    "city": "VILLIERS-SUR-MORIN",
    "postal_code": "521",
    "latitude": 48.86079386,
    "longitude": 2.8799958,
    "id": 682
  },
  {
    "label": "Mairie de VOULANGIS",
    "address": "\u00cele-de-France - VOULANGIS",
    "city": "VOULANGIS",
    "postal_code": "529",
    "latitude": 48.85173105,
    "longitude": 2.89624396,
    "id": 683
  },
  {
    "label": "Mairie de BAILLY",
    "address": "\u00cele-de-France - BAILLY",
    "city": "BAILLY",
    "postal_code": "43",
    "latitude": 48.84107643,
    "longitude": 2.07780085,
    "id": 684
  },
  {
    "label": "Mairie de LE TARTRE-GAUDRAN",
    "address": "\u00cele-de-France - LE TARTRE-GAUDRAN",
    "city": "LE TARTRE-GAUDRAN",
    "postal_code": "606",
    "latitude": 48.69882623,
    "longitude": 1.59509459,
    "id": 685
  },
  {
    "label": "Mairie de PRUNAY-LE-TEMPLE",
    "address": "\u00cele-de-France - PRUNAY-LE-TEMPLE",
    "city": "PRUNAY-LE-TEMPLE",
    "postal_code": "505",
    "latitude": 48.86107781,
    "longitude": 1.67314146,
    "id": 686
  },
  {
    "label": "Mairie de DOURDAN",
    "address": "\u00cele-de-France - DOURDAN",
    "city": "DOURDAN",
    "postal_code": "200",
    "latitude": 48.52900207,
    "longitude": 2.01032495,
    "id": 687
  },
  {
    "label": "Mairie de VAUCRESSON",
    "address": "\u00cele-de-France - VAUCRESSON",
    "city": "VAUCRESSON",
    "postal_code": "76",
    "latitude": 48.8421148,
    "longitude": 2.15268559,
    "id": 688
  },
  {
    "label": "Mairie de CHENNEVIERES-SUR-MARNE",
    "address": "\u00cele-de-France - CHENNEVIERES-SUR-MARNE",
    "city": "CHENNEVIERES-SUR-MARNE",
    "postal_code": "19",
    "latitude": 48.79805582,
    "longitude": 2.53377541,
    "id": 689
  },
  {
    "label": "Mairie de L'ISLE-ADAM",
    "address": "\u00cele-de-France - L'ISLE-ADAM",
    "city": "L'ISLE-ADAM",
    "postal_code": "313",
    "latitude": 49.11090043,
    "longitude": 2.22289793,
    "id": 690
  },
  {
    "label": "Mairie de MONTMORENCY",
    "address": "\u00cele-de-France - MONTMORENCY",
    "city": "MONTMORENCY",
    "postal_code": "428",
    "latitude": 48.98964347,
    "longitude": 2.3214829999999997,
    "id": 691
  },
  {
    "label": "Mairie de THEUVILLE",
    "address": "\u00cele-de-France - THEUVILLE",
    "city": "THEUVILLE",
    "postal_code": "611",
    "latitude": 49.15379121,
    "longitude": 2.07211766,
    "id": 692
  },
  {
    "label": "Mairie de CHAMPDEUIL",
    "address": "\u00cele-de-France - CHAMPDEUIL",
    "city": "CHAMPDEUIL",
    "postal_code": "81",
    "latitude": 48.62049117,
    "longitude": 2.73105954,
    "id": 693
  },
  {
    "label": "Mairie de CLICHY-SOUS-BOIS",
    "address": "\u00cele-de-France - CLICHY-SOUS-BOIS",
    "city": "CLICHY-SOUS-BOIS",
    "postal_code": "14",
    "latitude": 48.90947658,
    "longitude": 2.54783208,
    "id": 694
  },
  {
    "label": "Mairie de ABLON-SUR-SEINE",
    "address": "\u00cele-de-France - ABLON-SUR-SEINE",
    "city": "ABLON-SUR-SEINE",
    "postal_code": "1",
    "latitude": 48.72538509,
    "longitude": 2.420739,
    "id": 695
  },
  {
    "label": "Mairie de FROUVILLE",
    "address": "\u00cele-de-France - FROUVILLE",
    "city": "FROUVILLE",
    "postal_code": "258",
    "latitude": 49.14944598,
    "longitude": 2.15021581,
    "id": 696
  },
  {
    "label": "Mairie de GOUZANGREZ",
    "address": "\u00cele-de-France - GOUZANGREZ",
    "city": "GOUZANGREZ",
    "postal_code": "282",
    "latitude": 49.11287655,
    "longitude": 1.90670458,
    "id": 697
  },
  {
    "label": "Mairie de BAZEMONT",
    "address": "\u00cele-de-France - BAZEMONT",
    "city": "BAZEMONT",
    "postal_code": "49",
    "latitude": 48.92759873,
    "longitude": 1.8646002099999999,
    "id": 698
  },
  {
    "label": "Mairie de LA CELLE-LES-BORDES",
    "address": "\u00cele-de-France - LA CELLE-LES-BORDES",
    "city": "LA CELLE-LES-BORDES",
    "postal_code": "125",
    "latitude": 48.63670635,
    "longitude": 1.95404181,
    "id": 699
  },
  {
    "label": "Mairie de MAREIL-LE-GUYON",
    "address": "\u00cele-de-France - MAREIL-LE-GUYON",
    "city": "MAREIL-LE-GUYON",
    "postal_code": "366",
    "latitude": 48.79001678,
    "longitude": 1.84680839,
    "id": 700
  },
  {
    "label": "Mairie de MOISSON",
    "address": "\u00cele-de-France - MOISSON",
    "city": "MOISSON",
    "postal_code": "410",
    "latitude": 49.07402965,
    "longitude": 1.66629947,
    "id": 701
  },
  {
    "label": "Mairie de VILLIERS-SAINT-FREDERIC",
    "address": "\u00cele-de-France - VILLIERS-SAINT-FREDERIC",
    "city": "VILLIERS-SAINT-FREDERIC",
    "postal_code": "683",
    "latitude": 48.82074632,
    "longitude": 1.8900730000000001,
    "id": 702
  },
  {
    "label": "Mairie de COURCOURONNES",
    "address": "\u00cele-de-France - COURCOURONNES",
    "city": "COURCOURONNES",
    "postal_code": "182",
    "latitude": 48.61842801,
    "longitude": 2.40700979,
    "id": 703
  },
  {
    "label": "Mairie de SACLAY",
    "address": "\u00cele-de-France - SACLAY",
    "city": "SACLAY",
    "postal_code": "534",
    "latitude": 48.73069454,
    "longitude": 2.17346185,
    "id": 704
  },
  {
    "label": "Mairie de GIREMOUTIERS",
    "address": "\u00cele-de-France - GIREMOUTIERS",
    "city": "GIREMOUTIERS",
    "postal_code": "206",
    "latitude": 48.84294144,
    "longitude": 3.02959534,
    "id": 705
  },
  {
    "label": "Mairie de LA BROSSE-MONTCEAUX",
    "address": "\u00cele-de-France - LA BROSSE-MONTCEAUX",
    "city": "LA BROSSE-MONTCEAUX",
    "postal_code": "54",
    "latitude": 48.3449811,
    "longitude": 3.01896777,
    "id": 706
  },
  {
    "label": "Mairie de MONS-EN-MONTOIS",
    "address": "\u00cele-de-France - MONS-EN-MONTOIS",
    "city": "MONS-EN-MONTOIS",
    "postal_code": "298",
    "latitude": 48.48892643,
    "longitude": 3.14662706,
    "id": 707
  },
  {
    "label": "Mairie de MONTRY",
    "address": "\u00cele-de-France - MONTRY",
    "city": "MONTRY",
    "postal_code": "315",
    "latitude": 48.88708673,
    "longitude": 2.82712033,
    "id": 708
  },
  {
    "label": "Mairie de NANTEAU-SUR-LUNAIN",
    "address": "\u00cele-de-France - NANTEAU-SUR-LUNAIN",
    "city": "NANTEAU-SUR-LUNAIN",
    "postal_code": "329",
    "latitude": 48.25698389,
    "longitude": 2.81181274,
    "id": 709
  },
  {
    "label": "Mairie de PROVINS",
    "address": "\u00cele-de-France - PROVINS",
    "city": "PROVINS",
    "postal_code": "379",
    "latitude": 48.55880598,
    "longitude": 3.29939515,
    "id": 710
  },
  {
    "label": "Mairie de LA ROCHE-GUYON",
    "address": "\u00cele-de-France - LA ROCHE-GUYON",
    "city": "LA ROCHE-GUYON",
    "postal_code": "523",
    "latitude": 49.08190369,
    "longitude": 1.62926098,
    "id": 711
  },
  {
    "label": "Mairie de VILLIERS-LE-BEL",
    "address": "\u00cele-de-France - VILLIERS-LE-BEL",
    "city": "VILLIERS-LE-BEL",
    "postal_code": "680",
    "latitude": 49.00850434,
    "longitude": 2.38977781,
    "id": 712
  },
  {
    "label": "Mairie de CERNEUX",
    "address": "\u00cele-de-France - CERNEUX",
    "city": "CERNEUX",
    "postal_code": "66",
    "latitude": 48.69328197,
    "longitude": 3.34397478,
    "id": 713
  },
  {
    "label": "Mairie de CHARTRETTES",
    "address": "\u00cele-de-France - CHARTRETTES",
    "city": "CHARTRETTES",
    "postal_code": "96",
    "latitude": 48.48753486,
    "longitude": 2.70300928,
    "id": 714
  },
  {
    "label": "Mairie de ECHOUBOULAINS",
    "address": "\u00cele-de-France - ECHOUBOULAINS",
    "city": "ECHOUBOULAINS",
    "postal_code": "164",
    "latitude": 48.46405691,
    "longitude": 2.94617026,
    "id": 715
  },
  {
    "label": "Mairie de LA FERTE-SOUS-JOUARRE",
    "address": "\u00cele-de-France - LA FERTE-SOUS-JOUARRE",
    "city": "LA FERTE-SOUS-JOUARRE",
    "postal_code": "183",
    "latitude": 48.94927268,
    "longitude": 3.12926206,
    "id": 716
  },
  {
    "label": "Mairie de MONTDAUPHIN",
    "address": "\u00cele-de-France - MONTDAUPHIN",
    "city": "MONTDAUPHIN",
    "postal_code": "303",
    "latitude": 48.85163624,
    "longitude": 3.42876832,
    "id": 717
  },
  {
    "label": "Mairie de MOUY-SUR-SEINE",
    "address": "\u00cele-de-France - MOUY-SUR-SEINE",
    "city": "MOUY-SUR-SEINE",
    "postal_code": "325",
    "latitude": 48.42083957,
    "longitude": 3.2374242300000002,
    "id": 718
  },
  {
    "label": "Mairie de CARRIERES-SOUS-POISSY",
    "address": "\u00cele-de-France - CARRIERES-SOUS-POISSY",
    "city": "CARRIERES-SOUS-POISSY",
    "postal_code": "123",
    "latitude": 48.94793361,
    "longitude": 2.03906153,
    "id": 719
  },
  {
    "label": "Mairie de COURGENT",
    "address": "\u00cele-de-France - COURGENT",
    "city": "COURGENT",
    "postal_code": "185",
    "latitude": 48.89245542,
    "longitude": 1.65910936,
    "id": 720
  },
  {
    "label": "Mairie de LOUVECIENNES",
    "address": "\u00cele-de-France - LOUVECIENNES",
    "city": "LOUVECIENNES",
    "postal_code": "350",
    "latitude": 48.86002702,
    "longitude": 2.11584502,
    "id": 721
  },
  {
    "label": "Mairie de ORGEVAL",
    "address": "\u00cele-de-France - ORGEVAL",
    "city": "ORGEVAL",
    "postal_code": "466",
    "latitude": 48.92079585,
    "longitude": 1.97512339,
    "id": 722
  },
  {
    "label": "Mairie de SAINT-ARNOULT-EN-YVELINES",
    "address": "\u00cele-de-France - SAINT-ARNOULT-EN-YVELINES",
    "city": "SAINT-ARNOULT-EN-YVELINES",
    "postal_code": "537",
    "latitude": 48.57194045,
    "longitude": 1.94097171,
    "id": 723
  },
  {
    "label": "Mairie de LA NORVILLE",
    "address": "\u00cele-de-France - LA NORVILLE",
    "city": "LA NORVILLE",
    "postal_code": "457",
    "latitude": 48.58516284,
    "longitude": 2.25927902,
    "id": 724
  },
  {
    "label": "Mairie de MOISSELLES",
    "address": "\u00cele-de-France - MOISSELLES",
    "city": "MOISSELLES",
    "postal_code": "409",
    "latitude": 49.04985208,
    "longitude": 2.33650277,
    "id": 725
  },
  {
    "label": "Mairie de BOULANCOURT",
    "address": "\u00cele-de-France - BOULANCOURT",
    "city": "BOULANCOURT",
    "postal_code": "46",
    "latitude": 48.25879704,
    "longitude": 2.43750109,
    "id": 726
  },
  {
    "label": "Mairie de CONCHES-SUR-GONDOIRE",
    "address": "\u00cele-de-France - CONCHES-SUR-GONDOIRE",
    "city": "CONCHES-SUR-GONDOIRE",
    "postal_code": "124",
    "latitude": 48.85513097,
    "longitude": 2.7178591,
    "id": 727
  },
  {
    "label": "Mairie de DARVAULT",
    "address": "\u00cele-de-France - DARVAULT",
    "city": "DARVAULT",
    "postal_code": "156",
    "latitude": 48.27075957,
    "longitude": 2.7338217,
    "id": 728
  },
  {
    "label": "Mairie de LA CHAPELLE-GAUTHIER",
    "address": "\u00cele-de-France - LA CHAPELLE-GAUTHIER",
    "city": "LA CHAPELLE-GAUTHIER",
    "postal_code": "86",
    "latitude": 48.54969222,
    "longitude": 2.89977824,
    "id": 729
  },
  {
    "label": "Mairie de SAMMERON",
    "address": "\u00cele-de-France - SAMMERON",
    "city": "SAMMERON",
    "postal_code": "440",
    "latitude": 48.9477828,
    "longitude": 3.08148267,
    "id": 730
  },
  {
    "label": "Mairie de GOUSSONVILLE",
    "address": "\u00cele-de-France - GOUSSONVILLE",
    "city": "GOUSSONVILLE",
    "postal_code": "281",
    "latitude": 48.9199733,
    "longitude": 1.7651192199999999,
    "id": 731
  },
  {
    "label": "Mairie de BIEVRES",
    "address": "\u00cele-de-France - BIEVRES",
    "city": "BIEVRES",
    "postal_code": "64",
    "latitude": 48.75501337,
    "longitude": 2.21552505,
    "id": 732
  },
  {
    "label": "Mairie de VALPUISEAUX",
    "address": "\u00cele-de-France - VALPUISEAUX",
    "city": "VALPUISEAUX",
    "postal_code": "629",
    "latitude": 48.39369862,
    "longitude": 2.30411304,
    "id": 733
  },
  {
    "label": "Mairie de THEMERICOURT",
    "address": "\u00cele-de-France - THEMERICOURT",
    "city": "THEMERICOURT",
    "postal_code": "610",
    "latitude": 49.08677892,
    "longitude": 1.89597742,
    "id": 734
  },
  {
    "label": "Mairie de GUYANCOURT",
    "address": "\u00cele-de-France - GUYANCOURT",
    "city": "GUYANCOURT",
    "postal_code": "297",
    "latitude": 48.77096001,
    "longitude": 2.07271193,
    "id": 735
  },
  {
    "label": "Mairie de VIDELLES",
    "address": "\u00cele-de-France - VIDELLES",
    "city": "VIDELLES",
    "postal_code": "654",
    "latitude": 48.46468929,
    "longitude": 2.43113696,
    "id": 736
  },
  {
    "label": "Mairie de GROSLAY",
    "address": "\u00cele-de-France - GROSLAY",
    "city": "GROSLAY",
    "postal_code": "288",
    "latitude": 48.98694835,
    "longitude": 2.34469634,
    "id": 737
  },
  {
    "label": "Mairie de LE MESNIL-AUBRY",
    "address": "\u00cele-de-France - LE MESNIL-AUBRY",
    "city": "LE MESNIL-AUBRY",
    "postal_code": "395",
    "latitude": 49.05163384,
    "longitude": 2.39802457,
    "id": 738
  },
  {
    "label": "Mairie de CHARMENTRAY",
    "address": "\u00cele-de-France - CHARMENTRAY",
    "city": "CHARMENTRAY",
    "postal_code": "94",
    "latitude": 48.94570286,
    "longitude": 2.77582859,
    "id": 739
  },
  {
    "label": "Mairie de ETREPILLY",
    "address": "\u00cele-de-France - ETREPILLY",
    "city": "ETREPILLY",
    "postal_code": "173",
    "latitude": 49.03579699,
    "longitude": 2.93103733,
    "id": 740
  },
  {
    "label": "Mairie de GOUAIX",
    "address": "\u00cele-de-France - GOUAIX",
    "city": "GOUAIX",
    "postal_code": "208",
    "latitude": 48.48333086,
    "longitude": 3.29394814,
    "id": 741
  },
  {
    "label": "Mairie de GURCY-LE-CHATEL",
    "address": "\u00cele-de-France - GURCY-LE-CHATEL",
    "city": "GURCY-LE-CHATEL",
    "postal_code": "223",
    "latitude": 48.47044068,
    "longitude": 3.08685225,
    "id": 742
  },
  {
    "label": "Mairie de LARCHANT",
    "address": "\u00cele-de-France - LARCHANT",
    "city": "LARCHANT",
    "postal_code": "244",
    "latitude": 48.28462886,
    "longitude": 2.59651537,
    "id": 743
  },
  {
    "label": "Mairie de VILLENEUVE-LE-ROI",
    "address": "\u00cele-de-France - VILLENEUVE-LE-ROI",
    "city": "VILLENEUVE-LE-ROI",
    "postal_code": "77",
    "latitude": 48.73437973,
    "longitude": 2.41124179,
    "id": 744
  },
  {
    "label": "Mairie de BOISSY-MAUVOISIN",
    "address": "\u00cele-de-France - BOISSY-MAUVOISIN",
    "city": "BOISSY-MAUVOISIN",
    "postal_code": "82",
    "latitude": 48.96296407,
    "longitude": 1.57765835,
    "id": 745
  },
  {
    "label": "Mairie de CROISSY-SUR-SEINE",
    "address": "\u00cele-de-France - CROISSY-SUR-SEINE",
    "city": "CROISSY-SUR-SEINE",
    "postal_code": "190",
    "latitude": 48.87804694,
    "longitude": 2.14165705,
    "id": 746
  },
  {
    "label": "Mairie de MANTES-LA-JOLIE",
    "address": "\u00cele-de-France - MANTES-LA-JOLIE",
    "city": "MANTES-LA-JOLIE",
    "postal_code": "361",
    "latitude": 48.9907275,
    "longitude": 1.71654126,
    "id": 747
  },
  {
    "label": "Mairie de SAINT-FORGET",
    "address": "\u00cele-de-France - SAINT-FORGET",
    "city": "SAINT-FORGET",
    "postal_code": "548",
    "latitude": 48.70784504,
    "longitude": 1.99561977,
    "id": 748
  },
  {
    "label": "Mairie de SENLISSE",
    "address": "\u00cele-de-France - SENLISSE",
    "city": "SENLISSE",
    "postal_code": "590",
    "latitude": 48.68713172,
    "longitude": 1.98217988,
    "id": 749
  },
  {
    "label": "Mairie de GIF-SUR-YVETTE",
    "address": "\u00cele-de-France - GIF-SUR-YVETTE",
    "city": "GIF-SUR-YVETTE",
    "postal_code": "272",
    "latitude": 48.70187081,
    "longitude": 2.13417167,
    "id": 750
  },
  {
    "label": "Mairie de SAINT-GERMAIN-LES-CORBEIL",
    "address": "\u00cele-de-France - SAINT-GERMAIN-LES-CORBEIL",
    "city": "SAINT-GERMAIN-LES-CORBEIL",
    "postal_code": "553",
    "latitude": 48.62014831,
    "longitude": 2.48971777,
    "id": 751
  },
  {
    "label": "Mairie de LONGPERRIER",
    "address": "\u00cele-de-France - LONGPERRIER",
    "city": "LONGPERRIER",
    "postal_code": "259",
    "latitude": 49.05120119,
    "longitude": 2.66461734,
    "id": 752
  },
  {
    "label": "Mairie de OZOUER-LE-VOULGIS",
    "address": "\u00cele-de-France - OZOUER-LE-VOULGIS",
    "city": "OZOUER-LE-VOULGIS",
    "postal_code": "352",
    "latitude": 48.66078873,
    "longitude": 2.77478534,
    "id": 753
  },
  {
    "label": "Mairie de SAINT-LOUP-DE-NAUD",
    "address": "\u00cele-de-France - SAINT-LOUP-DE-NAUD",
    "city": "SAINT-LOUP-DE-NAUD",
    "postal_code": "418",
    "latitude": 48.53332985,
    "longitude": 3.22312014,
    "id": 754
  },
  {
    "label": "Mairie de VILLIERS-SAINT-GEORGES",
    "address": "\u00cele-de-France - VILLIERS-SAINT-GEORGES",
    "city": "VILLIERS-SAINT-GEORGES",
    "postal_code": "519",
    "latitude": 48.64868298,
    "longitude": 3.40687708,
    "id": 755
  },
  {
    "label": "Mairie de BREVAL",
    "address": "\u00cele-de-France - BREVAL",
    "city": "BREVAL",
    "postal_code": "107",
    "latitude": 48.94470568,
    "longitude": 1.53426561,
    "id": 756
  },
  {
    "label": "Mairie de SAINT-MARTIN-DU-TERTRE",
    "address": "\u00cele-de-France - SAINT-MARTIN-DU-TERTRE",
    "city": "SAINT-MARTIN-DU-TERTRE",
    "postal_code": "566",
    "latitude": 49.10646197,
    "longitude": 2.34608218,
    "id": 757
  },
  {
    "label": "Mairie de GOURNAY-SUR-MARNE",
    "address": "\u00cele-de-France - GOURNAY-SUR-MARNE",
    "city": "GOURNAY-SUR-MARNE",
    "postal_code": "33",
    "latitude": 48.85999306,
    "longitude": 2.57623535,
    "id": 758
  },
  {
    "label": "Mairie de LE BLANC-MESNIL",
    "address": "\u00cele-de-France - LE BLANC-MESNIL",
    "city": "LE BLANC-MESNIL",
    "postal_code": "7",
    "latitude": 48.9383569,
    "longitude": 2.46064305,
    "id": 759
  },
  {
    "label": "Mairie de CRETEIL",
    "address": "\u00cele-de-France - CRETEIL",
    "city": "CRETEIL",
    "postal_code": "28",
    "latitude": 48.77748912,
    "longitude": 2.45346123,
    "id": 760
  },
  {
    "label": "Mairie de AUVERS-SUR-OISE",
    "address": "\u00cele-de-France - AUVERS-SUR-OISE",
    "city": "AUVERS-SUR-OISE",
    "postal_code": "39",
    "latitude": 49.07130647,
    "longitude": 2.17374933,
    "id": 761
  },
  {
    "label": "Mairie de VIARMES",
    "address": "\u00cele-de-France - VIARMES",
    "city": "VIARMES",
    "postal_code": "652",
    "latitude": 49.12802266,
    "longitude": 2.37073104,
    "id": 762
  },
  {
    "label": "Mairie de DONNEMARIE-DONTILLY",
    "address": "\u00cele-de-France - DONNEMARIE-DONTILLY",
    "city": "DONNEMARIE-DONTILLY",
    "postal_code": "159",
    "latitude": 48.47824901,
    "longitude": 3.13023507,
    "id": 763
  },
  {
    "label": "Mairie de FERICY",
    "address": "\u00cele-de-France - FERICY",
    "city": "FERICY",
    "postal_code": "179",
    "latitude": 48.46021867,
    "longitude": 2.80149226,
    "id": 764
  },
  {
    "label": "Mairie de MACHAULT",
    "address": "\u00cele-de-France - MACHAULT",
    "city": "MACHAULT",
    "postal_code": "266",
    "latitude": 48.45470414,
    "longitude": 2.8311777,
    "id": 765
  },
  {
    "label": "Mairie de RAMPILLON",
    "address": "\u00cele-de-France - RAMPILLON",
    "city": "RAMPILLON",
    "postal_code": "383",
    "latitude": 48.54968265,
    "longitude": 3.06632561,
    "id": 766
  },
  {
    "label": "Mairie de SAINT-FARGEAU-PONTHIERRY",
    "address": "\u00cele-de-France - SAINT-FARGEAU-PONTHIERRY",
    "city": "SAINT-FARGEAU-PONTHIERRY",
    "postal_code": "407",
    "latitude": 48.53286725,
    "longitude": 2.5449590300000002,
    "id": 767
  },
  {
    "label": "Mairie de CHATEAU-LANDON",
    "address": "\u00cele-de-France - CHATEAU-LANDON",
    "city": "CHATEAU-LANDON",
    "postal_code": "99",
    "latitude": 48.14947929,
    "longitude": 2.70065817,
    "id": 768
  },
  {
    "label": "Mairie de CHESSY",
    "address": "\u00cele-de-France - CHESSY",
    "city": "CHESSY",
    "postal_code": "111",
    "latitude": 48.88014309,
    "longitude": 2.76301008,
    "id": 769
  },
  {
    "label": "Mairie de CUISY",
    "address": "\u00cele-de-France - CUISY",
    "city": "CUISY",
    "postal_code": "150",
    "latitude": 49.01940593,
    "longitude": 2.77235491,
    "id": 770
  },
  {
    "label": "Mairie de VILLECRESNES",
    "address": "\u00cele-de-France - VILLECRESNES",
    "city": "VILLECRESNES",
    "postal_code": "75",
    "latitude": 48.72165699,
    "longitude": 2.53348669,
    "id": 771
  },
  {
    "label": "Mairie de CHAUVRY",
    "address": "\u00cele-de-France - CHAUVRY",
    "city": "CHAUVRY",
    "postal_code": "151",
    "latitude": 49.05432429,
    "longitude": 2.26677434,
    "id": 772
  },
  {
    "label": "Mairie de BASSEVELLE",
    "address": "\u00cele-de-France - BASSEVELLE",
    "city": "BASSEVELLE",
    "postal_code": "24",
    "latitude": 48.9248396,
    "longitude": 3.27618827,
    "id": 773
  },
  {
    "label": "Mairie de BOUTIGNY",
    "address": "\u00cele-de-France - BOUTIGNY",
    "city": "BOUTIGNY",
    "postal_code": "49",
    "latitude": 48.91988086,
    "longitude": 2.92834474,
    "id": 774
  },
  {
    "label": "Mairie de FAVIERES",
    "address": "\u00cele-de-France - FAVIERES",
    "city": "FAVIERES",
    "postal_code": "177",
    "latitude": 48.76415935,
    "longitude": 2.77429614,
    "id": 775
  },
  {
    "label": "Mairie de MONTMACHOUX",
    "address": "\u00cele-de-France - MONTMACHOUX",
    "city": "MONTMACHOUX",
    "postal_code": "313",
    "latitude": 48.31905386,
    "longitude": 2.99301688,
    "id": 776
  },
  {
    "label": "Mairie de CHAUFOUR-LES-BONNIERES",
    "address": "\u00cele-de-France - CHAUFOUR-LES-BONNIERES",
    "city": "CHAUFOUR-LES-BONNIERES",
    "postal_code": "147",
    "latitude": 49.01625288,
    "longitude": 1.4839678,
    "id": 777
  },
  {
    "label": "Mairie de EMANCE",
    "address": "\u00cele-de-France - EMANCE",
    "city": "EMANCE",
    "postal_code": "209",
    "latitude": 48.58992196,
    "longitude": 1.72944392,
    "id": 778
  },
  {
    "label": "Mairie de MEZIERES-SUR-SEINE",
    "address": "\u00cele-de-France - MEZIERES-SUR-SEINE",
    "city": "MEZIERES-SUR-SEINE",
    "postal_code": "402",
    "latitude": 48.95790024,
    "longitude": 1.80427655,
    "id": 779
  },
  {
    "label": "Mairie de VIMPELLES",
    "address": "\u00cele-de-France - VIMPELLES",
    "city": "VIMPELLES",
    "postal_code": "524",
    "latitude": 48.43935262,
    "longitude": 3.16477681,
    "id": 780
  },
  {
    "label": "Mairie de BOURDONNE",
    "address": "\u00cele-de-France - BOURDONNE",
    "city": "BOURDONNE",
    "postal_code": "96",
    "latitude": 48.75586341,
    "longitude": 1.6636107199999999,
    "id": 781
  },
  {
    "label": "Mairie de LES CLAYES-SOUS-BOIS",
    "address": "\u00cele-de-France - LES CLAYES-SOUS-BOIS",
    "city": "LES CLAYES-SOUS-BOIS",
    "postal_code": "165",
    "latitude": 48.8210621,
    "longitude": 1.98398584,
    "id": 782
  },
  {
    "label": "Mairie de SOINDRES",
    "address": "\u00cele-de-France - SOINDRES",
    "city": "SOINDRES",
    "postal_code": "597",
    "latitude": 48.95725092,
    "longitude": 1.67463692,
    "id": 783
  },
  {
    "label": "Mairie de BRETIGNY-SUR-ORGE",
    "address": "\u00cele-de-France - BRETIGNY-SUR-ORGE",
    "city": "BRETIGNY-SUR-ORGE",
    "postal_code": "103",
    "latitude": 48.60945582,
    "longitude": 2.30804253,
    "id": 784
  },
  {
    "label": "Mairie de MESPUITS",
    "address": "\u00cele-de-France - MESPUITS",
    "city": "MESPUITS",
    "postal_code": "399",
    "latitude": 48.35682356,
    "longitude": 2.27176004,
    "id": 785
  },
  {
    "label": "Mairie de ORMOY-LA-RIVIERE",
    "address": "\u00cele-de-France - ORMOY-LA-RIVIERE",
    "city": "ORMOY-LA-RIVIERE",
    "postal_code": "469",
    "latitude": 48.40344243,
    "longitude": 2.14883199,
    "id": 786
  },
  {
    "label": "Mairie de CLICHY",
    "address": "\u00cele-de-France - CLICHY",
    "city": "CLICHY",
    "postal_code": "24",
    "latitude": 48.90336725,
    "longitude": 2.30515039,
    "id": 787
  },
  {
    "label": "Mairie de CHERENCE",
    "address": "\u00cele-de-France - CHERENCE",
    "city": "CHERENCE",
    "postal_code": "157",
    "latitude": 49.08935814,
    "longitude": 1.67567763,
    "id": 788
  },
  {
    "label": "Mairie de EPIAIS-RHUS",
    "address": "\u00cele-de-France - EPIAIS-RHUS",
    "city": "EPIAIS-RHUS",
    "postal_code": "213",
    "latitude": 49.12231822,
    "longitude": 2.06132716,
    "id": 789
  },
  {
    "label": "Mairie de MARLY-LA-VILLE",
    "address": "\u00cele-de-France - MARLY-LA-VILLE",
    "city": "MARLY-LA-VILLE",
    "postal_code": "371",
    "latitude": 49.08119284,
    "longitude": 2.49928661,
    "id": 790
  },
  {
    "label": "Mairie de CHAMPAGNE-SUR-SEINE",
    "address": "\u00cele-de-France - CHAMPAGNE-SUR-SEINE",
    "city": "CHAMPAGNE-SUR-SEINE",
    "postal_code": "79",
    "latitude": 48.3972877,
    "longitude": 2.8009340700000003,
    "id": 791
  },
  {
    "label": "Mairie de CHATENOY",
    "address": "\u00cele-de-France - CHATENOY",
    "city": "CHATENOY",
    "postal_code": "102",
    "latitude": 48.23330988,
    "longitude": 2.62587064,
    "id": 792
  },
  {
    "label": "Mairie de COURQUETAINE",
    "address": "\u00cele-de-France - COURQUETAINE",
    "city": "COURQUETAINE",
    "postal_code": "136",
    "latitude": 48.67796878,
    "longitude": 2.7464253,
    "id": 793
  },
  {
    "label": "Mairie de LE PLESSIS-L'EVEQUE",
    "address": "\u00cele-de-France - LE PLESSIS-L'EVEQUE",
    "city": "LE PLESSIS-L'EVEQUE",
    "postal_code": "366",
    "latitude": 49.0085772,
    "longitude": 2.7845581,
    "id": 794
  },
  {
    "label": "Mairie de MONTIGNY-SUR-LOING",
    "address": "\u00cele-de-France - MONTIGNY-SUR-LOING",
    "city": "MONTIGNY-SUR-LOING",
    "postal_code": "312",
    "latitude": 48.33816391,
    "longitude": 2.7424231,
    "id": 795
  },
  {
    "label": "Mairie de PASSY-SUR-SEINE",
    "address": "\u00cele-de-France - PASSY-SUR-SEINE",
    "city": "PASSY-SUR-SEINE",
    "postal_code": "356",
    "latitude": 48.42534865,
    "longitude": 3.34692311,
    "id": 796
  },
  {
    "label": "Mairie de POMPONNE",
    "address": "\u00cele-de-France - POMPONNE",
    "city": "POMPONNE",
    "postal_code": "372",
    "latitude": 48.88217666,
    "longitude": 2.6908037399999998,
    "id": 797
  },
  {
    "label": "Mairie de SAINT-SAUVEUR-SUR-ECOLE",
    "address": "\u00cele-de-France - SAINT-SAUVEUR-SUR-ECOLE",
    "city": "SAINT-SAUVEUR-SUR-ECOLE",
    "postal_code": "435",
    "latitude": 48.49690355,
    "longitude": 2.5475213,
    "id": 798
  },
  {
    "label": "Mairie de SANTEUIL",
    "address": "\u00cele-de-France - SANTEUIL",
    "city": "SANTEUIL",
    "postal_code": "584",
    "latitude": 49.1256099,
    "longitude": 1.95177961,
    "id": 799
  },
  {
    "label": "Mairie de LE MESNIL-LE-ROI",
    "address": "\u00cele-de-France - LE MESNIL-LE-ROI",
    "city": "LE MESNIL-LE-ROI",
    "postal_code": "396",
    "latitude": 48.92834161,
    "longitude": 2.12237248,
    "id": 800
  },
  {
    "label": "Mairie de SAINT-LEGER-EN-YVELINES",
    "address": "\u00cele-de-France - SAINT-LEGER-EN-YVELINES",
    "city": "SAINT-LEGER-EN-YVELINES",
    "postal_code": "562",
    "latitude": 48.72134411,
    "longitude": 1.76594614,
    "id": 801
  },
  {
    "label": "Mairie de GUIBEVILLE",
    "address": "\u00cele-de-France - GUIBEVILLE",
    "city": "GUIBEVILLE",
    "postal_code": "292",
    "latitude": 48.57078727,
    "longitude": 2.27149143,
    "id": 802
  },
  {
    "label": "Mairie de MAISSE",
    "address": "\u00cele-de-France - MAISSE",
    "city": "MAISSE",
    "postal_code": "359",
    "latitude": 48.39459607,
    "longitude": 2.37566176,
    "id": 803
  },
  {
    "label": "Mairie de SAINTE-GENEVIEVE-DES-BOIS",
    "address": "\u00cele-de-France - SAINTE-GENEVIEVE-DES-BOIS",
    "city": "SAINTE-GENEVIEVE-DES-BOIS",
    "postal_code": "549",
    "latitude": 48.63822429,
    "longitude": 2.3324398,
    "id": 804
  },
  {
    "label": "Mairie de BONNEUIL-EN-FRANCE",
    "address": "\u00cele-de-France - BONNEUIL-EN-FRANCE",
    "city": "BONNEUIL-EN-FRANCE",
    "postal_code": "88",
    "latitude": 48.97432983,
    "longitude": 2.43206152,
    "id": 805
  },
  {
    "label": "Mairie de BRANSLES",
    "address": "\u00cele-de-France - BRANSLES",
    "city": "BRANSLES",
    "postal_code": "50",
    "latitude": 48.15168418,
    "longitude": 2.83505056,
    "id": 806
  },
  {
    "label": "Mairie de CHATEAUBLEAU",
    "address": "\u00cele-de-France - CHATEAUBLEAU",
    "city": "CHATEAUBLEAU",
    "postal_code": "98",
    "latitude": 48.58807815,
    "longitude": 3.10751418,
    "id": 807
  },
  {
    "label": "Mairie de FONTENAILLES",
    "address": "\u00cele-de-France - FONTENAILLES",
    "city": "FONTENAILLES",
    "postal_code": "191",
    "latitude": 48.55303226,
    "longitude": 2.95127094,
    "id": 808
  },
  {
    "label": "Mairie de USSY-SUR-MARNE",
    "address": "\u00cele-de-France - USSY-SUR-MARNE",
    "city": "USSY-SUR-MARNE",
    "postal_code": "478",
    "latitude": 48.95502264,
    "longitude": 3.07339881,
    "id": 809
  },
  {
    "label": "Mairie de VERNEUIL-L'ETANG",
    "address": "\u00cele-de-France - VERNEUIL-L'ETANG",
    "city": "VERNEUIL-L'ETANG",
    "postal_code": "493",
    "latitude": 48.64436822,
    "longitude": 2.83568917,
    "id": 810
  },
  {
    "label": "Mairie de VILLECERF",
    "address": "\u00cele-de-France - VILLECERF",
    "city": "VILLECERF",
    "postal_code": "501",
    "latitude": 48.32786573,
    "longitude": 2.84751017,
    "id": 811
  },
  {
    "label": "Mairie de VILLENAUXE-LA-PETITE",
    "address": "\u00cele-de-France - VILLENAUXE-LA-PETITE",
    "city": "VILLENAUXE-LA-PETITE",
    "postal_code": "507",
    "latitude": 48.40768659,
    "longitude": 3.30877023,
    "id": 812
  },
  {
    "label": "Mairie de GUIGNES",
    "address": "\u00cele-de-France - GUIGNES",
    "city": "GUIGNES",
    "postal_code": "222",
    "latitude": 48.63552768,
    "longitude": 2.7989857,
    "id": 813
  },
  {
    "label": "Mairie de MAISONCELLES-EN-BRIE",
    "address": "\u00cele-de-France - MAISONCELLES-EN-BRIE",
    "city": "MAISONCELLES-EN-BRIE",
    "postal_code": "270",
    "latitude": 48.8629362,
    "longitude": 2.99035772,
    "id": 814
  },
  {
    "label": "Mairie de CHOISEL",
    "address": "\u00cele-de-France - CHOISEL",
    "city": "CHOISEL",
    "postal_code": "162",
    "latitude": 48.68633319,
    "longitude": 2.01748204,
    "id": 815
  },
  {
    "label": "Mairie de LONGVILLIERS",
    "address": "\u00cele-de-France - LONGVILLIERS",
    "city": "LONGVILLIERS",
    "postal_code": "349",
    "latitude": 48.57929292,
    "longitude": 1.99239757,
    "id": 816
  },
  {
    "label": "Mairie de MORAINVILLIERS",
    "address": "\u00cele-de-France - MORAINVILLIERS",
    "city": "MORAINVILLIERS",
    "postal_code": "431",
    "latitude": 48.92876193,
    "longitude": 1.9368778199999999,
    "id": 817
  },
  {
    "label": "Mairie de BOUTERVILLIERS",
    "address": "\u00cele-de-France - BOUTERVILLIERS",
    "city": "BOUTERVILLIERS",
    "postal_code": "98",
    "latitude": 48.45270329,
    "longitude": 2.05540146,
    "id": 818
  },
  {
    "label": "Mairie de JOINVILLE-LE-PONT",
    "address": "\u00cele-de-France - JOINVILLE-LE-PONT",
    "city": "JOINVILLE-LE-PONT",
    "postal_code": "42",
    "latitude": 48.82150936,
    "longitude": 2.47261506,
    "id": 819
  },
  {
    "label": "Mairie de VILLENEUVE-SAINT-GEORGES",
    "address": "\u00cele-de-France - VILLENEUVE-SAINT-GEORGES",
    "city": "VILLENEUVE-SAINT-GEORGES",
    "postal_code": "78",
    "latitude": 48.73255228,
    "longitude": 2.4492845,
    "id": 820
  },
  {
    "label": "Mairie de FREMECOURT",
    "address": "\u00cele-de-France - FREMECOURT",
    "city": "FREMECOURT",
    "postal_code": "254",
    "latitude": 49.12036722,
    "longitude": 2.00110233,
    "id": 821
  },
  {
    "label": "Mairie de VILLIERS-LE-SEC",
    "address": "\u00cele-de-France - VILLIERS-LE-SEC",
    "city": "VILLIERS-LE-SEC",
    "postal_code": "682",
    "latitude": 49.07230523,
    "longitude": 2.3898427,
    "id": 822
  },
  {
    "label": "Mairie de VAUJOURS",
    "address": "\u00cele-de-France - VAUJOURS",
    "city": "VAUJOURS",
    "postal_code": "74",
    "latitude": 48.93369538,
    "longitude": 2.57248334,
    "id": 823
  },
  {
    "label": "Mairie de VILLEJUIF",
    "address": "\u00cele-de-France - VILLEJUIF",
    "city": "VILLEJUIF",
    "postal_code": "76",
    "latitude": 48.79372182,
    "longitude": 2.36099297,
    "id": 824
  },
  {
    "label": "Mairie de LE THILLAY",
    "address": "\u00cele-de-France - LE THILLAY",
    "city": "LE THILLAY",
    "postal_code": "612",
    "latitude": 49.00484721,
    "longitude": 2.47036312,
    "id": 825
  },
  {
    "label": "Mairie de HERMERAY",
    "address": "\u00cele-de-France - HERMERAY",
    "city": "HERMERAY",
    "postal_code": "307",
    "latitude": 48.64993123,
    "longitude": 1.68804413,
    "id": 826
  },
  {
    "label": "Mairie de HOUDAN",
    "address": "\u00cele-de-France - HOUDAN",
    "city": "HOUDAN",
    "postal_code": "310",
    "latitude": 48.79055281,
    "longitude": 1.60194579,
    "id": 827
  },
  {
    "label": "Mairie de SAINT-ILLIERS-LA-VILLE",
    "address": "\u00cele-de-France - SAINT-ILLIERS-LA-VILLE",
    "city": "SAINT-ILLIERS-LA-VILLE",
    "postal_code": "558",
    "latitude": 48.97620308,
    "longitude": 1.54060291,
    "id": 828
  },
  {
    "label": "Mairie de AUTHON-LA-PLAINE",
    "address": "\u00cele-de-France - AUTHON-LA-PLAINE",
    "city": "AUTHON-LA-PLAINE",
    "postal_code": "35",
    "latitude": 48.45062875,
    "longitude": 1.9567571300000002,
    "id": 829
  },
  {
    "label": "Mairie de EVRY",
    "address": "\u00cele-de-France - EVRY",
    "city": "EVRY",
    "postal_code": "228",
    "latitude": 48.62380565,
    "longitude": 2.43006772,
    "id": 830
  },
  {
    "label": "Mairie de GRIGNY",
    "address": "\u00cele-de-France - GRIGNY",
    "city": "GRIGNY",
    "postal_code": "286",
    "latitude": 48.6561913,
    "longitude": 2.38806562,
    "id": 831
  },
  {
    "label": "Mairie de ROINVILLE",
    "address": "\u00cele-de-France - ROINVILLE",
    "city": "ROINVILLE",
    "postal_code": "525",
    "latitude": 48.53089198,
    "longitude": 2.04550468,
    "id": 832
  },
  {
    "label": "Mairie de AUGERS-EN-BRIE",
    "address": "\u00cele-de-France - AUGERS-EN-BRIE",
    "city": "AUGERS-EN-BRIE",
    "postal_code": "12",
    "latitude": 48.68058305,
    "longitude": 3.35730431,
    "id": 833
  },
  {
    "label": "Mairie de BUSSY-SAINT-MARTIN",
    "address": "\u00cele-de-France - BUSSY-SAINT-MARTIN",
    "city": "BUSSY-SAINT-MARTIN",
    "postal_code": "59",
    "latitude": 48.848923740000004,
    "longitude": 2.69057709,
    "id": 834
  },
  {
    "label": "Mairie de GRESSY",
    "address": "\u00cele-de-France - GRESSY",
    "city": "GRESSY",
    "postal_code": "214",
    "latitude": 48.96490697,
    "longitude": 2.67362555,
    "id": 835
  },
  {
    "label": "Mairie de LE PLESSIS-AUX-BOIS",
    "address": "\u00cele-de-France - LE PLESSIS-AUX-BOIS",
    "city": "LE PLESSIS-AUX-BOIS",
    "postal_code": "364",
    "latitude": 49.00324574,
    "longitude": 2.76812126,
    "id": 836
  },
  {
    "label": "Mairie de LE PLESSIS-PLACY",
    "address": "\u00cele-de-France - LE PLESSIS-PLACY",
    "city": "LE PLESSIS-PLACY",
    "postal_code": "367",
    "latitude": 49.05795485,
    "longitude": 2.99008861,
    "id": 837
  },
  {
    "label": "Mairie de MEAUX",
    "address": "\u00cele-de-France - MEAUX",
    "city": "MEAUX",
    "postal_code": "284",
    "latitude": 48.95961762,
    "longitude": 2.8878558500000002,
    "id": 838
  },
  {
    "label": "Mairie de TREUZY-LEVELAY",
    "address": "\u00cele-de-France - TREUZY-LEVELAY",
    "city": "TREUZY-LEVELAY",
    "postal_code": "473",
    "latitude": 48.27316242,
    "longitude": 2.81330595,
    "id": 839
  },
  {
    "label": "Mairie de SAINT-LEU-LA-FORET",
    "address": "\u00cele-de-France - SAINT-LEU-LA-FORET",
    "city": "SAINT-LEU-LA-FORET",
    "postal_code": "563",
    "latitude": 49.01746755,
    "longitude": 2.24633085,
    "id": 840
  },
  {
    "label": "Mairie de CARNETIN",
    "address": "\u00cele-de-France - CARNETIN",
    "city": "CARNETIN",
    "postal_code": "62",
    "latitude": 48.90010962,
    "longitude": 2.70455777,
    "id": 841
  },
  {
    "label": "Mairie de LA GRANDE-PAROISSE",
    "address": "\u00cele-de-France - LA GRANDE-PAROISSE",
    "city": "LA GRANDE-PAROISSE",
    "postal_code": "210",
    "latitude": 48.38695716,
    "longitude": 2.90207897,
    "id": 842
  },
  {
    "label": "Mairie de SAINT-MESMES",
    "address": "\u00cele-de-France - SAINT-MESMES",
    "city": "SAINT-MESMES",
    "postal_code": "427",
    "latitude": 48.983715,
    "longitude": 2.69559377,
    "id": 843
  },
  {
    "label": "Mairie de ABLIS",
    "address": "\u00cele-de-France - ABLIS",
    "city": "ABLIS",
    "postal_code": "3",
    "latitude": 48.51670453,
    "longitude": 1.83584401,
    "id": 844
  },
  {
    "label": "Mairie de MAURECOURT",
    "address": "\u00cele-de-France - MAURECOURT",
    "city": "MAURECOURT",
    "postal_code": "382",
    "latitude": 48.99741513,
    "longitude": 2.0619936,
    "id": 845
  },
  {
    "label": "Mairie de VERNOUILLET",
    "address": "\u00cele-de-France - VERNOUILLET",
    "city": "VERNOUILLET",
    "postal_code": "643",
    "latitude": 48.97204445,
    "longitude": 1.98295511,
    "id": 846
  },
  {
    "label": "Mairie de COURSON-MONTELOUP",
    "address": "\u00cele-de-France - COURSON-MONTELOUP",
    "city": "COURSON-MONTELOUP",
    "postal_code": "186",
    "latitude": 48.59222247,
    "longitude": 2.14408452,
    "id": 847
  },
  {
    "label": "Mairie de LES GRANGES-LE-ROI",
    "address": "\u00cele-de-France - LES GRANGES-LE-ROI",
    "city": "LES GRANGES-LE-ROI",
    "postal_code": "284",
    "latitude": 48.50205518,
    "longitude": 2.01861027,
    "id": 848
  },
  {
    "label": "Mairie de SAINT-CHERON",
    "address": "\u00cele-de-France - SAINT-CHERON",
    "city": "SAINT-CHERON",
    "postal_code": "540",
    "latitude": 48.55353579,
    "longitude": 2.12527029,
    "id": 849
  },
  {
    "label": "Mairie de BOULOGNE-BILLANCOURT",
    "address": "\u00cele-de-France - BOULOGNE-BILLANCOURT",
    "city": "BOULOGNE-BILLANCOURT",
    "postal_code": "12",
    "latitude": 48.83502905,
    "longitude": 2.24120479,
    "id": 850
  },
  {
    "label": "Mairie de NOGENT-SUR-MARNE",
    "address": "\u00cele-de-France - NOGENT-SUR-MARNE",
    "city": "NOGENT-SUR-MARNE",
    "postal_code": "52",
    "latitude": 48.8367771,
    "longitude": 2.48218534,
    "id": 851
  },
  {
    "label": "Mairie de VILLIERS-SUR-MARNE",
    "address": "\u00cele-de-France - VILLIERS-SUR-MARNE",
    "city": "VILLIERS-SUR-MARNE",
    "postal_code": "79",
    "latitude": 48.82769681,
    "longitude": 2.5447777,
    "id": 852
  },
  {
    "label": "Mairie de SERAINCOURT",
    "address": "\u00cele-de-France - SERAINCOURT",
    "city": "SERAINCOURT",
    "postal_code": "592",
    "latitude": 49.03545092,
    "longitude": 1.86771405,
    "id": 853
  },
  {
    "label": "Mairie de ANNET-SUR-MARNE",
    "address": "\u00cele-de-France - ANNET-SUR-MARNE",
    "city": "ANNET-SUR-MARNE",
    "postal_code": "5",
    "latitude": 48.92522583,
    "longitude": 2.71973802,
    "id": 854
  },
  {
    "label": "Mairie de COMBS-LA-VILLE",
    "address": "\u00cele-de-France - COMBS-LA-VILLE",
    "city": "COMBS-LA-VILLE",
    "postal_code": "122",
    "latitude": 48.66227938,
    "longitude": 2.56311539,
    "id": 855
  },
  {
    "label": "Mairie de FAY-LES-NEMOURS",
    "address": "\u00cele-de-France - FAY-LES-NEMOURS",
    "city": "FAY-LES-NEMOURS",
    "postal_code": "178",
    "latitude": 48.23138277,
    "longitude": 2.67430889,
    "id": 856
  },
  {
    "label": "Mairie de VARENNES-SUR-SEINE",
    "address": "\u00cele-de-France - VARENNES-SUR-SEINE",
    "city": "VARENNES-SUR-SEINE",
    "postal_code": "482",
    "latitude": 48.37426534,
    "longitude": 2.9235340499999998,
    "id": 857
  },
  {
    "label": "Mairie de DROCOURT",
    "address": "\u00cele-de-France - DROCOURT",
    "city": "DROCOURT",
    "postal_code": "202",
    "latitude": 49.05657673,
    "longitude": 1.7663408999999999,
    "id": 858
  },
  {
    "label": "Mairie de MAISONS-LAFFITTE",
    "address": "\u00cele-de-France - MAISONS-LAFFITTE",
    "city": "MAISONS-LAFFITTE",
    "postal_code": "358",
    "latitude": 48.94635474,
    "longitude": 2.14549211,
    "id": 859
  },
  {
    "label": "Mairie de QUINCY-SOUS-SENART",
    "address": "\u00cele-de-France - QUINCY-SOUS-SENART",
    "city": "QUINCY-SOUS-SENART",
    "postal_code": "514",
    "latitude": 48.67132119,
    "longitude": 2.53329694,
    "id": 860
  },
  {
    "label": "Mairie de BEYNES",
    "address": "\u00cele-de-France - BEYNES",
    "city": "BEYNES",
    "postal_code": "62",
    "latitude": 48.85663346,
    "longitude": 1.87341917,
    "id": 861
  },
  {
    "label": "Mairie de LE TERTRE-SAINT-DENIS",
    "address": "\u00cele-de-France - LE TERTRE-SAINT-DENIS",
    "city": "LE TERTRE-SAINT-DENIS",
    "postal_code": "608",
    "latitude": 48.93887152,
    "longitude": 1.60529652,
    "id": 862
  },
  {
    "label": "Mairie de MONTCHAUVET",
    "address": "\u00cele-de-France - MONTCHAUVET",
    "city": "MONTCHAUVET",
    "postal_code": "417",
    "latitude": 48.89138238,
    "longitude": 1.6291379099999999,
    "id": 863
  },
  {
    "label": "Mairie de SAINT-HILARION",
    "address": "\u00cele-de-France - SAINT-HILARION",
    "city": "SAINT-HILARION",
    "postal_code": "557",
    "latitude": 48.62050505,
    "longitude": 1.73315484,
    "id": 864
  },
  {
    "label": "Mairie de ANGERVILLE",
    "address": "\u00cele-de-France - ANGERVILLE",
    "city": "ANGERVILLE",
    "postal_code": "16",
    "latitude": 48.31050058,
    "longitude": 1.99820915,
    "id": 865
  },
  {
    "label": "Mairie de BOUVILLE",
    "address": "\u00cele-de-France - BOUVILLE",
    "city": "BOUVILLE",
    "postal_code": "100",
    "latitude": 48.43144319,
    "longitude": 2.26896474,
    "id": 866
  },
  {
    "label": "Mairie de NAINVILLE-LES-ROCHES",
    "address": "\u00cele-de-France - NAINVILLE-LES-ROCHES",
    "city": "NAINVILLE-LES-ROCHES",
    "postal_code": "441",
    "latitude": 48.50597541,
    "longitude": 2.49479593,
    "id": 867
  },
  {
    "label": "Mairie de VILLIERS-SUR-ORGE",
    "address": "\u00cele-de-France - VILLIERS-SUR-ORGE",
    "city": "VILLIERS-SUR-ORGE",
    "postal_code": "685",
    "latitude": 48.65799489,
    "longitude": 2.3025880499999998,
    "id": 868
  },
  {
    "label": "Mairie de SAGY",
    "address": "\u00cele-de-France - SAGY",
    "city": "SAGY",
    "postal_code": "535",
    "latitude": 49.05013118,
    "longitude": 1.95234281,
    "id": 869
  },
  {
    "label": "Mairie de CHALAUTRE-LA-PETITE",
    "address": "\u00cele-de-France - CHALAUTRE-LA-PETITE",
    "city": "CHALAUTRE-LA-PETITE",
    "postal_code": "73",
    "latitude": 48.52904299,
    "longitude": 3.31102867,
    "id": 870
  },
  {
    "label": "Mairie de FLAGY",
    "address": "\u00cele-de-France - FLAGY",
    "city": "FLAGY",
    "postal_code": "184",
    "latitude": 48.3122372,
    "longitude": 2.92149249,
    "id": 871
  },
  {
    "label": "Mairie de MONTIGNY-LES-CORMEILLES",
    "address": "\u00cele-de-France - MONTIGNY-LES-CORMEILLES",
    "city": "MONTIGNY-LES-CORMEILLES",
    "postal_code": "424",
    "latitude": 48.99405239,
    "longitude": 2.19447804,
    "id": 872
  },
  {
    "label": "Mairie de AMENUCOURT",
    "address": "\u00cele-de-France - AMENUCOURT",
    "city": "AMENUCOURT",
    "postal_code": "12",
    "latitude": 49.10623613,
    "longitude": 1.64124502,
    "id": 873
  },
  {
    "label": "Mairie de ARGENTEUIL",
    "address": "\u00cele-de-France - ARGENTEUIL",
    "city": "ARGENTEUIL",
    "postal_code": "18",
    "latitude": 48.94827266,
    "longitude": 2.2478168099999998,
    "id": 874
  },
  {
    "label": "Mairie de LE PORT-MARLY",
    "address": "\u00cele-de-France - LE PORT-MARLY",
    "city": "LE PORT-MARLY",
    "postal_code": "502",
    "latitude": 48.8788901,
    "longitude": 2.11031406,
    "id": 875
  },
  {
    "label": "Mairie de MAULETTE",
    "address": "\u00cele-de-France - MAULETTE",
    "city": "MAULETTE",
    "postal_code": "381",
    "latitude": 48.79246651,
    "longitude": 1.6209641000000001,
    "id": 876
  },
  {
    "label": "Mairie de MEZY-SUR-SEINE",
    "address": "\u00cele-de-France - MEZY-SUR-SEINE",
    "city": "MEZY-SUR-SEINE",
    "postal_code": "403",
    "latitude": 49.0022554,
    "longitude": 1.8816741700000001,
    "id": 877
  },
  {
    "label": "Mairie de POISSY",
    "address": "\u00cele-de-France - POISSY",
    "city": "POISSY",
    "postal_code": "498",
    "latitude": 48.92907492,
    "longitude": 2.04462582,
    "id": 878
  },
  {
    "label": "Mairie de AUVERNAUX",
    "address": "\u00cele-de-France - AUVERNAUX",
    "city": "AUVERNAUX",
    "postal_code": "37",
    "latitude": 48.52935049,
    "longitude": 2.493513,
    "id": 879
  },
  {
    "label": "Mairie de D'HUISON-LONGUEVILLE",
    "address": "\u00cele-de-France - D'HUISON-LONGUEVILLE",
    "city": "D'HUISON-LONGUEVILLE",
    "postal_code": "198",
    "latitude": 48.4584323,
    "longitude": 2.32029163,
    "id": 880
  },
  {
    "label": "Mairie de ECHARCON",
    "address": "\u00cele-de-France - ECHARCON",
    "city": "ECHARCON",
    "postal_code": "204",
    "latitude": 48.57258044,
    "longitude": 2.41101225,
    "id": 881
  },
  {
    "label": "Mairie de NANTERRE",
    "address": "\u00cele-de-France - NANTERRE",
    "city": "NANTERRE",
    "postal_code": "50",
    "latitude": 48.89071544,
    "longitude": 2.20430308,
    "id": 882
  },
  {
    "label": "Mairie de JAIGNES",
    "address": "\u00cele-de-France - JAIGNES",
    "city": "JAIGNES",
    "postal_code": "235",
    "latitude": 48.99198231,
    "longitude": 3.05480597,
    "id": 883
  },
  {
    "label": "Mairie de JOUARRE",
    "address": "\u00cele-de-France - JOUARRE",
    "city": "JOUARRE",
    "postal_code": "238",
    "latitude": 48.92679769,
    "longitude": 3.13028228,
    "id": 884
  },
  {
    "label": "Mairie de LA CHAPELLE-LA-REINE",
    "address": "\u00cele-de-France - LA CHAPELLE-LA-REINE",
    "city": "LA CHAPELLE-LA-REINE",
    "postal_code": "88",
    "latitude": 48.31884557,
    "longitude": 2.57241983,
    "id": 885
  },
  {
    "label": "Mairie de PEZARCHES",
    "address": "\u00cele-de-France - PEZARCHES",
    "city": "PEZARCHES",
    "postal_code": "360",
    "latitude": 48.73620452,
    "longitude": 2.99012448,
    "id": 886
  },
  {
    "label": "Mairie de SOLERS",
    "address": "\u00cele-de-France - SOLERS",
    "city": "SOLERS",
    "postal_code": "457",
    "latitude": 48.65739406,
    "longitude": 2.71641366,
    "id": 887
  },
  {
    "label": "Mairie de TORCY",
    "address": "\u00cele-de-France - TORCY",
    "city": "TORCY",
    "postal_code": "468",
    "latitude": 48.84993309,
    "longitude": 2.6510903900000002,
    "id": 888
  },
  {
    "label": "Mairie de VILLETTE",
    "address": "\u00cele-de-France - VILLETTE",
    "city": "VILLETTE",
    "postal_code": "677",
    "latitude": 48.92768529,
    "longitude": 1.69138232,
    "id": 889
  },
  {
    "label": "Mairie de BOUTIGNY-SUR-ESSONNE",
    "address": "\u00cele-de-France - BOUTIGNY-SUR-ESSONNE",
    "city": "BOUTIGNY-SUR-ESSONNE",
    "postal_code": "99",
    "latitude": 48.43595136,
    "longitude": 2.37704319,
    "id": 890
  },
  {
    "label": "Mairie de LONGPONT-SUR-ORGE",
    "address": "\u00cele-de-France - LONGPONT-SUR-ORGE",
    "city": "LONGPONT-SUR-ORGE",
    "postal_code": "347",
    "latitude": 48.64271013,
    "longitude": 2.2917468899999998,
    "id": 891
  },
  {
    "label": "Mairie de AUBERVILLIERS",
    "address": "\u00cele-de-France - AUBERVILLIERS",
    "city": "AUBERVILLIERS",
    "postal_code": "1",
    "latitude": 48.9114512,
    "longitude": 2.3828621500000002,
    "id": 892
  },
  {
    "label": "Mairie de FONTENAY-EN-PARISIS",
    "address": "\u00cele-de-France - FONTENAY-EN-PARISIS",
    "city": "FONTENAY-EN-PARISIS",
    "postal_code": "241",
    "latitude": 49.05249475,
    "longitude": 2.44997825,
    "id": 893
  },
  {
    "label": "Mairie de FOUJU",
    "address": "\u00cele-de-France - FOUJU",
    "city": "FOUJU",
    "postal_code": "195",
    "latitude": 48.58616565,
    "longitude": 2.77822408,
    "id": 894
  },
  {
    "label": "Mairie de GASTINS",
    "address": "\u00cele-de-France - GASTINS",
    "city": "GASTINS",
    "postal_code": "201",
    "latitude": 48.62816883,
    "longitude": 3.01996063,
    "id": 895
  },
  {
    "label": "Mairie de JUILLY",
    "address": "\u00cele-de-France - JUILLY",
    "city": "JUILLY",
    "postal_code": "241",
    "latitude": 49.01244622,
    "longitude": 2.7039896800000003,
    "id": 896
  },
  {
    "label": "Mairie de LES ECRENNES",
    "address": "\u00cele-de-France - LES ECRENNES",
    "city": "LES ECRENNES",
    "postal_code": "165",
    "latitude": 48.50313292,
    "longitude": 2.85869206,
    "id": 897
  },
  {
    "label": "Mairie de MEILLERAY",
    "address": "\u00cele-de-France - MEILLERAY",
    "city": "MEILLERAY",
    "postal_code": "287",
    "latitude": 48.78874087,
    "longitude": 3.42608597,
    "id": 898
  },
  {
    "label": "Mairie de MOUROUX",
    "address": "\u00cele-de-France - MOUROUX",
    "city": "MOUROUX",
    "postal_code": "320",
    "latitude": 48.82222298,
    "longitude": 3.03748592,
    "id": 899
  },
  {
    "label": "Mairie de QUIERS",
    "address": "\u00cele-de-France - QUIERS",
    "city": "QUIERS",
    "postal_code": "381",
    "latitude": 48.60777286,
    "longitude": 2.96953794,
    "id": 900
  },
  {
    "label": "Mairie de SAINT-GERMAIN-LAXIS",
    "address": "\u00cele-de-France - SAINT-GERMAIN-LAXIS",
    "city": "SAINT-GERMAIN-LAXIS",
    "postal_code": "410",
    "latitude": 48.58190385,
    "longitude": 2.71044538,
    "id": 901
  },
  {
    "label": "Mairie de VANVILLE",
    "address": "\u00cele-de-France - VANVILLE",
    "city": "VANVILLE",
    "postal_code": "481",
    "latitude": 48.55571788,
    "longitude": 3.10703644,
    "id": 902
  },
  {
    "label": "Mairie de VIEUX-CHAMPAGNE",
    "address": "\u00cele-de-France - VIEUX-CHAMPAGNE",
    "city": "VIEUX-CHAMPAGNE",
    "postal_code": "496",
    "latitude": 48.57889174,
    "longitude": 3.13718464,
    "id": 903
  },
  {
    "label": "Mairie de DHUISY",
    "address": "\u00cele-de-France - DHUISY",
    "city": "DHUISY",
    "postal_code": "157",
    "latitude": 49.0389288,
    "longitude": 3.16070775,
    "id": 904
  },
  {
    "label": "Mairie de CONDECOURT",
    "address": "\u00cele-de-France - CONDECOURT",
    "city": "CONDECOURT",
    "postal_code": "170",
    "latitude": 49.04290677,
    "longitude": 1.94146113,
    "id": 905
  },
  {
    "label": "Mairie de FREPILLON",
    "address": "\u00cele-de-France - FREPILLON",
    "city": "FREPILLON",
    "postal_code": "256",
    "latitude": 49.05157643,
    "longitude": 2.20525628,
    "id": 906
  },
  {
    "label": "Mairie de CHEVRAINVILLIERS",
    "address": "\u00cele-de-France - CHEVRAINVILLIERS",
    "city": "CHEVRAINVILLIERS",
    "postal_code": "112",
    "latitude": 48.24502455,
    "longitude": 2.61516585,
    "id": 907
  },
  {
    "label": "Mairie de COURPALAY",
    "address": "\u00cele-de-France - COURPALAY",
    "city": "COURPALAY",
    "postal_code": "135",
    "latitude": 48.64827957,
    "longitude": 2.9591768800000002,
    "id": 908
  },
  {
    "label": "Mairie de GERMIGNY-SOUS-COULOMBS",
    "address": "\u00cele-de-France - GERMIGNY-SOUS-COULOMBS",
    "city": "GERMIGNY-SOUS-COULOMBS",
    "postal_code": "204",
    "latitude": 49.06409751,
    "longitude": 3.15974148,
    "id": 909
  },
  {
    "label": "Mairie de GREZ-SUR-LOING",
    "address": "\u00cele-de-France - GREZ-SUR-LOING",
    "city": "GREZ-SUR-LOING",
    "postal_code": "216",
    "latitude": 48.31496085,
    "longitude": 2.68832571,
    "id": 910
  },
  {
    "label": "Mairie de JOSSIGNY",
    "address": "\u00cele-de-France - JOSSIGNY",
    "city": "JOSSIGNY",
    "postal_code": "237",
    "latitude": 48.83793653,
    "longitude": 2.75313294,
    "id": 911
  },
  {
    "label": "Mairie de NOISIEL",
    "address": "\u00cele-de-France - NOISIEL",
    "city": "NOISIEL",
    "postal_code": "337",
    "latitude": 48.85448222,
    "longitude": 2.62932648,
    "id": 912
  },
  {
    "label": "Mairie de SEPT-SORTS",
    "address": "\u00cele-de-France - SEPT-SORTS",
    "city": "SEPT-SORTS",
    "postal_code": "448",
    "latitude": 48.93775965,
    "longitude": 3.10316593,
    "id": 913
  },
  {
    "label": "Mairie de TRILBARDOU",
    "address": "\u00cele-de-France - TRILBARDOU",
    "city": "TRILBARDOU",
    "postal_code": "474",
    "latitude": 48.94199411,
    "longitude": 2.80581132,
    "id": 914
  },
  {
    "label": "Mairie de GAZERAN",
    "address": "\u00cele-de-France - GAZERAN",
    "city": "GAZERAN",
    "postal_code": "269",
    "latitude": 48.63418853,
    "longitude": 1.77368313,
    "id": 915
  },
  {
    "label": "Mairie de VERT",
    "address": "\u00cele-de-France - VERT",
    "city": "VERT",
    "postal_code": "647",
    "latitude": 48.94116512,
    "longitude": 1.6912141699999999,
    "id": 916
  },
  {
    "label": "Mairie de CHEVANNES",
    "address": "\u00cele-de-France - CHEVANNES",
    "city": "CHEVANNES",
    "postal_code": "159",
    "latitude": 48.53120395,
    "longitude": 2.44343827,
    "id": 917
  },
  {
    "label": "Mairie de MASSY",
    "address": "\u00cele-de-France - MASSY",
    "city": "MASSY",
    "postal_code": "377",
    "latitude": 48.73079202,
    "longitude": 2.27672394,
    "id": 918
  },
  {
    "label": "Mairie de MONTROUGE",
    "address": "\u00cele-de-France - MONTROUGE",
    "city": "MONTROUGE",
    "postal_code": "49",
    "latitude": 48.81619267,
    "longitude": 2.32153571,
    "id": 919
  },
  {
    "label": "Mairie de VOISENON",
    "address": "\u00cele-de-France - VOISENON",
    "city": "VOISENON",
    "postal_code": "528",
    "latitude": 48.57125287,
    "longitude": 2.66431373,
    "id": 920
  },
  {
    "label": "Mairie de GUERVILLE",
    "address": "\u00cele-de-France - GUERVILLE",
    "city": "GUERVILLE",
    "postal_code": "291",
    "latitude": 48.94408946,
    "longitude": 1.73483702,
    "id": 921
  },
  {
    "label": "Mairie de JUZIERS",
    "address": "\u00cele-de-France - JUZIERS",
    "city": "JUZIERS",
    "postal_code": "327",
    "latitude": 48.99222987,
    "longitude": 1.84625672,
    "id": 922
  },
  {
    "label": "Mairie de BOURAY-SUR-JUINE",
    "address": "\u00cele-de-France - BOURAY-SUR-JUINE",
    "city": "BOURAY-SUR-JUINE",
    "postal_code": "95",
    "latitude": 48.51955824,
    "longitude": 2.29726708,
    "id": 923
  },
  {
    "label": "Mairie de JANVRY",
    "address": "\u00cele-de-France - JANVRY",
    "city": "JANVRY",
    "postal_code": "319",
    "latitude": 48.6470708,
    "longitude": 2.15337683,
    "id": 924
  },
  {
    "label": "Mairie de MORANGIS",
    "address": "\u00cele-de-France - MORANGIS",
    "city": "MORANGIS",
    "postal_code": "432",
    "latitude": 48.70653871,
    "longitude": 2.33514965,
    "id": 925
  },
  {
    "label": "Mairie de VILLECONIN",
    "address": "\u00cele-de-France - VILLECONIN",
    "city": "VILLECONIN",
    "postal_code": "662",
    "latitude": 48.51397908,
    "longitude": 2.12407779,
    "id": 926
  },
  {
    "label": "Mairie de VANVES",
    "address": "\u00cele-de-France - VANVES",
    "city": "VANVES",
    "postal_code": "75",
    "latitude": 48.81977896,
    "longitude": 2.28886957,
    "id": 927
  },
  {
    "label": "Mairie de GUIRY-EN-VEXIN",
    "address": "\u00cele-de-France - GUIRY-EN-VEXIN",
    "city": "GUIRY-EN-VEXIN",
    "postal_code": "295",
    "latitude": 49.1090619,
    "longitude": 1.8492511600000001,
    "id": 928
  },
  {
    "label": "Mairie de LONGUESSE",
    "address": "\u00cele-de-France - LONGUESSE",
    "city": "LONGUESSE",
    "postal_code": "348",
    "latitude": 49.06174496,
    "longitude": 1.93174472,
    "id": 929
  },
  {
    "label": "Mairie de BUSSY-SAINT-GEORGES",
    "address": "\u00cele-de-France - BUSSY-SAINT-GEORGES",
    "city": "BUSSY-SAINT-GEORGES",
    "postal_code": "58",
    "latitude": 48.8417134,
    "longitude": 2.69733615,
    "id": 930
  },
  {
    "label": "Mairie de COULOMMIERS",
    "address": "\u00cele-de-France - COULOMMIERS",
    "city": "COULOMMIERS",
    "postal_code": "131",
    "latitude": 48.81565064,
    "longitude": 3.08367102,
    "id": 931
  },
  {
    "label": "Mairie de HAUTEFEUILLE",
    "address": "\u00cele-de-France - HAUTEFEUILLE",
    "city": "HAUTEFEUILLE",
    "postal_code": "224",
    "latitude": 48.76509048,
    "longitude": 2.96737327,
    "id": 932
  },
  {
    "label": "Mairie de RUBELLES",
    "address": "\u00cele-de-France - RUBELLES",
    "city": "RUBELLES",
    "postal_code": "394",
    "latitude": 48.55952071,
    "longitude": 2.68049137,
    "id": 933
  },
  {
    "label": "Mairie de TOUSSON",
    "address": "\u00cele-de-France - TOUSSON",
    "city": "TOUSSON",
    "postal_code": "471",
    "latitude": 48.34689018,
    "longitude": 2.45790103,
    "id": 934
  },
  {
    "label": "Mairie de ADAINVILLE",
    "address": "\u00cele-de-France - ADAINVILLE",
    "city": "ADAINVILLE",
    "postal_code": "6",
    "latitude": 48.72254595,
    "longitude": 1.65317393,
    "id": 935
  },
  {
    "label": "Mairie de ARNOUVILLE-LES-MANTES",
    "address": "\u00cele-de-France - ARNOUVILLE-LES-MANTES",
    "city": "ARNOUVILLE-LES-MANTES",
    "postal_code": "20",
    "latitude": 48.91081122,
    "longitude": 1.7297700900000001,
    "id": 936
  },
  {
    "label": "Mairie de ROCHEFORT-EN-YVELINES",
    "address": "\u00cele-de-France - ROCHEFORT-EN-YVELINES",
    "city": "ROCHEFORT-EN-YVELINES",
    "postal_code": "522",
    "latitude": 48.58557349,
    "longitude": 1.9882912099999999,
    "id": 937
  },
  {
    "label": "Mairie de CHALO-SAINT-MARS",
    "address": "\u00cele-de-France - CHALO-SAINT-MARS",
    "city": "CHALO-SAINT-MARS",
    "postal_code": "130",
    "latitude": 48.42665707,
    "longitude": 2.06634837,
    "id": 938
  },
  {
    "label": "Mairie de CHAMPCUEIL",
    "address": "\u00cele-de-France - CHAMPCUEIL",
    "city": "CHAMPCUEIL",
    "postal_code": "135",
    "latitude": 48.51502003,
    "longitude": 2.44611156,
    "id": 939
  },
  {
    "label": "Mairie de VARENNES-JARCY",
    "address": "\u00cele-de-France - VARENNES-JARCY",
    "city": "VARENNES-JARCY",
    "postal_code": "631",
    "latitude": 48.67756786,
    "longitude": 2.5591097400000002,
    "id": 940
  },
  {
    "label": "Mairie de BEAUCHERY-SAINT-MARTIN",
    "address": "\u00cele-de-France - BEAUCHERY-SAINT-MARTIN",
    "city": "BEAUCHERY-SAINT-MARTIN",
    "postal_code": "26",
    "latitude": 48.61546336,
    "longitude": 3.40212772,
    "id": 941
  },
  {
    "label": "Mairie de MARY-SUR-MARNE",
    "address": "\u00cele-de-France - MARY-SUR-MARNE",
    "city": "MARY-SUR-MARNE",
    "postal_code": "280",
    "latitude": 49.01460033,
    "longitude": 3.02916158,
    "id": 942
  },
  {
    "label": "Mairie de MONTEVRAIN",
    "address": "\u00cele-de-France - MONTEVRAIN",
    "city": "MONTEVRAIN",
    "postal_code": "307",
    "latitude": 48.87481277,
    "longitude": 2.7452537,
    "id": 943
  },
  {
    "label": "Mairie de PAROY",
    "address": "\u00cele-de-France - PAROY",
    "city": "PAROY",
    "postal_code": "355",
    "latitude": 48.47956422,
    "longitude": 3.19922012,
    "id": 944
  },
  {
    "label": "Mairie de VILLEVAUDE",
    "address": "\u00cele-de-France - VILLEVAUDE",
    "city": "VILLEVAUDE",
    "postal_code": "517",
    "latitude": 48.91370533,
    "longitude": 2.66511195,
    "id": 945
  },
  {
    "label": "Mairie de ATTAINVILLE",
    "address": "\u00cele-de-France - ATTAINVILLE",
    "city": "ATTAINVILLE",
    "postal_code": "28",
    "latitude": 49.05704052,
    "longitude": 2.34607373,
    "id": 946
  },
  {
    "label": "Mairie de BRIGNANCOURT",
    "address": "\u00cele-de-France - BRIGNANCOURT",
    "city": "BRIGNANCOURT",
    "postal_code": "110",
    "latitude": 49.13816246,
    "longitude": 1.94346901,
    "id": 947
  },
  {
    "label": "Mairie de SAINT-GERMAIN-SUR-MORIN",
    "address": "\u00cele-de-France - SAINT-GERMAIN-SUR-MORIN",
    "city": "SAINT-GERMAIN-SUR-MORIN",
    "postal_code": "413",
    "latitude": 48.88249573,
    "longitude": 2.85024315,
    "id": 948
  },
  {
    "label": "Mairie de SAINT-REMY-LA-VANNE",
    "address": "\u00cele-de-France - SAINT-REMY-LA-VANNE",
    "city": "SAINT-REMY-LA-VANNE",
    "postal_code": "432",
    "latitude": 48.79304827,
    "longitude": 3.23299209,
    "id": 949
  },
  {
    "label": "Mairie de SANCY-LES-PROVINS",
    "address": "\u00cele-de-France - SANCY-LES-PROVINS",
    "city": "SANCY-LES-PROVINS",
    "postal_code": "444",
    "latitude": 48.69645257,
    "longitude": 3.39292178,
    "id": 950
  },
  {
    "label": "Mairie de AUBERGENVILLE",
    "address": "\u00cele-de-France - AUBERGENVILLE",
    "city": "AUBERGENVILLE",
    "postal_code": "29",
    "latitude": 48.95811503,
    "longitude": 1.85476859,
    "id": 951
  },
  {
    "label": "Mairie de JEUFOSSE",
    "address": "\u00cele-de-France - JEUFOSSE",
    "city": "JEUFOSSE",
    "postal_code": "320",
    "latitude": 49.03723336,
    "longitude": 1.5287273,
    "id": 952
  },
  {
    "label": "Mairie de LES BREVIAIRES",
    "address": "\u00cele-de-France - LES BREVIAIRES",
    "city": "LES BREVIAIRES",
    "postal_code": "108",
    "latitude": 48.70808091,
    "longitude": 1.8136272,
    "id": 953
  },
  {
    "label": "Mairie de MAGNANVILLE",
    "address": "\u00cele-de-France - MAGNANVILLE",
    "city": "MAGNANVILLE",
    "postal_code": "354",
    "latitude": 48.96717357,
    "longitude": 1.6813346999999998,
    "id": 954
  },
  {
    "label": "Mairie de LA VILLE-DU-BOIS",
    "address": "\u00cele-de-France - LA VILLE-DU-BOIS",
    "city": "LA VILLE-DU-BOIS",
    "postal_code": "665",
    "latitude": 48.66067677,
    "longitude": 2.26866414,
    "id": 955
  },
  {
    "label": "Mairie de SAINT-MAURICE-MONTCOURONNE",
    "address": "\u00cele-de-France - SAINT-MAURICE-MONTCOURONNE",
    "city": "SAINT-MAURICE-MONTCOURONNE",
    "postal_code": "568",
    "latitude": 48.58230425,
    "longitude": 2.1265082,
    "id": 956
  },
  {
    "label": "Mairie de MALAKOFF",
    "address": "\u00cele-de-France - MALAKOFF",
    "city": "MALAKOFF",
    "postal_code": "46",
    "latitude": 48.81708657,
    "longitude": 2.29975986,
    "id": 957
  },
  {
    "label": "Mairie de MENOUVILLE",
    "address": "\u00cele-de-France - MENOUVILLE",
    "city": "MENOUVILLE",
    "postal_code": "387",
    "latitude": 49.15117181,
    "longitude": 2.10911567,
    "id": 958
  },
  {
    "label": "Mairie de MERIEL",
    "address": "\u00cele-de-France - MERIEL",
    "city": "MERIEL",
    "postal_code": "392",
    "latitude": 49.07943251,
    "longitude": 2.20518506,
    "id": 959
  },
  {
    "label": "Mairie de CHANTELOUP-EN-BRIE",
    "address": "\u00cele-de-France - CHANTELOUP-EN-BRIE",
    "city": "CHANTELOUP-EN-BRIE",
    "postal_code": "85",
    "latitude": 48.85505934,
    "longitude": 2.73965036,
    "id": 960
  },
  {
    "label": "Mairie de POIGNY-LA-FORET",
    "address": "\u00cele-de-France - POIGNY-LA-FORET",
    "city": "POIGNY-LA-FORET",
    "postal_code": "497",
    "latitude": 48.67814087,
    "longitude": 1.75420397,
    "id": 961
  },
  {
    "label": "Mairie de MEREVILLE",
    "address": "\u00cele-de-France - MEREVILLE",
    "city": "MEREVILLE",
    "postal_code": "390",
    "latitude": 48.31521556,
    "longitude": 2.08579554,
    "id": 962
  },
  {
    "label": "Mairie de MORSANG-SUR-ORGE",
    "address": "\u00cele-de-France - MORSANG-SUR-ORGE",
    "city": "MORSANG-SUR-ORGE",
    "postal_code": "434",
    "latitude": 48.66339239,
    "longitude": 2.35143485,
    "id": 963
  },
  {
    "label": "Mairie de ANTONY",
    "address": "\u00cele-de-France - ANTONY",
    "city": "ANTONY",
    "postal_code": "2",
    "latitude": 48.75327128,
    "longitude": 2.2970873,
    "id": 964
  },
  {
    "label": "Mairie de LE PLESSIS-ROBINSON",
    "address": "\u00cele-de-France - LE PLESSIS-ROBINSON",
    "city": "LE PLESSIS-ROBINSON",
    "postal_code": "60",
    "latitude": 48.78291554,
    "longitude": 2.26306242,
    "id": 965
  },
  {
    "label": "Mairie de AUFFERVILLE",
    "address": "\u00cele-de-France - AUFFERVILLE",
    "city": "AUFFERVILLE",
    "postal_code": "11",
    "latitude": 48.21446639,
    "longitude": 2.60962271,
    "id": 966
  },
  {
    "label": "Mairie de BOUGLIGNY",
    "address": "\u00cele-de-France - BOUGLIGNY",
    "city": "BOUGLIGNY",
    "postal_code": "45",
    "latitude": 48.19546207,
    "longitude": 2.6579398899999997,
    "id": 967
  },
  {
    "label": "Mairie de CELY",
    "address": "\u00cele-de-France - CELY",
    "city": "CELY",
    "postal_code": "65",
    "latitude": 48.45917345,
    "longitude": 2.5311496399999998,
    "id": 968
  },
  {
    "label": "Mairie de FRESNES-SUR-MARNE",
    "address": "\u00cele-de-France - FRESNES-SUR-MARNE",
    "city": "FRESNES-SUR-MARNE",
    "postal_code": "196",
    "latitude": 48.93953267,
    "longitude": 2.74167105,
    "id": 969
  },
  {
    "label": "Mairie de LES ORMES-SUR-VOULZIE",
    "address": "\u00cele-de-France - LES ORMES-SUR-VOULZIE",
    "city": "LES ORMES-SUR-VOULZIE",
    "postal_code": "347",
    "latitude": 48.46228397,
    "longitude": 3.22597153,
    "id": 970
  },
  {
    "label": "Mairie de PERTHES",
    "address": "\u00cele-de-France - PERTHES",
    "city": "PERTHES",
    "postal_code": "359",
    "latitude": 48.47711106,
    "longitude": 2.5555544,
    "id": 971
  },
  {
    "label": "Mairie de POIGNY",
    "address": "\u00cele-de-France - POIGNY",
    "city": "POIGNY",
    "postal_code": "368",
    "latitude": 48.53916135,
    "longitude": 3.2827870900000002,
    "id": 972
  },
  {
    "label": "Mairie de RUMONT",
    "address": "\u00cele-de-France - RUMONT",
    "city": "RUMONT",
    "postal_code": "395",
    "latitude": 48.26502371,
    "longitude": 2.49811246,
    "id": 973
  },
  {
    "label": "Mairie de DUGNY",
    "address": "\u00cele-de-France - DUGNY",
    "city": "DUGNY",
    "postal_code": "30",
    "latitude": 48.95367156,
    "longitude": 2.41701347,
    "id": 974
  },
  {
    "label": "Mairie de GADANCOURT",
    "address": "\u00cele-de-France - GADANCOURT",
    "city": "GADANCOURT",
    "postal_code": "259",
    "latitude": 49.09651006,
    "longitude": 1.85621167,
    "id": 975
  },
  {
    "label": "Mairie de MAUDETOUR-EN-VEXIN",
    "address": "\u00cele-de-France - MAUDETOUR-EN-VEXIN",
    "city": "MAUDETOUR-EN-VEXIN",
    "postal_code": "379",
    "latitude": 49.09974609,
    "longitude": 1.77407413,
    "id": 976
  },
  {
    "label": "Mairie de CHAUCONIN-NEUFMONTIERS",
    "address": "\u00cele-de-France - CHAUCONIN-NEUFMONTIERS",
    "city": "CHAUCONIN-NEUFMONTIERS",
    "postal_code": "335",
    "latitude": 48.9760097,
    "longitude": 2.83888367,
    "id": 977
  },
  {
    "label": "Mairie de PENCHARD",
    "address": "\u00cele-de-France - PENCHARD",
    "city": "PENCHARD",
    "postal_code": "358",
    "latitude": 48.98580685,
    "longitude": 2.85946028,
    "id": 978
  },
  {
    "label": "Mairie de TROCY-EN-MULTIEN",
    "address": "\u00cele-de-France - TROCY-EN-MULTIEN",
    "city": "TROCY-EN-MULTIEN",
    "postal_code": "476",
    "latitude": 49.04282533,
    "longitude": 2.9625581800000003,
    "id": 979
  },
  {
    "label": "Mairie de VALENCE-EN-BRIE",
    "address": "\u00cele-de-France - VALENCE-EN-BRIE",
    "city": "VALENCE-EN-BRIE",
    "postal_code": "480",
    "latitude": 48.44455166,
    "longitude": 2.89053928,
    "id": 980
  },
  {
    "label": "Mairie de VILLE-SAINT-JACQUES",
    "address": "\u00cele-de-France - VILLE-SAINT-JACQUES",
    "city": "VILLE-SAINT-JACQUES",
    "postal_code": "516",
    "latitude": 48.34291685,
    "longitude": 2.89890684,
    "id": 981
  },
  {
    "label": "Mairie de PRUNAY-EN-YVELINES",
    "address": "\u00cele-de-France - PRUNAY-EN-YVELINES",
    "city": "PRUNAY-EN-YVELINES",
    "postal_code": "506",
    "latitude": 48.52821187,
    "longitude": 1.79512934,
    "id": 982
  },
  {
    "label": "Mairie de BOISSY-LA-RIVIERE",
    "address": "\u00cele-de-France - BOISSY-LA-RIVIERE",
    "city": "BOISSY-LA-RIVIERE",
    "postal_code": "79",
    "latitude": 48.37468129,
    "longitude": 2.15433339,
    "id": 983
  },
  {
    "label": "Mairie de BOUSSY-SAINT-ANTOINE",
    "address": "\u00cele-de-France - BOUSSY-SAINT-ANTOINE",
    "city": "BOUSSY-SAINT-ANTOINE",
    "postal_code": "97",
    "latitude": 48.69109843,
    "longitude": 2.53201377,
    "id": 984
  },
  {
    "label": "Mairie de CORBEIL-ESSONNES",
    "address": "\u00cele-de-France - CORBEIL-ESSONNES",
    "city": "CORBEIL-ESSONNES",
    "postal_code": "174",
    "latitude": 48.61027854,
    "longitude": 2.47477757,
    "id": 985
  },
  {
    "label": "Mairie de MAROLLES-EN-HUREPOIX",
    "address": "\u00cele-de-France - MAROLLES-EN-HUREPOIX",
    "city": "MAROLLES-EN-HUREPOIX",
    "postal_code": "376",
    "latitude": 48.56270873,
    "longitude": 2.29858835,
    "id": 986
  },
  {
    "label": "Mairie de VERT-LE-GRAND",
    "address": "\u00cele-de-France - VERT-LE-GRAND",
    "city": "VERT-LE-GRAND",
    "postal_code": "648",
    "latitude": 48.57260156,
    "longitude": 2.35818313,
    "id": 987
  },
  {
    "label": "Mairie de RUNGIS",
    "address": "\u00cele-de-France - RUNGIS",
    "city": "RUNGIS",
    "postal_code": "65",
    "latitude": 48.74788445,
    "longitude": 2.35009875,
    "id": 988
  },
  {
    "label": "Mairie de FRANCONVILLE",
    "address": "\u00cele-de-France - FRANCONVILLE",
    "city": "FRANCONVILLE",
    "postal_code": "252",
    "latitude": 48.98779906,
    "longitude": 2.22999742,
    "id": 989
  },
  {
    "label": "Mairie de CANNES-ECLUSE",
    "address": "\u00cele-de-France - CANNES-ECLUSE",
    "city": "CANNES-ECLUSE",
    "postal_code": "61",
    "latitude": 48.36403628,
    "longitude": 2.9881831,
    "id": 990
  },
  {
    "label": "Mairie de CUCHARMOY",
    "address": "\u00cele-de-France - CUCHARMOY",
    "city": "CUCHARMOY",
    "postal_code": "149",
    "latitude": 48.59302115,
    "longitude": 3.17399176,
    "id": 991
  },
  {
    "label": "Mairie de JUTIGNY",
    "address": "\u00cele-de-France - JUTIGNY",
    "city": "JUTIGNY",
    "postal_code": "242",
    "latitude": 48.49820077,
    "longitude": 3.23199362,
    "id": 992
  },
  {
    "label": "Mairie de LA GENEVRAYE",
    "address": "\u00cele-de-France - LA GENEVRAYE",
    "city": "LA GENEVRAYE",
    "postal_code": "202",
    "latitude": 48.3201684,
    "longitude": 2.7463282700000002,
    "id": 993
  },
  {
    "label": "Mairie de ROUILLY",
    "address": "\u00cele-de-France - ROUILLY",
    "city": "ROUILLY",
    "postal_code": "391",
    "latitude": 48.58318486,
    "longitude": 3.28629527,
    "id": 994
  },
  {
    "label": "Mairie de THIVERVAL-GRIGNON",
    "address": "\u00cele-de-France - THIVERVAL-GRIGNON",
    "city": "THIVERVAL-GRIGNON",
    "postal_code": "615",
    "latitude": 48.85140281,
    "longitude": 1.91704659,
    "id": 995
  },
  {
    "label": "Mairie de BOIGNEVILLE",
    "address": "\u00cele-de-France - BOIGNEVILLE",
    "city": "BOIGNEVILLE",
    "postal_code": "69",
    "latitude": 48.33525885,
    "longitude": 2.37157289,
    "id": 996
  },
  {
    "label": "Mairie de MONTGERON",
    "address": "\u00cele-de-France - MONTGERON",
    "city": "MONTGERON",
    "postal_code": "421",
    "latitude": 48.70737953,
    "longitude": 2.45466271,
    "id": 997
  },
  {
    "label": "Mairie de SAINTRY-SUR-SEINE",
    "address": "\u00cele-de-France - SAINTRY-SUR-SEINE",
    "city": "SAINTRY-SUR-SEINE",
    "postal_code": "577",
    "latitude": 48.59047517,
    "longitude": 2.4964063,
    "id": 998
  },
  {
    "label": "Mairie de FLINS-SUR-SEINE",
    "address": "\u00cele-de-France - FLINS-SUR-SEINE",
    "city": "FLINS-SUR-SEINE",
    "postal_code": "238",
    "latitude": 48.96447598,
    "longitude": 1.87245265,
    "id": 999
  },
  {
    "label": "Mairie de GUITRANCOURT",
    "address": "\u00cele-de-France - GUITRANCOURT",
    "city": "GUITRANCOURT",
    "postal_code": "296",
    "latitude": 49.0089969,
    "longitude": 1.7764286999999999,
    "id": 1000
  },
  {
    "label": "Mairie de L'ETANG-LA-VILLE",
    "address": "\u00cele-de-France - L'ETANG-LA-VILLE",
    "city": "L'ETANG-LA-VILLE",
    "postal_code": "224",
    "latitude": 48.86892232,
    "longitude": 2.07084981,
    "id": 1001
  },
  {
    "label": "Mairie de NEAUPHLE-LE-VIEUX",
    "address": "\u00cele-de-France - NEAUPHLE-LE-VIEUX",
    "city": "NEAUPHLE-LE-VIEUX",
    "postal_code": "443",
    "latitude": 48.81614716,
    "longitude": 1.8628931899999999,
    "id": 1002
  },
  {
    "label": "Mairie de PLAISIR",
    "address": "\u00cele-de-France - PLAISIR",
    "city": "PLAISIR",
    "postal_code": "490",
    "latitude": 48.81824661,
    "longitude": 1.94589648,
    "id": 1003
  },
  {
    "label": "Mairie de VILLIERS-LE-MAHIEU",
    "address": "\u00cele-de-France - VILLIERS-LE-MAHIEU",
    "city": "VILLIERS-LE-MAHIEU",
    "postal_code": "681",
    "latitude": 48.85979322,
    "longitude": 1.7725938,
    "id": 1004
  },
  {
    "label": "Mairie de EPINAY-SOUS-SENART",
    "address": "\u00cele-de-France - EPINAY-SOUS-SENART",
    "city": "EPINAY-SOUS-SENART",
    "postal_code": "215",
    "latitude": 48.69292176,
    "longitude": 2.5157278400000003,
    "id": 1005
  },
  {
    "label": "Mairie de LIVRY-GARGAN",
    "address": "\u00cele-de-France - LIVRY-GARGAN",
    "city": "LIVRY-GARGAN",
    "postal_code": "46",
    "latitude": 48.9184846,
    "longitude": 2.53559592,
    "id": 1006
  },
  {
    "label": "Mairie de FONTENAY-SOUS-BOIS",
    "address": "\u00cele-de-France - FONTENAY-SOUS-BOIS",
    "city": "FONTENAY-SOUS-BOIS",
    "postal_code": "33",
    "latitude": 48.85206236,
    "longitude": 2.47678047,
    "id": 1007
  },
  {
    "label": "Mairie de IVRY-SUR-SEINE",
    "address": "\u00cele-de-France - IVRY-SUR-SEINE",
    "city": "IVRY-SUR-SEINE",
    "postal_code": "41",
    "latitude": 48.81438525,
    "longitude": 2.38822047,
    "id": 1008
  },
  {
    "label": "Mairie de ARNOUVILLE",
    "address": "\u00cele-de-France - ARNOUVILLE",
    "city": "ARNOUVILLE",
    "postal_code": "19",
    "latitude": 48.98692191,
    "longitude": 2.41706474,
    "id": 1009
  },
  {
    "label": "Mairie de MONTREUIL-SUR-EPTE",
    "address": "\u00cele-de-France - MONTREUIL-SUR-EPTE",
    "city": "MONTREUIL-SUR-EPTE",
    "postal_code": "429",
    "latitude": 49.17653519,
    "longitude": 1.67866995,
    "id": 1010
  },
  {
    "label": "Mairie de LA CHAPELLE-RABLAIS",
    "address": "\u00cele-de-France - LA CHAPELLE-RABLAIS",
    "city": "LA CHAPELLE-RABLAIS",
    "postal_code": "89",
    "latitude": 48.51157413,
    "longitude": 2.9710792599999998,
    "id": 1011
  },
  {
    "label": "Mairie de LA FERTE-GAUCHER",
    "address": "\u00cele-de-France - LA FERTE-GAUCHER",
    "city": "LA FERTE-GAUCHER",
    "postal_code": "182",
    "latitude": 48.78259758,
    "longitude": 3.30490061,
    "id": 1012
  },
  {
    "label": "Mairie de LESCHEROLLES",
    "address": "\u00cele-de-France - LESCHEROLLES",
    "city": "LESCHEROLLES",
    "postal_code": "247",
    "latitude": 48.76158784,
    "longitude": 3.34529816,
    "id": 1013
  },
  {
    "label": "Mairie de LE KREMLIN-BICETRE",
    "address": "\u00cele-de-France - LE KREMLIN-BICETRE",
    "city": "LE KREMLIN-BICETRE",
    "postal_code": "43",
    "latitude": 48.80990043,
    "longitude": 2.3582788,
    "id": 1014
  },
  {
    "label": "Mairie de CHAUMONTEL",
    "address": "\u00cele-de-France - CHAUMONTEL",
    "city": "CHAUMONTEL",
    "postal_code": "149",
    "latitude": 49.12709425,
    "longitude": 2.42823482,
    "id": 1015
  },
  {
    "label": "Mairie de VEMARS",
    "address": "\u00cele-de-France - VEMARS",
    "city": "VEMARS",
    "postal_code": "641",
    "latitude": 49.06939922,
    "longitude": 2.56763092,
    "id": 1016
  },
  {
    "label": "Mairie de GARGENVILLE",
    "address": "\u00cele-de-France - GARGENVILLE",
    "city": "GARGENVILLE",
    "postal_code": "267",
    "latitude": 48.99207864,
    "longitude": 1.8107524,
    "id": 1017
  },
  {
    "label": "Mairie de HOUILLES",
    "address": "\u00cele-de-France - HOUILLES",
    "city": "HOUILLES",
    "postal_code": "311",
    "latitude": 48.92574551,
    "longitude": 2.18784719,
    "id": 1018
  },
  {
    "label": "Mairie de LES LOGES-EN-JOSAS",
    "address": "\u00cele-de-France - LES LOGES-EN-JOSAS",
    "city": "LES LOGES-EN-JOSAS",
    "postal_code": "343",
    "latitude": 48.76300483,
    "longitude": 2.14209012,
    "id": 1019
  },
  {
    "label": "Mairie de MAREIL-MARLY",
    "address": "\u00cele-de-France - MAREIL-MARLY",
    "city": "MAREIL-MARLY",
    "postal_code": "367",
    "latitude": 48.88241524,
    "longitude": 2.07623125,
    "id": 1020
  },
  {
    "label": "Mairie de BONDOUFLE",
    "address": "\u00cele-de-France - BONDOUFLE",
    "city": "BONDOUFLE",
    "postal_code": "86",
    "latitude": 48.6130474,
    "longitude": 2.37988969,
    "id": 1021
  },
  {
    "label": "Mairie de SAINT-GERMAIN-LES-ARPAJON",
    "address": "\u00cele-de-France - SAINT-GERMAIN-LES-ARPAJON",
    "city": "SAINT-GERMAIN-LES-ARPAJON",
    "postal_code": "552",
    "latitude": 48.59504829,
    "longitude": 2.2551987000000002,
    "id": 1022
  },
  {
    "label": "Mairie de BABY",
    "address": "\u00cele-de-France - BABY",
    "city": "BABY",
    "postal_code": "15",
    "latitude": 48.39661629,
    "longitude": 3.34231838,
    "id": 1023
  },
  {
    "label": "Mairie de CHAMPS-SUR-MARNE",
    "address": "\u00cele-de-France - CHAMPS-SUR-MARNE",
    "city": "CHAMPS-SUR-MARNE",
    "postal_code": "83",
    "latitude": 48.85274842,
    "longitude": 2.60207837,
    "id": 1024
  },
  {
    "label": "Mairie de CLOS-FONTAINE",
    "address": "\u00cele-de-France - CLOS-FONTAINE",
    "city": "CLOS-FONTAINE",
    "postal_code": "119",
    "latitude": 48.60661915,
    "longitude": 3.01561179,
    "id": 1025
  },
  {
    "label": "Mairie de GRANDPUITS-BAILLY-CARROIS",
    "address": "\u00cele-de-France - GRANDPUITS-BAILLY-CARROIS",
    "city": "GRANDPUITS-BAILLY-CARROIS",
    "postal_code": "211",
    "latitude": 48.58351712,
    "longitude": 2.9665340000000002,
    "id": 1026
  },
  {
    "label": "Mairie de LUMIGNY-NESLES-ORMEAUX",
    "address": "\u00cele-de-France - LUMIGNY-NESLES-ORMEAUX",
    "city": "LUMIGNY-NESLES-ORMEAUX",
    "postal_code": "264",
    "latitude": 48.73640748,
    "longitude": 2.95207768,
    "id": 1027
  },
  {
    "label": "Mairie de MOUSSEAUX-LES-BRAY",
    "address": "\u00cele-de-France - MOUSSEAUX-LES-BRAY",
    "city": "MOUSSEAUX-LES-BRAY",
    "postal_code": "321",
    "latitude": 48.41378028,
    "longitude": 3.21974538,
    "id": 1028
  },
  {
    "label": "Mairie de ROUVRES",
    "address": "\u00cele-de-France - ROUVRES",
    "city": "ROUVRES",
    "postal_code": "392",
    "latitude": 49.06183066,
    "longitude": 2.7166472500000003,
    "id": 1029
  },
  {
    "label": "Mairie de JOUY-EN-JOSAS",
    "address": "\u00cele-de-France - JOUY-EN-JOSAS",
    "city": "JOUY-EN-JOSAS",
    "postal_code": "322",
    "latitude": 48.76843532,
    "longitude": 2.16654436,
    "id": 1030
  },
  {
    "label": "Mairie de MENERVILLE",
    "address": "\u00cele-de-France - MENERVILLE",
    "city": "MENERVILLE",
    "postal_code": "385",
    "latitude": 48.96581374,
    "longitude": 1.60218555,
    "id": 1031
  },
  {
    "label": "Mairie de BOISSY-SOUS-SAINT-YON",
    "address": "\u00cele-de-France - BOISSY-SOUS-SAINT-YON",
    "city": "BOISSY-SOUS-SAINT-YON",
    "postal_code": "85",
    "latitude": 48.55635319,
    "longitude": 2.20921768,
    "id": 1032
  },
  {
    "label": "Mairie de LE VAL-SAINT-GERMAIN",
    "address": "\u00cele-de-France - LE VAL-SAINT-GERMAIN",
    "city": "LE VAL-SAINT-GERMAIN",
    "postal_code": "630",
    "latitude": 48.56509726,
    "longitude": 2.06427509,
    "id": 1033
  },
  {
    "label": "Mairie de NOISY-SUR-OISE",
    "address": "\u00cele-de-France - NOISY-SUR-OISE",
    "city": "NOISY-SUR-OISE",
    "postal_code": "456",
    "latitude": 49.13791093,
    "longitude": 2.32965429,
    "id": 1034
  },
  {
    "label": "Mairie de COUBRON",
    "address": "\u00cele-de-France - COUBRON",
    "city": "COUBRON",
    "postal_code": "15",
    "latitude": 48.91571072,
    "longitude": 2.57785596,
    "id": 1035
  },
  {
    "label": "Mairie de SAINT-PIERRE-LES-NEMOURS",
    "address": "\u00cele-de-France - SAINT-PIERRE-LES-NEMOURS",
    "city": "SAINT-PIERRE-LES-NEMOURS",
    "postal_code": "431",
    "latitude": 48.26553402,
    "longitude": 2.67991496,
    "id": 1036
  },
  {
    "label": "Mairie de SAVINS",
    "address": "\u00cele-de-France - SAVINS",
    "city": "SAVINS",
    "postal_code": "446",
    "latitude": 48.510128,
    "longitude": 3.19972459,
    "id": 1037
  },
  {
    "label": "Mairie de BRAY-SUR-SEINE",
    "address": "\u00cele-de-France - BRAY-SUR-SEINE",
    "city": "BRAY-SUR-SEINE",
    "postal_code": "51",
    "latitude": 48.41453642,
    "longitude": 3.23866637,
    "id": 1038
  },
  {
    "label": "Mairie de CHAINTREAUX",
    "address": "\u00cele-de-France - CHAINTREAUX",
    "city": "CHAINTREAUX",
    "postal_code": "71",
    "latitude": 48.19940678,
    "longitude": 2.8193627,
    "id": 1039
  },
  {
    "label": "Mairie de RUEIL-MALMAISON",
    "address": "\u00cele-de-France - RUEIL-MALMAISON",
    "city": "RUEIL-MALMAISON",
    "postal_code": "63",
    "latitude": 48.87811397,
    "longitude": 2.18798447,
    "id": 1040
  },
  {
    "label": "Mairie de VILLENEUVE-LA-GARENNE",
    "address": "\u00cele-de-France - VILLENEUVE-LA-GARENNE",
    "city": "VILLENEUVE-LA-GARENNE",
    "postal_code": "78",
    "latitude": 48.93752169,
    "longitude": 2.32831957,
    "id": 1041
  },
  {
    "label": "Mairie de LIVILLIERS",
    "address": "\u00cele-de-France - LIVILLIERS",
    "city": "LIVILLIERS",
    "postal_code": "341",
    "latitude": 49.09543305,
    "longitude": 2.09431055,
    "id": 1042
  },
  {
    "label": "Mairie de BERNAY-VILBERT",
    "address": "\u00cele-de-France - BERNAY-VILBERT",
    "city": "BERNAY-VILBERT",
    "postal_code": "31",
    "latitude": 48.675357,
    "longitude": 2.93778346,
    "id": 1043
  },
  {
    "label": "Mairie de BEZALLES",
    "address": "\u00cele-de-France - BEZALLES",
    "city": "BEZALLES",
    "postal_code": "33",
    "latitude": 48.67881174,
    "longitude": 3.24324299,
    "id": 1044
  },
  {
    "label": "Mairie de EVRY-GREGY-SUR-YERRE",
    "address": "\u00cele-de-France - EVRY-GREGY-SUR-YERRE",
    "city": "EVRY-GREGY-SUR-YERRE",
    "postal_code": "175",
    "latitude": 48.65492967,
    "longitude": 2.6349908600000003,
    "id": 1045
  },
  {
    "label": "Mairie de VULAINES-LES-PROVINS",
    "address": "\u00cele-de-France - VULAINES-LES-PROVINS",
    "city": "VULAINES-LES-PROVINS",
    "postal_code": "532",
    "latitude": 48.56032715,
    "longitude": 3.21951548,
    "id": 1046
  },
  {
    "label": "Mairie de CIVRY-LA-FORET",
    "address": "\u00cele-de-France - CIVRY-LA-FORET",
    "city": "CIVRY-LA-FORET",
    "postal_code": "163",
    "latitude": 48.86703603,
    "longitude": 1.61584699,
    "id": 1047
  },
  {
    "label": "Mairie de ORSONVILLE",
    "address": "\u00cele-de-France - ORSONVILLE",
    "city": "ORSONVILLE",
    "postal_code": "472",
    "latitude": 48.47804313,
    "longitude": 1.8348628,
    "id": 1048
  },
  {
    "label": "Mairie de MOURS",
    "address": "\u00cele-de-France - MOURS",
    "city": "MOURS",
    "postal_code": "436",
    "latitude": 49.13339931,
    "longitude": 2.26940492,
    "id": 1049
  },
  {
    "label": "Mairie de AVRAINVILLE",
    "address": "\u00cele-de-France - AVRAINVILLE",
    "city": "AVRAINVILLE",
    "postal_code": "41",
    "latitude": 48.56268177,
    "longitude": 2.24847793,
    "id": 1050
  },
  {
    "label": "Mairie de ETAMPES",
    "address": "\u00cele-de-France - ETAMPES",
    "city": "ETAMPES",
    "postal_code": "223",
    "latitude": 48.43492937,
    "longitude": 2.16222887,
    "id": 1051
  },
  {
    "label": "Mairie de ONCY-SUR-ECOLE",
    "address": "\u00cele-de-France - ONCY-SUR-ECOLE",
    "city": "ONCY-SUR-ECOLE",
    "postal_code": "463",
    "latitude": 48.38283673,
    "longitude": 2.4728304,
    "id": 1052
  },
  {
    "label": "Mairie de ORSAY",
    "address": "\u00cele-de-France - ORSAY",
    "city": "ORSAY",
    "postal_code": "471",
    "latitude": 48.69835417,
    "longitude": 2.18714236,
    "id": 1053
  },
  {
    "label": "Mairie de CLAMART",
    "address": "\u00cele-de-France - CLAMART",
    "city": "CLAMART",
    "postal_code": "23",
    "latitude": 48.80089048,
    "longitude": 2.26167619,
    "id": 1054
  },
  {
    "label": "Mairie de ROMAINVILLE",
    "address": "\u00cele-de-France - ROMAINVILLE",
    "city": "ROMAINVILLE",
    "postal_code": "63",
    "latitude": 48.88355892,
    "longitude": 2.43598365,
    "id": 1055
  },
  {
    "label": "Mairie de ASNIERES-SUR-OISE",
    "address": "\u00cele-de-France - ASNIERES-SUR-OISE",
    "city": "ASNIERES-SUR-OISE",
    "postal_code": "26",
    "latitude": 49.13341712,
    "longitude": 2.35567202,
    "id": 1056
  },
  {
    "label": "Mairie de ROISSY-EN-FRANCE",
    "address": "\u00cele-de-France - ROISSY-EN-FRANCE",
    "city": "ROISSY-EN-FRANCE",
    "postal_code": "527",
    "latitude": 49.00388575,
    "longitude": 2.51816686,
    "id": 1057
  },
  {
    "label": "Mairie de SAINT-WITZ",
    "address": "\u00cele-de-France - SAINT-WITZ",
    "city": "SAINT-WITZ",
    "postal_code": "580",
    "latitude": 49.09186344,
    "longitude": 2.56773118,
    "id": 1058
  },
  {
    "label": "Mairie de BALLOY",
    "address": "\u00cele-de-France - BALLOY",
    "city": "BALLOY",
    "postal_code": "19",
    "latitude": 48.39811166,
    "longitude": 3.14792293,
    "id": 1059
  },
  {
    "label": "Mairie de BOMBON",
    "address": "\u00cele-de-France - BOMBON",
    "city": "BOMBON",
    "postal_code": "44",
    "latitude": 48.57145251,
    "longitude": 2.8593750399999998,
    "id": 1060
  },
  {
    "label": "Mairie de HERME",
    "address": "\u00cele-de-France - HERME",
    "city": "HERME",
    "postal_code": "227",
    "latitude": 48.48290389,
    "longitude": 3.34533053,
    "id": 1061
  },
  {
    "label": "Mairie de LE PIN",
    "address": "\u00cele-de-France - LE PIN",
    "city": "LE PIN",
    "postal_code": "363",
    "latitude": 48.91469623,
    "longitude": 2.62966597,
    "id": 1062
  },
  {
    "label": "Mairie de MOUSSY-LE-VIEUX",
    "address": "\u00cele-de-France - MOUSSY-LE-VIEUX",
    "city": "MOUSSY-LE-VIEUX",
    "postal_code": "323",
    "latitude": 49.0468102,
    "longitude": 2.62494552,
    "id": 1063
  },
  {
    "label": "Mairie de SIVRY-COURTRY",
    "address": "\u00cele-de-France - SIVRY-COURTRY",
    "city": "SIVRY-COURTRY",
    "postal_code": "453",
    "latitude": 48.52781828,
    "longitude": 2.75472254,
    "id": 1064
  },
  {
    "label": "Mairie de FOLLAINVILLE-DENNEMONT",
    "address": "\u00cele-de-France - FOLLAINVILLE-DENNEMONT",
    "city": "FOLLAINVILLE-DENNEMONT",
    "postal_code": "239",
    "latitude": 49.02036718,
    "longitude": 1.71345263,
    "id": 1065
  },
  {
    "label": "Mairie de RAMBOUILLET",
    "address": "\u00cele-de-France - RAMBOUILLET",
    "city": "RAMBOUILLET",
    "postal_code": "517",
    "latitude": 48.64343432,
    "longitude": 1.83055469,
    "id": 1066
  },
  {
    "label": "Mairie de SAINT-NOM-LA-BRETECHE",
    "address": "\u00cele-de-France - SAINT-NOM-LA-BRETECHE",
    "city": "SAINT-NOM-LA-BRETECHE",
    "postal_code": "571",
    "latitude": 48.85981525,
    "longitude": 2.02186086,
    "id": 1067
  },
  {
    "label": "Mairie de YERRES",
    "address": "\u00cele-de-France - YERRES",
    "city": "YERRES",
    "postal_code": "691",
    "latitude": 48.71632606,
    "longitude": 2.49135804,
    "id": 1068
  },
  {
    "label": "Mairie de COLOMBES",
    "address": "\u00cele-de-France - COLOMBES",
    "city": "COLOMBES",
    "postal_code": "25",
    "latitude": 48.9231125,
    "longitude": 2.25195154,
    "id": 1069
  },
  {
    "label": "Mairie de CHAMPAGNE-SUR-OISE",
    "address": "\u00cele-de-France - CHAMPAGNE-SUR-OISE",
    "city": "CHAMPAGNE-SUR-OISE",
    "postal_code": "134",
    "latitude": 49.13607062,
    "longitude": 2.23516663,
    "id": 1070
  },
  {
    "label": "Mairie de EPIAIS-LES-LOUVRES",
    "address": "\u00cele-de-France - EPIAIS-LES-LOUVRES",
    "city": "EPIAIS-LES-LOUVRES",
    "postal_code": "212",
    "latitude": 49.03167637,
    "longitude": 2.55789636,
    "id": 1071
  },
  {
    "label": "Mairie de PUISEUX-EN-FRANCE",
    "address": "\u00cele-de-France - PUISEUX-EN-FRANCE",
    "city": "PUISEUX-EN-FRANCE",
    "postal_code": "509",
    "latitude": 49.05782791,
    "longitude": 2.50058064,
    "id": 1072
  },
  {
    "label": "Mairie de ARGENTIERES",
    "address": "\u00cele-de-France - ARGENTIERES",
    "city": "ARGENTIERES",
    "postal_code": "7",
    "latitude": 48.65321563,
    "longitude": 2.8683351200000002,
    "id": 1073
  },
  {
    "label": "Mairie de BEAUVOIR",
    "address": "\u00cele-de-France - BEAUVOIR",
    "city": "BEAUVOIR",
    "postal_code": "29",
    "latitude": 48.64424509,
    "longitude": 2.86417419,
    "id": 1074
  },
  {
    "label": "Mairie de COUILLY-PONT-AUX-DAMES",
    "address": "\u00cele-de-France - COUILLY-PONT-AUX-DAMES",
    "city": "COUILLY-PONT-AUX-DAMES",
    "postal_code": "128",
    "latitude": 48.88425767,
    "longitude": 2.85843719,
    "id": 1075
  },
  {
    "label": "Mairie de DAMMARTIN-EN-GOELE",
    "address": "\u00cele-de-France - DAMMARTIN-EN-GOELE",
    "city": "DAMMARTIN-EN-GOELE",
    "postal_code": "153",
    "latitude": 49.05385091,
    "longitude": 2.6810408,
    "id": 1076
  },
  {
    "label": "Mairie de SAMOREAU",
    "address": "\u00cele-de-France - SAMOREAU",
    "city": "SAMOREAU",
    "postal_code": "442",
    "latitude": 48.42533372,
    "longitude": 2.75390463,
    "id": 1077
  },
  {
    "label": "Mairie de SOURDUN",
    "address": "\u00cele-de-France - SOURDUN",
    "city": "SOURDUN",
    "postal_code": "459",
    "latitude": 48.53680351,
    "longitude": 3.35043286,
    "id": 1078
  },
  {
    "label": "Mairie de COURCELLES-EN-BASSEE",
    "address": "\u00cele-de-France - COURCELLES-EN-BASSEE",
    "city": "COURCELLES-EN-BASSEE",
    "postal_code": "133",
    "latitude": 48.4095028,
    "longitude": 3.05491938,
    "id": 1079
  },
  {
    "label": "Mairie de FLEURY-EN-BIERE",
    "address": "\u00cele-de-France - FLEURY-EN-BIERE",
    "city": "FLEURY-EN-BIERE",
    "postal_code": "185",
    "latitude": 48.44745616,
    "longitude": 2.54867381,
    "id": 1080
  },
  {
    "label": "Mairie de MAREUIL-LES-MEAUX",
    "address": "\u00cele-de-France - MAREUIL-LES-MEAUX",
    "city": "MAREUIL-LES-MEAUX",
    "postal_code": "276",
    "latitude": 48.92738869,
    "longitude": 2.86023513,
    "id": 1081
  },
  {
    "label": "Mairie de MONTCOURT-FROMONVILLE",
    "address": "\u00cele-de-France - MONTCOURT-FROMONVILLE",
    "city": "MONTCOURT-FROMONVILLE",
    "postal_code": "302",
    "latitude": 48.30502575,
    "longitude": 2.7030838299999997,
    "id": 1082
  },
  {
    "label": "Mairie de VAUX-LE-PENIL",
    "address": "\u00cele-de-France - VAUX-LE-PENIL",
    "city": "VAUX-LE-PENIL",
    "postal_code": "487",
    "latitude": 48.52625564,
    "longitude": 2.68162607,
    "id": 1083
  },
  {
    "label": "Mairie de CHAPET",
    "address": "\u00cele-de-France - CHAPET",
    "city": "CHAPET",
    "postal_code": "140",
    "latitude": 48.96649662,
    "longitude": 1.93385604,
    "id": 1084
  },
  {
    "label": "Mairie de FRENEUSE",
    "address": "\u00cele-de-France - FRENEUSE",
    "city": "FRENEUSE",
    "postal_code": "255",
    "latitude": 49.04758553,
    "longitude": 1.60102214,
    "id": 1085
  },
  {
    "label": "Mairie de MARCQ",
    "address": "\u00cele-de-France - MARCQ",
    "city": "MARCQ",
    "postal_code": "364",
    "latitude": 48.85910502,
    "longitude": 1.81891297,
    "id": 1086
  },
  {
    "label": "Mairie de ROSAY",
    "address": "\u00cele-de-France - ROSAY",
    "city": "ROSAY",
    "postal_code": "530",
    "latitude": 48.9168267,
    "longitude": 1.67788131,
    "id": 1087
  },
  {
    "label": "Mairie de SAINT-GERMAIN-DE-LA-GRANGE",
    "address": "\u00cele-de-France - SAINT-GERMAIN-DE-LA-GRANGE",
    "city": "SAINT-GERMAIN-DE-LA-GRANGE",
    "postal_code": "550",
    "latitude": 48.83336424,
    "longitude": 1.89949421,
    "id": 1088
  },
  {
    "label": "Mairie de VERSAILLES",
    "address": "\u00cele-de-France - VERSAILLES",
    "city": "VERSAILLES",
    "postal_code": "646",
    "latitude": 48.80433562,
    "longitude": 2.1337709,
    "id": 1089
  },
  {
    "label": "Mairie de MORIGNY-CHAMPIGNY",
    "address": "\u00cele-de-France - MORIGNY-CHAMPIGNY",
    "city": "MORIGNY-CHAMPIGNY",
    "postal_code": "433",
    "latitude": 48.44664668,
    "longitude": 2.18381099,
    "id": 1090
  },
  {
    "label": "Mairie de L'HAY-LES-ROSES",
    "address": "\u00cele-de-France - L'HAY-LES-ROSES",
    "city": "L'HAY-LES-ROSES",
    "postal_code": "38",
    "latitude": 48.77934349,
    "longitude": 2.33786667,
    "id": 1091
  },
  {
    "label": "Mairie de LABBEVILLE",
    "address": "\u00cele-de-France - LABBEVILLE",
    "city": "LABBEVILLE",
    "postal_code": "328",
    "latitude": 49.13505876,
    "longitude": 2.14342115,
    "id": 1092
  },
  {
    "label": "Mairie de AVON",
    "address": "\u00cele-de-France - AVON",
    "city": "AVON",
    "postal_code": "14",
    "latitude": 48.40924794,
    "longitude": 2.72541852,
    "id": 1093
  },
  {
    "label": "Mairie de BOITRON",
    "address": "\u00cele-de-France - BOITRON",
    "city": "BOITRON",
    "postal_code": "43",
    "latitude": 48.89799752,
    "longitude": 3.26070676,
    "id": 1094
  },
  {
    "label": "Mairie de CHARNY",
    "address": "\u00cele-de-France - CHARNY",
    "city": "CHARNY",
    "postal_code": "95",
    "latitude": 48.97091455,
    "longitude": 2.76239188,
    "id": 1095
  },
  {
    "label": "Mairie de MONTREUIL",
    "address": "\u00cele-de-France - MONTREUIL",
    "city": "MONTREUIL",
    "postal_code": "48",
    "latitude": 48.86018607,
    "longitude": 2.44274968,
    "id": 1096
  },
  {
    "label": "Mairie de NOISY-LE-GRAND",
    "address": "\u00cele-de-France - NOISY-LE-GRAND",
    "city": "NOISY-LE-GRAND",
    "postal_code": "51",
    "latitude": 48.84384989,
    "longitude": 2.55845913,
    "id": 1097
  },
  {
    "label": "Mairie de COURCELLES-SUR-VIOSNE",
    "address": "\u00cele-de-France - COURCELLES-SUR-VIOSNE",
    "city": "COURCELLES-SUR-VIOSNE",
    "postal_code": "181",
    "latitude": 49.07813538,
    "longitude": 2.00137728,
    "id": 1098
  },
  {
    "label": "Mairie de VILLIERS-SUR-SEINE",
    "address": "\u00cele-de-France - VILLIERS-SUR-SEINE",
    "city": "VILLIERS-SUR-SEINE",
    "postal_code": "522",
    "latitude": 48.45567869,
    "longitude": 3.37454246,
    "id": 1099
  },
  {
    "label": "Mairie de CHEPTAINVILLE",
    "address": "\u00cele-de-France - CHEPTAINVILLE",
    "city": "CHEPTAINVILLE",
    "postal_code": "156",
    "latitude": 48.55010918,
    "longitude": 2.26745546,
    "id": 1100
  },
  {
    "label": "Mairie de SAINT-MICHEL-SUR-ORGE",
    "address": "\u00cele-de-France - SAINT-MICHEL-SUR-ORGE",
    "city": "SAINT-MICHEL-SUR-ORGE",
    "postal_code": "570",
    "latitude": 48.632825940000004,
    "longitude": 2.30260479,
    "id": 1101
  },
  {
    "label": "Mairie de BETON-BAZOCHES",
    "address": "\u00cele-de-France - BETON-BAZOCHES",
    "city": "BETON-BAZOCHES",
    "postal_code": "32",
    "latitude": 48.70128177,
    "longitude": 3.2436343,
    "id": 1102
  },
  {
    "label": "Mairie de CHATENAY-SUR-SEINE",
    "address": "\u00cele-de-France - CHATENAY-SUR-SEINE",
    "city": "CHATENAY-SUR-SEINE",
    "postal_code": "101",
    "latitude": 48.41824822,
    "longitude": 3.09420838,
    "id": 1103
  },
  {
    "label": "Mairie de MONTENILS",
    "address": "\u00cele-de-France - MONTENILS",
    "city": "MONTENILS",
    "postal_code": "304",
    "latitude": 48.84219028,
    "longitude": 3.47759325,
    "id": 1104
  },
  {
    "label": "Mairie de MOUSSY-LE-NEUF",
    "address": "\u00cele-de-France - MOUSSY-LE-NEUF",
    "city": "MOUSSY-LE-NEUF",
    "postal_code": "322",
    "latitude": 49.0630354,
    "longitude": 2.6031565,
    "id": 1105
  },
  {
    "label": "Mairie de OTHIS",
    "address": "\u00cele-de-France - OTHIS",
    "city": "OTHIS",
    "postal_code": "349",
    "latitude": 49.07632705,
    "longitude": 2.6770869900000003,
    "id": 1106
  },
  {
    "label": "Mairie de BEAUMONT-SUR-OISE",
    "address": "\u00cele-de-France - BEAUMONT-SUR-OISE",
    "city": "BEAUMONT-SUR-OISE",
    "postal_code": "52",
    "latitude": 49.14239276,
    "longitude": 2.28582778,
    "id": 1107
  },
  {
    "label": "Mairie de BUTRY-SUR-OISE",
    "address": "\u00cele-de-France - BUTRY-SUR-OISE",
    "city": "BUTRY-SUR-OISE",
    "postal_code": "120",
    "latitude": 49.08661332,
    "longitude": 2.19832629,
    "id": 1108
  },
  {
    "label": "Mairie de NEUILLY-EN-VEXIN",
    "address": "\u00cele-de-France - NEUILLY-EN-VEXIN",
    "city": "NEUILLY-EN-VEXIN",
    "postal_code": "447",
    "latitude": 49.16881515,
    "longitude": 1.9761214200000001,
    "id": 1109
  },
  {
    "label": "Mairie de BOISSETTES",
    "address": "\u00cele-de-France - BOISSETTES",
    "city": "BOISSETTES",
    "postal_code": "38",
    "latitude": 48.52015301,
    "longitude": 2.60851069,
    "id": 1110
  },
  {
    "label": "Mairie de CHAILLY-EN-BRIE",
    "address": "\u00cele-de-France - CHAILLY-EN-BRIE",
    "city": "CHAILLY-EN-BRIE",
    "postal_code": "70",
    "latitude": 48.79023193,
    "longitude": 3.12275537,
    "id": 1111
  },
  {
    "label": "Mairie de LA CHAPELLE-SAINT-SULPICE",
    "address": "\u00cele-de-France - LA CHAPELLE-SAINT-SULPICE",
    "city": "LA CHAPELLE-SAINT-SULPICE",
    "postal_code": "90",
    "latitude": 48.55433062,
    "longitude": 3.17878807,
    "id": 1112
  },
  {
    "label": "Mairie de MORMANT",
    "address": "\u00cele-de-France - MORMANT",
    "city": "MORMANT",
    "postal_code": "317",
    "latitude": 48.60727363,
    "longitude": 2.88955544,
    "id": 1113
  },
  {
    "label": "Mairie de TOUQUIN",
    "address": "\u00cele-de-France - TOUQUIN",
    "city": "TOUQUIN",
    "postal_code": "469",
    "latitude": 48.73607536,
    "longitude": 3.01322418,
    "id": 1114
  },
  {
    "label": "Mairie de CHEVREUSE",
    "address": "\u00cele-de-France - CHEVREUSE",
    "city": "CHEVREUSE",
    "postal_code": "160",
    "latitude": 48.7079621,
    "longitude": 2.03907914,
    "id": 1115
  },
  {
    "label": "Mairie de DAVRON",
    "address": "\u00cele-de-France - DAVRON",
    "city": "DAVRON",
    "postal_code": "196",
    "latitude": 48.86588444,
    "longitude": 1.9468992200000002,
    "id": 1116
  },
  {
    "label": "Mairie de ECQUEVILLY",
    "address": "\u00cele-de-France - ECQUEVILLY",
    "city": "ECQUEVILLY",
    "postal_code": "206",
    "latitude": 48.95027869,
    "longitude": 1.92170198,
    "id": 1117
  },
  {
    "label": "Mairie de VERNEUIL-SUR-SEINE",
    "address": "\u00cele-de-France - VERNEUIL-SUR-SEINE",
    "city": "VERNEUIL-SUR-SEINE",
    "postal_code": "642",
    "latitude": 48.98010352,
    "longitude": 1.97334299,
    "id": 1118
  },
  {
    "label": "Mairie de BROUY",
    "address": "\u00cele-de-France - BROUY",
    "city": "BROUY",
    "postal_code": "112",
    "latitude": 48.31726742,
    "longitude": 2.27854943,
    "id": 1119
  },
  {
    "label": "Mairie de BURES-SUR-YVETTE",
    "address": "\u00cele-de-France - BURES-SUR-YVETTE",
    "city": "BURES-SUR-YVETTE",
    "postal_code": "122",
    "latitude": 48.69652104,
    "longitude": 2.16134902,
    "id": 1120
  },
  {
    "label": "Mairie de HERBLAY",
    "address": "\u00cele-de-France - HERBLAY",
    "city": "HERBLAY",
    "postal_code": "306",
    "latitude": 48.99042011,
    "longitude": 2.1658118,
    "id": 1121
  },
  {
    "label": "Mairie de LE PERCHAY",
    "address": "\u00cele-de-France - LE PERCHAY",
    "city": "LE PERCHAY",
    "postal_code": "483",
    "latitude": 49.11117018,
    "longitude": 1.93272504,
    "id": 1122
  },
  {
    "label": "Mairie de DIANT",
    "address": "\u00cele-de-France - DIANT",
    "city": "DIANT",
    "postal_code": "158",
    "latitude": 48.28129274,
    "longitude": 2.99254484,
    "id": 1123
  },
  {
    "label": "Mairie de EPISY",
    "address": "\u00cele-de-France - EPISY",
    "city": "EPISY",
    "postal_code": "170",
    "latitude": 48.33441142,
    "longitude": 2.78554468,
    "id": 1124
  },
  {
    "label": "Mairie de GOUVERNES",
    "address": "\u00cele-de-France - GOUVERNES",
    "city": "GOUVERNES",
    "postal_code": "209",
    "latitude": 48.86059918,
    "longitude": 2.6933808900000002,
    "id": 1125
  },
  {
    "label": "Mairie de LIZINES",
    "address": "\u00cele-de-France - LIZINES",
    "city": "LIZINES",
    "postal_code": "256",
    "latitude": 48.52737298,
    "longitude": 3.17700001,
    "id": 1126
  },
  {
    "label": "Mairie de MONTIGNY-LENCOUP",
    "address": "\u00cele-de-France - MONTIGNY-LENCOUP",
    "city": "MONTIGNY-LENCOUP",
    "postal_code": "311",
    "latitude": 48.45260478,
    "longitude": 3.06362028,
    "id": 1127
  },
  {
    "label": "Mairie de SAINT-OUEN-SUR-MORIN",
    "address": "\u00cele-de-France - SAINT-OUEN-SUR-MORIN",
    "city": "SAINT-OUEN-SUR-MORIN",
    "postal_code": "429",
    "latitude": 48.90477698,
    "longitude": 3.19538611,
    "id": 1128
  },
  {
    "label": "Mairie de VAYRES-SUR-ESSONNE",
    "address": "\u00cele-de-France - VAYRES-SUR-ESSONNE",
    "city": "VAYRES-SUR-ESSONNE",
    "postal_code": "639",
    "latitude": 48.43235986,
    "longitude": 2.35947796,
    "id": 1129
  },
  {
    "label": "Mairie de TAVERNY",
    "address": "\u00cele-de-France - TAVERNY",
    "city": "TAVERNY",
    "postal_code": "607",
    "latitude": 49.02553903,
    "longitude": 2.22718618,
    "id": 1130
  },
  {
    "label": "Mairie de YEBLES",
    "address": "\u00cele-de-France - YEBLES",
    "city": "YEBLES",
    "postal_code": "534",
    "latitude": 48.63743292,
    "longitude": 2.77052026,
    "id": 1131
  },
  {
    "label": "Mairie de ANDRESY",
    "address": "\u00cele-de-France - ANDRESY",
    "city": "ANDRESY",
    "postal_code": "15",
    "latitude": 48.98033148,
    "longitude": 2.05798867,
    "id": 1132
  },
  {
    "label": "Mairie de JUVISY-SUR-ORGE",
    "address": "\u00cele-de-France - JUVISY-SUR-ORGE",
    "city": "JUVISY-SUR-ORGE",
    "postal_code": "326",
    "latitude": 48.68855488,
    "longitude": 2.37723633,
    "id": 1133
  },
  {
    "label": "Mairie de VILLE-D'AVRAY",
    "address": "\u00cele-de-France - VILLE-D'AVRAY",
    "city": "VILLE-D'AVRAY",
    "postal_code": "77",
    "latitude": 48.82599346,
    "longitude": 2.19357922,
    "id": 1134
  },
  {
    "label": "Mairie de THIAIS",
    "address": "\u00cele-de-France - THIAIS",
    "city": "THIAIS",
    "postal_code": "73",
    "latitude": 48.76405172,
    "longitude": 2.39089027,
    "id": 1135
  },
  {
    "label": "Mairie de LOUVRES",
    "address": "\u00cele-de-France - LOUVRES",
    "city": "LOUVRES",
    "postal_code": "351",
    "latitude": 49.04434333,
    "longitude": 2.5046389,
    "id": 1136
  },
  {
    "label": "Mairie de BOURRON-MARLOTTE",
    "address": "\u00cele-de-France - BOURRON-MARLOTTE",
    "city": "BOURRON-MARLOTTE",
    "postal_code": "48",
    "latitude": 48.34097642,
    "longitude": 2.70738069,
    "id": 1137
  },
  {
    "label": "Mairie de COURCHAMP",
    "address": "\u00cele-de-France - COURCHAMP",
    "city": "COURCHAMP",
    "postal_code": "134",
    "latitude": 48.63621697,
    "longitude": 3.28726144,
    "id": 1138
  },
  {
    "label": "Mairie de LES CHAPELLES-BOURBON",
    "address": "\u00cele-de-France - LES CHAPELLES-BOURBON",
    "city": "LES CHAPELLES-BOURBON",
    "postal_code": "91",
    "latitude": 48.74142005,
    "longitude": 2.84205579,
    "id": 1139
  },
  {
    "label": "Mairie de MAY-EN-MULTIEN",
    "address": "\u00cele-de-France - MAY-EN-MULTIEN",
    "city": "MAY-EN-MULTIEN",
    "postal_code": "283",
    "latitude": 49.07215587,
    "longitude": 3.02172627,
    "id": 1140
  },
  {
    "label": "Mairie de NEMOURS",
    "address": "\u00cele-de-France - NEMOURS",
    "city": "NEMOURS",
    "postal_code": "333",
    "latitude": 48.26909051,
    "longitude": 2.69340589,
    "id": 1141
  },
  {
    "label": "Mairie de SAINT-CYR-SUR-MORIN",
    "address": "\u00cele-de-France - SAINT-CYR-SUR-MORIN",
    "city": "SAINT-CYR-SUR-MORIN",
    "postal_code": "405",
    "latitude": 48.90576331,
    "longitude": 3.18313201,
    "id": 1142
  },
  {
    "label": "Mairie de URY",
    "address": "\u00cele-de-France - URY",
    "city": "URY",
    "postal_code": "477",
    "latitude": 48.34305485,
    "longitude": 2.60354779,
    "id": 1143
  },
  {
    "label": "Mairie de AUFFREVILLE-BRASSEUIL",
    "address": "\u00cele-de-France - AUFFREVILLE-BRASSEUIL",
    "city": "AUFFREVILLE-BRASSEUIL",
    "postal_code": "31",
    "latitude": 48.95384806,
    "longitude": 1.71016046,
    "id": 1144
  },
  {
    "label": "Mairie de BOINVILLE-EN-MANTOIS",
    "address": "\u00cele-de-France - BOINVILLE-EN-MANTOIS",
    "city": "BOINVILLE-EN-MANTOIS",
    "postal_code": "70",
    "latitude": 48.93071779,
    "longitude": 1.75681654,
    "id": 1145
  },
  {
    "label": "Mairie de BOISSETS",
    "address": "\u00cele-de-France - BOISSETS",
    "city": "BOISSETS",
    "postal_code": "76",
    "latitude": 48.8614414,
    "longitude": 1.58323209,
    "id": 1146
  },
  {
    "label": "Mairie de LIMAY",
    "address": "\u00cele-de-France - LIMAY",
    "city": "LIMAY",
    "postal_code": "335",
    "latitude": 48.99352117,
    "longitude": 1.73562693,
    "id": 1147
  },
  {
    "label": "Mairie de SAINT-ILLIERS-LE-BOIS",
    "address": "\u00cele-de-France - SAINT-ILLIERS-LE-BOIS",
    "city": "SAINT-ILLIERS-LE-BOIS",
    "postal_code": "559",
    "latitude": 48.95799828,
    "longitude": 1.5067643400000001,
    "id": 1148
  },
  {
    "label": "Mairie de VILLENNES-SUR-SEINE",
    "address": "\u00cele-de-France - VILLENNES-SUR-SEINE",
    "city": "VILLENNES-SUR-SEINE",
    "postal_code": "672",
    "latitude": 48.9388376,
    "longitude": 1.9981883900000001,
    "id": 1149
  },
  {
    "label": "Mairie de FONTENAY-LES-BRIIS",
    "address": "\u00cele-de-France - FONTENAY-LES-BRIIS",
    "city": "FONTENAY-LES-BRIIS",
    "postal_code": "243",
    "latitude": 48.62010808,
    "longitude": 2.15618364,
    "id": 1150
  },
  {
    "label": "Mairie de SAINT-VRAIN",
    "address": "\u00cele-de-France - SAINT-VRAIN",
    "city": "SAINT-VRAIN",
    "postal_code": "579",
    "latitude": 48.54114017,
    "longitude": 2.3351563,
    "id": 1151
  },
  {
    "label": "Mairie de MEUDON",
    "address": "\u00cele-de-France - MEUDON",
    "city": "MEUDON",
    "postal_code": "48",
    "latitude": 48.80716612,
    "longitude": 2.23989563,
    "id": 1152
  },
  {
    "label": "Mairie de CLAYE-SOUILLY",
    "address": "\u00cele-de-France - CLAYE-SOUILLY",
    "city": "CLAYE-SOUILLY",
    "postal_code": "118",
    "latitude": 48.94509718,
    "longitude": 2.68714036,
    "id": 1153
  },
  {
    "label": "Mairie de LE MESNIL-AMELOT",
    "address": "\u00cele-de-France - LE MESNIL-AMELOT",
    "city": "LE MESNIL-AMELOT",
    "postal_code": "291",
    "latitude": 49.01902786,
    "longitude": 2.59199976,
    "id": 1154
  },
  {
    "label": "Mairie de NANDY",
    "address": "\u00cele-de-France - NANDY",
    "city": "NANDY",
    "postal_code": "326",
    "latitude": 48.58406709,
    "longitude": 2.56684131,
    "id": 1155
  },
  {
    "label": "Mairie de SAINTE-COLOMBE",
    "address": "\u00cele-de-France - SAINTE-COLOMBE",
    "city": "SAINTE-COLOMBE",
    "postal_code": "404",
    "latitude": 48.53572622,
    "longitude": 3.2624188800000002,
    "id": 1156
  },
  {
    "label": "Mairie de SAINT-GERMAIN-LAVAL",
    "address": "\u00cele-de-France - SAINT-GERMAIN-LAVAL",
    "city": "SAINT-GERMAIN-LAVAL",
    "postal_code": "409",
    "latitude": 48.39905335,
    "longitude": 2.9967195,
    "id": 1157
  },
  {
    "label": "Mairie de DAMMARTIN-EN-SERVE",
    "address": "\u00cele-de-France - DAMMARTIN-EN-SERVE",
    "city": "DAMMARTIN-EN-SERVE",
    "postal_code": "192",
    "latitude": 48.9030081,
    "longitude": 1.6194360300000001,
    "id": 1158
  },
  {
    "label": "Mairie de FLINS-NEUVE-EGLISE",
    "address": "\u00cele-de-France - FLINS-NEUVE-EGLISE",
    "city": "FLINS-NEUVE-EGLISE",
    "postal_code": "237",
    "latitude": 48.89107213,
    "longitude": 1.57871207,
    "id": 1159
  },
  {
    "label": "Mairie de GRANDCHAMP",
    "address": "\u00cele-de-France - GRANDCHAMP",
    "city": "GRANDCHAMP",
    "postal_code": "283",
    "latitude": 48.7078566,
    "longitude": 1.60175662,
    "id": 1160
  },
  {
    "label": "Mairie de LA QUEUE-LES-YVELINES",
    "address": "\u00cele-de-France - LA QUEUE-LES-YVELINES",
    "city": "LA QUEUE-LES-YVELINES",
    "postal_code": "513",
    "latitude": 48.8049508,
    "longitude": 1.7691082200000001,
    "id": 1161
  },
  {
    "label": "Mairie de SARTROUVILLE",
    "address": "\u00cele-de-France - SARTROUVILLE",
    "city": "SARTROUVILLE",
    "postal_code": "586",
    "latitude": 48.94549301,
    "longitude": 2.17005364,
    "id": 1162
  },
  {
    "label": "Mairie de LA GARENNE-COLOMBES",
    "address": "\u00cele-de-France - LA GARENNE-COLOMBES",
    "city": "LA GARENNE-COLOMBES",
    "postal_code": "35",
    "latitude": 48.90513237,
    "longitude": 2.24380142,
    "id": 1163
  },
  {
    "label": "Mairie de BRAY-ET-LU",
    "address": "\u00cele-de-France - BRAY-ET-LU",
    "city": "BRAY-ET-LU",
    "postal_code": "101",
    "latitude": 49.13959843,
    "longitude": 1.6613377599999999,
    "id": 1164
  },
  {
    "label": "Mairie de VILLERON",
    "address": "\u00cele-de-France - VILLERON",
    "city": "VILLERON",
    "postal_code": "675",
    "latitude": 49.05776251,
    "longitude": 2.54296728,
    "id": 1165
  },
  {
    "label": "Mairie de VILLIERS-ADAM",
    "address": "\u00cele-de-France - VILLIERS-ADAM",
    "city": "VILLIERS-ADAM",
    "postal_code": "678",
    "latitude": 49.06508469,
    "longitude": 2.23530696,
    "id": 1166
  },
  {
    "label": "Mairie de MELUN",
    "address": "\u00cele-de-France - MELUN",
    "city": "MELUN",
    "postal_code": "288",
    "latitude": 48.53980472,
    "longitude": 2.65870164,
    "id": 1167
  },
  {
    "label": "Mairie de CHELLES",
    "address": "\u00cele-de-France - CHELLES",
    "city": "CHELLES",
    "postal_code": "108",
    "latitude": 48.87884115,
    "longitude": 2.58858564,
    "id": 1168
  },
  {
    "label": "Mairie de LES LILAS",
    "address": "\u00cele-de-France - LES LILAS",
    "city": "LES LILAS",
    "postal_code": "45",
    "latitude": 48.8799783,
    "longitude": 2.41690008,
    "id": 1169
  },
  {
    "label": "Mairie de GENAINVILLE",
    "address": "\u00cele-de-France - GENAINVILLE",
    "city": "GENAINVILLE",
    "postal_code": "270",
    "latitude": 49.12569821,
    "longitude": 1.75188437,
    "id": 1170
  },
  {
    "label": "Mairie de VETHEUIL",
    "address": "\u00cele-de-France - VETHEUIL",
    "city": "VETHEUIL",
    "postal_code": "651",
    "latitude": 49.06344843,
    "longitude": 1.70335974,
    "id": 1171
  },
  {
    "label": "Mairie de COUTEVROULT",
    "address": "\u00cele-de-France - COUTEVROULT",
    "city": "COUTEVROULT",
    "postal_code": "141",
    "latitude": 48.8627123,
    "longitude": 2.85277185,
    "id": 1172
  },
  {
    "label": "Mairie de CREGY-LES-MEAUX",
    "address": "\u00cele-de-France - CREGY-LES-MEAUX",
    "city": "CREGY-LES-MEAUX",
    "postal_code": "143",
    "latitude": 48.97853271,
    "longitude": 2.87850038,
    "id": 1173
  },
  {
    "label": "Mairie de MARLES-EN-BRIE",
    "address": "\u00cele-de-France - MARLES-EN-BRIE",
    "city": "MARLES-EN-BRIE",
    "postal_code": "277",
    "latitude": 48.72777019,
    "longitude": 2.87996591,
    "id": 1174
  },
  {
    "label": "Mairie de BAZAINVILLE",
    "address": "\u00cele-de-France - BAZAINVILLE",
    "city": "BAZAINVILLE",
    "postal_code": "48",
    "latitude": 48.80442745,
    "longitude": 1.66842337,
    "id": 1175
  },
  {
    "label": "Mairie de FLEXANVILLE",
    "address": "\u00cele-de-France - FLEXANVILLE",
    "city": "FLEXANVILLE",
    "postal_code": "236",
    "latitude": 48.85422778,
    "longitude": 1.7372427799999999,
    "id": 1176
  },
  {
    "label": "Mairie de ORVILLIERS",
    "address": "\u00cele-de-France - ORVILLIERS",
    "city": "ORVILLIERS",
    "postal_code": "474",
    "latitude": 48.85910956,
    "longitude": 1.64319988,
    "id": 1177
  },
  {
    "label": "Mairie de AUVERS-SAINT-GEORGES",
    "address": "\u00cele-de-France - AUVERS-SAINT-GEORGES",
    "city": "AUVERS-SAINT-GEORGES",
    "postal_code": "38",
    "latitude": 48.49253626,
    "longitude": 2.21884172,
    "id": 1178
  },
  {
    "label": "Mairie de SAINT-JEAN-DE-BEAUREGARD",
    "address": "\u00cele-de-France - SAINT-JEAN-DE-BEAUREGARD",
    "city": "SAINT-JEAN-DE-BEAUREGARD",
    "postal_code": "560",
    "latitude": 48.66327287,
    "longitude": 2.16824613,
    "id": 1179
  },
  {
    "label": "Mairie de MARINES",
    "address": "\u00cele-de-France - MARINES",
    "city": "MARINES",
    "postal_code": "370",
    "latitude": 49.14457603,
    "longitude": 1.98313933,
    "id": 1180
  },
  {
    "label": "Mairie de PARMAIN",
    "address": "\u00cele-de-France - PARMAIN",
    "city": "PARMAIN",
    "postal_code": "480",
    "latitude": 49.11448076,
    "longitude": 2.20920181,
    "id": 1181
  },
  {
    "label": "Mairie de SAINT-CYR-EN-ARTHIES",
    "address": "\u00cele-de-France - SAINT-CYR-EN-ARTHIES",
    "city": "SAINT-CYR-EN-ARTHIES",
    "postal_code": "543",
    "latitude": 49.05825384,
    "longitude": 1.7417098100000001,
    "id": 1182
  },
  {
    "label": "Mairie de AUFFARGIS",
    "address": "\u00cele-de-France - AUFFARGIS",
    "city": "AUFFARGIS",
    "postal_code": "30",
    "latitude": 48.70029209,
    "longitude": 1.88703456,
    "id": 1183
  },
  {
    "label": "Mairie de BENNECOURT",
    "address": "\u00cele-de-France - BENNECOURT",
    "city": "BENNECOURT",
    "postal_code": "57",
    "latitude": 49.0401464,
    "longitude": 1.56148773,
    "id": 1184
  },
  {
    "label": "Mairie de LE PECQ",
    "address": "\u00cele-de-France - LE PECQ",
    "city": "LE PECQ",
    "postal_code": "481",
    "latitude": 48.89685657,
    "longitude": 2.10614616,
    "id": 1185
  },
  {
    "label": "Mairie de NEZEL",
    "address": "\u00cele-de-France - NEZEL",
    "city": "NEZEL",
    "postal_code": "451",
    "latitude": 48.94455645,
    "longitude": 1.83579405,
    "id": 1186
  },
  {
    "label": "Mairie de SAINT-LAMBERT",
    "address": "\u00cele-de-France - SAINT-LAMBERT",
    "city": "SAINT-LAMBERT",
    "postal_code": "561",
    "latitude": 48.73218495,
    "longitude": 2.02127634,
    "id": 1187
  },
  {
    "label": "Mairie de SAINT-MARTIN-DE-BRETHENCOURT",
    "address": "\u00cele-de-France - SAINT-MARTIN-DE-BRETHENCOURT",
    "city": "SAINT-MARTIN-DE-BRETHENCOURT",
    "postal_code": "564",
    "latitude": 48.509867,
    "longitude": 1.9279129,
    "id": 1188
  },
  {
    "label": "Mairie de MAUCHAMPS",
    "address": "\u00cele-de-France - MAUCHAMPS",
    "city": "MAUCHAMPS",
    "postal_code": "378",
    "latitude": 48.5302664,
    "longitude": 2.1943932,
    "id": 1189
  },
  {
    "label": "Mairie de BOUQUEVAL",
    "address": "\u00cele-de-France - BOUQUEVAL",
    "city": "BOUQUEVAL",
    "postal_code": "94",
    "latitude": 49.02376003,
    "longitude": 2.4253201,
    "id": 1190
  },
  {
    "label": "Mairie de FREMAINVILLE",
    "address": "\u00cele-de-France - FREMAINVILLE",
    "city": "FREMAINVILLE",
    "postal_code": "253",
    "latitude": 49.06599727,
    "longitude": 1.86606878,
    "id": 1191
  },
  {
    "label": "Mairie de MAGNY-EN-VEXIN",
    "address": "\u00cele-de-France - MAGNY-EN-VEXIN",
    "city": "MAGNY-EN-VEXIN",
    "postal_code": "355",
    "latitude": 49.15461901,
    "longitude": 1.78717386,
    "id": 1192
  },
  {
    "label": "Mairie de ARBONNE-LA-FORET",
    "address": "\u00cele-de-France - ARBONNE-LA-FORET",
    "city": "ARBONNE-LA-FORET",
    "postal_code": "6",
    "latitude": 48.41326309,
    "longitude": 2.56474133,
    "id": 1193
  },
  {
    "label": "Mairie de BARBEY",
    "address": "\u00cele-de-France - BARBEY",
    "city": "BARBEY",
    "postal_code": "21",
    "latitude": 48.36545097,
    "longitude": 3.05431573,
    "id": 1194
  },
  {
    "label": "Mairie de FORFRY",
    "address": "\u00cele-de-France - FORFRY",
    "city": "FORFRY",
    "postal_code": "193",
    "latitude": 49.05774795,
    "longitude": 2.84788148,
    "id": 1195
  },
  {
    "label": "Mairie de BAZOCHES-SUR-GUYONNE",
    "address": "\u00cele-de-France - BAZOCHES-SUR-GUYONNE",
    "city": "BAZOCHES-SUR-GUYONNE",
    "postal_code": "50",
    "latitude": 48.77838796,
    "longitude": 1.86051804,
    "id": 1196
  },
  {
    "label": "Mairie de BOISSY-SANS-AVOIR",
    "address": "\u00cele-de-France - BOISSY-SANS-AVOIR",
    "city": "BOISSY-SANS-AVOIR",
    "postal_code": "84",
    "latitude": 48.82034403,
    "longitude": 1.7934393800000001,
    "id": 1197
  },
  {
    "label": "Mairie de CARRIERES-SUR-SEINE",
    "address": "\u00cele-de-France - CARRIERES-SUR-SEINE",
    "city": "CARRIERES-SUR-SEINE",
    "postal_code": "124",
    "latitude": 48.90775923,
    "longitude": 2.17835556,
    "id": 1198
  },
  {
    "label": "Mairie de CHATOU",
    "address": "\u00cele-de-France - CHATOU",
    "city": "CHATOU",
    "postal_code": "146",
    "latitude": 48.89065268,
    "longitude": 2.15660148,
    "id": 1199
  },
  {
    "label": "Mairie de ROLLEBOISE",
    "address": "\u00cele-de-France - ROLLEBOISE",
    "city": "ROLLEBOISE",
    "postal_code": "528",
    "latitude": 49.01886479,
    "longitude": 1.60689657,
    "id": 1200
  },
  {
    "label": "Mairie de SAINT-CYR-L'ECOLE",
    "address": "\u00cele-de-France - SAINT-CYR-L'ECOLE",
    "city": "SAINT-CYR-L'ECOLE",
    "postal_code": "545",
    "latitude": 48.80059848,
    "longitude": 2.06303708,
    "id": 1201
  },
  {
    "label": "Mairie de FONTAINE-LA-RIVIERE",
    "address": "\u00cele-de-France - FONTAINE-LA-RIVIERE",
    "city": "FONTAINE-LA-RIVIERE",
    "postal_code": "240",
    "latitude": 48.35580301,
    "longitude": 2.1557483,
    "id": 1202
  },
  {
    "label": "Mairie de BAGNEUX",
    "address": "\u00cele-de-France - BAGNEUX",
    "city": "BAGNEUX",
    "postal_code": "7",
    "latitude": 48.79821545,
    "longitude": 2.3120178,
    "id": 1203
  },
  {
    "label": "Mairie de MAREIL-EN-FRANCE",
    "address": "\u00cele-de-France - MAREIL-EN-FRANCE",
    "city": "MAREIL-EN-FRANCE",
    "postal_code": "365",
    "latitude": 49.06958858,
    "longitude": 2.42539825,
    "id": 1204
  },
  {
    "label": "Mairie de BANNOST-VILLEGAGNON",
    "address": "\u00cele-de-France - BANNOST-VILLEGAGNON",
    "city": "BANNOST-VILLEGAGNON",
    "postal_code": "20",
    "latitude": 48.67829544,
    "longitude": 3.19165169,
    "id": 1205
  },
  {
    "label": "Mairie de BOISSY-LE-CHATEL",
    "address": "\u00cele-de-France - BOISSY-LE-CHATEL",
    "city": "BOISSY-LE-CHATEL",
    "postal_code": "42",
    "latitude": 48.82249572,
    "longitude": 3.13685553,
    "id": 1206
  },
  {
    "label": "Mairie de FONTAINE-FOURCHES",
    "address": "\u00cele-de-France - FONTAINE-FOURCHES",
    "city": "FONTAINE-FOURCHES",
    "postal_code": "187",
    "latitude": 48.41415962,
    "longitude": 3.39262786,
    "id": 1207
  },
  {
    "label": "Mairie de FORGES",
    "address": "\u00cele-de-France - FORGES",
    "city": "FORGES",
    "postal_code": "194",
    "latitude": 48.41902969,
    "longitude": 2.96050343,
    "id": 1208
  },
  {
    "label": "Mairie de GRETZ-ARMAINVILLIERS",
    "address": "\u00cele-de-France - GRETZ-ARMAINVILLIERS",
    "city": "GRETZ-ARMAINVILLIERS",
    "postal_code": "215",
    "latitude": 48.74092879,
    "longitude": 2.73468987,
    "id": 1209
  },
  {
    "label": "Mairie de HONDEVILLIERS",
    "address": "\u00cele-de-France - HONDEVILLIERS",
    "city": "HONDEVILLIERS",
    "postal_code": "228",
    "latitude": 48.89940459,
    "longitude": 3.30980828,
    "id": 1210
  },
  {
    "label": "Mairie de LIMOGES-FOURCHES",
    "address": "\u00cele-de-France - LIMOGES-FOURCHES",
    "city": "LIMOGES-FOURCHES",
    "postal_code": "252",
    "latitude": 48.62788068,
    "longitude": 2.6660252399999997,
    "id": 1211
  },
  {
    "label": "Mairie de CONGIS-SUR-THEROUANNE",
    "address": "\u00cele-de-France - CONGIS-SUR-THEROUANNE",
    "city": "CONGIS-SUR-THEROUANNE",
    "postal_code": "126",
    "latitude": 49.00680958,
    "longitude": 2.9757827199999998,
    "id": 1212
  },
  {
    "label": "Mairie de QUINCY-VOISINS",
    "address": "\u00cele-de-France - QUINCY-VOISINS",
    "city": "QUINCY-VOISINS",
    "postal_code": "382",
    "latitude": 48.89946901,
    "longitude": 2.87358502,
    "id": 1213
  },
  {
    "label": "Mairie de SERRIS",
    "address": "\u00cele-de-France - SERRIS",
    "city": "SERRIS",
    "postal_code": "449",
    "latitude": 48.85669136,
    "longitude": 2.78597213,
    "id": 1214
  },
  {
    "label": "Mairie de CERNAY-LA-VILLE",
    "address": "\u00cele-de-France - CERNAY-LA-VILLE",
    "city": "CERNAY-LA-VILLE",
    "postal_code": "128",
    "latitude": 48.67362421,
    "longitude": 1.97412859,
    "id": 1215
  },
  {
    "label": "Mairie de MERE",
    "address": "\u00cele-de-France - MERE",
    "city": "MERE",
    "postal_code": "389",
    "latitude": 48.78629454,
    "longitude": 1.81691927,
    "id": 1216
  },
  {
    "label": "Mairie de TACOIGNIERES",
    "address": "\u00cele-de-France - TACOIGNIERES",
    "city": "TACOIGNIERES",
    "postal_code": "605",
    "latitude": 48.83592131,
    "longitude": 1.67482498,
    "id": 1217
  },
  {
    "label": "Mairie de BALLAINVILLIERS",
    "address": "\u00cele-de-France - BALLAINVILLIERS",
    "city": "BALLAINVILLIERS",
    "postal_code": "44",
    "latitude": 48.67507137,
    "longitude": 2.29579038,
    "id": 1218
  },
  {
    "label": "Mairie de LA COURNEUVE",
    "address": "\u00cele-de-France - LA COURNEUVE",
    "city": "LA COURNEUVE",
    "postal_code": "27",
    "latitude": 48.9312165,
    "longitude": 2.39651929,
    "id": 1219
  },
  {
    "label": "Mairie de JOUY-LE-MOUTIER",
    "address": "\u00cele-de-France - JOUY-LE-MOUTIER",
    "city": "JOUY-LE-MOUTIER",
    "postal_code": "323",
    "latitude": 49.01083876,
    "longitude": 2.03869874,
    "id": 1220
  },
  {
    "label": "Mairie de SAINT-OUEN-L'AUMONE",
    "address": "\u00cele-de-France - SAINT-OUEN-L'AUMONE",
    "city": "SAINT-OUEN-L'AUMONE",
    "postal_code": "572",
    "latitude": 49.04424633,
    "longitude": 2.11095478,
    "id": 1221
  },
  {
    "label": "Mairie de VALMONDOIS",
    "address": "\u00cele-de-France - VALMONDOIS",
    "city": "VALMONDOIS",
    "postal_code": "628",
    "latitude": 49.0964877,
    "longitude": 2.19008966,
    "id": 1222
  },
  {
    "label": "Mairie de LIMEIL-BREVANNES",
    "address": "\u00cele-de-France - LIMEIL-BREVANNES",
    "city": "LIMEIL-BREVANNES",
    "postal_code": "44",
    "latitude": 48.74599097,
    "longitude": 2.48872776,
    "id": 1223
  },
  {
    "label": "Mairie de CHARS",
    "address": "\u00cele-de-France - CHARS",
    "city": "CHARS",
    "postal_code": "142",
    "latitude": 49.16060698,
    "longitude": 1.93781731,
    "id": 1224
  },
  {
    "label": "Mairie de LA FRETTE-SUR-SEINE",
    "address": "\u00cele-de-France - LA FRETTE-SUR-SEINE",
    "city": "LA FRETTE-SUR-SEINE",
    "postal_code": "257",
    "latitude": 48.97426146,
    "longitude": 2.17815134,
    "id": 1225
  },
  {
    "label": "Mairie de EVECQUEMONT",
    "address": "\u00cele-de-France - EVECQUEMONT",
    "city": "EVECQUEMONT",
    "postal_code": "227",
    "latitude": 49.01416051,
    "longitude": 1.94441356,
    "id": 1226
  },
  {
    "label": "Mairie de MITTAINVILLE",
    "address": "\u00cele-de-France - MITTAINVILLE",
    "city": "MITTAINVILLE",
    "postal_code": "407",
    "latitude": 48.6657362,
    "longitude": 1.6227078,
    "id": 1227
  },
  {
    "label": "Mairie de SAINT-YON",
    "address": "\u00cele-de-France - SAINT-YON",
    "city": "SAINT-YON",
    "postal_code": "581",
    "latitude": 48.56261694,
    "longitude": 2.18482426,
    "id": 1228
  },
  {
    "label": "Mairie de PAMFOU",
    "address": "\u00cele-de-France - PAMFOU",
    "city": "PAMFOU",
    "postal_code": "354",
    "latitude": 48.46171962,
    "longitude": 2.87179646,
    "id": 1229
  },
  {
    "label": "Mairie de SAINT-MARTIN-DES-CHAMPS",
    "address": "\u00cele-de-France - SAINT-MARTIN-DES-CHAMPS",
    "city": "SAINT-MARTIN-DES-CHAMPS",
    "postal_code": "423",
    "latitude": 48.77785676,
    "longitude": 3.33473343,
    "id": 1230
  },
  {
    "label": "Mairie de VILLEMAREUIL",
    "address": "\u00cele-de-France - VILLEMAREUIL",
    "city": "VILLEMAREUIL",
    "postal_code": "505",
    "latitude": 48.92144667,
    "longitude": 2.97336659,
    "id": 1231
  },
  {
    "label": "Mairie de SURESNES",
    "address": "\u00cele-de-France - SURESNES",
    "city": "SURESNES",
    "postal_code": "73",
    "latitude": 48.87096709,
    "longitude": 2.22751433,
    "id": 1232
  },
  {
    "label": "Mairie de LUZARCHES",
    "address": "\u00cele-de-France - LUZARCHES",
    "city": "LUZARCHES",
    "postal_code": "352",
    "latitude": 49.11272163,
    "longitude": 2.42273439,
    "id": 1233
  },
  {
    "label": "Mairie de CHAMIGNY",
    "address": "\u00cele-de-France - CHAMIGNY",
    "city": "CHAMIGNY",
    "postal_code": "78",
    "latitude": 48.97338846,
    "longitude": 3.15147369,
    "id": 1234
  },
  {
    "label": "Mairie de LEUDON-EN-BRIE",
    "address": "\u00cele-de-France - LEUDON-EN-BRIE",
    "city": "LEUDON-EN-BRIE",
    "postal_code": "250",
    "latitude": 48.73343808,
    "longitude": 3.27001355,
    "id": 1235
  },
  {
    "label": "Mairie de LUISETAINES",
    "address": "\u00cele-de-France - LUISETAINES",
    "city": "LUISETAINES",
    "postal_code": "263",
    "latitude": 48.46711542,
    "longitude": 3.18008767,
    "id": 1236
  },
  {
    "label": "Mairie de MARCHEMORET",
    "address": "\u00cele-de-France - MARCHEMORET",
    "city": "MARCHEMORET",
    "postal_code": "273",
    "latitude": 49.05086667,
    "longitude": 2.76988557,
    "id": 1237
  },
  {
    "label": "Mairie de SAINT-SOUPPLETS",
    "address": "\u00cele-de-France - SAINT-SOUPPLETS",
    "city": "SAINT-SOUPPLETS",
    "postal_code": "437",
    "latitude": 49.03814724,
    "longitude": 2.80668315,
    "id": 1238
  },
  {
    "label": "Mairie de SAVIGNY-LE-TEMPLE",
    "address": "\u00cele-de-France - SAVIGNY-LE-TEMPLE",
    "city": "SAVIGNY-LE-TEMPLE",
    "postal_code": "445",
    "latitude": 48.59572606,
    "longitude": 2.58044466,
    "id": 1239
  },
  {
    "label": "Mairie de VINANTES",
    "address": "\u00cele-de-France - VINANTES",
    "city": "VINANTES",
    "postal_code": "525",
    "latitude": 49.01055297,
    "longitude": 2.73403004,
    "id": 1240
  },
  {
    "label": "Mairie de LES MESNULS",
    "address": "\u00cele-de-France - LES MESNULS",
    "city": "LES MESNULS",
    "postal_code": "398",
    "latitude": 48.7567221,
    "longitude": 1.83760668,
    "id": 1241
  },
  {
    "label": "Mairie de GOMETZ-LE-CHATEL",
    "address": "\u00cele-de-France - GOMETZ-LE-CHATEL",
    "city": "GOMETZ-LE-CHATEL",
    "postal_code": "275",
    "latitude": 48.6785074,
    "longitude": 2.13833489,
    "id": 1242
  },
  {
    "label": "Mairie de COURBEVOIE",
    "address": "\u00cele-de-France - COURBEVOIE",
    "city": "COURBEVOIE",
    "postal_code": "26",
    "latitude": 48.89705011,
    "longitude": 2.25199444,
    "id": 1243
  },
  {
    "label": "Mairie de ARRONVILLE",
    "address": "\u00cele-de-France - ARRONVILLE",
    "city": "ARRONVILLE",
    "postal_code": "23",
    "latitude": 49.18083007,
    "longitude": 2.11309611,
    "id": 1244
  },
  {
    "label": "Mairie de NESLES-LA-VALLEE",
    "address": "\u00cele-de-France - NESLES-LA-VALLEE",
    "city": "NESLES-LA-VALLEE",
    "postal_code": "446",
    "latitude": 49.12970877,
    "longitude": 2.17082575,
    "id": 1245
  },
  {
    "label": "Mairie de SURVILLIERS",
    "address": "\u00cele-de-France - SURVILLIERS",
    "city": "SURVILLIERS",
    "postal_code": "604",
    "latitude": 49.09819588,
    "longitude": 2.54449682,
    "id": 1246
  },
  {
    "label": "Mairie de JOUY-LE-CHATEL",
    "address": "\u00cele-de-France - JOUY-LE-CHATEL",
    "city": "JOUY-LE-CHATEL",
    "postal_code": "239",
    "latitude": 48.66525511,
    "longitude": 3.12765499,
    "id": 1247
  },
  {
    "label": "Mairie de LA CELLE-SUR-MORIN",
    "address": "\u00cele-de-France - LA CELLE-SUR-MORIN",
    "city": "LA CELLE-SUR-MORIN",
    "postal_code": "63",
    "latitude": 48.80644808,
    "longitude": 2.9651537599999997,
    "id": 1248
  },
  {
    "label": "Mairie de LIVERDY-EN-BRIE",
    "address": "\u00cele-de-France - LIVERDY-EN-BRIE",
    "city": "LIVERDY-EN-BRIE",
    "postal_code": "254",
    "latitude": 48.69943944,
    "longitude": 2.77511037,
    "id": 1249
  },
  {
    "label": "Mairie de MAUPERTHUIS",
    "address": "\u00cele-de-France - MAUPERTHUIS",
    "city": "MAUPERTHUIS",
    "postal_code": "281",
    "latitude": 48.76828986,
    "longitude": 3.03811875,
    "id": 1250
  },
  {
    "label": "Mairie de POLIGNY",
    "address": "\u00cele-de-France - POLIGNY",
    "city": "POLIGNY",
    "postal_code": "370",
    "latitude": 48.22486285,
    "longitude": 2.74558589,
    "id": 1251
  },
  {
    "label": "Mairie de SAINT-PATHUS",
    "address": "\u00cele-de-France - SAINT-PATHUS",
    "city": "SAINT-PATHUS",
    "postal_code": "430",
    "latitude": 49.07052268,
    "longitude": 2.80013907,
    "id": 1252
  },
  {
    "label": "Mairie de MILON-LA-CHAPELLE",
    "address": "\u00cele-de-France - MILON-LA-CHAPELLE",
    "city": "MILON-LA-CHAPELLE",
    "postal_code": "406",
    "latitude": 48.72596232,
    "longitude": 2.04848611,
    "id": 1253
  },
  {
    "label": "Mairie de PARAY-DOUAVILLE",
    "address": "\u00cele-de-France - PARAY-DOUAVILLE",
    "city": "PARAY-DOUAVILLE",
    "postal_code": "478",
    "latitude": 48.46383003,
    "longitude": 1.8769052,
    "id": 1254
  },
  {
    "label": "Mairie de CHAMPLAN",
    "address": "\u00cele-de-France - CHAMPLAN",
    "city": "CHAMPLAN",
    "postal_code": "136",
    "latitude": 48.7083196,
    "longitude": 2.27403383,
    "id": 1255
  },
  {
    "label": "Mairie de CHAMPMOTTEUX",
    "address": "\u00cele-de-France - CHAMPMOTTEUX",
    "city": "CHAMPMOTTEUX",
    "postal_code": "137",
    "latitude": 48.34335418,
    "longitude": 2.3189802,
    "id": 1256
  },
  {
    "label": "Mairie de ESTOUCHES",
    "address": "\u00cele-de-France - ESTOUCHES",
    "city": "ESTOUCHES",
    "postal_code": "222",
    "latitude": 48.30272176,
    "longitude": 2.13437002,
    "id": 1257
  },
  {
    "label": "Mairie de FONTENAY-AUX-ROSES",
    "address": "\u00cele-de-France - FONTENAY-AUX-ROSES",
    "city": "FONTENAY-AUX-ROSES",
    "postal_code": "32",
    "latitude": 48.78921869,
    "longitude": 2.28481731,
    "id": 1258
  },
  {
    "label": "Mairie de ELANCOURT",
    "address": "\u00cele-de-France - ELANCOURT",
    "city": "ELANCOURT",
    "postal_code": "208",
    "latitude": 48.76792396,
    "longitude": 1.94899494,
    "id": 1259
  },
  {
    "label": "Mairie de NEAUPHLE-LE-CHATEAU",
    "address": "\u00cele-de-France - NEAUPHLE-LE-CHATEAU",
    "city": "NEAUPHLE-LE-CHATEAU",
    "postal_code": "442",
    "latitude": 48.8145004,
    "longitude": 1.9023751500000001,
    "id": 1260
  },
  {
    "label": "Mairie de PONTHEVRARD",
    "address": "\u00cele-de-France - PONTHEVRARD",
    "city": "PONTHEVRARD",
    "postal_code": "499",
    "latitude": 48.55115666,
    "longitude": 1.90998628,
    "id": 1261
  },
  {
    "label": "Mairie de SAINT-MARTIN-DES-CHAMPS",
    "address": "\u00cele-de-France - SAINT-MARTIN-DES-CHAMPS",
    "city": "SAINT-MARTIN-DES-CHAMPS",
    "postal_code": "565",
    "latitude": 48.88108433,
    "longitude": 1.71649151,
    "id": 1262
  },
  {
    "label": "Mairie de GUILLERVAL",
    "address": "\u00cele-de-France - GUILLERVAL",
    "city": "GUILLERVAL",
    "postal_code": "294",
    "latitude": 48.36469828,
    "longitude": 2.10174864,
    "id": 1263
  },
  {
    "label": "Mairie de SAULX-LES-CHARTREUX",
    "address": "\u00cele-de-France - SAULX-LES-CHARTREUX",
    "city": "SAULX-LES-CHARTREUX",
    "postal_code": "587",
    "latitude": 48.69213562,
    "longitude": 2.26590726,
    "id": 1264
  },
  {
    "label": "Mairie de VERT-LE-PETIT",
    "address": "\u00cele-de-France - VERT-LE-PETIT",
    "city": "VERT-LE-PETIT",
    "postal_code": "649",
    "latitude": 48.55192409,
    "longitude": 2.36629917,
    "id": 1265
  },
  {
    "label": "Mairie de CHAVILLE",
    "address": "\u00cele-de-France - CHAVILLE",
    "city": "CHAVILLE",
    "postal_code": "22",
    "latitude": 48.80891014,
    "longitude": 2.18818346,
    "id": 1266
  },
  {
    "label": "Mairie de PIERRELAYE",
    "address": "\u00cele-de-France - PIERRELAYE",
    "city": "PIERRELAYE",
    "postal_code": "488",
    "latitude": 49.02274822,
    "longitude": 2.15067428,
    "id": 1267
  },
  {
    "label": "Mairie de BARBIZON",
    "address": "\u00cele-de-France - BARBIZON",
    "city": "BARBIZON",
    "postal_code": "22",
    "latitude": 48.44554293,
    "longitude": 2.60542102,
    "id": 1268
  },
  {
    "label": "Mairie de CHENOU",
    "address": "\u00cele-de-France - CHENOU",
    "city": "CHENOU",
    "postal_code": "110",
    "latitude": 48.16578964,
    "longitude": 2.65775892,
    "id": 1269
  },
  {
    "label": "Mairie de DAGNY",
    "address": "\u00cele-de-France - DAGNY",
    "city": "DAGNY",
    "postal_code": "151",
    "latitude": 48.71709841,
    "longitude": 3.17055419,
    "id": 1270
  },
  {
    "label": "Mairie de MITRY-MORY",
    "address": "\u00cele-de-France - MITRY-MORY",
    "city": "MITRY-MORY",
    "postal_code": "294",
    "latitude": 48.98392638,
    "longitude": 2.61640357,
    "id": 1271
  },
  {
    "label": "Mairie de SAINT-DENIS",
    "address": "\u00cele-de-France - SAINT-DENIS",
    "city": "SAINT-DENIS",
    "postal_code": "66",
    "latitude": 48.93572345,
    "longitude": 2.35423761,
    "id": 1272
  },
  {
    "label": "Mairie de ORMESSON-SUR-MARNE",
    "address": "\u00cele-de-France - ORMESSON-SUR-MARNE",
    "city": "ORMESSON-SUR-MARNE",
    "postal_code": "55",
    "latitude": 48.78546599,
    "longitude": 2.53780822,
    "id": 1273
  },
  {
    "label": "Mairie de BOISEMONT",
    "address": "\u00cele-de-France - BOISEMONT",
    "city": "BOISEMONT",
    "postal_code": "74",
    "latitude": 49.02152429,
    "longitude": 2.00174514,
    "id": 1274
  },
  {
    "label": "Mairie de HODENT",
    "address": "\u00cele-de-France - HODENT",
    "city": "HODENT",
    "postal_code": "309",
    "latitude": 49.14374099,
    "longitude": 1.76674548,
    "id": 1275
  },
  {
    "label": "Mairie de SANNOIS",
    "address": "\u00cele-de-France - SANNOIS",
    "city": "SANNOIS",
    "postal_code": "582",
    "latitude": 48.97164475,
    "longitude": 2.25733169,
    "id": 1276
  },
  {
    "label": "Mairie de JAMBVILLE",
    "address": "\u00cele-de-France - JAMBVILLE",
    "city": "JAMBVILLE",
    "postal_code": "317",
    "latitude": 49.04617397,
    "longitude": 1.85257925,
    "id": 1277
  },
  {
    "label": "Mairie de SAINT-REMY-LES-CHEVREUSE",
    "address": "\u00cele-de-France - SAINT-REMY-LES-CHEVREUSE",
    "city": "SAINT-REMY-LES-CHEVREUSE",
    "postal_code": "575",
    "latitude": 48.70534294,
    "longitude": 2.07168756,
    "id": 1278
  },
  {
    "label": "Mairie de LA FERTE-ALAIS",
    "address": "\u00cele-de-France - LA FERTE-ALAIS",
    "city": "LA FERTE-ALAIS",
    "postal_code": "232",
    "latitude": 48.48270607,
    "longitude": 2.34868127,
    "id": 1279
  },
  {
    "label": "Mairie de CHALAUTRE-LA-GRANDE",
    "address": "\u00cele-de-France - CHALAUTRE-LA-GRANDE",
    "city": "CHALAUTRE-LA-GRANDE",
    "postal_code": "72",
    "latitude": 48.54211903,
    "longitude": 3.45885024,
    "id": 1280
  },
  {
    "label": "Mairie de IVERNY",
    "address": "\u00cele-de-France - IVERNY",
    "city": "IVERNY",
    "postal_code": "233",
    "latitude": 49.00047423,
    "longitude": 2.78858547,
    "id": 1281
  }
];



