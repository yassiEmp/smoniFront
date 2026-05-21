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
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 xl:px-32 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Section Header */}
      <motion.div className="text-center mb-10 sm:mb-12 space-y-4" variants={itemVariants}>
        <Badge
          variant="secondary"
          className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border-primary/20 rounded-full"
        >
          <CreditCard className="w-3 h-3 mr-1.5" />
          Tarifs publics
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
          Combien ça coûte. Tout. Au centime.
        </h2>
        <p className="text-slate-700 text-base sm:text-lg max-w-xl mx-auto">
          On affiche tout parce qu'on en a marre du « on en parle quand vous venez ». CPF, Permis 1€/jour, aide Région IDF, paiement 3×/4× — tout est possible.
        </p>
      </motion.div>

      {/* Category Tabs — wrapping chip strip with explicit affordance */}
      <motion.div className="flex flex-col items-center gap-3" variants={itemVariants}>
        {loadingCategories ? (
          <Loader />
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Choisissez votre formation
            </p>
            <div
              role="tablist"
              aria-label="Catégories de tarifs"
              className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
            >
              {categories.map((item) => (
                <Btn3 key={item.id} item={item} active={active} setActive={setActive} />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Transmission type selector — hidden for CPF/Autres where it doesn't apply */}
      {!loadingCategories && !isAutres && (
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          variants={itemVariants}
        >
          <Button
            onClick={() => setSelectedType("automatic")}
            variant={selectedType === "automatic" ? "default" : "outline"}
            aria-pressed={selectedType === "automatic"}
            className={`rounded-xl w-full sm:w-[180px] h-12 text-base font-semibold transition-all ${
              selectedType === "automatic"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Automatique
          </Button>
          <Button
            onClick={() => setSelectedType("manual")}
            variant={selectedType === "manual" ? "default" : "outline"}
            aria-pressed={selectedType === "manual"}
            className={`rounded-xl w-full sm:w-[180px] h-12 text-base font-semibold transition-all ${
              selectedType === "manual"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Manuel
          </Button>
        </motion.div>
      )}

      {/* Content — flows with the page, no inner scroll */}
      <div className="mx-auto w-full max-w-6xl mt-10 sm:mt-12">{renderContent()}</div>
    </motion.section>
  );
};

export default HomeTarifSection;
