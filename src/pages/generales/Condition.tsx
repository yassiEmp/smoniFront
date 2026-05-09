import Footer from "@components/generales/Footer"
import Header from "@components/generales/Header"
import { CgChevronRight } from "react-icons/cg"
import { Link } from "react-router"
import { motion } from "motion/react";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import { SiShieldsdotio } from "react-icons/si";
import { FiAlertCircle, FiFileText } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiAward, BiUser } from "react-icons/bi";
import { CgUserRemove } from "react-icons/cg";

const Condition = () => {
    return (
        <>
            <Header />
            <div className="pt-[120px] relative overflow-hidden">
                <div className=" min-h-screen">
                    {/* Breadcrumb */}
                    <div className="container  flex justify-center mx-auto py-4 px-4 md:px-6 pt-8 lg:pt-16">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/"
                                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-black"
                                    >
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <CgChevronRight className="w-4 h-4 text-muted-foreground" />
                                        <span className="ml-1 text-sm font-bold text-primary md:ml-2">Conditions générales d'utilisation</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    {/* Main Content */}
                    <div className="container mx-auto px-2 py-8 md:px-6 md:py-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 lg:mb-12">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 ">Conditions Générales d'Utilisation</h1>
                            {/* Date de mise à jour */}
                            <div className="mx-auto max-w-[150px] border-t border-border pb-2">
                            </div>
                            <p className="text-sm text-center text-muted-foreground">
                                Dernière mise à jour :{" "}
                                {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                        </motion.div> 

                        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
                            <div className="p-4 md:p-8">
                                <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="space-y-8"
                                >     
                                
                                {/* Introduction */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <FiFileText className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Introduction</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Les présentes conditions générales d'utilisation (ci-après « CGU ») régissent l'accès et l'utilisation du site SMONI.FR ainsi que de l'ensemble des services proposés par SMONI. En accédant ou en utilisant le site, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, vous êtes prié de ne pas utiliser notre site.
                                    </p>
                                </section>

                                {/* Objet */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <BiAward className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Objet</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Les CGU ont pour objet de définir les droits, obligations et responsabilités de SMONI et des utilisateurs dans le cadre de l'utilisation de SMONI.FR. Elles visent à assurer une utilisation sécurisée, transparente et responsable des services en ligne proposés par SMONI.
                                    </p>
                                </section>

                                {/* Acceptation des Conditions */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <BiUser className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Acceptation des Conditions</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        L'accès et l'utilisation du site SMONI.FR impliquent l'acceptation pleine et entière des présentes CGU par l'utilisateur. Toute inscription ou utilisation des services offerts par SMONI vaut acceptation des CGU dans leur intégralité. SMONI se réserve le droit de modifier à tout moment et sans préavis les CGU. Il est de votre responsabilité de consulter régulièrement cette page afin de prendre connaissance des éventuelles modifications.
                                    </p>
                                </section>

                                {/* Accès au Site */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <BsEye className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Accès au Site</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Le site SMONI.FR est accessible gratuitement à tout utilisateur disposant d'un accès à internet. SMONI se réserve le droit de restreindre ou de modifier l'accès à tout ou partie du site pour des raisons techniques, de maintenance ou de mise à jour. SMONI ne saurait être tenu responsable en cas d'indisponibilité du site ou de dysfonctionnements pouvant résulter de contraintes techniques ou d'une maintenance programmée.
                                    </p>
                                </section>

                                {/* Comptes Utilisateurs */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <BiUser className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Comptes Utilisateurs</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Pour accéder à certains services proposés sur SMONI.FR, il peut être nécessaire de créer un compte utilisateur. Il est de votre responsabilité de fournir des informations exactes et à jour lors de votre inscription et de maintenir la confidentialité de vos identifiants de connexion. Vous acceptez de notifier immédiatement SMONI de toute utilisation non autorisée de votre compte. SMONI ne pourra être tenu responsable en cas d'utilisation frauduleuse de votre compte due à une négligence dans la gestion de vos identifiants.
                                    </p>
                                </section>

                                {/* Responsabilités */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <FiAlertCircle className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Responsabilités</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        SMONI s'engage à mettre en œuvre tous les moyens raisonnables pour assurer une information fiable et une expérience utilisateur optimale sur SMONI.FR. Néanmoins, SMONI ne saurait garantir l'absence totale d'erreurs, d'omissions ou d'interruptions de service. SMONI ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder, y compris en cas de modification, interruption ou suppression des contenus ou services proposés. L'utilisateur reconnaît utiliser le site et ses services sous sa propre responsabilité.
                                    </p>
                                </section>

                                {/* Propriété Intellectuelle */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <SiShieldsdotio className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Propriété Intellectuelle</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Tous les contenus présents sur SMONI.FR, incluant, de manière non limitative, les textes, images, graphismes, logos, vidéos et tout autre élément, sont la propriété exclusive de SMONI ou de ses partenaires. Toute reproduction, représentation, modification, publication, transmission ou exploitation partielle ou totale des contenus est strictement interdite sans l'accord préalable et écrit de SMONI, sauf autorisation légale expresse. Toute utilisation non autorisée pourra donner lieu à des poursuites conformément aux dispositions législatives et réglementaires en vigueur.
                                    </p>
                                </section>

                                {/* Utilisation des Services */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <BsEye className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Utilisation des Services</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Les services proposés sur SMONI.FR sont destinés à faciliter l'obtention du permis de conduire et à offrir un suivi pédagogique personnalisé. SMONI se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services à tout moment sans préavis. Les utilisateurs s'engagent à utiliser les services de manière loyale et dans le respect des lois et règlements applicables, ainsi que des présentes CGU. Tout usage abusif ou frauduleux pourra entraîner la suspension immédiate du compte utilisateur et, le cas échéant, des poursuites judiciaires.
                                    </p>
                                </section>

                                {/* Données Personnelles */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <SiShieldsdotio className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Données Personnelles</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        L'utilisation du site SMONI.FR et des services proposés est soumise à la politique de confidentialité de SMONI, qui fait partie intégrante des présentes CGU. Toute collecte et utilisation de données personnelles s'effectue dans le respect de la réglementation en vigueur. Pour en savoir plus, il vous est conseillé de consulter la page « Politique de confidentialité ».
                                    </p>
                                </section>

                                {/* Cookies */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <FiFileText className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Cookies</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        SMONI utilise des cookies afin d'améliorer votre expérience sur le site, analyser l'utilisation des services et personnaliser les contenus et publicités. En utilisant SMONI.FR, vous consentez à l'utilisation des cookies selon les modalités définies dans la politique de cookies disponible sur le site. Vous pouvez configurer ou désactiver l'usage des cookies selon les options de votre navigateur, mais cela pourrait limiter certaines fonctionnalités du site.
                                    </p>
                                </section>

                                {/* Modifications des Conditions */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <FiFileText className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Modifications des Conditions</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        SMONI se réserve le droit de modifier à tout moment et sans préavis les présentes CGU afin de les adapter aux évolutions du site, des services proposés ou à la législation applicable. Les modifications entrent en vigueur dès leur publication sur SMONI.FR. Il est de votre responsabilité de consulter régulièrement les CGU afin de prendre connaissance des mises à jour.
                                    </p>
                                </section>

                                {/* Loi Applicable et Juridiction */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <SiShieldsdotio className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Loi Applicable et Juridiction</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Les présentes CGU sont régies par la loi française. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, et à défaut de solution amiable, les tribunaux français seront seuls compétents.
                                    </p>
                                </section>

                                {/* Contact */}
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <CgUserRemove className="h-6 w-6 text-primary" />
                                        <h2 className="text-black text-2xl font-semibold">Contact</h2>
                                    </div>
                                    <div className="space-y-4 text-muted-foreground">
                                        <p>Pour toute question concernant les présentes CGU, leur interprétation ou leur application, vous pouvez contacter SMONI aux coordonnées suivantes :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Adresse :</strong> 62 rue de la jarry, 94300 Vincennes</li>
                                            <li><strong>Téléphone :</strong> +33 749464978</li>
                                            <li><strong>Adresse e-mail :</strong> contact@smoni.fr</li>
                                        </ul>
                                        <p>En utilisant SMONI.FR, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes conditions générales d'utilisation.</p>
                                    </div>
                                </section>

                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomeNewStudentSection />
            <Footer />
        </>
    )
}

export default Condition