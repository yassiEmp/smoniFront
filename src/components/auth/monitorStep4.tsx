
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Files from "@assets/authentification/Files.png";
import ProfilCompte from "@assets/authentification/profil.png";
import Plus from "@assets/authentification/plus.png";
import Valide from "@assets/authentification/valide.png";
import { RegisterFormData } from "@utils/validations/registerShema";

// Schéma de validation
const monitorStep5Schema = Yup.object().shape({
  profilePhoto: Yup.mixed()
    .required("Une photo professionnelle est obligatoire")
    .test(
      "fileSize",
      "Le fichier est trop volumineux (max 2Mo)",
      (value) =>
        !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Seuls les formats JPG et PNG sont acceptés",
      (value) =>
        !value ||
        (value instanceof File && ["image/jpeg", "image/png"].includes(value.type))
    ),
});

interface MonitorStep4Props {
  setStep: (step: number) => void;
  onDataChange?: (data: Partial<RegisterFormData>) => void;
  formData?: Partial<RegisterFormData>;
}

const MonitorStep4 = ({ setStep, onDataChange, formData = {} }: MonitorStep4Props) => {
  return (
    <Formik
      initialValues={{
        profilePhoto: formData.profilePhoto || null,
      }}
      validationSchema={monitorStep5Schema}
      onSubmit={(values) => {
        if (onDataChange) {
          onDataChange({ profilePhoto: values.profilePhoto });
        }
        console.log("Photo de profil ajoutée:", values.profilePhoto);
        setStep(6);
      }}
    >
      {({ setFieldValue, values, isValid, dirty }) => (
        <Form className="flex justify-center items-center min-h-screen">
          <div className="max-w-[612px] flex gap-6">
            <div className="flex flex-col space-y-8 md:space-y-0 justify-between h-[661px]">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                  aria-label="Retour"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="text-[18px] lg:text-[28px] leading-[120%] font-bold">
                  Ajoutez une photo professionnelle
                </h2>
              </div>

              <PhotoUploadField values={values} setFieldValue={setFieldValue} />

              <button
                type="submit"
                className="w-full bg-[#6C61F6] py-[18px] rounded-full text-white text-lg font-semibold disabled:bg-[#9E9E9E] disabled:cursor-not-allowed"
                disabled={!isValid || !dirty}
              >
                Continuer
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Composant pour l'upload de photo
const PhotoUploadField = ({
  values,
  setFieldValue,
}: {
  values: any;
  setFieldValue: any;
}) => {
  const previewUrl = values.profilePhoto
    ? URL.createObjectURL(values.profilePhoto)
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("profilePhoto", file);
    }
  };

  return (
    <div className="bg-white border-[#424242] border rounded-[16px] py-[48px] px-5 flex flex-col items-center space-y-[32px]">
      <p className="max-w-[480px] text-center text-[14px] lg:text-[20px] leading-[140%] font-medium">
        Votre photo apparaîtra sur votre profil moniteur. C'est l'occasion de
        faire bonne impression auprès de vos futurs élèves.
      </p>

      {previewUrl ? (
        <div className="relative rounded-full">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-[75px] h-[75px] rounded-full object-cover mb-2"
          />

          <img
            src={Valide}
            alt="Validé"
            className="absolute bottom-0 -right-1 z-30"
          />
        </div>
      ) : (
        <div className="w-[50px] h-[50px] relative rounded-full">
          <img src={ProfilCompte} alt="Photo de profil par défaut" />

          <img
            src={Plus}
            alt="Ajouter"
            className="absolute bottom-0 -right-1 z-30"
          />
        </div>
      )}

      <label className="bg-black text-white text-[12px] lg:text-base flex items-center space-x-[16px] py-[18px] px-[24px] rounded-[16px] border-[#424242] border-[0.5px] cursor-pointer hover:bg-gray-800 transition-colors">
        <span className="text-white">
          {previewUrl ? "Modifier le fichier" : "Choisir un fichier"}
        </span>

        <img src={Files} alt="Icone fichiers" />

        <input
          type="file"
          name="profilePhoto"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <p className="max-w-[326px] text-center text-[12px] lg:text-sm text-gray-600">
        Format JPG ou PNG, 800x800 px recommandé, max 2 Mo — photo claire, sur
        fond neutre, avec un léger sourire (comme sur un CV).
      </p>
    </div>
  );
};

export default MonitorStep4;
