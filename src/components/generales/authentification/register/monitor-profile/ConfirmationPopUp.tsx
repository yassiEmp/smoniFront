import { X } from "lucide-react";
import envelope_icon from "@assets/authentification/envelope-icon.svg";
import attention_icon from "@assets/authentification/attention-icon.svg";
import { useState } from "react";
import { verifyEmail } from "../../../../../api/auth";
type RegisterConfirmationProps = {
  onClose: () => void;
  email: string;
};

const ConfirmationPopUp = ({ onClose, email }: RegisterConfirmationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyEmail = async () => {
    setIsLoading(true);
    await verifyEmail(email);
    setIsLoading(false);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] rounded-[12px] border-[1px] bg-white p-8 text-center shadow-lg"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-4 flex flex-col items-center justify-center gap-3 md:flex-row">
          <img
            src={envelope_icon}
            alt="Envelope"
            className="h-auto w-[36px] object-contain"
          />

          <h3 className="text-[24px] font-bold leading-tight text-black sm:text-[28px] md:text-[32px]">
            Vos informations ont bien été enregistrées !
          </h3>
        </div>

        {/* Message */}
        <p className="mb-4 text-[16px] leading-[1.6] text-black sm:text-[18px]">
          Notre équipe va maintenant analyser vos documents.
          <br />
          En attendant, pensez à confirmer votre adresse e-mail via le lien que
          nous venons de vous envoyer sur votre adresse e-mail {email}.
        </p>

        {/* Info spam */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <img src={attention_icon} alt="Attention" className="w-[18px]" />

          <span className="text-[15px] font-normal text-black">
            Pensez à vérifier vos spams si besoin.
          </span>
        </div>

        {/* Renvoyer lien */}
        <p className="text-sm text-black">
          Pas reçu le mail ?{" "}
          <button
            className="font-semibold underline transition hover:text-primary"
            onClick={handleVerifyEmail}
            disabled={isLoading}
          >
            {isLoading ? "Veuillez patienter..." : "Renvoyer le lien"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
