import { FaCamera, FaTrash } from "react-icons/fa";
import man_icon from "@assets/authentification/register/man-icon.svg";
import woman_icon from "@assets/authentification/register/wooman-icon.svg";
import other_icon from "@assets/authentification/register/other-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/configureStore";
import { Formik, Form, Field } from "formik";
import { useState, useRef } from "react";
import { initialUpdateMonitorValues } from "@/utils/validations/validationShema";
import { deletePhoto, updateMonitor, updatePassword, updatePhoto } from "@/api/monitor/parametre";
import { imageUrl } from "@/api";
import { handleLogout } from '@/utils/auth';
import { useNavigate } from 'react-router';
import { LogOut, Eye, EyeOff } from 'lucide-react';
import * as Yup from 'yup';
import { updateAdmin } from "@/api/admin/parametre";


const PersonnalInfromation = () => {
  const { user, token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [deletePhotoLoading, setDeletePhotoLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    phone: Yup.string(),
    address: Yup.string(),
    city: Yup.string(),
    postal_code: Yup.string(),
    gender: Yup.string(),
  });

  const changePasswordSchema = Yup.object({
    oldPassword: Yup.string().required("L'ancien mot de passe est requis"),
    newPassword: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .required("Le mot de passe est obligatoire"),
    confirmPassword: Yup.string().required("La confirmation est requise").oneOf([Yup.ref('newPassword')], "Les mots de passe ne correspondent pas"),
  });

  const handleSubmit = async (values: { firstname: string; lastname: string; phone: string; address: string; city: string; postal_code: string; gender: string }) => {
    setLoading(true);
    try {
      if (user?.role === "instructor") {
        await updateMonitor(values, dispatch, token);
      } else if (user?.role === "admin") {
        await updateAdmin(values, dispatch, token);
      }
    } catch {
      console.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  const handleShowPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setPhotoLoading(true);
      try {
        await updatePhoto(token, file, dispatch);
      } catch {
        console.error("Erreur lors de la mise à jour de la photo");
      } finally {
        setPhotoLoading(false);
      }
    }
  };

  const handleDeletePhoto = async () => {
    setDeletePhotoLoading(true);
    try {
      await deletePhoto(token, dispatch);
    } catch {
      console.error("Erreur lors de la suppression de la photo");
    } finally {
      setDeletePhotoLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Formik
        initialValues={{
          ...initialUpdateMonitorValues(user),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              {user.photo ? (
                <img
                  src={`${imageUrl}${user.photo}`}
                  alt={`${user.firstname} ${user.lastname}`}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-500 flex items-center justify-center text-3xl sm:text-5xl font-semibold text-white">
                  {`${user.lastname?.charAt(0) ?? ''}${user.firstname?.charAt(0) ?? ''}`}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button type="button" className="flex items-center gap-2 rounded-md bg-[#6C61F6] px-4 sm:px-6 py-2 font-semibold text-white hover:bg-[#5a4ee6] text-sm sm:text-base" onClick={handleShowPhoto} disabled={photoLoading}>
                {photoLoading ? "Mise à jour..." : "Changer la photo"} <FaCamera />
              </button>
                <button type="button" className="flex items-center gap-2 rounded-md bg-red-500 px-4 sm:px-6 py-2 font-semibold text-white hover:bg-red-600 text-sm sm:text-base" onClick={() => handleDeletePhoto()} disabled={deletePhotoLoading}>
                {deletePhotoLoading ? "Suppression..." : "Supprimer la photo"} <FaTrash />
              </button>
              </div>
            </div>
            {/* Inputs prénom/nom */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex-1">
                <label className="mb-2 block font-medium text-sm sm:text-base">Prénom</label>
                <Field
                  name="firstname"
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                />
                {errors.firstname && touched.firstname && (
                  <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstname}</div>
                )}
              </div>
              <div className="flex-1">
                <label className="mb-2 block font-medium text-sm sm:text-base">Nom</label>
                <Field
                  name="lastname"
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                />
                {errors.lastname && touched.lastname && (
                  <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastname}</div>
                )}
              </div>
            </div>
            <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex-1">
                <label className="mb-2 block font-medium text-sm sm:text-base">Téléphone</label>
                <Field
                  name="phone"
                  type="text"
                  placeholder="Téléphone"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</div>
                )}
              </div>
              <div className="flex-1">
                <label className="mb-2 block font-medium text-sm sm:text-base">Adresse</label>
                <Field
                  name="address"
                  type="text"
                  placeholder="Adresse"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.address}</div>
                )}
              </div>
            </div>
            <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex-1">
                  <label className="mb-2 block font-medium text-sm sm:text-base">Ville</label>
                  <Field
                    name="city"
                    type="text"
                    placeholder="Ville"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                  />
                  {errors.city && touched.city && (
                    <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.city}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="mb-2 block font-medium text-sm sm:text-base">Code postal</label>
                  <Field
                    name="postal_code"
                    type="text"
                    placeholder="Code postal"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                  />
                  {errors.postal_code && touched.postal_code && (
                    <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.postal_code}</div>
                  )}
                </div>
            </div>
            <div>
              <label className="mb-3 block font-medium text-sm sm:text-base">Sexe:</label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <button
                  type="button"
                  onClick={() => setFieldValue("gender", "homme")}
                  className={`flex flex-row items-center justify-center gap-2 rounded-xl border px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-150 ${values.gender === "homme"
                      ? "border-[#6C61F6] bg-[#F6F3FF] text-[#6C61F6] shadow"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                    }`}
                >
                  Un homme
                  <img src={man_icon} alt="homme" />
                </button>
                <button
                  type="button"
                  onClick={() => setFieldValue("gender", "femme")}
                  className={`flex flex-row items-center justify-center gap-2 rounded-xl border px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-150 ${values.gender === "femme"
                      ? "border-[#6C61F6] bg-[#F6F3FF] text-[#6C61F6] shadow"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                    }`}
                >
                  Une femme
                  <img src={woman_icon} alt="Femme" />
                </button>
                <button
                  type="button"
                  onClick={() => setFieldValue("gender", "autre")}
                  className={`flex flex-row items-center justify-center gap-2 rounded-xl border px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-150 ${values.gender === "autre"
                      ? "border-[#6C61F6] bg-[#F6F3FF] text-[#6C61F6] shadow"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                    }`}
                >
                  Autre
                  <img src={other_icon} alt="Autres" />
                </button>
              </div>
              {errors.gender && touched.gender && (
                <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.gender}</div>
              )}
            </div>


            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-[#6C61F6] px-6 sm:px-8 py-3 font-semibold text-white hover:bg-[#5a4ee6] disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
              >
                {loading ? "Mise à jour des informations..." : "Mettre à jour les informations"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Formulaire mot de passe */}
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={changePasswordSchema}
        onSubmit={async (values, { resetForm }) => {
          setPasswordLoading(true);
          const success = await updatePassword(values, dispatch, token);
          setPasswordLoading(false);
          if (success) resetForm();
        }}
      >
        {({ errors, touched, }) => (
          <Form>
            <div className="mt-12 space-y-4">
              <div>
                <label className="mb-2 block font-medium text-sm sm:text-base">Ancien mot de passe</label>
                <div className="relative">
                  <Field
                    name="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowOldPassword((v) => !v)}
                  >
                    {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.oldPassword && touched.oldPassword && (
                  <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.oldPassword}</div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="mb-2 block font-medium text-sm sm:text-base">Nouveau mot de passe</label>
                  <div className="relative">
                    <Field
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      onClick={() => setShowNewPassword((v) => !v)}
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.newPassword}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="mb-2 block font-medium text-sm sm:text-base">Confirmer le mot de passe</label>
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6C61F6] text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-[#6C61F6] px-6 sm:px-8 py-3 font-semibold text-white hover:bg-[#5a4ee6] disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base mt-2"
                disabled={passwordLoading}
              >
                {passwordLoading ? "Mise à jour du mot de passe..." : "Mettre à jour le mot de passe"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <h3 className="text-base font-medium text-gray-900">Zone dangereuse</h3>
          <p className="text-xs sm:text-sm text-gray-500">Une fois déconnecté, vous devrez vous reconnecter pour accéder à votre compte</p>
              </div>
              <button
                type="button"
                onClick={() => handleLogout(dispatch, navigate)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
    </div>
  );
};

export default PersonnalInfromation;