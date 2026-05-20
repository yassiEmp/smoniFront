import { logout } from "@/store/slices/authSlice";
import { NavigateFunction } from "react-router";
import { Dispatch } from "@reduxjs/toolkit";
import { onboardingService } from "@/services/onboardingService";
import { setLogoutMonitor } from "@/store/slices/monitorSlice";
import { setLogoutSubscription } from "@/store/slices/subscriptionSlice";

export const handleLogout = (dispatch: Dispatch, navigate: NavigateFunction) => {
  // Récupérer l'userId du localStorage avant de le vider
  const userId = localStorage.getItem('smoni_user_id');
  
  // Reset l'onboarding si un userId existe
  if (userId) {
    onboardingService.resetOnboarding(userId);
  }
  
  // Nettoyer le localStorage
  localStorage.clear();
  
  dispatch(logout());
  dispatch(setLogoutMonitor());
  dispatch(setLogoutSubscription());
  navigate("/connexion");
};
