type DaysTabsProps = {
  days: string[];
  selectedDay: number;
  setSelectedDay: (idx: number) => void;
};

export default function DaysTabs({ days, selectedDay, setSelectedDay }: DaysTabsProps) {
  return (
    <div className="overflow-x-auto w-full scrollbar-hide flex border-b border-gray-200 mb-6 mt-2">
      {days.map((day, idx) => (
        <button
          key={day}
          className={`flex-1 text-sm py-2 px-1 border-b-2 transition-colors ${selectedDay === idx ? 'font-semibold' : 'text-gray-500 border-transparent'}`}
          style={selectedDay === idx ? { color: '#6C61F6', borderBottom: '2px solid #6C61F6' } : {}}
          onClick={() => setSelectedDay(idx)}
        >
          {day}
        </button>
      ))}
    </div>
  );
} 