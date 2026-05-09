import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { AiFillExclamationCircle } from "react-icons/ai";

import formImage from "@assets/authentification/form-image-1.png";
import smoni_logo from "@assets/authentification/smoni-logo.svg";

const ForgotPassWord = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoginInitialValue = { email: "" };

  const schemaValidation = yup.object().shape({
    email: yup
      .string()
      .email("Veuillez entrer une adresse mail valide")
      .required("champ requis"),
  });


  return (
    <div className="w-full h-screen flex bg-white p-6 items-start justify-between">
      <div className="sticky top-10 w-full h-full lg:w-1/3 ">
        <img
          src={formImage}
          alt="Image"
          className="w-full h-full rounded-[20px] object-cover "
        />

        <img
          src={smoni_logo}
          alt="Smoni Logo"
          className="w-[136px] h-auto object-cover absolute top-6 left-6"
        />
      </div>

      <div className="max-w-md mx-auto w-full px-4 py-10 lg:w-2/3 overflow-y-auto p-1">
        <button className="flex items-center text-[30px] text-black mb-6 font-bold">
          <span className="mr-2">←</span>
          Mot de passe oublié ?
        </button>

        <p className="text-sm  mb-4 font-semibold">
          Saisissez l'adresse mail que vous avez utilisée lors de votre
          inscription et nous vous enverrons des instructions pour réinitialiser
          votre mot de passe.
        </p>

        <p className="text-sm  mb-6 font-semibold">
          Pour des raisons de sécurité, nous ne conservons PAS votre mot de
          passe. Soyez donc assuré que nous ne vous enverrons jamais votre mot
          de passe par courrier électronique.
        </p>

        <Formik
          initialValues={LoginInitialValue}
          validationSchema={schemaValidation}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            setTimeout(() => {
              console.log(values);
              setIsLoading(false);
              setSubmitting(false);
            }, 2000);
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-1"
                >
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Entrez votre adresse mail"
                  className={`mt-1 block w-full p-3 rounded-md focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? "border-2 border-[#F75555] focus:ring-[#F75555]"
                      : "border border-gray-300 focus:ring-violet-500"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="flex items-center text-[#F75555] text-[12px] mt-1 font-medium">
                    <AiFillExclamationCircle className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting || isLoading}
                className={`w-full py-4 rounded-full transition font-bold flex items-center justify-center
                  ${
                    !isValid || !dirty || isSubmitting || isLoading
                      ? "bg-gray-300 text-[#757575] cursor-not-allowed"
                      : "bg-[#6C61F6] hover:bg-violet-700 text-white"
                  }`}
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Réinitialiser mon mot de passe"
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default ForgotPassWord;
