import LocationPricingCardTwo from '@/components/generales/Card/LocationPricingCardTwo';
import { BoutiqueService } from "@/api/boutique/types";

interface PermisBAACProps {
  services: BoutiqueService[];
  selectedType?: string;
  onBuy: (amount: number, serviceId: number) => void;
}

const PermisBAAC = ({ services, onBuy }: PermisBAACProps) => {
  return (
    <div className="flex flex-col pt-16">
     
      <section className="overflow-y-auto max-h-[500px] scrollbar-hide space-y-5">
        {services.length === 0 ? (
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

export default PermisBAAC;