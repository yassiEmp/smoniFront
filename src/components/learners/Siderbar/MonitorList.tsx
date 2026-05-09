import { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import MonitorProfileModal from "../MonitorProfileModal";
import { imageUrl } from "@/api";

interface MonitorListProps {
  instructor: any;
  availabilities: any[];
  fetchDisponibility: () => void;
  profile:any
}

const MonitorList = ({
  instructor,
  availabilities,
  fetchDisponibility,
  profile
}: MonitorListProps) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div
      className="flex cursor-pointer gap-4 rounded-md bg-white p-4 shadow hover:shadow-md"
      onClick={() => setShowProfile(true)}
    >
      {instructor.photo ? (
        <img
          src={`${imageUrl}${instructor.photo}`}
          alt={`${instructor.firstname} ${instructor.lastname}`}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-lg font-semibold text-white">
          {`${instructor.lastname?.charAt(0) ?? ""}${instructor.firstname?.charAt(0) ?? ""}`}
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-center ">
          <h3 className="mr-2 font-semibold text-gray-900">
            {instructor.firstname} {instructor.lastname}
          </h3>
          {/* Ajoute ici la distance ou autre info si dispo */}
        </div>
          {(() => {
            const firstAvailability = (availabilities || [])[0];
            const mp = firstAvailability?.meeting_point;
            return (
              <p className="mr-2 text-md font-medium text-gray-900">
                Lieu: {mp?.label ?? 'Non précisé'}
              </p>
            )
          })()}
          {(() => {
            const firstAvailability = (availabilities || [])[0];
            const gearbox = firstAvailability?.vehicle?.gearbox_type;
            return gearbox ? (
              <p className="text-md font-semibold text-gray-600">
                Boîte: {gearbox === 'automatic' ? 'Automatique' : gearbox === 'manual' ? 'Manuelle' : gearbox}
              </p>
            ) : null;
          })()}
        <div>
          <p className="flex items-center gap-1 text-[12px] font-semibold text-[#757575]">
            <Calendar className="flex h-4 w-4 text-gray-400" />
            {availabilities?.length} créneau(x) dispo
          </p>
        </div>
        {/* Liste des créneaux (exemple simple) */}
        {/* {availabilities.length > 0 && (
          <ul className="mt-2 text-xs text-gray-600">
            {availabilities.map((slot, idx) => (
              <li key={slot.id || idx} className="mb-1">
                {slot.date?.slice(0, 10)} | {slot.start_time} - {slot.end_time} | {slot.vehicle?.brand} {slot.vehicle?.model}
              </li>
            ))}
          </ul>
        )} */}
      </div>
      <div className="flex items-center">
        <ChevronRight className="h-5 w-5 font-bold" />
      </div>
      {showProfile && (
        <MonitorProfileModal
          instructor={instructor}
          availabilities={availabilities}
          onClose={() => {
            setShowProfile(false);
            fetchDisponibility()
          }}
        />
      )}
    </div>
  );
};
export default MonitorList;
