import { apiUrl } from "../index";
import axios from "axios";

export interface Instructor {
  id: number;
  lastname: string;
  firstname: string;
  photo: string | null;
  email: string;
}

export interface MeetingPoint {
  id: number;
  label: string;
}

export interface Availability {
  id: number;
  meeting_point: MeetingPoint | null;
}

export interface Vehicle {
  id: number;
  instructor_id: number;
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  fuel_type: string;
  insurance_expiry: string | null;
  technical_inspection_date: string | null;
  photo_url: string | null;
  color: string;
  gearbox_type: string; 
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: number;
  learner_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  instructor: Instructor;
  availability: Availability | null;
  vehicle?: Vehicle | null;
}

export interface LessonsResponse {
  success: boolean;
  current_page: number; 
  data: Lesson[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number; 
}



export const fetchLearnerLessons = async (token: string, status: string = "all", per_page?: number, page?:number): Promise<LessonsResponse> => {
  const { data: response } = await axios.get(`${apiUrl}lessonLearner?status=${status}&per_page=${per_page}&page=${page}`);
  
  // Vérifier la structure de la réponse et retourner les bonnes données
  if (response.success && response.data) {
    // L'API retourne les données de pagination dans response.data
    // Donc on retourne response.data qui contient déjà current_page, data, total, etc.
    return response.data;
  } else {
    throw new Error("Structure de réponse API inattendue");
  }
}


export interface CancelAppointmentPayload {
  learner_id: number;
  appointment_id: number;
  cancellation_reason: string;
}

export interface CancelAppointmentResponse {
  success: boolean;
  message: string;
}

export const cancelLearnerAppointment = async (
  token: string,
  data: CancelAppointmentPayload
): Promise<CancelAppointmentResponse> => {
  const response = await fetch(`${apiUrl}learner/cancel/rdv`, {
      credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Erreur lors de l'annulation");
  }
  return result;
};

// Utilitaire pour traduire le status
export const statusToFr = (status: string) => {
  switch (status) {
    case "scheduled": return "À venir";
    case "cancelled": return "Annulé"; 
    case "completed": return "Terminé";
    case "notation": return "En notation";
    case "pending": return "En attente";
    case "confirmed": return "Confirmé";
    default: return status;
  }
};