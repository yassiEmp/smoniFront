import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCourses} from "@/api/courses";
import { Course } from "@/types/course";
import { RootState } from "@/store/configureStore";
import { imageUrl } from "@/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { User2, Phone, CalendarDays, MapPin, CalendarX } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Cours = () => {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchCourses(token, 1)
      .then((res) => {
        setCourses(res.data);
        setHasMore(res.next_page_url !== null);
        setPage(2);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [token]);

  // Infinite scroll horizontal
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || loading || !hasMore) return;
    if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 50) {
      setLoading(true);
      fetchCourses(token, page)
        .then((res) => { 
          setCourses((prev) => [...prev, ...res.data]);
          setHasMore(res.next_page_url !== null);
          setPage((p) => p + 1);
        })
        .finally(() => setLoading(false));
    }
  };

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
  }, [courses, loading]); // Ajout de courses et loading comme dépendances

  // Vérifier si le contenu est suffisamment large pour nécessiter un défilement
  useEffect(() => {
    // Timeout pour s'assurer que le DOM est mis à jour
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [courses, loading]);

  // Format date et heure
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  };

  if (!loading && courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-[12px] min-h-[200px] w-full">
        <CalendarX size={48} className="text-[#6C61F6] mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Aucun cours à venir
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          Vous n'avez pas encore de cours programmés. Rendez-vous dans votre planning pour ajouter des créneaux de disponibilité.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Flèche gauche - cachée pendant le chargement */}
      {!loading && showLeftArrow && (
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#6c61f6] rounded-full p-1 shadow-md hover:bg-gray-700 transition-colors"
          aria-label="Défiler vers la gauche"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
      )}
      
      <div
        ref={scrollContainerRef}
        onScroll={() => {
          handleScroll();
          checkScrollPosition();
        }}
        className="flex gap-[24px] overflow-x-auto flex-nowrap scrollbar-hide"
        style={{ minHeight: 180 }}
      >
        {loading && courses.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-[24px] p-4 min-w-[432px] bg-white rounded-[12px]">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton circle width={40} height={40} />
                    <div className="space-y-[4px]">
                      <Skeleton width={100} height={16} />
                      <div className="flex items-center gap-2">
                        <Skeleton width={20} height={16} />
                        <Skeleton width={80} height={14} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton width={24} height={24} />
                    <div className="space-y-[4px]">
                      <Skeleton width={80} height={16} />
                      <Skeleton width={60} height={14} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton width={20} height={20} />
                  <Skeleton width={220} height={14} />
                </div>
              </div>
            ))
          : courses.map((c) => (
              <div key={c.id} className="space-y-[24px] p-4 min-w-[432px] bg-white rounded-[12px] flex-none">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    {c.learner.photo ? (
                      <img 
                        src={imageUrl + c.learner.photo}
                        alt={c.learner.firstname}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                        <User2 className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="space-y-[4px]">
                      <h1 className="text-[14px] font-semibold leading-[140%]">
                        {c.learner.firstname} {c.learner.lastname}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#6C61F6]" />
                        <p className="text-[12px] text-[#616161]">{c.learner.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-[#6C61F6]" />
                    <div className="space-y-[4px]">
                      <h1 className="text-[#6C61F6] text-[14px] font-medium">
                        {formatDate(c.date)}
                      </h1>
                      <p className="text-[12px] text-[#616161]">
                        {c.start_time} à {c.end_time}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#6C61F6]" />
                  <p className="text-[12px]">
                    {c.availability?.meeting_point?.label
                      ? c.availability.meeting_point.label
                      : "Lieu à venir"}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Flèche droite - cachée pendant le chargement */}
      {!loading && showRightArrow && (
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#6c61f6] rounded-full p-1 shadow-md hover:bg-gray-700 transition-colors"
          aria-label="Défiler vers la droite"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default Cours;