import { deleteVehicle } from "@/api/monitor/parametre";
// import Toast, { ToastType } from "@components/generales/Toast";
import VehicleIcon from "@assets/apprenants/dashboard/vehicle.svg";
import Lottie from "lottie-react";
import loadingIcon from "@assets/lottie/loading.json";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/configureStore";
interface VehicleAddComponentProps {
    closeModal: ()=>void,
    id: number
}

const VehicleConfirmDelete = ({closeModal, id}: VehicleAddComponentProps) => {

    const { token } = useSelector((state: RootState) => state.authReducer)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleDeleteVehicle = async () => {
        setLoading(true)
        const res = await deleteVehicle(id, token, dispatch)
        if (res) {
            closeModal()
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    return (
        <div className="fixed h-full w-[100vw] top-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-5 ">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-lg relative">

                <button onClick={()=>closeModal()} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
                > &times; </button>

                {/* Header */}
                <div className="text-center mb-4">
                    <div className=" text-2xl font-semibold flex items-center justify-center gap-2">
                        <img src={VehicleIcon} alt="courrier" />
                        Confirmer suppression
                    </div>
                </div>


                <p className="text-center">Voulez-vous supprimer ce vehicule</p>
                <div className="flex md:flex-row flex-col justify-center items-center space-x-4 mt-5 px-4">
                    
                    
                    <button onClick={()=>closeModal()} className="w-full bg-[#F5F5F5] text-[#757575] py-3 rounded-full flex justify-center items-center font-semibold"> Annuler </button>
                    
                    {
                        loading ? 
                            <button className="w-full bg-[#bcadfc] text-[#463be2] py-3 rounded-full flex justify-center items-center font-semibold">
                                <Lottie animationData={loadingIcon} className="w-5" />
                            </button>
                        :
                            <button onClick={()=>handleDeleteVehicle()} className="w-full bg-[#bcadfc] text-[#463be2] py-3 rounded-full flex justify-center items-center font-semibold"> Confirmer </button>
                    }
                    
                </div>
                
            </div>
        </div>
    )
}

export default VehicleConfirmDelete