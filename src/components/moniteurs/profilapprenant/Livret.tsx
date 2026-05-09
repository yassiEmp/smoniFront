import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CompetencesList from './livret/CompetencesList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getLearnerProgress } from '@/api/monitor/apprenants';
import { ModuleType } from '@/types/monitor/settings/configuration';
import Loader from '@/components/common/Loader';

interface LivretProps {
  livretState: 'main' | 'competence' | 'sousCompetence';
  setLivretState: (state: 'main' | 'competence' | 'sousCompetence') => void;
  onBack: () => void;
  learnerId: number;
}

const Livret = ({ livretState, setLivretState, onBack, learnerId }: LivretProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.authReducer);
  const modules = useSelector((state: RootState) => state.monitorReducer.modules);


  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      try {
        await getLearnerProgress(learnerId, token, dispatch);
      } catch (error) {
        console.error("Erreur lors de la récupération des modules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [learnerId, token, dispatch]);

  const calculateCompletion = (module: ModuleType) => {
    const totalCompetences = module.subModule.reduce((acc, subModule) =>
      acc + subModule.competence.length, 0);
    const completedCompetences = module.subModule.reduce((acc, subModule) =>
      acc + subModule.competence.filter(comp => comp.is_check).length, 0);
    return totalCompetences > 0 ? Math.round((completedCompetences / totalCompetences) * 100) : 0;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='md:max-w-[549px] h-full relative bg-[#F5F5F5]'>
      <div className="h-screen bg-[#F5F5F5] flex flex-col">
        {livretState === 'main' ? (
          <>
            <div className="flex items-center gap-2 py-2">
              <button
                className="hover:bg-gray-100 rounded-full hover:cursor-pointer"
                onClick={onBack}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1
                className="text-lg font-medium cursor-pointer"
                onClick={onBack}
              >
                Livret d'apprentissage
              </h1>
            </div>
            <div className="flex-1 scrollbar-hide overflow-y-auto max-h-[calc(100vh-45vh)] sm:max-h-[calc(100vh-40vh)]">
              <div className='space-y-[24px] px-4 pb-4'>
                <div className='space-y-[8px]'>
                  {modules.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Aucun commentaire pour le moment</p>
                  ) : (
                    modules.map((module) => {
                      const completion = calculateCompletion(module);
                      return (
                        <div
                          key={module.id}
                          onClick={() => {
                            setSelectedModule(module);
                            setLivretState('competence');
                          }}
                          className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition"
                        >
                          <div className="flex items-center gap-4 text-[#6c61f6]">
                            <div className="w-12 h-12">
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
                            <div>
                              <h4 className="text-lg font-semibold text-black md:w-[327px]">{module.name}</h4>
                              <p className="text-sm text-[#424242] font-semibold mt-1">
                                {completion}% de complétion
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-400 w-5 h-5" />
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <CompetencesList
            module={selectedModule || modules[0]}
            onBack={onBack}
            livretState={livretState}
            setLivretState={setLivretState}
          />
        )}
      </div>
    </div>
  )
}

export default Livret