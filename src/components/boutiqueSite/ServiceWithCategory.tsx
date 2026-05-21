import LocationPricingCard from '@/components/generales/Card/LocationPricingCard';
import { BoutiqueService } from "@/api/boutique/types";

interface PermisDeConduireProps {
  services: BoutiqueService[];
  selectedType?: string;

}

const ServiceWithCategory = ({ services }: PermisDeConduireProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
      {services.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-12">Aucun service disponible.</div>
      ) : (
        services.map(service => (
          <LocationPricingCard key={service.id} item={service} />
        ))
      )}
    </div>
  );
};


export default ServiceWithCategory;