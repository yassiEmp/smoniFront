import { useState } from "react";
import formImage from "@assets/authentification/form-image-1.png";
import smoni_logo from "@assets/authentification/smoni-logo.svg";
import ProgressBar from "@components/generales/authentification/register/apprenant-profile/ProgressBar";
import prof_icon from "@assets/authentification/register/prof-icon.png";
import conducteur_icon from "@assets/authentification/register/conducteur-icon.png";
import MonitorStep1 from "@components/auth/monitorStep1";
import MonitorStep2 from "@components/auth/monitorStep2";
import MonitorStep3 from "@components/auth/monitorStep3";
import MonitorStep5 from "@components/auth/monitorStep5";
import LeanerStep2 from "@components/auth/LeanerStep2";
import LeanerStep3 from "@components/auth/LeanerStep3";
import LeanerStep4 from "@components/auth/LeanerStep4";
import { RegisterFormData, initialRegisterValues } from "@utils/validations/registerShema";
import { Link } from "react-router";

const RegisterPage = () => {
  const [type, setType] = useState<string | null>("");
  const [step, setStep] = useState<number>(1); 
  const [formData, setFormData] = useState<Partial<RegisterFormData>>(initialRegisterValues);
  const totalSteps = type === "monitor" ? 5 : 4;
  const handleStepData = (stepData: Partial<RegisterFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };


  return (
    <div className="h-screen w-full items-start justify-between bg-white p-4 md:flex">
      <div className="top-10 flex w-full items-center md:justify-center md:sticky md:h-full lg:w-1/3">
        <img
          src={formImage}
          alt="Image"
          className="hidden h-[250px] w-full rounded-[20px] object-cover md:block md:h-full"
        /> 

        <img
          src={smoni_logo}
          alt="Smoni Logo"
          className="left-6 top-6 h-auto w-[136px] object-cover pb-6 md:absolute"
        />
      </div>

      <div className="flex h-full w-full flex-col items-center pt-10 md:overflow-y-auto md:p-1 lg:w-2/3">
        <div className="max-w-[612px] space-y-6 md:px-3 lg:px-0">
          <ProgressBar currentStep={step} totalSteps={totalSteps} />
          {type === "" && (
            <div className="mt-[10px] w-full space-y-[28px]">
              <div className="flex gap-2">
                <Link
                  to="/connexion"
                  className=""
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" className="m-2 rounded-full hover:bg-gray-200 transition" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </Link>

                <h2 className="text-[20px] font-semibold lg:font-[700] leading-[120%] text-black lg:text-[36px]">
                  Prêt à rouler ? Choisissez votre camp et créez votre compte
                </h2>
              </div>


              <button
                onClick={() => {
                  setType("monitor");
                  setStep(2);
                }}
                className="flex w-full items-center justify-between gap-[6px] lg:gap-2.5 rounded-[12px] bg-[#F1F0F4] px-4 py-6"
              >
                <span className="font-medium text-black text-[12px] lg:text-[20px] leading-[140%]">
                  Moniteur, je suis là pour guider et partager mon savoir !
                </span>

                <img
                  src={prof_icon}
                  alt="Prof Icon"
                  className="h-auto w-[19.2px] lg:w-[32px]"
                />
              </button>

              <button
                onClick={() => {
                  setType("learner");
                  setStep(2);
                }}
                className="flex w-full items-center justify-between gap-[6px] lg:gap-2.5 rounded-[12px] bg-[#F1F0F4] px-4 py-6"
              >
                <span className="font-medium text-black text-[12px] lg:text-[20px] leading-[140%]">
                  Apprenant, je suis là pour apprendre et avancer !
                </span>

                <img
                  src={conducteur_icon}
                  alt="Conducteur Icon"
                  className="h-auto w-[19.2px] lg:w-[32px]"
                />
              </button>
            </div>
          )}

          {type === "monitor" && step === 2 && (
            <MonitorStep1 setStep={setStep} onDataChange={handleStepData} setType={setType} formData={formData} />
          )}
          {type === "monitor" && step === 3 && (
            <MonitorStep2 setStep={setStep} onDataChange={handleStepData} formData={formData} />
          )}
          {type === "monitor" && step === 4 && (
            <MonitorStep3 setStep={setStep} onDataChange={handleStepData} formData={formData} />
          )}
          {type === "monitor" && step === 5 && (
            <MonitorStep5 onDataChange={handleStepData} formData={formData} setStep={setStep} />
          )}

          {type === "learner" && step === 2 && (
            <LeanerStep2 setStep={setStep} onDataChange={handleStepData} formData={formData} setType={setType} />
          )}
          {type === "learner" && step === 3 && ( 
            <LeanerStep3 setStep={setStep} onDataChange={handleStepData} formData={formData} />
          )}
          {type === "learner" && step === 4 && (
            <LeanerStep4 formData={formData} setStep={setStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
