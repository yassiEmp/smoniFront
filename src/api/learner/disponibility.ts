import { apiUrl } from "..";


export const addDisponibility = async (datesearch: string, gearbox: string, meeting_point: string, token: string) => {
  console.log(datesearch, gearbox, meeting_point)
  try {
    const response = await fetch(`${apiUrl}learner/display/availabilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ datesearch, gearbox, meeting_point })
    })

    const data = await response.json();
    // console.log(data)
    return data;

  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire", error);
    throw error;
  }
}


export const addAppointments = async (availability_id: number,token: string) => {
  try {
    const response = await fetch(`${apiUrl}appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ availability_id, price:0, tag:'string' })
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur lors de l'ajout du rendez-vous", error);
    throw error;
  }
}




