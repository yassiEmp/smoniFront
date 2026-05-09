import { apiUrl } from "./index";

export interface Learner {
  id: number;
  lastname: string;
  firstname: string;
  phone: string;
  photo: string | null;
}

export interface NoBillableRendezVous {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  duration: number;
  price: string;
  status: string;
  learner: Learner;
}

export interface NoBillableResponse {
  current_page: number;
  data: NoBillableRendezVous[];
  next_page_url: string | null;
  total: number;
}

export const fetchNoBillableRendezVous = async (token: string, page = 1): Promise<NoBillableResponse> => {
  const res = await fetch(`${apiUrl}withdraws/no_billable?page=${page}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erreur lors du chargement des rendez-vous");
  const json = await res.json();
  return json.data;
};
