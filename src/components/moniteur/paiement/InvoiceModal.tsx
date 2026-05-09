import React, { useState, useEffect } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import Lottie from "lottie-react";
import loadingIcon from "@assets/lottie/loading.json";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  hours: number;
  totalHT: number;
  adminCash?: number;
  tvaCash?: number;
  totalTTC?: number;
  onSubmit: (invoiceNumber: string) => Promise<void>;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  hours,
  totalHT,
  adminCash,
  tvaCash,
  totalTTC,
  onSubmit,
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!invoiceNumber || totalHT <= 0 || totalTTC <= 0) return;
    setLoading(true);
    await onSubmit(invoiceNumber);
    setLoading(false);
    setInvoiceNumber('');
    //Redirection vers page payement
    setTimeout(() => {
      window.location.href = "/monitor/paiement";
    }, 100);

  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const canSubmit = invoiceNumber.trim().length > 0 && totalHT > 0 && totalTTC > 0;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Mobile Bottom Sheet (< lg) */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slide-up ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Handle bar */}
          <div className="flex justify-center py-3">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="bg-black text-white px-6 py-4 -mx-0 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold mb-1">Facturation</h1>
                <h2 className="text-lg opacity-90">Nouvelle Facture</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <div className="text-gray-500 text-sm mb-6">
                Vous êtes déclaré en tant que Société par Actions Simplifiée
                Unipersonnelle - avec TVA. Vous collectez la TVA.
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Nombre d'heures</span>
                  <span className="font-semibold">{hours}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total HT</span>
                  <span className="font-semibold">{totalHT} €</span>
                </div>

                {/* <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Frais admin</span>
                  <span className="font-semibold">{adminCash ?? "-"} €</span>
                </div> */}

                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">TVA (%)</span>
                  <span className="font-semibold">{tvaCash ?? "-"}</span>
                </div>

                <div className="flex justify-between py-2 border-b-2 border-gray-200">
                  <span className="text-gray-800 font-medium">Total TTC</span>
                  <span className="font-bold text-lg">{totalTTC ?? "-"} €</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-3 font-medium text-gray-800">
                  Numéro de facture
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => {
                    // Only allow alphanumeric characters and hyphens
                    const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                    setInvoiceNumber(value);
                  }}
                  placeholder="FAC-2024-001"
                  className="w-full p-2 lg:p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                />
                <p className="text-sm text-gray-500 mt-3">
                  Pour des raisons légales, vous devez choisir vous-même le numéro
                  de facture à utiliser.
                </p>
              </div>
            </form>
          </div>

          {/* Bottom Action */}
          {canSubmit && (
            <div className="flex items-center  p-4 border-t border-gray-100 bg-white">
               <ChevronLeft className="w-7 h-7" />
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className={`w-full bg-yellow-100 py-2 rounded-xl hover:bg-yellow-200 transition-colors flex items-center justify-center gap-3 text-lg font-medium ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
               
                <span>{loading ? <Lottie animationData={loadingIcon} className="w-5" /> : "Facturer"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar (lg+) */}
      <div
        className={`hidden lg:block fixed right-0 bottom-0 w-full max-w-md bg-black shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
         isOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'
        }`}
        style={{ top: '85px' }}
      >
        <div className="flex flex-col h-full">
          <div className="bg-black text-white p-6">
            <h1 className="text-2xl font-bold mb-1">Facturation</h1>
            <h2 className="text-xl">Nouvelle Facture</h2>
          </div>

          <div className="bg-white p-6 flex-1 overflow-y-auto" style={{ borderTopLeftRadius: '1rem' }}>
            <div className="mb-6">
              <div className="text-gray-500 text-sm mb-6">
                Vous êtes déclaré en tant que Société par Actions Simplifiée
                Unipersonnelle - avec TVA. Vous collectez la TVA.
              </div>

              <div className="flex justify-between mb-4">
                <span>Nombre d'heures</span>
                <span className="font-semibold">{hours}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total HT</span>
                <span className="font-semibold">{totalHT} €</span>
              </div>

              {/* <div className="flex justify-between mb-4">
                <span>Frais admin</span>
                <span className="font-semibold">{adminCash ?? "-"} €</span>
              </div> */}

              <div className="flex justify-between mb-4">
                <span>TVA (%)</span>
                <span className="font-semibold">{tvaCash ?? "-"} €</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total TTC</span>
                <span className="font-semibold">{totalTTC ?? "-"} €</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Numéro de facture
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => {
                    // Only allow alphanumeric characters and hyphens
                    const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                    setInvoiceNumber(value);
                  }}
                  placeholder="FAC-2024-001"
                  className="w-full p-2 border rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Pour des raisons légales, vous devez choisir vous-même le numéro
                  de facture à utiliser.
                </p>
              </div>
              {/* Bouton Facturer visible seulement si conditions remplies */}
              {canSubmit && (
                <div className=" flex items-center p-4 border-t w-full bg-white mt-2">
                  <ChevronLeft className="w-7 h-7" />
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-yellow-100 py-2 rounded-md hover:bg-yellow-200 transition-colors flex items-center justify-center gap-2 ${
                      loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                   

                    <span>{loading ? <Lottie animationData={loadingIcon} className="w-5" /> : "Facturer"}</span>
                  </button>
                </div>
              )}
            </form>
          </div>
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-[#bcadfc] hover:bg-[#bcadfc]/60 rounded-full transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
};