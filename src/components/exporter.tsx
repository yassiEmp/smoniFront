import React from "react";
import { apiUrl } from "@/api/index";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import pdf_icon from "@/assets/dashboard-moniteur/pdf-icon.svg";

const ExportButton = () => {
  const token = useSelector((state: RootState) => state.authReducer.token);

  const handleExport = async () => {
    try {
      const response = await fetch(`${apiUrl}export`, {
      credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Erreur lors de l’export");

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "historique_paiements.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur export:", error);
    }
  };

  return (
    <button
     onClick={handleExport}
    className="flex items-center justify-center gap-2 rounded-[8px] border-[0.5px] border-[#616161] bg-[#FDFDFD] px-2.5 py-2 text-sm sm:text-base font-medium leading-[140%] text-[#616161]">
              <span>Exporter</span>
              <img src={pdf_icon} alt="Pdf Icon" className="h-auto w-[24px] object-cover" />
  </button>
  
  );
};

export default ExportButton;
