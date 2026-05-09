import { apiUrl } from "../index";

interface LinkItem {
  id: number;
  liens: string;
  identifiant: string | null;
  password: string | null;
  created_at: string;
  updated_at: string;
}

export interface CodePackResponse {
  success: boolean;
  data: boolean;
  link: LinkItem[]
}

export const fetchCodePackStatus = async (token: string): Promise<CodePackResponse> => {
  const response = await fetch(`${apiUrl}services/packCode`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erreur lors de la vérification de l'abonnement code");
  return response.json();
};
