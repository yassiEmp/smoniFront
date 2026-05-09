import { FormikValues } from "formik";
import { apiUrl } from ".";
import toast from "react-hot-toast";
import { RegisterFormData } from "@utils/validations/registerShema";
import { AppDispatch } from "@store/configureStore";
import { login, updateUser } from "@store/slices/authSlice";
import { NavigateFunction } from "react-router-dom";
// Type pour les zones de travail
interface WorkZone {
  label: string;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
}

export const registerInstructor = async (
  values: FormikValues,
  type: string,
  setShowPopup: (showPopup: boolean) => void,
  setEmail: (email: string) => void,
) => {
  try {
    const formData = new FormData();
    formData.append("lastname", values.lastName);
    formData.append("firstname", values.firstName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("role", type === "monitor" ? "instructor" : "learner");
    formData.append(
      "birthdate",
      `${values.year}-${values.month}-${values.day}`,
    );
    formData.append("address", values.address);
    formData.append("genre", values.gender);
    formData.append("city", values.city);
    formData.append("password", values.password);
    formData.append("tva", values.autoEntrepreneur === "oui" ? "1" : "0");
    
    if (values.vehicles && Array.isArray(values.vehicles)) {
      values.vehicles.forEach((vehicle, index) => {
        formData.append(`vehicles[${index}][brand]`, vehicle.brand || "");
        formData.append(`vehicles[${index}][model]`, vehicle.model || "");
        formData.append(`vehicles[${index}][year]`, vehicle.year.toString() || "");
        formData.append(`vehicles[${index}][fuel_type]`, vehicle.fuel_type || "");
        formData.append(`vehicles[${index}][color]`, vehicle.color || "");
        formData.append(`vehicles[${index}][plate_number]`, vehicle.registrationNumber || "");
        formData.append(`vehicles[${index}][gearbox_type]`, 
          vehicle.transmissionType === "manual" ? "manual" : "automatic");
        
        if (vehicle.registrationDocument instanceof File) {
          formData.append(`vehicles[${index}][photo_url]`, vehicle.registrationDocument);
        } else {
          formData.append(`vehicles[${index}][photo_url]`, "");
        }
      });
      
    } 
      let workZonesArray: WorkZone[] = [];
    
    // Utiliser selectedWorkZones si disponible (données complètes)
    if (values.selectedWorkZones && Array.isArray(values.selectedWorkZones) && values.selectedWorkZones.length > 0) {
      workZonesArray = values.selectedWorkZones.map((zone) => ({
        label: zone.label,
        address: zone.address,
        city: zone.city,
        postal_code: zone.postal_code,
        latitude: zone.latitude,
        longitude: zone.longitude,
      }));
      
      workZonesArray.forEach((zone, index) => {
        formData.append(`workZones[${index}][label]`, zone.label);
        formData.append(`workZones[${index}][address]`, zone.address || "");
        formData.append(`workZones[${index}][city]`, zone.city || "");
        formData.append(`workZones[${index}][postal_code]`, zone.postal_code || "");
        formData.append(`workZones[${index}][latitude]`, zone.latitude?.toString() || "");
        formData.append(`workZones[${index}][longitude]`, zone.longitude?.toString() || "");
      });
    } else if (Array.isArray(values.workZone) && values.workZone.length > 0) {
      workZonesArray = values.workZone.map((zone) => ({
        label: String(zone).substring(0, 255),
        address: zone,
        city: zone,
        postal_code: null,
        latitude: null,
        longitude: null,
      }));
      
      workZonesArray.forEach((zone, index) => {
        formData.append(`workZones[${index}][label]`, zone.label);
        formData.append(`workZones[${index}][address]`, zone.address || "");
        formData.append(`workZones[${index}][city]`, zone.city || "");
        formData.append(`workZones[${index}][postal_code]`, "");
        formData.append(`workZones[${index}][latitude]`, "");
        formData.append(`workZones[${index}][longitude]`, "");
      });
    } else if (typeof values.workZone === "string" && values.workZone.trim() !== "") {
      const zones = values.workZone.split(", ");
      workZonesArray = zones.map((zone) => ({
        label: String(zone).substring(0, 255),
        address: String(zone).substring(0, 255),
        city: String(zone).substring(0, 255),
        postal_code: null,
        latitude: null,
        longitude: null,
      }));
      
      workZonesArray.forEach((zone, index) => {
        formData.append(`workZones[${index}][label]`, zone.label);
        formData.append(`workZones[${index}][address]`, zone.address || "");
        formData.append(`workZones[${index}][city]`, zone.city || "");
        formData.append(`workZones[${index}][postal_code]`, "");
        formData.append(`workZones[${index}][latitude]`, "");
        formData.append(`workZones[${index}][longitude]`, "");
      });
    }
    
    
    if (values.profilePhoto instanceof File) {
    formData.append("photo", values.profilePhoto);
    }
    const response = await fetch(`${apiUrl}register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    // console.log(response);
    try {
      const data = await response.json();
      if (data.success === true) {
        toast.success(data.message);
        setShowPopup(true);
        setEmail(values.email);
      } else {
        toast.error(data.message || "Échec de l'inscription");
      }
    } catch (jsonError) {
      console.error("Erreur de parsing JSON:", jsonError);
      toast.error("Erreur lors du traitement de la réponse");
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Erreur de connexion au serveur");
  }
};

export const registerLearner = async (values: RegisterFormData) => {
  try {
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

    const response = await fetch(`${apiUrl}register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    
    const data = await response.json();
    if (data.success) {
      toast.success("Inscription réussie, procédez à la vérification de votre email");
      return true;
    } else {
      toast.error(data.message || "Échec de l'inscription");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la soumission:", error);
    return false;
  }
};

export const loginRequest = async (values: FormikValues, dispatch:AppDispatch, navigate:NavigateFunction) => {
  
  try {
    const response = await fetch(`${apiUrl}login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json(); 
    
    if (data.success) {
      toast.success(data.message); 
      dispatch(login({
        token: data.token,
        test_passed: data.test_passed,
        user: data.data,
      }));
      if (data.data.role === "learner") {
        //setTimeout
        setTimeout(() => {
          navigate("/learners");
        }, 500);
      } else {
        //setTimeout
        setTimeout(() => {
          navigate("/monitor");
        }, 500);
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return false;
  }
};

export const verifyEmail = async (email: string) => {
  try {
    const response = await fetch(`${apiUrl}email/verification-notification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) { 
    console.error("Erreur lors de l'envoi de la demande de vérification de l'email:", error);
    return false;
  }
};

export const resetPassword = async (email: string, setStep: (step: number) => void, setEmail: (email: string) => void) => {
  try {
    const response = await fetch(`${apiUrl}password/send-otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json(); 
    if (data.success) {
      toast.success("Si cette adresse électronique a été utilisée pour créer un compte, des instructions pour réinitialiser votre mot de passe vous seront envoyées. Veuillez vérifier votre courrier électronique.");
      setStep(2);
      setEmail(email);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
  }
};

export const verifyOtp = async (email: string, otp: string, setStep: (step: number) => void) => {
  try {
    const response = await fetch(`${apiUrl}password/verify-otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code:otp }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      setStep(3);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du OTP:", error);
    return false;
  }
};

export const updatePassword = async (email: string, password: string, setStep: (step: number) => void, setEmail: (email: string) => void, navigate: NavigateFunction) => {
  try {
    const response = await fetch(`${apiUrl}password/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, password_confirmation: password }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      setStep(1);
      setEmail("");
      navigate("/connexion");
      return true;
  
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    return false;
  }
};

export const checkZoneInstructor = async (search: string) => {
  try {
    const response = await fetch(`${apiUrl}meeting-points/search?search=${search}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la vérification des zones:", error);
    return [];
  }
};

export const getUserInformation = async (token: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${apiUrl}profile/instructor`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(updateUser(data.data));
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
    return null;
  }
};

export const mailContact = async (values: FormikValues) => {
  try {
    const response = await fetch(`${apiUrl}mail-contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire de contact:", error);
    return null;
  }
};