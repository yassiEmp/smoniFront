import coins_rafiki from "@assets/dashboard-moniteur/coins-rafiki.svg";

interface UpcomingPaymentsCardProps {
  count: number;
}

const UpcomingPaymentsCard = ({ count }: UpcomingPaymentsCardProps) => {


  return (
    <div
     
      className="relative flex min-h-[150px] w-full max-w-full cursor-pointer flex-col justify-between rounded-[8px] border-[0.5px] border-[#E0E0E0] bg-[#FDFDFD] p-4 text-start lg:max-w-[350px]"
    >
      <div className="space-y-2">
        <h4 className="text-sm font-medium leading-[140%] text-[#000000]">
          Paiements à venir
        </h4>
      </div>

      <h1 className="flex gap-0.5 text-[48px] font-medium uppercase leading-[120%] text-black">
        {count}
        <span className="ml-1 mt-2 text-[24px] lowercase">
          {count === 1 ? "facture" : "factures"}
        </span>
      </h1>

      {coins_rafiki && (
        <img
          src={coins_rafiki}
          alt="Coins"
          className={`absolute right-0 top-[75px] h-auto w-[80px] object-cover ${
            count <= 0 ? "grayscale filter" : ""
          }`}
        />
      )}
    </div>
  );
};

export default UpcomingPaymentsCard;