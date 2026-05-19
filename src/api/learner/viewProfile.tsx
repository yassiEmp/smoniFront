// profileView.ts
import { apiUrl } from "../index";

export interface LearnerProfile {
  id: number;
  user_id: number;
  birthdate: string;
  city: string;
  address: string;
  postal_code: string;
  cin_number: string;
  cin_issue_date: string;
  cin_issue_place: string;
  permit_number: string;
  permit_issue_date: string;
  permit_category: string;
  created_at: string;
  updated_at: string;
  test_passed: boolean;
  hour: number; // Nombre d'heures recommandées
}

export interface UserProfile {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  genre: string | null;
  role: string;
  is_active: boolean;
  photo: string | null;
  created_at: string;
  updated_at: string;
  timing: null;
  first_login_planning: boolean;
  first_login_dashboard: boolean;
  learner_profile: LearnerProfile;
}

export interface LearnerProfileResponse {
  success: boolean;
  data: UserProfile | null;
  message: string;
}

export const fetchLearnerProfile = async (
  token: string
): Promise<LearnerProfileResponse> => {
  const response = await fetch(`${apiUrl}profile/learner`, {
      credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Erreur lors du chargement du profil");
  }
  
  return response.json();
};