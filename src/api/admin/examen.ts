import { toast } from "react-hot-toast";
import { apiUrl } from "..";
import { AppDispatch } from "@/store/configureStore";
import { setExamens, } from "@/store/slices/AdminSlice";
import type { LearnerListResponse } from "@/api/admin/ListLearners";


export const getExamens = async (token: string, dispatch: AppDispatch, page: number, perPage: number, status: string = "all") => {
  try {
    const url = status === 'all' 
    ? `${apiUrl}admin/learners/list/examen?page=${page}&per_page=${perPage}&status=all`
    : `${apiUrl}admin/learners/list/examen?page=${page}&per_page=${perPage}&status=${status}`;
    
    const response = await fetch(url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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

export const getMonitors = async (token: string,page: number = 1,perPage: number = 10,search: string = "") => {
  try {
    const searchParam = search ? `&q=${encodeURIComponent(search)}` : '';
    const response = await fetch(
      `${apiUrl}admin/monitors?page=${page}&per_page=${perPage}${searchParam}&status=all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des moniteurs.");
    }

    const data = await response.json();

    // On ne touche plus au Redux ici, on renvoie juste les données
    return data;
  } catch (error: any) {
    console.error(error?.message || "Erreur inattendue lors de la récupération des moniteurs.");
    return { data: { data: [] } };
  }
};

export const fetchLearners = async (token: string,page: number = 1,perPage: number = 10,search: string = ""): Promise<LearnerListResponse> => {
  try {
    // Correction de l'URL - paramètres bien formatés
    const searchParam = search ? `&q=${encodeURIComponent(search)}` : '';
    const response = await fetch(`${apiUrl}admin/learners?page=${page}&per_page=${perPage}${searchParam}&status=all`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des apprenants");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Erreur lors du chargement des apprenants:", error);
    throw new Error(error?.message || "Erreur inattendue lors du chargement des apprenants");
  }
};
export const addExamen = async (token: string, dispatch: AppDispatch, instructor_id: number, learner_id: number, datetime: string) => {
  const formData = new FormData();
  formData.append("instructor_id", instructor_id.toString());
  formData.append("learner_id", learner_id.toString());
  formData.append("date", datetime);
  formData.append("datetime", datetime);

  try {
    const response = await fetch(`${apiUrl}admin/learners/add/examen`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    // console.log(response.json())

  
    //  new Error("Erreur lors de l'ajout de l'examen : " + response.message);


    const data = await response.json();

    console.log(data)

    if (data.success) {
      toast.success("Examen ajouté avec succès");
      getExamens(token, dispatch, 1, 10);
      return data.data;
    } else {
      console.error(data.message);
      return data.data;
    }
  } catch (error: any) {
    toast.error(error.message || "Erreur inattendue lors de l'ajout de l'examen.");
    return [];
  }
};


export const updateExamen = async (token: string, dispatch: AppDispatch, examen: number, instructor_id: number, learner_id: number, date: string) => {
  try {
    const response = await fetch(`${apiUrl}admin/learners/update/examen/${examen}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ instructor_id, learner_id, date, }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'examen.");
    }

    const data = await response.json();

    if (data && data.data) {
      getExamens(token, dispatch, 1, 10);
      return data.data;
    } else {
      console.error("Aucune donnée d'examen reçue.");
      return [];
    }
  } catch (error: any) {
    toast.error(error.message || "Erreur inattendue lors de la mise à jour de l'examen.");
    return [];
  }
};


export const deleteExamen = async (token: string, dispatch: AppDispatch, examen: number) => {
  try {
    const response = await fetch(`${apiUrl}admin/learners/delete/examen/${examen}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'examen.");
    }

    const data = await response.json();

    if (data.success) {
      toast.success("Examen supprimé avec succès");
      getExamens(token, dispatch, 1, 10);
    } else {
      console.error("Aucune donnée d'examen reçue après suppression.");
      return [];
    }
  } catch (error: any) {
    toast.error(error.message || "Erreur inattendue lors de la suppression de l'examen.");
    return [];
  }
};


