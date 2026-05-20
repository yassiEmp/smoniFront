import OtpInput from "react-otp-input";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router";
import light from "@assets/authentification/reset/Arrow-Left.png";
import VectorRed from "@assets/authentification/reset/Vector-red.png";
import { resetPassword, verifyOtp } from "@/api/auth";

interface ResetStep2Props {
  email: string;
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
}
const ResetStep2 = ({ email, setStep, setEmail }: ResetStep2Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const handleResendOtp = async () => {
    setResendOtp(true);
    await resetPassword(email, setStep, setEmail);
    setResendOtp(false);
  };
  return (
    <div className="flex w-full justify-center bg-white py-6 md:min-h-[612px] md:py-12">
      <div className="max-w-[612px]">
        <div className="space-y-[8px] md:space-y-[48px]">
          <div className="flex items-center space-x-[8px]">
            <Link to="/connexion">
              <img
                src={light}
                alt="Retour"
                className="w-5 lg:w-8"
                style={{ cursor: "pointer" }}
              />
            </Link>
            <h1 className="text-[20px] font-bold md:text-[36px] lg:text-[26px]">
              Verification code OTP
            </h1>
          </div>
          <div className="space-y-[24px]">
            <p className="text-[14px] leading-[140%] lg:text-lg">
              Un code OTP a été envoyé à votre adresse email {email}. Veuillez
              le saisir ci-dessous.
            </p>
            <p className="text-[14px] leading-[140%] lg:text-lg">
              Pour des raisons de sécurité, nous ne conservons PAS votre mot de
              passe. Soyez donc assuré que nous ne vous enverrons jamais votre
              mot de passe par courrier électronique.
            </p>
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={yup.object({
                otp: yup
                  .string()
                  .required("Champs requis")
                  .min(6, "Le code OTP doit contenir 6 chiffres")
                  .max(6, "Le code OTP doit contenir 6 chiffres"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setIsLoading(true);
                await verifyOtp(email, values.otp, setStep);
                setIsLoading(false);
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                isValid,
                dirty,
              }) => (
                <form action="" onSubmit={handleSubmit}>
                  <div className="items-center justify-center space-y-[6px]">
                    <label
                      htmlFor="email"
                      className="text-[14.73px] font-medium leading-[140%] lg:text-lg"
                    >
                      Code OTP
                    </label>
                    <OtpInput
                      value={values.otp}
                      onChange={handleChange("otp")}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={{
                        width: "70px",
                        height: "70px",
                        border: "1px solid #6C61F6",
                        borderRadius: "8px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#6C61F6",
                        backgroundColor: "#fff",
                      }}
                      containerStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    />
                  </div>
                  {errors.otp && touched.otp && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-red-600">
                      <img
                        src={VectorRed}
                        alt="Erreur"
                        className="h-auto w-[14px]"
                      />
                      <span>{errors.otp}</span>
                    </div>
                  )}
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
                      "Vérifier"
                    )}
                  </button>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendOtp}
                      className="mt-4 text-sm text-black hover:text-violet-700"
                    >
                      {resendOtp ? (
                        "Veuillez patienter..."
                      ) : (
                        "Renvoyer le code OTP"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="mt-4 text-sm text-black hover:text-violet-700"
                    >
                      Changer d'adresse email
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetStep2;
