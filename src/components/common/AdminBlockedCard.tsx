import { AlertTriangle, Shield, Mail, Phone, LogOut } from "lucide-react";
import SupportContactModal from "@/components/SupportContactModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AdminBlockedCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <>
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-red-200 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <Shield className="h-10 w-10 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-800">
              Compte Administrateur Bloqué
            </h2>
            <p className="font-medium text-red-600">
              Accès temporairement suspendu
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-red-500" />
            <div>
              <h3 className="mb-2 text-lg font-semibold text-red-800">
                Votre compte administrateur a été désactivé
              </h3>
              <p className="leading-relaxed text-red-700">
                En tant qu'administrateur, votre accès à la plateforme a été
                temporairement suspendu. Cette mesure peut être prise pour des
                raisons de sécurité ou de maintenance.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <h4 className="mb-3 text-lg font-semibold text-gray-800">
            Que faire maintenant ?
          </h4>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            <Mail className="h-5 w-5" />
            Contacter le support technique
          </button>
          <button
            onClick={handleLogout}
            className="flex  items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
          >
            <LogOut className="h-5 w-5" />
            Se déconnecter
          </button>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            <strong>Note importante :</strong> Seuls les super-administrateurs
            peuvent réactiver votre compte. Veuillez fournir votre identifiant
            administrateur lors de votre demande.
          </p>
        </div>
      </div>

      <SupportContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AdminBlockedCard;
