import { toast } from "react-hot-toast";
import { apiUrl } from "..";
import { setAdmins } from "@/store/slices/AdminSlice";
import { AppDispatch } from "@/store/configureStore";


export const getAdmins = async (token: string, dispatch: AppDispatch, page: number = 1, perPage: number = 10, status: string = "all") => {
  
  const url = status === 'all' 
  ? `${apiUrl}admin?page=${page}&per_page=${perPage}&status=all`
  : `${apiUrl}admin?page=${page}&per_page=${perPage}&status=${status}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await response.json();
  
  dispatch(setAdmins(data.data));
  return data;
};

export const addAdmins = async (token: string, dispatch: AppDispatch, values: { lastname: string; firstname: string; email: string; password: string }) => {
  const formData = new FormData();
  formData.append('lastname', values.lastname);
  formData.append('firstname', values.firstname);
  formData.append('email', values.email);
  formData.append('password', values.password);

  try {
    const response = await fetch(`${apiUrl}admin/addAdmin`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      await getAdmins(token, dispatch);
    }
    return data;

  } catch (error: any) {
    toast.error("Erreur lors de l'ajout de l'administrateur.");
    throw error;
  }
};

export const toggleAdminStatus = async (token: string, user: number, dispatch: AppDispatch) => {
  const response = await fetch(`${apiUrl}admin/${user}/action`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.success) {
    getAdmins(token, dispatch);
    toast.success("Statut modifié avec succès");
  } else {
    toast.error("Une erreur est survenue");
  }
  return data;
};


export const deleteAdmin = async (user: number, token: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${apiUrl}admin/${user}/deleteAdmin`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json();

    if (data.success) {
      toast.success(data.message)
      getAdmins(token, dispatch);
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'admin", error);
    return [];
  }
}