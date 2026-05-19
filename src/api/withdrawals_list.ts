import { apiUrl } from "./index";
import axios from "axios";
import { WithdrawalApiResponse } from "@/types/withdrawals";

export async function fetchWithdrawals(
  token: string,
  status: string | null,
  per_page?: number,
  page?: number
): Promise<WithdrawalApiResponse> {
  const url = new URL(apiUrl + "withdraws/list_monitor");
  if (status !== null) url.searchParams.append("status", status);
  url.searchParams.append("per_page", per_page.toString());
  url.searchParams.append("page", page.toString());

  const { data: response } = await axios.get(url.toString());
  
  // Vérifier la structure de la réponse et retourner les bonnes données
  if (response.success && response.data) {
    // L'API retourne les données de pagination dans response.data
    // Donc on retourne response.data qui contient déjà current_page, data, total, etc.
    return response.data;
  } else {
    throw new Error("Structure de réponse API inattendue");
  }
}