import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/common/Loader";
import Spinner from "@/components/common/Spinner";
import { getMonitorDetails, toggleMonitorStatus, updateMonitorHourPrice, updateMonitorHourDiscount } from "@/api/admin/monitor";
import { imageUrl } from "@/api";
import type { RootState } from "@/store/configureStore";
import { User, Car, MapPin, Clock, FileText, CalendarDays, Users, ClipboardList, CheckCircle, XCircle, ChevronLeft, Pencil, Check, Loader as LoaderIcon, Calendar,} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { MonitorPlanningTab } from "@/pages/admin/MonitorAvalibilities";
import { MonitorAppointmentsTab } from "@/pages/admin/MonitorApointementListe";
import { MonitorLearnersTab } from "@/pages/admin/MonitorLeanerListe";
import { toast } from "react-hot-toast";

const tabs = [
  { id: "profil", label: "Profil", icon: User },
  { id: "planning", label: "Planning", icon: CalendarDays },
  { id: "appointments", label: "Rendez-vous", icon: ClipboardList },
  { id: "learners", label: "Apprenants", icon: Users },
  { id: "vehicles", label: "Véhicules", icon: Car },
  { id: "meetingPoints", label: "Points de rendez-vous", icon: MapPin },
  { id: "dispos", label: "Disponibilités", icon: Clock },
  { id: "doc", label: "Documents", icon: FileText },
];

type TabType = (typeof tabs)[number]["id"];

