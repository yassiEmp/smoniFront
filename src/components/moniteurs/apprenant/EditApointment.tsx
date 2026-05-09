import { ApointmentType } from '@/types/monitor/settings/configuration';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { postConfirmApointment, postCancelApointment, postPresenceApointment, postAbsenceApointment, postFinishApointment } from '@/api/monitor/rendezvous';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { getLearnerProgress, postLearnerCompetences } from '@/api/monitor/apprenants';
import { ModuleType, CompetenceType } from '@/types/monitor/settings/configuration';
import { Mars, Venus, VenusAndMars, Phone } from 'lucide-react';
import Loader from '@/components/common/Loader';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CompetenceRecapModal from '@/components/moniteurs/rendezvous/CompetenceRecapModal';
import { imageUrl } from '@/api';

interface EditApointmentProps {
  appointment: ApointmentType;
  onClose: () => void;
  currentPage: number;
  perPage: number;
  onAppointmentUpdated: () => void;
}

const EditApointment = ({ appointment, onClose, currentPage, perPage, onAppointmentUpdated }: EditApointmentProps) => {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPresence, setIsLoadingPresence] = useState(false);
  const [isLoadingAbsence, setIsLoadingAbsence] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showReasonField, setShowReasonField] = useState(false);
  const [reasonType, setReasonType] = useState<'cancel' | 'absence' | null>(null);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [checkedCompetences, setCheckedCompetences] = useState<{ [id: number]: boolean }>({});
  const [livretState, setLivretState] = useState<'main' | 'competence' | 'sousCompetence'>('main');
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [selectedSubModule, setSelectedSubModule] = useState<any>(null);
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.authReducer);

  const { dateStatus, today, threeDaysAfter } = useMemo(() => {
    const today = new Date();
    const appointmentDate = new Date(appointment.date);
    const threeDaysAfter = new Date(appointmentDate);
    threeDaysAfter.setDate(appointmentDate.getDate() + 3);

    let status: 'today' | 'past' | 'future';
    if (today.toDateString() === appointmentDate.toDateString()) {
      status = 'today';
    } else if (today > appointmentDate) {
      status = 'past';
    } else {
      status = 'future';
    }
    return { dateStatus: status, today, threeDaysAfter };
  }, [appointment.date]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (appointment.status === 'notation') {
      const fetchModules = async () => {
        setIsLoadingModules(true);
        try {
          const res = await getLearnerProgress(appointment.learner.id, token, dispatch);

          if (res && res.data) {
            setModules(res.data);
            const checked: { [id: number]: boolean } = {};
            res.data.forEach((mod: ModuleType) => {
              mod.subModule.forEach(sub => {
                sub.competence.forEach((comp: CompetenceType) => {
                  if (comp.is_check) checked[comp.id] = true;
                });
              });
            });
            setCheckedCompetences(checked);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des compétences', error);
        } finally {
          setIsLoadingModules(false);
        }
      };
      fetchModules();
    }
  }, [appointment.status, appointment.learner.id, token, dispatch]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleAction = async (action: string) => {
    if (action === 'presence') {
      setIsLoadingPresence(true);
    } else if (action === 'absence') {
      setIsLoadingAbsence(true);
    } else if (action === 'confirm') {
      setIsLoadingConfirm(true);
    } else if (action === 'cancel') {
      setIsLoadingCancel(true);
    } else {
      setIsLoading(true);
    }

    try {
      let success = false;

      switch (action) {
        case 'confirm':
          success = await postConfirmApointment(token, appointment.id.toString(), dispatch, currentPage, perPage);
          break;
        case 'cancel':
          if (!reason) {
            toast.error('Veuillez indiquer une raison pour l\'annulation');
            setIsLoadingCancel(false);
            return;
          }
          success = await postCancelApointment(token, reason, appointment.id.toString(), dispatch, currentPage, perPage);
          break;
        case 'presence':
          success = await postPresenceApointment(token, appointment.id.toString(), dispatch, currentPage, perPage);
          break;
        case 'absence':
          if (!reason) {
            toast.error('Veuillez indiquer une raison pour l\'absence');
            setIsLoadingAbsence(false);
            return;
          }
          success = await postAbsenceApointment(token, reason, appointment.id.toString(), dispatch, currentPage, perPage);
          break;
        case 'finish':
          success = await postFinishApointment(token, appointment.id.toString(), dispatch, currentPage, perPage);
          break;
      }

      if (success) {
        // Notifier le composant parent que le rendez-vous a été modifié
        onAppointmentUpdated();
        handleClose();
      }
    } catch (error) {
      console.error('Erreur lors de l\'action:', error);
      toast.error('Une erreur est survenue');
    } finally {
      if (action === 'presence') {
        setIsLoadingPresence(false);
      } else if (action === 'absence') {
        setIsLoadingAbsence(false);
      } else if (action === 'confirm') {
        setIsLoadingConfirm(false);
      } else if (action === 'cancel') {
        setIsLoadingCancel(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleCancelClick = () => {
    setReasonType('cancel');
    setShowReasonField(true);
  };

  const handleAbsenceClick = () => {
    setReasonType('absence');
    setShowReasonField(true);
  };

  const handleSaveReason = () => {
    if (!reason) {
      toast.error(`Veuillez indiquer une raison pour ${reasonType === 'cancel' ? 'l\'annulation' : 'l\'absence'}`);
      return;
    }
    handleAction(reasonType === 'cancel' ? 'cancel' : 'absence');
  };

  const handleFinishClick = () => {
    setShowFinishConfirm(true);
  };

  const handleValidateFinish = () => {
    handleAction('finish');
  };

  // Fonction de soumission des compétences notées
  const handleSubmitCompetences = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const selected = Object.keys(checkedCompetences).filter(id => checkedCompetences[Number(id)]).map(Number);
    try {
      if (selected.length === 0) {
        toast.error('Veuillez sélectionner au moins une compétence');
        setIsLoading(false);
        return;
      }
      console.log(selected);

      const res = await postLearnerCompetences(appointment.id, selected, token, dispatch);
      if (res && res.success) {
        toast.success('Compétences notées avec succès');
        // Notifier le composant parent que le rendez-vous a été modifié
        onAppointmentUpdated();
        handleClose();
      } else {
        toast.error(res?.message || 'Erreur lors de la notation');
      }
    } catch (error) {
      toast.error('Erreur lors de la notation', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCompetences = modules.flatMap((mod) =>
    mod.subModule.flatMap((sub) =>
      sub.competence.filter((comp) => checkedCompetences[comp.id]).map((comp) => ({
        id: comp.id,
        name: comp.name,
        is_check: comp.is_check,
      }))
    )
  );

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`${isMobile ? 'h-[80vh] rounded-t-xl' : 'sm:max-w-[450px]'} p-0 bg-[#F5F5F5] border-none transition-transform duration-300 ease-in-out ${isClosing
          ? isMobile
            ? 'translate-y-full'
            : 'translate-x-full'
          : isMobile
            ? 'translate-y-0'
            : 'translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex flex-row justify-between border-gray-200 pb-5 pt-6 px-6">
            <SheetTitle className="text-xl font-semibold">Gestion du statut</SheetTitle>
          </SheetHeader>

          {/* Infos apprenant tout en haut */}
          <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-2 pt-2 px-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold">{appointment.learner.firstname} {appointment.learner.lastname}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  {appointment.learner.genre === "homme" ? <Mars className="w-5 h-5 text-[#212121]" /> : appointment.learner.genre === "femme" ? <Venus className="w-5 h-5 text-[#212121]" /> : <VenusAndMars className="w-5 h-5 text-[#212121]" />}
                </span>
                <p className="text-[14px] font-medium text-[#212121]">
                  {appointment.learner.genre || "Genre non renseigné"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#212121]" />
                <p className="text-[14px] font-medium text-[#212121]">
                  {appointment.learner.phone || "Téléphone non renseigné"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              {appointment.learner.photo ? (
                <img
                  src={`${imageUrl}${appointment.learner.photo}`}
                  alt={`${appointment.learner.firstname} ${appointment.learner.lastname}`}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-500 flex items-center justify-center text-4xl font-semibold text-white">
                  {`${appointment.learner.lastname?.charAt(0) ?? ''}${appointment.learner.firstname?.charAt(0) ?? ''}`}
                </div>
              )}
            </div>
          </div>


          <div className="flex flex-col h-[100vh] p-4 flex-1 overflow-y-auto">
            <div className="flex-1">
              {showReasonField && (
                <div className="mb-6">
                  <div className="space-y-2">
                    <label className="block text-md font-medium text-gray-700">
                      {reasonType === 'cancel' ? 'Raison de l\'annulation' : 'Raison de l\'absence'}
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`Entrez la raison ${reasonType === 'cancel' ? 'de l\'annulation' : 'de l\'absence'}...`}
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveReason}
                        disabled={isLoading}
                        className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showFinishConfirm && (
                <div className="mb-6">
                  <div className="space-y-2">
                    <textarea
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value="Je suis à la fin du cours"
                      readOnly
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleValidateFinish}
                        disabled={isLoading}
                        className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notation des compétences */}
              {appointment.status === 'notation' && (
                <div className="">
                  {isLoadingModules ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="h-[45vh] md:h-[60vh] scrollbar-hide overflow-y-auto">
                        {livretState === 'main' && (
                          <div className="space-y-[24px] h-[45vh] md:h-[60vh] px-4 pb-4">
                            {modules.length === 0 ? (
                              <p className="text-center text-gray-500 py-4">Aucun module pour le moment</p>
                            ) : (
                              modules.map((module) => {
                                const totalCompetences = module.subModule.reduce((acc, subModule) => acc + subModule.competence.length, 0);
                                const completedCompetences = module.subModule.reduce((acc, subModule) => acc + subModule.competence.filter(comp => checkedCompetences[comp.id]).length, 0);
                                const completion = totalCompetences > 0 ? Math.round((completedCompetences / totalCompetences) * 100) : 0;
                                return (
                                  <div
                                    key={module.id}
                                    onClick={() => {
                                      setSelectedModule(module);
                                      if (today > threeDaysAfter) {
                                        toast.error('Le délai de notation est dépassé, aucune action n\'est possible');
                                      } else {
                                        setLivretState('competence');
                                      }
                                    }}
                                    className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition"
                                  >
                                    <div className="flex items-center gap-4 text-[#6c61f6] min-w-0 flex-1">
                                      <div className="w-12 h-12 flex-shrink-0">
                                        <CircularProgressbar
                                          value={completion}
                                          text={`${module.code}`}
                                          strokeWidth={2}
                                          styles={buildStyles({
                                            textSize: '28px',
                                            textColor: '#000',
                                            pathColor: '#6c61f6',
                                            trailColor: '#e5e7eb',
                                          })}
                                        />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-semibold text-black">{module.name}</h4>
                                        <p className="text-sm text-[#424242] font-semibold mt-1">{completion}% de complétion</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="text-gray-400 w-5 h-5 flex-shrink-0" />
                                  </div>
                                )
                              })
                            )}
                          </div>
                        )}

                        {livretState === 'competence' && selectedModule && (
                          <div className="space-y-[24px] h-full pb-4">
                            <div className="flex items-center gap-2 py-2 sticky top-0 bg-gray-100 z-10">
                              <button
                                className="hover:bg-gray-100 rounded-full hover:cursor-pointer p-1"
                                onClick={() => {
                                  setLivretState('main');
                                  setTimeout(() => {
                                    const container = document.querySelector('.scrollbar-hide');
                                    if (container) {
                                      container.scrollTop = 0;
                                    }
                                  }, 0);
                                }}
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <h1
                                className="text-sm font-medium cursor-pointer transition-colors flex-1 min-w-0"
                                onClick={() => {
                                  setLivretState('main');
                                  setTimeout(() => {
                                    const container = document.querySelector('.scrollbar-hide');
                                    if (container) {
                                      container.scrollTop = 0;
                                    }
                                  }, 0);
                                }}
                              >
                                {selectedModule.name}
                              </h1>
                            </div>
                            {selectedModule.subModule.length === 0 ? (
                              <p className="text-center text-gray-500 py-4">Aucune sous-compétence pour le moment</p>
                            ) : (
                              selectedModule.subModule.map((subModule: any) => {
                                const totalCompetences = subModule.competence.length;
                                const completedCompetences = subModule.competence.filter((comp: CompetenceType) => checkedCompetences[comp.id]).length;
                                const completion = totalCompetences > 0 ? Math.round((completedCompetences / totalCompetences) * 100) : 0;
                                return (
                                  <div
                                    onClick={() => {
                                      setSelectedSubModule(subModule);
                                      setLivretState('sousCompetence');
                                    }}
                                    key={subModule.id}
                                    className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition"
                                  >
                                    <div className="flex items-center gap-4 text-[#6c61f6] min-w-0 flex-1">
                                      <div className="w-12 h-12 flex-shrink-0">
                                        <CircularProgressbar
                                          value={completion}
                                          text={`${subModule.code}`}
                                          strokeWidth={2}
                                          styles={buildStyles({
                                            textSize: '28px',
                                            textColor: '#4f46e5',
                                            pathColor: '#6c61f6',
                                            trailColor: '#e5e7eb',
                                          })}
                                        />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <h4 className="text-md font-semibold text-black">{subModule.name}</h4>
                                        <p className="text-sm text-[#424242] font-semibold mt-1">{completion}% de complétion</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="text-gray-400 w-5 h-5 flex-shrink-0" />
                                  </div>
                                )
                              })
                            )}
                          </div>
                        )}
                        {livretState === 'sousCompetence' && selectedSubModule && selectedSubModule.competence && (
                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              setShowRecapModal(true);
                            }}
                            className="flex flex-col h-full"
                          >
                            {/* En-tête sticky - SORTI du conteneur scrollable */}
                            <div className="flex items-center gap-2 py-2 bg-gray-100 z-10 flex-shrink-0">
                              <button
                                type="button"
                                className="hover:bg-gray-100 rounded-full hover:cursor-pointer p-1 flex-shrink-0"
                                onClick={() => {
                                  setLivretState('competence');
                                  setTimeout(() => {
                                    const container = document.querySelector('.scrollbar-hide');
                                    if (container) {
                                      container.scrollTop = 0;
                                    }
                                  }, 0);
                                }}
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <div
                                className='flex justify-between w-full cursor-pointer transition-colors min-w-0 flex-1'
                                onClick={() => {
                                  setLivretState('competence');
                                  setTimeout(() => {
                                    const container = document.querySelector('.scrollbar-hide');
                                    if (container) {
                                      container.scrollTop = 0;
                                    }
                                  }, 0);
                                }}
                              >
                                <h1 className="text-sm font-medium">{selectedSubModule.name}</h1>
                                <p className="text-sm font-medium flex-shrink-0">{(() => {
                                  const total = selectedSubModule.competence.length;
                                  const checkedCount = selectedSubModule.competence.filter((item: any) => checkedCompetences[item.id]).length;
                                  return Math.round((checkedCount / total) * 100);
                                })()}%</p>
                              </div>
                            </div>
                            
                            {/* Contenu scrollable - SANS l'en-tête à l'intérieur */}
                            <div className="flex-1 scrollbar-hide overflow-y-auto">
                              <div className='space-y-[24px] px-4 pb-4 pt-2'>
                                <div className='space-y-[8px]'>
                                  {selectedSubModule.competence.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4">Aucun exercice pour le moment</p>
                                  ) : (
                                    selectedSubModule.competence.map((item: any) => (
                                      <label
                                        key={item.id}
                                        className={`cursor-pointer flex items-start gap-3 p-3 border-b last:border-b-0 rounded-md transition ${item.is_check ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' : 'hover:bg-gray-50'}`}
                                      >
                                        <span className="text-md font-semibold flex-1 min-w-0" style={item.is_check ? { color: '#a3a3a3' } : {}}>{item.name}</span>
                                        <input
                                          type="checkbox"
                                          checked={!!checkedCompetences[item.id]}
                                          onChange={e => setCheckedCompetences(prev => ({ ...prev, [item.id]: e.target.checked }))}
                                          className="mt-1 accent-[#6c61f6] w-5 h-5 flex-shrink-0"
                                          disabled={item.is_check}
                                        />
                                      </label>
                                    ))
                                  )}
                                </div>
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="">
                {/* {today > threeDaysAfter && (
                  <div className="text-center font-semibold text-gray-500 py-4">
                    Le délai de notation est dépassé, aucune action n'est possible
                  </div>
                )} */}
              <div className="grid grid-cols-1 gap-3">
                {/* Bouton Valider la notation pour les compétences */}
                {appointment.status === 'notation' && (
                  <button
                    type="button"
                    title={today > threeDaysAfter ? 'Le délai de notation est dépassé' : 'Valider la notation des compétences'}
                    disabled={isLoading || today > threeDaysAfter}
                    className="w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-[16px] text-[12px] font-semibold leading-[140%] text-[#FDFDFD] disabled:opacity-50"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowRecapModal(true);
                    }}
                  >
                    {isLoading ? 'Enregistrement...' : 'Valider la notation'}
                  </button>
                )}

                {dateStatus === 'past' && appointment.status !== 'notation' ? (
                  <div className="text-center font-semibold text-gray-500 py-4">
                    Ce rendez-vous est passé, aucune action n'est possible
                  </div>
                ) : appointment.status === 'scheduled' ? (
                  dateStatus === 'future' ? (
                    <>
                      <button
                        onClick={() => handleAction('confirm')}
                        disabled={isLoadingConfirm || isLoadingCancel}
                        className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-[16px] text-[12px] font-semibold leading-[140%] text-[#FDFDFD] ${(isLoadingConfirm || isLoadingCancel) ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoadingConfirm ? 'Enregistrement...' : 'Confirmer le rendez-vous'}
                      </button>
                      <button
                        onClick={handleCancelClick}
                        disabled={isLoadingCancel || isLoadingConfirm}
                        className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#EEEEEE] py-[16px] text-[12px] font-semibold leading-[140%] text-[#757575] ${(isLoadingCancel || isLoadingConfirm) ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoadingCancel ? 'Enregistrement...' : 'Annuler le rendez-vous'}
                      </button>
                    </>
                  ) : (
                    <div className="text-center font-semibold text-gray-500 py-4">
                      Ce rendez-vous est aujourd'hui, vous ne pouvez plus le confirmer ou l'annuler
                    </div>
                  )
                ) : appointment.status === 'confirmed' ? (
                  dateStatus === 'today' ? (
                    <>
                      <button
                        onClick={() => handleAction('presence')}
                        disabled={isLoadingPresence || isLoadingAbsence}
                        className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-[16px] text-[12px] font-semibold leading-[140%] text-[#FDFDFD] ${(isLoadingPresence || isLoadingAbsence) ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoadingPresence ? 'Enregistrement...' : 'Confirmer la présence'}
                      </button>
                      <button
                        onClick={handleAbsenceClick}
                        disabled={isLoadingAbsence || isLoadingPresence}
                        className={`w-full rounded-[6.22px] border-[0.39px] border-[#BCADFC] bg-[#D3C8FE] py-[16px] text-[12px] font-semibold leading-[140%] text-[#463BE2] ${(isLoadingAbsence || isLoadingPresence) ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoadingAbsence ? 'Enregistrement...' : 'Signaler une absence'}
                      </button>
                    </>
                  ) : dateStatus === 'future' ? (
                    <button
                      onClick={handleCancelClick}
                      disabled={isLoading}
                      className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#EEEEEE] py-[16px] text-[12px] font-semibold leading-[140%] text-[#757575] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Enregistrement...' : 'Annuler le rendez-vous'}
                    </button>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      Ce rendez-vous est passé, aucune action n'est possible
                    </div>
                  )
                ) : appointment.status === 'pending' && appointment.presence_monitor && appointment.presence_student ? (
                  <>
                    <button
                      onClick={handleFinishClick}
                      disabled={isLoading}
                      className={`w-full bg-[#D3C8FE] text-[#463BE2] py-2 rounded-lg hover:bg-opacity-95 transition-colors mb-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Enregistrement...' : 'Terminer le rendez-vous'}
                    </button>
                  </>
                ) : appointment.presence_monitor && appointment.presence_student && appointment.status !== 'notation' ? (
                  <button
                    onClick={() => handleAction('finish')}
                    disabled={isLoading}
                    className={`w-full bg-[#D3C8FE] text-[#463BE2] py-2 rounded-lg hover:bg-opacity-95 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Enregistrement...' : 'Terminer le rendez-vous'}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de récapitulatif des compétences */}
        <CompetenceRecapModal
          isOpen={showRecapModal}
          onClose={() => setShowRecapModal(false)}
          onConfirm={async () => {
            setShowRecapModal(false);
            await handleSubmitCompetences(new Event('submit') as any);
          }}
          selectedCompetences={selectedCompetences.filter(comp => !comp.is_check)}
          isLoading={isLoading}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EditApointment;