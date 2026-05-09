import { Outlet } from "react-router";
import SideBar from "@components/moniteurs/SideBar";
import NavBar from "../components/moniteurs/Navbar";
import NavbarMobile from "../components/moniteurs/NavbarMobile";

const MonitorLayout = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="hidden lg:block">
        <SideBar />
      </div>

      <div className="hidden lg:block">
        <NavBar />
      </div>

      <div className="lg:hidden">
        <NavbarMobile />
      </div>

      <main className="min-h-screen pt-[50px] lg:pt-[60px] lg:pl-[255px]">
        <div className="w-full mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MonitorLayout;
