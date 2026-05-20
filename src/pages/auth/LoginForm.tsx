import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Formik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@components/generales/useRecaptcha";
import { Link, useParams } from "react-router";
import VectorRed from "@assets/authentification/reset/Vector-red.png";
import { toast } from "react-hot-toast";
import { loginRequest } from "../../api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"; 
const LoginForm = () => {
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const LoginInitialValue = { email: "", password: "" };

  const schemaValidation = yup.object().shape({
    email: yup
      .string()
      .email("Veuillez entrer une adresse mail valide")
      .required("champ requis"),
    password: yup
      .string()
      .required("champ requis")
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  });
  const { token } = useParams();
  const [toastShown, setToastShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token && !toastShown) {
      toast.success("Email vérifié avec succès");
      setToastShown(true);
    }
  }, [token, toastShown]);

  return (
    <div className="flex w-full items-center justify-center bg-white py-6 md:py-12">
      <div className="flex w-full max-w-[612px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-start gap-3">
          <Link to="/" className="text-[#6C61F6] text-sm font-semibold flex items-center">
            <span className="hover:underline">{" "} Retour à l'accueil</span>
          </Link>
          <h2 className="text-[20px] font-semibold text-gray-900 md:justify-start lg:text-2xl">
            Bienvenue sur Smoni
          </h2>
        </div>

        {/* <button className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-[#F5F5F5] py-4 font-bold hover:bg-gray-50">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Connexion avec Google
        </button> */}

        <div className="relative flex items-center justify-center">
          {/* <div className="absolute w-full border-t border-gray-300"></div>
          <span className="relative bg-white px-3 text-xs font-bold text-gray-500">
            ou me connecter avec mon mail
          </span> */}
        </div>
        <Formik
          initialValues={LoginInitialValue}
          validationSchema={schemaValidation}
         onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true);
            try {
              await loginRequest(values, dispatch, navigate);
             
            } catch (error) {
              // Gérer l'erreur
              console.log("Une erreur est survenue lors de la connexion", error)
            } finally {
              setIsLoading(false);
              setSubmitting(false);
            }
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700"
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
                  className={`mt-1 block w-full rounded-md p-3 focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? "border-2 border-[#F75555] focus:ring-[#F75555]"
                      : "border border-gray-300 focus:ring-violet-500"
                  }`}
                  placeholder="test.prenom@gmail.com"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 flex items-center text-[12px] font-medium text-[#F75555]">
                    <img src={VectorRed} alt="" className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`mt-1 block w-full rounded-md p-3 focus:outline-none focus:ring-2 ${
                      errors.password && touched.password
                        ? "border-2 border-[#F75555] focus:ring-[#F75555]"
                        : "border border-gray-300 focus:ring-violet-500"
                    }`}
                    placeholder="Entrez un mot de passe"
                  />

                  {errors.password && touched.password && (
                    <p className="mt-1 flex items-center text-[12px] font-medium text-[#F75555]">
                      <img src={VectorRed} alt="" className="mr-1" />
                      {errors.password}
                    </p>
                  )}

                  <div className="flex justify-center pt-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LdGzCsrAAAAALP6riK_Zfx9D2WN5vDwJLbDazej"
                      onChange={handleRecaptcha}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 top-6 -translate-y-1/2 cursor-pointer text-gray-500"
                    aria-label={
                      showPassword
                        ? "Cacher le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    name="remember"
                    className="form-checkbox h-5 w-5 rounded-sm border-2 border-[#6C61F6] text-violet-500"
                  />
                  Se souvenir de moi
                </label>
                <Link to="/reset-password" className="font-semibold underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={
                  !isValid ||
                  !dirty ||
                  isSubmitting ||
                  isLoading  ||
                  !capchaToken
                }
                className={`flex w-full items-center justify-center rounded-full py-4 font-bold transition ${
                  !isValid ||
                  !dirty ||
                  isSubmitting ||
                  isLoading ||
                  !capchaToken
                    ? "cursor-not-allowed bg-gray-300 text-[#757575]"
                    : "bg-[#6C61F6] text-white hover:bg-violet-700"
                }`}
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                ) : (
                  "Me connecter"
                )}
              </button>

              <div className="text-center text-sm font-bold">
                Vous êtes nouveau ?{" "}
                <Link
                  to="/inscription"
                  className="hover:cusor-pointer text-underline"
                >
                  <span className="underline hover:text-violet-700">
                    Créer un compte
                  </span>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
