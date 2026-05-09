import { apiUrl } from "@/api";
import {
  BoutiqueCategoriesResponse,
  BoutiqueServicesResponse
} from "./types";

// Récupérer les catégories de services boutique
export const fetchBoutiqueCategories = async (): Promise<BoutiqueCategoriesResponse> => {
  const response = await fetch(`${apiUrl}services/categories`, {
    headers: { 
      method: 'GET',
      Accept: "application/json"
     } 
  });
  if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
  return response.json();
};

// Récupérer la liste des services pour une catégorie et un type
export const fetchBoutiqueServices = async (
  category_id: number,
  type?: string
): Promise<BoutiqueServicesResponse> => {
  let url = `${apiUrl}services?category_id=${category_id}`;
  if (type) url += `&type=${type}`;
  const response = await fetch(url, {
    headers: {
      method: 'GET',
       Accept: "application/json" 
      }
  });
  if (!response.ok) throw new Error("Erreur lors du chargement des services");
  return response.json();
};
