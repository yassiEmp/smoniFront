import { apiUrl } from "../index";

export const deleteAccount = async (token: string) => {
  const response = await fetch(`${apiUrl}profile/deleteCompte`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (!response.ok || result.status === false) {
    throw new Error(result.message || "Erreur lors de la suppression du compte");
  }
  return result;
};
