import { apiUrl } from "@/api";
import axios from "axios";

export interface Contrat {
  id: number;
  subscription_id: number;
  student_id: number;
  file_original: string;
  file_signed: string;
  tag: string;
  date: string;
  created_at: string;
  updated_at: string;
  subscription: {
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
      type: string;
    };
  };
}

export interface ContratsResponse {
  current_page: number;
  data: Contrat[];
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
}

export async function listContratsApprenant(
  token: string,
  userId: string | number,
  page: number = 1,
  perPage: number = 10
): Promise<ContratsResponse> {
  const { data: json } = await axios.get(`${apiUrl}admin/learners/${userId}/listContrat?page=${page}&per_page=${perPage}`);
  return json.data;
}

export async function addContratApprenant(
  token: string,
  userId: string | number,
  subscription_id: number,
  file: File
): Promise<any> {
  const formData = new FormData();
  formData.append("subscription_id", subscription_id.toString());
  formData.append("file", file);

  const res = await fetch(
    `${apiUrl}admin/learners/${userId}/addContrat`,
    {
      credentials: "include",
      method: "POST",
      headers: {
      },
      body: formData,
    }
  );
  if (!res.ok) {
    // Gestion spécifique du code 405 pour retourner le message exact de l'API (hors data)
    if (res.status === 405) {
      const error = await res.json();
      const err: any = new Error(error?.message || "Un contrat a déjà été établi pour cet abonnement.");
      err.status = 405;
      throw err;
    }
    throw new Error("Un contrat a déjà été établi pour cet abonnement.");
  }
  return await res.json();
}

export async function updateContratApprenant(
  token: string,
  contratId: string | number,
  file: File
): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${apiUrl}admin/learners/${contratId}/updateContact`,
    {
      credentials: "include",
      method: "POST",
      headers: {
      },
      body: formData,
    }
  );
  if (!res.ok) {
    const error = await res.json();
    const err: any = new Error(error?.message || "Erreur lors de la mise à jour du contrat.");
    err.status = res.status;
    throw err;
  }
  return await res.json();
}

