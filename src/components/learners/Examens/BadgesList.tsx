/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { fetchBadges } from "@/api/learner/badges";
import recompenser from "@assets/apprenants/dashboard/recompense.png";
import norecompenser from "@assets/apprenants/dashboard/norecompense.png";
import Loader from "@/components/common/Loader";
import { Tooltip } from "react-tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BadgesList = () => {
  const [badges, setBadges] = useState<any[]>([]);
  const [noBadges, setNoBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { token } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const response = await fetchBadges(token);
        setBadges(response.data.badges);
        setNoBadges(response.data.nobadges);
      } catch (error) {
        console.error("Error loading badges:", error);
      } finally {
        setLoading(false);
      }
    }; 

    loadBadges();
  }, [token]);

  // Vérifier la position du scroll pour afficher/masquer les flèches
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Défiler vers la gauche
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Défiler vers la droite
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Vérifier la position initiale
      checkScrollPosition();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [badges, noBadges]);

  if (loading) return <Loader />;

  const totalBadges = badges.length + noBadges.length;
  const validatedBadges = badges.length;

  // Combine both arrays and sort them
  const allBadges = [
    ...badges.map(b => ({ ...b.list_badge, validated: true })),
    ...noBadges.map(b => ({ ...b, validated: false }))
  ];

  return (
    <div className="space-y-4 relative">
      <h3 className="text-lg font-semibold">
        Mes récompenses{" "}
        <span className="text-[#616161]">{`${validatedBadges}/${totalBadges}`}</span>
      </h3>

      <div className="relative">
        {/* Flèche gauche */}
        {showLeftArrow && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-0 bg-[#6c61f6] rounded-full p-1 shadow-md hover:bg-gray-700 transition-colors"
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
        )}

        {/* Conteneur de défilement */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allBadges.map((badge) => {
            const isLong = badge.name.split(" ").length > 2;
            const tooltipId = `badge-tooltip-${badge.id}`;
            return (
              <div
                key={badge.id}
                className="w-[160px] snap-start rounded-xl border p-3 text-center bg-white flex-none" // Utilisation de flex-none au lieu de flex-shrink-0
              >
                <div className="h-20 mb-2 rounded-md flex items-center justify-center">
                  <img
                    src={badge.validated ? recompenser : norecompenser}
                    alt={`Badge - ${badge.name}`}
                    className="h-[96px] w-[144px] object-contain" // Ajout de object-contain pour uniformiser l'affichage
                  />
                </div>
                <p
                  className={`text-[13px] font-semibold text-[#424242] truncate ${isLong ? "cursor-pointer" : ""}`}
                  data-tooltip-id={isLong ? tooltipId : undefined}
                  data-tooltip-content={isLong ? badge.name : undefined}
                >
                  {badge.name}
                </p>
                {isLong && <Tooltip id={tooltipId} />}
              </div>
            );
          })}
        </div>

        {/* Flèche droite */}
        {showRightArrow && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-0 bg-[#6c61f6] rounded-full p-1 shadow-md hover:bg-gray-700 transition-colors"
            aria-label="Défiler vers la droite"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BadgesList;