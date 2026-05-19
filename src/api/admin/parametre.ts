import { toast } from "react-hot-toast";
import { apiUrl } from "..";
import { AppDispatch } from "@/store/configureStore";
import { FormikValues } from "formik";
import { updateUser } from "@/store/slices/authSlice";


export const updateAdmin = async (data: FormikValues,dispatch: AppDispatch,token: string,) => {
  console.log(data)
  const response = await fetch(`${apiUrl}profile/update/admin`, {
      credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      genre: data.gender,
    }),
  }); 

  const res = await response.json();
  console.log(res)
  if (response.ok) {
    toast.success("Le profil a été mis à jour avec succès");
    dispatch(updateUser(res.data));
  } else {
    toast.error("Erreur lors de la mise à jour");
  }
  return data;
};
