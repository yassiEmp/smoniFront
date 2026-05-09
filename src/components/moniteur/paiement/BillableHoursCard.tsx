import { useNavigate } from "react-router";
import coins_rafiki from "@assets/dashboard-moniteur/coins-rafiki.svg";

interface BillableHoursCardProps {
 hours: number;
  totalHT: number;
  onClick?: () => void;
  path?: string | null;
}

const BillableHoursCard = ({ hours, totalHT, onClick, path }: BillableHoursCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex min-h-[150px] w-full max-w-full cursor-pointer flex-col justify-between rounded-[8px] border-[0.5px] border-[#E0E0E0] bg-[#FDFDFD] p-4 text-start lg:max-w-[350px]"
    >
      <div className="space-y-2">
        <h4 className="text-sm font-medium leading-[140%] text-[#000000]">
          Heures facturables
        </h4>
        <span className="text-xs font-[400] leading-[140%] text-[#616161]">
          {hours} heures
        </span>
      </div>

      <h1 className="flex gap-0.5 text-[48px] font-medium uppercase leading-[120%] text-black">
        {totalHT}
        <span className="ml-1 mt-2 text-[24px] lowercase">€</span>
      </h1>

      <img
        src={coins_rafiki}
        alt="Coins"
        className={`absolute right-0 top-[75px] h-auto w-[80px] object-cover ${
          totalHT <= 0 ? "grayscale filter" : ""
        }`}
      />
    </div>
  );
};

export default BillableHoursCard;
