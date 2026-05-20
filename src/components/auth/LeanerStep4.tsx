import { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  step4Schema,
  RegisterFormData,
} from "@utils/validations/registerShema";
import ErrorField from "@components/generales/authentification/register/apprenant-profile/ErrorField";
import { Eye, EyeOff } from "lucide-react";
import CustomCheckbox from "@components/generales/CustomCheckbox";
import arrow_right from "@assets/authentification/register/arrow_right_white.svg";
import RegisterConfirmationPopUp from "@components/generales/authentification/register/apprenant-profile/RegisterConfirmationPopUp";
import { registerLearner } from "../../api/auth";
import { useNavigate, Link } from "react-router";

interface LeanerStep4Props {
  formData: Partial<RegisterFormData>;
  setStep: (step: number) => void;
}

const LeanerStep4 = ({ formData, setStep }: LeanerStep4Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values: Partial<RegisterFormData>) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const finalData = {
        ...formData,
        ...values,
      } as RegisterFormData;

      const result = await registerLearner(finalData);
      if (result) {
        setSubmittedEmail(values.email || "");
        setShowPopup(true);
      } else {
        setError(
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        );
      }
    } catch (err) {
      setError(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer." +
          err,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-full space-y-[28px] pb-10 md:pb-0">
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
        <h2 className="text-[20px] lg:text-3xl font-[700] leading-[120%] text-black md:text-[36px]">
          Finalisez votre compte
        </h2>
      </div>

      <p className="text-[14px] lg:text-[16px] font-[400] leading-[140%] text-black">
        …et connectez-vous à l'expérience SMONI : simple, rapide, efficace.
      </p>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-500">{error}</div>
      )}

      {/* <button className="flex w-full items-center justify-center gap-[18.68px] rounded-full border-2 border-gray-300 bg-[#F5F5F5] py-2.5 text-[14.01px] lg:text-sm font-bold hover:bg-gray-50 md:gap-3">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-6 w-6"
        />
        Connexion avec Google
      </button> */}

      <div className="relative flex items-center justify-center">
        {/* <div className="absolute w-full border-t border-[#757575]"></div>

        <span className="relative bg-white px-3 text-center text-[12px] lg:text-[16px] font-[600] text-[#757575]">
          ou me connecter avec mon mail
        </span> */}
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
          receiveNewsletter: false,
          acceptTerms: false,
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
              {/* <CustomCheckbox
                name="receiveNewsletter"
                label="Je souhaite recevoir les bons plans et actus SMONI"
              /> */}

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
              disabled={isSubmitting}
              className="mt-3 flex w-full items-center justify-center gap-3 rounded-full border-[1px] bg-[#6C61F6] px-4 py-3 text-[14.07px] lg:text-lg font-semibold text-[#FDFDFD] hover:opacity-90 disabled:opacity-50"
            >
              <span>
                {isSubmitting ? "Inscription en cours..." : "Continuer"}
              </span>

              {!isSubmitting && (
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
        {showPopup && (
          <RegisterConfirmationPopUp
            email={submittedEmail}
            onClose={() => {
              setShowPopup(false);
              navigate("/connexion");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LeanerStep4;
