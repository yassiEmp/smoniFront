import Footer from "@components/generales/Footer"
import Header from "@components/generales/Header"
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection"
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router"
import { motion, useSpring } from "framer-motion"
import * as Yup from "yup"
import { Formik } from "formik"
import { mailContact } from "@/api/auth"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import PageHead from "@components/SEO/PageHead"
import JsonLd from "@components/SEO/JsonLd"
import { breadcrumbSchema } from "@components/SEO/schemas"

const Contact = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const smoothX = useSpring(mousePos.x, { damping: 50, stiffness: 400 })
    const smoothY = useSpring(mousePos.y, { damping: 50, stiffness: 400 })

    const initialValues = {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        object: "",
        message: ""
    }

    const objetOptions = [
        "Elève : je veux m'inscrire",
        "Je souhaite devenir moniteur",
        "Je suis un élève : j'ai une question",
        "Je suis un moniteur : j'ai une question",
        "Je suis financeur : j'ai une question",
        "Réclamation",
        "Autre"
    ]

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Le nom est requis."),
        lastname: Yup.string().required("Le prénom est requis."),
        phone: Yup.string().required("Le numéro de téléphone est requis."),
        email: Yup.string().email("Email invalide.").required("L'email est requis."),
        object: Yup.string().required("L'objet est requis."),
        message: Yup.string().required("Le message est requis.")
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 200, damping: 20 }
        },
    }

    const handleNavigate = (path: string) => {
        navigate(path)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <PageHead
                title="Contact - Smoni Auto-Ecole Vincennes (94300)"
                description="Contactez Smoni Auto-Ecole a Vincennes : adresse, telephone, formulaire en ligne pour vos demandes d'information et inscriptions."
                canonicalPath="/contact"
            />
            <JsonLd
                data={breadcrumbSchema([
                    { name: "Accueil", path: "/" },
                    { name: "Contact", path: "/contact" },
                ])}
            />
            <Header />

            {/* Hero Section of Contact */}
            <main className="relative pt-[120px] sm:pt-[140px] pb-16 md:pb-24 overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                radial-gradient(at 0% 0%, rgba(44, 40, 118, 0.04) 0px, transparent 50%),
                                radial-gradient(at 100% 0%, rgba(44, 40, 118, 0.06) 0px, transparent 50%)
                            `
                        }}
                    />
                    <motion.div 
                        className="fixed w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(44, 40, 118, 0.15) 0%, transparent 60%)',
                            left: 0, top: 0, translateX: '-50%', translateY: '-50%',
                            x: typeof window !== 'undefined' ? smoothX.get() * 15 + window.innerWidth / 2 : 0,
                            y: typeof window !== 'undefined' ? smoothY.get() * 15 + window.innerHeight / 2 : 0,
                        }}
                    />
                </div>

                <motion.div 
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center sm:items-start lg:items-start">
                        
                        {/* Left Content (Text & Contact Details) */}
                        <div className="lg:w-5/12 flex flex-col pt-8 text-center sm:text-left">
                            <motion.div 
                                variants={itemVariants}
                                className="inline-flex items-center w-fit px-4 sm:px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#2c2876]/10 shadow-sm mb-6 mx-auto sm:mx-0"
                            >
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876]">Support 24/7</span>
                            </motion.div>
                            
                            <motion.h1 
                                variants={itemVariants}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-[900] text-[#2c2876] leading-[1] sm:leading-[0.9] tracking-tighter mb-8"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Discutons <br/> 
                                <span className="bg-gradient-to-r from-[#2c2876] via-[#2c2876] to-blue-500 bg-clip-text text-transparent italic">Ensemble.</span>
                            </motion.h1>

                            <motion.p 
                                variants={itemVariants}
                                className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium mb-12 max-w-lg mx-auto sm:mx-0"
                            >
                                Que vous ayez des questions sur notre plateforme, besoin d'aide pour réserver une session, ou que vous souhaitiez collaborer avec nous, <strong className="text-[#2c2876]">notre équipe est à votre écoute !</strong>
                            </motion.p>

                            <motion.div className="flex flex-col gap-6" variants={containerVariants}>
                                <motion.div variants={itemVariants} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-slate-200/60 cursor-pointer">
                                    <div className="flex w-14 h-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform group-hover:shadow-md">
                                        <Mail className="h-6 w-6 text-[#2c2876]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-[#2c2876] uppercase tracking-wider mb-1">Email direct</span>
                                        <a href="mailto:contact@smoni.fr" className="text-slate-500 font-medium hover:text-[#2c2876] transition-colors">contact@smoni.fr</a>
                                        <span className="text-xs text-slate-400 mt-1">Réponse moyenne en 2h</span>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-slate-200/60 cursor-pointer">
                                    <div className="flex w-14 h-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform group-hover:shadow-md">
                                        <Phone className="h-6 w-6 text-[#2c2876]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-[#2c2876] uppercase tracking-wider mb-1">Téléphone</span>
                                        <a href="tel:+33749464978" className="text-slate-500 font-medium hover:text-[#2c2876] transition-colors">+33 7 49 46 49 78</a>
                                        <span className="text-xs text-slate-400 mt-1">Du Lundi au Vendredi, 8h - 18h</span>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-slate-200/60 cursor-pointer">
                                    <div className="flex w-14 h-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform group-hover:shadow-md">
                                        <MapPin className="h-6 w-6 text-[#2c2876]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-[#2c2876] uppercase tracking-wider mb-1">Bureaux</span>
                                        <span className="text-slate-500 font-medium">62 rue de la jarry<br/>94300 Vincennes</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Right Content (The Form) */}
                        <motion.div 
                            className="lg:w-7/12 w-full"
                            variants={cardVariants}
                        >
                            <div className="bg-white/80 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] border border-slate-200 shadow-[0_20px_40px_-15px_rgba(44,40,118,0.1)]">
                                <Formik initialValues={initialValues} validationSchema={validationSchema}
                                    onSubmit={ async (values, {setSubmitting, resetForm}) => {
                                        setLoading(true);
                                        const response = await mailContact(values);
                                        if (response.success) {
                                            toast.success("Votre message a été envoyé avec succès !");
                                            resetForm();
                                        } else {
                                            toast.error("Une erreur s'est produite lors de l'envoi de votre message.");
                                        }
                                        setLoading(false);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ 
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                        isValid,
                                        dirty, 
                                    }) => (
                                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
                                            {/* Decorative Element */}
                                            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#2c2876]/5 rounded-full blur-2xl pointer-events-none" />
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <Label className="text-[#2c2876] font-extrabold text-sm ml-1" htmlFor="firstname">Nom</Label>
                                                    <Input 
                                                        type="text" 
                                                        id="firstname"
                                                        name="firstname"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.firstname}
                                                        placeholder="Votre nom" 
                                                        className={`h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus-visible:ring-[#2c2876] transition-all focus:bg-white ${touched.firstname && errors.firstname ? 'border-red-500 ring-red-500' : 'hover:border-slate-300'}`}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label className="text-[#2c2876] font-extrabold text-sm ml-1" htmlFor="lastname">Prénom</Label>
                                                    <Input 
                                                        type="text" 
                                                        id="lastname"
                                                        name="lastname"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.lastname}
                                                        placeholder="Votre prénom" 
                                                        className={`h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus-visible:ring-[#2c2876] transition-all focus:bg-white ${touched.lastname && errors.lastname ? 'border-red-500 ring-red-500' : 'hover:border-slate-300'}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <Label className="text-[#2c2876] font-extrabold text-sm ml-1" htmlFor="phone">Téléphone</Label>
                                                    <Input 
                                                        type="tel" 
                                                        id="phone" 
                                                        name="phone"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone}
                                                        placeholder="+33 6 12 34 56 78"
                                                        className={`h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus-visible:ring-[#2c2876] transition-all focus:bg-white ${touched.phone && errors.phone ? 'border-red-500 ring-red-500' : 'hover:border-slate-300'}`}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label className="text-[#2c2876] font-extrabold text-sm ml-1" htmlFor="email">Email</Label>
                                                    <Input 
                                                        type="email" 
                                                        id="email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        placeholder="nom@exemple.com" 
                                                        className={`h-14 rounded-xl bg-slate-50/50 border-slate-200 text-base focus-visible:ring-[#2c2876] transition-all focus:bg-white ${touched.email && errors.email ? 'border-red-500 ring-red-500' : 'hover:border-slate-300'}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="text-[#2c2876] font-extrabold text-sm ml-1" htmlFor="object">Sujet de votre message</Label>
                                                <select 
                                                    id="object"
                                                    name="object"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.object}
                                                    className={`h-14 w-full rounded-xl border bg-slate-50/50 px-4 text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2c2876] focus:border-transparent transition-all ${touched.object && errors.object ? 'border-red-500' : 'border-slate-200 hover:border-slate-300'}`}
                                                >
                                                    <option value="" disabled className="text-slate-400">Sélectionnez le sujet...</option>
                                                    {objetOptions.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                {touched.object && errors.object && (
                                                    <span className="text-red-500 text-xs font-medium ml-1">{errors.object}</span>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="text-[#2c2876] font-extrabold text-sm ml-1" htmlFor="message">Message</Label>
                                                <Textarea 
                                                    placeholder="Détaillez votre demande ici..." 
                                                    id="message"
                                                    name="message"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.message}
                                                    rows={5}  
                                                    className={`resize-none rounded-xl bg-slate-50/50 border-slate-200 text-base p-4 focus-visible:ring-[#2c2876] transition-all focus:bg-white ${touched.message && errors.message ? 'border-red-500 ring-red-500' : 'hover:border-slate-300'}`}
                                                />
                                            </div>

                                            <div className="pt-4 flex flex-col md:flex-row items-center gap-6 justify-between">
                                                <Button 
                                                    type="submit"
                                                    size="lg"
                                                    disabled={isSubmitting || !(isValid && dirty)}
                                                    className="w-full md:w-auto bg-[#2c2876] text-white hover:bg-[#1e1b4b] rounded-2xl px-10 h-16 text-lg font-black shadow-[0_15px_30px_-10px_rgba(44,40,118,0.5)] transition-all hover:scale-[1.03] group border-none disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                                                >
                                                    {loading ? (
                                                        <span className="flex items-center gap-2">Envoi en cours <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"/></span>
                                                    ) : (
                                                        <span className="flex items-center gap-2">Envoyer le message <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                                                    )}
                                                </Button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleNavigate("/inscription")}
                                                    className="text-sm font-bold text-slate-500 hover:text-[#2c2876] transition-colors flex items-center gap-1 group"
                                                >
                                                    Ou devenir moniteur <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </main>

            {/* Map Section */}
            <section className="bg-white py-12 lg:py-24 border-t border-slate-100 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="flex flex-col items-center mb-12"
                    >
                        <motion.span variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2876] mb-4 bg-slate-100 px-4 py-1.5 rounded-full">Bureaux Physiques</motion.span>
                        <motion.h2 
                            variants={itemVariants}
                            className="text-3xl lg:text-5xl font-extrabold text-[#2c2876] text-center"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Retrouvons-nous à <span className="text-blue-500 italic">Vincennes.</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-[400px] lg:h-[550px] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-4 border-white ring-1 ring-slate-100"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d253.06406488885534!2d2.4453053942842042!3d48.84929234363686!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67315da15958b%3A0xe3ef913deed34094!2sSmoni%20Auto-école%20Vincennes!5e0!3m2!1sfr!2sfr!4v1744111684638!5m2!1sfr!2sfr"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "brightness(1) contrast(1.05)" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localisation de SMONI sur Google Maps"
                        />
                    </motion.div>
                </div>
            </section>
            
            <div className="relative z-10 bg-white">
                <HomeNewStudentSection />
            </div>
            
            <Footer />
        </div>
    )
}

export default Contact