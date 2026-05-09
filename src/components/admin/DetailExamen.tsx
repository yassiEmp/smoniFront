import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import type { ExamenType } from '@/pages/admin/Examen';
import { imageUrl } from '@/api';

interface DetailExamenProps {
  examen: ExamenType;
  onClose: () => void;
}

const DetailExamen: React.FC<DetailExamenProps> = ({ examen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  // On utilise la propriété datetime pour afficher la date et l'heure réelles
  let dateAffichee = examen.datetime;
  let heureAffichee = '';
  if (examen.datetime) {
    const d = new Date(examen.datetime.replace(' ', 'T'));
    if (!isNaN(d.getTime())) {
      dateAffichee = d.toLocaleDateString();
      heureAffichee = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  // Badge statut harmonisé
  const getStatutBadge = (statut: 'refused' | 'confirmed' | 'pending') => {
    switch (statut) {
      case 'confirmed':
        return <span className="px-4 py-1.5 rounded-full text-xs font-bold shadow-sm border bg-blue-100 text-blue-700 border-blue-200">Confirmé</span>;
      case 'pending':
        return <span className="px-4 py-1.5 rounded-full text-xs font-bold shadow-sm border bg-yellow-100 text-yellow-700 border-yellow-200">En attente</span>;
      case 'refused':
        return <span className="px-4 py-1.5 rounded-full text-xs font-bold shadow-sm border bg-red-100 text-red-700 border-red-200">Refusé</span>;
      default:
        return statut;
    }
  };


  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={`${isMobile ? 'h-[70vh] rounded-t-xl' : 'sm:max-w-[500px]'} p-0 bg-[#F5F5F5] border-none transition-transform duration-300 ease-in-out ${isClosing
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
              <SheetTitle className="text-[30px] font-bold">Gestion examen</SheetTitle>
            </SheetHeader>
          </div>
          <div className="px-[20px] py-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:gap-12 gap-4 bg-white rounded-xl shadow-sm p-4 border border-[#ECECEC]">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#6C61F6] text-sm uppercase tracking-wide">Date</span>
                  <span className="text-[#212121] text-base font-medium">{dateAffichee}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#6C61F6] text-sm uppercase tracking-wide">Heure</span>
                  <span className="text-[#212121] text-base font-medium">{heureAffichee}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#6C61F6] text-sm uppercase tracking-wide">Statut</span>
                  {getStatutBadge(examen.statut)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {/* Moniteur */}
              <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
                {examen.moniteur.photo ? (
                  <img
                    src={`${imageUrl}${examen.moniteur.photo}`}
                    alt={`${examen.moniteur.firstname} ${examen.moniteur.lastname}`}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-500 flex items-center justify-center text-3xl font-semibold text-white">
                    {`${examen.moniteur.lastname?.charAt(0) ?? ''}${examen.moniteur.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="font-semibold text-lg text-[#6C61F6]">{examen.moniteur.firstname} {examen.moniteur.lastname}</div>
                  <div className="text-xs text-gray-500 mt-1">{examen.moniteur.email}</div>
                  {examen.moniteur.phone && (
                    <div className="text-xs text-gray-500 mt-1">Téléphone : {examen.moniteur.phone}</div>
                  )}
                  {examen.moniteur.genre && (
                    <div className="text-xs text-gray-500 mt-1">Genre : {examen.moniteur.genre}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">Moniteur</div>
                </div>
              </div>

              {/* Apprenant */}
              <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
                {examen.apprenant.photo ? (
                  <img
                    src={`${imageUrl}${examen.apprenant.photo}`}
                    alt={`${examen.apprenant.firstname} ${examen.apprenant.lastname}`}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-500 flex items-center justify-center text-3xl font-semibold text-white">
                    {`${examen.apprenant.lastname?.charAt(0) ?? ''}${examen.apprenant.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="font-semibold text-lg text-[#F6C261]">{examen.apprenant.firstname} {examen.apprenant.lastname}</div>
                  <div className="text-xs text-gray-500 mt-1">{examen.apprenant.email}</div>
                  {examen.apprenant.phone && (
                    <div className="text-xs text-gray-500 mt-1">Téléphone : {examen.apprenant.phone}</div>
                  )}
                  {examen.apprenant.genre && (
                    <div className="text-xs text-gray-500 mt-1">Genre : {examen.apprenant.genre}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">Apprenant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailExamen; 