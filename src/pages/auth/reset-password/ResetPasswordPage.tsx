import ResetStep2 from "@/components/auth/ResetStep2";
import ResetStep3 from "@/components/auth/ResetStep3";
import formImage from "@assets/authentification/form-image-1.png?w=480;960&format=avif;webp;jpg&as=picture";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import smoni_logo from "@assets/authentification/smoni-logo.png";
import ResetStep1 from "@components/auth/ResetStep1";
import { useState } from "react";

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  
  return (
    <div className="flex h-screen w-full flex-col items-start justify-between bg-white p-6 md:relative md:flex-row">
      <div className="top-10 flex w-full items-center md:justify-center md:sticky lg:w-1/3 h-full">
        <ResponsivePicture
          picture={formImage}
          alt="Image"
          sizes="(min-width: 1024px) 33vw, 50vw"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hidden h-full w-full rounded-[20px] object-cover md:block"
        />

        <img
          src={smoni_logo}
          alt="Smoni Logo"
          className="left-6 top-6 flex h-auto w-[136px] items-center justify-center object-cover md:absolute"
        />
      </div>

      <div className="flex h-full w-full flex-col p-1 lg:w-2/3">
        {step === 1 && <ResetStep1 setStep={setStep} setEmail={setEmail} />}
        {step === 2 && <ResetStep2 email={email} setStep={setStep} setEmail={setEmail} />}
        {step === 3 && <ResetStep3 email={email} setStep={setStep} setEmail={setEmail} />}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
