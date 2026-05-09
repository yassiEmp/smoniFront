/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import Loader from "@/components/common/Loader";
import { fetchSouscriptionsApprenant, Souscription } from "@/api/admin/SouscriptionsApprenant";
import { fetchLearnerInfo } from "@/api/admin/InfosApprenant";
import { RootState } from "@/store/configureStore";
import { Modal } from "@mui/material";
import { listCategoryService, listServiceByCategory } from "@/api/admin/service/services";
import { CategoryService, Service } from "@/types/admin/services";
import { makeSubscribeWithLearnerId, deactivateSubscription } from "@/api/learner/stripe";


const PER_PAGE = 5;

export function SouscriptionsApprenant({ userId }: { userId: string | number | undefined }) {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [souscriptions, setSouscriptions] = useState<Souscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [assignServiceOpen, setAssignServiceOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryService[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [selectedServiceId, setSelectedServiceId] = useState<number | "">("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const selectedService = services.find(s => s.id === (typeof selectedServiceId === 'number' ? selectedServiceId : -1));
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSubscriptionId, setConfirmSubscriptionId] = useState<number | null>(null);

  // const [] = 

  // Récupérer le nom de l'apprenant
  const [learnerName, setLearnerName] = useState<string>("");
  useEffect(() => {
    if (!userId || !token) return;
    fetchLearnerInfo(userId, token)
      .then(res => setLearnerName(`${res.data.firstname} ${res.data.lastname}`))
      .catch(() => setLearnerName(""));
  }, [userId, token]);

  // Charger les souscriptions (scroll infini vers le haut)
  const loadSouscriptions = useCallback(async () => {
    if (!token || !userId || !hasMore || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSouscriptionsApprenant(token, userId, page, PER_PAGE);
      setSouscriptions(prev => {
        // Filtrer les doublons avant d'ajouter les nouvelles données
        const newData = res.data.filter(newItem => 
          !prev.some(item => item.id === newItem.id)
        );
        return [...prev, ...newData];
      });
      setHasMore(res.next_page_url !== null);
    } catch (e) {
      setError("Erreur lors du chargement des souscriptions.");
    } finally {
      setLoading(false);
    }
  }, [token, userId, page, hasMore, loading]);

  // Initial load: reset uniquement quand userId change
  useEffect(() => {
    setSouscriptions([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [userId]);

  useEffect(() => {
    loadSouscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, userId, token]);

  // Charger les catégories quand le modal s'ouvre
  useEffect(() => {
    const fetchCategories = async () => {
      if (!assignServiceOpen || !token) return;
      setFormError(null);
      setLoadingCategories(true);
      try {
        const data = await listCategoryService(token);
        setCategories(data);
      } catch (e) {
        setFormError("Erreur lors du chargement des catégories.");
      } finally {
        setLoadingCategories(false);
      }
    };
    // reset form when opening
    if (assignServiceOpen) {
      setSelectedCategoryId("");
      setSelectedServiceId("");
      setServices([]);
    }
    fetchCategories();
  }, [assignServiceOpen, token]);

  // Charger les services quand une catégorie est sélectionnée
  useEffect(() => {
    const fetchServices = async () => {
      if (!token || !selectedCategoryId) return;
      setFormError(null);
      setLoadingServices(true);
      try {
        const data = await listServiceByCategory(Number(selectedCategoryId), token);
        setServices(data);
      } catch (e) {
        setFormError("Erreur lors du chargement des services.");
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, [selectedCategoryId, token]);

  const handleConfirmAssign = async () => {
    if (!token || !userId) return;
    if (!selectedServiceId) {
      setFormError("Veuillez sélectionner une catégorie et un service.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      // Utiliser des valeurs par défaut pour mode et transaction côté admin
      const mode = "admin";
      const transaction = `ADMIN-${Date.now()}`;
      await makeSubscribeWithLearnerId({
        mode,
        transaction,
        service_id: Number(selectedServiceId),
        token,
        learner_id: Number(userId),
      });
      // rafraîchir la liste
      setSouscriptions([]);
      setPage(1);
      setHasMore(true);
      // await loadSouscriptions();
      setAssignServiceOpen(false);
    } catch (e) {
      setFormError("Impossible de créer la souscription.");
    } finally {
      setSubmitting(false);
    }
  };

  const openCancelConfirmation = (subscriptionId: number) => {
    setConfirmSubscriptionId(subscriptionId);
    setConfirmCancelOpen(true);
  };

  const performCancelSubscription = async () => {
    if (!token || !confirmSubscriptionId) return;
    setCancellingId(confirmSubscriptionId);
    try {
      await deactivateSubscription({ subscription_id: confirmSubscriptionId, token });
      setSouscriptions([]);
      setPage(1);
      setHasMore(true);
      // await loadSouscriptions();
      setConfirmCancelOpen(false);
      setConfirmSubscriptionId(null);
    } catch (e) {
      // simple inline error via formError to avoid alert
      setFormError("Impossible d'annuler l'abonnement.");
    } finally {
      setCancellingId(null);
    }
  };

  // Scroll infini vers le haut (évite les incréments multiples)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !hasMore) return;

    let ticking = false;
    const handleScroll = () => {
      if (container.scrollTop < 100 && !loading && hasMore && !ticking) {
        ticking = true;
        setPage(prev => prev + 1);
        setTimeout(() => { ticking = false; }, 500); // anti double scroll
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold mb-4">
          <span className="text-[#0c0c0e]">Les abonnements de </span>
          {learnerName ? (
            <>
            
              <span className="text-[#6C4EEA] ">
                {learnerName}
                
              </span>
            </>
          ) : null}
        </h2>
        <button
          className="bg-[#6C4EEA] text-white py-2 px-4 rounded-full"
          onClick={() => setAssignServiceOpen(true)}
        >
          Ajouter un service
        </button>
      </div>
      <div
        ref={containerRef}
        className="w-full max-h-[70vh] overflow-y-auto flex flex-col gap-4"
        style={{ minHeight: 200 }}
      >
        {loading && souscriptions.length === 0 && (
          <div className="flex justify-center py-8"><Loader /></div>
        )}
        {!loading && souscriptions.length === 0 && (
          <div className="text-center text-gray-500 py-8 text-lg font-medium">
            Aucun abonnement trouvé pour cet apprenant.
          </div>
        )}
        {souscriptions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-fullpy-3">
            {souscriptions.map((sous) => (
              <div
                key={sous.id}
                className="relative bg-gradient-to-br from-[#6C4EEA] via-[#938caf] to-[#736bdd] rounded-xl  p-6 flex flex-col border border-indigo-100  transition"
              >
                {/* Overlay pour effet de lumière */}
                <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                  background: "linear-gradient(120deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0.04) 100%)"
                }} />
                <div className="relative z-10 flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white drop-shadow">
                    {sous.service?.title}
                  </span>
                  <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    sous.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {sous.status === "active" ? "Actif" : sous.status}
                  </span>
                  {sous.status === "active" && (
                    <button
                      className="px-2 py-1 rounded-md bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition"
                      onClick={() => openCancelConfirmation(sous.id)}
                      disabled={cancellingId === sous.id}
                    >
                      {cancellingId === sous.id ? "Annulation..." : "Annuler"}
                    </button>
                  )}
                  </div>
                </div>
                <div className="relative z-10 text-2xl font-bold text-white mb-2 drop-shadow">
                  {sous.amount} Euro
                </div>
                <div className="relative z-10 flex items-center gap-3 mb-2">
                  <span className="text-xs text-white/80">
                    Du {new Date(sous.start_date).toLocaleDateString()} au {new Date(sous.end_date).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/20 text-xs text-white font-semibold">
                    <svg width="16" height="16" fill="none" className="inline-block"><circle cx="8" cy="8" r="7" stroke="#fff" strokeWidth="2"/><path d="M8 4v4l2.5 2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                    {sous.service?.hour != null ? `${sous.service.hour} h` : "- h"}
                  </span>
                </div>
                <div className="relative z-10 mb-2">
                  <span className="text-xs font-semibold text-white/90">Transaction :</span>{" "}
                  <span className="text-xs text-white/80">{sous.transaction_id}</span>
                </div>
                <div className="relative z-10 mb-2">
                  <span className="text-xs font-semibold text-white/90">Mode :</span>{" "}
                  <span className="text-xs text-white/80">{sous.mode}</span>
                </div>
                <div className="relative z-10 mb-2">
                  <span className="text-xs font-semibold text-white/90">Type :</span>{" "}
                  <span className="text-xs text-white/80">{sous.service?.type}</span>
                </div>
                <ul className="relative z-10 mt-2 mb-2 space-y-1">
                  {sous.service?.items?.map(item => (
                    <li key={item.id} className="flex items-center gap-2 text-sm text-white/90">
                      <span className="inline-block w-2 h-2 rounded-full bg-white" />
                      {item.label}
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 text-xs text-white/60 mt-2">
                  Créé le {new Date(sous.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
        {loading && souscriptions.length > 0 && (
          <div className="flex justify-center py-4"><Loader /></div>
        )}
        {error && (
          <div className="text-center text-red-500 py-4">{error}</div>
        )}
      </div>
      <Modal open={assignServiceOpen} onClose={() => setAssignServiceOpen(false)}>
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto p-0 overflow-hidden"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="bg-gradient-to-r from-[#6C4EEA] via-[#8A78F0] to-[#B6A9FF] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Assigner un service</h3>
                <p className="text-white/80 text-sm">Sélectionnez une catégorie puis un service pour {learnerName || "cet apprenant"}.</p>
              </div>
              <button
                className="text-white/90 hover:text-white"
                onClick={() => setAssignServiceOpen(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            {formError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">{formError}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie de services</label>
                  <div className="relative">
                    <select
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loadingCategories ? 'opacity-70' : ''}`}
                      value={selectedCategoryId}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : "";
                        setSelectedCategoryId(val);
                        setSelectedServiceId("");
                      }}
                      disabled={loadingCategories}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                    {loadingCategories && (
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Filtrez les services par catégorie.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <div className="relative">
                    <select
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loadingServices ? 'opacity-70' : ''}`}
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value ? Number(e.target.value) : "")}
                      disabled={!selectedCategoryId || loadingServices}
                    >
                      <option value="">Sélectionner un service</option>
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {`${srv.title} — ${Number(srv.price).toFixed(0)}€${srv.type ? ` — boite ${srv.type === 'automatic' ? 'automatique' : 'manuelle'}` : ''}`}
                        </option>
                      ))}
                    </select>
                    {loadingServices && (
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Affiche le prix et le type de boite.</p>
                </div>
              </div>

              <div>
                <div className="rounded-xl border border-gray-200 p-4 h-full bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Aperçu du service</h4>
                  {!selectedService ? (
                    <div className="text-sm text-gray-500">Sélectionnez un service pour voir les détails.</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-base font-semibold text-gray-900">{selectedService.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                              {Number(selectedService.price).toFixed(0)}€
                            </span>
                            {selectedService.type && (
                              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                                {`boite ${selectedService.type === 'automatic' ? 'automatique' : 'manuelle'}`}
                              </span>
                            )}
                            {selectedService.hour != null && (
                              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                                {selectedService.hour} h
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {Array.isArray(selectedService.items) && selectedService.items.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-gray-600 mb-1">Inclus:</div>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedService.items.slice(0, 5).map((it) => (
                              <li key={it.id} className="text-sm text-gray-700">{it.label}</li>
                            ))}
                            {selectedService.items.length > 5 && (
                              <li className="text-xs text-gray-500">+ {selectedService.items.length - 5} autres</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={() => setAssignServiceOpen(false)}
                disabled={submitting}
              >
                Fermer
              </button>
              <button
                className="px-4 py-2 rounded-md bg-[#6C4EEA] text-white hover:opacity-90 disabled:opacity-60"
                onClick={handleConfirmAssign}
                disabled={submitting || !selectedServiceId}
              >
                {submitting ? "Assignation..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirm cancel modal */}
      <Modal open={confirmCancelOpen} onClose={() => setConfirmCancelOpen(false)}>
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-0 overflow-hidden"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Annuler l'abonnement</h3>
              <button className="text-white/90 hover:text-white" onClick={() => setConfirmCancelOpen(false)}>✕</button>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-700">
              Êtes-vous sûr de vouloir annuler cet abonnement ? Cette action peut être irréversible.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={() => setConfirmCancelOpen(false)}
                disabled={cancellingId !== null}
              >
                Non, fermer
              </button>
              <button
                className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
                onClick={performCancelSubscription}
                disabled={cancellingId !== null}
              >
                {cancellingId !== null ? "Annulation..." : "Oui, annuler"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
        
    </div>
  );
}