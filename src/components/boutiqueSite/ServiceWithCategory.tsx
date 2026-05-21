import PricingCardGrid from "@/components/boutiqueSite/PricingCardGrid";
import { BoutiqueService } from "@/api/boutique/types";

interface PermisDeConduireProps {
  services: BoutiqueService[];
  selectedType?: string;
}

const ServiceWithCategory = ({ services }: PermisDeConduireProps) => {
  return <PricingCardGrid services={services} />;
};

export default ServiceWithCategory;
