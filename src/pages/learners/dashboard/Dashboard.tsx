/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HelpCircle, MapPin, Clock3, CheckCircle } from "lucide-react";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import calendrier from "@assets/apprenants/dashboard/calendrier.png";
import telephon from "@assets/apprenants/dashboard/Telephon.png";
import monitorimg from "@assets/apprenants/dashboard/MonitorImg.png";
import vehicule_icon from "@assets/apprenants/dashboard/vehicle_icon.svg";
import draving from "@assets/apprenants/dashboard/driving.png";

import charge from "@assets/apprenants/dashboard/charge.png";
import time from "@assets/apprenants/dashboard/Time.png";
import winer from "@assets/apprenants/dashboard/Winners.png";
import card from "@assets/apprenants/dashboard/Card.png";
import { Link } from "react-router";
import { fetchBadgesCount } from "@/api/learner/badges";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Loader from "@/components/common/Loader";
import SupportContactModal from "@/components/SupportContactModal";
import { fetchProgress } from "@/api/learner/progress";
import { fetchBadges } from "@/api/learner/badges";
import {
  fetchLearnerLessons,
  cancelLearnerAppointment,
  statusToFr,
} from "@/api/learner/lessons";
import { toast } from "react-hot-toast";
import { imageUrl } from "@/api";
import { fetchLearnerHourInfo } from "@/api/learner/hours";
import { fetchLearnerProfile, LearnerProfile } from "@/api/learner/viewProfile";
import ModalQuestionTest from "@/components/learners/ModalQuestionTest";

//  fonction isFutureAppointment
const isFutureAppointment = (date: string, start_time: string) => {
  if (!date || !start_time) return false;

  // Si la date contient un "T", on extrait la partie date (YYYY-MM-DD)
  let d = date;
  if (date.includes("T")) {
    d = date.split("T")[0];
  }

  // Forcer le format de l'heure à HH:mm:ss
  let start = start_time;
  if (/^\d{2}:\d{2}$/.test(start_time)) start += ":00";

  // Crée la date complète en local
  const [year, month, day] = d.split("-");
  const [hour, minute, second = "00"] = start.split(":");
  const startDateTime = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  );

  return startDateTime.getTime() > Date.now();
};

