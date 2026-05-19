import { apiUrl } from "./index";
import { GraphApiResponse } from "@/types/graph";

export const fetchGraphData = async (token: string): Promise<GraphApiResponse> => {
  const response = await fetch(`${apiUrl}dashboard/graph`, {
      credentials: "include",
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données du graphique');
  }

  return response.json();
};
