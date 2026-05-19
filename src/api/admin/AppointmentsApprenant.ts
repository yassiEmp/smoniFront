import { apiUrl } from "@/api";

export interface Instructor {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  genre: string;
  is_active: boolean;
  photo: string | null;
}

export interface Appointment {
  id: number;
  learner_id: number;
  instructor_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  cancellation_reason: string | null;
  price: string;
  lesson_notes: string | null;
  presence_student: boolean;
  presence_monitor: boolean;
  finished: boolean;
  tag: string | null;
  created_at: string;
  updated_at: string;
  instructor: Instructor;
}

export interface AppointmentsResponse {
  success: boolean;
  data: Appointment[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export async function fetchAppointmentsApprenant(
  token: string,
  userId: number,
  page = 1,
  perPage = 10
): Promise<AppointmentsResponse> {
  const response = await fetch(
    `${apiUrl}admin/learners/${userId}/lessonLearner?page=${page}&per_page=${perPage}`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("Erreur lors du chargement des rendez-vous");
  const data = await response.json();
  // Ajout pagination fallback si non présent dans la réponse
  return {
    ...data,
    current_page: data.current_page ?? page,
    last_page: data.last_page ?? 1,
    per_page: data.per_page ?? perPage,
    total: data.total ?? data.data?.length ?? 0,
  };
}