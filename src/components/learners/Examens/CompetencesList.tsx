import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { Module, SubModule } from "@/api/learner/progress";
import SousCompetencesList from './SouscompetencesList';
import Loader from "@/components/common/Loader";
import { FileText, Download, FileWarning } from 'lucide-react';
import { pdfUrl } from '@/api';

interface CompetencesListProps {
  module: Module | null;
  onBack: () => void;
}

const CompetencesList = ({ module, onBack }: CompetencesListProps) => {
  const [selectedSubModule, setSelectedSubModule] = useState<SubModule | null>(null);

  if (!module) {
    return <Loader />;
  }

  const handleDownload = (pdfPath: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Empêche la navigation vers le sous-module
    const fileUrl = `${pdfPath}`;
    window.open(fileUrl, '_blank');
  };

  return (
    <div>
      {selectedSubModule ? (
        <SousCompetencesList 
          subModule={selectedSubModule} 
          onBack={() => setSelectedSubModule(null)} 
        />
      ) : (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-3 text-gray-700 hover:text-black"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center justify-between w-full">
              <h2 className="text-md font-semibold">{module.name}</h2>
              <span className="text-primary font-semibold">{module.stat.toFixed(2)}%</span>
            </div>
          </div>

          <div className="space-y-4">
            {module.subModule.map((sub) => (
              <div 
                key={sub.id}
                onClick={() => setSelectedSubModule(sub)}
                className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <CircularProgressbar
                      value={sub.stat}
                      text={sub.code}
                      strokeWidth={2}
                      styles={buildStyles({
                        textSize: '28px',
                        textColor: '#4f46e5',
                        pathColor: '#6c61f6',
                        trailColor: '#e5e7eb',
                      })}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-md font-semibold text-black break-words max-w-xs">
                      {sub.name}
                    </h4>
                    <p className="text-sm text-[#424242] font-semibold mt-1">
                      {sub.stat.toFixed(2)} % de complétion
                    </p>
                    {/* Nouvelle ligne pour mobile */}
                    <div className="md:hidden mt-2">
                      {sub.pdf ? (
                        <button 
                          onClick={(e) => handleDownload(sub.pdf, e)}
                          className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-colors"
                          title="Télécharger le PDF"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            <Download className="w-4 h-4" />
                          </div>
                        </button>
                      ) : (
                        <div className="text-gray-400" title="Aucun document disponible">
                          <FileWarning className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Version desktop (cachée sur mobile) */}
                  <div className="flex-shrink-0 hidden md:block">
                    {sub.pdf ? (
                      <button 
                        onClick={(e) => handleDownload(sub.pdf, e)}
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-colors"
                        title="Télécharger le PDF"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          <Download className="w-4 h-4" />
                        </div>
                      </button>
                    ) : (
                      <div className="p-2 text-gray-400" title="Aucun document disponible">
                        <FileWarning className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetencesList;