/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, FileText, Upload, Check } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/configureStore";
import { getLearnerProfile, updateDocLearner } from "@/api/learner/profile";

import { toast } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";


interface DocumentsAdminProps {
    onBack: () => void;
}

// Schema de validation
const validationSchema = Yup.object().shape({
  neph: Yup.string().nullable()
});

interface DocumentField {
  key: string;
  label: string;
  description: string;
  type: 'file' | 'text';
  accept?: string;
}

const documentFields: DocumentField[] = [
  {
    key: 'identity',
    label: 'Pièce d\'identité',
    description: 'PDF - Pièce d\'identité accompagnateur',
    type: 'file',
    accept: 'application/pdf'
  },
  {
    key: 'accommodation',
    label: 'Attestation d\'hébergement',
    description: 'PDF - Attestation d\'hébergement/ justificatif de domicile de moins de 6 mois',
    type: 'file',
    accept: 'application/pdf'
  },
  {
    key: 'authorize',
    label: 'Autorisation parentale',
    description: 'PDF - pour les mineurs (autorisation parentale)',
    type: 'file',
    accept: 'application/pdf'
  },
  {
    key: 'identityPhoto',
    label: 'Photo d\'identité',
    description: 'Image - une photo d\'identité conforme de moins de 6 mois numéro du QRCODE',
    type: 'file',
    accept: 'image/*'
  },
  {
    key: 'assr',
    label: 'ASSR1 ou ASSR2',
    description: 'PDF - si vous avez moins de 21 ans et étiez scolarisé·e en France, votre Attestation Scolaire de Sécurité Routière (ASSR1 ou ASSR2)',
    type: 'file',
    accept: 'application/pdf'
  },
  {
    key: 'cip',
    label: 'Certificat JDC',
    description: 'PDF - si vous avez entre 17 et 25 ans et êtes de nationalité française, votre certificat individuel de participation à la JDC (ex JAPD)',
    type: 'file',
    accept: 'application/pdf'
  },
  {
    key: 'medicalVisit',
    label: 'Visite médicale',
    description: 'PDF - si applicable, votre visite médicale chez un médecin agréé',
    type: 'file',
    accept: 'application/pdf'
  },
  {
    key: 'snu',
    label: 'Certificat SNU',
    description: 'PDF - si vous y avez participé, votre certificat de participation au Service National Universel (SNU)',
    type: 'file',
    accept: 'application/pdf'
  },
  {
    key: 'neph',
    label: 'N.E.P.H',
    description: 'Texte - si vous l\'avez votre N.E.P.H',
    type: 'text'
  }
];

export default function DocumentsAdmin({ onBack }: DocumentsAdminProps) {
  const dispatch = useDispatch();

  const [completeProfile, setCompleteProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.authReducer);

  // Refs pour les inputs file
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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

  // Fonction pour gérer l'upload d'un document
  const handleFileUpload = async (fieldKey: string, file: File) => {
    if (!token) return;
    
    setUploadingDoc(fieldKey);
    try {
      const data = { [fieldKey]: file };
      await updateDocLearner(data, token, dispatch);
      
      // Recharger le profil
      const profileData = await getLearnerProfile(token);
      setCompleteProfile(profileData.data);
      
      toast.success(`Document ${fieldKey} mis à jour avec succès`);
    } catch (error) {
      console.error(`Erreur upload ${fieldKey}:`, error);
      toast.error(`Erreur lors de l'upload du document ${fieldKey}`);
    } finally {
      setUploadingDoc(null);
    }
  };

  // Fonction pour gérer la mise à jour du NEPH
  const handleNephUpdate = async (values: { neph: string }) => {
    if (!token) return;
    
    try {
      await updateDocLearner({ neph: values.neph }, token, dispatch);
      
      // Recharger le profil
      const profileData = await getLearnerProfile(token);
      setCompleteProfile(profileData.data);
      
      toast.success("N.E.P.H mis à jour avec succès");
    } catch (error) {
      console.error("Erreur update NEPH:", error);
      toast.error("Erreur lors de la mise à jour du N.E.P.H");
    }
  };



  // Composant pour afficher un document file
  const DocumentFileField = ({ field, profile }: { field: DocumentField, profile: any }) => {
    const currentFile = profile?.learner_profile?.[field.key];
    const isUploading = uploadingDoc === field.key;

    return (
      <div className="border border-gray-200 rounded-lg p-4 space-y-3">
        <div>
          <h3 className="font-medium text-gray-900">{field.label}</h3>
          <p className="text-sm text-gray-600 mt-1">{field.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {currentFile ? (
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-700">Document uploadé</span>
              <Check className="h-4 w-4 text-green-500" />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">Aucun document</span>
            </div>
          )}

          <div className="flex  items-center space-x-2">
            <button
              type="button"
              onClick={() => fileInputRefs.current[field.key]?.click()}
              disabled={isUploading}
              className="inline-flex items-center px-3 py-1.5 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-600 mr-1"></div>
                  Upload...
                </>
              ) : (
                <>
                  <Upload className="h-3 w-3 mr-1" />
                  {currentFile ? 'Remplacer' : 'Ajouter'}
                </>
              )}
            </button>

            <input
              ref={el => fileInputRefs.current[field.key] = el}
              type="file"
              accept={field.accept}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(field.key, file);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Mobile View
  const MobileView = () => (
   <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b pt-20 border-gray-100">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Documents administratifs</h1>
            <p className="text-sm text-gray-600">Gérez vos documents</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 pb-8">
        {/* Documents files */}
        {documentFields.filter(field => field.type === 'file').map((field) => (
          <DocumentFileField key={field.key} field={field} profile={completeProfile} />
        ))}

        {/* NEPH Field */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="mb-3">
            <h3 className="font-medium text-gray-900">N.E.P.H</h3>
            <p className="text-sm text-gray-600">Texte - si vous l'avez votre N.E.P.H</p>
          </div>
          
          <Formik
            initialValues={{ neph: completeProfile?.learner_profile?.neph || '' }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleNephUpdate}
          >
            {({ isSubmitting, dirty }) => (
              <Form className="space-y-3">
                <Field
                  name="neph"
                  type="text"
                  placeholder="Entrez votre numéro N.E.P.H"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                
                {dirty && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Mise à jour...
                      </>
                    ) : (
                      'Mettre à jour N.E.P.H'
                    )}
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );

  // Desktop View
  const DesktopView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
<div>
            <h1 className="text-2xl font-bold text-gray-900">Documents administratifs</h1>
            <p className="text-gray-600 mt-1">Gérez et téléchargez vos documents administratifs</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-cols-1 lg:grid-cols-2 gap-6">
          {/* Documents files */}
          {documentFields.filter(field => field.type === 'file').map((field) => (
            <DocumentFileField key={field.key} field={field} profile={completeProfile} />
          ))}

          {/* NEPH Field - Full width */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">N.E.P.H</h3>
                <p className="text-gray-600 mt-1">Si vous l'avez, saisissez votre numéro N.E.P.H</p>
              </div>
              
              <Formik
                initialValues={{ neph: completeProfile?.learner_profile?.neph || '' }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleNephUpdate}
              >
                {({ isSubmitting, dirty }) => (
                  <Form className="flex items-end space-x-4">
                    <div className="flex-1">
                      <Field
                        name="neph"
                        type="text"
                        placeholder="Entrez votre numéro N.E.P.H"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    {dirty && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Mise à jour...
                          </>
                        ) : (
                          'Mettre à jour'
                        )}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
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