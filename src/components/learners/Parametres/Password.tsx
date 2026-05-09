/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/configureStore";
import { updatePassword } from "@/api/learner/password";
import { toast } from "react-hot-toast";
import { logout } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface PasswordProps {
  onBack?: () => void;
}

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Le mot de passe actuel est requis'),
  
     newPassword: Yup.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
        )
        .required("Le mot de passe est obligatoire"),
  confirmPassword: Yup.string()
    .required('Confirmation requise')
    .oneOf([Yup.ref('newPassword')], 'Les mots de passe ne correspondent pas'),
});

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function Password({ onBack }: PasswordProps) {
  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleVisibility = (field: keyof typeof visibility, e: React.MouseEvent) => {
    e.preventDefault();
    setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      await updatePassword(token, {
        older: values.currentPassword,
        password: values.newPassword,
        confirm: values.confirmPassword,
      });
      toast.success("Mot de passe mis à jour avec succès. Veuillez vous reconnecter.");
      localStorage.clear();
      dispatch(logout());
      navigate("/connexion");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la mise à jour du mot de passe");
    } finally {
      setSubmitting(false);
    }
  };

  const labels = {
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Mobile header */}
      <div className="block lg:hidden w-full">
        <div className="flex items-center gap-4 px-6 py-4 pt-20 border-b bg-white">
          <button type="button" onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Mot de passe</h1>
        </div>
      </div>

      {/* Form container */}
      <div className="w-full max-w-2xl bg-white lg:bg-gray-100 rounded-md p-6 mt-0 lg:mt-1">
        <h1 className="hidden lg:block text-xl font-semibold text-gray-900 mb-6">Modifier le mot de passe</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={passwordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-6">
              {(['currentPassword', 'newPassword', 'confirmPassword'] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                    {labels[field]}
                  </label> 
                  <div className="relative">
                    <Field
                      id={field}
                      name={field}
                      type={visibility[field] ? 'text' : 'password'}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-indigo-400"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={(e) => toggleVisibility(field, e)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
                      tabIndex={-1}
                      aria-label={`Afficher/Masquer le champ ${labels[field]}`}
                    >
                      {visibility[field] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {field === "newPassword" && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
                    </p>
                  )}
                  <ErrorMessage name={field} component="div" className="text-red-500 text-xs mt-1" />
                </div>
              ))}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? 'Mise à jour...' : 'Sauvegarder'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
