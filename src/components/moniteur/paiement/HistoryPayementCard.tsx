import { useNavigate } from "react-router";
import business_solution_amico from "@assets/dashboard-moniteur/business-solution-amico.svg";

interface HistoryPayementCardProps {
 
  onClick?: () => void;
  path?: string | null;
}

const HistoryPayementCard = ({ onClick, path }: HistoryPayementCardProps) => {
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
      className="relative flex min-h-[150px] w-full max-w-full cursor-pointer flex-col justify-between rounded-[8px] border-[0.5px] border-[#E0E0E0] bg-[#FDFDFD] p-4 text-start"
    >
      <div className="space-y-2">
        <h4 className="text-sm font-medium leading-[140%] text-[#000000]">
          Historique des transactions
        </h4>
      </div>

    

      <img
        src={business_solution_amico}
        alt="Business"
        className="absolute right-2 top-[75px] h-auto w-[70px] object-cover"
      />
    </div>
  );
};

export default HistoryPayementCard;
