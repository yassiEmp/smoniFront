import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MonitorType } from "@/types/admin/reduceType";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  User,
  Calendar,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Car,
  MapPin,
  Clock,
  FileText,
  Shield,
  CalendarDays,
  Users,
  ClipboardList,
} from "lucide-react";
import { getMonitorDetails, toggleMonitorStatus, updateMonitorHourPrice, updateMonitorHourDiscount } from "@/api/admin/monitor";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/components/common/Loader";
import type { RootState } from "@/store/configureStore";
import { imageUrl } from "@/api";
import { useNavigate } from "react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Spinner from "@/components/common/Spinner";
import { toast } from "react-hot-toast";

interface MonitorDetailsProps {
  monitor: MonitorType;
  onClose: () => void;
}

type TabType =
  | "infos"
  | "admin"
  | "vehicles"
  | "meetingPoints"
  | "dispos"
  | "doc"
  | "action";

const TABS: { key: TabType; label: string }[] = [
  { key: "infos", label: "Personnelles" },
  { key: "admin", label: "Administratif" },
  { key: "vehicles", label: "Véhicules" },
  { key: "meetingPoints", label: "Points de rendez-vous" },
  { key: "dispos", label: "Disponibilités" },
  { key: "doc", label: "Documents" },
  { key: "action", label: "Action" },
];

const TAB_ICONS: Record<TabType, React.ReactNode> = {
  infos: <User className="mr-2 h-5 w-5" />,
  admin: <Lock className="mr-2 h-5 w-5" />,
  vehicles: <Car className="mr-2 h-5 w-5" />,
  meetingPoints: <MapPin className="mr-2 h-5 w-5" />,
  dispos: <Clock className="mr-2 h-5 w-5" />,
  doc: <FileText className="mr-2 h-5 w-5" />,
  action: <Shield className="mr-2 h-5 w-5" />,
};

