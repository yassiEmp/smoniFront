import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  step4Schema,
  RegisterFormData,
} from "@utils/validations/registerShema";
import ErrorField from "@components/generales/authentification/register/apprenant-profile/ErrorField";
import { Eye, EyeOff } from "lucide-react";
import CustomCheckbox from "@components/generales/CustomCheckbox";

import arrow_right from "@assets/authentification/register/arrow_right_white.svg";
import ConfirmationPopUp from "@components/generales/authentification/register/monitor-profile/ConfirmationPopUp";
import { registerInstructor } from "../../api/auth";
interface MonitorStep5Props {
  onDataChange?: (data: Partial<RegisterFormData>) => void;
  formData?: Partial<RegisterFormData>;
  setStep: (step: number) => void;
}

const MonitorStep5 = ({
  onDataChange,
    formData = {},
  setStep,
}: MonitorStep5Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values: Partial<RegisterFormData>) => {
    setLoading(true);
    const finalFormData = {
      ...formData,
      ...values,
    };

    if (onDataChange) {
      onDataChange(values);
    }

    // console.log(finalFormData);
    // return;
    await registerInstructor(finalFormData, "monitor", setShowPopup, setEmail);

    setLoading(false);
    // setStep(1);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/connexion");
  };

  return (
    <div className="w-full space-y-[28px]">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setStep(4)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Retour"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-[18px] lg:text-[28px] font-[700] leading-[120%] text-black md:text-[36px]">
          Finalisez votre compte
        </h2>
      </div>

      <div className="space-y-[8px]">
        <p className="text-[14px] lg:text-[16px] font-[400] leading-[140%] text-black">
          …et connectez-vous à l'expérience SMONI : simple, rapide, efficace.
        </p>
      </div>

      {/* <button className="flex w-full items-center justify-center gap-[18.68px] rounded-full border-2 border-gray-300 bg-[#F5F5F5] py-2.5 text-[14.01px] lg:text-sm font-bold hover:bg-gray-50">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-6 w-6"
        />
        M'inscrire avec Google
      </button> */}

      <div className="relative flex items-center justify-center">
        {/* <div className="absolute w-full border-t border-[#757575]"></div>

        <span className="relative bg-white px-3 text-center text-[12px] lg:text-[16px] font-[600] text-[#757575]">
          ou m'inscrire avec mon mail
        </span> */}
      </div>

      <Formik
        initialValues={{
          email: formData.email || "",
          password: formData.password || "",
          receiveNewsletter: formData.receiveNewsletter || false,
          acceptTerms: formData.acceptTerms || false,
        }}
        validationSchema={step4Schema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col items-start gap-[12px]">
            <div className="w-full space-y-[4px]">
              <label
                htmlFor="email"
                className="text-[14.73px] lg:text-[18px] font-medium text-black"
              >
                Adresse Mail
              </label>

              <Field
                id="email"
                name="email"
                type="text"
                placeholder="Entrez votre adresse mail ici"
                className={`w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-[18px] ${
                  touched.email && errors.email
                    ? "border-[1.5px] border-red-500"
                    : "border-[1px] border-[#9E9E9E]"
                }`}
              />

              <ErrorField name="email" />
            </div>

            <div className="w-full space-y-[4px]">
              <label
                htmlFor="password"
                className="text-[14.73px] lg:text-[18px] font-medium text-black"
              >
                Mot de passe
              </label>

              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez un mot de passe"
                  className={`relative w-full rounded-md p-[10px] outline-none text-[14.73px] lg:text-[18px] ${
                    touched.password && errors.password
                      ? "border-[1.5px] border-red-500"
                      : "border-[1px] border-[#9E9E9E]"
                  }`}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  aria-label={
                    showPassword
                      ? "Cacher le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              <ErrorField name="password" />
            </div>

            <div className="space-y-3">
              {/* Première checkbox */}
              {/* <CustomCheckbox
                name="receiveNewsletter"
                label="Je souhaite recevoir les bons plans et actus SMONI"
              /> */}

              {/* Deuxième checkbox */}
              <CustomCheckbox
                name="acceptTerms"
                label="J'accepte et je comprends les Conditions Générales d'Utilisation"
              />

              {touched.acceptTerms && errors.acceptTerms && (
                <div className="mt-1 text-xs text-red-500">
                  {errors.acceptTerms}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex w-full items-center justify-center gap-3 rounded-full border-[1px] bg-[#6C61F6] px-4 py-3 text-[14.07px] lg:text-lg font-semibold text-[#FDFDFD] hover:opacity-90 disabled:opacity-50"
            >
              <span>
                {loading ? "Inscription en cours..." : "Continuer"}
              </span>

              {!loading && (
                <img
                  src={arrow_right}
                  alt="arrow"
                  className="h-auto w-[24px] object-cover"
                />
              )}
            </button>

            <div className="flex w-full items-center justify-center gap-1 text-center text-[12px] lg:text-sm font-[400] leading-[140%] text-black/80">
              Vous avez déja un compte ?
              <Link
                to="/connexion"
                className="text-[12px] lg:text-sm font-medium text-black hover:underline"
              >
                Me connecter
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      <div className="bg-black/40">
        {showPopup && <ConfirmationPopUp onClose={() => {handlePopupClose()}} email={email} />}
      </div>
    </div>
  );
};

export default MonitorStep5;
