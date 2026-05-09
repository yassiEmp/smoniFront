import UnicornScene from "unicornstudio-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const HomeUnicornSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-32 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 px-4 py-1 rounded-full uppercase tracking-widest text-xs font-black">
              <Sparkles className="w-3 h-3 mr-2" />
              Innovation & Design
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-black text-white max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Une expérience immersive <br /> 
            <span className="text-primary italic">haute performance</span>
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Nous utilisons les dernières technologies pour vous offrir un apprentissage moderne, fluide et captivant.
          </motion.p>
        </div>

        <motion.div 
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl border-8 border-white/5"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <UnicornScene
            projectId="aIOP945E8B5FsRYuotIt"
            className="w-full h-full object-cover"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.4/dist/unicornStudio.umd.js"
          />
          {/* Subtle overlay to make it pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export default HomeUnicornSection;
