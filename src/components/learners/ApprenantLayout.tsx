import { Outlet } from "react-router";
import Navbar from "./NavBar/Navbar";


const ApprenantLayout = () => {
  return (
   <>
   <Navbar />
   <main className="pb-8 md:py-0">
        <Outlet />
   </main>
   </>
  );
}
export default ApprenantLayout;