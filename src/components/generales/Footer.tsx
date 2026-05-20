import Logo2 from "@assets/images/home/logo/2.png?w=200&format=webp";
import LabelLogo from "@assets/logo/label.png?w=200&format=webp";
import LogoCPF from "@assets/logo/Logo-CPF.png?w=240&format=webp";
import LogoPermis1Euro from "@assets/logo/logo-permis-1-euro-jour-large.png?w=200&format=webp";
import LogoQualiopi from "@assets/logo/LogoQualiopi-300dpi-Avec-Marianne.png?w=240&format=webp";
import { motion } from "framer-motion";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/a-propos" },
    { name: "Nos Services", path: "/services" },
    { name: "Tarifs & Forfaits", path: "/tarifs" },
    { name: "Contactez-nous", path: "/contact" },
    { name: "Ressources & Blog", path: "/ressources" },
  ];

  const serviceLinks = [
    { name: "Location double commande", path: "/location" },
    { name: "Permis B", path: "/conduite" },
    { name: "Actualisation de conduite", path: "/actualisation" },
    { name: "Fabrication de permis", path: "/fabrication-permis" },
    { name: "Passerelle Boîte Auto", path: "/passerelle" },
    { name: "Code de la route en ligne", path: "/code-en-ligne" },
  ];

  const legalLinks = [
    { name: "Mentions légales", path: "/privacypolicy" },
    { name: "Confidentialité", path: "/privacypolicy" },
    { name: "CGU / CGV", path: "/CGU" },
  ];

  return (
    <motion.footer
      className="bg-foreground text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* CTA Section */}
      <motion.div
        className="relative py-20 px-6 text-center"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Prêt à obtenir votre permis <br />
            <span className="italic text-primary">à Paris & Île-de-France ?</span>
          </h2>
          <p className="text-white/60 text-lg font-medium max-w-xl mx-auto">
            Rejoignez l'auto-école nouvelle génération. Simple, rapide et 100% financé par votre CPF.
          </p>
          <Button
            onClick={() => handleNavigation("/inscription")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 text-lg font-black shadow-xl shadow-primary/25 transition-all hover:scale-105 active:scale-95"
          >
            S'inscrire en 2 minutes
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      <Separator className="bg-white/10" />

      {/* Main Footer Grid */}
      <div className="px-6 xl:px-14 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
          variants={containerVariants}
        >
          {/* Brand & Newsletter */}
          <motion.div className="space-y-6 lg:col-span-2" variants={itemVariants}>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src={Logo2} alt="SMONI Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Smoni est l'auto-école digitale de référence à Paris. <br />
              Formation premium sur véhicules électriques, accompagnement personnalisé et financement CPF.
            </p>
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-white/80">
                Newsletter
              </h3>
              <div className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="votre@email.fr"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-primary/50 focus:ring-primary/20 h-12"
                />
                <Button
                  size="icon"
                  className="rounded-xl shrink-0 bg-primary hover:bg-primary/90 h-12 w-12 shadow-lg shadow-primary/20"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-white/80">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <span
                    onClick={() => handleNavigation(item.path)}
                    className="text-white/50 hover:text-white text-sm transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Detailed List (SEO Internal Linking Booster) */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-white/80">
              Nos Formations
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <span
                    onClick={() => handleNavigation(item.path)}
                    className="text-white/50 hover:text-white text-sm transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-white/80">
              Auto-école Paris
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="text-primary text-sm font-bold mt-0.5">@</div>
                <span className="text-white/50 text-sm leading-relaxed">
                  62 rue de la jarry, <br />
                  94300 Vincennes, France
                </span>
              </li>
              <li className="flex gap-3">
                <div className="text-primary text-sm font-bold mt-0.5">T</div>
                <span className="text-white/50 text-sm">
                  +33 7 49 46 49 78
                </span>
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a href="https://www.facebook.com/SmoniAE" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-xl w-10 h-10 border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-primary/50 transition-all">
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.instagram.com/smoni_ame/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-xl w-10 h-10 border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-primary/50 transition-all">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Separator className="bg-white/10" />

      {/* Certifications & Trust */}
      <motion.div
        className="px-6 xl:px-14 py-12"
        variants={itemVariants}
      >
        <div className="flex flex-wrap justify-between items-center gap-10">
          <div className="flex flex-wrap items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
            {[
              { src: LogoCPF, alt: "Permis financé par CPF" },
              { src: LogoPermis1Euro, alt: "Permis à 1 euro par jour" },
              { src: LogoQualiopi, alt: "Certification Qualiopi" },
              { src: LabelLogo, alt: "Label Qualité Auto-école" },
            ].map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} className="h-10 md:h-12 object-contain" />
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <span key={link.name} onClick={() => handleNavigation(link.path)} className="text-white/30 hover:text-white text-[11px] uppercase tracking-widest cursor-pointer transition-colors">
                {link.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="px-6 xl:px-14 py-8 bg-black/20 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5"
        variants={itemVariants}
      >
        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-black">
          &copy; {new Date().getFullYear()} SMONI AUTO-ÉCOLE — CONDUITE ÉCO-RESPONSABLE À PARIS
        </p>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-black">
          DESIGNED FOR ELITE DRIVERS
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;