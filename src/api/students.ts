import { apiUrl } from "./index";

export async function getStudents(token: string) {
  const res = await fetch(`${apiUrl}dashboard/listLearner`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des apprenants");
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}
