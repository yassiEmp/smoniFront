import { toast } from "react-hot-toast";
import { apiUrl } from "..";
import { formatHoursToSend } from "@/utils/dateUtils";
import { AppDispatch } from "@/store/configureStore";
import { setAvailabilities } from "@/store/slices/monitorSlice";
import { Appointment } from "@/types/monitor/settings/configuration";

export const createSpecialSlot = async (
  token: string,
  meeting_point_id: number,
  vehicle_id: number,
  day_of_week: string,
  date: string,
  start_time: number,
  end_time: number,
  dispatch: AppDispatch,
  dateMonday: string,
) => {
  const start_time_formatted = formatHoursToSend(start_time);
  const end_time_formatted = formatHoursToSend(end_time);
  try {
    const response = await fetch(`${apiUrl}availabilities `, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        meeting_point_id,
        vehicle_id,
        day_of_week,
        date,
        start_time: start_time_formatted,
        end_time: end_time_formatted,
      }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Créneau créé avec succès");
      getAvailabilities(token, dateMonday, dispatch);
      return true;
    } else {
      toast.error("Erreur lors de la création du créneau");
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la création du créneau");
    return false;
  }
};

export const createPlanningSpecial = async (
  token: string,
  meeting_point_id: number,
  vehicle_id: number,
  day_of_week: string,
  date: string,
  start_time: number,
  end_time: number,
) => {
  const start_time_formatted = formatHoursToSend(start_time);
  const end_time_formatted = formatHoursToSend(end_time);
  try {
    console.log("Créneau à envoyer :", {
      day_of_week,
      date,
    });
    const response = await fetch(`${apiUrl}availabilities `, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        meeting_point_id,
        vehicle_id,
        day_of_week,
        date,
        start_time: start_time_formatted,
        end_time: end_time_formatted,
      }),
    });
    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      toast.error("Erreur lors de la création du créneau");
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la création du créneau");
    return false;
  }
};


export const getAvailabilities = async (
  token: string,
  date: string,
  dispatch: AppDispatch,
) => {
  const response = await fetch(`${apiUrl}availabilities?date=${date}`, {
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
    // console.log("Availabilities fetched successfully", data.data);
    dispatch(setAvailabilities(data.data));
    return true;
  } else {
    return false;
  }
};

export const getAvailabilitieByDate = async(token:string,date:string) => {
  const response = await fetch(`${apiUrl}listByDate?date=${date}`, {
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  console.log("Availabilities fetched successfully", data.data);
  return data;
}

export const deleteAvailability = async (
  token: string,
  id: number,
  dispatch: AppDispatch,
  date: string,
) => {
  const response = await fetch(`${apiUrl}availabilities/${id}`, {
      credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
    toast.success("Créneau supprimé avec succès");
    getAvailabilities(token, date, dispatch);
    return true;
  } else {
    toast.error("Erreur lors de la suppression du créneau");
    return false;
  }
};

export const acceptAppointment = async (
  token: string,
  id: number,
  dispatch: AppDispatch,
  onClose: () => void,
  date: string,
  setAppointmentData?: (data: Appointment) => void,
  setIsConfirm?: (isConfirm: boolean) => void,
)  => {
  const response = await fetch(`${apiUrl}appointments/${id}/confirme`, {
      credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (data.success) {
    await getAvailabilities(token, date, dispatch);
    onClose();
    toast.success("Rendez-vous accepté avec succès");
    if(setAppointmentData){
      setAppointmentData(data.data);
    }
    setIsConfirm(data.data.status === "confirmed");
    return true;
  } else {
    toast.error("Erreur lors de l'acceptation du rendez-vous");
    return false;
  }
};

export const cancelAppointment = async (
  token: string,
  id: number,
  dispatch: AppDispatch,
  onClose: () => void,
  date: string,
  reason: string,
) => {
  const response = await fetch(`${apiUrl}appointments/${id}/cancel`, {
      credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      cancellation_reason: reason,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (data.success) {
    await getAvailabilities(token, date, dispatch);
    toast.success("Rendez-vous annulé avec succès");
    onClose();
    return true;
  } else {
    toast.error("Erreur lors de l'annulation du rendez-vous");
    return false;
  }
};

export const getAvailabilityRepeateds = async (token: string) => {
  const response = await fetch(`${apiUrl}availability-repeateds`, {
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data.data;
}

export const createAvailabilityRepeateds = async (token: string, data: {
  meeting_point_id: number,
  vehicle_id: number,
  day_of_week: string,
  time: {
    start: string,
    end: string
  }[]
}) => {
  const response = await fetch(`${apiUrl}availability-repeateds`, {
      credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      meeting_point_id: data.meeting_point_id,
      vehicle_id: data.vehicle_id,
      day_of_week: data.day_of_week,
      status: true,
      time: data.time,
    }),
  });
  const dataResponse = await response.json();
  if(dataResponse.success){
    return true;
  }else{
    return false;
  }
}

export const deleteAvailabilityRepeateds = async (token: string, day:string) => {
  const response = await fetch(`${apiUrl}availability-repeateds/${day}`, {
      credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const dataResponse = await response.json();
  if(dataResponse.success){
    return true;
  }else{
    return false;
  }
}

export const getUnbookedAvailabilities = async (
  token: string,
  dateFrom?: string,
  dateTo?: string,
  perPage?: number,
) => {
  const params = new URLSearchParams();
  
  if (dateFrom) params.append('date_from', dateFrom);
  if (dateTo) params.append('date_to', dateTo);
  if (perPage) params.append('per_page', perPage.toString());

  const queryString = params.toString();
  const url = `${apiUrl}availabilities/unbooked${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  
  const data = await response.json();
  
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message || 'Erreur lors de la récupération des disponibilités non réservées');
  }
}