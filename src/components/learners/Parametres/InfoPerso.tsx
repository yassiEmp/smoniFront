/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Trash2, MapPin, Calendar, CreditCard, FileText } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/configureStore";
import { getLearnerProfile, updateLearnerProfile } from "@/api/learner/profile";
import { deletePhoto, updatePhoto } from "@/api/monitor/parametre";
import { deleteAccount } from "@/api/learner/deleteAccount";
import { logout } from "@/store/slices/authSlice";
import { toast } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import man_icon from "@assets/authentification/register/man-icon.svg";
import woman_icon from "@assets/authentification/register/wooman-icon.svg";
import other_icon from "@assets/authentification/register/other-icon.svg";
import { imageUrl } from "@/api";
import { useNavigate } from "react-router";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";

const genderOptions = [
  { id: 1, label: "Un Homme", value: "homme", icon: man_icon },
  { id: 2, label: "Une Femme", value: "femme", icon: woman_icon },
  { id: 3, label: "Autre", value: "autre", icon: other_icon },
];

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Le prénom est requis"),
  lastname: Yup.string().required("Le nom est requis"),
  phone: Yup.string().required("Le téléphone est requis"),
  address: Yup.string(),
  genre: Yup.string().oneOf(["homme", "femme", "autre"]).required("Le genre est requis"),
  birthdate: Yup.string(),
  postal_code: Yup.string(),
  CNI_number: Yup.string(),
  CNI_issue_date: Yup.string(),
  CNI_issue_place: Yup.string(),
  permit_number: Yup.string(),
  permit_issue_date: Yup.string(),
  permit_category: Yup.string(),
});

interface InfoPersoProps {
  onBack?: () => void;
}

