import { apiUrl } from "@/api";

export async function fetchLearnerInfo(id: string | number, token: string) {
  const res = await fetch(`${apiUrl}admin/learners/${id}/show`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors de la récupération des infos");
  return res.json();
}
