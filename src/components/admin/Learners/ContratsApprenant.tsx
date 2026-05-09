/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listContratsApprenant, addContratApprenant, updateContratApprenant, Contrat } from "@/api/admin/ContratsApprenant";
import { fetchSouscriptionsApprenant, Souscription } from "@/api/admin/SouscriptionsApprenant";
import { fetchLearnerInfo } from "@/api/admin/InfosApprenant";
import Loader from "@/components/common/Loader";
import { RootState } from "@/store/configureStore";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ChevronDown, Download, Eye } from "lucide-react";
import { imageUrl } from "@/api";
import { Tooltip } from "react-tooltip";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2Mo

export function ContratsApprenant({ userId }: { userId: string | number | undefined }) {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [souscriptions, setSouscriptions] = useState<Souscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [contratToEdit, setContratToEdit] = useState<Contrat | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Pour le nom complet de l'apprenant (pour le nom du fichier)
  const [learnerName, setLearnerName] = useState<string>("");
  
  useEffect(() => {
      if (!userId || !token) return;
      fetchLearnerInfo(userId, token)
        .then(res => setLearnerName(`${res.data.firstname}_${res.data.lastname}`))
        .catch(() => setLearnerName(""));
    }, [userId, token]);
  
  // Charger souscriptions et contrats au chargement
  useEffect(() => {
    if (!token || !userId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchSouscriptionsApprenant(token, userId, 1, 50),
      listContratsApprenant(token, userId, 1, 50)
    ])
      .then(([subs, contratsRes]) => {
        setSouscriptions(subs.data);
        setContrats(contratsRes.data);
      })
      .catch(() => setError("Erreur lors du chargement des contrats ou souscriptions."))
      .finally(() => setLoading(false));
  }, [token, userId]);

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Créer un lien temporaire pour le téléchargement
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'contrat.pdf';
      document.body.appendChild(a);
      a.click();

      // Nettoyer
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Erreur lors du téléchargement du fichier");
    }
  };

  const handleView = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  // Handler pour ouvrir le modal d'édition
  const openEditModal = (contrat: Contrat) => {
    setContratToEdit(contrat);
    setEditModalOpen(true);
  };

  // Handler pour fermer le modal d'édition
  const closeEditModal = () => {
    setContratToEdit(null);
    setEditModalOpen(false);
  };

  return (
    <div className="py-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#6C4EEA]">Contrats</h2>

              {souscriptions.length === 0 ? (
                <Tooltip content="Aucune souscription trouvée pour cet apprenant">
                  <button
                    className="px-4 py-2 rounded bg-[#6C4EEA] text-white font-semibold shadow opacity-50 cursor-not-allowed"
                    disabled
                  >
                    + Ajouter un contrat
                  </button>
                </Tooltip>
              ) : (
                <button
                  className="px-4 py-2 rounded bg-[#6C4EEA] text-white font-semibold shadow hover:bg-[#4e3bbd] transition"
                  onClick={() => setModalOpen(true)}
                >
                  + Ajouter un contrat
                </button>
              )}
            </div>


      {/* Modal d'ajout */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={e => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-[#6C4EEA]">Ajouter un contrat</h3>
            <Formik
              initialValues={{
                subscription_id: "",
                file: null as File | null,
              }}
              validationSchema={Yup.object({
                subscription_id: Yup.string().required("Souscription requise"),
                file: Yup.mixed()
                  .required("Fichier PDF requis")
                  .test(
                    "fileSize",
                    "Le fichier ne doit pas dépasser 2Mo.",
                    value => !value || (value && (value as File).size <= MAX_FILE_SIZE)
                  )
                  .test(
                    "fileType",
                    "Seuls les fichiers PDF sont acceptés.",
                    value => !value || (value && (value as File).type === "application/pdf")
                  ),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                if (!token || !userId) return;
                setSubmitting(true);
                try {
                  await addContratApprenant(token, userId, Number(values.subscription_id), values.file!);
                  toast.success("Contrat ajouté avec succès !");
                  setModalOpen(false);
                  resetForm();
                  // Refresh la liste
                  const contratsRes = await listContratsApprenant(token, userId as string | number, 1, 50);
                  setContrats(contratsRes.data);
                } catch (err: any) {
                  if (err?.status === 405) {
                    toast.error(err.message || "Un contrat a déjà été établi pour cet abonnement.");
                  } else if (err?.message?.includes("must not be greater than 2048 kilobytes")) {
                    toast.error("Le fichier ne doit pas dépasser 2Mo.");
                  } else {
                    toast.error(err?.message || "Erreur lors de l'ajout du contrat.");
                  }
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ setFieldValue, isSubmitting, isValid, touched, errors, handleBlur }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Souscription</label>
                    <div className="relative">
                      <Field
                        as="select"
                        name="subscription_id"
                        className={`w-full rounded border-gray-300 focus:border-[#6C4EEA] focus:ring-[#6C4EEA] pr-8 py-2 pl-3 appearance-none bg-white shadow-sm ${
                          touched.subscription_id && errors.subscription_id ? "border-red-400" : ""
                        }`}
                        disabled={souscriptions.length === 0}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled>Sélectionner une souscription</option>
                        {souscriptions.map(sub => (
                          <option key={sub.id} value={sub.id}>
                            {sub.service?.title} - {new Date(sub.start_date).toLocaleDateString()}
                          </option>
                        ))}
                      </Field>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                    <ErrorMessage name="subscription_id" component="div" className="text-xs text-red-500 mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fichier PDF</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      className={`w-full border rounded py-2 px-2 ${touched.file && errors.file ? "border-red-400" : ""}`}
                      onChange={e => {
                        setFieldValue("file", e.currentTarget.files?.[0] || null);
                      }}
                      onBlur={handleBlur}
                      disabled={souscriptions.length === 0}
                    />
                    <ErrorMessage name="file" component="div" className="text-xs text-red-500 mt-1" />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-2 rounded bg-[#6C4EEA] text-white font-semibold hover:bg-[#4e3bbd] transition flex items-center justify-center gap-2 ${
                      (!isValid || isSubmitting || souscriptions.length === 0) ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    disabled={!isValid || isSubmitting || souscriptions.length === 0}
                  >
                    {isSubmitting && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                    )}
                    {isSubmitting ? "Ajout en cours..." : "Ajouter"}
                  </button>
                </Form>
              )}
            </Formik>
            {souscriptions.length === 0 && (
              <div className="mt-3 text-sm text-red-500 text-center">
                Aucun abonnement disponible pour rattacher un contrat.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal d'édition */}
      {editModalOpen && contratToEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={e => {
            if (e.target === e.currentTarget) closeEditModal();
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={closeEditModal}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-[#6C4EEA]">Mettre à jour le contrat</h3>
            <Formik
              initialValues={{
                file: null as File | null,
              }}
              validationSchema={Yup.object({
                file: Yup.mixed()
                  .required("Fichier PDF requis")
                  .test(
                    "fileSize",
                    "Le fichier ne doit pas dépasser 2Mo.",
                    value => !value || (value && (value as File).size <= MAX_FILE_SIZE)
                  )
                  .test(
                    "fileType",
                    "Seuls les fichiers PDF sont acceptés.",
                    value => !value || (value && (value as File).type === "application/pdf")
                  ),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                if (!token || !contratToEdit) return;
                setSubmitting(true);
                try {
                  await updateContratApprenant(token, contratToEdit.id, values.file!);
                  toast.success("Contrat mis à jour avec succès !");
                  closeEditModal();
                  resetForm();
                  // Refresh la liste
                  const contratsRes = await listContratsApprenant(token, userId as string | number, 1, 50);
                  setContrats(contratsRes.data);
                } catch (err: any) {
                  if (err?.status === 405) {
                    toast.error(err.message || "Erreur lors de la mise à jour du contrat.");
                  } else if (err?.message?.includes("must not be greater than 2048 kilobytes")) {
                    toast.error("Le fichier ne doit pas dépasser 2Mo.");
                  } else {
                    toast.error(err?.message || "Erreur lors de la mise à jour du contrat.");
                  }
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ setFieldValue, isSubmitting, isValid, touched, errors, handleBlur }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nouveau fichier PDF</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      className={`w-full border rounded py-2 px-2 ${touched.file && errors.file ? "border-red-400" : ""}`}
                      onChange={e => {
                        setFieldValue("file", e.currentTarget.files?.[0] || null);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="file" component="div" className="text-xs text-red-500 mt-1" />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-2 rounded bg-[#6C4EEA] text-white font-semibold hover:bg-[#4e3bbd] transition flex items-center justify-center gap-2 ${
                      (!isValid || isSubmitting) ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                    )}
                    {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Liste des contrats */}
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center py-10"><Loader /></div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : contrats.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Aucun contrat trouvé.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contrats.map(contrat => {
              const fileName = `contrat_de_${learnerName || "apprenant"}_${contrat.id}.pdf`;
              const fileUrl = `/storage/${contrat.file_original}`;
              return (
                <div key={contrat.id} className="bg-white rounded-xl shadow p-5 border border-indigo-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#6C4EEA]">{contrat.subscription?.service?.title}</span>
                    <span className="text-xs text-gray-500">{new Date(contrat.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-gray-700 flex items-center gap-3">
                    <span className="font-medium">Fichier : </span>
                    <button
                      type="button"
                      onClick={() => handleView(fileUrl)}
                      className="text-[#6C4EEA] underline flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition"
                    >
                      <Eye size={16} />
                      Voir
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(fileUrl, fileName)}
                      className="text-[#6C4EEA] underline flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition"
                    >
                      <Download size={16} />
                      Télécharger
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(contrat)}
                      className="ml-auto px-3 py-1 rounded bg-[#F4F3FF] text-[#6C4EEA] font-semibold hover:bg-[#e6e2fa] transition"
                    >
                      Mettre à jour
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Tag : {contrat.tag} | Signé par : {contrat.file_signed}
                  </div>
                  <div className="text-xs text-gray-400">
                    Créé le {new Date(contrat.created_at).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    Mis à jour le {new Date(contrat.updated_at).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}