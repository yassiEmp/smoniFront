import PopupCreationPlaning from "@components/moniteurs/PopupCreationPlaning";
import ScheduleGrid from "@components/moniteurs/Schedule/ScheduleGrid";
import { useEffect, useState } from "react";
import { RootState } from "@/store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles, getMeetingPoints } from "@/api/monitor/parametre";
import { getAvailabilities } from "@/api/monitor/planning";
import { getMonday } from "@/utils/dateUtils";
import Loading from "@/components/generales/Loading";
import PlanningComponent from "@components/moniteurs/PlanningComponent";
import Ilustration from "@/assets/apprenants/dashboard/boutiqueactif.png";
import { useNavigate } from "react-router";
import { AlertTriangle, Mail, Phone } from "lucide-react";
import { getUserInformation } from "@/api/auth";

const Planing = () => {
  const { vehicles, locations, availabilities } = useSelector(
    (state: RootState) => state.monitorReducer,
  );
  const { token,user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const [date, setDate] = useState(getMonday(new Date()).toISOString().split('T')[0]);
  const [isOpenPlanningModal, setIsOpenPlanningModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const getData = async () => {
    setLoading(true);
      await getUserInformation(token, dispatch);
    if (vehicles.length === 0) {
      await getVehicles(token, dispatch);
    }
    if (locations.length === 0) {
      await getMeetingPoints(token, dispatch);
    }
    await getAvailabilities(token, date, dispatch);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [date]);

  return (
    <div className="mb-8 md:mt-0 mt-10">
      {loading || !user ? (
        <Loading />
      ) : user.is_active === 0 ? (
        <div className="flex min-h-[90vh] w-full items-center justify-center">
          <div className="relative flex max-w-[600px] flex-col items-center justify-center gap-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 px-8 py-12 shadow-xl">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Compte temporairement bloqué
              </h2>
              <p className="text-gray-600 max-w-md">
                Votre compte a été désactivé. Pour le réactiver, veuillez contacter notre équipe support.
              </p>
            </div>

            {/* Options de contact */}
            <div className="grid w-full max-w-md gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Par email</p>
                  <p className="text-sm text-gray-600">support@smoni.com</p>
                </div>
              </div>
              
              {/* <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Par téléphone</p>
                  <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                </div>
              </div> */}
            </div>

            {/* Bouton d'action */}
            <div className="flex w-full max-w-md gap-3">
              <button
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-6 font-semibold text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                onClick={() => navigate("/monitor/assistance")}
              >
                Contacter le support
              </button>
            </div>

            {/* Message d'aide */}
            <p className="text-center text-sm text-gray-500">
              Temps de réponse estimé : 24-48h
            </p>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            availabilities.length < 0 && <PopupCreationPlaning />
          )}
          <div className="mb-8 flex items-center justify-between rounded p-6 flex-wrap">
            <div className="flex items-center">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Ton planning est prêt à rouler
                </h1>
                <p className="text-sm text-gray-600">
                  Aujourd'hui 6 réservations, 2 créneaux disponibles, 1 en attente
                  de confirmation. Garde un œil sur ton planning et ajuste tes
                  disponibilités.
                </p>
              </div>
            </div>
            <button
              className="rounded bg-[#6C61F6] px-6 py-2 text-white transition hover:brightness-110 w-auto mt-5 "
              onClick={()=>{setIsOpenPlanningModal(true)}}
            >
              Modifier mon planning
            </button>
          </div>
          <ScheduleGrid date={date} setDate={setDate} />
          {isOpenPlanningModal && (
            <PlanningComponent setIsOpenPlanningModal={setIsOpenPlanningModal} vehicles={vehicles} locations={locations} isOpenPlanningModal={isOpenPlanningModal} />
          )}
        </>
      )}
</div>  
  );
};

export default Planing;
