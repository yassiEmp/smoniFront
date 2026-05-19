import { apiUrl } from "../index";

export interface Competence {
  id: number;
  name: string;
  is_check: boolean;
}

export interface SubModule {
  id: number;
  code: string;
  name: string;
  stat: number;
  pdf:string;
  competence: Competence[];
}

export interface Module {
  id: number;
  code: string;
  name: string;
  stat: number;
  subModule: SubModule[];
}

export interface ProgressResponse {
  success: boolean;
  progress: number; // Progression totale
  data: Module[];
}

export const fetchProgress = async (token: string, userId: string | undefined): Promise<ProgressResponse> => {
 
    const response = await fetch(`${apiUrl}admin/learners/${userId}/userProgress`, {
      credentials: "include",
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors du chargement de la progression');
  }

  return response.json();
};
