import { setApprenants, setModules } from "@/store/slices/monitorSlice";
import { AppDispatch } from "@/store/configureStore";
import { apiUrl } from "..";
import { PaginationResponse1, ModuleResponse } from "@/types/monitor/settings/configuration";
import { getApointments } from "./rendezvous";

export const getApprenants = async (user: number, token: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10): Promise<PaginationResponse1> => {
  try {
    const response = await fetch(`${apiUrl}appointments/${user}/instructor?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    const data = await response.json();
    dispatch(setApprenants(data.data));
    
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des apprenants", error);
    throw error;
  }
}


export const getLeconApprenants = async (user: number, token: string) => {
  try {
    const response = await fetch(`${apiUrl}appointments/${user}/lessons`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    const data = await response.json();    
    return data;

  } catch (error) {
    console.error("Erreur lors de la récupération des leçons", error);
    return [];
  }
}

export const getCommentApprenants = async (user: number, token: string, page: number = 1, perPage: number = 10) => {
  try {
    const response = await fetch(`${apiUrl}appointments/${user}/comments?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    const data = await response.json();    
    return data;

  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires", error);
    throw error;
  }
}

export const addCommentApprenant = async (student_id: number, token: string, comment: string) => {
  try {
    const response = await fetch(`${apiUrl}appointments/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ student_id, comment })
    })

    const data = await response.json();
    getCommentApprenants(student_id, token, 1, 10);
    return data;  

  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire", error);
    throw error;
  }
}

export const updateCommentApprenants = async (note: number, comment: string, token: string) => {
  
  try {
    const response = await fetch(`${apiUrl}appointments/${note}/updateComment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`  
      },
      body: JSON.stringify({ comment })
    })

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire", error);
    throw error;
  }
}


export const getLearnerProgress = async (user: number, token: string, dispatch: AppDispatch): Promise<ModuleResponse> => {
  try {
    const response = await fetch(`${apiUrl}modules/${user}/module`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    const data = await response.json();
    
    if (data.success) {
      dispatch(setModules(data.data));
    }
    return data;

  } catch (error) {
    console.error("Erreur lors de la récupération du progrès de l'apprenant", error);
    throw error;
  }
}

export const postLearnerCompetences = async (appointment: number, competences: number[], token: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${apiUrl}modules/${appointment}/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ competences })
    })

    const data = await response.json();
    getApointments(token, dispatch);
    return data;
    
  } catch (error) {
    console.error("Erreur lors de l'envoi des compétences notées", error);
    throw error;
  }
}



