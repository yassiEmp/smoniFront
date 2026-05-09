import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { createDocument, getDocuments, deleteDocument, createInfosDocs } from "@/api/document";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { format, formatDate } from "date-fns";

interface DocumentsState {
  identity: File | null;
  drivingLicense: File | null;
  teachingDiploma: File | null;
  rcPro: File | null;
  sirenKbis: File | null;
  vigilance: File | null;
  teachingAuthorization: File | null;
  vehicleRegistration: File | null;
  vehicleInsurance: File | null;
  socialSecurityCard: File | null;
}

const AdminDocuments: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [isLoadingPersonal, setIsLoadingPersonal] = useState(false);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);
  const [documents, setDocuments] = useState<DocumentsState>({
    identity: null,
    drivingLicense: null,
    teachingDiploma: null,
    rcPro: null,
    sirenKbis: null,
    vigilance: null,
    teachingAuthorization: null,
    vehicleRegistration: null,
    vehicleInsurance: null,
    socialSecurityCard: null
  });

  const [documentNames, setDocumentNames] = useState({
    identity: "Pièce_identité.pdf",
    drivingLicense: "Permis_de_conduire.pdf",
    teachingDiploma: "Diplôme_d'enseignement.pdf",
    rcPro: "Upload votre assurance RC Pro",
    sirenKbis: "Upload votre attestation SIRENE/K-BIS",
    vigilance: "Uploadez votre attestation de vigilance",
    teachingAuthorization: "Uploadez votre autorisation d'enseigner",
    vehicleRegistration: "Carte_grise_véhicule.pdf",
    vehicleInsurance: "Assurance_véhicule.pdf",
    socialSecurityCard: "Carte_sécurité_sociale.pdf"
  });

  const [documentIds, setDocumentIds] = useState({
    identity: null,
    drivingLicense: null,
    teachingDiploma: null,
    rcPro: null,
    sirenKbis: null,
    vigilance: null,
    teachingAuthorization: null,
    vehicleRegistration: null,
    vehicleInsurance: null,
    socialSecurityCard: null
  });

  const [deleteLoading, setDeleteLoading] = useState({
    identity: false,
    drivingLicense: false,
    teachingDiploma: false,
    rcPro: false,
    sirenKbis: false,
    vigilance: false,
    teachingAuthorization: false,
    vehicleRegistration: false,
    vehicleInsurance: false,
    socialSecurityCard: false
  });

  const [adminInfos, setAdminInfos] = useState({
    juridic_form: "",
    siret: "",
    num_activity: "",
    num_tva: "",
    num_teach_authorization: "",
    date_teach_permit: "",
    date_medical_visit: "",
    certification_number: "",
    certification_issue_date: ""
  });

  const [isSavingAdminInfos, setIsSavingAdminInfos] = useState(false);

  const [editField, setEditField] = useState({
    juridic_form: false,
    siret: false,
    num_activity: false,
    num_tva: false,
    num_teach_authorization: false,
    date_teach_permit: false,
    date_medical_visit: false,
    certification_number: false,
    certification_issue_date: false
  });

  const adminInfosSchema = Yup.object().shape({
    juridic_form: Yup.string().required('La forme juridique est requise'),
    siret: Yup.string().required('Le SIRET est requis'),
    num_activity: Yup.string().required("Le numéro d'activité est requis"),
    num_tva: Yup.string().required('Le numéro TVA est requis'),
    num_teach_authorization: Yup.string().required("Le numéro d'autorisation d'enseigner est requis"),
    date_teach_permit: Yup.string().required("La date d'autorisation d'enseigner est requise"),
    date_medical_visit: Yup.string().required("La date de visite médicale est requise"),
    certification_number: Yup.string().required("Le numéro de certification est requis"),
    certification_issue_date: Yup.string().required("La date de certification est requise")
  });

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocuments(token);
        if (res.success && Array.isArray(res.data)) {
          setDocumentNames(prev => {
            const updated = { ...prev };
            const ids = {
              identity: null as any,
              drivingLicense: null as any,
              teachingDiploma: null as any,
              rcPro: null as any,
              sirenKbis: null as any,
              vigilance: null as any,
              teachingAuthorization: null as any,
              vehicleRegistration: null as any,
              vehicleInsurance: null as any,
              socialSecurityCard: null as any,
            };
            res.data.forEach((doc: any) => {
              if (doc.name && doc.file) {
                updated[doc.name as keyof typeof updated] = doc.file.split('/').pop();
                ids[doc.name as keyof typeof ids] = doc.id;
              }
            });
            setDocumentIds(ids);
            return updated;
          });
        }
        if (res.success && res.info) {
          console.log(res.info)
          setAdminInfos({
            juridic_form: res.info.juridic_form || "",
            siret: res.info.siret || "",
            num_activity: res.info.num_activity || "",
            num_tva: res.info.num_tva || "",
            num_teach_authorization: res.info.num_teach_authorization || "",
            date_teach_permit: res.info.date_teach_permit ? res.info.date_teach_permit.split(' ')[0] : "",
            date_medical_visit: res.info.date_medical_visit ? res.info.date_medical_visit.split(' ')[0] : "",
            certification_number: res.info.certification_number || "",
            certification_issue_date: res.info.certification_issue_date ? formatDate(res.info.certification_issue_date, 'yyyy-MM-dd') : ""
          });
        }
      } catch {
        console.error("Erreur lors du chargement des documents");
      }
    };
    fetchDocuments();
  }, [token]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, documentType: keyof DocumentsState) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le fichier ne doit pas dépasser 5Mo");
      return;
    }

    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));

    setDocumentNames(prev => ({
      ...prev,
      [documentType]: file.name
    }));
  };

  const handleSavePersonalDocuments = async () => {
    const personalDocuments = ['identity', 'drivingLicense', 'teachingDiploma'] as const;
    setIsLoadingPersonal(true);
    try {
      let allSuccess = true;
      for (const docType of personalDocuments) {
        if (documents[docType]) {
          const success = await createDocument(token, docType, documents[docType]!);
          if (!success) {
            allSuccess = false;
            break;
          }
        }
      }
      if (allSuccess) {
        toast.success("Documents personnels enregistrés avec succès");
        setDocuments(prev => ({
          ...prev,
          identity: null,
          drivingLicense: null,
          teachingDiploma: null
        }));
        setDocumentNames(prev => ({
          ...prev,
          identity: "Pièce_identité.pdf",
          drivingLicense: "Permis_de_conduire.pdf",
          teachingDiploma: "Diplôme_d'enseignement.pdf"
        }));

        await refreshDocumentNames();
      }
    } catch {
      console.error("Une erreur est survenue lors de l'enregistrement des documents personnels");
    } finally {
      setIsLoadingPersonal(false);
    }
  };

  const refreshDocumentNames = async () => {
    try {
      const res = await getDocuments(token);
      if (res.success && Array.isArray(res.data)) {
        setDocumentNames(prev => {
          const updated = { ...prev };
          const ids = {
            identity: null as any,
            drivingLicense: null as any,
            teachingDiploma: null as any,
            rcPro: null as any,
            sirenKbis: null as any,
            vigilance: null as any,
            teachingAuthorization: null as any,
            vehicleRegistration: null as any,
            vehicleInsurance: null as any,
            socialSecurityCard: null as any,
          };
          res.data.forEach((doc: any) => {
            if (doc.name && doc.file) {
              updated[doc.name as keyof typeof updated] = doc.file.split('/').pop();
              ids[doc.name as keyof typeof ids] = doc.id;
            }
          });
          setDocumentIds(ids);
          return updated;
        });
      }
    } catch {
      console.error("Erreur lors du rafraîchissement des documents");
    }
  };

  const handleSaveAdminDocuments = async () => {
    const adminDocuments = ['rcPro', 'sirenKbis', 'vigilance', 'teachingAuthorization', 'vehicleRegistration', 'vehicleInsurance', 'socialSecurityCard'] as const;
    setIsLoadingAdmin(true);
    try {
      let allSuccess = true;
      for (const docType of adminDocuments) {
        if (documents[docType]) {
          const success = await createDocument(token, docType, documents[docType]!);
          if (!success) {
            allSuccess = false;
            break;
          }
        }
      }
      if (allSuccess) {
        toast.success("Documents administratifs enregistrés avec succès");
        setDocuments(prev => ({
          ...prev,
          rcPro: null,
          sirenKbis: null,
          vigilance: null,
          teachingAuthorization: null,
          vehicleRegistration: null,
          vehicleInsurance: null,
          socialSecurityCard: null
        }));
        await refreshDocumentNames();
      }
    } catch {
      toast.error("Une erreur est survenue lors de l'enregistrement des documents administratifs");
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  const handleDeleteDocument = async (documentType: keyof DocumentsState) => {
    const docId = documentIds[documentType];
    if (!docId) return;
    setDeleteLoading(prev => ({ ...prev, [documentType]: true }));
    try {
      const res = await deleteDocument(docId, token);
      if (res.success) {
        toast.success("Document supprimé avec succès");
        setDocumentNames(prev => ({
          ...prev,
          [documentType]: getDefaultDocumentName(documentType)
        }));
        await refreshDocumentNames();
      } else {
        toast.error("Erreur lors de la suppression du document");
      }
    } catch {
      console.error("Erreur lors de la suppression du document");
    } finally {
      setDeleteLoading(prev => ({ ...prev, [documentType]: false }));
    }
  };

  const getDefaultDocumentName = (type: keyof DocumentsState) => {
    switch (type) {
      case 'identity': return "Pièce_identité.pdf";
      case 'drivingLicense': return "Permis_de_conduire.pdf";
      case 'teachingDiploma': return "Diplôme_d'enseignement.pdf";
      case 'rcPro': return "Upload votre assurance RC Pro";
      case 'sirenKbis': return "Upload votre attestation SIRENE/K-BIS";
      case 'vigilance': return "Uploadez votre attestation de vigilance";
      case 'teachingAuthorization': return "Uploadez votre autorisation d'enseigner";
      case 'vehicleRegistration': return "Carte_grise_véhicule.pdf";
      case 'vehicleInsurance': return "Assurance_véhicule.pdf";
      case 'socialSecurityCard': return "Carte_sécurité_sociale.pdf";
      default: return "Document.pdf";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className=" gap-8">
        {/* Colonne Documents personnels */}
        <div className="space-y-6 ">
          <h2 className="font-semibold text-lg text-[#616161]">Documents personnels</h2>

          {/* Pièce d'identité document */}
          <div>
            <label className="block text-sm font-semibold mb-1">Pièce d'identité</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={documentNames.identity}
                readOnly
                className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50"
              />
              <label htmlFor="identity-upload" className="absolute right-10 cursor-pointer">
                <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                <input
                  id="identity-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'identity')}
                />
              </label>

              {documentIds.identity && documentIds.identity !== null && (
                <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('identity')} disabled={deleteLoading.identity}>
                  {deleteLoading.identity ? (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  ) : (
                    <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-[#757575] font-semibold">Vous devez fournir carte d'identité (pdf recto-verso) ou le passeport (pdf). 5Mo Maximum</p>
          </div>

          {/* Permis de conduire document */}
          <div>
            <label className="block text-sm font-semibold mb-1">Permis de conduire</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={documentNames.drivingLicense}
                readOnly
                className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50"
              />
              <label htmlFor="driving-license-upload" className="absolute right-10 cursor-pointer">
                <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                <input
                  id="driving-license-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'drivingLicense')}
                />
              </label>
              {documentIds.drivingLicense && (
                <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('drivingLicense')} disabled={deleteLoading.drivingLicense}>
                  {deleteLoading.drivingLicense ? (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  ) : (
                    <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-[#757575] font-semibold">
              Votre permis de conduire format pdf recto-verso. 5Mo Maximum
            </p>
          </div>

          {/* Diplôme d'enseignements document */}
          <div>
            <label className="block text-sm font-semibold mb-1">Diplôme d'enseignements</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={documentNames.teachingDiploma}
                readOnly
                className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50"
              />
              <label htmlFor="teaching-diploma-upload" className="absolute right-10 cursor-pointer">
                <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                <input
                  id="teaching-diploma-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'teachingDiploma')}
                />
              </label>
              {documentIds.teachingDiploma && (
                <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('teachingDiploma')} disabled={deleteLoading.teachingDiploma}>
                  {deleteLoading.teachingDiploma ? (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  ) : (
                    <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-[#757575] font-semibold">
              Votre diplôme d'enseignement au format pdf. 5Mo Maximum
            </p>
          </div>

          <div className="flex pt-4 md:items-end md:justify-end justify-center mb-8">
            <button
              onClick={handleSavePersonalDocuments}
              disabled={isLoadingPersonal}
              className={`flex items-center justify-center gap-2 bg-[#6c61f6] px-4 py-3 rounded-md transition-all duration-200 text-[13px] text-[#FDFDFD] font-semibold ${isLoadingPersonal ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoadingPersonal ? (
                <>
                  Enregistrement...
                </>
              ) : (
                "Enregistrer mes documents personnels"
              )}
            </button>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Colonne Documents administratifs */}
        <div className="space-y-6">
          <h2 className="font-semibold text-lg text-[#616161]">Documents administratifs</h2>
          {/* Assurance RC Pro document */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Assurance RC Pro</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={documentNames.rcPro}
                  readOnly
                  className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500"
                />
                <label htmlFor="rc-pro-upload" className="absolute right-10 cursor-pointer">
                  <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                  <input
                    id="rc-pro-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'rcPro')}
                  />
                </label>
                {documentIds.rcPro && (
                  <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('rcPro')} disabled={deleteLoading.rcPro}>
                    {deleteLoading.rcPro ? (
                      <Loader2 size={18} className="animate-spin text-gray-400" />
                    ) : (
                      <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs text-[#757575] font-semibold">Format accepté : PDF, JPG, PNG. Max 5Mo.</p>
            </div>
            {/* Attestation SIRENE/K-BIS */}
            <div>
              <label className="block text-sm font-semibold mb-1">Attestation SIRENE/K-BIS</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={documentNames.sirenKbis}
                  readOnly
                  className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500"
                />
                <label htmlFor="siren-kbis-upload" className="absolute right-10 cursor-pointer">
                  <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                  <input
                    id="siren-kbis-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'sirenKbis')}
                  />
                </label>
                {documentIds.sirenKbis && (
                  <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('sirenKbis')} disabled={deleteLoading.sirenKbis}>
                    {deleteLoading.sirenKbis ? (
                      <Loader2 size={18} className="animate-spin text-gray-400" />
                    ) : (
                      <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs text-[#757575] font-semibold">Pour les sociétés : téléchargez l'attestation SIRENE/K-BIS. Pour les auto-entrepreneurs, le certificat d'inscription au répertoire SIRENE.</p>
            </div>
          </div>

          {/* Attestation de vigilance document */}
          <div>
            <label className="block text-sm font-semibold mb-1">Attestation de vigilance</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={documentNames.vigilance}
                readOnly
                className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500"
              />
              <label htmlFor="vigilance-upload" className="absolute right-10 cursor-pointer">
                <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                <input
                  id="vigilance-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'vigilance')}
                />
              </label>
              {documentIds.vigilance && (
                <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('vigilance')} disabled={deleteLoading.vigilance}>
                  {deleteLoading.vigilance ? (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  ) : (
                    <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-[#757575] font-semibold">La date figurant sur votre attestation de vigilance doit être de moins de 6 mois, document au format pdf</p>
          </div>
          {/* Autorisation d'enseigner document */}
          <div>
            <label className="block text-sm font-semibold mb-1">Autorisation d'enseigner</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={documentNames.teachingAuthorization}
                readOnly
                className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500"
              />
              <label htmlFor="teaching-auth-upload" className="absolute right-10 cursor-pointer">
                <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                <input
                  id="teaching-auth-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'teachingAuthorization')}
                />
              </label>
              {documentIds.teachingAuthorization && (
                <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('teachingAuthorization')} disabled={deleteLoading.teachingAuthorization}>
                  {deleteLoading.teachingAuthorization ? (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  ) : (
                    <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-[#757575] font-semibold">
              Format pdf. 5Mo Maximum
            </p>
          </div>

          {/* Carte grise véhicule & Assurance véhicule */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Carte grise véhicule</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={documentNames.vehicleRegistration}
                  readOnly
                  className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500"
                />
                <label htmlFor="vehicle-registration-upload" className="absolute right-10 cursor-pointer">
                  <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                  <input
                    id="vehicle-registration-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'vehicleRegistration')}
                  />
                </label>
                {documentIds.vehicleRegistration && (
                  <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('vehicleRegistration')} disabled={deleteLoading.vehicleRegistration}>
                    {deleteLoading.vehicleRegistration ? (
                      <Loader2 size={18} className="animate-spin text-gray-400" />
                    ) : (
                      <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs text-[#757575] font-semibold">Format pdf. 5Mo Maximum</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Assurance véhicule</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={documentNames.vehicleInsurance}
                  readOnly
                  className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500"
                />
                <label htmlFor="vehicle-insurance-upload" className="absolute right-10 cursor-pointer">
                  <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                  <input
                    id="vehicle-insurance-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'vehicleInsurance')}
                  />
                </label>
                {documentIds.vehicleInsurance && (
                  <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('vehicleInsurance')} disabled={deleteLoading.vehicleInsurance}>
                    {deleteLoading.vehicleInsurance ? (
                      <Loader2 size={18} className="animate-spin text-gray-400" />
                    ) : (
                      <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs text-[#757575] font-semibold">Format pdf. 5Mo Maximum</p>
            </div>
          </div>

          {/* Carte de sécurité sociale (carte verte) */}
          <div>
            <label className="block text-sm font-semibold mb-1">Carte de sécurité sociale (carte verte)</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={documentNames.socialSecurityCard}
                readOnly
                className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500"
              />
              <label htmlFor="social-security-card-upload" className="absolute right-10 cursor-pointer">
                <Pencil size={18} className="text-gray-400 hover:text-gray-600" />
                <input
                  id="social-security-card-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'socialSecurityCard')}
                />
              </label>
              {documentIds.socialSecurityCard && (
                <button type="button" className="absolute right-3" onClick={() => handleDeleteDocument('socialSecurityCard')} disabled={deleteLoading.socialSecurityCard}>
                  {deleteLoading.socialSecurityCard ? (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  ) : (
                    <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-[#757575] font-semibold">Format pdf. 5Mo Maximum</p>
          </div>
          <div className="flex pt-4 md:items-end md:justify-end justify-center mb-8">
            <button
              onClick={handleSaveAdminDocuments}
              disabled={isLoadingAdmin}
              className={`flex items-center justify-center gap-2 bg-[#6c61f6] px-4 py-3 rounded-md transition-all duration-200 text-[13px] text-[#FDFDFD] font-semibold ${isLoadingAdmin ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoadingAdmin ? (
                <>
                  Enregistrement...
                </>
              ) : (
                "Enregistrer mes documents administratifs"
              )}
            </button>
          </div>
        </div>

        {/* Séparateur */}
        <hr className="my-4 border-gray-300" />

        {/* Nouvelle section : Informations administratives */}
        <div className="space-y-6">
          <h2 className="font-semibold text-lg text-[#616161]">Informations administratives</h2>
          <Formik
            initialValues={adminInfos}
            validationSchema={adminInfosSchema}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              setIsSavingAdminInfos(true);
              try {
                const res = await createInfosDocs(values, token);
                if (res && res.success) {
                  toast.success("Informations administratives enregistrées !");
                  setEditField({
                    juridic_form: false,
                    siret: false,
                    num_activity: false,
                    num_tva: false,
                    num_teach_authorization: false,
                    date_teach_permit: false,
                    date_medical_visit: false,
                    certification_number: false,
                    certification_issue_date: false,
                  });
                } else {
                  toast.error("Erreur lors de l'enregistrement des informations administratives");
                }
              } catch {
                toast.error("Erreur lors de l'enregistrement des informations administratives");
              } finally {
                setIsSavingAdminInfos(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values, }) => {
              return (
                <Form className="space-y-4">
                  {/* Forme juridique */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Forme juridique</label>
                    <Field
                      as="select"
                      name="juridic_form"
                      className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 w-full pr-10"
                      disabled={!!values.juridic_form && !editField.juridic_form}
                    >
                      <option value="">Sélectionner</option>
                      <option value="SASU">SASU</option>
                      <option value="SAS">SAS</option>
                      <option value="SARL">SARL</option>
                      <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                    </Field>
                    {values.juridic_form && !editField.juridic_form && (
                      <button
                        type="button"
                        className="absolute right-6 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setEditField(prev => ({ ...prev, juridic_form: true }))}
                        tabIndex={-1}
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <ErrorMessage name="juridic_form" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  {/* SIRET */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">SIRET</label>
                    <Field
                      type="text"
                      name="siret"
                      className="text-[#757575] w-full py-3 font-semibold text-[13px] border border-gray-300 rounded-md px-3 bg-gray-50 pr-10"
                      disabled={!!values.siret && !editField.siret}
                    />
                    {values.siret && !editField.siret && (
                      <button
                        type="button"
                        className="absolute right-6 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setEditField(prev => ({ ...prev, siret: true }))}
                        tabIndex={-1}
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <ErrorMessage name="siret" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  {/* Numéro de déclaration d'activité */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Numéro de déclaration d'activité</label>
                    <Field
                      type="text"
                      name="num_activity"
                      className="text-[#757575] w-full py-3 font-semibold text-[13px] border border-gray-300 rounded-md px-3 bg-gray-50 pr-10"
                      disabled={!!values.num_activity && !editField.num_activity}
                    />
                    {values.num_activity && !editField.num_activity && (
                      <button
                        type="button"
                        className="absolute right-6 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setEditField(prev => ({ ...prev, num_activity: true }))}
                        tabIndex={-1}
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <ErrorMessage name="num_activity" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  {/* Numéro TVA */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Numéro TVA</label>
                    <Field
                      type="text"
                      name="num_tva"
                      className="text-[#757575] w-full py-3 font-semibold text-[13px] border border-gray-300 rounded-md px-3 bg-gray-50 pr-10"
                      disabled={!!values.num_tva && !editField.num_tva}
                    />
                    {values.num_tva && !editField.num_tva && (
                      <button
                        type="button"
                        className="absolute right-6 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setEditField(prev => ({ ...prev, num_tva: true }))}
                        tabIndex={-1}
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <ErrorMessage name="num_tva" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  {/* Numéro d'autorisation d'enseigner */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Numéro d'autorisation d'enseigner</label>
                    <Field
                      type="text"
                      name="num_teach_authorization"
                      className="text-[#757575] w-full py-3 font-semibold text-[13px] border border-gray-300 rounded-md px-3 bg-gray-50 pr-10"
                      disabled={!!values.num_teach_authorization && !editField.num_teach_authorization}
                    />
                    {values.num_teach_authorization && !editField.num_teach_authorization && (
                      <button
                        type="button"
                        className="absolute right-6 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setEditField(prev => ({ ...prev, num_teach_authorization: true }))}
                        tabIndex={-1}
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <ErrorMessage name="num_teach_authorization" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  {/* Autorisation d'enseigner valable jusqu'au */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Autorisation d'enseigner valable jusqu'au</label>
                    <div className="relative flex items-center ">
                      <Field
                        type="date"
                        name="date_teach_permit"
                        className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left pr-10 text-gray-500"
                        disabled={!!values.date_teach_permit && !editField.date_teach_permit}
                      />
                      {values.date_teach_permit && !editField.date_teach_permit && (
                        <button
                          type="button"
                          className="absolute right-6 text-gray-400 hover:text-gray-600"
                          onClick={() => setEditField(prev => ({ ...prev, date_teach_permit: true }))}
                          tabIndex={-1}
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                      {/* <span className="pointer-events-none absolute inset-y-0 right-10 flex items-center pr-3">
                        <FaCalendarAlt size={18} className="text-gray-400" />
                      </span> */}
                    </div>
                    <ErrorMessage name="date_teach_permit" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  {/* Visite médicale valable jusqu'au */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Visite médicale valable jusqu'au</label>
                    <div className="relative flex items-center py-2">
                      <Field
                        type="date"
                        name="date_medical_visit"
                        className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left pr-10 text-gray-500"
                        disabled={!!values.date_medical_visit && !editField.date_medical_visit}
                      />
                      {values.date_medical_visit && !editField.date_medical_visit && (
                        <button
                          type="button"
                          className="absolute right-6 text-gray-400 hover:text-gray-600"
                          onClick={() => setEditField(prev => ({ ...prev, date_medical_visit: true }))}
                          tabIndex={-1}
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                      {/* <span className="pointer-events-none absolute inset-y-0 right-10 flex items-center pr-3">
                        <FaCalendarAlt size={18} className="text-gray-400" />
                      </span> */}
                    </div>
                    <ErrorMessage name="date_medical_visit" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Numéro de certification</label>
                    <div className="relative flex items-center py-2">
                      <Field
                        type="text"
                        name="certification_number"
                        placeholder="Numéro de certification"
                        className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left pr-10 text-gray-500"
                        disabled={!!values.certification_number && !editField.certification_number}
                      />
                      {values.certification_number && !editField.certification_number && (
                        <button
                          type="button"
                          className="absolute right-6 text-gray-400 hover:text-gray-600"
                          onClick={() => setEditField(prev => ({ ...prev, certification_number: true }))}
                          tabIndex={-1}
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                      {/* <span className="pointer-events-none absolute inset-y-0 right-10 flex items-center pr-3">
                        <FaCalendarAlt size={18} className="text-gray-400" />
                      </span> */}
                    </div>
                    <ErrorMessage name="certification_number" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Date de prise de la certification</label>
                    <div className="relative flex items-center py-2">
                      <Field
                        type="date"
                        name="certification_issue_date"
                        className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left pr-10 text-gray-500"
                        disabled={!!values.certification_issue_date && !editField.certification_issue_date}
                      />
                      {values.certification_issue_date && !editField.certification_issue_date && (
                        <button
                          type="button"
                          className="absolute right-6 text-gray-400 hover:text-gray-600"
                          onClick={() => setEditField(prev => ({ ...prev, certification_issue_date: true }))}
                          tabIndex={-1}
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                      {/* <span className="pointer-events-none absolute inset-y-0 right-10 flex items-center pr-3">
                        <FaCalendarAlt size={18} className="text-gray-400" />
                      </span> */}
                    </div>
                    <ErrorMessage name="certification_issue_date" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div className="flex pt-4 md:items-end md:justify-end justify-center mb-8">
                    <button
                      type="submit"
                      disabled={isSavingAdminInfos || isSubmitting}
                      className={`flex items-center justify-center gap-2 bg-[#6c61f6] px-4 py-3 rounded-md transition-all duration-200 text-[13px] text-[#FDFDFD] font-semibold ${isSavingAdminInfos || isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      Enregistrer mes informations administratives
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      {/* <h2 className="font-semibold text-lg text-[#616161] py-6">Obtenez votre bilan professionnel</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-semibold mb-1">Du</label>
            <div className="relative flex items-center">
              <input type="text" value="20/12/2025" readOnly className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500" />
              <FaCalendarAlt 
                  size={18} 
                  className="absolute right-3 cursor-pointer text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Au</label>
            <div className="relative flex items-center">
              <input type="text" value="20/12/2025" readOnly className="text-[#757575] py-3 font-semibold text-[13px] flex-1 border border-gray-300 rounded-md px-3 bg-gray-50 text-left flex items-center gap-2 text-gray-500" />
              <FaCalendarAlt 
                  size={18} 
                  className="absolute right-3 cursor-pointer text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>
          
      </div>
      
      <div className="flex pt-4 md:items-end md:justify-end justify-center">
        <button className="flex items-center justify-center gap-2 bg-[#6c61f6] px-4 py-3 rounded-md transition-all duration-200 text-[13px] text-[#FDFDFD] font-semibold">
          Exporter mon bilan pro<img className="text-white" src={Vectory} alt="image" />
        </button>
      </div> */}
    </div>
  );
};

export default AdminDocuments; 