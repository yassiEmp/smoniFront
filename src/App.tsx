import Condition from "@pages/generales/Condition";
import Contact from "@pages/generales/Contact";
import Details from "@pages/generales/Details";
import Details1 from "@pages/generales/Details1";
import Details2 from "@pages/generales/Details2";
import Details3 from "@pages/generales/Details3";
import Details4 from "@pages/generales/Details4";
import Details5 from "@pages/generales/Details5";
import Details6 from "@pages/generales/Details6";
import Details7 from "@pages/generales/Details7";
import Home from "@pages/generales/Home";
import Maintenance from "@pages/generales/Maintenance";
import Politique from "@pages/generales/Politique";
import Ressources from "@pages/generales/Ressources";
import Service from "@pages/generales/Service";
import Tarif from "@pages/generales/Tarif";
import APropos from "@pages/generales/APropos";
import Quiz from "@pages/generales/Quiz";
import BlogIndex from "@pages/generales/BlogIndex";
import BlogArticle from "@pages/generales/BlogArticle";
import { Route, Routes, useLocation, Navigate } from "react-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/configureStore";
import LoginPage from "@pages/auth/LoginPage";
import ResetPasswordPage from "@pages/auth/reset-password/ResetPasswordPage";
import RegisterPage from "@pages/auth/RegisterPage";
import ApprenantLayout from "@components/learners/ApprenantLayout";
import Boutique from "@pages/learners/boutique/Boutique";
import { default as LearnerDashboard } from "@pages/learners/dashboard/Dashboard";
import Code from "@pages/learners/code/Code";
import Conduite from "@pages/learners/conduite/Conduite";
import Examens from "@pages/learners/examens/Examens";
import ReserverLecon from "@pages/learners/ReserverLecon";
import Parametres from "@/components/learners/Parametres/Parametres";
import Assistance from "@pages/moniteur/Assistance";
import Settings from "@pages/moniteur/Settings";
import Apprenants from "@pages/moniteur/Apprenants";
import Planing from "@pages/moniteur/Planing";
import MonitorLayout from "./layout/MonitorLayout";
import PlanningComponent from "@components/moniteurs/PlanningComponent";
import { default as MonitorDashboard } from "@pages/moniteur/Dashboard";
import { default as AdminDashboard } from "@pages/admin/Dashboard";
import PaiementMain from "@pages/moniteur/Paiement";
import CustomToast from "@components/generales/CustomToast";
import ProtectedRoute from "./middleware/ProtectedRoute";
import TransactionHistory from "@components/moniteurs/TransactionHistory";
import RendezVous from "./pages/moniteur/RendezVous";
import PaymentSucccess from "./pages/payment/PaymentSucccess";
import AdminLayout from "./layout/AdminLayout";
import MonitorAdmin from "./pages/admin/Monitor";
import SettingsAdmin from "./pages/admin/Settings";
import AdministratorAdmin from "./pages/admin/Administrateur"
import MonitorLeanerListe from "./pages/admin/MonitorLeanerListe";
import MonitorApointementListe from "./pages/admin/MonitorApointementListe";
// import MonitorPlanning from "./pages/admin/Planning";
import ListLearners from "./pages/admin/Learners/ListLearners";
import ApprenantDetailsPage from "@pages/admin/Learners/ApprenantDetailsPage";
import MonitorAvalibilities from "./pages/admin/MonitorAvalibilities";
import Services from "./pages/admin/services/Service";
import CodeRoute from "./pages/admin/CodeRoute";
import MonitorShow from "./components/admin/MonitorShow";
import AdminPaiement from "./pages/admin/Paiement";
import Examen from "./pages/admin/Examen";
import MonitorExamen from "./pages/moniteur/MonitorExamen";
import { QuizPage, QuizResults, QuizHistory } from "@pages/learners/Quiz";


