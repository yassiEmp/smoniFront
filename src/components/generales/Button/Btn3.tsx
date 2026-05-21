import { BoutiqueCategory } from "@/api/boutique/types";
import { Check } from "lucide-react";

interface Btn3Props {
  item: BoutiqueCategory;
  active: number | null;
  setActive: (id: number) => void;
}

const Btn3 = ({ item, active, setActive }: Btn3Props) => {
  const isActive = active === item.id;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(item.id)}
      className={[
        "group relative inline-flex items-center gap-1.5",
        "min-h-[44px] px-4 sm:px-5 py-2.5",
        "rounded-full text-sm font-semibold whitespace-nowrap",
        "border transition-all duration-200 ease-out cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isActive
          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 scale-[1.02]"
          : "bg-white text-slate-700 border-slate-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0",
      ].join(" ")}
    >
      {isActive && <Check className="w-3.5 h-3.5 -ml-0.5" aria-hidden="true" />}
      <span>{item.label}</span>
    </button>
  );
};

export default Btn3;
