import { Check, X, ArrowRight, Zap } from "lucide-react";
import { BoutiqueService } from "@/api/boutique/types";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const LocationPricingCard = ({ item }: { item: BoutiqueService }) => {
  // Determine if it's a "premium" looking card (price > 100 as a heuristic or if it has items)
  const isPremium = Number(item.price) > 100;

  return ( 
    <motion.div
      className="w-full h-full p-1.5 sm:p-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card
        className={[
          "group relative h-full flex flex-col bg-white overflow-hidden",
          "rounded-3xl sm:rounded-[2.5rem]",
          "border transition-[transform,box-shadow] duration-200 ease-out",
          "shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]",
          "hover:-translate-y-1 hover:shadow-[0_12px_28px_-12px_rgba(15,23,42,0.18),0_4px_8px_-4px_rgba(15,23,42,0.08)]",
          isPremium ? "border-[#2c2876]/30" : "border-slate-200",
        ].join(" ")}
      >

        <CardHeader className="relative p-5 sm:p-8 pb-3 sm:pb-4 text-center">
            {isPremium && (
                <Badge className="mx-auto mb-3 w-fit bg-[#2c2876] text-white border-none shadow-sm">
                    <Zap className="w-3 h-3 mr-1 fill-current" />
                    Recommandé
                </Badge>
            )}

            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]/60">Forfait</span>
                <h3 className="text-xl sm:text-2xl font-black text-[#2c2876] break-words" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {item.title}
                </h3>
            </div>

            <div className="flex items-baseline justify-center gap-0.5 sm:gap-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#2c2876]">€</span>
                <span className="text-4xl sm:text-5xl md:text-6xl font-[900] text-[#2c2876] tracking-tighter italic leading-none">
                    {item.price}
                </span>
            </div>
        </CardHeader>

        <CardContent className="flex-grow p-5 sm:p-8 pt-3 sm:pt-4">
            {item.items && item.items.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    <ul className="space-y-3 sm:space-y-4">
                        {item.items.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                {feature.status ? (
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mt-0.5">
                                        <Check className="h-3.5 w-3.5" />
                                    </div>
                                ) : (
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-200 mt-0.5">
                                        <X className="h-3.5 w-3.5" />
                                    </div>
                                )}
                                <span className={`text-sm font-semibold leading-snug ${feature.status ? 'text-slate-700' : 'text-slate-400 line-through decoration-slate-300'}`}>
                                    {feature.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </CardContent>

        <CardFooter className="p-5 sm:p-8 pt-0">
            <Link to="/learners/boutique" className="w-full">
                <Button
                    className={`w-full h-12 sm:h-14 rounded-2xl text-base sm:text-lg font-black transition-all duration-300 group/btn border-none shadow-[0_10px_20px_-10px_rgba(44,40,118,0.3)]
                        ${isPremium ? 'bg-[#2c2876] text-white hover:bg-[#1e1b4b] hover:shadow-[0_15px_30px_-10px_rgba(44,40,118,0.5)]' : 'bg-slate-100 text-[#2c2876] hover:bg-[#2c2876] hover:text-white'}`}
                >
                    Choisir ce forfait
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
            </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LocationPricingCard;

