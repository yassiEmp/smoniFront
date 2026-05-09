import { useEffect, useState } from "react";
import PermisDeConduire from "@components/learners/Boutique/PermisDeConduire";
import LocationVehicule from "@components/learners/Boutique/LocationVehicule";
import PermisSuperVise from "@components/learners/Boutique/PermisSuperVise";
import PermisBAAC from "@components/learners/Boutique/PermisBAAC";
import Autres from "@components/learners/Boutique/Autres";
import homme from '@assets/apprenants/dashboard/vehicle.svg';
import ProtectedLayout from "@/components/common/ProtectedLayout";

import Loader from "@/components/common/Loader";
import { fetchBoutiqueCategories, fetchBoutiqueServices } from "@/api/boutique/services";
import { BoutiqueCategory, BoutiqueService } from "@/api/boutique/types";

import Payment from '@/components/payment/Payment';
import ModalQuestionTest from "@/components/learners/ModalQuestionTest";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

export default function Boutique() {
  const [categories, setCategories] = useState<BoutiqueCategory[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [services, setServices] = useState<BoutiqueService[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("automatic");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const testPassed = useSelector(
    (state: RootState) => state.authReducer.test_passed,
  );
  // Charger les catégories au montage
  useEffect(() => {
    setLoadingCategories(true);
    fetchBoutiqueCategories()
      .then(res => {
        setCategories(res.data);
        setActive(res.data.length > 0 ? res.data[0].id : null);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoadingCategories(false));
  }, []);

  // Catégorie active est "Autres" ?
  // Catégorie active est une catégorie "spéciale" (sans distinction de type Auto/Manuel)
  const currentCategoryLabel = (categories.find(cat => cat.id === active)?.label || "").toLowerCase().trim();
  
  // Only "Autres" and "CPF" are special (no Auto/Manuel toggle)
  const isSpecialCategory = currentCategoryLabel.includes("autres") || 
                           currentCategoryLabel.includes("cpf");

  const isAutres = isSpecialCategory;




  // const stripePromise = loadStripe("pk_test_51RUvRhGbsC65gFDU4iEAKHN4KU4y0T8fLeNT1bD86a2IzyM9tt6eFlC2Ph2UMABLITebygVO5UIbhbkhQVVGLCN700Qy33u2WS");
  // // Charger les services à chaque changement de catégorie ou type
 useEffect(() => {
    if (active == null) {
    setServices([]);
     return;
   }
    // Pour "Autres", ne pas passer de type (ni "manual" ni "automatique")
    const typeToUse = isAutres ? undefined : selectedType;
    setLoadingServices(true);
    fetchBoutiqueServices(active, typeToUse)
      .then(res => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoadingServices(false));
  }, [active, selectedType, categories, isAutres]);

  const handleBuy = (amount: number, serviceId: number) => {
    setPaymentAmount(amount);
    setSelectedServiceId(serviceId);
    setShowPayment(true);
  };

  // Rendu conditionnel selon la catégorie sélectionnée
  const renderContent = () => {
    if (loadingServices) return <Loader />;
    const currentCat = categories.find(cat => cat.id === active);
    // if (!services.length) return <div className="text-center text-gray-500 py-12">Aucun service disponible pour cette catégorie.</div>;
    if (currentCat?.label.toLowerCase().includes("classique")) return <PermisDeConduire services={services} selectedType={selectedType} onBuy={handleBuy} />;
    if (currentCat?.label.toLowerCase().includes("cs")) return <PermisSuperVise services={services} selectedType={selectedType} onBuy={handleBuy} />;
    if (currentCat?.label.toLowerCase().includes("aac")) return <PermisBAAC services={services} selectedType={selectedType} onBuy={handleBuy} />;
    if (currentCat?.label.toLowerCase().includes("location")) return <LocationVehicule services={services} selectedType={selectedType} onBuy={handleBuy} />;
    if (currentCat?.label.toLowerCase().includes("passerelle")) return <PermisDeConduire services={services} selectedType={selectedType} onBuy={handleBuy} />;
    if (currentCat?.label.toLowerCase().includes("post-permis")) return <PermisDeConduire services={services} selectedType={selectedType} onBuy={handleBuy} />;
    if (currentCat?.label.toLowerCase().includes("professionnels")) return <PermisDeConduire services={services} selectedType={selectedType} onBuy={handleBuy} />;
    if (isAutres) return <Autres onBuy={handleBuy} />;
    // Default catch-all for other categories
    return <PermisDeConduire services={services} selectedType={selectedType} onBuy={handleBuy} />;
  };

  return (
     <ProtectedLayout>
    <section className="min-h-screen flex flex-col bg-gray-100 justify-center items-start pt-16 pb-8 w-full">
    {!testPassed ? <ModalQuestionTest onTestComplete={() => {}} /> : null}
     <div className="  px-2 lg:px-8 pt-6  gap-6 max-w-[1300px]  xl:mx-auto w-full">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Trouve le forfait qui te correspond</h2>
        <p className="text-[#616161] mb-6 text-[13px] font-semibold">
          Achète ou renouvelle tes heures de conduite, et découvre les services utiles pour t'accompagner jusqu'au permis.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-gray-50 p-3 lg:p-6 w-full max-w-md md:max-w-xs rounded">
          <h2 className="hidden md:block text-lg font-semibold mb-4">Filtrer les offres</h2>
          {loadingCategories ? (
            <Loader />
          ) : ( 
            <div className="space-y-3 md:space-y-3 md:flex-col flex md:block overflow-x-auto md:overflow-visible gap-2 md:gap-0 py-2 whitespace-nowrap md:whitespace-normal flex-shrink-0">
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`w-full text-left flex items-center px-3 pt-2 lg:px-4 lg:py-3 rounded-md transition-all duration-200 text-[13px] font-semibold
                    ${active === item.id
                      ? 'bg-black text-white '
                      : 'bg-gray-200 text-gray-700'}
                  `} 
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Boutons de sélection automatique / manuel - always visible */}
        {active !== null && (
          <div className="flex flex-col">
              <div className="flex justify-center md:justify-start mb-4 relative ">
                <div className="absolute flex items-center gap-4 py-2 bg-white rounded-full px-2">
                 <button
                 onClick={() => setSelectedType("automatic")}
                   className={`flex items-center px-6 justify-center py-1 rounded-full border text-[14px] font-semibold transition 
                     ${selectedType === "automatic"
                       ? "bg-indigo-100 text-[#6c61f6] ring-2 ring-indigo-400 ring-offset-2"
                       : "bg-[#FAFAFA] text-[#757575]"}
                   `}
                   
                 >
                   <img className='w-[20px] h-[20px] mr-2' src={homme} alt="homme" />Automatique
                 </button>
                 <button
                   onClick={() => setSelectedType("manual")}
                   className={`flex items-center px-6 justify-center  py-1 rounded-full border text-[14px] font-semibold transition 
                     ${selectedType === "manual"
                       ? "bg-indigo-100 text-[#6c61f6] ring-2 ring-indigo-400 ring-offset-2"
                       : "bg-[#FAFAFA] text-[#757575]"}
                   `}
                   
                 >
                   <img className='w-[20px] h-[20px] mr-2' src={homme} alt="homme" />Manuel
                 </button>
                </div>
              </div>
          </div>
        )}

        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
      {showPayment && paymentAmount && selectedServiceId && (
        <Payment amount={paymentAmount} serviceId={selectedServiceId} onClose={() => setShowPayment(false)} />
      )}
      </div>
    </section>
    </ProtectedLayout>
  );
}
