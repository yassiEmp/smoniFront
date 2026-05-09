/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { fetchBadges } from "@/api/admin/BadgesApprenant";
import recompenser from "@assets/apprenants/dashboard/recompense.png";
import norecompenser from "@assets/apprenants/dashboard/norecompense.png";
import Loader from "@/components/common/Loader";

export function BadgesApprenant({ userId }: { userId: string | undefined }) {
  const [badges, setBadges] = useState<any[]>([]);
  const [noBadges, setNoBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    if (!token || !userId) return;
    setLoading(true);
    fetchBadges(token, userId)
      .then((response) => {
        setBadges(response.data.badges || []);
        setNoBadges(response.data.nobadges || []);
      })
      .catch(() => {
        setBadges([]);
        setNoBadges([]);
      })
      .finally(() => setLoading(false));
  }, [token, userId]);

  if (loading) return <Loader />;

  const totalBadges = badges.length + noBadges.length;
  const validatedBadges = badges.length;

  // Combine both arrays and sort them
  const allBadges = [
    ...badges.map(b => ({ ...b.list_badge, validated: true })),
    ...noBadges.map(b => ({ ...b, validated: false }))
  ];

  return (
    <div className="space-y-6  mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="inline-block w-6 h-6 bg-[#6C4EEA] text-white rounded-full flex items-center justify-center font-bold">
            {validatedBadges}
          </span>
          <span>
            Badge{validatedBadges > 1 ? "s" : ""} obtenu{validatedBadges > 1 ? "s" : ""}
            <span className="text-[#616161] font-normal ml-2">
             {`${validatedBadges}/${totalBadges}`}
            </span>
          </span>
        </h3>
        <div className="text-sm text-gray-500">
          <span className="inline-flex items-center gap-1 mr-4">
            <img src={recompenser} alt="" className="w-5 h-5 inline" /> Obtenu
          </span>
          <span className="inline-flex items-center gap-1">
            <img src={norecompenser} alt="" className="w-5 h-5 inline" /> Non obtenu
          </span>
        </div>
      </div>

      {totalBadges === 0 && (
        <div className="text-center text-gray-500 py-8">
          Aucun badge n'est défini pour cet apprenant.
        </div>
      )}

      {totalBadges > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allBadges.map((badge) => {
           
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 bg-white shadow-sm flex flex-col h-full transition
                  ${badge.validated ? "border-[#6C4EEA] bg-[#f6f4fd]" : "border-gray-200"}
                `}
                tabIndex={0}
                aria-label={badge.name}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={badge.validated ? recompenser : norecompenser}
                    alt={badge.validated ? "Badge obtenu" : "Badge non obtenu"}
                    className="w-12 h-12"
                  />
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${badge.validated ? "bg-[#6C4EEA] text-white" : "bg-gray-200 text-gray-700"}`}>
                    {badge.validated ? "Obtenu" : "Non obtenu"}
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className={`text-[15px] font-medium text-[#424242]`}
                  >
                    {badge.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

     
    </div>
  );
}


export default BadgesApprenant;
