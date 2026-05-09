import { useEffect, useState } from "react";
import LocationPricingCard from '@/components/generales/Card/LocationPricingCard';
import Loader from "@/components/common/Loader";
import { fetchBoutiqueServices } from "@/api/boutique/services";
import { BoutiqueService } from "@/api/boutique/types";

const Autres = () => {
  const [services, setServices] = useState<BoutiqueService[]>([]);
  const [loading, setLoading] = useState(true);

  // On suppose que la catégorie "Autres" a l'id 5 (à ajuster si besoin)
  const AUTRES_CATEGORY_ID = 5;

  useEffect(() => {
    setLoading(true);
    fetchBoutiqueServices(AUTRES_CATEGORY_ID, "")
      .then(res => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    
      <section className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-white hover:scrollbar-thumb-gray-800 transition-all duration-300 ease-in-out  overflow-y-auto max-h-[500px] scrollbar-hide ">
        {loading ? (
          <Loader />
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Aucun service disponible.</div>
        ) : (
          services.map(service => (
            <LocationPricingCard key={service.id} item={service}  />
          ))
        )}
      </section>
    
  );
};

export default Autres;