function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      // Delay to ensure target component mounted
      const timeoutId = window.setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [location]);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomToast />
          <Routes>
            {/* Routes publiques principales */}
            <Route index element={<Home />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/services" element={<Service />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/tarifs" element={<Tarif />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/privacypolicy" element={<Politique />} />
            <Route path="/cgu" element={<Condition />} />
            <Route path="/maintenance" element={<Maintenance />} />

            {/* Blog routes */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />

            {/* Routes de détails */}
            <Route path="/location" element={<Details />} />
            <Route path="/conduite" element={<Details1 />} />
            <Route path="/actualisation" element={<Details2 />} />
            <Route path="/fabrication-permis" element={<Details3 />} />
            <Route path="/passerelle" element={<Details4 />} />
            <Route path="/code-en-ligne" element={<Details5 />} />
            <Route path="/accompagnement" element={<Details6 />} />
            <Route path="/post-permis" element={<Details7 />} />


            {/* Routes d'authentification */}
            <Route path="/connexion/:token?" element={<LoginPage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Routes d'apprenants */}
            <Route element={<ProtectedRoute requiredRole="learner" />}>
              <Route path="/learners" element={<ApprenantLayout />}>
                <Route index element={<LearnerDashboard />} />
                <Route path="dashboard" element={<LearnerDashboard />} />
                <Route path="code" element={<Code />} />
                <Route path="conduite" element={<Conduite />} />
                <Route path="examens" element={<Examens />} />
                <Route path="boutique" element={<Boutique />} />
                <Route path="parametres" element={<Parametres />} />
                <Route path="reservercours" element={<ReserverLecon />} />
                {/* Quiz Protected History */}
                <Route path="quiz/history" element={<QuizHistory />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute requiredRole="instructor" />}>
              <Route path="/monitor" element={<MonitorLayout />}>
                <Route index element={<MonitorDashboard />} />
                <Route path="dashboard" element={<MonitorDashboard />} />
                <Route path="planning" element={<Planing />} />
                <Route path="apprenants" element={<Apprenants />} />
                <Route path="assistance" element={<Assistance />} />
                <Route path="parametres" element={<Settings />} />
                <Route path="paiement" element={<PaiementMain />} />
                <Route path="transactions" element={<TransactionHistory />} />
                <Route path="rendez-vous" element={<RendezVous />} />
                <Route path="examen" element={<MonitorExamen />} />
                {/* <Route path="paiement/historique" element={<Paiemnent />} /> */}
              </Route>
            </Route>

            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="moniteurs" element={<MonitorAdmin />} />
                <Route path="moniteurs/learners" element={<MonitorLeanerListe />} />
                <Route path="paiement" element={<AdminPaiement />} />
                <Route path="moniteurs/rendez-vous" element={<MonitorApointementListe />} />
                <Route path="moniteurs/planning" element={<MonitorAvalibilities />} />
                <Route path="moniteurs/details" element={<MonitorShow />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="parametres" element={<SettingsAdmin />} />
                <Route path="administrateurs" element={<AdministratorAdmin />} />
                <Route path="/admin/apprenants" element={<ListLearners />} />
                <Route path="/admin/apprenants/:id" element={<ApprenantDetailsPage />} />
                {/* route services */}
                <Route path="/admin/services" element={<Services />} />
                <Route path="/admin/code-de-la-route" element={<CodeRoute />} />
                <Route path="examen" element={<Examen />} />

              </Route>
            </Route>

            <Route
              path="modale"
              element={
                <PlanningComponent
                  setIsOpenPlanningModal={() => { }}
                  isOpenPlanningModal={false}
                />
              }
            />
            <Route path="payment-success" element={<PaymentSucccess />} />

            {/* Public Quiz Routes */}
            <Route path="/learners/quiz" element={<Navigate to="/quiz" replace />} />
            <Route path="/quiz/:categoryCode" element={<QuizPage />} />
            <Route path="/quiz/results/:attemptId" element={<QuizResults />} />

            {/* Route 404 */}
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
