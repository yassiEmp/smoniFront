import { toast } from "react-hot-toast";
import { apiUrl } from ".";


export const getDocuments = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}user-docs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression du point de rendez-vous", error);
    return false;
  }
}

export const createDocument = async (token: string, name: string, file: File,) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  try {
    const response = await fetch(`${apiUrl}user-docs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      getDocuments(token)
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du document:", error);
    return false;
  }
};


export const deleteDocument = async (userDoc: number, token: string) => {
  try {
    const response = await fetch(`${apiUrl}user-docs/${userDoc}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    const data = await response.json();
    if (data.success) {
      getDocuments(token)
      return data;
    } else {
      toast.error(data.message);
      return false;
    }

  } catch (error) {
    console.error("Erreur lors de la suppression du document", error);
    return [];
  }
}


export const createInfosDocs = async(values: any, token: string) => {
  console.log(values)
  try {
    const response = await fetch(`${apiUrl}info-docs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        juridic_form: values.juridic_form,
        siret: values.siret,
        num_activity: values.num_activity,
        num_tva: values.num_tva,
        num_teach_authorization: values.num_teach_authorization,
        date_teach_permit: values.date_teach_permit,
        date_medical_visit: values.date_medical_visit,
        certification_number: values.certification_number,
        certification_issue_date: values.certification_issue_date
      })
    })

    const data = await response.json();
    if (data.success) {
      // toast.success(data.message);
      getDocuments(token)
      return data;
    } else {
      toast.error(data.message);
      return false;
    }
    
  } catch (error) {
    console.error("Erreur lors de la création des informations des documents", error);
    return false;
  }
}
