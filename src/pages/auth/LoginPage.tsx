import LoginForm from "./LoginForm";

import formImage from "@assets/authentification/form-image-1.png?w=480;960&format=avif;webp;jpg&as=picture";
import { ResponsivePicture } from "@/components/ui/responsive-picture";
import smoni_logo from "@assets/authentification/smoni-logo.svg";
import PageHead from "@components/SEO/PageHead";

// import Footer from "@components/generales/Footer";
// import Header from "@components/generales/Header";

const LoginPage = () => {


  return (
    // <>  
    //  <Header />
     <div className="w-full h-screen md:flex bg-white p-6 items-start justify-between ">
      <PageHead
        title="Connexion — Smoni"
        description="Connectez-vous à votre espace Smoni."
        canonicalPath="/connexion"
        noindex
      />
      <div className="md:sticky top-10 w-full md:h-full lg:w-1/3 flex md:justify-center items-center">
        <ResponsivePicture
          picture={formImage}
          alt="Image"
          sizes="(min-width: 1024px) 33vw, 50vw"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className=" w-full md:h-full h-[250px] rounded-[20px] object-cover hidden md:block "
        />

        <img
          src={smoni_logo}
          alt="Smoni Logo"
          className="w-[136px] h-auto md:absolute top-6 left-6 "
        />
      </div>

      <div className="w-full flex flex-col h-full lg:w-2/3  p-1">
        <LoginForm />
      </div>
    </div>
    //  <Footer />
    // </>
   
  );
};

export default LoginPage;
