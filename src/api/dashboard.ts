import { apiUrl } from "./index";
import axios from "axios";

export interface DashboardStats {
  rdv_pending: number;
  cash: number;
  learners_count: number;
  count_learners_exam: number;
}

export async function fetchDashboardStats(token: string): Promise<DashboardStats> {
  const { data } = await axios.get(`${apiUrl}dashboard/stat`);
  return {
    rdv_pending: data.rdv_pending ?? 0,
    cash: data.cash ?? 0,
    learners_count: data.learners_count ?? 0,
    count_learners_exam: data.count_learners_exam ?? 0,
  };
}
