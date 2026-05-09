import { Check, X, ArrowRight, Zap } from "lucide-react";
import { BoutiqueService } from "@/api/boutique/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const LocationPricingCard = ({ item }: { item: BoutiqueService }) => {
  // Determine if it's a "premium" looking card (price > 100 as a heuristic or if it has items)
  const isPremium = Number(item.price) > 100;

  return ( 
    <motion.div
      className="w-full h-full p-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className={`group relative h-full flex flex-col border-slate-200/60 bg-white/70 backdrop-blur-md overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(44,40,118,0.15)] hover:border-[#2c2876]/20`}>
        
        {/* Animated Highlight Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10">
           <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#2c2876]/5" />
        </div>

        <CardHeader className="relative p-8 pb-4 text-center">
            {isPremium && (
                <div className="absolute top-6 right-6">
                    <Badge className="bg-[#2c2876] text-white border-none shadow-lg animate-pulse">
                        <Zap className="w-3 h-3 mr-1 fill-current" />
                        Recommandé
                    </Badge>
                </div>
            )}
            
            <div className="space-y-2 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]/60">Forfait</span>
                <h3 className="text-2xl font-black text-[#2c2876]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {item.title}
                </h3>
            </div>

            <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-black text-[#2c2876] align-top mt-1">€</span>
                <span className="text-6xl font-[900] text-[#2c2876] tracking-tighter italic">
                    {item.price}
                </span>
                {/* <span className="text-slate-400 font-bold self-end mb-2">/ttc</span> */}
            </div>
        </CardHeader>

        <CardContent className="flex-grow p-8 pt-4">
            {item.items && item.items.length > 0 && (
                <div className="space-y-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    
                    <ul className="space-y-4">
                        {item.items.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                {feature.status ? (
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
                                        <Check className="h-3.5 w-3.5" />
                                    </div>
                                ) : (
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                                        <X className="h-3.5 w-3.5" />
                                    </div>
                                )}
                                <span className={`text-sm font-semibold transition-colors ${feature.status ? 'text-slate-600 group-hover:text-[#2c2876]' : 'text-slate-400 line-through decoration-slate-300'}`}>
                                    {feature.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </CardContent>

        <CardFooter className="p-8 pt-0">
            <Link to="/learners/boutique" className="w-full">
                <Button 
                    className={`w-full h-14 rounded-2xl text-lg font-black transition-all duration-300 group/btn border-none shadow-[0_10px_20px_-10px_rgba(44,40,118,0.3)] 
                        ${isPremium ? 'bg-[#2c2876] text-white hover:bg-[#1e1b4b] hover:shadow-[0_15px_30px_-10px_rgba(44,40,118,0.5)]' : 'bg-slate-100 text-[#2c2876] hover:bg-[#2c2876] hover:text-white'}`}
                >
                    Choisir ce forfait
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
            </Link>
        </CardFooter>

        {/* Bottom Accent Decor */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2c2876] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
      
      {/* Background Glow Effect */}
      {isPremium && (
          <div className="absolute -inset-4 bg-[#2c2876]/5 rounded-[3rem] blur-2xl -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      )}
    </motion.div>
  );
};

export default LocationPricingCard;

