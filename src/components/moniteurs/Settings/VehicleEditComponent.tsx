import VehicleIcon from "@assets/apprenants/dashboard/vehicle.svg";
import { VehicleType } from '@mytypes/monitor/settings/configuration';
import * as Yup from 'yup'
import { FormikValues, useFormik } from 'formik';
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingIcon from "@assets/lottie/loading.json";
import { editVehicle } from "@/api/monitor/parametre";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
interface VehicleAddComponentProps {
    closeModal: ()=>void,
    gearbox_type: 'manual'|'automatic',
    data: VehicleType,
    id: number
}

const VehicleEditComponent = ({closeModal, data, gearbox_type,id}: VehicleAddComponentProps) => {
    const initialValues = {
        brand: data.brand,
        model: data.model,
        year: data.year,
        plate_number: data.plate_number,
        fuel_type: data.fuel_type,
        gearbox_type: gearbox_type,
        color: data.color || "",
        photo_url: undefined, // Pour le fichier
    };

    const validationSchema = Yup.object({
        brand: Yup.string().required('Marque obligatoire'),
        model: Yup.string().required('Modèle obligatoire'),
        year: Yup.number().min(2000).max(new Date().getFullYear()).required('Année obligatoire'),
        plate_number: Yup.string()
        .matches(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/, 'Numéro de plaque invalide (ex: AB-123-CD)')
        .required('Numéro de plaque obligatoire'),
        fuel_type: Yup.string().oneOf(['essence', 'diesel', 'électrique', 'hybride']).required("Type de caburant obligatoire"),
        gearbox_type: Yup.string().oneOf(['manual', 'automatic']).required(),
        color: Yup.string().required("Couleur obligatoire"),
        photo_url: Yup.mixed()
            .test(
                "fileType",
                "Le fichier doit être une image (jpg, jpeg, png)",
                (value) => {
                    if (!value) return true; // facultatif
                    if (typeof value === "object" && value instanceof File) {
                        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
                    }
                    return false;
                },
            ),
    });

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const { token } = useSelector((state: RootState) => state.authReducer)

    const handleEditVehicle = async (values: FormikValues) => {
        setLoading(true)
        const res = await editVehicle(values, id, token, dispatch)
        if (res) {
            closeModal()
            setLoading(false)
        } else {
            setLoading(false)
        }
      
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            handleEditVehicle(values)
        },
    });

    const generateYears = (start: number, end: number) => {
        const years = [];
        for (let y = end; y >= start; y--) {
            years.push(y);
        }
        return years;
    };

    const yearsList = generateYears(2000, new Date().getFullYear());

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

    return (
        <div className="fixed h-full w-[100vw] top-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-5 pt-40 ">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-lg relative">

                <button onClick={()=>closeModal()} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
                > &times; </button>

                {/* Header */}
                <div className="text-center mb-4">
                    <div className=" text-2xl font-semibold flex items-center justify-center gap-2">
                        <img src={VehicleIcon} alt="courrier" />
                        Modifier un vehicule
                    </div>
                </div>

                <div className='my-10'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[{ name: 'brand', label: 'Marque', placeholder:'-' },
                              { name: 'model', label: 'Modèle', placeholder:'-' },
                              // On retire plate_number ici pour le gérer en input personnalisé juste après
                              { name: 'color', label: 'Couleur', placeholder: "ex: Rouge" },
                            ].map(({ name, label, placeholder }) => (
                                <div key={name} className='mb-5'>
                                    <label htmlFor={`${name}`} className="text-black">{label}</label>
                                    <input
                                        type="text"
                                        name={name}
                                        placeholder={placeholder}
                                        id={`${name}`}
                                        value={formik.values[name as keyof typeof initialValues] as string}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border focus:border-black rounded-md p-[10px] outline-none"
                                    />
                                    {formik.touched[name as keyof typeof initialValues] && formik.errors[name as keyof typeof initialValues] && (
                                        <div className="text-red-500 text-sm">{formik.errors[name as keyof typeof initialValues]}</div>
                                    )}
                                </div>
                            ))}
                            {/* Champ personnalisé pour plate_number */}
                            <div className='mb-5'>
                                <label htmlFor="plate_number" className="text-black">Numéro de plaque</label>
                                <input
                                    type="text"
                                    name="plate_number"
                                    placeholder="ex: AB-123-CD"
                                    id="plate_number"
                                    maxLength={9}
                                    value={formik.values.plate_number}
                                    onChange={e => {
                                        const formatted = formatPlateNumber(e.target.value);
                                        formik.setFieldValue('plate_number', formatted);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full border focus:border-black rounded-md p-[10px] outline-none"
                                />
                                <div className="text-xs text-gray-600">Format attendu: AA-123-AA (les tirets sont ajoutés automatiquement)</div>
                                {formik.touched.plate_number && formik.errors.plate_number && (
                                    <div className="text-red-500 text-sm">{formik.errors.plate_number}</div>
                                )}
                            </div>

                            <div className="mb-5">
                                <label htmlFor={"year"} className="text-black">Année</label>
                                <select
                                    name="year"
                                    id="year"
                                    value={formik.values.year}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full border focus:border-black rounded-md p-[10px] outline-none"
                                >
                                    <option value="">Sélectionner une année</option>
                                    {yearsList.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                {formik.touched.year && formik.errors.year && (
                                    <div className="text-red-500 text-sm">{formik.errors.year}</div>
                                )}
                            </div>

                            <div className="mb-5">
                                <label htmlFor={"fuel_type"} className="text-black">Type de caburant</label>
                                <select
                                    name="fuel_type"
                                    id="fuel_type"
                                    value={formik.values.fuel_type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full border focus:border-black rounded-md p-[10px] outline-none"
                                >
                                    <option value="">Type de carburant</option>
                                    <option value="essence">Essence</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="électrique">Électrique</option>
                                    <option value="hybride">Hybride</option>
                                </select>
                                {formik.touched.fuel_type && formik.errors.fuel_type && (
                                    <div className="text-red-500 text-sm">{formik.errors.fuel_type}</div>
                                )}
                            </div>

                            <div className='mb-5 md:col-span-2'>
                                <label htmlFor={"gearbox_type"} className="text-black">Type de boîte</label>
                                <input
                                    type="text"
                                    name="gearbox_type"
                                    id="gearbox_type"
                                    value={formik.values["gearbox_type"] as string}
                                    disabled
                                    className="w-full border focus:border-black rounded-md p-[10px] outline-none"
                                />
                            </div>

                            {/* Champ fichier pour la photo (facultatif) */}
                            <div className="mb-5 md:col-span-2">
                                <label htmlFor="photo_url" className="text-black">
                                    Photo du véhicule (facultatif)
                                </label>
                                <input
                                    id="photo_url"
                                    name="photo_url"
                                    type="file"
                                    accept="image/*"
                                    className="w-full rounded-md border p-[10px] outline-none focus:border-black"
                                    onChange={(e) => {
                                        if (e.currentTarget.files && e.currentTarget.files[0]) {
                                            formik.setFieldValue("photo_url", e.currentTarget.files[0]);
                                        } else {
                                            formik.setFieldValue("photo_url", undefined);
                                        }
                                    }}
                                />
                                {formik.values.photo_url && typeof formik.values.photo_url === 'object' && (formik.values.photo_url as File).name && (
                                    <div className="mt-1 text-xs text-gray-600">
                                        {(formik.values.photo_url as File).name}
                                    </div>
                                )}
                                {!formik.values.photo_url && data.photo_url && (
                                    <div className="mt-1 text-xs text-gray-600">
                                        Image actuelle : {typeof data.photo_url === 'string' ? data.photo_url.split('/').pop() : ''}
                                    </div>
                                )}
                                {formik.touched.photo_url && formik.errors.photo_url && (
                                    <div className="text-red-500 text-sm">{formik.errors.photo_url}</div>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">
                            {
                                loading ? (
                                    <button disabled className="w-full bg-[#bcadfc] text-[#463be2]/50 py-3 rounded-full flex justify-center items-center font-semibold cursor-block ">
                                        <Lottie animationData={loadingIcon} className="w-5" />
                                    </button>
                                ) : (
                                    <button type="submit" className="w-full bg-[#bcadfc] text-[#463be2] py-3 rounded-full flex justify-center items-center font-semibold">
                                        Modifier
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default VehicleEditComponent