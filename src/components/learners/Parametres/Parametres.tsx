import { useState } from "react";
import { ChevronRight, User, Lock, FileText, CreditCard, Folder, LogOut } from 'lucide-react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "@/store/slices/authSlice";
import InfoPerso from "./InfoPerso";
import Password from "./Password";
import Contrat from "./Contrat";
import MonAbonnement from "./MonAbonnement";
import DocumentsAdmin from "./DocumentsAdmin";

const categories = [
  { id: 'Informations personnelles', label: 'Informations personnelles', icon: User },
  { id: 'Documents administratifs', label: 'Documents administratifs', icon: Folder },
  { id: 'Mot de passe', label: 'Mot de passe', icon: Lock },
  { id: 'Contrat', label: 'Contrat', icon: FileText },
  { id: 'Mon abonnement', label: 'Mon abonnement', icon: CreditCard },
];

export default function Parametres() {
  const [active, setActive] = useState<string | null>('Informations personnelles');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fonction de rendu conditionnel
  const renderContent = () => {
    switch (active) {
      case 'Informations personnelles':
        return <InfoPerso onBack={() => setActive(null)} />;
      case 'Documents administratifs':
        return <DocumentsAdmin onBack={() => setActive(null)} />;
      case 'Mot de passe':
        return <Password onBack={() => setActive(null)} />;
      case 'Contrat':
        return <Contrat onBack={() => setActive(null)} />;
      case 'Mon abonnement':
        return <MonAbonnement onBack={() => setActive(null)} />;
      default:
        return null;
    }
  };

  // Vue mobile - navigation en stack
  const MobileView = () => {
    if (active) {
      return renderContent();
    }

    return (
      <div className=" px-4 flex flex-col bg-gray-100 justify-center items-start pt-16 pb-8 w-full">
        <div className="pt-8 pb-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Gère ici tes informations, ta sécurité et tes préférences personnelles.
          </p>
        </div>

        <div className="px-6">
          {categories.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setActive(item.id)}
                  className="w-full py-4 flex items-center justify-between px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 pr-16">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                {index < categories.length - 1 && (
                  <hr className="border-gray-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bouton déconnexion en bas */}
        <div className="fixed bottom-20 left-0 right-0 p-6 bg-white  border-gray-200">
          <button
            className="w-full py-4 flex items-center justify-center gap-3 bg-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              localStorage.clear();
              dispatch(logout());
              navigate("/connexion");
            }}
          >
            <span className="text-sm font-medium text-gray-900">Me déconnecter</span>
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Espace pour éviter que le contenu soit caché par le bouton fixe */}
        <div className="h-20"></div>
      </div>
    );
  };


  // Vue desktop - layout original
  const DesktopView = () => (
    <section className=" min-h-screen px-16 pt-16 pb-8  bg-white">
      <div className=" items-start px-2 lg:px-8 pt-6  gap-6 max-w-[1500px]  xl:mx-auto w-full">
      <div className="  pt-8 pb-2"> 
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Paramètres</h2>
        <p className="text-[#616161] mb-6 text-[13px] font-semibold">
          Gère ici tes informations, ta sécurité et tes préférences personnelles.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-gray-50 p-6 w-full max-w-xs rounded">
          <div className="flex flex-col justify-between h-full md:h-[500px]">
            <div className="space-y-3">
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 text-[13px] font-semibold
                    ${active === item.id
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-700'}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex pt-4 md:pt-0 items-center justify-center">
              <button
                className="flex items-center justify-center gap-2 bg-gray-200 w-full text-left px-4 py-3 rounded-md transition-all duration-200 text-[13px] font-semibold"
                onClick={() => {
                  localStorage.clear();
                  dispatch(logout());
                  navigate("/connexion");
                }}
              >
                Me déconnecter <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
    </section>
  );

  return (
    <>
      {/* Vue mobile */}
      <div className="block lg:hidden ">
        <MobileView />
      </div>
      
      {/* Vue desktop */}
      <div className="hidden lg:block">
        <DesktopView />
      </div>
    </>
  );
}