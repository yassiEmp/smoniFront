import { apiUrl } from "@/api"
import { RootState } from "@/store/configureStore"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutForm from "./CheckoutForm"
import Loader from "../common/Loader"
import { makeSubscribe } from "@/api/learner/stripe"

interface PaymentProps {
    amount: number;
    serviceId: number;
    onClose: () => void;
}

const Payment = ({amount=500, serviceId, onClose}: PaymentProps) => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);
    const [subscribeError, setSubscribeError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const token = useSelector((state:RootState) => state.authReducer.token)
    const navigate = useNavigate();
    const cents = Math.round(amount * 100);
    useEffect(() => {
        fetch(`${apiUrl}create-payment-intent`, {
      credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          },
          body: JSON.stringify({ amount: cents, currency: 'eur' }), 
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [amount]);

    const handleResult = async (result: {success: boolean, error?: string, transactionId?: string}) => {
        if(result.success && result.transactionId) {
            setSuccess(true);
            setError("");
            try {
                setIsSaving(true);
                await makeSubscribe({ mode: "stripe", transaction: result.transactionId, service_id: serviceId, token });
                setSubscribeSuccess(true);
                setSubscribeError("");
                setTimeout(() => {
                  navigate("/payment-success?redirect_status=succeeded");
                }, 1200);
            } catch (e: any) {
                setSubscribeSuccess(false);
                setSubscribeError(e.message || "Erreur lors de la souscription.");
            } finally {
                setIsSaving(false);
            }
        } else if(result.success) {
            setSuccess(true);
            setError("");
        } else {
            setSuccess(false);
            setError(result.error || "Une erreur est survenue.");
        }
    }

    return (
        <div className="fixed top-0 left-0 bg-black/40 flex justify-center items-center z-50 min-h-[100vh] w-[100vw] backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-md md:max-w-2xl mx-2 animate-fadeIn">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
                <h2 className="text-xl font-bold mb-4 text-center">Paiement sécurisé</h2>
                <div className="overflow-y-auto max-h-[60vh] md:max-h-[75vh] pr-2 scrollbar-hide">
                {(stripePromise as any && clientSecret) ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm onResult={handleResult} clientSecret={clientSecret} isSaving={isSaving} />
                    </Elements>
                ) : (
                    <Loader />
                )}
                {success && subscribeSuccess && <div className="text-green-600 mt-4 text-center">Paiement et souscription réussis ! Merci pour votre achat.</div>}
                {success && subscribeError && <div className="text-red-500 mt-4 text-center">Paiement OK mais souscription échouée : {subscribeError}</div>}
                {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Payment