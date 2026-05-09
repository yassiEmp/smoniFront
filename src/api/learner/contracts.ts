import { apiUrl } from "../index";

export interface Contract {
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
    amount: string;
    transaction_id: string;
    mode: string;
    status: string;
    created_at: string;
    updated_at: string;
    service: {
      id: number;
      category_service_id: number;
      title: string;
      price: string;
      type: string;
      created_at: string;
      updated_at: string;
      time: number;
      hour: number | null;
    };
  };
}

export interface ContractsResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Contract[];
    total: number;
    
  };
}

export const fetchLearnerContracts = async (
  token: string
): Promise<ContractsResponse> => {
  const response = await fetch(`${apiUrl}services/contrat`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erreur lors du chargement des contrats");
  return response.json();
}; 



