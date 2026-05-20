import axios from "axios";
import { FormikValues } from "formik";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router";

import { apiUrl } from ".";
import { ensureCsrfCookie } from "./axiosClient";
import { AppDispatch } from "@store/configureStore";
import { login, updateUser } from "@store/slices/authSlice";
import { RegisterFormData } from "@utils/validations/registerShema";

// All auth endpoints are owned by Laravel Fortify on the backend.
// Auth uses Sanctum's stateful cookie: axios has withCredentials +
// withXSRFToken set globally, so no Authorization header is needed.
// Before any state-changing call we hit /sanctum/csrf-cookie once to
// seed the XSRF-TOKEN cookie.

interface WorkZone {
  label: string;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
}

const SANCTUM_BASE = apiUrl.replace(/\/api\/?$/, "");

async function fetchAuthenticatedUser(dispatch: AppDispatch, test_passed?: boolean) {
  const { data } = await axios.get(`${apiUrl}user`);
  dispatch(login({ user: data, test_passed: test_passed ?? false }));
  return data;
}

export const registerInstructor = async (
  values: FormikValues,
  type: string,
  setShowPopup: (showPopup: boolean) => void,
  setEmail: (email: string) => void,
) => {
  try {
    await ensureCsrfCookie();

    const formData = new FormData();
    formData.append("lastname", values.lastName);
    formData.append("firstname", values.firstName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("role", type === "monitor" ? "instructor" : "learner");
    formData.append("birthdate", `${values.year}-${values.month}-${values.day}`);
    formData.append("address", values.address);
    formData.append("genre", values.gender);
    formData.append("city", values.city);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password);
    formData.append("tva", values.autoEntrepreneur === "oui" ? "1" : "0");

    if (values.vehicles && Array.isArray(values.vehicles)) {
      values.vehicles.forEach((vehicle, index) => {
        formData.append(`vehicles[${index}][brand]`, vehicle.brand || "");
        formData.append(`vehicles[${index}][model]`, vehicle.model || "");
        formData.append(`vehicles[${index}][year]`, vehicle.year?.toString() || "");
        formData.append(`vehicles[${index}][fuel_type]`, vehicle.fuel_type || "");
        formData.append(`vehicles[${index}][color]`, vehicle.color || "");
        formData.append(`vehicles[${index}][plate_number]`, vehicle.registrationNumber || "");
        formData.append(
          `vehicles[${index}][gearbox_type]`,
          vehicle.transmissionType === "manual" ? "manual" : "automatic",
        );
        if (vehicle.registrationDocument instanceof File) {
          formData.append(`vehicles[${index}][photo_url]`, vehicle.registrationDocument);
        }
      });
    }

    let workZonesArray: WorkZone[] = [];
    if (values.selectedWorkZones && Array.isArray(values.selectedWorkZones) && values.selectedWorkZones.length > 0) {
      workZonesArray = values.selectedWorkZones.map((zone) => ({
        label: zone.label,
        address: zone.address,
        city: zone.city,
        postal_code: zone.postal_code,
        latitude: zone.latitude,
        longitude: zone.longitude,
      }));
    } else if (Array.isArray(values.workZone) && values.workZone.length > 0) {
      workZonesArray = values.workZone.map((zone) => ({
        label: String(zone).substring(0, 255),
        address: zone,
        city: zone,
        postal_code: null,
        latitude: null,
        longitude: null,
      }));
    } else if (typeof values.workZone === "string" && values.workZone.trim() !== "") {
      workZonesArray = values.workZone.split(", ").map((zone) => ({
        label: String(zone).substring(0, 255),
        address: String(zone).substring(0, 255),
        city: String(zone).substring(0, 255),
        postal_code: null,
        latitude: null,
        longitude: null,
      }));
    }

    workZonesArray.forEach((zone, index) => {
      formData.append(`workZones[${index}][label]`, zone.label);
      formData.append(`workZones[${index}][address]`, zone.address || "");
      formData.append(`workZones[${index}][city]`, zone.city || "");
      formData.append(`workZones[${index}][postal_code]`, zone.postal_code || "");
      formData.append(`workZones[${index}][latitude]`, zone.latitude?.toString() || "");
      formData.append(`workZones[${index}][longitude]`, zone.longitude?.toString() || "");
    });

    if (values.profilePhoto instanceof File) {
      formData.append("photo", values.profilePhoto);
    }

    await axios.post(`${SANCTUM_BASE}/register`, formData, {
      headers: { Accept: "application/json" },
    });

    toast.success("Inscription réussie, procédez à la vérification de votre email");
    setShowPopup(true);
    setEmail(values.email);
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Échec de l'inscription"
      : "Erreur de connexion au serveur";
    console.error("Registration error:", error);
    toast.error(message);
  }
};

