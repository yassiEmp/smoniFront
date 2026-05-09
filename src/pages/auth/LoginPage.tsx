import LoginForm from "./LoginForm";

import formImage from "@assets/authentification/form-image-1.png";
import smoni_logo from "@assets/authentification/smoni-logo.svg";

// import Footer from "@components/generales/Footer";
// import Header from "@components/generales/Header";

const LoginPage = () => {


  return (
    // <>  
    //  <Header />
     <div className="w-full h-screen md:flex bg-white p-6 items-start justify-between ">
      <div className="md:sticky top-10 w-full md:h-full lg:w-1/3 flex md:justify-center items-center">
        <img
          src={formImage}
          alt="Image"
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
