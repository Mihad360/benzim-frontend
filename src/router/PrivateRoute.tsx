import Loading from "../components/loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../hooks/authServices";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = getUser();
  console.log(user);
  const location = useLocation();

  if (user === undefined || user === null) {
    return (
      <div className="text-center py-72">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ Authenticated
  return children;
};

export default PrivateRoute;
