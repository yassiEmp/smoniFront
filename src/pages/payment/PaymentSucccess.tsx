import { useLocation, useNavigate } from 'react-router'
import PageHead from '@components/SEO/PageHead'

const PaymentSucccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const status = params.get('redirect_status');

    const isSuccess = status === 'succeeded';

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-white px-4">
            <PageHead
                title="Paiement — Smoni"
                description="Confirmation de paiement Smoni."
                canonicalPath="/payment-success"
                noindex
            />
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
                {isSuccess ? (
                  <>
                    <div className="bg-green-100 rounded-full p-4 mb-4">
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Paiement réussi !</h1>
                    <p className="text-gray-600 mb-4 text-center">Merci pour votre achat. Votre paiement a bien été pris en compte.</p>
                    <button
                        onClick={() => navigate('/learners/parametres')}
                        className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                    >
                        Continuer
                    </button>
                  </>
                ) : (
                  <>
                    <div className="bg-red-100 rounded-full p-4 mb-4">
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Paiement échoué</h1>
                    <p className="text-gray-600 mb-4 text-center">Votre paiement n'a pas pu être validé. Veuillez réessayer ou contacter le support si besoin.</p>
                    <button
                        onClick={() => navigate('/learners/boutique')}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                    >
                        Retour à la boutique
                    </button>
                  </>
                )}
            </div>
        </div>
    )
}

export default PaymentSucccess