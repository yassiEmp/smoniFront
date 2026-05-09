import { CheckCircle2 } from "lucide-react";

type RCAvailabilityHoursProps = {
  selectedHours: string[];
  setSelectedHours: (hours: string[]) => void;
  takenHours?: string[];
};

const hours = Array.from({ length: 17 }, (_, i) => 6 + i);

export default function RCAvailabilityHours({ selectedHours, setSelectedHours, takenHours = [] }: RCAvailabilityHoursProps) {
  const handleHourClick = (hour: number) => {
    const hourStr = `${String(hour).padStart(2, '0')}:00`;
    if (takenHours.includes(hourStr)) return;
    if (selectedHours.includes(hourStr)) {
      setSelectedHours(selectedHours.filter(h => h !== hourStr));
    } else {
      setSelectedHours([...selectedHours, hourStr]);
    }
  };

  return (
    <div className="mb-8">
      <label className="font-medium block mb-2">Heures de disponibilité</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hours.map((hour) => {
          const hourStr = `${String(hour).padStart(2, '0')}:00`;
          const isTaken = takenHours.includes(hourStr);
          const isSelected = selectedHours.includes(hourStr);
          return (
            <div
              key={hour}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isSelected 
                  ? 'border-[#6C61F6] bg-[#f5f3ff]' 
                  : isTaken 
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                    : 'border-gray-200 hover:border-[#6C61F6] cursor-pointer'
              }`}
              onClick={() => !isTaken && handleHourClick(hour)}
            >
              <span className="text-sm font-medium">
                {String(hour).padStart(2, '0')}:00 - {String(hour + 1).padStart(2, '0')}:00
              </span>
              {isTaken ? (
                <div className="flex items-center text-green-500">
                  <CheckCircle2 className="w-5 h-5 mr-1" />
                  <span className="text-sm">Utilisé</span>
                </div>
              ) : (
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleHourClick(hour)}
                  className="w-5 h-5 rounded border-2 transition-colors"
                  style={{ 
                    accentColor: '#6C61F6',
                    cursor: isTaken ? 'not-allowed' : 'pointer'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 