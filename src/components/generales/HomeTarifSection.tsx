import { useEffect, useState } from "react";
import Btn3 from "./Button/Btn3";
import Autres from "@components/boutiqueSite/ServiceNoCatégorie";
import ServiceWithCategory from "@components/boutiqueSite/ServiceWithCategory";
import Loader from "@/components/common/Loader";
import { fetchBoutiqueCategories, fetchBoutiqueServices } from "@/api/boutique/services";
import { BoutiqueCategory, BoutiqueService } from "@/api/boutique/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const HomeTarifSection = () => {
  const [categories, setCategories] = useState<BoutiqueCategory[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [services, setServices] = useState<BoutiqueService[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("automatic");

  useEffect(() => {
    setLoadingCategories(true);
    fetchBoutiqueCategories()
      .then((res) => {
        setCategories(res.data);
        setActive(res.data.length > 0 ? res.data[0].id : null);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoadingCategories(false));
  }, []);

  const currentLabel = (categories.find((cat) => cat.id === active)?.label || "").toLowerCase().trim();

  // Only "Autres" and "CPF" are special (no type filter)
  const isAutres = currentLabel.includes("autres") || currentLabel.includes("cpf");

  useEffect(() => {
    if (active == null) {
      setServices([]);
      return;
    }
    const typeToUse = isAutres ? undefined : selectedType;
    setLoadingServices(true);
    fetchBoutiqueServices(active, typeToUse)
      .then((res) => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoadingServices(false));
  }, [active, selectedType, categories, isAutres]);

  const renderContent = () => {
    if (loadingServices) return <Loader />;
    const currentCat = categories.find((cat) => cat.id === active);
    const label = currentCat?.label.toLowerCase() || "";
    if (label.includes("classique")) return <ServiceWithCategory services={services} selectedType={selectedType} />;
    if (label.includes("cs")) return <ServiceWithCategory services={services} selectedType={selectedType} />;
    if (label.includes("aac")) return <ServiceWithCategory services={services} selectedType={selectedType} />;
    if (label.includes("location")) return <ServiceWithCategory services={services} selectedType={selectedType} />;
    if (label.includes("passerelle")) return <ServiceWithCategory services={services} selectedType={selectedType} />;
    if (label.includes("post-permis")) return <ServiceWithCategory services={services} selectedType={selectedType} />;
    if (label.includes("professionnels")) return <ServiceWithCategory services={services} selectedType={selectedType} />;
    if (isAutres) return <Autres />;
    // Default: show services with category layout
    return <ServiceWithCategory services={services} selectedType={selectedType} />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      className="py-20 md:py-28 px-6 md:px-10 xl:px-32 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Section Header */}
      <motion.div className="text-center mb-12 space-y-4" variants={itemVariants}>
        <Badge
          variant="secondary"
          className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border-primary/20 rounded-full"
        >
          <CreditCard className="w-3 h-3 mr-1.5" />
          Tarification
        </Badge>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
          Tarification flexible
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Des offres adaptées à vos besoins et votre budget.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div className="flex justify-center px-2" variants={itemVariants}>
        {loadingCategories ? (
          <Loader />
        ) : (
          <div className="flex w-full flex-col justify-center gap-1.5 rounded-xl bg-muted/80 p-1.5 shadow-sm border border-border/50 md:w-auto md:flex-row">
            {categories.map((item) => (
              <Btn3 key={item.id} item={item} active={active} setActive={setActive} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Type selector - always visible */}
      {!loadingCategories && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => setSelectedType("automatic")}
              variant={selectedType === "automatic" ? "default" : "outline"}
              className={`rounded-xl w-[180px] h-12 text-base font-semibold transition-all ${selectedType === "automatic"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border-border text-muted-foreground hover:text-foreground"
                }`}
            >
              Automatique
            </Button>
            <Button
              onClick={() => setSelectedType("manual")}
              variant={selectedType === "manual" ? "default" : "outline"}
              className={`rounded-xl w-[180px] h-12 text-base font-semibold transition-all ${selectedType === "manual"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border-border text-muted-foreground hover:text-foreground"
                }`}
            >
              Manuel
            </Button>
          </div>
      )}

      {/* Content */}
      <div className="mx-auto w-full max-w-5xl overflow-y-auto">
        <div className="py-12">{renderContent()}</div>
      </div>
    </motion.section>
  );
};

export default HomeTarifSection;
