import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Logo1 from "@assets/images/home/logo/1.png?w=240&format=webp";
import { motion } from "framer-motion";
import { Menu, Car, BookOpen, Monitor, Shield, ArrowRightLeft, GraduationCap, RefreshCw, ClipboardCheck, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/a-propos" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "Quiz", to: "/quiz", hasDropdown: true },
  { label: "Ressources", to: "/ressources" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  { title: "Location de véhicule", to: "/location", icon: Car, description: "Véhicules double commande." },
  { title: "Conduite", to: "/conduite", icon: BookOpen, description: "Leçons avec moniteur." },
  { title: "Code en ligne", to: "/code-en-ligne", icon: Monitor, description: "Plateforme 24h/24." },
  { title: "Accompagnement", to: "/accompagnement", icon: Shield, description: "Aide le jour de l'examen." },
  { title: "Passerelle", to: "/passerelle", icon: ArrowRightLeft, description: "Passage Auto vers Manuel." },
  { title: "Post-Permis", to: "/post-permis", icon: GraduationCap, description: "Réduisez votre probatoire." },
  { title: "Renouvellement", to: "/actualisation", icon: RefreshCw, description: "Prolongez votre formation." },
  { title: "Fabrication du Permis", to: "/fabrication-permis", icon: ClipboardCheck, description: "Demande officielle." },
];

const quizLinks = [
  { title: "Vérifications Extérieures", to: "/quiz/VE", icon: Car, description: "Contrôles techniques externes." },
  { title: "Vérifications Intérieures", to: "/quiz/VI", icon: Shield, description: "Commandes et habitacle." },
  { title: "Sécurité Routière", to: "/quiz/QSER", icon: BookOpen, description: "Règles et comportements." },
  { title: "Premiers Secours", to: "/quiz/PS", icon: Heart, description: "Gestes d'urgence." },
];

const Header = () => {
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authReducer);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "instructor") return "/monitor/dashboard";
    return "/learners/dashboard";
  };

  const renderDropdownContent = (label: string) => {
    const items = label === "Services" ? serviceLinks : quizLinks;
    const sideTitle = label === "Services" ? "Excellence Routière" : "Entraînez-vous";
    const sideDesc = label === "Services"
      ? "Découvrez nos solutions innovantes pour une formation sur mesure et sécurisée."
      : "Préparez votre examen avec nos séries thématiques gratuites.";
    const gridTitle = label === "Services" ? "Nos Formations & Services" : "Catégories de Quiz";
    const btnTo = label === "Services" ? "/services" : "/quiz";

    return (
      <div className="flex w-[800px] lg:w-[1000px] bg-white text-slate-600 shadow-2xl rounded-md overflow-hidden border border-slate-100/50">
        <div className="w-1/3 bg-gradient-to-br from-[#2c2876] to-[#1e1b4b] p-8 text-white flex flex-col justify-between relative overflow-hidden -m-[1px] rounded-tl-md rounded-bl-md">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {sideTitle.split(' ').map((w, i) => <span key={i}>{w} {i === 0 && <br />}</span>)}
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed font-medium">
              {sideDesc}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => { navigate(btnTo); scrollToTop(); }}
            className="w-fit bg-white/10 hover:bg-white/20 border-none text-white font-bold rounded-xl relative z-10"
          >
            Voir tout
          </Button>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="w-2/3 p-8">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]/80 mb-6">{gridTitle}</div>
          <ul className="grid grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <motion.li
                key={item.to}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <NavigationMenuLink asChild>
                  <NavLink
                    to={item.to}
                    onClick={scrollToTop}
                    className="flex items-start gap-4 rounded-2xl p-4 leading-none no-underline outline-none transition-all hover:bg-slate-50 group border border-transparent hover:border-slate-100"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-md transition-all">
                      <item.icon className="w-5 h-5 text-[#2c2876] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <div className="text-sm font-black text-[#2c2876] leading-none group-hover:text-primary transition-colors">{item.title}</div>
                      <p className="text-[11px] leading-snug text-slate-600 group-hover:text-slate-500 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </NavLink>
                </NavigationMenuLink>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 py-1.5 2xl:px-14 2xl:py-2.5">
        {/* Logo */}
        <NavLink to="/" className="shrink-0" onClick={scrollToTop}>
          <img src={Logo1} alt="SMONI Logo" className="h-7 lg:h-9 2xl:h-11 w-auto transition-transform hover:scale-105" />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-6 flex-grow justify-start 2xl:ml-8 2xl:gap-2">
          <NavigationMenu>
            <NavigationMenuList className="relative flex gap-0.5 2xl:gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem 
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.to)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="relative z-10 px-3 py-1.5 2xl:px-4 2xl:py-2 text-[13px] 2xl:text-sm font-semibold rounded-lg text-slate-700 hover:text-primary bg-transparent transition-all outline-none">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {renderDropdownContent(link.label)}
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavLink
                      to={link.to}
                      onClick={scrollToTop}
                      className={({ isActive }) =>
                        `relative z-10 block px-3 py-1.5 2xl:px-4 2xl:py-2 text-[13px] 2xl:text-sm font-semibold rounded-lg transition-colors duration-200 ${isActive
                          ? "text-primary"
                          : "text-[#64748b] hover:text-primary"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span className="flex items-center gap-1.5">
                          {link.label}
                          {isActive && (
                            <motion.span
                              layoutId="activeNav"
                              className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </span>
                      )}
                    </NavLink>
                  )}

                  {hoveredLink === link.to && (
                    <motion.div
                      layoutId="hoverNav"
                      className="absolute inset-0 z-0 rounded-lg bg-slate-100"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 shrink-0">
          {isAuthenticated ? (
            <NavLink to={getDashboardPath()} onClick={scrollToTop}>
              <Button variant="ghost" className="text-[11px] xl:text-[12px] 2xl:text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 px-3 2xl:px-4 h-8 2xl:h-9 rounded-full">
                Tableau de bord
              </Button>
            </NavLink>
          ) : (
            <NavLink to="/connexion" onClick={scrollToTop}>
              <Button variant="ghost" className="text-[11px] xl:text-[12px] 2xl:text-sm font-bold text-[#64748b] hover:text-primary px-2.5 2xl:px-3 h-8 2xl:h-9">
                Connexion
              </Button>
            </NavLink>
          )}
          <NavLink to="/tarifs" onClick={scrollToTop}>
            <Button className="bg-[#1e1b4b] text-white hover:bg-primary/90 rounded-full px-4 xl:px-5 2xl:px-6 h-9 2xl:h-10 text-[11px] xl:text-[12px] 2xl:text-[13px] font-black shadow-lg shadow-primary/25 transition-all w-max hover:scale-105 active:scale-95">
              Souscrire à une offre
            </Button>
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <div className="flex items-center gap-2 lg:hidden">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-[#1e1b4b]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-none bg-white">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-7">
                <NavLink to="/" className="shrink-0">
                  <img src={Logo1} alt="SMONI Logo" className="h-10 w-auto" />
                </NavLink>
              </div>
              <Separator className="opacity-50" />

              <nav className="flex flex-col gap-2 p-7 flex-grow overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.hasDropdown ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={link.label} className="border-none">
                          <AccordionTrigger className="flex items-center px-5 py-4 text-xl font-black rounded-2xl transition-all duration-200 text-[#1e1b4b]/70 hover:text-primary hover:bg-slate-50 hover:no-underline">
                            {link.label}
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pl-4">
                            <div className="flex flex-col gap-2">
                              {(link.label === "Services" ? serviceLinks : quizLinks).map((item) => (
                                <SheetClose key={item.to} asChild>
                                  <NavLink
                                    to={item.to}
                                    onClick={scrollToTop}
                                    className="flex items-center gap-3 px-5 py-3 text-base font-bold text-[#1e1b4b]/60 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                  >
                                    <item.icon className="w-5 h-5 text-primary" />
                                    {item.title}
                                  </NavLink>
                                </SheetClose>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <SheetClose asChild>
                        <NavLink
                          to={link.to}
                          onClick={scrollToTop}
                          className={({ isActive }) =>
                            `flex items-center px-5 py-4 text-xl font-black rounded-2xl transition-all duration-200 ${isActive
                              ? "text-primary bg-primary/5"
                              : "text-[#1e1b4b]/70 hover:text-primary hover:bg-slate-50"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </SheetClose>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="p-7 space-y-4 border-t">
                {isAuthenticated ? (
                  <SheetClose asChild>
                    <NavLink to={getDashboardPath()} onClick={scrollToTop} className="block">
                      <Button variant="outline" className="w-full rounded-xl h-14 text-lg text-primary border-primary bg-primary/5 font-black">
                        Tableau de bord
                      </Button>
                    </NavLink>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <NavLink to="/connexion" onClick={scrollToTop} className="block">
                      <Button variant="outline" className="w-full rounded-xl h-14 text-lg font-black">
                        Connexion
                      </Button>
                    </NavLink>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <NavLink to="/tarifs" onClick={scrollToTop} className="block">
                    <Button className="w-full bg-[#1e1b4b] text-white hover:bg-primary rounded-xl h-14 text-lg font-black shadow-2xl shadow-primary/20">
                      Souscrire à une offre
                    </Button>
                  </NavLink>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
