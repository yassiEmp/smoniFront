import { useNavigate } from "react-router";

interface StatCardProps {
  title: string;
  value: string | null;
  time?: string | null;
  device?: string | null;
  image?: string;
  path?: string | null;
}

const StatCard = ({
  title,
  value,
  time,
  device,
  image,
  path,
}: StatCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (path) {
      navigate("/monitor/historique");
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative flex min-h-[150px] w-full max-w-full cursor-pointer flex-col justify-between rounded-[8px] border-[0.5px] border-[#E0E0E0] bg-[#FDFDFD] p-4 text-start lg:max-w-[350px]"
    >
      <div className="space-y-2">
        <h4 className="text-sm font-medium leading-[140%] text-[#000000]">
          {title}
        </h4>

        <span className="text-xs font-[400] leading-[140%] text-[#616161]">
          {time && `${time} heures`}
        </span>
      </div>

      <h1 className="flex gap-0.5 text-[48px] font-medium uppercase leading-[120%] text-black">
        {value}
        <span className="ml-1 mt-2 text-[24px] lowercase">{device}</span>
      </h1>

      {image && (
        <img
          src={image}
          alt="Stat illustration"
          className={`absolute right-0 top-[75px] h-auto w-[80px] object-cover ${
            value != null && Number(value) <= 0 ? "grayscale filter" : ""
          }`}
        />
      )}
    </div>
  );
};

export default StatCard;
