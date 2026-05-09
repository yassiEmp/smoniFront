import * as Yup from "yup";
import { MeetingPointType } from "@/types/monitor/settings/configuration";

export interface VehicleData {
  transmissionType: string;
  brand: string;
  model: string;
  registrationNumber: string;
  registrationDocument: File | null;
  year: number;
  fuel_type: string;
  color: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  gender: "homme" | "femme" | "autre";
  day: string;
  month: string;
  year: string;
  phone: string;
  address: string;
  city?: string;
  email: string;
  password: string;
  receiveNewsletter: boolean;
  acceptTerms: boolean;
  workZone?: string;
  selectedWorkZones?: MeetingPointType[];
  vehicles?: VehicleData[];
  profilePhoto?: File | null;
  autoEntrepreneur: "oui" | "non";
}

export const initialRegisterValues: RegisterFormData = {
  firstName: "",
  lastName: "",
  gender: "homme",
  day: "",
  month: "",
  year: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  receiveNewsletter: false,
  acceptTerms: false,
  vehicles: [],
  profilePhoto: null,
  selectedWorkZones: [],
  autoEntrepreneur: "non",
};

export const step2Schema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom est trop long")
    .required("Prénom requis"),

  lastName: Yup.string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long")
    .required("Nom requis"),

  gender: Yup.string()
    .oneOf(["homme", "femme", "autre"], "Genre invalide")
    .required("Genre requis"),

  
  day: Yup.string()
    .required("Jour obligatoire")
    .matches(/^(0[1-9]|[12][0-9]|3[01])$/, "Jour invalide (01-31)"),
  month: Yup.string()
    .required("Mois obligatoire")
    .matches(/^(0[1-9]|1[0-2])$/, "Mois invalide (01-12)"),
  year: Yup.string()
    .required("Année obligatoire")
    .matches(/^(19|20)\d{2}$/, "Année invalide (1900-2099)"),


  phone: Yup.string()
    .trim()
    .matches(
      /^(?:\+33|0)[1-9](?:\d{2}){4}$/,
      "Numéro de téléphone français invalide (ex: 0612345678 ou +33612345678)"
    )
    .required("Numéro requis"),

  autoEntrepreneur: Yup.string()
    .oneOf(["oui", "non"], "Statut invalide")
    .required("Statut requis"),
});

// Schéma pour l'étape 2 des apprenants (sans autoEntrepreneur)
export const step2LearnerSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom est trop long")
    .required("Prénom requis"),

  lastName: Yup.string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long")
    .required("Nom requis"),

  gender: Yup.string()
    .oneOf(["homme", "femme", "autre"], "Genre invalide")
    .required("Genre requis"),

  day: Yup.string()
    .required("Jour obligatoire")
    .matches(/^(0[1-9]|[12][0-9]|3[01])$/, "Jour invalide (01-31)"),
  month: Yup.string()
    .required("Mois obligatoire")
    .matches(/^(0[1-9]|1[0-2])$/, "Mois invalide (01-12)"),
  year: Yup.string()
    .required("Année obligatoire")
    .matches(/^(19|20)\d{2}$/, "Année invalide (1900-2099)"),

  phone: Yup.string()
    .trim()
    .matches(/^\+?\d{8,16}$/, "Numéro de téléphone invalide")
    .required("Numéro requis"),
});

const baseAddressSchema = {
  address: Yup.string()
    .trim()
    .required("L'adresse est obligatoire")
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(100, "L'adresse ne peut pas dépasser 100 caractères"),
  city: Yup.string()
    .trim()
    .required("La ville est obligatoire")
    .min(2, "La ville doit contenir au moins 2 caractères")
    .max(50, "La ville ne peut pas dépasser 50 caractères"),
};

// Schéma pour les moniteurs
export const monitorStep3Schema = Yup.object().shape({
  ...baseAddressSchema,
  workZone: Yup.string()
    .required("La zone de travail est obligatoire")
    .min(2, "Veuillez sélectionner au moins une zone de travail"),
});

// Schéma pour les apprenants
export const learnerStep3Schema = Yup.object().shape({
  ...baseAddressSchema,
});

export const step4Schema = Yup.object().shape({
  email: Yup.string()
    .email("Veuillez entrer une adresse email valide")
    .required("L'adresse email est obligatoire"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    )
    .required("Le mot de passe est obligatoire"),
  receiveNewsletter: Yup.boolean(),
  acceptTerms: Yup.boolean()
    .oneOf([true], "Vous devez accepter les conditions générales d'utilisation")
    .required("Vous devez accepter les conditions générales d'utilisation"),
});

export const vehicleSchema = Yup.object().shape({
  transmissionType: Yup.string()
    .oneOf(
      ["automatic", "manual"],
      "Veuillez sélectionner un type de transmission"
    )
    .required("Le type de transmission est obligatoire"),

  brand: Yup.string()
    .min(2, "La marque doit contenir au moins 2 caractères")
    .max(50, "La marque ne doit pas dépasser 50 caractères")
    .required("La marque est obligatoire"),

  model: Yup.string()
    .min(2, "Le modèle doit contenir au moins 2 caractères")
    .max(50, "Le modèle ne doit pas dépasser 50 caractères")
    .required("Le modèle est obligatoire"),

  registrationNumber: Yup.string()
    .matches(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/, "Le format doit être AA-123-AA (ex: AB-123-CD)")
    .required("Le numéro d'immatriculation est obligatoire"),

  year: Yup.number()
    .min(1900, "Année invalide")
    .max(new Date().getFullYear(), "Année ne peut pas être dans le futur")
    .required("Année obligatoire"),

  fuel_type: Yup.string()
    .oneOf(["essence", "diesel", "électrique", "hybride"], "Type de carburant invalide")
    .required("Type de carburant obligatoire"),

  color: Yup.string()
    .min(2, "Couleur doit contenir au moins 2 caractères")
    .required("Couleur obligatoire"),

  registrationDocument: Yup.mixed()
    .required("Photo du véhicule obligatoire")
    .test("fileType", "Le fichier doit être une image (jpg, jpeg, png)", (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }
      return false;
    })
    .test("fileSize", "Le fichier ne doit pas dépasser 5MB", (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024; // 5MB
      }
      return false;
    }),
});


