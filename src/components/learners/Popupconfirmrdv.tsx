import courier from "@assets/apprenants/dashboard/courrier.png";
import warning from "@assets/apprenants/dashboard/erreur.png";
import { addAppointments } from "../../api/learner/disponibility";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router";
import { imageUrl } from "@/api";

interface PopupconfirmrdvProps {
  selectedSlots?: any[];
  onClose: () => void;
  instructor: any;
  handleClose: () => void;
}

const Popupconfirmrdv = ({ selectedSlots = [],onClose,instructor,handleClose, }: PopupconfirmrdvProps) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [takeSubscription, setTakeSubscription] = useState(false);
  const navigate = useNavigate();
  // console.log(instructor)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white p-6 pb-0 z-10">
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 text-2xl text-gray-600 hover:text-black"
          >
            &times;
          </button> */}
          
          <div className="mb-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-semibold">
              <img src={courier} alt="courrier" className="w-6 h-6 md:w-8 md:h-8" />
              Confirmez votre rdv
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-0">
          {/* Profile Picture */}
          <div className="flex flex-col items-center justify-center my-4">
            {instructor.photo ? (
              <img
                src={`${imageUrl}${instructor.photo}`}
                alt={`${instructor.firstname} ${instructor.lastname}`}
                className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full bg-gray-400 text-2xl md:text-3xl font-bold text-white">
                {instructor.firstname?.charAt(0)}
                {instructor.lastname?.charAt(0)}
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="text-[#616161] mb-6 space-y-2 text-sm">
            <div className="flex flex-col sm:flex-row justify-between border-b py-3 gap-1">
              <span className="font-medium">Moniteur</span>
              <span className="font-semibold text-right sm:text-left">
                {instructor.firstname
                  ? `${instructor.firstname} ${instructor.lastname}`
                  : instructor.name}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b py-3 gap-1">
              <span className="font-medium">Véhicule</span>
              <span className="font-semibold text-right sm:text-left">
                {selectedSlots?.[0]?.vehicle
                  ? `${selectedSlots[0].vehicle.brand} ${selectedSlots[0].vehicle.model} – ${selectedSlots[0].vehicle.plate_number ?? "AA-123-AA"}`
                  : "Aucun véhicule renseigné"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b py-3 gap-1">
              <span className="font-medium">Point de rendez-vous</span>
              <span className="font-semibold text-right sm:text-left">
                {selectedSlots?.[0]?.meeting_point?.address
                  ? selectedSlots[0].meeting_point.address
                  : "inconnu"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b py-3 gap-1">
              <span className="font-medium">Date & Heure</span>
              <span className="font-semibold text-right sm:text-left">
                {Array.isArray(selectedSlots) && selectedSlots.length > 0
                  ? selectedSlots
                      .map((slot) => {
                        let dateStr = "";
                        if (slot.day) {
                          dateStr = slot.day;
                        } else if (slot.date) {
                          try {
                            const dateObj = new Date(slot.date);
                            dateStr = dateObj.toLocaleDateString("fr-FR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            });
                          } catch {
                            dateStr = slot.date;
                          }
                        }
                        let heureStr = "";
                        if (slot.time) {
                          heureStr = slot.time;
                        } else if (slot.start_time && slot.end_time) {
                          heureStr = `${slot.start_time} - ${slot.end_time}`;
                        }
                        return `${dateStr}${heureStr ? " | " + heureStr : ""}`;
                      })
                      .join(", ")
                  : "Aucun créneau sélectionné"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between border-b py-3 gap-1">
              <span className="font-medium">Type de boîte</span>
              <span className="font-semibold text-right sm:text-left">
                {selectedSlots?.[0]?.vehicle?.gearbox_type === 'automatic' ? 'Automatique' :
                 selectedSlots?.[0]?.vehicle?.gearbox_type === 'manual' ? 'Manuelle' : 
                 'Non spécifié'}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={async () => {
                setLoading(true);
                if (!token) {
                  setLoading(false);
                  return;
                }
                try {
                  let lastData = null;
                  for (const slot of selectedSlots) {
                    lastData = await addAppointments(slot.id, token);
                  }
                  if (lastData && lastData.success) {
                    toast.success("Votre rendez-vous a bien été confirmé !");
                    onClose();
                    handleClose();
                  } else if(lastData.etat === 'notSubscription') {
                    toast.error(lastData.message);
                    setTakeSubscription(true); 
                  } else {
                    toast.error(lastData.message);
                  }
                } catch (error) {
                  setTakeSubscription(true);
                  toast.error("Erreur lors de la confirmation du rendez-vous.");
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              }}
              className="w-full rounded-full bg-gradient-to-r from-purple-500 to-[#6c61f6] py-3 font-semibold text-white"
              disabled={loading}
            >
              {loading ? "Confirmation en cours..." : "Confirmer ce rendez-vous"}
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-full bg-[#bcadfc] py-3 font-semibold text-[#463be2]"
            >
              Modifier
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center text-center text-xs sm:text-sm font-semibold">
            <img
              className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
              src={warning}
              alt="attention"
            />{" "}
            <p>
              Merci d'arriver 5 minutes en avance avec votre pièce d'identité.
            </p>
          </div>
        </div>

        {/* Modale de souscription */}
        {takeSubscription && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-lg">
              <button
                onClick={() => setTakeSubscription(false)}
                className="absolute right-4 top-4 text-xl text-gray-600 hover:text-black"
              >
                &times;
              </button>
              
              <div className="flex flex-col items-center justify-center pt-6">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    />
                  </svg>
                </div> 
                <div className="mb-4 text-center text-base font-semibold">
                  Vous devez souscrire à une offre pour réserver ce rendez-vous.
                </div>
                <div className="mt-4 flex w-full flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-[#6c61f6] py-2 font-semibold text-white shadow-lg shadow-purple-300/50"
                    onClick={() => {
                      setTakeSubscription(false);
                      navigate("/learners/boutique");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
                      />
                    </svg>
                    Boutique
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gray-200 py-2 font-semibold text-gray-700 shadow-lg shadow-gray-300/50"
                    onClick={() => setTakeSubscription(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      /> 
                    </svg>
                    Annuler
                  </button> 
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popupconfirmrdv;