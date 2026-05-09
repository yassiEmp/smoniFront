export interface CategoryService {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: number;
  service_id:number;
  label: string;
  status: boolean;
}

export interface Service {
  id: number;
  category_service_id: number;
  title: string;
  price: number;
  time: number;
  type: 'automatic' | 'manual';
  hour: number | null;
  status: boolean;
  items: ServiceItem[];
}

export interface CreateServicePayload {
  category_service_id: string;
  title: string;
  price: number;
  type: 'automatic' | 'manual';
  time: number;
  hour: number | null;
  items: Array<{
    label: string;
    status: boolean;
  }>;
}

export interface CreateServiceItemPayload {
  service_id: number;
  label: string;
  status: boolean;
}

export interface PaginationResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
  next_page_url?: string | null;
  prev_page_url?: string | null;
}
