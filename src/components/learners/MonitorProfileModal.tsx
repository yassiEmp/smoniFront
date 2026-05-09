import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CheckCircle, Circle } from 'lucide-react';
import colabo from '@assets/apprenants/dashboard/colabo.png';
import Vector from '@assets/apprenants/dashboard/Vector.png';
import cardtype from '@assets/apprenants/dashboard/vehicle_icon.svg';
import clock from '@assets/apprenants/dashboard/clock.png';
import Popupconfirmrdv from './Popupconfirmrdv';
import L from 'leaflet';
import { imageUrl } from '@/api';

interface Instructor {
  id: number;
  firstname: string;
  lastname: string;
  photo?: string;
  satisfaction?: number;
  votes?: number;
  meetingPoints?: any[];
  created_at: string;
}

interface MonitorProfileModalProps {
  instructor: Instructor;
  availabilities: any[];
  onClose: () => void;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MonitorProfileModal = ({ instructor, availabilities, onClose }: MonitorProfileModalProps) => {
  const [showPopupconfirm, setshowPopupconfirm] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  console.log(availabilities)

  const toggleSlot = (id: number): void => {
    setSelected((prev: number[]) => {
      const updated = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      return updated;
    });
  };

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
      setSelected([]);
    }, 300);
  };

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={`${isMobile ? 'h-[90vh] rounded-t-xl' : 'sm:max-w-[500px]'} p-0 bg-[#f5f5f5] border-none transition-transform duration-300 ease-in-out ${isClosing
          ? isMobile
            ? 'translate-y-full'
            : 'translate-x-full'
          : isMobile
            ? 'translate-y-0'
            : 'translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 rounded-t-lg bg-[#f5f5f5]">
            <SheetHeader className="flex flex-row justify-between border-b border-[#E0E0E0] pb-5 px-[20px]">
              <SheetTitle className="text-[20px] font-bold mt-2">Profil du moniteur</SheetTitle>
            </SheetHeader>
          </div>
          <div className="px-[20px] pb-6 overflow-y-auto scrollbar-hide">
            <div className="flex items-center gap-6 pt-4 mb-4 flex-col md:flex-row">
              <div className="flex flex-col items-center md:items-start md:flex-1 space-y-3 order-2 md:order-1">
                <h2 className="text-2xl font-bold text-center md:text-left">
                  {instructor.firstname} {instructor.lastname}
                </h2>
                <p className="text-[14px] font-semibold text[#212121] flex">
                  <img className='w-[16px] h-[16px] mr-2' src={colabo} alt="" />
                  Collaborateur Smoni depuis&nbsp;
                  {(() => {
                    if (!instructor.created_at) return "date inconnue";
                    const created = new Date(instructor.created_at);
                    const now = new Date();
                    let years = now.getFullYear() - created.getFullYear();
                    let months = now.getMonth() - created.getMonth();
                    if (months < 0) {
                      years--;
                      months += 12;
                    }
                    let result = "";
                    if (years > 0) result += `${years} an${years > 1 ? "s" : ""} `;
                    if (months > 0) result += `${months} mois`;
                    if (!result) result = "moins 1 mois";
                    return result.trim();
                  })()}
                </p>
                {typeof instructor.satisfaction === 'number' && (
                  <p className="text-[14px] font-semibold text[#212121] flex"><img className='w-[16px] h-[16px] mr-2' src={Vector} alt="" />{instructor.satisfaction}% de satisfaction ({instructor.votes || 0} avis)</p>
                )}
              </div>
              <div className="order-1 md:order-2">
                {instructor.photo ? (
                  <img
                    src={`${imageUrl}${instructor.photo}`}
                    alt={`${instructor.firstname} ${instructor.lastname}`}
                    className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-gray-500 flex items-center justify-center text-3xl md:text-5xl font-semibold text-white">
                    {`${instructor.lastname?.charAt(0) ?? ''}${instructor.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
              </div>
            </div>
            <div className='flex mb-4'>
              <img src={cardtype} alt="" />
              <div>
                {availabilities?.[0]?.vehicle ? (
                  <>
                    <p className='font-semibold'>
                      {availabilities[0].vehicle.brand + ' ' + availabilities[0].vehicle.model + ' ' + availabilities[0].vehicle.year}
                    </p>
                    <p className='text-[14px] text-[#757575]'>
                      {availabilities[0].vehicle.plate_number ?? 'AA-123-AA'}
                    </p>
                  </>
                ) : (
                  <p className='text-[14px] text-[#757575]'>Aucun véhicule renseigné</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#616161] mb-2 text-[14px]">Prochaines disponibilités</h3>
              <div className="max-w-md mx-auto p-4">
                {availabilities && availabilities.length > 0 ? (
                  availabilities.map((slot, idx) => {
                    let formattedDate = '';
                    if (slot.date) {
                      try {
                        const dateObj = new Date(slot.date);
                        formattedDate = dateObj.toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        });
                        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
                      } catch {
                        formattedDate = slot.date;
                      }
                    }
                    return (
                      <div
                        key={slot.id || idx}
                        className="flex items-center justify-between border-b py-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSlot(slot.id)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={clock}
                            alt="clock"
                            className="w-10 h-10"
                          />
                          <div>
                            <p className="font-semibold">{formattedDate}</p>
                            <p className="text-gray-500 text-sm">{slot.start_time} - {slot.end_time}</p>
                            <p className="font-gray-500 text-sm">{slot.meeting_point.label}</p>
                          </div>
                        </div>
                        <div>
                          {selected.includes(slot.id) ? (
                            <CheckCircle className="text-[#6c61f6] w-6 h-6" />
                          ) : (
                            <Circle className="text-indigo-500 w-6 h-6" />
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-500">Aucune disponibilité</div>
                )}
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <button
                onClick={() => setshowPopupconfirm(true)}
                type='submit'
                disabled={selected.length === 0}
                className={`mt-4 px-4 py-3 rounded-full font-semibold transition-colors duration-200 w-full max-w-[450px]
                  ${selected.length === 0 ? 'bg-[#9e9e9e] cursor-not-allowed text-[#757575]' : 'bg-[#6c61f6] hover:bg-indigo-700 text-white'}
                `}
              >
                Prendre un rdv →
              </button>
            </div>
          </div>
        </div>
        {showPopupconfirm && (
          <Popupconfirmrdv 
            instructor={instructor}
            onClose={() => setshowPopupconfirm(false)}
            selectedSlots={availabilities.filter(slot => selected.includes(slot.id))}
            handleClose={handleClose}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MonitorProfileModal;