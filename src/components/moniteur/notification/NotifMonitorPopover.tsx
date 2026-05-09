import React, { useState } from 'react';
import { BellIcon, X, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
  type: 'success' | 'pending' | 'warning';
}

// Données simulées
const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Paiement reçu",
    description: "Votre paiement de 150€ a été validé",
    read: false,
    createdAt: new Date().toISOString(),
    type: 'success'
  },
  {
    id: 2,
    title: "Nouveau rendez-vous",
    description: "Un élève a réservé un créneau pour le 15 mars",
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // hier
    type: 'pending'
  },
  {
    id: 3,
    title: "Annulation de cours",
    description: "Le cours du 12 mars a été annulé",
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // avant-hier
    type: 'warning'
  }
];

const NotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 86400000) return 'Aujourd\'hui';
    if (diff < 172800000) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full bg-[#EEEEEE] p-2 hover:bg-[#E0E0E0] transition-colors"
      >
        <BellIcon className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#f52f49] text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 z-40 mt-2 w-96 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex gap-3 rounded-md p-3 ${
                      notif.read ? "bg-white" : "bg-[#F5F3FF] border-l-4 border-[#6C61F6]"
                    } hover:bg-gray-50 transition-colors cursor-pointer`}
                    onClick={() => {
                      setNotifications(notifications.map(n => 
                        n.id === notif.id ? { ...n, read: true } : n
                      ));
                    }}
                  >
                    <div className="mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notif.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notif.description}</p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {formatDate(notif.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPopover;
