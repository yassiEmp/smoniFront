import { apiUrl } from "../index";

export interface HoursResponse {
  success: boolean;
  data: number;
}

export const fetchLearnerHourInfo = async (
  token: string
): Promise<HoursResponse> => {
  const response = await fetch(`${apiUrl}services/info`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erreur lors du chargement des heures disponibles");
  return response.json();
}; 
