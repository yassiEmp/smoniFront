import { toast } from "react-hot-toast";
import { AppDispatch } from "@/store/configureStore";
import { apiUrl } from "..";
import { setApointments } from "@/store/slices/monitorSlice";


export const getApointments = async (token: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10, status: string = 'all') => {
  try {
    const url = status === 'all' 
    ? `${apiUrl}appointments/lists?page=${page}&per_page=${perPage}&status=all`
    : `${apiUrl}appointments/lists?page=${page}&per_page=${perPage}&status=${status}`;
    
    const response = await fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    const data = await response.json();

    dispatch(setApointments(data.data.data));
    return data;

  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous", error);
    return [];
  }
}

export const postConfirmApointment = async (token: string, appointment: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10) => {
  try {
    const response = await fetch(`${apiUrl}appointments/${appointment}/confirme`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ appointment })
    })

    const data = await response.json();
    if (data.success) {
      toast.success("Confirmation du rendez-vous avec succès");
      getApointments(token, dispatch, page, perPage);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la confirmation du rendez-vous");
    return false;
  }
}

export const postCancelApointment = async (token: string, cancellation_reason: string, appointment: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10) => {
  try {
    const formData = new FormData();
    formData.append("cancellation_reason", cancellation_reason);

    const response = await fetch(`${apiUrl}appointments/${appointment}/cancel`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData
    })

    const data = await response.json();
    
    if (data.success) {
      toast.success("Annulation du rendez-vous avec succès");
      getApointments(token, dispatch, page, perPage);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de l'annulation du rendez-vous");
    return false;
  }
}

export const postPresenceApointment = async (token: string, appointment: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10) => {
  try {
    const response = await fetch(`${apiUrl}appointments/${appointment}/presence`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })

    const data = await response.json();

    if (data.success) {
      toast.success("Confirmation de la présence avec succès");
      getApointments(token, dispatch, page, perPage);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la confirmation de la présence");
    return false;
  }
}

export const postAbsenceApointment = async (token: string, reason: string, appointment: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10) => {
  try {
    console.log(reason, appointment)
    const response = await fetch(`${apiUrl}appointments/${appointment}/absence`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        reason
      }),
    })

    const data = await response.json();
    if (data.success) {
      toast.success("Confirmation de l'absence avec succès");
      getApointments(token, dispatch, page, perPage);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la confirmation de l'absence");
    return false;
  }
}

export const postFinishApointment = async (token: string, appointment: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10) => {
  try {
    console.log(appointment)
    const response = await fetch(`${apiUrl}appointments/${appointment}/finished`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })

    const data = await response.json();
    if (data.success) {
      toast.success("Confirmation de la fin du rendez-vous avec succès");
      getApointments(token, dispatch, page, perPage);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la confirmation de la fin du rendez-vous");
    return false;
  }
}

export const proposeCourse = async (
  token: string, 
  availabilityId: number, 
  studentId: number, 
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(`${apiUrl}appointments/propose`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        availability_id: availabilityId,
        learner_id: studentId,
        price: 0,
        tag: "Proposition de cours"
      })
    });

    const data = await response.json();
    
    if (data.success) {
      toast.success("Cours proposé avec succès à l'apprenant");
      return true;
    } else {
      toast.error(data.message || "Erreur lors de la proposition du cours");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la proposition du cours:", error);
    toast.error("Erreur lors de la proposition du cours");
    return false;
  }
}


