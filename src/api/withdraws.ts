import { apiUrl } from "./index";
import axios from "axios";

export async function createWithdraw(token: string, numero: string) {
  const { data } = await axios.post(`${apiUrl}withdraws`, { numero });
  return data;
}
