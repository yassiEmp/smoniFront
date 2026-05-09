// import { useState } from 'react';
// import { CompetenceType } from '@/types/monitor/settings/configuration';
// import { ChevronLeft } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa';
import { SubModule } from "@/api/learner/progress";
import Loader from '@/components/common/Loader';

interface SousCompetencesListProps {
  subModule: SubModule;
  onBack: () => void;
}

const SousCompetencesList = ({ subModule, onBack }: SousCompetencesListProps) => {
  if (!subModule) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-3 text-gray-700 hover:text-black">
          <FaArrowLeft />
        </button>
        <div className="flex justify-between w-full">
          <h2 className="text-md font-semibold">{subModule.name}</h2>
          <p className="text-md font-semibold text-primary">{subModule.stat.toFixed(2)}%</p>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[450px] space-y-4 pr-2 scrollbar-hide">
        {subModule.competence.map((comp) => (
          <div 
            key={comp.id} 
            className={`flex items-center gap-3 p-3 border-b transition-colors ${
              comp.is_check ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <span className="text-[16px] font-semibold text-gray-800 flex-1">
              {comp.name}
            </span>
            <input
              type="checkbox"
              checked={comp.is_check}
              disabled
              className="mt-1 accent-[#6c61f6] w-5 h-5"
            />
          </div>
        ))}
      </div>


    </div>
  );
};


export default SousCompetencesList;
