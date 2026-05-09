import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { fetchLearnerInfo } from "@/api/admin/InfosApprenant";
import Loader from "@/components/common/Loader";
import { imageUrl } from "@/api";
import { Download, FileText, Image, AlertCircle } from "lucide-react";

export function InfosApprenant({ userId }: { userId: string | undefined }) {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(true);

  useEffect(() => {
    if (!userId || !token) return;
    setLoading(true);
    fetchLearnerInfo(userId, token)
      .then(res => setData(res.data))
      .catch(() => setErr("Impossible de charger les informations de l'apprenant."))
      .finally(() => setLoading(false));
  }, [userId, token]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (err) {
    return <div className="text-center text-red-500 py-8">{err}</div>;
  }

  if (!data) {
    return <div className="text-center text-gray-500 py-8">Aucune information trouvée.</div>;
  }

  const profile = data.learner_profile;
  
  // Documents d'identité traditionnels
  const identityDocs = [
    {
      label: "CIN",
      value: profile?.cin_number,
      date: profile?.cin_issue_date,
      place: profile?.cin_issue_place,
      docUrl: profile?.cin_doc ? `${imageUrl}${profile.cin_doc}` : null,
    },
    {
      label: "Permis",
      value: profile?.permit_number,
      date: profile?.permit_issue_date,
      category: profile?.permit_category,
      docUrl: profile?.permit_doc ? `${imageUrl}${profile.permit_doc}` : null,
    },
  ];

  // Documents administratifs
  const adminDocs = [
    {
      key: 'identity',
      label: 'Pièce d\'identité accompagnateur',
      description: 'PDF - Pièce d\'identité accompagnateur',
      value: profile?.identity,
      type: 'pdf'
    },
    {
      key: 'accommodation',
      label: 'Attestation d\'hébergement',
      description: 'PDF - Attestation d\'hébergement/ justificatif de domicile de moins de 6 mois',
      value: profile?.accommodation,
      type: 'pdf'
    },
    {
      key: 'authorize',
      label: 'Autorisation parentale',
      description: 'PDF - pour les mineurs (autorisation parentale)',
      value: profile?.authorize,
      type: 'pdf'
    },
    {
      key: 'identityPhoto',
      label: 'Photo d\'identité',
      description: 'Image - une photo d\'identité conforme de moins de 6 mois',
      value: profile?.identityPhoto,
      type: 'image'
    },
    {
      key: 'assr',
      label: 'ASSR1 ou ASSR2',
      description: 'PDF - Attestation Scolaire de Sécurité Routière (pour les moins de 21 ans)',
      value: profile?.assr,
      type: 'pdf'
    },
    {
      key: 'cip',
      label: 'Certificat JDC',
      description: 'PDF - Certificat individuel de participation à la JDC (17-25 ans, nationalité française)',
      value: profile?.cip,
      type: 'pdf'
    },
    {
      key: 'medicalVisit',
      label: 'Visite médicale',
      description: 'PDF - Visite médicale chez un médecin agréé (si applicable)',
      value: profile?.medicalVisit,
      type: 'pdf'
    },
    {
      key: 'snu',
      label: 'Certificat SNU',
      description: 'PDF - Certificat de participation au Service National Universel',
      value: profile?.snu,
      type: 'pdf'
    },
    {
      key: 'neph',
      label: 'N.E.P.H',
      description: 'Numéro d\'Enregistrement Préfectoral Harmonisé',
      value: profile?.neph,
      type: 'text'
    }
  ];

  // Fonction pour télécharger un document
  const handleDownload = (fileUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Initiales pour fallback
  const initials = `${data?.lastname?.charAt(0) ?? ""}${data?.firstname?.charAt(0) ?? ""}`.toUpperCase();

  // Compter les documents présents
  const totalAdminDocs = adminDocs.length;
  const presentAdminDocs = adminDocs.filter(doc => doc.value).length;

  return (
    <div className="py-4 mx-auto space-y-6">
      {/* En-tête stylé */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow p-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {data.photo ? (
            <>
              {photoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full z-10">
                  <Loader />
                </div>
              )}
              <img
                src={`${imageUrl}${data.photo}`}
                alt={`${data.firstname} ${data.lastname}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#BCADFC] shadow"
                style={photoLoading ? { visibility: "hidden" } : {}}
                onLoad={() => setPhotoLoading(false)}
                onError={() => setPhotoLoading(false)}
              />
            </>
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#BCADFC] flex items-center justify-center text-3xl font-bold text-white border-4 border-[#BCADFC] shadow">
              {initials || "?"}
            </div>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{data.firstname} {data.lastname}</h2>
          <div className="text-gray-600 mb-1">@{data.email}</div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-500">
            <div>
              <span className="font-semibold">Téléphone:</span> {data.phone || "-"}
            </div>
            <div>
              <span className="font-semibold">Date de naissance:</span>{" "}
              {profile?.birthdate ? new Date(profile.birthdate).toLocaleDateString() : "-"}
            </div>
            <div>
              <span className="font-semibold">Ville:</span> {profile?.city || "-"}
            </div>
            <div>
              <span className="font-semibold">Adresse:</span> {profile?.address || "-"}
            </div>
            <div>
              <span className="font-semibold">Code postal:</span> {profile?.postal_code || "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Documents d'identité  */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-[#BCADFC]" />
          Documents d'identité
        </h3>
        <div className="flex flex-col gap-4">
          {identityDocs.every(doc => !doc.value) && (
            <div className="text-gray-500 text-center py-4">Aucun document d'identité renseigné.</div>
          )}
          {identityDocs.map((doc, idx) =>
            doc.value ? (
              <div key={idx} className="flex flex-col md:flex-row md:items-center md:gap-8 border border-gray-100 rounded-lg p-4">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{doc.label}</div>
                  <div className="text-gray-600 mt-1">
                    {doc.label === "CIN" && (
                      <>
                        Numéro: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{doc.value}</span>
                        <br />
                        Délivré le: {doc.date ? new Date(doc.date).toLocaleDateString() : "-"}
                        <br />
                        Lieu: {doc.place || "-"}
                      </>
                    )}
                    {doc.label === "Permis" && (
                      <>
                        Numéro: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{doc.value}</span>
                        <br />
                        Délivré le: {doc.date ? new Date(doc.date).toLocaleDateString() : "-"}
                        <br />
                        Catégorie: {doc.category || "-"}
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  {doc.docUrl ? (
                    <button
                      onClick={() => handleDownload(doc.docUrl!, `${doc.label}_${data.lastname}_${data.firstname}.pdf`)}
                      className="inline-flex items-center px-4 py-2 bg-[#BCADFC] text-white rounded-lg shadow hover:bg-[#a99ae6] transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </button>
                  ) : (
                    <div className="flex items-center text-gray-400">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Aucun fichier
                    </div>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Documents administratifs */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="h-5 w-5 mr-2 text-[#BCADFC]" />
            Documents administratifs
          </h3>
          <div className="text-sm text-gray-500">
            {presentAdminDocs} / {totalAdminDocs} documents
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminDocs.map((doc) => (
            <div key={doc.key} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {doc.type === 'image' ? (
                      <Image className="h-4 w-4 mr-2 text-blue-500" />
                    ) : doc.type === 'pdf' ? (
                      <FileText className="h-4 w-4 mr-2 text-red-500" />
                    ) : (
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    )}
                    <h4 className="font-medium text-gray-900 text-sm">{doc.label}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{doc.description}</p>
                  
                  {doc.value ? (
                    <div className="flex items-center justify-between">
                      {doc.type === 'text' ? (
                        <div className="flex-1">
                          <div className="bg-green-50 border border-green-200 rounded px-3 py-2">
                            <span className="text-green-700 font-mono text-sm">{doc.value}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center text-green-600 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Disponible
                          </div>
                          <button
                            onClick={() => handleDownload(`${imageUrl}${doc.value}`, `${doc.key}_${data.lastname}_${data.firstname}`)}
                            className="ml-2 inline-flex items-center px-2 py-1 text-xs bg-[#BCADFC] text-white rounded hover:bg-[#a99ae6] transition-colors"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Télécharger
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400 text-sm">
                      <AlertCircle className="h-3 w-3 mr-2" />
                      Non fourni
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {presentAdminDocs === 0 && (
          <div className="text-center text-gray-500 py-8">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            Aucun document administratif fourni
          </div>
        )}
      </div>

      {/* Statistiques */}
      <div className="bg-gradient-to-r from-[#BCADFC] to-[#a99ae6] rounded-xl shadow p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Résumé du dossier</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{presentAdminDocs}</div>
            <div className="text-sm opacity-90">Docs fournis</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{totalAdminDocs - presentAdminDocs}</div>
            <div className="text-sm opacity-90">Docs manquants</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{profile?.hour || 0}h</div>
            <div className="text-sm opacity-90">Heures recommandées</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{profile?.test_passed ? '✓' : '✗'}</div>
            <div className="text-sm opacity-90">Test passé</div>
          </div>
        </div>
      </div>
    </div>
  );
}