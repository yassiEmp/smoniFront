type SpecialDateTimeSelectorProps = {
  date: string;
  isSpecial: boolean;
  setDate?: (d: string) => void;
};

export default function SpecialDateTimeSelector({
  date,
  setDate,
  isSpecial,
}: SpecialDateTimeSelectorProps) {
  return (
    <div className="mb-8">
      {isSpecial ? (
        <div className="flex items-center gap-2">
          <p className="font-medium">
            Ajouter un créneau pour le {date} 
          </p>
        </div>
      ) : (
        <>
          <label className="mb-2 block font-medium">
            Sélectionner la date pour le programme
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate && setDate(e.target.value)}
            className="border-0 border-b-2 border-[#6C61F6] bg-transparent px-3 py-2 font-medium text-black focus:border-[#6C61F6] focus:outline-none"
          />
        </>
      )}
    </div>
  );
}
