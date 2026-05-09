import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Loader from "@/components/common/Loader";
import { fetchCodePackStatus, CodePackResponse } from "@/api/learner/code";
import ProtectedLayout from "@/components/common/ProtectedLayout";
import ModalQuestionTest from "@/components/learners/ModalQuestionTest";


export default function Code() {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [codeData, setCodeData] = useState<CodePackResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const testPassed = useSelector(
    (state: RootState) => state.authReducer.test_passed,
  );
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchCodePackStatus(token)
      .then(res => setCodeData(res))
      .catch(() => setCodeData({ success: false, data: false, link: undefined }))
      .finally(() => setLoading(false));
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
     <ProtectedLayout>
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    {!testPassed ? <ModalQuestionTest onTestComplete={() => {}} /> : null}
      <div className="max-w-[1400px] w-full flex justify-center mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader />
            <span className="mt-4 text-gray-600 font-semibold">Veuillez patienter...</span>
          </div>
        ) : codeData?.data ? (
          <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Accès à la plateforme de code</h2>
            
            {codeData.link?.map((item) => (
              <div key={item.id} className="mb-8 last:mb-0">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Lien d'accès</h3>
                    <a 
                      href={item.liens} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      {item.liens}
                    </a>
                  </div>
                  <div className="text-sm text-gray-500">
                    Ajouté le: {formatDate(item.created_at)}
                  </div>
                </div>

            
                <div className="mt-6">
                  <a
                    href={item.liens}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full md:w-auto mx-auto text-center bg-[#6c61f6] text-white font-semibold rounded-lg py-3 px-6 hover:bg-indigo-700 transition-colors"
                  >
                    Accéder à la plateforme
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun abonnement code</h2>
            <p className="text-gray-700 mb-6 text-center">
              Vous n'avez pas souscrit à un parcours de code de la route.<br />
              Voulez-vous prendre des cours de code&nbsp;?
            </p>
            <button
              onClick={() => navigate("/learners/boutique")}
              className="mt-4 bg-[#6c61f6] text-white font-semibold rounded-lg py-3 px-8 hover:bg-indigo-700 transition-colors"
            >
              Découvrir les offres de code
            </button>
          </div>
        )}
      </div>
    </section>
    </ProtectedLayout>
  );
}