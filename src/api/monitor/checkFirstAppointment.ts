import { apiUrl } from "../index";

export interface CheckFirstAppointmentResponse {
  success: boolean;
  data: {
    learner_id: number;
    learner_name: string;
    is_first_appointment: boolean;
    total_appointments: number;
  };
  message: string;
}

export const checkFirstAppointment = async (token: string, learnerId: number): Promise<CheckFirstAppointmentResponse> => {
  const response = await fetch(`${apiUrl}monitor/check-first-appointment/${learnerId}`, {
      credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json();
  
  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Erreur lors de la vérification");
  }
  
  return result;
};