export const registerLearner = async (values: RegisterFormData) => {
  try {
    await ensureCsrfCookie();

    const formData = new FormData();
    formData.append("firstname", values.firstName);
    formData.append("lastname", values.lastName);
    formData.append("genre", values.gender);
    formData.append("birthdate", `${values.year}-${values.month}-${values.day}`);
    formData.append("phone", values.phone);
    formData.append("role", "learner");
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password);

    await axios.post(`${SANCTUM_BASE}/register`, formData, {
      headers: { Accept: "application/json" },
    });

    toast.success("Inscription réussie, procédez à la vérification de votre email");
    return true;
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Échec de l'inscription"
      : "Erreur réseau";
    console.error("Erreur lors de la soumission:", error);
    toast.error(message);
    return false;
  }
};

export const loginRequest = async (
  values: FormikValues,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  try {
    await ensureCsrfCookie();

    await axios.post(`${SANCTUM_BASE}/login`, values, {
      headers: { Accept: "application/json" },
    });

    const user = await fetchAuthenticatedUser(dispatch);

    toast.success("Connexion réussie");

    setTimeout(() => {
      navigate(user.role === "learner" ? "/learners" : "/monitor");
    }, 500);
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Identifiants incorrects"
      : "Erreur réseau";
    console.error("Erreur lors de la connexion:", error);
    toast.error(message);
    return false;
  }
};

export const verifyEmail = async (email: string) => {
  try {
    await ensureCsrfCookie();
    await axios.post(
      `${SANCTUM_BASE}/email/verification-notification`,
      { email },
      { headers: { Accept: "application/json" } },
    );
    toast.success("Lien de vérification renvoyé");
    return true;
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Échec de l'envoi"
      : "Erreur réseau";
    console.error("Erreur lors de l'envoi de la demande de vérification:", error);
    toast.error(message);
    return false;
  }
};

// Password reset is now a link-based flow (Fortify), not 3-step OTP.
// Step 1: user submits email, gets a reset link by email.
// Step 2: user clicks the link, which routes to a frontend page that
//         POSTs token + email + new password to /reset-password.
//
// TODO(PR2 follow-up): the existing 3-step UI in pages/auth/* needs to be
// replaced with a /reset-password/[token] route. Until that lands,
// `verifyOtp` is a no-op stub so the current UI flow doesn't crash, but
// the OTP step does nothing — users have to click the email link.
export const resetPassword = async (
  email: string,
  setStep: (step: number) => void,
  setEmail: (email: string) => void,
) => {
  try {
    await ensureCsrfCookie();
    await axios.post(
      `${SANCTUM_BASE}/forgot-password`,
      { email },
      { headers: { Accept: "application/json" } },
    );
    toast.success(
      "Si cette adresse a été utilisée, un lien de réinitialisation vous a été envoyé. Vérifiez votre courrier.",
    );
    setEmail(email);
    setStep(2);
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Échec de la réinitialisation"
      : "Erreur réseau";
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    toast.error(message);
  }
};

export const verifyOtp = async (
  _email: string,
  _otp: string,
  setStep: (step: number) => void,
) => {
  setStep(3);
  return true;
};

export const updatePassword = async (
  email: string,
  password: string,
  setStep: (step: number) => void,
  setEmail: (email: string) => void,
  navigate: NavigateFunction,
  token?: string,
) => {
  if (!token) {
    toast.error(
      "Le lien de réinitialisation est requis. Veuillez cliquer sur le lien envoyé par email.",
    );
    return false;
  }
  try {
    await ensureCsrfCookie();
    await axios.post(
      `${SANCTUM_BASE}/reset-password`,
      {
        email,
        password,
        password_confirmation: password,
        token,
      },
      { headers: { Accept: "application/json" } },
    );
    toast.success("Mot de passe mis à jour");
    setStep(1);
    setEmail("");
    navigate("/connexion");
    return true;
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Échec de la mise à jour"
      : "Erreur réseau";
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    toast.error(message);
    return false;
  }
};

export const checkZoneInstructor = async (search: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}meeting-points/search`, {
      params: { search },
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la vérification des zones:", error);
    return [];
  }
};

export const getUserInformation = async (_token: string, dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get(`${apiUrl}profile/instructor`);
    dispatch(updateUser(data.data));
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error,
    );
    return null;
  }
};

export const mailContact = async (values: FormikValues) => {
  try {
    const { data } = await axios.post(`${apiUrl}mail-contact`, values, {
      headers: { Accept: "application/json" },
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire de contact:", error);
    return null;
  }
};

export const logoutRequest = async (dispatch: AppDispatch, navigate: NavigateFunction) => {
  try {
    await axios.post(`${SANCTUM_BASE}/logout`, {}, {
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  } finally {
    const { logout } = await import("@store/slices/authSlice");
    dispatch(logout());
    navigate("/connexion");
  }
};
