import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen px-40">
      <aside>
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
