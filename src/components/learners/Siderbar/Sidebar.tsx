import React from "react";
import outline from "@assets/apprenants/dashboard/Outline.png";
import MonitorList from "./MonitorList";
import { meetingPoints } from "@/types/data/index";
import Loader from "@/components/common/Loader";

interface SidebarProps {
  selectedLocation: number | "";
  setSelectedLocation: (id: number | "") => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  fetchDisponibility: () => void;
  instructorsData: any[];
  otherInstructorsData?: any[];
  loading: boolean;
  mode: "manual" | "automatic";
  setMode: (mode:"manual" | "automatic") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedLocation,
  setSelectedLocation,
  selectedDate,
  setSelectedDate,
  instructorsData,
  otherInstructorsData = [],
  loading,
  fetchDisponibility,
  mode,
  setMode,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const filteredMeetingPoints = meetingPoints.filter((loc) =>
    loc.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calcul de la date minimale sélectionnable (aujourd'hui + 3 jours)
  const minSelectableDate = React.useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().split("T")[0];
  }, []);
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <h2 className="mb-2 text-lg font-semibold">
        {instructorsData.length} moniteur(s) disponible(s)
      </h2>
      <div className="h-[90vh] space-y-2">
        {/* Filtres */}
        <div className="flex flex-col gap-2 rounded-md bg-white p-2 shadow">
          {/* Segmented control: Tout / Manuel / Automatique */}
          <div className="flex w-full items-center justify-center">
            <div className="inline-flex rounded-md border border-gray-200 bg-white p-1 text-xs font-medium">
              <button
                type="button"
                className={`px-3 py-1 rounded ${mode === "manual" ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setMode("manual")}
              >
                Manuel
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded ${mode === "automatic" ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setMode("automatic")}
              >
                Automatique
              </button>
            </div>
          </div>
          <div className="flex flex-nowrap gap-2">
          <div
            className="relative flex w-2/3 items-center rounded border-2 border-gray-200 bg-white px-2 py-2"
            ref={dropdownRef}
          >
            <span className="pointer-events-none absolute left-4 z-50 flex h-full items-center">
              <img
                className="h-[18px] w-[18px] opacity-70"
                src={outline}
                alt="Lieu"
              />
            </span>
            {selectedLocation !== "" && (
              <button
                type="button"
                aria-label="Effacer le lieu sélectionné"
                title="Effacer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation("");
                }}
                className="absolute right-8 z-50 flex h-full items-center text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
            <span className="pointer-events-none absolute right-2 flex h-full items-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6 8L10 12L14 8"
                  stroke="#757575"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div
              className="relative w-full cursor-pointer appearance-none bg-transparent pl-10 pr-8 text-[13px] font-medium text-[#333] outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Escape") setDropdownOpen(false);
                if (e.key === "Enter") setDropdownOpen((open) => !open);
              }}
            >
              <div className="flex h-6 w-full items-center">
                {selectedLocation === "" ? (
                  <span className="text-gray-400">Choisir un lieu</span>
                ) : (
                  <span>
                    {
                      meetingPoints.find((loc) => loc.id === selectedLocation)
                        ?.label
                    }
                  </span>
                )}
              </div>
              {dropdownOpen && (
                <div className="absolute left-0 top-8 z-50 max-h-56 w-full overflow-y-auto rounded border border-gray-200 bg-white shadow-lg">
                  <input
                    type="text"
                    className="w-full border-b border-gray-100 px-2 py-1 text-[13px] focus:outline-none"
                    placeholder="Rechercher un lieu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <div>
                    {filteredMeetingPoints.length === 0 ? (
                      <div className="px-2 py-2 text-center text-sm text-gray-400">
                        <span className="text-sm text-gray-400">
                          Aucun lieu trouvé
                        </span>
                      </div>
                    ) : (
                      [...filteredMeetingPoints]
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((loc) => (
                          <div
                            key={loc.id}
                            className={`cursor-pointer px-2 py-2 text-[13px] hover:bg-gray-100 ${selectedLocation === loc.id ? "bg-gray-100 font-bold" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLocation(loc.id);
                              setDropdownOpen(false);
                              setSearchTerm("");
                            }}
                          >
                            {loc.label} ({loc.city})
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-1/3 items-center rounded border-2 px-2 py-2">
            <input
              type="date"
              id="dateFilter"
              className="w-full bg-transparent px-2 py-1 text-[12px] font-semibold text-[#757575] outline-none"
              placeholder="Choisir une date"
              aria-label="Choisir une date"
              value={selectedDate}
              min={minSelectableDate}
              max={(() => {
                const now = new Date();
                const maxDate = new Date(
                  now.getFullYear(),
                  now.getMonth() + 2 + 1,
                  0,
                ); // dernier jour du mois courant + 2 mois
                return maxDate.toISOString().split("T")[0];
              })()}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="absolute -bottom-5 left-0 text-[11px] text-gray-500">
              {(() => {
                const now = new Date();
                const maxDate = new Date(now.getFullYear(), now.getMonth() + 3, 0)
                  .toISOString()
                  .split("T")[0];
                return `Sélectionnez une date jusqu'au ${maxDate}`;
              })()}
            </div>
          </div>
          </div>
        </div>
        {/* Affichage dynamique selon loading */}
        <div className="scrollbar-hide h-[80vh] space-y-4 overflow-y-auto">
          {loading ? (
            <div className="mt-8 text-center text-indigo-500">
              <Loader />
            </div>
          ) : instructorsData.length === 0 ? (
            <div>
              <div className="mt-8 text-center text-gray-400">
                Pas de disponibilité pour la ville sélectionnée
              </div>
              {otherInstructorsData.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 text-sm font-semibold text-gray-700">
                    Disponibilités dans d'autres villes à la même date
                  </div>
                  <div className="space-y-3">
                    {otherInstructorsData.map((item: any) => (
                      <MonitorList
                        key={(item.instructor?.id ?? Math.random()) + "-other"}
                        instructor={item.instructor}
                        profile={item.instructor_profile}
                        availabilities={item.availabilities}
                        fetchDisponibility={fetchDisponibility}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {instructorsData.map((item: any) => (
                  <MonitorList
                    key={item.instructor.id}
                    instructor={item.instructor}
                    profile={item.instructor_profile}
                    availabilities={item.availabilities}
                    fetchDisponibility={fetchDisponibility}
                  />
                ))}
              </div>

              {otherInstructorsData.length > 0 && (
                <div className="mt-6">
                  <div className="mb-2 text-sm font-semibold text-gray-700">
                    Aussi disponibles dans d'autres lieux à la même date
                  </div>
                  <div className="space-y-3">
                    {otherInstructorsData.map((item: any) => (
                      <MonitorList
                        key={(item.instructor?.id ?? Math.random()) + "-other"}
                        instructor={item.instructor}
                        profile={item.instructor_profile}
                        availabilities={item.availabilities}
                        fetchDisponibility={fetchDisponibility}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
