export interface Withdrawal {
  id: number;
  monitor_id: number;
  ammount: number;
  total_ttc?: number;
  duration: number;
  payed: boolean;
  currency: string;
  invoice_code: string | null;
  invoice_file: string | null;
  created_at: string;
  updated_at: string;
  monitor: {
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    phone: string;
    genre: string;
    role: string;
    is_active: boolean;
    photo: string | null;
  };
}

export interface WithdrawalApiResponse {
  current_page: number;
  data: Withdrawal[];  
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number; 
}
