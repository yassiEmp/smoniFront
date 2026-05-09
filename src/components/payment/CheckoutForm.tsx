import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"

const Spinner = () => {
    return (
        <span
            className="inline-block mt-1 animate-spin"
            style={{
                height: 15,
                width: 15,
                borderWidth: 15 / 8,
                borderColor: "#e0e0e0",
                borderTopColor: "#6C61F6",
                borderRadius: "50%",
                borderStyle: "solid",
                borderRightColor: "transparent",
            }}
        />
    )
}

interface CheckoutFormProps {
    onResult?: (result: {success: boolean, error?: string, transactionId?: string}) => void;
    clientSecret: string;
    isSaving?: boolean;
}

const CheckoutForm = ({ onResult, clientSecret, isSaving }: CheckoutFormProps) => {
    const stripe = useStripe()
    const elements = useElements()

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [isElementReady, setIsElementReady] = useState<boolean>(false)

    const runStripeProcess = async () => {
        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setError(submitError.message ?? "Erreur lors de la validation du formulaire Stripe.");
            setIsProcessing(false);
            return;
        }

        const returnUrl = `${window.location.origin}/payment-success`;
        
        const result = await stripe.confirmPayment({
            elements,
            clientSecret,
            redirect: "if_required",
            confirmParams: {
                return_url: returnUrl
            }
        });
        console.log('result', result);
        setIsProcessing(false);

        if (result.error) {
            setError(result.error.message ?? "")
            if(onResult) onResult({success: false, error: result.error.message});
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
            setError("");
            if(onResult) onResult({success: true, transactionId: result.paymentIntent.id});
        } else {
            setError("Le paiement n'a pas pu être confirmé.");
            if(onResult) onResult({success: false, error: "Le paiement n'a pas pu être confirmé."});
        }
    };

    const handleSubmit = async(e: { preventDefault: () => void }) => {
        e.preventDefault()
        await runStripeProcess()
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto overflow-x-hidden flex flex-col gap-4 scrollbar-hide">
            {!isElementReady && (
                <div className="flex justify-center items-center min-h-[80px]">
                    <Spinner />
                    <span className="ml-2 text-gray-500">Chargement du formulaire de paiement...</span>
                </div>
            )}
            <PaymentElement onReady={() => setIsElementReady(true)} style={{ display: isElementReady ? 'block' : 'none' }} />
            {isElementReady && (
                <button className="bg-[#6c61f6] text-white rounded-md px-4 py-3 mt-5 md:w-[150px] w-full flex items-center justify-center gap-2" disabled={isProcessing || isSaving} id="submit">
                    {(isProcessing || isSaving) ?<Spinner /> : 'Payer'}
                </button>
            )}
            {error && (
                <div id="error" className="text-red-500 mt-2">
                    {/* {error}  */}
                </div>
            )}
        </form>
    )
}

export default CheckoutForm