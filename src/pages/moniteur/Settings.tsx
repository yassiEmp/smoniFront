import React, { useState } from "react";
// import { MapPin } from "lucide-react";
// import { CheckSquare } from "lucide-react";
import AdminDocuments from "./AdminDocuments";
import Configuration from "@components/moniteurs/Settings/Configuration";
import PersonnalInfromation from "@components/moniteurs/Settings/PersonnalInfromation";

const adressesMock = [
  {
    id: 1,
    titre: "RUNGIS 94",
    adresse: "Avenue Charles Lindbergh, Rungis",
  },
  {
    id: 2,
    titre: "RUNGIS 94",
    adresse: "Avenue Charles Lindbergh, Rungis",
  },
  {
    id: 3,
    titre: "RUNGIS 94",
    adresse: "Avenue Charles Lindbergh, Rungis",
  },
  {
    id: 4,
    titre: "RUNGIS 94",
    adresse: "Avenue Charles Lindbergh, Rungis",
  },
  {
    id: 5,
    titre: "RUNGIS 94",
    adresse: "Avenue Charles Lindbergh, Rungis",
  },
  {
    id: 6,
    titre: "RUNGIS 94",
    adresse: "Avenue Charles Lindbergh, Rungis",
  },
];

const tabs = [
  "Infos personnelles",
  "Configuration",
  // "Examens",
  "Administratif",
];

const Settings: React.FC = () => {
  adressesMock.map((adresse) => adresse.id);
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
      {activeTab === 0 && (
        <PersonnalInfromation />
      )}

      {/* Contenu de l'onglet Configuration */}
      {activeTab === 1 && (
        <Configuration />
      )}

      {/* Contenu de l'onglet examens */}
      {/* {activeTab === 2 && (
        <div>
          <h1 className="pb-4 text-[13px] font-semibold text-[#616161]">
            Recherchez et sélectionnez les centres d’examens dans lesquels vous
            souhaitez accompagner vos apprenants :
          </h1>
          <div>
            <div className="w-full rounded-md bg-gray-50 p-6">
              <div className="space-y-4">
                {adressesMock.map((adresse) => (
                  <div
                    key={adresse.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold">{adresse.titre}</p>
                      <p className="flex items-center text-[14px] font-semibold text-[#757575]">
                        <MapPin className="h-[18px] w-[18px]" />

                        {adresse.adresse}
                      </p>
                    </div>
                    <div className="text-violet-600">
                      <CheckSquare size={24} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button className="rounded-md bg-[#6c61f6] px-6 py-2 text-[13px] font-semibold text-white transition hover:bg-violet-700">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {activeTab === 2 && <AdminDocuments />}
    </div>
  );
};

export default Settings;
