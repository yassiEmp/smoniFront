import { apiUrl } from "../index";
import { setSubscriptions } from "@/store/slices/subscriptionSlice";
import { AppDispatch } from "@/store/configureStore";

export interface LearnerSubscription {
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
  hour: number | null;
  service: {
    id: number;
    category_service_id: number;
    title: string;
    price: string;
    type: string;
    created_at: string;
    updated_at: string;
    time: number;
    items: {
      id: number;
      service_id: number;
      label: string;
      status: boolean;
      created_at: string;
      updated_at: string;
    }[];
  };
}

export interface LearnerSubscriptionsResponse {
  success: boolean;
  data: {
    current_page: number;
    data: LearnerSubscription[];
    total: number;
    // ...autres champs de pagination si besoin
  };
}

// Ajout d'une version qui sauvegarde dans redux
export const fetchLearnerSubscriptions = async (
  token: string,
  learnerId: number,
  dispatch?: AppDispatch
): Promise<LearnerSubscriptionsResponse> => {
  const response = await fetch(`${apiUrl}services/mySubscrube/${learnerId}`, {
      credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error("Erreur lors du chargement des abonnements");
  const data = await response.json();
  if (dispatch && data?.data?.data) {
    dispatch(setSubscriptions(data.data.data));
  }
  return data;
};
