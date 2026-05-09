import React, { useRef, useEffect } from 'react';
import { X, Mail, Phone, ExternalLink, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Fermer le modal quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Empêcher le scroll du body quand le modal est ouvert
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Ne pas rendre le modal si il n'est pas ouvert
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" style={{ top: 0, left: 0, right: 0, bottom: 0 }}></div>
      
      {/* Contenu du modal */}
      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-100"
      >
        {/* Header avec bouton fermer */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Assistance et contact</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-4 md:p-6">
          {/* Cartes de contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Carte Email */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Nous contacter</h3>
                  <p className="text-xs text-gray-500 mb-4">Adresse mail</p>
                  <a
                    href="mailto:contact@smoni.fr"
                    className="text-gray-900 font-semibold hover:text-purple-600 underline inline-flex items-center gap-2 transition-colors duration-200 text-sm"
                  >
                    <span className="break-all">contact@smoni.fr</span>
                    <Mail size={16} className="flex-shrink-0" />
                  </a>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-2 md:ml-4 flex-shrink-0">
                  <Mail size={18} className="text-purple-600" />
                </div>
              </div>
            </div>

            {/* Carte Téléphone */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Nous contacter</h3>
                  <p className="text-xs text-gray-500 mb-4">Numéro de téléphone</p>
                  <a
                    href="tel:+330953469828"
                    className="text-gray-900 font-semibold hover:text-purple-600 underline inline-flex items-center gap-2 transition-colors duration-200 text-sm"
                  >
                    +33 09 53 46 98 28
                    <Phone size={16} className="flex-shrink-0" />
                  </a>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-2 md:ml-4 flex-shrink-0">
                  <Phone size={18} className="text-purple-600" />
                </div>
              </div>
            </div>

            {/* Carte Centre d'aide */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    to="/#faq"
                    className="font-semibold text-gray-900 hover:text-purple-600 underline inline-flex items-center gap-2 transition-colors duration-200 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Centre d'aide
                    <ExternalLink size={16} className="flex-shrink-0" />
                  </Link>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-2 md:ml-4 flex-shrink-0">
                  <HelpCircle size={18} className="text-purple-600" />
                </div>
              </div>
            </div>

            {/* Carte Conditions d'utilisation */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    to="/cgu"
                    className="font-semibold text-gray-900 hover:text-purple-600 underline inline-flex items-center gap-2 transition-colors duration-200 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conditions d'utilisation
                    <ExternalLink size={16} className="flex-shrink-0" />
                  </Link>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-2 md:ml-4 flex-shrink-0">
                  <ExternalLink size={18} className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Informations sur les horaires */}
          <div className="bg-purple-50 border border-purple-200 text-gray-800 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-sm md:text-base">
                Contactez l'équipe SMONI du lundi au vendredi de 9h à 18h.
              </span>
              <ExternalLink size={18} className="text-purple-600 flex-shrink-0" />
            </div>
          </div>

          {/* Bouton fermer en bas sur mobile */}
          <div className="mt-6 flex justify-center md:hidden">
            <button 
              onClick={onClose}
              className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SupportContactModal;