import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/configureStore";
import { toast } from "react-hot-toast";
interface ProtectedRouteProps {
  requiredRole?: string;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, redirectTo = "/connexion" }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authReducer);

  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
    // return <Outlet />;
  } 

  if (requiredRole && user.role !== requiredRole) {
    if (user.role === "instructor" && requiredRole === "learner") {
      toast.error("Les moniteurs n'ont pas accès à l'espace apprenant");
      return <Navigate to="/monitor" replace />;
    }
    if (user.role === "learner" && requiredRole === "instructor") {
      toast.error("Les apprenants n'ont pas accès à l'espace moniteur");
      return <Navigate to="/learners" replace />;
    }
    if (user.role == "admin") {
      return <Navigate to="/admin" replace />;
    }
    toast.error("Vous n'avez pas les permissions pour accéder à cette page");
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;