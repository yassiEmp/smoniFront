import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import phone from '@assets/dashboard-moniteur/assist1.png'
import mail from '@assets/dashboard-moniteur/assist2.png'
import help from '@assets/dashboard-moniteur/assist3.png'
import condition from '@assets/dashboard-moniteur/assist4.png'
import { Link } from "react-router";
const Assistance: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Assistance et contact</h1>
      <div className="flex flex-row flex-wrap gap-6 mb-8 w-full">
        <div className="bg-white rounded-xl shadow p-6 flex flex-row items-center justify-between flex-1 min-w-[260px] max-w-sm min-h-[200px] relative">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="font-semibold flex items-center gap-1">
                Nous contacter
              </div>
              <div className="text-xs text-gray-500 mb-4">Adresse mail</div>
            </div>
            <a
              href="mailto:contact@smoni.fr"
              className="text-black font-semibold underline inline-flex items-center gap-1 mt-auto"
            >
              contact@smoni.fr
              <MdOutlineMailOutline className="ml-1 text-lg" />
            </a>
          </div>
          <div className="absolute bottom-6 right-6 w-16 h-16 flex items-center justify-center text-[#6C61F6]">
            <img src={mail} alt="mail" className="object-contain h-full" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-row items-center justify-between flex-1 min-w-[260px] max-w-sm min-h-[200px] relative">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="font-semibold flex items-center gap-1">
                Nous contacter
              </div>
              <div className="text-xs text-gray-500 mb-4">Numéro de téléphone</div>
            </div>
            <a
              href="tel:+330953469828"
              className="text-black font-semibold underline inline-flex items-center gap-1 mt-auto"
            >
              +33 09 53 46 98 28
              <MdOutlinePhone className="ml-1 text-lg" />
            </a>
          </div>
          <div className="absolute bottom-6 right-6 w-16 h-16 flex items-center justify-center text-[#6C61F6]">
            <img src={phone} alt="phone" className="object-contain h-full" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-row items-center justify-between flex-1 min-w-[260px] max-w-sm min-h-[200px] relative">
          <div className="flex flex-col justify-between h-full">
            <Link
              to="/#faq"
              className="font-semibold text-base underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Centre d'aide
              <FiExternalLink className="ml-1 text-base" />
            </Link>
          </div>
          <div className="absolute bottom-6 right-6 w-16 h-16 flex items-center justify-center text-[#6C61F6]">
            <img src={help} alt="help" className="object-contain h-full" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-row items-center justify-between flex-1 min-w-[260px] max-w-sm min-h-[200px] relative">
          <div className="flex flex-col justify-between h-full">
            <Link
              to="/cgu"
              className="font-semibold text-base underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions d'utilisation
              <FiExternalLink className="ml-1 text-base" />
            </Link>
          </div>
          <div className="absolute bottom-6 right-6 w-16 h-16 flex items-center justify-center text-[#6C61F6]">
            <img src={condition} alt="condition" className="object-contain h-full" />
          </div>
        </div>
      </div>
      <div className="bg-[#EAE3FF] text-gray-800 rounded-lg p-4 max-w-xl mx-auto flex items-center gap-2 justify-center">
        <span>Contactez l'équipe SMONI du lundi au vendredi de 9h à 18h.</span>
        <FiExternalLink className="text-[#6C61F6] text-lg" />
      </div>
    </div>
  );
};

export default Assistance;
