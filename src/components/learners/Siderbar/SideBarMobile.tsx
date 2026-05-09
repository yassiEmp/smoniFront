import outline from '@assets/apprenants/dashboard/Outline.png';
import MonitorList from './MonitorList';

import { meetingPoints } from '@/types/data/index';
import React from "react";
import Loader from '@/components/common/Loader';

interface SideBarMobileProps {
  selectedLocation: number | '';
  setSelectedLocation?: (id: number | '') => void;
  selectedDate: string;
  setSelectedDate?: (date: string) => void;
  instructorsData?: any[];
  otherInstructorsData?: any[];
  fetchDisponibility: () => void;
  loading: boolean;
  // plus de tab mode ici non plus
  mode: 'manual' | 'automatic';
  setMode: (mode: 'manual' | 'automatic') => void;
}

const SideBarMobile = ({
  selectedLocation,
  setSelectedLocation = () => {},
  selectedDate,
  setSelectedDate = () => {},
  instructorsData = [],
  otherInstructorsData = [],
  loading,
  fetchDisponibility,
  mode,
  setMode
}: SideBarMobileProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const filteredMeetingPoints = meetingPoints.filter((loc) =>
    loc.label.toLowerCase().includes(searchTerm.toLowerCase())
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
  const minSelectableDate = React.useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().split("T")[0];
  }, []);
  const safeInstructors = Array.isArray(instructorsData) ? instructorsData : [];
  return (
    <div className="w-full p-4 space-y-4 animate-slideUp max-h-[calc(75vh-56px)] z-10 overflow-auto scrollbar-hide">
      <h2 className="text-lg font-semibold">
        {safeInstructors.length} moniteur(s) disponible(s)
      </h2>
      <div className="h-[60vh] space-y-2">
        {/* Filtres dynamiques */}
        <div className="flex flex-col gap-2 bg-white p-2 rounded-md shadow">
          <div className="flex w-full items-center justify-center">
            <div className="inline-flex rounded-md border border-gray-200 bg-white p-1 text-xs font-medium">
              <button
                type="button"
                className={`px-3 py-1 rounded ${mode === 'manual' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setMode('manual')}
              >
                Manuel
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded ${mode === 'automatic' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setMode('automatic')}
              >
                Automatique
              </button>
            </div>
          </div>
          <div className="md:flex flex-col flex-nowrap gap-2">
            <div className="relative flex items-center md:w-2/3 border-2 border-gray-200 rounded px-2 py-2 bg-white" ref={dropdownRef}>
              <span className="absolute z-50 left-4 flex items-center h-full pointer-events-none">
                <img className="w-[18px] h-[18px] opacity-70" src={outline} alt="Lieu" />
              </span>
              <span className="absolute right-4 flex items-center h-full pointer-events-none">
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
                className="appearance-none bg-transparent outline-none text-[13px] text-[#333] font-medium w-full cursor-pointer pl-10 pr-8 relative"
                onClick={() => setDropdownOpen((open) => !open)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setDropdownOpen(false);
                  if (e.key === 'Enter') setDropdownOpen((open) => !open);
                }}
              >
                <div className="w-full h-6 flex items-center">
                  {selectedLocation === "" ? (
                    <span className="text-gray-400">Choisir un lieu</span>
                  ) : (
                    <span>
                      {meetingPoints.find((loc) => loc.id === selectedLocation)?.label}
                    </span>
                  )}
                </div>
                {dropdownOpen && (
                  <div className="absolute left-0 top-8 z-50 w-full rounded bg-white shadow-lg border border-gray-200 max-h-56 overflow-y-auto">
                    <input
                      type="text"
                      className="w-full px-2 py-1 text-[13px] border-b border-gray-100 focus:outline-none"
                      placeholder="Rechercher un lieu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                    <div>
                      {[...filteredMeetingPoints]
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .length === 0 ? (
                          <div className="px-2 py-2 text-gray-400 text-sm text-center">
                            <span className="text-gray-400 text-sm">Aucun lieu trouvé</span>
                          </div>
                        ) : (
                          [...filteredMeetingPoints]
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((loc) => (
                              <div
                                key={loc.id}
                                className={`px-2 py-2 text-[13px] cursor-pointer hover:bg-gray-100 ${selectedLocation === loc.id ? "bg-gray-100 font-bold" : ""}`}
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

            <div className="flex items-center md:w-1/3 md:mt-0 mt-2 border-2 rounded px-2 py-2 relative">
              <input
                type="date"
                id="dateFilterMobile"
                className="px-2 py-1 text-[12px] font-semibold text-[#757575] w-full bg-transparent outline-none"
                placeholder="Choisir une date"
                aria-label="Choisir une date"
                value={selectedDate}
                min={minSelectableDate}
                max={(() => {
                  const now = new Date();
                  const maxDate = new Date(now.getFullYear(), now.getMonth() + 2 + 1, 0);
                  return maxDate.toISOString().split('T')[0];
                })()}
                onChange={e => setSelectedDate(e.target.value)}
              />
              <div className="absolute -bottom-5 left-0 text-[11px] text-gray-500">
                {(() => {
                  const now = new Date();
                  const maxDate = new Date(now.getFullYear(), now.getMonth() + 3, 0)
                    .toISOString()
                    .split('T')[0];
                  return `Sélectionnez une date jusqu'au ${maxDate}`;
                })()}
              </div>
            </div>
          </div>
        </div>
        {/* Affichage dynamique selon loading */}
        <div className="h-[50vh] space-y-3 overflow-y-auto scrollbar-hide">
          {loading ? (
            <>
            <Loader />
            </>
          ) : safeInstructors.length === 0 ? (
            <div>
              <div className="text-center text-gray-400 mt-8">Pas de disponibilité pour la ville sélectionnée</div>
              {otherInstructorsData.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 text-sm font-semibold text-gray-700">
                    Disponibilités dans d'autres villes à la même date
                  </div>
                  <div className="space-y-3">
                    {otherInstructorsData.map((item: any) => (
                      <MonitorList
                        key={(item.instructor?.id ?? Math.random()) + '-other'}
                        instructor={item.instructor}
                        availabilities={item.availabilities}
                        fetchDisponibility={fetchDisponibility}
                        profile={item.instructor_profile}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {safeInstructors.map((item: any) => (
                <MonitorList
                  key={item.instructor?.id || Math.random()}
                  instructor={item.instructor}
                  availabilities={item.availabilities}
                  fetchDisponibility={fetchDisponibility}
                  profile={item.instructor_profile}
                />
              ))}
              {otherInstructorsData.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 text-sm font-semibold text-gray-700">
                    Aussi disponibles dans d'autres lieux à la même date
                  </div>
                  <div className="space-y-3">
                    {otherInstructorsData.map((item: any) => (
                      <MonitorList
                        key={(item.instructor?.id ?? Math.random()) + '-other'}
                        instructor={item.instructor}
                        availabilities={item.availabilities}
                        fetchDisponibility={fetchDisponibility}
                        profile={item.instructor_profile}
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

export default SideBarMobile;