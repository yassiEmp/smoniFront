import { apiUrl } from "../index";

export interface Sender {
  id: number;
  firstname: string;
  lastname: string;
  photo: string | null;
  email: string;
}

export interface Notification {
  id: number;
  sender_id: number;
  receiver_id: number;
  title: string;
  type: string;
  data: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  sender: Sender;
}

export interface NotificationsResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Notification[];
    next_page_url: string | null;
    total: number;
  };
}

// Récupérer les notifications avec pagination
export const fetchNotifications = async (
  token: string,
  type: "all" | "reserv" = "all",
  page = 1
): Promise<NotificationsResponse> => {
  const response = await fetch(
    `${apiUrl}userNotification?reserv=${type}&page=${page}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  // console.log("Notifications response:", data);
  return data;
};

// Marquer toutes les notifications comme lues
export const markAllAsRead = async (token: string) => {
  const response = await fetch(`${apiUrl}notif/allAsRead`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  // console.log("Mark all as read response:", data);
  return data;
};

// Marquer une notification comme lue
export const markOneAsRead = async (token: string, notification: number) => {
  const response = await fetch(`${apiUrl}notif/${notification}/oneAsRead`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  // console.log("Mark one as read response:", data);
  return data;
};
 
