type AvailabilityHoursProps = {
  selectedHour: number|null;
  setSelectedHour: (hours: number) => void;
};

const hours = Array.from({ length: 17 }, (_, i) => 6 + i);

export default function AvailabilityHours({ selectedHour, setSelectedHour }: AvailabilityHoursProps) {
  const slots = hours.map((h) => ({
    start: h,
    end: h + 1,
  }));
  const mid = Math.ceil(slots.length / 2);
  const col1 = slots.slice(0, mid);
  const col2 = slots.slice(mid);

  return (
    <div className="mb-8">
      <label className="font-medium block mb-2">Heures de disponibilité</label>
      <div className="grid grid-cols-2 gap-x-8">
        {[col1, col2].map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-0">
            {col.map((slot, idx) => (
              <div
                key={slot.start}
                className={`flex items-center bg-white rounded-md px-4 h-12 ${idx !== col.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <span className="min-w-[90px]">{String(slot.start).padStart(2, '0')} H → {String(slot.end).padStart(2, '0')} H</span>
                <input
                  type="checkbox"
                  checked={selectedHour === slot.start}
                  onChange={() => setSelectedHour(slot.start)}
                  className={`ml-auto w-5 h-5 rounded border-2 transition-colors ${selectedHour === slot.start ? '' : 'border-gray-300'}`}
                  style={{ accentColor: '#6C61F6', borderColor: selectedHour === slot.start ? '#6C61F6' : undefined }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}