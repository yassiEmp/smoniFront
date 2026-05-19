import { apiUrl } from "../index";

export interface ResetLearnerTestResponse {
  success: boolean;
  message: string;
}

export const resetLearnerTest = async (token: string, learnerId: number): Promise<ResetLearnerTestResponse> => {
  const response = await fetch(`${apiUrl}monitor/reset-learner-test`, {
      credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ learner_id: learnerId }),
  });

  const result = await response.json();
  
  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Erreur lors du reset du test");
  }
  
  return result;
};







