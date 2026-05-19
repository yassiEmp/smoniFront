import { toast } from "react-hot-toast";
import { apiUrl } from "..";



export const getStatesAdmin = async (token: string) => {
  const response = await fetch(`${apiUrl}admin/dashboard`,{
      credentials: "include",
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
  });

  const data = await response.json();  
  return data;
};

export const getGraphAdmin = async (token: string) => {
  const response = await fetch(`${apiUrl}admin/graph`,{
      credentials: "include",
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
  });

  const data = await response.json();
  return data;
};

export const getGraphWithdrawalYear = async (year:string, token: string) => {
  const response = await fetch(`${apiUrl}admin/withdrawalYear?year=${year}`,{
      credentials: "include",
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
  });

  const data = await response.json();
  return data;
};