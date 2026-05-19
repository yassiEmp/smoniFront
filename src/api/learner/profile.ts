import { apiUrl } from "../index";
import { LearnerProfileUpdate, LearnerProfileResponse } from "@/types/learner";
import { Dispatch } from "@reduxjs/toolkit";
import { updateUser } from "@/store/slices/authSlice";
import { LearnerProfileComplete } from "@/types/learner";


export const getLearnerProfile = async (token: string): Promise<LearnerProfileComplete> => {
  const response = await fetch(`${apiUrl}profile/learner`, {
      credentials: "include",
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du profil');
  }

  return response.json();
};



export const updateLearnerProfile = async (
  data: LearnerProfileUpdate,
  token: string,
  dispatch: Dispatch
): Promise<LearnerProfileResponse> => {
  const response = await fetch(`${apiUrl}profile/update/learner`, {
      credentials: "include",
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (response.ok) {
    // Recharger le profil complet après la mise à jour
    const completeProfile = await getLearnerProfile(token);
    
    // Mettre à jour Redux avec les nouvelles données
    dispatch(updateUser({
      ...data,
      learner_profile: completeProfile.data.learner_profile
    }));
  }

  return result;
};



export const updateDocLearner = async (
  data: {
    identity?: File | null;
    accommodation?: File | null;
    authorize?: File | null;
    identityPhoto?: File | null;
    assr?: File | null;
    cip?: File | null;
    medicalVisit?: File | null;
    snu?: File | null;
    neph?: string | null;
  },
  token: string,
  dispatch: Dispatch
) => {
  try {
    const formData = new FormData();

    if (data.identity) formData.append("identity", data.identity);
    if (data.accommodation) formData.append("accommodation", data.accommodation);
    if (data.authorize) formData.append("authorize", data.authorize);
    if (data.identityPhoto) formData.append("identityPhoto", data.identityPhoto);
    if (data.assr) formData.append("assr", data.assr);
    if (data.cip) formData.append("cip", data.cip);
    if (data.medicalVisit) formData.append("medicalVisit", data.medicalVisit);
    if (data.snu) formData.append("snu", data.snu);
    if (data.neph) formData.append("neph", data.neph);

    const response = await fetch(`${apiUrl}profile/update/doclearner`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      // après upload, on recharge le profil complet
      const profileResponse = await fetch(`${apiUrl}profile/learner`, {
      credentials: "include",
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      const completeProfile: LearnerProfileComplete = await profileResponse.json();

      // Mise à jour Redux avec les nouvelles données
      dispatch(updateUser({
        ...completeProfile.data
      }));
    }

    return result;
  } catch (error) {
    console.error("Erreur updateDocLearner:", error);
    throw error;
  }
};
