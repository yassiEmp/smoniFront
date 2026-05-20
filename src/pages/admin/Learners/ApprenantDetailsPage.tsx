// pages/admin/apprenants/[id].tsx
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { InfosApprenant } from "@/components/admin/Learners/InfosApprenant";
import { BadgesApprenant } from "@/components/admin/Learners/BadgesApprenant";
import { ProgressApprenant } from "@/components/admin/Learners/ProgressApprenant";
import { AppointmentsApprenant } from "@/components/admin/Learners/AppointmentsApprenant";
import { SouscriptionsApprenant } from "@/components/admin/Learners/SouscriptionsApprenant";
// import { ContratsApprenant } from "@/components/admin/Learners/ContratsApprenant";

const tabs = [
  { label: "Détails", key: "details" },
  { label: "Badges", key: "badges" },
  { label: "Progression", key: "progress" },
  { label: "Rendez-vous", key: "appointments" },
  { label: "Souscriptions", key: "subscriptions" },
  // { label: "Contrats", key: "contracts" },
];

export default function ApprenantDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();

  return (
    <div className="px-2 md:px-8  max-w-7xl 2xl:max-w-6xl mx-auto">
      {/* En-tête sticky */}
      

      <div className="sticky top-[10vh] z- p-2 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 pt-4 pb-2 border-b shadow-sm">
        {/* Bouton retour */}
        <button
          onClick={() => navigate("/admin/apprenants")}
          className="mb-3 inline-flex text-sm items-center gap-2 px-3 py-1 rounded bg-[#F4F3FF] text-[#6C4EEA] hover:bg-[#e6e2fa] font-medium shadow transition"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste
        </button>

        {/* Onglets */}
        <div className="flex justify-center gap-2 md:gap-4 overflow-x-auto pb-1 border-b bg-[#f9f9fa]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 text-sm lg:text-md font-semibold whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'border-b-2 border-[#BCADFC] text-[#6C4EEA] bg-[#e2e0ec]'
                  : 'text-gray-600 hover:text-[#6C4EEA]'
              }`}
              style={{minWidth: 100}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu du tab actif - avec marge supérieure pour compenser le sticky header */}
      <div className="mt-6">
        {activeTab === "details" && <InfosApprenant userId={id} />}
        {activeTab === "badges" && <BadgesApprenant userId={id} />}
        {activeTab === "progress" && <ProgressApprenant userId={id} />}
        {activeTab === "appointments" && <AppointmentsApprenant userId={id ? Number(id) : undefined} />}
        {activeTab === "subscriptions" && <SouscriptionsApprenant userId={id} />}
        {/* {activeTab === "contracts" && <ContratsApprenant userId={id} />} */}
      </div>
    </div>
  );
}