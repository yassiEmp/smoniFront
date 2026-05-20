import Footer from "@components/generales/Footer"
import Header from "@components/generales/Header"
import { CgChevronRight } from "react-icons/cg"
import { Link } from "react-router"
import { motion } from "motion/react";
import { SiShieldsdotio } from "react-icons/si";
import { DiDatabase } from "react-icons/di";
import { BsEyeFill } from "react-icons/bs";
import { GiGlobe } from "react-icons/gi";
import { BiBell, BiLock, BiUserCheck } from "react-icons/bi";
import PageHead from "@components/SEO/PageHead";

const Politique = () => {
    return (
        <>
            <PageHead
                title="Politique de confidentialite - Smoni Auto-Ecole"
                description="Politique de confidentialite de Smoni Auto-Ecole Vincennes : traitement des donnees personnelles, cookies et droits des utilisateurs."
                canonicalPath="/privacypolicy"
            />
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
                                        <span className="ml-1 text-sm font-bold text-primary md:ml-2">Politique de confidentialité</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="container mx-auto px-2 py-8 md:px-6 md:py-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 lg:mb-12">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">Politique de Confidentialité</h1>
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
                                            <SiShieldsdotio className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Introduction</h2>
                                        </div>
                                        <p className="text-muted-foreground">
                                            La présente politique de confidentialité a pour objectif de vous informer de manière claire et transparente sur la manière dont SMONI collecte, utilise, partage et protège vos données personnelles dans le cadre de ses services. En utilisant notre site SMONI.FR, vous acceptez les pratiques décrites dans ce document. Cette politique a été rédigée dans un souci de conformité avec la réglementation en vigueur, notamment le Règlement général sur la protection des données (RGPD) et la loi Informatique et Libertés.
                                        </p>
                                    </section>

                                    {/* Données Collectées */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <DiDatabase className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Données Collectées</h2>
                                        </div>
                                        <div className="space-y-4 text-muted-foreground">
                                            <p>SMONI recueille diverses informations relatives à votre identité et à votre utilisation de ses services afin de vous offrir une expérience optimale et sécurisée. Les données collectées comprennent notamment :</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>
                                                    <strong>Les informations d'identification :</strong> nom, prénom, adresse e-mail, numéro de téléphone et, le cas échéant, adresse postale lors de la création de votre compte ou lors de vos demandes de contact.
                                                </li>
                                                <li>
                                                    <strong>Les données de connexion :</strong> adresse IP, type de navigateur, système d'exploitation, dates et heures d'accès ainsi que les pages consultées sur notre site.
                                                </li>
                                                <li>
                                                    <strong>Les informations contractuelles :</strong> données liées à votre souscription, à vos formations, aux services réservés et aux transactions effectuées sur notre plateforme.
                                                </li>
                                                <li>
                                                    <strong>Les informations de sondage et de feedback :</strong> réponses aux questionnaires, commentaires et autres données fournies volontairement dans le cadre de nos enquêtes de satisfaction ou d'amélioration des services.
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Utilisation des Données */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <BsEyeFill className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Utilisation des Données</h2>
                                        </div>
                                        <div className="space-y-4 text-muted-foreground">
                                            <p>Les données collectées par SMONI sont utilisées dans le seul but de :</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>Vous fournir et personnaliser nos services, notamment les cours interactifs, tests d'entraînement et dispositifs de suivi personnalisé.</li>
                                                <li>Gérer votre compte et assurer le bon déroulement de votre inscription, de vos transactions et de la relation contractuelle entre vous et SMONI.</li>
                                                <li>Améliorer la performance et la sécurité de notre site ainsi que l'expérience utilisateur, grâce à l'analyse de données de navigation et à l'optimisation de nos interfaces.</li>
                                                <li>Vous tenir informé(e) des mises à jour, nouveautés et offres promotionnelles, dans le respect de vos préférences en matière de communication.</li>
                                                <li>Respecter nos obligations légales et contractuelles, notamment en matière de lutte contre la fraude et de conservation des données à des fins comptables et fiscales.</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Partage et Transfert des Données */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <GiGlobe className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Partage et Transfert des Données</h2>
                                        </div>
                                        <div className="space-y-4 text-muted-foreground">
                                            <p>SMONI s'engage à ne pas vendre, louer ou échanger vos données personnelles avec des tiers sans votre consentement préalable, sauf dans les cas suivants :</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>Lorsque le partage est nécessaire à l'exécution du contrat, par exemple avec nos partenaires de paiement, nos prestataires techniques (hébergement, maintenance, sécurité) ou nos fournisseurs de services liés à la formation en ligne, qui agissent en qualité de sous-traitants.</li>
                                                <li>Dans le cadre d'obligations légales ou réglementaires imposant la communication de certaines informations aux autorités compétentes.</li>
                                                <li>Lorsqu'un transfert de données s'impose dans le cadre d'une opération de fusion, acquisition ou cession d'actifs ; dans ce cas, SMONI s'engage à informer les utilisateurs et à assurer un niveau de protection équivalent pour la continuité de la protection de leurs données.</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Durée de Conservation des Données */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <DiDatabase className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Durée de Conservation des Données</h2>
                                        </div>
                                        <div className="space-y-4 text-muted-foreground">
                                            <p>Les données personnelles collectées par SMONI sont conservées pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été recueillies. À l'issue de cette période, elles seront supprimées ou anonymisées, conformément aux prescriptions légales et réglementaires en vigueur. En règle générale :</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>Les données relatives à l'inscription, aux transactions et aux communications commerciales sont conservées pendant la durée du contrat et pendant les délais légaux de conservation.</li>
                                                <li>Les données relatives à la navigation sur le site sont archivées pour une période limitée afin d'optimiser la sécurité et l'amélioration continue de nos services.</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Sécurité des Données */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <BiLock className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Sécurité des Données</h2>
                                        </div>
                                        <div className="space-y-4 text-muted-foreground">
                                            <p>SMONI met en œuvre des mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos données personnelles. Ces mesures incluent notamment :</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>La protection des accès par des identifiants et mots de passe uniques, ainsi qu'une authentification à deux facteurs.</li>
                                                <li>Le chiffrement des données sensibles lors de leur transmission via des protocoles sécurisés (SSL/TLS) et, le cas échéant, leur stockage sur des serveurs sécurisés.</li>
                                                <li>La mise en place de procédures de sauvegarde régulières et de surveillance continue pour détecter et prévenir tout accès non autorisé ou toute fuite de données.</li>
                                            </ul>
                                            <p>Bien que nous mettions en œuvre toutes les précautions nécessaires, il convient de rappeler qu'aucune méthode de transmission ou de stockage électronique n'est totalement à l'abri d'un risque d'intrusion.</p>
                                        </div>
                                    </section>

                                    {/* Droits de l'Utilisateur */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <BiUserCheck className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Droits de l'Utilisateur</h2>
                                        </div>
                                        <div className="space-y-4 text-muted-foreground">
                                            <p>Conformément à la réglementation en vigueur, vous disposez de plusieurs droits concernant vos données personnelles, notamment :</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li><strong>Le droit d'accès :</strong> vous pouvez demander l'accès aux informations personnelles que nous détenons à votre sujet.</li>
                                                <li><strong>Le droit de rectification :</strong> en cas d'erreur ou d'inexactitude, vous pouvez nous demander la mise à jour ou la rectification de vos informations.</li>
                                                <li><strong>Le droit à l'effacement :</strong> vous pouvez demander la suppression de vos données personnelles, sous réserve des obligations légales qui nous imposent de les conserver.</li>
                                                <li><strong>Le droit à la limitation du traitement :</strong> dans certaines circonstances, vous pouvez demander la limitation du traitement de vos données personnelles.</li>
                                                <li><strong>Le droit d'opposition :</strong> vous pouvez vous opposer à l'utilisation de vos données à des fins de prospection commerciale ou pour d'autres motifs légitimes.</li>
                                                <li><strong>Le droit à la portabilité :</strong> vous pouvez demander à recevoir vos données sous un format structuré et réutilisable dans un but de transmission à un autre responsable de traitement.</li>
                                            </ul>
                                            <p>Pour exercer ces droits, ou pour toute demande relative à vos données, vous pouvez nous contacter via les coordonnées indiquées ci-dessous. Nous vous répondrons dans les meilleurs délais et conformément aux exigences légales.</p>
                                        </div>
                                    </section>

                                    {/* Modifications de la Politique */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <BiBell className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Modifications de la Politique</h2>
                                        </div>
                                        <p className="text-muted-foreground">
                                            SMONI se réserve le droit de modifier ou de compléter la présente politique de confidentialité afin de tenir compte des évolutions législatives, réglementaires ou technologiques. Dans ce cas, la nouvelle politique sera applicable dès sa mise en ligne et, lorsque cela est requis, nous vous informerons par tout moyen approprié de ces modifications. Il est donc recommandé de consulter régulièrement cette page pour prendre connaissance de la version la plus à jour.
                                        </p>
                                    </section>

                                    {/* Contact */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-4">
                                            <SiShieldsdotio className="h-6 w-6 text-primary" />
                                            <h2 className="text-black text-2xl font-semibold">Contact</h2>
                                        </div>
                                        <div className="space-y-4 text-muted-foreground">
                                            <p>Pour toute question, demande d'information ou exercice de vos droits concernant vos données personnelles, vous pouvez nous contacter à l'adresse suivante :</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li><strong>Adresse :</strong> 62 rue de la jarry, 94300 Vincennes</li>
                                                <li><strong>Téléphone :</strong> +33 749464978</li>
                                                <li><strong>Adresse e-mail :</strong> contact@smoni.fr</li>
                                            </ul>
                                            <p>Nous nous engageons à répondre à votre demande dans les plus brefs délais, dans le respect des délais légaux en vigueur.</p>
                                            <p>En utilisant SMONI.FR, vous reconnaissez avoir pris connaissance et accepté la présente politique de confidentialité. Cette démarche s'inscrit dans notre engagement constant en faveur de la transparence et de la protection des informations personnelles de nos utilisateurs.</p>
                                        </div>
                                    </section>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Politique