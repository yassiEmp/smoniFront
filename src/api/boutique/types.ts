export interface BoutiqueCategory {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface BoutiqueItem {
  id: number;
  service_id: number;
  label: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface BoutiqueService {
  id: number;
  category_service_id: number;
  title: string;
  price: string;
  type: string;
  created_at: string;
  updated_at: string;
  time: number;
  category: BoutiqueCategory;
  items: BoutiqueItem[];
}

export interface BoutiqueCategoriesResponse {
  success: boolean;
  data: BoutiqueCategory[];
}

export interface BoutiqueServicesResponse {
  success: boolean;
  data: BoutiqueService[];
  message?: string;
}
