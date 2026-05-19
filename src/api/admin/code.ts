import { apiUrl } from "@/api";
import axios from "axios";

export interface Link {
  id: number;
  liens: string;
  identifiant: string | null;
  password: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: number;
  service_id: number;
  label: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  category_service_id: number;
  title: string;
  price: string;
  type: string;
  created_at: string;
  updated_at: string;
  time: number;
  hour: number | null;
  items: ServiceItem[];
}

export interface Learner {
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
  timing: string | null;
  first_login_planning: boolean;
  first_login_dashboard: boolean;
} 


export interface Subscription {
  id: number;
  learner_id: number;
  service_id: number;
  start_date: string;
  end_date: string;
  amount: string;
  transaction_id: string;
  mode: string;
  status: string;
  created_at: string;
  updated_at: string;
  service: Service;
  learner:Learner;
}

export interface SubscriptionsPagination {
  current_page: number;
  data: Subscription[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[]; 
}


export async function fetchSubscriptions(token: string, page = 1): Promise<SubscriptionsPagination> {
  const { data: json } = await axios.get(`${apiUrl}admin/learner/codeacess/list?page=${page}`);
  if (!json.success) throw new Error(json.message);
  return json.data;
} 

// Liste des liens code
export async function fetchLinks(token: string): Promise<Link[]> {
  const { data: json } = await axios.get(`${apiUrl}admin/codeacess/list`);
  if (!json.success) throw new Error(json.message);
  return json.data;
}

// Ajouter un lien code
export async function addLink(token: string, liens: string): Promise<void> {
  const res = await fetch(`${apiUrl}admin/codeaccess/add`, {
      credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liens }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout du lien");
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
}

// Supprimer un lien code
export async function deleteLink(token: string, id: number): Promise<void> {
  const res = await fetch(`${apiUrl}admin/codeaccess/delete/${id}`, {
      credentials: "include",
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du lien");
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
}
    