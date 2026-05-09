import VehicleIcon from "@assets/apprenants/dashboard/vehicle.svg";
import { VehicleType } from "@mytypes/monitor/settings/configuration";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form, FieldProps } from "formik";
import { useState, useEffect } from "react";
import { addNewVehicle } from "@/api/monitor/parametre";
import Lottie from "lottie-react";
import loadingIcon from "@assets/lottie/loading.json";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/configureStore";

interface VehicleAddComponentProps {
  closeModal: () => void;
  gearbox_type: "manual" | "automatic";
}

type VehicleFormType = VehicleType;

const VehicleAddComponent = ({
  closeModal,
  gearbox_type,
}: VehicleAddComponentProps) => {
  const initialValues = {
    brand: "",
    model: "", 
    year: new Date().getFullYear(),
    plate_number: "",
    fuel_type: "essence",
    gearbox_type: gearbox_type,
    photo_url: undefined,
    color: "",
  };

  const validationSchema = Yup.object({
    brand: Yup.string().required("Marque obligatoire"),
    model: Yup.string().required("Modèle obligatoire"),
    year: Yup.number()
      .min(1900)
      .max(new Date().getFullYear())
      .required("Année obligatoire"),
    plate_number: Yup.string()
      .matches(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/, 'Numéro de plaque invalide (ex: AB-123-CD)')
      .required('Numéro de plaque obligatoire'),
    fuel_type: Yup.string()
      .oneOf(["essence", "diesel", "électrique", "hybride"])
      .required("Type de caburant obligatoire"),
    gearbox_type: Yup.string().oneOf(["manual", "automatic"]).required(),
    photo_url: Yup.mixed()
      .required("Photo obligatoire")
      .test(
        "fileType",
        "Le fichier doit être une image (jpg, jpeg, png)",
        (value) => {
          if (!value) return false;
          if (typeof value === "object" && value instanceof File) {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type,
            );
          }
          return false;
        },
      ),
    color: Yup.string().required("Couleur obligatoire"),
  });

  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddNewVehicle = async (
    values: VehicleFormType,
    resetForm: () => void,
  ) => {
    setLoading(true);
    try {
      const res = await addNewVehicle(values, token, dispatch);
      if (res) {
        resetForm();
        closeModal();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  const generateYears = (start: number, end: number) => {
    const years = [];
    for (let y = end; y >= start; y--) {
      years.push(y);
    }
    return years;
  };

  const yearsList = generateYears(1900, new Date().getFullYear());

  // Ajoute la fonction utilitaire pour formater le numéro de plaque
  const formatPlateNumber = (value: string): string => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const firstPart = cleaned.substring(0, 2);
    const middlePart = cleaned.substring(2, 5);
    const lastPart = cleaned.substring(5, 7);
    if (cleaned.length <= 2) {
      return firstPart;
    } else if (cleaned.length <= 5) {
      return `${firstPart}-${middlePart.substring(0, middlePart.length)}`;
    } else {
      return `${firstPart}-${middlePart}-${lastPart}`;
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 top-0 z-50 flex h-full w-[100vw] items-center justify-center overflow-auto bg-black bg-opacity-50 p-5 pt-40">
      <div className="relative w-[90%] max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <button
          onClick={() => closeModal()}
          className="absolute right-4 top-4 text-xl text-gray-600 hover:text-black"
        >
          {" "}
          &times;{" "}
        </button>

        {/* Header */}
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-semibold">
            <img src={VehicleIcon} alt="courrier" />
            Ajouter un nouveau véhicule
          </div>
        </div>

        <div className="my-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) =>
              handleAddNewVehicle(values as VehicleType, resetForm)
            }
          >
            {({ isValid, dirty }) => (
              <Form>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    { name: "brand", label: "Marque", placeholder: "-" },
                    { name: "model", label: "Modèle", placeholder: "-" },
                    { name: "color", label: "Couleur", placeholder: "ex: Rouge" },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name} className="mb-5">
                      <label htmlFor={name} className="text-black">
                        {label}
                      </label>
                      <Field
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        id={name}
                        className="w-full rounded-md border p-[10px] outline-none focus:border-black"
                      />
                      <ErrorMessage
                        name={name}
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  ))}
                  {/* Field personnalisé pour plate_number */}
                  <div className="mb-5">
                    <label htmlFor="plate_number" className="text-black">
                      Numéro de plaque
                    </label>
                    <Field name="plate_number">
                      {({ field, form }: FieldProps) => (
                        <>
                          <input
                            {...field}
                            id="plate_number"
                            type="text"
                            placeholder="ex: AB-123-CD"
                            maxLength={9}
                            className="w-full rounded-md border p-[10px] outline-none focus:border-black"
                            onChange={e => {
                              const formatted = formatPlateNumber(e.target.value);
                              form.setFieldValue('plate_number', formatted);
                            }}
                          />
                          {form.values.plate_number && (
                            <div className="mt-1 text-xs text-gray-600">
                              {form.values.plate_number}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                    <div className="text-xs text-gray-600">Format attendu: AA-123-AA (les tirets sont ajoutés automatiquement)</div>
                    <ErrorMessage
                      name="plate_number"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor={"year"} className="text-black">
                      Année
                    </label>
                    <Field
                      as="select"
                      name="year"
                      id="year"
                      className="w-full rounded-md border p-[10px] outline-none focus:border-black"
                    >
                      <option value="">Sélectionner une année</option>
                      {yearsList.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor={"fuel_type"} className="text-black">
                      Type de caburant
                    </label>
                    <Field
                      as="select"
                      name="fuel_type"
                      id="fuel_type"
                      className="w-full rounded-md border p-[10px] outline-none focus:border-black"
                    >
                      <option value="">Type de carburant</option>
                      <option value="essence">Essence</option>
                      <option value="diesel">Diesel</option>
                      <option value="électrique">Électrique</option>
                      <option value="hybride">Hybride</option>
                    </Field>
                    <ErrorMessage
                      name="fuel_type"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor={"gearbox_type"} className="text-black">
                      Type de boîte
                    </label>
                    <Field
                      type="text"
                      name="gearbox_type"
                      id="gearbox_type"
                      disabled
                      className="w-full rounded-md border p-[10px] outline-none focus:border-black"
                    />
                  </div>

                  {/* Champ fichier pour la photo */}
                  <div className="mb-5">
                    <label htmlFor="photo_url" className="text-black">
                      Photo du véhicule
                    </label>
                    <Field name="photo_url">
                      {({ form }: FieldProps) => (
                        <>
                          <input
                            id="photo_url"
                            name="photo_url"
                            type="file"
                            accept="image/*"
                            className="w-full rounded-md border p-[10px] outline-none focus:border-black"
                            onChange={(e) => {
                              if (
                                e.currentTarget.files &&
                                e.currentTarget.files[0]
                              ) {
                                form.setFieldValue(
                                  "photo_url",
                                  e.currentTarget.files[0],
                                );
                              } else {
                                form.setFieldValue("photo_url", null);
                              }
                            }}
                          />
                          {form.values.photo_url && (
                            <div className="mt-1 text-xs text-gray-600">
                              {form.values.photo_url.name}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                    <ErrorMessage
                      name="photo_url"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                {/* Buttons */}
                <div className="mt-6 space-y-3">
                  {loading ? (
                    <button
                      disabled
                      className="cursor-block flex w-full items-center justify-center rounded-full bg-[#bcadfc] py-3 font-semibold text-[#463be2]/50"
                    >
                      <Lottie animationData={loadingIcon} className="w-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isValid || !dirty}
                      className="flex w-full items-center justify-center rounded-full bg-[#bcadfc] py-3 font-semibold text-[#463be2] disabled:opacity-60"
                    >
                      Ajouter
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VehicleAddComponent;
