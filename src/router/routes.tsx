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
    path: "/",
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
