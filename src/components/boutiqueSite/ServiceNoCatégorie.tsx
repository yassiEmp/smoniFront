import { useEffect, useState } from "react";
import PricingCardGrid from "@/components/boutiqueSite/PricingCardGrid";
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
      .then((res) => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  return <PricingCardGrid services={services} />;
};

export default Autres;
