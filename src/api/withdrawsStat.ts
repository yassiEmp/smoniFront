import { apiUrl } from "./index";

export interface WithdrawsStatResponse {
  billable: { hour: number; cash: number };
  no_billable: { hour: number; cash: number };
  admin_cash: number;
  tva_cash: number;
  my_cash: number;
  pendingWithdraw: number;
}


export async function fetchWithdrawsStat(token: string): Promise<WithdrawsStatResponse> {
  const res = await fetch(`${apiUrl}withdraws/stat`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des stats de paiement");
  const data = await res.json();
  return {
    billable: data.billable,
    no_billable: data.no_billable,
    admin_cash: data.admin_cash,
    tva_cash: data.tva_cash,
    my_cash: data.my_cash,
    pendingWithdraw: data.pendingWithdraw,
  };
}
