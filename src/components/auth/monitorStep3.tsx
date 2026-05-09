import { Field, Form, Formik } from "formik";
import { vehicleSchema, VehicleData } from "@utils/validations/registerShema";
import ErrorField from "@components/generales/authentification/register/apprenant-profile/ErrorField";

import transmissionImage from "@assets/authentification/register/icon_car_and_key.svg";
import arrow_right_white from "@assets/authentification/register/arrow_right_white.svg";
import { useRef, useState } from "react";

interface MonitorStep3Props {
  setStep: (step: number) => void;
  onDataChange?: (data: {
    vehicles: VehicleData[];
  }) => void;
  formData: Partial<{ vehicles: VehicleData[] }>;
}

const MonitorStep3 = ({ setStep, onDataChange, formData }: MonitorStep3Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [vehicles, setVehicles] = useState<VehicleData[]>(formData.vehicles || []);
  const [isFormOpen, setIsFormOpen] = useState<boolean>((formData.vehicles || []).length === 0);

  // Vérifie les limites par type de boîte
  const automaticVehicles = vehicles.filter(v => v.transmissionType === "automatic");
  const manualVehicles = vehicles.filter(v => v.transmissionType === "manual");
  const maxAutomaticReached = automaticVehicles.length >= 1;
  const maxManualReached = manualVehicles.length >= 1;
  const bothVehiclesAdded = automaticVehicles.length > 0 && manualVehicles.length > 0;
  const canContinue = vehicles.length > 0;

  const handleDeleteVehicle = (index: number) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles.splice(index, 1);
    setVehicles(updatedVehicles);
    if (updatedVehicles.length === 0) {
      setIsFormOpen(true);
    }
  };

  const isRegistrationNumberDuplicate = (regNumber: string): boolean => {
    return vehicles.some(vehicle => vehicle.registrationNumber === regNumber);
  };

  const formatRegistrationNumber = (value: string): string => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const firstPart = cleaned.substring(0, 2);
    const middlePart = cleaned.substring(2, 5);
    const lastPart = cleaned.substring(5, 7);
    if (cleaned.length <= 2) {
      return firstPart;
    } else if (cleaned.length <= 5) {
      return `${firstPart}-${middlePart.substring(0, middlePart.length)}`;
    } else {
      return `${firstPart}-${middlePart}-${lastPart}`;
    }
  };

  // Fonction pour valider visuellement le format
  const validateRegistrationFormat = (value: string): boolean => {
    const regex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
    return regex.test(value);
  };

  // Vérifie si on peut ajouter un véhicule du type sélectionné
  const canAddVehicle = (transmissionType: string): boolean => {
    if (transmissionType === "automatic") {
      return !maxAutomaticReached;
    } else {
      return !maxManualReached;
    }
  };

  const generateYears = (start: number, end: number) => {
    const years = [];
    for (let y = end; y >= start; y--) {
      years.push(y);
    }
    return years;
  };

  const yearsList = generateYears(1900, new Date().getFullYear());

  return (
    <div className="w-full py-4 space-y-[28px]">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Retour"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-black text-[18px] lg:text-[28px] leading-[120%] font-[700]">
          Vos véhicules
        </h2>
      </div>

      {/* Affichage des limites */}
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-700">Véhicules automatiques</span>
          <span className="text-sm text-blue-600">{automaticVehicles.length}/1</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="text-sm font-medium text-green-700">Véhicules manuels</span>
          <span className="text-sm text-green-600">{manualVehicles.length}/1</span>
        </div>
      </div>

      {vehicles.length > 0 && (
        <div className="w-full">
          <h3 className="text-black text-[18px] font-medium mb-3">
            Véhicules ajoutés ({vehicles.length})
          </h3>
          <div className="space-y-4">
            {vehicles.map((vehicle, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 relative"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={transmissionImage}
                        alt="Transmission"
                        className="w-5 h-5"
                      />
                      <span className="font-medium">
                        {vehicle.transmissionType === "automatic" 
                          ? "Boite automatique" 
                          : "Boite manuelle"}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Marque:</span> {vehicle.brand}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Modèle:</span> {vehicle.model}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Immatriculation:</span> {vehicle.registrationNumber}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Année:</span> {vehicle.year}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Carburant:</span> {vehicle.fuel_type}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Couleur:</span> {vehicle.color}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {vehicle.registrationDocument && (
                      <div className="flex items-center gap-2">
                        {vehicle.registrationDocument instanceof File ? (
                          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium">{vehicle.registrationDocument.name}</span>
                          </div>
                        ) : typeof vehicle.registrationDocument === 'string' ? (
                          <div className="flex items-center gap-2">
                            <img 
                              src={vehicle.registrationDocument} 
                              alt="Photo du véhicule" 
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            />
                            <span className="text-sm text-gray-600">Photo du véhicule</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">Photo</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleDeleteVehicle(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message de succès quand les deux véhicules sont ajoutés */}
      {bothVehiclesAdded && (
        <div className="w-full p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Parfait !</h3>
              <p className="text-green-700">Vous avez ajouté un véhicule automatique et un véhicule manuel.</p>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire - masqué par défaut après le premier ajout ou quand limite atteinte */}
      {isFormOpen && !bothVehiclesAdded && (
        <Formik
          initialValues={{
            transmissionType: automaticVehicles.length === 0 ? "automatic" : "manual",
            brand: "",
            model: "",
            registrationNumber: "",
            registrationDocument: null,
            year: new Date().getFullYear(),
            fuel_type: "essence",
            color: "",
          }}
          validationSchema={vehicleSchema}
          onSubmit={(values, { resetForm, setFieldValue }) => {
            const allVehicles = [...vehicles, values];
            setVehicles(allVehicles);
            if (onDataChange) {
              onDataChange({ vehicles: allVehicles });
            }
            setFileName("");
            resetForm();
            setIsFormOpen(false);
            const nextTransmissionType = values.transmissionType === "automatic" ? "manual" : "automatic";
            setFieldValue("transmissionType", nextTransmissionType);
          }}
          validateOnBlur={true}
          validateOnChange={true}
          enableReinitialize={false}
        >
          {({
            values,
            setFieldValue,
            errors,
            touched,
            isValid,
            dirty,
            resetForm,
          }) => {
            // Vérifie si le numéro d'immatriculation actuel est un doublon
            const isDuplicate = isRegistrationNumberDuplicate(values.registrationNumber);
            const canAdd = canAddVehicle(values.transmissionType);

            return (
              <Form className="flex flex-col items-start gap-[12px]">
                <div className="w-full space-y-[4px]">
                  <label
                    htmlFor="transmissionType"
                    className="text-[14px] lg:text-[18px] font-medium text-black leading-[140%]"
                  >
                    Renseignez ici le(s) véhicule(s) que vous utilisez pour la
                    formation.
                  </label>

                  <div className="w-full flex flex-col lg:flex-row gap-6">
                    {[
                      { id: 1, label: "Boite automatique", value: "automatic" },
                      { id: 2, label: "Boite manuelle", value: "manual" },
                    ].map((item) => {
                      const isDisabled = item.value === "automatic" ? maxAutomaticReached : maxManualReached;
                      return (
                        <label
                          key={item.id}
                          className={`w-full cursor-pointer bg-[#F1F0F4] p-[10px] rounded-[6px] flex items-center justify-center gap-2.5 border-2 transition-all ${
                            isDisabled 
                              ? "opacity-50 cursor-not-allowed bg-gray-200"
                              : values.transmissionType === item.value
                              ? "border-[#463BE2]"
                              : "border-transparent bg-[#F1F0F4] hover:bg-gray-200"
                          }`}
                        >
                          <Field
                            type="radio"
                            name="transmissionType"
                            value={item.value}
                            className="hidden"
                            disabled={isDisabled}
                          />

                          <img
                            src={transmissionImage}
                            alt="Transmission Image"
                            className="w-[24px] h-auto object-cover"
                          />

                          <span className="text-[16px] text-black font-medium leading-[100%] tracking-[0.2px]">
                            {item.label}
                            {isDisabled && " (Limite atteinte)"}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <ErrorField name="transmissionType" />
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-[4px]">
                    <label
                      htmlFor="brand"
                      className="text-[14.73px] lg:text-[18px] font-medium text-black"
                    >
                      Marque
                    </label>

                    <Field
                      id="brand"
                      name="brand"
                      type="text"
                      placeholder="Ex: Renault"
                      className={`w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-base ${
                        touched.brand && errors.brand
                          ? "border-[1.5px] border-red-500"
                          : "border-[1px] border-[#9E9E9E]"
                      }`}
                    />

                    <ErrorField name="brand" />
                  </div>

                  <div className="space-y-[4px]">
                    <label
                      htmlFor="model"
                      className="text-[14.73px] lg:text-[18px] font-medium text-black"
                    >
                      Modèle
                    </label>

                    <Field
                      id="model"
                      name="model"
                      type="text"
                      placeholder="Ex: Clio"
                      className={`w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-base ${
                        touched.model && errors.model
                          ? "border-[1.5px] border-red-500"
                          : "border-[1px] border-[#9E9E9E]"
                      }`}
                    />

                    <ErrorField name="model" />
                  </div>

                  <div className="space-y-[4px]">
                    <label
                      htmlFor="registrationNumber"
                      className="text-[14.73px] lg:text-[18px] font-medium text-black"
                    >
                      Numéro d'Immatriculation
                    </label>

                    <div className="relative">
                      <input
                        id="registrationNumber"
                        name="registrationNumber"
                        type="text"
                        placeholder="Ex : AA-123-AA"
                        value={values.registrationNumber}
                        onChange={(e) => {
                          const formatted = formatRegistrationNumber(e.target.value);
                          setFieldValue("registrationNumber", formatted);
                        }}
                        maxLength={9}
                        className={`w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-base ${
                          touched.registrationNumber && errors.registrationNumber
                            ? "border-[1.5px] border-red-500"
                            : "border-[1px] border-[#9E9E9E]"
                        }`}
                      />
                      {values.registrationNumber && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {isDuplicate ? (
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : validateRegistrationFormat(values.registrationNumber) ? (
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-600">Format attendu: AA-123-AA</p>
                    {isDuplicate && (
                      <p className="text-xs text-red-500">Ce numéro d'immatriculation est déjà utilisé</p>
                    )}
                    <ErrorField name="registrationNumber" />
                  </div>

                  <div className="space-y-[4px]">
                    <label
                      htmlFor="year"
                      className="text-[14.73px] lg:text-[18px] font-medium text-black"
                    >
                      Année
                    </label>

                    <Field
                      as="select"
                      name="year"
                      id="year"
                      className={`w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-base ${
                        touched.year && errors.year
                          ? "border-[1.5px] border-red-500"
                          : "border-[1px] border-[#9E9E9E]"
                      }`}
                    >
                      <option value="">Sélectionner une année</option>
                      {yearsList.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>

                    <ErrorField name="year" />
                  </div>

                  <div className="space-y-[4px]">
                    <label
                      htmlFor="fuel_type"
                      className="text-[14.73px] lg:text-[18px] font-medium text-black"
                    >
                      Type de carburant
                    </label>

                    <Field
                      as="select"
                      name="fuel_type"
                      id="fuel_type"
                      className={`w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-base ${
                        touched.fuel_type && errors.fuel_type
                          ? "border-[1.5px] border-red-500"
                          : "border-[1px] border-[#9E9E9E]"
                      }`}
                    >
                      <option value="">Type de carburant</option>
                      <option value="essence">Essence</option>
                      <option value="diesel">Diesel</option>
                      <option value="électrique">Électrique</option>
                      <option value="hybride">Hybride</option>
                    </Field>

                    <ErrorField name="fuel_type" />
                  </div>

                  <div className="space-y-[4px]">
                    <label
                      htmlFor="color"
                      className="text-[14.73px] lg:text-[18px] font-medium text-black"
                    >
                      Couleur
                    </label>

                    <Field
                      id="color"
                      name="color"
                      type="text"
                      placeholder="ex: Rouge"
                      className={`w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-base ${
                        touched.color && errors.color
                          ? "border-[1.5px] border-red-500"
                          : "border-[1px] border-[#9E9E9E]"
                      }`}
                    />

                    <ErrorField name="color" />
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <label className="text-[14.73px] lg:text-[18px] font-medium text-black">
                    Photo du véhicule
                  </label>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full flex items-center justify-between p-3 border rounded-md cursor-pointer ${
                      touched.registrationDocument && errors.registrationDocument
                        ? "border-red-500"
                        : "border-[#9E9E9E]"
                    }`}
                  >
                    <span className={fileName ? "text-black text-[14.73px] md:text-base" : "text-gray-400 text-[14.73px] lg:text-base"}>
                      {fileName || "Uploadez la photo de votre véhicule (jpg, jpeg, png)"}
                    </span>

                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    name="registrationDocument"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFileName(file.name);
                        setFieldValue("registrationDocument", file);
                      }
                    }}
                  />
                  <ErrorField name="registrationDocument" />
                </div>

                {/* Boutons */}
                <div className="mt-6 w-full flex flex-col lg:flex-row items-center justify-between gap-6">
                  <button
                    type="button"
                    className={`w-full lg:w-1/2 text-[14px] lg:text-[18px] font-medium py-3 rounded-full ${
                      isValid && dirty && !isDuplicate && canAdd
                        ? "border border-[#D3C8FE] bg-[#D3C8FE] text-[#463BE2]"
                        : "bg-[#9E9E9E]/70 text-[#757575] cursor-not-allowed"
                    }`}
                    disabled={!(isValid && dirty) || isDuplicate || !canAdd}
                    onClick={() => {
                      if (isValid && dirty && !isDuplicate && canAdd) {
                        const allVehicles = [...vehicles, values];
                        setVehicles(allVehicles);
                        if (onDataChange) {
                          onDataChange({ vehicles: allVehicles });
                        }
                        setFileName("");
                        resetForm();
                        setIsFormOpen(false);
                      }
                    }}
                  >
                    {vehicles.length === 0 ? "Ajouter le véhicule" : !canAdd ? "Limite atteinte" : "Ajouter ce véhicule"}
                  </button>

                  {vehicles.length >= 1 && (
                    <button
                      type="button"
                      className="w-full lg:w-1/2 text-[14px] lg:text-[18px] font-medium py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsFormOpen(false);
                        setFileName("");
                        resetForm();
                      }}
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      )}

      {/* Actions après au moins un ajout */}
      {canContinue && (
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="w-full lg:w-1/2 flex items-center justify-center gap-3 py-4 rounded-xl text-[14px] lg:text-[18px] font-[600] leading-[140%] bg-gradient-to-r from-[#6C61F6] to-[#8979F9] text-white hover:from-[#8979F9] hover:to-[#6C61F6] shadow-lg transition-all duration-200"
            onClick={() => {
              if (onDataChange) {
                onDataChange({ vehicles });
              }
              setStep(5);
            }}
          >
            Continuer
            <img
              src={arrow_right_white}
              alt="Arrow Right"
              className="w-6 h-auto"
            />
          </button>

          {!isFormOpen && !bothVehiclesAdded && (
            <button
              type="button"
              className="w-full lg:w-1/2 text-[14px] lg:text-[18px] font-medium py-4 rounded-xl border border-[#D3C8FE] text-[#463BE2] bg-white hover:bg-[#F5F2FF]"
              onClick={() => setIsFormOpen(true)}
            >
              Ajouter un nouveau véhicule
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MonitorStep3;

