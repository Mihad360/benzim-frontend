import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../dashboard/Dashboard";
import AllUsers from "../dashboard/AllUsers";
import Earnings from "../dashboard/Earnings";
import Settings from "../dashboard/Settings";
import AuthLayout from "../components/layout/authentication/AuthLayout";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings as SettingsIcon,
} from "lucide-react";
import Login from "../components/layout/authentication/Login";
import Forgetpassword from "../components/layout/authentication/Forgetpassword";
import OtpVerify from "../components/layout/authentication/OtpVerify";
import ResetPassword from "../components/layout/authentication/ResetPassword";
import Notifications from "../dashboard/Notifications";

// Sidebar navigation items (for display in sidebar)
export const sidebarNavigation = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    path: "/dashboard/users",
    name: "All Users",
    icon: <Users size={18} />,
  },
  {
    path: "/dashboard/earnings",
    name: "Earnings",
    icon: <DollarSign size={18} />,
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: <SettingsIcon size={18} />,
  },
];

export const appRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/users",
    element: <AllUsers />,
  },
  {
    path: "/dashboard/earnings",
    element: <Earnings />,
  },
  {
    path: "/dashboard/settings",
    element: <Settings />,
  },
  {
    path: "/dashboard/notifications",
    element: <Notifications />,
  },
];

export const authRoutes = [
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/auth/forget-password",
    name: "Forget Password",
    element: <Forgetpassword />,
  },
  {
    path: "/auth/otp-verify",
    name: "Verify Otp",
    element: <OtpVerify />,
  },
  {
    path: "/auth/reset-password",
    name: "Reset Password",
    element: <ResetPassword />,
  },
];

const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: appRoutes.map(({ path, element }) => ({
      path,
      element,
    })),
    errorElement: <div>Something went wrong!</div>,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes.map(({ path, element }) => ({
      path,
      element,
    })),
    errorElement: <div>Something went wrong!</div>,
  },
]);

export default routes;
