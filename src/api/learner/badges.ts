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

export const fetchBadges = async (token: string): Promise<BadgesResponse> => {
  const response = await fetch(`${apiUrl}userBadges`, {
      credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des badges");
  }

  return response.json();
};


export interface BadgesCountResponse {
  success: boolean;
  data:number;
  message: string;
}

export const fetchBadgesCount = async (token: string): Promise<BadgesCountResponse> => {
  const response = await fetch(`${apiUrl}learner/badges/qty`, {
      credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement du nombre de badges");
  }

  return response.json();
};
