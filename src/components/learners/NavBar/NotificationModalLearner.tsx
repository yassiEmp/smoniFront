import { useEffect, useState, useRef } from "react";
import { X, Settings } from "lucide-react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { toast } from "react-hot-toast";
import { imageUrl } from "@/api";
import {
  fetchNotifications,
  markAllAsRead,
  markOneAsRead,
  type Notification,
} from "@/api/learner/notifications";

type NotificationModalProps = {
  onClose: () => void;
  onNotificationRead?: (notification: Notification) => void;
  onNotificationsUpdate?: (unreadCount: number) => void;
  timeAgo?: string;
};

const NotificationModal = ({ onClose, onNotificationsUpdate }: NotificationModalProps) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "reserv">("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      try {
        const res = await fetchNotifications(token, activeTab);
        setNotifications(res.data.data);
        setUnreadCount(res.data.data.filter(n => !n.read_at).length);
        setHasMore(!!res.data.next_page_url);
        setPage(2);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Erreur lors du chargement des notifications");
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, [token, activeTab]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead(token);
      setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
      setUnreadCount(0);
      onNotificationsUpdate?.(0);
      toast.success("Toutes les notifications ont été marquées comme lues");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Erreur lors du marquage des notifications");
    }
  };

  const handleMarkOneAsRead = async (notif: Notification, e: React.MouseEvent) => {
    e.preventDefault();
    if (notif.read_at) return;

    try {
      await markOneAsRead(token, notif.id);
      setNotifications(prev =>
        prev.map(n => n.id === notif.id ? { ...n, read_at: new Date().toISOString() } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      onNotificationsUpdate?.(unreadCount - 1);
      toast.success("Notification marquée comme lue");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Erreur lors du marquage de la notification");
    }
  };

  const handleScroll = async () => {
    const el = scrollRef.current;
    if (!el || loading || !hasMore) return;

    const bottomReached = el.scrollHeight - el.scrollTop <= el.clientHeight + 100;
    
    if (bottomReached) {
      setLoading(true);
      try {
        const res = await fetchNotifications(token, activeTab, page);
        if (res.data.data.length > 0) {
          setNotifications(prev => [...prev, ...res.data.data]);
          setPage(prev => prev + 1);
        }
        setHasMore(!!res.data.next_page_url);
      } catch (error) {
        console.error("Error loading more notifications:", error);
        toast.error("Erreur lors du chargement des notifications");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setNotifications([]);
    
    const loadInitialNotifications = async () => {
      setLoading(true);
      try {
        const res = await fetchNotifications(token, activeTab);
        setNotifications(res.data.data);
        setUnreadCount(res.data.data.filter(n => !n.read_at).length);
        setHasMore(!!res.data.next_page_url);
        setPage(2);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors du chargement des notifications");
      } finally {
        setLoading(false);
      }
    };
    loadInitialNotifications();
  }, [token, activeTab]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return createPortal(
    <div
      id="overlay"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-30 pt-20 md:justify-end md:pr-10"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "overlay") onClose();
      }}
    >
      <div
        className="relative max-h-[calc(100vh-6rem)] w-[350px] overflow-auto rounded-xl border bg-[#EEE] shadow-xl md:w-[450px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="flex space-x-2">
            <Link to="/learners/parametres">
              <button className="rounded-full p-2 hover:bg-gray-200">
                <Settings size={16} className="text-gray-600" />
              </button>
            </Link>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="border-b px-5 py-3 text-[13px] font-semibold text-[#757575]">
          Restez informé de vos dernières notifications
        </div>

        <div className="flex gap-6 px-5 py-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`border-b-2 pb-1 text-[12px] font-semibold ${
              activeTab === "all"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >  
            Toutes les notifications{" "}
            {unreadCount > 0 && <span className="ml-1 text-red-500">{unreadCount}</span>}
          </button>
          <button
            onClick={() => setActiveTab("reserv")}
            className={`border-b-2 pb-1 text-[12px] font-semibold ${
              activeTab === "reserv"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Réservations
          </button>

          <button
            onClick={handleMarkAllAsRead}
            className="ml-auto text-[12px] font-semibold text-indigo-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={unreadCount === 0}
          >
            Marquer comme lu
          </button>
        </div>

        <div 
          className="scrollbar-hide divide-y overflow-auto" 
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {notifications.length === 0 && !loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Aucune notification pour le moment</p>
              <p className="text-sm text-gray-400 mt-1">
                Nous vous informerons quand il y aura du nouveau
              </p>
            </div>
          ) : (
            <>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 transition-colors ${
                    notif.read_at ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <div className="flex gap-3">
                    {notif.sender.photo ? (
                      <img
                        src={imageUrl + notif.sender.photo}
                        alt={notif.sender.firstname}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {notif.sender.firstname[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900">
                          {notif.sender.firstname} {notif.sender.lastname}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
                          {notif.title}
                        </span>
                      </p>
                      <p 
                        className="text-sm text-gray-600 mt-1 cursor-pointer hover:text-gray-900"
                        onClick={(e) => !notif.read_at && handleMarkOneAsRead(notif, e)}
                      >
                        {notif.data}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notif.created_at).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="p-4 text-center text-gray-500">
                  Chargement...
                </div>
              )}
              {!hasMore && notifications.length > 0 && (
                <div className="p-2 text-md text-center text-gray-500">
                  Plus de notifications à charger
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NotificationModal;