const MonitorDetails = ({ monitor, onClose }: MonitorDetailsProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [tab, setTab] = useState<TabType>("infos");
  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const [loadingToggle, setLoadingToggle] = useState(false);
  const navigate = useNavigate();
  const [openDocViewer, setOpenDocViewer] = useState(false);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [docName, setDocName] = useState<string>("");
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [hourPrice, setHourPrice] = useState<number | null>(null);
  const [hourDiscount, setHourDiscount] = useState<number | null>(null);
  const [savingHourPrice, setSavingHourPrice] = useState(false);
  const [savingHourDiscount, setSavingHourDiscount] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setLoading(true);
    getMonitorDetails(token, monitor.id.toString()).then((data) => {
      setDetails(data);
      setLoading(false);
      setHourPrice(data?.user?.instructor_profile?.hourPrice ?? null);
      setHourDiscount(data?.user?.instructor_profile?.hourDiscount ?? null);
    });
  }, [monitor.id, token]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleToggleStatus = async () => {
    setLoadingToggle(true);
    await toggleMonitorStatus(token, monitor.id.toString(), dispatch);
    const data = await getMonitorDetails(token, monitor.id.toString());
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

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={` ${isMobile ? "h-[80vh] rounded-t-xl px-2 pb-4 pt-2" : "px-12 pb-8 pt-8 sm:max-w-[700px]"} border-none bg-[#F5F5F5] transition-transform duration-300 ease-in-out ${
          isClosing
            ? isMobile
              ? "translate-y-full"
              : "translate-x-full"
            : isMobile
              ? "translate-y-0"
              : "translate-x-0"
        } flex flex-col`}
      >
        <div className="flex h-full flex-col">
          <div
            className={`sticky top-0 z-10 bg-[#F5F5F5] ${isMobile ? "pb-2" : "pb-6"} border-b border-[#E0E0E0]`}
          >
            <SheetHeader
              className={`flex ${isMobile ? "flex-col items-center gap-2" : "flex-row items-center gap-6"} px-0 pb-0 pt-0`}
            >
              <div
                className={`flex ${isMobile ? "flex-col items-center" : "flex-row items-center gap-4"} w-full`}
              >
                {user?.photo ? (
                  <img
                    src={imageUrl + user.photo}
                    alt={`${user.firstname} ${user.lastname}`}
                    className={`${isMobile ? "h-20 w-20" : "h-28 w-28"} rounded-full border-4 border-white object-cover shadow`}
                  />
                ) : (
                  <div
                    className={`${isMobile ? "h-20 w-20" : "h-32 w-32"} flex items-center justify-center rounded-full border-4 border-white bg-gray-500 text-3xl font-semibold text-white shadow`}
                  >
                    {`${user?.lastname?.charAt(0) ?? ""}${user?.firstname?.charAt(0) ?? ""}`}
                  </div>
                )}
                <div
                  className={`flex flex-col ${isMobile ? "mt-2 items-center" : "items-start"}`}
                >
                  <SheetTitle
                    className={`font-bold ${isMobile ? "text-2xl" : "text-3xl"}`}
                  >
                    {user?.firstname} {user?.lastname}
                  </SheetTitle>
                  <div className="mt-1 flex items-center gap-2">
                    <User className="h-5 w-5 text-[#212121]" />
                    <span className="text-[14px] font-medium text-[#212121]">
                      {user?.genre || "Genre non renseigné"}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {user?.is_active ? (
                      <Unlock className="h-4 w-4 text-green-600" />
                    ) : (
                      <Lock className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-[14px] font-medium ${user?.is_active ? "text-green-700" : "text-red-700"}`}
                    >
                      {user?.is_active ? "Actif" : "Bloqué"}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col gap-2 ${isMobile ? "mt-2 items-center" : "ml-auto items-end"}`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#212121]" />
                  <span className="text-[14px] font-medium text-[#212121]">
                    {user?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#212121]" />
                  <span className="text-[14px] font-medium text-[#212121]">
                    {user?.phone || "Téléphone non renseigné"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#212121]" />
                  <span className="text-[14px] font-medium text-[#212121]">
                    Inscrit le{" "}
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>
            </SheetHeader>
          </div>
          <div
            className={`flex h-full flex-col${isMobile ? "" : "sm:flex-row"}`}
          >
            {isMobile ? ( 
              <div className={`mt-4 flex flex-wrap gap-1 px-1`}>
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    className={`rounded-t border-b-2 px-3 py-1 text-sm font-medium transition-colors ${tab === t.key ? "border-[#6C61F6] bg-white text-[#6C61F6]" : "border-transparent bg-transparent text-gray-500 hover:bg-gray-100"}`}
                    onClick={() => setTab(t.key)}
                    disabled={loading}
                  >
                    {TAB_ICONS[t.key]}
                    {t.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-full w-full flex-row">
                <div className="flex min-w-[180px] flex-col gap-1 border-r border-[#E0E0E0] pr-6 pt-6">
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      className={`flex w-full items-center rounded-lg px-4 py-2 text-left text-[15px] font-medium transition-colors ${tab === t.key ? "border-l-4 border-[#6C61F6] bg-white text-[#6C61F6] shadow" : "text-gray-600 hover:bg-gray-100"}`}
                      onClick={() => setTab(t.key)}
                      disabled={loading}
                    >
                      {TAB_ICONS[t.key]}
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="flex-1 space-y-6 overflow-y-auto py-6 pl-2">
                  {loading ? (
                    <div className="flex h-40 w-full items-center justify-center">
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {tab === "infos" && (
                        <div className="space-y-2">
                          <h2
                            className={`mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]`}
                          >
                            Informations personnelles
                          </h2>
                          <div
                            className={`grid grid-cols-1 gap-x-4 gap-y-2 px-4 text-[14px]`}
                          >
                            <div>
                              <span className="font-medium">Nom:</span>{" "}
                              {user?.firstname} {user?.lastname}
                            </div>
                            <div>
                              <span className="font-medium">Genre:</span>{" "}
                              {user?.genre || "-"}
                            </div>
                            <div>
                              <span className="font-medium">Téléphone:</span>{" "}
                              {user?.phone || "-"}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span>{" "}
                              {user?.email}
                            </div>
                            <div>
                              <span className="font-medium">Statut:</span>{" "}
                              <span
                                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user?.is_active ? "border border-green-300 bg-green-100 text-green-700" : "border border-red-300 bg-red-100 text-red-700"}`}
                              >
                                {user?.is_active ? "Actif" : "Bloqué"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                Email vérifié:
                              </span>
                              {user?.email_verified_at ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span>Oui</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4 text-red-600" />
                                  <span>Non</span>
                                </>
                              )}
                            </div>
                            <div>
                              <span className="font-medium">Inscrit le:</span>{" "}
                              {user?.created_at
                                ? new Date(user.created_at).toLocaleDateString(
                                    "fr-FR",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )
                                : "-"}
                            </div>
                            <div>
                              <span className="font-medium">
                                Mis à jour le:
                              </span>{" "}
                              {user?.updated_at
                                ? new Date(user.updated_at).toLocaleDateString(
                                    "fr-FR",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )
                                : "-"}
                            </div>
                          </div>
                        </div>
                      )}
                      {tab === "admin" && (
                        <div className="space-y-2">
                          <h2
                            className={`mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]`}
                          >
                            Informations administratives
                          </h2>
                          {instructor_profile ? (
                            <div
                              className={`grid grid-cols-1 gap-x-4 gap-y-2 px-4 text-[14px]`}
                            >
                              <div>
                                <span className="font-medium">Adresse:</span>{" "}
                                {instructor_profile.address || "-"}
                              </div>
                              <div>
                                <span className="font-medium">Ville:</span>{" "}
                                {instructor_profile.city || "-"}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Code postal:
                                </span>{" "}
                                {instructor_profile.postal_code || "-"}
                              </div>
                              {/* <div><span className="font-medium">Spécialité:</span> {instructor_profile.specialty || '-'}</div> */}
                              <div>
                                <span className="font-medium">Bio:</span>{" "}
                                {instructor_profile.bio || "-"}
                              </div>
                              <div>
                                <span className="font-medium">Solde:</span>{" "}
                                {instructor_profile.solde} €{" "}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Certification n°:
                                </span>{" "}
                                {instructor_profile.certification_number || "-"}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Date certification:
                                </span>{" "}
                                {instructor_profile.certification_issue_date
                                  ? new Date(
                                      instructor_profile.certification_issue_date,
                                    ).toLocaleDateString()
                                  : "-"}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Prix heure:</span>{" "}
                                <input
                                  type="number"
                                  min={0}
                                  className="border rounded px-2 py-1 w-24 text-right"
                                  value={hourPrice ?? ""}
                                  onChange={e => setHourPrice(Number(e.target.value))}
                                  disabled={savingHourPrice}
                                />
                                <span>€</span>
                                <button
                                  className={`ml-2 px-3 py-1 rounded text-white text-xs ${savingHourPrice ? "bg-gray-400" : "bg-[#6C61F6] hover:bg-[#5547d6]"}`}
                                  onClick={async () => {
                                    if (hourPrice === null || isNaN(hourPrice)) return;
                                    setSavingHourPrice(true);
                                    try {
                                      const res = await updateMonitorHourPrice(token, instructor_profile.id, hourPrice);
                                      if (res.success) {
                                        toast.success("Prix de l'heure mis à jour");
                                        const data = await getMonitorDetails(token, monitor.id.toString());
                                        setDetails(data);
                                        setHourPrice(data?.user?.instructor_profile?.hourPrice ?? null);
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
                                  {savingHourPrice ? "..." : "Enregistrer"}
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Remise heure:</span>{" "}
                                <input
                                  type="number"
                                  min={0}
                                  className="border rounded px-2 py-1 w-24 text-right"
                                  value={hourDiscount ?? ""}
                                  onChange={e => setHourDiscount(Number(e.target.value))}
                                  disabled={savingHourDiscount}
                                />
                                <span>€</span>
                                <button
                                  className={`ml-2 px-3 py-1 rounded text-white text-xs ${savingHourDiscount ? "bg-gray-400" : "bg-[#6C61F6] hover:bg-[#5547d6]"}`}
                                  onClick={async () => {
                                    if (hourDiscount === null || isNaN(hourDiscount)) return;
                                    setSavingHourDiscount(true);
                                    try {
                                      const res = await updateMonitorHourDiscount(token, instructor_profile.id, hourDiscount);
                                      if (res.success) {
                                        toast.success("Remise mise à jour");
                                        const data = await getMonitorDetails(token, monitor.id.toString());
                                        setDetails(data);
                                        setHourDiscount(data?.user?.instructor_profile?.hourDiscount ?? null);
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
                                  {savingHourDiscount ? "..." : "Enregistrer"}
                                </button>
                              </div>
                              <div>
                                <span className="font-medium">TVA:</span>{" "}
                                {instructor_profile.tva}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Forme juridique:
                                </span>{" "}
                                {instructor_profile.juridic_form || "-"}
                              </div>
                              <div>
                                <span className="font-medium">SIRET:</span>{" "}
                                {instructor_profile.siret || "-"}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Numéro activité:
                                </span>{" "}
                                {instructor_profile.num_activity || "-"}
                              </div>
                              <div>
                                <span className="font-medium">Numéro TVA:</span>{" "}
                                {instructor_profile.num_tva || "-"}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Numéro autorisation :
                                </span>{" "}
                                {instructor_profile.num_teach_authorization ||
                                  "-"}
                              </div>
                              {/* <div><span className="font-medium">Date autorisation enseignement:</span> {instructor_profile.date_teach_permit ? new Date(instructor_profile.date_teach_permit).toLocaleDateString() : '-'}</div> */}
                              <div>
                                <span className="font-medium">
                                  Date visite médicale :
                                </span>{" "}
                                {instructor_profile.date_medical_visit
                                  ? new Date(
                                      instructor_profile.date_medical_visit,
                                    ).toLocaleDateString("fr-FR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })
                                  : "-"}
                              </div>
                              <div>
                                <span className="font-medium">Créé le :</span>{" "}
                                {instructor_profile.created_at
                                  ? new Date(
                                      instructor_profile.created_at,
                                    ).toLocaleDateString("fr-FR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "-"}
                              </div>
                              {/* <div><span className="font-medium">Mis à jour le:</span> {instructor_profile.updated_at ? new Date(instructor_profile.updated_at).toLocaleString() : '-'}</div> */}
                            </div>
                          ) : (
                            <div className="text-[14px] text-gray-500">
                              Aucun profil instructeur renseigné.
                            </div>
                          )}
                        </div>
                      )}
                      {tab === "vehicles" && (
                        <div className="space-y-2">
                          <h2
                            className={`mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]`}
                          >
                            Véhicules
                          </h2>
                          {vehicles.length === 0 ? (
                            <div className="text-[14px] text-gray-500">
                              Aucun véhicule renseigné.
                            </div>
                          ) : (
                            <div className="grid gap-3">
                              {vehicles.map((v: any) => (
                                <div
                                  key={v.id}
                                  className="flex items-center gap-3 rounded border bg-white px-3 py-2 shadow-sm"
                                >
                                  <Car className="h-6 w-6 text-[#6C61F6]" />
                                  <div className="flex-1">
                                    <div className="text-[15px] font-semibold">
                                      {v.brand} {v.model}{" "}
                                      <span className="text-xs text-gray-400">
                                        ({v.year})
                                      </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {v.plate_number} •{" "}
                                      {v.gearbox_type === "automatic"
                                        ? "Automatique"
                                        : "Manuelle"}{" "}
                                      • {v.color}
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {v.status === "available"
                                      ? "Disponible"
                                      : v.status}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {tab === "meetingPoints" && (
                        <div className="w-full space-y-2">
                          <h2
                            className={`mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]`}
                          >
                            Points de rendez-vous
                          </h2>
                          {meetingPoints.length === 0 ? (
                            <div className="text-[14px] text-gray-500">
                              Aucun point de rendez-vous renseigné.
                            </div>
                          ) : (
                            <div className="grid w-full gap-3">
                              {meetingPoints.map((m: any) => (
                                <div
                                  key={m.id}
                                  className="flex w-full items-center gap-3 rounded border bg-white px-3 py-2 shadow-sm"
                                >
                                  <MapPin className="h-6 w-6 text-[#6C61F6]" />
                                  <div className="flex-1">
                                    <div className="text-[15px] font-semibold">
                                      {m.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {m.address} • {m.city} ({m.postal_code})
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {m.is_active ? "Actif" : "Inactif"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {tab === "dispos" && (
                        <div className="space-y-2">
                          <h2
                            className={`mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]`}
                          >
                            Disponibilités
                          </h2>
                          {!repeateds || repeateds.length === 0 ? (
                            <div className="text-[14px] text-gray-500">
                              Aucune disponibilité renseignée.
                            </div>
                          ) : (
                            <div className="grid gap-3">
                              {repeateds.map((dayObj: any) => {
                                const day = Object.keys(dayObj)[0];
                                const slots = dayObj[day];
                                return (
                                  <div
                                    key={day}
                                    className="rounded border bg-white px-3 py-2 shadow-sm"
                                  >
                                    <div className="mb-1 flex items-center gap-2 text-[15px] font-semibold capitalize">
                                      <Clock className="h-4 w-4 text-[#6C61F6]" />
                                      {day}
                                    </div>
                                    {!slots || slots.length === 0 ? (
                                      <div className="text-xs text-gray-400">
                                        Aucune plage
                                      </div>
                                    ) : (
                                      <ul className="flex flex-wrap gap-2 text-xs text-gray-700">
                                        {slots.map((slot: any) => {
                                          let times = [];
                                          try {
                                            times = JSON.parse(slot.time);
                                          } catch {
                                            times = [];
                                          }
                                          return times.map(
                                            (t: any, i: number) => (
                                              <li
                                                key={i}
                                                className="rounded border bg-[#F5F5F5] px-2 py-1"
                                              >
                                                {t.start} - {t.end}
                                              </li>
                                            ),
                                          );
                                        })}
                                      </ul>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                      {tab === "doc" && (
                        <div className="w-full space-y-2">
                          <h2 className="mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">
                            Documents
                          </h2>
                          {!details?.doc || details.doc.length === 0 ? (
                            <div className="text-[14px] text-gray-500">
                              Aucun document fourni.
                            </div>
                          ) : (
                            <div className="grid w-full gap-3">
                              {details.doc.map((d: any) => (
                                <div
                                  key={d.id}
                                  className="flex w-full items-center gap-3 rounded border bg-white px-3 py-2 shadow-sm"
                                >
                                  <FileText className="h-6 w-6 text-[#6C61F6]" />
                                  <div className="flex-1">
                                    <div className="text-[15px] font-semibold">
                                      {d.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {d.file_type}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {d.created_at
                                        ? new Date(
                                            d.created_at,
                                          ).toLocaleDateString("fr-FR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })
                                        : "-"}
                                    </div>
                                  </div>
                                  <button
                                    className="text-xs text-[#6C61F6] underline mr-2"
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
                              ))}
                            </div>
                          )}
                          <Dialog open={openDocViewer} onOpenChange={handleDocViewerClose}>
                            <DialogContent className="max-w-6xl w-full h-[85vh] px-4 flex flex-col">
                              <DialogHeader>
                                <DialogTitle className="truncate max-w-[90%] text-center text-xl font-semibold">{docName || "Visualisation du document"}</DialogTitle>
                              </DialogHeader>
                              <div className="flex-1 flex flex-col items-center justify-center relative">
                                {iframeLoading && !iframeError && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                                    <Spinner />
                                  </div>
                                )}
                                {iframeError ? (
                                  <div className="flex flex-col items-center justify-center h-full w-full p-4">
                                    <span className="text-red-600 font-semibold mb-2">Impossible d'afficher le document.</span>
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
                                      className="w-full h-[70vh] border-none rounded"
                                      onLoad={() => setIframeLoading(false)}
                                      onError={() => { setIframeLoading(false); setIframeError(true); }}
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
                      )}
                      {tab === "action" && (
                        <div className="w-full">
                          <h2 className="mb-2 border-b border-[#E0E0E0] pb-1 text-lg font-semibold text-[#616161]">
                            Actions
                          </h2>
                          <div className="flex flex-wrap gap-4">
                            <div className="w-full md:w-[47%]">
                              <div className="flex h-full flex-col justify-between rounded-lg border bg-white p-4 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                  {user?.is_active ? (
                                    <Lock className="h-5 w-5 text-red-600" />
                                  ) : (
                                    <Unlock className="h-5 w-5 text-green-600" />
                                  )}
                                  <span className="text-[12px] font-semibold">
                                    {user?.is_active ? "Bloquer" : "Débloquer"}
                                  </span>
                                </div>
                                <button
                                  className={`w-full rounded py-2 text-[12px] font-semibold text-white transition ${user?.is_active ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
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
                            <div className="h-36 w-full md:w-[47%]">
                              <div className="flex h-full flex-col justify-between rounded-lg border bg-white p-4 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                  <CalendarDays className="h-5 w-5 text-[#6C61F6]" />
                                  <span className="text-[12px] font-semibold">
                                    Planning
                                  </span>
                                </div>
                                <button
                                  onClick={() => {
                                    navigate("/admin/moniteurs/planning", { state: { monitorId: user?.id } });
                                  }}
                                  className="w-full rounded bg-[#6C61F6] py-2 text-[12px] font-semibold text-white transition hover:bg-[#5547d6]"
                                >
                                  Voir le planning
                                </button>
                              </div>
                            </div>
                            <div className="w-full md:w-[47%]">
                              <div className="flex h-full flex-col justify-between rounded-lg border bg-white p-4 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                  <Users className="h-5 w-5 text-[#6C61F6]" />
                                  <span className="text-[12px] font-semibold">
                                    Apprenants
                                  </span>
                                </div>
                                <button
                                 onClick={() => {
                                    navigate("/admin/moniteurs/learners", { state: { monitorId: user?.id } });
                                  }}
                                className="w-full rounded bg-[#6C61F6] py-2 text-[12px] font-semibold text-white transition hover:bg-[#5547d6]">
                                  Voir les apprenants
                                </button>
                              </div>
                            </div>
                            <div className="h-36 w-full md:w-[47%]">
                              <div className="flex h-full flex-col justify-between rounded-lg border bg-white p-4 shadow">
                                <div className="mb-4 flex items-center gap-2">
                                  <ClipboardList className="h-5 w-5 text-[#6C61F6]" />
                                  <span className="text-[12px] font-semibold">
                                    Rendez-vous
                                  </span>
                                </div>
                                <button
                                 onClick={() => {
                                    navigate("/admin/moniteurs/rendez-vous", { state: { monitorId: user?.id } });
                                  }}
                                className="w-full rounded bg-[#6C61F6] py-2 text-[12px] font-semibold text-white transition hover:bg-[#5547d6]">
                                  Voir les rendez-vous
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MonitorDetails;
