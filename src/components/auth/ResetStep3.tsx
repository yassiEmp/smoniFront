import Vector from "@assets/authentification/reset/Vector-red.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Formik } from "formik";
import * as yup from "yup";
import { updatePassword } from "@/api/auth";
import { useNavigate } from "react-router";

interface ResetStep3Props {
  email: string;
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
}

const ResetStep3 = ({ email, setStep, setEmail }: ResetStep3Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const LoginInitialValue = {
    password: "",
    confirmPassword: ""
  };

  const schemaValidation = yup.object({
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .required("Le mot de passe est obligatoire"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
      .required('La confirmation du mot de passe est obligatoire')
  });

  return (
    <div className="flex w-full justify-center bg-white py-6 md:min-h-[612px] md:py-12">
      <div className="max-w-[612px]">
        <div className="space-y-[8px] md:space-y-[48px]">
          <div className="flex items-center space-x-[8px]">
            <h1 className="text-[20px] font-bold md:text-[36px] lg:text-[26px]">
              Réinitialisez votre mot de passe
            </h1>
          </div>
          <div className="space-y-[24px]">
            <p className="text-[14px] leading-[140%] lg:text-lg">
              Veuillez saisir un nouveau mot de passe sécurisé pour votre compte.
            </p>
            <p className="text-[14px] leading-[140%] lg:text-lg">
              Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
            </p>
            <Formik
              initialValues={LoginInitialValue}
              validationSchema={schemaValidation}
              onSubmit={async (values, { setSubmitting }) => {
                setIsLoading(true);
                await updatePassword(email, values.password, setStep, setEmail, navigate);
                setTimeout(() => {
                  setIsLoading(false);
                  setSubmitting(false);
                }, 1500);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                dirty
              }) => (
                <form action="" onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-[6px]">
                      <label
                        htmlFor="password"
                        className="text-[14.73px] font-medium leading-[140%] lg:text-lg"
                      >
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Entrez un mot de passe"
                          className="h-[57px] w-full rounded-md border border-gray-300 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={22} />
                          ) : (
                            <Eye size={22} />
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-red-600">
                          <img
                            src={Vector}
                            alt="Erreur"
                            className="h-auto w-[14px]"
                          />
                          <span>{errors.password}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-[6px]">
                      <label
                        htmlFor="confirmPassword"
                        className="text-[14.73px] font-medium leading-[140%] lg:text-lg"
                      >
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                          placeholder="Confirmez votre mot de passe"
                          className="h-[57px] w-full rounded-md border border-gray-300 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={22} />
                          ) : (
                            <Eye size={22} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-red-600">
                          <img
                            src={Vector}
                            alt="Erreur"
                            className="h-auto w-[14px]"
                          />
                          <span>{errors.confirmPassword}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !isValid || !dirty || isSubmitting}
                    className={`mt-[32px] flex w-full items-center justify-center rounded-[100px] py-[18px] text-[14.07px] font-semibold leading-[140%] tracking-[0px] lg:text-lg ${
                      !isValid || !dirty || isSubmitting || isLoading
                        ? "cursor-not-allowed bg-gray-300 text-[#757575]"
                        : "bg-[#6C61F6] text-white hover:bg-violet-700"
                    }`}
                  >
                    {isLoading ? (
                      <span className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    ) : (
                      "Réinitialiser mon mot de passe"
                    )}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetStep3;
