/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Check, X, BadgeCheck, Timer, Package } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/configureStore";
import Loader from "@/components/common/Loader";
import { fetchLearnerSubscriptions, LearnerSubscription } from "@/api/learner/subscriptions";

interface MonAbonnementProps {
  onBack?: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  expired: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Actif",
  expired: "Expiré",
  cancelled: "Annulé",
};

export default function MonAbonnement({ onBack }: MonAbonnementProps) {
  const { token, user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [subscriptions, setSubscriptionsState] = useState<LearnerSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  //const subscriptions = useSelector((state: RootState) => state.subscriptionReducer.subscriptions);

  useEffect(() => {
    if (!token || !user?.id) return;
    setLoading(true);
    fetchLearnerSubscriptions(token, user.id, dispatch)
   
    .then(res => setSubscriptionsState(res.data.data))
    .catch(() => setSubscriptionsState([]))
    .finally(() => setLoading(false));
  }, [token, user?.id, dispatch]);

  // Vue mobile
  const MobileView = () => (
    <div className="p-6 bg-white min-h-screen">
      {/* Header mobile */}
      <div className="flex items-center gap-4 px-6 py-4 pt-20 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Mon abonnement</h1>
      </div>


      <div className="px-2 py-6 space-y-6">
        {loading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <X className="w-10 h-10 text-red-400 mb-2" />
            <p className="text-gray-500 text-center text-lg font-semibold">Aucun abonnement trouvé.</p>
            <p className="text-gray-400 text-center mt-2">Souscrivez à une offre dans la boutique pour profiter de nos services.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg relative border-2 border-indigo-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BadgeCheck className="w-7 h-7 text-yellow-300" />
                  <h2 className="text-xl font-bold">{sub.service.title}</h2>
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[sub.status] || "bg-gray-100 text-gray-700"}`}>
                    {STATUS_LABELS[sub.status] || sub.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-100">Prix</span>
                    <span className="text-2xl font-bold">{sub.amount} €</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-200" />
                    <span className="text-indigo-100 text-sm">
                      Du {sub.start_date} au {sub.end_date}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <ReceiptText className="w-4 h-4 text-indigo-200" />
                    <span className="text-indigo-100 text-sm">
                      Transaction : <span className="font-semibold">{sub.transaction_id}</span>
                    </span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-indigo-200" />
                    <span className="text-indigo-100 text-sm">
                    
                       {sub.hour != null ? `${sub.hour}h` : "- h"}  
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-indigo-200" />
                    <span className="text-indigo-100 text-sm">
                      Type de boîte : <span className="font-semibold capitalize">{sub.service.type}</span>
                    </span>
                  </div>
                  {/* Items */}
                  {sub.service.items && sub.service.items.length > 0 && (
                    <ul className="mt-4 space-y-1 bg-white/10 rounded-lg p-3">
                      {sub.service.items.map(item => (
                        <li key={item.id} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-300" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Vue desktop
  const DesktopView = () => (
    <div className="bg-gray-50 p-8 rounded-xl max-w-4xl mx-auto min-h-[400px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Mes abonnements</h2>
        <p className="text-sm text-gray-600">Retrouvez ici l'ensemble de vos abonnements souscrits sur la plateforme.</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><Loader /></div>
      ) : subscriptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <X className="w-12 h-12 text-red-400 mb-2" />
          <p className="text-gray-500 text-center text-lg font-semibold">Aucun abonnement trouvé.</p>
          <p className="text-gray-400 text-center mt-2">Souscrivez à une offre dans la boutique pour profiter de nos services.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 p-7 rounded-xl text-white shadow-lg relative border-2 border-indigo-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <BadgeCheck className="w-8 h-8 text-yellow-300" />
                <div>
                  <h3 className="text-2xl font-bold">{sub.service.title}</h3>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[sub.status] || "bg-gray-100 text-gray-700"}`}>
                    {STATUS_LABELS[sub.status] || sub.status}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-100">Prix</span>
                  <span className="text-3xl font-bold">{sub.amount} €</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-200" />
                  <span className="text-indigo-100">
                    Du {sub.start_date} au {sub.end_date}
                  </span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <ReceiptText className="w-5 h-5 text-indigo-200" />
                  <span className="text-indigo-100">
                    Transaction : <span className="font-semibold">{sub.transaction_id}</span>
                  </span>
                </div> */}
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-indigo-200" />
                  <span className="text-indigo-100">
                    {sub.hour != null ? `${sub.hour}h` : "- h"} 
                  </span> 
                </div> 
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-200" />
                  <span className="text-indigo-100">
                    Type de boîte : <span className="font-semibold capitalize">{sub.service.type}</span>
                  </span>
                </div>
                {/* Items */}
                {sub.service.items && sub.service.items.length > 0 && (
                  <ul className="mt-4 space-y-1 bg-white/10 rounded-lg p-3">
                    {sub.service.items.map(item => (
                      <li key={item.id} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-300" />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

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