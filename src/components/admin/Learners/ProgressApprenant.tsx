import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import card from '@assets/apprenants/dashboard/Card.png';
import 'react-circular-progressbar/dist/styles.css';
import { ChevronRight } from 'lucide-react';
import CompetencesList from '@components/learners/Examens/CompetencesList';
import { fetchProgress, type Module } from "@/api/admin/ProgressApprenant";
import Loader from "@/components/common/Loader";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';


export function ProgressApprenant({ userId }: { userId: string | undefined }) {

 const [modules, setModules] = useState<Module[]>([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCompetence, setSelectedModuleCompetence] = useState<Module | null>(null);
  const { token } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => { 
    if (!token || !userId) return;
      const loadProgress = async () => {
        setLoading(true);
        try {
          const response = await fetchProgress(token, userId);
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
    }, [token, userId]);

   return ( 
    <div className=' mx-auto'> 

     <div className="flex flex-col py-6 items-start w-full">
      {/* Carte de progression en haut */}
      <div className="bg-white p-6 rounded-xl w-full mb-6">
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

      {/* Loader */}
      {loading ? (
        <div className="w-full flex justify-center py-10">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <div className="bg-[#FAFAFA] rounded-xl shadow-sm p-4 space-y-4 w-full">
            {selectedCompetence === null ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mon livret d’apprentissage</h3>
                {/* Message si pas de modules */}
                {modules.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    Aucun module trouvé pour cet apprenant.
                  </div>
                ) : (
                  modules.map((module) => (
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
                          <h4 className="text-lg font-semibold text-black md:w-[327px]">{module.name}</h4>
                          <p className="text-sm text-[#424242] font-semibold mt-1">
                            {module.stat.toFixed(2)}% de complétion
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 w-5 h-5" />
                    </div>
                  ))
                )}
              </>
            ) : (
              <CompetencesList
                module={selectedCompetence}
                onBack={() => setSelectedModuleCompetence(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
    </div>
   )
}
