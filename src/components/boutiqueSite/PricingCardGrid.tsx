import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LocationPricingCard from "@/components/generales/Card/LocationPricingCard";
import { BoutiqueService } from "@/api/boutique/types";

interface PricingCardGridProps {
  services: BoutiqueService[];
  emptyLabel?: string;
}

/**
 * Mobile: snap-scroll carousel with peek of next card (so users see there's more)
 *         + dot indicators + prev/next arrows.
 * md+:    standard responsive grid.
 *
 * Why a carousel on mobile: 5+ pricing cards stacked vertically force users
 * through every card before reaching the next section. A horizontal carousel
 * lets them sample, scrub, or skip — matches mobile reading patterns.
 */
const PricingCardGrid = ({ services, emptyLabel = "Aucun service disponible." }: PricingCardGridProps) => {
  if (services.length === 0) {
    return <div className="text-center text-gray-500 py-12">{emptyLabel}</div>;
  }

  return (
    <>
      {/* Mobile carousel */}
      <div className="md:hidden">
        <MobileCarousel services={services} />
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {services.map((service) => (
          <LocationPricingCard key={service.id} item={service} />
        ))}
      </div>
    </>
  );
};

const MobileCarousel = ({ services }: { services: BoutiqueService[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: false,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Forfaits disponibles"
      className="relative"
    >
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {services.map((service, i) => (
            <div
              key={service.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Forfait ${i + 1} sur ${services.length}`}
              className="shrink-0 grow-0 basis-[88%] sm:basis-[70%] min-w-0 pr-3 last:pr-0"
            >
              <LocationPricingCard item={service} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {services.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Forfait précédent"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Sélectionner un forfait">
            {scrollSnaps.map((_, i) => {
              const isActive = i === selectedIndex;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Aller au forfait ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive ? "w-6 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Forfait suivant"
            onClick={scrollNext}
            disabled={!canNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      <p className="mt-2 text-center text-xs text-slate-400 sm:hidden" aria-hidden="true">
        Glissez pour parcourir les forfaits
      </p>
    </section>
  );
};

export default PricingCardGrid;
