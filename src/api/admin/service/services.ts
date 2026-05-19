import { CategoryService, Service, CreateServicePayload, ServiceItem, PaginationResponse } from '@/types/admin/services';
import axios from "axios";
import { apiUrl } from "@/api";

// --- Catégorie Service API (vraies API) ---

export const listCategoryService = async (token: string): Promise<CategoryService[]> => {
  const { data: json } = await axios.get(`${apiUrl}admin/listCategoryService`);
  return json.data;
};

export const addCategoryService = async (data: { label: string }, token: string): Promise<CategoryService> => {
  const res = await fetch(`${apiUrl}admin/addCategoryService`, {
      credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout de la catégorie");
  const json = await res.json();
  return json.data;
};

export const updateCategoryService = async (id: number, data: { label: string }, token: string): Promise<CategoryService> => {
  const res = await fetch(`${apiUrl}admin/updateCategoryService/${id}`, {
      credentials: "include",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la modification de la catégorie");
  const json = await res.json();
  return json.data;
};

export const deleteCategoryService = async (id: number, token: string): Promise<void> => {
  const res = await fetch(`${apiUrl}admin/deleteCategoryService/${id}`, {
      credentials: "include",
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    if (res.status === 403) {
      const error = await res.json();
      const err: any = new Error(error?.message || "Il existe déjà des services pour cette catégorie");
      err.status = 403;
      throw err;
    }
    throw new Error("Erreur lors de la suppression de la catégorie");
  }
};

// --- Services API (vraies API) ---

export const listService = async (
  token: string,
  page: number = 1,
  perPage: number = 10
): Promise<PaginationResponse<Service>> => {
  const { data: json } = await axios.get(`${apiUrl}admin/listService?page=${page}&per_page=${perPage}`);
  return json.data;
};

export const listServiceByCategory = async (
  categoryId: number,
  token: string
): Promise<Service[]> => {
  const { data: json } = await axios.get(`${apiUrl}admin/listServiceByCategory/${categoryId}`);
  return json.data;
};

export const addService = async (
  data: CreateServicePayload,
  token: string
): Promise<Service> => {
  const res = await fetch(`${apiUrl}admin/addService`, {
      credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout du service");
  const json = await res.json();
  return json.data;
};

export const updateService = async (
  id: number,
  data: Partial<CreateServicePayload>,
  token: string
): Promise<Service> => {
  const res = await fetch(`${apiUrl}admin/updateService/${id}`, {
      credentials: "include",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la modification du service");
  const json = await res.json();
  return json.data;
};

// --- Service Items API (vraies API) ---

export const listServiceItem = async (
  serviceId: number,
  token: string
): Promise<ServiceItem[]> => {
  const { data: json } = await axios.get(`${apiUrl}admin/listserviceItem/${serviceId}`);
  return json.data;
};

export const addServiceItem = async (
  serviceId: number,
  items: { label: string; status: boolean }[],
  token: string
): Promise<ServiceItem[]> => {
  const res = await fetch(`${apiUrl}admin/addServiceItem/${serviceId}`, {
      credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout des items");
  const json = await res.json();
  return json.data;
};

export const updateServiceItem = async (
  itemId: number,
  data: { label: string; status: boolean },
  token: string
): Promise<ServiceItem> => {
  const res = await fetch(`${apiUrl}admin/updateServiceItem/${itemId}`, {
      credentials: "include",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la modification de l'item");
  const json = await res.json();
  return json.data;
};

export const deleteServiceItem = async (
  itemId: number,
  token: string
): Promise<void> => {
  const res = await fetch(`${apiUrl}admin/deleteServiceItem/${itemId}`, {
      credentials: "include",
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'item");

};

export const updateServiceStatus = async (
  serviceId: number,
  token: string
): Promise<void> => {
  try {
    
    const { data: json } = await axios.get(`${apiUrl}admin/actionService/${serviceId}`);
    console.log(json);
  } catch (error) {
    console.error('Error updating service status:', error);
    throw error;
  }

};
