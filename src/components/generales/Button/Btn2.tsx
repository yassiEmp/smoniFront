import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const Btn2 = ({ text, uri }: { text: string; uri?: string }) => {
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
      variant="outline"
      className="border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 rounded-full px-6 h-11 text-sm font-semibold transition-all w-full md:w-auto"
    >
      {text}
    </Button>
  );
};

export default Btn2;