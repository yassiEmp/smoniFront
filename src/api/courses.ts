import { apiUrl } from "./index";
import { Course } from "@/types/course";

export interface Learner {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  photo: string | null;
}

export interface CoursesApiResponse {
  current_page: number;
  data: Course[];
  last_page: number;
  next_page_url: string | null;
}

export async function fetchCourses(token: string, page = 1): Promise<CoursesApiResponse> {
  const res = await fetch(`${apiUrl}dashboard/lists?page=${page}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des cours");
  const json = await res.json();
  return {
    current_page: json.data.current_page,
    data: json.data.data,
    last_page: json.data.last_page,
    next_page_url: json.data.next_page_url,
  };
}
