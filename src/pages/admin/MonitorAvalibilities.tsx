import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonitorsAvailibilities } from "@/api/admin/monitor";
import { getMonday, formatDateToLocalYYYYMMDD } from "@/utils/dateUtils";
import Loading from "@/components/generales/Loading";
import ScheduleHeader from "@components/moniteurs/Schedule/ScheduleHeader";
import ScheduleCell from "@components/moniteurs/Schedule/ScheduleCell";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { RootState } from "@/store/configureStore";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import Loader from "@/components/common/Loader";

export interface AvailabilityType {
  id: number;
  instructor_id: number;
  meeting_point_id: number;
  vehicle_id: number;
  day_of_week: string;
  date: string;
  start_time: string;
  end_time: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  meeting_point: {
    id: number;
    instructor_id: number;
    label: string;
    address: string;
    city: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  vehicle: {
    id: number;
    instructor_id: number;
    brand: string;
    model: string;
    year: number;
    plate_number: string;
    fuel_type: string;
    insurance_expiry: string | null;
    technical_inspection_date: string | null;
    photo_url: string | null;
    color: string;
    gearbox_type: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  appointment: null | {
    id: number;
    learner_id: number;
    instructor_id: number;
    availability_id: number;
    vehicle_id: number;
    date: string;
    start_time: string;
    end_time: string;
    duration: number;
    status: string;
    cancellation_reason: string | null;
    price: string;
    lesson_notes: string | null;
    presence_student: boolean;
    presence_monitor: boolean;
    finished: boolean;
    tag: string;
    created_at: string;
    updated_at: string;
    canceled_by_monitor: null | boolean;
    reason: null | string;
    learner: {
      id: number;
      lastname: string;
      firstname: string;
      email: string;
      email_verified_at: string;
      phone: string;
      genre: string | null;
      role: string;
      is_active: number;
      photo: string | null;
      created_at: string;
      updated_at: string;
      timing: string | null;
      first_login_planning: number;
      first_login_dashboard: number;
    };
  };
}

const MonitorAvalibilities = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [date, setDate] = useState<string>(
    formatDateToLocalYYYYMMDD(getMonday(new Date())),
  );
  const [availabilities, setAvailabilities] = useState<AvailabilityType[]>([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<Date[]>([]);
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilityType | null>(
    null,
  );
  const location = useLocation();
  const monitorId = location.state?.monitorId;
  const navigate = useNavigate();
  useEffect(() => {
    setDays(
      Array.from({ length: 7 }).map((_, i) => {
        const monday = getMonday(new Date(date));
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
      }),
    );
  }, [date]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      setLoading(true);
      const data = await getMonitorsAvailibilities(token, monitorId, date);
      setAvailabilities(data || []);
      setLoading(false);
    };
    fetchAvailabilities();
  }, [token, monitorId, date]);

  const nextWeek = () => {
    const monday = getMonday(new Date(date));
    monday.setDate(monday.getDate() + 7);
    setDate(formatDateToLocalYYYYMMDD(monday));
  };

  const prevWeek = () => {
    const monday = getMonday(new Date(date));
    monday.setDate(monday.getDate() - 7);
    setDate(formatDateToLocalYYYYMMDD(monday));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="mb-8 mt-10 md:mt-0">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-8 flex flex-wrap items-center justify-between rounded p-6">
            <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded p-2 hover:bg-gray-100 focus:outline-none"
                >
                  <ChevronLeft size={28} />
                </button>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Planning des disponibilités du moniteur
                </h1>
                <p className="text-sm text-gray-600">
                  Visualisez les créneaux disponibles et les réservations de ce
                  moniteur.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={prevWeek}
                className="rounded-full bg-[#6C61F6] px-3 py-2 font-medium text-white transition hover:bg-gray-300"
              >
                ←
              </button>
              <button
                onClick={nextWeek}
                className="rounded-full bg-[#6C61F6] px-3 py-2 font-medium text-white transition hover:bg-gray-300"
              >
                →
              </button>
            </div>
            <h2 className="flex-1 text-center text-lg font-semibold">
              Semaine du{" "}
              {days[0] ? format(days[0], "dd MMM yyyy", { locale: fr }) : ""}
            </h2>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:w-auto"
              onChange={handleDateChange}
              value={date}
            />
          </div>
          <div className="overflow-x-auto">
            <div className="w-full sm:min-w-[400px] md:min-w-[700px]">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="hidden h-[10px] w-[33.33px] min-w-[33.33px] flex-col justify-between text-[12px] text-[#9E9E9E] md:flex md:w-[33.33px] md:min-w-[33.33px]"></div>
                  <div className="flex flex-row sm:justify-center md:justify-start">
                    {days.length
                      ? days.map((day, index) => (
                          <div key={`${index}-${day}`} className="flex-grow">
                            <ScheduleHeader key={index} day={day} />
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div className="hidden flex-col md:flex">
                  {hours.length
                    ? hours.map((hour, index) => (
                        <div className="flex flex-row" key={index}>
                          <div className="z-1 sticky top-0 flex h-[100px] flex-shrink-0 flex-grow items-center justify-center border-[0.5px] border-[#EEEEEE] bg-white text-gray-400 md:w-[33.33px] md:min-w-[33.33px] md:flex-grow-0">
                            <span className="text-xs">{hour}h</span>
                          </div>
                          <div className="flex w-full flex-row">
                            {days.length
                              ? days.map((day, idx) => {
                                  const slot = availabilities.find((s) => {
                                    const slotDate = s.date.slice(0, 10);
                                    const cellDate = format(day, "yyyy-MM-dd");
                                    const slotHour = parseInt(
                                      s.start_time.split(":")[0],
                                      10,
                                    );
                                    return (
                                      slotDate === cellDate && slotHour === hour
                                    );
                                  });
                                  return (
                                    <ScheduleCell
                                      key={idx}
                                      slot={slot}
                                      onClick={() =>
                                        slot && setSelectedSlot(slot)
                                      }
                                    />
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          {/* Modal de détail */}
          {selectedSlot && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="relative w-full min-w-[320px] max-w-[95vw] rounded-xl bg-white p-6 shadow-2xl md:w-[420px]">
                <button
                  className="absolute right-3 top-3 text-xl font-bold text-gray-500 hover:text-red-500"
                  onClick={() => setSelectedSlot(null)}
                  aria-label="Fermer"
                >
                  ×
                </button>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Détail du créneau
                </h2>
                {/* Statut */}
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${selectedSlot.appointment ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}
                  >
                    {selectedSlot.appointment ? "Réservé" : "Disponible"}
                  </span>
                  {selectedSlot.status === false && (
                    <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-500">
                      Fermé
                    </span>
                  )}
                </div>
                {/* Date & Heure */}
                <div className="mb-2">
                  <span className="font-semibold">Date :</span>{" "}
                  {selectedSlot.date?.slice(0, 10)}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Jour :</span>{" "}
                  {selectedSlot.day_of_week}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Heure :</span>{" "}
                  {selectedSlot.start_time} - {selectedSlot.end_time}
                </div>
                {/* Lieu */}
                <div className="mb-2">
                  <span className="font-semibold">Lieu :</span>{" "}
                  {selectedSlot.meeting_point?.label}
                  <div className="ml-2 text-xs text-gray-500">
                    {selectedSlot.meeting_point?.address}
                  </div>
                </div>
                {/* Véhicule */}
                <div className="mb-2">
                  <span className="font-semibold">Véhicule :</span>{" "}
                  {selectedSlot.vehicle?.brand} {selectedSlot.vehicle?.model}{" "}
                  <span className="text-xs text-gray-500">
                    ({selectedSlot.vehicle?.color},{" "}
                    {selectedSlot.vehicle?.gearbox_type})
                  </span>
                </div>
                {/* Élève */}
                {selectedSlot.appointment && (
                  <div className="mt-4 border-t pt-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-purple-700">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="inline-block"
                      >
                        <circle cx="10" cy="10" r="10" fill="#ede9fe" />
                        <text
                          x="50%"
                          y="55%"
                          textAnchor="middle"
                          fontSize="10"
                          fill="#6D28D9"
                          dy=".3em"
                        >
                          {selectedSlot.appointment.learner?.firstname?.charAt(
                            0,
                          )}
                          {selectedSlot.appointment.learner?.lastname?.charAt(
                            0,
                          )}
                        </text>
                      </svg>
                      Élève réservé
                    </div>
                    <div className="ml-2">
                      <div>
                        <span className="font-medium">Nom :</span>{" "}
                        {selectedSlot.appointment.learner?.firstname}{" "}
                        {selectedSlot.appointment.learner?.lastname}
                      </div>
                      <div>
                        <span className="font-medium">Email :</span>{" "}
                        {selectedSlot.appointment.learner?.email}
                      </div>
                      <div>
                        <span className="font-medium">Téléphone :</span>{" "}
                        {selectedSlot.appointment.learner?.phone}
                      </div>
                      <div>
                        <span className="font-medium">Statut du RDV :</span>{" "}
                        {selectedSlot.appointment.status}
                      </div>
                    </div>
                    {/* Notes */}
                    {selectedSlot.appointment.lesson_notes && (
                      <div className="mt-2 rounded bg-gray-50 p-2">
                        <span className="font-medium">Note de cours :</span>
                        <div className="mt-1 text-sm text-gray-700">
                          {selectedSlot.appointment.lesson_notes}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const MonitorPlanningTab = ({ monitorId }: { monitorId: number }) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [date, setDate] = useState<string>(
    formatDateToLocalYYYYMMDD(getMonday(new Date())),
  );
  const [availabilities, setAvailabilities] = useState<AvailabilityType[]>([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<Date[]>([]);
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilityType | null>(
    null,
  );
  useEffect(() => {
    setDays(
      Array.from({ length: 7 }).map((_, i) => {
        const monday = getMonday(new Date(date));
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
      }),
    );
  }, [date]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      setLoading(true);
      const data = await getMonitorsAvailibilities(token, monitorId, date);
      setAvailabilities(data || []);
      setLoading(false);
    };
    fetchAvailabilities();
  }, [token, monitorId, date]);

  const nextWeek = () => {
    const monday = getMonday(new Date(date));
    monday.setDate(monday.getDate() + 7);
    setDate(formatDateToLocalYYYYMMDD(monday));
  };

  const prevWeek = () => {
    const monday = getMonday(new Date(date));
    monday.setDate(monday.getDate() - 7);
    setDate(formatDateToLocalYYYYMMDD(monday));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="mb-8 mt-2 md:mt-0">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={prevWeek}
                className="rounded-full bg-[#6C61F6] px-3 py-2 font-medium text-white transition hover:bg-gray-300"
              >
                ←
              </button>
              <button
                onClick={nextWeek}
                className="rounded-full bg-[#6C61F6] px-3 py-2 font-medium text-white transition hover:bg-gray-300"
              >
                →
              </button>
            </div>
            <h2 className="flex-1 text-center text-lg font-semibold">
              Semaine du{" "}
              {days[0] ? format(days[0], "dd MMM yyyy", { locale: fr }) : ""}
            </h2>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:w-auto"
              onChange={handleDateChange}
              value={date}
            />
          </div>
          <div className="overflow-x-auto">
            <div className="w-full sm:min-w-[400px] md:min-w-[700px]">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="hidden h-[10px] w-[33.33px] min-w-[33.33px] flex-col justify-between text-[12px] text-[#9E9E9E] md:flex md:w-[33.33px] md:min-w-[33.33px]"></div>
                  <div className="flex flex-row sm:justify-center md:justify-start">
                    {days.length
                      ? days.map((day, index) => (
                          <div key={`${index}-${day}`} className="flex-grow">
                            <ScheduleHeader key={index} day={day} />
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div className="hidden flex-col md:flex">
                  {hours.length
                    ? hours.map((hour, index) => (
                        <div className="flex flex-row" key={index}>
                          <div className="z-1 sticky top-0 flex h-[100px] flex-shrink-0 flex-grow items-center justify-center border-[0.5px] border-[#EEEEEE] bg-white text-gray-400 md:w-[33.33px] md:min-w-[33.33px] md:flex-grow-0">
                            <span className="text-xs">{hour}h</span>
                          </div>
                          <div className="flex w-full flex-row">
                            {days.length
                              ? days.map((day, idx) => {
                                  const slot = availabilities.find((s) => {
                                    const slotDate = s.date.slice(0, 10);
                                    const cellDate = format(day, "yyyy-MM-dd");
                                    const slotHour = parseInt(
                                      s.start_time.split(":")[0],
                                      10,
                                    );
                                    return (
                                      slotDate === cellDate && slotHour === hour
                                    );
                                  });
                                  return (
                                    <ScheduleCell
                                      key={idx}
                                      slot={slot}
                                      onClick={() =>
                                        slot && setSelectedSlot(slot)
                                      }
                                    />
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          {/* Modal de détail */}
          {selectedSlot && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="relative w-full min-w-[320px] max-w-[95vw] rounded-xl bg-white p-6 shadow-2xl md:w-[420px]">
                <button
                  className="absolute right-3 top-3 text-xl font-bold text-gray-500 hover:text-red-500"
                  onClick={() => setSelectedSlot(null)}
                  aria-label="Fermer"
                >
                  ×
                </button>
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Détail du créneau
                </h2>
                {/* Statut */}
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${selectedSlot.appointment ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}
                  >
                    {selectedSlot.appointment ? "Réservé" : "Disponible"}
                  </span>
                  {selectedSlot.status === false && (
                    <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-500">
                      Fermé
                    </span>
                  )}
                </div>
                {/* Date & Heure */}
                <div className="mb-2">
                  <span className="font-semibold">Date :</span>{" "}
                  {selectedSlot.date?.slice(0, 10)}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Jour :</span>{" "}
                  {selectedSlot.day_of_week}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Heure :</span>{" "}
                  {selectedSlot.start_time} - {selectedSlot.end_time}
                </div>
                {/* Lieu */}
                <div className="mb-2">
                  <span className="font-semibold">Lieu :</span>{" "}
                  {selectedSlot.meeting_point?.label}
                  <div className="ml-2 text-xs text-gray-500">
                    {selectedSlot.meeting_point?.address}
                  </div>
                </div>
                {/* Véhicule */}
                <div className="mb-2">
                  <span className="font-semibold">Véhicule :</span>{" "}
                  {selectedSlot.vehicle?.brand} {selectedSlot.vehicle?.model}{" "}
                  <span className="text-xs text-gray-500">
                    ({selectedSlot.vehicle?.color},{" "}
                    {selectedSlot.vehicle?.gearbox_type})
                  </span>
                </div>
                {/* Élève */}
                {selectedSlot.appointment && (
                  <div className="mt-4 border-t pt-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-purple-700">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="inline-block"
                      >
                        <circle cx="10" cy="10" r="10" fill="#ede9fe" />
                        <text
                          x="50%"
                          y="55%"
                          textAnchor="middle"
                          fontSize="10"
                          fill="#6D28D9"
                          dy=".3em"
                        >
                          {selectedSlot.appointment.learner?.firstname?.charAt(
                            0,
                          )}
                          {selectedSlot.appointment.learner?.lastname?.charAt(
                            0,
                          )}
                        </text>
                      </svg>
                      Élève réservé
                    </div>
                    <div className="ml-2">
                      <div>
                        <span className="font-medium">Nom :</span>{" "}
                        {selectedSlot.appointment.learner?.firstname}{" "}
                        {selectedSlot.appointment.learner?.lastname}
                      </div>
                      <div>
                        <span className="font-medium">Email :</span>{" "}
                        {selectedSlot.appointment.learner?.email}
                      </div>
                      <div>
                        <span className="font-medium">Téléphone :</span>{" "}
                        {selectedSlot.appointment.learner?.phone}
                      </div>
                      <div>
                        <span className="font-medium">Statut du RDV :</span>{" "}
                        {selectedSlot.appointment.status}
                      </div>
                    </div>
                    {/* Notes */}
                    {selectedSlot.appointment.lesson_notes && (
                      <div className="mt-2 rounded bg-gray-50 p-2">
                        <span className="font-medium">Note de cours :</span>
                        <div className="mt-1 text-sm text-gray-700">
                          {selectedSlot.appointment.lesson_notes}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MonitorAvalibilities;
