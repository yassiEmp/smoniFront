import Welcome from '@assets/dashboard-moniteur/Welcome.png'
import Vector from '@assets/dashboard-moniteur/Vector.png'
import { useState, useEffect } from "react"

import { Link, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore"
import { fetchDashboardStats } from "@/api/dashboard"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { Eye, EyeOff, Users, CalendarClock, PiggyBank, GraduationCap } from "lucide-react"
import Cours from "@components/moniteurs/Cours"
import { onboardingService } from '@/services/onboardingService';

const Dashboard = () => {
  const navigate = useNavigate();
  const firstname = useSelector((state: RootState) => state.authReducer.user?.firstname) || "";
  const userId = useSelector((state: RootState) => state.authReducer.user?.id);
  const token = useSelector((state: RootState) => state.authReducer.token);

  // Vérifie si l'utilisateur a déjà vu l'onboarding
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (!userId) return false;
    return !onboardingService.hasCompletedOnboarding(userId.toString());
  });

  const handleContinue = () => {
    if (userId) {
      onboardingService.completeOnboarding(userId.toString());
    }
    setShowOnboarding(false);
  };

  const [stats, setStats] = useState({
    learners_count: 0,
    rdv_pending: 0,
    cash: 0,
    count_learners_exam: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showCash, setShowCash] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await fetchDashboardStats(token);
        setStats(data);
      } catch {
        setStats({
          learners_count: 0,
          rdv_pending: 0,
          cash: 0,
          count_learners_exam: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  // Format montant en €K/€M/€B
  const formatCash = (amount: number) => {
    if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(2) + "Md€";
    if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(2) + "M€";
    if (amount >= 1_000) return (amount / 1_000).toFixed(2) + "K€";
    return amount + "€";
  };

  return (
    <div className="relative bg-[#F5F5F5] h-full">
      <div>
        <div>
          <div className="px-[32px] pt-[26px] flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between">
            <div className="space-y-[4px]">
              <h1 className="text-[30px] leading-[120%] font-semibold">
                Hello {firstname},
              </h1>
              <p className="text-[#616161] leading-[140%]">
                Prêt pour ta journée ? Voici un aperçu rapide.
              </p>
            </div>
            <button
              className="text-white text-[12px] font-semibold bg-[#6C61F6] px-[20px] py-[16px] rounded-[6.22px] border-[#8979F9] border-[0.39px]"
              onClick={() => navigate("/monitor/planning")}
            >
              Gérer mon planning
            </button>
          </div>

          {showOnboarding ? (
            <div className="flex flex-col items-center justify-center space-y-[32px] pt-20">
              <div className="flex flex-col items-center space-y-[8px] w-full">
                <h2 className="text-[24px] font-semibold leading-[120%] text-center">
                  Bienvenue chez SMONI, {firstname} !
                </h2>
                <img src={Welcome} alt="" />
                <p className="text-center leading-[140%] max-w-[623px]">
                  Ton savoir est précieux — il est temps de le mettre en action ! Crée ton planning, ouvre tes créneaux et commence à recevoir tes premiers élèves.
                </p>
              </div>
              <button
                className="flex items-center gap-[16px] text-[#FDFDFD] text-[18px] leading-[140%] font-semibold bg-[#6C61F6] px-[24px] py-[18px] rounded-[16px] border-[#8979F9] border-[0.5px] max-w-[453px]"
                onClick={handleContinue}
              >
                Je continue
                <img src={Vector} alt="" />
              </button>
            </div>
          ) : (
            <div className="px-6">
              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 pb-10">
                {/* Total apprenants */}
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4  shadow-sm">
                  <div className="flex justify-start items-center mb-2">
                    <span className="text-black text-base font-semibold">Total apprenants</span>
                   
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <span className="text-[48px] font-medium">
                      {loading ? <Skeleton width={40} /> : stats.learners_count}
                    </span>
                     <Users size={32} className="text-[#6C61F6]" />
                  </div>
                </div>
                {/* RDV en attente */}
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4  shadow-sm">
                  <div className="flex justify-start items-center mb-2">
                    <span className="text-black text-base font-semibold">Demandes de RDV en attente</span>
                 
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <span className="text-[48px] font-medium">
                      {loading ? <Skeleton width={40} /> : stats.rdv_pending}
                    </span>
                       <CalendarClock size={32} className="text-[#6C61F6]" />
                  </div>
                </div>
                {/* Chiffre d'affaires */}
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4  shadow-sm">
                  <div className="flex justify-start items-center mb-2">
                    <span className="text-black text-base font-semibold">Chiffre d'affaires</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <div className="flex items-center gap-2">
                    <span className="text-[40px] font-medium select-none">
                      {loading ? (
                        <Skeleton width={60} />
                      ) : showCash ? (
                        formatCash(stats.cash)
                      ) : (
                        "•••"
                      )}
                    </span>
                   
                    <button
                      className="focus:outline-none "
                      onClick={() => setShowCash((v) => !v)}
                      aria-label={showCash ? "Cacher le montant" : "Afficher le montant"}
                    >
                      {showCash ? (
                        <EyeOff size={28} className="text-[#6C61F6] " />
                      ) : (
                        <Eye size={28} className="text-[#6C61F6]" />
                      )}
                    </button>
                    </div>
                     <PiggyBank size={32} className="text-[#6C61F6]" />
                  </div>
                </div>
                {/* Apprenants prêts pour examen */}
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4  shadow-sm">
                  <div className="flex justify-start items-center mb-2">
                    <span className="text-black text-base font-semibold">Examen en attente</span>
                    
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <span className="text-[48px] font-medium">
                      {loading ? <Skeleton width={40} /> : stats.count_learners_exam}
                    </span>
                    <GraduationCap size={32} className="text-[#6C61F6]" />
                  </div>
                </div>
              </div>
              <div className="space-y-[32px] bg-[#F5F5F5]">
                <div className="space-y-[24px] pb-[32px] border-b">
                  <h4 className="font-medium">Prochains cours</h4>
                  {/* Liste des cours de l'api avec le scroll infini */}
                  <Cours />
                  {/* CTA vers planning */}
                  <div className="flex justify-center mt-8">
                    <Link
                      to="/monitor/planning"
                      className="inline-flex items-center gap-3 rounded-[32px] bg-gradient-to-r from-[#6C61F6] to-[#8979F9] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#6C61F6] group"
                      style={{ minWidth: 260 }}
                    >
                      <span>Accéder à mon planning</span>
                      <span
                        className="ml-1 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:rotate-45"
                        style={{ display: "flex" }}
                      >
                        <svg width="24" height="24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
               
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Dashboard;