import { ApointmentType } from '@/types/monitor/settings/configuration';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, AlarmClock, VenusAndMars, Venus, Mars, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { imageUrl } from '@/api';

interface DetailApointementsProps {
  appointment: ApointmentType;
  onClose: () => void;
}

const DetailApointements = ({ appointment, onClose }: DetailApointementsProps) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'notation':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      case 'confirmed':
        return 'Confirmé';
      case 'scheduled':
        return 'En attente';
      case 'notation':
        return 'À noter';
      case 'pending':
        return 'En cours';
      default:
        return status;
    }
  };

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`${isMobile ? 'h-[80vh] rounded-t-xl' : 'sm:max-w-[450px]'} p-0 bg-white border-none transition-transform duration-300 ease-in-out ${isClosing
            ? isMobile
              ? 'translate-y-full'
              : 'translate-x-full'
            : isMobile
              ? 'translate-y-0'
              : 'translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex flex-row justify-between pb-2 pt-6 px-6">
            <SheetTitle className="text-xl font-semibold">Détails du rendez-vous</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Informations de l'apprenant */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center gap-4">                  
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">
                    {`${appointment.learner.firstname} ${appointment.learner.lastname}`}
                  </h3>
                  <p className="text-gray-500 flex items-center gap-2">
                    <span>
                      <Mail className="w-4 h-4 text-gray-400" />
                    </span>
                    @{appointment.learner.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {appointment.learner.phone}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    {appointment.learner.genre === "homme" ? (
                      <Mars className="w-4 h-4 text-gray-600" />
                    ) : appointment.learner.genre === "femme" ? (
                      <Venus className="w-4 h-4 text-gray-600" />
                    ) : (
                      <VenusAndMars className="w-4 h-4 text-gray-600" />
                    )}
                    {appointment.learner.genre}
                  </p>
                </div>
                {appointment.learner.photo ? (
                  <img
                    src={`${imageUrl}${appointment.learner.photo}`}
                    alt={`${appointment.learner.firstname} ${appointment.learner.lastname}`}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full bg-gray-500 flex items-center justify-center text-4xl font-semibold text-white">
                    {`${appointment.learner.lastname?.charAt(0) ?? ''}${appointment.learner.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
              {/* Informations du rendez-vous */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Informations du rendez-vous</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlarmClock className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Heure</p>
                      <p className="font-medium">{`${appointment.start_time} - ${appointment.end_time}`}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Durée</p>
                      <p className="font-medium">{appointment.duration}h</p>
                    </div>
                  </div> */}
                  {/* <div className="flex items-center gap-2">
                    <Euro className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Prix</p>
                      <p className="font-medium">{appointment.price}€</p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Statut et présence */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Statut et présence</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Statut</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Présence moniteur</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${appointment.presence_monitor ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {appointment.presence_monitor ? 'Présent' : 'Absent'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Présence apprenant</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${appointment.presence_student ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {appointment.presence_student ? 'Présent' : 'Absent'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes et observations */}
              {/* <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Commentaire et observations</h4>
                <div className="rounded-lg">
                  {appointment.lesson_notes ? (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {typeof appointment.lesson_notes === 'string' 
                        ? appointment.lesson_notes 
                        : JSON.stringify(appointment.lesson_notes)}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Aucune note pour ce rendez-vous</p>
                  )}
                </div>
              </div> */}

              {/* Raison d'annulation */}
              {appointment.status === 'cancelled' && appointment.cancellation_reason && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Raison d'annulation</h4>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-700">{appointment.cancellation_reason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailApointements; 