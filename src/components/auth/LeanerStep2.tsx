import { Formik, Form, Field } from "formik";
import { step2LearnerSchema, RegisterFormData } from "@utils/validations/registerShema";
import ErrorField from "@components/generales/authentification/register/apprenant-profile/ErrorField";

import man_icon from "@assets/authentification/register/man-icon.svg";
import woman_icon from "@assets/authentification/register/wooman-icon.svg";
import other_icon from "@assets/authentification/register/other-icon.svg";
import flag from "@assets/authentification/register/flag.png";
import arrow_right from "@assets/authentification/register/arrow_right.svg";
import arrow_right_white from "@assets/authentification/register/arrow_right_white.svg";

interface LeanerStep2Props {
  setStep: (step: number) => void;
  onDataChange: (data: Partial<RegisterFormData>) => void;
  formData: Partial<RegisterFormData>;
  setType: (type: string) => void;
}

const LeanerStep2 = ({ setStep, onDataChange, formData, setType }: LeanerStep2Props) => {
  const handleSubmit = (values: Partial<RegisterFormData>) => {
    onDataChange(values);
    setStep(3);
  };

  return (
    <div className="w-full space-y-[8px] sm:px-6 lg:px-8 pb-8">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setType("");
          }}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Retour"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-black text-[20px] lg:text-3xl md:text-[36px] leading-[120%] font-[700]">
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
        }}
        validationSchema={step2LearnerSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize={true}
      >
        {({ errors, touched, isValid, dirty, values }) => (
          <Form className="flex flex-col items-start gap-[12px]">
            {/* Prénom */}
            <div className="w-full space-y-[4px]">
              <label
                htmlFor="firstName"
                className="text-[14.73px] lg:text-[18px] font-medium text-black"
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
                className="text-[14.73px] lg:text-[18px] font-medium text-black"
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
              <label className="text-[14.73px] lg:text-[20px] font-semibold text-black">
                Je suis :
              </label>

              <div className="w-full flex flex-row md:gap-3 gap-6">
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
                    className={`w-full cursor-pointer bg-[#F1F0F4] p-[10px] rounded-[12px] flex items-center justify-center gap-2 focus:ring-2 border-2 transition-all ${
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

                    <span className="text-[9.82px] lg:text-[16px] text-[#616161] font-medium">
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
            <div className="w-full space-y-[4px]">
              <label
                htmlFor=""
                className="leading-[140%] font-semibold text-black text-[14.73px] lg:text-[18px]"
              >
                Date de naissance
              </label>

              <div className="w-full flex flex-row items-center justify-between gap-2">
                <div>
                  <Field
                    type="text"
                    name="day"
                    id="day"
                    placeholder="JJ"
                    className={`p-[10px] border-[1px] w-full md:max-w-[197.33px] text-center border-[#9E9E9E] rounded-[8px] text-[#757575] font-[400] leading-[140%] text-lg outline-none ${
                      touched?.day && errors?.day
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
                    className={`p-[10px] border-[1px] w-full md:max-w-[197.33px] text-center border-[#9E9E9E] rounded-[8px] text-[#757575] font-[400] leading-[140%] text-lg outline-none ${
                      touched?.month && errors?.month
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
                    className={`p-[10px] border-[1px] w-full md:max-w-[197.33px] text-center border-[#9E9E9E] rounded-[8px] text-[#757575] font-[400] leading-[140%] text-lg outline-none ${
                      touched?.year && errors?.year
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
                className="text-[14.73px] lg:text-[18px] font-medium text-black"
              >
                Numéro de téléphone
              </label>

              <div className="relative">
                <Field
                  name="phone"
                  type="tel"
                  placeholder="+33 X 00 00 00 00"
                  className={`w-full pl-12 rounded-md p-[10px] outline-none ${
                    touched.phone && errors.phone
                      ? "border-[1.5px] border-red-500"
                      : "border-[1px] border-[#9E9E9E]"
                  }`}
                />

                <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                  <img src={flag} alt="flag" className="w-[24px] h-auto" />
                </div>
              </div>

              <ErrorField name="phone" />
            </div>

            {/* Bouton */}
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className={`mt-3 w-full lg:w-1/2 px-4 py-3 rounded-[100px] font-semibold text-[14.07px] lg:text-lg flex items-center justify-center gap-3 border-[1px] ${
                  isValid && dirty
                    ? "bg-[#6C61F6] border-[0.5px] border-[#8979F9] text-white"
                    : "bg-[#9E9E9E]/70 text-[#757575] cursor-not-allowed"
                }`}
                disabled={!(isValid && dirty)}      
              >
                <span>Continuer</span>

                <img
                  src={isValid && dirty ? arrow_right_white : arrow_right}
                  alt="arrow"
                  className="w-[24px] "
                />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LeanerStep2;
