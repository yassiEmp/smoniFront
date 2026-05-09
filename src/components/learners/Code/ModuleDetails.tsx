import React from 'react';
import { FaArrowLeft, FaDownload, FaFileAlt } from 'react-icons/fa';

interface DocumentItem {
  title: string;
  link: string;
}

interface ModuleDetailsProps {
  module: {
    title: string;
  };
  onBack: () => void;
}


const documents: DocumentItem[] = Array.from({ length: 5 }, () => ({
  title: 'Comprendre les panneaux de danger – PDF (1,3 Mo)',
  link: '#', // À remplacer avec le vrai lien
}));

const ModuleDetails: React.FC<ModuleDetailsProps> = ({ module, onBack }) => {
  const handleDownload = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="bg-gray-50">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-3 text-gray-700 hover:text-black"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold">{module.title}</h2>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 border-b last:border-none hover:bg-gray-100 transition"
          >
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-xl">
                <FaFileAlt />
              </span>
              <span className="text-sm">{doc.title}</span>
            </div>
            <button
              onClick={() => handleDownload(doc.link)}
              className="text-gray-700 hover:text-black"
            >
              <FaDownload />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleDetails;
