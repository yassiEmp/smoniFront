import ConduiteDesktop from "@components/learners/Conduite/ConduiteDesktop";
import ConduiteMobile from "@components/learners/Conduite/ConduiteMobile";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import ModalQuestionTest from "@/components/learners/ModalQuestionTest";


const Conduite = () => {
  const {user} = useSelector((state: RootState) => state.authReducer);
  const testPassed = useSelector(
    (state: RootState) => state.authReducer.test_passed,
  );
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-gray-50">
      {/* Header section */}
      {!testPassed ? <ModalQuestionTest onTestComplete={() => {}} /> : null}
      <div className="bg-white py-8 mb-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Passe à la pratique</h1>
            <p className="text-[13px] font-semibold text-[#616161]">
              Consulte tes rendez-vous et ta progression pour avancer sereinement.
            </p>
          </div>
          <div className="hidden lg:block">
            <Link to="/learners/reservercours">
              <button className="bg-gray-100 hover:bg-gray-200 text-[14px] font-semibold text-[#757575] px-6 py-3 rounded-lg transition-colors"
              onClick={(e) => {
                if (user?.is_active === 0) {
                  e.preventDefault();
                  toast.error("Compte temporairement bloqué. Votre compte a été désactivé. Pour le réactiver, veuillez contacter notre équipe.");
                }
              }}
              >
                Réserver une leçon
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          {/* Desktop view */}
          <div className="hidden lg:block">
            <ConduiteDesktop />
          </div>

          {/* Mobile view */}
          <div className="lg:hidden">
            <ConduiteMobile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conduite;
