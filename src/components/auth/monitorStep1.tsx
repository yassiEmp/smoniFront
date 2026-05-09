import { Formik, Form, Field } from "formik";
import {
  RegisterFormData,
  step2Schema,
} from "@utils/validations/registerShema";
import ErrorField from "@components/generales/authentification/register/apprenant-profile/ErrorField";

import man_icon from "@assets/authentification/register/man-icon.svg";
import woman_icon from "@assets/authentification/register/wooman-icon.svg";
import other_icon from "@assets/authentification/register/other-icon.svg";
import flag from "@assets/authentification/register/flag.png";
import arrow_right from "@assets/authentification/register/arrow_right.svg";
import arrow_right_white from "@assets/authentification/register/arrow_right_white.svg";

interface MonitorStep1Props {
  setStep: (step: number) => void;
  onDataChange: (data: Partial<RegisterFormData>) => void;
  setType: (type: string) => void;
  formData: Partial<RegisterFormData>;
}

const MonitorStep1 = ({
  setStep,
  onDataChange,
  setType,
  formData,
}: MonitorStep1Props) => {
  return (
    <div className="w-full space-y-[20px] sm:px-6 lg:px-8">
      <div className="mb-2 flex items-center gap-2 j">
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setType("");
          }}
          className="rounded-full transition hover:bg-gray-200"
          aria-label="Retour"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-[18px] font-[700] leading-[120%] text-black lg:text-[28px]">
          Vos infos personnelles
        </h2>
      </div>

      <Formik
        initialValues={{
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          gender: formData.gender || "homme",
          day: formData.day || "",
          month: formData.month || "",
          year: formData.year || "",
          phone: formData.phone || "",
          autoEntrepreneur: formData.autoEntrepreneur || "non",
        }}
        validationSchema={step2Schema}
        onSubmit={(values) => {
          onDataChange(values);
          setStep(3);
        }}
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize={true}
      >
        {({ errors, touched, isValid, values }) => (
          <Form className="flex flex-col items-start gap-[12px]">
            {/* Prénom */}
            <div className="w-full space-y-[4px]">
              <label
                htmlFor="firstName"
                className="text-[14.73px] font-medium text-black lg:text-[18px]"
              >
                Prénom
              </label>

              <Field
                name="firstName"
                type="text"
                className={`w-full rounded-md p-[10px] outline-none ${
                  touched.firstName && errors.firstName
                    ? "border-[1.5px] border-red-500"
                    : "border-[1px] border-[#9E9E9E]"
                }`}
              />

              <ErrorField name="firstName" />
            </div>

            {/* Nom */}
            <div className="w-full space-y-[4px]">
              <label
                htmlFor="lastName"
                className="text-[14.73px] font-medium text-black lg:text-[18px]"
              >
                Nom
              </label>

              <Field
                name="lastName"
                type="text"
                className={`w-full rounded-md p-[10px] outline-none ${
                  touched.lastName && errors.lastName
                    ? "border-[1.5px] border-red-500"
                    : "border-[1px] border-[#9E9E9E]"
                }`}
              />

              <ErrorField name="lastName" />
            </div>

            {/* Sexe */}
            <div className="w-full space-y-[4px]">
              <label className="text-[14.73px] font-semibold text-black lg:text-[20px]">
                Je suis :
              </label>

              <div className="flex w-full flex-row gap-3 md:gap-3 lg:gap-6">
                {[
                  { id: 1, label: "Un Homme", value: "homme", icon: man_icon },
                  {
                    id: 2,
                    label: "Une Femme",
                    value: "femme",
                    icon: woman_icon,
                  },
                  { id: 3, label: "Autre", value: "autre", icon: other_icon },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] border-2 bg-[#F1F0F4] p-[10px] transition-all focus:ring-2 ${
                      values.gender === item.value
                        ? "border-[#463BE2]"
                        : "border-transparent bg-[#F1F0F4] hover:bg-gray-200"
                    }`}
                  >
                    <Field
                      type="radio"
                      name="gender"
                      value={item.value}
                      className="hidden"
                    />

                    <span className="text-[9.82px] font-medium text-[#616161] lg:text-[16px]">
                      {item.label}
                    </span>

                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-[15.71px] md:w-[28px]"
                    />
                  </label>
                ))}
              </div>

              <ErrorField name="gender" />
            </div>

            {/* Date de naissance */}
            <div className="flex w-full flex-col space-y-[4px] md:max-w-[612px]">
              <label
                htmlFor=""
                className="text-[14.73px] font-semibold leading-[140%] text-black lg:text-[18px]"
              >
                Date de naissance
              </label>

              <div className="flex w-full flex-row items-center justify-between gap-2">
                <div>
                  <Field
                    type="text"
                    name="day"
                    id="day"
                    placeholder="JJ"
                    className={`w-full rounded-[8px] border-[1px] border-[#9E9E9E] p-[10px] text-center text-lg font-[400] leading-[140%] text-[#757575] outline-none md:max-w-[197.33px] ${
                      touched.day && errors.day
                        ? "border-[1.5px] border-red-500"
                        : "border-[1px] border-[#9E9E9E]"
                    }`}
                  />

                  <ErrorField name="day" />
                </div>

                <div>
                  <Field
                    type="text"
                    name="month"
                    id="month"
                    placeholder="MM"
                    className={`w-full rounded-[8px] border-[1px] border-[#9E9E9E] p-[10px] text-center text-lg font-[400] leading-[140%] text-[#757575] outline-none md:max-w-[197.33px] ${
                      touched.month && errors.month
                        ? "border-[1.5px] border-red-500"
                        : "border-[1px] border-[#9E9E9E]"
                    }`}
                  />

                  <ErrorField name="month" />
                </div>

                <div>
                  <Field
                    type="text"
                    name="year"
                    id="year"
                    placeholder="AAAA"
                    className={`w-full rounded-[8px] border-[1px] border-[#9E9E9E] p-[10px] text-center text-lg font-[400] leading-[140%] text-[#757575] outline-none md:max-w-[197.33px] ${
                      touched.year && errors.year
                        ? "border-[1.5px] border-red-500"
                        : "border-[1px] border-[#9E9E9E]"
                    }`}
                  />

                  <ErrorField name="year" />
                </div>
              </div>
            </div>

            {/* Téléphone */}
            <div className="w-full space-y-[4px]">
              <label
                htmlFor="phone"
                className="text-[14.73px] font-medium text-black lg:text-[18px]"
              >
                Numéro de téléphone
              </label>

              <div className="relative">
                <Field
                  name="phone"
                  type="tel"
                  placeholder="+33X00000000"
                  className={`w-full rounded-md p-[10px] pl-12 outline-none ${
                    touched.phone && errors.phone
                      ? "border-[1.5px] border-red-500"
                      : "border-[1px] border-[#9E9E9E]"
                  }`}
                />

                <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                  <img src={flag} alt="flag" className="h-auto w-[24px]" />
                </div>
              </div>

              <ErrorField name="phone" />
            </div>

            {/* Auto-entrepreneur */}
            <div className="w-full space-y-[4px]">
              <label className="text-[14.73px] font-medium text-black lg:text-[18px]">
                Êtes-vous auto-entrepreneur ?
              </label>
              <div className="flex flex-row gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Field type="radio" name="autoEntrepreneur" value="oui" className="hidden" />
                  <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    {values.autoEntrepreneur === "oui" && (
                      <span className="w-2 h-2 bg-[#463BE2] rounded-full block" />
                    )}
                  </span>
                  <span className="text-[14px] text-[#616161]">Oui</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Field type="radio" name="autoEntrepreneur" value="non" className="hidden" />
                  <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    {values.autoEntrepreneur === "non" && (
                      <span className="w-2 h-2 bg-[#463BE2] rounded-full block" />
                    )}
                  </span>
                  <span className="text-[14px] text-[#616161]">Non</span>
                </label>
              </div>
            </div>

            {/* Bouton */}
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className={`mt-3 flex w-full items-center justify-center gap-3 rounded-[100px] border-[1px] px-4 py-3 text-[14.07px] font-semibold lg:w-1/2 lg:text-lg ${
                  isValid
                    ? "bg-[#6C61F6] text-white"
                    : "cursor-not-allowed bg-[#9E9E9E]/80 text-[#757575]"
                }`}
                disabled={!isValid}
              >
                <span>Continuer</span>
                <img
                  src={isValid ? arrow_right_white : arrow_right}
                  alt="arrow"
                  className="w-[24px] text-[#757575]"
                />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MonitorStep1;