export default function InfoPerso({ onBack }: InfoPersoProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.authReducer);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [deletePhotoLoading, setDeletePhotoLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [completeProfile, setCompleteProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Effet pour charger les données complètes
  useEffect(() => {
    const loadCompleteProfile = async () => {
      if (token) {
        setLoadingProfile(true);
        try {
          const profileData = await getLearnerProfile(token);
          setCompleteProfile(profileData.data);
        } catch (error) {
          console.error('Erreur lors du chargement du profil complet:', error);
          toast.error("Erreur lors du chargement des informations complètes");
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    loadCompleteProfile();
  }, [token]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
  try {
    await updateLearnerProfile(values, token, dispatch);
    toast.success("Profil mis à jour !");
    
    // Recharger les données complètes après la mise à jour
    setLoadingProfile(true);
    try {
      const profileData = await getLearnerProfile(token);
      setCompleteProfile(profileData.data);
    } catch (error) {
      console.error('Erreur lors du rechargement du profil:', error);
      toast.error("Erreur lors du rechargement des informations");
    } finally {
      setLoadingProfile(false);
    }
    
  } catch (error: any) {
    toast.error(error.message || "Erreur lors de la mise à jour du profil");
  } finally {
    setSubmitting(false);
  }
};

  // Mettre à jour les valeurs initiales pour inclure les données complètes
  const initialValues = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    phone: user?.phone || "",
    address: completeProfile?.learner_profile?.address || "",
    genre: user?.genre || "homme",
    birthdate: completeProfile?.learner_profile?.birthdate ? completeProfile.learner_profile.birthdate.split('T')[0] : "",
    postal_code: completeProfile?.learner_profile?.postal_code || "",
    CNI_number: completeProfile?.learner_profile?.CNI_number || "",
    CNI_issue_date: completeProfile?.learner_profile?.CNI_issue_date ? completeProfile.learner_profile.CNI_issue_date.split('T')[0] : "",
    CNI_issue_place: completeProfile?.learner_profile?.CNI_issue_place || "",
    permit_number: completeProfile?.learner_profile?.permit_number || "",
    permit_issue_date: completeProfile?.learner_profile?.permit_issue_date ? completeProfile.learner_profile.permit_issue_date.split('T')[0] : "",
    permit_category: completeProfile?.learner_profile?.permit_category || "",
  };

  const handleShowPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoLoading(true);
    try {
      await updatePhoto(token, file, dispatch);
      toast.success("Photo mise à jour avec succès");
    } catch {
      toast.error("Erreur lors de la mise à jour de la photo");
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleDeletePhoto = async () => {
    setDeletePhotoLoading(true);
    try {
      await deletePhoto(token, dispatch);
      toast.success("Photo supprimée avec succès");
    } catch {
      toast.error("Erreur lors de la suppression de la photo");
    } finally {
      setDeletePhotoLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(token);
      toast.success("Compte supprimé avec succès.");
      localStorage.clear();
      dispatch(logout());
      navigate("/inscription");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la suppression du compte");
    }
  };



  // Mobile View
  const MobileView = () => (
    <div className="p-6 bg-white">
      {/* Header mobile */}
      <div className="flex items-center gap-4 px-6 py-4 border-b pt-20 border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Informations personnelles</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="px-6 py-6 space-y-6">
              {/* Photo de profil */}
              <h2 className="text-sm font-medium text-gray-700 mb-3">Photo de profil</h2>
              <div className="flex flex-col items-center">
                {user.photo ? (
                  <img
                    src={imageUrl + user.photo}
                    alt={user.firstname}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-gray-600 uppercase">
                    {user.firstname ? user.firstname[0] + user.lastname[0] : "?"}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="bg-indigo-500 text-white px-4 py-3 rounded-lg text-md font-medium hover:bg-indigo-600 flex items-center gap-2"
                    onClick={handleShowPhoto}
                    disabled={photoLoading}
                  >
                    {photoLoading ? "Mise à jour..." : "Changer la photo"}
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-3 rounded-lg text-md font-medium hover:bg-red-600 flex items-center gap-2"
                    onClick={handleDeletePhoto}
                    disabled={deletePhotoLoading}
                  >
                    {deletePhotoLoading ? "Suppression..." : "Supprimer la photo"}
                  </button>
                </div>
              </div>
              
              {/* Formulaire */}
              <div className="space-y-4">
                {/* Informations de base */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <Field
                    name="firstname"
                    type="text"
                    placeholder="Lina"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors.firstname && touched.firstname && (
                    <div className="text-red-500 text-sm mt-1">{errors.firstname.toString()}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <Field
                    name="lastname"
                    type="text"
                    placeholder="Agniel"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors.lastname && touched.lastname && (
                    <div className="text-red-500 text-sm mt-1">{errors.lastname.toString()}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <Field
                    name="phone"
                    type="tel"
                    placeholder="0756928590"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm mt-1">{errors.phone.toString()}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                  <div className="relative">
                    <Field
                      name="birthdate"
                      type="date"
                      className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse postale</label>
                  <div className="relative">
                    <Field
                      name="address"
                      type="text"
                      placeholder="8 Rue Rougemont, 75010 Paris"
                      className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                  <Field
                    name="postal_code"
                    type="text"
                    placeholder="75010"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                {/* Informations CNI */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Informations CNI
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro CNI</label>
                    <Field
                      name="CNI_number"
                      type="text"
                      placeholder="123456789"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date délivrance CNI</label>
                    <div className="relative">
                      <Field
                        name="CNI_issue_date"
                        type="date"
                        className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu délivrance CNI</label>
                    <Field
                      name="CNI_issue_place"
                      type="text"
                      placeholder="Lyon"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                {/* Informations permis */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Informations Permis
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de permis</label>
                    <Field
                      name="permit_number"
                      type="text"
                      placeholder="PERM987654"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date délivrance permis</label>
                    <div className="relative">
                      <Field
                        name="permit_issue_date"
                        type="date"
                        className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie permis</label>
                    <Field
                      name="permit_category"
                      type="text"
                      placeholder="B"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                {/* Genre */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Sexe:</label>
                  <div className="flex flex-wrap gap-3">
                    {genderOptions.map((item, index) => {
                      const isFirstRow = index < 2;
                      return (
                        <div key={item.id} className={isFirstRow ? 'flex-1 min-w-[48%]' : 'w-full'}>
                          <button
                            type="button"
                            onClick={() => setFieldValue("genre", item.value)}
                            className={`w-full p-4 rounded-lg flex items-center justify-between border-2 transition-all ${
                              values.genre === item.value
                                ? 'bg-indigo-50 border-indigo-400'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <span className="text-sm font-medium text-gray-900">
                              {item.label}
                            </span>
                            <img
                              src={item.icon}
                              alt={item.label}
                              className={`w-5 h-5 ${
                                values.genre === item.value ? 'opacity-100' : 'opacity-50'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {errors.genre && touched.genre && (
                    <div className="text-red-500 text-sm mt-1">{errors.genre.toString()}</div>
                  )}
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                </div>
                
                {/* Supprimer mon compte */}
                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full text-red-500 py-3 bg-gray-200 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer mon compte
                  </button>
                </div>
                
                <DeleteConfirmationModal
                  isOpen={deleteModalOpen}
                  onClose={() => setDeleteModalOpen(false)}
                  onConfirm={() => {
                    setDeleteModalOpen(false);
                    handleDeleteAccount();
                  }}
                  title="Supprimer mon compte"
                  message="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );

  // Desktop View
  const DesktopView = () => (
    <section className="bg-gray-50 p-6 rounded-xl max-w-4xl mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <h1 className="text-[#616161] text-[14px] font-semibold">Photo de profil</h1>
              <div className="flex items-center gap-4 mb-6 py-2">
                {user.photo ? (
                  <img
                    src={imageUrl + user.photo}
                    alt={user.firstname}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 uppercase">
                    {user.firstname ? user.firstname[0] + user.lastname[0] : "?"}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="bg-indigo-500 font-semibold text-white px-4 py-2 rounded-lg text-[13px] hover:bg-indigo-600 flex items-center gap-2"
                    onClick={handleShowPhoto}
                    disabled={photoLoading}
                  >
                    {photoLoading ? "Mise à jour..." : "Changer la photo"}
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 font-semibold text-white px-4 py-2 rounded-lg text-[13px] hover:bg-red-600 flex items-center gap-2"
                    onClick={handleDeletePhoto}
                    disabled={deletePhotoLoading}
                  >
                    {deletePhotoLoading ? "Suppression..." : "Supprimer la photo"}
                  </button>
                </div>
              </div>
            </div>

            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold">Prénom</label>
                <Field
                  name="firstname"
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.firstname && touched.firstname && (
                  <div className="text-red-500 text-sm mt-1">{errors.firstname.toString()}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold">Nom</label>
                <Field
                  name="lastname"
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.lastname && touched.lastname && (
                  <div className="text-red-500 text-sm mt-1">{errors.lastname.toString()}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold">Téléphone</label>
                <Field
                  name="phone"
                  type="tel"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 text-sm mt-1">{errors.phone.toString()}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold">Date de naissance</label>
                <div className="relative mt-1">
                  <Field
                    name="birthdate"
                    type="date"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold">Adresse postale</label>
                <div className="relative mt-1">
                  <Field
                    name="address"
                    type="text"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold">Code postal</label>
                <Field
                  name="postal_code"
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* Informations CNI */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Informations CNI
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold">Numéro CNI</label>
                  <Field
                    name="CNI_number"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold">Date délivrance CNI</label>
                  <div className="relative mt-1">
                    <Field
                      name="CNI_issue_date"
                      type="date"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold">Lieu délivrance CNI</label>
                  <Field
                    name="CNI_issue_place"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>

            {/* Informations permis */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Informations Permis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold">Numéro de permis</label>
                  <Field
                    name="permit_number"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold">Date délivrance permis</label>
                  <div className="relative mt-1">
                    <Field
                      name="permit_issue_date"
                      type="date"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold">Catégorie permis</label>
                  <Field
                    name="permit_category"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>

            {/* Genre */}
            <div className="mt-4 mb-6">
              <label className="text-sm font-semibold">Je suis :</label>
              <div className="w-full flex flex-col md:flex-row md:gap-3 gap-6 mt-2">
                {genderOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFieldValue("genre", item.value)}
                    className={`w-full cursor-pointer p-[10px] rounded-[12px] flex items-center justify-center gap-2 border-2 transition-all ${
                      values.genre === item.value
                        ? 'bg-indigo-50 border-indigo-400'
                        : 'bg-[#F1F0F4] border-transparent'
                    }`}
                  >
                    <span className="text-[14px] text-[#616161] font-semibold">
                      {item.label}
                    </span>
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`w-5 h-5 ${
                        values.genre === item.value ? 'opacity-100' : 'opacity-50'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.genre && touched.genre && (
                <div className="text-red-500 text-sm mt-1">{errors.genre.toString()}</div>
              )}
            </div>

            <div className="mt-6 flex flex-col items-start gap-4">
              <button
                type="submit"
                className="bg-blue-700 text-gray-100 px-4 py-3 rounded-lg font-semibold text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
              </button>
              
              {/* Supprimer mon compte */}
              <button
                type="button"
                className="bg-gray-200 px-4 py-2 rounded-lg font-semibold text-red-500 text-sm hover:underline flex items-center gap-2"
                onClick={() => setDeleteModalOpen(true)}
              >
                <Trash2 className="w-4 h-4" />
                Supprimer mon compte
              </button>
              
              <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                  setDeleteModalOpen(false);
                  handleDeleteAccount();
                }}
                title="Supprimer mon compte"
                message="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  } 


  return (
    <>
      <div className="block lg:hidden">
        <MobileView />
      </div>
      <div className="hidden lg:block">
        <DesktopView />
      </div>
    </>
  );
}