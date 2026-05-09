import { apiUrl } from "@/api";

export interface Souscription {
  id: number;
  learner_id: number;
  service_id: number;
  start_date: string;
  end_date: string;
  amount: number;
  transaction_id: string;
  mode: string;
  status: string;
  created_at: string;
  updated_at: string;
  service: {
    id: number;
    title: string;
    price: number;
    hour: number | null;
    time: number;
    type: string;
    items: { id: number; label: string; status: boolean }[];
  };
}

export interface SouscriptionsResponse {
  current_page: number;
  data: Souscription[];
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
}

export async function fetchSouscriptionsApprenant(
  token: string,
  userId: string | number,
  page: number = 1,
  perPage: number = 5
): Promise<SouscriptionsResponse> {
  const res = await fetch(
    `${apiUrl}admin/learners/${userId}/mySubscribe?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Erreur lors du chargement des souscriptions");
  const json = await res.json();
  return json.data;
}
