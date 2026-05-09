import { toast } from "react-hot-toast";
import { apiUrl } from "..";
import { setMonitors } from "@/store/slices/AdminSlice";

export const getMonitors = async (token: string, dispatch: any, page: number = 1, perPage: number = 10, status: string = "all") => {
  const url = status === 'all' 
  ? `${apiUrl}admin/monitors?page=${page}&per_page=${perPage}&status=all`
  : `${apiUrl}admin/monitors?page=${page}&per_page=${perPage}&status=${status}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  dispatch(setMonitors(data.data));
  return data;
};

export const toggleMonitorStatus = async (token: string, monitorId: string, dispatch: any) => {
  const response = await fetch(`${apiUrl}admin/monitors/${monitorId}/action`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.success) {
    getMonitors(token, dispatch);
    toast.success("Statut modifié avec succès");
  } else {
    toast.error("Une erreur est survenue");
  }
  return data;
};

export const getMonitorDetails = async (token: string, monitorId: string) => {
  const response = await fetch(`${apiUrl}admin/monitors/${monitorId}/show`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getMonitorsLeaners = async (token: string,monitorId: number, page = 1, perPage = 10) => {
  const response = await fetch(`${apiUrl}admin/monitors/${monitorId}/listLearner?page=${page}&per_page=${perPage}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getMonitorsApointements = async (token: string, monitorId: number, page = 1, perPage = 10) => {
  const response = await fetch(`${apiUrl}admin/monitors/${monitorId}/listAppointment?page=${page}&per_page=${perPage}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
};


export const getMonitorsAvailibilities = async (token: string, monitorId: number, date: string) => {
  const response = await fetch(`${apiUrl}admin/monitors/${monitorId}/listAvailabilities?date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
};

export const allgetMonitorsWithdraws = async (token: string, page = 1, perPage = 10, status = "") => {
  console.log(status)
  const url = status === '' 
  ? `${apiUrl}admin/withdraws?page=${page}&per_page=${perPage}`
  : `${apiUrl}admin/withdraws?page=${page}&per_page=${perPage}&status=${status}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getWithdrawDetails = async (token: string, withdrawId: number) => {
  const response = await fetch(`${apiUrl}admin/withdraws/${withdrawId}/show`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const approveWithdraw = async (token: string, withdrawId: number) => {
  const response = await fetch(`${apiUrl}admin/withdraws/${withdrawId}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response.json();
};

export const declineWithdraw = async (token: string, withdrawId: number) => {
  const response = await fetch(`${apiUrl}admin/withdraws/${withdrawId}/decline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },  });

  return response.json();
};

export const updateMonitorHourPrice = async (token: string, instructor_id: number, hour_ammount: number) => {
  console.log(instructor_id);
  
  const response = await fetch(`${apiUrl}admin/monitors/hourPrice`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ hour_ammount, instructor_id }),
  });
  return response.json();
};

export const updateMonitorHourDiscount = async (token: string, instructor_id: number, hour_discount: number) => {
  const response = await fetch(`${apiUrl}admin/monitors/hourDiscount`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ hour_discount, instructor_id }),
  });
  return response.json();
};

