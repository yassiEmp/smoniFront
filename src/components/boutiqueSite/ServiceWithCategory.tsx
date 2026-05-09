import LocationPricingCard from '@/components/generales/Card/LocationPricingCard';
import { BoutiqueService } from "@/api/boutique/types";

interface PermisDeConduireProps {
  services: BoutiqueService[];
  selectedType?: string;

}

const ServiceWithCategory = ({ services }: PermisDeConduireProps) => {
  return (
    <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-white hover:scrollbar-thumb-gray-800 transition-all duration-300 ease-in-out  overflow-y-auto max-h-[500px] scrollbar-hide ">
      {services.length === 0 ? (
        <div className="text-center text-gray-500 py-12">Aucun service disponible.</div>
      ) : (
        services.map(service => (
          <LocationPricingCard key={service.id} item={service} />
        ))
      )}
    </div>
  );
};


export default ServiceWithCategory;