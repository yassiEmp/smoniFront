import { toast } from "react-hot-toast";
import { apiUrl } from "..";
import { setExamens } from "@/store/slices/AdminSlice";
import { AppDispatch } from "@/store/configureStore";

export const getExamens = async (token: string, dispatch: AppDispatch, monitor_id: number, page: number = 1, perPage: number = 10, status: string = 'all') => {
  try {
    const url = status === 'all' 
    ? `${apiUrl}list/examen/monitor/${monitor_id}?page=${page}&per_page=${perPage}&status=all`
    : `${apiUrl}list/examen/monitor/${monitor_id}?page=${page}&per_page=${perPage}&status=${status}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des examens.");
    }

    const data = await response.json();

    if (data.success) {
      dispatch(setExamens(data.data));
      return data.data;
    } else {
      console.error("Aucune donnée d'examen reçue.");
      return [];
    }
  } catch (error: any) {
    console.log(error.message || "Erreur inattendue lors de la récupération des examens.");
    return [];
  }
};

// Ajout : updateExamenStatus
export const updateExamenStatus = async (token: string, examen_id: number, status: 'confirmed' | 'refused', dispatch: AppDispatch, monitor_id: number, currentPage: number, perPage: number
) => {
  try {
    const response = await fetch(`${apiUrl}mark/examen/monitor`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ examen_id, status }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du statut de l'examen.");
    }
    const data = await response.json();
    if (data.success) {
      toast.success('Statut de l\'examen mis à jour');
      getExamens(token, dispatch, monitor_id, currentPage, perPage);
      return true;
    } else {
      toast.error(data.message || "Erreur lors de la mise à jour du statut de l'examen.");
      return false;
    }
  } catch (error: any) {
    toast.error(error.message || "Erreur inattendue lors de la mise à jour du statut de l'examen.");
    return false;
  }
};