  
import { AlertCircle } from "lucide-react";
import SupportContactModal from "@/components/SupportContactModal";
import { useState } from "react";
const UserBlockedCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 border border-red-200">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <h3 className="text-lg font-semibold text-red-800">Compte temporairement bloqué</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Votre compte a été désactivé. Pour le réactiver, veuillez contacter notre équipe.
      </p>
      <button
       onClick={() => setIsModalOpen(true)}
       className="w-full bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors">
        Veuillez svp contacter le support
      </button>

    </div>
    <SupportContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </>
  );
};

export default UserBlockedCard;