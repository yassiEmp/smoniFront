import { useState, useEffect } from 'react';
import { ArrowLeft, Download, FileText, Calendar, Eye } from 'lucide-react';
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Loader from "@/components/common/Loader";
import { fetchLearnerContracts, Contract } from "@/api/learner/contracts";
import { pdfUrl } from '@/api';

interface ContratProps {
  onBack?: () => void;
}

export default function Contrat({ onBack }: ContratProps) {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchLearnerContracts(token)
      .then(res => setContracts(res.data.data))
      .catch(() => setContracts([]))
      .finally(() => setLoading(false));
  }, [token]);

  // Vue mobile
  const MobileView = () => (
    <div className="p-6 bg-white">
      {/* Header mobile */}
      <div className="flex items-center gap-4 px-6 py-4 pt-20 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Contrat</h1>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="flex justify-center py-12"><Loader /></div>
        ) : contracts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Aucun contrat disponible</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {contract.subscription?.service?.title || "Contrat"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {contract.date ? new Date(contract.date).toLocaleDateString("fr-FR") : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {contract.tag}
                      </span>
                      <div className="flex gap-2">
                        <a
                          href={pdfUrl + contract.file_original}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-lg shadow-sm"
                          title="Voir le contrat"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </a>
                        <a
                          href={pdfUrl + contract.file_original}
                          download
                          className="p-2 bg-white rounded-lg shadow-sm"
                          title="Télécharger"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Vue desktop
  const DesktopView = () => (
    <div className="bg-gray-50 p-6 rounded-xl max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Mes contrats</h2>
        <p className="text-sm text-gray-600">Consultez et téléchargez vos contrats</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader /></div>
      ) : contracts.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun contrat</h3>
          <p className="text-gray-500">Vos contrats apparaîtront ici</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {contract.subscription?.service?.title || "Contrat"}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {contract.date ? new Date(contract.date).toLocaleDateString("fr-FR") : ""}
                        </span>
                      </div>
                      <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-800">
                        {contract.tag}
                      </span>
                    </div>
                  </div>
                </div>
                 
                <div className="flex gap-2">
                  <a
                    href={pdfUrl + contract.file_original}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    title="Consulter"
                  >
                    <Eye className="w-4 h-4" />
                    Consulter
                  </a>
                  <a
                    href={pdfUrl + contract.file_original}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                    title="Télécharger"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="block lg:hidden">
        <MobileView />
      </div>
      <div className="hidden lg:block">
        <DesktopView />
      </div>
    </>
  );
}