import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../dashboard/Dashboard";
import AllUsers from "../dashboard/AllUsers";
import Earnings from "../dashboard/Earnings";
import Settings from "../dashboard/Settings";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings as SettingsIcon,
} from "lucide-react";

// central route config
export const appRoutes = [
  {
    path: "/",
    name: "Dashboard",
    element: <Dashboard />,
    icon: <LayoutDashboard size={18} />,
  },
  {
    path: "/dashboard/users",
    name: "All Users",
    element: <AllUsers />,
    icon: <Users size={18} />,
  },
  {
    path: "/dashboard/earnings",
    name: "Earnings",
    element: <Earnings />,
    icon: <DollarSign size={18} />,
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    element: <Settings />,
    icon: <SettingsIcon size={18} />,
  },
  // { path: "/logout", name: "Logout", element: <Logout />, icon: <LogOut size={18} /> },
];

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: appRoutes.map(({ path, element }) => ({
      path,
      element,
    })),
    errorElement: <div>Something went wrong!</div>,
  },
]);

export default routes;
