import { CategoryService, Service, CreateServicePayload, ServiceItem, PaginationResponse } from '@/types/admin/services';
import { apiUrl } from "@/api";

// --- Catégorie Service API (vraies API) ---

export const listCategoryService = async (token: string): Promise<CategoryService[]> => {
  const res = await fetch(`${apiUrl}admin/listCategoryService`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des catégories");
  const json = await res.json();
  return json.data;
};

export const addCategoryService = async (data: { label: string }, token: string): Promise<CategoryService> => {
  const res = await fetch(`${apiUrl}admin/addCategoryService`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout de la catégorie");
  const json = await res.json();
  return json.data;
};

export const updateCategoryService = async (id: number, data: { label: string }, token: string): Promise<CategoryService> => {
  const res = await fetch(`${apiUrl}admin/updateCategoryService/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la modification de la catégorie");
  const json = await res.json();
  return json.data;
};

export const deleteCategoryService = async (id: number, token: string): Promise<void> => {
  const res = await fetch(`${apiUrl}admin/deleteCategoryService/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
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
  const res = await fetch(`${apiUrl}admin/listService?page=${page}&per_page=${perPage}`, {
    headers: {
      method:"GET",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des services");
  const json = await res.json();
  return json.data;
};

export const listServiceByCategory = async (
  categoryId: number,
  token: string
): Promise<Service[]> => {
  const res = await fetch(`${apiUrl}admin/listServiceByCategory/${categoryId}`, {
    headers: {
      method:"GET",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des services par catégorie");
  const json = await res.json();
  return json.data;
};

export const addService = async (
  data: CreateServicePayload,
  token: string
): Promise<Service> => {
  const res = await fetch(`${apiUrl}admin/addService`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const res = await fetch(`${apiUrl}admin/listserviceItem/${serviceId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des items du service");
  const json = await res.json();
  return json.data;
};

export const addServiceItem = async (
  serviceId: number,
  items: { label: string; status: boolean }[],
  token: string
): Promise<ServiceItem[]> => {
  const res = await fetch(`${apiUrl}admin/addServiceItem/${serviceId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'item");

};

export const updateServiceStatus = async (
  serviceId: number,
  token: string
): Promise<void> => {
  try {
    
    const res = await fetch(`${apiUrl}admin/actionService/${serviceId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Erreur lors de la modification du statut du service");
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error('Error updating service status:', error);
    throw error;
  }

};
