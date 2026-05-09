import car_vector from "@assets/authentification/car-vector.svg";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  // Calcul direct du pourcentage
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="flex justify-center items-center w-full mt-4">
      <div className="relative h-[5px] w-full bg-[#F1F0F4] rounded-[100px]">
        {/* Barre remplie */}
        <div
          className="h-full bg-[#6C61F6] rounded-[100px] transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Voiture */}
        <img
          src={car_vector}
          alt="Car"
          className="absolute -top-5 w-[24px] h-auto transition-all duration-300 ease-in-out"
          style={{ left: `calc(${progressPercent}% - 16px)` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