const Dashboard = () => {
  const testPassed = useSelector(
    (state: RootState) => state.authReducer.test_passed,
  );

  const location = useLocation();
  const [flashMessage, setFlashMessage] = useState(
    location.state?.flashMessage || null,
  );
  const { token, user } = useSelector((state: RootState) => state.authReducer);
  const [noBadges, setNoBadges] = useState<any[]>([]);
  const [loadingBadges, setLoadingBadges] = useState(true);
  const [badgesCountAPI, setBadgesCountAPI] = useState<number | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [loadingBadgesCountAPI, setLoadingBadgesCountAPI] = useState(true);
  const [nextAppointment, setNextAppointment] = useState<any>(null);
  const [loadingNextAppointment, setLoadingNextAppointment] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isSubmittingCancel, setIsSubmittingCancel] = useState(false);
  const [hourInfo, setHourInfo] = useState<number | null>(null);
  const [loadingHourInfo, setLoadingHourInfo] = useState(true);
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCancelClick = () => {
    if (user && (user.is_active === false || user.is_active === 0)) {
      toast.error("Compte temporairement bloqué. Votre compte a été désactivé. Pour le réactiver, veuillez contacter notre équipe.");
      return;
    }
    setShowCancelModal(true);
  };

  useEffect(() => {
    // Pour nettoyer le state à la prochaine navigation
    window.history.replaceState({}, document.title);
  }, []);

  // Charger les badges pour le contrôle conditionnel
  useEffect(() => {
    setLoadingBadges(true);
    const loadBadges = async () => {
      try {
        const response = await fetchBadges(token);
        setNoBadges(response.data.nobadges || []);
      } catch (error) {
        setNoBadges([]);
      } finally {
        setLoadingBadges(false);
      }
    };
    loadBadges();
  }, [token]);

  useEffect(() => {
    setLoadingBadgesCountAPI(true);
    fetchBadgesCount(token)
      .then((res) => setBadgesCountAPI(res.data))
      .catch(() => setBadgesCountAPI(null))
      .finally(() => setLoadingBadgesCountAPI(false));
  }, [token]);

  useEffect(() => {
    setLoadingProgress(true);
    fetchProgress(token)
      .then((res) => setProgress(res.progress))
      .catch(() => setProgress(0))
      .finally(() => setLoadingProgress(false));
  }, [token]);


 useEffect(() => {
    setLoadingNextAppointment(true);
    fetchLearnerLessons(token)
      .then((res) => {
        // Filtrer les rendez-vous à venir avec statut valide et date future
        const filtered = (res.data || []).filter((a: any) => 
          ["scheduled", "confirmed"].includes(a.status) && 
          isFutureAppointment(a.date, a.start_time)
        );
        
        // Trier par date croissante
        filtered.sort(
          (a: any, b: any) =>
            new Date(a.date + "T" + a.start_time).getTime() -
            new Date(b.date + "T" + b.start_time).getTime(),
        );
        setNextAppointment(filtered[0] || null);
      })
      .catch(() => setNextAppointment(null))
      .finally(() => setLoadingNextAppointment(false));
  }, [token, isSubmittingCancel]);

  useEffect(() => {
    if (!token) return;

    // Chargement des heures disponibles
    setLoadingHourInfo(true);
    fetchLearnerHourInfo(token)
      .then((res) => setHourInfo(res.data))
      .catch(() => setHourInfo(null))
      .finally(() => setLoadingHourInfo(false));

    // Chargement du profil pour les heures recommandées
    setLoadingProfile(true);
    fetchLearnerProfile(token)
      .then((res) => setProfile(res.data?.learner_profile || null))
      .catch(() => setProfile(null))
      .finally(() => setLoadingProfile(false));
  }, [token]);

  const handleCancelAppointment = async () => {
    if (!nextAppointment || !cancelReason.trim()) return;
    setIsSubmittingCancel(true);
    try {
      await cancelLearnerAppointment(token, {
        learner_id: nextAppointment.learner_id,
        appointment_id: nextAppointment.id,
        cancellation_reason: cancelReason,
      });
      toast.success("Rendez-vous annulé avec succès.");
      setShowCancelModal(false);
      setCancelReason("");
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de l'annulation");
    } finally {
      setIsSubmittingCancel(false);
    }
  };

  // Fonction pour recharger toutes les données importantes
  const reloadDashboardData = () => {
    // Recharger le profil et les heures recommandées
    setLoadingProfile(true);
    fetchLearnerProfile(token)
      .then((res) => setProfile(res.data?.learner_profile || null))
      .catch(() => setProfile(null))
      .finally(() => setLoadingProfile(false));

    // Recharger les heures disponibles
    setLoadingHourInfo(true);
    fetchLearnerHourInfo(token)
      .then((res) => setHourInfo(res.data))
      .catch(() => setHourInfo(null))
      .finally(() => setLoadingHourInfo(false));
  };

  // Gestionnaire pour la fin du test
  const handleTestComplete = () => {
    // Attendre un court instant pour que le backend ait le temps de traiter
    setTimeout(reloadDashboardData, 1000);
  };

  return (
    <>
      {flashMessage && (
        <div className="relative left-0 right-0 top-20 z-50 flex items-center justify-between bg-[#B0EECD] px-4 py-5 text-[#005B4F]">
          <span className="font-medium">{flashMessage}</span>
          <button
            className="text-xl font-bold text-[#005B4F]"
            onClick={() => setFlashMessage(null)}
          >
            &times;
          </button>
        </div>
      )}

      <div className="flex min-h-screen w-full flex-col items-start justify-center bg-gray-100 pb-8 pt-16">
        {/* Modal de test si nécessaire */}
        {!testPassed ? <ModalQuestionTest onTestComplete={handleTestComplete} /> : null}

        <div className="flex w-full max-w-[1500px] flex-col items-start gap-6 px-2 pt-6 lg:flex-row lg:px-8 xl:mx-auto">
          {/* Colonne principale */}
          <div className="mx-auto w-full space-y-6 px-4 pb-8 pt-[36px] lg:px-0">
            {/* Header + bouton mobile */}
            <div className="flex flex-wrap items-center justify-between lg:justify-start">
              <h1 className="mb-3 text-xl font-bold text-gray-900 lg:text-2xl">
                {" "}
                Hello {user.firstname} {user.lastname}!
              </h1>
              <Link to="/Learners/reservercours">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6c61f6] px-2 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 lg:hidden lg:px-4 lg:py-4"
                onClick={(e) => {
                    if (user && (user.is_active === false || user.is_active === 0)) {
                  e.preventDefault();
                  toast.error("Compte temporairement bloqué. Votre compte a été désactivé. Pour le réactiver, veuillez contacter notre équipe.");
                }
              }}
                >
                  Reserver une nouvelle leçon →
                </button>
              </Link>
            </div>

          
          {/* Prochain rendez-vous */}
          <div className="min-h-[250px] rounded-xl bg-white p-3 pt-6 shadow-sm lg:p-6 lg:pt-0">
            <div className="mb-2 flex items-start justify-between pt-4">
              <h2 className="pt-2 text-[18px] font-semibold text-[#616161]">
                Votre prochain rendez-vous
              </h2>
              {nextAppointment && (
                <span
                  className={`rounded-full px-3 py-1 pt-1 text-xs font-semibold shadow-sm ${nextAppointment.status === "scheduled" ? "bg-[#FFCEB2] text-[#AC4B20]" : "bg-[#EAE3FF] text-[#6C61F6]"}`}
                >
                  {statusToFr(nextAppointment.status)}
                </span>
              )}
            </div>

            {loadingNextAppointment ? (
              <div className="flex h-32 items-center justify-center">
                <Loader />
              </div>
            ) : nextAppointment ? (
              <div className="flex flex-col gap-4 sm:flex-row md:justify-between">
                {/* Partie gauche - Icône calendrier + date/heure */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#6c61f6]">
                    <img
                      src={calendrier}
                      alt="Calendrier"
                      className="h-[36px] w-[36px]"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-[#6c61f6] lg:text-sm">
                      {new Date(nextAppointment.date).toLocaleDateString(
                        "fr-FR",
                        {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                    <p className="text-sm font-semibold text-[#616161]">
                      {nextAppointment.start_time} à {nextAppointment.end_time}
                    </p>
                  </div>
                </div>

                {/* Partie droite - Moniteur + photo */}
                <div className="flex items-center justify-between gap-3 border-t pt-3 sm:justify-end sm:border-t-0 sm:pt-0">
                  <div className="flex flex-col sm:text-right">
                    <p className="max-w-[180px] break-words text-sm font-semibold">
                      {nextAppointment.instructor.firstname}{" "}
                      {nextAppointment.instructor.lastname}
                    </p>
                    <div className="flex items-center font-semibold text-gray-600 sm:justify-end">
                      <img
                        src={telephon}
                        alt="telephon"
                        className="mr-1 h-3 w-3"
                      />
                      <p className="text-[10px] lg:text-sm">
                        {nextAppointment.instructor.phone}
                      </p>
                    </div>
                  </div>
                  {nextAppointment.instructor.photo ? (
                    <img
                      src={imageUrl + nextAppointment.instructor.photo}
                      alt={nextAppointment.instructor.firstname}
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-300">
                      <span className="text-sm font-semibold text-gray-600">
                        {nextAppointment.instructor.firstname?.charAt(0)?.toUpperCase()}
                        {nextAppointment.instructor.lastname?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <svg
                  className="mb-2 h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-semibold">
                  Vous n'avez pas de rendez-vous à venir
                </span>
              </div>
            )}

            {nextAppointment && (
              <>
                <div className="mt-4 flex items-center text-[14px] font-semibold">
                  <MapPin className="mr-2 text-[#6c61f6]" size={14} />
                  {nextAppointment.availability?.meeting_point?.label || "-"}
                </div>
                {nextAppointment.vehicle && (
                  <div className="mt-2 flex items-center text-[13px] font-semibold text-[#616161]">
                    <img
                      src={vehicule_icon}
                      alt="Véhicule"
                      className="mr-2 h-4 w-4"
                    />
                    {nextAppointment.vehicle.brand} {nextAppointment.vehicle.model} (
                    {nextAppointment.vehicle.year})
                  </div>
                )}
                {/* Le bouton Annuler n'est plus nécessaire ici car on filtre déjà les rendez-vous futurs */}
                <div className="flex items-end justify-end">
                  <button
                    className="rounded-lg bg-gray-100 px-4 py-2 text-[12px] font-semibold text-[#616161] transition-colors duration-200 hover:bg-gray-300 lg:mt-12"
                    onClick={handleCancelClick}
                  >
                    Annuler
                  </button>
                </div>
              </>
            )}

            {/* Modal d'annulation */}
            {showCancelModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setShowCancelModal(false);
                }}
              >
                <div
                  className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="mb-4 text-lg font-semibold">
                    Annuler le rendez-vous
                  </h2>
                  <textarea
                    className="mb-4 w-full rounded border p-2"
                    rows={3}
                    placeholder="Raison de l'annulation"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    disabled={isSubmittingCancel}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="rounded bg-gray-200 px-4 py-2 text-gray-700"
                      onClick={() => setShowCancelModal(false)}
                      disabled={isSubmittingCancel}
                    >
                      Fermer
                    </button>
                    <button
                      className={`rounded bg-red-500 px-4 py-2 font-semibold text-white ${!cancelReason.trim() || isSubmittingCancel ? "cursor-not-allowed opacity-50" : ""}`}
                      onClick={handleCancelAppointment}
                      disabled={!cancelReason.trim() || isSubmittingCancel}
                    >
                      {isSubmittingCancel ? "Annulation..." : "Valider"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

            {/* Grid Statistiques */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Card heure dispo */}
              <div className="rounded-xl bg-white p-4 text-sm shadow-sm">
                {/* Expiration */}
                <div className="mb-3 flex justify-start text-xs text-gray-400">
                  <h2>Heure de conduite</h2>
                  {/* <div className="flex items-center">
                    <Clock3 className="mr-1 h-4 w-4" />
                    {loadingHourInfo ? (
                      <Loader size={16} showText={false} />
                    ) : hourInfo?.end_date ? (
                      <span>
                        Exp. le{" "}
                        {new Date(hourInfo.end_date).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </div> */}
                </div>

                {/* Heures disponibles & recommandées */}
                <div className="flex items-start justify-between gap-4 border-t border-gray-100 pt-3">
                  {/* Heures recommandées */}
                  <div className="flex-1 text-center">
                    <div className="mb-1 flex items-center justify-center text-gray-500">
                      <Clock3 className="mr-1 h-4 w-4" />
                      <span className="text-xs">Recommandées</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {profile?.hour != null
                        ? `${profile.hour} ${profile.hour === 1 ? "heure" : "heures"}`
                        : "-"}
                    </p>
                  </div>
                  {/* Heures disponibles */}
                  <div className="flex-1 text-center">
                    <div className="mb-1 flex items-center justify-center text-gray-500">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      <span className="text-xs">Disponibles</span>
                    </div>
                    {loadingHourInfo ? (
                      <Loader size={20} showText={false} />
                    ) : (
                      <p className="text-lg font-semibold text-[#6c61f6]">
                        {hourInfo != null
                          ? `${hourInfo} ${
                              hourInfo === 1 ? "heure" : "heures"
                            }`
                          : "-"} 
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
                <div className="text-2xl font-semibold text-[#6c61f6]">
                  {loadingBadgesCountAPI ? (
                    <span className="flex h-8 items-center justify-center">
                      <Loader />
                    </span>
                  ) : (
                    <>
                      {badgesCountAPI && badgesCountAPI > 0
                        ? badgesCountAPI
                        : "-"}{" "}
                      <span className="mr-2 text-2xl font-semibold text-[#6c61f6]">
                        {badgesCountAPI === 1 ? "badge" : "badges"}
                      </span>
                      <span className="mb-3 text-sm text-gray-700">
                        {badgesCountAPI === 1 ? "obtenu" : "obtenus"}
                      </span>
                    </>
                  )}
                </div>

                <img src={winer} alt="Badges" className="mb-3 h-auto w-32" />
                <Link to="/learners/examens">
                  <button className="rounded-lg bg-gray-100 px-4 py-2 text-[12px] font-bold text-[#757575] transition-colors duration-200 hover:bg-gray-200">
                    Voir mes badges →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Colonne secondaire */}
          <div className="mx-auto w-full space-y-6 px-4 pb-8 pt-8 lg:px-0">
            <div className="flex justify-end">
              {/* ouvre le modal SupportContactModal quand on clique sur le buton */}
              
              <button
               onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-2 text-[12px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100">
               
                Contacter le support <HelpCircle size={16} />
              </button>
            </div>
            
             <SupportContactModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />

            <div className="flex min-h-[200px] flex-col items-center gap-5 rounded-xl bg-white p-5 shadow-sm lg:flex-row">
              <img src={card} alt="Voiture" className="h-auto w-36" />
              <div className="w-full flex-1">
                <h3 className="mb-1 font-semibold text-gray-800">
                  Modules de progression
                </h3>
                <div className="mb-2 text-sm font-semibold text-[#6c61f6]">
                  {loadingProgress ? (
                    <span className="inline-flex h-5 items-center">
                      <Loader />
                    </span>
                  ) : (
                    `${progress?.toFixed(2) ?? 0}% de progression`
                  )}
                </div>
                <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-[#6c61f6] transition-all duration-500"
                    style={{ width: `${progress ?? 0}%` }}
                  ></div>
                </div>
                <div className="flex items-end justify-end">
                  <Link to="/learners/examens">
                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-[12px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                      Voir mes modules →
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div
                  className={`flex items-center justify-center rounded-xl px-4 py-4 text-center font-semibold ${
                    !loadingBadges && noBadges.length === 0
                      ? "bg-[#EAE3FF]" : "bg-[#D7F6E6]"
                  }`}
                >
                  {loadingBadges ? (
                    <span className="flex h-6 items-center justify-center">
                      <Loader size={20} />
                    </span>
                  ) : (
                    <>
                      <span className="text-[13px]">
                        
                        {!loadingBadges && noBadges.length === 0
                          ? "Tous les modules sont validés, tu es prêt à passer à l'examen. "
                          : "Tu dois avoir validé tous les modules de conduite pour accéder à l'examen final. "
                        }
                      </span>
                      <img className="ml-2 h-5 w-5" src={charge} alt="charge" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bouton desktop */}
            <div className="hidden lg:flex lg:items-end lg:justify-end">
              <Link to="/Learners/reservercours">
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6c61f6] px-10 py-4 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 lg:w-auto"
                onClick={(e) => {
                      if (user && (user.is_active === false || user.is_active === 0)) {
                    e.preventDefault();
                    toast.error("Compte temporairement bloqué. Votre compte a été désactivé. Pour le réactiver, veuillez contacter notre équipe.");
                  }
                }}>
                  Reserver une nouvelle leçon →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
