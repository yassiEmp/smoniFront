import ErrorField from "@components/generales/authentification/register/apprenant-profile/ErrorField";
import { learnerStep3Schema, RegisterFormData } from "@utils/validations/registerShema";
import { Field, Formik, Form } from "formik";
import arrow_right from "@assets/authentification/register/arrow_right.svg";
import arrow_right_white from "@assets/authentification/register/arrow_right_white.svg";
import { useEffect, useState, useRef } from "react";
import { checkZoneInstructor } from "../../api/auth";
import { meetingPoints } from '../../types/data/index';
import { MeetingPointType } from '../../types/monitor/settings/configuration';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface LeanerStep3Props {
  setStep: (step: number) => void;
  onDataChange: (data: Partial<RegisterFormData>) => void;
  formData: Partial<RegisterFormData>;
}

const LeanerStep3 = ({ setStep, onDataChange, formData }: LeanerStep3Props) => {
  const [selectedMeetingPoint, setSelectedMeetingPoint] = useState<MeetingPointType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [instructorsCount, setInstructorsCount] = useState<number>(0);
  const [checkingInstructors, setCheckingInstructors] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setFieldValueRef = useRef<(field: string, value: string) => void>(null);

  useEffect(() => {
    if (formData.address) {
      const found = meetingPoints.find(mp => mp.address === formData.address);
      if (found) {
        setSelectedMeetingPoint(found);
      }
    }
  }, [formData.address]);

  useEffect(() => {
    if (setFieldValueRef.current) {
      setFieldValueRef.current("address", selectedMeetingPoint ? selectedMeetingPoint.address : "");
      if (selectedMeetingPoint) {
        // Recherche du nombre d'instructeurs pour la ville sélectionnée
        const checkInstructorsCount = async () => {
          setCheckingInstructors(true);
          try {
            const result = await checkZoneInstructor(selectedMeetingPoint.city);
            if (result && result.success) {
              setInstructorsCount(result.countMeetingPoints || 0);
            } else {
              setInstructorsCount(0);
            }
          } catch (error) {
            setInstructorsCount(0);
            console.error("Erreur lors de la vérification des enseignants:", error);
          } finally {
            setCheckingInstructors(false);
          }
        };
        checkInstructorsCount();
      } else {
        setInstructorsCount(0);
      }
    }
  }, [selectedMeetingPoint]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSelectMeetingPoint = (mp: MeetingPointType) => {
    setSelectedMeetingPoint(mp);
    setIsDropdownOpen(false);
    setSearchTerm("");
    if (setFieldValueRef.current) {
      setFieldValueRef.current("address", mp.address);
      setFieldValueRef.current("city", mp.city);
    }
  };

  const filteredMeetingPoints = meetingPoints.filter(mp =>
    mp.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mp.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (values: Partial<RegisterFormData>) => {
    if (!values.address || values.address.length === 0) {
      console.error("address manquant!");
      return;
    }

    onDataChange(values);
    setStep(4);
  };

  return (
    <div className="w-full space-y-[8px] pb-12">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Retour"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-[20px] lg:text-3xl font-[700] leading-[120%] text-black md:text-[36px]">
          Où résidez-vous ?
        </h2>
      </div>

      <Formik
        initialValues={{
          address: formData.address || "",
          city: formData.city || "",
        }}
        validationSchema={learnerStep3Schema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ errors, touched, isValid, setFieldValue, dirty }) => {
          setFieldValueRef.current = setFieldValue;
          return (
            <Form className="flex flex-col items-start gap-[12px]">
              <div className="w-full space-y-[4px]">
                <label
                  htmlFor="address"
                  className="text-[18px] font-medium text-black"
                >
                  Choisissez un point de rendez-vous
                </label>
                <div className="relative w-full" ref={dropdownRef}>
                  <Field
                    type="hidden"
                    name="address"
                    value={selectedMeetingPoint ? selectedMeetingPoint.address : ""}
                    className="w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center justify-between w-full rounded-md p-[10px] outline-none ${touched.address && errors.address
                      ? "border-[1.5px] border-red-500"
                      : "border-[1px] border-[#9E9E9E]"
                      }`}
                  >
                    <span className={`${!selectedMeetingPoint ? "text-gray-500" : "text-black"}`}>
                      {selectedMeetingPoint ? selectedMeetingPoint.label : "Sélectionner un point de rendez-vous"}
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <div className="p-2">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                          placeholder="Rechercher un point..."
                          className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {loading ? (
                          <div className="p-4 text-center">Chargement des points...</div>
                        ) : filteredMeetingPoints.length > 0 ? (
                          filteredMeetingPoints.map(mp => (
                            <div
                              key={mp.id}
                              onClick={() => handleSelectMeetingPoint(mp)}
                              className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center ${selectedMeetingPoint && selectedMeetingPoint.id === mp.id
                                ? "bg-blue-50"
                                : ""
                                }`}
                            >
                              <span>{mp.label} ({mp.city})</span>
                              {selectedMeetingPoint && selectedMeetingPoint.id === mp.id && (
                                <svg
                                  className="w-5 h-5 ml-auto text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-center text-gray-500">Aucun point trouvé</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <ErrorField name="address" />
                <div className="relative">
                  <Field
                    type="hidden"
                    name="city"
                    value={selectedMeetingPoint ? selectedMeetingPoint.city : ""}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="rounded-[8px] border-[1px] bg-[#7BE2AB] p-[16px] text-lg font-medium leading-[140%] text-black w-full mt-2">
                <div className="w-full lg:w-[600px] min-h-[56px] flex items-center overflow-hidden">
                  {checkingInstructors ? (
                    <span className="truncate">Recherche des enseignants disponibles...</span>
                  ) : selectedMeetingPoint && instructorsCount > 0 ? (
                    <span className="line-clamp-2">Super ! Vous avez {instructorsCount} enseignant(s) proches de chez vous, commencez votre parcours dès maintenant !</span>
                  ) : selectedMeetingPoint && instructorsCount === 0 ? (
                    <span className="truncate">Aucun moniteur trouvé dans cette zone.</span>
                  ) : (
                    <span className="line-clamp-2">Sélectionnez un point de rendez-vous pour voir les moniteurs disponibles.</span>
                  )}
                </div>
              </div>

              <div style={{ zIndex: 0, position: 'relative', height: '100%', width: '100%' }}>
                <div className="h-[362px] w-full rounded-[12px] border-[1px] overflow-hidden mt-4" >
                  {selectedMeetingPoint && (
                    <MapContainer
                      center={[selectedMeetingPoint.latitude, selectedMeetingPoint.longitude]}
                      zoom={8}
                      style={{ height: '100%', width: '100%' }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />
                      <Marker position={[selectedMeetingPoint.latitude, selectedMeetingPoint.longitude]}>
                        <Popup>{selectedMeetingPoint.label}</Popup>
                      </Marker>
                    </MapContainer>
                  )}
                </div>
              </div>

              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className={`mt-3 flex w-full items-center justify-center gap-3 rounded-[100px] border-[1px] px-4 py-3 text-lg font-semibold lg:w-1/2 ${isValid && dirty
                    ? "border-[0.5px] border-[#8979F9] bg-[#6C61F6] text-white"
                    : "cursor-not-allowed bg-[#9E9E9E]/70 text-[#757575]"
                    }`}
                  disabled={!(isValid && dirty)}
                >
                  <span>Continuer</span>
                  <img
                    src={isValid && dirty ? arrow_right_white : arrow_right}
                    alt="arrow"
                    className="w-[24px] text-[#757575]"
                  />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LeanerStep3;
