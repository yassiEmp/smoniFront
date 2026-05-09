import { useState, useEffect } from "react";
import mairie from "@assets/dashboard-moniteur/mairie.png";
import cardtype from "@assets/apprenants/dashboard/vehicle_icon.svg";
import PlanningModal from "./planning/PlanningModal";
import Tabs from "./planning/Tabs";
import DaysTabs from "./planning/DaysTabs";
import VehicleListSP from "./VehicleListSP";
import LocationListSP from "./LocationListSP";
import AvailabilityHoursSP from "./AvailabilityHoursSP";
import {
  VehicleType,
  MeetingPointTypeAttributes,
} from "@/types/monitor/settings/configuration";
import {
  createAvailabilityRepeateds,
  createPlanningSpecial,
  deleteAvailabilityRepeateds,
  getAvailabilitieByDate,
  getAvailabilities,
  getAvailabilityRepeateds,
} from "@/api/monitor/planning";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import {
  formatHoursToSend,
  getDayNameInFrench,
  getMonday,
} from "@/utils/dateUtils";
import toast from "react-hot-toast";
import loadingIcon from "@assets/lottie/loading.json";

import Lottie from "lottie-react";
import RCVehicleList from "./planning/RCVehicleList";
import RCLocationList from "./planning/RCLocationList";
import RCAvailabilityHours from "./planning/RCAvailabilityHours";

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export default function PlanningComponent({
  setIsOpenPlanningModal,
  vehicles = [],
  locations = [],
  isOpenPlanningModal,
}: {
  setIsOpenPlanningModal: (isOpen: boolean) => void;
  vehicles?: VehicleType[];
  locations?: MeetingPointTypeAttributes[];
  isOpenPlanningModal: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const [specialDate, setSpecialDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [specialSelectedVehicleId, setSpecialSelectedVehicleId] =
    useState<string>("");
  const [specialSelectedLocationId, setSpecialSelectedLocationId] =
    useState<string>("");
  const [specialSelectedHours, setSpecialSelectedHours] = useState<string[]>(
    [],
  );
  const [specialSlots, setSpecialSlots] = useState<
    {
      date: string;
      vehicleId: string;
      locationId: string;
      hours: string[];
    }[]
  >([]);

  const [tab, setTab] = useState<"recurrent" | "special">("recurrent");
  const [selectedDay, setSelectedDay] = useState(0);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const [availabilitiesLoading, setAvailabilitiesLoading] = useState(false);
  const [availabilityRepeatedsLoading, setAvailabilityRepeatedsLoading] =
    useState(false);
  const [availabilityRepeateds, setAvailabilityRepeateds] = useState<any[]>([]);

  const [rcSlots, setRcSlots] = useState<
    {
      day: string;
      vehicleId: string;
      locationId: string;
      hours: string[];
    }[]
  >([]);
  const [rcSelectedVehicleId, setRcSelectedVehicleId] = useState<string>("");
  const [rcSelectedLocationId, setRcSelectedLocationId] = useState<string>("");
  const [rcSelectedHours, setRcSelectedHours] = useState<string[]>([]);

  const [lastCombo, setLastCombo] = useState<{
    day: string;
    vehicleId: string;
    locationId: string;
    hours: string[];
  } | null>(null);

  const [specialSelectedRecapIdx, setSpecialSelectedRecapIdx] = useState<number | null>(null);

  useEffect(() => {
    if (isOpenPlanningModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpenPlanningModal]);

  useEffect(() => {
    if (specialDate && tab !== "recurrent") {
      const fetchAvailabilities = async () => {
        setAvailabilitiesLoading(true);
        const data = await getAvailabilitieByDate(token, specialDate);
        setAvailabilities(data.data);
        setAvailabilitiesLoading(false);
      };
      fetchAvailabilities();
    } else if (tab === "recurrent") {
      const fetchAvailabilityRepeateds = async () => {
        setAvailabilityRepeatedsLoading(true);
        const data = await getAvailabilityRepeateds(token);
        setAvailabilityRepeateds(data);
        setAvailabilityRepeatedsLoading(false);
      };
      fetchAvailabilityRepeateds();
    }
  }, [specialDate, token, tab]);

  useEffect(() => {
    const day = days[selectedDay];
    if (
      lastCombo &&
      (lastCombo.vehicleId !== rcSelectedVehicleId ||
        lastCombo.locationId !== rcSelectedLocationId ||
        lastCombo.day !== day)
    ) {
      if (
        lastCombo.hours.length > 0 &&
        lastCombo.vehicleId &&
        lastCombo.locationId
      ) {
        setRcSlots((prev) => {
          let updated = prev.map((slot) => {
            if (
              slot.day === lastCombo.day &&
              !(
                slot.vehicleId === lastCombo.vehicleId &&
                slot.locationId === lastCombo.locationId
              )
            ) {
              return {
                ...slot,
                hours: slot.hours.filter((h) => !lastCombo.hours.includes(h)),
              };
            }
            return slot;
          });
          updated = updated.filter(
            (slot) =>
              slot.hours.length > 0 ||
              (slot.day === lastCombo.day &&
                slot.vehicleId === lastCombo.vehicleId &&
                slot.locationId === lastCombo.locationId),
          );
          const idx = updated.findIndex(
            (slot) =>
              slot.day === lastCombo.day &&
              slot.vehicleId === lastCombo.vehicleId &&
              slot.locationId === lastCombo.locationId,
          );
          if (idx !== -1) {
            const newHours = Array.from(new Set(lastCombo.hours));
            if (newHours.length > 0) {
              const newSlots = [...updated];
              newSlots[idx] = { ...newSlots[idx], hours: newHours };
              return newSlots;
            } else {
              return updated.filter((_, i) => i !== idx);
            }
          } else if (
            lastCombo.vehicleId &&
            lastCombo.locationId &&
            lastCombo.hours.length > 0
          ) {
            return [
              ...updated,
              {
                day: lastCombo.day,
                vehicleId: lastCombo.vehicleId,
                locationId: lastCombo.locationId,
                hours: lastCombo.hours,
              },
            ];
          }
          return updated;
        });
      }
    }
    if (rcSelectedVehicleId && rcSelectedLocationId) {
      const found = rcSlots.find(
        (slot) =>
          slot.day === day &&
          slot.vehicleId === rcSelectedVehicleId &&
          slot.locationId === rcSelectedLocationId,
      );
      if (found) {
        if (JSON.stringify(found.hours) !== JSON.stringify(rcSelectedHours)) {
          setRcSelectedHours(found.hours);
        }
      } else if (rcSelectedHours.length > 0) {
        setRcSelectedHours([]);
      }
    }
    setLastCombo({
      day,
      vehicleId: rcSelectedVehicleId,
      locationId: rcSelectedLocationId,
      hours: rcSelectedHours,
    });
  }, [rcSelectedVehicleId, rcSelectedLocationId, selectedDay]);

  useEffect(() => {
    const day = days[selectedDay];
    setLastCombo({
      day,
      vehicleId: rcSelectedVehicleId,
      locationId: rcSelectedLocationId,
      hours: rcSelectedHours,
    });
  }, [rcSelectedHours, selectedDay]);

  useEffect(() => {
    if (tab !== "recurrent") return;
    const day = days[selectedDay];
    if (rcSelectedVehicleId && rcSelectedLocationId) {
      setRcSlots((prev) => {
        const idx = prev.findIndex(
          (slot) =>
            slot.day === day &&
            slot.vehicleId === rcSelectedVehicleId &&
            slot.locationId === rcSelectedLocationId,
        );
        if (rcSelectedHours.length > 0) {
          if (idx !== -1) {
            const newSlots = [...prev];
            newSlots[idx] = {
              ...newSlots[idx],
              hours: Array.from(new Set(rcSelectedHours)),
            };
            return newSlots;
          } else {
            return [
              ...prev,
              {
                day,
                vehicleId: rcSelectedVehicleId,
                locationId: rcSelectedLocationId,
                hours: Array.from(new Set(rcSelectedHours)),
              },
            ];
          }
        } else {
          if (idx !== -1) {
            return prev.filter((_, i) => i !== idx);
          }
        }
        return prev;
      });
    }
  }, [
    rcSelectedHours,
    rcSelectedVehicleId,
    rcSelectedLocationId,
    selectedDay,
    tab,
  ]);

  useEffect(() => {
    if (
      tab === "recurrent" &&
      availabilityRepeateds &&
      availabilityRepeateds.length > 0 &&
      rcSlots.length === 0
    ) {
      const slots = [];
      for (const dayObj of availabilityRepeateds) {
        const dayName = Object.keys(dayObj)[0];
        const daySlots = dayObj[dayName];
        for (const slot of daySlots) {
          slots.push({
            day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
            vehicleId: slot.vehicle_id.toString(),
            locationId: slot.meeting_point_id.toString(),
            hours: slot.time.map((t: any) => t.start.slice(0, 5)),
          });
        }
      }
      setRcSlots(slots);
    }
  }, [availabilityRepeateds, tab]);

  const dayKey = days[selectedDay].toLowerCase();
  const hasExistingSlots = Array.isArray(availabilityRepeateds)
    ? availabilityRepeateds.some((obj) => obj[dayKey] && obj[dayKey].length > 0)
    : false;

  useEffect(() => {
    if (tab !== "special") return;
    if (specialSelectedVehicleId && specialSelectedLocationId) {
      const idx = specialSlots.findIndex(
        (slot) =>
          slot.date === specialDate &&
          slot.vehicleId === specialSelectedVehicleId &&
          slot.locationId === specialSelectedLocationId,
      );
      setSpecialSelectedRecapIdx(idx !== -1 ? idx : null);
      if (idx !== -1) {
        if (JSON.stringify(specialSlots[idx].hours) !== JSON.stringify(specialSelectedHours)) {
          setSpecialSelectedHours(specialSlots[idx].hours);
        }
      } else if (specialSelectedHours.length > 0) {
        setSpecialSelectedHours([]);
      }
    } else {
      setSpecialSelectedRecapIdx(null);
      if (specialSelectedHours.length > 0) {
        setSpecialSelectedHours([]);
      }
    }
  }, [specialDate, specialSelectedVehicleId, specialSelectedLocationId, specialSlots, tab]);

  const handleSpecialHoursChange = (hours: string[]) => {
    setSpecialSelectedHours(hours);
    setSpecialSlots((prev) => {
      const idx = prev.findIndex(
        (slot) =>
          slot.date === specialDate &&
          slot.vehicleId === specialSelectedVehicleId &&
          slot.locationId === specialSelectedLocationId,
      );
      if (idx !== -1) {
        const newHours = Array.from(new Set(hours));
        const newSlots = [...prev];
        newSlots[idx] = {
          ...newSlots[idx],
          hours: newHours,
        };
        return newHours.length > 0 ? newSlots : prev.filter((_, i) => i !== idx);
      } else if (hours.length > 0) {
        return [
          ...prev,
          {
            date: specialDate,
            vehicleId: specialSelectedVehicleId,
            locationId: specialSelectedLocationId,
            hours: hours,
          },
        ];
      }
      return prev;
    });
  };

  return (
    <>
      <PlanningModal
        open={isOpenPlanningModal}
        onClose={() => setIsOpenPlanningModal(false)}
        header={
          <>
            <h2 className="mb-2 text-2xl font-semibold">Votre planning</h2>
            <p className="mb-6 text-gray-600">
              Modifiez ici votre planning pour ouvrir des disponibilités et
              booker des sessions.
            </p>
            <Tabs tab={tab} setTab={setTab} />
          </>
        }
        daysTabs={
          tab === "recurrent" ? (
            <DaysTabs
              days={days}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          ) : null
        }
        scrollableContent={
          tab === "recurrent" ? (
            <div className="relative pb-8 overflow-auto">
              {(loading || availabilityRepeatedsLoading) && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="flex flex-col items-center justify-center rounded-[12px] bg-slate-100 px-[24px] py-[32px]">
                    <Lottie animationData={loadingIcon} />
                    <p className="text-sm text-gray-600">
                      {loading
                        ? "Envoi en cours..."
                        : "Chargement des données..."}
                    </p>
                  </div>
                </div>
              )}
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">
                  1. Sélectionner le véhicule
                </h3>
                <RCVehicleList
                  vehicles={vehicles}
                  selectedVehicleId={rcSelectedVehicleId}
                  setSelectedVehicleId={(id) => {
                    setRcSelectedVehicleId(id);
                    setRcSelectedLocationId("");
                    setRcSelectedHours([]);
                  }}
                  cardtype={cardtype}
                />
              </div>
              {rcSelectedVehicleId && (
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    2. Sélectionner le lieu
                  </h3>
                  <RCLocationList
                    locations={locations}
                    selectedLocationId={rcSelectedLocationId}
                    setSelectedLocationId={(id) => {
                      setRcSelectedLocationId(id);
                      const slot = rcSlots.find(
                        (slot) =>
                          slot.day === days[selectedDay] &&
                          slot.vehicleId === rcSelectedVehicleId &&
                          slot.locationId === id
                      );
                      if (slot) {
                        setRcSelectedHours(slot.hours);
                      } else {
                        setRcSelectedHours([]);
                      }
                    }}
                    mairie={mairie}
                    usedLocations={rcSlots
                      .filter(
                        (slot) =>
                          slot.day === days[selectedDay] &&
                          slot.vehicleId === rcSelectedVehicleId &&
                          !(slot.locationId === rcSelectedLocationId),
                      )
                      .map((slot) => slot.locationId)}
                  />
                </div>
              )}
              {rcSelectedVehicleId && rcSelectedLocationId && (
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    3. Sélectionner les heures
                  </h3>
                  <RCAvailabilityHours
                    selectedHours={rcSelectedHours}
                    setSelectedHours={setRcSelectedHours}
                    takenHours={Array.from(
                      new Set(
                        rcSlots
                          .filter(
                            (slot) =>
                              slot.day === days[selectedDay] &&
                              !(
                                slot.vehicleId === rcSelectedVehicleId &&
                                slot.locationId === rcSelectedLocationId
                              ),
                          )
                          .flatMap((slot) => slot.hours),
                      ),
                    )}
                  />
                </div>
              )}
              {(rcSlots.filter((slot) => slot.day === days[selectedDay]).length > 0 || hasExistingSlots) && (
                <div className="rounded-lg bg-gray-50 px-6 py-2">
                  <h3 className="mb-2 text-lg font-semibold">
                    Créneaux {hasExistingSlots ? "existants" : "ajoutés"} pour {days[selectedDay]}
                  </h3>
                  <ul className="space-y-2">
                    {rcSlots
                      .filter((slot) => slot.day === days[selectedDay])
                      .map((slot, idx) => {
                        const veh = vehicles.find(
                          (v) => v.id.toString() === slot.vehicleId,
                        );
                        const loc = locations.find(
                          (l) => l.id.toString() === slot.locationId,
                        );
                        return (
                          <li
                            key={idx}
                            className="md:flex flex-col cursor-pointer items-center justify-between rounded bg-white p-3 shadow-sm hover:bg-gray-100"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setRcSelectedVehicleId(slot.vehicleId);
                              setRcSelectedLocationId(slot.locationId);
                              setRcSelectedHours(slot.hours);
                            }}
                          >
                            <div className="flex-col">
                              <span className="font-medium">{veh?.brand}</span>
                              <span> {veh?.model}</span> —{" "}
                              <span className="font-medium">{loc?.label}</span> —{" "}
                              <span className="font-medium">
                                {slot.hours.join(", ")}
                              </span>
                            </div>
                            <button
                              className="text-red-500 hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRcSlots((prev) =>
                                  prev.filter(
                                    (_, i) =>
                                      i !==
                                      rcSlots
                                        .filter(
                                          (slot) =>
                                            slot.day === days[selectedDay],
                                        )
                                        .map((_, j) => j)[idx],
                                  ),
                                );
                              }}
                            >
                              Supprimer
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="mt-4 flex items-end justify-end">
                    <button
                      className="rounded-lg px-8 py-3 font-medium text-white transition-all hover:brightness-110"
                      style={{ backgroundColor: "#6C61F6" }}
                      onClick={async () => {
                        setLoading(true);
                        let allSuccess = true;
                        const currentDaySlots = rcSlots.filter(
                          (slot) => slot.day === days[selectedDay],
                        );

                        if (hasExistingSlots) {
                          await deleteAvailabilityRepeateds(
                            token,
                            days[selectedDay].toLowerCase(),
                          );
                        }

                        if (currentDaySlots.length > 0) {
                          for (const slot of currentDaySlots) {
                            const data = await createAvailabilityRepeateds(
                              token,
                              {
                                meeting_point_id: Number(slot.locationId),
                                vehicle_id: Number(slot.vehicleId),
                                day_of_week: slot.day.toLowerCase(),
                                time: slot.hours.map((hour) => ({
                                  start: formatHoursToSend(
                                    parseInt(hour.split(":")[0], 10),
                                  ),
                                  end: formatHoursToSend(
                                    parseInt(hour.split(":")[0], 10) + 1,
                                  ),
                                })),
                              },
                            );
                            if (!data) {
                              allSuccess = false;
                            }
                          }
                        }

                        await getAvailabilities(
                          token,
                          getMonday(new Date()).toISOString().split("T")[0],
                          dispatch,
                        );

                        const repeatedData =
                          await getAvailabilityRepeateds(token);
                        setAvailabilityRepeateds(repeatedData);

                        setLoading(false);
                        if (allSuccess) {
                          toast.success(
                            currentDaySlots.length > 0
                              ? `Créneaux pour ${days[selectedDay]} mis à jour avec succès !`
                              : `Créneaux pour ${days[selectedDay]} vidés avec succès !`,
                          );
                          setRcSlots((prev) =>
                            prev.filter((s) => s.day !== days[selectedDay]),
                          );
                          setIsOpenPlanningModal(false);
                        } else {
                          toast.error(
                            `Erreur lors de la mise à jour des créneaux pour ${days[selectedDay]}`,
                          );
                        }
                      }}
                    >
                      {hasExistingSlots && rcSlots.filter((slot) => slot.day === days[selectedDay]).length === 0
                        ? `Vider les créneaux pour ${days[selectedDay]}`
                        : hasExistingSlots
                          ? `Mettre à jour les créneaux pour ${days[selectedDay]}`
                          : `Envoyer les créneaux pour ${days[selectedDay]}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative pb-8 overflow-auto">
              {(availabilitiesLoading ||
                loading ||
                availabilityRepeatedsLoading) && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="flex flex-col items-center justify-center rounded-[12px] bg-slate-100 px-[24px] py-[32px]">
                    <Lottie animationData={loadingIcon} />
                    <p className="text-sm text-gray-600">
                      {loading
                        ? "Envoi en cours..."
                        : availabilityRepeatedsLoading
                          ? "Chargement des données..."
                          : "Chargement des données..."}
                    </p>
                  </div>
                </div>
              )}
              <div className="">
                <label className="mb-2 block text-lg font-semibold">
                  {" "}
                  1. Sélectionner la date
                </label>
                <input
                  type="date"
                  value={specialDate}
                  onChange={(e) => {
                    setSpecialDate(e.target.value);
                    setSpecialSelectedVehicleId("");
                    setSpecialSelectedLocationId("");
                    setSpecialSelectedHours([]);
                  }}
                  className="rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="rounded-lg bg-white pt-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">
                  2. Sélectionner votre véhicule
                </h3>
                <VehicleListSP
                  vehicles={vehicles}
                  selectedVehicleIds={
                    specialSelectedVehicleId ? [specialSelectedVehicleId] : []
                  }
                  setSelectedVehicleIds={(ids) => {
                    setSpecialSlots((prev) => {
                      if (
                        specialSelectedLocationId &&
                        specialSelectedHours.length > 0 &&
                        specialSelectedVehicleId
                      ) {
                        const exists = prev.some(
                          (slot) =>
                            slot.date === specialDate &&
                            slot.vehicleId === specialSelectedVehicleId &&
                            slot.locationId === specialSelectedLocationId &&
                            JSON.stringify(slot.hours.sort()) ===
                              JSON.stringify([...specialSelectedHours].sort()),
                        );
                        if (!exists) {
                          prev = [
                            ...prev,
                            {
                              date: specialDate,
                              vehicleId: specialSelectedVehicleId,
                              locationId: specialSelectedLocationId,
                              hours: specialSelectedHours,
                            },
                          ];
                        }
                      }
                      return prev;
                    });
                    setSpecialSelectedLocationId("");
                    setSpecialSelectedHours([]);
                    setSpecialSelectedVehicleId(ids[0] || "");
                  }}
                  cardtype={cardtype}
                />
              </div>
              {specialSelectedVehicleId && (
                <div className="mt-6 rounded-lg bg-white shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold">
                    3. Sélectionner le lieu
                  </h3>
                  <LocationListSP
                    locations={locations}
                    selectedLocationIds={
                      specialSelectedLocationId
                        ? [specialSelectedLocationId]
                        : []
                    }
                    setSelectedLocationIds={(ids) => {
                      if (
                        specialSelectedLocationId &&
                        specialSelectedHours.length > 0
                      ) {
                        const exists = specialSlots.some(
                          (slot) =>
                            slot.date === specialDate &&
                            slot.vehicleId === specialSelectedVehicleId &&
                            slot.locationId === specialSelectedLocationId &&
                            JSON.stringify(slot.hours.sort()) ===
                              JSON.stringify([...specialSelectedHours].sort()),
                        );
                        if (!exists) {
                          setSpecialSlots((prev) => [
                            ...prev,
                            {
                              date: specialDate,
                              vehicleId: specialSelectedVehicleId,
                              locationId: specialSelectedLocationId,
                              hours: specialSelectedHours,
                            },
                          ]);
                        }
                        setSpecialSelectedHours([]);
                      }
                      setSpecialSelectedLocationId(ids[0] || "");
                    }}
                    mairie={mairie}
                    usedLocations={locations
                      .filter((loc) =>
                        specialSlots.some(
                          (slot) =>
                            slot.date === specialDate &&
                            slot.locationId === loc.id.toString() &&
                            slot.vehicleId === specialSelectedVehicleId,
                        ),
                      )
                      .map((loc) => loc.id.toString())}
                  />
                </div>
              )}
              {specialSelectedVehicleId && specialSelectedLocationId && (
                <div className="mt-6 rounded-lg bg-white px-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold">
                    3. Sélectionner les heures
                  </h3>
                  {(() => {
                    const takenHours = Array.from(
                      new Set(
                        specialSlots
                          .filter(
                            (slot) =>
                              slot.date === specialDate &&
                              !(
                                slot.vehicleId === specialSelectedVehicleId &&
                                slot.locationId === specialSelectedLocationId
                              ),
                          )
                          .flatMap((slot) => slot.hours),
                      ),
                    );
                    const takenFromApi = Array.from(
                      new Set(
                        availabilities
                          .filter(
                            (a) =>
                              (a as any).date &&
                              (a as any).date.startsWith(specialDate),
                          )
                          .map((a) => (a as any).start_time),
                      ),
                    );
                    const allTaken = Array.from(
                      new Set([...takenHours, ...takenFromApi]),
                    );
                    return (
                      <AvailabilityHoursSP
                        selectedHours={specialSelectedHours}
                        setSelectedHours={handleSpecialHoursChange}
                        takenHours={allTaken}
                      />
                    );
                  })()}
                </div>
              )}
              {specialSlots.length > 0 && (
                <div className="rounded-lg bg-gray-50 px-6">
                  <h3 className="text-lg font-semibold">Créneaux ajoutés</h3>
                  <ul className="space-y-2">
                    {specialSlots.map((slot, idx) => {
                      const veh = vehicles.find(
                        (v) => v.id.toString() === slot.vehicleId,
                      );
                      const loc = locations.find(
                        (l) => l.id.toString() === slot.locationId,
                      );
                      return (
                        <li
                          key={idx}
                          className="flex cursor-pointer items-center justify-between rounded bg-white p-3 shadow-sm hover:bg-gray-100"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setSpecialDate(slot.date);
                            setSpecialSelectedVehicleId(slot.vehicleId);
                            setSpecialSelectedLocationId(slot.locationId);
                            setSpecialSelectedRecapIdx(idx);
                            setSpecialSelectedHours(slot.hours);
                          }}
                        >
                          <span>
                            <b>{slot.date}</b> — {veh?.brand} {veh?.model} —{" "}
                            {loc?.label} — {slot.hours.join(", ")}
                          </span>
                          <button
                            className="ml-4 text-red-500 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSpecialSlots((prev) => prev.filter((_, i) => i !== idx));
                              if (specialSelectedRecapIdx === idx) {
                                setSpecialSelectedRecapIdx(null);
                                setSpecialSelectedVehicleId("");
                                setSpecialSelectedLocationId("");
                                setSpecialSelectedHours([]);
                              }
                            }}
                          >
                            Supprimer
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {specialSlots.length > 0 && (
                <div className="flex items-end justify-end">
                  <button
                    className="rounded-lg px-8 py-3 font-medium text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#6C61F6" }}
                    onClick={async () => {
                      setLoading(true);
                      for (const slot of specialSlots) {
                        const dayName = getDayNameInFrench(slot.date);
                        for (const hour of slot.hours) {
                          const startHour = parseInt(hour.split(":")[0], 10);
                          await createPlanningSpecial(
                            token,
                            Number(slot.locationId),
                            Number(slot.vehicleId),
                            dayName,
                            slot.date,
                            startHour,
                            startHour + 1,
                          );
                        }
                      }
                      await getAvailabilities(
                        token,
                        getMonday(new Date(specialDate))
                          .toISOString()
                          .split("T")[0],
                        dispatch,
                      );
                      toast.success("Créneaux créés avec succès");
                      setSpecialSlots([]);
                      setLoading(false);
                      setIsOpenPlanningModal(false);
                    }}
                  >
                    {loading
                      ? "Envoi en cours..."
                      : "Envoyer tous les créneaux"}
                  </button>
                </div>
              )}
            </div>
          )
        }
      />
    </>
  );
}
