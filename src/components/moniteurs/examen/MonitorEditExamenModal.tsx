import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ExamenType } from '@/pages/moniteur/MonitorExamen';
import { imageUrl } from '@/api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { updateExamenStatus } from '@/api/monitor/examen';

interface MonitorEditExamenModalProps {
  examen: ExamenType;
  onClose: () => void;
  currentPage: number;
  perPage: number;
  onExamenUpdated: () => void;
}

const MonitorEditExamenModal: React.FC<MonitorEditExamenModalProps> = ({examen,onClose,currentPage,perPage,onExamenUpdated}) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingRefuse, setIsLoadingRefuse] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecte si on est sur mobile pour adapter l'affichage du modal
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Gère la fermeture avec animation comme les autres modales
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleStatus = async (status: 'confirmed' | 'refused') => {
    if (status === 'confirmed') setIsLoadingAccept(true);
    if (status === 'refused') setIsLoadingRefuse(true);
    const success = await updateExamenStatus(token,examen.id,status,dispatch,examen.moniteur.id,currentPage,perPage);
    if (status === 'confirmed') setIsLoadingAccept(false);
    if (status === 'refused') setIsLoadingRefuse(false);
    if (success) {
      // Notifier le composant parent que l'examen a été modifié
      onExamenUpdated();
      handleClose();
    }
  };

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={`${
          isMobile
            ? 'h-[70vh] rounded-t-xl'
            : 'sm:max-w-[500px]'
        } p-0 bg-[#F5F5F5] border-none transition-transform duration-300 ease-in-out ${
          isClosing
            ? isMobile
              ? 'translate-y-full'
              : 'translate-x-full'
            : isMobile
            ? 'translate-y-0'
            : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className={`flex flex-row justify-between border-b border-[#E0E0E0] pb-5 ${isMobile ? 'pt-[40px] px-[20px]' : 'pt-6 px-6'}`}>
            <SheetTitle className="text-[30px] font-semibold">Statut de l'examen</SheetTitle>
          </SheetHeader>

          <div className="flex-1 px-4 py-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Apprenant</h2>
              <div className="flex items-center gap-3">
                {examen.apprenant.photo ? (
                  <img
                    src={`${imageUrl}${examen.apprenant.photo}`}
                    alt={`${examen.apprenant.firstname} ${examen.apprenant.lastname}`}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gray-500 flex items-center justify-center text-xl font-semibold text-white">
                    {`${examen.apprenant.lastname?.charAt(0) ?? ''}${examen.apprenant.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
                <div>
                  <div className="font-semibold">
                    {examen.apprenant.firstname} {examen.apprenant.lastname}
                  </div>
                  <div className="text-xs text-gray-500">{examen.apprenant.email}</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Moniteur</h2>
              <div className="flex items-center gap-3">
                {examen.moniteur.photo ? (
                  <img
                    src={`${imageUrl}${examen.moniteur.photo}`}
                    alt={`${examen.moniteur.firstname} ${examen.moniteur.lastname}`}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gray-500 flex items-center justify-center text-xl font-semibold text-white">
                    {`${examen.moniteur.lastname?.charAt(0) ?? ''}${examen.moniteur.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
                <div>
                  <div className="font-semibold">
                    {examen.moniteur.firstname} {examen.moniteur.lastname}
                  </div>
                  <div className="text-xs text-gray-500">{examen.moniteur.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 pb-6">
            <button
              className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-[16px] text-[12px] font-semibold leading-[140%] text-[#FDFDFD] ${(isLoadingAccept || isLoadingRefuse) ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={() => handleStatus('confirmed')}
              disabled={isLoadingAccept || isLoadingRefuse}
            >
              {isLoadingAccept ? 'Enregistrement...' : 'Accepté'}
            </button>
            <button
              className={`w-full rounded-[6.22px] border-[0.39px] border-[#BCADFC] bg-[#D3C8FE] py-[16px] text-[12px] font-semibold leading-[140%] text-[#463BE2] ${(isLoadingRefuse || isLoadingAccept) ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={() => handleStatus('refused')}
              disabled={isLoadingRefuse || isLoadingAccept}
            >
              {isLoadingRefuse ? 'Enregistrement...' : 'Refusé'}
            </button>
            <button
              className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#EEEEEE] py-[16px] text-[12px] font-semibold leading-[140%] text-[#757575] ${(isLoadingRefuse || isLoadingAccept) ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoadingRefuse || isLoadingAccept}
              onClick={handleClose}
            >
              Fermer
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MonitorEditExamenModal;