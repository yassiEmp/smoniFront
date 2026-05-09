import Ilustration from "@assets/dashboard-moniteur/Creation-Planing.png";
import { X } from "lucide-react";
import { useState } from "react";

const PopupCreationPlaning = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {!isOpen && (
        <div
          className="fixed z-50 flex h-full w-full items-center justify-center bg-black/40"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative mr-[10vw] flex max-h-[458px] max-w-[585px] flex-col items-center justify-center gap-[24px] rounded-[12px] border-[0.5px] border-[#F5F5F5] bg-white px-[24px] py-[32px]">
            <div
              className="absolute right-5 top-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X />
            </div>
            <img src={Ilustration} alt="" />
            <p className="max-w-[500px] text-center text-[18px] font-medium leading-[140%]">
              Créez votre planning de disponibilité pour commencer votre
              aventure de moniteur indépendant avec SMONI
            </p>
            <button className="w-full rounded-[75px] bg-[#6C61F6] py-[13.5px] text-[13.5px] font-semibold leading-[140%] text-[#FDFDFD]">
              Créer mon planning
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupCreationPlaning;
