import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import SideBar from "@components/admin/SideBar";
import NavBar from "@/components/admin/NavBar";
import NavbarMobile from "@/components/admin/NavbarMobile";
import AdminBlockedCard from "@/components/common/AdminBlockedCard";

const AdminLayout = () => {
  const { user } = useSelector((state: RootState) => state.authReducer);

  // Vérifier si l'administrateur est bloqué
  if (user && (user.is_active === false || user.is_active === 0)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <AdminBlockedCard />
      </div>
    );
  }

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

      <main className="min-h-screen pt-[10vh] lg:pl-[200px]">
        <div className="w-full mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
};
export default AdminLayout;
