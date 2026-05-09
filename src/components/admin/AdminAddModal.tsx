import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/configureStore';
import { addAdmins } from '@/api/admin/admin';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';

interface AdminAddModalProps {
  open: boolean;
  onClose: () => void;
}

// Schéma de validation avec Yup
const validationSchema = Yup.object({
  lastname: Yup.string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  firstname: Yup.string()
    .required('Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: Yup.string()
    .email('Format d\'email invalide')
    .required('L\'email est requis'),
  password: Yup.string()
    .required('Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au minimum 8 caractères')
});

const AdminAddModal: React.FC<AdminAddModalProps> = ({ open, onClose }) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true);

    try {
      console.log(values);
      const response = await addAdmins(token, dispatch, values);
      console.log(response);

      if (response && response.success) {
        resetForm();
        onClose();
      } else {
        console.error(response?.message || "Erreur lors de l'ajout de l'administrateur.");
      }
    } catch (error) {
      console.log("Erreur lors de l'ajout de l'administrateur.", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={
          isMobile
            ? 'h-[90vh] rounded-t-xl p-0 bg-white border-none'
            : 'sm:max-w-[400px] p-0 bg-white border-none'
        }
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex flex-row justify-between border-b border-[#E0E0E0] pb-5 pt-8 px-6">
            <SheetTitle className="text-xl font-bold">Ajouter un administrateur</SheetTitle>
          </SheetHeader>
          
          <Formik
            initialValues={{
              lastname: '',
              firstname: '',
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount={false}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ values, isSubmitting, isValid, dirty }) => (
              <Form className="flex flex-col gap-4 p-6 flex-1 justify-between h-full">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                    <Field
                      type="text"
                      name="lastname"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Entrez le nom"
                    />
                    <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm mt-1" />
              </div>
                  
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                    <Field
                      type="text"
                      name="firstname"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Entrez le prénom"
                    />
                    <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm mt-1" />
              </div>
                  
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Entrez l'email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
                  
              <div>
                <label className="block text-sm font-medium mb-1">Mot de passe</label>
                <div className="relative">
                      <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full border rounded px-3 py-2 pr-10"
                        placeholder="Entrez le mot de passe"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                    <div className="flex items-center justify-between mt-1">
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                      <div className="text-xs text-gray-500 ml-auto">
                        {values.password.length}/8 caractères minimum
                      </div>
                </div>
              </div>
            </div>
                
            <div className="flex flex-col gap-2 mt-8">
                  <button 
                    type="button" 
                    onClick={handleClose} 
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700" 
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading || isSubmitting || !isValid || !dirty} 
                    className={`px-4 py-2 rounded font-semibold transition-colors ${
                      loading || isSubmitting || !isValid || !dirty
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#6C61F6] text-white hover:bg-[#5a4ee6]'
                    }`}
                  >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
              </Form>
            )}
          </Formik>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminAddModal; 