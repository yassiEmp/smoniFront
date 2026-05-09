import { X } from "lucide-react";
import envelope_icon from "@assets/authentification/envelope-icon.svg";
import attention_icon from "@assets/authentification/attention-icon.svg";
import { useState } from "react";
import { verifyEmail } from "../../../../../api/auth";
type RegisterConfirmationProps = {
  email: string;
  onClose: () => void;
};

const RegisterConfirmationPopUp = ({
  email,
  onClose,
}: RegisterConfirmationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyEmail = async () => {
    setIsLoading(true);
    await verifyEmail(email);
    setIsLoading(false);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] rounded-[12px] border-[1px] bg-white p-8 text-center shadow-lg"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src={envelope_icon}
            alt="Envelope"
            className="w-[36px] h-auto object-contain"
          />

          <h3 className="text-[18px] sm:text-[28px] md:text-[32px] font-bold text-black leading-tight">
            Vérifiez votre boîte mail
          </h3>
        </div>

        {/* Message */}
        <p className="text-black text-[16px] sm:text-[18px] mb-4 leading-[1.6]">
          Un email de confirmation a été envoyé à{" "}
          <span className="font-semibold underline">{email}</span>.<br />
          Cliquez sur le lien pour activer votre compte et commencer votre
          expérience sur <strong>SMONI</strong>.
        </p>

        {/* Info spam */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src={attention_icon} alt="Attention" className="w-[18px]" />

          <span className="text-black text-[15px] font-normal">
            Pensez à vérifier vos spams si besoin.
          </span>
        </div>

        {/* Renvoyer lien */}
        <p className="text-black text-sm">
          Pas reçu le mail ?{" "}
          <button className="font-semibold underline hover:text-primary transition" onClick={handleVerifyEmail} disabled={isLoading}>
            {isLoading ? "Veuillez patienter..." : "Renvoyer le  lien"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterConfirmationPopUp;
