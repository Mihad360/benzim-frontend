/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { getUser } from "../hooks/authServices";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // user is coming → show loading

    const authUser = getUser(); // sync or async
    setUser(authUser ?? null);

    setLoading(false); // auth checked
  }, []);

  // ⏳ While checking
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // ❌ Checked & no user
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // ✅ User exists
  return children;
};

export default PrivateRoute;
