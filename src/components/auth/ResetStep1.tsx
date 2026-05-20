import Light from "@assets/authentification/reset/Arrow-Left.png";
import VectorRed from "@assets/authentification/reset/Vector-red.png";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router";
import { resetPassword } from "@/api/auth";


const ResetStep1 = ({ setStep, setEmail }: { setStep: (step: number) => void, setEmail: (email: string) => void }) => {
  const LoginInitialValue = {
    email: "",
  };

  const schemaValidation = yup.object().shape({
    email: yup
      .string()
      .email("Veuillez entrer une adresse mail valide")
      .required("Champs requis"),
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex w-full md:min-h-[612px]  justify-center bg-white py-6 md:py-12">
      <div className="max-w-[612px]">
        <div className="space-y-[8px] md:space-y-[48px]">
          <div className="flex items-center space-x-[8px]">
            <Link to="/connexion">
              <img src={Light} alt="Retour" className="w-5 lg:w-8" style={{ cursor: "pointer" }} />
            </Link>
            <h1 className="text-[20px] lg:text-[26px] font-bold md:text-[36px]">
              Mot de passe oublié ?
            </h1>
          </div>
          <div className="space-y-[24px]">
            <p className="text-[14px] lg:text-lg leading-[140%]">
              Saisissez l'adresse mail que vous avez utilisée lors de votre
              inscription et nous vous enverrons des instructions pour
              réinitialiser votre mot de passe.
            </p>
            <p className="text-[14px] lg:text-lg leading-[140%]">
              Pour des raisons de sécurité, nous ne conservons PAS votre mot de
              passe. Soyez donc assuré que nous ne vous enverrons jamais votre
              mot de passe par courrier électronique.
            </p>
            <Formik
              initialValues={LoginInitialValue}
              validationSchema={schemaValidation}
              onSubmit={async (values, { setSubmitting }) => {
                setIsLoading(true);
                await resetPassword(values.email, setStep, setEmail);
                setIsLoading(false);
                setSubmitting(false);
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
                dirty,
              }) => (
                <form action="" onSubmit={handleSubmit}>
                  <div className="space-y-[6px]">
                    <label
                      htmlFor="email"
                      className="text-[14.73px] lg:text-lg font-medium leading-[140%]"
                    >
                      Adresse email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Entrez votre adresse mail"
                      className={`h-[57px] w-full text-[14.73px] lg:text-base rounded-xl border-2 px-4 outline-none focus:outline-none focus:ring-0 focus:ring-violet-500 ${
                        errors.email && touched.email
                          ? "border-red-500 focus:ring-red-500"
                          : values.email
                            ? "border-black focus:ring-black"
                            : "border-gray-300 focus:ring-violet-500"
                      }`}
                    />
                    {errors.email && touched.email && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-red-600">
                        <img
                          src={VectorRed}
                          alt="Erreur"
                          className="h-auto w-[14px]"
                        />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !isValid || !dirty || isSubmitting}
                    className={`mt-[32px] flex w-full items-center justify-center rounded-[100px] py-[18px] text-[14.07px] lg:text-lg font-semibold leading-[140%] tracking-[0px] ${
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

export default ResetStep1;
