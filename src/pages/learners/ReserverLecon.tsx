import Sidebar from "@components/learners/Siderbar/Sidebar";
import MapSection from "@components/learners/MapSection";


import MapSectionMobile from "@components/learners/MapSectionMobile";
import ApendSiderMobile from "@components/learners/NavBar/ApendSiderMobile";
import { useState, useEffect, useCallback } from "react";
import { addDisponibility } from "@/api/learner/disponibility";
import { useSelector } from "react-redux";
import { meetingPoints } from "@/types/data/index";

const ReserverLecon = () => {
  const { token } = useSelector((state: any) => state.authReducer);
  const [selectedLocation, setSelectedLocation] = useState<number | "">("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMode, setSelectedMode] = useState<"manual" | "automatic">("manual");
  // plus de filtre boîte (automatique/manuelle) côté UI; la réponse contient tout
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const fetchDisponibility = useCallback(async () => {
    if (!selectedLocation || !selectedDate) {
      setResult(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const selectedLocationObj = meetingPoints.find(
        (mp) => mp.id === selectedLocation,
      );
      const meetingPointLabel = selectedLocationObj
        ? selectedLocationObj.label
        : "";
      const data = await addDisponibility(
        selectedDate,
        selectedMode,
        meetingPointLabel,
        token,
      );
      setResult(data);
    } catch {
      setError("Erreur lors de la recherche de disponibilités");
    } finally {
      setLoading(false);
    }
  }, [selectedLocation, selectedDate, token, selectedMode]);

  
  useEffect(() => {
    fetchDisponibility();
  }, [selectedLocation, selectedDate, token, selectedMode, fetchDisponibility]);

  // Nouveau format de réponse: { success, data: [...], others: [...] }
  const primaryList = Array.isArray(result?.data) ? (result.data as any[]) : [];
  const othersList = Array.isArray(result?.others) ? (result.others as any[]) : [];
  const combinedForMap = [...primaryList, ...othersList];

  const allMeetingPoints = Array.from(
    new Map((combinedForMap
      .flatMap((item: any) => (item.availabilities || []).map((a: any) => a.meeting_point))
      .filter((mp: any) => mp && mp.id)
      .map((mp: any) => [mp.id, mp])) as any).values(),
  ) as Array<{
    id: number;
    label: string;
    address: string;
    city: string;
    postal_code: string;
    latitude: number | string;
    longitude: number | string;
  }>;

  return (

    <div className="h-screen overflow-hidden bg-gray-50 pt-16">
      {/* Version Desktop */}
      <div className="hidden h-full md:flex">
        <Sidebar
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          mode={selectedMode}
          setMode={setSelectedMode}
          instructorsData={primaryList}
          otherInstructorsData={othersList}
          loading={loading}
          fetchDisponibility={fetchDisponibility}
        />
        <MapSection meetingPoints={allMeetingPoints} />
      </div>

      {/* Version Mobile */}
      <div className="flex h-full flex-col md:hidden">
        <div className="relative w-full" style={{ minHeight: 400 }}>
          <MapSectionMobile meetingPoints={allMeetingPoints} />
        </div>

        <div className="absolute bottom-[50px] left-0 right-0 animate-slideUp overflow-y-auto rounded-t-xl bg-white shadow-lg">
          <ApendSiderMobile
            instructorsData={primaryList}
            otherInstructorsData={othersList}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            mode={selectedMode}
            setMode={setSelectedMode}
            fetchDisponibility={fetchDisponibility}
            loading={loading}
          />
        </div>
      </div>
      {/* Affichage du résultat ou erreur */}
      {loading && (
        <div className="mt-2 text-center text-indigo-600">Recherche...</div>
      )}
      {error && <div className="mt-2 text-center text-red-500">{error}</div>}
      {result && (
        <div className="mt-2 text-center text-green-600">
          Disponibilités trouvées !
        </div>
      )}
    </div>
   
  );
};

export default ReserverLecon;
