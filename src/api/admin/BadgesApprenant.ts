import { apiUrl } from "../index";

export interface Badge {
  id: number;
  learner_id: number;
  module_id: number;
  list_badge_id: number;
  awarded_at: string;
  list_badge: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface NoBadge {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BadgesResponse {
  success: boolean;
  data: {
    badges: Badge[];
    nobadges: NoBadge[];
  };
  message: string;
}

export const fetchBadges = async (token: string, userId: string | undefined): Promise<BadgesResponse> => {
  const response = await fetch(`${apiUrl}admin/learners/${userId}/userBadges`, {
    headers: {
      Accept: "application/json", 
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des badges");
  }

  return response.json();
};