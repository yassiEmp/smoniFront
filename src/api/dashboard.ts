import { apiUrl } from "./index";

export interface DashboardStats {
  rdv_pending: number;
  cash: number;
  learners_count: number;
  count_learners_exam: number;
}

export async function fetchDashboardStats(token: string): Promise<DashboardStats> {
  const res = await fetch(`${apiUrl}dashboard/stat`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des stats dashboard");
  const data = await res.json();
  return {
    rdv_pending: data.rdv_pending ?? 0,
    cash: data.cash ?? 0,
    learners_count: data.learners_count ?? 0,
    count_learners_exam: data.count_learners_exam ?? 0,
  };
}
