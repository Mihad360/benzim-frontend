import { Outlet } from "react-router-dom"; // Used to render child routes (Login, Register, etc.)

// This layout is for authentication pages like Login, Register, Profile
const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-form-container">
          {/* The Outlet renders the actual page (e.g., Login or Profile) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
