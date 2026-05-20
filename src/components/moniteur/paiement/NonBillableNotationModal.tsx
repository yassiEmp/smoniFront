import React, { type FC } from 'react';
import { MapPinX, X, CalendarDays, User2, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { fetchNoBillableRendezVous, type NoBillableRendezVous } from "@/api/noBillableRendezVous";
import Loader from "@/components/common/Loader";
import { imageUrl } from "@/api";

interface NonBillableNotationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmptyData = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-[12px] min-h-[200px] w-full">
            <MapPinX size={48} className="text-[#6C61F6] mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2"> Aucun cours en attente de notation </h3>
        </div>
    )
}

const NonBillableNotationModal: FC<NonBillableNotationModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.authReducer.token);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<NoBillableRendezVous[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && token) {
            setLoading(true);
            fetchNoBillableRendezVous(token)
                .then((res) => {
                    setData(res.data);
                    setHasMore(!!res.next_page_url);
                    setPage(2);
                })
                .finally(() => setLoading(false));
        }
    }, [isOpen, token]);

    const handleScroll = async () => {
        const container = containerRef.current;
        if (!container || loading || !hasMore) return;

        if (container.scrollHeight - container.scrollTop <= container.clientHeight + 100) {
            setLoading(true);
            try {
                const res = await fetchNoBillableRendezVous(token, page);
                setData(prev => [...prev, ...res.data]);
                setHasMore(!!res.next_page_url);
                setPage(p => p + 1);
            } finally {
                setLoading(false);
            }
        }
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    };

    if (!isOpen && !isAnimating) return null;

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <>
            <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      {/* Mobile Bottom Sheet (< lg) */}

         <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slide-up ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
                <div className="flex flex-col h-full max-h-[90vh]">
                      {/* Handle bar */}
          <div className="flex justify-center py-3">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

  <div className="bg-black text-white px-6 py-4 -mx-0 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold mb-1">Heure non facturable</h1>
                <h2 className="text-lg opacity-90">Cours en attente de notation</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

                    

                    <div className="bg-white p-6 flex-1 overflow-auto" style={{ borderTopLeftRadius: '1rem' }}>
                        <div className="mb-6">
                            <div className="text-gray-500 text-sm mb-6">
                                Veuillez compléter le suivi pédagogique de l'apprenant suite aux rendez-vous passé pour justifié ces heures.
                            </div>
                        </div>
                     <div 
                          ref={containerRef}
                          onScroll={handleScroll} 
                          className="flex-1 overflow-y-auto"
                        >
                          {data.map((rdv) => (
                            <div 
                              key={rdv.id}
                              className="flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer"
                              onClick={() => navigate(`/monitor/rendez-vous`)}
                            >
                              <div className="flex items-center gap-4">
                                {rdv.learner.photo ? (
                                  <img
                                    src={imageUrl + rdv.learner.photo}
                                    alt={rdv.learner.firstname}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                    <User2 className="w-6 h-6 text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <h3 className="font-medium">
                                    {rdv.learner.firstname} {rdv.learner.lastname}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>{formatDate(rdv.date)}</span>
                                    <span>•</span>
                                    <span>{rdv.start_time} - {rdv.end_time}</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          ))}
                          {loading && (
                            <div className="py-4 text-center">
                              <Loader size={24} showText={false} />
                            </div>
                          )}

                          {data.length === 0 && !loading && <EmptyData />}
                        </div>
                       
                    </div>

                </div>
            </div>
            {/* Desktop Modal (> lg) */}

       <div
        className={`hidden lg:block fixed right-0 bottom-0 w-full max-w-md bg-black shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
         isOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'
        }`}
        style={{ top: '85px' }}
      >
                <div className="flex flex-col h-full">
         

                    <div className="bg-black text-white p-6">
                        <h1 className="text-2xl font-bold mb-1">Heure non facturable</h1>
                        <h2 className="text-xl">Cours en attente de notation</h2>
                    </div>

                    <div className="bg-white p-6 flex-1 overflow-auto" style={{ borderTopLeftRadius: '1rem' }}>
                        <div className="mb-6">
                            <div className="text-gray-500 text-sm mb-6">
                                Veuillez compléter le suivi pédagogique de l'apprenant suite aux rendez-vous passé pour justifié ces heures.
                            </div>
                        </div>

                        <div 
                          ref={containerRef}
                          onScroll={handleScroll} 
                          className="flex-1 overflow-y-auto"
                        >
                          {data.map((rdv) => (
                            <div 
                              key={rdv.id}
                              className="flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer"
                              onClick={() => navigate(`/monitor/rendez-vous`)}
                            >
                              <div className="flex items-center gap-4">
                                {rdv.learner.photo ? (
                                  <img
                                    src={imageUrl + rdv.learner.photo}
                                    alt={rdv.learner.firstname}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                    <User2 className="w-6 h-6 text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <h3 className="font-medium">
                                    {rdv.learner.firstname} {rdv.learner.lastname}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>{formatDate(rdv.date)}</span>
                                    <span>•</span>
                                    <span>{rdv.start_time} - {rdv.end_time}</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          ))}
                          {loading && (
                            <div className="py-4 text-center">
                              <Loader size={24} showText={false} />
                            </div>
                          )}
                          {data.length === 0 && !loading && <EmptyData />}
                        </div>
                        
                    </div>
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 bg-[#bcadfc] hover:bg-[#bcadfc]/60 rounded-full transition-colors text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default NonBillableNotationModal
