import React from 'react';

export type ToastType = 'vert' | 'rouge' | 'orange';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

const COLORS: Record<ToastType, string> = {
  vert: 'bg-green-100 border-green-500 text-green-800',
  rouge: 'bg-red-100 border-red-500 text-red-800',
  orange: 'bg-yellow-100 border-yellow-500 text-yellow-800',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'vert', onClose }) => (
  <div
    className={`fixed top-6 right-6 z-50 flex items-center justify-between min-w-[350px] px-4 py-3 border-l-4 rounded shadow ${COLORS[type]}`}
    role="alert"
  >
    <span>{message}</span>
    <button
      className="ml-4 text-xl font-bold focus:outline-none"
      onClick={onClose}
      aria-label="Fermer"
    >
      ×
    </button>
  </div>
);

export default Toast;