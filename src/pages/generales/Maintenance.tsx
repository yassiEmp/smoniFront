import Footer from '@components/generales/Footer'
import Header from '@components/generales/Header'
import { HiMiniWrenchScrewdriver } from 'react-icons/hi2'
import { Link } from 'react-router'
import PageHead from '@components/SEO/PageHead'

const Maintenance = () => {
    return (
        <>
            <PageHead
                title="Maintenance — Smoni"
                description="Page en maintenance."
                canonicalPath="/maintenance"
                noindex
            />
            <Header />
                <div className="pt-[120px] py-[60px] px-10 relative overflow-hidden flex flex-col items-center justify-center">
                    <HiMiniWrenchScrewdriver className='text-[85px] text-primary'/>
                    <h2 className='py-5 px-5 text-xl text-white bg-primary mt-3 rounded-full'>Maintenance en cours</h2>
                    <div className='md:w-[400px] w-full border-b border-primary my-4'></div>
                    <p className='md:w-[400px] w-full text-slate-600'>
                        Pour toutes information relative à la souscription à un pack veuillez contacter les administrateur <Link to="/contact" className='text-primary font-bold'>ici</Link> ou 
                        directement via <a href="mailto:contact@smoni.fr" className='underline text-primary font-bold'>contact@smoni.fr</a> ou 
                        <a href="tel:+33 749464978" className='underline text-primary font-bold'>+33 749464978</a>
                    </p>
                </div>
            <Footer />
        </>
    )
}

export default Maintenance