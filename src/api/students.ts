import { apiUrl } from "./index";
import axios from "axios";

export async function getStudents(token: string) {
  const { data } = await axios.get(`${apiUrl}dashboard/listLearner`);
  return Array.isArray(data.data) ? data.data : [];
}
