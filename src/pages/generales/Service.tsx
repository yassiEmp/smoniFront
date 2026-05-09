import AllService from "@components/generales/AllService";
import Footer from "@components/generales/Footer";
import Header from "@components/generales/Header";
import HomeFaqSection from "@components/generales/HomeFaqSection";
import HomeNewStudentSection from "@components/generales/HomeNewStudentSection";
import Testimonials from "@components/generales/Testimonials";

const Service = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <main>
        <AllService />
        <div className="relative z-10 bg-white border-y border-slate-100">
           <Testimonials />
        </div>
        <HomeFaqSection />
        <HomeNewStudentSection />
      </main>
      <Footer />
    </div>
  );
};

export default Service;
