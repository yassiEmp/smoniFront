/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import card from '@assets/apprenants/dashboard/Card.png';
import ProtectedLayout from "@/components/common/ProtectedLayout";

import charge from '@assets/apprenants/dashboard/charge.png';
import 'react-circular-progressbar/dist/styles.css';
import { ChevronRight } from 'lucide-react';
import outline2 from "@assets/apprenants/dashboard/outline2.png";
import CompetencesList from '@components/learners/Examens/CompetencesList';
import BadgesList from "@/components/learners/Examens/BadgesList";
import { fetchProgress, type Module } from "@/api/learner/progress";
import Loader from "@/components/common/Loader";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/configureStore';
import { fetchBadges } from "@/api/learner/badges";
import { getExamens } from '@/api/learner/examen';
import { Eye } from 'lucide-react';
import { imageUrl } from '@/api';
import { Link } from 'react-router';
import ModalQuestionTest from '@/components/learners/ModalQuestionTest';


const Examens = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCompetence, setSelectedModuleCompetence] = useState<Module | null>(null);
  const [noBadges, setNoBadges] = useState<any[]>([]);
  const [loadingBadges, setLoadingBadges] = useState(true);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const { examens } = useSelector((state: RootState) => state.adminReducer);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const testPassed = useSelector(
    (state: RootState) => state.authReducer.test_passed,
  );
  const [examensLoading, setExamensLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statutFilter, setStatutFilter] = useState<'all' | 'refused' | 'confirmed' | 'pending'>('all');
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTab, setSelectedTab] = useState<'progression' | 'examens'>('progression');


  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      try {
        const response = await fetchProgress(token);
        // console.log("Progress response:", response);
        setModules(response.data);
        setTotalProgress(response.progress); // Stockage de la progression totale
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, [token]);

  // Charger les badges pour le contrôle conditionnel
  useEffect(() => {
    setLoadingBadges(true);
    const loadBadges = async () => {
      try {
        const response = await fetchBadges(token);
        setNoBadges(response.data.nobadges || []);
      } catch (error) {
        setNoBadges([]);
      } finally {
        setLoadingBadges(false);
      }
    };
    loadBadges();
  }, [token]);

  useEffect(() => {
    const fetchExamens = async () => {
      setExamensLoading(true);
      try {
        await getExamens(token, dispatch, user.id, currentPage, perPage);
      } finally {
        setExamensLoading(false);
      }
    };
    if (token && user?.id) {
      fetchExamens();
    }
  }, [token, user, currentPage, perPage]);

  const mappedExamens = (examens?.data || []).map((examen: any) => ({
    id: examen.id,
    date: examen.date,
    datetime: examen.datetime,
    moniteur: {
      id: examen.monitor?.id,
      firstname: examen.monitor?.firstname,
      lastname: examen.monitor?.lastname,
      photo: examen.monitor?.photo || '',
      email: examen.monitor?.email,
      phone: examen.monitor?.phone || '',
      genre: examen.monitor?.genre || '',
    },
    apprenant: {
      id: examen.learner?.id,
      firstname: examen.learner?.firstname,
      lastname: examen.learner?.lastname,
      photo: examen.learner?.photo || '',
      email: examen.learner?.email,
      phone: examen.learner?.phone || '',
      genre: examen.learner?.genre || '',
    },
    statut: (examen.status as 'refused' | 'confirmed' | 'pending') ?? 'pending',
  }));

  const filteredExamens = mappedExamens.filter((examen: any) => {
    if (statutFilter === 'all') return true;
    return examen.statut === statutFilter;
  });

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'confirmed':
        return <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold border border-blue-300 bg-blue-100 text-blue-700">Confirmé</span>;
      case 'pending':
        return <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold border border-yellow-300 bg-yellow-100 text-yellow-700">En attente</span>;
      case 'refused':
        return <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold border border-red-300 bg-red-100 text-red-700">Refusé</span>;
      default:
        return statut;
    }
  };

  const totalPages = Math.ceil((examens?.total || 0) / perPage);
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (selectedTab === 'examens' && mappedExamens.length === 0) {
      setSelectedTab('progression');
    }
  }, [selectedTab, mappedExamens.length]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-primary">
        <Loader />
      </div>
    );
  }


  return (
     <ProtectedLayout>
    <section className="min-h-screen bg-gray-50  pt-[100px] md:pt-[150px] px-3 lg:px-6 pb-8">
    {!testPassed ? <ModalQuestionTest onTestComplete={() => {}} /> : null}
      <div className=" max-w-[1500px] mx-auto  lg:px-8 ">
        {/* Tabs principaux */}
        <div className="flex gap-2 mb-8 justify-center lg:justify-start ">
          <button
            onClick={() => setSelectedTab('progression')}
            className={`px-6 py-2 rounded-lg font-semibold border transition-colors text-base ${selectedTab === 'progression' ? 'bg-[#6c61f6] text-white border-[#6c61f6]' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
          >
            Progression
          </button>
          {mappedExamens.length > 0 && (
            <button
              onClick={() => setSelectedTab('examens')}
              className={`px-6 py-2 rounded-lg font-semibold border transition-colors text-base ${selectedTab === 'examens' ? 'bg-[#6c61f6] text-white border-[#6c61f6]' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
            >
              Liste des examens
            </button>
          )}
        </div>
        {/* Affichage conditionnel selon le tab sélectionné */}
        {selectedTab === 'progression' ? (
          // ... existing code ...
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 items-start">
            {/* Colonne gauche */}
            <div className="w-full mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Prêt pour l'examen ?</h2>
              <p className="text-[#616161] mb-6 text-[13px] font-semibold">
                Suis ta progression et découvre si tu es éligible pour passer l'examen blanc ou final.
              </p>

            <div className="bg-[#FAFAFA] rounded-xl shadow-sm p-4 space-y-4">
              {selectedCompetence === null ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mon livret d’apprentissage</h3>
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      onClick={() => setSelectedModuleCompetence(module)}
                      className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition"
                    >
                      <div className="flex items-center gap-4 text-[#6c61f6]">
                        <div className="w-12 h-12">
                          <CircularProgressbar
                            value={module.stat}
                            text={module.code}
                            strokeWidth={2}
                            styles={buildStyles({
                              textSize: '28px',
                              textColor: '#4f46e5',
                              pathColor: '#6c61f6',
                              trailColor: '#e5e7eb',
                            })}
                          />
                        </div>
                        <div>
                          <h4 className="text-sm lg:text-lg font-semibold text-black md:w-[327px]">{module.name}</h4>
                          <p className="text-xs lg:text-sm text-[#424242] font-semibold mt-1">
                            {module.stat.toFixed(2)}% de complétion
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 w-5 h-5" />
                    </div>
                  ))}
                </>


                ) : (
                  <CompetencesList
                    module={selectedCompetence}
                    onBack={() => setSelectedModuleCompetence(null)}
                  />
                )}
              </div>
            </div>

            {/* Colonne droite */}
            <div className="w-full space-y-6">
              <div className="flex justify-end">
                   <Link to="/Learners/reservercours">
                <button className="text-[14px] text-[#757575] bg-[#EEE] py-3 px-4 rounded-md font-semibold hover:bg-[#6c61f6] hover:text-white transition-colors duration-200">
                  Réserver une leçon
                </button>
               </Link>
              </div>

              <BadgesList />


              <div className="bg-white p-6 rounded-xl">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img src={card} alt="voiture" className="w-40 h-auto object-contain" />
                  <div className="flex-1 w-full">
                    <p className="text-[#6c61f6] font-semibold text-center sm:text-left mb-2">
                      {totalProgress.toFixed(2)}% de progression
                    </p>
                    <div className="w-full h-3 bg-indigo-100 rounded-full">
                      <div
                        className="h-full rounded-full bg-[#6c61f6] transition-all duration-500"
                        style={{ width: `${totalProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`flex items-center justify-center rounded-xl py-4 px-4 text-center font-semibold ${!loadingBadges && noBadges.length === 0 ? 'bg-[#EAE3FF]' : 'bg-[#D7F6E6]'
                }`}>
                {loadingBadges ? (
                  <span className="flex justify-center items-center h-6"><Loader size={20} /></span>
                ) : (
                  <>
                    <span className="text-[13px]">
                        {noBadges.length === 0
                           ? "Tous les modules sont validés, tu es prêt à passer à l'examen. "
                          : "Tu dois avoir validé tous les modules de conduite pour accéder à l'examen final. "
                        }
                      </span>
                    <img className="ml-2 w-5 h-5" src={charge} alt="charge" />
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Affichage de la liste des examens (tabs + tableau + pagination)
          <>
            <div className="bg-white rounded-t-lg p-4 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-2 w-full md:flex-row md:gap-2 md:w-auto">
                <button
                  onClick={() => setStatutFilter('all')}
                  className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'all' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'}`}
                >
                  Tous les statuts
                  {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'all' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.length}</span> */}
                </button>
                <button
                  onClick={() => setStatutFilter('confirmed')}
                  className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'confirmed' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'}`}
                >
                  Confirmé
                  {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'confirmed' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.filter(e => e.statut === 'confirmed').length}</span> */}
                </button>
                <button
                  onClick={() => setStatutFilter('pending')}
                  className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'pending' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'}`}
                >
                  En attente
                  {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'pending' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.filter(e => e.statut === 'pending').length}</span> */}
                </button>
                <button
                  onClick={() => setStatutFilter('refused')}
                  className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'refused' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'}`}
                >
                  Refusé
                  {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'refused' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.filter(e => e.statut === 'refused').length}</span> */}
                </button>
              </div>
            </div>

            <div className="pb-8">
              <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Moniteur</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Statut</th>
                        {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Actions</th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {examensLoading ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center">
                            <Loader />
                          </td>
                        </tr>
                      ) : filteredExamens.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-lg">
                            Aucun examen trouvé.
                          </td>
                        </tr>
                      ) : (
                        filteredExamens.map((examen: any) => (
                          <tr key={examen.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">{examen.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {examen.moniteur.photo ? (
                                  <img
                                    src={`${imageUrl}${examen.moniteur.photo}`}
                                    alt={`${examen.moniteur.firstname} ${examen.moniteur.lastname}`}
                                    className="h-10 w-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-xl font-semibold text-white">
                                    {`${examen.moniteur.lastname?.charAt(0) ?? ''}${examen.moniteur.firstname?.charAt(0) ?? ''}`}
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold">{examen.moniteur.firstname} {examen.moniteur.lastname}</div>
                                  <div className="text-xs text-gray-500">{examen.moniteur.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatutLabel(examen.statut)}</td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="text-blue-500 hover:text-blue-700 font-medium"
                                title="Voir les détails"
                              >
                                <Eye className='w-5 h-5' />
                              </button>
                            </td> */}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {examens && filteredExamens.length > 0 && (
                  <div className="bg-white border-t border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="hidden text-sm text-gray-700 md:block">
                          Page {currentPage} sur {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="perPage" className="text-sm text-gray-600">Résultats par page:</label>
                          <select
                            id="perPage"
                            value={perPage}
                            onChange={(e) => handlePerPageChange(Number(e.target.value))}
                            className="rounded-md border-gray-300 text-sm focus:border-[#BCADFC] focus:ring-[#BCADFC]"
                          >
                            {[10, 20, 30, 40].map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {'<'}
                        </button>
                        {(() => {
                          const pages: (number | string)[] = [];
                          if (totalPages <= 10) {
                            for (let i = 1; i <= totalPages; i++) {
                              pages.push(i);
                            }
                          } else {
                            pages.push(1);
                            const startPage = Math.max(2, currentPage - 1);
                            const endPage = Math.min(totalPages - 1, currentPage + 1);
                            if (startPage > 2) {
                              pages.push('...');
                            }
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(i);
                            }
                            if (endPage < totalPages - 1) {
                              pages.push('...');
                            }
                            pages.push(totalPages);
                          }
                          return pages.map((page, index) => (
                            <button
                              key={index}
                              onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                              disabled={page === '...' || page === currentPage}
                              className={`px-3 py-1 rounded-md text-sm ${page === '...'
                                ? 'text-gray-400 cursor-default'
                                : page === currentPage
                                  ? 'bg-[#BCADFC] text-white cursor-default'
                                  : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                              {page}
                            </button>
                          ));
                        })()}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {'>'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </>
        )}
      </div>
      {/* Bouton flottant mobile */}
      <div className="fixed bottom-16 right-6 lg:hidden">
        <Link to="/Learners/reservercours">
        <button className="bg-[#6c61f6] p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={outline2} alt="Réservation" className="w-5 h-5" />
        </button>
        </Link>
      </div>
    </section>
    </ProtectedLayout>
  );
};

export default Examens;

