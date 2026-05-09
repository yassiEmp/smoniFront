import { useEffect, useState } from "react";
import LocationPricingCardTwo from '@/components/generales/Card/LocationPricingCardTwo';
import Loader from "@/components/common/Loader";
import { fetchBoutiqueServices } from "@/api/boutique/services";
import { BoutiqueService } from "@/api/boutique/types";

const Autres = ({ onBuy }: { onBuy: (amount: number, serviceId: number) => void }) => {
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
    <div className="flex flex-col">
      <section className="overflow-y-auto max-h-[500px] scrollbar-hide space-y-5 ">
        {loading ? (
          <Loader />
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Aucun service disponible.</div>
        ) : (
          services.map(service => (
            <LocationPricingCardTwo key={service.id} item={service} onBuy={onBuy} />
          ))
        )}
      </section>
    </div>
  );
};

export default Autres;