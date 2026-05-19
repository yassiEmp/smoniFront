import { apiUrl } from "../index";

export interface UpdatePasswordPayload {
  older: string;
  password: string;
  confirm: string;
}

export interface UpdatePasswordResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  code?: number;
}

export const updatePassword = async (
  token: string,
  data: UpdatePasswordPayload
): Promise<UpdatePasswordResponse> => {
  const response = await fetch(`${apiUrl}profile/update/password`, {
      credentials: "include",
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || result.status === false) {
    throw new Error(result.message || 'Une erreur est survenue');
  }

  return result;
};
