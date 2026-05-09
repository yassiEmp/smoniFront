import { BoutiqueCategory } from "@/api/boutique/types";
import { Button } from "@/components/ui/button";

interface Btn3Props {
  item: BoutiqueCategory;
  active: number | null;
  setActive: (id: number) => void;
}

const Btn3 = ({ item, active, setActive }: Btn3Props) => {
  return (
    <Button
      onClick={() => setActive(item.id)}
      variant={active === item.id ? "default" : "ghost"}
      className={`rounded-lg transition-all duration-200 font-bold ${
        active === item.id
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {item.label}
    </Button>
  );
};

export default Btn3;
