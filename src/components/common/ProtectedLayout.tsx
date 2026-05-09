import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/configureStore";
import UserBlockedCard from "@/components/common/UserBlockedCard";
import { getLearnerProfile } from "@/api/learner/profile";
import { useEffect } from "react";
import { updateUser } from "@/store/slices/authSlice"; 

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.authReducer);

  // Vérifier périodiquement le statut de l'utilisateur
useEffect(() => {
  if (!token) return;

  const checkUserStatus = async () => {
    try {
      const currentUser = await getLearnerProfile(token);
        dispatch(updateUser(currentUser.data)); 
    
    } catch (error) {
      console.error("Erreur vérification statut:", error);
    }
  };

  //  Vérifie immédiatement 
  checkUserStatus(); // Premier check immédiat


}, [token]);

  // Vérifier si user existe ET est inactif (0 = false, 1 = true)
  if (user && (user.is_active === false || user.is_active === 0)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <UserBlockedCard />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedLayout;