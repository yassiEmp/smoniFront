import { FormikValues } from "formik";
import { apiUrl } from "..";
import { toast } from "react-hot-toast";
import { updateUser } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/configureStore";
import { setLocations, setVehicles } from "@/store/slices/monitorSlice";
import { MeetingPointType } from "@/types/monitor/settings/configuration";
export const addNewVehicle = async (values: FormikValues, token: string, dispatch: AppDispatch) => {

  const formData = new FormData();
  formData.append("brand", values.brand);
  formData.append("model", values.model);
  formData.append("year", values.year);
  formData.append("plate_number", values.plate_number);
  formData.append("fuel_type", values.fuel_type);
  formData.append("gearbox_type", values.gearbox_type);
  formData.append("color", values.color);
  formData.append("photo_url", values.photo_url);
  formData.append("insurance_expiry", "");
  formData.append("technical_inspection_date", "");
  formData.append("status", "available");

  try {
    const response = await fetch(`${apiUrl}vehicles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success("Véhicule ajouté avec succès");
      getVehicles(token, dispatch);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la créations du véhicule:", error);
    return false;
  }
};

export const editVehicle = async (
  values: FormikValues,
  id: number,
  token: string,
  dispatch: AppDispatch,
) => {
  const formData = new FormData();
  formData.append("brand", values.brand);
  formData.append("model", values.model);
  formData.append("year", values.year);
  formData.append("plate_number", values.plate_number);
  formData.append("fuel_type", values.fuel_type);
  formData.append("gearbox_type", values.gearbox_type);
  formData.append("color", values.color);
  formData.append("insurance_expiry", '');
  formData.append("technical_inspection_date", '');
  
  if (values.photo_url instanceof File) {
      formData.append("photo_url", values.photo_url);
  }

  try {
    const response = await fetch(`${apiUrl}vehicles/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Véhicule modifié avec succès");
      getVehicles(token, dispatch);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mis-à-jour du véhicule:", error);
    return false;
  }
};

export const deleteVehicle = async (id: number, token: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${apiUrl}vehicles/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Véhicule supprimé avec succès");
      getVehicles(token, dispatch);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    return false;
  }
};

export const updateMonitor = async (
  data: FormikValues,
  dispatch: AppDispatch,
  token: string,
) => {
  const response = await fetch(`${apiUrl}profile/update/instructor`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      city: data.city,
      postal_code: data.postal_code,
      phone: data.phone,
      genre: data.gender,
    }),
  }); 
  const res = await response.json();
  if (response.ok) {
    toast.success("Le profil a été mis à jour avec succès");
    dispatch(updateUser(res.data));
  } else {
    toast.error("Erreur lors de la mise à jour");
  }
  return data;
};

export const updatePassword = async (data: { oldPassword: string; newPassword: string; confirmPassword: string },dispatch: AppDispatch,token: string) => {
  try {
    const response = await fetch(`${apiUrl}profile/update/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        older: data.oldPassword,
        password: data.newPassword,
        confirm: data.confirmPassword,
      }),
    });
    const res = await response.json();
    if (res.success) {
      toast.success(res.message);
      dispatch(updateUser(res.data));
      return true;
    } else {
      toast.error(res.message);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe");
    return false;
  }
};

export const getVehicles = async (token: string, dispatch: AppDispatch) => {
  const response = await fetch(`${apiUrl}vehicles`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  dispatch(setVehicles(data.data));
  return data;
};

export const updatePhoto = async (token: string, photo: File, dispatch: AppDispatch) => {
    const formData = new FormData();
    formData.append("photo", photo);

    try {
        const response = await fetch(`${apiUrl}profile/update/photo`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
            toast.success("La photo a été mise à jour avec succès");
            dispatch(updateUser(data.data));
            return true;
        } else {
            toast.error(data.message);
            return false;
        }
    } catch (error) {
    console.error("Erreur lors de la mise à jour de la photo:", error);
    return false;
  }
};

export const deletePhoto = async (token: string, dispatch: AppDispatch) => {
  const response = await fetch(`${apiUrl}profile/update/dropPhoto `, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    toast.success("La photo a été supprimée avec succès");
    dispatch(updateUser(data.data));
  } else {
    toast.error("Erreur lors de la suppression de la photo");
  }
  return data;
};

export const addMeetingPoint = async (values: MeetingPointType , token: string) => {
  const formData = new FormData();
  formData.append("label", values.label);
  formData.append("address", values.address);
  formData.append("city", values.city);
  formData.append("postal_code", values.postal_code);
  formData.append("latitude", values.latitude.toString());
  formData.append("longitude", values.longitude.toString());

  try {
    const response = await fetch(`${apiUrl}meeting-points`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du point de rendez-vous", error);
    return [];
  }
}

export const getMeetingPoints = async (token: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${apiUrl}meeting-points`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    const data = await response.json();
    
    dispatch(setLocations(data.data));
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des points de rendez-vous", error);
    return [];
  }
}

export const editMeetingPoint = async (values: MeetingPointType, meetingPoint: number, token: string) => {
  try {
    const response = await fetch(`${apiUrl}meeting-points/${meetingPoint}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        label: values.label,
        address: values.address,
        city: values.city,
        postal_code: values.postal_code,
        latitude: values.latitude,
        longitude: values.longitude,
        is_active: true
      })
    })

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la modification du point de rendez-vous", error);
    return [];
  }
}

export const deleteMeetingPoint = async (meetingPoint: number, token: string) => {
  try {
    const response = await fetch(`${apiUrl}meeting-points/${meetingPoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression du point de rendez-vous", error);
    return [];
  }
}

