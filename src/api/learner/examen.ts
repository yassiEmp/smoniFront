import { toast } from "react-hot-toast";
import { apiUrl } from "..";
import { AppDispatch } from "@/store/configureStore";
import { setExamens, } from "@/store/slices/AdminSlice";

export const getExamens = async (token: string, dispatch: AppDispatch, learner_id: number, page: number, perPage: number) => {
  try {
    const response = await fetch(`${apiUrl}list/examen/learner/${learner_id}?page=${page}&per_page=${perPage}`,
      {
      credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des examens.");
    }

    const data = await response.json();

    if (data && data.data) {
      dispatch(setExamens(data.data));
    } else {
      console.error("Aucune donnée d'examen reçue.");
      return [];
    }
  } catch (error: any) {
    toast.error(error.message || "Erreur inattendue lors de la récupération des examens.");
    return [];
  }
};