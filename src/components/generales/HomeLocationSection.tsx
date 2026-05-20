import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const locations = [
  {
    city: "Vincennes — Agence unique",
    address: "62 rue de la Jarry, 94300 Vincennes",
    phone: "07 71 26 51 19",
    hours: "Lun - Sam: 9h - 20h • Dim: fermé",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.54148!2d2.43632!3d48.84758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67299!2s62%20Rue%20de%20la%20Jarry%2C%2094300%20Vincennes!5e0!3m2!1sfr!2sfr!4v1625000000000"
  },
  {
    city: "RER A Vincennes — 4 min à pied",
    address: "Sortie place Pierre Sémard, direction rue de la Jarry",
    phone: "07 71 26 51 19",
    hours: "Trajet : 4 min à pied",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.54148!2d2.43632!3d48.84758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67299!2s62%20Rue%20de%20la%20Jarry%2C%2094300%20Vincennes!5e0!3m2!1sfr!2sfr!4v1625000000000"
  },
  {
    city: "Métro 1 Bérault — 6 min à pied",
    address: "Sortie Bérault, direction rue Defrance puis rue de la Jarry",
    phone: "07 71 26 51 19",
    hours: "Trajet : 6 min à pied",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.54148!2d2.43632!3d48.84758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67299!2s62%20Rue%20de%20la%20Jarry%2C%2094300%20Vincennes!5e0!3m2!1sfr!2sfr!4v1625000000000"
  }
];

const HomeLocationSection = () => {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <section className="py-24 md:py-32 bg-[#f8fafc] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e1b4b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 md:px-10 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Content & List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 space-y-8"
          >
            <div className="space-y-4">
              <Badge className="bg-primary text-white font-bold px-4 py-1.5 rounded-lg uppercase tracking-widest text-[10px]">
                Nous trouver
              </Badge>
              <h2 className="text-[36px] md:text-[48px] font-black text-[#1e1b4b] leading-tight">
                Une seule agence. À Vincennes. <span className="text-primary italic">Pour vrai</span>.
              </h2>
              <p className="text-slate-700 text-lg font-medium leading-relaxed">
                Pas de « réseau national » inventé. Vous savez où nous trouver, qui vous accueille, et qui répond au téléphone.
              </p>
            </div>
            
            <div className="space-y-4">
              {locations.map((loc, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setActiveLocation(loc)}
                  className={`p-5 rounded-[20px] transition-all cursor-pointer border ${
                    activeLocation.city === loc.city 
                    ? "bg-white border-primary shadow-xl shadow-primary/5" 
                    : "bg-white/50 border-slate-100 hover:border-primary/30"
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeLocation.city === loc.city ? "bg-primary text-white" : "bg-slate-100 text-[#1e1b4b]"
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#1e1b4b]">{loc.city}</h3>
                      <p className="text-xs text-[#64748b] font-medium">{loc.address}</p>
                    </div>
                  </div>
                  {activeLocation.city === loc.city && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-bold text-primary">{loc.phone}</p>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{loc.hours}</p>
                      </div>
                      <Button size="sm" className="bg-[#1e1b4b] rounded-lg text-[11px] h-8">
                        Contacter
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5 rounded-xl h-12 font-bold group">
              Itinéraire Google Maps
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Right Side: Real Google Maps */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12 h-[500px] lg:h-[650px] sticky top-32"
          >
            <div className="w-full h-full rounded-[32px] overflow-hidden border-8 border-white shadow-2xl relative">
              <iframe
                src={activeLocation.mapUrl}
                title={`Carte — Smoni Auto-École Vincennes, ${activeLocation.address}`}
                aria-label={`Localisation Smoni Auto-École : ${activeLocation.city}, ${activeLocation.address}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] contrast-[1.1]"
              />
              
              {/* Overlay Label */}
              <div className="absolute top-6 left-6 bg-[#1e1b4b] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 leading-none mb-1">Vincennes • 94300</p>
                  <p className="text-sm font-black leading-none">{activeLocation.city}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HomeLocationSection;
