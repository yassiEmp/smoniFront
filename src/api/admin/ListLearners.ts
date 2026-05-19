import axios from "axios";
import { apiUrl } from "@/api";

export interface LearnerProfile {
  id: number;
  user_id: number;
  birthdate: string | null;
  city: string | null;
  address: string | null;
  postal_code: string | null;
  cin_number: string | null;
  cin_issue_date: string | null;
  cin_issue_place: string | null;
  permit_number: string | null;
  permit_issue_date: string | null;
  permit_category: string | null;
  created_at: string;
  updated_at: string;
}

export interface Learner {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  genre: string | null;
  role: string;
  is_active: number;
  photo: string | null;
  created_at: string;
  updated_at: string;
  timing: string | null;
  first_login_planning: number;
  first_login_dashboard: number;
  learner_profile: LearnerProfile | null;
}

export interface LearnerListResponse {
  success: boolean; 
  data: {
    current_page: number;
    data: Learner[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
}

export const fetchLearners = async (token: string, page = 1, perPage = 10, search = ""): Promise<LearnerListResponse> => {
  const response = await fetch(`${apiUrl}admin/learners?page=${page}&per_page=${perPage}&q=${search}&status=all`, {
      credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error("Erreur lors du chargement des apprenants");
  return response.json();
};

export async function toggleLearnerStatus(id: number, token: string) {
  return axios.put(
    `${apiUrl}admin/learners/${id}/action`,
    {},
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
}