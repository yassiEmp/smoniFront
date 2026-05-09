import ErrorField from "@components/generales/authentification/register/apprenant-profile/ErrorField";
import { monitorStep3Schema } from "@utils/validations/registerShema";
import { Field, Formik, Form } from "formik";
import { useEffect, useState, useRef } from "react";
import { meetingPoints } from "@/types/data";
import { MeetingPointType } from "@/types/monitor/settings/configuration";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';

import arrow_right from "@assets/authentification/register/arrow_right.svg";
import arrow_right_white from "@assets/authentification/register/arrow_right_white.svg";

// Correction pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MonitorStep2Props {
  setStep: (step: number) => void;
  onDataChange: (data: Partial<{
    address: string;
    workZone: string;
    selectedWorkZones: MeetingPointType[];
  }>) => void;
  formData: Partial<{ address: string; workZone: string; city: string; }>;
}

const MonitorStep2 = ({ setStep, onDataChange, formData }: MonitorStep2Props) => {
  const [selectedPoints, setSelectedPoints] = useState<MeetingPointType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setFieldValueRef = useRef<(field: string, value: string) => void>(null);

  useEffect(() => {
    if (setFieldValueRef.current) {
      setFieldValueRef.current("workZone", selectedPoints.map(p => p.label).join(", "));
    }
  }, [selectedPoints]);

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

  const handleSelectPoint = (point: MeetingPointType) => {
    if (selectedPoints.some(p => p.id === point.id)) {
      setSelectedPoints(prev => prev.filter(p => p.id !== point.id));
    } else if (selectedPoints.length < 3) {
      setSelectedPoints(prev => {
        const newPoints = [...prev, point];
        if (newPoints.length === 3) {
          setIsDropdownOpen(false);
        }
        return newPoints;
      });
    }
    setSearchTerm("");
  };

  const filteredPoints = meetingPoints.filter(point => 
    point.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.postal_code.includes(searchTerm)
  );

  const removePoint = (id: number | undefined) => {
    setSelectedPoints(prev => prev.filter(p => p.id !== id));
  };

  // Calculer le centre de la carte basé sur les points sélectionnés
  const getMapCenter = (): LatLngTuple => {
    if (selectedPoints.length === 0) {
      return [48.8566, 2.3522]; 
    }
    
    const avgLat = selectedPoints.reduce((sum, point) => sum + point.latitude, 0) / selectedPoints.length;
    const avgLng = selectedPoints.reduce((sum, point) => sum + point.longitude, 0) / selectedPoints.length;
    
    return [avgLat, avgLng];
  };


  return (
    <div className="w-full space-y-[28px] pb-12">
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
        <h2 className="text-black text-[18px] lg:text-[28px] leading-[120%] font-[700]">
          Où souhaitez-vous donner vos cours ?
        </h2>
      </div>

      <Formik
        initialValues={{
          city: formData.city || "",
          address: formData.address || "",
          workZone: formData.workZone || "",
        }}
        validationSchema={monitorStep3Schema}
        onSubmit={(values) => {
          onDataChange({
            ...values,
            workZone: selectedPoints.map(p => p.label).join(", "),
            selectedWorkZones: selectedPoints
          });
          setStep(4);
        }}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ errors, touched, isValid, dirty, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;
          return (
            <Form className="flex flex-col items-start gap-[12px]">
              <div className="w-full space-y-[4px]">
                <label
                  htmlFor="city"
                  className="text-[14px] lg:text-[18px] font-medium text-black"
                >
                  Veuillez renseigner votre ville
                </label>

                <Field
                  name="city"
                  type="text"
                  placeholder="Entrer votre ville ici"
                  className={`w-full rounded-md p-[10px] outline-none ${
                    touched.city && errors.city
                      ? "border-[1.5px] border-red-500"
                      : "border-[1px] border-[#9E9E9E]"
                  }`}
                />

                <ErrorField name="city" />
              </div>

              <div className="w-full space-y-[4px]">
                <label
                  htmlFor="address"
                  className="text-[14px] lg:text-[18px] font-medium text-black"
                >
                  Où résidez vous ?
                </label>

                <Field
                  name="address"
                  type="text"
                  placeholder="Entrer votre adresse ici"
                  className={`w-full rounded-md p-[10px] outline-none ${
                    touched.address && errors.address
                      ? "border-[1.5px] border-red-500"
                      : "border-[1px] border-[#9E9E9E]"
                  }`}
                />

                <ErrorField name="address" />
              </div>

              <div className="w-full space-y-[4px]">
                <label
                  htmlFor="workZone"
                  className="text-[14px] lg:text-[18px] font-medium text-black"
                >
                  Veuillez sélectionner vos zone(s) de travail (3 choix possibles)
                </label>

                  <div className="relative w-full" ref={dropdownRef}>
                    <Field 
                      type="hidden" 
                      name="workZone" 
                    value={selectedPoints.map(p => p.label).join(", ")} 
                    />
                    
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center justify-between w-full rounded-md p-[10px] outline-none ${
                        touched.workZone && errors.workZone
                          ? "border-[1.5px] border-red-500"
                          : "border-[1px] border-[#9E9E9E]"
                      }`}
                    >
                    <span className={`${selectedPoints.length === 0 ? "text-gray-500" : "text-black"}`}>
                      {selectedPoints.length === 0 
                          ? "Mairie de l'île de france" 
                        : `${selectedPoints.length} zone${selectedPoints.length > 1 ? 's' : ''} sélectionnée${selectedPoints.length > 1 ? 's' : ''}`}
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
                          placeholder="Rechercher une zone..."
                            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                        {filteredPoints.length > 0 ? (
                          filteredPoints.map(point => (
                              <div
                              key={point.id}
                              onClick={() => handleSelectPoint(point)}
                                className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                                selectedPoints.some(p => p.id === point.id) 
                                    ? "bg-blue-50" 
                                    : ""
                                }`}
                              >
                              <span>{point.label} - {point.city}</span>
                              {selectedPoints.some(p => p.id === point.id) && (
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
                          <div className="p-2 text-center text-gray-500">Aucune zone trouvée</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                {selectedPoints.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Zones sélectionnées ({selectedPoints.length}/3):</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedPoints.map((point) => (
                        <div 
                          key={point.id}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                        >
                          <span className="text-sm">{point.label}</span>
                          <button 
                            type="button"
                            onClick={() => removePoint(point.id)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ErrorField name="workZone" />
              </div>

              <div className="w-full h-[362px] border-[1px] rounded-[12px] z-0">
                <MapContainer
                  key={`map-${selectedPoints.length}-${selectedPoints.map(p => p.id).join('-')}`}
                  center={getMapCenter()}
                  zoom={6}
                  scrollWheelZoom={false}
                  style={{ width: '100%', height: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {selectedPoints.map(point => (
                    <Marker
                      key={point.id}
                      position={[point.latitude, point.longitude]}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <h3 className="font-semibold text-lg">{point.label}</h3>
                          <span className="text-sm text-gray-600">{point.address}</span>
                          <br />
                          <span className="text-sm text-gray-600">{point.city} - {point.postal_code}</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className={`mt-3 w-full lg:w-1/2 px-4 py-3 rounded-[100px] font-semibold lg:text-lg flex items-center justify-center gap-3 border-[1px] ${
                    isValid && dirty && selectedPoints.length > 0
                      ? "bg-[#6C61F6] text-white"
                      : "bg-[#9E9E9E]/80 text-[#757575] cursor-not-allowed"
                  }`}
                  disabled={!(isValid && dirty && selectedPoints.length > 0)}
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

export default MonitorStep2;
