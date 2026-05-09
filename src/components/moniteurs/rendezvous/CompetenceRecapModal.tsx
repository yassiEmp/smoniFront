import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from 'react';

interface CompetenceRecapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCompetences: { id: number; name: string; is_check?: boolean }[];
  isLoading: boolean;
}

const CompetenceRecapModal = ({ isOpen, onClose, onConfirm, selectedCompetences, isLoading }: CompetenceRecapModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"}
        className={`${isMobile ? 'h-[80vh] rounded-t-xl' : 'sm:max-w-[450px]'} p-0 bg-[#F5F5F5] border-none`}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex flex-row justify-between border-gray-200 pb-5 pt-6 px-6">
            <SheetTitle className="text-xl font-semibold">Récapitulatif des compétences</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-full p-6">
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Compétences sélectionnées ({selectedCompetences.length})
                </h3>
                <div className="h-[45vh] md:h-[60vh] scrollbar-hide overflow-y-auto">
                  {selectedCompetences.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">Aucune compétence sélectionnée</p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedCompetences.map((item) => (
                        <li
                          key={item.id}
                          className={`flex items-center p-3 rounded-lg border border-gray-200 ${item.is_check ? 'bg-gray-100 text-gray-400 opacity-60' : 'bg-white'}`}
                        >
                          <span className="text-sm" style={item.is_check ? { color: '#a3a3a3' } : {}}>{item.name}</span>
                          {item.is_check && (
                            <span className="ml-2 text-xs font-medium italic text-gray-400">(déjà donnée)</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={onClose}
                className="w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#EEEEEE] py-[16px] text-[12px] font-semibold leading-[140%] text-[#757575]"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-[16px] text-[12px] font-semibold leading-[140%] text-[#FDFDFD] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                {isLoading ? 'Enregistrement...' : 'Confirmer'}
                </button>
              </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompetenceRecapModal; 