const MonitorShow = () => {
  const location = useLocation();
  const monitorId = location.state?.monitorId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [activeTab, setActiveTab] = useState<TabType>("profil");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [openDocViewer, setOpenDocViewer] = useState(false);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [docName, setDocName] = useState<string>("");
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [hourPrice, setHourPrice] = useState<number | null>(null);
  const [hourDiscount, setHourDiscount] = useState<number | null>(null);
  const [savingHourPrice, setSavingHourPrice] = useState(false);
  const [savingHourDiscount, setSavingHourDiscount] = useState(false);
  const [editHourPrice, setEditHourPrice] = useState(false);
  const [editHourDiscount, setEditHourDiscount] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (monitorId) {
      getMonitorDetails(token, monitorId.toString()).then((data) => {
        setDetails(data);
        setLoading(false);
        setHourPrice(data?.user?.instructor_profile?.hourPrice ?? null);
        setHourDiscount(data?.user?.instructor_profile?.hourDiscount ?? null);
        setEditHourPrice(false);
        setEditHourDiscount(false);
      });
    }
  }, [monitorId, token]);

  const handleToggleStatus = async () => {
    if (!monitorId) return;
    setLoadingToggle(true);
    await toggleMonitorStatus(token, monitorId.toString(), dispatch);
    const data = await getMonitorDetails(token, monitorId.toString());
    setDetails(data);
    setLoadingToggle(false);
  };

  const user = details?.user;
  const instructor_profile = user?.instructor_profile;
  const vehicles = details?.vehicles || [];
  const meetingPoints = details?.meetingPoints || [];
  const repeateds = details?.repeateds || [];

  const handleDocViewerClose = (open: boolean) => {
    setOpenDocViewer(open);
    if (!open) {
      setDocUrl(null);
      setDocName("");
      setIframeLoading(false);
      setIframeError(false);
    }
  };

  function renderTabContent() {
    if (loading) return <Loader />;
    switch (activeTab) {
      case "profil":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">Informations personnelles</h2>
              <div className="flex flex-wrap gap-4 px-2">
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Nom</span>
                  <span className="text-base font-semibold text-gray-900">{user?.firstname} {user?.lastname}</span>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Genre</span>
                  <span className="text-base font-semibold text-gray-900">{user?.genre || "-"}</span>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Téléphone</span>
                  <span className="text-base font-semibold text-gray-900">{user?.phone || "-"}</span>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Email</span>
                  <span className="text-base font-semibold text-gray-900">{user?.email}</span>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Statut</span>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user?.is_active ? "border border-green-300 bg-green-100 text-green-700" : "border border-red-300 bg-red-100 text-red-700"}`}>{user?.is_active ? "Actif" : "Bloqué"}</span>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2 flex flex-col">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Email vérifié</span>
                  <span className="flex items-center gap-2 text-base font-semibold">
                    {user?.email_verified_at ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" /> Oui
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-600" /> Non
                      </>
                    )}
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Inscrit le</span>
                  <span className="text-base font-semibold text-gray-900">{user?.created_at ? new Date(user.created_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}</span>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                  <span className="block text-xs text-gray-500 font-medium mb-1">Mis à jour le</span>
                  <span className="text-base font-semibold text-gray-900">{user?.updated_at ? new Date(user.updated_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-4 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">Informations administratives</h2>
              {instructor_profile ? (
                <div className="flex flex-wrap gap-4 px-2">
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Adresse</span><span className="text-base font-semibold text-gray-900">{instructor_profile.address || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Ville</span><span className="text-base font-semibold text-gray-900">{instructor_profile.city || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Code postal</span><span className="text-base font-semibold text-gray-900">{instructor_profile.postal_code || "-"}</span></div>
                  {/* <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Bio</span><span className="text-base font-semibold text-gray-900">{instructor_profile.bio || "-"}</span></div> */}
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Solde</span><span className="text-base font-semibold text-gray-900">{instructor_profile.solde} €</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Certification n°</span><span className="text-base font-semibold text-gray-900">{instructor_profile.certification_number || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Date certification</span><span className="text-base font-semibold text-gray-900">{instructor_profile.certification_issue_date ? new Date(instructor_profile.certification_issue_date).toLocaleDateString() : "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2 flex items-center gap-2">
                    <span className="block text-xs text-gray-500 font-medium mb-1">Prix heure</span>
                    {editHourPrice ? (
                      <>
                        <input
                          type="number"
                          min={0}
                          className="border rounded px-2 py-1 w-20 text-right ml-2"
                          value={hourPrice ?? ""}
                          onChange={e => setHourPrice(Number(e.target.value))}
                          disabled={savingHourPrice}
                          autoFocus
                        />
                        <span>€</span>
                        <button
                          className="ml-2 p-1 rounded text-white bg-[#6C61F6] hover:bg-[#5547d6]"
                          onClick={async () => {
                            if (hourPrice === null || isNaN(hourPrice)) return;
                            setSavingHourPrice(true);
                            try {
                              const res = await updateMonitorHourPrice(token, monitorId, hourPrice);
                              if (res.success) {
                                toast.success("Prix de l'heure mis à jour");
                                const data = await getMonitorDetails(token, monitorId.toString());
                                setDetails(data);
                                setHourPrice(data?.user?.instructor_profile?.hourPrice ?? null);
                                setEditHourPrice(false);
                              } else {
                                toast.error("Erreur lors de la mise à jour");
                              }
                            } catch {
                              toast.error("Erreur lors de la mise à jour");
                            }
                            setSavingHourPrice(false);
                          }}
                          disabled={savingHourPrice}
                        >
                          {savingHourPrice ? <LoaderIcon className="animate-spin w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-base font-semibold text-gray-900 ml-2">{hourPrice} €</span>
                        <button
                          className="ml-2 p-1 rounded hover:bg-gray-100"
                          onClick={() => setEditHourPrice(true)}
                          aria-label="Modifier le prix de l'heure"
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2 flex items-center gap-2">
                    <span className="block text-xs text-gray-500 font-medium mb-1">Remise heure</span>
                    {editHourDiscount ? (
                      <>
                        <input
                          type="number"
                          min={0}
                          className="border rounded px-2 py-1 w-20 text-right ml-2"
                          value={hourDiscount ?? ""}
                          onChange={e => setHourDiscount(Number(e.target.value))}
                          disabled={savingHourDiscount}
                          autoFocus
                        />
                        <span>€</span>
                        <button
                          className="ml-2 p-1 rounded text-white bg-[#6C61F6] hover:bg-[#5547d6]"
                          onClick={async () => {
                            if (hourDiscount === null || isNaN(hourDiscount)) return;
                            setSavingHourDiscount(true);
                            try {
                              const res = await updateMonitorHourDiscount(token, monitorId, hourDiscount);
                              if (res.success) {
                                toast.success("Remise mise à jour");
                                const data = await getMonitorDetails(token, monitorId.toString());
                                setDetails(data);
                                setHourDiscount(data?.user?.instructor_profile?.hourDiscount ?? null);
                                setEditHourDiscount(false);
                              } else {
                                toast.error("Erreur lors de la mise à jour");
                              }
                            } catch {
                              toast.error("Erreur lors de la mise à jour");
                            }
                            setSavingHourDiscount(false);
                          }}
                          disabled={savingHourDiscount}
                        >
                          {savingHourDiscount ? <LoaderIcon className="animate-spin w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-base font-semibold text-gray-900 ml-2">{hourDiscount} €</span>
                        <button
                          className="ml-2 p-1 rounded hover:bg-gray-100"
                          onClick={() => setEditHourDiscount(true)}
                          aria-label="Modifier la remise sur l'heure"
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2">
                    <span className="block text-xs text-gray-500 font-medium mb-1">TVA</span>
                    <span className="text-base font-semibold text-gray-900">
                        {instructor_profile.tva}
                    </span>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Forme juridique</span><span className="text-base font-semibold text-gray-900">{instructor_profile.juridic_form || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">SIRET</span><span className="text-base font-semibold text-gray-900">{instructor_profile.siret || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Numéro activité</span><span className="text-base font-semibold text-gray-900">{instructor_profile.num_activity || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Numéro TVA</span><span className="text-base font-semibold text-gray-900">{instructor_profile.num_tva || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Numéro autorisation</span><span className="text-base font-semibold text-gray-900">{instructor_profile.num_teach_authorization || "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Date visite médicale</span><span className="text-base font-semibold text-gray-900">{instructor_profile.date_medical_visit ? new Date(instructor_profile.date_medical_visit).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }) : "-"}</span></div>
                  <div className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[220px] mb-2"><span className="block text-xs text-gray-500 font-medium mb-1">Créé le</span><span className="text-base font-semibold text-gray-900">{instructor_profile.created_at ? new Date(instructor_profile.created_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}</span></div>
                </div>
              ) : (
                <div className="text-[14px] text-gray-500">Aucun profil instructeur renseigné.</div>
              )}
            </div>
          </div>
        );
      case "planning":
        return monitorId ? <MonitorPlanningTab monitorId={monitorId} /> : <div>Pas d'identifiant moniteur.</div>;
      case "appointments":
        return monitorId ? <MonitorAppointmentsTab monitorId={monitorId} /> : <div>Pas d'identifiant moniteur.</div>;
      case "learners":
        return monitorId ? <MonitorLearnersTab monitorId={monitorId} /> : <div>Pas d'identifiant moniteur.</div>;
      case "vehicles":
        return (
          <div className="space-y-2">
            <h2 className="mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">
              Véhicules
            </h2>
            {vehicles.length === 0 ? (
              <div className="text-[14px] text-gray-500">
                Aucun véhicule renseigné.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((v: any) => (
                  <div
                    key={v.id}
                    className="flex flex-col md:flex-row items-center gap-4 rounded-lg border bg-white px-4 py-4 shadow hover:shadow-lg transition"
                  >
                    {v.photo_url ? (
                      <img
                        src={imageUrl + v.photo_url}
                        alt={v.brand + ' ' + v.model}
                        className="h-24 w-32 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="h-24 w-32 flex items-center justify-center bg-gray-100 rounded-md border text-gray-400 text-4xl">
                        <Car className="w-10 h-10" />
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-800">{v.brand} {v.model}</span>
                        <span className="text-xs text-gray-500">({v.year})</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">Plaque : {v.plate_number}</div>
                      <div className="flex flex-wrap gap-2 text-xs mb-1">
                        <span className="bg-gray-100 rounded px-2 py-1">{v.gearbox_type === "automatic" ? "Automatique" : "Manuelle"}</span>
                        <span className="bg-gray-100 rounded px-2 py-1">{v.color}</span>
                        <span className="bg-gray-100 rounded px-2 py-1">{v.fuel_type}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${v.status === "available" ? "border border-green-300 bg-green-100 text-green-700" : v.status === "maintenance" ? "border border-yellow-300 bg-yellow-100 text-yellow-700" : "border border-red-300 bg-red-100 text-red-700"}`}>{v.status === "available" ? "Disponible" : v.status === "maintenance" ? "Maintenance" : "Indisponible"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "meetingPoints":
        return (
          <div className="w-full space-y-2">
            <h2 className="mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">
              Points de rendez-vous
            </h2>
            {meetingPoints.length === 0 ? (
              <div className="text-[14px] text-gray-500">
                Aucun point de rendez-vous renseigné.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {meetingPoints.map((m: any) => (
                  <div
                    key={m.id}
                    className="flex flex-col gap-2 rounded-lg border bg-white px-4 py-4 shadow hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-6 w-6 text-[#6C61F6]" />
                      <span className="text-lg font-bold text-gray-800">{m.label}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{m.address}</div>
                    <div className="flex flex-wrap gap-2 text-xs mb-1">
                      <span className="bg-gray-100 rounded px-2 py-1">{m.city}</span>
                      <span className="bg-gray-100 rounded px-2 py-1">{m.postal_code}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${m.is_active ? "border border-green-300 bg-green-100 text-green-700" : "border border-red-300 bg-red-100 text-red-700"}`}>{m.is_active ? "Actif" : "Inactif"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "dispos":
          return (
            <div className="w-full space-y-2">
              <h2 className="mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">
                Disponibilités par jour
              </h2>
              {repeateds && repeateds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repeateds.map((dayObj: any, dayIndex: number) => {
                    const dayName = Object.keys(dayObj)[0];
                    const dayData = dayObj[dayName];
                    
                    // Collecter toutes les heures de disponibilité pour ce jour
                    const allHours = dayData && dayData.length > 0 
                      ? dayData.reduce((hours: string[], slot: any) => {
                          if (slot.time && slot.time.length > 0) {
                            slot.time.forEach((timeSlot: any) => {
                              const timeRange = `${timeSlot.start.slice(0, 5)} - ${timeSlot.end.slice(0, 5)}`;
                              if (!hours.includes(timeRange)) {
                                hours.push(timeRange);
                              }
                            });
                          }
                          return hours;
                        }, [])
                      : [];
                    
                    return (
                      <div
                        key={dayIndex}
                        className="flex flex-col gap-3 rounded-lg border bg-white px-4 py-4 shadow hover:shadow-lg transition"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-[#6C61F6]" />
                          <span className="text-lg font-bold text-gray-800 capitalize">
                            {dayName}
                          </span>
                        </div>
                        
                        {allHours.length > 0 ? (
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-700">Disponible :</span>
                            <div className="flex flex-wrap gap-2">
                              {allHours.map((timeRange: string, timeIndex: number) => (
                                <span key={timeIndex} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                  {timeRange}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <div className="text-sm text-gray-500">
                              Aucune disponibilité pour ce jour
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-[14px] text-gray-500">
                  Aucune disponibilité renseignée.
                </div>
              )}
            </div>
          );
      case "doc":
        return (
          <div className="w-full space-y-2">
            <h2 className="mb-4 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">Documents</h2>
            {!details?.doc || details.doc.length === 0 ? (
              <div className="text-[14px] text-gray-500">Aucun document fourni.</div>
            ) : (
              <div className="flex flex-wrap gap-4 px-2">
                {details.doc.map((d: any) => (
                  <div key={d.id} className="bg-white rounded-lg shadow-sm px-6 py-4 min-w-[290px] mb-2 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-6 w-6 text-[#6C61F6]" />
                      <span className="text-[15px] font-semibold">{d.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">{d.file_type}</div>
                    <div className="text-xs text-gray-500">
                      {d.created_at
                        ? new Date(d.created_at).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="text-xs text-[#6C61F6] underline"
                        onClick={() => {
                          setDocUrl(`${imageUrl}${d.file}`);
                          setDocName(d.name);
                          setOpenDocViewer(true);
                          setIframeLoading(true);
                          setIframeError(false);
                        }}
                      >
                        Visualiser
                      </button>
                      <a
                        href={`${imageUrl}${d.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#6C61F6] underline"
                      >
                        Télécharger
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Dialog open={openDocViewer} onOpenChange={handleDocViewerClose}>
              <DialogContent className="flex h-[85vh] w-full max-w-6xl flex-col px-4">
                <DialogHeader>
                  <DialogTitle className="max-w-[90%] truncate text-center text-xl font-semibold">
                    {docName || "Visualisation du document"}
                  </DialogTitle>
                </DialogHeader>
                <div className="relative flex flex-1 flex-col items-center justify-center">
                  {iframeLoading && !iframeError && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                      <Spinner />
                    </div>
                  )}
                  {iframeError ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4">
                      <span className="mb-2 font-semibold text-red-600">
                        Impossible d'afficher le document.
                      </span>
                      <a
                        href={docUrl || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#6C61F6] underline"
                      >
                        Télécharger le document
                      </a>
                    </div>
                  ) : (
                    docUrl && (
                      <iframe
                        src={docUrl}
                        title="Document"
                        className="h-[70vh] w-full rounded border-none"
                        onLoad={() => setIframeLoading(false)}
                        onError={() => {
                          setIframeLoading(false);
                          setIframeError(true);
                        }}
                      />
                    )
                  )}
                </div>
                {!iframeError && docUrl && (
                  <div className="flex justify-end p-2">
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md text-[#6C61F6] underline"
                    >
                      Télécharger ce document
                    </a>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="w-full px-8 py-4">
      <div className="mb-2 flex flex-col items-center gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded p-2 hover:bg-gray-100 focus:outline-none"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="flex w-full items-end justify-end mb-4">
            {user?.photo ? (
              <img
                src={imageUrl + user.photo}
                alt={`${user.firstname} ${user.lastname}`}
                className="h-20 w-20 rounded-full border-4 border-white object-cover shadow"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gray-500 text-3xl font-semibold text-white shadow">
                {`${user?.lastname?.charAt(0) ?? ""}${user?.firstname?.charAt(0) ?? ""}`}
              </div>
            )}
            <div className="flex flex-1 flex-col items-center md:items-start">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.firstname} {user?.lastname}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user?.is_active ? "border border-green-300 bg-green-100 text-green-700" : "border border-red-300 bg-red-100 text-red-700"}`}
                >
                  {user?.is_active ? "Actif" : "Bloqué"}
                </span>
                <span className="text-sm text-gray-500">{user?.email}</span>
                <span className="text-sm text-gray-500">
                  {user?.phone || "-"}
                </span>
              </div>
            </div>
            <div className="ml-4 flex items-center">
              <button
                className={`rounded px-4 py-2 text-xs font-semibold text-white transition ${user?.is_active ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                onClick={handleToggleStatus}
                disabled={loadingToggle}
              >
                {loadingToggle
                  ? "Veuillez patienter..."
                  : user?.is_active
                    ? "Bloquer"
                    : "Débloquer"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="scrollbar-hide mb-6 flex flex-nowrap gap-2 overflow-x-auto border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-t-md px-5 py-2 font-medium transition-colors duration-150 ${
              activeTab === tab.id
                ? "border-b-2 border-[#6C61F6] bg-white text-[#6C61F6] shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[300px] rounded-lg bg-white p-6 shadow">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MonitorShow;
