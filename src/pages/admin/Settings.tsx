import React, { useState } from "react";
import PersonnalInfromation from "@components/moniteurs/Settings/PersonnalInfromation";

const tabs = [
  "Infos personnelles",
  // Ajoute d'autres onglets ici si besoin
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full p-7 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Paramètres</h1>
      <div className="mb-4 flex md:flex-row flex-col flex-wrap gap-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`rounded-md px-6 py-2 font-medium transition-colors duration-150 ${
              idx === activeTab
                ? "bg-gray-200 text-black shadow"
                : "bg-transparent text-black hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <hr className="mb-6 border-gray-200" />
      {activeTab === 0 && <PersonnalInfromation />}
      {/* Ajoute d'autres onglets ici si besoin */}
    </div>
  );
};

export default Settings;