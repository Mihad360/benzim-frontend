import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

const MainLayout = () => {
  return (
    <div className="flex h-screen px-40">
      <aside className="overflow-y-auto">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
