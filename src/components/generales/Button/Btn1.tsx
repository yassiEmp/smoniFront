import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Btn1 = ({ text, uri }: { text: string; uri?: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (uri) {
      navigate(uri);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 h-11 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 group w-full md:w-auto"
    >
      {text}
      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Button>
  );
};

export default Btn1;