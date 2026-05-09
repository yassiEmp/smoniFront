import { apiUrl } from "./index";

export async function createWithdraw(token: string, numero: string) {
  const res = await fetch(`${apiUrl}withdraws`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numero }),
  });
  if (!res.ok) throw new Error("Erreur lors de la demande de retrait");
  return await res.json();
}
