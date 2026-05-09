import { CarTaxiFront, Mars, Phone, Venus, VenusAndMars, } from "lucide-react";
import Type from "@assets/dashboard-moniteur/type.png";
import Leçonicon from "@assets/dashboard-moniteur/Leçon.png";
import Suivant from "@assets/dashboard-moniteur/Suivant.png";
import Commentaireicon from "@assets/dashboard-moniteur/Commentaire.png";
// import Livreticon from "@assets/dashboard-moniteur/Livret.png";
// import Paramètres from "@assets/dashboard-moniteur/Paramètres.png";
import { useState, useEffect } from "react";
import Leçon from "@components/moniteurs/profilapprenant/Leçon";
import Commentaire from "./profilapprenant/Commentaire";
// import Livret from "./profilapprenant/Livret";
import { LearnerType } from "@/types/monitor/settings/configuration";
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { imageUrl } from "@/api";

interface ProfilProps {
  nom: string;
  profil: string | null;
  onClose: () => void;
  learner: LearnerType;
  total_duration: number;
  status: boolean;
}

const ProfilApprenant = ({
  nom,
  profil,
  onClose,
  learner,
  total_duration,
  status,
}: ProfilProps) => {
  const [section, setSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  // const [livretState, setLivretState] = useState<"main" | "competence" | "sousCompetence">("main");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`${isMobile ? 'h-[90vh] rounded-t-xl' : 'sm:max-w-[500px]'} p-0 bg-[#F5F5F5] border-none transition-transform duration-300 ease-in-out ${isClosing
            ? isMobile
              ? 'translate-y-full'
              : 'translate-x-full'
            : isMobile
              ? 'translate-y-0'
              : 'translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 rounded-t-lg bg-[#F5F5F5]">
            <SheetHeader className="flex flex-row justify-between border-b border-[#E0E0E0] pb-5 pt-[40px] px-[20px]">
              <div className="space-y-[16px]">
                <div className="flex items-center gap-1">
                  <SheetTitle className="text-[36px] font-bold">{nom}</SheetTitle>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    {learner.genre === "homme" ? <Mars className="w-5 h-5 text-[#212121]" /> : learner.genre === "femme" ? <Venus className="w-5 h-5 text-[#212121]" /> : <VenusAndMars className="w-5 h-5 text-[#212121]" />}
                  </span>
                  <p className="text-[14px] font-medium text-[#212121]">
                    {learner.genre || "Genre non renseigné"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    <Phone className="w-4 h-4 text-[#212121]" />
                  </span>
                  <p className="text-[14px] font-medium text-[#212121]">
                    {learner.phone || "Téléphone non renseigné"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    <CarTaxiFront className="w-5 h-5 text-[#212121]" />
                  </span>
                  <p className="text-[14px] font-medium text-[#212121]">
                    {total_duration}h de conduite
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                {learner.photo ? (
                  <img
                    src={`${imageUrl}${learner.photo}`}
                    alt={`${learner.firstname} ${learner.lastname}`}
                    className="h-40 w-40 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-40 w-40 rounded-full bg-gray-500 flex items-center justify-center text-5xl font-semibold text-white">
                    {`${learner.lastname?.charAt(0) ?? ''}${learner.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
              </div>
            </SheetHeader>
          </div>

          <div className="px-[20px]">
            {section === null && (
              <div className="space-y-6 py-6">
                {/* <div className="space-y-2">
                  <h2 className="text-[14px] pt-2 font-medium text-[#616161]">
                    Type de boite
                  </h2>
                  <div className="h-[47.40px] rounded-[82.5px] bg-white p-[6.6px]">
                    <div className="flex h-[33px] max-w-[142.72px] items-center justify-center gap-[8.25px] rounded-[82.5px] border-[1.65px] border-[#6C61F6] bg-[#D3C8FE]">
                      <img src={Type} alt="" />
                      <p className="text-[13px] font-medium text-[#6C61F6]">
                        {status ? "Prêt pour l'examen" : "En préparation"}
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* Contenue changeable */}
                <div className="space-y-2">
                  <div
                    className="flex cursor-pointer items-center justify-between border-b-[0.5px] border-[#BDBDBD] px-2 py-[12px]"
                    onClick={() => setSection("leçon")}
                  >
                    <div className="flex items-center gap-[10px]">
                      <img src={Leçonicon} alt="" />
                      <p>Toutes les leçons</p>
                    </div>
                    <img src={Suivant} alt="" />
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between border-b-[0.5px] border-[#BDBDBD] px-2 py-[12px]"
                    onClick={() => setSection("commentaire")}
                  >
                    <div className="flex items-center gap-[10px]">
                      <img src={Commentaireicon} alt="" />
                      <p>Commentaires pédagogiques</p>
                    </div>
                    <img src={Suivant} alt="" />
                  </div>
                  {/* <div
                    className="flex cursor-pointer items-center justify-between border-b-[0.5px] border-[#BDBDBD] px-2 py-[12px]"
                    onClick={() => setSection("livret")}
                  >
                    <div className="flex items-center gap-[10px]">
                      <img src={Livreticon} alt="" />
                      <p>Livret d'apprentissage</p>
                    </div>
                    <img src={Suivant} alt="" />
                  </div> */}
                  {/* <div className="flex cursor-pointer items-center justify-between border-b-[0.5px] border-[#BDBDBD] px-2 py-[12px]">
                    <div className="flex items-center gap-[10px]">
                      <img src={Paramètres} alt="" />
                      <p>Détails de la formation</p>
                    </div>
                    <img src={Suivant} alt="" />
                  </div> */}
                </div>
                {/* <div>
                  <p className="text-[14px] font-medium text-[#616161]">
                    Informations supplémentaires
                  </p>
                </div> */}
              </div>
            )}

            {section === "leçon" && <Leçon learnerId={learner.id} onBack={() => setSection(null)} />}
            {section === "commentaire" && <Commentaire learnerId={learner.id} onBack={() => setSection(null)} />}
            {/* {section === "livret" && (
              <Livret
                livretState={livretState}
                setLivretState={setLivretState}
                onBack={() => {
                  if (livretState === "sousCompetence") {
                    setLivretState("competence");
                  } else if (livretState === "competence") {
                    setLivretState("main");
                  } else {
                    setSection(null);
                  }
                }}
                learnerId={learner.id}
              />
            )} */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfilApprenant;